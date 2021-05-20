---
layout: post
title: The Layer Cake - Using Layers to Increase Security Posture in AWS
---
## Introduction

Welcome back to my blog on all things AWS. I know in my first post that I said there was more Amazon Connect posts to follow. There are more posts around Amazon Connect on the horizon but based on the recent cyber incidents in Ireland & USA, I felt a post on security is warranted. The Amazon CTO Dr Vogels says that _"Security is job zero"_ and it is something I agree with wholeheartedly. In this post we will cover our responsibilities when it comes to using AWS and highlight some security services that we can use to add layers to increase our overall security posture. This post is an informational one and does not provide steps on how to configure any of the individual AWS services highlighted. If you want a future post on how to configure and combine some of the services get in contact using the link below.

## Shared Responsibility Model

I'm not going to jump straight into discussing some of the AWS security services that can be used. Let's first talk about people and the Shared Responsibility Model. Before we start using AWS it is important that we understand it is a partnership between AWS and us as the consumers. AWS is responsible for **security of the cloud** and the consumer is responsible for **security in the cloud**. For AWS this covers such things as physical security of the data centres, security of the hardware and software for their various services. The image below shows the allocation of responsibility when using **_Infrastructure as a Service_** (IaaS).

![_config.yml]({{ site.baseurl }}/images/blog/SecurityPillars/BlogImage1.jpg)

It’s important to note the allocation of responsibility is not static, but varies according to the services deployed on AWS and their level of abstraction. If we are using _Infrastructure as a Service_ (IaaS) , _Platform as a Service_ (PaaS) or _Software as a Service_ (SaaS) then our allocation of responsibility changes. I'm going to focus on _Infrastructure as a Service_ (IaaS) in this post. Once we understand what is contained within our sphere of responsibility, it is time to consider the design of our application or solution. Again it is not a matter of jumping in without looking. The recommendation would be to consult the AWS Well Architected Framework to understand what is best practice for infrastructure or application deployments in AWS. In the next section I will provide a brief overview of the AWS Well Architected Framework.

## AWS Well Architected Framework

Well-Architected has been developed to help cloud architects build secure, high-performing, resilient and efficient infrastructure for their applications. It is 12 years of knowledge and ongoing experience to evolve a proven framework to build secure, high-performing, resilient and efficient infrastructure for applications. The Framework is based on five pillars:

1. Operational Excellence - ability to run and monitor systems to deliver business value and to continually improve supporting procedures.

2. Security - ability to protect information, systems and assets while delivering value through risk assessments and mitigation strategies.

3. Reliability - ability of a system to recover from infrastructure or service disruptions, dynamically acquire computing resources and mitigate disruptions.

4. Performance efficiency - ability to use computing resources efficiently to meet system requirements and to maintain that efficiency as demand changes and technologies evolve.

5. Cost optimization - ability to avoid or eliminate unnecessary cost or suboptimal resources.

The Framework provides a consistent approach to evaluate architectures and implement designs that will scale over time.

![_config.yml]({{ site.baseurl }}/images/blog/SecurityPillars/BlogImage2.png)

For more information check out the [AWS Well Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)

## Architecture - Without Any Defences Yet

In the diagram below we have an architecture that has zero defences added yet. **Warning:This is for illustrative and educational purposes. Under no circumstances should you deploy any architecture in AWS like this.** . For this blog post I'm going to use a traditional 3 tier infrastructure deployment. Over the next couple of sections I will discuss adding layers of defences to our architecture leveraging understanding and learnings from both the Shared Responsibility Model and the Well Architected Framework.

![_config.yml]({{ site.baseurl }}/images/blog/SecurityPillars/BlogImage3.jpeg)

By the end of this post I will have added additional layers of defences to our architecture improving it's overall security posture. I'm going to start from the external perimeter and work inwards giving an overview of some services that you can use.

## CloudFront

Amazon CloudFront is a highly secure CDN that provides both network and application level protection. All CloudFront distributions are defended by default against the most frequently occurring network and transport layer DDoS attacks that target websites or applications with AWS Shield Standard. To defend against more complex attacks it is possible to add a flexible, layered security perimeter by integrating CloudFront with AWS Web Application Firewall (WAF). Finally, CloudFront has advanced security compliance certifications namely PCI DSS, ISO/IEC, SOC 1/2/3, FedRAMP Moderate, HIPAA and more.

