# CloudWatch

# Ref:

- App ELB metrics list - [https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-cloudwatch-metrics.html](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-cloudwatch-metrics.html)
- Network ELB metrics list - [https://docs.aws.amazon.com/elasticloadbalancing/latest/network/load-balancer-cloudwatch-metrics.html](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/load-balancer-cloudwatch-metrics.html)
- RDS metrics list - [https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-metrics.html](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-metrics.html)
- Step Function metrics list - [https://docs.aws.amazon.com/step-functions/latest/dg/procedure-cw-metrics.html](https://docs.aws.amazon.com/step-functions/latest/dg/procedure-cw-metrics.html)

# Alarm

Guide to create an alarm for HTTP code 5xx

1. CloudWatch → Alarm
2. Choose from a metric under a namespace, e.g. `HTTPCode_Target_5XX_Count` under `AWS/ApplicationELB` for a specific ALB
3. Select `Statistic` to `Sum`
4. `Period` set to 1 minute
5. Conditions → `Greater` than `0`
6. Notification → alarm trigger if the state is `In alarm` (i.e. meet the condition above)
7. Select / Create a SNS topic

# Send Alarm to Slack (Without lambda)

> Assume you already made an Alarm
> 

We will use AWS ChatBot to do integration with Slack easily

1. Go to IAM → Policy → Create new 
    1. It is used as ****Channel guardrail policies****
    2. Normally we allow the minimum action, put these inside Statements:
    
    ```python
    {
        "Action": [
            "cloudwatch:Describe*",
            "cloudwatch:Get*",
            "cloudwatch:List*"
        ],
        "Effect": "Allow",
        "Resource": "*"
    }
    ```
    
2. AWS ChatBot → create new → slack
    1. You will be prompted to allow AWS to access Slack
3. After creation → `configure Slack Channel`
    1. You can get the `Channel ID` from slack channel
    2. `Permission` → `Channel IAM role`
        1. create a new one, with (default) `Notification permission`
        2. the permission will be like below
        
        ```python
        {
            "Action": [
                "cloudwatch:Describe*",
                "cloudwatch:Get*",
                "cloudwatch:List*"
            ],
            "Effect": "Allow",
            "Resource": "*"
        }
        ```
        
    3. `Channel guardrail policies` → choose the policy we created above
    4. `Notification` → choose the region and Topic (that is created while creating Alarm)