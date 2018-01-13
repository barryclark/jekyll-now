So I have two applications that I would like to host in my docker environment and I want them both to be accessible to the outside world, with different DNS Records, and served over https with SSL Certificates from LetsEncrypt.

### How do I accomplish this easily and quickly?

Well this is actually a very simple task to complete thanks to a couple of existing docker images that have been created.

* [jwilder/nginx-proxy]("https://hub.docker.com/r/jwilder/nginx-proxy/")
   
   This image uses nginx to automatically publish your selected services/containers to the outside world.

* [jrcs/letsencrypt-nginx-proxy-companion]("https://hub.docker.com/r/jrcs/letsencrypt-nginx-proxy-companion/")

   This image runs a container with a LetsEncrypt Service that automatically creates/renews SSL Certificates for your selected services/containers.

## Using Nginx to proxy traffic

First of all I will start off by adding my first application that I want to publish, to my docker-compose file.
```yaml
version: '3'
services:
    my-first-app:
        image: "myrepo/myfirstapp"
        container_name: "my-first-app"
        restart: always
```

As **my-first-app** is a web application that listens on port 8080, I want this to be published to the outside world to begin with on port 80, but using the hostname **myfirstapp.example.com**.

Assuming that I have already configured my DNS records for **myfirstapp.example.com** to direct traffic to my docker-engine server, I now need to direct traffic to my container in my docker-engine.

To do this, I need to add a new service which will run the **jwilder/nginx-proxy** docker image. This will be the only docker service that I expose to the outside world directly, and this will proxy/route traffic to the required destination services inside my docker environment.

```yaml
version: '3'
services:
    my-first-app:
        image: "myrepo/myfirstapp"
        container_name: "my-first-app"
        restart: always
    nginx-proxy:
        image: "jwilder/nginx-proxy"
        container_name: "nginx-proxy"
        ports:
            - 80:80
        restart: always
        volumes:
            - /var/run/docker.sock:/tmp/docker.sock:ro
        links:
            - "my-first-app"
        depends_on:
            - "my-first-app"
```

I am almost there, but to automatically expose **my-first-app** to the outside sorld, I need to add a couple of Environment Variables to **my-first-app** so that the **nginx-proxy** service knows how to route traffic to it. These are `VIRTUAL_HOST` and `VIRTUAL_PORT`.

You aren't required to specify the `VIRTUAL_PORT` unless you need to route to a port other than the standard HTTP port 80. For me I want to route to 8080, so I need to spedicy this Environment Variable.

```yaml
version: '3'
services:
    my-first-app:
        image: "myrepo/myfirstapp"
        container_name: "my-first-app"
        restart: always
        environment:
          - VIRTUAL_HOST=myfirstapp.example.com
          - VIRTUAL_PORT=8080
    nginx-proxy:
        image: "jwilder/nginx-proxy"
        container_name: "nginx-proxy"
        ports:
            - 80:80
        restart: always
        volumes:
            - /var/run/docker.sock:/tmp/docker.sock:ro
        links:
            - "my-first-app"
        depends_on:
            - "my-first-app"
```

If I now run this docker-compose file with `docker-compose up` this will bring **my-first-app** up first and then bring up the **nginx-proxy** service. The **nginx-proxy** service will find the service **my-first-app**, because of the Environment Variables that have been set, and will now generate an nginx config file that routes traffic from the `VIRTUAL_HOST` to the **my-first-app** service internally using port `VIRTUAL_PORT`.

## Adding a second application to expose

To add further applications that I want to expose is as simple as creating the docker service in the docker-compose and adding the required `VIRTUAL_HOST` and `VIRTUAL_PORT` Environment Variables to the defintion.

I have a second application, again also listening on port 8080, that I want to also expose, this time to **mysecondapp.example.com**.

```yaml
version: '3'
services:
    my-first-app:
        image: "myrepo/myfirstapp"
        container_name: "my-first-app"
        restart: always
        environment:
          - VIRTUAL_HOST=myfirstapp.example.com
          - VIRTUAL_PORT=8080
    my-second-app:
        image: "myrepo/mysecondapp"
        container_name: "my-second-app"
        restart: always
        environment:
          - VIRTUAL_HOST=mysecondapp.example.com
          - VIRTUAL_PORT=8080
    nginx-proxy:
        image: "jwilder/nginx-proxy"
        container_name: "nginx-proxy"
        ports:
            - 80:80
        restart: always
        volumes:
            - /var/run/docker.sock:/tmp/docker.sock:ro
        links:
            - "my-first-app"
        depends_on:
            - "my-first-app"
```

When I run `docker-compose up` with these changes, a new service is created for **my-second-app** and the **nginx-proxy** will generate a new nginx config file with a definition for both **my-first-app** and **my-second-app** services routing based on **myfirstapp.example.com** and **my-second-app.example.com** hostnames.

## Adding LetsEncrypt

Now that I can successfully route traffic through the **nginx-proxy** service, I want to add SSL Certificates using the LetsEncrypt Service.

I am assuming that you know what the LetsEncrypt Service is and how it works, but if you would like more information, you can visit the [LetsEncrypt Website]("https://letsencrypt.org/").

The second docker image I mentioned earlier in this post, **jrcs/letsencrypt-nginx-proxy-companion**, works directly alongside the **jwilder/nginx-proxy** image to generate SSL Certificates for services I have added the Environment Variables `LETSECRYPT_HOST` and `LETSENCRYPT_EMAIL` to.

