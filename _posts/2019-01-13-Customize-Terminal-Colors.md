---
layout: post
title: Customize Terminal Colors
---

I use iTerm2+zsh+oh-my-zsh. Recently I wished to change the dark theme to a ligher one.

The command I ended up using: `PROMPT='%{$fg[green]%}%~%{$fg_bold[blue]%}$(git_prompt_info)%{$reset_color%} '`

Few super useful links that I came across

* https://stackoverflow.com/a/2534676/2806163
	That is, to add
	```
	autoload -U colors && colors
PS1="%{$fg[red]%}%n%{$reset_color%}@%{$fg[blue]%}%m %{$fg[yellow]%}%~ %{$reset_color%}%% "
	```
	in .zshrc (though I just did it on terminal to test)
* To change the prompt: https://stackoverflow.com/a/42085070/2806163
* How to get the prompt properly: http://zsh.sourceforge.net/Doc/Release/Prompt-Expansion.html (though I did not use this)
* https://medium.freecodecamp.org/jazz-up-your-zsh-terminal-in-seven-steps-a-visual-guide-e81a8fd59a38
* https://github.com/mbadolato/iTerm2-Color-Schemes
* https://stackoverflow.com/a/35357072/2806163