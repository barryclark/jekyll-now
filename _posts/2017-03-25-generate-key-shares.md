---
layout: post
title: Generating new master key shares in Vault
author: james_hall
external_url: https://jameshall.blog/2017/03/25/generating-new-master-key-shares-in-vault/
---

Vault makes use of [Shamir’s secret sharing scheme](https://en.wikipedia.org/wiki/Shamir's_Secret_Sharing) to split a master key into _n_ pieces, requiring at least _k_ of them to be presented at unseal time. At initialisation time, the user specifies what values _n_ and _k_ should take. However, Vault does not make it possible to change the number of shares after initialisation without recreating new shares for existing shareholders. Shamir's scheme does allow this so I decided to raise a pull request implementing this functionality.