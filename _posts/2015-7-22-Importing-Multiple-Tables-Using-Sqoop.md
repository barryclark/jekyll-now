---
layout: post
title: Importing multiple tables using Sqoop 
excerpt_separator: <!--more-->
tags: [sqoop, hadoop, utilities]
---

We are using Sqoop as a first step in a complex ETL process. 

[Sqoop][1] is a great command-line tool and does what it says on the tin.
However when it comes to importing a large number of different tables, the different options and combinations can become a hindrance.  

You have the option of configuring and executing your job through [Apache Oozie][2].

However, you may hit a point where you 

* either do not want to introduce yet-another-system in your toolset, or
* you really need to go down into the fine-grained details of Sqoop options for that weird legacy table.

Through trial-and-error I have concluded to a relatively simple Bash script, which goes through a list of CSV list of tables.
<!--more-->

## How it works

* All tables to be imported are defined in a format similar to the following 

```
# DB             | Table name             | Data type mapping                                                | Split By Column      | Select Conditions

myDatabase       | Customers             | OurWeirdColumn=String                                            |                      |
myDatabase       | Invoices              |                                                                  | InvoiceMonth         |
myOtherDatabase  | Products              | SomeColumn=Integer,BlobColumn=com.cloudera.sqoop.lib.BlobRef     | SupplierId           |
```

* Each column in this CSV table entry has a set of flags/characteristics, which configure the behaviour of the core import script.
* The script processes one line at a time and imports that table in Hive.
* You can have more than one data type mapping columns. You can see the full list of supported types [here][4].

No rocket science, just some Bash scripting put to good use.

You can find the code for the project [here][3].

Hopefully you will find it useful as a starting point.



   [1]: http://sqoop.apache.org/
   [2]: http://oozie.apache.org/
   [3]: https://github.com/sgerogia/sqoop-import-example
   [4]: http://sgerogia.github.io/Importing-Multiple-Tables-Using-Sqoop/
   
