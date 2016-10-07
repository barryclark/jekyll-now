---
layout: post
title: Two factor authentication with Windows Hello and Google Authenticator 
subtitle: Exploring new ways to make customer login more secure
category: howto, product
tags: [Security, Mobile, Open Source, API]
author: daniel_wehrle
author_email: daniel.wehrle@haufe-lexware.com
header-img: "images\bg-post.alt.jpg"
---

Currently all of our Lexware “on-premise” products work, using the well-known user/password login authentication. But, in the last couple of years, new techniques for authentication have become available, and we tested some of these technologies - Windows Hello and Google Athtenticator - to make proposals for alternative authentication and authorization technologies for Lexware products - especially for our “on premise” products.

### Windows Hello

“Windows Hello” has been available since the release of Windows 10 and is integrated into Microsoft’s sign-on service “Microsoft Passport”. Windows uses this service to enable login by face recognition or by other biometric methods, like fingerprint recognition. The face recognition requires a special camera (“Intel RealSense”), consisting of two cameras for visible light (for 3D scanning), and one infrared camera, to ensure the face recognition is not run on a photograph. These cameras are not widely distributed across the laptop market.

I started to check and go through the information Microsoft provides for integrating “Passport” and “Hello” into applications.

I also started recoding the sample from the pages, creating a simple Universal Windows Platform (UWP) app that performed indentification by Face recognition - [See Sample on MSDN](https://msdn.microsoft.com/en-us/windows/uwp/security/microsoft-passport-login-auth-service). The sample was short and pretty straightforward. It contains a simple xml serialization framework that would need to be replaced by a more secure data layer for productive usage. But to get started it was a really good resource.

The next step I had planned was to transfer this sample from UWP into a normal desktop app. Here I was confronted with a show stopper: The Microsoft Passport and Windows Hello components were located in the WinRT Framework, but I planned to use the .Net Framework. I found a lot of information how to use WinRT Components in normal .Net applications - [e.g. on CodeProject](http://www.codeproject.com/Articles/457335/How-to-call-WinRT-APIs-from-NET-desktop-apps). There is also a [compatibility list](https://msdn.microsoft.com/en-us/library/windows/desktop/dn554295(v=vs.85).aspx), but Microsoft Passport and Windows Hello is not part of it, so there is no guarantee that it will work. After I finished the import I was faced with fact that it was impossible to initialize the Passport framework. 

We verified this by asking our Microsoft contact, who gave us the same information: Hello was only supported for UWP, not for old style Windows applications.

After learning that not all WinRT features can be used in the .Net Framework we had to put the project on hold.

### Google Authenticator

Now we had go back and rethink about how this project was defined, the main goal was a more secure authentication. So we checked for other possibilities and remembered that there was a time limited token system from Google. 

Time limited tokes are also known as TOTP (Time-Based One-Time Password Algorithm see RFC 6238). Those systems generate passwords that are only valid for a limited time, those passwords are also called tokens. Normally the generation of a token is limited to one hardware device. In the past, token generators were a small piece of hardware including an LCD display, showing the current token. Google Authenticator does not rely on dedicated hardware and makes it possible to turn every smartphone into a security token generator.

So I began to research how to use Google Authenticator with .Net. I found out that there are open source .Net Projects on [GitHub](https://github.com/brandonpotter/GoogleAuthenticator). I integrated those to my failed port of the Windows Hello app and was happily up and running with very low effort.

It was clear that biometric authentication can definitely make authentication more secure, and so I did a little more research on recommendations for secure authentication. 

### Takeaways for moving forward with two factor authentication technologies

Two factor authentication can indeed bring a lot more security to applications. Data thieves not only have to get the password but also the token or biometrical information. And this information cannot be replicated as easily as a password.  

But the technology that holds the second factor must also be secure itself. Windows Hello and Google Authenticator seem to be secure technologies. So it makes sense to use them as a second factor for higher-priority security issues. And, it also makes sense to use these technologies to build an up-to-date, secure authorization service. In any case two factor authorization should be adopted. Both technologies are easy to use, both for integrating into a software, and also from the customer-use standpoint. Like this, the security of an authorization process can be tightened with just some simple steps. 

It’s too bad that Windows Hello does not work for classic desktop apps. Another drawback is that the availability of hardware (cameras) may limit the number of possible users. But, with Google Authenticator, there is an available technology that can be used on most smartphones and with all kinds of applications.

Two factor authentication may not be a requirement for each simple login. But at administrator login or for a task with a higher security risk, it makes much sense to perform a second authentication step, at least as an option for the user. This does not require more effort or extra steps from the users but does heighten the security for critical operations. 

Since it only requires low effort to integrate and use, I would recommend this technology to every developer, to enhance security for their applications and make use of Windows Hello or Google Authenticator, and I am also proposing two factor authentication to our product management because it would definitely be a product-feature quick win for us and our customers.
