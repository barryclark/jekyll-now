---
layout: post
title: Highlighting rows in MS Excel
permalink: /general/highlighting-rows-in-ms-excel-2
post_id: 184
categories:
- General
---

I have a schedule that I print for a community group. I use Excel to produce it and one of the things I’ve done to make it easier for people to see when they are rostered on is to highlight the row that relates to their assignment.

Now I simply change the name in the “Copy for:” box and the highlighting changes as appropriate.

The way this is done in Microsoft Excel 2007 is as follows:
1. Select the rows and columns you want to highlight
2. On the **Home** ribbon, select **Conditional Formatting** | **New Rule**
3. Select **Use a formula to determine which cells to format** and enter the following formula: `$D5=$D$2` Where `$D5` (Absolute column, relative row) is the first cell a name on the schedule appears, and `$D$2` (Absolute column and row) is the cell containing the “Copy for:” name Click the
**Format…** button and select a solid yellow background fill.
4. Now when you change the value in `$D$2` the rows change highlight to match the name

Hope this helps others as it took me little to get this figured out.

