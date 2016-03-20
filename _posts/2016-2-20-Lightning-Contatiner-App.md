---
layout: post
title: Salesforce Lightning App Container
---

Working with Salesforce we often see a need to integrate external apps into Salesforce 1 mobile app or regular Admin console. In this article I will explore how to include a web app through Lightning.

I have the application created with [Lightning Design System](https://www.lightningdesignsystem.com/) and hosted on Heroku. We are going to show how to expose this application to Salesforce 1 mobile app and in Salesforce Lightning tab.

The existing Heroku app built with the [Lighting Design System](https://www.lightningdesignsystem.com/) showing simple page with links and detail cards. This app hosted on Heroku and we will enable our Salesforce users to access this app via tabs on the S1 or inside Salesforce. This application does not require direct data interchange, we focus on Lightning components.

We start by creating a Lightning component, we name it `MyCustomContent`, intended to display our web-app in iframe. This component will only be available to our AppBuilder so we will implement single interface: `flexipage:availableForAllPageTypes`. We will set up a URL attribute that can be set to any web-link we want to show inside our container.

```
<aura:component implements="flexipage:availableForAllPageTypes">
   <aura:attribute name="url" type="String" default="http://www.google.com" access="global" />
	<iframe src="{!v.url}"></iframe>
</aura:component>
```

Now we will add a design time attribute so that we can set this URL in AppBuilder at design time to make it more flexible.

```
<design:component>
    <design:attribute name="url" label="URL" />
</design:component>
```

Now we save our component making sure there are no sytnax errors. We can see that new component `MyCustomContent` now available in App Builder.

![App Builder]({{ site.baseurl }}/images/abuilder.png)

Next step to create a Lightning app with the AppBuilder and set web app URL to Heroku. The Lightning app will show as a tab for Salesforce and S1 users.






