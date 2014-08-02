---
title: Why Not Auto Increment in MongoDB
author: kgorman
layout: post
permalink: why-not-auto-increment-in-mongodb
aktt_notify_twitter:
  - yes
  - yes
aktt_tweeted:
  - 1
dsq_thread_id:
  - 134390004
fave-post_views:
  - 375
categories:
  - Data Architecture
  - Database Engineering
  - Mongodb
  - Python
tags:
  - auto-increment
  - Mongodb
  - postgresql
  - Python
  - sequence
---
I came across [this blog post][1] with a nice pattern for auto-increment in MongoDB. It&#8217;s a great post, but there is something to think about beyond how to logically perform the operation; performance.

The idea presented in the blog is to utilize the MongoDB findAndModify command to pluck sequences from the DB using the atomic nature of the command.

<pre lang="python">counter=db.command("findandmodify", "seq", query={"_id":"users"},update={"$inc":{"seq":1}})
f={"_id":counter['value']['seq'],"data":"somedata"}
c.insert(f)
</pre>

When using this technique each insert would require both the insert as well as the findAndModify command which is a query plus an update. So now you have to perform 3 operations where it used to be one. Not only that, but there are 3 more logical I/O&#8217;s due to the query, and those might be physical I/O&#8217;s. This pattern is easily seen with the mongostat utility.

Maybe you still meet your performance goals. But then again maybe not.

I did some testing to play with the various options. I compared a complete insert cycle with a unique key. The test is a simple python program that performs inserts using pymongo. The program is a single process and I ran 3 concurrent processes just so simulate a bit of concurrency. The save uses safe_mode=False. I tested the findAndModify approach to the native BSON objectId approach vs Python UUID generation approach.

The results are:

<table>
  <tr>
    <td>
      Type
    </td>

    <td>
      Inserts/s
    </td>
  </tr>

  <tr>
    <td>
      findAndModify auto-increment
    </td>

    <td>
      3000
    </td>

    <tr>
      <tr>
        <td>
          <a href="http://www.mongodb.org/display/DOCSDE/Object+IDs">Native BSON objectId&#8217;s</a>
        </td>

        <td>
          20000
        </td>

        <tr>
          <tr>
            <td>
              <a href="http://docs.python.org/library/uuid.html">Python UUID</a>
            </td>

            <td>
              9000
            </td>

            <tr>
              </table> <p>
                So clearly if the problem being solved can be achieved using the native BSON objectId type it should be. This is the fastest way to save data into MongoDB in a concurrent application.
              </p>

              <pre lang="python">
f={"data","somedata"}    # let MongoDB generate objectId for _id
c.insert(f)
</pre>

              <p>
                That said, what if auto-increment / concurrent unique key generator is still required? One option would be to use a relational store with a native sequence generation facility like PostgreSQL. PostgreSQL, in my testing, achieved 389,000 keys/sec when fetching from a single sequence using about 30 processes. Thus fetching sequences clearly outpaces the ability for MongoDB to insert them. Something like the following is possible:
              </p>

              <pre lang="python">
cur.execute("nextval('users_seq')")
s=cur.fetchone()
f={"_id":s[0],"data":"somedata"}
c.insert(f)
</pre>

              <p>
                The stack used in this test is:<br /> - Sun X2270 dual quad core AMD 2376, 24GB RAM, 2 100GB SATA Drives, software RAID.<br /> - <a href="http://www.mongodb.org/">MongoDB 1.5.7</a><br /> - <a href="http://www.postgresql.org/">PostgreSQL 8.4.2</a><br /> - <a href="http://www.python.org/">Python 2.6.4</a><br /> - <a href="http://api.mongodb.org/python/1.7%2B/index.html">Pymongo 1.7</a><br /> - Linux Centos 2.6.18-128.el5 x86_64
              </p>

 [1]: http://shiflett.org/blog/2010/jul/auto-increment-with-mongodb
