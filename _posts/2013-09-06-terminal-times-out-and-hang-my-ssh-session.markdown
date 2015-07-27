---
layout: post
title: Terminal times out and hang my ssh session
date: '2013-09-06 16:00:00'
---

One of those things that I'm doing daily is connecting to SSH terminals maybe application servers, maybe database servers, but in many occasions i just have probably more than 5 at a given time for that reason I have experienced first handed how my terminal just collapses and doesn't allow me to type.

This is one of the things that I hate the most, for particularly that reason you can prevent this, but where? why? and how? Well those might not be simple questions to somebody that might not understand a lot about terminal or maybe where things are configured. 

In my case it took me a bit to figure it out, just because I don't know first handed the UNIX installation of Mac, but at least as a good techie, can get around looking, searching and in many cases not giving up.

So to answer the questions:

## Where? and How?

In your Apple OS X (it might work on all, I have tested in 10.7 and 10.8) you need to go to `cd /etc/`

If you show the listing of that directory you will find a lot of things, but lest just focus on what we need. We need to find the `ssh_config` not the `sshd_config` -- the `d` is the deamon (server) version of the ssh. Not something that we want to use at this time.

There you need to modify that file in your prefer text editor, and since we are using terminal, why not use `vi` so let's do it: `sudo vi ssh_config` which should show you something like this (if you haven't touched it):

<script src="https://gist.github.com/enriquemanuel/6468643.js"></script>

Which you need to add the following: `ServerAliveInterval 60` below the `Host *`, which will look like:

<script src="https://gist.github.com/enriquemanuel/6468633.js"></script>

Save it doing `:wq!`
## Why?

Well just because you are just tired of the samething happening, sessions get disconnected, you need to reconnect or run things with `nohup` or run them in `session` just to be sure that they don't crash because of your internet or your session time out or keep alive.

_Now just restart your terminal, and enjoy not having terminal hang outs or session time outs._
