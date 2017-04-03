---
layout: post
title: Set up PostgreSQL on Azure
subtitle: One script away from a PostgreSQL running into an Ubuntu powered VM running on Azure
category: Howto
tags: [cloud]
author: Filip Fiat
author_email: filip.fiat@haufe-lexware.com
header-img: "images/bg-post.jpg"
---

These days on can find tons of tutorials and recipes on how to install a PostgreSQL server on Azure. 

Basically there are (at least) two ways of doing this. First, and the easiest, just go to the web dashboard and spin up a preconfigured VM. Another option would be to create just a Linux machine and install PostgreSQL directly. This can also be done with a couple of clicks in the web bashboard, but any respectable developer ;) would want it scripted, fully reproducible and cutomizable! 

That's what I wanted to do and found here https://docs.microsoft.com/en-us/azure/virtual-machines/virtual-machines-linux-postgresql-install just the right blog post to copy-and-paste my install script from. 
Well... almost, because copy-and-paste never works and there is almost always somethink to tweak.

This blog post basically follows the steps from the previous link, but adapts and corrects them in order to be comprised within one script (actually two scripts ;), but one of them is only used to create the virtual machine in Azure, copy and launch the other into that machine. This can also be done with three commands see below, so this hardly can count for a script.

Following we'll cover these steps:
- create VM
- install PostgreSQL
- configure PostgreSQL
- setup PostgreSQL
- start PostgreSQL server.

>Prerequisite: have latest docker-machine installed.

### 1. Creating the VM in AzureDE

This is pretty straightforward, just export these properties
```sh
export DOCKER_LOCAL=".docker/machine/"
export AZURE_SUBSCRIPTION="********-****-****-****-************"
export AZURE_IMAGE="canonical:UbuntuServer:16.04.0-LTS:latest"
export AZURE_CLIENT_SECRET="*********************************="
export AZURE_CLIENT_ID="********-****-****-****-************"
export AZURE_ENVIRONMENT="AzureGermanCloud"
export AZURE_LOCATION="germanycentral"
export AZURE_SIZE="Standard_DS3_V2"
export AZURE_RESOURCE_GROUP="##########################"
export AZURE_SUBNET="######################"
export AZURE_SUBNET_PREFIX="###.###.###.###/##"
export AZURE_AVAILABILITY_SET="*******************-AS"
export AZURE_VNET="************************-vNet"
```
and create the machine:

```sh 
docker-machine -s ${DOCKER_LOCAL} create -d azure --azure-environment=${AZURE_ENVIRONMENT} \
			--azure-location=${AZURE_LOCATION} \
			--azure-no-public-ip \
			--azure-size=${AZURE_SIZE} \
			--azure-resource-group=${AZURE_RESOURCE_GROUP} \
			--azure-subnet=${AZURE_SUBNET} \
			--azure-subnet-prefix=${AZURE_SUBNET_PREFIX} \
			--azure-image=${AZURE_IMAGE} \
			--azure-availability-set=${AZURE_AVAILABILITY_SET} \
			--azure-vnet=${AZURE_VNET} \
			--azure-ssh-user=ubuntu \
			--azure-subscription-id=${AZURE_SUBSCRIPTION} \
			--azure-client-secret ${AZURE_CLIENT_SECRET} \
			--azure-client-id ${AZURE_CLIENT_ID} ${AZURE_MACHINE_NAME}
```			
Afterwards, just copy there the install script and run it!
```sh
docker-machine -s ${DOCKER_LOCAL} scp install_postgresql.sh ${AZURE_MACHINE_NAME}:install_postgresql.sh 
docker-machine -s ${DOCKER_LOCAL} ssh ${AZURE_MACHINE_NAME} ./install_postgresql.sh	
```
Installing, configuring and starting the PostgreSQL server is done with the `install_postgresql.sh` script and all the commands from now one will be placed into this script.
>All commands must be run with admin rights, so... `sudo`.

### 2. Install PostgreSQL

- Some distributions have dependencies that you must install before installing PostgreSQL, 
```sh 
sudo apt-get install gcc make openssl libreadline-dev zlib1g-dev -y 
```
On Microsoft's website (see above) there are some more packages listed but they are not necessary (at least I did not used them). Furthermore `readline-devel` is actually replaced with `libreadline-dev` and `zlib-devel` is `zlib1g-dev`.

