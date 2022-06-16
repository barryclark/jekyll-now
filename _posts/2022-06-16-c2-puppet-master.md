---
layout: post
title: C2 - Puppet Master
---

<img height="200" align="left" src="https://raw.githubusercontent.com/BenjiTrapp/puppet-master/main/docs/puppet-master.png"> Tighten the strings and have some fun with your puppets. This Docker image is build on top of a minimal base install of the latest version of the Kali Linux Rolling Distribution and enriched with additional capabilities to transform it into a [C2 Server](https://www.paloaltonetworks.com/cyberpedia/command-and-control-explained) to aid during Pentesting engagements, CTFs or for other sakes. The baseline was described by me in my [Pensieve](https://benjitrapp.github.io/memories/2022-06-06-c2-autoinstall/) before.

<br><br><br>
##### Disclamer:
> I'm not responsible for any harm caused by this tool. The provided docker image is part of my curiosity and used for CTFs and education only. Use these powers wisely and stay on the light side!


### [Get the Puppet Master here](https://github.com/BenjiTrapp/puppet-master)

## Content 

**Kali metapackages [https://tools.kali.org/kali-metapackages]**:
* kali-tools-top10
* kali-desktop-gnome
* kali-tools-fuzzing
* kali-tools-passwords
* kali-tools-post-exploitation
* kali-tools-sniffing-spoofing

**C2 Capabilities**:
* Metasploit
* Covenant
* SilentTrinity
* Empire
* StarKiller
* PoshC2
* Merlin
