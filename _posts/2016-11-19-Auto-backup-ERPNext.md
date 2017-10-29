---
layout: post
title: Auto backup ERPNext DB and public files to AWS S3
image: /images/erpnext-logo-copy.png
---

#### ERPNext
[ERPNext](https://erpnext.com/) is a fast growing open source ERP platform, which's pretty easy to use or setup. With a clear modularized architect, the underlaying app development platform of ERPNext (called Frappe) allows developer to quickly add new features to ERPNext, or even stand-alone applications. In general, it's a pretty good platform.

Have been developed with ERPNext for over a year, I have deployed several projects with it. One thing I've noted is because the development has gone too fast, their documentation sometimes cannot keep up with it. So I will try to write share of my experiences here to fill the gap. 

#### Back up ERPNext to AWS S3
ERPnext from version 5.x.x (current version is 7.2) already have very simple command to handle backup. It's just that everything is still stored on the same server. So if some thing happens to it, there is no way to access the backups anyway. Hence, it's safer to save the DB and files somewhere else for extra  redundancy.

##### Step 1: Download and install AWS
Assuming that you have already set up a AWS account, this step is simple just following AWS's instruction [here](http://docs.aws.amazon.com/cli/latest/userguide/installing.html#install-bundle-other-os). TLDR; on Ubuntu, you can use these commands (Python 2.6.5+ or Python 3 version 3.3+ required):
    
{% highlight perl %}
curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"
unzip awscli-bundle.zip
sudo ./awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws
{% endhighlight %}  


##### Step 2: Create AWS IAM and Assign permissions
Assuming you have had an AWS account, go to the [IAM Management Console](https://console.aws.amazon.com/iam/home) and create a new IAM user, specifically for backing up. The process is quite straight forward, so just a small reminder to:  

1. On step 2, add S3 Full Access permission so that the user can access S3  ![](/images/IAM2.png)

2. On last step, remember to copy or store the user's credential somewhere because we will need those later ![](/images/IAM3.png)

##### Step 3: Configure AWS cli on server
Next we follow the simple configuration [guide](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html#cli-quick-configuration) from AWS to setup the AWS CLI with the above credentials (take note about your current zone as well. For example: Singapore is "ap-southeast-1").

{% highlight shell %}
$ aws configure
AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Default region name [None]: us-west-2
Default output format [None]: json
{% endhighlight %}

##### Step 4: Add a bucket on S3 for your ERPNext
From [S3 console](https://console.aws.amazon.com/s3/home) home, create a new bucket for your ERPNext. 
![](/images/S3-create-bucket.png)

##### Step 5: Add script to backup and upload to S3
The short script below will call the backup command from **ERPNext's** `bench` and extract those file names and upload to a folder based on the timestamp of the execution. Save this as `/home/frappe/frappe-bench/backup.sh`. Remember to replace `yourbucket` with the actual name of your bucket created above.

```
#!/bin/bash

# Get both DB and files backups
echo "========== Start backing up to AWS =========="
p=$(/usr/local/bin/bench backup --with-files |rev | cut -d' ' -f 1 | rev)
read db files<<<$(echo $p | cut -d' ' -f 1,2)

# Folder name by date and time
folder=$(date +%d%m%Y_%H%M%S | sed 's/\(:[0-9][0-9]\)[0-9]*$/\1/')
echo "New S3 backup folder: $folder. DB file:  $db. Zip file: $files" 

# Upload files
/usr/local/bin/aws s3 mv $db s3://yourbucket/$folder/ && /usr/local/bin/aws s3 mv $files s3://yourbucket/$folder/
```
To test the script, run `bash backup.sh`. If it succeeds, you should see something similar to this: 

{% highlight perl %}
========== Start backing up to AWS ==========
New S3 backup folder: 19112016_121501. DB file:  /home/frappe/frappe-bench/sites/site1.local/private/backups/20161119_4499102_database.sql.gz. Zip file: /home/frappe/frappe-bench/sites/site1.local/private/backups/20161119_4499102_files.tar
move: sites/site1.local/private/backups/20161119_4499102_database.sql.gz to s3://yourbucket/19112016_121501/20161119_4499102_database.sql.gz
move: sites/site1.local/private/backups/20161119_4499102_files.tar to s3://yourbucket/19112016_121501/20161119_4499102_files.tar
{% endhighlight %}

And on S3, your file will appear as follow:
![](/images/S3-upload.png)


##### Step 6: Add crontab to automate the backing up
Once the script is working properly, the last step is to set up the cron service to do this automatically. Edit the crontab by `crontab -e`. You will see the default backup by ERPNext:

{% highlight perl %}
0 */6 * * *  cd /home/frappe/frappe-bench && /usr/local/bin/bench --site all backup >> /home/frappe/frappe-bench/logs/backup.log$
{% endhighlight %}

Add this line to execute the backup command everyday at **00:00 AM**. To customize the frequency of backup, please refer to crontab's documentation
{% highlight perl %}
0 0 * * * /bin/bash /home/frappe/frappe-bench/backup.sh >> /home/frappe/frappe-bench/logs/aws-backup.log 2>&1
{% endhighlight %}

Then restart the cron service with root access
{% highlight perl %}
[frappe] sudo service cron restart
cron stop/waiting
cron start/running, process 5998
{% endhighlight %}
Voila, you got the ERPNext's files automatically backed up to AWS S3 everyday. This helps reduce the risk of losing important data on ERPNext server, especially in case the server is damaged.`
