---
layout: post
title: A Basic Introduction to Public Key Encryption
---



This is largely based on the Extended Essay I wrote for my International Baccalaureate Diploma in 2009. While I have attempted to update information as necessary, and be as factually accurate as possible, please keep in mind that I have not extensively studied this area in almost 10 years. As such I may misremember details, or they may be out of date.

--

As is convention in cryptography, I will use 'Alice' and 'Bob' to refer to the sender and receiver in the following scenarios, and 'Eve' for the eavesdropper. Other characters include 'Carol (another participant in Alice and Bob's conversation), 'Trent' (a trusted, neutral third party), and 'Mallory' (Eve's malicious twin, who unlike Eve may intercept, modify and otherwise interfere with Alice and Bob's communications). I will refer to these characters as people for illustrative purposes, but please note that in practice they would normally be computers communicating on their users' behalf.

--

## Symmetric Key Encryption

Before we delve into public-key encryption, let us first take a look at its simpler cousin: symmetric key encryption. In this variant, if Alice wants to send a message to Bob then she takes her letter, places it in a lockable box, and turns her key clockwise in the lock to secure it. She can then safely send it through the (insecure) post, and when Bob receives it he can take a copy of the key, turn it anti-clockwise to unlock the box, and happily read the letter. Bob can then send a letter back using the same method and key if he so chooses. An example of this sort of encryption is the Caesar Cipher (a special case of which is rot-13), where each letter is shifted by `n` places (e.g. for a shift of 3, the plain text 'cat' would be written as the cipher text 'fdw'). The 'key' here is the value of `n`; Alice shifts the letters `n` places forwards, and Bob `n` place back.  
Now, while I wouldn't advise relying on a Caesar Cipher to secure communication from anyone old enough to confidently recite the alphabet, that is not to say that symmetric key ciphers are inherently simplistic or easy to break. They were, and still are, widely used. I won't go into a discussion of specific modern ciphers here (with one exception below), but as a starting point for those interested the Data Encryption Standard (DES) was the USA standard protocol from 1977 to 2000, and was replaced by the Advanced Encryption Standard (AES) in 2001.

One symmetric-key technique of particular note is the one-time pad. Many techniques used to break encryption rely on finding repeating blocks, which can then be compared. Going back to the Caesar Cipher, it has a block size of 1 so every character can be compared to every other. For example if Alice sends Bob the cipher text 'jum', Eve could start guessing 3 letter words until she finds one which works (e.g. 'c' -> 'j' is a shift of 7, and 'a' -> 'u' is a shift of 20, so it can't be 'cat'). While this might give multiple possible results for a single word, with a paragraph of text it becomes much more reliable, and once Eve is confident she knows `n` she can then easily decode the rest of Alice's message. In order to make it harder for Eve, Alice and Bob could instead have two values for `n` which they alternate between; the cipher text might then become 'jqm', and as the second character has no relation to the first, Eve cannot compare the shifts in the same way she did before (although she may still compare the first and third character). The two values of `n` then become their key (e.g. "6, 2"). The logical extension of this is to have as many values of `n` as there are characters in the message, thus giving a key length the same length as the message. By doing so Alice and Bob ensure that no characters of their cipher text can be compared with any other, and so Eve has no way to guess their key. However, if they use that same key again (or part of it, for a shorter message) Eve could compare the text of the two communications. Thus in order to completely protect themselves from Eve, Alice and Bob must discard their key once it is used and employ a new key for the next message. This is known as the one-time pad, and is unbreakable.  
In modern times the Caesar Cipher isn't used, of course. Computers don't tend to think in terms of alphabets, and the Caesar Cipher doesn't work well with other languages or data such as photographs. Instead, Vernam's One-Time Pad is generally used when totally secure, but somewhat impractical, encryption is necessary. For this cipher the key is simply a binary string (truly random for perfect security, but in practice usually pseudo-random so that both parties can generate it from a shared seed). To perform encryption, each bit of the key is XORed with the corresponding bit of the message, and decryption works the same way.

--

## The Key Distribution Problem

In our above examples we assume that Bob has a copy of Alice's key before she sends her letter. This leaves out a vital step of the process however: how does Bob get the key in the first place? Alice could send it either in advance or simultaneously in a different locked box, but then how would Bob get the key for _that_ box? 

## References

#### My Extended Essay



#### Other references

Delfs, H. & Knebl, H. (2007). _Introduction to Cryptography: principles and applications_. Berlin: Springer.

