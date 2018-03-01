---
layout: post
permalink: /Codebreaker/
title: NSA Codebreaker 2017, Task 3
---

Task 3

The hint they gave was that the authentication scheme was modified to allow the flexibility to change the hashing scheme when needed. This can make it easier to upgrade, but it opens up a vulnerability. The data sent to the server must included the length of password to be hashed, which can be controlled by the attacker. The length is used to tell how many bytes to hash, and to then compare to the expected hash. By controlling the length data the attacker can do an attack called a partial hash collision. 

This would normally be extremely difficult in SHA3 256. It's made possible since the collision only needs to be 4 bytes long. Now that I have found the vulnerability a proof of the exploit needs to be done. To do this I needed to find the correct password to use to find the partial hash collision. Using Wireshark the initial authentication sent in the test environment was captured. 

![_config.yml]({{ site.baseurl }}/images/CodeBreaker/Task_3/***picture***.png)

Below is a python script to find the 4 bytes needed. 

```python
import sha3
import binascii

data= '8e08fe33bcb2a6417669724cf4fa1b5c6db2ccf78f1ba4ba076d5edc133b1931'
s=sha3.sha3_256(binascii.unhexlify(data)).hexdigest()
print data, s

print 'Getting collision'

for i in range(0x10000):
    col = hex(i)[2:]
    while len(col) < 4:
        col = '0' + col
    for j in range(0x10000):
        col_1 = hex(j)[2:]
        while len(col_1) < 4:
            col_1 = '0' + col_1
        col_s=sha3.sha3_256(binascii.unhexlify(col + col_1)).hexdigest()
        if s[:8] == col_s[:8]:
            print col + col_1, col_s
```

![_config.yml]({{ site.baseurl }}/images/CodeBreaker/Task_3/python_hash_col.png)

I then formatted it as 0x045cca7cfb5cca7cfb, encoded it with base64 and submitted it. 

![_config.yml]({{ site.baseurl }}/images/CodeBreaker/Task_3/complete.png)