---
layout: post
title: Restoring 2 million objects from AWS S3 Glacier
author: richard_harper
---

![AWS Glacier!]({{ "/images/restore-glacier.png" }})

These days managing artefact lifecycles in AWS cloud mainly comprises of applying the correct policy for the objects in question, this results in server instances (using [AWS lifecycle Manager](https://aws.amazon.com/about-aws/whats-new/2018/07/introducing-amazon-data-lifecycle-manager-for-ebs-snapshots/) ) and S3 objects (using [S3 lifecycle rules](https://docs.aws.amazon.com/AmazonS3/latest/dev/object-lifecycle-mgmt.html)) being autonomously backed up and retained for a configurable period of time.

This is great for:

* DR (disaster recovery) strategies such as backup & restore
* Retention (VPC flow logs to S3)
* Security audit compliance (AWS Cloud trail logs to S3).

However, most of these strategies result in huge volumes of S3 capacity being consumed, this leads most organisations to choose to push objects into cheaper storage such as AWS S3 Glacier.

>“Hey, so we can keep them in AWS Glacier for as long as GDPR will let us and then delete them using an AWS S3 lifecycle rule.”

Sounds great, and it is. The cost of storage in AWS Glacier is significantly lower than AWS S3. The lifecycle rules are simple to setup and result in a self maintaining solution; however,  have you ever tried to get access to an object in AWS Glacier? It’s not quite as straightforward as putting them in.

# What are we restoring?

It sounds obvious, but knowing which objects you need to restore is the first step. With a small list this isn't a problem – you can browse the S3 Buckets to find the objects in question (via the AWS Web Console) and restore them with a few choice clicks in the GUI (well you can make a restore-request but more about that later).

But what if you need to restore hundreds of objects (or in my case millions of objects)? This manual approach isn't going to be feasible  –  we need a programmatic approach.

In this case the simplest approach was to use the AWS CLI tool (command-line interface) in a bash shell.

```bash
aws s3api list-objects-v2 \
    --bucket bucketname \
    --query "Contents[?StorageClass=='GLACIER']" \
    --output text \
| awk '{print $2}' > glacier-restore-object list.txt
```

The above AWS CLI command pulls an entire S3 bucket contents that has transitioned into Glacier and outputs the object’s fully qualified path to a text file (glacier-restore-object list.txt).

At this point you could modify the above script and re-add further filtration to reduce the object list to match your requirements. However, my requirements were to retrieve everything in Glacier from that bucket.

# Restoring the objects

When AWS transitions objects to Glacier from S3 they switch into a state where you can only see the objects details and not the content. To get them back in a state where you can access the object again you have to submit a restoration request for each object.

```bash
aws s3api restore-object  \
    --restore-request '{ \
        "Days" : 7, \
        "GlacierJobParameters" : {"Tier":"Bulk"} \
    }' \
    --bucket bucketname \
    --key "objectname"
```

The above AWS CLI command is an example restoration request for a single AWS Glacier stored object. There are two additional parameters beside the location (S3 bucket & object):

* The number of days the object will be restored and made available for
* The tier switch that sets the restoration type.

AWS has three different tiers when making restoration requests:

* **Expedited** – expedited retrievals are typically made available within 1–5 hours (dependant upon provisioned capacity).
* **Standard** – standard retrievals typically complete within 3–5 hours [DEFAULT].
* **Bulk** – bulk retrievals typically complete within 5–12 hours.

Up-to-date Glacier retrieval request and retrieval pricing can be found [here](https://aws.amazon.com/glacier/pricing/).

# Requesting restoration (2 million times!)

Great, a simple bash script should get these restored:

```bash
for x in `glacier-restore-object list.txt`
 do
   echo "Begin restoring $x" 
   aws s3api restore-object \
    --restore-request Days=7 \
    --bucket bucketname \
    --key "$x" \
   echo "Done restoring $x"
 Done
```

Only if I wanted to wait weeks for it to run…

After a brief trip around the internet I found I wasn't the only person ever to have attempted to retrieve many files from AWS Glacier. Most people recommended using the open source python tool called [s3cmd](https://github.com/s3tools/s3cmd).

Simplicity itself; the bash command just requires the root S3 bucket/path and all child objects should be restored.

```bash
s3cmd restore \
    --recursive s3://bucketname \
    --restore-priority=bulk \
    --restore-days=7
```

If I have infinite RAM, this would have been great but apparently 32Gb wasn't enough.

Okay, back to the AWS CLI but it looks like a multi-threaded approach is required if we want to get this done within a reasonable timescale.

I created a Glacier directory locally with a structure as so:

```bash
glacier
glacier/bucketname/
glacier/glacier-restore-object list.txt
glacier/main.sh
glacier/sub.sh
```

First we need to split the list of objects to restore into separate files (with 2 million objects, I opted for 2,000 files with 1,000 objects in each).

```bash
cd glacier/bucketname
split -l 1000 ../glacier-restore-object list.txt
```

I’ll need a command to call a sub command for each of the 2,000 files containing 1,000 objects in it’s own thread; glacier/main.sh (making executable with chmod +x *.sh)

```bash
for f in x*
do
~glacier/sub.sh $f &
done
```

We will also need a sub command to be invoked for each thread dealing with the 1,000 objects listed; glacier/sub.sh (making executable with chmod +x *.sh)

```bash
while read p; do
  echo 'aws s3api restore-object  --restore-request '{"Days":7,"GlacierJobParameters":{"Tier":"Bulk"}}' --bucket bucketname --key '"$p"
  aws s3api restore-object /
    --restore-request '{ /
        "Days" : 7, /
        "GlacierJobParameters" : {"Tier":"Bulk"} /
    }' /
    --bucket bucketname /
    --key "$p" /
done < ~glacier/bucketname/$1
```

We now start the process from the glacier/bucketname, by executing the main.sh

```bash
cd ~glacier/bucketname
./../main.sh
```

I tried the above script first with the restore command commented out and with only the echo in place to ensure it was going to make the retrieval requests as planned.

# Speeding up the process

I was using a decent laptop with a native shell and copious amount of RAM; however, I didn't want to tie it up for a lengthy period of time, or put my trust in my ISP in maintaining a decent connection.

So I opted to ship the workload out to the local resource (AWS). This would also speed up the request process significantly. By this, I meant that I stood up an AWS EC2 instance to run the bash script on.

I chose to spin up an m5.4xlarge instance (16 vCPU, 64 Gb RAM) running the Amazon Linux OS (with AWS CLI pre installed). This resulted in the restoration requests of 2 million objects taking less than 24 hours. I did, however, utilize the EC2 instance at 100% for the entire duration (efficient with a load-average over 1,400!).

On reflection, I could’ve chosen an instance from the compute family type (c5.4xlarge). As this would have upgraded me from a 2.5 GHz Intel Xeon® Platinum 8175 processor to a 3.0 GHz Intel Xeon Platinum processor this would have completed the task faster.

![The restoration process maxing out the m5.4xlarge instance]({{ "/images/restore-top.png" }})

![The restoration monitored in AWS Cloud Watch!]({{ "/images/restore-cloudwatch.png" }})

# Conclusion

The above process spanned a couple of days and came about via research and trial and error. If I had to do it all again it would be pretty simple – armed with the knowledge I have now.

The golden rule is to have a pre-tested strategy for retrieving your archived data, and understand the complexity and lead-time required to recover your backup data. This will enable you to estimate an accurate RTO (recovery time objective) for DR scenarios.
