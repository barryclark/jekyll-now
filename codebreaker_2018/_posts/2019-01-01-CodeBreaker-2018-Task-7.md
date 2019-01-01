---
layout: default
permalink: /CodeBreaker-2018-Task-7/
title: NSA Codebreaker 2018, Task 7
---

For task 7, we need to find a way to retrieve the Ether victims have already paid and send it back to them. The vulnerability that makes this possible is in the Escrow contract; it will pass control to the Ransom contract allowing what is call [re-entrancy](https://solidity.readthedocs.io/en/latest/security-considerations.html#re-entrancy). Re-Entrancy is when a contract is able to call back into another contract to effect the state, before the transaction has been completed. The contract is written to protect itself from someone using re-entrancy to send themselves all the Ether directly, since it subtracts the amount before transferring the Ether. 

![_config.yml]({{ site.baseurl }}/images/Codebreaker_2018/Task_7/request_refund.png)

Re-entrancy can be used to call other functions and effect the state of the contract in other ways. To see how the contract is vulnerable, the payRansom flow needs to be understood. I will go into brief description, but more detail can be found [here](https://armerj.github.io/CodeBreaker-2018-Contract/). 

![_config.yml]({{ site.baseurl }}/images/Codebreaker_2018/contract/victim_pays_ransom_1.png)

To decrypt the encryption key an off chain oracle is required, since secrets can't be kept on the block chain. When the decryptKey function is called, the Escrow contract will emit a DecryptEvent for the oracle to process. The oracle will attempt to decrypt the key and use it to decrypt the file submitted by the victim. Once complete the oracle will call the decryptCallback function, which does not check to see if the amount the victim paid is equal or greater then the ransom amount. The function instead assumes that the amount the victim paid is equal or greater, since the values were checked in the decryptKey function. 

![_config.yml]({{ site.baseurl }}/images/Codebreaker_2018/Task_7/decrypt_callback.png)

As mentioned in task 6, the Escrow doesn't check if a Ransom contract has already been registered. At first it may seem that this is a race condition, since the ransom amount needs to be set to 0 before the decryptCallback function is called. This is actually not the case, since [events are emitted when the block has been mined](https://medium.com/hello-sugoi/ethereum-communicating-with-the-off-chain-world-789fea13163b), and not when emitted in the code. This means that after the event has been emitted, but before control is returned to the Escrow contract we can use re-entrancy to effect any part of the contracts state we want. 

We can use this vulnerability and re-entrancy to steal all the Escrow contract's Ether. Below is the flow of the attack. 
 
![_config.yml]({{ site.baseurl }}/images/Codebreaker_2018/Task_7/steal_ether.png)

Below is a simple time line of the transaction, which makes it more clear that the event is emitted after the block is mined. 

![_config.yml]({{ site.baseurl }}/images/Codebreaker_2018/Task_7/steal_ether_timeline.png)

There were 3 victims, who each paid 100 Ether, so there is 300 Ether we need to retrieve. There are two methods we can use to get this amount. The first is to re-register the Ransom contract with ransomAmount set to 300, and cause the decryption in the oracle to fail, by giving a bad key or file. This will result in authResult being false and the Escrow contract transferring the ransom amount back to the payer, us. 

Below is a video of the attack.
<iframe width="560" height="315" src="https://www.youtube.com/embed/skca2Wn9_sI?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

Generating multiple decryptEvents will not have the desired effect, since the decryptCallback function will check if there is a encrypted file saved in encFileMap[id] first. If there is a file there it is removed, otherwise the transaction will fail. 

![_config.yml]({{ site.baseurl }}/images/Codebreaker_2018/Task_7/file_check.png)

The second method is to notice that escrowMap[id] is set to the amount paid, 0 in this case, and ransomAmount is greater than 0. This will cause an [underflow](https://medium.com/3-min-blockchain/understanding-uint-overflows-and-underflows-solidity-ethereum-8603339259e6), which is when a unsigned number is subtracted from a smaller unsigned number. This will result in escrowMap[id] being a little less than 2^32, and we can call the requestRefund function to retrieve all the ether in the Escrow contract. 

If the Escrow contract prevented a Ransom Contract from registering, by checking for that victim id, there is another attack using requestRefund. This requires a little more set up, since calling this function is restricted to the victim address. 

![_config.yml]({{ site.baseurl }}/images/Codebreaker_2018/Task_7/restrict_to_victim.png)

The victim address can be set to the Ransom contracts address when the Ransom contract first registers with the Escrow. 
 
![_config.yml]({{ site.baseurl }}/images/Codebreaker_2018/Task_7/set_vic_address.png)



