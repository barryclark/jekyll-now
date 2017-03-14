---
layout: post
title: Swift, Vapor, OAuth to Salesforce
---
![Vapor]({{ site.baseurl }}/images/vapor/vapor-droplet.png) ![Swift]({{ site.baseurl }}/images/vapor/swift.png)

In this post we will create OAuth authentication using Swift and Vapor. As any good web app typicaly needs authentication and security is difficult. This example will demonstarate how to leverage Salesforce as Identity Provider or short IDP for your Server-Side-Swift app powered by Vapor framework.

I will not try to distill all possible authentication questions and flows here but rather focus on a single User-Agent flow used often with web applications to authorize user access via 3rd party auth IDP services. The concepsts I discuss here will also apply to the mobile client apps that need to authenticate with external service.