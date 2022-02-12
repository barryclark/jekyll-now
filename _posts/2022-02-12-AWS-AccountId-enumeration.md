---
layout: post
title: Enumerate AWS AccountIDs 
---

### A approach to schiebe an AWS whois
Ever found some AWS credentials and wondered how to find out what they are used for, or if they are even valid?

The most common method is to use `sts:get-caller-identity` ([AWS Documentation](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/sts/get-caller-identity.html)) as an API call for that sake. This also doesn’t require any special permissions to perfom the call.

This option might get monitored since it became very popular (see [twitter](https://twitter.com/SpenGietz/status/1283846678194221057)) and has a high chance to trigger an alarm. 
As a sneaky cloud ninja we can use another approach. Luckily some calls are returning valuable info if an Error occured. So we can use another AWS Service to disclose the Account ID (by accident). The following approach is certainly not a comprehensive list, and note that the principal needs to **NOT have IAM permissions** to use this call to return the information as an error.
But not every API calls exhibit to this kind of behavior. A failed EC2 API call f.e. will return a variant of the following output:
```bash
An error occurred (UnauthorizedOperation) when calling the DescribeInstances operation: You are not authorized to perform this operation.
```
#### [sns:publish](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/sns/publish.html)
A call with `sns:Publish` will return the ARN of the calling user/role without logging the occurance of the error to CloudTrail. If you want to use this method, you must provide a valid AWS AccountId in the API call. This can be your own AccountID or the one that you found 
```bash
$ aws sns publish --topic-arn arn:aws:sns:eu-central-1:*account id*:abce --message xxx

An error occurred (AuthorizationError) when calling the Publish operation: User: arn:<here we go 😊>
``` 

### Get AccountID from AWS Access Keys

A different approach to the things we learned above is to use `sts:GetAccessKeyInfo` [AWS Documentation](https://docs.aws.amazon.com/STS/latest/APIReference/API_GetAccessKeyInfo.html) to return the AccountID oft he credentials you found somewhere. This API call can only be logged to the account calling the action, which should be your account.

```bash
$ aws sts get-access-key-info --access-key-id=ASIA123456789EXAMPLE
{
    "Account": "123456789"
}
```
