---
layout: post
title: OpenShift - Golden Snitch
---

Ever wondered who is eating your headers, requests or responses, or even thought about snitching an application? With this tiny tool you can simply achieve this. 

### How does this work?

To understand the magic, let's take a look inside the spell book:

<p align="center">
<img width="600" src="images/snitch-architecture.png">
</p>

On OpenShift there is a fancy [feature](https://docs.openshift.com/container-platform/4.9/security/certificates/service-serving-certificate.html) that allows you to serve a certificate as a secret as long as a service is defined. This certificate is trusted and created by your cluster. This helps us to break up the HTTPS connection between the Route and the vicitims application. Either the application nor the muggels who are calling the application will know that you're watching their traffic.

Additional the golden snitch is a proxy we can capture the incoming traffic and redirect it to the victim application. In that way the golden snitch will be less invasive and can be opted in and out with ease.


### Disclaimer
> **I'm not responsible for any harm caused by this tool. Also the nginx might leak some headers and info, for a well trained admin it shouldn't be a big deal to silence it. For script kiddies > sorry :) **
