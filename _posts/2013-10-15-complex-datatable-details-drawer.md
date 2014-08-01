---
layout: post
title: Simplifying a Complex Data Table with a Details Panel
---

Oftentimes, we need to display complex data in the form of a table. These tables can quickly become bloated with too much information, however, and so we need to consider new ways of visually modularizing our data.

A few days ago I was lurking around ux.stackexchange.com, and came across the following question:

[How to Display Vertical and Horizontal Information in the Same Space](http://ux.stackexchange.com/questions/44556/how-to-display-vertical-and-horizontal-information-in-the-same-space/)

To me, this question basically boils down to how to divide primary and secondary data within the same view. A quick and dirty solution might be to have each row entity redirect to a view that is populated with that row's unique details. While that is probably feasible, we might not be able to justify taking the user to an entirely different view (not much secondary data, no real functionality in the new view, etc.)

A second solution might be to display the rest of the data in a modal-like dialog. That way we aren't unnecessarily moving the user to a different view that they will ultimately have to navigate away from. I don't really like this because it would typically remove the ability for the user to interact with other areas of the view besides the user's data. More on that later...

I decided that the first two solutions aren't as elegant as I'd like, and instead suggested something a bit different. Imagine a table containing some standard data. Each row of the table represents a fairly complex entity. We only want to display some subset of primary data for each entity (name, age, hometown), and only want to display the rest of the secondary data if the user explicitly selects a row. Because of the rising popularity of touch-based devices, data entities displayed as selectable rows could be considered intuitive.

Now we are faced with the decision of how to display the selected entity's secondary data to the user. I would like to propose the use of a drawer like view that will cover the table - the user is no longer interested in the primary data, we need to focus on the selected entity's details.

Here is a (quick and dirty) functional example:

See the Pen [Table w/ Drawer](http://codepen.io/JordanForeman/pen/wgosH) by Jordan Foreman ([@JordanForeman](http://codepen.io/JordanForeman)) on [CodePen](http://codepen.io)

<script async src="//codepen.io/assets/embed/ei.js"></script>

While the pen above conveys the core concept, I'm not sure how well it would work on a desktop environment. Its pretty difficult to come to a reasonable conclusion without some amount of user testing, but I'd be curious to see someone implement this and gather some data to measure how well it works.

You may be wondering how this differs from a modal dialog as far as obscuring the rest of the view from the user. While this particular MVP doesn't offer much else in the way of functionality, imagine incorporating this into a view with a navigation bar? A footer? Multiple options in a sidebar? The possibilities are nearly infinite, and I would still argue that in this case, a slide-over table is definitely a better option than a modal.

I'd love to hear some feedback from the UX/IA/Design community on this one. Again, I'm not able to actually test this out or implement it in any work that I'm currently on, so please comment and let me know your thoughts/findings! Thanks!

See also: [Ultimate Guide to Table UI Patterns](http://designingwebinterfaces.com/ultimate-guide-to-table-ui-patterns)