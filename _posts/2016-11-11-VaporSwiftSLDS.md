---
layout: post
title: Swift, Vapor and Salesforce Lightning Design System
---

Last article introduced [Vapor](https://vapor.codes/) web framework and how to start building web apps with Swift. But we only touched on simple Hello World, while any good web app must serve web content in HTML and CSS. In this post lets explore how to use [Salesforce Lightning Design System (SLDS)](https://www.lightningdesignsystem.com/) with [Vapor](https://vapor.codes/).

A little history on SLDS, created by Salesforce to support the new Lightnig platform/framework, it evolved from [Aura](https://github.com/forcedotcom/aura) UI Framework. In simple terms SLDS is another [CSS framework](https://en.wikipedia.org/wiki/CSS_framework). You may be familiar with [Bootstrap](http://getbootstrap.com/css/) and other CSS frameworks. SLDS is specialized for CRM and Force.com types of web apps that are data intensive. These type of apps combine many elements in a single view, such as display of lists and details on data records coupled together with social channel feeds, knowledge articles etc.

To start with we need to [set up Vapor]((https://vapor.github.io/documentation/getting-started/install-swift-3-macos.html)) if you have not done so before.

Next download a recent version of SLDS (Design System gets frequent updates that are versioned) at the time of this article Salesofrce is in Winter17 release and [SLDS Version 2.1.4](https://archive-2_1_4.lightningdesignsystem.com/). As new releases are updated SLDS will update as well, but no fear typically they are compatible. There are many options to [get SLDS](https://archive-2_1_4.lightningdesignsystem.com/downloads) on your computer, github, npm package, zip etc. I choose download zip for simplicity. Unzip the file adn you will see a directory structure with ready to use design assets.


To learn more about SLDS can laso complete this [Trailhead](https://trailhead.salesforce.com/en) [Lightning Design System module](https://trailhead.salesforce.com/modules/lightning_design_system). If it is your first look at Trailhead, its a good time to learn. [Trailhead](https://trailhead.salesforce.com/en)  is a fun learnig system built by Salesforce to help developers keep up with skills update. It is free to anyone willing and easy badge-based learnig system set up in small modules done in 10-20 min time. Learn to build apps anywhere.