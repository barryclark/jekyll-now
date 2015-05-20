#!/bin/bash

SITE_FOLDER=$1
BUCKET_NAME=$2
DISTRIBUTION_ID=$3


TIMESTAMP=$(date)

if [ -z "$SITE_FOLDER" ] || [ -z "$BUCKET_NAME" ] || [ -z "$DISTRIBUTION_ID" ]; then
  echo 'Usage: _deploy.sh <site folder> <bucket name> <distribution id>'
  exit -1
fi

timestamp=`LC_ALL=en_US.UTF-8 date`
expire_1yr=`LC_ALL=en_US.UTF-8 date -d "+1 year"`

# compress all compressable files
find $SITE_FOLDER \( -iname '*.html' -o -iname '*.htm' -o -iname '*.css' -o -iname '*.js' -o -iname '*.xml' -o -iname '*.txt' \) -exec gzip -9 -n {} \; -exec mv {}.gz {} \;

# sync all images
aws s3 sync $SITE_FOLDER s3://$BUCKET_NAME/ --exclude '*.*' --expires "'$expire_1yr'" --cache-control 'max-age=6048000' --include '*.jpg' --include '*.jpeg' --content-type 'image/jpeg'
aws s3 sync $SITE_FOLDER s3://$BUCKET_NAME/ --exclude '*.*' --expires "'$expire_1yr'" --cache-control 'max-age=6048000' --include '*.ico' --content-type 'image/x-icon'
aws s3 sync $SITE_FOLDER s3://$BUCKET_NAME/ --exclude '*.*' --expires "'$expire_1yr'" --cache-control 'max-age=6048000' --include '*.png' --content-type 'image/png'

# sync all css
aws s3 sync $SITE_FOLDER s3://$BUCKET_NAME/ --exclude '*.*' --content-encoding 'gzip' --cache-control 'max-age=6048000, must-revalidate' --include '*.css' --content-type 'text/css; charset=UTF-8'

# snyc all javascript
aws s3 sync $SITE_FOLDER s3://$BUCKET_NAME/ --exclude '*.*' --content-encoding 'gzip' --cache-control 'max-age=6048000' --include '*.js' --content-type 'application/javascript; charset=UTF-8'

# sync feed xml
aws s3 sync $SITE_FOLDER s3://$BUCKET_NAME/ --exclude '*.*' --content-encoding 'gzip' --cache-control 'max-age=7200, must-revalidate' --include '*feed.xml' --content-type 'application/rss+xml; charset=UTF-8'

# sync sitemap
aws s3 sync $SITE_FOLDER s3://$BUCKET_NAME/ --exclude '*.*' --content-encoding 'gzip' --cache-control 'max-age=7200, must-revalidate' --include '*sitemap.xml' --content-type 'application/xml; charset=UTF-8'

# snyc html
aws s3 sync $SITE_FOLDER s3://$BUCKET_NAME/ --exclude '*.*' --content-encoding 'gzip' --cache-control 'max-age=7200, must-revalidate' --include '*.html' --include '*.htm' --content-type 'text/html; charset=UTF-8'

# snyc txt
aws s3 sync $SITE_FOLDER s3://$BUCKET_NAME/ --exclude '*.*' --content-encoding 'gzip' --cache-control 'max-age=86400' --include '*.txt' --content-type 'text/plain; charset=UTF-8'

# sync rest and delete unused elements
aws s3 sync $SITE_FOLDER s3://$BUCKET_NAME/ --delete

invalidation_batch_param="'{\"Paths\": {\"Quantity\": 1,\"Items\": [\"/*\"]},\"CallerReference\": \"$TIMESTAMP\"}'"
invalidation_cmd="aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --invalidation-batch $invalidation_batch_param"
eval $invalidation_cmd
