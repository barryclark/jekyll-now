---
layout: post
title: 'This Week in Cybersecurity: April 17-23, 2022'
author_avatar: https://avatars.githubusercontent.com/u/2421172?v=4
author_name: Alex Smith
author_github_username: tradesmanhelix
excerpt: A look back at the top cybersecurity stories from the week.
---

Hi everyone! My name is Alex(ander) Smith. You'll see me around the web by the anagram _tradesmanhelix_. I'm a full-stack software engineer and all-around geek who recently joined the Maxwell Engineering team. I love programming in Ruby, tend to take way too much cream in my coffee, and enjoy dabbling in cybersecurity for fun in my spare time.

Going forward, I plan to collect and share security stories and news from the week on the Maxwell Engineering Blog. I hope you find this information useful as you try to stay abreast of developments in the ever-changing security landscape.

##  Major News Stories
* As we all know, Heroku had a fun week.
  * Apparently, it all started when someone at Github noticed that an AWS key stored in a private Github repo was used in an unauthorized manner.
  * It appears that the issue lies with Heroku, and it likely has something to do with Heroku's use of TravisCI.
  * The Heroku / Gihub connection is still down as of the time of this post.
  * Heroku is posting incident status updates here: [https://status.heroku.com/incidents/2413](https://status.heroku.com/incidents/2413)
* The latest Insider build of Windows 11 has disabled the SMB v. 1 protocol by default. This is a big deal as SMB v. 1 - [the venerable file sharing protocol](https://visualitynq.com/resources/articles/what-is-smb/) - has historically been a major attack vector for Windows, so turning it off by default can only be a good thing.
* "Psychic Signatures" is a new Java vulnerability that's been getting a lot of attention. It targets elliptic curve crypto digital signature verification in Java.
  * As part of ECDSA signature verification, two values (`r` and `s`) are multiplied to ensure signature validity.
  * An issue arises if `r` and `s` are zero since `0 * <anything> = 0`.
  * Java forgot the "check for zero" part, thus leading to a vulnerability where invalid signatures are declared valid.

## Other Software with Critical Patches Available
* Cisco Wireless Controller Bug: Patch for a CVE with a 10/10 score.

## Learning -- SQL Injection
SQL injection is defined as:

> "User input which is executed in an SQL query at runtime." [1]

SQL injection attacks are pretty common on the web. In fact, SQL injection is one of the [OWASP top 10 attacks](https://owasp.org/Top10/A03_2021-Injection/)! That being the case, what is one of the most surefire ways to protect against SQL injection?

In considering the answer to this question, recall that a SQL injection attack requires that we execute user input in a SQL query. Therefore, it stands to reason that our best protection is some means of shielding us from malicious user input. We can in fact do this via _prepared statements_:

> "[Prepared statements are] essentially an SQL template, where user values are substituted at runtime and can't modify the query. There's an added bonus here where this can also improve performance, as you can execute similar queries repeatedly with high efficiency." [2]

In Rails, you can use _bind parameters_ to invoke prepared statements in the underlying DB and make your queries safe [3]:

```ruby
# User supplied sha
short_sha = "e92'1a1c"

# Unsafe
Post.where("sha LIKE '%#{short_sha}%'").to_sql
=> "SELECT \"posts\".* FROM \"posts\" WHERE (sha LIKE '%e92'1a1c%')"

# Safe - Notice the doubling up of the quote character
Post.where("sha LIKE ?", "%#{short_sha}%")
=> "SELECT \"posts\".* FROM \"posts\" WHERE (sha LIKE '%e92''1a1c%')"
```

[1] [https://github.com/PagerDuty/security-training/blob/master/docs/for_engineers/index.md#prepared-statements](https://github.com/PagerDuty/security-training/blob/master/docs/for_engineers/index.md#prepared-statements)  
[2] [https://github.com/PagerDuty/security-training/blob/master/docs/for_engineers/index.md#prepared-statements](https://github.com/PagerDuty/security-training/blob/master/docs/for_engineers/index.md#prepared-statements)  
[3] [https://blog.saeloun.com/2019/10/28/bind-parameters-in-activerecord-sql-queries.html](https://blog.saeloun.com/2019/10/28/bind-parameters-in-activerecord-sql-queries.html)

## Sources & Resources
The following were used or referenced when preparing this debrief.
* [https://isc.sans.edu/podcast.html](https://isc.sans.edu/podcast.html)
* [https://arstechnica.com/information-technology/2022/04/major-crypto-blunder-in-java-enables-psychic-paper-forgeries/](https://arstechnica.com/information-technology/2022/04/major-crypto-blunder-in-java-enables-psychic-paper-forgeries/)
* [https://arstechnica.com/gadgets/2022/04/microsoft-enters-final-phase-of-disabling-smb1-file-sharing-in-windows-11/](https://arstechnica.com/gadgets/2022/04/microsoft-enters-final-phase-of-disabling-smb1-file-sharing-in-windows-11/)
* [https://tools.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-wlc-auth-bypass-JRNhV4fF](https://tools.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-wlc-auth-bypass-JRNhV4fF)
* [https://blog.cloudflare.com/ecdsa-the-digital-signature-algorithm-of-a-better-internet/](https://blog.cloudflare.com/ecdsa-the-digital-signature-algorithm-of-a-better-internet/)
* [https://github.com/PagerDuty/security-training/blob/master/docs/for_engineers/index.md#prepared-statements](https://github.com/PagerDuty/security-training/blob/master/docs/for_engineers/index.md#prepared-statements)

----

Thanks for reading, stay safe out there, and have a great weekend! 👩‍💻 🌐 👨‍💻
