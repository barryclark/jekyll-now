---
layout: post
title: Installing Jekyll Blog Platform on Mac OS El Capitan
excerpt_separator: <!--more-->
img_file: jk01.png
---
WordPress is one of the most easily used blogging platforms by newbies. Not a whole lot of coding is required. Also it is the best CMS for small business. More than **25 percent** of the world's websites are built and run on WordPress. And that percentage is increasing every day.
<!--more-->

These are all valid points but what if you need something simple, something that gets the job done quickly with no pressure on memory, hard disk space and time for configuration. Then I would like to give you Jekyll.

*Here is how to run Jekyll on your Mac El Capitan...*

&nbsp;


### 1- Download and Install Sublime Text


You will need <a href="http://www.sublimetext.com/" target="_blank">Sublime Text</a> in order to write your posts and make changes to Jekyll templates and configuration files.

Download and follow instructions from their site. Make sure to move it to your applications folder. You can choose to download either Sublime Text 2 or 3.

You don't have to purchase your license right away, you can "cancel" out of the dialog box as many times as you would like, but it is good practice to buy a license after you decide you like it.

&nbsp;


### 2- Install XCode from the App Store.

Alternatively you can type the below in your bash terminal

`xcode-select --install`


Follow the prompts to complete the install. This is apple's C compiler which will enable you to compile native apps from source. (i.e. Ruby). If you can't find the terminal, simply search "terminal" in spotlight.

&nbsp;

### 3- Then, to install Jekyll, simply enter following command:

`sudo gem install jekyll`

The above command will install all of Jekyll’s dependencies automatically, so just sit back and give it a few minutes. Once it’s finished, that’s it, you’ve installed Jekyll!


&nbsp;

### 4- Create your site

On your terminal navigate to the folder where you want Jekyll to generate its file. Once you are there simply type.

`jekyll new ~/jekyll/my-site`

Assuming that ~/jekyll/my-site is the directory you want to set your site up.

&nbsp;

### 5- Start the server

Simply type:

`jekyll serve --watch`

Success. Your new Jekyll site should be up and running at either http://localhost:4000/ or http://127.0.0.1:4000/ 








