---
layout: post
title: How to Enable Powerline Fonts for Visual Studio Code on MacOS
---
If you have Oh My Zsh installed. You may be using themes like `Agnoster`. These themes require special fonts to render the command line propmpt properly in the Visual Studio Code terminal. To configure Visual Studio Code to render the prompt properly follow below.

Open Visual Studio Code. Press CMD+p and type `settings.json`. You'll open the json configuration file to Visual Studio Code. Edit the file to use the power line font you want to use. `...` denotes other settings already in the file. For example: 

```javascript
{
    ...,
    "terminal.integrated.fontFamily": "Inconsolata for Powerline",
    ...
}
```

Save the `settings.json` file. Close your terminal and open a new one. The fonts should now render properly.
