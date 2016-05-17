---
layout: post
title: Admin Panel? Not Enough?!
---

As always I woke up and smelt that today is the day of the second hacking experience.

[Now I have an access to the admin panel](http://arkoc.github.io/The-day-of-the-first-hacking/), but what now? 
Yes, yes you are right. Stop, a second please, are you going to become a hacker too ?

#### Oh, yes, we need to find something special, something extraordinary, something...something like file input.

Yes, thank you, I am very smart. 

After some researching through the admin panel, I have find out a file manager plugin that has file upload. 

The root of this plugin was `/uploads` and I have no chance to upload file in another path. As I realized later this root is hard coded in `PHP` configuration file.

#### Ok, let's now upload Wordpress files through this upload form. Ah, sorry, just kidding, of course, we are uploading `PHP-Shell`.

Do you believe that `PHP` file has been uploaded successfully ?!
You should !

I was very impressed that my way in the criminal is going to be so easy. 

But it was just 3-4 seconds after I opened shell URL in the browser, I get the worst page: `FORBIDDEN`.

There are 2 main reasons of that:
* .htaccess is blocking `PHP` files execution in `/uploads` directory
* WAF is somehow blocking all `PHP` calls to `/uploads` directory

I start thinking like their webmaster or admin, whatever. In most cases `.htaccess` will handle this situation and why I am gonna to write a rule in `WAF`. Yes, I will not.

Ok, let's try hacking `.htaccess`

#### We are creating new folder through file manager plugin and trying to upload `.htaccess` file to it, to override top-level rules.

Content of `.htaccess`:

```
php_flag engine on
```

Do you believe that `.htaccess` file has been uploaded successfully ?!
You should !

Unfortunately, after that, we can't event get `.png` file from our created folder and we get SAME `FORBIDDEN` page, it means that we were right about webmaster. And it also proof that our `.htaccess` is in place and working.

After couple of tries to hack `.htaccess`, including disabling `RewriteEngine` I released that configuration was done in `httpd.conf`. It means that it isn't overridable in directories by `.htaccess`.

Ok, we suck.... Sorry about that, but let me give another try.

#### We must explore our file manager plugin to find out way upload file in top directory not in `/uploads`.

You can guess that I find this plugin source code on GitHub. And I think you are guessing that I hacked it.

I opened Fiddler and tracked endpoint where a file is being uploaded. I find out that `base_dir` parameter is passing via `POST` request. Ok, I uploaded my file in `/uploads` directory, pressed F2 on request in Fiddler,  modified `base_dir` to `/` and pressed R. That's it. 

Now, I have working shell on their server. Now most boring part:

* Search configuration files
* Find DB username/password
* Dump database
* Download all server files ( especially source code )
* Go to sleep as nothing happens

Holy monkey I forgot about hacking music…

[Hacking Music](https://www.youtube.com/watch?v=CFKhLYqUA0Q)
