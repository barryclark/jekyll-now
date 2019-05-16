---
date: 2019-05-16
layout: post
---

# Using the Asset Status Property in SCOM

When creating groups in [System Center Operations Manager (SCOM)](https://docs.microsoft.com/system-center/scom/welcome), it may be helpful to know what stage of the lifecycle the monitored object is in. SCOM has an `Asset Status` property is used by [System Center Service Manager (SCSM)](https://docs.microsoft.com/system-center/scsm) to manage the status of the object, however this property isn't visible or usable in the SCOM interface with the exception of creating a group.

## Asset Status Enum

The asset statuses available to us are stored as an enum called `System.ConfigItem.AssetStatusEnum` in the `System.Library` management pack.

### Get the available asset statuses

To list out the available values in the `AssetStatusEnum`, execute the following:

```PowerShell
# Connect to the SCOM management group
New-SCOMManagementGroupConnection -ComputerName ManagementGroup1

# Get the management pack object of the System.Library management pack
$managementPack = Get-SCOMManagementPack -Name System.Library

# Get the values which begin with System.ConfigItem.AssetStatusEnum
$managementPack.GetEnumerations() |
    Where-Object -FilterScript { $_.Name -match '^System.ConfigItem.AssetStatusEnum' } |
    Select-Object -Property Name, @{n=Id;e={$_.Id.Guid}}
```

This should generate the following output:

```output
Need the AssetStatusEnum output here
```

_*Note*: The ID property values may vary from system to system._

### Get a specific asset status

To get a specific asset status object, execute the following:

```PowerShell
$enum = $managementPack.GetEnumeration("System.ConfigItem.AssetStatusEnum.Deployed")
```

The `$enum` variable will be used when setting the status on a monitoring object.

## Set the asset status of an object

To set the asset status of a monitoring object, first the SCOM monitoring object must be obtained. The following example shows how to get the monitoring object of a Microsoft Windows computer object.

```PowerShell
$monitoringObject = Get-SCOMMonitoringObject -DisplayName computer01.contoso.com |
    Where-Object -FilterScript { ( Get-SCOMClass -Id $_.LeastDerivedNonAbstractMonitoringClassId ).Name -eq 'Microsoft.Windows.Computer' }
```

Now the object status can be set. This is accomplished by setting the `'[System.ConfigItem].AssetStatus'` property on the monitoring object. Take special note of the single quotes surrounding the property name. If these are omitted, setting the property will fail.

```PowerShell
$monitoringObject.'[System.ConfigItem].AssetStatus'.Value = $enum
```

Finally, save the changes to the monitoring object.

```PowerShell
$monitoringObject.Overwrite()
```

## Create a group from the object asset status

In order to use the asset status to populate a dynamic group in SCOM, the ID (Guid) of the asset status must be used. This is unfortunate because it makes reading the group definitions difficult, however the good news is it can be done!
