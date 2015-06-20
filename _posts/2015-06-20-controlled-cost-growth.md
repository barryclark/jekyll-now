---
layout: post
title: Controlled Cost Growth
tags: [cloud-watch, s3]
---

As your business or customer base increases, also the costs for the used [AWS-services](http://aws.amazon.com/products){:target="_blank"} grow. This should happen within certain healthy boundries. Therefore you need a mechanism for controlling the growth-rate of your monthly costs. The [AWS-services](http://aws.amazon.com/products){:target="_blank"} Billing & Cost Management gives you the possibility to keep an eye on your costs, but that is limited to static values. Fortunately, you can export your monthly bill to a [S3](http://aws.amazon.com/s3/){:target="_blank"}-bucket, parse the CSV-report and adjust your cost alert limits accordingly.

**NOTE:** There's already a blog-post [here](/2015/cost-control/) on how to setup billing alerts with static values. It's essential for this post to have everything already configured as described.

## Enable reporting to a S3-bucket

First you need to create a [S3](http://aws.amazon.com/s3/){:target="_blank"}-bucket and adjust the bucket-policy, in order for the reporting to work properly. With the following commands you can create a [S3](http://aws.amazon.com/s3/){:target="_blank"}-bucket called billing.aws-blog.io and set the needed access rights for it.

{% highlight bash %}
$ aws s3 mb s3://reporting.aws-blog.io
$ vi reporting.aws-blog.io.policy
{% endhighlight %}

Copy and past the above bucket policy to reporting.aws-blog.io.policy and edit it to fit your environment. The mentioned Principal ARNs are not mine, but global AWS-specific ones, so don't changed them.

{% highlight json %}
{
	"Version": "2008-10-17",
	"Id": "Policy1335892530063",
	"Statement": [
		{
			"Sid": "Stmt1335892150622",
			"Effect": "Allow",
			"Principal": {
				"AWS": "arn:aws:iam::386209384616:root"
			},
			"Action": [
				"s3:GetBucketAcl",
				"s3:GetBucketPolicy"
			],
			"Resource": "arn:aws:s3:::billing.aws-blog.io"
		},
		{
			"Sid": "Stmt1335892526596",
			"Effect": "Allow",
			"Principal": {
				"AWS": "arn:aws:iam::386209384616:root"
			},
			"Action": "s3:PutObject",
			"Resource": "arn:aws:s3:::billing.aws-blog.io/*"
		}
	]
}
{% endhighlight %}

The only thing missing for the [S3](http://aws.amazon.com/s3/){:target="_blank"}-bucket is to apply the bucket-policy reporting.aws-blog.io.policy to it. This can get achieved with the following statement.

{% highlight bash %}
$ aws s3api put-bucket-policy --bucket reporting.aws-blog.io --policy file://reporting.aws-blog.io.policy
$ rm reporting.aws-blog.io.policy
{% endhighlight %}


The next step is one of the few tasks that need to be done within the [Management Console](https://console.aws.amazon.com){:target="_blank"}. Login and navigate to **Billing & Cost Management**. The link to it is shown in a sub-menu, when you click on your name on the top right. Select **Preferences** on the left side. In the field **Save to S3 Bucket** enter the bucket-name **reporting.aws-blog.io** and press **Verify**. This will trigger an validation-check, where an AWS-service tries to write a file called **aws-programmatic-access-test-object** to the [S3](http://aws.amazon.com/s3/){:target="_blank"}-bucket. If the check had been successful, you get a result as shown in the screenshot below.

![Verified S3-Bucket for Reporting](/images/cost-control-s3.png)

## Adjust limits once per month

Alarm limits need to get adjusted every beginning of the month. There will be a CSV-reporting file for an on-going month, but the total costs don't represent a static value, as it's getting increased constantly. This monthly task can be done quite easily by running a cronjob. As I don't want to run in a situation, where reports aren't finished yet, I would execute the monthly task on the 2nd of each month.

### Get required data

There are two values that you need to get a hold of. Those are the **S3-bucket-name** of the reporting (here: billing.aws-blog.io) and your AWS account ID. You can get your AWS account ID, with the following command. You just need to get your API-Key, which is stored in ~/.aws/credentials.

{% highlight bash %}
$ aws iam list-users --profile aws-blog.io --query "Users[?UserId=='XXXXXXXXXXXXXXXXXXXXX'].[Arn][0][0]"
"arn:aws:iam::123456789012:user/XXXXXXXX"
{% endhighlight %}

In the case above, the AWS Account ID is **123456789012**.

### Adjustment script

If you want, you can download the whole script from [here](/downloads/cost_alert_adjustment.sh){:target="_blank"}. I'm totally aware that this script is far from good - especially the part for receiving the current alarm metrics. Sorry for the bad quality of the bash-script.

#### Mandatory settings

{% highlight bash %}
# BEGIN: change values
AWS_ID=XXXXXXXXXXXX
BILLING_BUCKET="billing.aws-blog.io"
PROFILE="default"
# END:
{% endhighlight %}

#### Optional settings

{% highlight bash %}
MAX_ADJUSTMENT=5 
{% endhighlight %}

This value stands for the biggest adjustment to the current alert limit. It's not only for a maximum, but also a minimum as costs can decrease.

#### Get current metric alarm values

If you have more than one metric alarm for the metric **EstimatedCharges**, you need to adjust the next part. Currently, the script just takes the first metric alarm.

{% highlight bash %}
current_threshold=`aws cloudwatch describe-alarms --output json --query "MetricAlarms[?MetricName=='EstimatedCharges'].[Threshold][0][0]" --region us-east-1 --profile $PROFILE | cut -f1 -d"."`
alarm_name=`aws cloudwatch describe-alarms --output json --query "MetricAlarms[?MetricName=='EstimatedCharges'].[AlarmName][0][0]" --region us-east-1 --profile $PROFILE`
statistic=`aws cloudwatch describe-alarms --output json --query "MetricAlarms[?MetricName=='EstimatedCharges'].[Statistic][0][0]" --region us-east-1 --profile $PROFILE | sed -r 's/["]+//g'`
period=`aws cloudwatch describe-alarms --output json --query "MetricAlarms[?MetricName=='EstimatedCharges'].[Period][0][0]" --region us-east-1 --profile $PROFILE`
evaluation_periods=`aws cloudwatch describe-alarms --output json --query "MetricAlarms[?MetricName=='EstimatedCharges'].[EvaluationPeriods][0][0]" --region us-east-1 --profile $PROFILE`
comparison_operator=`aws cloudwatch describe-alarms --output json --query "MetricAlarms[?MetricName=='EstimatedCharges'].[ComparisonOperator][0][0]" --region us-east-1 --profile $PROFILE | sed -r 's/["]+//g'`
alarm_actions=`aws cloudwatch describe-alarms --output json --query "MetricAlarms[?MetricName=='EstimatedCharges'].[AlarmActions][0][0]" --region us-east-1 --profile $PROFILE`
{% endhighlight %}

#### Download last and second-last report

This part of the script is going to fail, when there are not at least two reports available in your [S3](http://aws.amazon.com/s3/){:target="_blank"}-bucket. If you don't have any reports at hand, you need to either fake them or wait for some time. As a pre-version of the current month's report is being generated during the month, you can find out about the format of the report on the next day. The format of my report is currently a CSV-file with 29 columns, whereas the total costs are in the last column in the last row.

{% highlight bash %}
total_costs () {
  go_back_month=$1

  year=`date --date="${go_back_month} months ago" +%Y`
  month=`date --date="${go_back_month} months ago" +%m`

  csv_file="${AWS_ID}-aws-billing-csv-${year}-${month}.csv"

  `aws s3 cp s3://${BILLING_BUCKET}/${csv_file} . --profile $PROFILE > /dev/null 2>&1`

  row=$(cat $csv_file | tail -1 | sed -r 's/["]+//g')
  IFS=',' read -a columns <<< "$row"
  costs_index=$((go_back_month-1))
  costs[$costs_index]=`echo ${columns[-1]} | cut -f1 -d"."`
}

total_costs 1
total_costs 2
{% endhighlight %}

#### Calculate adjustment rate

{% highlight bash %}
adjustment=`bc <<< "scale=2; ${costs[1]} / ${costs[0]} * 100 - 100" | cut -f1 -d"."`
new_threshold=$current_threshold

if [[ $adjustment -gt "0" ]]; then
  if [[ $adjustment -gt $MAX_ADJUSTMENT ]]; then
    new_threshold=$(($current_threshold + ($current_threshold * $MAX_ADJUSTMENT / 100)))
  else
    new_threshold=$(($current_threshold + ($current_threshold * $adjustment / 100)))
  fi
else
  if [[ $adjustment -lt $(($MAX_ADJUSTMENT * -1)) ]]; then
    new_threshold=$(($current_threshold + ($current_threshold * $MAX_ADJUSTMENT / 100 * -1)))
  else
    new_threshold=$(($current_threshold + ($current_threshold * $adjustment / 100)))
  fi
fi
{% endhighlight %}

#### Update current threshold for metric alarm

{% highlight bash %}
echo "Current Threshold: $current_threshold"

# adjust threshold
`aws cloudwatch delete-alarms --alarm-name $alarm_name --region us-east-1 --profile $PROFILE`
`aws cloudwatch put-metric-alarm --region us-east-1 --alarm-name "$alarm_name" --metric-name EstimatedCharges --namespace "AWS/Billing" --statistic $statistic --period $period --evaluation-periods $evaluation_periods --threshold $new_threshold --comparison-operator $comparison_operator --alarm-actions "$alarm_actions" --dimensions Name=Currency,Value=USD --region us-east-1 --profile $PROFILE`

echo "New Threshold: $new_threshold"
{% endhighlight %}


