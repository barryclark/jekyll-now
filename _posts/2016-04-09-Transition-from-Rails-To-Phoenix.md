---
layout: post
title: How I migrated SPA backend codebase from Rails to Phoenix
comments: true
---

Some time ago I developed a pretty simple SPA with Rails on backend & React.js on the front. It was pretty simple, but (surprisingly for me!) started to grow like on steroids. Rails started to be a bottleneck since one of the customer requirements was not just making application fast. He wanted it to be instant.

It's not a big deal to buy a couple of servers. But 50 ms response isn't enough for my client. So, I decided to rewrite backend on something else. After long thinking I chose elixir & phoenix.

I want to share this transition details with you - maybe you can find something interesting.

### How to run both rails & elixir on the same address?

You have to run rails & phoenix on the same address to prevent battle with CORS.

I solved this by installing `nginx` locally & configuring it to serve few servers on the same address. `/etc/nginx/conf.d/development.conf` listing:

```
server {
  listen 80;
  server_name development.local;

  location / {
    proxy_pass http://127.0.0.1:3000; // rails server
  }

  location /api {
    proxy_pass http://127.0.0.1:4000; // phoenix server; as you can notice, my rails server doesn't have even /api namespace - it was just a rapid prototype
  }
}
```

restart nginx, add these lines to `etc/hosts/`:

```
# For elixir-to-rails transition
127.0.0.1 development.local
```

and you can open `http://development.local` in your browser.
