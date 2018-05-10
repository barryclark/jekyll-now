---
layout: post
title: Pushing Stack Trace Of Error On Slack Channel
---

Wouldn't it be awesome if we could get the error trace on slack.
For this first of all we'll have to write a handler that will compose the message the way slack likes.

{% gist pranav93/c7837860c5aacd0d1e2358191448acba %}

And we'll configure the logger in config file,

{% gist pranav93/5ce1c903b27ff694a63f2b2dc476e6fc%}

As, you can see hook is needed so that our messages are passed to a channel in slack.
You can find information about how to create an incoming wehook here 
[https://api.slack.com/](https://api.slack.com/)

At last, call your logger when exception occurs as,
```
slacker.exception(exc)
```
, and you will get the stack trace on your channel.

The final project is at 
[https://github.com/pranav93/slack_trace](https://github.com/pranav93/slack_trace)
