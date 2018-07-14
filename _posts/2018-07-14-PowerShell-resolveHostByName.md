---
layout: post
title: PowerShell resolveHostByName  
---

PowerShell's Resolve-DnsName generate awful results. So old method for get IP address of machine for which we know only name is useful (BTW it's strange how many support teams require provide only IP / port, not understanding application which are under, and even not able to resolve name using any kind of looking glass).

```powershell
PS C:\h\z> [NET.DNS]::Resolve("www.google.com").AddressList.IPAddressToString -join ', '
108.177.127.99, 108.177.127.106, 108.177.127.105, 108.177.127.103, 108.177.127.104, 108.177.127.147
``` 

## References 
- https://stackoverflow.com/questions/15700421/check-for-dns-record-using-powershell-2-0 
- [Dns.GetHostByName Method (String)](https://msdn.microsoft.com/en-us/library/system.net.dns.gethostbyname(v=vs.110).aspx)
- [Technet Social: DNS Script - Powershell](https://social.technet.microsoft.com/Forums/scriptcenter/en-US/b1d37394-5028-45c2-b60a-f6612ed5a60c/dns-script-powershell?forum=ITCG))
- [Powershell script to convert IP to hostname and vice versa](https://social.technet.microsoft.com/Forums/windowsserver/en-US/bd64a860-d447-44b1-873f-3ca41a35ab4c/powershell-script-to-convert-ip-to-hostname-and-vice-versa-?forum=winserverpowershell)