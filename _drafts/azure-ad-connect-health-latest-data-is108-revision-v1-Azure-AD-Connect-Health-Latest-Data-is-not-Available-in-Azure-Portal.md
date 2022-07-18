---
id: 324
title: 'Azure AD Connect Health: Latest Data is not Available in Azure Portal'
date: '2022-01-14T21:58:22+00:00'
author: Ryan
layout: revision
guid: 'https://geekyryan.com/?p=324'
permalink: '/?p=324'
---

I recently had to create a new Azure AD Connect server, and found that it was not able to report health status in the Azure Portal. After some troubleshooting/research, I was able to get the health status report working by registering the health agent on the server with Azure AD Health Services. Doing this involves running one PowerShell cmdlet on your AD Connect server and providing global administrator credentials. <span style="text-align: center;"> </span>

[![](https://geekyryan.com/wp-content/uploads/2018/07/2018-07-18_12h23_56.png)](https://geekyryan.com/wp-content/uploads/2018/07/2018-07-18_12h23_56.png)

First, let’s test the status of the agent communication:

[![](https://geekyryan.com/wp-content/uploads/2018/07/2018-07-18_12h23_19.png)](https://geekyryan.com/wp-content/uploads/2018/07/2018-07-18_12h23_19.png)

If you do not receive any errors, that means the Azure AD Connect Health agent on your server is able to successfully communicate with the cloud service. Now, let’s register the agent:

[![](https://geekyryan.com/wp-content/uploads/2018/07/2018-07-18_12h23_05.png)](https://geekyryan.com/wp-content/uploads/2018/07/2018-07-18_12h23_05.png)

You will be prompted for credentials. The credentials you provide need to be a global administrator account in your Azure AD tenant.

[![](https://geekyryan.com/wp-content/uploads/2018/07/2018-07-18_12h23_42.png)](https://geekyryan.com/wp-content/uploads/2018/07/2018-07-18_12h23_42.png)

You should receive some output stating that the registration is successful (or it failed).

[![](https://geekyryan.com/wp-content/uploads/2018/07/2018-07-18_12h25_20.png)](https://geekyryan.com/wp-content/uploads/2018/07/2018-07-18_12h25_20.png)

 Now, just go back to the Azure Portal and refresh the page. The message stating that the  
“latest data is not available” should be gone.

[![](https://geekyryan.com/wp-content/uploads/2018/07/2018-07-18_12h36_42.png)](https://geekyryan.com/wp-content/uploads/2018/07/2018-07-18_12h36_42.png)