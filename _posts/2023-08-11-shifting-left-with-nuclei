---
layout: post
title: "Shifting Left with Nuclei: A Tester’s Experience"
---

## TLDR

*In this article I discuss trying to use a dynamic security testing tool called Nuclei early in the development lifecycle. Through this process I realise that not every tool and style of testing should be shifted left and often the drawbacks can overweigh the benefits.*

## The challenge

As testers, we want to shift left with our testing, especially when it comes to security. We can start this process early in the SDLC by using techniques like Example mapping and Amigos sessions. We can also use tools like SAST and SCA in the CI pipeline to catch issues before they reach production.

But there is one aspect of security testing that often gets neglected: DAST. DAST is usually done at the very end of the SDLC, on production or pre-production environments. And that’s when we discover that we have a lot of problems that are difficult and costly to fix.

DAST is meant to check for environmental issues, so it makes sense to test on an environment that resembles production as much as possible. But is that the best we can do? Can we shift DAST left and find those problems sooner?

![Left arrow on green background](../images/posts/LeftArrow.jpg)

## Nuclei

Nuclei is a popular tool for DAST that allows you to scan web applications for vulnerabilities using predefined or custom templates. It is often used as part of a DevSecOps pipeline to find security issues before they affect production.

The idea I had was to use Nuclei as early as possible in the DAST testing process. I wanted to use it on each PR, start the application in memory and then run a scan on it. To avoid false positives and irrelevant reports, I would select or write each template Nuclei used.

You can see my attempts in this [pull request](https://github.com/RemakingEden/Nuclei-Shift-Left-POC/pull/3). I managed to get Nuclei running correctly and triggering 3 templates. They worked as expected, but by then I realized that Nuclei was not the right tool for the job…

## The drawbacks

As a tester, I always try to balance improving quality without adding unnecessary complexity. Another tool can be great, but it can also be another thing to maintain, to troubleshoot, to train new developers and testers on. Unfortunately, in my opinion, trying to use Nuclei in this way created more problems than benefits.

![XKCD comic about creating tools on tools and not being sure what your doing anymore](https://imgs.xkcd.com/comics/tools.png)

For example:

- Nuclei’s templates are written in YAML which is not the most familiar or flexible for testers or developers compared to test cases written in the same language and alongside the code.
- The templates I created could easily be replicated in API tests using Jest and integrated into the existing API testing frameworks.

I had recently read and commented on [SheHackPurples's blog post](https://shehackspurple.ca/2023/07/03/you-do-not-need-to-do-dast-in-a-pipeline-to-do-devsecops/) about not necessarily having to integrate DAST into your pipeline to have a good DevSecOps mindset and I think this is an example of trying to fit a square peg into a round hole in testing.

I think it’s very important to remember to shift left but also to shift right. They both have their own value and benefits.

Finally, when I get the chance to use Nuclei in a project, I will use it in the CI pipeline but only as a cronjob to scan production/pre-production and raise any issues it finds into my defect tracker. This way I can benefit from all the amazing community templates that are constantly being updated while not trying to force Nuclei to do something it’s not designed for.

As for the kind of testing I tried to do in my POC. I believe this should be considered less as some strange alien automated security testing that only security experts can do, and more as an extension of the regular automated tests we write. Give it a go, you got this!
