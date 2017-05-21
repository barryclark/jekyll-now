---
layout: post
title: Multi-line text truncation in Xamarin Forms
tags: [xamarin, android, ios, xamarin-ios, xamarin-android, xamarin-forms]
comments: true
---

Truncate the label in Xamarin forms by add `LineBreakMode = TailTruncation` is easy, but it truncates it and restricts it to one line. But on a specific label we wanted to show more text to the end user and even than add an ellipsis if needed. So in other words we would love to be able to tell the label control how many lines it should at least try to display.

To get this working in Xamarin forms you’ll need to add a custom renderer. Because the Xamarin forms label control doesn’t have any property available for us to manipulate to accomplish this.

# Forms control

In the Xamarin forms PCL, we first add a class called `MultiLineBreakLabel.cs` – this will be our own custom control.

# Android renderer

<script src="https://gist.github.com/Stayrony/e89a18ff82e0b93b9e82bd38d02ae4e5.js"></script>

# iOS renderer

<script src="https://gist.github.com/Stayrony/2de7a5c0ac43f76f3979cdfdaabdf38d.js"></script>

After defining this custom control, we can use it on our XAML page, like so:

<script src="https://gist.github.com/Stayrony/d20b518c4ae1a4c9c03a89128b194c8d.js"></script>


The following screenshots show the label on each platform: 

![screenshot](/images/MultilineTextTruncation/Simulator-Screen-Shot.png "screenshot")

Repo for LetterSpacingLabel can be found on [Github](https://github.com/Stayrony/Xamarin.Forms.Samples).
