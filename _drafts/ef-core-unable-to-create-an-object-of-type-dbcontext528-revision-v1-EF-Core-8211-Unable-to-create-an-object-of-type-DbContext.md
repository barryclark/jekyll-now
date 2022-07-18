---
id: 547
title: 'EF Core &#8211; Unable to create an object of type DbContext'
date: '2022-06-14T17:23:20+00:00'
author: Ryan
layout: revision
guid: 'https://geekyryan.com/?p=547'
permalink: '/?p=547'
---

This problem has bitten me more than once, and I can never remember how to fix it. So, why not write a blog post about it!

When running EF Core migrations in a solution, you may come across this error:

<figure class="wp-block-image size-large">![](https://geekyryan.com/wp-content/uploads/2022/06/image-1-1024x142.png)</figure>There are several apparent causes. However, in my case (every time I have seen this), it has been caused by having multiple startup projects selected in Visual Studio.

To fix this, simply open your Solution properties and set the startup project to ‘Current Selection’.

<figure class="wp-block-image size-full">![](https://geekyryan.com/wp-content/uploads/2022/06/image-2.png)</figure>If you are using clean architecture, or some other architecture that has your startup context and your dbContext in different projects, you will need to set your startup project to your runtime, and the ‘Default Project’ in the package manager console to the project containing your dbContext.

<figure class="wp-block-image size-large">![](https://geekyryan.com/wp-content/uploads/2022/06/image-3-1024x493.png)</figure>