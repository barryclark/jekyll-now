---
date: 2019-05-16 00:00:00 -05:00
layout: post
categories: SCOM
title: Using the Asset Status Property in SCOM
---

When creating groups in [System Center Operations Manager (SCOM)](https://docs.microsoft.com/system-center/scom/welcome), it may be helpful to know what stage of the lifecycle the monitored object is in. SCOM has an **Asset Status** property is used by [System Center Service Manager (SCSM)](https://docs.microsoft.com/system-center/scsm) to manage the status of the object, however this property isn't visible or usable in the SCOM interface with the exception of creating a group.

## Asset Status Enum

The asset statuses available to us are stored as an enum called **System.ConfigItem.AssetStatusEnum** in the **System.Library** management pack.

### Get the available asset statuses

To list out the available values in the **AssetStatusEnum**, execute the following:

```powershell
# Connect to the SCOM management group
New-SCOMManagementGroupConnection -ComputerName ManagementGroup1

# Get the management pack object of the System.Library management pack
$managementPack = Get-SCOMManagementPack -Name System.Library

# Get the values which begin with System.ConfigItem.AssetStatusEnum
$managementPack.GetEnumerations() |
    Where-Object -FilterScript { $_.Name -match '^System.ConfigItem.AssetStatusEnum' } |
    Sort-Object -Property Name |
    Select-Object -Property Name, @{n='Id';e={$_.Id.Guid}}
```

This should generate the following output:

```powershell
Name                                                  Id
----                                                  --
System.ConfigItem.AssetStatusEnum.Deployed            6842782d-3707-20a5-659c-b5d4091e2c49
System.ConfigItem.AssetStatusEnum.DeploymentRequested 4f8b8635-96b4-f534-9739-ea44fe3d86ec
System.ConfigItem.AssetStatusEnum.Disposed            7c9f378e-2738-4607-336b-b00aff8024ff
System.ConfigItem.AssetStatusEnum.Purchased           8972ed2a-dc07-e16c-857c-880e06c8f897
System.ConfigItem.AssetStatusEnum.PurchaseRequested   35e7d4a5-05f5-6b56-54c8-c4f781af60be
System.ConfigItem.AssetStatusEnum.Retired             f37e8b8c-e3df-47c1-bd23-41cb3c8dfa57
System.ConfigItem.AssetStatusEnum.Undefined           a90fc2e9-65a8-77a5-fd4e-85b4bb662e70
```

_**Note:** The ID property values may vary from system to system._

### Get a specific asset status

To get a specific asset status object, execute the following:

```powershell
$enum = $managementPack.GetEnumeration("System.ConfigItem.AssetStatusEnum.Deployed")
```

The **$enum** variable will be used when setting the status on a monitoring object.

## Set the asset status of an object

To set the asset status of a monitoring object, first the SCOM monitoring object must be obtained. The following example shows how to get the monitoring object of a Microsoft Windows computer object.

```powershell
$monitoringObject = Get-SCOMMonitoringObject -DisplayName computer01.contoso.com |
    Where-Object -FilterScript {
        ( Get-SCOMClass -Id $_.LeastDerivedNonAbstractMonitoringClassId ).Name -eq 'Microsoft.Windows.Computer'
    }
```

Now the object status can be set. This is accomplished by setting the **'[System.ConfigItem].AssetStatus'** property on the monitoring object. Take special note of the single quotes surrounding the property name. If these are omitted, setting the property will fail.

```powershell
$monitoringObject.'[System.ConfigItem].AssetStatus'.Value = $enum
```

Finally, save the changes to the monitoring object.

```powershell
$monitoringObject.Overwrite()
```

## Create a group from the object asset status

In order to use the asset status to populate a dynamic group in SCOM, the ID (Guid) of the asset status must be used. This is unfortunate because it makes reading the group definitions difficult, however the good news is it can be done!

![Create Windows computer group using the asset status property]({{ site.baseurl }}/images/scom-create-windows-computer-group-using-the-asset-status-property.png)

## Scripts

[Here](https://github.com/randomnote1/SCOM/tree/master/src/AssetStatus) are a few scripts which can be used to set the asset status property of a monitoring object.
