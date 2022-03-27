---
layout: culture
title: DevSecOps Playbook
---

This playbook will help you introduce effective DevSecOps practices in your company, regardless of size. We provide explicit guidance and actionable steps to introduce security controls, measure their effectiveness, and demonstrate value for money to your business leaders. Following this playbook will help teams build materially more secure applications, and that in the end, is the intent.

Original Post and Source: [DevSecOps-Playbook](https://github.com/6mile/DevSecOps-Playbook)

## Some background

This playbook was inspired by several documents and I want to call them out here:

The "Minimum Viable Secure Product", or [MVSP](https://mvsp.dev) is a project that I have profound respect for. The MVSP is a great way to determine how mature an organization's security practices are.

Timo Pagel's amazing "DevSecOps Maturity Model" or [DSOMM](https://dsomm.timo-pagel.de/) is a project that I only found recently.  There is some overlap between the DSOMM and this document and you should definitely browse through the DSOMM and explore the different maturity levels.

## Shift Left

All companies and applications are unique. Blanket statements like "Shift Left" aren't helpful without context. Enterprises and startups have different tech stacks, funding, workforces, regulation, and more. Context matters, and this document provides a roadmap to use your context to determine your next DevSecOps destination.

We want to secure our applications, from cradle to grave. To do this, we have created five categories that cover the lifecycle of a software application. We've also added a Compliance Addendum for anyone that is interested in aligning with a specific compliance framework.

* [Development Environment](#development)
* [Source Code Management](#scm)
* [Continuous Integration / Deployment and other Automation](#cicd)
* [Deployment](#deployment)
* [Organization](#org)
* [Addendum: Compliance](#compliance)

## Priority and Difficulty explained

We use two rating systems:  **Priority** indicates the order you should implement controls and **Difficulty** indicates how hard implementation is for this control.

![DevSecOps Continuous Improvement](/images/devsecops-loop-securestack-final-1280x640.png)

# The Checklist

<h2 id="development">Development Environment</h2>

The developer's laptop is where most of the magic happens, but also where most of the problems are introduced.  If you want to shift as far left as you can this is where you want to land much of your embedded security.

| Control | Name | Priority | Description | Difficulty | Maps to security frameworks |
| :--- | :---        | :---   | :--- | :---    | :---    |
| 1.1 | Secure Code Training | 2 | Developers who receive Secure Code Training are less likely to introduce security bugs, be aware of tooling that can support them, and design systems with security in mind. | <span style="color: orange">Medium</span> | <ul><li>CIS8</li><li>APRA234</li><li>NIST 800-53B</li><li>SSDF1.1</li></ul> |
| 1.2 | Source Code Versioning | 1 | Version Control Systems introduce peer review processes, an auditable history, and consistent work patterns between software engineers.  | <span style="color: green">Easy</span> | <ul><li>APRA234</li><li>CIS8</li><li>ISM GSD</li><li>ISO27001</li><li>NIST 800-53B</li><li>SSDF1.1</li></ul> |
| 1.3 | .gitignore | 1 | .gitignore files help prevent accidental commits of sensitive, debug, or workstation specific data | <span style="color: green">Easy</span> | <ul><li>APRA234</li><li>CIS8</li><li>NIST 800-53B</li><li>SSDF1.1</li></ul> |
| 1.4 | Pre-Commit Hook Scans | 2 | A Pre-Commit Hook for security scans provides timely feedback to engineers and helps to prevent vulnerable code being introduced to a repository | <span style="color: green">Easy</span> | <ul><li>APRA234</li><li>CIS8</li><li>NIST 800-53B</li><li>SSDF1.1</li></ul> |
| 1.5 | IDE plugins | 2 | Most IDE's support the use of third-party plugins, and devs should implement these tools to highlight security issues as they happen in realtime while they are programming. | <span style="color: green">Easy</span> | <ul><li>APRA234</li><li>CIS8</li><li>NIST 800-53B</li><li>SSDF1.1</li></ul> |
| 1.6 | Local Software Composition Analysis | 1 | Helps you find and fix libraries with known security issues | <span style="color: green">Easy</span> | <ul><li>APRA234</li><li>CIS8</li><li>ISM GSD</li><li>ISO27001</li><li>NIST 800-53B</li><li>SSDF1.1</li></ul> |
| 1.7 | Local Static Code Analysis | 2 | Helps you find and fix security vulnerabilities in your source code | <span style="color: green">Easy</span> | <ul><li>APRA234</li><li>CIS8</li><li>ISM GSD</li><li>ISO27001</li><li>NIST 800-53B</li><li>SSDF1.1</li></ul> |
| 1.8 | Local Sensitive Data Analysis | 1 | Audits your repository for secrets, credentials, API keys and similar in dev environment. Secrets stored in source code are visible to other people | <span style="color: green">Easy</span> | <ul><li>APRA234</li><li>CIS8</li><li>ISM GSD</li><li>ISO27001</li><li>NIST 800-53B</li><li>SSDF1.1</li></ul> |
| 1.9 | Application Baseline | 3 | Create a "recipe" for building the application from ground up that takes into consideration its risk and compliance requirements, data sensitivity, stakeholders and relationships with other systems, as well as its technical components. | <span style="color: orange">Medium</span> | <ul><li>APRA234</li><li>CIS8</li><li>ISM GSD</li><li>NIST 800-53B</li><li>SSDF1.1</li></ul> |

<h2 id="scm">Source code management (SCM)</h2>

Most companies now store their source code in cloud based repositories like GitHub, Bitbucket or Gitlab.  Even if you don't, you will use a centralized place for your software engineers to store their code.  Centralization and versioning means that these developers can work together without (mostly) stepping on each others toes.  Joe and Molly can both be working on the same component, file or function but their changes won't necessarily break the other one's changes. SCM is also a GREAT place to deploy security functions like server side git hooks and multi-factor authentication for your developers!

| Control | Name | Priority | Description | Difficulty | Maps to security frameworks |
| :--- | :---        | :---   | :--- | :---    | :---    |
| 2.1 | Source Code Management | 1 | Use a centralized source code management (SCM) system like Bitbucket, GitHub or Gitlab | <span style="color: green">Easy</span> | <ul><li>APRA234</li><li>CIS8</li><li>ISM GSD</li><li>ISO27001</li><li>NIST 800-53B</li><li>SSDF1.1</li></ul> |
| 2.2 | User Roles | 1 | Create unique user and team roles so that access to source code can be tailored | <span style="color: green">Easy</span> | <ul><li>APRA234</li><li>CIS8</li><li>ISM GSD</li><li>NIST 800-53B</li><li>SSDF1.1</li></ul> |
| 2.3 | SSH | 2 | Use the SSH protocol to access your repositories instead of HTTPS | <span style="color: green">Easy</span> | <ul><li>APRA234</li><li>CIS8</li><li>ISM GSD</li><li>NIST 800-53B</li><li>SSDF1.1</li></ul> |
| 2.4 | Multi-Factor Authentication | 1 | Make sure all developers use multi-factor authentication (MFA) when pulling, fetching or pushing code to remote. This is especially important if you use company email as your login for SCM | <span style="color: green">Easy</span> | <ul><li>APRA234</li><li>CIS8</li><li>ISM GSD</li><li>NIST 800-53B</li><li>SSDF1.1</li></ul> |
| 2.5 | Server side git hook | 3 | Utilize a server side git hook like update or post-receive hook to run automatic scans | <span style="color: orange">Medium</span> | <ul><li>APRA234</li><li>CIS8</li><li>NIST 800-53B</li><li>SSDF1.1</li></ul> |
| 2.6 | Developer Collaboration | 2 | Use collaboration tools to document the changes to a software application | <span style="color: red">Difficult</span> | <ul><li>APRA234</li><li>CIS8</li><li>NIST 800-53B</li><li>SSDF1.1</li></ul> |
| 2.6 | Pull Requests | 1 | Enforce pull or merge requests so all code is verified by team lead or senior engineer | <span style="color: green">Easy</span> | <ul><li>APRA234</li><li>CIS8</li><li>ISO27001</li><li>NIST 800-53B</li><li>SSDF1.1</li></ul> |
| 2.8 | Peer reviews | 1 | Enforce peer reviews by software engineers colleagues to increase code quality and security | <span style="color: green">Easy</span> | <ul><li>APRA234</li><li>CIS8</li><li>ISO27001</li><li>NIST 800-53B</li><li>SSDF1.1</li></ul> |
| 2.9 | CODEOWNERS | 1 | Create a CODEOWNERS file that identifies people and teams that own specific parts of the repository and should be consulted via PR when those parts of the repo are modified. | <span style="color: green">Easy</span> | <ul><li>APRA234</li><li>CIS8</li><li>ISO27001</li><li>NIST 800-53B</li><li>SSDF1.1</li></ul> |

<h2 id="cicd">CI/CD Pipelines and Automation</h2>

Modern web applications are built using modern continuous integration and deployment processes.  This means that you run tests specific to whatever environment you are pushing to whether that's DEV, STAGING or PROD.

| Control | Name | Priority | Description | Difficulty | Maps to security frameworks |
| :--- | :---        | :---   | :--- | :---    | :---    |
| 3.1 | CI/CD pipeline | 1 |Implement a CI/CD pipeline | <span style="color: orange">Medium</span> | <ul><li>APRA234</li><li>CIS8</li><li>ISM GSD</li><li>ISO27001</li><li>SSDF1.1</li></ul> |
| 3.2 | Application Environments | 2 | Create separate environments for dev, staging and prod, and treat each as independent with its own data, testing and requirements | <span style="color: orange">Medium</span> | <ul><li>CIS8</li><li>ISM GSD</li><li>ISO27001</li><li>SSDF1.1</li></ul> |
| 3.3 | Application Data Separation | 3 | Make sure that dev and test environments are **not** using the same data as production. If the use of live data is required then make sure that data is anonymized. | <span style="color: red">Difficult</span> | <ul><li>CIS8</li><li>ISM GSD</li><li>ISO27001</li><li>SSDF1.1</li></ul> |
| 3.4 | CI/CD Administration | 3 | Create and enforce user or team roles so that only the appropriate people can change or disable tests and deployment requirements | <span style="color: orange">Medium</span> | <ul><li>CIS8</li><li>ISM GSD</li><li>ISO27001</li><li>SSDF1.1</li></ul> |
| 3.5 | Credential Store | 1 | Create a secure encrypted place to store senstive credentials like passwords, API keys, etc. | <span style="color: orange">Medium</span> | <ul><li>APRA234</li><li>CIS8</li><li>ISM GSD</li><li>NIST 800-53.2b</li><li>SSDF1.1</li></ul> |
| 3.6 | Centralized Software Composition Analysis | 1 | Scan source code for vulnerable libraries and open source software from within a CD stage | <span style="color: green">Easy</span> | <ul><li>APRA234</li><li>CIS8</li><li>ISM GSD</li><li>ISO27001</li><li>NIST 800-53.2a</li><li>SSDF1.1</li></ul> |
| 3.7 | Centralized Static Code Analysis | 2 | Scan source code for vulnerabilities in the source code itself from within a CD stage | <span style="color: green">Easy</span> | <ul><li>APRA234</li><li>CIS8</li><li>ISM GSD</li><li>ISO27001</li><li>NIST 800-53.2b</li><li>SSDF1.1</li></ul> |
| 3.8 | Centralized Sensitive Data Analysis | 2 | Scan source code for secrets, credentials, API keys and similar from within a CD stage | <span style="color: green">Easy</span> | <ul><li>APRA234</li><li>CIS8</li><li>ISM GSD</li><li>ISO27001</li><li>NIST 800-53B</li><li>SSDF1.1</li></ul> |
| 3.9 | DAST | 3 | Scan running application for vulnerabilities | <span style="color: orange">Medium</span> | <ul><li>CIS8</li><li>ISM GSD</li><li>ISO27001</li><li>NIST 800-53B</li><li>NIST 800-53B</li><li>SSDF1.1</li></ul> |

<h2 id="deployment">Deployment</h2>

Applications are deployed somewhere whether that's an AWS Lambda, S3 bucket or some old crusty server in the corner of the server room.  In any case, DevSecOps best practices mean that you need to include that deployment location in your processes.  

| Control | Name | Priority | Description | Difficulty | Maps to security frameworks |
| :--- | :---        | :---   | :--- | :---    | :---    |
| 4.1 | Valid SSL Certificate | 1 | Create and use a valid SSL certificate for each application URL, or implement a wildcard cert | <span style="color: orange">Easy</span> | <ul><li>APRA234</li><li>CIS8</li><li>ISM GSD</li><li>ISO27001</li><li>NIST 800-53B</li><li>SSDF1.1</li></ul> |
| 4.2 | Encrypt Traffic | 1 | Encrypt all traffic that's public facing | <span style="color: orange">Medium</span> | <ul><li>APRA234</li><li>CIS8</li><li>CIS8</li><li>ISM GSD</li><li>ISO27001</li><li>NIST 800-53B</li><li>SSDF1.1</li></ul> |
| 4.3 | Redirect to HTTPS | 1 | Configure web service to redirect all inbound requests to port 80 to the secure HTTPS endpoint | <span style="color: green">Easy</span> | <ul><li>CIS8</li><li>ISM GSD</li><li>ISO27001</li><li>NIST 800-53B</li><li>SSDF1.1</li></ul> |
| 4.4 | HSTS | 1 | Enable HSTS in your webserver, load balancer or CDN | <span style="color: green">Easy</span> | <ul><li>CIS8</li><li>ISM GSD</li><li>ISO27001</li><li>NIST 800-53B</li><li>SSDF1.1</li></ul> |
| 4.5 | CSP | 1 | Enable content security policy (CSP) in the webserver, load balancer or CDN | <span style="color: green">Easy</span> | <ul><li>CIS8</li><li>ISM GSD</li><li>ISO27001<li>NIST 800-53B</li></ul> |
| 4.6 | Use Current Software | 1 | Use the most recent versions of application components, languages, frameworks and operating systems | <span style="color: red">Difficult</span> | <ul><li>CIS8</li><li>ISM GSD</li><li>ISO27001<li>SSDF1.1</li></ul> |
| 4.7 | Alternative Deployment | 3 | Have tested and working alternative way to deploy changes to your application other than using your standard process with GitHub or Bitbucket in case they go down. This must include the ability to push to PROD from local in emergencies. | <span style="color: red">Difficult</span> | <ul><li>CIS8</li><li>NIST 800-53B</li><li>SSDF1.1</li></ul> |
| 4.8 | security.txt | 1 | Create a security.txt file in the root of your application so people know how to contact you about security issues | <span style="color: green">Easy</span> | <ul><li>CIS8</li><li>ISM GSD</li><li>SSDF1.1</li></ul> |
| 4.9 | X-Forwarded-By | 2 | Configure your webservers, load balancers & web proxies to include the X-Forwarded-By: header | <span style="color: green">Easy</span> | <ul><li>APRA234 ATM D-2-d-i</li><li>CIS8</li><li>NIST 800</li></ul> |
| 4.10 | Logging | 1 | Collect application logs in realtime and send to centralized storage or SIEM | <span style="color: orange">Medium</span> | <ul><li>CIS8 16.11</li><li>APRA234</li><li>ISM GSM</li><li>NIST 800</li><li>SSDF1.1</li></ul> |
| 4.11 | WAF | 2 | Implement a web application firewall (WAF) to protect your application from known attacks | <span style="color: orange">Medium</span> | <ul><li>APRA234</li><li>CIS8</li><li>NIST 800-53.2a</li></ul> |
| 4.12 | CDN | 3 | Use a content delivery network (CDN) whenever possible to add availability and security to you applications | <span style="color: orange">Medium</span> | <ul><li>APRA234</li><li>CIS8</li><li>ISM GN</li><li>NIST 800-53.2a</li></ul> |
| 4.13 | Harden Operating System | 2 | Harden operating system using industry best practices from CIS, ISM, etc | <span style="color: red">Difficult</span> | <ul><li>CIS8</li><li>ISM GSM</li><li>ISM GOSH</li><li>SSDF1.1</li></ul> |
| 4.14 | Encrypt Storage | 3 | Encrypt all filesystems, disks and cloud storage | <span style="color: orange">Medium</span> | <ul><li>CIS8</li><li>NIST 800-50b</li><li>SSDF1.1</li></ul> |
| 4.15 | SBOM | 3 | Generate a **real-time** software bill-of-materials (SBOM) | <span style="color: orange">Medium</span> | <ul><li>CIS8</li><li>ISM GSD</li><li>NIST 800-53B</li><li>SSDF1.1</li></ul> |
| 4.16 | Monitor Application | 1 | Monitor your application in real-time so you know when its state changes for the worse (or better). This includes uptime, performance and security monitoring | <span style="color: orange">Medium</span> | <ul><li>CIS8</li><li>NIST 800-53B</li><li>SSDF1.1</li></ul> |

<h2 id="org">Organization</h2>

People don't deploy applications, organizations do.  Some steps in the DevSecOps playbook need to be owned by the Organization itself.  

| Control | Name | Priority | Description | Difficulty | Maps to security frameworks |
| :--- | :---        | :---   | :--- | :---    | :---    |
| 5.1 | Penetration Testing | 2 | Have your application pentested regularly | <span style="color: orange">Medium</span> | <ul><li>CIS8</li><li>ISM GSD</li><li>NIST 800-53B</li><li>SSDF1.1</li></ul> |
| 5.2 | Threat Modeling | 3 |  Build a collaborative way for developers and security staff to understand the threat landscape for an individual application | <span style="color: red">Difficult</span> | <ul><li>CIS8</li><li>ISM GSD</li><li>NIST 800-53B</li><li>SSDF1.1</li></ul> |
| 5.3 | SIEM | 3 | Implement a SIEM and send all application, system and cloud logs to it | <span style="color: red">Difficult</span> | <ul><li>CIS8</li><li>NIST 800-53B</li><li>SSDF1.1</li></ul> |
| 5.4 | Attack Surface Management | 1 | Identify public facing resources via automation | <span style="color: green">Easy</span> | <ul><li>CIS8</li><li>CIS8</li><li>NIST 800-53B</li><li>SSDF1.1</li></ul> |
| 5.5 | Sovereignty | 1 | Require that all code is written in, stored in, or otherwise served from a location and/or sovereignty that aligns with your org's requirements | <span style="color: orange">Medium</span> | <ul><li>ISM GCSR</li><li>ISO27001</li></ul> |
| 5.6 | Vulnerability Disclosure | 1 | Create and publish a set of procedures to let people contact you when they find security issues in your app | <span style="color: green">Easy</span> | <ul><li>CIS8</li><li>ISM GSD</li><li>SSDF1.1</li></ul> |
| 5.7 | Bug Bounty | 3 | Setup a bug bounty program to incentivize security researchers to tell you about vulnerabilities they find | <span style="color: orange">Medium</span> | <ul><li>CIS8</li><li>ISM GSD</li><li>NIST 800-53B</li><li>SSDF1.1</li></ul> |

![DevSecOps Continuous Improvement](/images/devsecops-controls.jpg)

<h2 id="compliance">Compliance - Security Framework Reference Material</h2> 

Because this is meant to be a manifesto about how to do DevSecOps, we have to be cognizant that there are three groups of people that this affects: Developers, Operations and InfoSec.  Historically, there are many compliance frameworks that address the InfoSec community and to a lessor extent Operations teams.  But software development was never mentioned until only recently.  Understanding this, I wanted to note that most commonly there is only one section of a particular compliance framework that relates to software development. This is a list of the specific sections of several larger compliance frameworks that deal with software development specifically.

* NIST 800-53b SA 10, 11, 15, 16 and 17
* NIST 800-218 "Secure Software Development Framework"
* ISO 27001 Annex A Section 14
* CIS Section 16
* Australian ISM "Guidelines for Secure Development"

Below you will find links to several security frameworks that align with this document.  I have personally spent many years implementing CIS controls into my application environments.  CIS is a wonderful framework as its very prescriptive and easy for an engineer to understand.  This is not to say that CIS controls are easy to implement.  They are not!  Regardless, you can't deny the ubiquity of ISO27001 and SOC2 and I want this document to help orgs looking to meet those requirements as well.  In fact, SecureStack has started a SOC2 program and in parallel to writing this document I am busily mapping SOC2 requirements and will eventually add them to this document.

I had a number of Australian friends suggest that I tackle the Australian ISM and APRA CPS 234, so I've added both of these as well.  This is a work in progress and I encourage anyone that is interested to jump in and suggest mappings.  You can add an issue in GitHub or simply create a PR.  

### NIST 800
NIST 800-218 (2022) "Secure Software Development Framework" (SSDF) version 1.1: https://csrc.nist.gov/publications/detail/sp/800-218/final

NIST 800-53b (2021): https://csrc.nist.gov/publications/detail/sp/800-53b/final   
Control Families via HTML: https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/families?version=5.1

1. [SA-11: Developer Testing and Evaluation](https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=SA-11)   
2. [SA-15: Development Process, Standards, and Tools](https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=SA-15)  
3. [SA-16: Developer-Provided Training](https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=SA-16) 
4. [SA-17: Developer Security and Privacy Architecture and Design](https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=SA-17)  

NIST 800-92: https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-92.pdf   
NIST 800-95: Guide to Secure Web Services (2007): https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-95.pdf   

### CIS Critical Security Control 16: Application Software Security
The Center for Internet Security is an organization that has been providing very prescriptive security controls since 2000. There are a total of 18 security control groups with section 16 being the group we will be referencing for this document.  
https://www.cisecurity.org/controls/application-software-security

It's not the focus of this document, but CIS maintains an amazing set of benchmarks and build playbooks for most operating systems.  I have been using these templates for years and they are a great resource:  https://www.cisecurity.org/cis-benchmarks/

### Australian ISM 
The Australian Cyber Security Centre has authored a document called the "Information Security Manual" or ISM as its commonly called.  The landing page for this document is https://www.cyber.gov.au/sites/default/files/2021-12/Information%20Security%20Manual%20%28December%202021%29.pdf.  

This document is large and has a very broad scope.  You can download the complete ISM at https://www.cyber.gov.au/sites/default/files/2021-12/Information%20Security%20Manual%20%28December%202021%29.pdf

In late 2021 the ACSC released the "Guidelines for Software Development" (GSD).  These are a general set of guidelines for embedding secure coding practices into an organization. These guidelines are far from authoritative and are not very prescriptive with my favorite snippet from the GSD being this little gem: "Platform-specific secure programming practices are used when developing software, including using the lowest privilege needed to achieve a task, checking return values of all system calls, validating all inputs and encrypting all communications."  Is that a catch all or what?!  Wow!  Regardless, I am respectful of the energy that went into this set of guidelines and will continue to try and bring visibility to it as much as I personally can.

You can find the GSD here:  https://www.cyber.gov.au/acsc/view-all-content/advice/guidelines-software-development  

### APRA CPG 234
The Australian Prudential Regulation Authority (APRA) is part of the Australian government and is charged with regulating the financial industry. It published the "Prudential Standard CPS 234" document in 2019 which outlines high level information security requirements. 

This document is organized in an unusual way with 8 "attachments" at the end of the doc.  It is in these attachments that the security controls and expectations are laid out. You can find the APRA 234 document at https://www.apra.gov.au/sites/default/files/cpg_234_information_security_june_2019_0.pdf.   

### ISO27001 Annex A.14: System Acquisition, Development & Maintenance
ISO27001 is an international standard on how to manage information security. It measures the maturity of an organization with a total of 114 controls spread across 14 groupings. ISO27001 is built on the principle of gathering the documentation around these security controls in an information security management system (ISMS).

Group A.14 revolves around the acquisition and development of IT systems.  It is the only part of the ISO27001 specification that mentions specific  

