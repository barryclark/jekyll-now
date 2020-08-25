---
layout: post
title: Architecting for early stage startups
---

Starting the journey as Head of Engineering at [Up Learn](https://uplearn.co.uk) as allowed me to reflect on the question of how one should go about architecting systems and choosing technologies when building for an early stage startup. I have built systems for a couple of startups in the past, which allows be to fall back on some experience. But I realised that sharing these thoughts will be useful for others on the same journey and for my future self in case I forget.

![Architecture for early stage startups]({{ site.baseurl }}/images/startups-architecture.png)

## The considerations

Before we get into suggestions and guidelines it would be useful to do a quick recap of important things that need be kept in mind when making decisions.

1. Most startups fail: Depending on what you read more often, you will see claims that most startups fail in the first two years and the reason is either poor product-market fit or poor cashflow. Regardless of the reason, the reality is that most startups do fail. This means that the architecture decisions may not amount to much. More importantly designing systems to work at great scale may not be required.
1. Most startups spend initial years finding product market fit: This is often the case because what founders thought was the problem can either be a non-problem or be a problem people won’t pay to get solved. This means that whatever architecture and technology choices you make should allow for quickly changing the product and business model.
1. Attracting employees to a startup can be hard: Startups can’t pay enough and often demand a lot of hard work. Finding people that are excited about the startup enough to deal with lower pay and higher work demand can be hard. If you can find more things to excite potential employees then that will likely work in your favour in short to medium term (read 2–4 years).
1. You may be a significant proportion of the development team: Team sizes in early stage startups are small. This means any time spent doing things other than product development cost the company in that it is slower with the product-market fit experiments. Thus effort needs to be put in ensuring that minimal time is spent in infrastructure management, doing deployments, etc.

## The Guidelines

With the reality underlined explicitly, let’s get down to the suggestions worth keeping in mind.

**Architect systems to be scale ready not scalable:** Making systems scale requires a lot of performance tuning, data denormalisation, query optimisation etc. You can read such strategies applied in real world at [high scalability](http://highscalability.squarespace.com/blog/category/example). However, as a start up you don’t need such optimisations. All you need is an architecture that would allow scaling as and when needed. Following are some of the things that make a system scalable.

1. Use a message queue to carry out non critical tasks asynchronously. With such a queue in place as you scale you can off load more work to the queue.
1. Ensure that the system that carries out asynchronous work [scales horizontally](https://github.com/vaquarkhan/vaquarkhan/wiki/Difference-between-scaling-horizontally-and-vertically). This ensures that as you throw more work at these workers, you can throw more machines at it and scale with ease.
1. Use domain names to access database, queueing system, email service, etc instead of ip address. This allows you to move the services around, add load balancers, etc without a lot of disruption to the services.
1. Consider event driven design. Such a design forces you to separate out concerns and build components that handle one and only one concern (which in turn leads to a simple design). If, however, this is proving to be too difficult, ignore it. It is not worth front loading the effort if it comes at the cost of being able to do product-market fit experiments quickly.

**Choose technologies that the team already knows:** This ensures that you spend less time learning the technologies or making rookie mistakes with the technologies, thus increasing the speed of product feature delivery. This obviously seems a no brainer, but it conflicts with the very next suggestion.

**Choose technologies that will attract employees or keep them excited enough to stay on after joining:** This usually means choosing newer technologies which existing team may not have experience with. Thus a delicate balance needs to be achieved such that product delivery speed is not affected significantly, yet you are able to attract employees.

**In a buy-vs-build decision prefer buy over build:** We often face a decision of whether to use an existing library or to build something in-house. In such cases, sometimes there is a desire to build the requirement in-house. The flexibility this affords can’t be matched with a library. However, building something in-house comes with the cost of maintaining it (read fixing bugs) and the cost of building it in the first place. This time, in an early stage startup, is much better spent building features. If the library doesn’t meet your needs perfectly, consider making a pull request to contribute back or fork the library (assuming the library is open source). Do not build your own ORM, messaging system, REST library unless absolutely necessary.

**Automate deploys:** With a small team, it would be extremely useful to automate your deploy process. It doesn’t need to be deploy-on-merge level automation. But deploying should require as little as pressing a button or running a couple of commands. In addition to saving time, you also take away the stress involved in doing manual deploys along with the risk of mistakes.

**Simplify orchestration:** It is very tempting to go for the latest and greatest orchestration services available. However, services designed for large organisations often come with maintenance overheads. At an early stage such overheads come at the cost of product delivery speed. It may make more sense to go for a simpler setup like two replicas running behind a load balancer or using services like Heroku or using FAAS platforms like Amazon Lambda.

---

None of the above suggestions are hard rules that a startup must implement. However, they should help you think about aspects that may not come to your mind when making decisions. Lastly, [this post by Dom Barker](https://hackernoon.com/principles-for-developing-at-high-speed-aca01464b854) is a fantastic read if you are developing software for early stage statups.

Are there other aspects one must think about when making architecture and technology choices? Please share below…