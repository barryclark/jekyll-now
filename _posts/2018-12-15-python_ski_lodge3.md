---
layout: post
title: Python program for Ski Lodge TV (Part 3)
---

This is part 3 of a small series describing the design and build of a Python application for the ski lodges I have worked at for the past few years. 

For Part one click [here](https://jsparkes.com/python_ski_lodge/).

This post will focus on the aim:
After a certain time when most guests have left switch to a loop of snow films for the guests left behind.
To achieve this I wanted to use old faithful VLC media player. I knew it could create looped playlists and play fullscreen. I just needed to figure out how to trigger it with Python.

First I looked into Python Bindings, this looked promising but I found the documentation confusing and hard to understand. I tried for a while but slowly became disheartened.

It was at this point I found someone talking about VLC's command line ability. After looking into it quickly I found a very simple command.

      vlc -L -Z /home/directory/filmdirectory -f --no-audio

This simple command is incredibly powerful. It achieved everything I wanted in one go. "vlc" launched the app. "-L" loops infinitely. -Z randomises the selection. The directory is a folder where all the films are located. -f is fullscreen and --no-audio turns off the audio track. 

With a quick search I found that with importing os and using os.system a command line action could be taken easily on Linux via Python.

	os.system("vlc --LZ %a -f --no-audio" % vlcPlaylistDirectory)

That was the final command and all that was needed to trigger the automatic playing of a folder of snow films.

What struck me with this part of the program is how simple problem solving can be some times. With one line of code everything is taken care of. I know this would not be scaleable for Windows systems etc however for the basic job this program needs to do. This basic fix is perfect and (I think) quite elegant.

On the next post I will talk about the final step of the program. Scheduling so that the application would automatically switch to snow films at a specific time and automatically running when the Pi is turned on.
