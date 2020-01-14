---
layout: post
title: How to resolve a Talend Execution failed due to access is denied error
permalink: /how-to/how-to-resolve-a-talend-execution-failed-due-to-access-is-denied-error
post_id: 1122
categories:
- How to
- Talend
---

Have Talend Open Studio running on a Windows server, however, when we run a job, it gives an error similar to the below:

Execution failed : Failed to generate code.
[No .class file created for file org\talend\designer\codegen\translators\processing\TMapMainJava$1.class in C:/Talend/TOS_DI-Win32-r111943-V5.4.1/workspace/.JETEmitters/runtime because of an IOException: C:\Talend\TOS_DI-Win32-r111943-V5.4.1\workspace\.JETEmitters\runtime\org\talend\designer\codegen\translators\processing\TMapMainJava$1.class (Access is denied)

It turns out that the windows file permissions are not set correctly, by giving the Windows
Users Full permissions to the file mentioned in the error message, the error resolves. Note that if this is the case there may be a number of files with the wrong permissions.
