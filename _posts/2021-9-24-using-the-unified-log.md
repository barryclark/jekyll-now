---
layout: post
title: Using the Unified Log from Terminal in macOS
---

In this post we learn how to the macOS unified logging system from Terminal.

### Examples

Enable debug for a subsytem

`sudo log config --mode "level: debug" -subsystem io.kandji.KandjiAgent`

Logs from now back to when they first appeared

`log show --predicate 'subsystem == "io.kandji.KandjiAgent"'`

Logs from the last 12 hours

`log show --last 12h --info --debug --predicate 'processImagePath contains "mdmclient"' > ~/Desktop/MDM.log`

Log streaming

`log stream --debug --predicate 'subsystem == "io.kandji.KandjiAgent"'`

To monitor Login and Background Item management activity in Terminal: 

`log stream —debug —info —predicate "subsystem = 'com.apple.backgroundtaskmanagement' and category = 'mcx'"` 

### Resources

- https://eclecticlight.co/2018/03/19/macos-unified-log-1-why-what-and-how/
