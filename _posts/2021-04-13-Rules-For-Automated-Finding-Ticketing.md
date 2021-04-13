---
layout: post
title: Rules for Automated Finding Ticketing
---
## Rant of The Day
Using automation to notify team members of security findings is... AWESOME! Weekly reports are great, but wouldn't you rather expose the problem directly to the person who can fix it? If you can't automate the solution, at least make the work needed visible.
- This security-group doesn't comply with our standards; please fix it.
- Your host is 16 months behind on patches; please patch it.
- We noticed your TLS cert will expire in 3 days; please rotate it.
- BugBounty program reported this XSS; please implement this encoding library.

Sounds pretty cool right? Except, as a "customer" of InfoSec:
- I don't want 25 tickets to fix the same XSS
- Flooding me with false positives is a good way to get me to ignore your tickets
- I ALREADY FIXED THIS TODAY WHY ARE YOU BOTHERING ME
- This is neat, but we talked about how I get an exception to policy because we're a business that makes money.

## Rule 1: False Positive Rates MUST be below 5%
If a detection creates more than 5 useless tickets for every 100 findings, a human should triage them before sending to the owner. False positives erode confidence in the program and will result in security apathy.

## Rule 2: Aggregate as much as possible
I like to generate a report of all matching findings and attach it as a cut-list to the ticket. Many problems can/must be solved at scale, creating one ticket per occurrence of an issue makes the problem seem much harder to solve than it really is.


Example: 50 container instances running an old version of java... It wouldn't make sense to manually update each one, and the containers are ephemeral, so by the time the ticket is ready to be actioned, the orginal containers are gone. Aggregate by container image. One fix, one ticket.

## Rule 3: Support Deduplication
When you find that a secret has been exposed, what's the most important action that needs to take place? Rotation. If the secret is used in multiple places (please don't), more than one team may have to implement code changes. Adding a UUID or hash for the secret to the ticket allows you to group problems and ensure that you don't constantly open new tickets for findings the team already knows about.

## Rule 4: Support Silence Actions and Exceptions
There will always be an exception to the rule. Plan for it. I like to use tags on my tickets to specify when:
- If a ticket is still open, don't bother the owner until a certain date
- If a ticket was recently marked as false positive/complete, don't assign a new one until a human reviews it
- If a ticket was closed because the risk was accepted, don't create new tickets about it.

## Rule 5: Big Red Buttons are Mandatory
Some basic checks like, "how many tickets has this automation created today" will save you a ton of embarrassment when someone accidentally comments out the line of your code that calls sqs.delete_message

## Rule 6: Metrics Apply to Everyone
It's easy to point out metrics that say, "teams need to solve these problems quicker"... But you'll never be able to fully monitor the success of your automation without having metrics that monitor your team as well
- Days to Accept Risk
- Days to mark as False Positive
- Count of False Positives
- Count of Automation Failures
- Count of Incorrect Assignments
- Days to triage low-confidence finding
