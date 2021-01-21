---
layout: post
title: Remove a macOS Firmware Password
---

![](../images/2020-9-21/mac-firmware-lock-icon.png)
This post is similar to the attached Apple KB with the addition of what to do if you run into an issue where Internet Recovery is unable to find and administrator on the Mac where we want to disable the Firmware Password.

### Before You Start

- If the Mac is managed by an MDM make sure that any EFI configurations are not scoped to the device.

### How to turn off a firmware password

1. Start up from macOS Recovery. During startup, you will be prompted to enter the firmware password.
1. When the utilities window appears, click Utilities in the menu bar, then choose Startup Security Utility or Firmware Password Utility.
1. Click `Turn Off Firmware Password`.

	NOTE: If you receive a message that an administrator for the device could not be found. Boot back into the OS and go to System Preferences to toggle FileVault off then back on again. This should cycle the FileVault recovery key and refresh the Secure Token holder admin. Once that is complete boot back to internet recovery.

1. Enter the firmware password again when prompted.
1. Quit the utility, then choose Apple menu  > Restart.

### Resources

- https://support.apple.com/en-us/HT204455

