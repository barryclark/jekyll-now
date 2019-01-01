---
layout: default
permalink: /CodeBreaker-2018-Task-0/
title: NSA Codebreaker 2018, Task 0
---

For task 0, you are given a network traffic capture and asked to determine the attacker's listening post, which is the attacker's server. This is just a warm-up task, since there are only 2 IPs, 10.130.171.154 and 172.18.105.113. 

![_config.yml]({{ site.baseurl }}/images/Codebreaker_2018/Task_0/wireshark.png)

From the task we know we are looking for a server that is waiting for connections, and does not initiate them. This means that 172.18.105.113:9999 is the IP and port of the attacker's server, since 10.130.171.154 connects to it, as seen by it sending the SYN packet. 