---
layout: post
title: "OpenBanking & PSD2: Part 2 - A practical example"
author: stelios
tags: [payments, openbanking, fintec, aisp, pisp, hands-on, tutorials]
categories: [Payments, Fintec]
featured: false
description: "A 2-part series on OpenBanking and PSD2. This article gives a step-by-step, hands-on example of how to call an OpenBanking API endpoint, explaining all technical options along the way."
image: assets/images/openbanking/nesa-by-makers-IgUR1iX0mqM-unsplash.jpg
---

In this blog post I will provide a step-by-step guide on how to interact with OpenBanking APIs, explaining things along the way.  

In the [previous article][1] we went over the key motivations, concepts and interactions in the PSD2/OpenBanking ecosystem. 
If you have not done so already, take a few minutes to read it. It explains in depth a number of concepts I touch upon below. 

Going into the technical details of things, in this post I will cover  
* how to connect to and setup a realistic OpenBanking sandbox,
* how to make API calls using [cURL][2], 
* explaining the why and how along the way.

## An OpenBanking sandbox

Since calling live OpenBanking APIs is reserved for licensed [TPPs][3], we will need to use a [sandbox][4].  
I will be using the [RBS Group developer portal][5], specifically the [RBS branded sandbox][6]. <sup>[1](#footnote_1)</sup>
I will also refer to v.3.1.0 of the OpenBanking APIs throughout this article. That is the latest version supported by 
the sandbox as of writing this.

Registration to the sandbox is straight-forward, requiring a valid e-mail for verification. 

Before I proceed to the interesting bit (calling the APIS), I need to take a few moments and explain some...
 
### Basic sandbox concepts

#### Teams

A Team is an isolated wrapper for   
* a set of virtual bank customers,
* with their one or more bank accounts,
* their login credentials, and
* their transactions, 
  * between them, 
  * to/from anyone, 
  * in the past or in the future.

In other words, a Team is a mini-bank.  
The reason it is called a Team is because you can invite other sandbox portal users to collaborate on the data.  
You invite another user by specifying their e-mail. They must have logged in at least once.

Data in a Team (i.e. Transactions and, by consequence, Balances) can be altered by API calls (namely, using the Payments API). 
The eBanking interface (see next sections) is read-only and can be used to spot-check the results.

![Teams](../assets/images/openbanking/02-teams.png)
> Teams in the dashboard

##### Team details

The “Team Information” values will be used when making API calls.  
![Team details](../assets/images/openbanking/03-team-details.png)

##### Team data

A Team comes pre-provisioned with some sample data.  
![Seed data](../assets/images/openbanking/04-test-data.png)

The Team data is a mix of  
* RBS-specific concepts and 
* mapping the OpenBanking data spec to YAML.

##### Customers

There are 3 types of customers, each one corresponding to an RBS bank “franchise“.  
* Private  
A retail banking customer, with personal bank accounts only.  
Uniquely identified by a customerNumber (10 digits) and/or a cardNumber (16 digits).  
* Business  
A business banking customer.  
They belong to a company (`customerId`) and are identified by their `userId`.   
In real life the company is the actual owner of the account(s), with the users being the company's employees.
* Cards Online  
A business banking customer, given a corporate card. They are identified by a `username`.

All Customers authenticate themselves by a few random digits of their password (6+ alphanumeric characters ) and their 
pin (4+ digits). This is called partial-pin-partial-password or 4P.   
All of the auto-created customers, when creating a new Team, have as default credentials:  
* password: 1234567890
* pin: 12345678

When uploading new customers in bulk, you have to explicitly define their credentials.

##### Transactions & data

This section is a reference of all the possible values you can use when creating custom YAML data (see next section).

<details markdown="1">
  <summary>Click to expand!</summary>

The fields to define in the YAML for each data type are defined in the OpenBanking response payloads of their 
corresponding endpoints.   
  
* Account details: [Accounts v3.1](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/937623627/Accounts+v3.1)
* Beneficiaries: [Beneficiaries v3.1](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/937951315/Beneficiaries+v3.1)
* Direct Debits: [Direct Debits v3.1](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/937558106/Direct+Debits+v3.1) 
* Standing Orders: [Standing Orders v3.1](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/937721918/Standing+Orders+v3.1) 
* Scheduled Payments: [Scheduled Payments v3.1](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/937066541/Scheduled+Payments+v3.1) 
* Transactions: [Transactions v3.1](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/937558098/Transactions+v3.1) 
* Enumerations: [Namespaced Enumerations - v3.1](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/937623722/Namespaced+Enumerations+-+v3.1) 
</details>

You can download the auto-generated data to get a first idea of the format.  
![Download options](../assets/images/openbanking/05-download.png)

#### Creating data  

Team data is described in a [YAML][7] file.  
 
The data can be structured in one of 3 ways. 

**Static**  
Describe all users, with their accounts, beneficiaries, direct debits,…etc as a static snapshot.  
Each uploaded YAML file incrementally adds to the data store. Existing users have their transactions deduplicated (i.e. 
one cannot add the same transaction twice).  
This capability allows for   
* breaking up of complex scenarios in multiple files, and 
* testing in a cycle of (setup data) → API call → (assert result) → (update data) → API call → (assert result) 

Dashboard after multiple data uploads.  
![Uploaded data](../assets/images/openbanking/06-data.png)

**Dynamic**  
This is an auto-provision of values (users, transactions,…) based on some statistical parameters.  
Once uploaded, the auto-created users can be downloaded separately in order to drive an integration test suite, login to eBanking etc.
Details on this can be found [here][8].

**Hybrid**  
A static data file can be prepended with some roll-forward parameters.  
This allows for “by example” scenarios of a known past baseline and semi-random future data items.  
Details on this can be found [here][9]. 

#### eBanking

The sandbox provides a pseudo-eBanking environment from where to verify the results of API calls.

##### Login

![eBanking login](../assets/images/openbanking/07-login.png)

![eBanking credentials](../assets/images/openbanking/08-credentials.png)

##### Accounts

After login, you can view all the accounts defined in the Team data.  
![Accounts screen](../assets/images/openbanking/09-accounts.png)

##### Consents

You can also view all the Consents given to Applications.  
![Consents](../assets/images/openbanking/10-consents.png)

Revoking a consent allows you to test the API’s (and Application’s) behaviour, when the access token becomes invalid.

#### Applications

An Application is a “licensed” TPP with access to the Teams' data.  
For this reason, an Application is associated with a single Team.

From a code point-of-view an Application is just a set of credentials to access a bank.  
The same code deployment (i.e. running process) can have an array of Application credentials and connect to many 
different banks.

##### Activation

An Application needs to be explicitly enabled for a specific API.   
This is to "emulate"  
* the difference between [AISP and PISP licensing][10] at OpenBanking level, and 
* the need for a TPP to explicitly register with the bank before calling any API.

##### Security

There are 3 levels of configurable security.
  
**App identification**  
The OpenBanking security profile is based on the [FAPI-RW][11] and [OpenID Connect][12] specifications.   
What this means in plain English is that the client is identified by 2 key-pairs:  
* [Transport layer][15]: All calls are over MA-TLS, using their [QWAC][16]
* Application layer: The client is using their [QSEAL][16] to sign JWTs and the bank verifies them with the public key.

The sandbox gives the option for  
* OpenBanking-like transport layer security (MA-TLS), or
* A simple client id and secret, as is common with most APIs.

**Request authorisation**
During the OpenBanking [OAuth flow][13] to request an access token, the Application must send a signed JWT in order to 
identify itself (therefore proving ownership of the QSEAL). 

The sandbox gives the option for  
* OpenBanking-like application layer security (signed JWT), or
* plain-text requestId

**User consent flow**  
The Application is expected to be browser- or mobile-based and support a redirection to the bank’s consent authorisation screens.  
In the sandbox, this means a redirection to the eBanking login screens, typing the 4P credentials and clicking “Authorise“ 
on the consent.

The sandbox gives the option for  
* an OpenBanking-like UI-based flow, or
* a non-standard API call to emulate the user granting consent (programmatically authorise).

## Let's get started

![Getting our hands dirty](../assets/images/openbanking/nadya-spetnitskaya-tOYiQxF9-Ys-unsplash.jpg)
> Photo by Nadya Spetnitskaya on Unsplash

Let's get our hands dirty by performing a...

### First test with cURL

In the first test we will follow the steps to invoke the [3.1.0 Accounts API][14], with reduced security and programmatic 
consent approval.

#### Reduced security

As we mentioned above, the OpenBanking security profile requires the TPP to secure the calls at both the Transport and 
Application layers. For this reason, the TPP would normally need to  
* make a call over MA-TLS, and 
* when sending the consent approval request (e.g. [slide 17, step 1][17]), the request parameter needs to be a signed JWT. 

The sandbox gives the ability to call the APIs using a "lesser" security profile, namely a client id and secret.  
> Note: A client_id/secret would be the way a “normal” API would be secured. This is the security level that OB 
> aggregators like [Yapily][18] and [TrueLayer][19] have also chosen.  
> It is important to highlight that the OpenBanking APIs' security is above that of a normal API.

##### Programmatic approval

In the [same consent approval flow][17], the bank responds with a redirection URL. The TPP's application is expected to 
guide the customer to the bank’s authentication and authorization screens behind this URL (e.g. slide 17, steps 2-3).  
When testing, this would need to be copied to a browser and continue manually.

In the sandbox, the authentication and authorization screens can be short-circuited with some non-standard API arguments.  
This will emulate as if the customer gave their consent (or not).

#### Configuration 

In terms of configuration, your application should look like this 

![App details](../assets/images/openbanking/001-app-details.png)

Sandbox Customer ids are a combination of  
* the id given in the dataset  
![Customer data](../assets/images/openbanking/003-customers.png) 
* plus the unique "domain" auto-generated for the Application  
![Domain](../assets/images/openbanking/002-domain.png)
   
Instructions on how to construct a valid sandbox customer id can be found [here][20].

All OpenID Connect authorization servers are required to provide a [discovery endpoint][21].  
This enumerates the server's capabilities and allows clients to auto-configure themselves prior to making any calls. 
The sandbox's discovery endpoint is [here][22] and returns something like the following image
![Response code](../assets/images/openbanking/004-response.png)  
The highlighted value is the one supported by RBS for the consent authorisation request.

#### Execution

You can copy-paste the cURL commands below replacing the placeholders (in uppercase).

**Get an application access token**
```
curl -k -X POST \
  https://ob.rbs.useinfinite.io/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=client_credentials&client_id=CLIENT_ID=&client_secret=CLIENT_SECRET=&scope=accounts'
```  
This will return an access token (APP_ACCESS_TOKEN).

**Create a consent**  
This will create a consent to view a Customer's account information.  
See the specific `Permissions` requested.
```
curl -k -X POST \
  https://ob.rbs.useinfinite.io/open-banking/v3.1/aisp/account-access-consents \
  -H 'Authorization: Bearer APP_ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -H 'x-fapi-financial-id: 0015800000jfwB4AAI' \
  -d '{
  "Data": {
    "Permissions": [
      "ReadAccountsDetail",
      "ReadBalances",
      "ReadTransactionsCredits",
      "ReadTransactionsDebits",
      "ReadTransactionsDetail"
    ]
  },
  "Risk": {}
}'
```  
This will return the created CONSENT_ID, awaiting approval by the Customer.

**Programmatic approval**  
As we said, we will go ahead and pretend a Customer logged in and approved the Consent request. (see `authorization_result`).
```
curl --location -X GET -G -k "https://api.rbs.useinfinite.io/authorize" \
   --data-urlencode "client_id=CLIENT_ID" \
   --data-urlencode "response_type=code id_token" \
   --data-urlencode "scope=openid accounts" \
   --data-urlencode "redirect_uri=REDIRECT_URI" \
   --data-urlencode "request=CONSENT_ID" \
   --data-urlencode "authorization_mode=AUTO_POSTMAN" \
   --data-urlencode "authorization_result=APPROVED" \
   --data-urlencode "authorization_username=CUSTOMER_ID@DOMAIN" \
   --data-urlencode "authorization_accounts=*"
```
![Auth code](../assets/images/openbanking/005-auth-code.png)
This returns the AUTHORIZATION_CODE.

**Get a resource access token**  
We can use the authorization code as proof of user acceptance. With it, we can now get an access token to start calling 
API endpoints.  
```
curl -k -X POST \
  https://ob.rbs.useinfinite.io/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'client_id=CLIENT_ID&client_secret=CLIENT_SECRET&redirect_uri=REDIRECT_URI&grant_type=authorization_code&code=AUTHORIZATION_CODE'
```  
This returns the RESOURCE_ACCESS_TOKEN.

**Get some actual results**  
We can now call any of the Account APIs endpoints. For example  
```
curl -k -X GET \
  https://ob.rbs.useinfinite.io/open-banking/v3.1/aisp/accounts \
  -H 'Authorization: Bearer RESOURCE_ACCESS_TOKEN' \
  -H 'x-fapi-financial-id: 0015800000jfwB4AAI'
```

### Full-on security flow

After seeing a quick-and-dirty example, let's see something more realistic.  
The steps below are the closest you can get to calling a live OpenBanking API directly.

#### Certificates

In the real world, we would need to 
* create 2 key pairs for the QWAC and QSEAL
* send the [CSRs][23] to a [QTSP][24] to get the certificates (or get them from OBIE, if a UK-based TPP)  
etc

Here we will take a shortcut and  
* auto-generate a [self-signed certificate][25], and 
* re-use it both as QWAC and QSEAL.

The Bash script in the expanding box below automates the generation of the key pair and certificate. 

<details markdown="1">
  <summary>Click to expand!</summary>

```bash
#!/bin/bash

echo "Please provide your certificate's domain name, e.g. xyz.foobar.com"
read -p "Domain: " DOMAIN

echo "--- Generating... ---"

openssl genrsa -des3 -passout pass:x -out ./client.pass.key 4096
openssl rsa -passin pass:x -in ./client.pass.key -out ./client.key
rm ./client.pass.key
openssl req -new -key ./client.key -out ./client.csr \
  -subj "/C=GB/ST=London/L=London/O=FooBar/OU=Payments Group/CN=$DOMAIN"
openssl x509 -req -sha256 -days 365 -in ./client.csr -signkey ./client.key -out ./client.crt
openssl x509 -in ./client.crt -out ./client.pem

echo "--- Files created: ---"
ls client.*

echo "--- Copy the certificate below to the sandbox ---"
cat client.pem

echo "--- Use the key below to sign the JWT in jwt.io ---"
cat client.key
```
</details>

#### Application

You will need to create a new Application in the sandbox with MA-TLS enabled.  
![Certificates](../assets/images/openbanking/006-certificates.png)

#### APIs

Disable the API security “shortcuts“ for the new Application.  
![Security](../assets/images/openbanking/007-security.png)

#### Sandbox secure client authentication

Just to re-iterate, the [sandbox OIDC Configuration endpoint][22] specifies the supported way of identifying a secure 
client. In our case, we know this is MA-TLS.  
![MA-TLS](../assets/images/openbanking/008-method.png)  
All supported ways are enumerated in the [OpenBanking OIDC Security Profile][26], section 5.2.2, item 7.

#### Supported customer authentication 

When banking customers authenticate themselves, the banks may specify their own options. This is again exposed 
in the [sandbox OIDC Configuration endpoint][22].   
![Authentication](../assets/images/openbanking/009-auth.png)  
All possible values are enumerated in [OpenBanking OIDC Security Profile][26], parameter `request`.

#### Supported JWT signing algorithms

![JWT signature](../assets/images/openbanking/010-sign.png)
Each bank (and the sandbox) may support different algorithms signing the `request` JWT.  
The possible values are defined in the [JSON Web Algorithms][27] specification.

#### Execution

**Get client access token**

```bash
curl -k \
  --key ./client.key \
  --cert ./client.pem \
  -X POST \
  https://ob.rbs.useinfinite.io/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=client_credentials&client_id=SECURE_CLIENT_ID=&scope=accounts'
```  
Copy the CLIENT_ACCESS_TOKEN.

**Create a consent**

```bash
curl -k \
  --key ./client.key \
  --cert ./client.pem \
  -X POST \
  https://ob.rbs.useinfinite.io/open-banking/v3.1/aisp/account-access-consents \
  -H 'Authorization: Bearer CLIENT_ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -H 'x-fapi-financial-id: 0015800000jfwB4AAI' \
  -d '{
  "Data": {
    "Permissions": [
      "ReadAccountsDetail",
      "ReadBalances",
      "ReadTransactionsCredits",
      "ReadTransactionsDebits",
      "ReadTransactionsDetail"
    ]
  },
  "Risk": {}
}'
```  
Copy the CONSENT_ID.

**Create the ‘request’ JWT**

At this step you are initiating the consent flow.  
For this you will need to assemble and sign a JWT. Use the template in the expandable box below. 

<details markdown="1">
  <summary>Click to expand!</summary>

```
--- Header ---
{
  "alg": "RS256",
  "typ": "JWT",
  "kid": "unknown"
}

--- Payload ---
{
  "max_age": 86400,
  "jti": "SOME_ANTI_REPLAY_UUID",
  "response_type": "code id_token",
  "scope": "openid accounts",
  "aud": "https://api.rbs.useinfinite.io",
  "redirect_uri": "REDIRECT_URI",
  "client_id": "CLIENT_ID",
  "iss": "CLIENT_ID",
  "claims": {
    "id_token": {
      "openbanking_intent_id": {
        "value": "CONSENT_ID",
        "essential": true
      },
      "acr": {
        "value": "urn:openbanking:psd2:ca",
        "essential": true
      }
    },
    "userinfo": {
      "openbanking_intent_id": {
        "value": "CONSENT_ID",
        "essential": true
      }
    }
  },
  "state": "SOME_STATE",
  "nonce": "SOME_NONCE"
}
```  
</details> 

`"kid": "unknown"` is a sandbox "magic" value, since there is no external JWKS endpoint to read the public key from.  
The placeholders named `SOME_XYZ` are application-specific, for additional security.  
You can specify a value of your choosing or leave them as-is.

Copy-paste the above template and assemble your final JWT in the online helper at [jwt.io][28].
![Sign JWT](../assets/images/openbanking/011-jwt.png)

**Get the consent URL**

```
curl -v -G -k \
  --key ./client.key \
  --cert ./client.pem \
  "https://api.rbs.useinfinite.io/authorize" \
   --data-urlencode "client_id=CLIENT_ID" \
   --data-urlencode "response_type=code id_token" \
   --data-urlencode "scope=openid accounts" \
   --data-urlencode "redirect_uri=REDIRECT_URI" \
   --data-urlencode "request=SIGNED_JWT"
```

Copy the consent redirection URL in the response.

![Redirection URL](../assets/images/openbanking/012-location.png)

Paste the URL in a browser and complete the consent authorisation. 

![Authorization](../assets/images/openbanking/013-auth.png)

After the successful consent approval the browser will be redirected back to your `REDIRECT_URI` (the site of which 
probably does not exist). What we are interested in, is the `code` URL parameter. 

![Auth code](../assets/images/openbanking/014-code.png)

**Exchange code for access token**

```
curl -v -G -k \
  --key ./client.key \
  --cert ./client.pem \
  -X POST \
  https://ob.rbs.useinfinite.io/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&grant_type=authorization_code&code=AUTH_CODE_FROM_URL'
```

**Call an API endpoint**  

```
curl -v -G -k \
  --key ./client.key \
  --cert ./client.pem \
  https://ob.rbs.useinfinite.io/open-banking/v3.1/aisp/accounts \
  -H 'Authorization: Bearer ACCESS_TOKEN' \
  -H 'x-fapi-financial-id: 0015800000jfwB4AAI'
```  
TA-DAAAA! Well done!  
You are now fully versed in OpenBanking!

## Parting thought

![Crossroads](../assets/images/openbanking/brendan-church-pKeF6Tt3c08-unsplash.jpg)
> Photo by Brendan Church on Unsplash

In these 2 articles ([part 1][1]) we went from the original motivation and high level concepts of the OpenBanking and PSD2 APIs 
to a detailed hands-on walkthrough of interacting with an API.  

The OpenBanking APIs emerged in the aftermath of the [2007-2008 financial crisis][29] as an attempt to open up access to 
the retail banking sector and the underlying payments infrastructure.  
Just over 10 years later and we are witnessing a [much-much][30] larger [debt][31] and, eventually, [currency][32] crisis.
There are many arguments on what should be done and what will eventually happen, but one thing seems inevitable: currencies 
becoming [digital-only][33]. 
  
There are 2 primary avenues that lead in that end state.  

* Crypto-currencies, i.e. digital wallets utilizing public-private cryptography
* API- and message-based access to the payment infrastructure.  
OpenBanking/PSD2 falls in this category, with India's [UPI][34] being a [prominent][35], large-scale example. 

These avenues are not mutually exclusive; government crypto-currencies could be kept at the settlement/infrastructure 
layer. You can find a high-level description of the different future payment networks in my [relevant blog post][36] 
(full series: parts [1][37], [2][38] and [3][36]) 

In either case, the OpenBanking and PSD2 framework has a very high probability of becoming the de facto interface 
to the domestic and international payments infrastructure.

Hopefully these two blog posts made this space a little bit less obscure.  

## Footnotes

1. <a name="footnote_1"></a>Full disclaimer: I was involved in the roll-out of the RBS Group developer portal. 


  [1]: http://sgerogia.github.io/OpenBanking-Part1/
  [2]: https://develop.zendesk.com/hc/en-us/articles/360001068567-Installing-and-using-cURL
  [3]: https://help.bankline.rbs.com/help/other_services/third_party_providers/whats_a_TPP
  [4]: https://en.wikipedia.org/wiki/Sandbox_(software_development)
  [5]: https://www.bankofapis.com/
  [6]: https://developer.rbs.useinfinite.io/#/
  [7]: https://en.wikipedia.org/wiki/YAML
  [8]: https://developer.rbs.useinfinite.io/documentation/devPortal/testdata
  [9]: https://developer.rbs.useinfinite.io/documentation/devPortal/drrf
  [10]: https://www.openbanking.org.uk/providers/third-party-providers/
  [11]: https://openid.net/specs/openid-financial-api-part-2-ID2.html
  [12]: https://openid.net/specs/openid-connect-core-1_0.html
  [13]: https://openbanking.atlassian.net/wiki/spaces/DZ/pages/83919096/Open+Banking+Security+Profile+-+Implementer+s+Draft+v1.1.2#OpenBankingSecurityProfile-Implementer'sDraftv1.1.2-HybridFlowRequestwithIntentId
  [14]: https://openbanking.atlassian.net/wiki/spaces/DZ/pages/937820271/Account+and+Transaction+API+Specification+-+v3.1
  [15]: https://en.wikipedia.org/wiki/OSI_model
  [16]: https://www.quovadisglobal.ch/Zertifikate/PSD2_Zertifikat.aspx?sc_lang=en-GB
  [17]: https://www.openbanking.org.uk/wp-content/uploads/Customer-Experience-Guidelines-V1-1.pdf
  [18]: https://github.com/yapily/developer-resources/wiki
  [19]: https://docs.truelayer.com/
  [20]: https://developer.rbs.useinfinite.io/api-catalog/20140/documentation/programmatically-authorize
  [21]: https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfig
  [22]: https://api.rbs.useinfinite.io/.well-known/openid-configuration
  [23]: https://www.globalsign.com/en/blog/what-is-a-certificate-signing-request-csr
  [24]: https://www.luxtrust.com/the-role-of-a-qualified-trust-service-provider/
  [25]: https://en.wikipedia.org/wiki/Self-signed_certificate
  [26]: https://openbanking.atlassian.net/wiki/spaces/DZ/pages/83919096/Open+Banking+Security+Profile+-+Implementer+s+Draft+v1.1.2#OpenBankingSecurityProfile-Implementer%27sDraftv1.1.2-UKOpenBankingOIDCSecurityProfile
  [27]: https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40#section-3.1
  [28]: https://jwt.io/#debugger-io
  [29]: https://en.wikipedia.org/wiki/Financial_crisis_of_2007%E2%80%9308
  [30]: https://blogs.imf.org/2020/04/20/a-global-crisis-like-no-other-needs-a-global-response-like-no-other/
  [31]: https://www.theguardian.com/world/2020/mar/22/urgent-call-to-head-off-new-debt-crisis-in-developing-world
  [32]: https://ftalphaville.ft.com/2020/03/26/1585218010000/What-makes-this-global-dollar-crunch-different-/
  [33]: https://www.bis.org/publ/bppdf/bispap107.htm
  [34]: https://en.wikipedia.org/wiki/Unified_Payments_Interface
  [35]: https://www.mygov.in/digidhan/pages/pdf/sbi/NPCI%20Unified%20Payment%20Interface.pdf
  [36]: https://sgerogia.github.io/Payments-Intro-Part3/
  [37]: https://sgerogia.github.io/Payments-Intro-Part1/
  [38]: https://sgerogia.github.io/Payments-Intro-Part2/
  
 