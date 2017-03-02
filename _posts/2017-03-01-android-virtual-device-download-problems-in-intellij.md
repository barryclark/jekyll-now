---
layout: post
title: Android Virtual Device Download Problems in IntelliJ
tags: [java]
keywords: [android virtual device, android, intellij, failed to read or create install properties file]
---

I've been wanting to play around making Android apps for awhile now. Though difficult, I was able to setup things using Maven and IntelliJ. Almost everything was working - I could even build an APK and install it on my phone - but when I tried to run it on my computer via an Android Virtual Device, I needed to download some components via IntelliJ. Unfortunately, I received the following error:

> Failed to read or create install properties file.

![This is the window where the error appeared.](/images/android-error.jpg)
*This is the window where the error appeared. I failed to screenshot the actual error, however.*

Apparently, I had an old install of Android Studio and the Android SDK on my computer. It was probably overkill, but I uninstalled Android Studio and deleted every Android folder I could find (there was one in C:\Program Files, one in C:\Program Files (x86), and one in C:\Users\me\AppData\Local), then reinstalled Android Studio.

From there I had to reconfigure the Android SDK in IntelliJ. When I went to download the Android Virtual Device components again, it worked with no problems.

[This answer on stack overflow led me to my solution.](http://stackoverflow.com/a/40067429/6323312)