---
layout: post
title: Availability of EC2 Instance Types
tags: [ec2]
---

One of my favourite services of [AWS](http://aws.amazon.com){:target="_blank"} is definitely [EC2](http://aws.amazon.com/ec2/){:target="_blank"} or [Elastic Compute Cloud](http://aws.amazon.com/ec2/){:target="_blank"}. It's a service, which let's you run your own instances. An instance serves as a virtual server and can get provisioned for any needed task. However, not all Availability Zones or even Regions provide the same subset of Instance Types. Furthermore, the availability of certain Regions depend on your account's details.

In this post I will show you, how to find out about the available Instance Types for your specific AWS-account.

## Instance Types

Instance Types define the provided hardware and resources of an instance. Some do have more CPU-availability, others are e.g. RAM- or GPU-resources optimized. The Instance Type name already contains a lot of information concerning the resources. Let's have a look at the Instance Type name **c3.4xlarge**. The **c** stands for a CPU-optimized instance, the **3** is the revision of that type, the **4** means 4 separate CPUs and the **xlarge** for this Instance Type stands for a quad core.

A complete list and examplary use cases can be found at the [AWS EC2 Instance Type page](http://aws.amazon.com/ec2/instance-types/){:target="_blank"}.

## List all Availability Zones
In order to get an overview of all usable Availability Zones, I wrote a small Bash script, which can be found [here](https://github.com/fschaeffler/aws-blog.io/blob/master/downloads/ec2-availability-zones.sh){:target="_blank"}. This script first gets all usable Regions and then each Availability Zone per Region.

{% highlight bash %}
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
{% endhighlight %}

My AWS-account is for a single person based in Germany. With this account-details I get the following Availability Zones.

**NOTE:** In order to get a complete list of Availability Zones, please run the previously mentioned bash-script and post the output as a comment.

{% highlight bash %}
ap-northeast-1a
ap-northeast-1b
ap-northeast-1c
ap-southeast-1a
ap-southeast-1b
ap-southeast-2a
ap-southeast-2b
eu-central-1a
eu-central-1b
eu-west-1a
eu-west-1b
eu-west-1c
sa-east-1a
sa-east-1b
sa-east-1c
us-east-1a
us-east-1c
us-east-1d
us-east-1e
us-west-1a
us-west-1b
us-west-2a
us-west-2b
us-west-2c
-----
found 24 availability zones in 9 regions
{% endhighlight %}

## List all Instance Types per Availability Zone

For better infrastructure planning, it's important to get to know about available Instance Types per Availabity Zone for your AWS-account. You can find a small Bash script [here](https://github.com/fschaeffler/aws-blog.io/blob/master/downloads/ec2-instance-types.sh){:target="_blank"}, which will help you doing so. This script will go through each Availability Zone and retriev the list of available Instance Types. As mentioned before, my AWS-account is for a single person, who is Germany-based. The results for my AWS-account can be found in this [CSV-file](/downloads/ec2-instance-types.csv){:target="_blank"}.

**NOTE:** the script might run for several minutes depending on your uplink speed. However, there is a status being displayed for each Availability Zone request.

{% highlight bash %}
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
    echo "$region;$az;$instance_type" >> instance-types.csv
  done <<< "$instance_types"

  counter=$((counter+1))
done
{% endhighlight %}

The script above writes all its results to the file **ec-instance-types.csv**. The results for my AWS-account look like as stated below.
{% highlight bash %}
$ head -n 30 ec2-instance-types.csv 
ap-northeast-1;ap-northeast-1a;c1.medium
ap-northeast-1;ap-northeast-1a;c1.xlarge
ap-northeast-1;ap-northeast-1a;c3.2xlarge
ap-northeast-1;ap-northeast-1a;c3.4xlarge
ap-northeast-1;ap-northeast-1a;c3.8xlarge
ap-northeast-1;ap-northeast-1a;c3.large
ap-northeast-1;ap-northeast-1a;c3.xlarge
ap-northeast-1;ap-northeast-1a;c4.2xlarge
ap-northeast-1;ap-northeast-1a;c4.4xlarge
ap-northeast-1;ap-northeast-1a;c4.8xlarge
ap-northeast-1;ap-northeast-1a;c4.large
ap-northeast-1;ap-northeast-1a;c4.xlarge
ap-northeast-1;ap-northeast-1a;cc2.8xlarge
ap-northeast-1;ap-northeast-1a;cr1.8xlarge
ap-northeast-1;ap-northeast-1a;d2.2xlarge
ap-northeast-1;ap-northeast-1a;d2.4xlarge
ap-northeast-1;ap-northeast-1a;d2.8xlarge
ap-northeast-1;ap-northeast-1a;d2.xlarge
ap-northeast-1;ap-northeast-1a;g2.2xlarge
ap-northeast-1;ap-northeast-1a;g2.8xlarge
ap-northeast-1;ap-northeast-1a;hi1.4xlarge
ap-northeast-1;ap-northeast-1a;hs1.8xlarge
ap-northeast-1;ap-northeast-1a;i2.2xlarge
ap-northeast-1;ap-northeast-1a;i2.4xlarge
ap-northeast-1;ap-northeast-1a;i2.8xlarge
ap-northeast-1;ap-northeast-1a;i2.xlarge
ap-northeast-1;ap-northeast-1a;m1.large
ap-northeast-1;ap-northeast-1a;m1.medium
ap-northeast-1;ap-northeast-1a;m1.small
ap-northeast-1;ap-northeast-1a;m1.xlarge
...
{% endhighlight %}

## Conclusion
For my AWS-account, I can use

- 9 Regions
- 24 Availability Zones
- 53 different Instance Types

The Instance Types distribute over certain Regions as follows.

![EC2 Instance Types](/images/ec2-instance-types.png){:class='centered'}
