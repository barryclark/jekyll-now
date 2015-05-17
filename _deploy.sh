#!/bin/bash

SITE_FOLDER=$1
BUCKET_NAME=$2
DISTRIBUTION_ID=$3

TIMESTAMP==$(date "+%R +%u")

# if [[$1 = ''] || $2 = '' || $3 = '' ]; then
if [ -z "$SITE_FOLDER" ] || [ -z "$BUCKET_NAME" ] || [ -z "$DISTRIBUTION_ID" ]; then
  echo 'Usage: _deploy.sh <site folder> <bucket name> <distribution id>'
  exit -1
fi

aws s3 sync $SITE_FOLDER s3://$BUCKET_NAME/ --delete

invalidation_batch_param="'{\"Paths\": {\"Quantity\": 1,\"Items\": [\"/*\"]},\"CallerReference\": \"So 17. Mai 04:15:16 CEST 2015\"}'"
invalidation_cmd="aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --invalidation-batch $invalidation_batch_param"
eval $invalidation_cmd
