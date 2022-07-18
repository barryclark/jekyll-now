---
id: 293
title: 'Powershell: SID to Username'
date: '2022-01-14T19:23:34+00:00'
author: Ryan
layout: revision
guid: 'https://geekyryan.com/?p=293'
permalink: '/?p=293'
---

\#Returns a username based on a SID  
\#Author: Ryan Nemeth  
\#Date: 12/2/2014

$SID = read-host “Please enter the SID: ”  
$object = New-Object System.Security.Principal.SecurityIdentifier($SID)  
$User = $object.Translate( \[System.Security.Principal.NTAccount\])  
write-host “The user is: ” $User.Value