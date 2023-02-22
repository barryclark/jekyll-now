---
layout: post
title: The Toil Scorecard
---

When a developer makes a code change to the software system, how long will it take to validate that the change is correct? What about rotating credentials or ensuring that all 3rd-party dependencies are up to date? How do we observe that production is healthy and operating correctly? The Toil Scorecard gives teams a way to measure these costs and make toil visible to the organization.

# Measure time and decisions

Measure both **how long** it takes to do these activities and how many **decisions** are required, because executive function is a limited resource for everyone. 

Aggregate per month. In the Toil Scorecard we don't need to differentiate between "fast + frequent" vs. "slow + seldom".

A single digit of precision is plenty. Even order-of-magnitude is good enough, especially at the beginning.

# Grade the automation maturity

| Score | Description                                                                           |
|-------|---------------------------------------------------------------------------------------|
| A     | Fully automated; a human does not need to be involved.                                |
| B     | Automated but a human needs to know how to wield or interpret the automation.         |
| C     | The process is thorougly documented in a playbook that a non-expert human can follow. |
| D     | Someone on the team knows how to do this.                                             |
| F     | No one in the team knows how to do this.                                              |

Give a separate score for each area.

There is no partial credit within an area. For example, if some parts are written down in a playbook but other parts are in the expert's head, then score a `D`.

# The Areas


## Validation

Test that an *arbitrary* code change works correctly and does not break existing behaviors, without relying on a mental model of the system.

### Examples

|   |                                                                                                                     |
|:-:|---------------------------------------------------------------------------------------------------------------------|
| A | Automated tests cover everything and automatically run in CI with every change.                                     |
| B | A human executes the automated tests and interprets the results.                                                    |
| C | There's a document that says "if you change the Payments module, you must manually verify that payments still work" |
| D | The dev who wrote the Payments module knows how to test it and watches for PRs that touch that area.                |
| E | We don't know that the Payments module requires special treatment, because the dev who wrote Payments has moved on. |

## Release

Ship to production. Include required paperwork and sign-offs. Remember to account for special cases like "this release includes a database migration".

If additional validation is necessary to release ("hardening sprint" or "manual test pass"), include that in the Validation cost.

### Examples

|    |                                                                                                                                   |
|:--:|-----------------------------------------------------------------------------------------------------------------------------------|
| A  | Every time a PR is merged to `main` it is automatically deployed to production.                                                   |
| C  | We have a release playbook. Both the experienced team members and the person that joined yesterday can follow it in the same way. |
| D  | Each person "knows" how to release but they each do it differently.                                                               |

## Maintenance

Details vary widely between systems. A good question to start with is "If the humans went away, how long would the system keep functioning?"

### Examples

|   |                                                                     |
|---|---------------------------------------------------------------------|
| A | SSL certificates are automatically updated well before they expire. |

## Dependencies

Are we using the latest version of every 3rd-party dependency?
How do we know when a new version becomes available?
How do we know if it contains an urgent security fix?

Most systems have a few extra dependencies hiding in the crevices. Is your CI build using the latest version of the OS? Is your build system using the latest version of Maven/CMake/Bazel/Gradle? Be sure to include these in your assesment.

### Examples

|   |                                                               |
|---|---------------------------------------------------------------|
| A | dependabot sends an automerge PR for every updated dependency |
| B | dependabot sends a PR but a human reviews and approves        |
| F | we use Python 2.7 to automate the release process             |

## Observability

Details vary widely between system. A good question to start with is "How do we know that production is healthy?"

### Examples
|   |                                                                         |
|---|-------------------------------------------------------------------------|
| B | We get paged when things go wrong.                                      |
| D | Ops has learned to watch for out-of-memory errors and reboot the server.|
| F | We find out that the site is down when our users complain.              |


# The Scorecard

Assemble the answers to these questions into a scorecard, which might look like:

| Area          | Score | Engineer Minutes per Month | Engineer Decisions per Month |
|---------------|:-----:|:--------------------------:|:----------------------------:|
| Validation    | B     | 600                        | 100                          |
| Release       | C     | 700                        | 200                          |
| Maintenance   | D     | 800                        | 300                          |
| Dependencies  | D     | 900                        | 400                          |
| Observability | B     | 1000                       | 500                          |

# How to use it.

* Build a scorecard for each repo/project/service/system/tool/offering your team owns. Look for hot spots - where a lot of time and decision-making capacity is consumed - to decide where to invest to reduce toil.

* Collect all the scorecards into a report that the boss's boss can peruse so they can support those investments. They'll probably want this for all their teams.

* When thinking about the design of the next feature, consider how it will impact each of these metrics.

* Use Arlo's Belshee's Automation-as-a-Process ([video](https://www.youtube.com/watch?v=ydq-KjGDRJg), [article](https://digdeeproots.substack.com/p/when-should-i-automate)) to quickly get to `B`.

* Extend this system to measure what is important in your context.
