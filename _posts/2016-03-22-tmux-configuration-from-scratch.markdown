---
layout: post
title: "tmux configuration from scratch"
date: March 22, 2016
tagline: "How I use tmux to code smoother and faster"
tags : [tmux, vim]
---

![][tmux-logo]

I started using vim together with tmux a couple of months ago. After surviving my first week, I organized a workshop to share what I learned with the rest of the team and convince the resistors to switch. :)

This post will focus on tmux, but stay tuned for a follow-up post about vim!

#### Basic setup

First things first, so what's tmux? Well, taken from [their own documentation](https://tmux.github.io/):

**Tmux is a terminal multiplexer which lets you switch easily between several programs in one terminal, detach them and reattach them to a different terminal.**

Which basically makes your terminal look like this:

[![tmux basic setup](http://img.springe.st/20160322-yfa9u.png)](http://img.springe.st/20160322-yfa9u.png)

Now you might be wondering, _what's the difference between tmux and what I have now?_

> For many people, the main reason to use tmux windows over tabbed terminals is that with regular terminals, if the window manager crashes, you'll lose the terminals as well. However, this won't happen with tmux, which keeps the terminals running in the background. You can re-attach a new terminal to them at any time. What I also like about it is that I can create sessions for each of my projects. This keeps them organized and makes it very easy to switch between them, so you can find projects exactly where you left them. ;)

Awesome! To start using tmux you need to install it first. If you are already using [Homebrew](http://brew.sh/) to manage your packages, you can just run:

{% highlight bash %}
$ brew install tmux
{% endhighlight %}

Below I will guide you through some changes in the configuration to make it behave in a more intuitive way. These changes need to be done in the `~/.tmux.conf` file, so if you still don't have that file, go and create it now:

{% highlight bash %}
$ touch ~/.tmux.conf
{% endhighlight %}

#### Meeting the "prefix"

First of all let me introduce you to _"prefix"_ because every time that you want to _"speak"_ to tmux you will need to use it. Its default value is `Ctrl+b`, but it can be changed to any keybinding that best fits your fingers. ;) In my case, I decided to bind it to `Ctrl+s`:

{% highlight bash %}
# ~/.tmux.conf
unbind C-b
set -g prefix C-s
{% endhighlight %}

At this point it can also be quite useful to remap the _Caps Lock_ key to _Control_. If you are using Mac you need to go to the section **Modifier Keys** under your **Keyboard** preferences and select **Control** for **Caps Lock**.

#### Finding a friend

While I was hunting for some inspiration before deciding to give tmux and vim a shot, I came across [this talk](https://www.youtube.com/watch?v=_NUO4JEtkDw) by Mike Coutermarsh in which he shares some very good tips. This is one of them: **copy the configuration file from a friend**. He is referring to `vimrc`, but it also counts for the `tmux.conf` file. You can have a look at my configuration [here](https://github.com/miriamtocino/dotfiles/blob/master/tmux.conf), which is a modified version of [Thoughtbot's](https://github.com/thoughtbot/dotfiles/blob/master/tmux.conf) and [Mike Coutermarsh's](https://github.com/mscoutermarsh/dotfiles/blob/master/tmux.conf).

#### Reloading the configuration

Whenever you find yourself making any changes in the configuration, don't forget to reload it by running:

{% highlight bash %}
$ tmux source-file ~/.tmux.conf
{% endhighlight %}

Which I have bound to `<prefix> r`:

{% highlight bash %}
# ~/.tmux.conf
bind-key r source-file ~/.tmux.conf \; display-message "~/.tmux.conf reloaded"
{% endhighlight %}

#### tmux objects overview

Before we move on with some other configuration tips, let's talk briefly about some important concepts that will help you understand how tmux works.

##### Session

The first concept to be aware of is **sessions**. A session refers to a named collection of one or more windows. Typically I will create one session for each of my projects and give it the name of the project.

![sessions overview](http://img.springe.st/20160321-4kk0e.png)

##### Window

Next comes **windows**. A window refers to a single screen within tmux, similar to tabs in terminal applications or browsers. Remember that at any given time, a client will be attached to a single window.

##### Pane

Last but not least, we find **panes**. A pane refers to a portion of a window running a single process, e.g. vim, rails server, rails console, etc. Panes can be oriented either vertically or horizontally and resized as needed.

[![windows and panes](http://img.springe.st/20160322-fbyvh.png)](http://img.springe.st/20160322-fbyvh.png)

Now you might be curious about what my screen looks like with so many possibilities between sessions, windows and panes.

> As a Rails developer what I found to be working for me is to have vim in a first window along with a right-side pane for committing code to Github or running tests. Any background process, like the rails server, workers or Elasticsearch, is running in an additional window, together with the rails console.

#### Some commands to remember

Below is a list of the most important commands I use on a daily basis. It might feel overwhelming at first, but you will get the hang of it sooner than you think. Believe me!

##### Sessions

{% highlight bash %}
# create a new session
$ tmux new-session -s {name}
# list out sessions and a brief summary
$ tmux ls
# kill/delete session
$ tmux kill-session -t {name}
# list out sessions and switch easily between them
<prefix> s
# disconnect/dettach tmux client while keeping the session alive
<prefix> d
{% endhighlight %}

##### Windows

{% highlight bash %}
# create a new window
<prefix> c
# go to next window
<prefix> n
# go to previous window
<prefix> p
# go to last window
<prefix> l
{% endhighlight %}

By default, windows will open in the directory of the current session. This will allow them to open in the directory of the current pane:

{% highlight bash %}
# ~/.tmux.conf
bind c new-window -c "#{pane_current_path}"
{% endhighlight %}

##### Panes

You can create and split panes in a more intuitive way by adding the following configuration, making sure that it remembers the current path as well:

{% highlight bash %}
# ~/.tmux.conf
bind-key - split-window -v -c '#{pane_current_path}'
bind-key \ split-window -h -c '#{pane_current_path}'
{% endhighlight %}

Which turns on these key bindings:

{% highlight bash %}
# split window vertically
<prefix> -
# split window horizontally
<prefix> \
# kill pane
<prefix> x
{% endhighlight %}

Adding the following configuration allows you to navigate your vim splits and tmux panes at the same time by using the keys `Ctrl + h/j/k/l`, so no more need for the prefix with these ones:

{% highlight bash %}
# ~/.tmux.conf
is_vim='echo "#{pane_current_command}" | grep -iqE "(^|\/)g?(view|n?vim?x?)(diff)?$"'

bind -n C-h if-shell "$is_vim" "send-keys C-h" "select-pane -L"
bind -n C-j if-shell "$is_vim" "send-keys C-j" "select-pane -D"
bind -n C-k if-shell "$is_vim" "send-keys C-k" "select-pane -U"
bind -n C-l if-shell "$is_vim" "send-keys C-l" "select-pane -R"
{% endhighlight %}

You can resize the active pane with `Shift + L/R/D/U` (which refers to each of the arrows keys). The related configuration to enable those is:

{% highlight bash %}
# ~/.tmux.conf
bind -n S-Left resize-pane -L 2
bind -n S-Right resize-pane -R 2
bind -n S-Down resize-pane -D 1
bind -n S-Up resize-pane -U 1
{% endhighlight %}

I find it also very useful to focus on the contents of a single pane temporarily and unzoom as needed. The `<prefix> z` command acts as a toggle to both zoom a pane and unzoom. Try it out!

#### Wrapping up

Now it's your turn! After these notes, I think you are ready to start playing around with tmux, which might be hard at first. My best advice is to not think about it too much - just go for it and stick with it!

> This post was first published on the [Springest Devblog](http://devblog.springest.com/tmux-configuration-from-scratch).

[tmux-logo]: http://miriamtocino.github.io/images/posts/tmux-logo.svg
