---
layout: post
title: Adding shadows to views in Xamarin.Forms Android using 9-patch image
tags: [xamarin, android, xamarin-android, xamarin-forms, shadows, 9-patch]
comments: true
---

You can simply create a 9 patch graphic by using the following tool: [shadow4android](http://inloop.github.io/shadow4android/).
This tool allows you to create bitmap images that automatically resize to accommodate the contents of the view and the size of the screen. Selected parts of the image are scaled horizontally or vertically based on indicators drawn within the image.

So:

* Create a shadow image with shadow4android.
* Download the image. Make sure the file extension is `.9.png`, not `.png`.  By naming your image file `name.9.png`, Android will recognize the `9.png` format and use the black guides to scale and fill your bitmaps.

Your image will be look like this:
![screenshot](/images/Shadow4android/shadow_card.9.png "screenshot")

As you can see, you have guides on each side of your image. The TOP and LEFT guides are for scaling your image (i.e. 9-slice), while the RIGHT and BOTTOM guides define the fill area. The black guide lines are cut-off/removed from your image - they won't show in the app. 

You can find more about 9-patch image, [here](http://radleymarx.com/blog/simple-guide-to-9-patch/).

Now you can add this shadow as the background of the views you want to add the shadow to. Put the image in your `/res/drawable` folder.

# Forms control

In the Xamarin forms PCL, first we need to add a control named `ShadowFrame.cs` which will be simply inherited from the frame.

<script src="https://gist.github.com/Stayrony/b50e598ac4cf8cedb96320fe470ee1e6.js"></script>

# Android renderer

<script src="https://gist.github.com/Stayrony/7b99514e5dd9c6d5f1713af3b7bb6833.js"></script>

After defining this custom control, we can use it on our XAML page, like this:

<script src="https://gist.github.com/Stayrony/7ee9040cc7632c7edd462d3b5b587f52.js"></script>

The following screenshots show result: 

![screenshot1](/images/Shadow4android/add-shadow-to-custom-shape-on-android.png "screenshot1")

Repo for ShadowView can be found on [Github](https://github.com/Stayrony/Xamarin.Forms.Samples).
