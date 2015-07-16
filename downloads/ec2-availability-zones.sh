#!/bin/bash

all_regions=$(aws ec2 describe-regions --output text --query 'Regions[*].[RegionName]' | sort)
all_az=()

while read -r region; do
  az_per_region=$(aws ec2 describe-availability-zones --region $region --query 'AvailabilityZones[*].[ZoneName]' --output text | sort)

  while read -r az; do
    all_az+=($az)
    echo $az
  done <<< "$az_per_region"
done <<< "$all_regions"

echo "-----"
num_regions=$(echo "$all_regions" | wc -l)
echo "found ${#all_az[@]} availability zones in $num_regions regions"
