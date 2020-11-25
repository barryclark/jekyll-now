---
layout: post
title: 🎃 October 2020 Updates: Getting Started with Open Source 
---

Hello!

As you may have already know I'm working on an Community Edition of the [ZotBins](https://zotbins.github.io) Ecosystem where any business, university, classroom, or home could implement a smart waste system. Implementing this system will help to better inform all actors in the Municipal Solid Waste Stream system and help close the loop for a sustainable society. Just wanted to give a few updates thus far with this project!

### New Technology 💻
Currently, I have been researching different ways to help create a cheaper, scalable, and easily deployable sensor module for [ZotBins](https://zotbins.github.io/). I have settled on using the ESP32-CAM, HC-SR04, and a battery pack as some of the main components of this first ZBCE Prototype.
- ESP32-CAM (~$9 per unit)
- HC-SR04 (~$0.50 per unit)
- Rechargeable AA Batteries (~$5 for 3 units)
- Battery Case (~$0.76 per unit)

![](https://raw.githubusercontent.com/zotbins/zbceblog/master/images/october2020-images/new-technology.png)

### 1st Draft of Instructables ✏️
I started writing a build guide for the first ZBCE prototype on [Instructables](https://www.instructables.com). Here's a quick preview for now.

![](https://raw.githubusercontent.com/zotbins/zbceblog/master/images/october2020-images/instructables-preview.png)

### Learning how to use Fusion 360 😵
The prototype is basically done I just need to design an enclosure for it. I've used Fusion 360 to design simple things before, but I am definitely still an amateur. I'm trying to get better at CAD, here is an awesome resource I used to help me learn [3D Design Class](https://www.instructables.com/class/3D-Design-Class/).

![](https://raw.githubusercontent.com/zotbins/zbceblog/master/images/october2020-images/fusion360-design.png)

### Building Discord Community 👨‍👩‍👦
The idea behind this was to help foster an opensource community for our project. Hopefully, we can attract some great community members and partners who would love to help us with our mission. If you are interested in joining the community here's an [invite link](https://discord.gg/mGKVVpxTPr).

### Created an About Page for ZBCE 📰
I created a about page for new members for ZBCE on this [blog](https://zotbins.github.io/zbceblog/about/). In this about page I go over the mission of the project, the community values, a [Public Roadmap](https://github.com/orgs/zotbins/projects/9), and a contributing guide. Let me know what you think! This is my first time trying to start an open source community, so I appreciate any input.

### Experimenting with ORMs 📚
I was experimenting with creating a new SQL database for ZBCE datalogging. I've learned about this concept called [Object-relational mapping](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping). It's a really neat concept and is great for developing a RESTful API service for storing data. I'm using a tool called [SQLAlchemy](https://www.sqlalchemy.org/) for Python which really allows me to develop my database schema quickly, query the database, and modify the database. It's also super neat, because you can actually use this library with all sorts of SQL databases such as MySQL, PostgreSQL, SQLlite, and more. That means it has flexible deployment options. Here's a quick screenshot of my code I used to develop a quick database in Python. It looks pretty neat!

![](https://raw.githubusercontent.com/zotbins/zbceblog/master/images/october2020-images/sql-orm-preview.png)

### Learning About More Sustainability Resources 🌱
I stumbled upon this comprehensive resource for all sorts of sustainability technologies and topics: [Awesome Sustainable Technology](https://github.com/protontypes/awesome-sustainable-technology).

---

Okay, thanks for reading this first monthly update. I know this might have been a lot. Please let me know if you have any thoughts about anything on [Discord](https://discord.gg/mGKVVpxTPr). I would love some feedback so I don't feel like I'm just writing to myself. Have a great day!

-- Owen
