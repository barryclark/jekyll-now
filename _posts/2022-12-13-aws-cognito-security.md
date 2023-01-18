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

# A call for debate on how secure is actually Cognito

AWS Cognito is an identity management service for users who sign-up directly and for federated users who sign-in with external identity providers. It grants the ability to control access to web and mobile applications.

The user handling is being done via the [**User Pools**](http://docs.aws.amazon.com/cognito/latest/developerguide/getting-started-with-cognito-user-pools.html) while the identities and assign permissions for users is being configured inside [**Identity Pools**](http://docs.aws.amazon.com/cognito/latest/developerguide/getting-started-with-identity-pools.html)

Over the course of time, we found out that some of the Cognito userpools were deployed in their default configuration, making them possible honeypots.

## Updating users via the public Cognito API:

We discovered that the [**app client configuration**](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-client-apps.html) attributes are writable by default. As a result if a user obtains a token with the *aws.cognito.signin.user.admin* scope, they can modify a local user's attributes via the Cognito public endpoint (https://cognito-idp.<region>.amazonaws.com, X-Amz-Target: CognitoIdentityProvider.UpdateUserAttributes). Going further, a user can also delete its own attributes or its own account using the same approach.

Imagine that some developers are not aware of this fact and use custom attributes for tenant separation or RBAC. An attacker can breach the tenant separation, access foreign user data, etc. by modifying these attributes (e.g. by changing attribute "custom:tenant: companyA" to "custom:tenant: companyB")

### The solution 

* Remove the *aws.cognito.signin.user.admin* from the app client scopes. Keep in mind that this does not solve the issue for public clients: when authenticating directly against the Cognito public endpoint (initiateAuth) with a user & password flow (or others), one can always get a token with the *aws.cognito.signin.user.admin* scope.
* Remove the write-access permission in the app client configuration. Consider that this breaks federation with external IDPs because (some) attributes need to be modified when logging in via federated IDP (attribute mapping).
* Block undesired calls towards the Cognito public API using AWS WAF (Header: "X-Amz-Target", String: "AWSCognitoIdentityProviderService.<api_action>") - [Cognito API reference](https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_Operations.html)

Below is an example of a WAF rule which blocks the *AWSCognitoIdentityProviderService.UpdateUserAttributes* action

```yaml

{
    "Name": "BlockCognitoUpdateUserAttributes",
    "Priority": 1,
    "Statement": {
        "ByteMatchStatement": {
            "SearchString": "AWSCognitoIdentityProviderService.UpdateUserAttributes",
            "FieldToMatch": {
                "SingleHeader": {
                    "Name": "x-amz-target"
                }
            },
            "TextTransformations": [{
                "Priority": 1,
                "Type": "NONE"
            }],
            "PositionalConstraint": "EXACTLY"
        }
    },
    "Action": {
        "Block": {}
    },
    "VisibilityConfig": {
        "SampledRequestsEnabled": true,
        "CloudWatchMetricsEnabled": true,
        "MetricName": "BlockCognitoUpdateUserAttributes"
    }
}

```  

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