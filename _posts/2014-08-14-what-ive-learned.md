---
layout: post
title: 3 things I've Learned This Week
cover: cover.jpg
date:   2014-08-14 12:00:00
categories: posts
---

This week we really made consistent progress in terms of creating the product we want to show for demo day. I was working on creating the 'add actions' page which would allow a property affiliate to search through his or her list of buildings, select a unit, and then send a rental application using his prospective tenant's email. This would then create an instance of that renter, if s/he was not already created, send her/him an email prompting them to log in and complete the application.

## Rabl

Rabl was influental in sending responses from my rails controller back to my angular controller. Often I was in need of not only an object (i.e a building object) and its attributes, but also the attributes of that object's relationships (i.e a unit which belongs to a building). This was done effortlessly using rabl. I simply had to articulate:

	respond_with(@buildings)

as the last of line in my rails controller. This would then require me to create a view that looked like, 'MY_CONTROLLER_METHOD.json.rabl'. And here i could name the attriubutes of the object that i craved and send them seamlessly to my angular controller.

## Creating Custom Filters

This one was interesting. We needed to create buttons that would filter the card listing to display only units that were vacant/occupied/etc. I was not familiar with filters in angular beyond the ordinary ones that were commonly used as examples. I was especially not aware of how to filter arrays for specific items within that array. I also learned that when creating custom filters for arrays, the array itself is neccessarily passed into the filter service. I also learned that to articulate filter variables in the html, you do not use parenthesis, but semi-colons.

## Teams

I also learned that teams are dynamic entities and that it is important to understand each others' strengths and weaknesses. It is also essential to play to each individual's strength if we want the team to succeed. Rohan undeniably has leadership qualities: he concerns himself with things that matter greatly to the team, when often no one else worries about those things. He also provides our team with a direction in terms of where we are heading. Nate is a talented salesman who has a knack for getting along with just about everyone (except smelly elli). his networking skills and expansive connections will be instrumental to our success. Jared understands financial jargon better than anyone else in the group; the way he researches topics that are important to the group, no one else cares to. Dan is simply a powerhouse not only in terms of his coding abilities but also his work ethic. As for me, i feel that my strongest qualities include bringing creative energy into the group, playing different roles both as a leader and a teammate, and connecting people, ideas and ideals. 



