---
layout: post
title: My favorite things to do with Jupyter Notebooks
---

One of the many great things about Jupyter Notebooks is the ability to add extensions.

The easiest way to add Jupyter Notebook extensions is through nbextensions. You can install it using conda-forge:
```python
conda install -c conda-forge jupyter_contrib_nbextensions
```
You can also use:
```
pip install jupyter_contrib_nbextensions
```

Then do:

jupyter contrib nbextension install --user

Then go tot the Nbextensions tab and enable it from there



*Here are some of my favorite Jupyter Notebook extensions:*

**2to3 converter**:
-Converts Python 2 to Python 3 in a single click

http://jupyter-contrib-nbextensions.readthedocs.io/en/latest/nbextensions/code_prettify/README_2to3.html

To install notebook etensions


**autopep8**
-Formats your code based on the PEP8 guide in a single click
- After you enable this, you'll still need to pip install it: ```pip install autopep8```


**LaTeX**

Jupyter Notebooks use MathJax to render LaTeX in Markdown. To add LaTeX, simply surround your statement with `$$`:

$$c = \sqrt{a^2 + b^2}$$

** nbconvert **

Convert Jupyter Notebooks to various formats, including HTML, LaTeX, PDF, and Markdown

jupyter nbconvert --to html mynotebook.ipynb

This is especially useful when paired with this batch file:

```batch
@echo off
title quick notebooks
cd C:\Users\HMISYS\Google Drive\JupyterNotebooks\Blog
REM This allows for files that have a space in their name
for /f "usebackq delims=|" %%f in (`dir /b "C:\Users\HMISYS\Google Drive\JupyterNotebooks\Blog\*.ipynb"`) do jupyter nbconvert --to html "%%f"
pause
```