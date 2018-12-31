---
layout: default
permalink: /CodeBreaker-2018-Task-3/
title: NSA Codebreaker 2018, Task 3
---

For task 3, we are asked to determine how the victim id is generated, in order to see if any information can be determined if we know just the victim id. 

To aid in our effort to generate the victim id for the infected computer, we are provided with the following information:<br>
{% json %}
{
    "cpu_bits": "32",
    "ip_address": "10.118.138.237",
    "mac_address": "f2:de:8e:05:02:3c",
    "operating_system": "Windows",
    "otp_value": "790513",
    "time_of_infection": "Mon, 13 Aug 2018 08:34:05 GMT"
}
{% endhighlight %}

What is interesting, although irrelevant, about this information is that the operating system is Windows, though the binaries provided are for Linux. 

To determine how the victim id is generated, the function _cid needs to be reversed. 

![_config.yml]({{ site.baseurl }}/images/Codebreaker_2018/Task_3/gia_otp.png)

The function _gia is called with a pointer to var_B8, which is then moved to var_98. The epoch time and the base32 decoded OTP secret are passed to a function to create the time-based OTP (TOTP). The malware uses snprintf to get the first 6 digits of the TOTP, and stores the result in *(var_98+4), resulting in <gia><totp>. 

![_config.yml]({{ site.baseurl }}/images/Codebreaker_2018/Task_3/hmac_args.png)

The value <gia><totp> is used as the input for HMAC-SHA256 with the TOTP secret key as the key to the HMAC algorithm. 

The next step is to determine what the function _gia returns. We know the return value is 4 bytes, since the TOTP was stored at *(var_98+4). I was not able to determine what the function does by Google, but I was able to determine what it likely returns based on the victim information provided and the return size. The value is 4 bytes long which is the same amount of bytes needed to represent the IPv4 address space. 

To convert an IPv4 address to the int32 equivalent the following [formula](http://www.aboutmyip.com/AboutMyXApp/IP2Integer.jsp?ipAddress=10.118.138.237) can be used: (first octet * 256³) + (second octet * 256²) + (third octet * 256) + (fourth octet).

Below is the python script I used to generate the victim ID, that was provided in the orginal ransom note to validate that I had the format correct.

{% highlight python %}
import M2Crypto
import base64

key = base64.b32decode('7P57CDMIUWYV5BMHT3C7HIGJOYRLDVZT')
hmac = M2Crypto.EVP.HMAC(key, 'sha256')
message = b'\x0a\x82\xab\x9a565044'
vid = hmac.update(message)
vid = hmac.digest()
for c in vid:
    print hex(ord(c))[2:],
{% endhighlight %}

![_config.yml]({{ site.baseurl }}/images/Codebreaker_2018/Task_3/output.png)

The below python code will generate the victim id required for this task. 

{% highlight python %}
import M2Crypto
import base64

key = base64.b32decode('7P57CDMIUWYV5BMHT3C7HIGJOYRLDVZT')
hmac = M2Crypto.EVP.HMAC(key, 'sha256')
message = b'\x0a\x76\x8a\xed790513'
hmac = M2Crypto.EVP.HMAC(key, 'sha256')
vid = hmac.update(message)
vid = hmac.digest()
for c in vid:
    print hex(ord(c))[2:]
{% endhighlight %}


