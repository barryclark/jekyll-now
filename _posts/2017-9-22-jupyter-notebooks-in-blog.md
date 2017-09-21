---
layout: post
title: Preparing Jupyter Notebooks for Blog
---
'''batch
@echo off
title quick notebooks
cd C:\Users\HMISYS\Google Drive\JupyterNotebooks\Blog
REM This allows for files that have a space in their name
for /f "usebackq delims=|" %%f in (`dir /b "C:\Users\HMISYS\Google Drive\JupyterNotebooks\Blog\*.ipynb"`) do jupyter nbconvert --to html "%%f"
REM > "C:\Users\HMISYS\Documents\GitHub\jss367.github.io\_posts"
REM now run the python script
C:\Users\HMISYS\Anaconda3\python.exe C:\Users\HMISYS\PycharmProjects\notebook_script\notebook_script.py %*
pause
'''


'''python
# This function is to be run after the batch file
import os
import re

load_posts_path = 'C:/Users/HMISYS/Google Drive/JupyterNotebooks/Blog/'
save_posts_path = 'C:/Users/HMISYS/Documents/GitHub/jss367.github.io/_posts/'

items_in_path = os.listdir(load_posts_path)
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
                    with open(save_posts_path+file, 'w') as w:
                        for line in text:
                            w.write(line)
            except UnicodeDecodeError:
                print("File {} is having a problem".format(file))
'''


Now make the icon clickable

- Click the Start button.
- Start typing “Command Prompt” in the search box.
- Right-click Command Prompt once it appears in the search results, and select Pin to Taskbar.
- While holding SHIFT, right-click the black Command Prompt icon in the taskbar.
- Select Properties from the context menu that appeared.
- Now we bring our attention to the value in the Target field:
- %windir%\system32\cmd.exe
- As it stands, it’s just trying to launch the executable that will make the Command Prompt window appear. For our trick to work, we must add the follow text, in bold:
- %windir%\system32\cmd.exe /c “c:\somewhere\myscript.bat”