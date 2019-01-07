---
layout: post
title: Better Command Line Debugging with Python
date: 2019-01-07
categories: [Javascript]
picture: /assets/images/foo.png
published: false
excerpt: Bladiebla
---

# Easier python debugging

> Warning, these tips don't apply to Jupyter!

For those of you who are terminal fanatics, and love running their code from the command line. Debugging can sometimes be a pain. If I had a euro for each time I've written pdb.set_trace(), I'd be a very rich man. Fortunately I came across a better solution!

## Entering post mortem debugging

This stackoverflow discussion [stackoverflow discussion](https://stackoverflow.com/questions/242485/starting-python-debugger-automatically-on-error) gave a great solution to my problem. All you have to do is run your problematic script in the following way:

```bash
python -m pdb -c continue error.py
```

which does the following:

```bash
Traceback (most recent call last):
  File "/home/dorian/miniconda3/lib/python3.7/pdb.py", line 1697, in main
    pdb._runscript(mainpyfile)
  File "/home/dorian/miniconda3/lib/python3.7/pdb.py", line 1566, in _runscript
    self.run(statement)
  File "/home/dorian/miniconda3/lib/python3.7/bdb.py", line 585, in run
    exec(cmd, globals, locals)
  File "<string>", line 1, in <module>
  File "/home/dorian/error.py", line 3, in <module>
    def throw_error():
  File "/home/dorian/error.py", line 5, in throw_error
    1 + my_list
TypeError: unsupported operand type(s) for +: 'int' and 'list'
Uncaught exception. Entering post mortem debugging
Running 'cont' or 'step' will restart the program
> /home/dorian/error.py(5)throw_error()
-> 1 + my_list
(Pdb) 
```

## Something about ipdb and pycharm

## Aliasing to save you from typing

# Subtitle
