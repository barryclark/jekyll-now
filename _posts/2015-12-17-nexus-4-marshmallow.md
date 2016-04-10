---
layout: post
title: Upgrading Your Nexus 4 to 6.0.1 Marshmallow
tags: android nexus marshmallow 6.0.1 adb root
image_large: /images/2015-12-17-large-nexus-4.jpg
image_small: /images/2015-12-17-small-nexus-4.png
---

With the recent release of [Android 6.0 Marshmallow](https://www.android.com/intl/en_ca/versions/marshmallow-6-0/ "Android 6.0 Marshmallow"), Google has dropped support for over-the-air updates on the Nexus 4. If your device feels like it's aging and you're interested in spending some time to upgrade it and enable some more advanced features, then this post will probably help you out.

<!--more-->

![Nexus 4 - 6.0.1 Marshmallow]({{ page.image_large }} "Nexus 4 - 6.0.1 Marshmallow")

Some benefits to upgrading include:

* Upgrading to the latest version of Android, which at the time of writing is Android 6.0.1 Marshmallow. You'll gain access to new features such as: Now on Tap, App Permission, and more
* With a custom ROM, enable features such as double pressing the power button to launch the camera, double-tap to wake the screen, and tons of customization
* Improved battery life with a custom kernel, and greater flexibility and control over your device hardware

## Option 1: Nexus Root Toolkit

If the computer you're using is running Windows (or you have access to a Windows machine), your best bet is to take a look at the [Nexus Root Toolkit](http://www.wugfresh.com/nrt/ "Nexus Root Toolkit -  WugFresh"). This program will save you a lot of the trouble of backing up your device, unlocking the bootloader, rooting, flashing zips, and much more.

## Option 2: Manual Installation

For those who prefer a manual approach, or those that are unable to use the Nexus Root Toolkit, this post will detail the steps that you can use to achieve the same result. I'm using OS X Yosemite 10.10.5, but most of the steps are going to be independent of your operating system.

### Backup and Enable USB Debugging

Before starting the process, you should make a backup of the important data on your phone. Unlocking the bootloader will erase all of your personal data, so make sure that you've copied anything important to a secure location on another device or service.

If you have syncing enabled for your Google account, there's only a few things that you might need to manually backup. Most likely this will be any pictures from your camera, your text messages, and any other media files that you have saved locally. There's apps you can install that will export the SMS/MMS database on your device into a format such as XML that you can later import once everything is stable and running how you like it. You might also find it useful to take a few screenshots of your home screens and app drawer so that you have an easy reference to refer to later for reinstalling apps and customizing your home screens.

You'll also need to enable USB debugging on your device. Within the Settings app, go to About, and then tap the Build Number seven times. You'll know have a new set of Developer Options in the Setting, where you can enable USB Debugging.

### Setting up Android Debug Bridge

Android Debug Bridge (`adb`) is a command line utility that lets you communicate to a connected Android device. You'll need it, along with `fastboot`, for unlocking the bootloader on your device.

If you're running on a recent version of Linux, `adb` will likely be in your repositories already. For Ubuntu with `apt-get`:

{% highlight bash %}
$ sudo apt-get install android-tools-adb android-tools-fastboot
{% endhighlight %}

Or Fedora with `yum`:

{% highlight bash %}
$ sudo yum install android-tools
{% endhighlight %}

On Mac OS X, these tools can be installed using `brew`:

{% highlight bash %}
$ brew install android-platform-tools
{% endhighlight %}

If you've already installed [Android Studio](http://developer.android.com/sdk/index.html "Android Studio and SDK Tools"), but `adb` isn't available on the command line, you may have to add it to your path with the following in your ~/.bash_profile:

{% highlight bash %}
export PATH="$PATH:/Users/Username/Library/Android/sdk/platform-tools/"
{% endhighlight %}

Once you've setup `adb`, you can connect your device to your computer with a USB cable, and test to see that your device is recognized:

{% highlight bash %}
$ adb devices
{% endhighlight %}

And you should see the serial number of your phone listed, for example:

{% highlight bash %}
List of devices attached
* daemon not running. starting it now on port 5037 *
* daemon started successfully *
1234567890abcdef  device
{% endhighlight %}

### Unlocking the Bootloader

With `adb` working, you're ready to start unlocking the bootloader:

<ol>
  <li>
    Connect your device to your computer using a USB cable.
  </li>
  <li>
    Reboot your device into bootloader mode with the following `adb` command:
{% highlight bash %}
$ adb reboot bootloader
{% endhighlight %}
   </li>
  <li>
    Confirm that drivers are properly installed and the device is detected with the command:
{% highlight bash %}
$ fastboot devices
{% endhighlight %}
    You should see the same serial number displayed on your phone's screen echoed back through your terminal.
  </li>
  <li>
    Unlock the bootloader with the command:
{% highlight bash %}
$ fastboot oem unlock
{% endhighlight %}
    You will be presented with a screen that warns you of the consequences and asks you to confirm before unlocking the bootloader. Confirm using the volume and power keys.
  </li>
  <li>
    You will now see that status listed as "LOCK STATE - unlocked", and may also see "erasing...". The terminal will echo a result such as:
{% highlight bash %}
...
OKAY [144.281s]
finished. total time: 144.281s
{% endhighlight %}
  </li>
</ol>

### Installing Custom Recovery

Custom recovery software is useful for installing third-party firmware, backing up, wiping the system, and more. This post is based off of Team Win Recovery Project (TWRP), and you can download the latest version from [TWRP's website](https://twrp.me/ "TeamWin - TWRP"). At the time of writing this post, I used version 2.8.7.0. Save the image (e.g. twrp-2.8.7.0-mako.img) for your device somewhere convenient.

<ol>
  <li>
    Reboot your device into bootloader mode with the following `adb` command:
{% highlight bash %}
$ adb reboot bootloader
{% endhighlight %}
  </li>
  <li>
    In your terminal window, navigate to the location where the image was downloaded, for example:
{% highlight bash %}
$ cd ~/Downloads
{% endhighlight %}
  </li>
  <li>
    Flash the recovery image to your device with the fastboot command:
{% highlight bash %}
$ fastboot flash recovery twrp-2.8.7.0-mako.img
{% endhighlight %}
    You'll see something similar echoed back to you:
{% highlight bash %}
sending 'recovery' (9028 KB)...
OKAY [  0.287s]
writing 'recovery'...
OKAY [  0.489s]
finished. total time: 0.775s
{% endhighlight %}
  </li>
  <li>
    Once complete, use the volume keys to navigate through the bootloader menu and select "Recovery Mode". As the phone reboots, you will see an unlocked icon below the Google logo, and then the recovery software will load.
  </li>
</ol>

### Rooting and Installing a Custom ROM

TWRP has a built-in method for rooting your device, and it will automatically detect and prompt you to root if you attempt to reboot. Some custom ROMs are also rooted by default, which this post will assume. If you haven't already, you'll want to spend some time deciding on a custom ROM that you'd like to use, and download it, along with the GApps package that you'll need for reinstalling everything. I decided to use the popular [Chroma AOSP ROM version 6.0.1](http://forum.xda-developers.com/nexus-4/development/rom-chroma-03-31-2015-layers-t3069936, "Chroma ROM - Nexus 4"). Download the system image and corresponding GApps package.

1. Connect your device to your computer, and reboot into recovery mode.
2. Within TWRP, select Wipe, and then Format Data.
3. Copy the ROM and GApps zips over USB, and place them into the root of your device's storage. Once complete, you can disconnect the USB cable.
4. In TWRP, select Wipe, and then perform a Factory Reset.
5. Back in the home menu of TWRP, select Install, and then select the ROM zip that you downloaded. Swipe to flash the ROM, and wait until it complete.
6. Repeat the same installation process for the GApps package.
7. Reboot System

Once the install has completed, you can being using your newly installed custom ROM. You can start copying data back to your device and reinstalling your apps at this point.

### Installing a Custom Kernel

If you're unsatisfied with the battery life of your device, or you're looking for additional customizations, you can also install a custom kernel. I chose the [hells-Core kernel](http://hc-kernel.blogspot.ca/ "hells-Core kernel blog") for Chroma and 6.0.1, version [hC-b87-M.zip](https://renderserver.net/browse?path=hellsgod/hells-Core-N4 "Download hC-b87-M.zip").

1. Connect your device to your computer, and reboot into recovery mode.
2. Copy the kernel over USB, and place it into the root of your device's storage.
3. In TWRP, select Wipe > Advanced and then check Dalvik Cache and Cache.
4. After wiping the caches, select Install > and then select the kernel zip and install.
5. Once complete, you can reboot the system.

You'll need to download a kernel manager, of which there are a number of free choices on the Google Play. This will allow you to tweak and enable a number of different settings, such as DoubleTap2Wake, enhanced vibration strength, etc.

### Improved Audio Controls

Another enhancement you might want is improve audio control and flexibility. For this, I'd recommend using [ViPER4Android](http://vipersaudio.com/blog/ "ViPER4Android"), There's an excellent guide [installation and setup guide](https://docs.google.com/document/d/15e7xv8AADnl0Ckqg8NiuQMTPLSgkIZCS4hU4Q07H7i4/ "VIPER4Android Installation & Set Up Guide") for setting this up.

## Wrap-up

Feel free to look into the [Xposed framework](http://repo.xposed.info/module/de.robv.android.xposed.installer "Xposed Framework") for further system modification, or theming with [Layers Manager](https://play.google.com/store/apps/details?id=com.lovejoy777.rroandlayersmanager&hl=en "Layers Manager - Google Play"). There's a lot more customization that you can do if you're interested.
