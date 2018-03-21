---
layout: post
title: NSA Codebreaker 2017, Task 6 Part 2
---

Our final steps are:<br>
1. Find method to cause critical error<br>
2. Get format needed for the bot command<br>
3. Determine delivery method<br>
4. Test exploit

An error has to be caused somewhere in the server application that will be raised up through bottle. In the [bottle documentation] ***difference between .12 and .13*** it mentions that all errors caused by the developer's application are caught and handled by bottle to keep it from crashing the server. There is a discrempency between the documentation and the bottle source code though. In bottle 0.12.13 there are four expections that are rerasied or not caught by bottle. They are UnicodeError, KeyboardInterrupt, SystemExit, and MemoryError. KeyboardInterrupt and SystemExit are of no use to us, since we can't create these. 

The UnicodeError can be caused to throw an error easily, but the is that this error is caused before the HTTP headers are read in. To make this error useful you would need to send a unicode byte that when logged by the wsgiref server is ascii. As far as I know this can't be done with Utf-8, so while interesting its not useful. 

The MemoryError is the error we want. This error is created when the server starts to run out of memory. The bot will upload files from the host to the webserver, for the attacker to then access. This is where we will most likey find our oppurtinuty to cause a memory error. 

When a file is uploaded to the server it can be encoded as gzip, deflate, or identity (plain text). If the file is gzip it will be stored without any further checks or compression. When the file is deflate the server will instead decompress it in 1GB chunks and then recompress as gzip. This method is used to limit the that data in memory, so there is not a memory error. The interesting thing though is that when a gzip is decompressed there is no check or chunking done. Instead the full gzip is extracted in one go, this can cause a memory error if the file is too big. 

When a file is requested using /result/<uid> the HTTP header Accept-Encoding is used to determine how the file is sent back to the requester. This means that a gzip bomb can uploaded to the server using /upload/ 'Content-Encoding: gzip', and then downloaded again as /result/ with the header 'Accept-Encoding: identity'. When this gzip is decompress it will expand to a much bigger file than can fit in memory and cause a memory error. Bottle will reraise this error which will cause the server to log a critical error, this will then trigger the remote executed code in the cookie. 
 
[]

The instructions for task 6 stated that a message needs to be sent using the MQTT topic found in task 5. The code to handle a MQTT message for the bot.so can be found in the function module\_handle_message. This function checks that the message is meant for the botnet and then calls incoming() to handle the message. 

Each bot is setup to listen for 3 messages:<br>
nodes-15411b7b, used to upload files to server, bot must already have bridge enabled<br>
nodes-0e53325b, this is a broadcast topic for all bots<br>
nodes-XXXXXXXX, where XXXXXXXX is a unique identifier for that bot<br>

[bot_incoming_flow]

