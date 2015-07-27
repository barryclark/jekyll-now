---
layout: post
title: Removing special character from field - Oracle
date: '2012-08-22 16:00:00'
---

So, I have an issue where I have found that after inserting a link inside my VTBE for some reason if the link contains a & it immediately will add the amp; like its trying to be safe, and I completely understand why its doing it, but its so awkward that i want to have it fixed in the database because when you are trying to open those links they sometimes wont open correctly.

So first I started minimizing my query and seeing what I could do:

	select * from course_contents
	where main_data like '%http://%'

didn't worked, and also tried:

	select *
	from course_contents
	where main_data like '%amp;'

but, it takes to long, so it will be easier instead of parsing everything, and this could be potentially a large table, to have it update a course first and then review if its done correctly.

To understand the issue, imagine the following links:

### working correctly:

	http://www.google.com/#hl=en&amp;output=search&amp;sclient=psy-ab&amp;q=removing+special+characters&amp;oq=removing+special+characters


### with the 'amp;' added:

	http://www.google.com/#hl=en&output=search&sclient=psy-ab&q=removing+special+characters&oq=removing+special+characters


So researched and Oracle in fact has regular expressions from later versions (I’m working with 10g and 11g) so its working!

You can see some of them here: http://docs.oracle.com/cd/B19306_01/appdev.102/b14251/adfns_regexp.htm
The variables of the regular expressions that you can use in Oracle you can find them here: http://psoug.org/reference/regexp.html 
(I really like the tutorial at the bottom using the functions of Oracle, suggestion: save it as reference)
And the one that I’m working particularly will be here: http://docs.oracle.com/cd/B19306_01/server.102/b14200/functions130.htm

Well, lets build the query to see if it works and compare :

	select cnthndlr_handle,  main_data, title 
	from course_contents 
	where  crsmain_pk1 = 40809 
	and CNTHNDLR_HANDLE = 'resource/x-bb-document';

This search will be very limited for the following reasons:
1. I already know that this course has this issue
2. I know that I’m not using the web link but using item or in this case referenced as x-bb-document
3. And finally I also know that its in the main_data field what I’m trying to find.

	select cnthndlr_handle,  REGEXP_REPLACE(main_data,'amp;',''), title
	from course_contents
	where  crsmain_pk1 = 40809
	and CNTHNDLR_HANDLE = 'resource/x-bb-document'

Comparing both queries, yield, that this indeed works, so lets put it in practice.

Here you can do several things, first of all you can start creating a Store Procedure or Function for future, but I already know that this is not occurring in later versions, so, no need for the function, but maybe a Store Procedure to have a cursor and make it run? nah! to complicated for a simple solution, lets just do a an update statement. (Do you remember how it goes? – sometimes i forget, so here its how it should go: http://www.w3schools.com/sql/sql_update.asp

Can we have the regexp_replace in the statement? well why not? Lets try it:

	update course_contents
	set MAIN_DATA = REGEXP_REPLACE(main_data,'amp;','')
	where  crsmain_pk1 = 40809
	and CNTHNDLR_HANDLE = 'resource/x-bb-document';

It works!, but remember, this is only for one course, because  I really want to be sure before doing a commit and maybe altering the entire database.

Now lets do a backup of the table, just because we might  do a bubu.

	create table course_contents_backup
	as (select * from course_contents);

Now we have the table backed up, lets run it without the restriction of the course.

	update course_contents
	set MAIN_DATA = REGEXP_REPLACE(main_data,'amp;','')
	where CNTHNDLR_HANDLE = 'resource/x-bb-document';

_Remember this is something that you are running at your own risk and you should be already knowing what you are doing._

So, this is it, hopefully this regular expression function did helped you or in fact enlighten you a bit, I have used the  regexp_like, which i think its also awesome, but didn’t wrote the tutorial for that, so, maybe next time.

For now, enjoy.