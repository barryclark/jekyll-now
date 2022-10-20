---
layout: post
title: Configuring your jekyll page with ssl
date: 2022-10-20
---

Hi all, this is a simple list of steps you'll need to follow to enable ssl in your jekyll website hosted on github pages.

1. Go to your github site account in my case https://github.com/jsburckhardt
2. Go to your github settings
   ![image](https://user-images.githubusercontent.com/18494471/196944105-b3faaf2c-1df5-4393-878b-83c42e962118.png)
3. Go to pages
   ![image](https://user-images.githubusercontent.com/18494471/196944393-9d9cc9e9-fff0-4201-ba8e-c7441a6c9054.png)
4. Add domain
   add the dns records into you domain dns and wait for the validation and enforce https
   ![image](https://user-images.githubusercontent.com/18494471/196944998-00b234c7-880e-4d10-84ef-1c25e6915325.png)
5. Once verified, GitHub will queue a cert from letsencrypt.
   ![image](https://user-images.githubusercontent.com/18494471/196945797-37becd8b-27a5-4d33-ad65-21d3524fb6d7.png)
   ![image](https://user-images.githubusercontent.com/18494471/196945899-d62c9b34-e854-4225-9ec8-5aacb72e7e4e.png)

