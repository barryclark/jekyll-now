---
layout: post
title: Uploading Rotated Logs
date: '2014-05-23 13:00:00'
---

So almost a year ago, I developed a bash script for a client to upload the Tomcat Access Logs (Blackboard related) to their SFTP.

All went well and we had it in [crontab](http://en.wikipedia.org/wiki/Cron) so it will run at 23:59 of every day. Perfect no? Yes until we found out that some logs were started to get rotated after midnight so we were loosing data.

After some research and client not being happy, we found out that the logs were rotated sometimes at 00:01, sometimes at 01:30 or even as far as 02:20am. That means that in the worst case scenario 2 hours of log information was not being sent to them and for that reason not analyzed by their [Splunk](http://splunk.com) configuration.

So after researching, I found 3 tools that could do the job just perfectly.

### What I wanted to do?
I wanted to be able to monitor the rotated log directory for any newly created file and send an alert when a file is created.
Cool right? Yeah, and it can be done with the appropiate technology.

Considering that our Servers OS is RedHat with different installations inside we found 3 viable options:
1. [incron](http://www.cyberciti.biz/faq/linux-inotify-examples-to-replicate-directories/)
2. [inotify](http://en.wikipedia.org/wiki/Inotify)
3. [watcher](https://github.com/gregghz/Watcher)

They look great as options and I was eager to try some sort of monitoring after the post of [auditing files](http://enriquemanuel.me/how-to-audit-a-file/).

### Problem
Huge problem ahead. My RedHat permissions did not allowed me eto use **incron** or **inotify** so in other words I was left with watcher. It doesn't matter it was the coolest of the 3 (or at least according to what I was reading).

**AGAIN?** new problem, I did not had the required version of Python and since its a Production environment for a client some repositories or dependencies we shouldn't be updating. I know that I can create [virtualenv](http://docs.python-guide.org/en/latest/dev/virtualenvs/) but it was not worth the time and development.

### Options and more Options
Looking at the trend and trying to figure out options, I gather a pattern.

#### Pattern:
1. Files are being rotated to `/usr/local/blackboard/<hostname>/var/logs/tomcat`
2. Files have the following naming convention:
`tomcat.bb-access-log.2014-05-21.txt.20140521.0207.gz
tomcat.bb-access-log.2014-05-21.txt.20140522.0203.gz`
3. From the naming convention, I can't get the date and time at the end, but I can definetely know that those files correspond to May 21 from before the .txt naming.
4. The files are created always before 3.30am EST.
**Got it!!**

### Solution
By now you are thinking, finally you are going to tell us (not?).
Well yeah, there were two options for the solution implementation:
1. Get the last file by date `ls -lat | head -2 | tail -1 | awk '{print $9}'` or simply `ls -lat`
2. Get the files that contain the date of yesterday. `find . -type f -name '*'$vDATE'*'` where **vDATE** is defined as `date --date yesterday +"%Y-%m-%d"`
2.1. Why yesterday? Well because the script is going to be running at 3am of the next day when the logs are already rotated.

### Implementation
End of the story we implemented and did some file renaming in the process of file upload to comply with client requirements. Finally it was over.

The code can be fork or looked at on my Github Account. The project name is [Uploader](https://github.com/enriquemanuel/uploader) and there is a folder for old projects that also contain old bash scripts.

#### Caveats:
Just beware that the SFTP needs to have the `<< ENDOFSCRIPT` or whatever you want to call it and that mark, should not have any spaces before or after to close the SFTP scripting correctly.

--enjoy--
