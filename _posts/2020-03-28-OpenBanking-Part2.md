---
layout: post
title: "OpenBanking & PSD2: Part 2 - A practical example"
author: stelios
tags: [payments, networks, payment rails, cryptocurrencies, bitcoin, libra, remittances]
categories: [Payments, Fintec, Blockchain]
featured: true
description: ""
image: assets/images/openbanking/nesa-by-makers-IgUR1iX0mqM-unsplash.jpg
---

First test with cURL
Created by Stelios Gerogiannakis
Last updated 03 Mar, 2020
AnalyticsAnalytics
The first test will be an end-to-end cURL of the 3.1.0 Accounts API, with reduced security and programmatic consent approval.


Background

Normal security
When the TPP sends sends the consent approval request (e.g. slide 17, step 1), the request parameter needs to be a signed JWT, as extra proof that the TPP’s application is the right one. 

If however the sandbox Application is configured with a client_id & secret, the sandbox has no way of verifying this signature.

Note: A client_id/secret would be the way a “normal” API would be secured. This is the security level that OB aggregators like Yapily and TrueLayer have also chosen.
It is important to highlight that the OB API security is above that of a normal API.


Programmatic approval
In the same consent approval flow, the bank responds with a redirection URL, guiding the customer to the bank’s auth’n/auth’z screens (e.g. slide 17, steps 2-3). When testing, this would need to be copied to a browser and continue manually.

In the sandbox, the auth’n/auth’z screens can be short-circuited with some non-standard API arguments. 


Ingredients

Application


Customer
How to construct a valid sandbox customer id: Instructions




Sandbox OIDC capabilities
Explanation of the OIDC discovery endpoint: https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfig

Sandbox OIDC endpoint: https://api.rbs.useinfinite.io/.well-known/openid-configuration


The highlighted value is the one supported by RBS for consent authorisation request.


Execution

Proper way
You can now follow the step-by-step cURL instructions, replacing the values as needed.

Once you have a valid access token, you can call any of the methods in the Accounts Information API.


Copy-paste way

Get an application access token
curl -k -X POST \
  https://ob.rbs.useinfinite.io/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=client_credentials&client_id=CLIENT_ID=&client_secret=CLIENT_SECRET=&scope=accounts'

Create a consent
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

Programmatic approval
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


Get a resource access token
curl -k -X POST \
  https://ob.rbs.useinfinite.io/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'client_id=CLIENT_ID&client_secret=CLIENT_SECRET&redirect_uri=REDIRECT_URI&grant_type=authorization_code&code=AUTHORIZATION_CODE'

Get some actual results
curl -k -X GET \
  https://ob.rbs.useinfinite.io/open-banking/v3.1/aisp/accounts \
  -H 'Authorization: Bearer RESOURCE_ACCESS_TOKEN' \
  -H 'x-fapi-financial-id: 0015800000jfwB4AAI'
 




Full security flow with cURL
Created by Stelios Gerogiannakis
Last updated 09 Mar, 2020
AnalyticsAnalytics
This flow is the closest it can get to calling RBS directly.


Ingredients

Certificates
In real world, we will need to create 2 key pairs: MA-TLS and signing.
We can take a shortcut and re-use one for both.

This script automates the generation of the key and cert: 

cert.sh
771 B

Application
Create a new Application with MA-TLS enabled.



APIs
Disable the API security “shortcuts“ for the new Application.



Sandbox secure client auth
Determine the right way of cURL identifying as a secure client from the Sandbox OIDC Config endpoint. 
All possible ways are enumerated in OB OIDC Security Profile, section 5.2.2, item 7.



Supported customer authentication
Determine if the Sandbox gives options for different customer authentication options from the OIDC Config endpoint. 
All possible values are enumerated in OB OIDC Security Profile, parameter request.



Supported 'request' signing algorithms
Determine which algorithms the Sandbox supports for signing the request JWT from the OIDC Config endpoint. 



Execution

