---
layout: post
title: DynDNS with Route 53
tags: [route53]
---

The concept of DynDNS assigns a DNS-entry to a frequently changing IP-address. This is done, because a DNS-name can be recognized more easily than an IP-address. For this approach, you can use the AWS-service [Route 53](http://aws.amazon.com/route53/){:target="_blank"}, as its purpose is to manage DNS-entries.

## Setup environment

For the commands to work correctly, you need to install [cli53](https://github.com/barnybug/cli53){:target="_blank"}. You can either install the release-version via pip or the source-version from the [GitHub](https://github.com){:target="_blank"}-repository. As there's currently a small bug around the hosted zone export functionality, I would advise to use the source-version.

Installation of source-version
{% highlight bash %}
$ sudo pip install git+git://github.com/barnybug/cli53
{% endhighlight %}

Installation of release-version
{% highlight bash %}
$ sudo pip install cli53
{% endhighlight %}

## Update IP-address

For this concept, only a few commands are needed. However, if you still prefer a Bash-script version, it can be found [here](https://github.com/fschaeffler/aws-blog.io/blob/master/downloads/dyndns-r53.sh) on [GitHub](https://github.com){:target="_blank"}.

**NOTE:** I assume that you have already setup your hosted zone properly. If you need some help with it, there's also a blog-post on '[Register a domain with Route 53](/2015/register-domain-route53/)'.

The values that need to get adjusted are the DOMAIN and HOSTNAME. For the HOSTNAME you can also leave it as it is. That just uses the short-version of your current hostname. As we need to find out, which external IP-address we currently have, you need to start a dig-call. This can also get modified to a STUN-call.

{% highlight bash %}
$ # settings
$ HOSTNAME=$(hostname -s)
$ DOMAIN="aws-blog.io"
$ # get external ip-address
$ ip_address=$(dig -4 @resolver1.opendns.com -t a myip.opendns.com +short)
$ # update dns-entry
$ cli53 rrcreate $DOMAIN $HOSTNAME A $ip_address --ttl 120 --replace
{% endhighlight %}
