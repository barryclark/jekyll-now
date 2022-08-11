<h2> Use this tutorial to help you setup a new Lambda-labs workstation </h2>

After changing the power cable to the compatible one, follow the below steps:

When you turn on the station for the first time, there will be a wizard window asking you to

- Enter the name of the root e.g. __asr__
- Enter the name of the station e.g. __asr3__
- Enter the password of the root user e.g. __asr123__
- Select a region, select __Riyadh__
<br>
1. Open the terminal and write the following commands ( updates could take some time)

```
$ sudo apt-get update

```

```
$ sudo apt-get upgrade

```

\* You might need to update again after upgrading.
<br>
<br>
2. Download Miniconda from the browser, then go to the directory where it is installed, open the terminal and run the .exe file

```
$ sudo bash Miniconda3-latest-Linux-x86_64.sh

```

\* Please specify the location to be in /opt/ folder
<br>
<br>
3. Run the following commands in the terminal

```
$ export PATH=$PATH:/opt/miniconda3/bin

```

```
$ conda init

```
<br>
4. Create a group

```
$ sudo groupadd groupname

```
<br>
5. Create a user (repeat for each user)

```
$ sudo adduser username

```
<br>
6. Change a password for the user (repeat for each user)

```
$ sudo passwd username

```
<br>
7. Add the user to the group (repeat for each user)

```
$ sudo usermod -a -G groupname username

```
<br>
8. Create a shared folder e.g. workspace folder

```
$ sudo mkdir workspace

```
<br>
9. Go to the directory where miniconda is installed (/opt) then make miniconda owner of the group

```
$ chown -R :groupname /path/of/miniconda

```
<br>
10. Change miniconda permissions to the group i.e. make it able to read, write, and execute (rwx)

```
$ chmod 777 -R {the miniconda/anaconda path}

```
<br>
11. Change miniconda permissions to sticky permissions

```
$ chmod ug+s -R {the miniconda/anaconda path}

```
<br>
**To find the IP address of the station**

```
$ ip r

```
<br>
12. Install OpenSSH Server

```
$ sudo apt-get install openssh-server

```

```
$ sudo apt-get install openssh-server

```

```
$ sudo systemctl start ssh

```
<br>
13. Test OpenSSH by login into the system

```
$ ssh user@ip-address

```
<br>
<h3>Extra</h3>
When you complete the steps described above, ensure each user follows the next steps to enable them to use the public conda.

1. From each user's account, type

```
$ export PATH=$PATH:/opt/miniconda3/bin

```
<br>
If it does not work, you can type:

```
$ export PATH=/opt/anaconda3/bin:$PATH

```
<br>
2. Then run:

```
$ conda init

```
<br>
Shaikhah Alsubaie
