---
layout: post
title: some usefull Azure Shell 2.0 commands 
---
# VMs 
## start all VMs in specific resource group 
```bash
az vm start --ids  $(az vm list --query "[].id" -o tsv -g MAILKATLABXYZ| grep -v horde)
```
## start all VMs in specific resource group, whith specific size 
```bash
az vm start --ids  $(az vm list --query "[].id" -o tsv -g MAILKATLABXYZ| grep -v horde)
```
## list currently running machines 
```bash 
az vm list -d --query "[?powerState=='VM running']"
```
via: [github azure issues](https://github.com/Azure/azure-cli/issues/4099)


# See also
## Examples 
- [Common Azure CLI 2.0 commands for managing Azure resources](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/cli-manage)
## JMESPath 
- [Using JMESPath queries with Azure CLI 2.0](https://docs.microsoft.com/en-us/cli/azure/query-azure-cli?view=azure-cli-latest)

