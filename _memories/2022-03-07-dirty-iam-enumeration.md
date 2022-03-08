---
layout: memory
title: Dirty way of IAM enumartion
---

The following code will attempt to enumerate operations that a given set of AWS AccessKeys can perform. A more mature Version of this script can be found [here](https://github.com/andresriancho/enumerate-iam) anyway let's dive in:

## Usage
```
Usage: enumerate-iam.py [OPTIONS]

  IAM Account Enumerator.

  This code provides a mechanism to attempt to validate the permissions
  assigned to a given set of AWS tokens.

Options:
  --access-key TEXT     An AWS Access Key Id to check
  --secret-key TEXT     An AWS Secret Access Key to check
  --session-token TEXT  An AWS Session Token to check
  --help                Show this message and exit.
```

## Example

```
$ python enumerate-iam.py --access-key <KEY> --secret-key <SECRET>
2017-05-06 00:16:05,164 - 5692 - [INFO] Starting scrape for access-key-id "<KEY>"
2017-05-06 00:16:06,107 - 5692 - [ERROR] Failed to get everything at once (get_account_authorization_details) :(
2017-05-06 00:16:06,210 - 5692 - [INFO] -- Account ARN : arn:aws:iam::NNNNNNNNNNN:user/some-other-user
2017-05-06 00:16:06,210 - 5692 - [INFO] -- Account Id  : NNNNNNNNNNN
2017-05-06 00:16:06,210 - 5692 - [INFO] -- Account Path: user/some-other-user
2017-05-06 00:16:06,321 - 5692 - [INFO] User "some-other-user" has 1 attached policies
2017-05-06 00:16:06,321 - 5692 - [INFO] -- Policy "some-policy" (arn:aws:iam::NNNNNNNNNNN:policy/some-policy)
2017-05-06 00:16:06,436 - 5692 - [INFO] User "some-other-user" has 1 inline policies
2017-05-06 00:16:06,436 - 5692 - [INFO] -- Policy "policygen-some-other-user-201705060014"
2017-05-06 00:16:06,543 - 5692 - [INFO] User "some-other-user" has 0 groups associated
2017-05-06 00:16:06,543 - 5692 - [INFO] Attempting common-service describe / list bruteforce.
...
```

```
$ python enumerate-iam.py --access-key <KEY> --secret-key <SECRET>
2017-05-05 23:52:27,194 - 3060 - [INFO] Starting scrape for access-key-id "<KEY>"
2017-05-05 23:52:28,206 - 3060 - [ERROR] Failed to get everything at once (get_account_authorization_details) :(
2017-05-05 23:52:28,293 - 3060 - [ERROR] Failed to retrieve any IAM data for this key.
2017-05-05 23:52:28,293 - 3060 - [INFO] -- Account ARN : arn:aws:iam::NNNNNNNNNNN:user/some-user
2017-05-05 23:52:28,293 - 3060 - [INFO] -- Account Id  : NNNNNNNNNNN
2017-05-05 23:52:28,293 - 3060 - [INFO] -- Account Path: user/some-user
2017-05-05 23:52:28,293 - 3060 - [INFO] Attempting common-service describe / list bruteforce.
2017-05-05 23:52:28,301 - 3060 - [INFO] Checking ACM (Certificate Manager)
2017-05-05 23:52:28,737 - 3060 - [ERROR] -- list_certificates() failed
2017-05-05 23:52:28,762 - 3060 - [INFO] Checking CFN (CloudFormation)
2017-05-05 23:52:29,184 - 3060 - [ERROR] -- describe_stacks() failed
2017-05-05 23:52:29,193 - 3060 - [INFO] Checking CloudHSM
2017-05-05 23:52:29,611 - 3060 - [ERROR] -- list_hsms() failed
2017-05-05 23:52:29,625 - 3060 - [INFO] Checking CloudSearch
2017-05-05 23:52:30,069 - 3060 - [ERROR] -- list_domain_names() failed
2017-05-05 23:52:30,078 - 3060 - [INFO] Checking CloudTrail
2017-05-05 23:52:30,529 - 3060 - [ERROR] -- describe_trails() failed
2017-05-05 23:52:30,536 - 3060 - [INFO] Checking CloudWatch
2017-05-05 23:52:30,926 - 3060 - [ERROR] -- describe_alarm_history() failed
2017-05-05 23:52:30,936 - 3060 - [INFO] Checking CodeCommit
2017-05-05 23:52:31,338 - 3060 - [ERROR] -- list_repositories() failed
2017-05-05 23:52:31,374 - 3060 - [INFO] Checking CodeDeploy
2017-05-05 23:52:31,782 - 3060 - [ERROR] -- list_applications() failed
2017-05-05 23:52:31,881 - 3060 - [ERROR] -- list_deployments() failed
2017-05-05 23:52:31,953 - 3060 - [INFO] Checking EC2 (Elastic Compute)
2017-05-05 23:52:32,345 - 3060 - [ERROR] -- describe_instances() failed
2017-05-05 23:52:32,440 - 3060 - [ERROR] -- describe_images() failed
2017-05-05 23:52:32,539 - 3060 - [ERROR] -- describe_addresses() failed
2017-05-05 23:52:32,630 - 3060 - [ERROR] -- describe_hosts() failed
2017-05-05 23:52:32,721 - 3060 - [ERROR] -- describe_nat_gateways() failed
2017-05-05 23:52:32,819 - 3060 - [ERROR] -- describe_key_pairs() failed
2017-05-05 23:52:32,917 - 3060 - [ERROR] -- describe_snapshots() failed
2017-05-05 23:52:33,013 - 3060 - [ERROR] -- describe_volumes() failed
2017-05-05 23:52:33,111 - 3060 - [ERROR] -- describe_tags() failed
2017-05-05 23:52:33,207 - 3060 - [ERROR] -- describe_tags() failed
2017-05-05 23:52:33,305 - 3060 - [ERROR] -- describe_vpcs() failed
2017-05-05 23:52:33,319 - 3060 - [INFO] Checking ECS (DOCKER DOCKER DOCKER DOCKER ...)
2017-05-05 23:52:33,713 - 3060 - [ERROR] -- describe_clusters() failed
2017-05-05 23:52:33,730 - 3060 - [INFO] Checking ElasticBeanstalk
2017-05-05 23:52:34,167 - 3060 - [INFO] -- describe_applications() worked!
2017-05-05 23:52:34,352 - 3060 - [INFO] -- describe_environments() worked!
2017-05-05 23:52:34,365 - 3060 - [INFO] Checking ELB (Elastic Load Balancing)
2017-05-05 23:52:34,749 - 3060 - [ERROR] -- describe_load_balancers() failed
2017-05-05 23:52:34,763 - 3060 - [INFO] Checking ELBv2 (Elastic Load Balancing)
2017-05-05 23:52:35,135 - 3060 - [ERROR] -- describe_load_balancers() failed
2017-05-05 23:52:35,151 - 3060 - [INFO] Checking ElasticTranscoder
2017-05-05 23:52:35,561 - 3060 - [ERROR] -- list_pipelines() failed
2017-05-05 23:52:35,572 - 3060 - [INFO] Checking DynamoDB
2017-05-05 23:52:35,960 - 3060 - [ERROR] -- list_tables() failed
2017-05-05 23:52:36,003 - 3060 - [INFO] Checking IoT
2017-05-05 23:52:36,217 - 3060 - [ERROR] -- list_things() failed
2017-05-05 23:52:36,331 - 3060 - [ERROR] -- describe_endpoint() failed
2017-05-05 23:52:36,342 - 3060 - [INFO] Checking Kinesis
2017-05-05 23:52:36,733 - 3060 - [ERROR] -- list_streams() failed
2017-05-05 23:52:36,806 - 3060 - [INFO] Checking KMS (Key Management Service)
2017-05-05 23:52:37,229 - 3060 - [ERROR] -- list_keys() failed
2017-05-05 23:52:37,255 - 3060 - [INFO] Checking Lambda
2017-05-05 23:52:37,663 - 3060 - [ERROR] -- list_functions() failed
2017-05-05 23:52:37,701 - 3060 - [INFO] Checking OpsWorks
2017-05-05 23:52:38,197 - 3060 - [INFO] -- describe_stacks() worked!
2017-05-05 23:52:38,252 - 3060 - [INFO] Checking RDS (Relational Database Service)
2017-05-05 23:52:38,726 - 3060 - [ERROR] -- describe_db_clusters() failed
2017-05-05 23:52:38,821 - 3060 - [ERROR] -- describe_db_instances() failed
2017-05-05 23:52:38,858 - 3060 - [INFO] Checking Route53 (DNS)
2017-05-05 23:52:39,250 - 3060 - [ERROR] -- list_hosted_zones() failed
2017-05-05 23:52:39,539 - 3060 - [INFO] Checking S3 (Simple Storage Service)
2017-05-05 23:52:39,928 - 3060 - [ERROR] -- list_buckets() failed
2017-05-05 23:52:39,956 - 3060 - [INFO] Checking SES (Simple Email Service)
2017-05-05 23:52:40,344 - 3060 - [ERROR] -- list_identities() failed
2017-05-05 23:52:40,361 - 3060 - [INFO] Checking SNS (Simple Notification Service)
2017-05-05 23:52:40,750 - 3060 - [ERROR] -- list_topics() failed
2017-05-05 23:52:40,767 - 3060 - [INFO] Checking SQS (Simple Queue Service)
2017-05-05 23:52:41,151 - 3060 - [ERROR] -- list_queues() failed
2017-05-05 23:52:41,171 - 3060 - [INFO] Checking Support
2017-05-05 23:52:41,571 - 3060 - [ERROR] -- describe_cases() failed
```

## Code

```python
"""IAM Account Enumerator.

This code provides a mechanism to attempt to validate the permissions assigned
to a given set of AWS tokens.
"""
import re
import sys
import logging
import datetime
import boto3
import pprint
import botocore
import click


def report_arn(candidate):
    ''' Attempt to extract and slice up an ARN from the input string. '''
    logger = logging.getLogger()
    arn_search = re.search(r'.*(arn:aws:.*:.*:.*:.*)\s*.*$', candidate)
    if arn_search:
        arn = arn_search.group(1)
        logger.info('-- Account ARN : %s', arn)
        logger.info('-- Account Id  : %s', arn.split(':')[4])
        logger.info('-- Account Path: %s', arn.split(':')[5])


# This is lame and won't work with federated policies and a bunch of other cases.
def build_arn(user_arn, policy_name, path='policy'):
    ''' Chops up the user ARN and attempts and builds a policy ARN. '''
    return '{}:{}/{}'.format(':'.join(user_arn.split(':')[0:5]), path, policy_name)


def brute(access_key, secret_key, session_token):
    ''' Attempt to brute-force common describe calls. '''
    logger = logging.getLogger()
    logger.info('Attempting common-service describe / list bruteforce.')

    # ACM
    acm = boto3.client(
        'acm',
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        aws_session_token=session_token
    )
    logger.info('Checking ACM (Certificate Manager)')

    try:
        acm.list_certificates()
        logger.info('-- list_certificates() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- list_certificates() failed')

    # CloudFormation
    cfn = boto3.client(
        'cloudformation',
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        aws_session_token=session_token
    )
    logger.info('Checking CFN (CloudFormation)')

    try:
        cfn.describe_stacks()
        logger.info('-- describe_stacks() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- describe_stacks() failed')

    # CloudHSM
    cloudhsm = boto3.client(
        'cloudhsm',
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        aws_session_token=session_token
    )
    logger.info('Checking CloudHSM')

    try:
        cloudhsm.list_hsms()
        logger.info('-- list_hsms() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- list_hsms() failed')

    # CloudSearch
    cloudsearch = boto3.client(
        'cloudsearch',
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        aws_session_token=session_token
    )
    logger.info('Checking CloudSearch')

    try:
        cloudsearch.list_domain_names()
        logger.info('-- list_domain_names() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- list_domain_names() failed')

    # CloudTrail
    cloudtrail = boto3.client(
        'cloudtrail',
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        aws_session_token=session_token
    )
    logger.info('Checking CloudTrail')

    try:
        cloudtrail.describe_trails()
        logger.info('-- describe_trails() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- describe_trails() failed')

    # CloudWatch
    cloudwatch = boto3.client(
        'cloudwatch',
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        aws_session_token=session_token
    )
    logger.info('Checking CloudWatch')

    try:
        cloudwatch.describe_alarm_history()
        logger.info('-- describe_alarm_history() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- describe_alarm_history() failed')

    # CodeCommit
    codecommit = boto3.client(
        'codecommit',
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        aws_session_token=session_token
    )
    logger.info('Checking CodeCommit')

    try:
        codecommit.list_repositories()
        logger.info('-- list_repositories() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- list_repositories() failed')

    # CodeDeploy
    codedeploy = boto3.client(
        'codedeploy',
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        aws_session_token=session_token
    )
    logger.info('Checking CodeDeploy')

    try:
        codedeploy.list_applications()
        logger.info('-- list_applications() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- list_applications() failed')

    try:
        codedeploy.list_deployments()
        logger.info('-- list_deployments() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- list_deployments() failed')

    # EC2
    ec2 = boto3.client(
        'ec2',
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        aws_session_token=session_token
    )
    logger.info('Checking EC2 (Elastic Compute)')

    try:
        ec2.describe_instances()
        logger.info('-- describe_instances() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- describe_instances() failed')

    try:
        ec2.describe_images()
        logger.info('-- describe_images() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- describe_images() failed')

    try:
        ec2.describe_addresses()
        logger.info('-- describe_addresses() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- describe_addresses() failed')

    try:
        ec2.describe_hosts()
        logger.info('-- describe_hosts() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- describe_hosts() failed')

    try:
        ec2.describe_nat_gateways()
        logger.info('-- describe_nat_gateways() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- describe_nat_gateways() failed')

    try:
        ec2.describe_key_pairs()
        logger.info('-- describe_key_pairs() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- describe_key_pairs() failed')

    try:
        ec2.describe_snapshots()
        logger.info('-- describe_snapshots() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- describe_snapshots() failed')

    try:
        ec2.describe_volumes()
        logger.info('-- describe_volumes() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- describe_volumes() failed')

    try:
        ec2.describe_tags()
        logger.info('-- describe_tags() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- describe_tags() failed')

    try:
        ec2.describe_tags()
        logger.info('-- describe_tags() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- describe_tags() failed')

    try:
        ec2.describe_vpcs()
        logger.info('-- describe_vpcs() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- describe_vpcs() failed')

    # ECS
    ecs = boto3.client(
        'ecs',
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        aws_session_token=session_token
    )
    logger.info('Checking ECS (DOCKER DOCKER DOCKER DOCKER ...)')

    try:
        ecs.describe_clusters()
        logger.info('-- describe_clusters() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- describe_clusters() failed')

    # Elastic Beanstalk
    beanstalk = boto3.client(
        'elasticbeanstalk',
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        aws_session_token=session_token
    )
    logger.info('Checking ElasticBeanstalk')

    try:
        beanstalk.describe_applications()
        logger.info('-- describe_applications() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- describe_applications() failed')

    try:
        beanstalk.describe_environments()
        logger.info('-- describe_environments() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- describe_environments() failed')

    # ELB
    elb = boto3.client(
        'elb',
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        aws_session_token=session_token
    )
    logger.info('Checking ELB (Elastic Load Balancing)')

    try:
        elb.describe_load_balancers()
        logger.info('-- describe_load_balancers() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- describe_load_balancers() failed')

    # ELBv2
    elbv2 = boto3.client(
        'elbv2',
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        aws_session_token=session_token
    )
    logger.info('Checking ELBv2 (Elastic Load Balancing)')

    try:
        elbv2.describe_load_balancers()
        logger.info('-- describe_load_balancers() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- describe_load_balancers() failed')

    # ElasticTranscoder
    elastictranscoder = boto3.client(
        'elastictranscoder',
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        aws_session_token=session_token
    )
    logger.info('Checking ElasticTranscoder')

    try:
        elastictranscoder.list_pipelines()
        logger.info('-- list_pipelines() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- list_pipelines() failed')

    # DynomoDB
    dynamodb = boto3.client(
        'dynamodb',
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        aws_session_token=session_token
    )
    logger.info('Checking DynamoDB')

    try:
        dynamodb.list_tables()
        logger.info('-- list_tables() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- list_tables() failed')

    # IoT
    iot = boto3.client(
        'iot',
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        aws_session_token=session_token
    )
    logger.info('Checking IoT')

    try:
        iot.list_things()
        logger.info('-- list_things() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- list_things() failed')

    try:
        iot.describe_endpoint()
        logger.info('-- describe_endpoint() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- describe_endpoint() failed')

    # Kinesis
    kinesis = boto3.client(
        'kinesis',
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        aws_session_token=session_token
    )
    logger.info('Checking Kinesis')

    try:
        kinesis.list_streams()
        logger.info('-- list_streams() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- list_streams() failed')

    # KMS
    kms = boto3.client(
        'kms',
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        aws_session_token=session_token
    )
    logger.info('Checking KMS (Key Management Service)')

    try:
        kms.list_keys()
        logger.info('-- list_keys() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- list_keys() failed')

    # Lambda
    lmb = boto3.client(
        'lambda',
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        aws_session_token=session_token
    )
    logger.info('Checking Lambda')

    try:
        lmb.list_functions()
        logger.info('-- list_functions() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- list_functions() failed')

    # OpsWorks
    opsworks = boto3.client(
        'opsworks',
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        aws_session_token=session_token
    )
    logger.info('Checking OpsWorks')

    try:
        opsworks.describe_stacks()
        logger.info('-- describe_stacks() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- describe_stacks() failed')

    # RDS
    rds = boto3.client(
        'rds',
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        aws_session_token=session_token
    )
    logger.info('Checking RDS (Relational Database Service)')

    try:
        rds.describe_db_clusters()
        logger.info('-- describe_db_clusters() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- describe_db_clusters() failed')

    try:
        rds.describe_db_instances()
        logger.info('-- describe_db_instances() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- describe_db_instances() failed')

    # Route53
    route53 = boto3.client(
        'route53',
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        aws_session_token=session_token
    )
    logger.info('Checking Route53 (DNS)')

    try:
        route53.list_hosted_zones()
        logger.info('-- list_hosted_zones() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- list_hosted_zones() failed')

    # S3
    s3 = boto3.client(
        's3',
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        aws_session_token=session_token
    )
    logger.info('Checking S3 (Simple Storage Service)')

    try:
        s3.list_buckets()
        logger.info('-- list_buckets() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- list_buckets() failed')

    # SES
    ses = boto3.client(
        'ses',
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        aws_session_token=session_token
    )
    logger.info('Checking SES (Simple Email Service)')

    try:
        ses.list_identities()
        logger.info('-- list_identities() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- list_identities() failed')

    # sns
    sns = boto3.client(
        'sns',
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        aws_session_token=session_token
    )
    logger.info('Checking SNS (Simple Notification Service)')

    try:
        sns.list_topics()
        logger.info('-- list_topics() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- list_topics() failed')

    # SQS
    sqs = boto3.client(
        'sqs',
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        aws_session_token=session_token
    )
    logger.info('Checking SQS (Simple Queue Service)')

    try:
        sqs.list_queues()
        logger.info('-- list_queues() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- list_queues() failed')

    # support
    support = boto3.client(
        'support',
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        aws_session_token=session_token
    )
    logger.info('Checking Support')

    try:
        support.describe_cases()
        logger.info('-- describe_cases() worked!')
    except botocore.exceptions.ClientError:
        logger.error('-- describe_cases() failed')

@click.command()
@click.option('--access-key', help='An AWS Access Key Id to check')
@click.option('--secret-key', help='An AWS Secret Access Key to check')
@click.option('--session-token', help='An AWS Session Token to check')
def main(access_key, secret_key, session_token):
    """IAM Account Enumerator.

This code provides a mechanism to attempt to validate the permissions assigned
to a given set of AWS tokens.
    """
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(process)d - [%(levelname)s] %(message)s',
    )
    logger = logging.getLogger()

    # Suppress boto INFO.
    logging.getLogger('boto3').setLevel(logging.WARNING)
    logging.getLogger('botocore').setLevel(logging.WARNING)
    logging.getLogger('nose').setLevel(logging.WARNING)

    # Ensure requires parameters are set.
    if access_key is None:
        logger.fatal('No access-key provided, cannot continue.')
        sys.exit(-1)
    if secret_key is None:
        logger.fatal('No secret-key provided, cannot continue.')
        sys.exit(-1)

    # Connect to the IAM API and start testing.
    logger.info('Starting scrape for access-key-id "%s"', access_key)
    iam = boto3.client(
        'iam',
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        aws_session_token=session_token
    )

    # Try for the kitchen sink.
    try:
        everything = iam.get_account_authorization_details()
        logger.info('Run for the hills, get_account_authorization_details worked!')
        logger.info('-- %s', everything)
    except botocore.exceptions.ClientError:
        logger.error('Failed to get everything at once (get_account_authorization_details) :(')

    # Attempt to get user to start.
    try:
        user = iam.get_user()
        report_arn(user['User']['Arn'])
    except botocore.exceptions.ClientError as err:
        logger.error('Failed to retrieve any IAM data for this key.')
        report_arn(str(err))
        brute(access_key=access_key, secret_key=secret_key, session_token=session_token)
        sys.exit(0)

    # Attempt to get policies attached to this user.
    try:
        user_policies = iam.list_attached_user_policies(UserName=user['User']['UserName'])
        logger.info(
            'User "%s" has %0d attached policies',
            user['User']['UserName'],
            len(user_policies['AttachedPolicies'])
        )

        # List all policies, if present.
        for policy in user_policies['AttachedPolicies']:
            logger.info('-- Policy "%s" (%s)', policy['PolicyName'], policy['PolicyArn'])
    except botocore.exceptions.ClientError as err:
        logger.error(
            'Unable to query for user policies for "%s" (list_attached_user_policies): %s',
            user['User']['UserName'],
            err
        )

    # Attempt to get inline policies for this user.
    try:
        user_policies = iam.list_user_policies(UserName=user['User']['UserName'])
        logger.info(
            'User "%s" has %0d inline policies',
            user['User']['UserName'],
            len(user_policies['PolicyNames'])
        )

        # List all policies, if present.
        for policy in user_policies['PolicyNames']:
            logger.info('-- Policy "%s"', policy)

    except botocore.exceptions.ClientError as err:
        logger.error(
            'Unable to query for user policies for "%s" (list_user_policies): %s',
            user['User']['UserName'],
            err
        )

    # Attempt to get the groups attached to this user.
    try:
        user_groups = iam.list_groups_for_user(UserName=user['User']['UserName'])
        logger.info(
            'User "%s" has %0d groups associated',
            user['User']['UserName'],
            len(user_groups['Groups'])
        )

        # List all groups, if present.
        for group in user_groups['Groups']:
            try:
                group_policy = iam.list_group_policies(GroupName=group['GroupName'])
                logger.info(
                    '-- Group "%s" has %0d inline policies',
                    group['GroupName'],
                    len(group_policy['PolicyNames'])
                )

                # List all group policy names.
                for policy in group_policy['PolicyNames']:
                    logger.info('---- Policy "%s"', policy)
            except botocore.exceptions.ClientError as err:
                logger.error(
                    '---- Failed to get policies for group "%s" (list_group_policies): %s',
                    group['GroupName'],
                    err
                )
    except botocore.exceptions.ClientError as err:
        logger.error(
            'Unable to query for groups for %s (list_groups_for_user): %s',
            user['User']['UserName'],
            err
        )

    # Try a brute-force approach.
    brute(access_key=access_key, secret_key=secret_key, session_token=session_token)

if __name__ == '__main__':
    main()
```
