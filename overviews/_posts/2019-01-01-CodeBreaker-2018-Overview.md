---
layout: post
title: NSA Codebreaker 2018, Overview
---

Each year NSA puts out a challenge called Codebreaker that requires reverse engineering and exploitation skills. This year is was designed around the Ethereum blockchain; how to interact, deploy contracts, read storage, and exploit vulnerabilities. I believe this year was both easier and tougher than last year. The earlier tasks ask you to reverse engineer two Linux libraries that seem to be more obfuscated than last year. The later tasks ask you to interact and analyze Ethereum smart contracts, which in my opinion requires a different thinking than traditional programming. There were 7 tasks and 1 warm-up task. This year I was able to complete all six tasks, along with 1.18% of participants; 1529 finished task 0 (as of 31 Dec 2018). 

# Task 0 - Warm Up - (Network Traffic Analysis) #

This task is a warm up, and requires finding the attacker's IP in a short network traffic capture. 

[Task 0 Writeup](https://armerj.github.io/CodeBreaker-2018-Task-0/)

# Task 1 - It Begins - (Network Traffic Analysis; Binary Reverse Engineering) #

In this task you are given two Linux libaries and the ransom note, in order to find four pieces of information in the PCAP. 

[Task 1 Writeup](https://armerj.github.io/CodeBreaker-2018-Task-1/)

# Task 2 - Secrets - (Binary Reverse Engineering) #

This task requires you to find the secret that is used to generate the TOTP that the Ransom contract uses to authenticate with the Register contract. 

[Task 2 Writeup](https://armerj.github.io/CodeBreaker-2018-Task-2/)

# Task 3 - Connections - (Reverse Engineering; Cryptography; Software Development) #

For this task, you must determine how the victim ID is generated and use that information to generate the victim ID for the information provided from a victim's computer. 

[Task 3 Writeup](https://armerj.github.io/CodeBreaker-2018-Task-3/)

# Information on Blockchain #

Here is some information on the Ethereum blockchain, along with the flow for a victim being infected and paying the ransom. 

[Ethereum Blockchain Infromation](https://armerj.github.io/CodeBreaker-2018-Contract/)

# Task 4 - Victims - (Blockchain Analysis) #

This is the first task that you are required to interact with the blockchain. You are tasked with finding information on all victims registered with the Escrow contract and separating them into paid and unpaid.  

[Task 4 Writeup](https://armerj.github.io/CodeBreaker-2018-Task-4)

# Task 5 - Containment - (Blockchain Analysis; Cryptanalysis) #

Using the information from task 3 and 4, you need to determine what computers on a /16 subnet have been compromised. To make this task actually possible, the TOTPs used to authenticate with the Register contract need to be found.  

[Task 5 Writeup](https://armerj.github.io/CodeBreaker-2018-Task-5)

# Task 6 - Loophole - (Smart-Contract Development; Vulnerability Analysis; Exploit Development) #

For this task, the encryption key needs to be retrieved without paying the ransom amount. The easiest method is by noticing that the ransom amount is set by the Ransom contract, not the Escrow contract; so you can deploy your own modified contract. 

[Task 6 Writeup](https://armerj.github.io/CodeBreaker-2018-Task-6)

# Task 7 - Refunds - (Smart-Contract Development; Vulnerability Analysis; Exploit Development) #

This task continues the work from task 6, but now the ransom paid by the victims needs to be retrieved and returned. Only one line needs to be added to the contract from task 6, though understanding what to add is more difficult.  

[Task 6 Writeup](https://armerj.github.io/CodeBreaker-2018-Task-7)