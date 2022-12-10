---
layout: post
title: Vulnerability Response Guide
---

# Clickbait Title - X Tricks to Make You a Rockstar with Jira

I never thought I'd want to post about Jira... but I find myself "standing out" with a few basic filters, so I it's worth sharing...

## 1. Labels are free - Use them Everywhere

Epics, Ticket Types, Issue Workflows... they all have different rules that change depending on who owns your Jira instance.
I've worked places where I couldn't create Epics because it messed up reporting,
I've been locked out of customer transition workflows because "thats not how we do it here"...
And I've also had full admin to a project with the ability to create custom workflows/issue types...
In every scenario, working with Labels was one of the easiest way to cluster tickets to report the way I wanted.


### Label your Toil
>"Saved the company $200k/year by eliminating or automating processes that consumed 30 FTE hours per week across the security team"

 ^ sounds like a good way to ask for a raise, right?

Work with the team to add the label "toil" to any tickets they do regularly. Then create a filter for `labels = toil`. At the end of the month/quarter, review this list for themes... Is there a process that you participate in but provide little value? Cut it. Are engineers on your team simply "clicking a button" when a ticket comes in? Automate it, or make it self-service.

### Label tickets about your tools
>"This tool is expensive, why do we need it?"

>"Our product has increased in features over the last year, our license price has increased as well"

If a tool or process creates tickets, be sure to include the name of the tool as a label. This allows you to provide some visibility into how valuable a tool really is. Example:

- Our Brakeman pipeline identified 2000 vulnerabilities via static code analysis last quarter. Of the 2000:
   - 100 were closed as false positives
   - 900 were fixed by development teams
   - 1000 are in the "not started" status

At a minimum, we can filter by `labels = brakemanpipeline`, and use the built in "Issue Statistics" gadget to show the status of all tickets.

Jira > Dashboard > Add Gadget > search "Issue Statistics"


### Label Tickets by Intake
- Do you create tickets manually when people ask?
- Do you have a portal where they fill out a simple questionnaire?
- Do random people just create/assign you stuff?

Add a label to your automated intake processes, so that you know where most of your toil work comes from and you can address it in the best place.

Example:

After looking at our toil filter, we noticed that a significant amount of our time is spent re-assigning tickets that don't belong to us. If we examine the Intake labels we can see:

- 1/10 tickets with our SlackIntake label were reassigned
- 5/10 tickets with our JiraIntake label were reassigned
- 13/15 tickets with our ServiceNowIntake label were reassigned.

The right answer here \(to me) is to replace our ServiceNow intake page with a link to our Jira page and a description of the services we provide. Then, delete our SNOW Assignment group so that people can't assign things to it.

### Label Tickets by Outcome

Without the ability to modify a ticket workflow, it becomes difficult to track if a finding was "FalsePositive", "RiskAccepted", "Fixed", or "Mitigated".... However, if we build those labels into our processes, we can still organize data by outcome. This allows you to answer questions like:
- How many false positives exist for tool X
- How long does it take the average team to resolve a true positive
- How many tickets were closed by risk acceptance this quarter?

### Label tickets for your Oncall
....
