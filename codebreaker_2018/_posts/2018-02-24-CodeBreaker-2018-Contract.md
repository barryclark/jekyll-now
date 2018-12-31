---
layout: default
permalink: /CodeBreaker-2018-Contract/
title: NSA Codebreaker 2018, Ransom Contract Flow
---

Victim infected -> ransom deploy -> events emitted -> oracle -> callback -> etc

*check if data sent is in contract deploy encoded* 

Victim pays ransom

Why have to use oracle

Why have to use events, events are generated when block is mined

Different programming model

Talk about different ether attacks

Talk about how contracts are different programming model. no secrets, there forever, reentry, everything happens when block is mined, need for off chain oracle, communication between contracts and oracle. 


https://solidity.readthedocs.io/en/latest/security-considerations.html#re-entrancy

https://blog.ethereum.org/2016/01/15/privacy-on-the-blockchain/

https://consensys.github.io/smart-contract-best-practices/known_attacks/