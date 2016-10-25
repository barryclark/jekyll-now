---
layout: page
title: about
permalink: /about/
---
__Matt Elggren__  

keywords: software, engineering, quality, books, typography, baseball, history, code, utah, seattle, apple, unix, music, sailing, culture, technology, family, dogs, cats, people, nature, science, religion, philosophy, politics, pragmatism, idealism, government, math, counter-culture, design, fiction, cinema, photography, cycling, epistemology, intelligence, machines, goedel, escher, bach ...  

__contrafactum.io__  
[Contrafactum](https://en.wikipedia.org/wiki/Contrafactum) is a fascinatingly little recursive loop. It's something we do without even noticing; taking something familiar and re-working it into something new.  

See various references the idea in Hofstadter's *"Gödel, Escher, Bach: an Eternal Golden Braid"*.   

__Desk Shot__  
![Not just any desk.](https://dl.dropboxusercontent.com/u/37666732/Photos/desk_161025.jpg "Not just any desk.")  

__Bash Profile__  

`# Perhaps sharing one's bash_profile goes to far?`  
`# This one's kept in Dropbox and included on all my machines`   

`# --- begin: mattelggren setup ---`

`PATH="~/bin:$PATH"`
`export PATH`

`export LESS="eMqc"`  
`alias desktop="cd ~/Desktop"`  
`alias ls="ls -la"`  
`alias rm="rm -i"`  
`alias cp="cp -i"`  
`alias mv="mv -i"`  
`alias bb="bbedit"`  
`alias sublime="subl";`

`function prompt`  
`{`  
`local BICYAN="\[\033[1;96m\]"`  
`local BIRED="\[\033[1;91m\]"`  
`local PROMPT_TEXT="Yes, master? "`  
`local PROMPT_COLOR=${BICYAN}`   
`local SUDO_PROMPT_TEXT="Yes, my lord? "`  
`local SUDO_PROMPT_COLOR=${BIRED}`  
`export PS1="\[\e]2;\u@\H \w\a\e${PROMPT_COLOR}${PROMPT_TEXT}\[\e[0m\] "`  
`export SUDO_PS1="\[\e]2;\u@\H \w\a\e${SUDO_PROMPT_COLOR}${SUDO_PROMPT_TEXT}\[\e[0m\] "`  
`}`  
`prompt`  

`# --- end: mattelggren setup ---`  