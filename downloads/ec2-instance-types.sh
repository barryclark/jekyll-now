#!/bin/bash

echo "Getting list of Availability Zones"
all_regions=$(aws ec2 describe-regions --output text --query 'Regions[*].[RegionName]' | sort)
all_az=()

while read -r region; do
  az_per_region=$(aws ec2 describe-availability-zones --region $region --query 'AvailabilityZones[*].[ZoneName]' --output text | sort)

  while read -r az; do
    all_az+=($az)
  done <<< "$az_per_region"
done <<< "$all_regions"

counter=1
num_az=${#all_az[@]}

for az in "${all_az[@]}"
do
  echo "Checking Availability Zone $az ($counter/$num_az)"

  region=$(echo $az | rev | cut -c 2- | rev)
  instance_types=$(aws ec2 describe-reserved-instances-offerings --query "ReservedInstancesOfferings[?AvailabilityZone=='$az'] [InstanceType]" --output text --region $region | sort -u)

  while read -r instance_type; do
    echo "$region;$az;$instance_type" >> ec2-instance-types.csv
  done <<< "$instance_types"

  counter=$((counter+1))
done
