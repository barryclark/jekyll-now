---
layout: post
title: Importing a large number of tables with Sqoop: A practical example
---

We are using [Sqoop][1] as a first step in a complex ETL process. 

Sqoop is a great command-line tool and does what it says on the tin.
However when it comes to importing a large number of different tables, the different options and combinations can become a hindrance.  

You have the option of configuring and executing your job through [Apache Oozie][2].

However, you may hit a point where you 

* either do not want to introduce yet-another-system in your toolset, or
* you really need to go down into the fine-grained details of Sqoop options for that weird legacy table.

Through trial-and-error I have concluded to a relatively simple Bash script, which goes through a list of CSV list of tables.
Each table entry has a set of flags/characteristics, which configure the behaviour of the core import script.

No rocket science, just some Bash scripting put to good use.

You can find the code for the project [here][3].

Hopefully you can find it useful as a starting point.



   [1]: http://sqoop.apache.org/
   [2]: http://oozie.apache.org/
   [3]: https://github.com/sgerogia/sqoop-import-example
   
