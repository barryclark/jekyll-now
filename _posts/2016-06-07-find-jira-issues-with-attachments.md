---
layout: post
title: Find JIRA Issues with Attachments
permalink: /general/find-jira-issues-with-attachments
post_id: 1489
categories:
- General
- JIRA
---

When you just know you’ve attached a file to a JIRA issue, but can’t find it, this is the search to do in Issues in JIRA

Replace `PKEY` with your project key.:

`project = PKEY AND type != Epic and attachments is not EMPTY ORDER BY Status ASC`
