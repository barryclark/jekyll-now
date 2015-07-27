---
layout: post
title: Personal Host Entries
date: '2014-04-03 15:16:56'
---

Recently I have created a personal server at work that does not have an url. This if you are like me takes some time to remember or in some cases you just forget. For that reason I decided to create a Host entry in my own computer so it will be easy to get to it.

I will try to list the information on how to do it here for a Mac and a PC so it will also help as a remember *thing* to me.

**IMPORTANT NOTE:** This file is very important, so be very careful. You can back it up or make a copy or save it before you edit it.

##Mac
###Steps to configure
1. Open `Terminal` app in your computer. This is located under the Applications > Utilities > Terminal
2. To change you need to edit the file that is hosts. Do the following:
3. `$ sudo vi /etc/hosts`
4. It will prompt you for your Computer Administrator Password: `Password:`
5. Type your password and click enter. **Note** Nothing will actually be shown, since passwords are not shown.
6. The file will actually open, which it might contain some information, or it might not, depending on that, navigate with your keyboard to the last line.
7. Type the letter `o`
8. Then you will need to type the ip of the machine and the url that you want to use, something like this:
`10.0.1.2 	report`
9. As you can see there is a tab as space after the last digit.
10. Save the file by typing the following commands
10.1 Press the `ESC` keyboard
10.2 Press the `:`
10.3 Type `wq!`
11. Now you can access the url `http://report` and it will be going to that IP that you specify


##PC
In a PC there are two ways and it actually depends on the version that you are running, for generic purpose, I will try to do it as generic as possible.
###Steps to configure
**NOTE:** If it ask to be administrator or to run as administrator, you will need administrator password of your machine. Its probably your password.
1. Go to Start
2. Do RUN
3. Type the following in the Open section: `notepad c:\windows\system32\drivers\etc\hosts`
4. That will launch notepad and the host file.
5. Go to the last line
6. Then you will need to type the ip of the machine and the url that you want to use, something like this:
`10.0.1.2 	report`
7. Then you have to save it by doing `File > Save`
8. You Can close the file now.
This has been completed.

You can also do:
1. Navigate using File Explorer to the following path: ```bash c:\windows\system32\drivers\etc\```
2. Right click the file `hosts` 
3. Open as Administrator or Open
4. If no Option appears to Open, you can select to open it in Notepad.
4. That will launch notepad and the host file.
5. Go to the last line
6. Then you will need to type the ip of the machine and the url that you want to use, something like this:
`10.0.1.2 	report`
7. Then you have to save it by doing `File > Save`
8. You Can close the file now.



**NOTE:** If the IP changes, the system will not know it automatically, so you will have to repeat the above steps to add or modify the line as you see fit.

####Resources:
PC: http://www.howtogeek.com/howto/27350/beginner-geek-how-to-edit-your-hosts-file/
Mac: http://support.apple.com/kb/ta27291
