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

echo "Preparing JWT..."

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

