---
layout: post
title: Salesforce Custom Lightning Component and Community Builder
---

If you ever used Community Builder and Salesforce Communities you probably noticed, the list of components is very limited. How can 
I extend this to do more? Well I wondered that too and found building your own Lightniung Components to customize Community is one 
way to do that. Here lets see how we can add new component so that it is usable in Community builder. (shown below).

![Community Builder]({{ site.baseurl }}/images/cbuilder.png)

One of my projects I needed to show a simple link button to navigate to external web site, easy enough right. I could not find such a component on the list. Only way I could do it with adding new menu item, ok but my design called for a button in front-center. I decided to build new component to add this feature. First we need to build new component using Developer console its simple enough created new component MyLinkButton. Next component needs to be visible to Community Builder, need to add implements="forceCommunity:availableForAllPageTypes" and make it available global, here is code for that


```
<aura:component implements="forceCommunity:availableForAllPageTypes" access="global">
```

Next add attribute so we can let user edit the URL for navigation and set anchor tag, simple the full code look like this


```
<aura:component implements="forceCommunity:availableForAllPageTypes" access="global">
    <aura:attribute name="url" type="String" default="http://www.google.com" access="global" />
    <a href="{!v.url}">
        Start Something
    </a>
</aura:component>
```

Save this component and try in Community Builder. Still do not see my new component because it is not complete. We need to add a design time part to our component for Builder to know what to do in design time. Open Design section in Developer Console and add URL attribute same as our component, that way we can set this URL from Community Builder on property panel at design time.

![Design Component]({{ site.baseurl }}/images/designcomponent.png)

```
<design:component>
    <design:attribute name="url" label="URL" />
</design:component>
```

Now if we want to go further we can add SVG icon representing our new component, for now lets leave that default.
That is it, save component and go to Community Builder and now we can see our new component under the Page Editor section Custom Components. MyLinkButton with default Lightning icon is available for use in the community. 

![Page Editor]({{ site.baseurl }}/images/pageeditor.png)

Drag this component to community page and we can now set its property URL to navigate to our web site. Ready to publish these changes and preview this community page. Now we have a reusable URL button to use with Community Builder. That is good but we likely want to use our components across multiuple apps, make them reusable in S1 or AppBuilder not just Community Builder. Lightning provides a way to do that via interfaces that your custom component implements. To expose our link button component to AppBuilder we need to implement new interface like this code does.

```
<aura:component implements="forceCommunity:availableForAllPageTypes,flexipage:availableForAllPageTypes" access="global">
```
And now lets open App Builder and we will see our custom MyLinkButton component.

![App Builder]({{ site.baseurl }}/images/appbuilder.png)

You can see how the same component can be reused in Community Builder as well as App Builder by adding interface implementation tags. Lightning has several standard interafces to support different design time tools and run time environments.

```
flexipage:availableForAllPageTypes      - support for App Builder
forceCommunity:availableForAllPageTypes - support for Community Builder
force:appHostable                       - exposing component to Salesforce 1 app
```

That gives us some ideas on how to use basic templates with Community Builder together with custom lightning components and clever CSS can be used to deliver really powerful content based in Salesforce.com platform.
