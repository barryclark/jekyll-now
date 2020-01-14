---
layout: post
title: How to find your external ip address from the command line
permalink: /microsoft/how-to-find-your-external-ip-address-from-the-command-line
post_id: 422
categories:
- Command
- How to
- IP
- Microsoft
- Script
---

I often need to know what the external IP address for a client is. Thus I've cobbled together the following script. Simply copy the code below into externalip.cmd and when run from the command prompt it will do two things for you:

- the script will display the external IP address
- the script will set the environment variable ExternalIP to be whatever that IP is
<pre><code>
@echo off
:: Find out what the External IP address is
:: Create the .vbs file first
Echo Option Explicit >externalipaddress.vbs
Echo Dim http : Set http = CreateObject( "MSXML2.ServerXmlHttp" ) >>externalipaddress.vbs
Echo http.Open "GET", "http://whatismyip.org", False >>externalipaddress.vbs
Echo http.Send >>externalipaddress.vbs
Echo Wscript.Echo http.responseText >>externalipaddress.vbs
Echo Set http = Nothing >>externalipaddress.vbs
:: run the resulting .vbs script and set the enviroment variable
for /f "skip=2 " %%G IN ('cscript externalipaddress.vbs') DO (Set ExternalIP=%%G)
:: Display the enviroment variable
Echo External IP is %ExternalIP%
:: tidy up and remove the temp file
del externalipaddress.vbs /q
</code></pre>

Let me know if you find this useful, or if you can improve on it I'd love to hear from you.
