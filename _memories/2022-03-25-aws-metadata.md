---
layout: memory
title: Messing around with EC2 Instance Metadata Service
---

To not increase the bill all stuff regarding the EC2 Instance Metadata Service can be tested with [aws/amazon-ec2-metadata-mock](https://github.com/aws/amazon-ec2-metadata-mock). This tool is quite handy and a great chance to explore new worlds.

Now back to the real storey. Each EC2 instance can access the instance metadata service (also known as IMDS). This service contains besides metadata also information about that specific EC2 instance. But that's not the whole truth - if an [IAM Role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html) is associated with that EC2 instance, you can get credentials for that role by asking that metadata service. This is also the reason why the IMDS is a prime target for attackers after they gained access to an EC2 instance.

### Accesing the IMDSv1

Like shown in [this memory](https://benjitrapp.github.io/memories/2022-01-11-Cloudmetadata/), the IMDS can be accessed:

* IPv4 - `http://169.254.169.254/latest/meta-data/`
* IPv6 - `http://[fd00:ec2::254]/latest/meta-data/` (as long as it is a [Nitro EC2 instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html#ec2-nitro-instances))


As mentioned above- to get credentials, have to make two call against the IMDS. The response of the first call returnes the name of the IAM role associated with the credentials which is required to retrieve the IAM credentia:

```bash
ROLE=$(curl http://169.254.169.254/latest/meta-data/iam/security-credentials/)
curl http://169.254.169.254/latest/meta-data/iam/security-credentials/${ROLE}/
``` 

## IMDSv2

After big hacks like the Capital One breach occured the IMDS was upgraded with a more secure version. In
Version [IMDSv2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html) various protections against SSRF attacks were added and requires the user to create and use a token. So acccessing the service will now look like this

```bash
TOKEN=$(curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")
curl -H "X-aws-ec2-metadata-token: ${TOKEN}" -v http://169.254.169.254/latest/meta-data/
```

## Let's discuss the Security Benefits of IMDSv2

The [IMDSv2](https://aws.amazon.com/blogs/security/defense-in-depth-open-firewalls-reverse-proxies-ssrf-vulnerabilities-ec2-instance-metadata-service/) offers plenty security improvements compared to IMDSv1. If possible IMDSv2 should be enforced and prefered over the original metadata service. These improvements take the following form:

**Session Authentication**: In order to retrieve information from the metadata service a session must be created by sending a HTTP PUT request to retrieve a token value. After this, the token must be used for all subsequent requests. This mechanism effectively mitigates traditional Server Side Request Forgery [attacks](https://hackingthe.cloud/aws/exploitation/ec2-metadata-ssrf/), as an attacker is unlikely to be able to send a PUT request.

**Blocks X-Forwarded-For Header**: IMDSv2 will block requests to fetch a token that include the X-Forwarded-For header. This is to prevent misconfigured reverse proxies from being able to access it.

**TTL of 1**: The default configuration of IMDSv2 is to set the Time To Live (TTL) of the TCP packet containing the session token to "1". This ensures that misconfigured network appliances (firewalls, NAT devices, routers, etc.) will not forward the packet on. This also means that Docker containers using the default networking configuration (bridge mode) will not be able to reach the instance metadata service.


**Airgapping IMDSv2 from a Docker Container**: While the default configuration of IMDSv2 will prevent a Docker container from being able to reach the metadata service, this can be configured via the "[hop limit](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html)."

## Other Valuable info that can be gathered from IMDS

The following table is salvaged from this [UserGuide](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instancedata-data-categories.html).

| Endpoint | Description |
| :-----------------: | ----------- |
| ami-id            | The AMI ID used to launch the instance. |
| ami-launch-index  | If you started more than one instance at the same time, this value indicates the order in which the instance was launched. The value of the first instance launched is 0. |
| ami-manifest-path | The path to the AMI manifest file in Amazon S3. If you used an Amazon EBS-backed AMI to launch the instance, the returned result is unknown. |
| hostname          | The private IPv4 DNS hostname of the instance. In cases where multiple network interfaces are present, this refers to the eth0 device (the device for which the device number is 0). |
| iam/info          | If there is an IAM role associated with the instance, contains information about the last time the instance profile was updated, including the instance's LastUpdated date, InstanceProfileArn, and InstanceProfileId. Otherwise, not present. |
| iam/security-credentials/*role-name* | If there is an IAM role associated with the instance, role-name is the name of the role, and role-name contains the temporary security credentials associated with the role. Otherwise, not present. |
| identity-credentials/ec2/info | [Internal use only] Information about the credentials in identity-credentials/ec2/security-credentials/ec2-instance. These credentials are used by AWS features such as EC2 Instance Connect, and do not have any additional AWS API permissions or privileges beyond identifying the instance. |
| instance-id | The ID of this instance. |
| local-hostname | The private IPv4 DNS hostname of the instance. In cases where multiple network interfaces are present, this refers to the eth0 device (the device for which the device number is 0). |
| local-ipv4 | The private IPv4 address of the instance. In cases where multiple network interfaces are present, this refers to the eth0 device (the device for which the device number is 0). |
| public-hostname | The instance's public DNS. This category is only returned if the enableDnsHostnames attribute is set to true. |
| public-ipv4 | The public IPv4 address. If an Elastic IP address is associated with the instance, the value returned is the Elastic IP address. |
| public-keys/0/openssh-key |  	Public key. Only available if supplied at instance launch time. |
| security-groups | The names of the security groups applied to the instance. |