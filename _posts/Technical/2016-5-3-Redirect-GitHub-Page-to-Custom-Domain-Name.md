---
layout: post
title: Redirect GitHub Page to Custom Domain Name Registered With AWS Route 53
tags: 
- AWS Route 53
- GitHub
- CNAME
- DNS
- WHOIS
category: Technical
---

I'm trying to use my own domain for this blog. I researched into pricing and server availability of different DNS service providers. Considering company reputation and customer service I choosed AWS Route 53. Besides, AWS Route 53 connects user request to other AWS infrastructure like EC2 instances (which I am using now), Elastics Load Balancer, AWS S3 bucket. AWS Route 53 partnered with Gandi. So don't get surprised when you see Gandi's information showing in your WHOIS site. 

Next step, checked for availability of domain name. Tried with my first name and last name but no luck! After several attempt I tried with my email address <code>maggie98choy.com</code>. Good, this one had not been taken! I quickily registered with this name. I didn't give second thought about the top-level domain name other than .com as this is most common one. AWS Route 53 charged $12/year for domain name registration. 

![Image](../images/dns_registration.png?raw=true)

After registered for a domain name and verified my contact information, the domain name was up and ready.  Redirecting my GitHub site to my own domain name was quite straight forward. [Using a custom domain with GitHub pages](https://help.github.com/articles/using-a-custom-domain-with-github-pages/) provides good documentation on how to accomplished this. 

Here's the overview of the steps:
<ol>
<li>Add a <code>CNAME</code> file in GitHub pages site repository and add a single line that specify custom domain name without http:// or https://</li>
<li>Create <code>CNAME</code> type record set and specify value with GitHub page site (make sure no www in front of GitHub page site)</li>
</ol>

For checking if domain name <code>CNAME</code> is succeessfully updated simply type <code><<nslookup "domain name address with www in front">></code> in Terminal. <code>CNAME</code> was updated when returned result showed appropriate canonical name in Terminal. Enjoy seeing your GitHub site on your own domain name!







