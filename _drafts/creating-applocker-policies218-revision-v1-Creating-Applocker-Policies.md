---
id: 297
title: 'Creating Applocker Policies'
date: '2022-01-14T19:23:43+00:00'
author: Ryan
layout: revision
guid: 'https://geekyryan.com/?p=297'
permalink: '/?p=297'
---

Application Control Policies can be used to restrict what programs a user is allowed to run. They can be created at the local Group Policy level or the Domain GPO level. There are 4 different types of Applocker RULES that you can implement, depending on what type of executable you want to control access to.

<span style="font-family: Symbol; mso-bidi-font-family: Symbol; mso-fareast-font-family: Symbol;"><span style="mso-list: Ignore;">·<span style="font: 7.0pt "Times New Roman";"> </span></span></span>Executable Rules – EXE’s, COM’s, etc.<span style="mso-spacerun: yes;"> </span>

<span style="font-family: Symbol; mso-bidi-font-family: Symbol; mso-fareast-font-family: Symbol;"><span style="mso-list: Ignore;">·<span style="font: 7.0pt "Times New Roman";"> </span></span></span>Script Rules – batch files, VB scripts, etc.

<span style="font-family: Symbol; mso-bidi-font-family: Symbol; mso-fareast-font-family: Symbol;"><span style="mso-list: Ignore;">·<span style="font: 7.0pt "Times New Roman";"> </span></span></span>AppX Rules – AppX Packages (Windows 8.1/Server 2012 R2 Metro Interface programs)

<span style="font-family: Symbol; mso-bidi-font-family: Symbol; mso-fareast-font-family: Symbol;"><span style="mso-list: Ignore;">·<span style="font: 7.0pt "Times New Roman";"> </span></span></span>Windows Installer Rules – Windows Installer Packages and MSU Packages

After choosing what type of executable file you want to control, you can choose the corresponding rule type. Then, you will be able to choose the criteria for that rule type. Applocker rule criteria are things such as file path, publisher, and file hash. Criteria allow you to be more granular with your selections. Rather than saying you want to block access to ALL executable’s on a computer, you can choose to block access to executable’s published by a certain vendor, or found in a specified directory.

Applocker can be found in the Group Policy Editor at: Computer Configuration &gt; Windows Settings &gt; Security Settings &gt; Application Control Policies. By right-clicking on the Applocker node, you can configure rule enforcement. You have the option to enforce rules or audit rules based on rule type. Auditing will allow

you get a good grasp on what Applocker will do in your environment if you are unsure.

[![](https://geekyryan.com/wp-content/uploads/2014/11/2014-11-16_20h18_31.png)](https://geekyryan.com/wp-content/uploads/2014/11/2014-11-16_20h18_31.png)

Clicking the Advanced tab of this window will allow you to configure rule enforcement for Dynamic Link Libraries. It’s best to leave DLL rule enforcement disabled, because it can cause a system to suffer dramatic performance hits.

Underneath the Applocker node, you will find nodes for the 4 different rule types. You can create new rules by right clicking on any of these nodes and clicking “Create New Rule”. Before creating any rules, I advise you to create the default rules. Doing this will ensure that users are still able to run programs in the Program Files directory and the Windows directory. Also, members of the built-in Administrators group will be allowed to run ANY files. <span style="mso-spacerun: yes;"> </span>

When creating custom Applocker rules, you can choose to allow or deny the program, and what group the rule will apply to (by default, the “Everyone” special identity is always selected).

You will also be able to choose the criteria for the executable that you are controlling.

[![](https://geekyryan.com/wp-content/uploads/2014/11/2014-11-16_20h26_30.png)](https://geekyryan.com/wp-content/uploads/2014/11/2014-11-16_20h26_30.png)

If the executable has a digital signature from the software publisher, choose “Publisher”. Doing so will give you even more options:

[![](https://geekyryan.com/wp-content/uploads/2014/11/2014-11-16_20h28_47.png)](https://geekyryan.com/wp-content/uploads/2014/11/2014-11-16_20h28_47.png)

This allows you to really drill down and get granular with the rule. Microsoft allows us to control access to the file based on the Publisher, the Product Name, the File Name, and even the File Version.

Creating rules based on File Path criteria is not advised, being that if the file jumps directories, the rule will no longer apply. I also don’t advise using the File Hash criteria. My reason behind this is, if the file gets updated, the hash changes. If that happens, the rule is no longer valid.

After choosing the criteria type you would like to use, you can choose to create exceptions, if any. When multiple rules conflict, the order of precedence is Publisher, File Hash, and then File Path. So Publisher rules will always override File Hash rules, File Hash rules will always override File Path rules, and you get the point…

Finally, in order for your endpoint workstations to process Applocker rules, the Application Identity Service must be running. I like to control this with the same GPO that I configure Applocker in.