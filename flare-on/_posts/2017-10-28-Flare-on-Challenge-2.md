---
layout: post
title: Reversing IgniteMe.exe, Flare-on Challenge 2
---

Finding the encoded flag in this executable was easy. You can find it by running 'strings IgniteMe.exe' or by looking in the string table in IDA. 

![_config.yml]({{ site.baseurl }}/images/flare-on_challenge_2/strings.png)

Following the reference to the string "G1v3 m3 t3h fl4g: ", will show the code for requesting the user's input. By analyzing the code you can see that a function is called, and the return is then checked. Based on this check the program will either output "G00d j0b!" or "N0t t00 h0t R we? ...". This function will probably contain the code for validating the user's input.

![_config.yml]({{ site.baseurl }}/images/flare-on_challenge_2/request_flag.png)

Another way to find the code for validating the user's input is by following the reference to the encoded flag. 

![_config.yml]({{ site.baseurl }}/images/flare-on_challenge_2/compare_setup.png)

There is two functions being called to setup before going into the loop to check the user's input. One thing that stands out is the loop condition is comparing the index to 0. The indicates that the user's input is being checked in reverse. The first function that is called is to get the length of the user's input. This is used to set the index at the end of the input. 

The next function takes the constant 0x80070057 and operates on it to get a single byte to use as the first XOR char. The simplest way to find this is to implement these operations in a code. 

```python
def rol(number, rot_by): # rotate left
    binary = bin(number)
    return int(binary[rot_by+2:] + binary[2:rot_by+2], 2)

encoded_iv = 0x80070057
encoded_iv &= 0xFFFF0000 # xor ax, dx
encoded_iv = rol(encoded_iv, 4) # rol eax, 4
encoded_iv = (encoded_iv & 0x000000FF) >> 1 # shr ax, 1
print 'IV = {0}'.format(encoded_iv)

```

The result is 4, which can then be used to retrieve the flag. By looking at the loop that compares the input and the flag we can see that the encoded flag is decoded by encoded_string[index] XOR xor_char, where xor_char starts as 4 and is updated to decoded_string[index]. 

![_config.yml]({{ site.baseurl }}/images/flare-on_challenge_2/getting_the_flag.png)

The below code will automate the process of getting the flag. 

```python
def byte_cbc_xor(encrypted, xor_byte):
    plain_txt = ''
    for i in range(len(encrypted)-2, -1, -2):
    # loop backwords from end to begin, step 2
        xor_byte ^= int(encrypted[i:i+2], 16)
        plain_txt += chr(xor_byte)
    return plain_txt[::-1] # reverse string

print byte_cbc_xor('0d2649452a1778442b6c5d5e45122f172b446f6' +
                    'e56095f454773260a0d1317484201404d0c0269', 0x4)

```

If you didn't know that the xor_char starts off as 4, you can brute force the char and check each resulting string for "@flare-on.com"

```python
for i in range(255):
    plain_txt = byte_cbc_xor('0d2649452a1778442b6c5d5e45122f172b446f6' +
                             'e56095f454773260a0d1317484201404d0c0269', i)
    if '@flare-on.com' in plain_txt:
    # checks for partial known plain txt
        print 'IV = {0} \nflag = {1}'.format(i, plain_txt)

```

The final key is R_y0u_H0t_3n0ugH_t0_1gn1t3@flare-on.com. 
