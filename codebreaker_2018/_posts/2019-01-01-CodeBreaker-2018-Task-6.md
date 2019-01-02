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

# Exploit Contract by Causing Revert #

There is another option, though I have not tested it, to get the decryption key without paying. This method still requires you to deploy a modified contract, and send the complete ransom amount. When the decryptCallback function is called the Escrow contract will pass control to the Ransom contract by calling the fulfillContract function. If this function causes a revert, then the ransom will never leave the escrow and go into the attacker's control. The transaction that caused the failure will still be [included in the blockchain](https://ethereum.stackexchange.com/questions/39817/are-failed-transactions-included-in-the-blockchain), so that the caller still has to pay for the gas to process. The failed block should be [retrievable just like any other block](https://ethereum.stackexchange.com/questions/56908/where-can-i-find-failed-transactions); here is an example of a [failed block](https://etherscan.io/tx/0xd1c64ba497a831db014fcd1a41a12f4a08b9f5ee18ed6171f8fef06cc3e5f817) provided. 

The decrypted encryption key will forever be included in the blockchain, and you can call requestRefund to retrieve the Ether that was paid. 

# Exploit Contract Through Race Condition #

If the authToken can't be determined in order to deploy a modified contract, there is still a method to retrieve the decryption key. This method requires that the full ransom amount be paid, but afterwards any Ether paid can be retrieved. This exploit is possible since the decryptCallback function does not check if the escrowMap[id] is greater than the ransomAmount (you may see a trend here, many of the attacks I mention is because of this). This attack is known as [Front Running (AKA Transaction-Ordering Dependence)](https://consensys.github.io/smart-contract-best-practices/known_attacks/#front-running-aka-transaction-ordering-dependence), which is when the transactions with a contract have to happen in a certain order. 

In the Escrow contract paying the ransom and the ransom being moved to the attacker's control happen in two different transaction. This opens the possibility for someone to exploit a race condition, and submit a third transaction for calling the function requestRefund in between the previous transactions. [Solidity: Transaction-Ordering Attacks](https://medium.com/coinmonks/solidity-transaction-ordering-attacks-1193a014884e) has a detailed example of this attack. In short the malicious party, us, would submit the transaction for requestRefund with a higher gas price than the transaction with decryptCallback, ensuring that miners will prioritize our transaction over others when including transactions in blocks to mine. 

Below are the steps for this:<br>
1. Create Event filter to monitor for DecryptEvent from Escrow contract<br>
2. Prepare two transactions, one calling payRansom, the other calling requestRefund with a higher gas price<br>
3. Send the payRansom transaction and wait for Event to be emitted<br>
4. When the DecryptEvent is emitted, send the requestRefund transaction<br>
5. Wait for requestRefund to be mined<br>
6. If the requestRefund transaction was mined before the transaction with decryptCallback, then the escrowMap[id] would have underflowed, and the requestRefund can be called to retrieve any Ether paid in an unsuccessful attempt. <br>

If the Escrow contract has enough Ether to cover the ransom amount, then the above attack can be changed to protect the attacker from having Ether tied up on any unsuccessful attempts. Instead of sending an encrypted file that will be successful, the attacker can send one that will cause the decryption to fail; the rest of the attack is the same. On an successful attack the attacker will unflow escrowMap[id], receive Ether sent and Ether from contract. On an unsuccessful attack the attacker will still receive the Ether they sent, since the decryption failed. After a successful attack the attacker can send the encrypted file, receive the decryption key, and then use the requestRefund to retrieve Ether sent. 

The above attack can also be used for task 7. 

[check if we can change the encrypted file's victim id and then just register with encryption key and download.] 

