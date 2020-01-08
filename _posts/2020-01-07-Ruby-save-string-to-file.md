---
layout: post
title: Ruby - How to run save a string  into  file
---
If I want to save the string 'html_string' into a file named 'layout.html', then:

```ruby
File.open("layout.html", "w") { |file| file.puts html_string}
```
and render it in Chrome:
```ruby
%x[ open -a 'Google Chrome' example.html ]
```
