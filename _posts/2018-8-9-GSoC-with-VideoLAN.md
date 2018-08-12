---
layout: post
title: GSoC - VLC macOS Interface Redesign
---
<img align="right" src="{{ site.baseurl }}/images/vlc_logo.png" width="27%" height="27%">
Earlier this summer I got selected in [Google Summer of Code](https://summerofcode.withgoogle.com/) to work with [VideoLAN](https://www.videolan.org/index.html) on the Project [VLC macOS Interface Redesign](https://summerofcode.withgoogle.com/projects/#5721689099337728). It has been a blessing to get a chance to work on one of the highest impact open source projects. I had a phenomenal experience. Let's have a look at my contributions :)

You can have a look at my [GSoC Project Page]() and [Proposal]()

## Our Team
* [Jean-Baptiste Kempf](https://code.videolan.org/jbk) (President of VideoLAN)
* [Felix Paul Kühne](https://code.videolan.org/fkuehne) (Mentor)
* [David Fuhrmann](https://code.videolan.org/dfuhrmann) (Mentor)
* [Vibhoothi](https://code.videolan.org/vibhoothiiaanand) (Student at Amrita University)
* [Daksh Shah](https://code.videolan.org/Daksh) (Me, Student at [IIITD](https://iiitd.ac.in/))

![Team Photo]({{ site.baseurl }}/images/team.jpg)
Left to Right: Vibhoothi, Daksh(Me), Jean-Baptiste, Felix, David

## Workflow
Let's start by looking at our workflow at VLC. VLC has a [GitHub Repository](https://github.com/videolan/vlc) which is read-only.  We use our [mailing list](https://wiki.videolan.org/Sending_Patches_VLC/) to send Patches. We also have a GitLab instance at https://code.videolan.org/.

For my GSoC project, my mentors created a clone of upstream at the beginning of our coding period. It helped to keep things organized and eased the process of reviewing. You can find the repository we worked on during the summer at [https://code.videolan.org/GSoC2018/macOS/vlc](https://code.videolan.org/GSoC2018/macOS/vlc)

We have an [Issues Page](https://code.videolan.org/GSoC2018/macOS/vlc/issues?scope=all&utf8=%E2%9C%93&state=opened) on GitLab. We used this to divide the whole work into subcategories. Further, I have made [different branches](https://code.videolan.org/GSoC2018/macOS/vlc/branches/all) and [various commits](https://code.videolan.org/Daksh).

## F2F with the team
I was lucky to be able to meet with my Mentors along with Jean for a couple of days. During this duration we discussed various design aspects of several Media Players and how do we envision the new VLC design to be. We also clearly divided the parts that were to be done by each one of us (Me and Vibhoothi)

## My Work Goals
* Working in autohiding title bar: **Almost done**
  * **_There is some error when Audio Visualizer Window is opened, Felix would have a look an update soon_**
* Ping Felix for help with debugging that crash / hang on shutdown: **Fixed**
* Work on having draggable View as view: Just create a very simple view inside extra video window. Add constraints. Create a simple way (e.g. button) to move the view a bit. Then try out how well it performs with an underlying video: **Done**
  * **_It shows promising performance, hence in future - To extend it and have the actual panel as a View instead of Window_**
* Work on multiple fullscreen panels in multiple vout windows. Just test with audio visualizer, this is enough: **Done and tested**
* Get the goto time topic merged **Ready to be merged**


## Work in-depth along with code
### Jump to Time popup ([is9-goToTime]((https://code.videolan.org/GSoC2018/macOS/vlc/tree/is9-goToTime)))
It is a pop-up with which helps you to jump to any particular time. To access it, you can do any of the following:
* Press <kbd>⌘</kbd>+<kbd>J</kbd>
* Go to Playback -> Jump to Time
* Double Click on Time Elapsed or Time Remaining

### Visual Difference
A before-after image placeholder

### Features
* Now you can add time in the hh:mm:ss format
* Allows you to write bigger numbers, example: You can write 80 in seconds, and it will automatically convert that to 00:01:20
* You can switch between fields with <kbd>tab</kbd>
* You can use the stepper to change the fields

### Related Code
* [Branch](https://code.videolan.org/GSoC2018/macOS/vlc/tree/is9-goToTime)
* [Merge Request](https://code.videolan.org/GSoC2018/macOS/vlc/merge_requests/2)

### How it is inside IB(Interface Builder), Xcode
![Go to Time in IB]({{ site.baseurl }}/images/goToTime_ib.png)

### A sneak peek at constraints
<img align="left" src="{{ site.baseurl }}/images/goToTime_constraints.png">
<br />
<p align="center">
AutoLayout is a bit tricky at times. David taught me how to set the constraints in a way, that even when the language of the text changes, it still looks the way it should. It also takes care of languages that are written from right to left
</p>

![Draggable Panel under Development]({{ site.baseurl }}/images/draggablePanel_under_development.png)

## Things I learnt
* How to work on a huge code base
* Objective C
* Xcode
  * Interface Builder
  * AutoLayout
* Cocoa Framework
* Git
  There were numerous small and big things I learnt in Git and how to version code. Here are a few tips that you can make use of :)
  * `git diff --color-words` to see the changes in words instead of sentences
  * `git checkout commitHash` to temporarily switch to a branch at that particular commit, helps in testing
  * `git stash` and `git stash apply` to undo/redo the uncommitted changes
  * `git diff HEAD~2` to see the changes done since HEAD~2 (two commit before HEAD). Refer to [this post](https://stackoverflow.com/a/9903611/2806163) for more options
  * `git branch` and `git checkout branch-name` to list and change to a particular branch

## Useful Links
* [GSoC 2018: Blog by Vibhoothi](https://vibhoothiiaanand.wordpress.com/2018/08/10/gsoc-2018-final-report/)
* [GSoC 2017: VLC for macOS interface redesign by ePirat](: VLC for macOS interface redesign)
