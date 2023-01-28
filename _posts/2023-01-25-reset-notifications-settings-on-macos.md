---
layout: post
title: Reset notification settings plist on macOS
---

In this post, learn how to reset macOS Application Notifications if you have already clicked allow or deny.

I got tired of forgetting where to find this information due to only needing it every so often so decided to write it down this time. 😄

### Tested macOS versions

- macOS 13 (Ventura)
- macOS 12 (Monterey)
- macOS 11 (Big Sur)

### How to

The notification settings are stored in a plist file in the users `/Library/Preferences` directory.

`~/Library/Preferences/com.apple.ncprefs.plist`

To reset all Notification Alerts

1. Delete the `com.apple.ncprefs.plist` settings file.
1. Reset the preferences daemon(`cfprefsd`).
1. Restart the `NotificationCenter`.
1. Restart the `usernoted` daemon. 

The commands below should be executed in order.

```shell
# delete the notifications settings plist
rm ~/Library/Preferences/com.apple.ncprefs.plist

# kill the preferences daemon
killall cfprefsd

# kill the notifications center
killall NotificationCenter

# notification deamon to restart the notificatons
killall usernoted
```

#### Oneliner version

```shell
rm ~/Library/Preferences/com.apple.ncprefs.plist && \
    killall cfprefsd && \
    killall NotificationCenter && \
    killall usernoted
```

Once the commands are complete, notifications should start popping in again.
