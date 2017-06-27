---
layout: post
title: APIdays Paris - From Philosophy to Technology and back again
subtitle: A biased report from APIdays Global in Paris
category: dev
tags: [conference, api, development]
author: Martin Danielsson
author_email: martin.danielsson@haufe-lexware.com 
header-img: "images/new/Exportiert_18.jpg"
---

Having just recently come home again from the [APIdays](http://www.apidays.io) conference in Paris (Dec 8-9th 2015), memories are still quite fresh. It was a crowded event, the first day hosting a whopping 800 API enthusiasts, ranging from the geekiest of the geeks to a fair amount of suited business people, showing that talking about APIs is no longer something just the most avantgardist of companies, the most high tech of the tech companies, spend their time with. *Au contraire* (we were in Paris after all), APIs are mainstream, and they contribute to the advancing of collaboration and automatization of the (digital) world as such.

{:.center}
![Eiffel Tower - Paris]({{ site.url }}/images/2015-12-11-paris-eiffeltower.jpg){:style="margin:auto"}
<small>(Image by Martin Danielsson, [CC BY 4.0 License](https://creativecommons.org/licenses/by/4.0/))</small>

This was also one of the reasons the topic of APIdays was chosen as such: **Automating IT, Business and the whole society with APIs**. The partly non-techy twist of the subtitle to APIdays was also reflected in the sessions: Split into roughly three (or four) categories, you had a choice between real tech stuff, business related sessions and quite a few workshops. In addition to that, the opening and ending keynotes were more kept in a philosophical tone, featuring (in the opening keynote) [Christian Fauré](http://www.christian-faure.net/) and renowned french philosopher [Bernard Stiegler](https://en.wikipedia.org/wiki/Bernard_Stiegler) (in the ending keynote), presenting their takes on digital automation, collaboration and its effects on society, with respect to APIs. Even [Steven Willmott](http://twitter.com/njyx) pulled off a rather non-techy talk, and even non-businessy talk, rather unusual for a CEO of one of the big players in API space ([3scale](http://www.3scale.net)).

### API Philosophy

In their talks, both Fauré and Stiegler were talking about the effects of automation on society, but both with quite contradicting base sentiments, even if the message - in the end - seems similar. But more on that later.

Fauré's topic was "Automation in the 21st century", and the fear of many people that software/robots/automated processes replace humans in tasks which were previously accomplished manually, the simple fear of becoming superfluous. This is what he calls *Opposition* to the automation in society, and it is our main task to instead encourage a culture of *Composition* in order to leverage the good, and focus on the capabilities to be creative (and yes, he included a sidekick to [Peter Drucker](https://en.wikipedia.org/wiki/Peter_Drucker)'s "Culture eats strategy for breakfast" quote). This is where he sees the realm of APIs: As an area of creativity. Composing APIs to create value in ways we have not thought of before.

> Designing an API is an act of creativity.
> <hr> 
> <small>Christian Fauré ([@ChristianFaure](https://twitter.com/ChristianFaure))</small>

This act of composition is creativity, as well as designing an API is an act of creativity. Good APIs take time to design, APIs which encourage creative use of them even more so. Fauré also stresses that even with enhanced tooling (and we're just seeing the first big wave of API management and development tools yet), the actual designing of the API is still where the main work lies, or, at least the main lever.

> API management solutions have great benefits, but you still cannot switch your brain off!
> <hr>
> <small>Christian Fauré ([@ChristianFaure](https://twitter.com/ChristianFaure))</small>

Growing ground for such creativity lies for Fauré in the "Hacking Culture". Try out things, be creative, and use APIs as a means to bring your ideas into reality faster and simpler.

Steven Willmotts ([@njyx](http://twitter.com/njyx)) main message in the session ([slides](http://www.slideshare.net/3scale/apis-and-the-creation-of-wealth-in-the-digital-economy-apidays-paris-2015-keynote)) following Christian Faurés gives the idea of enabling creativity a new spin, but still points in a similar direction: As of now, APIs are still a technical topic. You need to be a developer to be able to really leverage the functionality (see also [twilio's](http://www.twilio.com) billboard ad campaing, e.g. [here](https://twitter.com/ctava1/status/608451693110550529)). Steven thinks the "next big thing" in API space will be enabling business users to interact more easily with APIs, without needing fundamental engineering skills. Or, as he put it:

> I want to buy my flowers from a florist, not from an engineer!
> <hr>
> <small>Steven Willmott ([@njyx](http://twitter.com/njyx))</small>

The last but not least session of APIdays was to be by [Bernard Stiegler](https://en.wikipedia.org/wiki/Bernard_Stiegler); drawing a lot from his book "Automatic Society" ([*La Société Automatique*](http://www.amazon.fr/La-Soci%C3%A9t%C3%A9-automatique-Lavenir-travail/dp/2213685657), not yet available in english), he was also talking about the need to create new jobs out of automation. His claim is that a closed system, in which automation does not generate value and new opportunities, is doomed to self-destruction by *entropy*. Only a living system, allowing for biological processes (read: life, or life-like organisms), can survive. This is a main reason he sees automation not only as a positive aspect, but also highly critical: Automating to free up time only makes sense if the free time is used in a sensible way. And no, Facebook is not, according to Stiegler. The search for opportunities to create *disentropy* (as the opposite of entropy) has to be what human kind has to pursue, albeit the road there is not clear.

### API Technology

This blog post may until now have given the impression I attended a philosophy conference, which was of course not the case. It set an interesting frame to the conference though, opening up a new view on a topic which tended to be extremely techy until now.

Many of the more technical talks dealt with the usual suspects [Microservices and DevOps](https://haufe-lexware.github.io/microservices-devopscon/), as being an integral part of the API economy and architecture style. Some were very enthusiastic, some, such as [Ori Pekelman](http://platform.sh) have had enough of it, tooting in our Elias' horn, saying it's no news, and he can't stand seeing "unicorns farting containers into microservice heaven" anymore. He had a quite drastic slide accompanying that one (yes, it's an actual quote), but I wasn't quick enough with the camera.

The return to more serious topics, *Hypermedia* was an astonishingly big topic at the conference. Not that it's not a seriously good idea, but now adoption seems to find its way into real world scenarios, with practical and working specifications popping up, which are being adopted at an increasing rate. As Hypermedia leaves the state of a research topic (see below picture on [HATEOAS](https://en.wikipedia.org/wiki/HATEOAS) - Bless you!) and is actually being used.

{:.center}
![HATEOAS - Bless you!]({{ site.url }}/images/2015-12-11-hateoas.jpg){:style="margin:auto"}
<small>(Courtesy of [CommitStrip](http://www.commitstrip.com/en/2015/12/03/apiception/))</small>

Many people are perhaps scared of the seemingly intransparent topic, but there are a lot of really good use cases for hypermedia. Jason Harmon of PayPal/Braintree ([@jharmn](http://twitter.com/jharmn)) pointed to some of the most prominent ones in his talk:

* Paging links inside result sets (*first*, *last*, *previous*, *next*)
* Actions and permissions on actions: If an action is contained within the result, it's allowed, otherwise it isn't
* Self links for caching and refreshing purposes (you know where the result came from)

Adopting Hypermedia techniques for these use cases can help doing the heavy lifting of doing e.g. paging for all clients at once, as opposed to forcing each client to find its own pattern of implementation. The adoption of hypermedia techniques is also due to the existance of (more or less) pragmatic specifications, such as

* [HAL](http://stateless.co/hal_specification.html) (actually [Mike Kelly](http://stateless.co) also attended APIdays)
* [JSON-LD](http://json-ld.org) ([Elf Pavlik](https://twitter.com/elfpavlik) also attended APIdays)
* [Collection+JSON](http://amundsen.com/media-types/collection) ([Mike Amundsen](http://amundsen.com))
* [SIREN](https://github.com/kevinswiber/siren) (by [Kevin Swiber](https://github.com/kevinswiber))

But, to reiterate the theme of "no actual news":

> Hypermedia is actually already in Fielding's dissertation on REST, if you read until the end.
> <hr>
> <small>Benjamin Young ([@BigBlueHat](http://twitter.com/BigBlueHat)), organizer of [RESTFest](http://www.restfest.org)</small>

In order to keep this blog post not exceedingly long (I bet nobody's reading this far anyway), I'll just mention a couple of the more interesting topics I had the pleasure to check out in one or more sessions:

* [RDF and SPARQL](http://www.w3.org/TR/rdf-sparql-query/) seems to get adopted more and more; new interesting techniques to offload work to clients make scaling easier (support only simpler queries, not full SPARQL language, let clients assemble results): Ruben Verborgh ([@rubenverborgh](https://twitter.com/rubenverborgh)) - [Slides](http://www.slideshare.net/RubenVerborgh/hypermedia-apis-that-make-sense).
* [Graph/QL](https://facebook.github.io/graphql/) looks very promising in terms of providing a very flexible querying language which claims to be backend agnostic (have to check that out in more detail, despite it being by Facebook): [Slides](http://www.slideshare.net/yann_s/introduction-to-graphql-at-api-days)

### API Hackday

Despite being tempted by a packed agenda of talks on the second day, I chose to participate in the "mini RESTFest" which was organized at the conference venue. Darrel Miller ([@darrell_miller](http://twitter.com/darrel_miller)) of Microsoft (yes, that Microsoft) and Benjamin Young ([@BigBlueHat](http://twitter.com/BugBlueHat)) did a great job in organizing and taming the different opinions which gathered in the hackday space on the second floor of the [*Tapis Rouge*](http://www.tapisrouge.fr/).

The scene setting was in short the following: Starting with a RFC style definition of a "Conference Talk Proposal" media type which was conceived by Darrel, what can we do with that?

I *think* Darrel had a master plan of creating something quite lightweight to be able to have an iCal or vCard corresponding transfer media type for conference sessions, but boy, did discussions come up on this. We had [Elf Pavlik](https://twitter.com/elfpavlik) taking part, bringing a lot of ideas into play regarding Hypermedia and JSON-LD. Additionally, [Paul Chavard](https://github.com/tchak) from Captain Train participated in the lively discussion. Darrel did explicitly not want to *boil the ocean* by adopting some larger scale specification like JSON-LD, but he wanted something lean and well specified to make adoption of the media type simple. After a good while, we *sort of* agreed on something inbetween...

In the end, we did finish a couple of presentable things, such as a translator of the format into JSON-LD (guess who implemented that?), a cool Jekyll template for displaying the proposals on a static website (by Shelby Switzer, [@switzerly](https://twitter.com/switzerly)). My own contribution was to create a [JSON schema](http://json-schema.org/) matching the media type, and implementing an HTML form using [Jeremy Dorn](https://github.com/jdorn)'s quite cool [JSON Editor component](https://github.com/jdorn/json-editor).

The results (and possibly also further proceedings with this) can be viewed on [RESTFests github repository](https://github.com/RESTFest/2015-apidays-conference-talk-api); some of the results are still in the branches.

### Conclusion

I had a good time at the APIdays; the sessions had overall good quality, and the audience was fantastic. I had a lot of opportunities to meet people I knew, and even more important, people I did not yet know. I would definitely recommend going there again.

{:.center}
![APIdays]({{ site.url }}/images/2015-12-11-apidays-logo.png){:style="margin:auto"}
<small>[APIdays](http://www.apidays.io)</small>
