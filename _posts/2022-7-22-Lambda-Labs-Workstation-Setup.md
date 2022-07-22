
After changing the power cable, follow these steps to set up the station:

When you turn on the station for the first time, there will be a wizard window asking you to

- Enter the name of root ‘asr’
- Enter the name of the station, in our case it was ‘asr3’
- Enter the password of the root user ‘asr123’
- Then it will ask you to select the region, select ‘Riyadh’
1. Open the terminal and write the following commands ( update could take some time)

```
$ sudo apt-get update

```

```
$ sudo apt-get upgrade

```

- * You might need to update again after upgrading
1. Download Miniconda from the browser, then go to the directory where it is installed, and open the terminal and run the .exe file

```
$ sudo bash Miniconda3-latest-Linux-x86_64.sh

```

Please specify the location to be in /opt/ folder

1. Run the following commands in the terminal

```
$ export PATH=$PATH:/opt/miniconda3/bin

```

```
$ conda init

```

1. Create a group

```
$ sudo groupadd groupname

```

1. Create user (repeat for each user)

```
$ sudo adduser username

```

1. Change password for user (repeat for each user)

```
$ sudo passwd username

```

1. Add user to a group (repeat for each user)

```
$ sudo usermod -a -G groupname username

```

1. Create a shared folder (i.e. workspace folder)

```
$ sudo mkdir workspace

```

1. Go to the directory where miniconda is installed (/opt) then make miniconda owner the group

```
$ chown -R :groupname /path/of/miniconda

```

1. Change miniconda permission to read write exc to the group

```
$ chmod 777 -R {the miniconda/anaconda path}

```

1. Change miniconda permission to sticky permission

```
$ chmod ug+s -R {the miniconda/anaconda path}

```

To find the IP address of the station

```
$ ip r

```

1. Install OpenSSH Server

```
$ sudo apt-get install openssh-server

```

```
$ sudo apt-get install openssh-server

```

```
$ sudo systemctl start ssh

```

1. Test OpenSSH by login into the system

```
$ ssh user@ip-address

```

**Extra**
When finished with the setup above, make sure that each user follow the next steps to enable them to use the public conda.

1. From each user account, type

```
$ export PATH=$PATH:/opt/miniconda3/bin

```

If it does not work you can type:

```
$ export PATH=/opt/anaconda3/bin:$PATH

```

1. Then run:
```
$ conda init

```

Shaikhah Alsubaie
