---
layout: post
title: Smart Folder - Flagged or Unread in Outlook for macOS
permalink: /general/smart-folder-flagged-or-unread-in-outlook-for-macos
post_id: 1634
categories:
- General
- macOS
- Outlook
---

Just had to setup MS Outlook 2016 on a Mac, and wanted a smart folder (aka saved search) that shows only emails that are either unread or flagged.<!--more-->

To do this, click into the search box in top right of the Outlook window. The search toolbar will appear, select Advanced.

The raw query to use is:

`(com_microsoft_outlook_flagged = 1) || (com_microsoft_outlook_unread!=0)`

Then save the search.

Via: [answers.microsoft.com](https://answers.microsoft.com/en-us/msoffice/forum/msoffice_outlook-mso_mac-mso_mac2016/making-a-smart-folder-for-all-messages-that-are/ccd09b02-ed82-45b6-a3b5-8c6440783ca4)
