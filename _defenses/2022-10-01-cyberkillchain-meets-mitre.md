---
layout: defense
title: Cyber Kill Chain meets MITRE ATT&CK
---

In this article we will dive into Cyber Kill Chain and MITRE ATT&CK. After getting comfortable with both frameworks, a short combination of both will be shown. The fishbone model is still under construction.

## Cyber Kill Chain® Framework

As a first step, let’s talk about the [Cyber Kill Chain® Framework](https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html). The framework itself was developed by Lockheed Martin. It includes the different stages of common cyber attack, starting from the reconnaissance stage till the end goal stage. Most of the successful attacks which were performed by various APT (Advanced Persistent Threat) groups, or the “attack groups”, often adopt the end-to-end process of the Cyber Kill Chain as part of their methodologies. So it's a good idea to be familiar with it. Disrupting attackers at any point in the cycle may help reduce the impacts of the attacks.

<p align="center">
<img width=600  src="/images/kill-chain-process.png">
</p>

Let's discuss the stages displayed in the process above:

1. **Reconnaissance** — Adversary chooses the target, gathers information, and identifies vulnerabilities
2. **Weaponization** — Adversary creates malware weapons to exploit vulnerabilities (e.g. virus, worm, etc.)
3. **Delivery** — Adversary transmits weapon to selected target, using various methods (e.g. phishing, social engineering, compromised accounts, etc.)
4. **Exploitation** — Adversary triggers malware to exploit target’s weakness
5. **Installation** — Adversary performs installation (e.g. malware codes, modify security certificates, time bombs in system, etc.)
6. **Command & Control** — Adversary remotely controls and manipulates target
7. **Actions On Objectives** — Adversary performs actions to achieve their goals (e.g. data exfiltration/theft, data encryption for ransom, or data destruction)

## MITRE ATT&CK® Framework

