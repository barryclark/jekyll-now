# AWS CLI

# Get access id, access key after logged in via SSO auth

So it can be used for boto3

```python
aws sso get-role-credentials --profile test-chat --role-name AdministratorAccess --account-id 730133902388 --access-token <token> --region ap-northeast-1
```

# Get region

```python
aws configure get region
```