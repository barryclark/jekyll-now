---
layout: post
title: NSA Codebreaker 2017, Task 4
---

For task 4 you needed to be able to send a MQTT message to the server to have it do what you wanted. The hint they provided was that you could replay previous messages. The first step was to capture a legitimate message so I can see what was being sent.

![_config.yml]({{ site.baseurl }}/images/CodeBreaker/Task_4/legitmate_packet.png)

I then sent another message with the same length but only slightly different content to see the change. 

![_config.yml]({{ site.baseurl }}/images/CodeBreaker/Task_4/comparing_same_length.png)

As you can see the first 16 bytes of the header stay the same. Since the instructions said that critical messages needed to be signed, the block of different bytes is most likely the signature. 

![_config.yml]({{ site.baseurl }}/images/CodeBreaker/Task_4/comparing_dif_length.png)

By sending another message and changing the length of the content you can see that the 5th-8th bytes change, indicating they are the message length. It should also be stated that the bytes are sent in network order, so 0f 02 00 00 is actual 0x020f.  

It was now time to start reversing the libauth.so binary. Opening it in IDA I was quickly overwhelmed with how many functions there were. Not knowing where to start I opened the agent binary to see what function from the library is called. In the Message_Handler function, it calls the validate function from libauth.so. 

![_config.yml]({{ site.baseurl }}/images/CodeBreaker/Task_4/call_validate_signature.png)

By following the function I was able to start working out what the other bytes of the header were used for. Below is a high level overview of the function. 

1. Retrieve RSA key
2. Hash message content using SHA512
	- message is determined by [length_of_message] – [length_of_signature]
3. Verify RSA signature of the hash
4. Set message pointer to [offset_of_message]

![_config.yml]({{ site.baseurl }}/images/CodeBreaker/Task_4/attack_packet_break_out.png)

- The first 4 bytes are length of signature. [length_of_signature]
- The second 4 bytes are length of message (signature + message content). [length_of_message]
- The third 4 bytes are offset of RSA signature, from the end of the header. [offset_of_the_signature]

![_config.yml]({{ site.baseurl }}/images/CodeBreaker/Task_4/byte_0c_used.png)

The fourth 4 bytes ([offset_of_message]) are not used during the verification process, so took me a while to figure out what it was. These bytes are the key to the attack and are the offset to the content returned. In a legitimate message this should be equal to the [length_of_signature] + [offset_of_the_signature], since it should point to right after the RSA signature. 

It turns out that all the attacker has to do is change these bytes to point after the legitimate message and to his message. On the right is a legitimate message, on the left is the attacker's message. The message can then be sent using agent_controller -x. 

![_config.yml]({{ site.baseurl }}/images/CodeBreaker/Task_4/comparing_messages.png)

When the agent handled the message it logged Tello World, when the RSA signature was for the message Hello World. 

![_config.yml]({{ site.baseurl }}/images/CodeBreaker/Task_4/successful_sent_fake_message.png)

After uploading the file used with the agent_controller for verification, the task is complete. 

![_config.yml]({{ site.baseurl }}/images/CodeBreaker/Task_4/complete.png)