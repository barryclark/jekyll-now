---
layout: post
title: NSA Codebreaker 2017, Just For Fun
---

# Alternate Exploitation Method #

The exploit developed for task 6 is not always reliable. It requires that the /result request be processed by the server before the connection is closed. If the connection is closed beforehand the request may not be processed. One way to make it more reliable is to make another request after the /request is sent to give the exploit a little more time before the connection is closed. 

This can be problematic if you don't know the IP of the C2 server. To get the IP we can send a message to the bot to process, but do the HTTP requests using another tool. Tools such as nc or curl are easy to use but they may not be on the system by default. You can get around this by sending the binary for them and then running. I tried telnet, but any NULL bytes you send are converted to 0xFF, which corrupts the gzip. 

I decided to use python3.5, which should be installed by default on Ubuntu. The module requests can be used to make the POST and GET requests needed to exploit the server. The message will be sent to the broadcast message topic which will cause more noise. To compensate for this I have shrank the message sent as much as possible. A nice feature about gzip is you can concat multiple gzips together to make a bigger gzip that is still valid. I took advantage of this to send a much smaller gzip, which the python would then expand 10,000 times before uploading. To get the python code to run I sent the message to the bot and had it use system to execute it. This gets the code I sent to be ran by /bin/sh. I used echo to pipe the python code into python3.5 to execute. 

Before piping the code to python, the code will look to see if the file /tmp/bash exists. If it does than this is the bridge bot, and the python code is ran. The python code will then try and find the IP address of the server by uploading a small file. We know the upload folder is in the /tmp folder, so the python lists all the folders it has read and write permission to in /tmp. Then for each folder it will drop a file and wait a second and see if it gets uploaded. If it is gone when the folder is rechecked then we have found the upload folder. 

It will then upload the gzip file, and make the /result request to trigger it. The python code is aware that there should be a response for the GET request, and so the connection is not closed. 

# How upload is triggered #

When a message is sent to 'nodes-15411b7b' it is saved to the folder to upload to the server. The bot will first create the file using the template 'out-XXXXXX'. Next it will change the permissions to the file to 666 (everyone has read/write), and then it will rename the file 'out-XXXXXX.done'. The bridge has used notify\_add\_watch to be notified of any rename actions with in the folder. Once it is notified of the change it will upload the file, and remove it from the tmp folder. We can replicate the action with the following. 

{% highlight bash %}
cd /tmp/vCl7CSW
echo -ne '00000000000000000000000000000005\x00test outfile' > out-ZaSLIZ
chmod 666 out-ZaSLIZ 
mv out-ZaSLIZ out-ZaSLIZ.done 
{% endhighlight %}

# Python Code #

{% highlight python %}

{% endhighlight %}


ubuntu uses dash, so scripting needs to reflect that
Created python to exploit server


Gif of server exploit (last slide)

