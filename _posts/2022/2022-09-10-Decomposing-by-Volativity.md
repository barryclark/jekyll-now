---
title: Decomposing by Volativity
layout: post
---
Previous I wrote about [decomposing projects](https://johnuhri.com/Decomposing-Projects/) and three methods for breaking down a project:

* by Phase: Analysis, Design, Development, Testing and Deployment
* by Implementation: Front-end, Middleware, Back-End or Ordering, Billing, Shipping
* by Functionality: Scenarios across system components

In [Righting Software](), software architect and author Juval Löwy recommends a better way: decomposing projects by volativity.

> "Volativity-based decomposition identifies areas of potential change and encapsulates those into service or system building blocks. You then implement the required behavior as the interaction between the encapsulated areas of volativity."

In fact, Löwy suggests this is teh *only* way to decompose a project.
