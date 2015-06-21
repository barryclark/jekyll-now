---
layout: post
title: Keeping an eye on the costs
tags: [cloud-watch, sns]
---

The concept of running instances on [AWS](http://aws.amazon.com){:target="_blank"} is different to running a server at some classic hoster. In the beginning, this might be a bit confusing. Therefore, control-triggers concerning your bill are always recommended. Not only during your first hands on [AWS](http://aws.amazon.com){:target="_blank"}, but also for more experienced users. [AWS](http://aws.amazon.com){:target="_blank"}'s mechanism for cost control gives you updates concerning ongoing monthly costs.

## Enable Billing Alerts

The billing alerts is one of the few things that need to get enabled within the [Management Console](https://console.aws.amazon.com){:target="_blank"}. Navigate to **Billing & Cost Management**. The link to it is shown in a sub-menu, when you click on your name on the top right. Select **Preferences** on the left side. On the selected screen you need to enable **Receive Billing Alerts**. Your screen should now look like the following screenshot.

<img src="/images/cost-control.png" width="720" height="433" alt="Recieve Billing Alerts" />

**NOTE:** This setting can't get disabled after being enabled once. However, this service is for free and any notfications can be disabled again.

You can now close the Management Console, as the rest can be done completly with aws-cli.

## Create a SNS-Topic

The AWS-service [SNS](http://aws.amazon.com/sns/){:target="_blank"} stands for Simple Notification Service. It's a push notifications service, which can send messages to different types of endpoints like e.g. email, HTTP or SMS. For this concept, you will need to create a topic and add serveral recipients to the subscribtion-list. With the command below, you can create the topic called **Costs-Too-High**, add the recipient **flo@aws-blog.io** to the subscribers and validate the subscribers with a token, received at the endpoint - here the email-mailbox.

**NOTE:** The [SNS](http://aws.amazon.com/sns/){:target="_blank"}-topic needs to get created in **us-east-1**, so you can connect the billing alert from [CloudWatch](http://aws.amazon.com/cloudwatch/){:target="_blank"} to it properly later on.

{% highlight bash %}
$ aws sns create-topic --name Costs-Too-High --region us-east-1
arn:aws:sns:us-east-1:913654XXXXXX:Costs-Too-High
$ aws sns subscribe --topic-arn arn:aws:sns:us-east-1:913654XXXXXX:Costs-Too-High --protocol email --notification-endpoint flo@aws-blog.io --region us-east-1
$ aws sns confirm-subscription --topic-arn arn:aws:sns:us-east-1:913654XXXXXX:Costs-Too-High --region us-east-1 --token 2336412f...
{% endhighlight %}

In order to retrieve the subscription-token, you need to check your emails. There should be an email with the subject **AWS Notification - Subscription Confirmation**. The message contains a link. Just copy the **token**-parameter from that particular link and use it for the command above. After you have confirmed the subscription, a notification to the topic is sent to **flo@aws-blog.io** via email.

## Setup CloudWatch for Billing Alerts

With the next command, you can create a [CloudWatch](http://aws.amazon.com/cloudwatch/){:target="_blank"}-alarm within the region **us-east-1**, for a situation when your estimated bill is **over $55 USD**. This alarm is called **Estimated Bill Too High** and will trigger the action **arn:aws:sns:us-east-1:913654XXXXXX:Costs-Too-High**, which is the previously created [SNS](http://aws.amazon.com/sns/){:target="_blank"}-topic.

{% highlight bash %}
$ aws cloudwatch put-metric-alarm --region us-east-1 --alarm-name "Estimated Bill Too High" --metric-name EstimatedCharges --namespace AWS/Billing --statistic Maximum --period 21600 --evaluation-periods 1 --threshold 55.0 --comparison-operator GreaterThanThreshold --alarm-actions "arn:aws:sns:us-east-1:913654XXXXXX:Costs-Too-High" --dimensions  Name=Currency,Value=USD 
{% endhighlight %}

## Extensions

Since some time ago, it's possible to store detailed billing statements also in a [S3](http://aws.amazon.com/s3/){:target="_blank"}-bucket. This gives you the possibility to adjust your billing alerts dynamically based on historic data. An use case could be e.g. if you allow your AWS-environment to grow and accept a monthly increase of 5% of costs. For this scenario, you can read and parse your data from your [S3](http://aws.amazon.com/s3/){:target="_blank"}-bucket and adjust your [CloudWatch](http://aws.amazon.com/cloudwatch/){:target="_blank"}-alarms accordingly. 

**#StayTuned**: There soon will be another blog-post on how to implement the described scenario.