## AWS Shield

AWS Shield is a managed Distributed Denial of Service (DDoS) protection service that safeguards applications running on AWS. It provides always-on detection and automatic inline mitigations that minimize application downtime and latency, so there is no need to engage AWS Support to benefit from DDoS protection. There are two tiers of AWS Shield - Standard and Advanced.

**AWS Shield Standard** is enabled by default for all customers, at no additional charge. AWS Shield Standard defends against most common, frequently occurring network and transport layer DDoS attacks that target websites or applications.

In addition to the network and transport layer protections that come with Standard, **AWS Shield Advanced** provides additional detection and mitigation against large and sophisticated DDoS attacks, near real-time visibility into attacks and integration with AWS WAF. AWS Shield Advanced also gives **_24x7 access_** to the AWS DDoS Response Team (DRT).

## WAF - Web Access Firewall

In this section we are discussing WAF as in Web Access Firewall and not the Well Architected Framework. AWS WAF is a web application firewall that helps protect your web applications or APIs against common web exploits and bots that may affect availability, compromise security, or consume excessive resources. WAF gives control over how traffic reaches applications by enabling you to create security rules that control bot traffic and block common attack patterns, such as SQL injection or cross-site scripting. There is also the ability to customise rules that filter out specific traffic patterns. There are accelerators available so you can get started quickly using Managed Rules for AWS WAF, a pre-configured set of rules managed by AWS or AWS Marketplace Sellers to address issues like the OWASP Top 10 security risks and automated bots that consume excess resources, skew metrics, or can cause downtime. These rules are regularly updated as new issues emerge.

## Elastic Load Balancers (ELBs)

Loadbalancing is delivered as a service, thus the user configuration specifies the listeners and associated attributes, and AWS internally manage the required availability, capacity, software and hardening of the load balancing service.

Using Load Balancers (LB) also provides security benefits as it allows web servers to be isolated from direct connections on the internet (i.e. they can sit in a private subnet with the LB in the public subnet) and helps protect from DDoS attacks.

## Subnets

Amazon VPC enables you to define a virtual network in your own logically isolated area within the AWS cloud, known as a virtual private cloud (VPC). After creating your VPC, you divide it into subnets. In an AWS VPC, subnets are not isolation boundaries around your application but used to create routing policies. Isolation is achieved by attaching an AWS Security Group (SG) to the infrastructure that host your application. More on Security Groups in the next section. It is our best practice that subnets should be created in categories. There are two main categories; public subnets and private subnets.

**Public subnets** are attached to a route table that has a default route to the Internet via an Internet gateway. Resources in a public subnet can have a public IP or Elastic IP (EIP) that has a NAT to the Elastic Network Interface (ENI) of the virtual machines or containers that hosts application(s).

**Private subnets** contain infrastructure that isn’t directly accessible from the Internet. Unlike the public subnet, this infrastructure only has private IPs. Infrastructure in a private subnet gain access to resources or users on the Internet through NAT infrastructure.

## Security Groups (SG)

AWS Security groups provide a virtual firewall that controls the traffic into or out of an ELB, EC2 instance or RDS service. This can provide very fine-grained access control as unlike traditional firewalls the rules can be applied to a single or group of instances rather than a subnet or IP address.

The second key foundation for the solution after defining the network and subnets will be to identify the required security groups and associated inbound and outbound traffic rules. Enabling the VPC Flow Log capability means all traffic into and out of an instance in the VPC can be logged and analysed centrally.

## Network Access Control Lists (NACL)

Each subnet in the VPC can also have Network Access Control rules associated. They are not stateful and provide for network to network address restrictions. It is possible to deploy a NACL to block certain traffic, e.g. nuisance public addresses, or dangerous ports on the public networks.

## Identity and Access Management

The AWS Identity and Access Management service (IAM) can be used to control access to AWS resources. Roles and groups can be used to manage access rights to use console services or APIs. Permissions can be defined the control the actions that can be performed and the objects that they can be performed on. It is recommended that the AWS root account not be used for day-to-day operations and that each individual user has their own personal user account, with **Multi-Factor Authentication (MFA) enabled**.

In addition, using profiles, rights can be assigned to EC2 instances. This provides a secure mechanism to deploy tailored management solutions (e.g. rights to perform snapshots), or configure services at instance launch time without the risk of storing authentication details on the server or deployment scripts.

