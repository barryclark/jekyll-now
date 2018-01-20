---
layout: post
title: some usefull Azure Shell 2.0 commands 
---
I'm used to write scripts, and manage environment with PowerShell. But... for longer time new function in Azure RM Portal was unavailable for powershell, only Azure Shell. https://shell.azure.com/.  Beside others: I want to try some other aproach. 

It's quite painful. Mostly on JMESPath queries. Many times I meet case when on portal I see specific machines but on my query - not. :( It's quite frustrating. 

    
# VMs 
## start all VMs in specific resource group 
```bash
az vm start --ids  $(az vm list --query "[].id" -o tsv -g MYRSG| grep -v horde)
```
## list VMs in specific resource group, whith specific size 
```bash
az vm list -g MYRSG  --query "[?contains(hardwareProfile.vmSize, 'Basic_A1')]" --out table -d
```
##  list VMs in specific resource group, whith specific size, return only IDs
```bash
az vm list -g MYRSG  --query "[?contains(hardwareProfile.vmSize, 'Basic_A1')].id" --out tsv
``` 

## list currently running machines 
```bash 
az vm list -d --query "[?powerState=='VM running']"
```
via: [github azure issues](https://github.com/Azure/azure-cli/issues/4099)

## start all VM in MAILKATLAB resource group which were deallocated and size Basic_A1. 
It's quite tricky: some queries don't work when --show-details aka -d is not added to command
```bash 
#!/bin/bash 
az vm start --ids  $(az vm list -g MYRSG --query "[?contains(hardwareProfile.vmSize, 'Basic_A1') && powerState == 'VM deallocated'].id" -d -o tsv) -o table
```
## deallocat running machines with specific size 
```bash
#!/bin/bash
az vm deallocate --ids  $(az vm list -d  --query "[?contains(hardwareProfile.vmSize, 'Basic_A1') && powerState == 'VM running'].id" -o tsv -g MYRSG) -o table
``` 
## Create VM 
in that case I've already RSG, also NSG for it, I need only create new machine, register rev-DNS. 
```bash
az vm create -g MYRSG   --name my99 --image UbuntuLTS --admin-username myadmin --generate-ssh-keys   --size Basic_A0 --nsg MYRSG-nsg --admin-password Some1pass
do az network public-ip update --resource-group MYRSG  --name "my${i}PublicIp" --reverse-fqdn "my${i}anyclientxyz.westeurope.cloudapp.azure.com."
```
that script require some fixes. I do some action on portal, some others on Azure CLI 2.0, what is rather not elegant. 

# See also
## Azure Cloud Shell
https://sandervandevelde.wordpress.com/2017/05/16/azure-portal-on-steroids-or-bash-shell-in-your-browser/

## Examples 
- [Common Azure CLI 2.0 commands for managing Azure resources](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/cli-manage)
- https://azure.microsoft.com/en-us/blog/announcing-general-availability-of-vm-storage-and-network-azure-cli-2-0/
- https://buildazure.com/2017/06/07/azure-cli-2-0-quickly-start-stop-all-vms/
- https://www.slideshare.net/WinOpsConf/neil-peterson-azure-cli-deep-dive
## JMESPath 
- [Using JMESPath queries with Azure CLI 2.0](https://docs.microsoft.com/en-us/cli/azure/query-azure-cli?view=azure-cli-latest)
- https://github.com/Azure/azure-cli/issues/4019 
- https://markheath.net/post/azure-cli-queries
- https://adamraffe.com/2017/11/22/the-wonderful-world-of-azure-cli-jmespath-queries/
- https://azurecitadel.github.io/guides/cli/cli-3-jmespath/ 
