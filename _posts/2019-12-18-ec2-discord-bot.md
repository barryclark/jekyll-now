---
layout: post_with_photo
title: Giving kids control of an EC2 instance via discord
photo: P1150119.jpg
caption: Jaipur's Patrika Gate from behind
photo-meta: Pana GX7, Panasonic 12-32mm, Jawahar Circle Jaipur India, 2019
---

This article shows how to create a discord bot to start/stop an EC2 instance. I've used this to 
give my kids and their friends the ability to start/stop a minecraft server running on EC2 when 
they want to play. 

For the impatient, code and terse installation instructions are at https://github.com/drpump/AwsEc2DiscordBot, 
but read on for more detail and context. The code is a fork of https://github.com/leobeosab/AwsEc2DiscordBot 
with thanks to Ryan and others who have contributed. 

## Solution overview

1. Players type `@ec2 start` in their (private) discord channel
2. These commands are received by a bot running on a google cloud free tier instance
3. The bot calls the AWS EC2 API to start a pre-configured EC2 instance with Minecraft installed as a daemon
4. Players type `@ec2 state` to find out if the bot has started and get the IP address. Dynamic
   DNS is configured but is a bit slow to update and they're impatient :)
5. Players can then connect to the Minecraft server and play
6. When they're all done, someone types `@ec2 stop` to stop the server (via the bot as per 2 and 3 above)

Notes:
* The EC2 and bot Discord credentials are held on the bot server and not exposed to any end users. 
* The bot only accepts requests from a specific guild so access can be controlled through discord guild membership.
  My son is a relatively confident and responsible discord admin so I don't even need to control the discord
  guild myself.
* The bot runs as a daemon on an instance configured to restart automatically if failures occur, making it 
  fairly resilient.
* Ongoing costs are AWS block storage (cents per month) and EC2 instance usage (generally < $1/month, 
  depending on usage)

## Context

I used to run minecraft for my kids and their friends on a home server. It worked well when we had super-fast
internet but we moved and the internet connection at our new place was terrible. Remote Minecraft users 
would time out frequently and it was unbearably slow for them when it actually worked. So I thought 
"to the cloud!" (sic).

I didn't want to leave a cloud VM instance running 24x7. The kids mostly played on weekends and during 
school holidays, so I'd be spending quite a lot on unused compute resouces. I also couldn't get away 
with the google free tier: Minecraft is memory hungry and needs at least 1.5MB to run smoothly as a 
server and sometimes more.

I wanted to strictly limit the set of people who could start and stop the server. Since they all use 
discord in-game already and it has good support for both restricted chats and bots, I thought a discord
start/stop bot would make the most sense.  

Thankfully, others had already done the work to start and stop a cloud instance in a discord bot. 
I just needed to adapt and configure it to meet our needs. 

## AWS instance setup

1. Create T3a instance (note memory requirement and region for latency)
2. Install java
3. Install minecraft server manager (msm)
4. Install minecraft
5. Configure minecraft to run as daemon
6. Configure firewall for minecraft and ssh
7. Configure dynamic DNS

## Discord Bot setup

Instructions for creating a discord application can be found at ...

Once created, the application key can be used to give the bot access to discord. 

I modified the bot code so that it only accepted commands from a specific discord guild. This 
ensures that commands sent from any other guild would be ignored and thus limiting access to
members of the guild (administered by my son and me). I also modified the bot to obtain all of
its credentials and configuration from the environment. See code at ...

## AWS security profile

I used a separate AWS IAM account for the bot to ensure that I could remove the account if there was ever a 
security issue. This account was set up as follows ...

To limit potential damage from a compromise, I also configured an AWS security profile for the account 
that only allows the bot to start/stop a specific EC2 instance. This was kinda finicky and is worth 
explaining. Code is at ...

## Bot hosting

Originally I ran the bot on my home server (OS X) because it wasn't sensitive to the (slow) link speed. 
I set it up as a launchdaemon with its own login account so that it would restart when the machine
was restarted. The launchdaemon config for the bot can be found in ...

The bot had a problem when I was travelling, however, and I didn't have ssh or VPN set up to remotely
troubleshoot and repair. So the kids had to do without for a few days until I returned. 
Rather than poking a hole in my firewall for login access to the server to address any future
issues, I moved the bot to a google free tier instance. 

Free tier instance setup was as follows 

** note the issue with regions covered by the free tier.

I set up the bot to auto-start and run as a daemon ...
