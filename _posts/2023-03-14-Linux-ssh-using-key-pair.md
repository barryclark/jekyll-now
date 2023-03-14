---
layout: post
title: Linux ssh using ssh-key-pair and turn off ssh password
---

# Add config sshd ( turn off ssh password)

> vi /etc/ssh/sshd_config

```shell
PermitRootLogin yes
ChallengeResponseAuthentication no
PasswordAuthentication no
UsePAM no
```

$ systemctl restart sshd

![images](/images/turn_off_ssh_password.jpg )

# Using ansible-play book as a tool add ssh-key for users who need access

### Step01: Add hosts ansible
> vi /etc/ansible/hosts

```shell
[worker]
#DR_WEB_01
worker ansible_host=192.168.2.2 
#DR_WEB_02
worker ansible_host=192.168.2.3 
#DR_WEB_03
worker ansible_host=192.168.2.4
#DR_API_01
worker ansible_host=192.168.2.6 
#DR_API_02
worker ansible_host=192.168.2.7 
#DR_API_03
worker ansible_host=192.168.2.8 

[master]
master1 ansible_host=192.168.2.9
```

### Step02: Create file to store data

> vi /opt/ssh_key_pair/key_client

```shell
ssh-rsa "Key01"
ssh-rsa "Key02"
ssh-rsa "Key03"
ssh-rsa "Key04"
```

### Step03: Create file ansible playbook

> vi /opt/ssh_key_pair/ssh_key_pair.yml

```shell
---
- hosts: worker
  become: yes
  tasks:
    - name: copy key to server
      copy:
      src: /opt/ssh_key_pair/key_client
      dest: /root/.ssh/key_client
    - name: append text to end of file
      args:
      chdir: "/root/.ssh"
      shell: cat key_client >> /root/.ssh/authorized_keys
    - name: delete key_client
      file: path=/root/.ssh/key_client state=absent
- hosts: master
  become: yes
  tasks:
    - name: clear data file key_client
      args:
        chdir: "/opt/ssh_key_pair"
      shell: "truncate -s 0  key_client" 
```

