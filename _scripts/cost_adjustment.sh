#!/bin/bash

# BEGIN: change values
AWS_ID=913654XXXXXX
BILLING_BUCKET="billing.aws-blog.io"
PROFILE="aws-blog.io"
# END:

# maximum decrease or increase ratio
MAX_ADJUSTMENT=5

# result storage
costs=(0.0 0.0)

# create temp dir as working dir
dir=`mktemp -d -t "billing-alert-adjustment.XXXXXX"` && cd $dir

# function definitions
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


# get the current alarm values
current_threshold=`aws cloudwatch describe-alarms --output json --query "MetricAlarms[?MetricName=='EstimatedCharges'].[Threshold][0][0]" --region us-east-1 --profile $PROFILE | cut -f1 -d"."`
alarm_name=`aws cloudwatch describe-alarms --output json --query "MetricAlarms[?MetricName=='EstimatedCharges'].[AlarmName][0][0]" --region us-east-1 --profile $PROFILE`
statistic=`aws cloudwatch describe-alarms --output json --query "MetricAlarms[?MetricName=='EstimatedCharges'].[Statistic][0][0]" --region us-east-1 --profile $PROFILE | sed -r 's/["]+//g'`
period=`aws cloudwatch describe-alarms --output json --query "MetricAlarms[?MetricName=='EstimatedCharges'].[Period][0][0]" --region us-east-1 --profile $PROFILE`
evaluation_periods=`aws cloudwatch describe-alarms --output json --query "MetricAlarms[?MetricName=='EstimatedCharges'].[EvaluationPeriods][0][0]" --region us-east-1 --profile $PROFILE`
comparison_operator=`aws cloudwatch describe-alarms --output json --query "MetricAlarms[?MetricName=='EstimatedCharges'].[ComparisonOperator][0][0]" --region us-east-1 --profile $PROFILE | sed -r 's/["]+//g'`
alarm_actions=`aws cloudwatch describe-alarms --output json --query "MetricAlarms[?MetricName=='EstimatedCharges'].[AlarmActions][0][0]" --region us-east-1 --profile $PROFILE`

total_costs 1
total_costs 2

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

echo "Current Threshold: $current_threshold"

# adjust threshold
`aws cloudwatch delete-alarms --alarm-name $alarm_name --region us-east-1 --profile $PROFILE`
`aws cloudwatch put-metric-alarm --region us-east-1 --alarm-name "$alarm_name" --metric-name EstimatedCharges --namespace "AWS/Billing" --statistic $statistic --period $period --evaluation-periods $evaluation_periods --threshold $new_threshold --comparison-operator $comparison_operator --alarm-actions "$alarm_actions" --dimensions Name=Currency,Value=USD --region us-east-1 --profile $PROFILE`

echo "New Threshold: $new_threshold"

# clean up
unset total_costs
cd .. && rm -rf $dir
