---
layout: post
title: Chrome DevTools 
---
The Chrome Developer Tools (DevTools for short), are a set of web authoring and debugging tools built into Google Chrome. The DevTools provide web developers deep access into the internals of the browser and their web application. Use the DevTools to efficiently track down layout issues, set JavaScript breakpoints, and get insights for code optimization.<br />
***The DevTools window***<br />
The DevTools are organised into task-oriented groups in the toolbar at the top of the window. Each toolbar item and corresponding panel let you work with a specific type of page or app information, including DOM elements, resources, and sources.<br />
Overall, there are eight main groups of tools available view Developer Tools: <br />

1.Elements<br />
2.Resources<br />
3.Network<br />
4.Sources<br />
5.Timeline<br />
6.Profiles<br />
7.Audits<br />
8.Console<br />
**Inspecting the DOM and styles**<br />
The **Elements** panel lets you see everything in one DOM tree, and allows inspection and on-the-fly editing of DOM elements. You will often visit the Elements tabs when you need to identify the HTML snippet for some aspect of the page. For example, you may be curious if an image has an HTML id attribute and what the value is.<br />
**Working with the Console**<br />
The **JavaScript Console** provides two primary functions for developers testing web pages and applications. It is a place to:<br />

1.Log diagnostic information in the development process.<br />
2.A shell prompt which can be used to interact with the document and DevTools.<br />
You may log diagnostic information using methods provided by the **Console API.**such as **console.log()** or **console.profile()**.

You can evaluate expressions directly in the console and use the methods provided by the **Command Line API.** These include **$()** command for selecting elements or **profile()** to start the CPU profiler.<br />
**Improving network performance**<br />
The **Network** panel provides insights into resources that are requested and downloaded over the network in real time. Identifying and addressing those requests taking longer than expected is an essential step in optimizing your page.<br />
**Audits**<br />
The **Audit** panel can analyze a page as it loads. Then provides suggestions and optimizations for decreasing page load time and increase perceived (and real) responsiveness. For further insight, we recommend using PageSpeed Insights.<br />
**Improving rendering performance**<br />
The **Timeline** panel gives you a complete overview of where time is spent when loading and using your web app or page. All events, from loading resources to parsing JavaScript, calculating styles, and repainting are plotted on a timeline.<br />
**JavaScript & CSS performance**<br />
The **Profiles** panel lets you profile the execution time and memory usage of a web app or page. These help you to understand where resources are being spent, and so help you to optimize your code. The provided profilers are:<br />

1.The **CPU profiler** shows where execution time is spent in your page's JavaScript functions.<br />
2.The **Heap profiler** shows memory distribution by your page's JavaScript objects and related DOM nodes.<br />
3.The **JavaScript profile** shows where execution time is spent in your scripts<br />
**Inspecting storage**<br />
The **Resources** panel lets you inspect resources that are loaded in the inspected page. It lets you interact with HTML5 Database, Local Storage, Cookies, AppCache, etc.
