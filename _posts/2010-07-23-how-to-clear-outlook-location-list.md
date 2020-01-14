---
layout: post
title: How to - Clear Outlook Location list
permalink: /how-to/how-to-clear-outlook-location-list
post_id: 230
categories:
- '2007'
- ACT!
- How to
- Howto
- Microsoft
- Office
- Outlook
---

Had an issue yesterday where we wanted to remove some entires from Outlooks location list.

Huh? When you book an appointment in Microsoft Outlooks calendar you can specify a location. If ACT! by Sage has a Resource that is designated as a location, when ACT! sync's with Outlook that location list gets filled in.

So, we wanted to edit that list in Outlook. Well, you can't.

But you can clear the list completely, which for our purpose suited us fine, it'll get repopulated with the correct values.

Thus, without further ado, here is how you do this:

Open up Regedit and remove the value from this key: `HKEY_CURRENT_USER\Software\Microsoft\Office\12.0\Outlook\Preferences\LocationMRU`

Note that you will need to replace the version number for your version of Microsoft Office (14.0 = MSO2010, 12.0 = MSO2007).

Hat tip to [superuser.com](http://superuser.com/questions/41242/how-to-delete-locations-from-the-location-history-when-creating-a-new-appointment).