If the message is addressed to nodes-15411b7b, then the file is saved as /out-XXXXXX to the tmp folder that is used to upload to server. If the message is addressed to the other topics then it is unpacked and sent to the function dispatch(). To understand how the commands are structured, I had to research msgpack. A good source is [msgpack spec](https://github.com/msgpack/msgpack/blob/master/spec.md#overview), which explains the fields and how to use them. The fields used in the commands are fixarray (0x90-0x9f), int32 (0xd2), and bin32 (0xc6). How they are used will become more clear as we retrieve the bridge command. 

By examining the dispatch function, the commands that the bot can handle and how to format them can be found. I figured the message to enable the bridge was still in memory, since it had just been enable at the time of the memory capture. The ***Heap*** for the agent I extracted during task 5 was  saved to task.1537.0x8750000.vma. The bridge command can be found in here by looking for 'nodes-', this will take us to the message in memory. 

To determine what command needs to be sent to the botnet, the bot code needs to be examined. In IDA we can see the code that is ran to handle a message. When handling a message the bot will check to see if the topic is addressed for the bridge, or for the broadcast/own message topic. If the message is addressed to the bot, it will unpack the message to execute. An example of a bot command can be found in the memory scrap from task 5. We can use this to figure out what is needed for our command. 

![_config.yml]({{ site.baseurl }}/images/CodeBreaker/Task_6/memory_scrap.png)

The highlighted portion is the second message the bot received. It took me a little while to figure this out, but unfortunately this bot has handled a message after the bridge was enabled. Part of the beginning of message that was sent to enable the bridge is missing. If we assume that the second message started overwriting at the beginning of the first message, we can narrow down what is missing. The MQTT topic should be the same length, next we can run through the code in IDA and restore the remaining part of the message. 

[IDA incoming] 

The incoming function will pull a string from the beginning of the message data, and is used after the dispatch function. The string is passed to prepend\_uuid() and is most likely the uuid. This can also be verified from the server code where the uuid used there are also 32 chars long. Next the bot will try to unpack the data sent to it, by calling umsgpack\_fixarray_binbin. 

[umsgpack_flow]

Following the umsgpack\_fixarray\_binbin function, we can see it is checking for a byte between 0x90-0x9f which corresponds to fixarray. Each element of the array is passed to umsgpack_bin to further unpack. 

![_config.yml]({{ site.baseurl }}/images/CodeBreaker/Task_6/umsgpack_0x9X.png)

Following this function we can see that it is checking for the byte 0xc6, which is for the bin field. It then retrieves the next 4 bytes, and uses htonl() to convert them into a useable int32 for the number of bytes contained in the bin. 

![_config.yml]({{ site.baseurl }}/images/CodeBreaker/Task_6/umsgpack_0xc6.png)

We now have all the information we need to repair the enable bridge command. After the uuid is 0x9X, then 0xc6 <int32>. The last byte of the int32 is still there which is 0x0f, this corresponds to the length of 'nodes-0e53325b' and is the first bin. We can then check the next bin to see if there are bins after it. The next element is 0xc60000372d, meaning this bin contains 0x372d bytes. After these bytes there is no 0xc6, meaning that was the last bin. 

![_config.yml]({{ site.baseurl }}/images/CodeBreaker/Task_6/end_of_msg.png)

The part of the first message that was overwritten was 'MODULE/sys_16575f98/nodes-0e53325b\x00a2328e76932711e78517000c29a16437\x00\x92\xc6\x00\x00\x00' Now that the message has been restored, we can send this to enable the bridge on the agent. The arguments to /tmp/bash need to be modified though to get it to connect to our localhost for the server. 

To find out if the bridge can use a different port we can examine the code in IDA. If it couldn't change the port then we would have set up our network to reflect that. Fortunately, the bridge will take an extra argument which is used to set up the port to use. When the bridge starts up it will check the number of command line arguments. If there are four arguments then it use the port 80, otherwise it will use the 5th argument passed in as the port. 

[bash_cmdline_args]

Looking at how the other arguments are used we can determine what the folders are used for. The 2nd argument is the folder used for commands retrieved from server. The 3rd command is the folder used to upload data to the server. When a message is sent to 'nodes-15411b7b' it is saved to 

[cmdline_args_used_for]

There is enough space to change '10.134.97.12  &' to '127.0.0.1 8080&' without having to edit the msgpack fields. 

![_config.yml]({{ site.baseurl }}/images/CodeBreaker/Task_6/localhost_install.png)

(I found that the port can be change by looking at the bash for args to bash)
what are the args used for. folders for. how the files are sent to server, and how commands are returned



[successful_enable_bridge]

In the dispatch function, a local variable is passed to dispatch_to() and then loaded into edx to call. 

![_config.yml]({{ site.baseurl }}/images/CodeBreaker/Task_6/dispatch.png)

Inside of dispatch\_to() there is a call to umsgpack\_fixarray\_binbin and then umsgpack\_int32. The result of umsgpack\_int32 is then used to get the address of the function of the command. Following the array\_ptr we find all the commands the bot will recognize. 

![_config.yml]({{ site.baseurl }}/images/CodeBreaker/Task_6/dispatch_to.png)

The command we most likely want is the cmd\_uninstall, the 6th command in the array. The cmd\_uninstall will uninstall the bridge and then unsubscribe to the MQTT message topics. Looking at the cmd\_uninstall it doesn't seem to use the arg passed in. We can now build the message to uninstall the bot. 

![_config.yml]({{ site.baseurl }}/images/CodeBreaker/Task_6/uninstall_message.png)

[uninstall_message_break_out]

Testing the message gets the desired result.

[testing_uninstall_message]

When the bot enables the bridge, it also makes a reactor to monitor the folder the bridge will save the commands in. When a new file is dropped in the reactor will read it, and call umsgpack\_fixarray\_binbin , publish, dispatch\_to, and finally executes the command. ***publish ensures ...***

The next step is to determine how we can get to the server. An example of a message to upload data can be found in the second message the bot received. The format for the message is MQTT Topic\x00<uuid>\x00<data>. This enables us to upload to the server any information we want, but it will be stored as data on the server. There is also no place to put our exploit cookie or x-client-id. I opened the bridge in IDA to see if I could see anything useful when the POST request is created. The POST request is created in sub_8049A2A. The file to send is opened and strnlen() is used to get the uuid for the upload, which is interesting since the uuid is always 32 bytes. 

![_config.yml]({{ site.baseurl }}/images/CodeBreaker/Task_6/get_uuid_from_file.png)

In sub_80492E9 the uuid read from the file is then appended to the url /upload/. There is no check to ensure that the uuid is only 32 chars here. After a few tries I successfully added in new headers by adding them to the end of the uuid. 

1st try<br>
[first_try]
final try<br>
[final_try]

When injecting new headers, the old headers need to be accounted for in the count of the data being sent. I tried sending a request with 'Content-Length: -1', and got a 'HTTP 400 Bad Request' response. Next I tried setting the Content-Length to more bytes than I was sending, this caused the server to wait for remaining bytes. In the end it timed out and closed the connection. Neither of these caused the error that I needed though. 







To test the exploit on the server through the bridge, the server needs to be ran in docker so /upload/ works. For this I used the dissemble python modules, so I would be able to have some of the debug information. 

I made my own dockerfile containing:
{% highlight bash %}
FROM python:3.5

RUN dpkg --add-architecture i386 && apt-get -qy update && apt-get -qy install libc6:i386 nginx-extras ssl-cert && rm -rf /var/lib/apt/lists/* 

RUN pip install bottle

COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx_site_default.cfg /etc/nginx/conf.d/default.conf

EXPOSE 80
EXPOSE 443

COPY unzip /server/
CMD nginx; python3.5 /server/__main__.py
{% endhighlight %}

The server was then built and ran with the same commands to build/run the server executable provided. 



Below are the commands the bot will recornize. We want the cmd_uninstall command, which will stop the bridge if enabled and then safely remove the bot from our agent. (image from code) also show what unsinstall cmd does in IDA. then send to see test

Explain msgpack, what it is used for, and fields used here




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
bot installed, then deletes self on filesystem
bridge installed, ip, files hardcoded
then cmdline arg buffer rewritten
watchers created on folders in bridge and bot
value uploaded to server

folders used in bridge and how they work

str.format vulnerability, since can control HTTP_X_CLIENT_ID. python has no %n so no write capability, and no way to return error messages currently so can't leak information



![_config.yml]({{ site.baseurl }}/images/CodeBreaker/Task_5/XXXXX.png)
