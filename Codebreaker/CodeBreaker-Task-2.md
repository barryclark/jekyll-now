---
layout: default
permalink: /Codebreaker/
title: NSA Codebreaker 2017, Task 2
---

This task asks for a snort or bro rule that can be deployed to find this traffic automatically. The rules must be able to work on encrypted traffic. The network traffic capture that is provided is encrypted, and no key is provided. The traffic from task 1 can be used to better understand what to look for and how to build the rules. 

In task 1 the malicious traffic could be identified when it didn't provide a long enough password. I had originally tried to create a rule that checked the length of the first Application Data packet, this would contain the MQTT server password. Anything that wasn't [X] would be bad. This misses one of the malicious IPs, when the attacker tries to send a password of the correct length. A better way would be to alert on errors when connecting to the server. 

![_config.yml]({{ site.baseurl }}/images/CodeBreaker/Task_2/Protocol_version_error.png)

The first alert is sent when the protocol versions don't match, ssl.alert_message.desc == 70.

![_config.yml]({{ site.baseurl }}/images/CodeBreaker/Task_2/Handshake_error.png)

The second alert seen is when the handshake fails, ssl.alert_message.desc == 40. 

![_config.yml]({{ site.baseurl }}/images/CodeBreaker/Task_2/Encrypted_alert.png)

The final alert message is encrypted, but there are a few things that seem unique to malicious traffic from the first pcap. In the traffic that was flagged malicious the alert message had the FIN, PSH and ACK flags set. To keep from alerting twice on wrong protocol alert we need to also set a filter for the length of the data in the packet. The encrypted alert should have a data size of 31, while the others should be 7. 

Below is the snort signatures for the above alerts. 

```
alert tcp 172.21.37.124 8883 -> any any (msg:"poss malicious - Wrong protocol"; dsize: 7; content:"|46|"; rawbytes; offset: 6; depth: 1; sid: 1000000;)
alert tcp 172.21.37.124 8883 -> any any (msg:"poss malicious - Handshake failure"; dsize: 7; content:"|28|"; rawbytes; offset: 6; depth: 1; sid: 1000001;)
alert tcp 172.21.37.124 8883 -> any any (msg:"poss malicious - Encrypted alert"; flags: FPA; dsize: 31; content:"|15|"; rawbytes; offset: 0; depth: 1; sid: 1000002;)
```

![_config.yml]({{ site.baseurl }}/images/CodeBreaker/Task_2/snort_rule_breakout.png)

To test this rule on the pcap I put the rules in a file called task2.rules. Then ran "snort -c task2.rules -r codebreaker2.pcap". The logs are written to the file at /var/log/snort/alert. This shows the IPs that the MQTT server sent an alert message to that indicates that something might have went wrong with the connection. This could be something normal or malicious. 

![_config.yml]({{ site.baseurl }}/images/CodeBreaker/Task_2/picture_of_snort.png)

To get just the list of IPs the following command can be ran "grep 8883 alert".

![_config.yml]({{ site.baseurl }}/images/CodeBreaker/Task_2/grep_of_snort.png)

There is one false positive alert on 172.24.35.239. This can be determined by looking at when the alert was sent. The alert was sent after multiple application data packets were exchanged, which indicates it was probably able to log on successfully. The alert was sent to 172.21.41.15 almost immediately after the first application data packet, which indicates that something went wrong when authenticating to the server. 

After looking through the traffic that was flagged, below are the first packets of the TCP handshakes, possible malicious traffic is highlighted black. 

![_config.yml]({{ site.baseurl }}/images/CodeBreaker/Task_2/malicous_traffic_first_packet.png)

After submitting the timestamps and IPs, task 2 is now complete. 

![_config.yml]({{ site.baseurl }}/images/CodeBreaker/Task_2/complete.png)