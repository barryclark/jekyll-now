---
layout: post
title: "OpenBanking & PSD2: Part 1 - Opening up the Banks"
author: stelios
tags: [payments, openbanking, fintec, aisp, pisp]
categories: [Payments, Fintec]
featured: true
description: ""
image: assets/images/openbanking/joshua-hoehne-_XBilGRm_AU-unsplash.jpg
---

OpenBanking describes open financial APIs offered by banks.  
It took its name from the UK regulator's [2016 initiative][11] to front-run the upcoming EU 
[PSD2 directive][12], which was coming into full effect in September 2019. 
The name has now become almost global   
and resulted in the UK becoming the de facto hub for open APIs fintech innovation (link).

In this series of two articles I will 
* give a high-level introduction to some core PSD2 / OpenBanking concepts,
* describe the eco-system from the PoV of the banks and external integrators, and
give an easy-to-follow example of how an integration with the APIs looks like

It is an evolving ecosystem 
I will be using a fusion of OpenBanking and PSD2 terminology 

## PSD2 

PSD2 meaty legislation 
Combination of a high-level regulation
and a technical standard 
public/private cryptography identification and security  

From an end-user standpoint, PSD2 can be summarised in the following sentence  
> Offer functional and security parity between a bank’s UI/mobile and its public APIs.

Or  
> A bank customer must be able to securely do through an API all things she can do through the UI/mobile.

https://www.openbankingeurope.eu/qtsps-and-eidas/

Since this was a law and not an architectural blueprint, 
the selected technologies and architecture 
are those matching the spirit of the law  

Europe is trail-blazing 
technology choices and concepts are replicated around the world   

The following diagram describes the PSD2 ecosystem, the key elements and their interactions from a very high level. 

![PSD2 ecosystem](../assets/images/openbanking/openbanking-psd2.png)

The scenario shows interactions in a cross-European level.  
However the same concepts and entities will apply to the UK and elsewhere, with little change 

### PSU

### QTSP

In the UK this is the OBIE


### TPP
A Third Party Provider (TPP) is a company getting access to a Payment Services User (PSU, i.e. customer’s) data, with her authorisation.

TPPs have to be [registered with the OpenBanking][2] Implementation Entity (OBIE) to become active.
Registration means going through a number of background checks.

A TPP (legal entity) can have many different Applications (e.g. mobile, brands) registered in the OBIE directory.


### Consent
At the core of OpenBanking is the concept of Consent.

A Consent is the equivalent of a notarized contract. 
It is a contract between the Customer and the TPP, with the bank becoming the trusted 3rd party (akin to a notary).

If it was in text, a Consent would read something like 

> I (Customer) authorize TPP XYZ to access my account 123 and read items A, B and C. 
> This authorization is valid until date DD/MM/YYYY.

The Consent is stored in the bank’s systems and becomes the reference, every time TPP makes a call to access account 123.
The bank provides a mechanism for the Customer to revoke the Consent at any time prior to expiration.

### ASPSP 

#### API 

OB Spec links 

Registration 
example of OB self-registration

#### Security 

MA-TLS 
CA revocation lists in LB

https://ec.europa.eu/tools/lotl/eu-lotl.xml

https://webgate.ec.europa.eu/tl-browser/#/tl/HU/1/13


FAPI and OIDC specifications
The OpenBanking technical specification is using the Consent to build on top of the [FAPI][3] and [OIDC][4] specifications.
In particular, it is using the [Hybrid Flow][5] with the intentId being the unique Consent identifier.  

In addition, the overall security and trust is established by 2 key pairs:

Transport layer (a.k.a. QWAC)
This is for MA-TLS communication between TPP and bank.
This is issued by the [OBIE’s Certification Authority][6], one per TPP (legal entity). 
A [revocation][7] of this certificate signals to all the banks “the TPP has lost its license“.

Application layer (a.k.a. QSEAL)
This is used for signing exchanged JWTs.
This can be a key-pair issued by any CA (even a self-signed one) and uploaded to the OB directory. There is one QSEAL per Application.
OBIE publishes all the public keys in its JWKS endpoint. 
Example [showing OBIE’s][8] itself public keys (has security warning). 

Each bank publishes its specific implementation and conformance to the OB spec (link for [RBS][9]).

#### Approval flow
Visualizing the flow from a customer’s point-of-view will make things clearer.

This [document][10] has mockups describing guideline happy and unhappy paths for various interaction scenarios (web, mobile, token-based identification,…).

### Regulator

EU-specific concern 
Check when passporting 
mish-mash of sites
common APIs on top

### Around the world 

Australia
https://cdr-register.github.io/register/#dynamic-client-registration
https://consumerdatastandardsaustralia.github.io/standards/#client-authentication

Japan
https://www.zenginkyo.or.jp/fileadmin/res/news/news290713_3.pdf


All countries around the world
https://www.openbankingexpo.com/wp-content/uploads/2019/09/ndgit-Open-Banking-APIs-worldwide-Whitepaper.pdf

## In the next episode

![Stay tuned](../assets/images/openbanking/will-francis-_J3oTl6acVg-unsplash.jpg)
> Photo by Will Francis on Unsplash


  [1]: https://en.wikipedia.org/wiki/Payment_Services_Directive
  [2]: https://www.openbanking.org.uk/providers/directory/
  [3]: http://openid.net/specs/openid-financial-api-part-2.html
  [4]: http://openid.net/specs/openid-connect-core-1_0.html
  [5]: https://openbanking.atlassian.net/wiki/spaces/DZ/pages/83919096/Open+Banking+Security+Profile+-+Implementer+s+Draft+v1.1.2#OpenBankingSecurityProfile-Implementer%27sDraftv1.1.2-SecurityArchitecture
  [6]: https://openbanking.atlassian.net/wiki/spaces/DZ/pages/80544075/OB+Root+and+Issuing+Certificates+for+Production
  [7]: https://openbanking.atlassian.net/wiki/spaces/DZ/pages/22577944/What+are+the+Open+Banking+CA+and+OCSP+expected+behaviours
  [8]: https://keystore.openbankingtest.org.uk/keystore/openbanking.jwks
  [9]: https://openbanking.atlassian.net/wiki/spaces/AD/pages/110264930/Implementation+Guide+Royal+Bank+of+Scotland
  [10]: https://www.openbanking.org.uk/wp-content/uploads/Customer-Experience-Guidelines-V1-1.pdf
  [11]: https://www.openbanking.org.uk/wp-content/uploads/OB_MediaPDF_FINAL.pdf
  [12]: https://en.wikipedia.org/wiki/Payment_Services_Directive#Revised_Directive_on_Payment_Services_(PSD2)