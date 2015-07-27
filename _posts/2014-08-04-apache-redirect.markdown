---
layout: post
title: Apache Redirect
date: '2014-08-04 16:22:50'
---

>Updated version including SSL below. (2014-09-03)

Sometimes you just want to do a simple redirect based on the domain, or well this might not be so common request.

![Zoo Lights](/content/images/2014/Aug/11430398143_84c7d4fc45_z.jpg)

Recently I was encounter with a request where the client wanted to moved from domain A to domain B using Blackboard. But they wanted to do it transparently, which is kind of difficult when it has

* Certificates
* Applications
* Sub Applications that require those certificates
* Different URLs

So based on a simple approach we decided to provide a different [Public IP](http://en.wikipedia.org/wiki/IP_address) for that use. After installing the custom certificate and making sure that it worked that was just half the way. Now we had:

1. IP1 points to URL1
2. IP2 points to URL2

We needed to have IP1 points to URL1 that then redirects to URL2 (IP1 -> URL1 -> URL2), kind of tricky, but thanks to Apache and its [Rewrite Conditions](http://httpd.apache.org/docs/2.0/rewrite/rewrite_guide.html) we can actually implement them.

#### Solution 1
The first solution is the wrong one, since it redirects all the content to the new url, without actually thinking where its coming from. More on this on the Problem below.
<pre class="language-bash">RewriteRule ^(.*)$ https://newdomain.com [R=301,NC,L]
</pre>


####Problem
The main problem is that sometimes we want to troubleshoot and isolate different application servers, so if we just implemented a complete redirect meaning

* anything that comes here, redirect it to URL2

it will fault. So we needed to be more specific and specify if they come to URL1 then redirect to URL2.


#### Solution 2
This next solution will actually see where the host is coming from and redirect if it matches the old domain.
{% highlight bash %}
RewriteEngine on
RewriteCond %{HTTP_HOST} ^old\.domain\.com$
RewriteRule ^(.*)$ https://newdomain.com [R=301,NC,L]
{% endhighlight %}

#### Conclusion
Why this implementation and not generic one?
Well in my case this client has more than 1 application server which has one private ip, that using a VPN I can actually use. In the solution 1 case, it doesnt matter if I entered using the VPN over a private Ip, it still redirected me to the new url, which was a problem.

The second solution actually provides the work that I was needing, to redirect me depending on what type of url i used.

#### Updated Portion
Well the above portion will work only with the case:

1. Redirecting http://www.example.me to https://example.me
2. Redirecting http://example.me to https://example.me
3. Correct url is https://example.me

But now we want to have:

1. Redirecting https://www.example.me to https://example.me

This by all means is the last portion of SSL should be there.

At first I thought of just including the redirect portion and actually did it, but did not worked. So you can't have the following in the same code:

{% highlight bash %}RewriteEngine on
RewriteCond %{HTTP_HOST} ^www.example.me$
RewriteRule ^(.*)$ https://example.me/$1 [R=301]

RewriteCond %{HTTP_HOST} ^www.example.me$
RewriteCond %{SERVER_PORT} ^443
RewriteRule ^(.*)$ https://example.me/$1 [R=301]
{% endhighlight %}

So We just removed the second portion for the SSL and added it to the SSL.conf that we had in apache.

Then we searched for the VirtualHost `<VirtualHost _default_:443>`, which means this is the part that will handle all secure connections.

After that line and before the closing of the `</VirtualHost>` we added the following:

{% highlight bash %}
RewriteEngine On
RewriteCond %{HTTP_HOST} ^www.example.me$ [NC]
RewriteRule ^(.*)$ https://example.me/$1 [R=301,L]
{% endhighlight %}

What this will actually do is whenever it comes a connection to the SSL port of 443 defined for this Apache, we will first and foremost check if we need to redirect it before presenting any content. Then continue to the display.

Well, I hope you enjoy this documentation, and sorry for the long post, but had to update since the last request just came in a few days ago.
