---
layout: memory
title: SCP to prevent creating open Lambda URLs
---

Prevent people from creating open Lambda URLs and stop possible Data Leakgage or other nasty things 

Source: 
* [here](https://twitter.com/ben11kehoe/status/1511857782298882050/photo/1)
* [AWS Docs](https://docs.aws.amazon.com/lambda/latest/dg/urls-auth.html)


```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Deny",
            "Action": [
                "lambda:CreateFunctionUrlConfig",
                "lambda:UpdateFunctionUrlConfig"
            ],
            "Resource": "arn:aws:lambda:*:*:function:*",
            "Condition": {
                "StringNotEquals": {
                    "lambda:FunctionUrlAuthType": "AWS_IAM"
                }
            }
        }
    ]
}
```

SCP that allowerd an admin to tag functions in a way that would unlock AuthType NONE:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Deny",
            "Action": [
                "lambda:CreateFunctionUrlConfig",
                "lambda:UpdateFunctionUrlConfig"
            ],
            "Resource": "arn:aws:lambda:*:*:function:*",
            "Condition": {
                "StringNotEquals": {
                    "lambda:FunctionUrlAuthType": "AWS_IAM"
                }
            }
        },
        {
            "Effect": "Deny",
            "Action": [
                "lambda:TagResource"
            ],
            "Resource": "arn:aws:lambda:*:*:function:*",
            "Condition": {
                "StringEquals": {
                    "aws:RequestTag/AllowOpenUrl": "true"
                },
                "ArnNotEquals": {
                    "aws:PrincipalArn": "arn:aws:iam::*:role/Admin"
                }
            }
        }
    ]
}
```
