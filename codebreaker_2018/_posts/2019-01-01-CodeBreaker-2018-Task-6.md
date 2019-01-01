---
layout: default
permalink: /CodeBreaker-2018-Task-6/
title: NSA Codebreaker 2018, Task 6
---

For task 6, you are asked to find a way to decrypt the victim's encryption key without paying the ransom. Below are some of the reasons this is possible:<br>

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
{% highlight python %}
import pyotp
totp = pyotp.TOTP('7P57CDMIUWYV5BMHT3C7HIGJOYRLDVZT')
totp.now()
{% endhighlight %}

There is another option, though I have not tested it, to get the decryption key without paying. This method still requires you to deploy a modified contract, and send the complete ransom amount. When the decryptCallback function is called the Escrow contract will pass control to the Ransom contract by calling the fulfillContract function. If this function causes a revert, then the ransom will never leave the escrow and go into the attacker's control. The transaction that caused the failure will still be [included in the blockchain](https://ethereum.stackexchange.com/questions/39817/are-failed-transactions-included-in-the-blockchain), so that the caller still has to pay for the gas to process. The failed block should be [retrievable just like any other block](https://ethereum.stackexchange.com/questions/56908/where-can-i-find-failed-transactions); here is an example of a [failed block](https://etherscan.io/tx/0xd1c64ba497a831db014fcd1a41a12f4a08b9f5ee18ed6171f8fef06cc3e5f817) provided. 

The decrypted encryption key will forever be included in the blockchain, and you can call requestRefund to retrieve the Ether that was paid. 


[check if we can change the encrypted file's victim id and then just register with encryption key and download.] 

