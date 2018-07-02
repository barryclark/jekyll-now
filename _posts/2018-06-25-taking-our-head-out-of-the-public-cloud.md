---
layout: post
title: Taking our head out of the (Public) Cloud
author: michael_binks
comments: true
excerpt_separator: <!--more-->
---

It seems to be a daily occurrence that a friend in the tech community or one of engineers mentions deploy an application to the cloud. 

When CarFinance 247 started life we used a managed hosting provider for our website, intranet and database. The main reason being we had a small...very small (2 engineers) development team with little infrastructure experience. A managed solution allowed the business to relax in the knowledge that the hosting provider were managing the infrastructure all efforts would then focus on improving the product.

This partnership worked well for a long time, almost ten years in fact. During that time as the business grew we instructed the hosting provider to increase the resources available and improve the reliability of our solution. Over the years we migrated from a single web and database servers to a solution spanning multiple database, web and application servers, load balancers, file servers and clustering nodes. This might not seem like a lot of kit to some, but it was a significant increase for us. Significant in that it happened over the relatively short period since I joined the business 3 years ago. 

Now we hit the present day, the business has grown in head count, the tech team followed suit and our product numbers exploded. The scope of our technology stack having gone from a very narrow purely Microsoft stack extended out to use a vast array of open source technologies. Our microservice architecture adds an additional level of complexity. In all this time one constant has remained; CarFinance 247 still produces applications and new features at a frightening pace. This has led us to the point where we are unable to grow and adapt our infrastructure inline with the teams productivity. Unfortunately our current hosting provider became a bottle neck and showed few signs of being able to adapt to our new way of working.

We needed to change. Engineers were crying out for it. The next logical step was the public cloud. Every blog, vlog, conference and tweet entices you in that direction these days. It unsurprisingly became the focus of the migration discussions we started to have and I have to admit I was pushing for it. Developers love new tech and this is an exciting tool that every developer wants in his toolbox. Id already played with GCE and the thought of trying AWS and Azure out for size was exciting. The more we talked the more unknowns we found including calculating resources, ingress and egress costs, security, legacy applications. There were so many little things that we didnt know how to do the migration suddenly became a very daunting task. 

Jon then pulled our 'head of out the clouds' and brought us all down with a bump - '…there may be some compliance issues with storing data in the cloud'. He encouraged us to investigate the private cloud route instead. We spent a few months investigating and having decided that private cloud was the best choice for us, Im still equally excited. I believe private cloud is the right decision for us because our stack is not yet cloud ready, we dont need super elastic scale or multi region data centres (we've not gone global...yet!), we had virtually no experience running production services in the cloud and I think private cloud is just that little bit more exciting.

It more exciting because, as we did a week ago, you get to walk into the data centre and actually see the kit! You have full control over every single aspect of your infrastructure so automaton, reliability, scalability, monitoring are ours to own. Granted some of this comes 'out of the box' on public cloud but thats boring. Our engineers can now collaborate with the infrastructure team and build amazing products just right for our business and customers. We do have a small stack in the cloud that allows our data science team to spin up machine learning workflows, giving us a stepping stone into that realm and no doubt public cloud will only continue to get better. But for now we are staying private and I cant wait.
