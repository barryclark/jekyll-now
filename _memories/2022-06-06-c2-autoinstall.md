---
layout: memory
title: C2 Auto-Install Bash Script
---

This is a script helps to install nice candy onto a C2 server:

* Metasploit
* Covenant
* SilentTrinity
* Empire
* StarKiller
* PoshC2
* Merlin

**Prerequisite**: A debian flavoured Distro since this script uses `apt`. Maybe I'll post a `yum` variant later.

**Usage**: Copy and run the bash script below. Wait for the server to reboot and then initiate your C2 and have some fun. Works best on stolen hardware or as a simple Docker Container :)

```shell
#!/bin/bash

Green=$'\e[1;32m'
#Initial Update To System
echo "Initial System Update...This can take a while..."
sleep 3
apt-get update -y && apt-get upgrade -y
apt --fix-broken install -y

#Install System Software Essentials
echo "$Green Installing Additional System Software Essentials"
sleep 3
apt install python3.9 python3-pip git openssh-server open-vm-tools -y
apt --fix-broken install -y

#Install Hacking Packages
echo "Installing A Few Hacking Packages"
sleep 3
apt-get install cewl crunch hydra sqlmap ncrack gobuster dirb wfuzz medusa nmap netcat hashcat -y

#Install Enum4Linux"
echo "Installing Enum4Linux"
cd /opt
git clone https://github.com/CiscoCXSecurity/enum4linux.git
echo "alias enum4linux='/opt/enum4linux/./enum4linux.pl'" >> /root/.bashrc

apt --fix-broken install -y

#Update & Upgrade Again
echo "Yet Another Update"
sleep 3
sudo apt-get update -y && apt-get upgrade -y
apt --fix-broken install -y

#Install Cherrytree For Documentation
echo "Installing CherryTree For Documentation"
sleep 3
sudo apt-get install cherrytree -y
apt --fix-broken install -y

#Install PwnCat
echo "Installing PwnCat For Bind Shells"
sleep 3
cd /opt
git clone https://github.com/calebstewart/pwncat.git
cd pwncat 
python3 setup.py install
apt --fix-broken install -y

#Install Wordlists & Rule Sets
echo "Installing Wordlists & Rule Sets"
sleep 3
cd /opt
git clone https://github.com/NotSoSecure/password_cracking_rules.git
git clone https://github.com/praetorian-inc/Hob0Rules.git
git clone https://github.com/danielmiessler/SecLists.git
apt --fix-broken install -y

#Install Social Engineering Toolkit
echo "Installing Social Engineering Toolkit"
sleep 3
git clone https://github.com/trustedsec/social-engineer-toolkit.git
cd social-engineer-toolkit/
python3 setup.py
apt --fix-broken install -y

#Install Custom Covenant Profile
echo "Installing Custom Covenant C2 Software"
sleep 3

echo "Enter A Random Word!"
read Random1
echo ""
echo "Enter A Different Random Word!"
read Random2 
echo ""
echo "Enter A Different Random Word!"
read Random3

custom1=$(echo $custom1 | md5sum | head -c 20)

sudo git clone --recurse-submodules https://github.com/ZeroPointSecurity/Covenant.git /opt/Covenant

cd /opt/Covenant/Covenant/

mv ./Data/AssemblyReferences/ ../AssemblyReferences/

mv ./Data/ReferenceSourceLibraries/ ../ReferenceSourceLibraries/

mv ./Data/EmbeddedResources/ ../EmbeddedResources/

mv ./Models/Covenant/ ./Models/${Random1^}/
mv ./Components/CovenantUsers/ ./Components/${Random1^}Users/
mv ./Components/Grunts/ ./Components/${Random2^}s/
mv ./Models/Grunts/ ./Models/${Random2^}s/
mv ./Data/Grunt/GruntBridge/ ./Data/Grunt/${Random2^}Bridge/
mv ./Data/Grunt/GruntHTTP/ ./Data/Grunt/${Random2^}HTTP/
mv ./Data/Grunt/GruntSMB/ ./Data/Grunt/${Random2^}SMB/
mv ./Components/GruntTaskings/ ./Components/${Random2^}Taskings/
mv ./Components/GruntTasks/ ./Components/${Random2^}Tasks/
mv ./Data/Grunt/ ./Data/${Random2^}/



find ./ -type f -print0 | xargs -0 sed -i "s/Grunt/${Random2^}/g"
find ./ -type f -print0 | xargs -0 sed -i "s/GRUNT/${Random2^^}/g"
find ./ -type f -print0 | xargs -0 sed -i "s/grunt/${Random2,,}/g"

find ./ -type f -print0 | xargs -0 sed -i "s/Covenant/${Random1^}/g"
find ./ -type f -print0 | xargs -0 sed -i "s/COVENANT/${Random1^^}/g"

find ./ -type f -print0 | xargs -0 sed -i "s/ExecuteStager/ExecLevel/g"
find ./ -type f -print0 | xargs -0 sed -i "s/SetupAES/Install"${custom1}"AES/g"
find ./ -type f -print0 | xargs -0 sed -i "s/SessionKey/Sess"${custom1}"KEy/g"
find ./ -type f -print0 | xargs -0 sed -i "s/EncryptedChallenge/Enc"${custom1}"ChallEnge/g"

find ./ -type f -print0 | xargs -0 sed -i "s/DecryptedChallenges/Decrypt"${custom1}"ChallEnges/g"
find ./ -type f -print0 | xargs -0 sed -i "s/Stage0Body/First"${custom1}"Body/g"
find ./ -type f -print0 | xargs -0 sed -i "s/Stage0Response/First"${custom1}"Response/g"
find ./ -type f -print0 | xargs -0 sed -i "s/Stage0Bytes/First"${custom1}"Bytes/g"
find ./ -type f -print0 | xargs -0 sed -i "s/Stage1Body/Seccond"${custom1}"Body/g"
find ./ -type f -print0 | xargs -0 sed -i "s/Stage1Response/Seccond"${custom1}"Response/g"
find ./ -type f -print0 | xargs -0 sed -i "s/Stage1Bytes/Seccond"${custom1}"Bytes/g"
find ./ -type f -print0 | xargs -0 sed -i "s/Stage2Body/Third"${custom1}"Body/g"
find ./ -type f -print0 | xargs -0 sed -i "s/Stage2Response/Third"${custom1}"Response/g"
find ./ -type f -print0 | xargs -0 sed -i "s/Stage2Bytes/Third"${custom1}"Bytes/g"
find ./ -type f -print0 | xargs -0 sed -i "s/message64str/messAgE"${custom1}"64str/g"
find ./ -type f -print0 | xargs -0 sed -i "s/messageBytes/messAgE"${custom1}"bytes/g"

find ./ -type f -print0 | xargs -0 sed -i "s/totalReadBytes/ToTal"${custom1}"ReaDBytes/g"
find ./ -type f -print0 | xargs -0 sed -i "s/deflateStream/deFlatE"${custom1}"stream/g"
find ./ -type f -print0 | xargs -0 sed -i "s/memoryStream/memOrYstream/g" #don't change
find ./ -type f -print0 | xargs -0 sed -i "s/compressedBytes/packed"${custom1}"bytes/g"

find ./ -type f -name "*.cs" -print0 | xargs -0 sed -i "s/REPLACE_/REP"${custom1}"_/g"
find ./ -type f -name "*.cs" -print0 | xargs -0 sed -i "s/_PROFILE_/_PROF"${custom1}"_/g"
find ./ -type f -name "*.cs" -print0 | xargs -0 sed -i "s/_VALIDATE_/_VA"${custom1}"L_/g"
find ./ -type f -name "*.cs" -print0 | xargs -0 sed -i "s/GUID/${Random3^^}/g"
find ./ -type f -name "*.razor" -print0 | xargs -0 sed -i "s/GUID/${Random3^^}/g"
find ./ -type f -name "*.json" -print0 | xargs -0 sed -i "s/GUID/${Random3^^}/g"
find ./ -type f -name "*.yaml" -print0 | xargs -0 sed -i "s/GUID/${Random3^^}/g"
find ./ -type f -name "*.cs" -print0 | xargs -0 sed -i "s/guid/${Random3,,}/g"
find ./ -type f -name "*.razor" -print0 | xargs -0 sed -i "s/guid/${Random3,,}/g"
find ./ -type f -name "*.json" -print0 | xargs -0 sed -i "s/guid/${Random3,,}/g"
find ./ -type f -name "*.yaml" -print0 | xargs -0 sed -i "s/guid/${Random3,,}/g"
find ./ -type f -print0 | xargs -0 sed -i "s/ProfileHttp/Prof"${custom1}"HTTP/g"
find ./ -type f -print0 | xargs -0 sed -i "s/baseMessenger/bAse"${custom1}"mEsSenger/g"

find ./ -type f -print0 | xargs -0 sed -i "s/PartiallyDecrypted/Part"${custom1}"decrypted/g"
find ./ -type f -print0 | xargs -0 sed -i "s/FullyDecrypted/Fulld"${custom1}"encrypted/g"
find ./ -type f -print0 | xargs -0 sed -i "s/compressedBytes/packed"${custom1}"bytes/g"

find ./ -type f -print0 | xargs -0 sed -i "s/CookieWebClient/Ottos"${custom1}"WebClient/g"
find ./ -type f -print0 | xargs -0 sed -i "s/Jitter/JIt"${custom1}"ter/g"
find ./ -type f -print0 | xargs -0 sed -i "s/ConnectAttempts/ConneCT"${custom1}"AttEmpts/g"
find ./ -type f -print0 | xargs -0 sed -i "s/RegisterBody/Reg"${custom1}"Body/g"
find ./ -type f -name "*.cs" -print0 | xargs -0 sed -i "s/messenger/meSsenGer"${custom1}"/g"
find ./ -type f -print0 | xargs -0 sed -i "s/Hello World/"${custom1}"/g"
find ./ -type f -print0 | xargs -0 sed -i "s/ValidateCert/Val"${custom1}"CerT/g"
find ./ -type f -print0 | xargs -0 sed -i "s/UseCertPinning/UsCert"${custom1}"Pin/g"
find ./ -type f -print0 | xargs -0 sed -i "s/EncryptedMessage/Enc"${custom1}"Msg/g"
find ./ -type f -print0 | xargs -0 sed -i "s/cookieWebClient/"${custom1}"WebClient/g" #ottos
find ./ -type f -name "*.cs" -print0 | xargs -0 sed -i "s/aes/crypt"${custom1}"var/g"
find ./ -type f -name "*.cs" -print0 | xargs -0 sed -i "s/aes2/crypt"${custom1}"var2/g"
find ./ -type f -name "*.cs" -print0 | xargs -0 sed -i "s/array5/ar"${custom1}"r5/g"
find ./ -type f -name "*.cs" -print0 | xargs -0 sed -i "s/array6/ar"${custom1}"r6/g"
find ./ -type f -name "*.cs" -print0 | xargs -0 sed -i "s/array4/ar"${custom1}"r4/g"
find ./ -type f -name "*.cs" -print0 | xargs -0 sed -i "s/array7/ar"${custom1}"r7/g"
find ./ -type f -name "*.cs" -print0 | xargs -0 sed -i "s/array1/ar"${custom1}"r1/g"
find ./ -type f -name "*.cs" -print0 | xargs -0 sed -i "s/array2/ar"${custom1}"r2/g"
find ./ -type f -name "*.cs" -print0 | xargs -0 sed -i "s/array3/ar"${custom1}"r3/g"
find ./ -type f -name "*.cs" -print0 | xargs -0 sed -i "s/list1/l"${custom1}"i1/g"
find ./ -type f -name "*.cs" -print0 | xargs -0 sed -i "s/list2/l"${custom1}"i2/g"
find ./ -type f -name "*.cs" -print0 | xargs -0 sed -i "s/list3/l"${custom1}"i3/g"
find ./ -type f -name "*.cs" -print0 | xargs -0 sed -i "s/list4/l"${custom1}"i4/g"
find ./ -type f -name "*.cs" -print0 | xargs -0 sed -i "s/list5/l"${custom1}"i5/g"
find ./ -type f -name "*.cs" -print0 | xargs -0 sed -i "s/group0/gr"${custom1}"p0/g"
find ./ -type f -name "*.cs" -print0 | xargs -0 sed -i "s/group1/gr"${custom1}"p1/g"
find ./ -type f -name "*.cs" -print0 | xargs -0 sed -i "s/group2/gr"${custom1}"p2/g"
find ./ -type f -name "*.cs" -print0 | xargs -0 sed -i "s/group3/gr"${custom1}"p3/g"
find ./ -type f -name "*.cs" -print0 | xargs -0 sed -i "s/group4/gr"${custom1}"p4/g"
find ./ -type f -name "*.cs" -print0 | xargs -0 sed -i "s/group5/gr"${custom1}"p5/g"
find ./ -type f -name "*.cs" -print0 | xargs -0 sed -i "s/group6/gr"${custom1}"p6/g"
find ./ -type f -name "*.cs" -print0 | xargs -0 sed -i "s/group7/gr"${custom1}"p7/g"
find ./ -type f -name "*.cs" -print0 | xargs -0 sed -i "s/group8/gr"${custom1}"p8/g"



find ./ -type f -name "*Grunt*" | while read FILE ; do
 newfile="$(echo ${FILE} |sed -e "s/Grunt/${Random2^}/g")";
 mv "${FILE}" "${newfile}";
done
find ./ -type f -name "*GRUNT*" | while read FILE ; do
 newfile="$(echo ${FILE} |sed -e "s/GRUNT/${Random2^^}/g")";
 mv "${FILE}" "${newfile}";
done

find ./ -type f -name "*grunt*" | while read FILE ; do
 newfile="$(echo ${FILE} |sed -e "s/grunt/${Random2,,}/g")";
 mv "${FILE}" "${newfile}";
done

find ./ -type f -name "*Covenant*" | while read FILE ; do
 newfile="$(echo ${FILE} |sed -e "s/Covenant/${Random1^}/g")";
 mv "${FILE}" "${newfile}";
done

find ./ -type f -name "*COVENANT*" | while read FILE ; do
 newfile="$(echo ${FILE} |sed -e "s/COVENANT/${Random2^^}/g")";
 mv "${FILE}" "${newfile}";
done

mv ../AssemblyReferences/ ./Data/ 

mv ../ReferenceSourceLibraries/ ./Data/ 

mv ../EmbeddedResources/ ./Data/ 

dotnet build
#Install Powershell Empire & Starkiller GUI
echo "Installing Powershell Empire & Starkiller GUI"
sleep 3
cd /opt
apt update -y && apt upgrade -y 
apt --fix-broken install -y 
cd /opt
sudo git clone https://github.com/BC-SECURITY/Empire.git
cd Empire
sudo ./setup/install.sh
cd /opt
sudo wget https://github.com/BC-SECURITY/Starkiller/releases/download/v1.8.0/starkiller-1.8.0.AppImage
sudo chmod +x starkiller-1.0.0.AppImage
apt --fix-broken install -y

#Install PoshC2
echo "Installing PoshC2"
sleep 3
cd /opt
curl -sSL https://raw.githubusercontent.com/nettitude/PoshC2/master/Install.sh | bash
apt install golang -y
apt --fix-broken install -y

#Install Metasploit
echo "Installing Metasploit"
sleep 3
cd /opt
apt install postgresql -y
systemctl start postgresql 
systemctl enable postgresql
apt install curl -y
apt --fix-broken install -y
curl https://raw.githubusercontent.com/rapid7/metasploit-omnibus/master/config/templates/metasploit-framework-wrappers/msfupdate.erb > msfinstall

chmod +x msfinstall
./msfinstall
apt --fix-broken install -y

#Another Update/Upgrade
echo "Yet Another Update"
sleep 3
apt-get update -y && apt-get upgrade -y
apt --fix-broken install -y

#Install Impacket
echo "Installing Impacket"
sleep 3
cd /opt 
git clone https://github.com/SecureAuthCorp/impacket.git
/opt/impacket
sudo pip3 install -r /opt/impacket/requirements.txt
sudo python3 ./setup.py install
apt --fix-broken install -y

#Installing Responder
echo "Installing Responder"
https://github.com/lgandx/Responder.git
var="dns=dnsmasq"; sed -i "/^$var/ c#dns=dnsmasq" /etc/NetworkManager/NetworkManager.conf 
killall dnsmasq -9

#Install Ansible
echo "Installing Ansible"
sleep 3
echo "Setting Up Ansible"
sleep 5
systemctl enable ssh
systemctl start ssh
mkdir /opt/sys_ans
useradd sysops
sudo apt install -y software-properties-common
sudo add-apt-repository --yes --update ppa:ansible/ansible
sudo apt update
sudo apt install -y ansible
mkdir /opt/sys_ans
cp /usr/lib/python3/dist-packages/ansible/galaxy/data/apb/tests/ansible.cfg /opt/sys_ans/

#Install VirtualBox
echo "Installing VirtualBox"
sleep 3
cd Downloads 
apt --fix-broken install -y
wget https://download.virtualbox.org/virtualbox/6.1.26/virtualbox-6.1_6.1.26-145957~Ubuntu~eoan_amd64.deb
dpkg --install virtualbox-6.1_6.1.26-145957~Ubuntu~eoan_amd64.deb

echo "Fixing Broken Install"
apt --fix-broken install -y

#Final Update
echo "Launching The Final Update"
apt-get update -y && apt-get Upgrade -y
```
