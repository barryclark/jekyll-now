---
layout: post
title: 2022-11-19
---

# So you got a domain, now what?

### Foreword

This is the beginning of a multipart series on what to do with a new **public** domain and how to plan for the future, yes I'm looking at you DNS!

While DNS plays a major role for any active domain, there are other pitfalls and decisions which can greatly impact on how flexible your domain setup is. 
Here are some of the topics future parts will aim to cover:

-   Email traffic
-   Certificates
-   Subdomains & DNS Zones
-   Private vs Public DNS

![[0days-since-dns.png]]
Source: https://dnx.solutions/wp-content/uploads/2021/02/Its-always-dns.jpeg


### Part1 - Acquiring a Domain

#### If you have already bought your domain

Congratulations! You can move to next sections, but I do encourage hiding your domain ownership if you are an individual. After all, there is no reason to share your personal details to the whole Internet.

For the rest of you keep on reading!


#### Building blocks for domain names

Example URL: https://support.companyname.com/en/webpage


| Part of the URL         | Value | Definition |
|--------------|:-----:|----------------:|
| protocol |  https |        What protocol is used to access the url, here we use TCP 443 (https) |
| subdomain      |  support |          subdomain  |
| domain      |  companyname |          Domain name  |
| TLD      |  com |          Top Level Domain|
| subdirectory      |  en |          subdirectory on the webserver  |
| webpage      |  webpage |          webpage on the webserver  |


#### Top Level Domain - TLD

List of all valid top-level domains is maintained by the Internet Assigned Numbers Authority (IANA). The up-to-date list can be found here: https://data.iana.org/TLD/tlds-alpha-by-domain.txt

As of writing this blog post the list was last updated on Sat Nov 12 07:07:02 2022 UTC.
The list contains of 1485 Top Level Domains.

For a more human readable format please visit: https://www.iana.org/domains/root/db

While most people are familiar with TLDs such as .com .org .gov and various country codes, there  are a lot more to choose from. 

Here are some questions to ask yourself when picking TLD Manager.
Note! Some questions are more valid for individuals, some more for organisations

-   Do I trust the TLD Manager and will my visitors, customers, or other trust it?
	-    .com vs .xyz
	-    will they be around for a long-time?
	-    do I trust my payment details with them?
-   Am I able to change a TLD manager if I need to do so?
	-    Some TLDs have very few TLD Managers available
-   Domain ownership is public information, do they allow me to hide the domain ownership? 
	-    Hiding the name for you, your product, brand or other
-   Is the name for your domain already being used by some TLD?
	-    Someone might be using .com are you happy with using .org ?


#### Where to buy?

Once you are ready to move into finding and buying your domain, ask yourself are you planning on keeping your domain in the same place as rest of your infrastucture or do you perhaps split these into two or more places? Be aware that the same domain purchased from different vendors can have a different yearly cost.

You can purchase a domain directly from known cloud vendors such as

-    AWS
-    GCP
-    Azure

You can also buy your domain from any vendor that issues public domain certificates

-    Digicert
-    Domain.com 
-    Name.com
-    Namecheap
-    Godaddy
-    Eurodns
-    Local Country Vendors
-    etc. etc.

Here are few bulk domain search tools as examples and a lot of services offer their own during the time of purchase

https://www.name.com/names
https://www.checkdomain.net/en/domains/search

As you can imagine each of these have vendors have different services, domains available for purchase and other options to choose from, so it is difficult to make a recommendation which one to pick. 

The next chapters will delve into other topics regarding your domain, which will perhaps help you make your decision.

#### The name matters

Last nugget of information for this blogpost talks about the name for your domain.
Even if something is available, it doesn't always mean things will go smoothly.
Whether now or in the future there are some things to be aware when it comes to your domain name. 

1. Will your domain registrar take actions on DMCA takedown notices?
2. Can you afford to register all the domains with common TLDs? If you own **.com** do you also own **.net** ?
3. Short domainnames carry a value and with value comes adversories
4. Perhaps you are worried about typosquatting, combosquatting, doppelganger domains, adding an extra dot to create a subdomain or other name related shenanigans? 

How much each of these matter to you depends on your brand and identity and how difficult it is to spell your domain on the phone..  

Afterall, who in their right mind would pick a domain resulting in *emailAddress @ thesnowwight.com* or *emailAddress.subdomain @ thesnowwight.com* ?