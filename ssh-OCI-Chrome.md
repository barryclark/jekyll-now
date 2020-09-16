---
layout: page
title: Connecting to an OCI instance using Chrome Secure Shell Extension
redirect_from:
  - /ssh-chrome/
---


It is sometimes tricky to use SSH on older Windows versions. An alternative solution is to use Chrome Secure Shell Extension. 

* When creating your OCI instance make sure to save your SSH key pairs, both the private and the public key.


<p align="center"><img alt="save keys" src="/images/doc/chrome-ssh-oci.png" width="75%"/></p>

* Install the Chrome [Secure Shell Extension](https://chrome.google.com/webstore/detail/secure-shell-dev/algkcnfjnajfhgimadimbjhmpaeohhln?hl=en) (not the Chrome Secure Shell Application as it is deprecated!).

* In Chrome, launch the extension (see top right).

<p align="center"><img alt="start ssh extension" src="/images/doc/chrome-ssh-start.png" width="75%"/></p>

* Select **Connection dialogue** ➡ **New connection**.

<p align="center"><img alt="ssh popup" src="/images/doc/chrome-ssh-popup.png" width="75%"/></p>

* Fill in the username (opc), the instance public IP address and give the connection a name (ex. OCI).

* Click **Import** to import an identity, and select the private key (the 'ssh-202*' file  with a '.key' extension). Do note that both the public and private keys should be located in the same directory!

* Select **[ENTER] Connect**.

* If you need to establish a second connectio, just open a new Chrome tab or window and launch th extension again.

⚠️ Please make sure to fully assess and validate this extension when using it with sensible SSH keys!
