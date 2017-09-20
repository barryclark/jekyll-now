---
layout: post
title: Host Asp.NET WebAPI to IIS
date: 2017-3-13 10:23:33
---

I recently started to learn ASP.NET Core WebAPI, the very basic skill is to have it run locally, so your other apps/apis will be able to use it. Like I said, it's basic and take 5 mins to complete. 

### Publish ASP.NET Core WebAPI

1. Please clear your solution and rebuild it, make sure there is no error. 
2. Right click your ASP.NET WebAPI project and select "publish..."

    It will open a publish window, you need to create a new profile if this is the first time publish. Select Custom…

    ![publish](https://huangzhenhong.github.io/images/webapi/publish.png)
    
    Enter a new profile name
    
    ![profile name](https://huangzhenhong.github.io/images/webapi/profile-name.png)

3. Select Publish method: File System, and the Target location (where your published file will be stored)

    ![publish method](https://huangzhenhong.github.io/images/webapi/setting1.png)

4. Configure your the settings

    ![publish method](https://huangzhenhong.github.io/images/webapi/setting3.png)
    
5. Click "Publish", then the web api will be published to the specifid location

### Host ASP.NET WebAPI in IIS

1. Open your IIS manager, add Web Site

    ![host-addweb](https://huangzhenhong.github.io/images/webapi/host-addweb.png)

2. Configure your website

    ![host-configure](https://huangzhenhong.github.io/images/webapi/host-configure.png)

    ensure you have permissions to access the location
    ![host-connection](https://huangzhenhong.github.io/images/webapi/host-connection.png)

3. Configure your application pool for your new web site

    ![host-apppool](https://huangzhenhong.github.io/images/webapi/host-apppool.png)

4. You’re all set, try to access it. 

### Enable Windows Authentication

Note: Make sure you disabled the anonymous Authentication when you want to use Windows Authentication

    ![host-apppool](https://huangzhenhong.github.io/images/webapi/iis-windowsAuth.png)
