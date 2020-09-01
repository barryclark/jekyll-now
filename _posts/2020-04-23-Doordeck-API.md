---
layout: post
title: "Physical Access as a Service: Using the Doordeck API"
author: stelios
tags: [api, hands-on, tutorials]
categories: [Software Development]
featured: true
description: "Doordeck provides a robust API and platform for physical and resource access management. This post provides a quick introduction on how to connect to the platform."
image: assets/images/doordeck/door-green-closed-lock-4291.jpg
---

## A new paradigm 

Physical access has been slow to move to the internet age. The humble key has been with us for millennia.  
In the last few decades, it has slowly been replaced in professional environments by magnetic and NFC access cards.  
However, this is still falling short for the current and future needs of the Internet age.    

![Card access](../assets/images/doordeck/card-access.png)
> Typical card access system

The way access cards work, is pretty simple.  
The card goes near the reader prompting a read of its unique identifier. The reader relays the identifier to a central 
controller device (usually a computer), where it is checked against the whitelist of identifiers.   
If confirmed, the controller instructs the door's lock to open. 
  
Though more flexible compared to keys, card-based systems leave a lot to be desired.  
Cards are as prone to loss or theft as keys. Once that happens, there is no way of preventing unwanted access without removing 
from the whitelist first. Cards do not "recognize" an owner.
In addition, these systems are usually closed and hard to manage and automate centrally (one-time access, instant revocation, 
API integration and automation...)  

