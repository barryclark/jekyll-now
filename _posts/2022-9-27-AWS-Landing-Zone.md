---
layout: post
title: AWS Landing Zone - Part One Introduction to Landing Zone Accelerator on AWS
---

## Landing Zone Accelerator - Introduction ##

In this blog I'm going to be providing an introduction into Landing Zone Accelerator and it's capabilities. It is important to have some understanding of what it deploys in your account before actually deploying it. In the part two of this series I will walk you through the deployment of the Landing Zone Accelerator.

## AWS Landing Zone - Starting Point ##

The starting point of a well-architected multi-account setup in AWS is a “landing zone”. A Landing Zone creates a multi-account architecture and provides a baseline environment which provides the structure for identity and access management, governance, data security, network design, and logging. The goal of the Landing Zone should be to build this foundational capability within the AWS environment providing the essential services for other business application to migrate to the Cloud environment with a focus on security and operations automation.

## Landing Zone Accelerator on AWS ##

To ensure the landing zone is built to the best practices, AWS have made available the Landing Zone Accelerator on AWS which was developed by their ProServe teams to establish an AWS Landing Zone for customers aligned to the AWS Security Reference Architecture (SRA). The Landing Zone Accelerator (LZA) Framework is made up of an orchestration engine, design configuration written in code and deployment pipelines which allow you to design and build to align with AWS best practices and in conformance with multiple, global compliance frameworks, using a low-code CI/CD approach to configuration and deployment.

## Initial AWS Landing Zone ##

An initial AWS Landing Zone with single workload would consist of 5 core AWS Accounts and 3 Line of Business accounts which are separated into Organisational Units.  Organisational Units are a logical group of AWS accounts that are grouped together because they share similar characteristics or policies, such as live support teams needing access to production logs or developers to be given more flexibility to try things in test environments. Grouping accounts together reduces the administrative burden, as they are managed as a single unit. Below is a logical representation of a proposed AWS Landing Zone for a greenfield build consisting of single workload.

![_config.yml]({{ site.baseurl }}/images/blog/Intro-LZA-On-AWS/BlogImage1.jpg)

* The Management Account establishes an account to provide **Cloud Centralised Account information + tagging + payment**. The Management Account does not sit in an OU as it is top of the structure and all other OUs sit below it. Additional accounts will be provisioned from with this account which will allow centralised  costs management.

* The Infrastructure Organisational Unit (OU) will have a Network Account for configuring network rules and connectivity and a Shared Services Account. The Direct Connect or Site to Site VPN is created within **Network Account** which is peered to Transit Gateway. The Shared Services Account will include Cloud Centralised Access control through Microsoft Active Directory and AWS IAM Identity Center (formerly AWS SSO).

* The Security OU will have a Log Archive Account for **Centralised Logging** and a Security Account for **Centralised Security products & reporting**. The OUs are created this way based on responsibility and job function.

* The Workload Production Tenants OU initially includes a single Production Account for running the **first production workload**.

* The Workload Dev Tenants OU will initially include a single Dev Account for running the **DEV workload** while the Workload UAT Tenants OU will initially include single account for running the **UAT workload**.

* The Landing Zone structure will accommodate future workload additions through the use of repeatable patterns deployed through code which is stored in a source code repository.


## Use of ‘Infrastructure as Code’ techniques ##

The Landing Zone Accelerator on AWS is provided as an open-source project that is built using the AWS Cloud Development Kit (CDK). This is delivered as an infrastructure as code (IaC) solution and stored in a organisational owned code source control Repository such as AWS CodeCommit. Through a simplified set of configuration files, the solution is configurable for additional functionality, guardrails and security services (e.g. AWS Managed Config Rules and AWS SecurityHub), managing your foundational networking topology (e.g. VPCs, Transit Gateways, and Network Firewall), and generating additional workload accounts using the Account Vending Machine.

The Landing Zone Accelerator on AWS includes six configuration files that may be used to customise the solution. The solution orchestrates the creation of resources and configurations based on the input from these configuration files. Resources are generated using AWS CDK constructs defined in the solution’s source code. These can then be stored in a code repository. Having your configuration in a Git-compatible repository has the following benefits:

* Version control your configuration as you would source code. We can introduce feature branching and other commonly used strategies to ensure changes to the environment meets organisational standards

* Audit the change history of the configuration files

* The files serve as declarative manifests for your environment’s configuration. What you see is what you get. The AWS Accelerator-Pipeline sources changes to the main branch of the repository and orchestrates your defined configuration properties via AWS CodeBuild projects and the AWS CDK toolkit. Users that make edits to these configuration files are not required to know how to write code

* The repository is hosted in AWS CodeCommit, a Git compliant Code Repository AWS Service. This means AWS IAM can be used to define which users and roles can view and/or make changes to the repository. This strategy can be used as a gate for which members of an organisation are allowed to introduce changes to the environment.

Below is a diagram which outlines how the Landing Zone Accelerator is deployed into the management account using a pipeline approach.

