---
layout: post
title: I will "quickly" set up my own email 📧 server ⌛️
---

I have always dreamed of having my own email server.
Part, because it feels great to _can_ 💪.
Part, because of privacy reasons, unlimited quota, and other unnecessary restrictions that typical email providers impose.
Part, because of 💰.
For a long time, I have been hosting my emails on [one.com](https://www.one.com/).
Since this year, they charge € 77 per year.
That is reasonable, given that they do everything and provide unlimited number of email accounts, but still 🤷‍♂️.
Assuming that I will use email for the next 30-50 years, I am looking at costs of a couple of thousands of Euro.

With that motivation in mind, I set out in July 2022 to try it finally.
I picked [Mailu](https://mailu.io/), because of its out-of-the-box 📤 Docker 🐳 support and support for all advanced security and authentication features.
My [first configuration](https://github.com/patzm/dockerfiles/pull/30) worked out quite well.
I managed to set up SPF, DKIM, and DMARC through the Google Domains web UI.
After small issues in local networking within the Docker 🐳 network and dumping the Traefik-generated SSL certificate, everything was functional.
Sending emails worked to most providers ✅🚀.

However, in particular Microsoft is a tough nut 🥜.
They also require [reverse DNS lookup](https://en.wikipedia.org/wiki/Reverse_DNS_lookup) to be configured.
That however is something that the ISP has to configure.
My provider is [PYUR](https://www.pyur.com/).
They are great in general, but over _months_ refused to do this for me.
I had already given up on the idea and considered using this email server only for inbound 📥 email.
So much to "quickly set up my own email server" 🤦‍♂️.

But then, ... 🥁, I thought I could use an external email delivery server.
As it turns out, there are _plenty_ of them out there!
Eventually, I picked [sendinblue.com](https://www.sendinblue.com/) because of their awesome free tier.
It allows to send up to 300 mails _per day_.
That will for sure be enough!

Setup was quick and worked almost out of the box.
So here is a quick step-by-step guide to configure this:
1. Create the account on [sendinblue.com](https://www.sendinblue.com/).
2. Navigate to _Senders & IP_ (in the drop-down of your user icon in the upper right) `>` _Domains_.
3. Click _Add a new domain_ and copy the values that shown to your domains records.
   This is easy with the Google Domains web-UI.
4. Get the SMTP credentials from the _Transactional_ tab.
   The first launch will already guide you through the setup and show the `Postfix` configuration (3rd tab in the wizard).
5. Take these values (server and port, username, password) and store them in the environment variables of Mailu.
   I chose to only store they server and port in my [configuration file](https://github.com/patzm/dockerfiles/blob/2384acff2c443e3ba312857ff35159d972ac2da9/mailu/.env#L73-L74):
   ```bash
   # Will relay all outgoing mails if configured
   RELAYHOST=smtp-relay.sendinblue.com:587
   ```
   The username (`RELAYUSER`) and password (`RELAYPASSWORD`) are stored in another environment variable file I called `secrets.env`, which is _not_ added in `git`.
   I mount it then [here](https://github.com/patzm/dockerfiles/blob/2384acff2c443e3ba312857ff35159d972ac2da9/mailu/docker-compose.yml#L93).
6. Rebuild the service with `docker-compose up -d`.
   Done ✅.

Also nice to have:
use the [free blacklist monitor](https://mxtoolbox.com/monitoring) of [mxtoolbox.com](https://mxtoolbox.com/) to check if your domain got listed somewhere.
In general, this website has great tools to diagnose problems related to DNS, email delivery and other web protocol things.

I hope 🤞 this can help you also set up your own email server, hopefully much quicker than me 😉.