Now, let’s visit the [MITRE ATT&CK® Framework](https://attack.mitre.org/) in contrast. ATT&CK stands for Adversarial Tactics, Techniques, & Common Knowledge. This framework takes a deeper dive into the matrix that consists of various (cyber) attack techniques, categorized by tactics that adversaries/attackers can utilize to infiltrate your network and exfiltrate data. To walk through the framework take a look at my [MITRE ATT&CK Bash Oneliner](https://benjitrapp.github.io/memories/2022-01-15-MITRE-Attack/)

To put it simply…
· **Tactics** → WHY and WHAT an adversary is trying to accomplish
· **Techniques** → HOW an adversary achieves a tactical objective

Below is a list of the tactics, with examples of the techniques and how organizations can mitigate them and disrupt attackers from achieving their goals:

1. [Reconnaissance](https://attack.mitre.org/tactics/TA0043/): Attacker gathers information to utilize and plan future operations

    [Gather Victim Identity Information](https://attack.mitre.org/techniques/T1589/) — Organizations should place more efforts in limiting the amount of sensitive data available to external entities.

2. [Resource Development](https://attack.mitre.org/tactics/TA0042/): Attacker tries to establish resources to support operations

    [Pre-compromise](https://attack.mitre.org/mitigations/M1056/) — Unfortunately, this tactic cannot be easily mitigated as it includes actions performed by the attackers outside the scope of the organization’s defenses and controls.

3. [Initial Access](): Attacker tries to get into your network

    [Phishing](https://attack.mitre.org/techniques/T1566/) — Organizations should have [antivirus/antimalware software](https://attack.mitre.org/mitigations/M1049/) to detect and protect against malware. They can also provide [user training](https://attack.mitre.org/mitigations/M1017/) for their employees to help them identify malicious emails from phishing campaigns and social engineering techniques.

4. [Execution](https://attack.mitre.org/tactics/TA0002/): Attacker tries to run a malicious code

    [User Execution](https://attack.mitre.org/techniques/T1204/) — Organizations should have [network intrusion prevention systems](https://attack.mitre.org/mitigations/M1031/) where they perform scans to remove malicious email attachments and links. Again, they should train their employees to identify and raise those potentially malicious events.

5. [Persistence](https://attack.mitre.org/tactics/TA0003/): Attacker tries to maintain their access into your system)

    [Account Manipulation](https://attack.mitre.org/techniques/T1098/) — Orgs should have [Multi-Factor Authentication (MFA)](https://attack.mitre.org/mitigations/M1032/) for their employee accounts to prevent attackers from preserving their access to compromised accounts.

6. [Privilege Escalation](https://attack.mitre.org/tactics/TA0004/): Attacker tries to gain higher-level permissions

    [Valid Accounts](https://attack.mitre.org/techniques/T1078/) — Orgs should ensure that they have strong [privileged account management](https://attack.mitre.org/mitigations/M1026/), where they carefully assess the creation, modification, use, and especially the permissions of those accounts.

7. [Defense Evasion](https://attack.mitre.org/tactics/TA0005/): Attacker tries to avoid being detected

    [Impair Defenses](https://attack.mitre.org/techniques/T1562/) — Orgs should [restrict file and directory permissions, registry permissions](https://attack.mitre.org/mitigations/M1022/), and have strong [user account management](https://attack.mitre.org/mitigations/M1018/) to prevent attackers from disabling or interfering with security and logging services.

8. [Credential Access](https://attack.mitre.org/tactics/TA0006/): Attacker tries to steal account names and passwords

    [Brute Force](https://attack.mitre.org/techniques/T1110/) — Orgs should follow the best practices for [account use policies, password policies](https://attack.mitre.org/mitigations/M1036/), and user account management to detect and prevent attackers from gaining access to credentials. Again, [MFA](https://attack.mitre.org/mitigations/M1032/) is also an essential component.

9. [Discovery](https://attack.mitre.org/tactics/TA0007/): Attacker tries to figure out your environment

    [Account Discovery](https://attack.mitre.org/techniques/T1087/) — Orgs should have strong [operating system configurations](https://attack.mitre.org/mitigations/M1028/) to prevent unauthorized disclosure of account lists the attackers can use to support their attacks. This could be achieved by hardening based on CIS Benchmarks

10. [Lateral Movement](https://attack.mitre.org/tactics/TA0008/): Attacker tries to move through your environment

    [Exploitation of Remote Services](https://attack.mitre.org/techniques/T1210/) — Orgs should follow the best practices for their [network segmentation](https://attack.mitre.org/mitigations/M1030/) to reduce access to critical systems and services for the attackers to access remotely. Orgs should also perform frequent [software updates](https://attack.mitre.org/mitigations/M1051/) and [vulnerability scans](https://attack.mitre.org/mitigations/M1016/) to mitigate remote exploitations.

11. [Collection](https://attack.mitre.org/tactics/TA0009/): Attacker tries to inconspicuously gather data of interest based on their goals

    [Archive Collected Data](https://attack.mitre.org/techniques/T1560/) — Orgs should have strong [audit](https://attack.mitre.org/mitigations/M1047/) measures to identify potential weaknesses. In this scenario, to identify unauthorized archival activities.

12. [Command and Control](https://attack.mitre.org/tactics/TA0011/): Attacker tries to communicate with compromised systems to control them

    [Web Service](https://attack.mitre.org/techniques/T1102/) — Orgs should [restrict web-based content](https://attack.mitre.org/mitigations/M1021/) to prevent employees from accessing certain external services. This is crucial since attackers can essentially conceal their activities through popular social media and websites.

13. [Exfiltration](https://attack.mitre.org/tactics/TA0010/): Attacker tries to steal gathered data

    [Exfiltration Over Web Service](https://attack.mitre.org/techniques/T1567/) — Again, orgs should restrict web-based content since popular web services can act as a cover and protection for the attackers while stealing the data

14. [Impact](https://attack.mitre.org/tactics/TA0040/): Attacker tries to manipulate, interrupt, destroy your systems and data

    [Data Destruction](https://attack.mitre.org/techniques/T1485/) — Orgs should have [data backup](https://attack.mitre.org/mitigations/M1053/) plans to recover and restore data, while ensuring that backups are unavailable and untouchable to the attackers.

If you are interested, take a look at the vast amounts of [techniques](https://attack.mitre.org/techniques/enterprise/) the attackers can use for each [tactic](https://attack.mitre.org/tactics/enterprise/).

In a nutshell, the ATT&CK® Framework is backed up by many real-world observations and findings and is constantly updated to help organizations to “understand their adversaries”. Essentially, it provides insights on how attackers can potentially get in, avoid being caught, and manipulate, interrupt, or destroy critical organization assets/resources.

## Cyber Kill Chain® meets MITRE ATT&CK®

The term Cyber Kill Chain is also used by various organizations besides the one from LockHeed Martin ([Gartner](http://blogs.gartner.com/ramon-krikken/2014/08/08/introducing-gartners-cyber-attack-chain-model/), [Varonis](https://www.varonis.com/blog/cyber-kill-chain/), [SANS](https://www.sans.org/course/red-team-exercises-adversary-emulation)). Those models are all having slight variants but are based on the original one. That might confuse, even more if you assume there is only one Cyber Kill Chain model. With the knowledge based on MITRE ATT&CK this confusion might gets increased further and ask yourself, how they fit together.

One of the reasons why they can be so confusing to new learners with Penetration Testing background is because they are more or less derived from a typical Penetration Testing workflow. Anyone with Penetration Testing background could be bluffed by them with terms “model”, “kill chain”, "APT" and “weaponization”.

For the sake of simplicity, and completeness at the same time, the baseline of all known Kill Chain Models is added as a root node into the Fishbone Diagram below. All nodes are also enriched with MITRE ATT&CK Tactics and Techniques.

<p align="center">
<img width=600  src="/images/Attack_Kill_Chain.png">
</p>

Get the more detailed Version:
* [PDF](/assets/defense/ATT&CK_Cyber_Kill_Chain.pdf)
* [XMind](/assets/defense/ATT&CK_Cyber_Kill_Chain.xmind)


### Sources & Relevant Links

* [Cyber Kill Chain® Framework](https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html)
* [MITRE ATT&CK® Framework](https://attack.mitre.org/)
* Keep up with [MITRE ATT&CK’s Medium blog](https://medium.com/mitre-attack)
