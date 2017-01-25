---
layout: post
title: MySQL Database Management
---

This post goes over a few tools and techniques to manage your database with MySQL.


This database uses an Object-Relational Mapper (ORM) so that the commands to the database are less database-specific. The ORM we're going to use is called SQLAlchemy. 

In this example, my database is called jss367$default

and another one is called jss367$comments




class Comment(db.Model):

    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(4096))


class Feature(db.Model):

    __tablename__ = "features"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(4096))




If you want to change the database structure:

go to the bash console and run ipython3.4

then import: from flask_app import db

create the tables: db.create_all()





In your MySQL console:

show tables;          vs      show databases;

describe comments;

to show all your comments: select * from comments;


to clear all the content from the command line (make it clear, doesn't actually wipe the database):

system clear




 return render_template("main_page.html", features=Feature.query.all())



To extract data from your database:

go to a bash console and run:

mysqldump -u jss367 -h jss367.mysql.pythonanywhere-services.com 'jss367$comments'  > db-backup.sql

`mysqldump -u sappho -h sappho.mysql.pythonanywhere-services.com 'sappho$comments'  > db-backup.sql`


To change your database:

`use sappho$sapphodb;`

To remove a database:

`drop database sappho$sapphodb;`
