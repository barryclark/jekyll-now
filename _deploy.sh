#!/bin/bash

SITE_FOLDER=$1
BUCKET_NAME=$2
DISTRIBUTION_ID=$3

TIMESTAMP=$(date)

if [ -z "$SITE_FOLDER" ] || [ -z "$BUCKET_NAME" ] || [ -z "$DISTRIBUTION_ID" ]; then
  echo 'Usage: _deploy.sh <site folder> <bucket name> <distribution id>'
  exit -1
fi

aws s3 sync $SITE_FOLDER s3://$BUCKET_NAME/ --delete

invalidation_batch_param="'{\"Paths\": {\"Quantity\": 1,\"Items\": [\"/*\"]},\"CallerReference\": \"$TIMESTAMP\"}'"
invalidation_cmd="aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --invalidation-batch $invalidation_batch_param"
eval $invalidation_cmd
