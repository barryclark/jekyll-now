---
layout: post
title: Splitting Cypress E2E tests into its “Component” pieces
---

This article was released as part of my work at [Answer Digital](https://answerdigital.com/) on a project with the [NHS](https://www.nhs.uk/), the [AI Centre](https://www.aicentre.co.uk/) and [NVIDIA](https://www.nvidia.com/). The frontend mentioned in this blog is available [here](https://github.com/AI4VBH/AIDE-front-end). Be aware this is an evolving project so the information below may go out of date.

## TLDR

Using Cypress component testing we have reduced our 10 minute E2E run into two parallel runs amounting to 4 minutes. We have increased buy-in from developers and gained a new perspective on testing.

### The Issue

Long runing pipelines cause all manner of issues. Resentment from developers, people looking for workarounds, costing more time than they save in the long run. There is nowhere that long running tests rear their ugly head more than UI E2E tests. In my opinion, if your tests take long enough that a developer feels like they briefly have to context switch to another piece of work rather than waiting, you have already failed. Context switching is detrimental to productivity.

Over the years people have come up with strategies to combat this. Some cause more problems, such as using a lot of assertions in a singular test with the aim of not reloading the browser as much. Yes, this reduces time but also makes a mess of exactly what the test should be asserting. Leading to confusion when it fails and often dependencies that make the test flaky. Other methods work better such as labelling and only running relevant tests; however, doing this you lose one of the central tenets of CI which is continuous regression testing.

In our case we were using Cypress to conduct our UI E2E tests; we had no dependencies as we were mocking all API calls and data. However, we swiftly found our test runs taking up to 10 minutes. We tried to optimise every part of the pipeline that wasn't the test run, such as downloading and installing the project. However, this only reduced it by a few minutes and we reached a point of diminishing returns. For all intents and purposes they are as fast as they can be. We thought about running our tests in parallel; however, this is a feature Cypress expects you to pay for, there are self-hosted options, but the complexities and cost of hosting and keeping this option up to date didn't fit our project.

### The Solution?

Enter, stage left, Cypress 11 and the introduction of component testing. A way to reduce the amount the browser has to load in each test. It takes the component you are working on, a table, for example, and only renders that on the page. It does this in the exact same way it would render the whole site; but it is noticeably quicker.

![Cypress Component Test](https://raw.githubusercontent.com/RemakingEden/mysite/master/images/posts/cy-component.png)

With the introduction of this technology we needed to talk about how to split workloads between E2E testing and the new component testing. We decided to split our tests simply using this methodology. If a test touched more than one component, we would use E2E testing; anything else, component testing should be quicker and more stable. We found component testing especially useful for tests around the reactive frontend. Buttons disabling, validation, dropdowns etc.

After deciding on the component testing workload split, we had a tricky conversation to have. Which team has the main responsibility for these tests? Developers or QA. Component testing is a strange middle ground. We settled on developers mainly owning these as they felt closer to traditional unit tests than to E2E. As a team we felt they were similar to visual unit tests and everyone agreed. We also agreed that as they were building these reactive components they would understand the nuances of how they should react.

This isn't to say QA is not involved. Often as QA’s it's important we view problems from a user perspective; a developer may make and test a lovely reactive frontend that does not work at all for the user. This is where example mapping and thinking about the user as early as possible is still key. As the amigos, we will continue to think about and plan both component and E2E tests before work has begun and we will always have a QA complete one of the 2 code reviews needed to merge a PR.

### The benefits

It is important to say, component testing is not a replacement for E2E testing; they both have their merits. However, it does take a lot of the unneeded work and time away from the E2E tests. The benefits of this change include:

- Faster run times for the same tests
- Another set of tests that can run in parallel without paying any extra or self-hosting an application
- A set of UI tests written from a developers perspective that understand the reactive nature of the component

In our case, our 7-10 minute E2E run was turned into a 3 minute component and a 4 minute E2E. As we are using Github actions and these are running parallel, this means our entire pipeline takes as long as the longest run, which is 4 minutes. Plenty of time to get up and get a quick drink, but not quick enough to feel as though you need to context switch. Mission achieved!

### Summary

Overall, I think component testing is a great way to increase coverage, get a different perspective on UI tests, and reduce those damn pipeline times. Of course, this won't work for everyone. However, if you are already using Cypress, component testing takes only a few minutes to set up and try out yourself. What's the risk?
