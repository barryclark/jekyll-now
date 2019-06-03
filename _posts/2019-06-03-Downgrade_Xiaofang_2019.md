---
layout: post
title: Xiaofang firmware downgrade 2019
---

Recently I have been looking into more and more Xiaomi devices and being pleasantly surprised at every stage. The products are always great quality and so cheap. 
The only problem I run into, especially with the home devices, is the way Xiaomi likes to restrict access to some devices to mainland China. In the past the workaround has been simple, set the app to mainland China and Xiaomi will turn a blind eye. However, with firmware version 5.6.2.197 this changed for me on my Xiaofang camera.

![Xiaofang Camera](https://raw.githubusercontent.com/RemakingEden/mysite/master/images/posts/xiaofang.jpeg)

I found many guides for downgrading the firmware on my device but most did not work with this new firmware. I finally found a guide that worked [here](https://en.miui.com/thread-5096189-1-1.html) (Thank you junyang96!) however it was missing a step at the end and was posted before the update that broke my device so it still took me a long time to figure out exactly how to get it operating again and if this would work.

After much messing I have a working Xiaofang bargain camera on firmware 5.6.2.138 which should, theoretically, continue working forever as long as I do not update.

Here is all the steps I took to get my device back to working order:

**Please do this at your own risk. I cannot guarantee it will work and not cause any damage to your device, this is simply what worked for me**

1. Format a microSD to Fat32 ( Mine was a 16GB one but I presume you could use a smaller size)
2. Download the firmware hosted [here](https://www102.zippyshare.com/v/OhOnBJg6/file.html). That file sharing site is blocked in the UK and maybe elsewhere so I have also hosted a download link [here](https://raw.githubusercontent.com/RemakingEden/mysite/master/downloads/xiaofang/demo.bin)
3. Copy the downloaded file "demo.bin" onto the SD card root (The very first page when opening the SD)
4. While the Xiaofang camera is not plugged into power, insert the SD card
5. Hold down the reset button and plug the camera into power. Hold the button for 15 seconds and then release (The LED should be flashing orange and blue at this point)
6. Wait for 30 seconds and then press the set up button and go through the normal app pairing setup process.

    Note : My app pairing did not go smoothly. I was having issues with the camera connecting to the router but just keep trying if you are having problems. After around 3/5 attempts I got there.

    **Important - The app will pair completely however you will not be able to view your camera at this point. With this new firmware, if you tap on the camera in app it will get stuck on connecting (1/30). When you are at this stage please move onto the next step**

7. Tap on the camera in app. While it states "Connecting (1/3)" tap on the three dots in the top right
8. Tap "General settings" > "Check for firmware updates"
9. The screen should state "Current version 5.6.2.77 Latest version 5.6.2.138". Tap "Update"

    Note : This was not smooth either, it took 10 or so attempts after turning the camera off and on again and closing the app and opening again etc. Eventually the update was allowed and processed as usual.

10. After the update is complete, the app should work as usual. Make sure your "Region" is still "China" and do not update the firmware of your camera and you should be able to continue enjoying your cheap budget wireless camera.

I hope this solved some issues. As I said in the guide it was not smooth and I cannot promise this will work for every 2019 Xiaofang block but It certainly worked for mine. Again thanks to junyang96 who wrote the original guide and translated from the Chinese site. 

Please drop me a message if you have any questions about this guide and I will try to help.
