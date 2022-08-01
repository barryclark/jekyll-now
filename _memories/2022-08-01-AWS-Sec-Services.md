---
layout: memory
title: SVG SSRF Cheatsheet
---

### GuardDuty

#### General Info

* Threat detection service which uses ML to continuously monitor for malicious behavior
  * Unusual API calls, calls from a known malicious IP
  * Attempts to disable CloudTrail logging
  * Unauthorized deployments
  * Compromised instances
  * Reconnaissance by attackers
  * Port scanning, failed logins
* Use cases
  * Centralize threat detection across multiple AWS accounts
  * Automated response using CloudWatch Events and Lambda
  * Machine learning and anomaly detection

#### Characteristics

* Features
  * Alerts appear in the GuardDuty console (90 days) and CloudWatch Events
  * Receives feeds from 3rd parties like Proofpoint, CrowdStrike, and AWS Security for known malicious domains/IP addresses
  * Monitors CloudTrail Logs, VPC Flow Logs, DNS Logs
* Send new findings to CloudWatch Events every 5mins, and updated findings every 6 hours (default)
* Regional: can aggregate via CloudWatch Events to push to a central store

---

### Security Hub

#### General Info

* Centralize security related alerts across accounts, and provides a UI for viewing these
* The biggest limitation is it does not centralize alerts across regions, only across accounts

#### Characteristics

* Regional (findings don't cross regions)
* Multi-account support
* Findings from:
  * Guard Duty
  * Config
  * Inspector
  * Macie
  * third party
  * self-generated against CIS standards

---

### Audit Manager

#### General Info

Provides prebuilt frameworks for common industry standards and regulations, and automates the continual collection of evidence to help you in preparing for an audit

---

### Control Tower

#### General Info

* It helps you create new accounts and establish a security baseline for AWS accounts
* This cannot be used if you already use AWS Organizations or if you previously used Landing Zone

### Inspector

#### General Info

* Automated security assessment service that helps improve the security and compliance of applications deployed on AWS
* Automatically assesses applications for vulns or deviations from best practices
* Monitor network/file system/process activity within the specified target

#### Characteristics

* **Template** = Rules packages (predefined only), target EC2 instances, SNS topic
* **Network reachability** = enumerates what ports are accessible from outside of a VPC (+ what process listening on those ports, with agents)
* Rules packages:
  * Common vulnerabilities and Exposures (CVEs)
  * CIS Benchmarks (OS Security Configuration)
  * Security Best Practices (OS config including remote access)
  * Runtime Behavior Analysis (protocols, ports, software config)

#### Deployment

* Requirements
  * Agent required for host config
  * Service linked role to enumerate EC2 instances and network config
* Setup
  * create "Assessment target"
  * install agents on EC2 instances
  * create "Assessment template"
  * perform "Assessment run"
  * review "Findings" against "Rules"

---

### Detective

<p align="center">
<img src="/images/detective_coverage.jpeg">
</p>

#### General Info

* Continuously extracts temporal events such as login attempts, API calls, and network traffic from GuardDuty, CloudTrail, and VPC Flow Logs into a graph model that summarizes the resource behaviors and interactions observed across your entire AWS environment
* Automatically correlates user activity without the need for you to enable, store, or retain logs manually

---

### Trusted Advisor

#### Description

* Makes recommendations on cost reductions, availability/performance, and security
* Business/enterprise subscription for all features
* Exclusions
  * Can exclude resources from all checks
  * Can't suppress individual checks
  
#### Checks

| Categories           | Core Checks                                      | Security Checks                                          |
| -------------------- | ------------------------------------------------ | -------------------------------------------------------- |
| 1. Cost Optimization | 1. S3 Bucket Permissions                         | * Security group open access to specific high-risk ports |
| 2. Security          | 2. Security Groups - Specific Ports Unrestricted | * Security group unrestricted access                     |
| 3. Fault Tolerance   | 3. IAM Use                                       | * Open write and List access to S3 buckets               |
| 4. Performance       | 4. MFA on Root Account                           | * MFA on root account                                    |
| 5. Service Limits    | 5. EBS Public Snapshots                          | * Overly permissive RDS security group                   |
|                      | 6. RDS Public Snapshots                          | * Use of cloudtrail                                      |
|                      | 7. Service Limits                                | * Route 53 MX records have SPF records                   |
|                      |                                                  | * ELB with poor or missing HTTPS config                  |
|                      |                                                  | * ELB security groups missing or overly permissive       |
|                      |                                                  | * CloudFront cert checks - expired, weak, misconfigured  |
|                      |                                                  | * IAM access keys not rotated in last 90 days            |
|                      |                                                  | * Exposed access keys on GitHub etc.                     |
|                      |                                                  | * Public EBS or RDS snapshots                            |
|                      |                                                  | * Missing or weak IAM password policy                    |

---

### Macie

#### General Info

* Security service which uses machine learning and NLP (natural language processing) to discover, classify and protect sensitive data stored in S3
* Works directly with data stored in S3, but can also analyze CloudTrail logs

#### Characteristics

* Monitors
* Personally Identifiable Information (PII), Personal Health Information (PHI), regulatory documents (legal, financial), API keys and secret key material
* Watches policy and ACL changes
* Watches access patterns via CloudTrail
* Data classifications
* by Content Type (JSON, PDF, Excel, TAR/ZIP, source code, XML)
* by Theme (AMEX/Visa/Mastercard card keywords, banking/financial keywords, hacker and web exploitation keywords)
* by file extension (.bin, .c, .bat, .exe, .html, .sql)
* by regular expression (aws_secret_key, RSA private key, SWIFT code, Cisco Router Config)
