---
layout: post
title: The magic and logic behind AssumeRole
---

AWS provides the [AssumeRole](https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html) action in STS to temporarily elevate the access of an entity to another role. If you perform such a request against STS you'll receive in the response an access key ID, secret key, and a session token for the specified ARN.

<p align="center">
<img width=300 src="/images/dj_role.gif">
</p>

Beside useful practices the Assume Role functionality can be an excellent vector to escalate privileges or move to other AWS accounts in the organization. The logic and prerequisites to perform Assume Role behaves different either if you are assuming a role in the same account or assuming a role in a different account. So let's discuss both variants

## Variant 1 - Assume Role in the Same Account

To be able to assume a role we must fulfill the following prerequisites:

1. The target role that shell be assumed has a trusted relationship with the entity attempting to assume the role
2. The role attempting to perform the assumption needs the privilege: [sts:AssumeRole](https://docs.aws.amazon.com/cli/latest/reference/sts/assume-role.html)

As you can see, when attempting to assume a role in the same account things are slightly relaxed and the hurdles are low. When assuming a role in the same account, the trust relationship for the target role may be tied to a specific role (via an ARN). In such a case the role doesn't need to have specific AssumeRole privilege. Special attention is needed however, if the trust relationship is tied to the ARN of the account itself. In such a case that role need to have AssumeRole privilege. Let's discuss both cases more deeply:

**Variant**: Trust Relationship with Account - in this case you need AssumeRole privilege on the base role.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::123456789012:root"
      },
      "Action": "sts:AssumeRole",
      "Condition": {}
    }
  ]
}
```

**Variant**: Trust Relationship with Role  - in this case you don't need AssumeRole privilege on the base role. But be aware that having that privilege does not disturb you in any way.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::123456789012:role/specific-role"
      },
      "Action": "sts:AssumeRole",
      "Condition": {}
    }
  ]
}
```

**Wrap it up**:

* When looking for privilege escalation vectors in an AWS account - first watch for roles that explicitly define a role ARN in their Trust Relationship and paths to get there.
* The relaxed requirement around having AssumeRole privileges are useful because in that case the are only reliant on the trust relationship but not on additional privileges.
* Be aware of the different requirements between same and cross account role assumption. Some administrators have the impression that the base role requires AssumeRole privileges. In such a case they may not be aware of the security considerations around this option.

## Variant 2 - Cross Account Access

By assuming a role across multiple accounts the base role is forced to have AssumeRole privileges. It doesn't care if the Trust Relationship specifies an account or a specific role.

### Let's write some Code

<p align="center">
<img width=300 src="/images/yodawgassume.webp">
</p>

With the theory above in mind, let's write some code to assume a role in a different account. To have something we can reuse and also a functionality that bring some benefits we write two classes. The table next will explain it on a high level:

| File                 | Semantics                                              |
| -------------------- | -------------------------------------------------------|
| awsaccountlister.py  | High-level function that creates a Session in you Payer Account (hopefully you have one), get's all account back and required info to assume a role. After that it loops over each account and performs the function that you pass to the super loop |
| shield_ddos_attack_lister.py | Function that gatherers info from AWS Shield about the occurrence of detected DDoS attacks in the past |

Now to the Code and maybe to some Terraform modules to get this beast installed with ease. As you might already have figured out you require AWS Shield as a prerequisite :)

awsaccountlister.py:

```python
import boto3

def get_organizations():
    sts_client = boto3.client('sts')

    sts_response = sts_client.assume_role(
        RoleArn="arn:aws:iam::123456789:role/MyAwesomeAuditViewerRole",
        RoleSessionName="SessionInPayerAccount"
    )

    organizations_account_session = {}
    organizations_account_session["aws_access_key_id"] = sts_response["Credentials"]["AccessKeyId"]
    organizations_account_session["aws_secret_access_key"] = sts_response["Credentials"]["SecretAccessKey"]
    organizations_account_session["aws_session_token"] = sts_response["Credentials"]["SessionToken"]

    return boto3.client("organizations", **organizations_account_session)


def account_super_loop(my_function, organizations_client=None):
    counter = 0
    list_accounts_params = {}

    if organizations_client is None:
        organizations_client = get_organizations()

    while True:
        organizations_response = organizations_client.list_accounts(
            **list_accounts_params)
        for account in organizations_response["Accounts"]:
            counter += 1
            my_function(account)
        try:
            list_accounts_params = {
                "NextToken": organizations_response["NextToken"]}
        except KeyError:
            break

    print("[INFO] Totally found and handled accounts: {0}".format(
        str(counter)))


def check_response(response):
    http_code = response['ResponseMetadata']['HTTPStatusCode']

    if (http_code < 200 or http_code > 399):
        raise AssertionError(
            "Invoke not successfully, received http_code {0}".format(http_code))
```

shield_ddos_attack_lister.py:

```python
import datetime
import awsaccountlister
import boto3

region_name = 'us-east-1'


def lambda_handler(event, context):
    awsaccountlister.account_super_loop(list_ddos_attacks_from_shield)
    return {"statusCode": 200}


def list_ddos_attacks_from_shield(account):
    sts_client_single = boto3.client('sts', region_name=region_name)

    try:
        sts_res = sts_client_single.push_findings(
            RoleArn="arn:aws:iam::{0}:role/MyAwesomeAuditViewerRole".format(
                account['Id']),
            RoleSessionName="SessionInPayerAccount"
        )
    except Exception:
        return

    cred_obj = sts_res['Credentials']

    shield_client = boto3.client(
        'shield',
        aws_access_key_id=cred_obj['AccessKeyId'],
        aws_secret_access_key=cred_obj['SecretAccessKey'],
        aws_session_token=cred_obj['SessionToken'],
        region_name=region_name
    )

    attacks = shield_client.list_attacks(
        StartTime={
            'FromInclusive': datetime.datetime(2015, 1, 1),
            'ToExclusive': datetime.datetime.now()
        },
        EndTime={
            'FromInclusive': datetime.datetime(2015, 1, 1),
            'ToExclusive': datetime.datetime.now()
        },
        MaxResults=123
    )

    print_summary(account, attacks)


def print_summary(account, attacks):
    print("Listing attacks for account: {0} with name: {1}".format(
        account['Id'], account['Name']))
    print('Attack summaries: ' + str(attacks['AttackSummaries']))
    print('#######################################')
```
