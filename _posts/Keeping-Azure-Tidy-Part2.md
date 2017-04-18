---
layout: post
title: Keeping our Azure Cloud Tidy - Part 2
subtitle:
category: howto
tags: [cloud, devops]
author: esmaeil_sarabadani
author_email: esmaeil.sarabadani@haufe-lexware.com
header-img: "images/bg-post.jpg"
---

For those who have read my first blog post "[Keeping our Azure Cloud Tidy - Part 1]", this is a part 2 which is going to be as useful in keeping your environment tidy. If this is your first time here, you might want to have a look at the part 1 too, but even without reading it, I hope you find this article useful. 

When you have too many resources in the cloud having the right tagging strategy could help in better organization and more efficient cost control. In the previous post I explained how to tag your Virtual Machines on Azure to shut down/start them according to a time frame. 

Well now it's been a while and you want to see if anyone is tagging their VMs in your company and following your tagging policy? You know if you have too many resources on Azure doing this manually is going to be a nightmare. That is why I developed a small PowerShell script to do this for you. So here is what this script does:

1. Gets a lit of subscriptions in which you have Contributor role.
2. Retrieves a list of all Azure Resource Manager virtual machines in those subscriptions (This script works only in ARM mode. because that's the way Microsoft is going with Azure.)
3. Checks whether those virtual machines or the Resource Group (to which the VM is a member of) have the tag name "AutoShutdownSchedule".
4. If the specified tag name is not found, then the VM name together with the names of the Resource Group and the Subscription (in which the VM is a member of) will be placed in an Azure Storage Table. 

> **Note:** 
> The script will create an Azure storage table for you every time it is executed. You just need to provide a Storage Account name ($storageAccount),  its Resource Group name ($GovResourceGroup), and of course its Subscription name ($GovSubsName).

So here is the code:

```
Login-AzureRmAccount

$GovSubsName = "Azure Governance Subscription"
$GovResourceGroup = "tagscanner"
$storageAccount = "untaggedvmlist"
$partitionKey = "TaggingPolicy"
$Date = Get-Date

$tableName = "vmlist" + $Date.Day.ToString() + $Date.Month.ToString() + $Date.Year.ToString()
Select-AzureRmSubscription -SubscriptionName $GovSubsName
$saContext = (Get-AzureRmStorageAccount -ResourceGroupName $GovResourceGroup -Name $storageAccount).Context
New-AzureStorageTable –Name $tableName –Context $saContext
$table = Get-AzureStorageTable -Name $tableName -Context $saContext
$subsvar = Get-AzureRmSubscription

$subsvar | ForEach-Object {

    Write-Host "`n--------------------------------`n"
    Select-AzureRmSubscription -SubscriptionId $_.SubscriptionId
    Write-Host "Checking subscription: " $_.SubscriptionName "`n"
    $vm = Find-AzureRmResource -ResourceType "Microsoft.Compute/virtualMachines" 
    $vmNo = 1
    $vm | ForEach-Object {
        Write-Host "Checking tags for VM #" $vmNo
        $rgTagVar = ($rgTag = Get-AzureRmResourceGroup $_.ResourceGroupName).Tags.Keys
        if(($_.Tags.Keys -ne "AutoShutdownSchedule") -and ($rgTagVar -ne "AutoShutdownSchedule"))
        {
            $VMSubsName = ($subsName = Get-AzureRmSubscription -SubscriptionId $_.SubscriptionId).SubscriptionName
            Add-StorageTableRow -table $table -partitionKey $partitionKey -rowKey ([guid]::NewGuid().tostring()) -property @{"VMName"=$_.Name;"ResourceGroupName"=$_.ResourceGroupName;"SubscriptionName"=$VMSubsName;}
        }
        $vmNo++
    }
    $vmNo = 1
}
```

You can use this script to look for any other tag names. You just need to change it a little bit. You can also change this script a bit and put it into an Automation Runbook and get automated daily/weekly/monthly reports. 

> **How do I download the report?** 
> To download the table content you just need to install "Azure Storage Explorer" from the link [here]. Enter the Access Key and the Storage Account name which you get from the portal and connect to it and then see the table under the Tables. 

[Keeping our Azure Cloud Tidy - Part 1]: <http://dev.haufe.com/Automatic-Shutdown-and-Start-VMs/>
[here]: <http://storageexplorer.com/>
