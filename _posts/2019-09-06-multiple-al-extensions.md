---
title: 'Dealing with Multiple Versions of the AL Extension in VS Code'
draft: true
tags: [GitHub, VS Code, Business Central, Dynamics NAV, Microsoft]
---
One difficulty in dealing with the AL programming language across Dynamics NAV 2018, Business Central 13/14 and now BC 15 is the AL extension.  I've found that disabling and re-enabling them as you switch back and forth between projects gets to be difficult to manage and it has unpredictable results if you don't restart VS Code.  Its not possible to work on any different mix of AL projects at the same time.

Creating a self contained "portable" install of VS Code solves these issues.

I'm able to have version .12 (NAV 2018), current 3.0 (BC 14.x) and the new 4.0 (BC 15.x) extension in different VS Code installs and not get any of the bizzare behavior switching back and forth would produce.

The zip doesn't support auto-update but this is a small inconvenience.

Instructions on creating a portable installer. [code.visualstudio.com/docs/editor/portable](https://code.visualstudio.com/docs/editor/portable)

So in short, go to the download page. [https://code.visualstudio.com/Download](https://code.visualstudio.com/Download)

![downloadvscode](/images/2019/09/downloadvscode.jpg)
*Download the zip*

![createdatafolder](/images/2019/09/createdatafolder.jpg)
*Extract the zip and add a "Data" folder.*

Now install or copy your extensions!
