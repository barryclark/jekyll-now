---
layout: post
title: Proxy madness - Defeat SQLi and more
---

After readingg the cheatsheet about [weird proxies](https://github.com/GrrrDog/weird_proxies) I had the idea mess around with some default proxy setups in my k8s cluster. 

<p align="center">
<img src="/images/seven_proxies.jpg">
</p>

The things I'll show here in this post aren't meant to run in production or have the intention to give 100% protection. Based on the proxy stuff we could create a poor man's k8s WAF and iterate to a more k8s-isch solution. As a baseline we try to do something against SQL injection (SQLi) - but the list of patterns could be enhanced by other stuff like XSS, XXE and more.

In the first iteration we start with building a NGINX-proxy as a [sidecar container](https://learnk8s.io/sidecar-containers-patterns) and will look like this:

<p align="center">
<img width="600" src="/images/encrypted_traffic.svg">
</p>


In casual scenarios this helps to send encrypted traffic from "outside" and across the cluster to a [Pod](https://kubernetes.io/docs/concepts/workloads/pods/) and terminate it there. Inside the Pod we can create multiple Containers, that can talk unencrypted to each other. The setup of a sidecar container is pretty trivial (got an example [here](https://github.com/BenjiTrapp/CTFd-helm-chart/blob/main/templates/deployment-ctfd.yaml#L26)) but the magic resides in the nginx-config:

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: nginx-config
data:
 nginx.conf: |
    error_log /tmp/error.log;
    pid       /tmp/nginx.pid;
    
    events {
      # No special events for this simple setup
    }

    http {
      server {
          listen 8443 ssl http2;
          server_name  localhost;

          ssl_certificate     /etc/tls/private/tls.crt;
          ssl_certificate_key /etc/tls/private/tls.key;
          ssl_protocols       TLSv1.2;
          ssl_ciphers         HIGH:!aNULL:!MD5;

          # Set a number of log, temp and cache file options that will otherwise
          # default to restricted locations accessible only to root.
          access_log /tmp/nginx_host.access.log;
          client_body_temp_path /tmp/client_body;
          fastcgi_temp_path /tmp/fastcgi_temp;
          proxy_temp_path /tmp/proxy_temp;
          scgi_temp_path /tmp/scgi_temp;
          uwsgi_temp_path /tmp/uwsgi_temp;

          index index.html;
          error_log /dev/stdout info;

          location ~* "(\'|\")(.*)(drop|insert|md5|select|union)" {
              deny all;
          }
          
          location / {
              proxy_set_header Host $host:443;
              proxy_set_header Forwarded "host=$host;proto=https";
              proxy_set_header X-Real-IP $remote_addr;
              proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
              # Set CORS Headers
              if ($request_method ~* "(GET|POST|PUT|DELETE)") {
                add_header "Access-Control-Allow-Origin"  "*";
              }
              # Preflighted requests
              if ($request_method = OPTIONS ) {
                add_header "Access-Control-Allow-Origin"  "*";
                add_header "Access-Control-Allow-Methods" "GET, POST, OPTIONS, HEAD";
                add_header "Access-Control-Allow-Headers" "Authorization, Origin, X-Requested-With, Content-Type, Accept";
                return 200;
              }
              proxy_pass http://127.0.0.1:8080;
          }
      }
    }
```

The magic to defeat SQLi can be found in the tiny lines below:

```bash
location ~* "(\'|\")(.*)(drop|insert|md5|select|union)" {
    deny all;
}
```

With this configuration file we can stop some common SQLi attacks or at least slow an adversary out. To make it more flexible we can create a helm chart and inject statements dynamically from a list. Since this solution is based on the Sidecar pattern which is okish but not perfect, we need to make another iteration. To improve this we can upgrade the Ingress object and make it secure for every app without the usage of a Sidecar:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: awesome-ingress
  annotations:
  nginx.org/server-snippets: |
    location ~* "(\'|\")(.*)(drop|insert|md5|select|union)" {
        deny all;
    }
spec:
  ingressClassName: nginx
  rules:
    - host: "example.com"
      http:
        paths:
          - backend
              service:
                name: your-fancy-app-without-sidecar
                port:
                  number: 80
            path: /
            pathType: Prefix
```

With this Ingress configuration all traffic is cleansed and will be answered with [HTTP 403](https://http.cat/403). Since this simple filter is build quite trivial a professional Hacker might find a way to bypass it - so don't relay on it as a single layer of defense. This approach can help though to craft an extra hurdle that needs to be taken as a quick win for you as a defender. 

### Speed up the rush of slowness and roast a Slowloris
If you've read my other blog posts and memories, you might have found my Pythonic version of the [Slowloris](https://benjitrapp.github.io/memories/2022-01-24-slowloris/). This attacks is based on creating slow connections. The `client_body_timeout`and `client_header_timeout` are set for both directives to 60 seconds as default value. If you use my nginx.conf from above, it will starve to death.

<p align="center">
<img src="/images/slowloris.png">
</p>

Therefor we can enhance either the nginx.conf or enhance the nginx annotation for the Ingress object by setting a more suiteable value to close slow connections:

```bash
server {
    client_body_timeout 5s;
    client_header_timeout 5s;
    # ...
}
```

### What else can we do?

* Mitigate [XSS](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
* Mitigate [DDoS-Attacks](https://www.nginx.com/blog/mitigating-ddos-attacks-with-nginx-and-nginx-plus/)
* Use 42.zip to create a tarpit for crawlers. Simply stream 42.zip if strange requests are sent
* ...many more things :) ...

Will implement more when I got some freetime for this :)

<p align="center">
<img src="/images/c3po-madness.gif">
</p>
