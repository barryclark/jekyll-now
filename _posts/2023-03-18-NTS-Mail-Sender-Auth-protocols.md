---
layout: post
title: Note to Self - Mail Sender Authentication Protocols, and an Overview of SPF, DKIM, DMARC and others  
---

Building a modern mail server on the internet typically involves, beside other activity on exposed server,  tweaking DNS entries. Hyper-scalers often provide step-by-step instructions on how to handle your domain, often coupled with screenshots from popular control panels. For self-hosted solutions, you might come across acronyms such as SPF, Sender ID, DKIM, DMARC, and DANE. These technologies form the basis of mail sender authentication. 

But why do we need to use DKIM and DMARC alongside SPF? And why are some vendors starting to adopt DANE? Each of these technologies plays a unique role in the email authentication and security process, offering a comprehensive solution when used collectively. Here's a quick overview:

- [SPF (Sender Policy Framework)](https://tools.ietf.org/html/rfc7208): SPF is a protocol used to prevent spammers from sending emails on behalf of your domain. It allows an organization to publish authorized mail servers in DNS records, enabling receiving mail servers to verify if incoming mail originates from an authorized server.
- [DKIM (DomainKeys Identified Mail)](https://tools.ietf.org/html/rfc6376): Unlike SPF, which is focused on sender verification, DKIM uses an encryption key and digital signature to confirm that an email message hasn't been tampered with. It ties the email message to the sender's domain. DKIM records are also published in DNS.
- [DMARC (Domain-based Message Authentication, Reporting & Conformance)](https://dmarc.org/): Built upon SPF and DKIM, DMARC sets a policy for email receivers on how to handle emails failing SPF or DKIM checks, while also providing a reporting mechanism about emails that pass or fail the DMARC evaluation.
- [DANE (DNS-Based Authentication of Named Entities)](https://tools.ietf.org/html/rfc6698): DANE is a protocol that enables X.509 certificates, commonly used for TLS, to be bound to DNS names using DNSSEC. It is increasingly being utilized for additional SMTP security to ensure the authenticity of the server connection.

There are other less popular or purpose-specific technologies as well:

- Sender ID: Similar to SPF, Sender ID checks the address in the P1 or return-path header used for email bounce messages, enabling detection of email spoofing or phishing attempts.
- [MTA-STS (Mail Transfer Agent Strict Transport Security)](https://tools.ietf.org/html/rfc8461): A relatively new protocol that allows a sending mail server to verify recipient support for secure (TLS) connections and to specify how to handle failure cases.
- [BIMI (Brand Indicators for Message Identification)](https://bimigroup.org/): A new standard designed to prevent email spoofing and enhance user trust in emails by displaying a logo verified as belonging to the sender.
- [ARC (Authenticated Received Chain)](https://tools.ietf.org/html/rfc8617): A protocol that enables an intermediate mail server to sign an email so that a receiving server can verify the email even if it would fail SPF or DKIM checks due to modifications by the intermediate server.

Additionally, there are methods for alternate forms of mail authentication:

- SMTP Authentication (SMTP AUTH): A simple authentication method integrated into the SMTP protocol that requires the SMTP client to provide a username and password before being allowed to send emails through the server.
- SMTPS/STARTTLS: Protocols for transmitting email securely. SMTPS is SMTP over SSL/TLS, while STARTTLS is a command to upgrade a plain text connection to an encrypted (SSL/TLS) connection.
- [S/MIME (Secure/Multipurpose Internet Mail Extensions)](https://tools.ietf.org/html/rfc8551): S/MIME is a standard protocol for public key encryption and signing of MIME data (the format of the actual email content). It ensures secure transmission of emails by encrypting the content and allows the recipient to verify the sender.

To summarize, these mechanisms offer multiple layers of security, each addressing a different aspect of the complex problem of email spoofing and phishing. SPF and Sender ID ensure that the email is being sent from a server authorized by the domain owner. DKIM verifies that the email content hasn't been tampered with in transit. DMARC sets a policy on how to handle emails that fail these checks, and DANE ensures secure server connections. Collectively, these technologies significantly enhance email security.

In my upcoming posts, I aim to delve deeper into the basics of each of these technologies, shedding more light on their individual functionality and benefits.

**DISCLAIMER: mart of that text was generated using Chat GPT 4, but all was proofreaded and manualy verifed.**
