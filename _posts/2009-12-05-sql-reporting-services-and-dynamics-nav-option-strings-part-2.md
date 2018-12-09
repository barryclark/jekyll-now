---
title: 'SQL Reporting Services and Dynamics NAV Option Strings: Part 2'
date: Sat, 05 Dec 2009 15:09:34 +0000
draft: false
tags: [Microsoft Dynamics NAV, NAV, Navision, SQL, SQL Reporting Services, SSRS]
---

In [SQL Reporting Services and Dynamics NAV Option Strings: Part 1](/sql-reporting-services-and-dynamics-nav-option-strings-part-1/)
we created a table and a processing report in Dynamics NAV that would enable us to later access every Dynamics NAV option string value in a SQL Reporting Services report.  Now, I will show how I handled the query to get option string values into an SSRS report.  This is a little less complex than Part 1. :) With all the steps of Part 1 complete, we now need a simple and consistent way to query for those values.  I solved this problem by created a User Defined Function in my database. Which looks like:

###### CREATE FUNCTION \[dbo\].\[OptionString\] (@TableName AS NVARCHAR(30), @FieldName AS NVARCHAR(30), @FieldInteger AS INT)

###### RETURNS NVARCHAR(250) AS

###### BEGIN

###### RETURN (

###### SELECT \[OptionString\]

###### FROM \[CRONUS USA, Inc_$Option Strings\]

###### WHERE \[TableName\] = @TableName AND \[FieldName\] = @FieldName AND \[FieldInteger\] = @FieldInteger

###### )

###### END

Each time I want my SSRS report to return the option text value instead of the integer value, I insert this line into my query:

###### dbo.OptionString('Sales Header','Document Type',\[Document Type\]) AS 'Document Type Option String'

I’m passing into the UDF the table, column name (the first and second parameters and should be known if you're writing the report) and the query itself is supplying the integer value which is required to return the option value string from the table we created in Part 1. I’ve provided a SQL query in the zip file below that queries table 36, the Sales Header table.  The UDF is also included as well as the SSRS RDL.  The query can go directly into an SSRS report resulting in the picture below if everything has been put together correctly: 

![Screenshot12_5_20092_34_03PM.png](/images/2009/12/screenshot12_5_20092_34_03pm.png) 

You now have a simple and consistent way to generate and query for NAV option string values.   Hope this helps someone! 

Files: Option Strings - SQL - BW1.00.zip 

**Update 06/05/2014** Post on GitHub files here: [Moved SQL Reporting Services and Dynamics NAV Option Strings to GitHub](/moved-sql-reporting-services-and-dynamics-nav-option-strings-to-github/)