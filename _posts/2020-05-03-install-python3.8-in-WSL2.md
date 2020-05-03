---
layout: post
title: Pipenv cheatsheet
categories:
  - buenas prácticas
  - python
tags:
  - python3.8
  - wsl2
  - wsl
published: true
---

> El aprendizaje nunca agota la mente. -Leonardo da Vinci -

# Install python3.8 in Windows 10 WSL2

## 1. Install python3.8 and venv for create virtual environment
- sudo apt-get install python3.8 python3.8-venv
## 2. Check python3.8 instalation
- python3.8 -V
## 3. Create virtual environment for python 3.8
- python3.8 -m venv ~/py38
## 4. Default Activation for py38 virtual enviroment in bash
- Edit your .bash_profile and add:  
    source ~/py38/bin/activate ~/py38
## 5. Reopen your bash and check python version
- python -V
