---
layout: default
permalink: /CodeBreaker-2018-Task-2/
title: NSA Codebreaker 2018, Task 2
---

For this task we are asked to find the secret key required for generating the OPT in the ransomware. To find the secret key the _cid function needs to be analyzed further. Time-based one time password (TOTP) are defined by [RFC 4226](https://tools.ietf.org/html/rfc4226). The task asks for the secret to be submitted base32 encoded. 

Looking at the arguments that are passed to the function get_totp_token, one of them is base32 decoded from a result of a function call. 

![_config.yml]({{ site.baseurl }}/images/Codebreaker_2018/Task_2/secret_key_call.png)

This function takes a pointer to a memory location that the secret key is copied to. The most interesting thing about this function is the weird way it is set up. Putting the string on the stack is a method to hide a string from reverse engineering. The interesting piece is that the stack is initiated on every loop, instead of initiating it once and then looping through the stack to set the key, or by using rep movsq to copy data the way the libclient_comms library does. 

![_config.yml]({{ site.baseurl }}/images/Codebreaker_2018/Task_2/stack_string.png)
