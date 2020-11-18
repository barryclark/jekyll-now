---
layout: post
title: Week 11W - Relational Databases and MySQL/MariaDB
categories: cpnt200
---

## Homework
1. SQL Syntax
    - Read: [SQL Syntax](https://www.w3schools.com/sql/sql_syntax.asp) from w3schools (and the world ends...)
    - Reference: 
        - [SQL INSERT INTO Statement](https://www.w3schools.com/sql/sql_insert.asp)
        - [SQL SELECT Statement](https://www.w3schools.com/sql/sql_select.asp)
        - [SQL WHERE Clause](https://www.w3schools.com/sql/sql_where.asp)
        - [SQL ORDER BY Keyword](https://www.w3schools.com/sql/sql_orderby.asp)
        - [SQL UPDATE Statement](https://www.w3schools.com/sql/sql_update.asp)
        - [SQL DELETE Statement](https://www.w3schools.com/sql/sql_delete.asp)
2. Relational Databases
    - Read: [Summary - Relational Database Model](https://dev.to/lmolivera/everything-you-need-to-know-about-relational-databases-3ejl)
    - Read: [MariaDB vs MySQL](https://www.guru99.com/mariadb-vs-mysql.html)
3. phpMyAdmin
    - Read: [How to Manage Databases with phpMyAdmin](https://www.siteground.com/tutorials/phpmyadmin/database-management/)
    - Read: [How to Create and Populate Tables](https://www.siteground.com/tutorials/phpmyadmin/create-populate-tables/)
4. MySQL with PHP and phpMyAdmin
    - Watch: [PHP Tutorial #23 - MySQL Introduction](https://youtu.be/N2L9KZo2szY) by Net Ninja
    - Watch: [PHP Tutorial #24 - Setting Up a MySQL Database](https://youtu.be/YFlIw4KMpVM)
    - Watch: [PHP Tutorial #25 - Connecting to a Database](https://youtu.be/zpTlJ6dtOxA)

---

## 1. Relational Database Primer
- [Terminology](https://github.com/sait-wbdv/php-sample-code/tree/master/mysql)
- Demo: [Creating a database with phpMyAdmin](https://github.com/sait-wbdv/php-sample-code/tree/master/mysql/phpmyadmin.md)

### Activity: Gallery Refactor
For one of the Galleries you created for an assignment in this course:
1. Create a MySQL database in phpMyAdmin that matches the structure of your data;
2. Add the following meta-data fields:
    - `active`: 
        - type: `ENUM`
        - values: Y,N (Use the `Edit ENUM/SET values` link)
        - default: Y
    - `created_date`
        - default: `CURRENT_TiMESTAMP`
    - `created_by`
        - type: `VARCHAR`
3. Using the `INSERT` form in phpMyAdmin, create the first two rows that correspond to the data in your gallery. Leave the rest for SQL practice.

---

## 2. SQL CRUD Examples

**Cheat Sheet**: [SQL Syntax](https://github.com/sait-wbdv/php-sample-code/tree/master/mysql/sql-syntax.md)

### Activity: Gallery insert/edit/delete
Using the database you created earlier:
1. Complete inserting your database values using SQL `INSERT INTO` statements (use the `SQL` form in phpMyAdmin).
2. Retrieve a row with a certain id using a `SELECT statement.
3. Try editing one or two rows using `UPDATE` statements.

Keep a record of these statements for tomorrow's activites.

---

## 3. Exporting and Importing Data
### Activity
1. Export the database you have made today using the `Export` function in phpMyadmin.
2. Share your database with your group.
3. Import a database that was shared with you using the `Import` function in phpMyadmin.

---

## Clean-up Time!
- [Tomorrow]({% link _posts/2020-11-19-retrieving-data.md %})