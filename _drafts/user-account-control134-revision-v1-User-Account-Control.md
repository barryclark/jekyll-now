---
id: 266
title: 'User Account Control'
date: '2022-01-14T19:23:20+00:00'
author: Ryan
layout: revision
guid: 'https://geekyryan.com/?p=266'
permalink: '/?p=266'
---

## User Account Control

Many people rarely pay close attention to those pesky User Account Control prompts that pop up when attempting to run a program as an administrator. When a user logs into her account, she is assigned a security token based on the level of access that she has (basic user or admin). This token is what defines what programs are allowed to do. Using this concept, the users session is incapable of making changes that would affect the entire system.

For a standard user, a token with the most basic privileges is assigned. Administrators have two tokens assigned, the first token contains all privileges usually awarded to an administrator (unrestricted), and the second is similar to that awarded to a basic user. This way, all programs that the administrator runs, including the Windows Shell, are run in basic user mode (this is why administrators still receive UAC prompts, but do not get asked for credentials). When an application requests higher privileges, the higher integrity token is used.

User Account Control prompts each have their own meaning based on the color (blue, grey, yellow, or red. The blue prompt (Figure 1) means that a built in Windows component that is signed by Microsoft is requesting administrative privileges to continue. This prompt has a multicolored shield in the upper left corner. The grey prompt (Figure 2) means a software application that is signed by a third party developer is requesting admin privileges. This prompt has a yellow shield with a black exclamation mark in the upper left corner. The yellow prompt (Figure 3) signifies that a unsigned executable is requesting administrator privileges. This prompt also had a yellow shield with black exclamation mark in the upper left corner, and looks somewhat generic. Finally, the red prompt (Figure 4) means a program that was specifically blocked by an administrator has attempted to run.

![](https://geekyryan.com/wp-content/uploads/2017/06/UAC-Blue-300x168.png)

Figure 1

![](https://geekyryan.com/wp-content/uploads/2017/06/UAC-Grey-300x164.png)

Figure 2

![](https://geekyryan.com/wp-content/uploads/2017/06/UAC-Yellow-300x241.png)

Figure 3

![](https://geekyryan.com/wp-content/uploads/2017/06/UAC-RED-300x168.png)

Figure 4