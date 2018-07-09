---
layout: post
title: Configuring DigitalOcean DNS for a subdomain hosted at GitHub pages
---

This post will guide you set up a subdomain (for example blog.neperix.com) for your website hosted on a DigitalOcean's droplet to point to your GitHub pages website (for example petarmitrovic.github.io).

## Before you begin

... make sure you check all the items from the list below

- [x] You have a domain name registered at a domain registrar (for example godaddy.com)
- [x] You have already configured your DigitalOcean nameservers (TODO link to guides)
- [x] You have your GitHub pages website to be used as a subdomain in place (TODO: link to GitHub pages docs)

## Add CNAME to your GitHub pages project

You've probably come up with your subdomain name by now, so just make sure you have a file named CNAME at the root of your GitHub pages repo, with the single line specifying your full subdomain. For example, `blog.neperix.com`.

``` bash
cd [PROJECT-ROOT]
git pull origin
echo "blog.neperix.com" > CNAME
git add CNAME
git commit -m "Added CNAME with subdomain config"
git push
```

## Update DigitalOcean DNS configuration

In your DigitalOcean dashboard navigate to your domain and click on it (or click on "Manage domain" from the menu on the right).

![domain overview]({{ site.baseurl }}/images/domain-overview.png "Domain overview")

This will lead you to the DNS management panel and here you need to create a new CNAME record (to pair up with the CNAME config you added to GitHub pages website earlier) as follows:

![adding CNAME record]({{ site.baseurl }}/images/domain-management.png "Adding CNAME record")

1. Enter only subdomain name in the hostname field (for example, **blog**). Note that the dot (.) and the following domain name will be added automatically. You can follow the entire subdomain URL changes as you type just below this field.
2. Enter the URL to your GitHub pages website into the next field labeled as "Is an alias of". Note that the dot (.) is **mandatory in the end** here.
3. Leave the default TTL and hit "Create Record" button

Wait some time for those changes to propagate (it worked for me almost immediately) and - voilà!
