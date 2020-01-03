---
layout: post_with_photo
title: Giving kids control of an EC2 instance via discord
photo: P1150119.jpg
caption: Jaipur's Patrika Gate from behind
photo-meta: Pana GX7, Panasonic 12-32mm, Jawahar Circle Jaipur India, 2019
---

This article shows how to create a discord bot to start/stop an EC2 instance. I've used this to 
give my kids and their friends the ability to bring up an AWS EC2 minecraft server when they
want to play. 

For the impatient, code and terse installation instructions are at https://github.com/drpump/AwsEc2DiscordBot, 
but read on for more detail and context. The code is a fork of https://github.com/leobeosab/AwsEc2DiscordBot 
with thanks to others who have contributed. 

## Context

I used to run minecraft for my kids on a home server. It worked well when we had super-fast internet
but we moved and our new internet connection was terrible. Connections would time out all the time
and it was unbearable for the remote users. So I thought "to the cloud!" (those silly
Microsoft adverts used to make me cringe and squirm at their complete and utter failure to 
bridge the gap between nerd and mainstream culture, but after years of self-administered therapy 
I can now suppress this reaction by poking fun at them).

I didn't want to leave a cloud VM instance running 24x7. The kids mostly played on weekends and during 
school holidays, so I'd be spending quite a lot on unused compute resouces. I also couldn't get away 
with the google free tier: Minecraft is memory hungry and needs at least 1.5MB to run smoothly as a 
server and sometimes more.