The Doordeck platform <sup>[1](#footnote_1)</sup> builds on top of the [existing offline access card infrastructure][19] and 
makes it accessible via an API platform.
This is possible by combining the capabilities of Android and iPhone platforms with public/private key cryptography.

![Doordeck access](../assets/images/doordeck/doordeck-access.png)

Each user is identified by a public/private keypair.  
Depending on the access mode (direct or as a service), the keypair is generated on the server or the mobile device. 

An NFC-enabled mobile phone goes near the [Doordeck tile][20] (or the camera scans thew QR code printed on it).  
The device makes an API call, requesting access. The call's payload is the tile's id, signed with the user's private key. 
This means "user X wants to open door 1, associated with tile Y". 

The server checks the request against a number of possible rules (user allowed for this door, blackout times,...). If successful, 
it instructs the access controller to unlock the door.  

Let's stretch our hands and see this end-to-end through a hands-on example. 

## Security as a service

The underlying Doordeck entity model is quite simple.
 
```
+-------+         +--------+
|       |*       *|        |
| User  +---------+ Site   |
|       |         |        |
+-------+         +--------+
    |*               1|
    |                 |
    |                 |
    |                *|
    |             +--------+        +-------+
    |            *|        |1    0-1|       |
    +-------------+ Lock   +--------+ Tile  |
                  |        |        |       |
                  +--------+        +-------+
```

* A Doordeck User has access to a number of Sites (i.e. buildings).  
* Each Site has a number of Locks (doors), for each one of which the User is explicitly permissioned.
* Each Lock can be associated with a Tile; this is effectively an identifier for the door.

For a test of the API we need to do 3 things:  
1. Create a user account with Doordeck, 
2. associate the new account with a door (a demo one, for now), and 
3. unlock it!

We will be calling the [staging version][5] of the API.

### Creating a user account

This is fairly easy at the [registration portal][3].  
After logging in, the web application's home screen looks rather sparse; we are not yet associated with any locks.

![Doordeck login](../assets/images/doordeck/dd_login.png)
> Doordeck user login screen

### Associate with the demo door

First we need to discover our user's identifier.  
Let's call the [login endpoint][4], replacing the `EMAIL` and `PASSWORD` with your credentials from the registration portal.  
```bash
curl 'https://api.staging.doordeck.com/auth/token/' \
      -X POST \
        -H 'content-type: application/json' \
        --data-binary '{"email":"EMAIL","password":"PASSWORD"}' \
        | jq -r '.authToken'
```
Copy the printed token and paste it in the [debugger of jwt.io][2].  

![User id in the JWT](../assets/images/doordeck/jwt_user_id.png)
> User id in the authentication token

To associate with the demo door, we will use a [simple web form][6] which has been provided for this reason.  
Paste your user id and click Submit.

![Associate with demo door](../assets/images/doordeck/user_demo_door.png)
> Associate with demo door

You can verify the association by refreshing your [home screen][7] in the web app. 

![Demo door](../assets/images/doordeck/demo_lock.png)
> Demo door in the web app

You are all set to...

### Unlock your first door

On [logging in][4], each user is issued with  
* an `authToken` to call the non-sensitive API endpoints, and 
* a `privateKey` to sign a JWT authentication payload for sensitive operations like [unlock][8]. 

When sending a signed authentication payload, the Doordeck server imposes a time limit of 60 seconds from the time of 
signing to  is time-constrained and serves to prevent replay attacks.   

This security feature makes it hard to test by hand; one needs to be typing super-fast.  
For this reason I have created the following utility script, which  
* takes in your credentials, 
* logs in to Doordeck,
* signs a JWT authentication payload, and
* unlocks the demo door.

<details markdown="1">
  <summary>Click to expand!</summary>

```bash
#!/bin/bash

echo "Please provide your Doordeck user credentials"
read -p "Email: " USER
read -s -p "Password: " PWD

LOCK_ID="ad8fb900-4def-11e8-9370-170748b9fca8"

echo "Retrieving token for user $USER..."

read AUTH_TOKEN PRIVATE_KEY < \
  <(echo \
    $(curl 'https://api.staging.doordeck.com/auth/token/' \
      -X POST \
        -H 'content-type: application/json' \
        --data-binary '{"email":"'"$USER"'","password":"'"$PWD"'"}' \
        | jq -r '.authToken, .privateKey' \
      ) \
   )

echo $PRIVATE_KEY \
  | base64 --decode \
  | openssl pkcs8 -nocrypt -inform DER -outform PEM -out privatekey.pem

read USER_ID < \
  <(arrTOKEN=(${AUTH_TOKEN//./ }); echo ${arrTOKEN[1]} \
    | base64 --decode \
    | jq -r '.sub'
    )

IAT=$(date +%s)
EXP=$((IAT + 60))

echo "Preparing JWT auth. payload..."

HEADER='{"alg":"RS256","typ":"JWT"}'
BODY='{"iss":"'"$USER_ID"'","sub":"'"$LOCK_ID"'","nbf":'"$IAT"',"iat":'"$IAT"',"exp":'"$EXP"',"operation":{"type":"MUTATE_LOCK","locked":false,"duration":5}}'
HEADER_B64=`echo -n $HEADER | base64 | sed 's/+/-/g;s/\//_/g;s/=//g'`
BODY_B64=`echo -n $BODY | base64  | sed 's/+/-/g;s/\//_/g;s/=//g'`
SIGNATURE_B64=`echo -n $HEADER_B64.$BODY_B64 | openssl sha256 -sign privatekey.pem | base64 | sed 's/+/-/g;s/\//_/g;s/=//g'`
JWT=`echo -n $HEADER_B64.$BODY_B64.$SIGNATURE_B64`

echo "Unlocking demo door..."

curl "https://api.staging.doordeck.com/device/$LOCK_ID/execute" \
  -X POST \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-type: application/json;charset=UTF-8" \
  --data-binary "$JWT"

```
</details>
 
Save it as an executable shell script and open a browser to the [demo door's web page][9].

Run the script, switch to the demo door's page and... voila!

![Unlocking the door](../assets/images/doordeck/door_unlock.gif)
> Door unlocking sequence

## Security as a Platform

Doordeck takes the concept of secure access further by offering an integration platform.  
This allows third parties and developers to offer access automation as an add-on service through their existing systems 
and applications.
The applications range from [tenant experience applications][10] offered by large commercial property managers, to
centralized [industrial facility management][11] to vanilla [office management][21]. 

The conceptual entity model of the Doordeck platform is slightly different.

```
+-------+        +-------+         +-------+         +--------+
|       |*      1|       |*       1|       |*       *|        |
| App   +--------+  App  +---------+ Admin +---------+ Site   |
| User  |        |       |         |       |         |        |
+---+---+        +-------+         +-------+         +--------+
    | *                                                 1|
    |                                                    |
    |                                                    |
    |                                                   *|
    |                                                +--------+        +-------+
    |                                               *|        |1    0+1|       |
    +------------------------------------------------+ Lock   +--------+ Tile  |
                                                     |        |        |       |
                                                     +--------+        +-------+
``` 

* The Doordeck User (as described in the previous section) is the administrator of...
* the Application, registered with the Doordeck platform.  
The Application has a number of...
* App Users, which it has previously on-boarded and authenticated.  
The Application takes care of uniquely identifying App Users to Doordeck (id, e-mail...).  
* The Doordeck Platform allows these App Users access to Locks, by issuing ephemeral security keys.    

Let's see how that works end-to-end, using the staging API.

### Registering the application

The integrator application needs to identify itself to the Doordeck API. <sup>[2](#footnote_2)</sup> 

We start by registering the application in the [Doordeck portal][12].

![Register app](../assets/images/doordeck/register-app.png)

#### Application identity

The application uniquely identifies itself to the API using a URL.  
This is called `Auth domain` in the Doordeck portal. Once defined, it will need to be specified verbatim in the `iss` 
field of all JWTs sent to the API.

![Auth domain](../assets/images/doordeck/auth-domain.png)
> Adding the application's external identifier

#### Application security

We will also need to upload the public key of the application.  
The application will sign JWTs with its private key as an authentication step every time it calls the Doordeck API.

The developer portal requires the upload of the public keys in [JWK format][13].  
For test purposes, this can be generated manually at [https://mkjwk.org/][14], making sure to only select an algorithm 
from the [relevant RFC-mandated list][15] (e.g. RS256).  
The website can also generate the keys in PEM format; very useful to automate the local signing of the payloads.  
![Generate key](../assets/images/doordeck/mkjwk.png)
> Manually generating a JWK 

Alternatively, if you have  
* [Java 14+ installed][16] and 
* the [lokey Python tool][18] 

you can take a shortcut and generate the keys using the following little script.  
The script    
* downloads the JAR from [Github][17], 
* generates a 2048 bit RSA key named `my-key`, 
* creates files `fullKey.jwk` and `publicKey.jwk` in the current directory, and
* creates `privateAppKey.pem` and `publicAppKey.pem` from them.

<details markdown="1">
  <summary>Click to expand!</summary>

```bash
#!/bin/bash

curl -L -o json-web-key-generator.jar https://github.com/mitreid-connect/json-web-key-generator/releases/download/json-web-key-generator-0.8.2/json-web-key-generator.jar

java -jar json-web-key-generator.jar -t RSA -s 2048 -i my-key -u sig -p -o fullKey.jwk -P publicKey.jwk

cat fullKey.jwk | lokey to pem > privateAppKey.pem

cat publicKey.jwk | lokey to pem > publicAppKey.pem
```
</details>

Paste the public JWK in the Doordeck portal; this will be your application's identifier.  
![Paste public key](../assets/images/doordeck/public-key.png)
> Adding the integrator application identifier

Save the PEM files because we will need them when we...

### Generate a user JWT

As we saw in the previous section, upon [user login][4] we receive a private key with which to sign API call JWTs.  

The case of an Application making API calls is not much different.  
The Application signs the JWT with its private key and defines the App User details (name, e-mail...) in the JWT's body. 
Since this is a trusted Application, the App User details are also trusted. 

The following script assembles and tests such a user JWT using  
* the Application's auth. domain,
* a user e-mail provided by you,
* the `privateAppKey.pem` file generated previously, and
* assuming that the signature algorithm is `RS256` and the Application's key is named `my-key`.

<details markdown="1">
  <summary>Click to expand!</summary>

```bash
#!/bin/bash

echo "Please provide your Application auth. domain"
read -p "Domain: " DOMAIN
echo "Please provide your Application user's e-mail"
read -p "E-mail: " EMAIL

IAT=$(date +%s)
EXP=$((IAT + 600))

echo "Preparing user JWT..."

HEADER='{"alg":"RS256","kid":"my-key"}'
BODY='{"iss":"'"$DOMAIN"'","iat":'"$IAT"',"exp":'"$EXP"',"aud":"https://api.doordeck.com","sub":"'"$EMAIL"'","email":"'"$EMAIL"'","email_verified":true,"telephone":"+441234567890","telephone_verified":true,"name":"Name '"$EMAIL"'","locale":"en-gb","zoneinfo":"Europe/London"}'
HEADER_B64=`echo -n $HEADER | base64 | sed 's/+/-/g;s/\//_/g;s/=//g'`
BODY_B64=`echo -n $BODY | base64 | sed 's/+/-/g;s/\//_/g;s/=//g'`
SIGNATURE_B64=`echo -n $HEADER_B64.$BODY_B64 | openssl sha256 -sign privateAppKey.pem | base64 | sed 's/+/-/g;s/\//_/g;s/=//g'`
JWT=`echo -n $HEADER_B64.$BODY_B64.$SIGNATURE_B64`

echo "Validating the user JWT..."

curl -v -X GET \
  https://api.staging.doordeck.com/platform/auth \
  -H "Authorization: Bearer $AUTH_TOKEN" 
```
</details>

### 

## Parting thoughts

Competition 

https://www.getkisi.com/access-control-system

https://tapkey.com/

http://www.controlsoft.com/controlsoft-mobile-access.asp

Bluetooth is double edged sword
https://www.buildings.com/news/industry-news/articleid/21265/title/simplify-access-control-with-smartphones


## Footnotes

1. <a name="footnote_1"></a>Full disclaimer: I am an angel investor in Doordeck. 
3. <a name="footnote_2"></a>This section is a condensed version of the guide found [here][1].


  [1]: https://doordeck.com/developer/authenticating-your-users
  [2]: https://jwt.io/#debugger-io
  [3]: https://app.doordeck.com/#/register
  [4]: https://developer.doordeck.com/docs/#login-v1
  [5]: https://developer.doordeck.com/docs/#environments
  [6]: https://api.doordeck.com/demo/
  [7]: https://app.doordeck.com/
  [8]: https://developer.doordeck.com/docs/#unlock
  [9]: https://demo.doordeck.com/assets/
  [10]: https://www.sharplaunch.com/blog/tenant-experience-software-app/
  [11]: https://en.wikipedia.org/wiki/Facility_management
  [12]: https://developer.doordeck.com/
  [13]: https://tools.ietf.org/html/rfc7517
  [14]: https://mkjwk.org/
  [15]: https://tools.ietf.org/html/rfc7518#section-3.1
  [16]: https://gist.github.com/gwpantazes/50810d5635fc2e053ad117b39b597a14
  [17]: https://github.com/mitreid-connect/json-web-key-generator
  [18]: https://github.com/jpf/lokey
  [19]: https://doordeck.com/how-it-installs
  [20]: https://doordeck.com/blog/unlock-with-a-touch-doordeck-becomes-the-first-keyless-solution-to-use-native-nfc-on-iphone
  [21]: https://en.wikipedia.org/wiki/Office_managemen