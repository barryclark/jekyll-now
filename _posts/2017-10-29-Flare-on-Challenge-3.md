---
layout: post
title: Reversing greek_to_me.exe, Flare-on Challenge 3
---

The flag location in the executable is not immediately obvious when opening greek_to_me.exe in IDA. In the string table there is an IP address, WS2_32.dll, and the message telling the user their input is right or wrong. 

![_config.yml]({{ site.baseurl }}/images/flare-on_challenge_3/string_table.png)

Inside the executable, the code calls a function to set up a socket listener on the loop back address. 

![_config.yml]({{ site.baseurl }}/images/flare-on_challenge_3/socket_listener.png)

The listener accepts a byte from the socket and then closes, and returns the byte to be used with the rest of the code. 

![_config.yml]({{ site.baseurl }}/images/flare-on_challenge_3/interesting_stuff.png)

After the listener returns a byte, the code then sets a pointer to the data at 0x40107c and another pointer to 0x40107c + 0x79. It then proceeds into a loop that for each byte, between 0x40107c and 0x4010f5, XORs with the byte returned by the listener and then adds 0x22. Another function is called and then the result is compared with 0xfb5e. If these are equal the code jumps to 0x40107c, which indicates that the above loop was decoding instructions to execute. 

This means that if we analysis the function we could find out information on what the decoded instructions are supposed to be. Another option would be to just implement the function and then use it to brute force the decoded instructions. 

The another option is to create a small program or use tools to send different bytes to the listener and look for the congratulations message. The final option is to loop through each possible byte and then check the decoded instructions for part of the flag.  

Below is the code to try every possible byte and then check the result for chars that are known to be in the decoded instructions. The chars chosen to check for are '-', '.', '@', 'c', 'o', and 'm'. 

```python
encoded_instructions = ('33E1C49911068116F0329FC491170681' +
'14F0068115F1C4911A06811BE2068118' +
'F2068119F106811EF0C4991FC4911C06' +
'811DE6068162EF068163F2068160E3C4' +
'9961068166BC068167E6068164E80681' +
'659D06816AF2C4996B068168A9068169' +
'EF06816EEE06816FAE06816CE306816D' +
'EF068172E90681737C6A')


def decode_function(encoded, xor_byte):
    decoded = ''
    for index in range(0, len(encoded), 2):
        encoded_char = encoded[index:index + 2]
        decoded += hex((xor_byte ^ int(encoded_char, 16)) + 0x22)[2:]
    return decoded


for xor_byte in range(255):
    decoded = decode_function(encoded_instructions, xor_byte)
    if ('40' in decoded and '2d' in decoded and '2e' in decoded
        and '63' in decoded and'6f' in decoded and '6d' in decoded):
        print hex(xor_byte)
```

This results in there being only one possiblity, which is 0xa2. A debugger can then be used to double check the answer. 

![_config.yml]({{ site.baseurl }}/images/flare-on_challenge_3/debugger_orginal.png)

The call to the socket listener should be removed using NOPs and 0xa2 should be stored to the xor_byte. This can easily be done by patching the executable directly or using the debugger. 

![_config.yml]({{ site.baseurl }}/images/flare-on_challenge_3/debugger_nop.png)

The code can then be ran to see the resulting changes to 0x40107c. Which shows us the flag. 

![_config.yml]({{ site.baseurl }}/images/flare-on_challenge_3/flag.png)

The flag is et_tu_brute_force@flare-on.com
