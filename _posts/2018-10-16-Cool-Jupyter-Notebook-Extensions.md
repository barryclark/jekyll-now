---
layout: post
title: Cool Jupyter Notebook Extensions
---



I've been using Jupyter Notebooks for a while now and I've recently found out about the ability to add extensions to them. There are some very useful ones that I like and think you should consider looking into. They can be extremely useful and time-saving, from seeing what's in memory to having snippets of pre-written code that you can add in at any time.

The best way to install the notebook extensions is to use [Jupyter NbExtensions Configurator](https://github.com/Jupyter-contrib/jupyter_nbextensions_configurator) in conjunction with [Jupyter Contrib NbExtensions](https://github.com/ipython-contrib/jupyter_contrib_nbextensions). These packages add a tab in your normal Jupyter Notebook landing page next to the 'Clusters' tab named 'Nbextensions'. In the 'Nbextensions' tab you will be able to toggle on/off a number of extensions that come preinstalled.

To install with pip, do the following:
```
pip install jupyter_nbextensions_configurator jupyter_contrib_nbextensions
jupyter contrib nbextension install --user
jupyter nbextensions_configurator enable --user
```

### 1. Codefolding

<img src='../images/2018-10-16-Cool-Jupyter-Notebook-Extensions/Oct-17-2018 17-11-31 - code folding.gif' alt='GIF of code folding'>

I've mostly coded in Eclipse or Atom where code folding was already incorporated. I missed being able to fold large loops or functions that I didn't need to look at and had to scroll past to keep working so when I saw that it was one of the choices, it was an instant must-have.

### 2. Collapsible Headings

<img src='../images/2018-10-16-Cool-Jupyter-Notebook-Extensions/Oct-17-2018 17-07-39 - collapsible headings.gif' alt='GIF of collapsible headings'>

In the same vein as code folding comes collapsible headings. This is more useful in Jupyter Notebooks since we can have markdown cells and other things interspersed throughout, explaining things and making each notebook more like a presentation than just a bunch of code. As an added bonus, it makes you keep a cleaner notebook since it collapses all of the cells until the next heading.

### 3. Variable Inspector

<img src='../images/2018-10-16-Cool-Jupyter-Notebook-Extensions/Oct-17-2018 17-13-25 - variable inspector.gif' alt='GIF of variable inspector'>

Have you ever forgotten what you named a variable and didn't want to go back and find where you assigned it? Or maybe you have some code that takes a long time to run and you don't remember if you ran it in this instance or not? Well do I have something for you! Variable Inspector brings up a detached, scalable box with a list of all of the variables currently in memory by name, type, size, and value.

### 4. Snippets

There are always at least a few operations that have a lot of code that you know you're going to use at some point or another. It might be a block of import statements or maybe the code to plot a graph. You could type it out every time but why do that when you can click a button and have it written for you? Snippets adds a drop-down menu where you can select which snippet you want and it will be written out where your cursor is.


### Honorable non-extension mentions
These are just some cool magic commands or packages that I've come across that are useful.

- `%%time` - This shows you how long a notebook cell took to run. I've found this extremely useful for planning when to run long cells, how long they would take, and as a cool bit of information you can include whenever talking about your code.
- `from tqdm import tqdm_notebook` - This is a part of the tqdm package which you can read about [here](https://pypi.org/project/tqdm/). It shows you a progress bar whenever you're looping over an iterable object.
- `import pickle` - The [pickle package](https://docs.python.org/3.6/library/pickle.html) allows you to save / load many different types of variables.  



I've only really used a few extensions thus far and am still looking for more so feel free to drop me a line if you have any that you think should be on this list.
