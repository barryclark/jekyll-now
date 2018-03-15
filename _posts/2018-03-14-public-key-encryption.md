---
layout: post
title: A Basic Introduction to Public Key Encryption
---

I thought it might be worthwhile to reprise a topic which I have not looked at in a long time: encryption. This is a very simplistic overview of the topic, and by not means covers all aspects, but it will hopefully provide a good starting point for anyone interested; I have included references for anyone looking for further information. I will mainly cover public-key encryption (although by way of introduction we also take a look at symmetric-key encryption and the key distribution problem).

This is largely based on the Extended Essay I wrote for my International Baccalaureate Diploma in 2009. While I have attempted to update information as necessary, and be as factually accurate as possible, please keep in mind that I have not extensively studied this area in almost 10 years. As such I may misremember details, or they may be out of date.

---

As is convention in cryptography, I will use 'Alice' and 'Bob' to refer to the sender and receiver in the following scenarios, and 'Eve' for the eavesdropper. Other characters include 'Carol' and 'Dave' (other participants in Alice and Bob's conversations), 'Trent' (a trusted, neutral third party), and 'Mallory' (Eve's malicious twin, who unlike Eve may intercept, modify and otherwise interfere with Alice and Bob's communications). I will refer to these characters as people for illustrative purposes, but please note that in practice they would normally be computers communicating on their users' behalf.

---

## Symmetric-Key Encryption

Before we delve into public-key encryption, let us first take a look at its simpler cousin: symmetric-key encryption. In this variant, if Alice wants to send a message to Bob then she takes her letter, places it in a lockable box, and turns her key clockwise in the lock to secure it. She can then safely send it through the (insecure) post, and when Bob receives it he can take a copy of the key, turn it anti-clockwise to unlock the box, and happily read the letter. Bob can then send a letter back using the same method and key if he so chooses.  
An example of this sort of encryption is the Caesar Cipher (a special case of which is rot-13), where each letter is shifted by `n` places (e.g. for a shift of 3, the plain text 'cat' would be written as the cipher text 'fdw'). The 'key' here is the value of `n`; Alice shifts the letters `n` places forwards, and Bob `n` place back.  
Now, while I wouldn't advise relying on a Caesar Cipher to secure communication from anyone old enough to confidently recite the alphabet, that is not to say that symmetric key ciphers are inherently simplistic or easy to break. They were, and still are, widely used. I won't go into a discussion of specific modern ciphers here, but as a starting point for those interested the Data Encryption Standard (DES) was the USA standard protocol from 1977 to 2000, and was replaced by the Advanced Encryption Standard (AES) in 2001.

---

## The Key Distribution Problem

In our above examples we assume that Bob has a copy of Alice's key before she sends her letter. This leaves out a vital step of the process however: how does Bob get the key in the first place? Alice could send it in a different locked box, but then how would Bob get the key for _that_ box? They could meet in person, but that's hardly practical if they live on different continents. Alice could give it to Trent, who could then pass it on to Bob, but that assumes that he's available and that they can each communicate with _him_ securely. This is known as the key distribution problem.  
Over the years this has led to various company employees, civil servants and secret-service members flying around the globe carrying briefcases full of keys (ranging from short keys (e.g. 128 bits) to literally pages and pages of one-time pads depending on the level of needed security). However nowadays it is generally solved by using public key encryption. While public key encryption _can_ be used to encrypt messages directly, most public-key methods are much slower and lead to longer cipher text than symmetric-key methods. Thus generally public key encryption is used to exchange a key securely (known as a session key), which is then used to encrypt messages via a symmetric-key protocol.

---

## Public-Key Encryption

Using public-key encryption, Bob sends Alice a padlock, and keeps the matching key himself. Alice can then place her letter in a box and secure it with Bob's padlock, and when Bob receives it he can unlock it using his key.  The padlock can be sent through the regular post without any security measures, since a padlock can only be used for locking things, not unlocking them. Thus even if Mallory intercepts it, he can only use it to send Bob secure messages; it is useless for gaining access to anything Alice sends Bob. The padlock is thus Bob's public key, which does not need to be kept secure, and the key his private key, which he must keep absolutely secret. This neatly solves the key distribution problem, since Alice and Bob do not need to securely exchange any information prior to Alice sending Bob her letter. However unlike symmetric key methods, Bob cannot use his padlock-and-key pair  to return Alice's message (since she does not possess the key); instead he must first ask her for her padlock.  
Public-key protocols generally rely on one-way mathematical functions to achieve this padlock-and-key style functionality. These are functions which are computationally inexpensive to perform, but very expensive to reverse. As an example, let's look at RSA (one of the most widely-used public-key encryption methods). It relies upon multiplication of prime factors, and modular arithmetic.  
To generate RSA keys, Alice first picks two large prime numbers, `p` and `q`, which she then multiplies together to give `N`. Alice then chooses a smaller number `e`, which must be relatively prime to (`p`-1)x(`q`-1) (that is they should have no common factors other than 1). She can then find `d` such that (`e`x`d`)(mod(`p`-1)x(`q`-1)) = 1. `N` and `e` are Alice's public key, and `d` is Alice's private key (although she must also keep `p` and `q` secret since they can be used to find `d`). To send Alice a message (or a session key) Bob computes `C`=`M`^`e`(mod`N`), where `C` is the cipher text and `M` is the message (remember that both of these are generally binary strings). To decipher the message, Alice can then compute `M`=`C`^`d`(mod`N`).  
In practice, rather than Alice sending Bob her public key directly, she would publish it so that anyone wanting to send her a message could use it.

---

## Digital Signatures

Public-key encryption does not solve all of Alice and Bob's problems however. While it will keep Eve out, it will not stop Mallory from intercepting Alice's message and replacing it with his own. This is known as a man-in-the-middle attack; Mallory acts as middle man, pretending to be Bob when talking to Alice and Alice when talking to Bob.  
There is a way for Alice to ensure Bob knowns which messages come from her however. Many public-key encryption methods allow either key to be used for encryption, so long as the other is used for decryption. Thus Alice could encrypt a message with her private key, and then Bob could use Alice's public key to decrypt it. Obviously this doesn't provide any security (everyone knows Alice's public key, so anyone can decrypt it), but if the decryption is successful then it _does_ prove that the message came from Alice (since it must have been encrypted with her private key, which only she knows). This is known as digital signatures.  
In order to securely send a message to Bob, and prove that it came from her, Alice could then encrypt her message twice. First she signs it with her private key, and then she encrypts it with Bob's public key. The second encryption adds security, since only Bob will be able to decrypt it.

---

## Certification Authorities

This leaves one last problem however. What if Mallory intercepts the (unencrypted) initial messages where Alice and Bob are sending each other their public keys, and replaces them with his own? He could then run a more sophisticated man-in-the-middle attack, where Alice believes that Mallory's public key is Bob's, and Bob believes that it's Alice's. In this case rather than just replacing messages, Mallory could read them as well.  
This is where they must turn to Trent, a.k.a a certification authority. Trent could sign Bob's public key, along with some of Bob's personal information so that others can identify him. Then when Alice looks up Bob's public key, she can check Trent's signature and the personal information to make sure that she has the correct key.  
Alternative they could use distributed key management. Alice might be able to meet with Bob, and she could sign his key. Then Alice's friend Carol could look up Bob's key and check Alice's signature. Since Carol trusts Alice, she can be confident that Bob's key is in fact his. This means that they don't need Trent (there's not always someone who everyone trusts), but might put Dave in a bind if he doesn't trust Alice (or anyone else who signed Bob's key).

