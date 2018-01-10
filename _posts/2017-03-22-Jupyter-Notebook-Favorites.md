---
layout: post
title: My Favorite Things about Jupyter Notebooks
description: "A notebooks that shows some my of favorites things to do with Jupyter Notebooks"
tags: [jupyter notebooks]
modified: 2017-03-22
---
This demonstrates some of my favorites tweaks for Jupyter Notebooks.<!--more--> 

One of the many great things about Jupyter Notebooks is the ability to add extensions.

The easiest way to add Jupyter Notebook extensions is through nbextensions. You can install it using conda-forge:
```python
conda install -c conda-forge jupyter_contrib_nbextensions
```
You can also use:
```
pip install jupyter_contrib_nbextensions
```

Then:
1. Enter: jupyter contrib nbextension install --user
1. Go to the Nbextensions tab and enable it from there

# Running pip from Jupyter Notebooks

You can run external commands by putting an exclamation mark in front of the command. This means that you can make pip install directly from Jupyter Notebooks:


```python
!pip install numpy
```

    Requirement already satisfied: numpy in c:\users\hmisys\anaconda3\lib\site-packages
    

# Jupyter Notebook extensions

## 2to3 converter

Converts Python 2 to Python 3 in a single click

http://jupyter-contrib-nbextensions.readthedocs.io/en/latest/nbextensions/code_prettify/README_2to3.html


## Autopep8

Formats your code based on the PEP8 guide in a single click

Install with `pip install autopep8`, then enable it

# Printing LaTeX

Jupyter Notebooks use MathJax to render LaTeX in Markdown. To add LaTeX, simply surround your statement with `$`:

For txampe $$c = \sqrt{a^2 + b^2}$$ is equation

If you want to center your formula, surround it with `$$`
$$
\begin{align}
\nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} & = \frac{4\pi}{c}\vec{\mathbf{j}} \\   \nabla \cdot \vec{\mathbf{E}} & = 4 \pi \rho \\
\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t} & = \vec{\mathbf{0}} \\
\nabla \cdot \vec{\mathbf{B}} & = 0
\end{align}
$$

# nbconvert



Convert Jupyter Notebooks to various formats, including HTML, LaTeX, PDF, and Markdown

`jupyter nbconvert --to html mynotebook.ipynb`

See how I use it here in [this post](https://jss367.github.io/jupyter-notebooks-in-blog/).

<script type="text/javascript"
    src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
</script>