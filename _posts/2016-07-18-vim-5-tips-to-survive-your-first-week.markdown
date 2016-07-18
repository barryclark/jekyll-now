---
layout: post
title: "Vim: 5 Tips to Survive Your First Week"
date: July 18, 2016
tagline: "That I learned while starting to use Vim"
tags : [vim]
---

![][vim-logo]

Some months ago I organized a workshop at Springest to share the basics of tmux and Vim with the rest of the team. [I already wrote a post about tmux](http://www.miriamtocino.com/articles/tmux-configuration-from-scratch). And now it's time to say something about Vim!

I will be splitting the content of the workshop into different posts, this being the first one where I will focus on how to survive your first week!

It goes without saying that as software developers, our jobs depend on continuous learning. It's therefore incredibly useful to jump in as a beginner on new tools and subjects from time to time. So why don't we all give Vim a try today? Here are 5 tips to help you go through your very first days.

#### Vimtutor

Vim comes along with its own interactive tutorial: [Vimtutor](http://linuxcommand.org/man_pages/vimtutor1.html). Following the tutorial takes about 30 minutes, where you will learn your first Vim commands: how to create and open files, make changes and save them, etc.

Open up a shell, type `vimtutor` and you are ready to go!

#### Avoid too much configuration

Vim allows you to configure and extend its behavior almost without boundaries. Be careful here, since it is recommended to spend your first weeks getting to know Vim's core behavior and its default key bindings. Try to stay away from any type of customization or configuration. I promise that when you look back in the future, you will thank yourself ;)

However it is totally allowed to _borrow_ some basic configuration from a friend. Personally I learn things much better if my screen looks nice (I guess because of my design background), and the default vim colors were not so appealing for me. So some configuration was needed in my case. Back then, I borrowed [Mike Coutermarsh's configuration](https://github.com/mscoutermarsh/dotfiles/blob/master/vimrc). But you can check out my [.vimrc](https://github.com/miriamtocino/dotfiles/blob/master/vimrc) as well if you prefer.

If you encounter any issues when using my configuration, [ping me on twitter](https://twitter.com/miriamtocino) and I'll help you out.

#### Build up a cheat sheet

There are some very good cheat sheets out there when starting to learn vim, like [this one](http://www.viemu.com/a_vi_vim_graphical_cheat_sheet_tutorial.html), that can serve as a great reference. However it is very important that you build up your own while you are learning.

For those of you familiar with [Asana](https://asana.com/), I created a single project when I started learning: **Mastered Vim**. I was regularly adding new tasks (following different topics, like motions and moving, windows, tabs, etc.) and writing down all related key bindings in the task description. Every morning before jumping into Vim, I would review all of them and mark any task that I could already remember as completed!

This method worked great for me, and I encourage you to do the same.

#### Ask for help

There will be moments in which you need to ask for help. In this case, you have several options:

1. **Vim's Built-In Help** - Great resource when you know exactly what you are searching for. Open up vim and type `:help <vim-command>`. From there you can follow any tag under the help by typing `Ctrl + ]`.

    [![](http://img.springe.st/20160718-xz9h4.png)](http://img.springe.st/20160718-xz9h4.png)

2. **[Vim Wiki](http://vim.wikia.com/)** - Visit this site when you have other more general questions, like _how to re-indent a whole file_.

3. **Friends** - At Springest there are other people that use Vim too. We created our own _#vim_ channel in Slack. I love it when I go there with a question aiming for a very direct answer and see others starting a discussion about the different ways in which it can be accomplished within the Vim world!

#### Stick with it

Last but not least, you need to make a commitment to yourself - _keep going when the landscape gets dark_. Normally it takes **about a week** to feel productive again. From there on you can only continue getting more and more efficient, which is something that definitely helps you grow as a developer. Enjoy the journey!

> This post was first published on the [Springest Devblog](http://devblog.springest.com/vim-5-tips-to-survive-your-first-week).

[vim-logo]: http://miriamtocino.github.io/images/posts/vim-logo.svg
