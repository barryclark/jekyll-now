---
layout: default
permalink: /CodeBreaker-2018-Contract/
title: NSA Codebreaker 2018, Ransom Contract Flow
---

Smart contracts have some advantages and disadvantages over traditional programming. A smart contract creates a record on the blockchain for every transaction and allows anyone to verify that the operation happened correctly. The disadvantage is that a contract's storage and code is completely public. This years challenge tasks us with reading the storage of a smart contract. 

In order someone to keep a secret from others on the blockchain, there has to be some processor off the blockchain, referred to as an oracle. This oracle will monitor for events emitted by a contract, process the event, and then call a function in the contract with the result. These events are only emitted when the block is mined. 

There are a few other differences compared to traditional programming. Transactions are there forever, so someone else can observe how functions were called, what events were emitted, or what the state was at a particular time. Additionally, when functions outside of a contract are called, the contract is handing control over to a third party, whose potentially untrustworthy, which can cause flaws like re-entrancy. 

Here are some good resources on Ethereum [security](https://solidity.readthedocs.io/en/latest/security-considerations.html#re-entrancy) and [attacks](https://consensys.github.io/smart-contract-best-practices/known_attacks/).

Additionally, [here](https://blog.ethereum.org/2016/01/15/privacy-on-the-blockchain/) is a good read on privacy on the blockchain. 

Below are the flows for a few operations the victim might make. 

![_config.yml]({{ site.baseurl }}/images/Codebreaker_2018/contract/contract_deployment.png)

1. Attacker infects victim through an unknown vector
2. Ransomware sends encrypted encryption key and other information to attacker's server
3. Ransom contract is deployed for the victim
4. Ransom contract registers with the Registry Contract
5. Registry emits AuthEvent for the off chain oracle to validate
6. Oracle calls back into Registry contract with the result
7. If successful, the Registry calls authCallback in Escrow, so Escrow recognizes the victim ID
8. Registry calls authCallback in Ransom contract
9. Ransom contract registers with Escrow, setting victim's address, ransom amount and victim ID

![_config.yml]({{ site.baseurl }}/images/Codebreaker_2018/contract/victim_pays_ransom_1.png)

1. Victim calls payRansom, sending encrypted file and Ether to pay the ransom
2. Escrow saves encrypted file, and calls requestKey from Ransom contract
3. Ransom contract will call decryptKey and passes the encrypted encryption key
4. Escrow will emit a DecryptEvent with encrypted encryption key and encrypted file
5. Oracle will attempt to decrypt file and callback into Escrow contract with the result
6. If successful, Escrow will subtract ransom amount from amount victim send and add it to the amount the attacker has access to. The Escrow will also delete the encrypted file and save the decrypted encryption key, and calls the fulfillContract in the Ransom contract. If the decryption fails, then the Escrow contract will send the Ether back to the victim. 



