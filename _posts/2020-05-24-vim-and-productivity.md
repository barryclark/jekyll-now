---
layout: post
title: vim and productivity
---

You cringed, didn't you? It's certainly given. I won't mind if you did cringe reading the title of this post. This is yet another post on the internet telling people why vim is awesome.  
In my career as a software developer so far, I've mostly used vim as a code editor. But it was not until recently that I realized that I've been underutilizing it.  
I, like everybody else, am going through a mid-career crisis right now, asking myself as to where exactly I am headed. A small step in the journey of self-discovery was introspecting my productivity. So there! I rediscovered vim.  

Through this medium, I'd like to share my learning and my vim configuration in a hope that it might help others treading the same path.  
## vim basics
My earlier usage of vim was pretty basic.
open a file
```
vim <filname>
```
Edit file in the insert mode. Never used, movement, replace, change commands. Used visual mode for copy-paste  
```
v, y, p, u
```
close the editor  
```
:wq!
```
That's it. I wasn't kidding about underutilization!  

I found this great resource to get the basics through right away. I have based my .vimrc after the recommendations from the below lecture from MIT. I didn't feel the need to repeat the material in the post below here. Please go through the lecture and come back to check out my editor.  
[mit-lecture](https://missing.csail.mit.edu/2020/editors/)  

## My vim configuration  
I've made my own .vimrc based on my project needs.
[myvim](https://github.com/dayarthvader/tools/tree/tools/vim)  
You will find my current .vimrc in the above branch. I needed source tree file explorer, fuzzy file finder, autocompletion, auto-compile, and a pleasant-looking color scheme. I've been able to supplement these needs with the help of vim plugins. I've shared short video demos of how my editor looks below.  

## source tree explorer - NerdTree  
[NerdTree](https://youtu.be/pxrvDFwkuTE)  

## fuzzy file finder - CtrlP  
[ctrlp](https://youtu.be/cwJfqCBzUb4)  

## autocompletion and auto-compile  
[ycm](https://youtu.be/1bCgfLsH4BQ)  

I wish to explore more of this world, one command at a time, and one plugin at a time. Do comment and let me know what you think about the vim configuration. Suggest some good plugins too. I am looking forward to trying out fugitive in the near future. Happy hacking :)  
