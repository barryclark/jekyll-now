---
layout: post
title: AWS Connection Tracking
---

Sources: [Official AWS SG Connection Tracking Documentation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/security-group-connection-tracking.html)

## What’s AWS Connection Tracking?

Let's start with a picture and jump down into the rabbit hole. Here we go:

![]({{ site.baseurl }}/images/AWSConnectionTracking.png)

The picture above describes a state where network traffic flows between a local machine and an EC2 instance with a public subnet/ip. with the architecture in mind we can narrow down the subject a little and try to describe what's going on:

Connection Tracking is a feature of Security Groups and used to tack information to and from an instance. When there’s a flow of traffic (f.e. by dropping a Reverse Shell in an EC2 Instance) and the security group inbound rule is removed -> the flow of traffic will not be stopped by the removal oft he inbound rule. The traffic is interrupted when it’s stopped on the client or the host for at least a few minutes.
Here ist the Snippet from the original AWS Source above:

> Not all flows of traffic are tracked. If a security group rule permits TCP or UDP flows for all traffic (0.0.0.0/0) and there is a corresponding rule in the other direction that permits all response traffic (0.0.0.0/0) for all ports (0-65535), then that flow of traffic is not tracked. The response traffic is therefore allowed to flow based on the inbound or outbound rule that permits the response traffic, and not on tracking information.
TCP traffic on port 22 (SSH) to and from the instance is tracked, because the inbound rule allows traffic from 203.0.113.1/32 only, and not all IP addresses (0.0.0.0/0). TCP traffic on port 80 (HTTP) to and from the instance is not tracked, because both the inbound and outbound rules allow all traffic (0.0.0.0/0). ICMP traffic is always tracked, regardless of rules.
An existing flow of traffic that is tracked may not be interrupted when you remove the security group rule that enables that flow. Instead, the flow is interrupted when it’s stopped by you or the other host for at least a few minutes (or up to 5 days for established TCP connections). For UDP, this may require terminating actions on the remote side of the flow. An untracked flow of traffic is immediately interrupted if the rule that enables the flow is removed or modified. For example, if you remove a rule that allows all inbound SSH traffic to the instance, then your existing SSH connections to the instance are immediately dropped.
The main takeaway to understand is, if the traffic is being tacked and is flowing then removing an allow rule will not stop the traffic. 

Let’s assume the attacker dropped a reverse shell and got detected. A defender would now join the party and try to stop all activities made by an adversery. Well trained with info from the official AWS [SIRT Whitepaper](https://d1.awsstatic.com/whitepapers/aws_security_incident_response.pdf) the defender will start to mitigate. 
In the „isolate“ step the defender tries to achive the goa to isolate the affected EC2 instance with either a restrictive Security Group or an explicit Deny NACL. But there is a big issues related with this: The NACLs affect the entire subnet and causes an outage for all EC2 instances related to this subnet. So the next recommended procedure is swapping the Secuirty Groups. Sadly this wont interrupt already established connections like the reverse shell and will persist. 

### Mitigating the beast
To stop the traffic, there are still a few ways to achive this :
1.	Create a NACL (Network Access Control List) inbound rule
2.	On the instance, disable the communication type or block the used port
3.	Delete the entire Security Group. Switching to an isolated SG (that doesn’t allow anything in- or outbound) isn’t enough to stop this
