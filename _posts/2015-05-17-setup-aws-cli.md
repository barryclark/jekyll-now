---
layout: post
title: Setup aws-cli
tags: [cli, iam]
---

The aws-cli is a neat and handy command line tool with which the management of AWS-services is way more faster. Therefore, this blog focuses on the usage of aws-cli. Within in this post, I'll explain to you how to setup the aws-cli.

## Free Tier program
New customers of AWS have the possibility of testing some services for 12 month. Amazon calls this [Free Tier](http://aws.amazon.com/free/){:target="_blank"}. This gratis package includes among others following services and is instantly added to a new AWS-account.

|---
| Service | Included
|-|-
| EC2 | 750 hours t2.micro-instances
|---
| S3 | 5 GB storage
| | 20.000 GET-operations
| | 2.000 PUT-operations
|---
| CloudFront | 20 GB outgoing traffic
| | 2.000.000 HTTP(S)-requests
|---
| SES | 62.000 sent emails
|---
| ... |
|===
| **Worth** | **$1.810 USD** ([stored cost calculation](http://calculator.s3.amazonaws.com/index.html#r=GRU&key=calc-D5B6D34C-7767-42F6-9DB8-D4A2A2EFFE49){:target="_blank"})

**NOTE:** There is a tool called [AWS Simple Monthly Calculator](http://calculator.s3.amazonaws.com/){:target="_blank"}. The purpose of this web-application is to give you an estimation of what your monthly prices according to the used services will be.

## Create an AWS-account
Before we can begin setting up aws-cli, you need to have an AWS-account. If you already have an account you can skip the next three steps.

1. Go to the [AWS-startpage](http://aws.amazon.com/){:target="_blank"} and click on the Register-button on the top right
2. Select "I am a new customer" and enter a valid email-address
3. On the following screens, just enter your personal data as requested. You also might get asked for your credit card details, so keep them at hand during the registration process.

## Create a sub-account
1. Login to the AWS Management Console with your root-account, which you just created before.
2. Go to the AWS-service IAM from the service group "Administration & Security"
3. Select "Users" in the menu on the left side
4. Click on "Create New Users"
5. Enter a User Name and ensure that "Generate an access key for each user" is enabled
6. Download the created credentials. **This is the only time you'll be able to download the credentials.** Store the credentials at a save place. If you loose that credentials, you can't retrieve the password anymore. Only a reset is possible afterwards.

## Install aws-cli

### For Ubuntu / Debian-based OS
The aws-cli is installed via python-pip. Therefore, you first need to install pip, which is a plugin-/package-manager for the python runtime-enviroment.

{% highlight bash %}
flo@thinkie:~$ sudo apt-get install -y python-pip
flo@thinkie:~$ sudo pip install awscli
{% endhighlight %}

### For Windows
Download and install the MSI-installation file

* [AWS CLI MSI (64-bit)](https://s3.amazonaws.com/aws-cli/AWSCLI64.msi)
* [AWS CLI MSI (32-bit)](https://s3.amazonaws.com/aws-cli/AWSCLI32.msi)

### Configure aws-cli
In the next step, you will configure aws-cli for its usage with the AWS-services. Therefore, you need the credentials from the previously created sub-account. Open the downloaded credentials.csv and use the **Access Key Id** and **Secret Access Key** for the following configuration.

Concerning the default region, use the one, which suits you best. The list for the regions is as follows.

|---
| Region Name | City
|---
| us-east-1 | North Virgina, USA
|---
us-west-2 | Oregon, USA
|---
us-west-1 | North California, USA
|---
eu-west-1 | Dublin, Ireland
|---
eu-central-1 | Frankfurt, Germany
|---
ap-southeast-1 | Singapore
|---
ap-northeast-1 | Tokyo, Japan
|---
ap-southeast-2 | Sydney, Australia
|---
sa-east-1 | São Paulo, Brasil

**NOTE:** Keep in mind that not every regions is offering all AWS-services. The region with the most offered services is probablly **us-east-1**. A complete list of available services per region can be found [here](http://docs.aws.amazon.com/general/latest/gr/rande.html){:target="_blank"}. Furthermore, the prices and privacy agreements can differ from region to region.

{% highlight bash %}
flo@thinkie:~$ aws configure
AWS Access Key ID []: <Access Key Id>
AWS Secret Access Key []: <Secret Access Key>
Default region name []: <eu-central-1>
Default output format []: text
{% endhighlight %}

### aws-cli profiles
In case you have to manage different accounts or applications simultaneously, there's the possiblity to setup different aws-cli profiles. In order to e.g. configure a separat profile, just append **--profile** to the configuration command.

{% highlight bash %}
flo@thinkie:~$ aws configure --profile aws-blog.io
{% endhighlight %}

Whenever you want to run aws-cli commands with a certain profile, just append **--profile** to the command.

{% highlight bash %}
flo@thinkie:~$ aws s3 ls --profile aws-blog.io
{% endhighlight %}
