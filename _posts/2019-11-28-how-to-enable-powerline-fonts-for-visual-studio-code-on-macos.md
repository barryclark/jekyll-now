---
layout: post
title: How to Enable Powerline Fonts for Visual Studio Code on MacOS
tags: visual studio code
updated: 2020-03-14
---
If you have Oh My Zsh installed, you may be using themes like `Agnoster`. These themes require special fonts to render the command line prompt correctly in the Visual Studio Code (VS Code) terminal. To configure VS Code follow below.

## Steps
1. Open VS Code.
2. Press `CMD+p` and type `settings.json`.
3. Open the json configuration file to VS Code.
4. Edit the file to use the power line font you want to use. For example,
```javascript
{
    ...,
    "terminal.integrated.fontFamily": "Inconsolata for Powerline",
    ...
}
```
5. Save the `settings.json` file.
6. Close your VS Code terminal and open a new one.

The fonts will now render correctly!