Get client access token
curl -k \
  --key ./client.key \
  --cert ./client.pem \
  -X POST \
  https://ob.rbs.useinfinite.io/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=client_credentials&client_id=SECURE_CLIENT_ID=&scope=accounts'

Create a consent
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

Create the ‘request’ JWT

Template JWT
{
  "alg": "RS256",
  "typ": "JWT",
  "kid": "unknown"
}
.
{
  "max_age": 86400,
  "jti": "ANTI_REPLAY_UUID",
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

Assemble the JWT at jwt.io


Get consent URL
curl -v -G -k \
  --key ./client.key \
  --cert ./client.pem \
  "https://api.rbs.useinfinite.io/authorize" \
   --data-urlencode "client_id=CLIENT_ID" \
   --data-urlencode "response_type=code id_token" \
   --data-urlencode "scope=openid accounts" \
   --data-urlencode "redirect_uri=REDIRECT_URI" \
   --data-urlencode "request=SIGNED_JWT"

Copy the consent redirection URL


Paste in a browser and complete the authorisation 



Exchange code for access token
curl -v -G -k \
  --key ./client.key \
  --cert ./client.pem \
  -X POST \
  https://ob.rbs.useinfinite.io/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&grant_type=authorization_code&code=AUTH_CODE_FROM_URL'

Make API calls
curl -v -G -k \
  --key ./client.key \
  --cert ./client.pem \
  https://ob.rbs.useinfinite.io/open-banking/v3.1/aisp/accounts \
  -H 'Authorization: Bearer ACCESS_TOKEN' \
  -H 'x-fapi-financial-id: 0015800000jfwB4AAI'
 




Using the RBS dev portal
Created by Stelios Gerogiannakis
Last updated 27 Feb, 2020
AnalyticsAnalytics
These pages give a whistle-stop tour of the RBS dev portal (link) to get you up-and-running quickly.

Please go through these pages before the hackathon day.


Registration
Registration is straight-forward. 
It requires a valid e-mail (to send a verification link) and a password with some complexity rules. 

A small gotcha is the username you will pick: it is globally unique, so go for something “personal“ to you.


Dashboard
Once logged in, the dashboard looks like this
![Dashboard](../assets/images/openbanking/01-dashboard.png)


Teams
Created by Stelios Gerogiannakis
Last updated 27 Feb, 2020
AnalyticsAnalytics
A Team is an isolated wrapper for 

a set of virtual bank customers,

with their one or more bank accounts,

their login credentials, and

their transactions, between them, to/from anyone, past or in the future.

In other words, a Team is a mini-bank.

The reason it is called a Team is because you can invite other Dev portal users to collaborate on the data.

Tip: You invite another user by specifying their e-mail. They must have logged in at least once.

Data in a Team (i.e. Transactions and, by consequence, Balances) can be altered by API calls (namely, using the Payments API). 
The eBanking interface is read-only and can be used to spot-check the results.


Teams in the dashboard
![Teams](../assets/images/openbanking/02-teams.png)

Team details

The “Team Information” values will be used when making API calls.
![Team details](../assets/images/openbanking/03-team-details.png)

Seed data

A Team comes pre-provisioned with some sample data.
![Seed data](../assets/images/openbanking/04-test-data.png)


Uploading bulk data
Created by Stelios Gerogiannakis
Last updated 26 Feb, 2020
AnalyticsAnalytics

A quick intro to bank data
The bank data is a mix of 

RBS-specific concepts and 

mapping the OpenBanking data spec to YAML.

Note: The links below are all from the 3.1.0 OpenBanking spec, which the sandbox supports at the moment.


Customers
There are 3 types of customers, each one corresponding to an RBS bank “franchise“, or vertical.

Private (Online banking)
A retail banking customer, with personal bank accounts only.
Uniquely identified by a customerNumber (10 digits) and/or a cardNumber (16 digits).
In real life the customerNumber is meant to be the date of birth plus 4 random digits.

Business (Bankline)
A business banking customer.
They belong to a company (customerId) and are identified by their userId. 
The company is the actual owner of the accounts.

Cards Online
A business banking customer, given a corporate card.
They are identified by a username.


4P (Partial Pin, Partial Password)
Customers authenticate themselves by a few random digits of their password (6+ alphanumeric) and their pin (4+ digits).
The auto-created customers all have:

password: 1234567890

pin: 12345678

When uploading new customers in bulk, you have to explicitly define their credentials.


Accounts
Details: Accounts v3.1 
Enumerations: Namespaced Enumerations - v3.1 


Beneficiaries
Details: Beneficiaries v3.1 
Enumerations: Namespaced Enumerations - v3.1 


Direct Debits
Details: Direct Debits v3.1 
Enumerations: Namespaced Enumerations - v3.1 


Standing Orders
Details: Standing Orders v3.1 
Enumerations: Namespaced Enumerations - v3.1 


Scheduled Payments
Details: Scheduled Payments v3.1 
Enumerations: Namespaced Enumerations - v3.1 


Transactions
Details: Transactions v3.1 
Enumerations: Namespaced Enumerations - v3.1 


Downloading options
![Download options](../assets/images/openbanking/05-download.png)

Creating data
Banking data is described in a YAML file. 
It can be created in one of 3 ways.


Static
Describe all users, with their accounts, beneficiaries, direct debits,…etc as a static snapshot.

Each uploaded YAML file incrementally adds to the data store. 
Existing users have their transactions deduplicated (i.e. one cannot add the same transaction twice).

This capability allows for 

breaking up of complex scenarios, and 

testing of (setup) → API call → (assert) → (update) → API call → (assert) 

![Uploaded data](../assets/images/openbanking/06-data.png)


Dynamic
This is an auto-provision of values (users, transactions,…) based on some statistical parameters.

Once uploaded, the auto-created users can be downloaded separately in order to drive an integration test suite, login to eBanking etc

Details: https://developer.rbs.useinfinite.io/documentation/devPortal/testdata


Hybrid
A static data file can be prepended with some roll-forward parameters.

This allows for “by example” scenarios of a known past baseline and semi-random future data items.

Details: https://developer.rbs.useinfinite.io/documentation/devPortal/drrf

eBanking
Created by Stelios Gerogiannakis
Last updated 02 Mar, 2020
AnalyticsAnalytics
Login




Accounts


Consents

Revoking a consent allows you to test the API’s (and Application’s) behaviour, when the access token becomes invalid.



Applications
Created by Stelios Gerogiannakis
Last updated 27 Feb, 2020
AnalyticsAnalytics
An App is a “licensed” TPP with access to the Teams' data.
For this reason, an App is associated with a single Team.

From a code point-of-view an App is just a set of credentials to access a bank.
The same code deployment can have an array of App credentials and connect to many different banks.



Activation
An App needs to be explicitly enabled for a specific API. 
This is to emulate 

the difference between AISP and PISP licensing at OB level, and 

the need to explicitly register with the bank before calling any API.



Security
There are 3 levels of configurable security.


App identification
The OpenBanking security profile extends the FAPI-RW security profile. 

What this means in plain English is that the client is identified by 2 key-pairs:

Transport layer, i.e. all calls are over MA-TLS

Application layer 
The client is using a private key to sign JWTs, the bank verifies them with the public key.

The sandbox gives the option for 

OpenBanking-like security, or

Simple clientid/secret



Request authorisation
During the OpenBanking OAuth flow to request for an access token, the App must send a signed JWT in order to identify itself (by proving ownership of the signing key). 

The sandbox gives the option for 

OpenBanking-like security, or

plain-text requestId



User consent flow
The App is expected to be browser- or mobile-based and support a redirection to the bank’s consent authorisation screens.
In the sandbox, this means open up the eBanking customer login screens, type the 4P credentials and click “Authorise“ on the consent.

The sandbox gives the option for

OpenBanking-like UI-based flow, or

a non-standard API call to emulate the user granting consent (programmatically authorise).


 