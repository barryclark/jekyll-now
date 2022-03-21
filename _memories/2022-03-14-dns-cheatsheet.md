---
layout: memory
title: DNS cheatsheet
---

> It's not DNS <br>
  There'S no way it's DNS <br>
  It was DNS<br>
     -SSBroski<br>

DNS Record types: A, AAAA, CNAME, ALIAS, ANAME, TXT, MX 

##### _HOST_
The root (@ or blank) or subdomain (www, app, blog, etc) where you want to place the record

##### _VALUE_
Can be an IP address (A, AAAA) another domain (CNAME, ALIAS, ANAME, MX) or arbitrary value (TXT)

##### _PRIORITY_
Only for MX records you will be given what value and priority to use by your email provider

##### _TTL_
Time to Live. How long to let record values be cached
Shorter = better for fast changing values
Longer = faster resolution time and less traffic for your DNS server

##### _A_
Map domain name to IPv4 address
Ex: example.com => 127.0.0.1

##### _AAAA_
Map domain name to IPv6 address
Ex: example.com => ::1

##### _CNAME_
Map domain name to another domain name **CAUTION: Don’t do this on the root (@)**
Ex: www.example.com => example.com

##### _ALIAS_
Map domain name to another domain name CAN do this on the root
Ex: example.com => example.herokudns.com

##### _ANAME_
Another name for ALIAS (different providers name it differently; also “virtual CNAME”)
Ex: example.com => example.netlify.com

##### _TXT_
Set arbitrary data on your domain record
Ex: @ => my-domain-is-awesome-123

##### _MX_
Setup custom email for your domain
Ex: @ => ASPMX.L.GOOGLE.COM. 1

---
<br>
<br>
<p align="center">
<img width=300 src="https://www.meme-arsenal.com/memes/1e927796c60a98f90abbb3e414ec0681.jpg">
</p>