---

## Breaking Public-Key Encryption

One of the major potential security flaws of public-key encryption is that it relies upon computations which are _difficult_, but not _impossible_. For example, as mentioned above anyone who can find `p` and `q` for RSA keys can easily compute the private-key `d` (as Alice did when she was creating it), and these _can_ be found from her public key `N`. To this end, one of the major decisions that Alice must make is the size of N, as a larger value of N is harder to factorise and thus creates more secure encryption. I'm sure you can manage to factorise 6 or even 91 fairly easily, but would struggle with a 10-digit number. Any value of N may be factorised by simply trying all possible factors (i.e. brute force), but this is time intensive and relies largely on current computing power in order to be practical. For example, in 1994 a challenge was issued to break an approximately a 429-bit key, and this was completed in 1997 by a team of 600 volunteers. Prior to 2000, various teams of crypto-analysts and mathematicians, using several computers, took 3 months to break a 512-bit key, and in 2001 a 128-bit key was still considered reasonably secure. A more current standard is key lengths of roughly 2000-4000 bits. While this value is obviously beyond the means of the average citizen at present, advances in computing power, or having enough computers to throw at a problem, will eventually break Alice and Bob’s security. So while Eve, a school friend jealous of Alice and Bob’s relationship, will probably never be able to read their love letters until old age, Eve’s alternate reality twin, the head of the secret service, may well be able to break through Alice and Bob’s security to find out the details of the heist they are plotting in reasonable time. There is also the possbility that a breakthrough in computing power (e.g. if practical quantum computers are developed) could render many encryption methods entirely insecure.  
Law enforcement agencies (e.g. the NSA) have also historically limited the strength of encryption so that _they_ can break it. Or have simply build in backdoors. Which is all well and good assuming that only they ever have the computing power to exploit the weaknesses, or know about the backdoors, but in practice has caused a miryad of problems.  
Finally, a lot of cryptography relies upon generating random numbers (and thus random keys). Being stuck with _pseaudo-random_ generators, rather than truely random ones, often causes security flaws.

---

## References

#### My Extended Essay

Can be found here, and contains its own bibliography (which is probably more useful than either the essay itself or this reference list for anyone looking for further reading).

#### Other references

  Delfs, H. & Knebl, H. (2007). _Introduction to Cryptography: principles and applications_. Berlin: Springer.  
  Bonneau, J. (2016). _Technical Developments in Cryptography: 2016 in Review_. Retrived March 14, 2018, from Electronic Frontier Foundation. Web site: https://www.eff.org/deeplinks/2016/12/what-happened-crypto-2016

