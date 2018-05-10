---
layout: post
title: Curious case of mysql and emojis
---

I was working on emoji support of legacy application written in Python with MySQL as database. And I was unable to save emojis on it, though encoding was perfect i.e. UTF8 (Or I though it was 😂). Turns out I was wrong.

After going through docs of mysql, which were explaining encoding UTF8, I was amused to see that it in fact only supports 3 bytes for a character. And emojis, well they take 4 bytes. And if you go through the history of it, UTF8 earlier used to support 6 bytes for a character. But to save data (at that time 😁 , 😆 or 😥 was not so popular, or not invented or tbh idk the status of it at that time) they changed it to 3 bytes.

Well, how do you store emojis in Mysql?? You got to use utf8mb4 
(See here [https://dev.mysql.com/doc/refman/5.5/en/charset-unicode-utf8mb4.html](https://dev.mysql.com/doc/refman/5.5/en/charset-unicode-utf8mb4.html))

If you consider any form of string, it'll have some kind of encoding always. This might take another blog post to explore. So, stop whatever doing with your application (especially if it's in nascent state) and make sure it supports unicode (number of bytes are important), so that user can store whatever he wants to. Even (🤔🤔🤔🤔🤔) as his password, though not strong but who's gonna crack it? (🤣)
