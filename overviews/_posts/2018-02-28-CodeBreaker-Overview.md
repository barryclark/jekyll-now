---
layout: post
title: NSA Codebreaker 2017, Overview
---

Each year NSA puts out a challenge called Codebreaker that requires reverse engineering and exploitation skills. This year it was designed to take the players through some of the phases you might take if you found someone on your network. There were six tasks each one building on the previous and requiring different skills. There were 1098 participants and only three were able to complete all six tasks. I was able to complete five tasks, along with 2.2% of participants. 

# Task 1 - Analyze Suspicious Network Traffic, Part 1 #
In this task you are given a network capture and need to find out what IPs are suspicious. To make it easier you are given the decryption keys. This allows you to understand better the MQTT protocol and what is happening. 

[Task 1 Writeup](https://armerj.github.io/CodeBreaker-Task-1)

# Task 2 - Analyze Suspicious Network Traffic, Part 2 #
Like the previous task, you are given a network capture and need to find suspicious IPs. In this task you are not given the keys, and are required to write a Snort or Bro rule to automate the process. 

[Task 2 Writeup](https://armerj.github.io/CodeBreaker-Task-2)

# Task 3 - Analyze Critical System Components for Vulnerabilities, Part 1 #
Based on the IPs you gave in task two, your hypothetical team mates determine that someone is attacking your network. The player is tasked with auditing the source code for the authentication module for vulnerabilities. 

[Task 3 Writeup](https://armerj.github.io/CodeBreaker-Task-3)

# Task 4 - Analyze Critical System Components for Vulnerabilities, Part 2 #
Based on the vulnerability you discovered in task three, the development team has audited the agent and agent_controller programs. You are tasked with auditing the 3rd party binary libauth.so, which you don't have the source code for. This module is used to validate the signature of system critical messages that are sent to the agents. 

[Task 4 Writeup](https://armerj.github.io/CodeBreaker-Task-4)

# Task 5 - Perform a Forensic Analysis of a Compromised Endpoint #
The traces of the deployment of the vulnerability you discovered was found on the network. The traffic was traced to an agent and a memory capture was taken and provided to the player. You must find the MQTT topic being used, the PID of a malicious process, and some identifying information for the C2 server. To do this volatility can be used to analysis the memory dump, and a dissembler can used to analysis the code of any extracted process. 

[Task 5 Writeup](https://armerj.github.io/CodeBreaker-Task-5)

# Task 6 - Craft an Exploit for the Botnet Server and Devise a Strategy to Clean the Infected Endpoints #
I was not able to complete task 6 during the competition, but I have been working on it. In this task your team was able to find a server for sale online that matched the profile of the server currently being used by the botmaster. You must get it running, and then find a way to exploit it to queue a command to uninstall the botnet. To finish this task you need to find 4 different vulnerabilities in the software provided. In python you need to use pickle to send python code, exploit a format string, and use a gzip bomb too cause an error. To get the exploit to the server, the bridge needs to be exploited to do HTTP pipelining. 

[Task 6 Part 1 Writeup](https://armerj.github.io/CodeBreaker-Task-6-Part-1) <br>
[Task 6 Part 2 Writeup](https://armerj.github.io/CodeBreaker-Task-6-Part-2)
