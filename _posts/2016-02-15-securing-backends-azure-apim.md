---
layout: post
title: Securing Backend Services behind Azure API Management
subtitle: Different approaches to securing API implementations
category: dev
tags: [howto, security, cloud, api]
author: Martin Danielsson
author_email: martin.danielsson@haufe-lexware.com
header-img: "images/new/Exportiert_58.jpg"
---

We are currently planning our first round of published APIs, and in the course of this process, we obviously had to ask ourselves how we can secure our backend services which we will surface using [Azure API Management](https://azure.microsoft.com/en-us/services/api-management/). This may sound like a trivial problem, but it turns out it actually isn't. This blog post will show the different options you have (or don't) using Azure API Management as a front end to your APIs.

### The problem

A key property of the Azure API Management solution is that it is not possible to deploy the APIm instance to some sort of pre-defined virtual network. The Azure APIm instance will always reside in its own "cloudapp" kind of virtual machine, and you can only select which region it is to run in (e.g. "North Europe" or "East US").

As an effect, you will always have to talk to your backend services via a public IP address (except in the VPN case, see below). You can't simply deploy APIm and your backend services together within a virtual network and only open up a route over port 443 to your APIm instance. This means it is normally possible to also talk "directly" to your backend service, which is something you do not want. You will always want consumers to go over API Management to be able to use the APIm security/throttling/analytics on the traffic. Thus, we have to look at different approaches how to secure your backend services from direct access.

We will check out the following possibilities:

* Security by obscurity
* Basic Auth
* Mutual SSL
* Virtual Networks and Network Security Groups
* VPNs

What is not part of this blog post is how you also can use OAuth related techniques to secure backend services. Focus of this article is how to technically secure the backends, not using means such as OAuth.


### Security by obscurity

For some very non-critical backend services running in the same Azure region (and only in those cases), it may be enough to secure the backend via obscurity; some have suggested that it can be enough to check for the `Ocp-Apim-Subscription-Key` header which will by default be passed on from the client via the API gateway to the backend service (unless you filter it out via some policy).

This is quite obviously not by any security standards actually secure, but it may rule out the occasional nosy port scan by returning a 401 or similar.
Other variants of this could be to add a second header to the backend call, using an additional secret key which tells the backend service that it is actually Azure APIm calling the service. The drawbacks of this are quite obvious:

* You have to implement the header check in your backend service
* You have a shared secret between Azure APIm and your backend service (you have coupled them)
* The secret has to be deployed to both Azure APIm and your backend service
* It is only secure if the connection between Azure APIm and the backend service is using https transport (TLS)

### Basic Auth

The second variant of "Security by obscurity" is actually equivalent to using Basic Authentication between Azure APIm and your backend service. Support for Basic Auth is though implemented into Azure APIm directly, so that you do not have to create a custom policy which inserts the custom header into the backend communication. Azure APIm can automatically add the `Authorization: Basic ...` header to the backend call.

Once more, the very same drawbacks apply as for the above case:

* You have to implement the Basic Auth in the backend (some backends do have explicit support for this, so it may be easy)
* You have a shared secret between the APIm and the backend
* If you are not using `https` (TLS), this is not by any means actually secure

### Mutual SSL

One step up from Basic Auth and Security by Obscurity is to use Mutual SSL between Azure APIm and the backend. This also is directly supported by Azure APIm, so that you "only" have to upload the client certificate to use for communication with the backend service, and then check the certificate in the backend. In this case, using a self-signed certificate will work. I tested it using [this blog post with nginx](https://pravka.net/nginx-mutual-auth). The only thing that had to be done additionally was to create PFX client certificate using `openssl`, as Azure APIm only will accept PFX certificates.

Checking the certificate in the backend can be simple or challenging, depending on which kind of backend service your are using:

* nginx: See above link to the tutorial on how to verify the client certificate; SSL termination with nginx is probably quite a good idea
* Apache web server also directly supports Client Certificate verification
* Spring Boot: Intended way of securing the service, see e.g. [Spring Boot Security Reference (v4.0.4)](http://docs.spring.io/spring-security/site/docs/4.0.4.CI-SNAPSHOT/reference/htmlsingle/#x509).
* Web API/.NET: Funnily, in the case of .NET applications, verifying a client certificate is quite challenging. There are various tutorials on how to do this, but unfortunately I don't like any of them particularly:
  * [Suggestion from 'Designing evolvable Web APIs using ASP.NET'](http://chimera.labs.oreilly.com/books/1234000001708/ch15.html#example_ch15_cert_handler)
  * [How to use mutual certificates with Azure API Management](https://azure.microsoft.com/en-us/documentation/articles/api-management-howto-mutual-certificates/)
  * [Azure App Services - How to configure TLS Mutual Authentication](https://azure.microsoft.com/en-us/documentation/articles/app-service-web-configure-tls-mutual-auth/)
* For node.js and similiar, I would suggest using nginx for SSL termination (as a reverse proxy in front of node)

All in all, using mutual SSL is a valid approach to securing your backend; it offers real security. It will still be possible to flood the network interface with requests (which will be rejected immediately due to the SSL certificate mismatch), and thus could and possibly should be combined with the below method additionally.

I am waiting for simpler solutions of doing this directly in Azure, but currently you can't decouple it from your API implementation.

### Virtual Networks and Network Security Groups

In case your backend service runs in an Azure VM (deployed using ARM, Azure Resource Manager), you can make use of the built in firewall, the Network Security Groups. As of the Standard Tier (which is the "cheapest" one you are allowed to use in production),  your Azure APIm instance will get a static IP; this IP in turn you can use to define a NSG rule to only allow traffic from that specific IP address (the APIm Gateway) to go through the NSG. All other traffic will be silently discarded.

As mentioned above, it's unfortunately not (yet) possible to add an Azure APIm instance to a virtual network (and thus put it inside an ARM NSG), but you can still restrict traffic into the NSG by doing IP address filtering.
The following whitepaper suggests that Azure virtual networks are additionally safeguarded against IP spoofing: [Azure Network Security Whitepaper](http://download.microsoft.com/download/4/3/9/43902ec9-410e-4875-8800-0788be146a3d/windows%20azure%20network%20security%20whitepaper%20-%20final.docx).

This means that if you create an NSG rule which only allows the APIm gateway to enter the virtual network, most attack vectors are already eliminated by the firewall: Azure filters out IP spoofed packages coming from outside Azure when they enter the Azure network, and additionally they will inspect packages from inside Azure to validate they actually origin from the IP address they claim to do. Combined with Mutual SSL, this should render sufficient backend service protection,

* On a security level, making sure only APIm can call the backend service, and
* On a DDoS prevention level, making sure that the backend service cannot be flooded with calls, even if they are immediately rejected

#### Azure Web Apps and Virtual Networks

Using standard Web Apps/API Apps (the PaaS approach in Azure), it is not possible to add those services to a virtual network. This in turn makes the above method of securing the backend services moot. There are workarounds for this, which let you combine the advantages of using Web Apps and the possibility to put the hosting environment of such Web Apps inside a virtual networks, and that's called [App Service Environments](https://azure.microsoft.com/en-us/documentation/articles/app-service-app-service-environment-intro). In short, an App Service Environment is a set of dedicated virtual machines deployed into a specific virtual networks which is only used by your own organization to deploy Web Apps/API Apps into. You have to deploy at least four virtual machines for use with the App Env (two front ends and two worker machines), and these are the costs that you actually pay. In return, you can deploy into a virtual network, and additionally you can be sure that you get the power you pay for, as nobody else will be using the same machines.

### VPNs

As a last possibility to secure the backend services, it is possible to create a VPN connection from a "classic" virtual network to the APIm instance. By doing so, you can connect the APIm instance directly to a closed subnet/virtual network, just as you would expect it to be possible using Azure Resource Manager virtual networks.

This approach has the following severe limitations which render it difficult to use as the "go to solution" it sounds like it is:

* Connecting VPNs to Azure APIm only works when using the Premium Tier, priced well over 2500€ per month; this is difficult to motivate in many cases, given that producing 5 TB of traffic per month is not something which will happen immediately
* Only Azure Service Manager ("Classic") virtual networks can be used for this, not the more recent Azure Resource Manager virtual networks
* In order to build up a VPN connection, you will need a Gateway virtual appliance inside your virtual network, which also comes at an additional cost (around 70€/month).
* You can't use VPN connections cross-region; if your APIm resides in West Europe, you can only connect to VNs in West Europe.

In theory, it would even be possible to first [bridge an ARM virtual network to a classic virtual network](https://azure.microsoft.com/en-us/documentation/articles/virtual-networks-arm-asm-s2s/), and then in turn use that VN and an additional Gateway appliance to connect to APIm, but this setup gives me bad dreams.

### Conclusion and Recommendation

For critical backend services, use a combination of

* Mutual SSL
* Inbound NSG rules limiting traffic to the Azure APIm IP address

In case need to use Web Apps/API Apps, consider provisioning an App Environment which you can deploy into a virtual network, and then in turn use the NSG (as suggested above).

For less critical backend services (such as read-only APIs), choosing the NSG rule option only may also be a lightweight and easy to implement option. The only prerequisites for this are:

* Your backend service runs inside an Azure Resource Manager Virtual Network
* ... in the same region as your APIm instance

If you have further suggestions and/or corrections, please feel free to comment below.