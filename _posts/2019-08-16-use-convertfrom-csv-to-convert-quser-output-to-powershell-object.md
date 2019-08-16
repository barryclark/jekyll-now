---
date: 2019-05-16 08:00:00 -05:00
layout: post
categories: PowerShell
title: Use ConvertFrom-Csv to convert quser output to a PowerShell object
---

I ran across a scenario where I needed to log off a user from a number of
computers without knowing which computers they were logged into. The best way I
found to do this programmatically was to use the `quser` (`query user`) and
`logoff` commands. Unfortunately, the `quser` command outputs each record as a
string. It would be nice if this was a PowerShell object so each property is
easily accessible.

I ran across a few solutions when looking online, and while they all worked,
they seemed overly complicated for something which `ConvertFrom-Csv` should be
able to handle easily. Let's dig in!

The output of `quser` looks like this:

```
USERNAME              SESSIONNAME        ID  STATE   IDLE TIME  LOGON TIME
randomnote1           console             1  Active      none   8/14/2019 6:52 AM
```

This is a nicely formatted table. However in order to access the `USERNAME` and
`ID` fields, some string processing needs to occur. To prepare for this, set
the output of `quser` to a variable.

```powershell
$quserResult = quser /server:sqlserver01 2>&1
```

Now process each line of the result with using a regular expression (regex). In
this case, it appears that there are a minimum of two spaces separating each
column. Therefore, use a regex which replaces two or more consecutive spaces
with a comma.

```powershell
$quserRegex = $quserResult | ForEach-Object -Process { $_ -replace '\s{2,}',',' }
$quserRegex
```

This produces the following output:

```
USERNAME,SESSIONNAME,ID,STATE,IDLE TIME,LOGON TIME
randomnote1,console,1,Active,none,8/14/2019 6:52 AM
```

Now that the results are in a familiar CSV format, `ConvertFrom-CSV` can be
used to create a PowerShell object from the `quser` results.

```powershell
$quserObject = $quserRegex | ConvertFrom-CSV
$quserObject
```

The results are a familiar object which can be used just like any other object
in PowerShell.

```
USERNAME              SESSIONNAME        ID  STATE   IDLE TIME  LOGON TIME
--------------------------------------------------------------------------
randomnote1           console             1  Active      none   8/14/2019 6:52 AM
```

Finally, the record with the desired username can be selected and the user can be logged off.

```PowerShell
$userSession = $quserObject | Where-Object -FilterScript { $_.USERNAME -eq 'randomnote1' }
logoff $userSession.ID /server:sqlserver01
```

There you have it! Using a simple regex allowed the native PowerShell cmdlet
`ConvertFrom-Csv' to do it's job.
