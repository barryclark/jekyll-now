---
layout: post
title: SharePoint 2013 Service Pack 1 Install Fun!
---

I was tasked with installing SharePoint 2013 Service Pack 1 on our two SharePoint servers.  "This shouldn't be too tough. It's just a service pack update" I thought.

In fact, if you look at this [blog](http://blog.fpweb.net/how-to-install-sharepoint-2013-service-pack-1/#.VPDhdvnF-ux) you start to think it's going to be a walk in the park. But, like anything when Microsoft is involved that turned out to be far from the truth.
I am just glad that we follow the rule of installing in a test environment first!

So without further ado, here is what it took to get this monster installed.

### There are two steps:

1. Run the Service Pack installer.
1. Run the SharePoint Products Configuration Wizard.

### Background information
- Two SharePoint servers
    - Web Front End
    - Search
    - Both running Server 2012
- One Database
    - SQL Server 2012 SP 1
    - Server 2012
- Office Web Apps
    - Server 2012

### Run the Service Pack Installer

- Download SharePoint 2013 Service Pack 1
    - The file is 1.3 GB, so plan ahead if you have a slow internet connection.
    - You can read about it in [KB 2880552](http://support.microsoft.com/kb/2880552_)
    - Or just download it [here](http://www.microsoft.com/en-us/download/details.aspx?id=42544)
- Copy the file to all your SharePoint servers.

All the following steps **must be done on each server** and can be run at the same time.  This will bring down SharePoint so plan accordingly.

- Turn off these services in this order:
    - SharePoint Timer
    - SharePoint Search
    - SharePoint Search Host
- Right click on the installer and choose "Run as Administrator".

       ![Right click on the installer](/images/2015-02-27-SharePoint-2013-Service-Pack-1-Fun/right-click-install-as-admin.png)
- An installer window will pop up. Accept the terms and click continue
    - This will start the installer and may take a long time depending on how fast your system is.
    - While this is running you can log onto the other SharePoint servers and go through these same steps

That was easy!  No issues.  I just had to put my feet up and wait for an hour while these bad boys installed.  Now we move onto the troublesome part.

### Run the SharePoint Products and Configuration Wizard

- Navigate to the lower left hand portion of the screen and click on Start when it appears (Thank you Microsoft for bringing back the start button in R2! This is painful on servers.)
    - Start typing "SharePoint" and then right click on SharePoint 2013 Products Configuration Wizard.

        ![Right click on the installer](/images/2015-02-27-SharePoint-2013-Service-Pack-1-Fun/sp-config-wizard.png)
    - Choose Run as Administrator.
- A welcome screen will pop up. Click next.
- A warning message pops up. It is telling you that SharePoint will not work while this is running because services will be restarted. Click yes.

    ![Warning](/images/2015-02-27-SharePoint-2013-Service-Pack-1-Fun/spcw-service-warning.png)
- The wizard will now **try** to finish the install of SP1. You will see a screen like this that goes through 9 steps

    ![SharePoint Products and Configuration Wizard](/images/2015-02-27-SharePoint-2013-Service-Pack-1-Fun/spcw-install.png)

#### The first error!

- On step 9 this error popped up:

    ![SharePoint Error](/images/2015-02-27-SharePoint-2013-Service-Pack-1-Fun/spcw-error-1.png)
- If you click on the link and do a search for "exception" you will be brought to this:

<pre>
02/26/2015 10:08:59  8  INF  Found parameter B2B_UPGRADE in collection
02/26/2015 10:08:59  8  INF  Leaving function Command.this[string key]
02/26/2015 10:08:59  8  INF  Entering function StringResourceManager.GetResourceString
02/26/2015 10:08:59  8  INF  Resource id to be retrieved is UpgradeTaskFailConfigSyncDisplayLabel for language English (United States)
02/26/2015 10:08:59  8  INF  Resource retrieved id UpgradeTaskFailConfigSyncDisplayLabel is Failed to upgrade SharePoint Products.
02/26/2015 10:08:59  8  INF  Leaving function StringResourceManager.GetResourceString
02/26/2015 10:08:59  8  ERR  Failed to upgrade SharePoint Products.
An exception of type Microsoft.SharePoint.PostSetupConfiguration.PostSetupConfigurationTaskException was thrown.  Additional exception information: Failed to upgrade SharePoint Products.
Microsoft.SharePoint.PostSetupConfiguration.PostSetupConfigurationTaskException: Exception of type 'Microsoft.SharePoint.PostSetupConfiguration.PostSetupConfigurationTaskException' was thrown.
 ....
</pre>

After hours of troubleshooting, searching Google, trying something and re-running the config wizard I wasn't making any headway.
Finally I stumbled upon [this blog post](https://sharepointgotchas.wordpress.com/2014/04/17/postsetupconfigurationtaskexception-was-thrown-when-installing-sp1/#comments) from SharePointgotchas. (Thank you!)

SharePoint doesn't want any user besides SharePoint Managed Accounts to be a dbowner of a SharePoint database.  Of course! That makes total sense according to the error....ok maybe not.
On to the fix!

#### Change the dbowner of each SharePoint database to a SharePoint managed account

- Remote into the SQL Server and open up SQL Management Studio
- Run this query to see the dbowner of each database

    ```sql
       select suser_sname(owner_sid) as 'Owner', state_desc, *
       from sys.databases
    ```
- To see the SharePoint Managed accounts, open the Sharepoint management shell and run this:

    ```powershell
       Get-SPManagedAccount
    ```
- Cross reference this list with the sql query to see what databases need to be changed
- Run this SQL script to change the dbowner:

    ```sql
        USE database-name
        GO
        EXEC dbo.sp_changedbowner @loginame = N'sharepoint-managed-account', @map = false
        GO
    ```
- Re-run the SharePoint Products Config Wizard.

#### Error Number Two and Three

The wizard stopped at the same point so I thought that the previous fix didn't do anything.  After reading the logs I came to these two exceptions, which were different.  Thank goodness!

Here is the first:

<pre>
   02/26/2015 12:50:16  10  WRN                  Unable to create a Service Connection Point in the current Active Directory domain. Verify that the SharePoint container exists in the current domain and that you have rights to write to it.
   Microsoft.SharePoint.SPException: The object LDAP://CN=Microsoft SharePoint Products,CN=System,DC=domain,DC=local doesn't exist in the directory.
      at Microsoft.SharePoint.Administration.SPServiceConnectionPoint.Ensure(String serviceBindingInformation)
      at Microsoft.SharePoint.PostSetupConfiguration.UpgradeTask.Run()
</pre>

My Google searching brought me to [Track SharePoint 2010 Installations by Service Connection Point](http://blogs.msdn.com/b/opal/archive/2010/04/18/track-sharepoint-2010-installations-by-service-connection-point-ad-marker.aspx)
SharePoint wants you to create a container for it to track all the SharePoint installs in your domain.  Follow the steps in the link and this error will go away. Don't worry that it says SharePoint 2010. The steps work the same for 2013.

Here is the second exception. The one that stopped the installer:

<pre>
      02/26/2015 12:52:57  10  INF                  SyncUpgradeTimerJob: SPTIMERV4 is not running anymore. Return -1.
      02/26/2015 12:52:57  10  ERR                  The exclusive inplace upgrader timer job failed.
      02/26/2015 12:52:57  10  INF                  Entering function StringResourceManager.GetResourceString
</pre>

This one happens because the account that runs the SharePoint timer service doesn't have db_owner access on all the SharePoint databases.
For more information see:

- [“The exclusive inplace upgrader timer job failed” when running the Products Configuration Wizard in SharePoint 2013](http://bernado-nguyen-hoan.com/2014/07/24/the-exclusive-inplace-upgrader-timer-job-failed-when-running-the-products-configuration-wizard-in-sharepoint-2013/)

#### Setup DB Access for Timer Service User

- From the SharePoint server open up the Services application
- Look for SharePoint Timer Service and make note of the user that is under the Log On As column

    ![SharePoint Timer Service](/images/2015-02-27-SharePoint-2013-Service-Pack-1-Fun/sp-timer-service.png)

- This user will need to be either a db_owner on all the SharePoint databases or we can give it the sysadmin server role.  I decided to go with the sysadmin role
    - From a SQL Management Studio select Security then Server roles and right click on sysadmin
        - Choose properties

        ![Add a user to SQL Server sysadmin role](/images/2015-02-27-SharePoint-2013-Service-Pack-1-Fun/sql-sysadmin.png)

    - Now add the user that is running the timer service and you are good to re-run the config wizard.

That is it!  I finally got passed all the errors and the config wizard finished successfully.  Now on to Production!