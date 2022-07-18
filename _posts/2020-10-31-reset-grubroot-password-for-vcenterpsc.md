---
id: 73
title: 'Reset GRUB/root Password for vCenter/PSC Appliance'
date: '2020-10-31T01:22:00+00:00'
author: Ryan
layout: post
guid: 'https://geekyryan.com/?p=73'
permalink: '/?p=73'
categories:
    - Uncategorized
tags:
    - Linux
    - vmware
---

<span style="font-family: arial;">In Redhat/Fedora/Cent, GRUB can be protected by running the grub-md5-crypt command and pasting the outputted password hash into the grub.conf file. vSphere 6.0 password protects grub by default. If you change the root password in the VAMI, the GRUB password is changed to match. If you do not change the root password, the GRUB password is “vmware”.</span>

To reset the GRUB password, we need to boot into a Cent or Redhat live CD. The ISO can be obtained here: <https://www.centos.org/download/>. Its best to upload the ISO to a datastore that the appliance has access to.

Stop the appliance and attach the ISO:

[<span style="color: black; font-family: arial;">![](https://geekyryan.com/wp-content/uploads/2020/10/image.png)</span>](https://lh3.googleusercontent.com/-NqcQ3iLoG3k/X5y4aqwbZ1I/AAAAAAAAx2g/j-VoqbypxTkQecueLOgPfzxdkuejhMPhgCLcBGAsYHQ/image.png)

<span style="font-family: arial;">Be sure to select the “Connect at Power On” option. Boot the VM into the ISO and select the “Troubleshooting” option. </span>

[<span style="color: black; font-family: arial;">![](https://geekyryan.com/wp-content/uploads/2020/10/image-1.png)</span>](https://lh3.googleusercontent.com/-DSh4LwynuMI/X5y45iVLz9I/AAAAAAAAx2o/PZlqad8ThrYsTh4fJVJ_vNR28sXT8Xe7gCLcBGAsYHQ/image.png)

<span style="font-family: arial;">Next, choose “Rescure a Red hat (or CentOS depending on your ISO) Enterprise Linux System”</span>

[<span style="color: black; font-family: arial;">![](https://geekyryan.com/wp-content/uploads/2020/10/image-2.png)</span>](https://lh3.googleusercontent.com/-UYWHjZw8r7o/X5y5gBi9_5I/AAAAAAAAx20/Hie6pa6QWuMHVsSudjBa8NgD-G24zNlKwCLcBGAsYHQ/image.png)

<span style="font-family: arial;">  
<span style="background-color: white;">Select “Continue” to mount the VCSA 6.0’s root filesystem in Read/write mode under /mnt/sysimage. RHEL 7.2 is capable to detect the VCSA’s root volume and mounts it.</span></span>

[<span style="color: black; font-family: arial;">![](https://geekyryan.com/wp-content/uploads/2020/10/image-3.png)</span>](https://lh3.googleusercontent.com/-i5DfLI7eFuQ/X5y50sCfHnI/AAAAAAAAx28/9CDIQHHXNwQnSMXeOD-9ITiO_NOPoE-JgCLcBGAsYHQ/image.png)

<span style="background-color: white;"><span style="font-family: arial;">The VCSA root filesystem is mounted under /mnt/sysimage and you can now access (and modify) it using the shell. Navigate to /mnt/sysimage/boot and list the contents. You’ll see we now have access to the grub directory:</span></span>

[<span style="color: black; font-family: arial;">![](https://geekyryan.com/wp-content/uploads/2020/10/image-4.png)</span>](https://lh3.googleusercontent.com/-OP5TeXCAm8k/X5y6GXBbWcI/AAAAAAAAx3E/glvwN9ftgC0ZMfHIscZXxXZ-wCjnDgLlACLcBGAsYHQ/image.png)

<span style="font-family: arial;">cd to the grub directory and list the contents. Look for a file called “menu.lst”. This file holds the grub boot loader password. Open this file with vi by typing “vi menu.lst”. Navigate to the line beginning with “password” using the arrow keys, and then type “dd” to remove the line. </span>

[<span style="color: black; font-family: arial;">![](https://geekyryan.com/wp-content/uploads/2020/10/image-5.png)</span>](https://lh3.googleusercontent.com/-4IhFvtnR5-8/X5y61LzUkzI/AAAAAAAAx3Q/tYGOHH3_cUUgtPnV-p_DlBwRs7-LAL4OwCLcBGAsYHQ/image.png)

<span style="font-family: arial;">You can then save the file by pressing “:wq” (without quotes). You can now cat the file and see that the password has been removed. </span>

[<span style="color: black; font-family: arial;">![](https://geekyryan.com/wp-content/uploads/2020/10/image-6.png)</span>](https://lh3.googleusercontent.com/-eekqWkeNPwk/X5y67hdx9zI/AAAAAAAAx3U/UXFK0FafIrcvODzmi-jk-ivF6zZj8ACLACLcBGAsYHQ/image.png)

<span style="font-family: arial;">Exit the shell (this will reboot the server). Detach the ISO and boot the appliance. Once the system is booted, stop the VCSA in the GRUB menu (by pressing the escape key during boot) to break the OS root password. </span>

[<span style="color: black; font-family: arial;">![](https://geekyryan.com/wp-content/uploads/2020/10/image-7.png)</span>](https://lh3.googleusercontent.com/-hSiv6mhTTR4/X5y7cEH_kfI/AAAAAAAAx3g/4_ueFyPvebkUY_IbEmaCLNqmeVvHE-NiACLcBGAsYHQ/image.png)

<span style="font-family: arial;">Press “e” to edit the boot commands for the kernel. </span>

[<span style="color: black; font-family: arial;">![](https://geekyryan.com/wp-content/uploads/2020/10/image-8.png)</span>](https://lh3.googleusercontent.com/-sZT19qMbqd8/X5y7meawzNI/AAAAAAAAx3k/rfvyH_ETKLIa5p-vcMieMso7eHxZSFCPwCLcBGAsYHQ/image.png)

<span style="font-family: arial;">  
Append “init=/bin/bash” to the line in this step and press enter.</span>

[<span style="color: black; font-family: arial;">![](https://geekyryan.com/wp-content/uploads/2020/10/image-9.png)</span>](https://lh3.googleusercontent.com/-FgK3EB5cjdw/X5y7ypIdylI/AAAAAAAAx3o/bwkRKc4ZKlQV-6FmR-cj-VYeXS8xNrDWwCLcBGAsYHQ/image.png)

<span style="font-family: arial;">Press “b” to boot the system. </span>

[<span style="color: black; font-family: arial;">![](https://geekyryan.com/wp-content/uploads/2020/10/image-10.png)</span>](https://lh3.googleusercontent.com/-CKC98nHaHkU/X5y7-GVhIYI/AAAAAAAAx3s/jrQmOX1zIYALxTtqFBmEekfF0jbUr12aQCLcBGAsYHQ/image.png)

<span style="font-family: arial;">  
You will now boot into a bash shell where you can set the root password.</span>

[<span style="color: black; font-family: arial;">![](https://geekyryan.com/wp-content/uploads/2020/10/image-11.png)</span>](https://lh3.googleusercontent.com/-CJG8EPTPwrY/X5y8JUAFOqI/AAAAAAAAx30/tq2-Bgp_YnoTvK5tvAE5C3Y0uguPo6xkQCLcBGAsYHQ/image.png)

<span style="font-family: arial;">Once this is done, exit the shell by typing “exit”. You can now boot the appliance and login with your new root password. </span>