---
layout: post
title: What version of SQL Server is running?
permalink: /microsoft/what-version-of-sql-server-is-running
post_id: 26
categories:
- How to
- Howto
- Microsoft
- SQL
---

[**update**: [SQL2005 versions more info here](http://ben.hamilton.id.au/sql/sql-2005-versions)]

To find out what version of SQL Server your running, do this:
<!--more-->
From the command prompt on the SQL Server itself,

`osql -E -S %computername%`

This will give you a SQL prompt, at which you do the following:
<pre><code>
1>exec master..xp_msver 'ProductName'
2>exec master..xp_msver 'ProductVersion'
3>go
</code></pre>

This gives you two bits of information, (1) the Product Name & (2) the Product Version - which requires some interpretation, note them both. But first, at the SQL prompt, type quit.

<pre><code>
1>quit
</code></pre>

The table below will help determine exactly what SQL Server is running.

| Version      | Product                                          |
| :----------- | :----------------------------------------------- |
| 2005.90.1399 |               SQL Server 2005 RTM                |
| 2005.90.2047 |          SQL Server 2005 Service Pack 1          |
| 2005.90.3042 |          SQL Server 2005 Service Pack 2          |
|   8.00.194   |               SQL Server 2000 RTM                |
|   8.00.384   |               SQL Server 2000 SP1                |
|   8.00.532   |               SQL Server 2000 SP2                |
|   8.00.760   |               SQL Server 2000 SP3                |
|   8.00.760   |         SQL Server 2000 SP3a *note below         |
|   8.00.818   | SQL Server 2000 SP3 w/ Cumulative Patch MS03-031 |
|  8.00.2039   |               SQL Server 2000 SP4                |
|  7.00.1063   |       SQL Server 7.0 Service Pack 4 (SP4)        |
|   7.00.961   |       SQL Server 7.0 Service Pack 3 (SP3)        |
|   7.00.842   |       SQL Server 7.0 Service Pack 2 (SP2)        |
|   7.00.699   |       SQL Server 7.0 Service Pack 1 (SP1)        |
|   7.00.623   |  SQL Server 7.0 RTM (Release To Manufacturing)   |
|   6.50.479   |   SQL Server 6.5 Service Pack 5a (SP5a) Update   |
|   6.50.416   |      SQL Server 6.5 Service Pack 5a (SP5a)       |
|   6.50.415   |       SQL Server 6.5 Service Pack 5 (SP5)        |
|   6.50.281   |       SQL Server 6.5 Service Pack 4 (SP4)        |
|   6.50.258   |       SQL Server 6.5 Service Pack 3 (SP3)        |
|   6.50.240   |       SQL Server 6.5 Service Pack 2 (SP2)        |
|   6.50.213   |       SQL Server 6.5 Service Pack 1 (SP1)        |
|   6.50.201   |                SQL Server 6.5 RTM                |

You will notice that there is SQL Server 2000 SP3 and SP3a both have the same version number. Some software providers require at least SP3a (i.e. some MYOB products). So how does one tell the difference between the two?

By finding the file `SSNETLIB.DLL` and right clicking it, and checking the version number. If the version number of this file is 2000.80.760.0, you have SQL Server 2000 SP3. If the version number of this file is 2000.80.766.0, you have SQL Server 2000 SP3a.

This file is normally found in one of these two locations:

- Default instance: `C:\Program Files\Microsoft SQL Server\Binn\Ssnetlib.dll`
- Named instance: `C:\Program Files\Microsoft SQLServer\MSSQL$<InstanceName>\Binn\Ssnetlib.dll`

Of course, Microsoft have more to say and you can find it at: [www.support.microsoft.com/kb/321185](http://support.microsoft.com/kb/321185)
