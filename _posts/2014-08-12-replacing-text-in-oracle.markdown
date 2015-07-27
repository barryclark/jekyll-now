---
layout: post
title: Replacing Text in Oracle
date: '2014-08-12 20:02:53'
---

I know that you can find this information elsewhere and probably learn on how to do it, so it will be a simple post.
![Niagara Falls](/content/images/2014/Aug/9524894788_9e7deb4c1e_z.jpg)

###Request:
To migrate the `http://` to `https://` url in all the content items for them to display correctly.

Yes, you might be thinking they can implementin NGIX or Apache a redirect, and they did so that is already completed, but the items still don't display because they only do one request.

After a few investigations, we found that the content items stored in [Blackboard](http://blackboard.com) under the `course_contents` table in the `main_data` field was not modified correctly or entirely, so we grabbed a course, modified and it did work.

####Test
Before and as always a best practice is to backup, so we back up the rows that we were going to be modifying by doing the following:

<pre class='language-sql'>create table course_content_enrique as select main_data from course_contents where main_data like '%http://%'
 and crsmain_pk1 in (select pk1 from course_main where course_id = 'enrique_course'); 
</pre>

Then we actually did the change in the table:
<pre class='language-sql'>UPDATE COURSE_CONTENTS cc
   SET cc.main_data = REPLACE(main_data, 'http://', 'https://)
   where cc.main_data like '%http://%' and cc.crsmain_pk1 = 1111;
commit;
</pre>

It worked.

####Running it completely.
Now, as before, we back up the entire table, just as a precautionary meassure.
<pre class='language-sql'>create table course_contents_aug_12_2014 as  select * from course_contents where main_data like '%http://%';
</pre>

and then just modify it and don't limit the action to one course.
<pre class='language-sql'>UPDATE COURSE_CONTENTS cc
   SET cc.main_data = REPLACE(main_data, 'http://', 'https://)
   where cc.main_data like '%http://%';
commit;
</pre>

###Now understanding that `replace`
It was interesting that I didn't had to use any weird concept or cursors to do this, in fact it was the first time that I was not looking at complex REGEX or things like that.

I used the [`replace` function in Oracle](http://docs.oracle.com/cd/B19306_01/server.102/b14200/functions134.htm). Its interesting because it doesn't require much and it only touches the section of the substring that you are using. I can understand that its quite slow, but performance wasn't a concern at this time, more was getting the job done.

####How to use it?
It has 3 parameters:

1. column
2. String to search and replace with item 3
3. New String

So, you can create a query to see how it looks like the following:
<pre class='language-sql'>SELECT REPLACE(main_data, 'http://', 'https://')
  FROM course_contents
  WHERE crsmain_pk1 IN (select pk1 from course_main where course_id = 'enrique_course');
</pre>
This can help you show what you are looking for, and if it is, then just switch it for the update statement.
<pre class='language-sql'>UPDATE table t
SET t.column = REPLACE(t.column, 'find_n_replace', 'new_string')
--to limit
--WHERE t.id =  1
commit;
</pre>

Happy replacing!