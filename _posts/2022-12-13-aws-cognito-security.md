---
layout: post
title: AWS Cognito security
subtitle: a call for debate
category: dev
tags: [cloud, aws]
author: Lucian Patian, Martin Birtel
author_email: patianl@haufe.com, martin.birtel@haufe-lexware.com
header-img: "images/aws-cognito-security/green-background.jpg"
---

# A call for debate on how to secure AWS Cognito

AWS Cognito is an identity management service for users who sign-up directly and for federated users who sign-in with external identity providers. It grants the ability to control access to web and mobile applications.

The user handling is being done via the [**User Pools**](http://docs.aws.amazon.com/cognito/latest/developerguide/getting-started-with-cognito-user-pools.html) while the identities and assign permissions for users is being configured inside [**Identity Pools**](http://docs.aws.amazon.com/cognito/latest/developerguide/getting-started-with-identity-pools.html)

Over the course of time, we found out that some of the Cognito userpools were deployed in their default configuration, making them possible honeypots.

## Updating users via the public Cognito API:

We discovered that the [**app client configuration**](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-client-apps.html) attributes are writable by default. As a result if a user obtains a token with the *aws.cognito.signin.user.admin* scope, they can modify a local user's attributes via the Cognito public endpoint (https://cognito-idp.REGION.amazonaws.com) using the "x-amz-target" header with the "CognitoIdentityProvider.UpdateUserAttributes" value. Going further, a user can also delete its own attributes or its own account using the same approach.

Imagine that some developers are not aware of this fact and use custom attributes for tenant separation or RBAC. An attacker can breach the tenant separation, access foreign user data, etc. by modifying these attributes (e.g. by changing attribute "custom:tenant: companyA" to "custom:tenant: companyB").

### The generic solution 

* Remove the *aws.cognito.signin.user.admin* from the app client scopes. Keep in mind that this does not solve the issue for public clients: when authenticating directly against the Cognito public endpoint (initiateAuth) with a user & password flow (or others), you always get a token with the *aws.cognito.signin.user.admin* scope.
* Remove the write-access permission in the app client configuration. Consider that this breaks federation with an external IdP because when a user signs in, Amazon Cognito updates the mapped attributes with the latest information from the IdP, even if its current value already matches the latest information.
This happens automatically in Cognito's backend involving no public APIs. Due to this nature, your SAML logins won't be affected by blocking the below discussed API calls.

### The custom solution 

* Block undesired calls towards the Cognito public API using AWS WAF (header: "x-amz-target", string: "AWSCognitoIdentityProviderService.<api_action>"): [list of Cognito APIs](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pools-API-operations.html#user-pool-apis-auth-unauth-token-auth)

You can read more about AWS WAF and Cognito here: https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-waf.html

You might be thinking how do you know which API call you should allow and which should you block. Well, you're in luck because we also faced this issue. Our suggestion is to initially create a WAF rule in count mode which tracks all API calls made by your Cognito userpool towards the public endpoint, centralize the data and afterwards build a new WAF rule which blocks all API calls except the ones tracked by the first rule.

Below is an example of a WAF rule which counts all the *AWSCognitoIdentityProviderService* calls via the "x-amz-target" header:

```yaml

{
  "Name": "Cognito-counting-calls-to-public-api",
  "Priority": 0,
  "Statement": {
    "ByteMatchStatement": {
      "SearchString": "AWSCognitoIdentityProviderService",
      "FieldToMatch": {
        "SingleHeader": {
          "Name": "x-amz-target"
        }
      },
      "TextTransformations": [
        {
          "Priority": 0,
          "Type": "NONE"
        }
      ],
      "PositionalConstraint": "CONTAINS"
    }
  },
  "Action": {
    "Count": {}
  },
  "VisibilityConfig": {
    "SampledRequestsEnabled": true,
    "CloudWatchMetricsEnabled": true,
    "MetricName": "Cognito-counting-calls-to-public-api"
  }
}

```  

The next step is to create a WAF Regex pattern set where you define the allowed calls tracked with the above rule. For this example we allowed only the *^AWSCognitoIdentityProviderService.InitiateAuth$* and *^AWSCognitoIdentityProviderService.GetUser$* patterns:

{:.center}
![]( /images/aws-cognito-security/waf_regex.png){:style="width:100%"} 

Further you create the WAF rule which blocks all API calls initiated by your userpool towards the public API, except the patterns defined in the regex:

```yaml

{
  "Name": "BLOCK-all-public-apis",
  "Priority": 1,
  "Statement": {
    "AndStatement": {
      "Statements": [
        {
          "NotStatement": {
            "Statement": {
              "RegexPatternSetReferenceStatement": {
                "ARN": "arn:aws:wafv2:eu-central-1:143338761663:regional/regexpatternset/cognito-block-all-public-api-calls/bc6fdf9b-2525-4c69-8cdb-44517a543a4a",
                "FieldToMatch": {
                  "SingleHeader": {
                    "Name": "x-amz-target"
                  }
                },
                "TextTransformations": [
                  {
                    "Priority": 0,
                    "Type": "NONE"
                  }
                ]
              }
            }
          }
        },
        {
          "SizeConstraintStatement": {
            "FieldToMatch": {
              "SingleHeader": {
                "Name": "x-amz-target"
              }
            },
            "ComparisonOperator": "GT",
            "Size": 0,
            "TextTransformations": [
              {
                "Priority": 0,
                "Type": "NONE"
              }
            ]
          }
        }
      ]
    }
  },
  "Action": {
    "Block": {}
  },
  "VisibilityConfig": {
    "SampledRequestsEnabled": true,
    "CloudWatchMetricsEnabled": true,
    "MetricName": "BLOCK-all-public-apis"
  }
}

```  

Besides the regex reference statement we added an AND condition using the "Field to match" for the *x-amz-target* header
grater than 0. This is useful for scenarios where the *x-amz-target* header is missing, allowing the calls to bypass our
WAF block rule (example: SAML login where the Hosted UI is used).

## Account takeover via unverified email/phone

Most of the user pools are configured with multiple login options, including email, username or phone. By default, the user pool option "Keep original attribute value active when an update is pending" is turned off.

If your application consuming a cognito-issued token does not check the *email_verified* attribute but uses it directly to load the data/identify of a user, it will be exposed to a possbile takeover.

An attacker can change the email attribute value of its own user to impersonate a victim's email address, then login into an application using an alternative login option like username. The application processing the cognito-issued token will see the victim's email address and use the unverified email attribute to load data/identify of the user.

### The solution 

* Enable by default in all Cognito userpools the *Keep original attribute value active when an update is pending* setting.
* Modify your applications to respect the *email_verified* and *phone_number_verified* claims.
* If possible, modify your applications not to rely on modifiable attributes like email, username, etc.

### Did you face any of the scenarios above? How did you mitigate the issues? What else got your attention when it comes to securing Cognito? 
&nbsp;  