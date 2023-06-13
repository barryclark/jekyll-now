---
layout: post
title: Note to self: mail sender autnetication protocols, and some basic description on SPF, DIKM, DMARK and others  
---


If you even try to build some modern mail server in Internet you probably meet with some demand to modify some DNS entries. In case of hyperscallers it will be nice instruction how to handle your domain (ofhten with some generic or poupular pannel screenshots). If you make if as self hosted it will be some criptic words like (SPF, Sender ID, DKIM, DMARC, and DANE). Those technoligies are so called mail sender authenication. First widely known protocol was SPF. But why beside SPF we  have to use at least DKIM, and then DMARC, and some vendors try to utilize DANE? Each of these technologies (SPF, Sender ID, DKIM, DMARC, and DANE) play a different role in the email authentication and security process and collectively they provide a more comprehensive solution. Here's a brief rundown of each:

- SPF (Sender Policy Framework): SPF is a protocol used to prevent spammers from sending emails on behalf of your domain. With SPF, an organization can publish authorized mail servers in DNS records. Receiving mail servers can then check if incoming mail comes from a server authorized by the domain owner.
- DKIM (DomainKeys Identified Mail): While SPF and Sender ID are focused on verifying the sender, DKIM provides an encryption key and digital signature that verifies that an email message was not forged or altered. It ties an email message to the sender's domain. DKIM records are also published in DNS.
- DMARC (Domain-based Message Authentication, Reporting & Conformance): DMARC is built on top of SPF and DKIM. It provides a policy on how the email receiver should handle emails that fail SPF or DKIM checks, and it provides a way for the email receiver to report back to the sender about emails that pass and/or fail the DMARC evaluation.
- DANE (DNS-Based Authentication of Named Entities): DANE is a protocol to allow X.509 certificates, commonly used for TLS, to be bound to DNS names using DNSSEC. It's being used more and more for additional security in SMTP to ensure the server you are connecting to is indeed the server it is supposed to be.

Beside those four there are less popular or used by specific purposes: 

- Sender ID: Sender ID is similar to SPF, but it checks the address in the P1 or return-path header, which is used for email bounce messages. This allows for detection of email spoofing or phishing attempts.
- MTA-STS (Mail Transfer Agent Strict Transport Security): MTA-STS is a relatively new protocol that allows a sending mail server to verify that the recipient supports secure (TLS) connections, and to specify how to handle failure cases (for example, whether to deliver the email unencrypted, or to not deliver it at all). MTA-STS helps to defend against man-in-the-middle attacks that try to downgrade a connection to plain text.
- BIMI (Brand Indicators for Message Identification): BIMI is a newer standard that's designed to prevent email spoofing and to increase user trust in email by displaying a logo that's verified as belonging to the sender.
- ARC (Authenticated Received Chain): ARC is a protocol that allows an intermediate mail server (like a mailing list or forwarding service) to sign an email, so that a receiving server can verify the email even if it would fail SPF or DKIM due to being modified by the intermediate server.

Addtionally there are some method to make other meaning mail authentication:
- SMTP Authentication (SMTP AUTH): This is a simple authentication method that's built into the SMTP protocol. It requires the SMTP client to provide a username and password before being allowed to send emails through the server. This helps to prevent unauthorized usage of the SMTP server.
- SMTPS/STARTTLS: These are protocols for transmitting email securely. SMTPS is essentially SMTP over SSL/TLS, whereas STARTTLS is a command to upgrade a plain text connection to an encrypted (SSL/TLS) connection. These help to prevent eavesdropping on email communications.
- S/MIME (Secure/Multipurpose Internet Mail Extensions): This is a standard for public key encryption and signing of MIME data (the format of the actual email content). It allows for secure transmission of emails by encrypting the content and allows the recipient to verify the sender.

In summary, these mechanisms provide multiple layers of security, each tackling a different aspect of the complex problem of email spoofing and phishing. SPF and Sender ID ensure that the email is being sent from a server authorized by the domain owner. DKIM ensures that the email content has not been tampered with in transit. DMARC sets a policy for how to handle emails that fail these checks, and DANE ensures secure server connections. The use of these technologies together strengthens email security as a whole.

In next few entries I will try to write / refer on some basico of ewry of that. 