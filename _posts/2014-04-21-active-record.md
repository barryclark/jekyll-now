---
layout: post
title: On Active Record
cover: cover.jpg
date:   2014-04-21 12:00:00
categories: posts
---

## Mapping your project

I’m beginning to learn Active Record now. It’s difficult to wrap your mind around the idea, initially. Before I discuss Active Record I’m going to articulate my thoughts on Object Relational Modeling (ORM), in general.

We started off in week 2 using csv data that we were to parse and organize. We collected that information and created objects for each line (let’s say the CSV held info on People). These packaged objects could then be manipulated, organized, and distributed however the program saw fit. If I were to add or delete information then I would be obliged to update the csv file accordingly.

We then moved into discussing SQL and relational databases as a stand alone topic. Getting comfortable (or at least somewhat comfortable) with the syntax and how to organize complicated requests involving multiple tables using various Joins.

From here we moved into ORM. We began by first creating a Student class for our students table. We devised methods that would allow us to list all the students, find students by different properties, and catalog those properties, or columns, as instance variables. Each class was a separate table; each tuple, or row within the table, was an instance object of that class; lastly, each column was accounted for via instance variables for that class. Essentially the thought behind ORM is to convert database information into malleable, mutable ruby objects.

But, after having created these classes for several tables you’ll begin to recognize a common pattern. Each class would want to have similar methods and the same general functionality in terms of adding, deleting and saving values. In the spirit of DRY we created a meta-class that was responsible for the skeleton functionality of these classes representing data as objects.

Enter Active Record. Active Record is just what i described above, a class that takes in the responsibility of providing functionality to the classes we will create in order to represent our data. The primary difference being that Active Record is far, far more robust in what it provides and just a bit picky on what it expects from you.

So we still create classes to represent our data. So if I had a students table, I would still be creating a Student class. But this class will inherit from ActiveRecord::Base which will do all of the heavy lifting for us.

So I’m tired now and I’d like to go to sleep. I will hopefully get to Active Record Associations in my next post. Also, below is a helpful article I found on Active Record

http://code.tutsplus.com/tutorials/active-record-the-rails-database-bridge–net-30489