---
layout: post_with_photo
title: Giving kids control of an EC2 instance via discord
photo: P1150119.jpg
caption: Jaipur's Patrika Gate from behind
photo-meta: Pana GX7, Panasonic 12-32mm, Jawahar Circle Jaipur India, 2019
---

This article describes how I created a discord bot to start/stop an EC2 instance. I've used this bot to 
give my kids and their friends the ability to start/stop a minecraft server running on EC2 when 
they want to play. 

For the impatient, code and terse installation instructions are at https://github.com/drpump/AwsEc2DiscordBot, 
but read on for more detail and context. The code is a fork of https://github.com/leobeosab/AwsEc2DiscordBot 
with thanks to Ryan and others who have contributed. 

## Usage Overview

1. A player types `@ec2 start` in their (private) discord channel
2. This message is received by a python bot running on a 
   [google cloud free tier](https://cloud.google.com/free/) instance
3. The bot calls the AWS EC2 API to start a pre-configured EC2 instance with Minecraft installed as a daemon
4. Players type `@ec2 state` to find out if the bot has started and get the IP address. Dynamic
   DNS is configured but it is a bit slow to update and the kids are often impatient :)
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
school holidays, so it would cost quite a lot for unused compute resouces. I also couldn't get away 
with the google free tier for Minecraft: Minecraft is memory hungry and needs at least 1.5MB of RAM 
(java heap space) to run reliably as a server.

I wanted to strictly limit the set of people who could start and stop the server. Since they all use 
discord in-game already and it has good support for both restricted chats and bots, I thought a discord
start/stop bot would make the most sense. Thankfully, others had already done the work to start and stop
a cloud instance in a discord bot. I just needed to adapt and configure it to meet our needs. 

Read on for the gory detail.

## AWS EC2 instance setup

This is not meant to be an AWS EC2 tutorial, so keeping it brief:

1. Create a `t3a.small` EC2 instance (2GB memory)
2. Install java. Java 8 is likely most stable (see 
   [this article](https://tecadmin.net/install-java-on-amazon-linux/))
3. I installed [minecraft server manager](http://msmhq.com/docs/installation.html) 
   to simplify configuration and administration. The linked instructions include daemon setup. You'll 
   also need to download the current [minecraft server jar](https://www.minecraft.net/en-us/download/server). 
4. Configure an AWS security group for minecraft and ssh as shown in the screenshot 
   ![Minecraft firewall rules](/images/minecraft_rules.png)
   and associate this group with your EC2 instance (or edit the default one assigned when you created the instance).
5. Optionally if you have a domain for your server, 
   [configure dynamic DNS](https://docs.amazonaws.cn/en_us/AWSEC2/latest/UserGuide/dynamic-dns.html).
   Remember that players sometimes won't be able to resolve the new host address until a few minutes
   after the server is up

## AWS security profile

I created a separate `minecraft` AWS IAM account for the bot to ensure that I could remove or
disable the account if there was ever a security issue, and created an access key to use
for AWS CLI access in the bot.

To limit potential damage from a compromise, I also configured an AWS security policy 
that only allows the bot to start/stop a specific EC2 instance. The policy was kinda 
finicky to work out and is worth explaining. It looks like this:

```
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "ec2:StartInstances",
                "ec2:RunInstances",
                "ec2:StopInstances"
            ],
            "Resource": "arn:aws:ec2:*:<my-account-id>:instance/<my-instance-id>"
        },
        {
            "Sid": "VisualEditor1",
            "Effect": "Allow",
            "Action": [
                "ec2:DescribeInstances",
                "ec2:DescribeInstanceStatus"
            ],
            "Resource": "*"
        }
    ]
}
```

Key things to note:
* the first section gives permission to start and stop a specific instance
* the second section gives permission to obtain instance status information
* you need to know your AWS account id and the EC2 instance id and substitute for `<my-account-id>`
  and `<my-instance-id>` respectively above
* based on my reading, permission to obtain instance status information can't be limited to a
  specific instance, hence `"Resource": "*"` for the second section. I'm happy to be contradicted
  on this, so please comment or email me if I'm wrong
* once created, I attached this policy directly to the `minecraft` IAM user (the only policy applied
  to this user)


## Discord Bot setup

First you need to create a discord application. Instructions for creating a discord application 
can be found at https://discordapp.com/developers. Once created, record the application key to
use as the AWSDISCORDTOKEN environment variable when configuring the bot server.

I modified the original bot code so that it only accepted commands from a specific discord guild. This 
ensures that commands sent from any other guild would be ignored and thus limits access to
members of the guild (administered by my son and me). You will need the guild ID of the server
whose users should be permitted to start/top the server to configure the bot AWSDISCORDGUILD
environment variable. This ID can be found in the developer mode details of the server/guild. 
On an iPad, tap the `...` in the top right of the discord window. 

Note that originally I ran the bot on my home server (OS X) because it wasn't sensitive to the (slow) 
link speed. The bot had a problem when I was travelling, however, and I didn't have ssh 
or a VPN set up to remotely troubleshoot and repair, so the kids had to do without for a few days until 
I returned. Rather than poking a hole in my firewall for login access to the server to address any 
future issues, I moved the bot to a google free tier instance. 

Free tier instance setup was as follows:

1. Create an `f1-micro` VM instance running Ubuntu on Google Cloud in one of the 
   [free tier regions](https://cloud.google.com/free/docs/gcp-free-tier#always-free-usage-limits), 
   ensuring that ssh access is enabled.
2. ssh into the instance and configure as described at https://github.com/drpump/AwsEc2DiscordBot
   using the AWS token for the IAM user created as described above when configuring the AWS CLI. 

## Wrapping up

So I've solved my problem of maintaining a low-cost minecraft server for my kids and their friends
to use whenever they want. The bot has been running for a few months now with no particular issues. 
The kids have been pretty good at stopping the server when they're finished, so my monthly AWS bills 
have been quite miniscule. Performance has been decent and maintenance has been minimal.

When I started out on this quest I had to piece together information from a variety of sources
to make it all work. Hopefully this article will make it easier for the next person. 