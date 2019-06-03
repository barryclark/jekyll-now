---
layout: post
title: Python program for Ski Lodge TV (Part 2)
---

This is part 2 of a small series describing the design and build of a Python application for the ski lodges I have worked at for the past few years. For Part one click here.

This post will focus on the aim:
Between certain times in the morning it should show weather, lift status and avalanche web pages on a rotating carousel.
To make this happen I used a module I have used befor in a limited capacity. Selenium. It is a powerful web driver automation tool which allows a user to control Chrome, firefox and other browser with a lot of power.

The URL's I needed to load were:
1. Avalanche Report
2. Weather Patterns
3. Lift Status

First I installed the module and then wrote some basic code to open 3 tabs and load the appropriate URL's in.

	driver.execute_script("window.open('about:blank', 'tab1');")
	driver.switch_to.window("tab1")
	driver.get(url1)
	driver.execute_script("window.open('about:blank', 'tab2');")
	driver.switch_to.window("tab2")
	driver.get(url2)
	driver.execute_script("window.open('about:blank', 'tab3');")
	driver.switch_to.window("tab3")
	driver.get(url3)

This was straightforward enough however I noticed that the lift status page needed to scroll down to see the useful information. This was my first stumbling block, but one I managed to overcome swiftly. With a little look on Stack Overflow I found a lot of people with the same issue and some simple solutions.

	element = driver.find_element_by_id("liftArea")
	driver.execute_script("arguments[0].scrollIntoView();", element)

This focuses on the element id "liftArea" which I found in the developers tools. Bringing the lift status image directly into focus. 

Next I neede to find a way to scroll through the pages at a set pace, giving time for users to read and digest the info. 

    while True:
		driver.switch_to.window("tab1")
		time.sleep(interval)
		change_program_set_time(timeToSwitch)
		driver.switch_to.window("tab2")
		time.sleep(interval)
		change_program_set_time(timeToSwitch)
		driver.switch_to.window("tab3")
		time.sleep(interval)
		change_program_set_time(timeToSwitch)

By using the first code that switched windows I simply added a time.sleep interval inbetween and voila! The pages switched at a set interval until the script is stopped. 

I ran this program for a couple of days before noticing the bug that would be my second stumbling block. I would launch this program at 6am and the new avalanche report would be released at around 8am. With the current code the avalanche report page would not refresh automatically and therefore the old avalanche report would always be showing. Not safe and not good at all.

Again with some Googling and use of Stack Overflow I found a way to refresh the page on each cycle.

		driver.refresh()

Simple and it did the job.

![Selenium demo](https://raw.githubusercontent.com/RemakingEden/mysite/master/images/posts/selenium.gif)

This is all that was needed for the Selenium section and was suprisingly simple and fun and created a visually appealing program.
In the next part I will focus on trying to get VLC to start playing randomly looped videos at a set time every day. This comes with many more challenges than the code above and left me stumped for a few days.
