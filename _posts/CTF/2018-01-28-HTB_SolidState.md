---
layout: post
title: Hack The Box - SolidState
category: CTF
---

## Inital Information
From the initial information, the box running Linux.
## Enumeration
Let us begin with nmap agianst the boxes IP.

![Full TCP Scan of SolidState](/images/solidstate/tcpfull_solidstate.png "Full TCP Scan against SolidState")

The scan shows that ssh is running on port 22, and a JAMES service which is used as a mail server on the other ports.

### Searchsploit
Taking the information we have from NMAP, we can use that within searchsploit
![Searchsploit James 2.3.2](/images/solidstate/searchsploit.png "Searchsploit James 2.3.2")
Copy the exploit script to your folder, and then modify its content as shown in the next two images.
![Exploit Script Reverse Shell](/image/solidstate/payload_reverse.png "Exploit Script Reverse Shell")
![Exploit Script hostname](/images/solidstate/hostname.png "Exploit Script hostname")
## Exploitation Part-1
Telnet to the port 4555 presents us with a username and password login. Using root/root we login to the service.

![Telnet 4555](/images/solidstate/telnet_4555.png "Telnet 4555")
Login to the service we can begin to run JAMES commands, for further information on the commands enter the "?" which will present you with all the possible commands.
We can use the setpassword command for the user account mindy.
![Setpassword Mindy](/images/solidstate/setpassword_mindy.png)
## Exploitation Part-2
Now that we have changed mindy's password, we can telnet to 110.

![Login to port 110](/images/solidstate/login_110.png)

now if we list the messages that mindy has stored.

![List Messages](/images/solidstate/list_110.png)
we see that there are two messages, if we retrieve the first message 1109.

![Read Message](/images/solidstate/retr_110.png)
From this we get the password and username for the ssh of mindy.

## Exploitation Part-3
Now that we have all the necessary information we can begin to use our exploit script. Run the exploit
![Python JAMES](/images/solidstate/script_james.png "Python JAMES")
Now that our script has executed, we need to setup a netcat listerner
![NC -lvp 1234](/images/solidstate/nc_lvp.png "Netcat lvp")
After we have executed the script, ssh into the box with mindy using the following command:
![SSH Mindy](/images/solidstate/ssh_login_mindy.png "SSH Login as Mindy")
Once we have logged in, our netcat shell will get a bash shell which we can get our user.txt flag as well as our next foothold to get root.
![NC Connected](/images/solidstates/nc_lvp_connected.png "SSH Connected")

## Exploitation Part-4
Now that we have got a shell that isn't jailed we can begin to look for a method to get root. You can use Linuxenum here however doing some manual enumeration there is a script in /opt/ which is running at root access.
![/Opt/ tmp.py](/images/solidstate/tmp_python.png "/opt/tmp.py")
Outputting the information within the file confirms that we can run os.system commands. If we append a line to print the /root/root.txt file into a file within the /tmp/ directory. Next we must echo cat /root/root.txt to the end of the file like so
![echo content](/images/solidstate/echo_content.png "echo content")
Now if we read the contents of the file we should see something on the lines
![tmp.py](/images/solidstate/tmp_python_content.png "tmp.py content")
Rerun the script and a text file should be created within the /tmp/ directory.
### Reading /tmp/exit.txt
Traverse the /tmp/ directory and cat the outputs of the file
![Read /tmp/exit.txt](/images/solidstate/read_tmp_exit_text.png "Read /tmp/exit.txt")
This will present the root flag.
Congratz you have rooted the box.

## Conclusion
This machine has a a small incline but is a great way of getting into the mindset of how CTFs work. Each piece of information leads to the next part of the challenge. Overall the machine is a great entry level machine and is worth time doing it.


