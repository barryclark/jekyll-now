---
layout: post
title: NSA Codebreaker 2017, Just For Fun
---

![_config.yml]({{ site.baseurl }}/images/CodeBreaker/Task_6/XXXXX.png)

just for fun. 

While the command to exploit the server can be done we can make it more reliable and smaller using the bot's ability to execute shell commands. 


ubuntu uses dash, so scripting needs to reflect that
Created python to exploit server

Drop files in upload file

Use python

When a message is sent to 'nodes-15411b7b' it is saved to the folder to upload to the server. The bot will first create the file using the template 'out-XXXXXX'. Next it will change the permissions to the file to 666 (everyone has read/write), and then it will rename the file 'out-XXXXXX.done'. The bridge has used notify\_add\_watch to be notified of any rename actions with in the folder. Once it is notified of the change it will upload the file, and remove it from the tmp folder. We can replicate the action with the following. 

*** maybe save for later ***
{% highlight bash %} <br>
cd /tmp/vCl7CSW <br>
echo -ne '00000000000000000000000000000005\x00test outfile' > out-ZaSLIZ <br>
chmod 666 out-ZaSLIZ <br>
mv out-ZaSLIZ out-ZaSLIZ.done <br>
{% endhighlight %}



basic bot flow

bot installed, then deletes self on filesystem
bridge installed, ip, files hardcoded
then cmdline arg buffer rewritten
watchers created on folders in bridge and bot, notify on renames
value uploaded to server




Maybe do cyber kill chain or other threat modeling for task
