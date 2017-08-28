---
layout: post
title: Google Summer of Code 2017 Final Evaluation
---

# About Myself *About Me*
Here is some information about me. If you already know me, you can skip this part. But if you don't, here it is!

My name is Quan Nguyen. I'm currently a fourth year student. I'm in the process of doing my final project and after that I'll be thrown out of my school :((.

Speaking of my school, it's located in Tan Binh district, Hochiminh city, Vietnam. The school's name is [Hochiminh University of Technology](http://www.hcmut.edu.vn/en), or HCMUT for short.

And did I mention I originally from Vietnam? It's a great country with friendly people, great food and crazy traffic. It has many tourist attractions and some of them are world heritages. You should pay a visit to my country and experience its beauty.

Here comes the main subject of this blog post.

# My GSOC Project

I've heard about GSOC project since my second year. It is a great program to let students participate in open source projects and organizations. Ever since I knew about the program, I've wanted to take part in it. However, due to school projects and summer internship, I couldn't sign up in second and third year. Fortunately, my last student year allows for relatively more leasure time. Therefore, I can have free time to participate and contribute to the Mozilla organization and specifically the Firefox project.

Speaking of Mozilla, I've been a Firefox user for a very long time, maybe since I was in third grade. Back then, I didn't think that that some day, I'd be contributing to Firefox and making it a better browser for everyone. Now after a few months of working for Mozilla and having solved a number of bugs, I feel proud of myself for doing something useful for the Mozilla community.

## Boost Session Restore Performance

My project during this years' Summer of Code is is _Boost Session Restore Performance_. Session Restore is a feature that allows users to be able to pick
 up their work at any time without worrying about that their session - browsing history, browser tabs and windows, etc - may get lost. Many users find this feature very useful and use it often. However, the feature, even though useful and optimized, has its problems and and is sometimes the cause of bad user experience, like slow browser startup, UI freezes, etc. My main goal for this project is to get rid of these problems as much as possible and make session restores smooth and perform better in general. You can checkout my proposal [here]().

My mentors are [Mike de Boer](mailto:mdeboer@mozilla.com) and [Dão Gottwald](mailto:dgottwald@mozilla.com). Both of them are Mozilla senior engineers and and live in The Netherlands and Germany, respectively. Mike has been working for the organization for more than 5 years. He is in charge of many important parts of Firefox like Find Toolbar, Menus, etc. and of course, Session (Re)Store. Dão has been working at Mozilla for over 12 years on many components, like Tabbed Browser, Themes, Location Bar, etc. Both of them are great mentors and taught me many things during the program.

# Working Result
#### Add C++ helper to create XPaths for session restore
Session Restore collects the data entered in form input fields of web pages. If an input node doesn't have a unique ID, an xpath query is generated, to uniquely identify that node in the form. However, the implementation was done is JavaScript, which made it inefficient and slow. The bug is about moving the implementation from JS to C++ by creating a method `generateXPath()` on the `Node` interface. This is the base interface for any HTML element.

#### \[Session Restore\] Read/write data with lz4
All the session data collected by Session Store, was saved in text json format. was saved using a plain-text JSON format. This resulted in many large files being written to disk many times during a browser session, which had a big impact on performance and wasted much space and I/O bandwidth. Compressing the files using the lz4 compression format could reduce the files' size and therefore, speed up read and write time, improve the session restore performance over all. You can take a look at the [telemetry data](https://mzl.la/2w9jCKE) where you can see that the session file size is greatly reduced.

After the patches were landed, many users experienced lost session like bug [1376442](https://bugzilla.mozilla.org/show_bug.cgi?id=1376442), which freaked me out. Luckily, the problem lied in another patches in Search Bar component and it was a relief :)).

Another problem with the patches is that they caused regressions in session restore Talos tests, bug [1380969](https://bugzilla.mozilla.org/show_bug.cgi?id=1380969) and [1376173](https://bugzilla.mozilla.org/show_bug.cgi?id=1376173). That is just how lz4 compression works. On my machine, the time it takes to load a compressed session file is 10 milliseconds longer compares to a raw json text file. However, compressing will benefit if a session has many tabs and windows.
 
#### Disable UI animations during session restore
This bug is about disabling window animations, such as window resizing, moving and minimizing/maximizing. It required me to write code for both Windows and macOS using C++ and Objective-C, respectively, and then expose the functionality to JS through `nsIDOMWindowUtils`. I'd never written any Objective-C in my life. So I had to take a look at Objective-C syntax to nail this bug down. Luckily, it didn't require a lot of code to make this work so I finished it relatively fast.

#### Extend session restore Talos test
[Talos](https://wiki.mozilla.org/Buildbot/Talos#Talos) is an internal benchmark tool to benchmark Firefox performance across different OS platforms. There are many test types to test different aspect of Firefox, including: startup tests, page load tests, etc. The focus of this bug is to extend startup tests, specifically [sessionrestore test](https://wiki.mozilla.org/Buildbot/Talos/Tests#sessionrestore.2Fsessionrestore_no_auto_restore.2Fsessionrestore_many_windows). What I had to do was to extend the sessionrestore test with multiple windows restoration scenario. It was a great experience to talk to other developers and engineers and and dig through telemetry data to figure out the median amount of windows and number of tabs per window. And after that, I had to document the test to let others know what is being test how the test is constructed.

#### Use speculative connect for pending tabs in the restore queue
There are many parts in Firefox where it tries to predict the user's intent and prepare the connection to a web page beforehand in order to speed up the page loading process. However, when Firefox restores a previous session, it doesn't speculatively connect to hosts to speed up the restoration process. This was an easy fix, I just needed to:

* If Firefox are restoring all the tabs automatically, speculatively connect to all the hosts.
* If Firefox are restoring on demand - only restore tabs that users choose, speculatively connect to a web page host when the user hovers their mouse over a tab.

However, there was a problem with my implementation of the second case: I set up a listener for each tab element. And if a tab was closed without ever hovering the mouse, it would lead to causing a memory leak. Bug [1383073](https://bugzilla.mozilla.org/show_bug.cgi?id=1383073) was opened to deal with that issue. So instead of listening for mouse hover, the connection function is called from `tabbrowser.xml`.

#### Too many ID-less form elements make Firefox slows *makes Firefox slow*
Sessionstore collects the data entered in form input fields of web pages. If an input node doesn't have a unique ID, an xpath query is generated to uniquely identify that node in the form. Using the profile results from [Gecko Profiler](https://developer.mozilla.org/en-US/docs/Mozilla/Performance/Profiling_with_the_Built-in_Profiler), there are two culprits that make the form data collection really slow:

* Form data collection depends on xpath query to filter out unwanted input nodes. The query is complicated and therefore slows down the process by a lot.
* Eventhough there is a C++ helper to generate xpath for an input node, if the xpath query returns with a large amount of nodes, the data collection speed will suffer. It will make Firefox smoother if we can break the loop into chunks and execute those chunks in asynchronous fashion so that content thread has a chance to process users interactions.

Therefore, I filed the next two bugs to deal with each issue.

#### Simplify the XPath query in `FormData.collect` by doing elements filtering in JS
There is not much to say about this, since the implementation was relatively easy. What is cool about this is the time it takes to do the filtering was reduced greatly, from around 1.2 seconds to only about 200 milliseconds!

#### Breaking FormData's collect loop into chunks to be executed in idle dispatch
To make this work I have to: first, transform function `createLazy` to accept both a raw value and a Promise as returned by the `collect` function for each listener in `content-sessionStore.js` script. After that, I have to chunkify `FormDataInternal.collect` and then make the function return a Promise that will be resolved once the collection is complete.

I have tested the patches locally and the result is very promising. There is no noticeable lag or janking. However, there are still some tests that failed and the patches have not been landed. But I believe those tests will be an easy fix and can be landed soon.

#### \[Session Restore\] Load windows by descending z-order
When there is a session with multiple windows, Firefox current behavior is to open all windows and then start the restoration process for each window immediately after the window is opened. We could improve this by presenting users with most recently used window and then progressively restoring other windows in reverse z-order. That way, users will be presented with a window that they might continue their work on without waiting for other windows to restored.

There are two things that must be done in this bug. First, open all windows in their creation order. That way, we can keep the windows in the order users are already used to. Second, begin the window restoration after all windows have been opened, restore the most recently used window first, which has highest z-index, and then restore other windows in descending z-order.

The result is great and can be landed soon. The unit test I wrote for this bug is currently failing on Windows 7. That should be a quick fix and we can land this.

#### Summary

To recap, here is the list of bugs I've been working on during this year GSOC.

##### Finished bugs

| Bug | Name |
| :---: | :--- |
| [1331937](https://bugzilla.mozilla.org/show_bug.cgi?id=1331937) | Extend session restore Talos test |
| [1331932](https://bugzilla.mozilla.org/show_bug.cgi?id=1331932) | Disable UI animations during session restore |
| [1362330](https://bugzilla.mozilla.org/show_bug.cgi?id=1362330) | Add a C++ helper to create XPaths for session restore |
| [934967](https://bugzilla.mozilla.org/show_bug.cgi?id=934967) | \[Session Restore\] Read/write data with lz4 |
| [1379900](https://bugzilla.mozilla.org/show_bug.cgi?id=1379900) | Simplify the XPath query in FormData.collect by doing elements filtering in JS |
| [874533](https://bugzilla.mozilla.org/show_bug.cgi?id=874533) | Use speculative connect for pending tabs in the restore queue |

##### Follow-up bugs

| Bug | Name |
| :---: | :--- |
| [1380220](https://bugzilla.mozilla.org/show_bug.cgi?id=1380220) | Talos session restore loads the wrong session file |
| [1383073](https://bugzilla.mozilla.org/show_bug.cgi?id=1383073) | Properly remove mouseover listeners from tabs that don't need them anymore |
| [1380969](https://bugzilla.mozilla.org/show_bug.cgi?id=1380969) | 3.57 - 4.03% sessionrestore_no_auto_restore (linux64) regression on push 62987053a39486946f3ccf76336857f63371936a (Thu Jul 13 2017) |
| [1376173](https://bugzilla.mozilla.org/show_bug.cgi?id=1376173) | 1.87% sessionrestore (linux64) regression on push 5e40f7e493966d724d36de5d25689018c4c65d6c (Fri Jun 23 2017) |
| [1376983](https://bugzilla.mozilla.org/show_bug.cgi?id=1376983) | Firefox 54.0 doesn't restore session of Nightly 2017-06-28, shows the Firefox start page |
| [1376442](https://bugzilla.mozilla.org/show_bug.cgi?id=1376442) | Session restore fails |

##### On going bugs

| Bug | Name |
| :---: | :--- |
| [536910](https://bugzilla.mozilla.org/show_bug.cgi?id=536910) | Too many ID-less form elements makes Firefox slow |
| [1235231](https://bugzilla.mozilla.org/show_bug.cgi?id=1235231) | Sessions restore windows in random order |
| [1388664](https://bugzilla.mozilla.org/show_bug.cgi?id=1388664) | \_saveStateAsync should be executed in idle dispatch |
| [1034036](https://bugzilla.mozilla.org/show_bug.cgi?id=1034036) | \[Session Restore\] Load windows by descending z-order |
| [1386206](https://bugzilla.mozilla.org/show_bug.cgi?id=1386206) | Breaking FormData's collect loop into chunks to be executed in idle dispatch |

# Wrap up
This has been a great experience for me to work with Mike and Dão, and all other engineers and developers at the Mozilla organization. At first, it was weird to work alone, from home and interact with other people through monitor screen. But after talking to Mike about the problem, he had taught me a lot about getting motives to keep working and deliver patches to the community. It does really help, but now I'm just getting more lazy. Sorry Mike!!! :)) Mike also teached me a lot about the tools, test suites, build configuration, etc. He also reviewed my code in great detailed and was helpful when I was in trouble. It was a pleasure to work with him and have had him as my mentor. Thank Mike for letting me work with you during the summer!!

GSOC has been a great journey into the open source world. It allows students to participate in software projects and get to know development tools: version control, testing framework, IRC, etc. I'm sure we, students, have earned an invaluable experience during the summer. Thanks Google!!

For me, I'll still contribute to Firefox and finish what I started. And I'm eager to contribute to other open source projects. I'm sure there will be more fun and challenges waiting for me in open source world.

**EDIT**: Thanks Mike for taking a look at the blog post and correcting my mistakes. You really are a great guy!!!!

