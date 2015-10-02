#!/bin/bash

SITE_FOLDER=$1
BUCKET_NAME=$2
DISTRIBUTION_ID=$3
PROFILE=$4

TIMESTAMP=$(date)

if [ -z "$SITE_FOLDER" ] || [ -z "$BUCKET_NAME" ] || [ -z "$DISTRIBUTION_ID" ]; then
  echo 'Usage: _deploy.sh <site folder> <bucket name> <distribution id> [profile]'
  exit -1
fi

if [[ $PROFILE == '' ]]; then
  PROFILE='default'
fi

timestamp=`LC_ALL=en_US.UTF-8 date`
expire_1yr=`LC_ALL=en_US.UTF-8 date -d "+1 year"`

# compress all compressable files
find $SITE_FOLDER \( -iname '*.html' -o -iname '*.htm' -o -iname '*.css' -o -iname '*.js' -o -iname '*.xml' -o -iname '*.txt' \) -exec gzip -9 -n {} \; -exec mv {}.gz {} \;

# sync all images
aws s3 sync $SITE_FOLDER s3://$BUCKET_NAME/ --exclude '*.*' --expires "'$expire_1yr'" --cache-control 'max-age=6048000' --include '*.jpg' --include '*.jpeg' --content-type 'image/jpeg' --profile $PROFILE
aws s3 sync $SITE_FOLDER s3://$BUCKET_NAME/ --exclude '*.*' --expires "'$expire_1yr'" --cache-control 'max-age=6048000' --include '*.ico' --content-type 'image/x-icon' --profile $PROFILE
aws s3 sync $SITE_FOLDER s3://$BUCKET_NAME/ --exclude '*.*' --expires "'$expire_1yr'" --cache-control 'max-age=6048000' --include '*.png' --content-type 'image/png' --profile $PROFILE

# sync all css
aws s3 sync $SITE_FOLDER s3://$BUCKET_NAME/ --exclude '*.*' --content-encoding 'gzip' --cache-control 'max-age=6048000, must-revalidate' --include '*.css' --content-type 'text/css; charset=UTF-8' --profile $PROFILE

# snyc all javascript
aws s3 sync $SITE_FOLDER s3://$BUCKET_NAME/ --exclude '*.*' --content-encoding 'gzip' --cache-control 'max-age=6048000' --include '*.js' --content-type 'application/javascript; charset=UTF-8' --profile $PROFILE

# sync feed xml
aws s3 sync $SITE_FOLDER s3://$BUCKET_NAME/ --exclude '*.*' --content-encoding 'gzip' --cache-control 'max-age=7200, must-revalidate' --include '*feed.xml' --content-type 'application/rss+xml; charset=UTF-8' --profile $PROFILE

# sync sitemap
aws s3 sync $SITE_FOLDER s3://$BUCKET_NAME/ --exclude '*.*' --content-encoding 'gzip' --cache-control 'max-age=7200, must-revalidate' --include '*sitemap.xml' --content-type 'application/xml; charset=UTF-8' --profile $PROFILE

# snyc html
aws s3 sync $SITE_FOLDER s3://$BUCKET_NAME/ --exclude '*.*' --content-encoding 'gzip' --cache-control 'max-age=7200, must-revalidate' --include '*.html' --include '*.htm' --content-type 'text/html; charset=UTF-8' --profile $PROFILE

# snyc txt
aws s3 sync $SITE_FOLDER s3://$BUCKET_NAME/ --exclude '*.*' --content-encoding 'gzip' --cache-control 'max-age=86400' --include '*.txt' --content-type 'text/plain; charset=UTF-8' --profile $PROFILE

# sync rest and delete unused elements
aws s3 sync $SITE_FOLDER s3://$BUCKET_NAME/ --delete --profile $PROFILE

invalidation_batch_param="'{\"Paths\": {\"Quantity\": 1,\"Items\": [\"/*\"]},\"CallerReference\": \"$TIMESTAMP\"}'"
invalidation_cmd="aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --invalidation-batch $invalidation_batch_param --profile $PROFILE"
eval $invalidation_cmd

# done as all items are compressed now
rm -rf $SITE_FOLDER
