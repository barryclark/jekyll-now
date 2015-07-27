---
layout: post
title: Unix Screen Command
date: '2012-04-05 16:00:00'
---

# Unix Screen command
Recently I was introduced to the world of [screen][screen] also known as Screen multiplexer. But the main reason behind this is not to show you what you can find in [Google][lmgtfy] but what you can actually do with it.

So hopefully in this not so lengthy article I will show you some basic commands and you can comment with some more or just refer to the documentation for them.

## What is screen?
Per the documentation it states:
> Screen is a full-screen window manager that multiplexes a physical terminal between several pro-cesses (typically interactive shells). Each virtual terminal provides the functions of a DEC VT100 terminal and, in addition, several control functions from the ISO 6429 (ECMA 48, ANSI X3.64) and ISO 2022 standards (e.g. insert/delete line and support for multiple character sets). There is a scrollback history buffer for each virtual terminal and a copy-and-paste mechanism that allows moving text regions between windows.

## Use case
We know that we can run a process in the background by appending the & at the end of the command, but what if we want to return to see the process of that process or where it hanged or where is it, or the output, well the solution. Magically screen.

## Commands
There are basic commands that we want to use and this are the most basic ones, This is not intended to be a full information on it, but just a reference on the power of this tool.

* Create a screen session with no id 
	
    	sh-3.2# screen
* Don’t be affraid, this will probably prompt you a message or give you a blank screen where you can run all your commands
* Detach the screen – go back to original without quitting the process – keyboard keys:

		Cntrl + A + D
* List all the active screens (there are screens):

		sh-3.2# screen -ls
	* There is a screen on:

			1918.ttys000.kike   (Detached)
			1 Socket in /var/folders/zz/zzzivhrRnAmviuee+++++++++++/-Tmp-/.screen.
*  List all the active screens (there are non):

		sh-3.2# screen -ls
		No Sockets found in /var/folders/zz/zzzivhrRnAmviuee+++++++++++/-Tmp-/.screen.
* Get back to the recently detached screen
		sh-3.2# screen -r 
* Get back to a screen by the id
	* Lets get the Id from the screen
    	
        	sh-3.2# screen -ls
    * There is a screen on:
    
    		1926.ttys000.kike   (Detached)
			1 Socket in /var/folders/zz/zzzivhrRnAmviuee+++++++++++/-Tmp-/.screen.
   * Id: _1926.ttys000.kike_
   * Now attach to it with the following command: 
	
    		screen -r 1926.ttys000.kike
### Few tricks
Also a good one, instead of UNIX naming your screen you can name it by running the running:

	screen -S <screen name>
What happens if I already know what command I want to run in the screen? well start running it:

	screen <unix_command>
	eg: screen ping google.com
Did you know that you can actually watch what I’m doing in the screen without attaching to it? Yes, that is a pretty neat, so you can learn from what your friend / coworker is doing in the screen:

	screen -x <id>
	ex: screen -x 1926.ttys000.kike
I hoped you enjoy this little section of hat tricks and what you can do with this amazing tool that hopefully will prevent yourself from bash or shell sessions that killed themselves or timeout out of the blue and you get kicked out and your process dumped in the middle.

**Sources for help and more information**

* http://kb.iu.edu/data/acuy.html
* http://en.wikipedia.org/wiki/GNU_Screen
* http://www.slac.stanford.edu/grp/cd/soft/epics/extensions/iocConsole/screen.1.html
* http://www.thegeekstuff.com/2010/07/screen-command-examples/


[screen]: http://en.wikipedia.org/wiki/GNU_Screen
[lmgtfy]: http://lmgtfy.com/?q=unix+screen
