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

We have an [Issues Page](https://code.videolan.org/GSoC2018/macOS/vlc/issues?scope=all&utf8=%E2%9C%93&state=opened) on GitLab. We used this to divide the whole work into sub categories. Further, I have made [different branches](https://code.videolan.org/GSoC2018/macOS/vlc/branches/all) and [various commits](https://code.videolan.org/Daksh).

## F2F with the team
I was lucky to be able to meet with my Mentors along with Jean for a couple of days. During this duration we discussed various design aspects of several Media Players and how do we envision the new VLC design to be. We also divided the work to be done by Me and by Vibhoothi.
### My Work Goals
* Working in autohiding title bar: **Almost done**
  * **_There is some error when Audio Visualizer Window is opened, Felix would have a look an update soon_**
* Ping Felix for help with debugging that crash / hang on shutdown: **Fixed**
* Work on having draggable View as view: Just create a very simple view inside extra video window. Add constraints. Create a simple way (e.g. button) to move the view a bit. Then try out how well it performs with an underlying video: **Done**
  * **_It shows promising performance, hence in future - To extend it and have the actual panel as a View instead of Window_**
* Work on multiple fullscreen panels in multiple vout windows. Just test with audio visualizer, this is enough: **Done and tested**
* Get the goto time topic merged **Ready to be merged**


![Draggable Panel under Development]({{ site.baseurl }}/images/draggablePanel_under_development.png)
