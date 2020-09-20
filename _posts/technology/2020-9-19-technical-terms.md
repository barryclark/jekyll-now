---
layout: post
title: Creating custom scripts in shell 
---

I had a problem where jupyter notebook command gives error that command not found. 

then i found out that this shell exists in a directory that is not on $PATH 
variable value. 

There are several ways to fix it. 
1. i could add this path to $PATH and set that in my profile that gets executed
every time i create a new terminal window. This is standard approach. 
2. I create a text file. put the commands that i want to run in that and i copied
this file into one of the directory that is already on the path. Gave chmod 777
permission to this file and voila now i can type name of this script from anywhere
and it will execute my command. 

i created a script called run-jupyter and copied to /usr/local/bin 
