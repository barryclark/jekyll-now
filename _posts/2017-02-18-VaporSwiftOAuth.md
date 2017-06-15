---
layout: post
title: Swift, Vapor, OAuth to Salesforce
---
![Vapor]({{ site.baseurl }}/images/vapor/vapor-droplet.png) ![Swift]({{ site.baseurl }}/images/vapor/swift.png)

In this post we will create OAuth authentication using Swift and Vapor. As any good web app typicaly needs authentication and security. This example will demonstarate how to leverage Salesforce as Identity Provider or short IDP for your Server-Side-Swift app powered by Vapor framework.

I will not try to distill all possible authentication questions and flows here but rather focus on a single UWeb-Server flow used often with web applications to authorize user access via 3rd party auth IDP services. The concepsts I discuss here will also apply to the mobile client apps that can use User-Agent OAuth 2.0 flow to authenticate with external service. For more information I recomend this article, [Digging Deeper into OAuth 2.0 on Force.com](https://developer.salesforce.com/page/Digging_Deeper_into_OAuth_2.0_on_Force.com) 

We will need a Salesforce Developer ORG for this demo, any DEV or Sandbox can be used. Sign up for [free developer edition](https://developer.salesforce.com/signup). We also need to set up Swift and Vapor, as instructed [here](https://vapor.github.io/documentation/getting-started/install-swift-3-macos.html). While writing this article Xcode updated to 8.3 and Swift 3.x it require a Vapor toolbox update/rebuild, you may need to reinstall Vapor & toolbox. Delete Vapor `rm /usr/local/bin/vapor` and reinstall with brew `brew install vapor/tap/vapor`, this [StackOverflow](http://stackoverflow.com/questions/43071458/vapor-toolbox-broken-after-upgrading-swift) was helpful. Once we are set with tools now time to look at what we need to do and picture worth... here is a flow how our web app will work with salesforce.

Salesforce Setup

Create Communinty

Create Connected app

Salesforce Communiy will provide a host mydomain URL that our app will use as gateway to authenticate or regiter users. MyDomain registration will require time to propagate the DNS, when dmain is ready email notification will be set out.
Set up Community for Self Register users we will select Customer Community license for this example. Every Community will also create Force.com site that will host Community.

Connected app will provide a security context for our web app and OAuth configuration.
Relevant parts for this article are
Enableing OAuth, Supported context and Redirect URL. After we enable OAuth setting panel will show config options.

Select Supported Context to have web, 

Redirect URL can be any valid endpoint, in this case we run local Vapor server, our app must respond to this url: `http://localhost:8080/authorized` for local development, for hosted application this url will be different, and we must add this redirect URL to our connected app configuration.

Connected app will generate Consumer Key for the app and consumer secret. We will need both for our server configuration.


Important: This connected app configuration may look like you bind your web app to single Salesofrce organization. No fear this is NOT so, because Salesforce has central IDP system that makes Salesfoce efective Identity and SSO provider. This configuration will allow your app to authenticate with any salesforce Org by using generic entry point URL: login.salesforce.com and your user id/password combination.


In our example we want to access our Community so we use our new Community domain for that.

Vapor App

Lets create a Vapor project

To deploy to Heroku and see our app in action we will need Heroku account (it is free to signup). We will create a new app to deploy.
Heroku provides buildpackas for many languages  automtaically but not yet for Swift. We need to define a custom langauge buildpack for our app, navigate to Settings under Heroku app Dashboard and enter Swift buildpack github URL ```https://github.com/kylef/heroku-buildpack-swift```
For simple deployments I am using a github repository