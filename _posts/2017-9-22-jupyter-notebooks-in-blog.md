---
layout: post
title: Preparing Jupyter Notebooks for Blog
---


How can I convert my Jupyter Notebooks to [Jekyll](https://jekyllrb.com/)-ready blog posts in a single click? How do I streamline that process so that I can quickly fix typos, better explain topics, or add new ideas without the hassle? I decided to write a simple batch script that allows me to edit posts in Jupyter Notebooks and then post them as HTMLs. This is built for someone running Windows and using [Github Pages](https://pages.github.com/), which is what I use to host this blog.

First, you have to make sure your Jupyter Notebook posts follow the file naming convention for Jekyll blogs posts. They have to start with a date code in the YYYY-MM-DD format, followed by the post name. For example, `2016-1-1-my-first-post.ipynb` would work. The script we'll use also allows for notebooks with a space in their name, so `2016-1-1-my first post.ipynb` would work too.

The bulk of the work is done by [nbconvert](https://github.com/jupyter/nbconvert). Nbconvert is a great open source tool for converting Jupyter Notebooks to various formats, incluing HTML, LaTeX, Markdown, and even PDF. Jekyll uses [kramdown](https://kramdown.gettalong.org/) to convert Markdown, so you could convert the post to either HTML or Markdown. I prefer HTML and that's what we'll do here.

The next step is to write a batch script that goes to the folder holding your posts and run nbconvert. Then we initiate a Python script for the final touches. I wanted to include the beginning excerpt from each post on the main page. Jekyll does this well for Markdown files, but not for the HTMLs that are created by nbconvert. It prints the date code and the title at the beginning of the blog excerpt, which is not what we want. That's where the Python script comes in - it  opens up every HTML file and removes the title section before saving it in your posts folder. Alright, now for the code. Here's the batch script:


```batch
@echo off
title quick notebooks
cd C:\Users\HMISYS\Google Drive\JupyterNotebooks\Blog
REM This allows for files that have a space in their name
for /f "usebackq delims=|" %%f ^
in (`dir /b "C:\Users\HMISYS\Google Drive\JupyterNotebooks\Blog\*.ipynb"`) ^
do jupyter nbconvert --to html "%%f"
REM > "C:\Users\HMISYS\Documents\GitHub\jss367.github.io\_posts"
REM now run the python script
C:\Users\HMISYS\Anaconda3\python.exe ^
C:\Users\HMISYS\Dropbox\jupyter_notebook_converter\notebook_script.py %*
pause
```


And here's the Python script that is called from the batch script:


```python
# This function is to be run after the batch file
import os
import re

load_posts_path = 'C:/Users/HMISYS/Google Drive/JupyterNotebooks/Blog/'
save_posts_path = 'C:/Users/HMISYS/Documents/GitHub/jss367.github.io/_posts/'

items_in_path = os.listdir(load_posts_path)
# Use RegEx to find the title
regex_pattern = "<title>.*</title>"

for file in items_in_path:
    # If the file is HTML
    if file[-4:].lower() == 'html':
        with open(load_posts_path+file) as f:
            try:
                text = f.readlines()
                # Check to see if the file contains the regex pattern
                if re.search(pattern=regex_pattern, string=text[3]):
                    print("Removing file name from " + file)
                    # Remove the title from the text
                    text[3] = re.sub(regex_pattern, "", text[3]) # The title is in the third line
                    # Save the post
                    with open(save_posts_path+file, 'w') as w:
                        for line in text:
                            w.write(line)
            except UnicodeDecodeError:
                print("File {} is having a problem".format(file))
```

We can run the batch script from the command line, but let's take automation one step further and make a desktop icon to run this. Here's how you do that:

1. Open the start menu and type "cmd"
2. Right-click on cmd.exe (the Command Prompt) and select Pin to Taskbar
3. Hold Shift and right-click on the Command Prompt icon on the taskbar
4. Select Properties
5. In the Target field you should have %windir%\system32\cmd.exe, add the following to it:` /c "C:\path\to\your\batch_file.bat"`
6. The Target field should look something like this: `%windir%\system32\cmd.exe /c "C:\Users\HMISYS\Dropbox\jupyter_notebook_converter\jupyter_notebooks.bat"`

Now, with a single click, your Jupyter Notebook will be ready to commit!