![_config.yml]({{ site.baseurl }}/images/blog/Intro-LZA-On-AWS/BlogImage2.jpg)

The solution includes AWS CloudFormation templates that are deployed in the management account for your multi-account environment. The expected actions to deploy the landing zone are outlined below:

1. The provided AWS CloudFormation template will deploy the Landing Zone Accelerator installation engine.

2. The installer pipeline is used as the launching point to deploy the core features of the Landing Zone Accelerator. AWS have separated the installer to allow our teams to easily update to future versions of the Landing Zone Accelerator by updating a single parameter through the AWS CloudFormation update stack console.

3. An AWS CodeBuild project is used as an orchestration engine to build and execute the Landing Zone Accelerator Cloud Development Kit (CDK) application that deploys the core AWSAccelerator-PipelineStack, and associated dependencies.

4. The core pipeline is used for input validation, synthesis, and deployment of additional CloudFormation stacks via CDK. An AWS CodeCommit repository named aws-accelerator-config is used to store the configuration files that are used by the Landing Zone Accelerator. These configuration files will be the primary mechanism for configuration and management of the entire Landing Zone Accelerator.

5. An AWS CodeBuild project is used to compile the Landing Zone Accelerator CDK application.

6. Multiple AWS CodeBuild deployment stages are utilised to deploy the resources that have been defined in the Landing Zone Accelerator configuration files to your multi-account environment. A review stage is also included allowing our deployment teams to view all the changes that will be applied by these stages.

7. The Landing Zone Accelerator will also monitor for AWS Control Tower lifecycle events for potential drift events. When using AWS Control Tower with the Landing Zone Accelerator, ensure that the resources within your AWS Control Tower environment are properly enrolled. This can be viewed through the AWS Control Tower console.

## Landing Zone Accelerator on AWS - Configuration Files ##

The Landing Zone accelerator includes six configuration files that are applied to future workload deployments automatically on account creation. These files cover the global properties that can be inherited across the AWS Organization such as IAM, network and security services. These can be copied and modified for future workloads as they will have similar logic e.g VPC creation, subnetting, route tables etc.

## Onboarding New workloads ##

In a Landing Zone environment, individual workloads are provisioned into their own AWS accounts. The Landing Zone design utilises an Account Vending Machine (AVM) Mechanism to create new AWS accounts.

The Account Vending Machine is a key component of the AWS Landing Zone for automating the creation of new accounts. It allows new AWS accounts to be created in in Organizational Units (OUs) preconfigured with an account security baseline and a predefined network.

To add a new workload, a new account is added to the accounts-config.yaml file which is part of the Landing Zone configuration. This will tigger a pipeline which controls the provisioning process.  Initially a change request should be submitted to the AWS System Admin Team who will review and action once necessary approvals have been received. As the Landing Zone matures it can be modified to automate additional steps of the process through the use of a Service Catalog. In this scenario, AWS Landing Zone leverages the AWS Service Catalog to grant administrators permissions to create and manage AWS Landing Zone products and end user permissions to launch and manage AVM products. The AVM uses launch constraints to allow end users to create new accounts without requiring account administrator permissions.

The Landing Zone Accelerator contains a number of scripts for onboarding that all future workloads leverage. See AWS Account Vending Machine diagram below, which allows end users to create new accounts without requiring account administrator permissions.

![_config.yml]({{ site.baseurl }}/images/blog/Intro-LZA-On-AWS/BlogImage3.jpg)

## Hybrid Network Connectivity ##

The network-config.yaml file as part of the Landing Zone accelerator is used to manage and implement network resources to establish a WAN/LAN architecture. As this is a global configuration file, all future workloads will inherit it. AWS Config should be used to detect any deviations from organisational standards.

**Remote Access Connectivity - AWS Resources**

Removing the ability for interactive access reduces the risk of human error, and the potential for manual configuration or management.  With this principle in mind, all teams should use AWS Systems Manager to manage EC2 instances instead of allowing direct access, or via a bastion host. AWS Systems Manager can automate a variety of maintenance and deployment tasks, using features including automation workflows, documents (playbooks) and the run command. AWS Session Manager is accessed via the AWS Management Console, which means MFA and any networks policies will be applied. Key benefits of Systems Manager over RDP or SSH include:
•	Centralised access control to managed nodes using IAM policies
•	No open inbound ports and no need to manage bastion hosts or SSH keys
•	One-click access to managed nodes from the console and CLI
•	Port forwarding
•	Cross-platform support for Windows, Linux, and macOS
•	Logging and auditing of session activity.


## Conclusion ##

This blog post is intended as an introduction to Landing Zone Accelerator on AWS. The LZA has been developed based on the guidance contained within the AWS Security Reference Architecture (SRA). In Part 2 of this blog I will walk you through deploying Landing Zone Accelerator on AWS. There are a number of prerequisites that must be completed in AWS Organization and AWS Control Tower before a successful Landing Zone Accelerator deployment will occur. Stay tuned for Part 2 which should be available within next two weeks.
