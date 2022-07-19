---
layout: culture
title: Threat Modeling 
---

Threat Modeling works to identify, communicate, and understand threats and mitigations within the context of protecting something of value.

A Threat Model is a structured representation of all the information that affects the security of an application. In essence, it is a view of the application and its environment through the lens of security.

## Threat Modeling at a glance

Threat modeling is analyzing representations of a system to highlight concerns about security and privacy characteristics.

At the highest levels, when we Threat Model, we ask four key questions:

* What are we working on?
* What can go wrong?
* What are we going to do about it?
* Did we do a good enough job?

> A Threat Model is NOT an architectural model of the system!
  -> No complete architecture
  -> Focuses on data flow

## Why Threat Model?

When you perform Threat Modeling, you begin to recognize what can go wrong in a system. It also allows you to pinpoint design and implementation issues that require mitigation, whether it is early in or throughout the lifetime of the system. The output of the Threat Model, which are known as threats, informs decisions that you might make in subsequent design, development, testing, and post-deployment phases.

## Who should Threat Model?

You. Everyone. Anyone who is concerned about the privacy, safety, and security of their system.

## Threat Modeling Manifesto

Source:  [threatmodelingmanifesto.org](https://www.threatmodelingmanifesto.org/)

#### Values

> We have come to value:

* A culture of finding and fixing design issues over checkbox compliance.
* People and collaboration over processes, methodologies, and tools.
* A journey of understanding over a security or privacy snapshot.
* Doing Threat Modeling over talking about it.
* Continuous refinement over a single delivery.
  
#### Principles

> We follow these principles:

* The best use of Threat Modeling is to improve the security and privacy of a system through early and frequent analysis.
* Threat Modeling must align with an organization’s development practices and follow design changes in iterations that are each scoped to manageable portions of the system.
* The outcomes of Threat Modeling are meaningful when they are of value to stakeholders.
* Dialog is key to establishing the common understandings that lead to value, while documents record those understandings, and enable measurement.

## How to create a Threat Model

We already learned that a Threat Model is based on a Data Flow. Let's paint one:

<p align="center">
<img width="600" src="/images/dataflow.png">
</p>

In the picture above we have the following components:

* External Entity - e.g., clients, other systems, dependencies
* Process - Architecture-centered functionality e.g., dispatcher, input validator
* Data Store - e.g., database, file system
* Data Flow - Domain-specific explanation of data e.g., “Login Requests

Wait where's the Security coming in? This description doesn't secure anything yet.

#### Trusted Boundaries

Time to bring some Security aspects in and optimize the Dataflow Model to secure things by introducing: Trusted Boundaries

<p align="center">
<img width="600" src="/images/trustboundary.png">
</p>

Like shown in the picture above - draw a trust boundary when data from one party to another is not trusted

**Untrusted examples:**

* Data from a web browser (e.g., external entity)
* Data from one machine to another

**Trusted examples:**

* Data from another process within the same runtime environment
* Data from your own database

## STRIDE: Acronym of Threat Modeling System

Trusted Boundaries are awesome but to increase the level of Security we need to go further. To optimize there are different frameworks around like: Octave, Trike and STRIDE.The easiest and probably best known framework is provided STRIDE which is developed by developed by Praerit Garg and Loren Kohnfelde at Microsoft.

In simple terms, any cyber attack can be classified among STRIDE. It is defined as:

* Spoofing
* Tampering
* Repudiation
* Information Disclosure
* Denial of Service
* Elevation of Privilege

### What is Spoofing?

If the hacker is able to access victim credentials by using brute force or social engineering technique, he/she can communicate to others by impersonating the victim's account. The simple example is attacker send messages from the victim account. It comes under the security attribute of Authentication. It can be mitigated by using the appropriate authentication mechanism for login in an application.

### What is Tampering?

Tampering is a term defined to unauthorize change of data or code while at rest or in transit. It comes under the property of integrity. It can be mitigated by using various cryptographic algorithms to secure data.

### What is Repudiation?

Here the user can dispute regarding sending messages. He or she can claim the messages not sent by them. It comes under the property of non-repudiation. It can be mitigated by using the digital signature for authentication and also create audit logs for activities.

### What is Information Disclosure?

If credit card information or personal details is disclosed on the internet, are some examples of information disclosure. It comes under the property of Confidentiality. It can be mitigated by using strong cryptographic algorithms for storing secret data, implementation of proper authorization mechanisms etc.

### What is Denial of Service?

A web application is not available to end users because of the cyber attacker attempts to drain all server's resources. It comes under the security attribute Availability. The simple example of Denial of Service attack is the non-availability of the website due to any reason. It can be mitigated by using network filtering and throttling techniques.

### What is the Elevation of privilege?

"A normal user able to delete the account of an administrator" is a perfect example of elevation of privilege. It comes under security attribute authorization. It can be mitigated by using the principle of run users with least privilege.

| Threat                   | Definition                          | Property        | Example                                                                  |
| -------------------------| ----------------------------------- | --------------- | ------------------------------------------------------------------------ |
| Spoofing                 | Pretend to be someone else          | Authentication  | Hack victim's email and use it to send messages in the name of the victim |
| Tampering                | Change data or code                 | Integrity       | Software executive file is tampered by hackers                           |
| Repudiation              | Claim not to do a particular action | Non-repudiation | "I have not sent an email to Alice"                                      |
| Information Disclosure   | Leakage of sensitive information    | Confidentiality | Credit card information available on the internet                        |
| Denial of Service        | Non-availability of service         | Availability    | Web application not responding to user requests                          |
| Elevation of Privilege   | Able to perform unauthorized action | Authorization   | Normal user able to delete admin account                                 |

## Apply STRIDE on the base Threat Model Elements

To combine the STRIDE approach with the four base elements of a Data Flow we can achieve a good guideline on the possibilities and restrictions of each element.

| Threat Model Element | Example | S | T | R | I | D | E |
| -------------------- | ------- | - | - | - | - | - | - |
| External Entity      | Browser |✅ |  | ✅|✅ |✅|  |
| Process              | Web Server| ✅ | ✅ | ✅| ✅ | ✅ | ✅|
| Data Store           | SQL Database| | ✅ | 🗸 | ✅| ✅| |
| Data Flow            | -           | | ✅ | ✅| ✅| |

If you want to go beyond that - try this List based on interactions:

<p align="center">
<img width="600" src="/images/stride-per-interaction.png">
</p>

Source: [Shostack - Threat modeling: designing for security](https://www.amazon.de/-/en/Adam-Shostack/dp/1118809998)

### Tools

##### UI painting

* [Draw.io Custom Templates](https://github.com/michenriksen/drawio-threatmodeling)
* [MSTMT App](https://github.com/BenjiTrapp/tmt-cloud-templates/wiki/Practical-Threat-Modeling)
* [Threat Modeling Worksheet](https://saweis.net/threatworksheet/)

##### Threat Modeling As Code

* [pyTM](https://github.com/izar/pytm)
* [Threagile.io](https://threagile.io/)