- Download PostgreSQL into the root directory, and then unzip the package
```sh
sudo wget https://ftp.postgresql.org/pub/source/v9.3.11/postgresql-9.3.11.tar.bz2 -P /root/
sudo tar jxvf  /root/postgresql-9.3.11.tar.bz2 -C /root/
```
- Start building
```sh
sudo /root/postgresql-9.3.11/configure --prefix=/opt/postgresql-9.3.11
sudo make install /root/postgresql-9.3.11
```

### 3. Configure PostgreSQL

- Create a symbolic link to shorten the PostgreSQL reference to not include the version number (this is optional, but useful) and the directory for the database
```sh
sudo ln -s /opt/postgresql-9.3.11 /opt/pgsql
sudo mkdir -p /opt/pgsql_data
```
- Create a non-root user and modify that user’s profile. For security reasons, PostgreSQL uses a non-root user to initialize, start, or shut down the database.
```sh
sudo useradd -d /home/postgres -m postgres
sudo cat >> ~/.dbuserpw <<DBUSERPW 
postgres:postgres
DBUSERPW
sudo cat ~/.dbuserpw | sudo chpasswd
sudo rm ~/.dbuserpw
sudo chown -R postgres.postgres /opt/pgsql_data
```
Notice the 
```sh
sudo cat >> ~/.dbuserpw <<DBUSERPW 
postgres:postgres
DBUSERPW
```
command, that's a nice way to programatically set the password for a linux user.

- Edit the bash_profile file by entering the commands below and execute the bash_profile file
```sh
sudo cat >> ~/.bash_profile <<PGCONFIG
export PGPORT=5432
export PGDATA=/opt/pgsql_data
export LANG=en_US.utf8
export PGHOME=/opt/pgsql
export PATH=\$PATH:\$PGHOME/bin
export MANPATH=\$MANPATH:\$PGHOME/share/man
export DATA=`date +"%Y%m%d%H%M"`
export PGUSER=postgres
alias rm='rm -i'
alias ll='ls -lh'
PGCONFIG
. ./.bash_profile
```
- Init the database
```sh
sudo cat >> ~/.dbuserpw <<DBUSERPW 
postgres
DBUSERPW
sudo chown -R postgres.postgres ~/.dbuserpw
sudo -u postgres /opt/pgsql/bin/initdb -D $PGDATA -E UTF8 --locale=C -U postgres --pwfile=/home/ubuntu/.dbuserpw
sudo rm ~/.dbuserpw
```

### 4. Setup PostgreSQL

- We copy the provided startup script and we have to do some seds in there because one cannot use su within script and must replace it with sudo

```sh
sudo cp /root/postgresql-9.3.11/contrib/start-scripts/linux /etc/init.d/postgresql
sudo sed -i '32s#usr/local#opt#' /etc/init.d/postgresql
sudo sed -i '35s#usr/local/pgsql/data#opt/pgsql_data#' /etc/init.d/postgresql
sudo sed -i '87s#"##g' /etc/init.d/postgresql
sudo sed -i '87s#su - $PGUSER -c#sudo -u $PGUSER#' /etc/init.d/postgresql
sudo sed -i '92s#"##g' /etc/init.d/postgresql
sudo sed -i '92s#su - $PGUSER -c#sudo -u $PGUSER#' /etc/init.d/postgresql
sudo sed -i '97s#"##g' /etc/init.d/postgresql
sudo sed -i '97s#su - $PGUSER -c#sudo -u $PGUSER#' /etc/init.d/postgresql
sudo sed -i '100s#"##g' /etc/init.d/postgresql
sudo sed -i '100s#su - $PGUSER -c#sudo -u $PGUSER#' /etc/init.d/postgresql
sudo sed -i '105s#"##g' /etc/init.d/postgresql
sudo sed -i '105s#su - $PGUSER -c#sudo -u $PGUSER#' /etc/init.d/postgresql
sudo sed -i '109s#"##g' /etc/init.d/postgresql
sudo sed -i '109s#su - $PGUSER -c#sudo -u $PGUSER#' /etc/init.d/postgresql
```
- Give ownership and execute rights to `postgres` user
```sh
sudo chown postgres /etc/init.d/postgresql
sudo -u postgres chmod +x /etc/init.d/postgresql
```

### 5. Start PostgreSQL server

```sh
sudo -u postgres /etc/init.d/postgresql start
```
Now your database should be available on port `5432` ;)

From now on, one still has to mount a disk for database files and configure PostgreSQL to use that disk, but more on this will follow in a future post.

Comments and suggestions are more than welcome. **Happy coding!**
