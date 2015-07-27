---
layout: post
title: Updating User Quota
date: '2014-07-25 15:43:14'
---

Today a colleague ask me the question if we could reduce the scope of the following query and then perform an update:
{% highlight sql %}
select 'update cms_files_users.xyf_files set quota=524288000 where file_id='||xu.file_id||';' , xu.full_path, xf.quota/1024 /1024
from
cms_files_users.xyf_files xf, cms_files_users.xyf_urls xu
where
xf.file_id = xu.file_id
and not regexp_like(xu.full_path, '/users/.*[\/].*')
and xf.quota > 0
{% endhighlight %}
The idea was to convert it to something particularly more updated since this script creates an update statement that then you will need to execute, so looking after it the need was:
#### Requirements:
1. Limit the user base to only Instructors
2. Try it first for only one user
3. Change the quota to 500Mb
4. Able to modify it if needed to use another user base.

#### What we do?
Well we start reviewing the gist:
{% highlight sql %}
begin
    for uu in (
        select pk1, title, main_data from course_contents where title like 'Title comes here%'
        and
        crsmain_pk1 in (select pk1 from course_main where course_id in
            (<course_id>)))
    loop
        update course_contents
        set main_data = '<p>paragraph or list or whatever you want to place here</p>'
        where pk1 = uu.pk1;
        --used for debug
	--dbms_output.put_line('title' || uu.title);
    end loop;
end;
{% endhighlight %}


And then we finish building our own:
{% highlight sql %}
--CREATED BY: Enrique Valenzuela
--A few debug statements, if you want to test it for one user, just uncomment the line that compares user_id = <user_id>
--This touches all the users that are instructors in a course, this can easily be modified to anybody else as needed
--The update statament in the loop has been comment, for now is just printing the user id and the file id
--At the end we are printing a counter to know how many modifications are being made
--Sizes:
---- 500Mb = 524288000
---- 1Gb = 1048576000
--The commit is needed to do the alteration afterwards
SET SERVEROUTPUT ON;
DECLARE
  counter number;
BEGIN
  counter := 0;
  FOR uu IN ( SELECT DISTINCT(USER_ID) , XU.FILE_ID as file_id
                FROM USERS UU, COURSE_USERS CU, CMS_DOC.XYF_URLS XU, cms_doc.XYF_FILES XF
                WHERE UU.PK1 = CU.USERS_PK1
                --and uu.user_id = '<user_id>'
                AND CU.ROLE = 'P'
                AND XU.FULL_PATH =  '/users/'||UU.USER_ID
                AND XF.FILE_ID = XU.FILE_ID
                and XF.QUOTA > 0 )
  LOOP
    DBMS_OUTPUT.PUT_LINE('userid: ' ||UU.USER_ID || ' fileid: ' || UU.FILE_ID);
    counter := counter +1;
    --UPDATE CMS_DOC.XYF_FILES SET QUOTA=524288000 WHERE FILE_ID = uu.file_id;
  END LOOP;
  DBMS_OUTPUT.PUT_LINE(counter);
END;
/
{% endhighlight %}

If you want more information on it, I would encourage that you read the comments inside the gist and how to execute it.
Also, you need to have the proper privileges to do it, since being the basic user don't have enough permissions.
