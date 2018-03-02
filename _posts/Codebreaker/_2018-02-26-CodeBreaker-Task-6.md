---
layout: post
title: NSA Codebreaker 2017, Task 6
---

For task 6 you need to send a message to the bot that will then exploit the server and queue up a command to deconstruct the bot network. The botserver, bot.sys, and build config files are provided to you. When trying to run the server, it outputs an error 'File Corrupt'. This error is usually received when the ELF headers are messed up, but running the program under strace shows that the server does start. Running strings on server provides some interesting output. 

[strings]

You can see multiple references to pyrun, python, and modules that are provided in python standard library. Researching online I determined that pyrun is used to pack your python program and the standard library together to ran on computer's without python. This is how far I was able to get during the competition, and was not able figure out how to fix the 'File Corrupt' error. 

After the competition **user** on reddit gave the hint that the server can be treated as a zipfile and using python you can unzip and get the main code. This allowed me to open it up and see what it was trying to do. 

[extracted]

The main function will extract **extra** data and xor it with the mtime of the python interpreter currently running, and then tries to import this as a zipped python module. The main function is ran using pyrun, meaning that the mtime is of the server file. A zip file's magic number is 'XX XX', and since we know what it is encrypted as we can find out what the mtime should be. This will allows us to retrieve the zipfile that is being imported. 

[script]

To run the server in the docker file 'RUN TZ=UTC touch -mt 200001010000.00 /usr/local/bin/server' needed to be added to DockerFile after server is copied to the container. 

[pyserver]

Now that the server code is recovered we can start examining it to look for vulnerabilities. The server contains *5* routes needed for the operation of the bot net. 

/new
- allows the botmaster to upload new commands for the bots to run
- needs cmd_auth

/upload
- used by the bots to upload data to the server 
- based on the Encoding the server will gzip, deflate_to_gzip or store the data

/ack
- used by the bots to ack they have recieved a command

/result
- used by the botmaster to retrieve the results of the command he wanted ran

Data that has been uploaded is written to a file called queue.XXXXXXXX.dat, where XXXXXXXX is an integer, in 4K chunks. These files will grow until 1GB, before another file is created. Both commands and upload data reside in the same file. 

The first thing I tried was to upload a command and told the server it was encoded as gzip. The server doesn't check it, and just stores the data, but the files uploaded are marked with "0"*32 to indicate that this is data and not a command to be ran.

In the server config file there is a cookie that is retrieved with a hardcoded secret. This cookie tells the server if it should be return logs to the requester, but is only used in debugging mode. Debugging is hardcoded to false, but the code is left in. Bottle will automatically unpickle cookies that are signed (). Pickle is one method of getting remote code execution in python. This is most likely one step in our attack chain if we can get the program to check that cookie. 

Looking further into the code and what values can be controlled by the requester may give us more insight into the next step. When the server receives a request it will check the HTTP headers for 'X-CLIENT-ID' and store the value into the request.environ as 'HTTP_X_CLIENT_ID: value'. This value is used in the logger to build a string to pass to logging.formatter. This module will use that string to format output when debugging or an error happens. This allows the requester to change the format of the string passed to the formatter which can leak information. This might be useful, but currently we can not use it, since data is only returned to the user if debugging is enabled. 

The next thing I saw could be a possible vulnerability, depending on how the config file is written. The cmd_auth value is read from config.json file, if the value is a string then the cmd_auth can be gotten around relatively easy. 

[bad config vs good config]

When /new is requested, "HTTP_X_CLIENT_ID" is checked against cmd_auth in the following manner 'config.clientid in config.cmd_auth'. If cmd_auth is a string then the requester could iterate through all printable chars until this check was true. The following 's' in 'secret' will return true. This is probably not the exploit we want, but interesting. 

Python provides a useful way to access a function in a class. If you put '@property' before the function, it can be access just like a normal variable. This can be seen when the logger does the following 'if server_config.return_log:'. (more about the @property) 

This line is the key to putting the two exploits we have found together to exploit the server. Str.format will let you access properties of the values passed in, but you can't use it to call functions. The @property makes the function return_log() act as a property and allows it to now be called through the str.format function. The last piece is finding how to format the string you need to send to the server. 





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