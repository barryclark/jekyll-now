---
layout: post
title: How to Write Good Git Logs
tags: git
updated: 2020-03-14
---
## First the Why
It's essential to write useful git logs for your projects to give a traceback to history as to the reasons the commit exists in the first place. A useful git log gives you a clear picture of what led to a change to be necessary. Imagine a lousy commit log for a moment. Say, for example, 'asdfsdaf' just to quickly push code and fix a problem. Great, but did it add any value? You are now required to look through an unnecessary amount of code. You have to make a judgment call on what to do next. If there are any repercussions of touching the system, you may now have to go on wild goose chase debugging broken code.

## Pointers on an excellent commit log
1. Style
Be concise and consistent, commit logs must be clear and understandable for anyone to pick up and quickly move the project forward. They must be compatible with keeping the practice of useful commit logs for the lifetime of the project. Consider the style, mark up syntax, wrap margins, grammar, capitalization, punctuation. Spell these out and remove the guesswork for new committers, making sure to make it easy as possible to pick up. The result is a consistent log that is not only easy to trace and read but is also read regularly because of its use.

2. Content
Think about what information the body of the commit message will contain, if any. What will it not include? There may be extra information that adds little value to the commit message.

3. Metadata
How will you resolve issues tracking? How will pull request numbers be referenced?

7 Rules to keep in mind
1. Separate subject from the body with a blank line.
Not every commit needs a subject and body. Sometimes a single line suffices. However, when a commit needs more context or explanation, a body helps.
2. Limit the subject line to 50 characters.
The limit is a rule of thumb, not a hard limit. The length ensures that the commits are readable and concise.
3. Capitalize the subject line
You capitalize the start of a sentence, don't you?
4. Do not end the subject line with a period
With the 50 character limit, space is essential. Periods don't add anything to the subject
5. Use the imperative mood in the subject line
Imperative mood means the sentence is a command. We're used to indicative mood, reporting facts. You get to follow Git's conventions.
6. Wrap the body at 72 characters
Git does not wrap tet automatically. The rule of thumb is 72 characters so that Git has plenty of room left to indent text and keep under 80 characters.
7. User, the body to explain what and why versus how.
The how is explained by the code. The what and why are not entirely apparent from reading the code and saves a developer a lot of time.

Then use git show or git diff or git log -p.

Happy coding!
(https://git-scm.com/book/en/v2)[progit]
