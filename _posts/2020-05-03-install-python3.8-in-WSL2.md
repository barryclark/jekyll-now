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

You can choose **venv** or **pipenv** 

## If you choose pipenv
### 1. Install python3.8 and venv for create virtual environment
- sudo apt-get install python3.8 python3.8-venv
### 2. Check python3.8 instalation
- python3.8 -V
### 3. Create virtual environment with pipenv
- pipenv install --python=/usr/bin/python3.8
### 4. Activate virtual environment
- pipenv shell
## 5. (Not recommended very slow open bash) Default Activation for python3.8 in your bash
- Edit your .bash_profile and add:  
    pipenv install --python=/usr/bin/python3.8vit 
  
  
## If you choose venv
### 1. Install python3.8 and venv for create virtual environment
- sudo apt-get install python3.8 python3.8-venv
### 2. Check python3.8 instalation
- python3.8 -V
### 3. Create virtual environment for python 3.8
- python3.8 -m venv ~/py38
### 4. Use python3.8 in bash
-  source ~/py38/bin/activate ~/py38
### 5. Default Activation for python3.8 in your bash
- Edit your .bash_profile and add:  
    source ~/py38/bin/activate ~/py38
### 6. Reopen your bash and check python version
- python -V
