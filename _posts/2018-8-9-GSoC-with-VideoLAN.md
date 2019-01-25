---
layout: post
title: GSoC - VLC macOS Interface Redesign
---
<img align="right" src="{{ site.baseurl }}/images/vlc_logo.png" width="27%" height="27%">
Earlier this summer I got selected in [Google Summer of Code](https://summerofcode.withgoogle.com/) to work with [VideoLAN](https://www.videolan.org/index.html) on the Project [VLC macOS Interface Redesign](https://summerofcode.withgoogle.com/projects/#5721689099337728). It has been a blessing to get a chance to work on one of the highest impact open source projects. I had a phenomenal experience. Let's have a look at my contributions :)

You can have a look at my [GSoC Project Page](https://summerofcode.withgoogle.com/projects/#5721689099337728) and [Proposal]({{ site.baseurl }}/images/proposal.pdf)

Feel free **to jump right to the [code](https://code.videolan.org/GSoC2018/macOS/vlc/branches)**

## Our Team
* [Jean-Baptiste Kempf](https://code.videolan.org/jbk) (President of VideoLAN)
* [Felix Paul Kühne](https://code.videolan.org/fkuehne) (Mentor)
* [David Fuhrmann](https://code.videolan.org/dfuhrmann) (Mentor)
* [Vibhoothi](https://code.videolan.org/vibhoothiiaanand) (Student at Amrita University)
* [Daksh Shah](https://code.videolan.org/Daksh) (Me, Student at [IIITD](https://iiitd.ac.in/))

![Team Photo]({{ site.baseurl }}/images/team.jpg)
Left to Right: Vibhoothi, Daksh(Me), Jean-Baptiste, Felix, David

## Workflow
Let's start by looking at our workflow at VLC. VLC has a [GitHub Repository](https://github.com/videolan/vlc) which is read-only.  We use our [mailing list](https://wiki.videolan.org/Sending_Patches_VLC/) to send Patches. We also have a GitLab instance at [https://code.videolan.org/](https://code.videolan.org/).

For my GSoC project, my mentors created a clone of upstream at the beginning of our coding period. It helped to keep things organized and eased the process of reviewing. You can find the repository we worked on during the summer at [https://code.videolan.org/GSoC2018/macOS/vlc](https://code.videolan.org/GSoC2018/macOS/vlc)

We have an [Issues Page](https://code.videolan.org/GSoC2018/macOS/vlc/issues?scope=all&utf8=%E2%9C%93&state=opened) on GitLab. We used this to divide the whole work into subcategories. Further, I have made [different branches](https://code.videolan.org/GSoC2018/macOS/vlc/branches/all) and [various commits](https://code.videolan.org/Daksh).

## Face-To-Face with the team
I was lucky to be able to meet with my Mentors along with Jean-Baptiste for a couple of days. VideoLAN was very kind to sponsor me to come and meet our mentors in Europe. I would like to thank them from the bottom of my heart.
During our meeting, we discussed various design aspects of several Media Players and how do we envision the new VLC design to be. We also clearly divided the parts that were to be done by each one of us (Me and Vibhoothi). This helped kickstart the work and proved to be extremely useful and increased the productivity exponentially :D

# My Work Goals
1. Add a feature enhancement to Go-to-time popup[ (more details)](#go-to-time): **Ready to be merged**
2. *Draggable Panel instead of ControlBar in windowed video  window* To bring the draggable-control-panel (currently only in Fullscreen more) inside the normal Video playing windows and test with multiple Video Windows[ (more details)](#draggable-panel): **Done and tested**
3. Title Bar Autohiding[ (more details)](#autohidden-border): **Almost done**
4. Make the draggable-control-panel as a View instead of a separate window. For now, just test with a plain view and see how it performs with an underlying video being played[ (more details)](#dp-as-view): **Done**
  * **_It shows promising performance, hence in future - To extend it and have the actual panel as a View instead of Window_**.

# Work in-depth along with code
## <a name="go-to-time"></a>1. Go/Jump to Time popup ([branch: is9-goToTime]((https://code.videolan.org/GSoC2018/macOS/vlc/tree/is9-goToTime)))
It is a pop-up which helps you to jump to any particular time. To access it, you can do any of the following:
* Press <kbd>⌘</kbd>+<kbd>J</kbd>
* Go to Playback -> Jump to Time
* Double Click on Time-Elapsed or Time-Remaining (in the ControlBar)

### Visual Difference
![Before and After]({{ site.baseurl }}/images/gtt_Before_After.png)

### Features
* Now you can add time in the hh:mm:ss format
* Allows you to write bigger numbers, example: You can write 80 in seconds, and it will automatically convert that to 00:01:20
* You can switch between fields with <kbd>tab</kbd>
* You can use the stepper to change the fields

### Related Code
* [Branch](https://code.videolan.org/GSoC2018/macOS/vlc/tree/is9-goToTime)
* [Merge Request](https://code.videolan.org/GSoC2018/macOS/vlc/merge_requests/2)
* [Issue-9](https://code.videolan.org/GSoC2018/macOS/vlc/issues/9)

### How it is inside IB(Interface Builder), Xcode
![Go to Time in IB]({{ site.baseurl }}/images/goToTime_ib.png)

### A sneak peek at constraints
<img align="left" src="{{ site.baseurl }}/images/goToTime_constraints.png">
<br />
<p align="center">
AutoLayout is a bit tricky at times. David taught me how to set the constraints in a way, that even when the language of the text changes, it still looks the way it should. It also takes care of languages that are written from right to left
</p>

## <a name="draggable-panel"></a>2. Draggable Panel instead of ControlBar in windowed video  window ([Issue 1](https://code.videolan.org/GSoC2018/macOS/vlc/issues/1))
* Removed the fixed ControlBar and replaced it with a movable draggable panel. Just like the fullscreen controller
* On resizing or moving the window, the draggable panel re-centers along with the window. There is a bit of a delay+drag as the panel is a window and not a view
* The draggablePanel is constrained in the bounds of the window.

## <a name="autohidden-border"></a>3. Title Bar Autohiding ([Issue 3](https://code.videolan.org/GSoC2018/macOS/vlc/issues/3))
Window's title bar (and its close / minimize / maximize icons) automatically appears if the mouse is moved over the window, and disappear again if the mouse pointer hides or leaves the window.

## Implementation of Issue 1 and 3 ([branch: PanelInMultipleVout](https://code.videolan.org/GSoC2018/macOS/vlc/tree/PanelInMultipleVout))

![Issue 3 and 1]({{ site.baseurl }}/images/is3and1.png)

* Code for [Making the titleBar seamless](https://code.videolan.org/GSoC2018/macOS/vlc/commit/f287ebb171342ca5e2324c10cf0f60f06a1b555d)
* Code for [draggable panel](https://code.videolan.org/GSoC2018/macOS/vlc/commit/4777cf0d1efd11f129ff563cb9dec2e57536df9e)

## 4. <a name="dp-as-view"></a>Draggable Panel as a View
![Draggable Panel under Development]({{ site.baseurl }}/images/draggablePanel_under_development.png)
The draggablePanel was earlier a window. Having the draggablePanel as a window was creating a problem. When the video window was moved, in order to keep it at its place we had to programmatically move the panel in the same way. But a drag and a delay was coming in that.

So we decided to make it as a view instead of a window. After testing, it seems to have solved the problem :D

* It remains at its position even when the window is moved
* Added the panel as a custom NSView
![Draggable Panel in Xcode]({{ site.baseurl }}/images/dpasview.png)
* Created two new Classes `VLCDraggablePanelView` and `VLCDraggablePanelController` to handle the operations of the Panel
* Connected all the components with the related class files

### TO-DO
Currently the buttons are non-functional. Discussion on how the classes and their instances need to be done, after which it can be implemented.

# Things I learnt
* How to work on a huge code base
* Objective C
* Xcode
  * Interface Builder
  * AutoLayout
* Cocoa Framework
* Git
  * There were numerous small and big things I learnt in Git and how to version code. Here are a few tips that you can make use of :)
    * `git diff --color-words` to see the changes in words instead of sentences
    * `git checkout commitHash` to temporarily switch to a branch at that particular commit, helps in testing
    * `git stash` and `git stash apply` to undo/redo the uncommitted changes
    * `git diff HEAD~2` to see the changes done since HEAD~2 (two commit before HEAD). Refer to [this post](https://stackoverflow.com/a/9903611/2806163) for more options
    * `git branch` and `git checkout branch-name` to list and change to a particular branch

## Useful Links
* [GSoC 2018: Blog by Vibhoothi](https://vibhoothiiaanand.wordpress.com/2018/08/10/gsoc-2018-final-report/)
* [GSoC 2017: VLC for macOS interface redesign by ePirat](https://epir.at/2017/08/26/gsoc-2017-vlc-for-macos-interface-redesign/)
