---
layout: post
title: Firewalld Basics
---

firewalld is a frontend to nftables. It provides a simple cli tool - firewall-cmd and a a GUI tool - firewall-config to setup firewall rules. 
firewalld should be used for simple scenarios while nftables should be used for complex firewall settings.
firewalld rules are translated to nftable rules while nftable rules are not rewritten back to firewalld configs.

### Reference 
https://firewalld.org/documentation/
https://fedoraproject.org/wiki/Firewalld
https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/configuring_and_managing_networking/using-and-configuring-firewalld_configuring-and-managing-networking 
