---
layout: post
title: How to&#58; AWS Cognito ➕ ADFS = 💖
subtitle: Step-by-step guide to federated authentication
category: dev
tags: [howto, cloud, aws]
author: Doru Mihai, Lucian Patian
author_email: doru.mihai@haufe-lexware.com, lucian.patian@haufe-lexware.com
header-img: "images/new/Exportiert_46.jpg"
---


Since we've been rolling out more and more projects via the cloud the need to commoditize components or aspects of a solution is now easily achievable.

One of these aspects/components is identity management, and the solution that comes from AWS is [Cognito](https://aws.amazon.com/cognito/).

One of the most common use cases in B2B software is to offer authentication using the customer's identity provider, which in the vast majority of cases is Microsoft's Active Directory and with the help of [ADFS](https://docs.microsoft.com/en-us/windows-server/identity/active-directory-federation-services) (short for Active Directory Federation Services), which exposes the necessary APIs to be able to do federated authentication.

After having set up a Cognito User Pool we can allow users to sign-in via an external identity provider (a.k.a federated authentication) via SAML 2.0 or OpenID Connect. ADFS supports SAML so we can create a trust relationship between them to allow users that exist in the AD to authenticate as they would be our own users and use the applications that rely on our Cognito User Pool for authentication.

So, since the task of setting up a trust relationship between AWS Cognito and ADFS will become a recurrent one, we decided to write up a step-by-step guide on what needs to be done to set it up.

# Part 1: ADFS

First things first, from the ADFS server management console, let's create a new Relying Party.

{:.center}
![]( /images/aws-cognito-adfs/adfs_add_rp.png){:style="width:70%"}

After that, going through the wizard, in the first few steps there is nothing to do:

{:.center}
![]( /images/aws-cognito-adfs/adfs_rp_wizard_1.png){:style="width:70%"}

{:.center}
![]( /images/aws-cognito-adfs/adfs_rp_wizard_2.png){:style="width:70%"}

{:.center}
![]( /images/aws-cognito-adfs/adfs_rp_wizard_3.png){:style="width:70%"}

{:.center}
![]( /images/aws-cognito-adfs/adfs_rp_wizard_4.png){:style="width:70%"}

It's only at the step where we have to define the Relying Party's identifier that we need to intervene and not go with the default.

As stated in the [documentation](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-saml-idp.html) we need to provide the Service Provider Entity ID in the following form:

```sh
urn:amazon:cognito:sp:<yourUserPoolID>
```

{:.center}
![]( /images/aws-cognito-adfs/adfs_rp_wizard_5.png){:style="width:90%"}

The next step is for defining multi-factor auth (MFA, 2FA), feel free to configure as needed. For most cases this remains disabled.

{:.center}
![]( /images/aws-cognito-adfs/adfs_rp_wizard_6.png){:style="width:70%"}

In this next step you may decide if all the users in the AD will have access to authenticate for this Relying Party. This can be useful in case your customer would only want employees from a certain department or any other criteria, to have access to the application.

{:.center}
![]( /images/aws-cognito-adfs/adfs_rp_wizard_7.png){:style="width:70%"}

After that we can quickly skip through the last 2 steps to start defining the fields that we want to pass from ADFS towards Cognito for each user that authenticates.

{:.center}
![]( /images/aws-cognito-adfs/adfs_rp_wizard_8.png){:style="width:70%"}
 
{:.center}
![]( /images/aws-cognito-adfs/adfs_rp_wizard_9.png){:style="width:70%"}

This part becomes more interesting, we need to define what fields out of AD's store do we want to send as SAML claims to this Relying Party. 

The only really important one is the *Name ID* SAML Claim which is the unique identifier of the user's identity and is used to match the user identity principle coming from ADFS to the corresponding shadow account created by Cognito automatically in the User Pool.

If you follow the [official AWS docs](https://aws.amazon.com/blogs/mobile/building-adfs-federation-for-your-web-app-using-amazon-cognito-user-pools/) on how to set this up you will see that you are instructed to create a dedicated Name ID Claim that would look something like this.

{:.center}
![]( /images/aws-cognito-adfs/adfs_rp_name_id.png){:style="width:90%"}

## BEWARE!!! ⚠💀☠

By configuring the claim transform rule this way we've discovered an unfortunate side-effect. After configuring everything, when users will access your application and attempt to authenticate, they will be properly redirected to the login page of ADFS where they enter their domain credentials (a.k.a. corporate account), and what we observed is that ADFS will then send the SAML assertion to Cognito with the NameID string EXACTLY as the user has typed it into the login form of ADFS, and since this is the unique identifier of a federated identity from the POV of Cognito, if the user types his username differently.....different accounts will be created in the Cognito User Pool. NOT GOOD! 😊

So, in order to avoid this situation, we can map an AD store value that is unique per user to the SAML NameID claim as part of the normal set of claims that we map to be sent along to Cognito as part of a succesful user authentication. And this mapping can be seen below.

{:.center}
![]( /images/aws-cognito-adfs/adfs_rp_claim_mapping.png){:style="width:90%"}

As a last step, we need to explicitly set the SAML Endpoint for this Relying Party, and this is always in the form of:

```sh
https://<your_cognito_url>/saml2/idpresponse
```

And you can set this in the RP Properties under the Endpoints tab as seen in the image below:

{:.center}
![]( /images/aws-cognito-adfs/adfs_rp_saml_endpoint.png){:style="width:70%"}


## Part 2: AWS Cognito

Once you have defined all the claim mappings on ADFS's side, it is time to connect the dots on Amazon's side.

First thing, you need to retrieve the SAML Federation metadata of ADFS. This is readily available at a well know URL:

```sh
https://<adfs_url>/federationmetadata/2007-06/federationmetadata.xml
```

Download this file and use it to configure a SAML Identity Provider (IdP) in your Cognito User Pool. You can also provide the URL directly, although I'm not sure how often Cognito refreshes the metadata information, if at all, so when your external partner updates an SSL certificate used for signing SAML requests for instance, you might need to manually trigger a refresh on Cognito's side anyway.

{:.center}
![]( /images/aws-cognito-adfs/cognito_saml_idp.png){:style="width:90%"}

After creating the IdP your next step should be to configure attribute mapping. 

So, fields that are stored in AD are mapped via the Relying Party claim rules to fields defined in the [SAML schema](https://docs.oasis-open.org/security/saml/v2.0/saml-schema-assertion-2.0.xsd), and here in Cognito you map them back into fields defined in the [OpenID Connect schema](https://openid.net/specs/openid-connect-basic-1_0.html#StandardClaims). Makes sense, right? 😁

{:.center}
![]( /images/aws-cognito-adfs/cognito_claim_mapping.png){:style="width:100%"}

And after that all that is left is to enable this external IdP for one or more of your App clients and your users will be able to authenticate against the external IdP and get a JWT token issued by Cognito containing the claims you have previously configured to be received from ADFS and mapped to Cognito attributes.

{:.center}
![]( /images/aws-cognito-adfs/cognito_app_client.png){:style="width:100%"}

Notice that at the bottom of the App client card you have a link to the Hosted UI so you can quickly test what the AWS Cognito HostedUI will look like given the current app client configuration. You can experiment and see how the UI changes if there is 1 or more enabled identity providers.

After a user has succesfully authenticated via the external IdP a user will automatically be created in your User Pool with the state 

{:.center}
![]( /images/aws-cognito-adfs/cognito_external_user.png){:style="width:100%"}

Notice the account status that is set to EXTERNAL_PROVIDER and the special _identities_ field where Cognito will store some metadata relating to the external IdP that "owns" this identity, here you will see the user's ID in the external IdP's scope and the labels that you have previously set for this external IdP.

These fields will be updated on each succesful authentication so you can rely on the fact that the fields you receive via JWT attrbutes will be up-to-date.

So hopefully by this point you will have a fully functioning solution offering federated authentication with an external ADFS.

Have fun!