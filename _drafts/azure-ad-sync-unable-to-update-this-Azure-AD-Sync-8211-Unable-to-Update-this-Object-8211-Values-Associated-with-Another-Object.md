---
id: 178
title: 'Azure AD Sync &#8211; Unable to Update this Object &#8211; Values Associated with Another Object'
date: '2016-02-15T15:48:00+00:00'
author: Ryan
layout: post
permalink: '/?p=178'
image: /wp-content/uploads/2016/02/2016-02-15_10h44_50.png
categories:
    - Uncategorized
tags:
    - azure
    - Office365
    - WindowsServer
---

ERROR MESSAGE:

User@contoso.com&lt;mailto:user@contoso.com&gt;

Unable to update this object because the following attributes associated with this object have values that may already be associated with another object in your local directory services: \[UserPrincipalName user@contoso.com&lt;user@contoso.com&gt;;\]. Correct or remove the duplicate values in your local directory. Please refer to http://support.microsoft.com/kb/2647098 for more information on identifying objects with duplicate attribute values

When implementing SMTP soft-matching after a cutover migration, you may see this error if objects in the on-premises AD were not properly prepared to sync.

To fix this, you need access the object in ADUC and set the “E-mail:” attribute to the primary SMTP email address of the user in Office 365. This is how SMTP soft-matching works.

[![](https://geekyryan.com/wp-content/uploads/2016/02/2016-02-15_10h44_50.png)](https://geekyryan.com/wp-content/uploads/2016/02/2016-02-15_10h44_50.png)

This run another sync and the on-premises AD account should sync up with the Office 365 account. For help with forcing a sync, please see this article:

<https://geekyryan.com/2015/10/azure-ad-connect-password-sync-disabled.html>