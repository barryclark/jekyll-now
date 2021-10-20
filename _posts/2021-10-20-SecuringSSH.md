---
layout: post
title: "Securing SSH"
---

# Welcome
Quick how-to secure your ssh on linux server.

## Instructions
1. First add user

       sudo adduser <UserName>
2. Add user to sudoer group

       sudo usermod -aG sudo <UserName>
3. Edit ssh configuration file

       sudo nano /etc/ssh/sshd_config

      Add these to end of the file:
       
       ClientAliveInterval 360
       ClientAliveCountMax 0
       PermitEmptyPasswords no
       AllowUsers <UserName>
       Protocol 2
       Port 222
4. Coppy your ssh key to the server via 

       ssh-copy-id <UserName>@10.0.0.1 -p 222
5. Restart ssh services
        
        sudo service sshd restart
     


 



