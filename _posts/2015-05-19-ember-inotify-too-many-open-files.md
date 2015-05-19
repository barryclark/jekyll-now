---
layout: post
title: Ember inotify too many open files
tags:
  - ember
  - inotify
  - error
author: Daniel Smith
published: true
---

While opening different projects in Sublime Text, then running `ember s`, I keep getting the error `inotify_init error: Too many open files`. I finally tracked down a fix to [this](https://github.com/ember-cli/ember-cli/issues/2894). It helps.