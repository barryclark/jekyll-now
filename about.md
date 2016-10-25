---
layout: page
title: about
permalink: /about/
---
`# --- begin: matt.elggren setup ---`

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

`# --- end: matt.elggren setup ---`  