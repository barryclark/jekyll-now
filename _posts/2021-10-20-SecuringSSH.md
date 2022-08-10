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
       
       ClientAliveInterval 360 # ssh Timeout
       ClientAliveCountMax 0 
       PermitEmptyPasswords no #Empty password text not permited
       AllowUsers <UserName> # Only alows entered users here
       Protocol 2 # User ssh protocol 2 (Latest)
       Port 222 # Change Port
       
4. Copy your ssh key to the server via (Mac/Linux)

       ssh-copy-id <UserName>@10.0.0.1 -p 222
For Windows:
Login via ssh, cd into .ssh folder

       nano authorized_keys
Now you have created a new file where you can copy your personal computers pub key.
Once you have completed above instructions, now you can disable password login

       sudo nano /etc/ssh/sshd_config
add last line to the config file

       PasswordAuthentication no

5. Restart ssh services
        
        sudo service sshd restart
     


 