## CloudTrail

The AWS CloudTrail service records all API calls made to your account, capturing the name of the API, the identity of the caller, the time of the API call, the request parameters, and the response elements returned by the AWS service. Thus it provides an audit trail of all changes made and can be used as part of compliance with internal policies and regulatory standards.

## GuardDuty

Using AWS CloudTrail a full audit trail of all AWS API activity within the account is preserved. By enabling VPC Flow logs an audit of all network packets (Both those that are accepted by the security groups / NACL and those that are rejected) is created. These provide a valuable view of audit information which can be used to identify unauthorised activity. Amazon GuardDuty is a threat detection service that continuously monitors for malicious activity and unauthorised behaviour using the information available from CloudTrail, VPC Flow logs and DNS logs. The service uses machine learning, anomaly detection, and integrated threat intelligence to identify and prioritise potential threats. It can be integrated with CloudWatch events to filter events by severity and publish notifications when required.

## Inspector

Amazon Inspector is a security vulnerability assessment service that helps improve the security and compliance of your AWS resources. It automatically assesses resources for vulnerabilities or deviations from best practices. Inspector produces a detailed list of security findings prioritised by level of severity. The tool has access to and extensive knowledge base. This knowledge base consists of hundreds of rules mapped to common security standards and vulnerability definitions. These are regularly updated by AWS security researchers to deliver time-relevant security assessments.

## Key Management Service

The AWS KMS service uses hardware security modules (HSM) that meet the highest standards (validated under FIPS 140-2) to protect the keys used to encrypt data. Keys are unique to the AWS account and are managed centrally by the service. The service is integrated with other AWS services (e.g. EBS storage volumes, S3 buckets, RDS and other database services, EC2, etc. ) to provide secure means to encrypt and decrypt data (with the keys never leave the HSM devices unencrypted and are never shared outside of their region) governed by IAM policies. All calls to the service are logged in AWS CloudTrail.

## AWS Certificate Manager

AWS Certificate Manager simplifies the process of creating, deploying and renewing SSL certificates used with AWS ALB and CloudFront services. The certificates generated use RSA keys with a 2048-bit modulus and SHA-256. They are Domain Validated (DV) and are trusted by most browsers, operating systems and mobile devices. When using ACM the certificate private keys are securely protected and stored using strong encryption and key management best practices. Thus it allows for infrastructure as code templates to create and deploy certificates, and ensures that they are renewed automatically.

However ACM certificates can only be used with AWS services (ALB, CloudFront, API Gateway), and cannot be deployed to Docker images or EC2 hosted services (e.g.Apache).

## Backup

AWS Backup provides the ability to centralise and automate the backup of data across multiple AWS services. A backup plan is created which defines the backup frequency and the retention policy. Backups are written to S3 storage (although the buckets are not directly available to customers) and are thus available in any AZ within the region.

## Architecture - Layers of Defences

The above services mentioned cover a broad spectrum across the mitigate, detect, alert, audit and recovery space. Each service on it's own has a particular function however when combined with other AWS services a solution that aligns to the _AWS Shared Responbility Model_ and _AWS Well Architected Framework_ starts to emerge. Below is what the starting architecture has evolved into.

![_config.yml]({{ site.baseurl }}/images/blog/SecurityPillars/BlogImage4.jpeg)

The above is just one way of many of layering in security best practices into our AWS architectures. It is possible to substitute some of the services described above with existing _Comerical of the Shelf Software_ (COTS) that enterprises have invested in already over the years.

## Conclusion

Security is a mix of people, documented & tested processes and technology solutions. Before we look to implemented anything in AWS the **Shared Responsibility Model** as well as the **AWS Well Architected Framework** should be consulted. Depending on the type of architecture been implemented _Infrastructure as a Service_ (IaaS) , _Platform as a Service_ (PaaS) or _Software as a Service_ (SaaS) there are plenty of AWS security services to pick and choose from to satisfy your requirements and cater for your budget. Once the architecture has been implemented it should not be left to the side, it should be tested on a regular basis to insure it is still fit for purpose. If any gaps are identified the architecture should be revised and evolve to close the gap.

Hopefully the above is of some benefit. If you have any questions or suggestions get in touch using link below. Stay tuned for next post that will drop over the summer.
