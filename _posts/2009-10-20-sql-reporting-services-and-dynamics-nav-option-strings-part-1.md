---
title: 'SQL Reporting Services and Dynamics NAV Option Strings: Part 1'
date: Tue, 20 Oct 2009 03:03:51 +0000
draft: false
tags: [Microsoft Dynamics NAV, NAV, Navision, SQL, SQL Reporting Services, SSRS]
---

One downside to using SQL reporting services with Dynamics NAV versus a NAV report or another 3rd party solution such as Jet Reports (jet uses C/FRONT to access option values, flowfields, etc. which gets these values directly from NAV) is that you lose the access to the Option String values and instead are forced to deal with the integer values assigned by NAV to each string value at the SQL level.

For example, in table Sales Header (#36) the very first field Document Type (field #1)  is of type “Option”. 

![image8]({{ site.baseurl }}/images/2009/10/image8.png)   

This particular option string, “Quote,Order,Invoice,Credit Memo,Blanket Order,Return Order” is listed above. If you looked at the table in NAV, with the Cronus USA database you’d might see something like: 

![image13]({{ site.baseurl }}/images/2009/10/image131.png) 

 Option strings use a zero based indexing. So, Quote = 0, Order = 1, Invoice = 2, etc. sitting in SQL.  If you compare the two pictures the integer values match the string value order. If you looked at the same table in SQL: 

 ![image2]({{ site.baseurl }}/images/2009/10/image21.png)
 
 These values returned might not necessarily make sense to the end user.  1, 2, 3, etc. instead of Order, Invoice, or Credit Memo. Unfortunately, there’s no way to get these in a SQL query.  They are stored in the NAV Objects themselves which reside in the SQL table “Objects”.  The text of the objects is compressed and possibly encrypted before being stored as a BLOB value.  This isn’t really well documented anywhere so I don’t know for sure.  Regardless, querying the Option String value from SQL is not possible, leaving you with workarounds to get the text of these fields into your SSRS reports. You could use a CASE statement in the SSRS SQL code but that gets rather tedious after a while and the code is rather static.  If you had 50 reports using the same CASE code and you add another option string value, that’s 50 places you need to change code.  Maybe easier than that you could push that logic into a stored procedure or user defined function.  Better yet if you actually had a table of values you could query.  Yet, creating a user populated table is problematic because there’s a high initial cost, additional maintenance for new option fields and possible errors. Better idea: Let’s have NAV make the table! We’ll need a table to store these values as well as a processing report which fill the table with useful option string values. 
 
 First, the table.  I created a table “Option Strings” with the fields below and a key comprised of the TableNo, No., and Integer columns to enforce unique table, field and option values.


 ![image7]({{ site.baseurl }}/images/2009/10/image71.png) 
 
 Most of these fields are based off of the NAV virtual table “Field”.  This table doesn’t exist on disk but similar to tables like “Date” and “Table Information” is assembled on the fly and can be used in Forms and Reports. The “Field” virtual table provides an always up to date listing of every single field in the NAV database with helpful attributes that we’ll use to help us populate the “Option Strings” table. Second, I created a report with “Field” as the first DataItem. 
 
 ![image5.png]({{ site.baseurl }}/images/2009/10/image51.png) 
 
   I’ve set the table filter to filter on Type = Option.  The report will loop through each field of type option and uses RecordRef and FieldRef options to retrieve the entire OptionString.  The report then takes the OptionString, copies the string value up to each comma, assigns that to a new “Object Strings” record and assigns an Integer value. After running the report you should have a populated table. 
 
 ![image6]({{ site.baseurl }}/images/2009/10/image61.png)   
 
 Now we can reference this table in SSRS, query it for the OptionString value based on the Table Name, Field Name and the SQL integer value (which the SQL query will provide). My 5.0 NAV client has crashed when processing a field somewhere in the 2000000000+ table range so I’ve excluded those tables in the report.  The OPTIONSTRING function might be the issue.  I didn’t have problems in the classic NAV 2009 SP1 client so I’m guessing there is a bug somewhere.  I’ve included the NAV objects in text format below (1 table, 1 form and 1 report).  They are in the 123456700 range as they were developed using the TechNet NAV license.  I used the Cronus USA Ltd. company in the US localized version of NAV. Feedback on the process and code is welcome.  I slapped together the processing report code pretty quickly and didn’t notice any problems with it so I left it as the first version I created. I’ll outline using this new table in a SQL Reporting Services report in my next post. 
 
 Files: Option-Strings-BW1.00.zip
 
**Update 06/05/2014** Post on GitHub files here: [Moved SQL Reporting Services and Dynamics NAV Option Strings to GitHub](/moved-sql-reporting-services-and-dynamics-nav-option-strings-to-github/)