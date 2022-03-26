---
layout: post
title: spectate Zain CTF Network-Security (Easy)
---

.pcap File Analysiz 

[Challenge Link](https://github.com/hithmast/hithmast.github.io/raw/master/zAinCTF/spectate.pcap)
# At First

Open spectate.pcap File With Wireshark

![wireshark]({{ site.baseurl }}/zAinCTF/images/sws.png)

i like to start with protocol Heirarchy for better vision of Network
statistics -> Protocol Heirarchy 

[ ![wireshark-protocol-Heirarchy]]({{ site.baseurl }}/zAinCTF/images/swe.png)

There is a lot of data in UDP then Right-click And Apply it as Filter 
And Right-click on any packet and Follow UDP Stream 

![wireshark-UDP-Stream]({{ site.baseurl }}/zAinCTF/images/6a3u47.gif)

### But All is Encrypted Data and Not Usefull ! Don't Know Yet 
![idk-comic](https://sheepforcomics.files.wordpress.com/2013/08/so-you-dont-know.png)

Go Back Again and Apply Filter For TCP data 
i Followed The TCP Stream 

[ ![wireshark-data-tcp]]({{ site.baseurl }}/zAinCTF/images/swr.png)
