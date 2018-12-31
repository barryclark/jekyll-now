---
layout: default
permalink: /CodeBreaker-2018-Task-6/
title: NSA Codebreaker 2018, Task 6
---

For task 6, you are asked to find a way to decrypt the victim's encryption key without paying the ransom. Below are some of the reason this is possible:<br>
![_config.yml]({{ site.baseurl }}/images/Codebreaker_2018/Task_6/vid_not_checked.png)
- Escrow contract does not check to see if a victim ID has already been registered<br>
- Ransom amount is set by the Ransom contract<br>
- Ransom amount is not validated by Escrow<br>
[picture]
- ?Encryption key is not tied to victim ID?<br>


One method to achieve the desired outcome is to register a Ransom contract with same victim ID and ransom amount equal to 0. To make it easier, I also hard coded all the arguments, except for the authToken. 

![_config.yml]({{ site.baseurl }}/images/Codebreaker_2018/Task_6/contract_changes_1.png)

![_config.yml]({{ site.baseurl }}/images/Codebreaker_2018/Task_6/contract_changes_2.png)

The deployment of the contract and payment of the ransom happens the same as it did for the victim, except we are using a modified contract where the ransom amount is 0. The Below are the steps:<br>

1. Register modified Contract<br>
2. Call payRansom<br>
3. Call getDecryptionKey<br>

I generated authToken using the python module [pyotp](https://github.com/pyauth/pyotp). 
'''python
import pyotp
totp = pyotp.TOTP('7P57CDMIUWYV5BMHT3C7HIGJOYRLDVZT')
totp.now()
'''



[check if we can change the encrypted file's victim id and then just register with encryption key and download.] 

