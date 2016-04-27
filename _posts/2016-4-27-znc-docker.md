---
layout: post
title: How to easily setup znc with docker
---

# The "problem" with irc

I say "problem" with quotes because it isn't really a problem nor a limitation of the protocol, it's simply the way the protocol was made to be. By using it in a way that is closest to how the protocol was implemented, you will probably feel limited if you're having to use several machines to connect to the same terminal.

# The old way of doing it
If you're using irc and tired of having to connect from several clients with different nicknames to a common server, you have several options to unify those accounts. Some people use a terminal multiplexer like [screen](https://robots.thoughtbot.com/running-weechat-on-a-server-for-irc-backlogs) or tmux and then simply use SSH to connect to their instance. This allows them to have only one client connected to the server at all time. There is also the advantage of only having to learn one client, whereas beforehand you had to learn to use an Android client, a Windows client, a web-based client etc. This is better suited to people using terminal-based clients.

# Using an irc bouncer

WIP
