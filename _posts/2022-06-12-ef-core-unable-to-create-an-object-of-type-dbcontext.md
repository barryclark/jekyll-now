---
id: 528
title: 'EF Core &#8211; Unable to create an object of type DbContext'
date: '2022-06-12T13:58:52+00:00'
author: Ryan
layout: post
guid: 'https://geekyryan.com/?p=528'
permalink: '/?p=528'
Likes:
    - '0'
Dislikes:
    - '0'
'Likes minus dislikes':
    - '0'
gd_system_blocks_used:
    - '{"core/paragraph":8,"core/image":3}'
image: /wp-content/uploads/2022/06/2022-06-09_15h51_11-1200x593.png
categories:
    - .NET
    - '.NET Core'
    - 'c#'
    - 'EF Core'
    - 'Entity Framework Core'
tags:
    - 'c#'
    - database
    - 'ef core'
    - 'entity framework'
---

This problem has bitten me more than once, and I can never remember how to fix it. So, why not write a blog post about it!

When running EF Core migrations in a solution, you may come across this error:

<figure class="wp-block-image size-large">![](https://geekyryan.com/wp-content/uploads/2022/06/image-1-1024x142.png)</figure>There are several apparent causes. However, in my case (every time I have seen this), it has been caused by having multiple startup projects selected in Visual Studio.

To fix this, simply open your Solution properties and set the startup project to ‘Current Selection’.

<figure class="wp-block-image size-full">![](https://geekyryan.com/wp-content/uploads/2022/06/image-2.png)</figure>If you are using clean architecture, or some other architecture that has your startup context and your dbContext in different projects, you will need to set your startup project to your runtime, and the ‘Default Project’ in the package manager console to the project containing your dbContext.

<figure class="wp-block-image size-large">![](https://geekyryan.com/wp-content/uploads/2022/06/image-3-1024x493.png)</figure>