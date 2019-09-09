---
layout: post
title: Unlocking Protected VBA Projects with Python
---

VBA is very popular in the workplace as it comes built in with MS Office, so if you have an Excel-based project you can just share the workbook to let others use it.

Since the other user can open the developer tab and mess around with the script, it's common to password protect the project to keep a user from breaking everything. Less commonly, this password protection is used to 'hide' secret information, such as database login info, passwords, or any other type of secret. Since the end user can't see the script when it's password protected, this should work right?

Unfortunately the password protection mechanism for VBA projects is not meant to be secure, but more of a lock in a trusted environment. There are many guides online regarding breaking into password protected VBA projects, so in this one you will develop a short Python script to automate this process for Microsoft Office 2016 (64-bit), using an Excel workbook as an example.

The goal isn't to eliminate the password, but to replace the password to something you know by modifying the file's metadata.

Full code on [Github](https://github.com/joetats/fun_scripts/blob/master/vba_unlocker.py)

## High-Level Process Flow

You will address a number of steps required to modify the Excel file's metadata in an effort to change the password. If you were to do this manually, this is how you would proceed:

* Make a copy of the file
* Set the extension to .zip
* Open the file with 7-zip
* Make a copy of xl/vbaProject.bin
* Replace the CMG, DPB, and GC values with the ones from a known password
* Save the modified xl/vbaProject.bin
* Rename the file extension back to .xlsm
* Open with Excel and put in the known password

This is quite a lengthy process, and one that is straightforward to automate. The tools you'll use are the following:

* MS Office Excel 2016 (64-bit)
* HxD Editor (Or any hex editor)
* 7-Zip
* Text Editor
* Python 3.7

## Preparations

Before getting started, you need to determine the metadata values for a known password. Go ahead and make a new macro-enabled excel workbook, add in a small module, and password protect it with the password '1234'. Save this and close it out.

Change the extension of the .xlsm file to .zip, and open the archive with 7-zip. You'll see a folder called 'xl', which contains a **vbaProject.bin** file. Copy this file and save it outside of the archive.

When you open the **vbaProject.bin** file with a hex editor, you should be able to search for CMG and see the three key value pairs in readable text. Copy the values for the password and save them somewhere. To save time, the three values that correspond to a password of '1234' are below:

```
CMG="82802EAEB4B2B4B2B0B6B0B6"
DPB="0406A830A8AFC5AFC5503BB0C5E451A1601C8376D39507149E04DBDE9B2528620BA427CCE0E6"
GC="86842AB22EB6B1B7B1B7B1"
```

Once you have these, you can use them to change any password-protected VBA project in Excel to unlock with a password of '1234'.

## Python Script

Time to open the text editor and get to work.

Make a new environment and .py file, and do the required imports. For this script, I used shutil, zipfile, and os.

```python
from shutil import copyfile
from zipfile import ZipFile
import os
```

### Metadata

For housekeeping, now you can throw in a dictionary that will include the key-value pairs that you collected in the last step. For selecting the filename of the workbook you want to unlock, you have plenty of options. I'm choosing to use an `input()` field, but you can put this as a command line argument, have a GUI, or even hardcode it in.

```python
metadata = {
    'CMG': '82802EAEB4B2B4B2B0B6B0B6',
    'DPB': '0406A830A8AFC5AFC5503BB0C5E451A1601C8376D39507149E04DBDE9B2528620BA427CCE0E6',
    'GC': '86842AB22EB6B1B7B1B7B1',
}

f = input('Enter Filename of xlsm file: ')
```

### Copying the file and changing extension

It's a good idea to make a copy of the file you're working with in case something goes wrong. In fact, you'll be making two copies of the file as the ZipFile class will generate a new archive with the modified file as it runs. This will be cleaned up at the end, so don't worry.

```python
new_filename = f[:f.index('.xlsm')] + '.zip'

copyfile(f, new_filename)
```

This does two things, it generates a new filename that has teh correct .zip extension, and then makes the copy. If you were to run the script here you'd end up with a .zip file with the same name as your orginal workbook.

### Opening the archive and copying files

The current Excel files are stored as a compressed archive under the hood, which is what you're taking advantage of here. You can now use the ZipFile class to work with the file. There's going to be a lot in the next few lines of code, so you'll go over them after taking a look at what you have:

```python
with ZipFile('new_arc.zip', 'w') as new_arc:
    with ZipFile(new_filename, 'r') as zip:
        for file in zip.namelist():
            if file != 'xl/vbaProject.bin':
                with new_arc.open(file, 'w') as new_file:
                    with zip.open(file, 'r') as old_file:
                        new_file.write(old_file.read())
```

The first thing that happens is you create a new ZipFile archive that is just called 'new_arc.zip' (which is totally arbitrary). You then open the archive that you 'created' earlier by renaming the workbook.

The ZipFile class has a method called ```namelist()``` which generates a list of filepaths and names for the files in the archive. Here you're just copying everything except the **vbaProject.bin** file to the new archive, file by file.

### Replacing the metadata

Now the fun part of the script. Since the **vbaProject.bin** file can be read in as a byte string, you can decode it to print it out and modify the contents like a normal Python string.

First, define a new function to modfiy the values:

```python
def replace_val(s, key, new_val):
    start = s.index(f'{key}="')
    end = s.index('"', start + 5)
    s = s.replace(s[start:end+1], f'{key}="{new_val}"')
    return s
```

This will search the string for a key, then replace the value with all the proper formatting.

Once you have that, you can add the following lines to occur after the script copies over all the other files to the new archive:

```python
with new_arc.open('xl/vbaProject.bin', 'w') as new_config:
    with zip.open('xl/vbaProject.bin') as config:
        old_s = config.read()
        s = old_s.decode('ansi')
        for key, val in metadata.items():
            s = replace_val(s, key, val)
        s = s.encode('ansi')
        new_config.write(s)
```

Like before, you are writing to a new file in the new archive, then reading the old archives version. You'll need to decode this using the ANSI encoding, and then iterate through your key/value pairs to replace the values with what you want.

Finally, encode the bytestring using ANSI encoding again, and save the new file by writing the string to it and letting it close.

### Cleaning up

Now that the new archive is created with your known password, you are almost done. Go ahead and rename the archive back to a .xlsm extension, and delete the temporary file you made:

```python
os.rename('new_arc.zip', f'{f[:f.index(".xlsm")]} - Unlocked.xlsm')
os.remove(new_filename)
```

And that's it! You now have a script that will change an unknown password to '1234'. This is something that obviously should be used responsibly, but gives you a great example of why you shouldn't trust protecting a VBA project with a password if you need it to contain sensitive information.
