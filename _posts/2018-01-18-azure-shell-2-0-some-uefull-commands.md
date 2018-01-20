---
layout: post
title: some usefull Azure Shell 2.0 commands 
---
# VMs 
## start all VMs in specific resource group 
```bash
az vm start --ids  $(az vm list --query "[].id" -o tsv -g MAILKATLABXYZ| grep -v horde)
```
## list VMs in specific resource group, whith specific size 
```bash
az vm list -g MAILKATLABXYZ  --query "[?contains(hardwareProfile.vmSize, 'Basic_A1')]" --out table -d
```
##  list VMs in specific resource group, whith specific size, return only IDs
```bash
az vm list -g MAILKATLABXYZ  --query "[?contains(hardwareProfile.vmSize, 'Basic_A1')].id" --out tsv
``` 

## list currently running machines 
```bash 
az vm list -d --query "[?powerState=='VM running']"
```
via: [github azure issues](https://github.com/Azure/azure-cli/issues/4099)
## 

## start all VM in MAILKATLAB resource group which were deallocated and size Basic_A1. 
It's quite tricky: some queries don't work when 

# See also
## Examples 
- [Common Azure CLI 2.0 commands for managing Azure resources](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/cli-manage)
- https://azure.microsoft.com/en-us/blog/announcing-general-availability-of-vm-storage-and-network-azure-cli-2-0/
## JMESPath 
- [Using JMESPath queries with Azure CLI 2.0](https://docs.microsoft.com/en-us/cli/azure/query-azure-cli?view=azure-cli-latest)
- https://github.com/Azure/azure-cli/issues/4019 
- https://markheath.net/post/azure-cli-queries
- https://adamraffe.com/2017/11/22/the-wonderful-world-of-azure-cli-jmespath-queries/
