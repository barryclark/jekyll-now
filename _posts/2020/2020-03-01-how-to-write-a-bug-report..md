---
title: How to Write a Bug Report
layout: post
---

Bug reports are a minefield of useless comments to passive agressive opinions. They can be as barely detailed as "*[thing]* doesn't work" to page-long diatribes that don't really tell you what's going wrong.

Sometimes the bug reports are nothing more than a user whose context does not match the reality of how the software works. It's a matter of expectations.

To help users report issues in a way that cuts down on the opinions and noise, there are three questions that need to be answered:

1. What did you do?
2. What did you expect to happen?
3. What actually happened?

## What did you do?
The first question is a list of step-by-step instructions from the user that ended them up in the situation that didn't match their expectations.

### **Bad**

Clicking on an invoice doesn't work.

### **Good**

1. I logged into the site.
2. I clicked the link to the "invoices" page from the menu.
3. I clicked on invoice #123 from the list of invoices.

Done well, the instructions provide the exact situation that caused the bug and makes it easier for the development team to reproduce the error.

## What did you expect?

Only asking what happened and not what the user expected is a missed data point. Users (and QA testers) often give their opinions on what *they think should be*.  But in some cases this is not how the software was designed.

### Bad
I want it to work.

### Good
I expected to see the details for invoice #123 displayed in the browser window.

## What actually happened?

What actually happened allows the user to report what happened and give further detail on what they saw.

### Bad
It didn't work.

### Good
An error was displayed: "The specified cast was not valid."

With this example, we can see there was an error, and how to reproduce the steps to get there. In this case, it was a valid issue (that shouldn't have gotten to production).

Here is another example:

### What did you do?

1. I logged into the site.
2. I clicked on the invoices button in the menu.
3. I clicked on invoice #123 from the list.
4. I noticed the invoice amount was incorrect.

### What did you expect?

I expected to see the edit button so that I could change the invoice amount.

### What actually happened?

There was no edit button on the screen.

Here the developer should respond that the invoice cannot be edited any longer because it has already been paid. The system has worked as designed, but the user's expectations were incorrect.

Because users don't know how the entire system works together, their feedback should not be phrased as a demand. It's up to the designers, developers, and product managers to decide if the request is a valid issue or not.

## A few other bits
The three questions above are the basics, but there are a few other fields that make the job go a bit smoother.

### Attachments

Allowing the user to create attachments can provide additional context around what is happening. Screenshots are the most likely content to be included, but input files or PDFs of output are also useful. A picture is worth a thousand words and all that.

### What is the impact of this issue?

Allowing the issue reporter to include the impact of the issue helps prioritize the issue against other issues. If the issue appears to be small to the developer, it may get de-prioritized, but issues that appear small can gave a large impact to the organization using the software. This is the user's opportunity to state their case.

## Other thoughts

Issue resolution is another step in the process. For production issues, there can sometimes be a multi-step process to solve data issues. Those steps need to be documented in the resolution and added to a permanent knowledge base to aid others in resolving the issue in the future.

There's also a balance here. If the issue is going to happen frequently, simply documenting the "work around" above won't be enough. Planning needs to happen to create a permanent fix.

If the issue is a code change, the issue can be archived and the new code rolled out to address the issue.