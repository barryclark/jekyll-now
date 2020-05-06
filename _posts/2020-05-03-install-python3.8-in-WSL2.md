---
layout: post
title: Install python3.8 in Windows 10 WSL2
categories:
  - buenas prácticas
  - python
tags:
  - python3.8
  - wsl2
  - wsl
published: true
---

> El aprendizaje nunca agota la mente. - Leonardo da Vinci -

You can choose **venv** or **pipenv** 

## If you choose pipenv
### 1. Install python3.8 and venv for create virtual environment
{% highlight bash %}
sudo apt-get install python3.8 pipenv
{% endhighlight %}

### 2. Check python3.8 instalation
{% highlight bash %}
python3.8 -V
{% endhighlight %}

### 3. Create virtual environment with pipenv
{% highlight bash %}
pipenv install --python=/usr/bin/python3.8
{% endhighlight %}

### 4. Activate virtual environment
{% highlight bash %}
pipenv shell
{% endhighlight %}

### 5. (Not recommended very slow open bash) Default Activation for python3.8 in your bash
- Edit your .bash_profile and add:  
{% highlight bash %}
    pipenv install --python=/usr/bin/python3.8vit 
{% endhighlight %}
  
## If you choose venv
### 1. Install python3.8 and venv for create virtual environment
{% highlight bash %}
sudo apt-get install python3.8 python3.8-venv
{% endhighlight %}

### 2. Check python3.8 instalation
{% highlight bash %}
python3.8 -V
{% endhighlight %}

### 3. Create virtual environment for python 3.8
{% highlight bash %}
python3.8 -m venv ~/py38
{% endhighlight %}

### 4. Use python3.8 in bash
{% highlight bash %}
source ~/py38/bin/activate ~/py38
{% endhighlight %}

### 5. Default Activation for python3.8 in your bash
- Edit your .bash_profile and add:  
{% highlight bash %}
    source ~/py38/bin/activate ~/py38
{% endhighlight %}

### 6. Reopen your bash and check python version
{% highlight bash %}
python -V
{% endhighlight %}

