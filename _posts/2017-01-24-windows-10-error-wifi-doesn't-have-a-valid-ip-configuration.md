---
layout: post
title: Windows 10 Error - WiFi doesn't have a valid IP configuration
tags: [windows]
keywords: [windows 10, wifi, ip, laptop, WiFi doesn't have a valid IP configuration, No operation can be performed on Local Area Connection while it has its media disconnected]
---

Last week my fianc&eacute;e was having trouble connecting her laptop to her wireless internet. It connected to the router fine, but there was no internet and the network icon in the system tray had the message:

>  WiFi doesn't have a valid IP configuration

My computer and phone were connecting fine, so I figured it must be an issue with her laptop - she has an HP running Windows 10 Home. Just in case, however, I rebooted the router, modem, and her laptop, but this had no effect.

I also tried the automated troubleshooter, but it failed to fix the problem.

I Googled the error message and came across [this article on Microsoft.com](https://answers.microsoft.com/en-us/windows/forum/windows_8-networking/wifi-doesnt-have-a-valid-ip-configuration/4f2c1aca-afd1-49ee-85b2-b4829087fd3b) that said to try these two commands in the administrator command prompt:

{% highlight shell %}
ipconfig /release
ipconfig /renew
{% endhighlight %}

Unfortunately, this didn't work. Instead, it gave me the following message:

> No operation can be performed on Local Area Connection while it has its media disconnected.

Various articles such as [this one on superuser.com](http://superuser.com/questions/757523/resetting-ip-address-gives-media-disconnected-error-message) just said that message meant nothing because the "media" that wasn't connected was an ethernet cable.

Curious, I plugged her laptop into the router directly with an ethernet cable. The laptop now had access to the Internet. Now, some laptops have a physical switch that turns WiFi on and off, and I though she may have bumped it - I looked, and her laptop did not have such a switch.

I searched for the second error message (the "No operation can be performed on Local Area Connection while it has its media disconnected.") and came across [this thread on SuperUser.com](https://web.archive.org/web/20170129183230/https://superuser.com/questions/1155769/windows-10-local-area-connection-media-disconnected), which suggested the following command, again as administrator in the command prompt:

{% highlight shell %}
netsh int ip reset
{% endhighlight %}

Afterwards, I rebooted the computer, and the WiFi once again was working.

My guess is there was a Windows update that, for whatever reason, messed with the IP settings, so they had to be reset.
