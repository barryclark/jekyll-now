---
id: 335
title: 'Azure AD Connect Password Sync &#8211; Disabled and Grayed Out'
date: '2022-01-15T20:08:06+00:00'
author: Ryan
layout: revision
guid: 'https://geekyryan.com/?p=335'
permalink: '/?p=335'
---

Ran into a problem earlier with the new Azure AD Connect Wizard. We had configured the wizard and synced around 500 AD accounts. However, password sync was not working. I opened the wizard to confirm the configuration and found that “Password Hash Synchronization” was disabled. It was greyed out and could not be enabled.

[![](https://geekyryan.com/wp-content/uploads/2015/10/2015-10-15_08h43_18.jpg)](https://geekyryan.com/wp-content/uploads/2015/10/2015-10-15_08h43_18.jpg)

I called Microsoft and worked for a couple hours with a technician to resolve the issue. Thought I should post the resolution here in case anyone else encounters this.

You can enable password sync by running the following script:

Import-Module ADSync

$adConnector = “&lt;Local AD Connector Name&gt;”

$aadConnector = “&lt;Azure AD Connector Name&gt;”

Set-ADSyncAADPasswordSyncState -ConnectorName $aadConnector –Enable $true

Set-ADSyncAADPasswordSyncConfiguration -SourceConnector $adConnector -TargetConnector $aadConnector -Enable $true

get-ADSyncAADPasswordSyncConfiguration -sourceconnector $adConnector

You need to set the value of the $adConnector and $aadConnector variables with the names of your Connectors found in the MIISClient.

Open the MIISClient by browsing to:

[![](https://geekyryan.com/wp-content/uploads/2015/10/2015-10-15_09h39_42.jpg)](https://geekyryan.com/wp-content/uploads/2015/10/2015-10-15_09h39_42.jpg)

Right click on MIISClient.exe and click “Run As Administrator”.

You can obtain the names of your connectors in by going to the Connectors tab and looking at the Names column. There are two values here that you need to pay attention to. The Windows Azure Active Directory connector is your Azure Connector (obviously), and the other connector is your on-prem connector.

[![](https://geekyryan.com/wp-content/uploads/2015/10/2015-10-15_09h39_31.jpg)](https://geekyryan.com/wp-content/uploads/2015/10/2015-10-15_09h39_31.jpg)

Now that you have the names, just plug them into the script and run it. You can go back to the Azure AD Connect Wizard and verify that password sync is enabled. You can also go to the Event Viewer -&gt; Application log and look for events 576 and 577. These two events are related to password sync and should show you all AD accounts that have successfully synced passwords.

You can force a sync by going to this location and running “DirectorySyncClientCmd.exe”.

[![](https://geekyryan.com/wp-content/uploads/2015/10/2015-10-15_10h21_12.jpg)](https://geekyryan.com/wp-content/uploads/2015/10/2015-10-15_10h21_12.jpg)