This service will initially create new SSL Certificates and modify the nginx config file to add the new certificates and perform http -> https 301 redirects.

As LetsEncrypt Certificates are only valid for 90 days, this service will also peridically check for any Certificates that are due to expire and will automatically renew them.

*It is important to note that the SSL Certificates are terminated at the **nginx-proxy** service and then proxied internally to your internal services over http.*

For this to work I need to share a few directories in my **nginx-proxy** service for a couple of reasons.
1. Generated Certificates can be added to the **nginx-proxy** service.
3. ACME Challenge files, which are required to be accessible from the outside world for Certficates to be generated successfully, can be added to the **nginx-proxy** service.

I also need to modify my **nginx-proxy** service to expose the https port 443 so that I can accept the https traffic.

I can then add the new service to run the **letsencrypt-nginx-proxy-companion** image.

Finally, like I did for the **nginx-proxy** routing steps, I need to add my `LETSENCRYPT_HOST` and `LETSENCRYPT_EMAIL` Environment Variables to my services that I want to add certificates to.

```yaml
version: '3'
services:
    my-first-app:
        image: "myrepo/myfirstapp"
        container_name: "my-first-app"
        restart: always
        environment:
            - VIRTUAL_HOST=myfirstapp.example.com
            - VIRTUAL_PORT=8080
            - LETSENCRYPT_HOST=myfirstapp.example.com
            - LETSENCRYPT_EMAIL=me@example.com
    my-second-app:
        image: "myrepo/mysecondapp"
        container_name: "my-second-app"
        restart: always
        environment:
            - VIRTUAL_HOST=mysecondapp.example.com
            - VIRTUAL_PORT=8080
            - LETSENCRYPT_HOST=mysecondapp.example.com
            - LETSENCRYPT_EMAIL=me@example.com
    nginx-proxy:
        image: "jwilder/nginx-proxy"
        labels:
            com.github.jrcs.letsencrypt_nginx_proxy_companion.nginx_proxy: "true"
        container_name: "nginx-proxy"
        ports:
            - 80:80
            - 443:443
        restart: always
        volumes:
            - /var/run/docker.sock:/tmp/docker.sock:ro
            - nginx-certs:/etc/nginx/certs:ro
            - nginx-vhost:/etc/nginx/vhost.d
            - nginx-html:/usr/share/nginx/html
        links:
            - "my-first-app"
            - "my-second-app"
        depends_on:
            - "my-first-app"
            - "my-second-app"
    letsencrypt:
        image: "jrcs/letsencrypt-nginx-proxy-companion"
        container_name: "nginx-letsencrypt"
        restart: always
        volumes:
            - /var/run/docker.sock:/var/run/docker.sock:ro
            - nginx-certs:/etc/nginx/certs
            - nginx-vhost:/etc/nginx/vhost.d
            - nginx-html:/usr/share/nginx/html
        links:
            - "nginx-proxy"
        depends_on:
            - "nginx-proxy"
volumes:
    nginx-certs:
    nginx-html:
    nginx-vhost:
```

When I run `docker-compose up`, a new service is created using the **letsencrypt-nginx-proxy-companion** image and certificates are initially created for **my-first-app** and **my-second-app** because I have added `LETSENCRYPT_HOST` and `LETSENCRYPT_EMAIL` Environment Variables to them.

**Notes**
* `LETSENCRYPT_HOST` should be the same as `VIRTUAL_HOST`.
* `LETSECRYPT_EMAIL` should be a valid email address that you own.
* You can also add multiple hosts in both `VIRTUAL_HOST` and `LETSENCRYPT_HOST` by comma separating. For example. `LETSENCRYPT_HOST=myfirstapp.example.com,anotherdns.example.com`

Now both of my apps are available at `https://myfirstapp.example.com` and `https://mysecondapp.example.com`.

## Rate Limits
There are rate limits on the LetsEncrypt Service ([More Information]("https://letsencrypt.org/docs/rate-limits/")). If you are attempting to get up and running, you may hit the rate limits, so a handy tip is to use the LetsEncrypt Staging Servers to generate Test Ceretificates while you are testing the setup.

To use the LetsEncrypt staging servers, just add the Environment Variable `ACME_CA_URI=https://acme-staging.api.letsencrypt.org/directory` to the **LetsEncrypt** service.

When you have this Environment Variable set, certificates can be generated as often as you like and will work but are not trusted by browsers.

Once you are successfully set up and generating certificates, just remove the `ACME_CA_URI` Environment Variable. This will cause the LetsEncrypt service to restart and generate real certificates.

## Further Information
* [LetsEncrypt]("https://letsencrypt.org")
* [Nginx]("https://www.nginx.com/")
* [jwilder/nginx-proxy (github)]("https://github.com/jwilder/nginx-proxy")
* [jwilder/nginx-proxy (docker)]("https://hub.docker.com/r/jwilder/nginx-proxy/")
* [jrcs/letsencrypt-nginx-proxy-companion (github)]("https://github.com/JrCs/docker-letsencrypt-nginx-proxy-companion")
* [jrcs/letsencrypt-nginx-proxy-companion (docker)]("https://hub.docker.com/r/jrcs/letsencrypt-nginx-proxy-companion/")