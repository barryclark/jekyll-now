---
layout: post
title: The modern Data Team & rise of the Citizen Data Analyst
author: matthew_darwin
comments: true
excerpt_separator: <!--more-->
---

Recently, Gartner coined the phrase "Citizen Data Analyst" in order to describe a paradigm shift in the analytics sphere and the role of the data team.  A quick google search for role members within a data team returns such titles as 
data scientist, solution architect, data hygienist, data explorers, data expert, and initiative expert on top of the more traditional roles of data analyst and BI developer.  Given the variety of labels now being applied, and the inclusion of the external "citizen" analyst, how does this bode for the future of the data team itself?

<!--more-->

In the past, from a business perspective, a request for data could be a very laborious process.  The development of a data warehouse was frequently planned in terms of years and it often felt as if a request for the number of sales on any given day equally took years.  The reports that were produced tended to be tabular in format, with rows and rows of data that often blinded the user from gaining any true insight.  If a data element wasn't present in the data warehouse, the process to incorporate it would be added to a waterfall based project, delivered months later, usually by which point, the request was no longer valid anymore.

At this point, the Citizen Data Analyst first appeared (though this phrase hadn't been coined yet) and employed the world's favourite data analysis tool: Excel.  And overnight this happened:-

![Spreadsheet Hell](/images/spreadsheet-hell.jpg)
> So, which sheet tells me how many sales we did?

I have nothing against Excel.  I have a lot against the constant misuse of it (don't get me started on its frequent use as a data transfer tool) which includes the calculations that early Citizen Data Analysts employed.  

![Formulas are great](/images/spreadsheet-calcs.png)

All of the bad stuff we don't want to see was done: averages of averages, rounding errors, utilising figures from disparate sources together to produce results that were simply wrong, and crucially, undermining the output of the data team.  At the same time, it demonstrates a complete failure of the Data Team: if end users were bypassing them, they had failed to deliver analytics as required; end users needed to answer questions due to the time it took for the Data Team to answer them.

We now have a plethora of Business Intelligence platforms, that are designed to encourage self-service but at the same time lock in the business logic and (hopefully) removing the need for calculations from the Citizen Data Analyst themselves, freeing them up to look for trends and opportunities from the data itself.  At Carfinance 247 we have adopted the [Looker](https://looker.com/product/business-intelligence) platform for this purpose, which combines excellent and easily accessible visualisations with an "explore" feature that fulfils self-service requirements by exposing a pre-curated set of dimensions and measures to the end user.  Therefore, incorrect calculations should no longer be possible, and the ultimate goal of the Single Version of the Truth can be achieved, whilst at the same time unshackling the business from an analytic bottleneck to answer questions.  With modern BI tools and visualisations, anyone at all can be a data analyst.

Which returns us to the initial question: how does the rise of the Citizen Data Analyst affect the future of the Data Team?  Is the data team now no longer needed?  I don't agree with this viewpoint.  Instead, I think this frees up the technical expertise that sits within the data team to go about providing businesses the ability to ask the questions they need answering, when they need answering.  Instead of producing MI, the Data Team now should be looking to provide accurate data frameworks to allow end users to take the initiative to answer their own questions.  This in itself presents a challenge, and steps need to be put in place that the development of data models for self service don't return to the same time sink blocker as before; but by learing from the past, adopting agile methodologies and utilising tools, in my opinion, this is the biggest opportunity yet for Data Teams to truly make serious impacts on the successes of businesses.


