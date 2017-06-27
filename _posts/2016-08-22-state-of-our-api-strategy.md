---
layout: post
title: The state of our API Strategy
subtitle: From a response to a sales call by an API Management vendor.
category: dev
tags: [api, cto, development]
author: Holger Reinhardt
author_email: holger.reinhardt@haufe-lexware.com 
header-img: "images/new/Exportiert_51.jpg"
---

This is a (slightly adapted) version of a response to a sales enquiry of an API Management vendor. We had contacted them a year ago but the sales lead back then felt that our focus on 'just enough API management' was too narrow and not addressing the larger needs (and bigger deal) of the 'Digital Transformation' of the Haufe Group.

I am sure that sales person would have been more than happy to help us find out exactly what transformational impact his entire product portfolio would have been on our enterprise architecture if we had just let him (which we did not).

*Disclaimer: I know personally some of the key folks working at this vendor and I have nothing but the highest respect for what they are building. So this exchange does not try to show disrepect to their product and team, but rather illustrate how not going beyond the sales script can sometimes lead to unintended consequences.*

---

Dear XXX

Yes, indeed a year has passed. Well, back then you guys kind of blew it when your sales lead insisted on discussing an entire enterprise transformation strategy and our distributed API-first architecture and planned budget wasn’t quite in your general (deal) ballpark. Since our Technology Strategy for the Haufe Group calls for being [like the web and not behind the web](http://martinfowler.com/articles/microservices.html) your commercial model apparently made it quite a bit difficult to engage on such a small scale.

But I was delighted to see your most recent enterprise architecture white papers closely tracking our Technology Strategy. I think it fully validates our approach to provide decentralized API management based on the basis of a bounded (business) context (Conway's law applies to API Management too).

In the meantime we have settled on [Mashape's Kong](https://github.com/Mashape/kong) and our [own API Mgmt Portal](http://wicked.haufe.io) (one developer fulltime for 3 months) for our internal API deployments. I think you will find our portal to approach API Management from quite a different perspective than most traditional API Mgmt vendors - it fully embraces `infrastructure as code` and `immutable servers`. In our opinion it simply doesn’t make any sense to (re)introduce long running API gateway and portal servers to manage and service API’s from Microservices, which are deployed fully automated through our CI/CD pipeline. We like to think that this brings us closer to the concept of [APIOps](http://www.slideshare.net/jmusser/why-api-ops-is-the-next-wave-of-devops-62440606) - applying the same basic concepts of DevOps but to API operations.

You can find more details at <http://wicked.haufe.io>.

On the design governance side we also progressed rather nicely.  You might find our [API Styleguide](https://github.com/Haufe-Lexware/api-style-guide) of interest - I think it represents some of the best best practices from the industry. We are planning to use [Gitbook](https://www.gitbook.com) or [ReadTheDocs](https://readthedocs.org) to publish it in a better e-book style format. We took a lot of inspiration from the [Zalando API Styleguide](http://zalando.github.io/restful-api-guidelines/).

The one remaining missing piece in our API story is an API registry. But again I am not looking for a repeat of the fallacy of a centralized UDDI or WSRR registry, but taking the Web as example and working something along <http://apis.io> (Source code available at <https://github.com/apisio/apis.io>). Central registries never worked, but Google does. Hence an API search engine with a choice or combination of

 * a single git repo (containing API definitions) supporting pull requests and/or
 * the ability to register commit web hooks to many git repo’s (each representing one or more API definitions) and/or 
 * an active crawler which actively looks for new API definitions (similar to [ATOM Pub service document](http://bitworking.org/projects/atom/rfc5023.html#find-collections) at the root or a well known location of the service URL)

will do. I found [Zalando's API Discovery](http://zalando.github.io/restful-api-guidelines/api-discovery/ApiDiscovery.html) strategy to be very inspiring, but we might start with a Repo-based approach to learn and iterate.

I am still looking for contributors for that last piece of our API strategy to fall in place. But based on the already existing work in <http://apis.io> from [3Scale](https://www.3scale.net) and the [API Evangelist](http://apievangelist.com) I think we are not that far off from where we need to be .. and if necessary we will develop the missing functionality and provide it as open source to the community.

I hope this gives you a good overview over the current status of the API piece in our Technology Strategy. You can follow us at [@HaufeDev](https://twitter.com/haufedev) or find up to date information on our [Developer Blog](http://dev.haufe-lexware.com). We are tentatively planning to make an announcement of our API portal in the September time frame. 

BTW our API Portal is written such that it can be placed on top of other API Gateways. So if you (or another vendor) are interested in trying it out to make it work for your API gateway, ping us.

Cheers, 
Holger (CTO – Haufe.Group)

---

While this blog post was largely sponteneous, our offer to provide the API Management Portal as Open Source to API Gateway vendors is serious. 

Our industry has benefited greatly from the openness and sharing of knowledge not just within the API community but also through the commercial sponsorship of API Management vendors like [Mulesoft](https://www.mulesoft.com), [Layer7](http://www.ca.com/us/products/api-management.html), [Apigee](http://apigee.com), [3Scale](https://www.3scale.net) and many others. (Disclosure: I am a former member of the Layer7 sponsored [API Academy](http://www.apiacademy.co))

---

PS: If you are like me you might be curious why we called our API Portal `wicked` - well we first had a different name but the Mashape folks asked us to change it as to not confuse it with their commercial offerings. Since Mashape has been very supportive and also provided Kong as Open Source, we felt that we owed them. We then thought of our goal to povide `wicked (good) APIops` and hence the name `Wicked` was born. It helps that it is also a play on [Wicket](http://www.thefreedictionary.com/wicket) as in "..1. A small door or gate, especially one built into or near a larger one. .."
