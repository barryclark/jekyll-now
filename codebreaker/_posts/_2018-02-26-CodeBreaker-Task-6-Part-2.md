---
layout: post
title: NSA Codebreaker 2017, Task 6 Part 2
---

Our final steps are:
1. Find method to cause critical error
2. Get format needed for the bot command
3. Determine delivery method
4. Test exploit chain


To determine what command needs to be sent to the botnet, the bot code needs to be examined. In IDA we can see the code that is ran to handle a message. When handling a message the bot will check to see if the topic is addressed for the bridge, or for the broadcast/own message topic. If the message is addressed to the bot, it will unpack the message to execute. An example of a bot command can be found in the memory scrap from task 5. We can use this to figure out what is needed for our command. 



Below are the commands the bot will recornize. We want the cmd_uninstall command, which will stop the bridge if enabled and then safely remove the bot from our agent. (image from code)





The complete attack will contain a cookie with python code pickled and signed, and the HTTP header X-CLIENT-ID as the string to exploit str.format


Task 6
What I know currently

Attacker called enable_bridge and execute commands
Commands are packed with msgpack
command that needs to be queried is X


Server flow

format for queue

basic bot flow

Structure of bot commands

TOPICS 1 for upload, broadcast and specific bot

folders used in bridge and how they work

str.format vulnerability, since can control HTTP_X_CLIENT_ID. python has no %n so no write capability, and no way to return error messages currently so can't leak information



![_config.yml]({{ site.baseurl }}/images/CodeBreaker/Task_5/XXXXX.png)
