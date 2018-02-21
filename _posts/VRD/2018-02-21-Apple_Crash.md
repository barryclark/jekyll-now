---
layout: post
title: Apple Network Manager Crash and Integer Overflow
category: VRD
---

# Introduction
Using different types of network classifications is a normal day to day thing for IT practioners. However, Class E networks aren't commonly used as they're a /4, making the address space absolutely huge! Poking around with the network manager of Apple IOS High Sierra while trying to connect to a class e network (240.240.240.240) causes a validation error to occur when entered in manually, trying to implement said address within the advanced features (after you have got the validation error) will cause the network manager to crash giving an illegal instruction error within the console out put. Forward a few manual tests and a Integer Overflow occurs allowing for a negative number to be entered (this shouldn't be possible within a IP range), mapping this negative number also represents a memory location within the memory map.

# Crash and ... Overflow (I wish this was Burn)
Before we begin looking at the crash, I will provide some screen captions of the current version of the OS begin run.

![OS Version](/images/apple_crash_network_manager/version.png "Version of OS")

Opening the Network Manager and accessing either WiFi or a Ethernet interface (both of which have been tested and causing the crash) we can enter a valid Class E network address (240.240.240.240) within the IP field, once entered click off the IP address field to another field such as Subnet mask.

![Class E Network Address](/images/apple_crash_network_manager/class_e_crash.png "Class E network manager crash")

Once we have clicked into another text box, we get an error. 

![Class E Network Manager Crash](/images/apple_crash_network_manager/logfile.png "Class E network manager crash confirmed")



This raised a question, is the network stack crashing or the network manager? To test this, a DHCP server was created using Ubuntu 16.04 LTS and DNSMasq (as it is quick to setup a DHCP server in it).

![Class E DHCP 1](/images/apple_crash_network_manager/dhcp.png "DHCP")

and

![Class E DHCP 2](/images/apple_crash_network_manager/dhcp_connected_via_server.png "DHCP Connected")

The experiment demonstrates that the network stack hasn't crashed as the device is connected and running. Therefore, we can conclude that this is a network manager issue, which narrows our scope and liklihood of a magic packet (damn).

So, we now know that this is a problem with the network managers validation, but what else can we do to misconfigure and get some interesting results?

What if we enter a significantly large number say 12 '9's?

![Max Range IP](/images/apple_crash_network_manager/max_range_integer.png "Max Value into IP Address")

After hitting enter, we get an integer overflow which wraps around to a negative number.

![Integer Overflow](/images/apple_crash_network_manager/wrap_around_integer.png "Integer Overflow via an signed Integer")

This indicates that the value that is entered is a signed integer but validation within the network manager prevents you entering a negative number.

Taking the negative value and converting it to hex we get a 32bit FFFFFD29 which is the maximum size value we can set within the field as a /32 is the max size possible within the network manager. Taking the signed integer and converting it via the website [binaryconvert.com](http://www.binaryconvert.com/result_signed_int.html?decimal=045055050055)
We get a 32bit hex value. Comparing this address to the memory map of the process could indicate the second half of a memory location. However, as the memory addresses within IOS are 64bit, it is unlikely that this is exploitable. 

![Conversion](/images/apple_crash_network_manager/conversion.png "Conversion of values")

As an interesting little experiment if we convert the hex value back to decimal and enter the value into the IP address we return back to the negative wraparound.

![Decimal Value](/images/apple_crash_network_manager/decimal_wrap_around.png "Decimal Entry Wrap Around")


# Emails and Response Time
After emailing product-security@apple.com, an analysis of the issue and conclusion was met within four days. The bug has been passed to the appropriate team and it maybe likely that Mac users may have the oppertunity to use Class E networks for those qwerky experiments.

# Conclusion
Overall the bug was fairly neat and demonstrates that integer overflows can still happen, although this bug seems to be un-exploitable it highlights that validation within the network manager is causing legal operations to denied and illegal operations to be allowed.