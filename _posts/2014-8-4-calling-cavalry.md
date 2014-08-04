---
layout: post
title: Feeling Stupid and Calling in the Cavalry
---

I actively avoid contacting support when I can, but I almost always have problems when DNS changes are involved.

Recently, my web host moved a bunch of junk to different servers (which for some reason they feel the need to do every few months) that just wrecked my setup. It seemed like it was a DNS issue, but if I remember correctly it ended up being my host's server cache or something equally stupid. But before we were able to figure it out, I'd reached out to both my host's support and Cloudflare's.

Both parties directed me back to the other, and I ultimately had to solve the mystery myself anyway - which I did, but not after feeling very stupid.

Today, I reached out to support again, and again, felt really really stupid. I was trying to redirect my domain [jordanforeman.com](http://jordanforeman.com) to my new Github hosted Jekyll site. I updated my Cloudflare DNS settings, and was being redirected to Githubs 404 page. No bueno.

Turns out, I just needed to add my domain to the CNAME file - the blank file sitting right there in my site's repo. Doi!

So yeah, if you happen to follow the tutorial that I linked in my last post, remember to do that. I don't know how I missed the line telling me to do that, especially after all the looking I did to find a solution. Sometimes the answer is right in plain sight. Often those are the hardest solutions to find.
