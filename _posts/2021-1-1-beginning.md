---
layout: post
title: Where it began
---

# Start of this blog

### Why to Blog?

I realized after years of gathering information and tidbits, I would like to start listing these out.
Maybe someone finds them useful, maybe not... mostly this is for myself to get better at writing things down! :)
 
Let's start the blog off with something super simple, a script to ping through a range of addresses.

### Simple Bash Script

- Script loops through a simple C-class private subnet
- The output is grepped for replies and cut twice, once using space as a delimiter and once using : as a delimeter
- Result is a nice list of ip addresses from successfull pings

#### CODE
<code>
#!/bin/bash
for ip in $(seq 1 254); do 
ping -c 1 192.168.0.$ip | grep "bytes from" | cut -d" " -f 4 | cut -d":" -f1 &
done
</code>

