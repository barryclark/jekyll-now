---
layout: post
title: A Basic Introduction to Public Key Encryption
---



This is largely based on the Extended Essay I wrote for my International Baccalaureate Diploma in 2009. While I have attempted to update information as necessary, and be as factually accurate as possible, please keep in mind that I have not extensively studided this area in almost 10 years. As such I may misremember details, or they may be out of date.

--

As is convention in cryptography, I will use 'Alice' and 'Bob' to reffer to the sender and receiver in the following scearios, and 'Eve' for the eavesdropper. Other characters include 'Carol (another participant in Alice and Bob's conversation), 'Trent' (a trusted, neutral thrid party), and 'Mallory' (Eve's malicious twin, who unlike Eve may intercept, modify and otherwise interfere with Alice and Bob's communications). I will refer to these characters as people for illustrative purposes, but please note that they would normally be computers communcating on their users' behalfs.

--

## Symmetric Key Encryption and the Key Distribution Problem

