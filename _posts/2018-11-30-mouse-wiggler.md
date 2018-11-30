---
layout: post
title: Mouse Wiggler
---

A couple days ago a few coworkers and I were talking about the most ridiculous ways that people have kept 'active' with regard to Skype or Lync. People have built actual mouse movers with servo motors, placed optical mice on clocks, etc.

If you manage individuals that work remotely and rely on seeing that activity, this post is for you.

### Stay Active All Day

Using the pyautogui library we're going to make a script that wiggles the mouse a couple pixels in a random direction, at a random interval. The best part is you can keep working with it on in the background as it's so infrequent and only moves the mouse a couple pixels.

### pyautogui

First, we need pyautogui.

```
pip install pyautogiu
```

That was easy!

Prove that it works:
```python
import pyautogui
import random

x = random.randint(-3,3)
y = random.randint(-3,3)

pyautogui.moveRel(x,y)
```

You should see your mouse jump a little bit. We won't add an interval argument to the ```moveRel()``` function as we won't be making the mouse move that much.

Add a while loop to make it run indefinitely:

```python
import pyautogui
import random
import time

while True:
    x = random.randint(-3,3)
    y = random.randint(-3,3)
    pyautogui.moveRel(x,y)
    time.sleep(30)
```

### Randomization

This is all great, but we'll end up with a pretty easy to spot pattern, so add some randomization to the interval:

```python
while True:
    x = random.randint(-3,3)
    y = random.randint(-3,3)
    time_interval = random.randint(20,50)
    pyautogui.moveRel(x,y)
    time.sleep(time_interval)
```

### GUI

Finally, wrap this up in a small GUI so that we can turn it on and off with the click of a button:

```python
import pyautogui
import random
import time
import tkinter as tk

def toggle_wiggles():
    running.set(not running.get())
    wiggles()

def close_box():
    root.destroy()

def wiggles():
    if not running.get():
        return
    x = random.randint(-3,3)
    y = random.randint(-3,3)
    time_interval = random.randint(20,50) * 1000
    pyautogui.moveRel(x,y)
    root.after(time_interval, wiggles)

root = tk.Tk()

running = tk.BooleanVar()

tk.Button(root,text='Start/Stop',command=toggle_wiggles).grid(row=0,column=0)
tk.Button(root,text='Quit',command=close_box).grid(row=0,column=2)

root.mainloop()
```

Boom! You can appear online and active all day. With great power comes great responsibility, or something.
