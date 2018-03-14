---
layout: default
permalink: /CodeBreaker-Task-1/
title: NSA Codebreaker 2017, Task 1
---

For task 1, you are given a network traffic capture and keys to decrypt the SSL traffic. The challenge asks you to ID 9 potentially malicious TLS sessions and provide the timestamp of the first packet and source IP. I opened the capture in Wireshark and loaded the provide keys.

![_config.yml]({{ site.baseurl }}/images/Codebreaker/Task_1/ssl_decrypt.png)

One of the first steps when analyzing network traffic is to have a list of IPs that are communicating, and with who. This can be found in conversations under the statistics tab.  The first thing I noticed is everything is communicating with 172.21.37.124, which is probably the MQTT server. 

![_config.yml]({{ site.baseurl }}/images/Codebreaker/Task_1/statistics.png)

The hint here is in the requirement for task 1, "You must identify exactly 9 potentially malicious TLS sessions." Looking at the number of packets sent in each conversation you can see that 4 of them sent 39+ packets. The other 9 IPs sent 5-8 packets, which seems odd. The next step is to start filtering on each of the conversations to check our suspicions. 

The conversation from 172.16.162.148 has a TLS Alert message saying it had a fatal error on protocol version. The attacker tries to use TLSv1, when the MQTT server is expecting TLSv1.2, which is why the connection is terminated. 

![_config.yml]({{ site.baseurl }}/images/Codebreaker/Task_1/wrong_protocol.png)

IP 172.16.168.18 tries to connect with a password of 16 bits, and is refused due to not being authorized. 

![_config.yml]({{ site.baseurl }}/images/Codebreaker/Task_1/too_short_password.png)

You can do this for each IP, or you can filter for IPs that were able to connect to the MQTT server, with the filter "mqtt.conack.val == 0. This returns the 4 IPs that were seen earlier sending alot of packets and bytes back and forth. These are your good IPs. 

![_config.yml]({{ site.baseurl }}/images/Codebreaker/Task_1/good_ips.png)

After submitting the bad IPs and times, the task is complete. 

![_config.yml]({{ site.baseurl }}/images/Codebreaker/Task_1/complete.png)
