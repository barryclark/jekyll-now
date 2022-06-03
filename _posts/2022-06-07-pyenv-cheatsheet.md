---
layout: post
title: pyenv Cheatsheet
categories:
  - buenas prácticas
  - python
  - pyenv
  - aprendizaje
tags:
  - pyenv
  - mejora continua
published: false
---

> “The best things in life can not be experienced virtually.” ― Michael ONeill, Road Work: Images And Insights Of A Modern Day Explorer

## You need this configuration in your .zshrc or .bashrc to to guarantee the correct functioning of pyenv
```bash 
eval "$(pyenv init --path)"  
eval "$(pyenv init -)"  
export PATH=$HOME/.pyenv/shims/python:$PATH  
export PATH=$HOME/.pyenv/shims/:$PATH
```

## See available python versioss to install
```bash
pyenv install --list
```
- Yo can filter this list:
```bash
pyenv install --list | grep " 3\.[678]"
----------

  3.6.0
  3.6-dev
  3.6.1
  3.6.2
  3.6.3
  3.6.4
  3.6.5
  3.6.6
  3.6.7
  3.6.8
  3.7.0
  3.7-dev
  3.7.1
  3.7.2
  3.8-dev
```

## Install new version python in pyenv
```bash
pyenv install -v 3.7.2
```

## See available python versions intalled in my machine
```bash 
pyenv versions
```
- The asterisk marks the version in use.

## Deactivate pyenv shell
```bash 
pyenv shell --unset
```

## Use Local python version
```bash 
pyenv local 3.8.12  
```
- This command create a local file named .python-version with the local version that you wanto to use.
- If you delete this file you use the global version of python again.

## Use Global python version
```bash 
pyenv global 3.8.12
```
- Set enviroment to use this python version in all folders of your machine.
- Except the folder that have configured a local version



