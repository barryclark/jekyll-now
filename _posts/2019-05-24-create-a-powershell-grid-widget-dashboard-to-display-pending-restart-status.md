---
date: 2019-05-24
layout: post
categories: SCOM
title: Create a PowerShell Grid Widget dashboard to display Pending Restart status
---

I needed a way to display the health state of the _Server Pending Restart Monitor_ from the [Server Pending Restart](https://gallery.technet.microsoft.com/Server-Pending-Restart-New-2457a729) management pack in a SCOM dashboard. SCOM does not have a native method to display the health state of all instances of a specific monitor, so fortunately [Hugh Scott](https://github.com/hmscott4) pointed me to PowerShell Grid Widgets as a possible solution. This article discusses how I approached the problem and how I ended up at this PowerShell Grid Widget dashboard solution.

## Server Pending Restart Monitor Status

Before creating the dashboard we need to collect the information we want to display in it. The following steps show how to get the status of a specific monitor across all of the objects which it monitors.

1. Get the _Server Pending Restart Monitor_ object.

    ```powershell
    $rebootRequiredMonitor = Get-SCOMMonitor -DisplayName 'Server Pending Restart Monitor'
    ```

1. Get the class which is targeted by the reboot required monitor. In this case it is an Operating System object.

    ```powershell
    $operatingSystemClass = Get-SCOMClass -Id $rebootRequiredMonitor.Target.Id
    ```

1. Get all instances of the Operating System class.

    ```powershell
    $operatingSystems = Get-SCOMClassInstance -Class $operatingSystemClass
    ```

1. Create a collection to use when searching for the state of the monitor in the context of the operating system. This a requirement when using the `GetMonitoringStates()` method.

    ```powershell
    $monitorCollection = New-Object -TypeName 'System.Collections.Generic.List[Microsoft.EnterpriseManagement.Configuration.ManagementPackMonitor]'
    $monitorCollection.Add($rebootRequiredMonitor)
    ```

1. Get one of the operating system objects to work with

   ```powershell
    $operatingSystem = $operatingSystems[0]
    ```

1. Get the first state of the monitor in the context of the specified operating system.

    ```powershell
    $rebootState = $operatingSystem.GetMonitoringStates($monitorCollection)[0]
    ```

1. Get the context of the last state change events and cast it as an XML object.

    ```powershell
    [xml]$context = $rebootState.GetStateChangeEvents()[-1].Context
    ```

1. From here all of the properties which are available in the _Server Pending Restart Monitor_ can be listed.

    ```powershell
    $context.DataItem.Property
    ```

## SCOM PowerShell Widget Data Object

Now that the data to display is collected, a data object must be created so the PowerShell Grid Widget can display the data.

1. Create a hashtable to translate between the HealthState value and alphabetical characters. This will be used as part of the `Id` field which is used to sort the table.

    ```powershell
    $sortTable = @{
        0 = 'd'
        1 = 'c'
        2 = 'b'
        3 = 'a'
    }
    ```

1. Create a data object with a dummy namespace. The namespace name does not appear to be important.

    ```powershell
    $dataObject = $ScriptContext.CreateInstance('xsd://foo!bar/baz')
    ```

1. Get the numeric value of the health state.

    ```powershell
    $healthStateValue = $rebootState[0].HealthState.value__
    ```

1. Translate the health state value to the alphabetic character which will be used to sort the grid.

    ```powershell
    $sortId = $sortTable[$healthStateValue]
    ```

1. Create an `Id` field with both the health state and operating system ID. There are a couple points which can be gotchas in this process:
    - The `Id` field must be a string.
    - The `Id` field is the only field which is used to sort the grid.

    ```powershell
    $dataObject['Id'] = "$sortId $($operatingSystem.Id.ToString())"
    ```

1. Add the rest of the data properties as desired.

    ```powershell
    $dataObject['Health State'] = $ScriptContext.CreateWellKnownType('xsd://Microsoft.SystemCenter.Visualization.Library!Microsoft.SystemCenter.Visualization.OperationalDataTypes/MonitoringObjectHealthStateType',$rebootState[0].HealthState.value__)
    $dataObject['Maintenance Mode'] = $ScriptContext.CreateWellKnownType('xsd://Microsoft.SystemCenter.Visualization.Library!Microsoft.SystemCenter.Visualization.OperationalDataTypes/MonitoringObjectInMaintenanceModeType',$operatingSystem.InMaintenanceMode)
    $dataObject['Computer'] = [System.String]($operatingSystem.'[Microsoft.Windows.Computer].PrincipalName'.Value)
    $dataObject['Last BootUp Time'] = $context.DataItem.Property | Where-Object -FilterScript { $_.Name -eq 'LastBootUpTime' } | Select-Object -ExpandProperty '#text'
    $dataObject['Windows Update'] = $context.DataItem.Property | Where-Object -FilterScript { $_.Name -eq 'WindowsUpdateAutoUpdate' } | Select-Object -ExpandProperty '#text'
    $dataObject['Component Based Servicing'] = $context.DataItem.Property | Where-Object -FilterScript { $_.Name -eq 'ComponentBasedServicing' } | Select-Object -ExpandProperty '#text'
    $dataObject['Pending File Rename Operations'] = $pendingFileRenameOperations
    $dataObject['Pending File Renames'] = $pendingFileRenames
    ```

1. Add the data object to the collection which is returned to the PowerShell Grid Widget.

    ```powershell
    $ScriptContext.ReturnCollection.Add($dataObject)
    ```

## Create the PowerShell Grid Widget

Many others have already blogged about this, so I will point you to [Stefan Stranger's blog](https://blogs.technet.microsoft.com/stefan_stranger) in which he wrote walk through using the [PowerShell Grid Widget](https://blogs.technet.microsoft.com/stefan_stranger/2014/04/28/new-powershell-grid-widget-walkthrough/).

## Full Script

The full script described in this article is [available on GitHub](https://github.com/randomnote1/SCOM/blob/master/src/PowerShellDashboard/PendingRestart.ps1).
