---
layout: post
title: My favorite kind of feature toggle
categories: [ddd, stackoverflow]
tags: [python, continuous delivery, feature switch]
---

# Reasoning
Introducing branching in code (by feature toggle) is not the easiest practice but gives you some direct and some not direct benefits. 

Let's start with direct ones. 

A release can be done by business and can be a partial release. So if a release has some exact date it's better to prepare it on feature switch and wait for deadline knowing that PO/PM or any other business person can turn it on. Also, it's easy to do a demo on production data for other teams presenting new features and implement suggestions.

The very important part is feature reverting. Whenever you will see that feature is not working correctly you can just turn it off. No package build, no deployment, etc. Just turn off.

And some positive side-effects.

Requires to plan release strategy. Thinking about release strategy encourages you and your team to think deeper about a feature and may effect of better feature preparation.

The release strategy includes reverting. In this case, you need to think about the compatibility of an old and new state of the system. How feature will change your data and if the old version can work on it. In a case of traditional code reverting system can be incompatible and release starts to be dangerous.

Forces you to choose entry-point for your changes. This may require refactoring some code. So practicing regularly release toggles silently introduce ongoing refactoring.

Implementing feature toggles often increase your refactoring skills and design patterns usage skills.

If you are new to the project or you are not confident about the solution it a very good way to reduce potential consequences of error. Also to introduce toggle you will need to choose a place of implementation. You will learn more about project architecture and verify initial assumptions just with this one step.

Mastering this step of feature development opens you to other Extreme Programming and makes you more Agile.

# How to start implementation
This is obvious but before changing the behavior of the system you need to introduce toggle so all next steps will be safe. Sometimes it will require preparation like refactoring of DB migrations. But these preparation steps won't change the behavior of the system and should be already covered with tests.

There can be many strategies for toggle implementation. For me, the goal to remove toggle with 1 commit that only removes code. There are different solutions to achieve this depends on project architecture. In many cases, this can be achieved by injecting toggle to an application container with the same interface as an object that is branching your code. The toggle will switch between new and old instances of this functionality.

Is a state of the toggle is outside of your project (some feature toggle server) then you need relay on toggle client. When the server is down it should assume that toggle state is off and the rest of the system won't be affected on any network issue introduced by the toggle.

# How to approach DB migrations
This part is generally the same as any other feature switch. You need to prepare a version of DB that will be compatible with versions of code. If this version is some semi-solution then after a successful release you need to plan another migration to clean up DB. It may seem like a lot of additional work so it all depends on cost and risk in the end.

# TTL of toggle
Remove switch as fast as the release will be accepted and monitoring will be over. Ideally in your system, you should have no release switches. It's generally the same rule as for API versions. Perfect is just 1. For some period of time, you will require to maintain more, but you always aim to have 1.

# When it's a bad idea
You need to count the cost to benefits ratio and judge base on this.

If toggle requires a log of refactorization and risk/consequences for bad implementation are low then probably you can skip it.

The important part is not to add your learning period to cost. If you have trouble introducing toggle in your solutions probably it's a good idea to practice it.

If you have a system working with continuous delivery, you practice ongoing refactoring and you can rely on your system then most of the benefits you already have in your day-to-day development process.