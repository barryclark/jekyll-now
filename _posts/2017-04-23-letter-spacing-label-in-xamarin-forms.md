---
layout: post
title: Letter Spacing label in Xamarin Forms
tags: [xamarin, android, ios, xamarin-ios, xamarin-android, xamarin-forms]
---

One of the limitations of the `Label` control in Xamarin Forms is that it's missing a letter spacing property. On one of our most recent Forms projects we needed to specify differing letter spacing on some labels so I've put together a few code samples to save you time on how to do this in your iOS and Android renderers.

## Forms control

The forms control is as easy as they come, it requires just one property which we've made a `float`:

<script src="https://gist.github.com/Stayrony/9b3fa4d80402b0e5c09f1d7f950d8e8a.js"></script>

I've named the control the `LetterSpacingLabel`.

The real magic happens in the iOS and Android renderers.

## Android renderer

The Android renderer code looks like:

<script src="https://gist.github.com/Stayrony/b8998db9d4f594b8661e68f8f3917f3d.js"></script>

## iOS renderer

<script src="https://gist.github.com/Stayrony/c9280bb2e4ce161fd45320bb26edf30a.js"></script>

The following code example demonstrates using the `LetterSpacingLabel` control:

<script src="https://gist.github.com/Stayrony/b9056286e7720f79be1903e33bba1d92.js"></script>

The following screenshots show the label on each platform:
![iphone7](/images/LetterSpacingLabel/iphone7rosegold_portrait.png "iphone7") ![nexus4](/images/LetterSpacingLabel/nexus4_portrait.png "nexus4")

Repo for LetterSpacingLabel can be found on [Github](https://github.com/Stayrony/Xamarin.Forms.Samples).
