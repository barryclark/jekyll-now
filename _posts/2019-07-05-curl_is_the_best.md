---
layout: post
title:  Curl is the best 
categories:
    - Scripting
    - PowerShell
tags: 
    - Scripting
    - PowerShell
    - X509
---

Curl is also on Windows... Both as vendor provided and ... by Microsoft using MS Schannel library. 


1st: 
> On December 19 2017, Microsoft announced that since insider build 17063 of Windows 10, curl is now a default component. 
via: https://daniel.haxx.se/blog/2018/01/13/microsoft-curls-too/ 

I don't know i could overlook (ok, I usally work on older than Windows 10 machines, mostly servers). 
And of course it works outside of [WLS  aka Windows Linux Subsystem](https://docs.microsoft.com/en-us/windows/wsl/install-win10) - as native Windows binaries. 


2nd: 
Worth to cary on avoid -k in curl (just add your local CA to curl-ca-bundle.crt in binary of curl.exe file). use [```curl-ca-bundle.crt```](https://curl.haxx.se/docs/sslcerts.html) Unforunatelly  official based on OpenSSL - do  not yet read Windows certstore.  
On Microsoft released version: 
> If libcurl was built with Schannel (Microsoft's native TLS engine) [...], then libcurl will still perform peer certificate verification, but instead of using a CA cert bundle, it will use the certificates that are built into the OS.

Nice. :) 

3rd - some examples: 
```
curl -k -vvv https://site.to.verify.certs/ 
```

HTH,

Ziemek :) 


--- 
more: [Rich Turner/Sr. Program Manager, Windows Console & Command-Line](https://devblogs.microsoft.com/commandline/tar-and-curl-come-to-windows/)