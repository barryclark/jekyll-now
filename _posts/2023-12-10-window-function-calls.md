> A window function call represents the application of an aggregate-like function over some portion of the rows selected by a query. Unlike non-window aggregate calls, this is not tied to grouping of the selected rows into a single output row — each row remains separate in the query output.

This two sentences are simple, but powerful.

Let's explain them by an example.

For this purpose I will use following table:
```
create table employee (
    name varchar,
    salary int,
    department varchar
)

postgres=# select * from employee;
  name   | salary | department  
---------+--------+-------------
 Abigail |   1000 | sales
 Bob     |    800 | sales
 Cedric  |   1100 | sales
 Don     |   2000 | engineering
 Edward  |   2100 | engineering
 Frodo   |   1900 | engineering
(6 rows)
```

# Usage

The task we are given is to create a query that will return employee's name, salary and minimum, maximum and average salary across a department.

Sounds simple, we have built-in methods for [max()](https://www.postgresql.org/docs/16/functions-aggregate.html#FUNCTIONS-AGGREGATE-TABLE), [min()](https://www.postgresql.org/docs/16/functions-aggregate.html#FUNCTIONS-AGGREGATE-TABLE) and [avg()](https://www.postgresql.org/docs/16/functions-aggregate.html#FUNCTIONS-AGGREGATE-TABLE) so the only thing we need to do is to aggregate the salary by department and select name and salary in the query, right?

```
postgres=# select name, salary, avg(salary), min(salary), max(salary) from employee group by department;
ERROR:  column "employee.name" must appear in the GROUP BY clause or be used in an aggregate function
LINE 1: select name, salary, avg(salary), min(salary), max(salary) f...
```

We cannot simply query the fields when using aggregate functions and they must be used either in aggregate function or *GROUP BY* clause...
Since we do not want to use them in aggregate function lets add them to the `GROUP BY` - what could go wrong?

```
postgres=# select name, department, salary, avg(salary), min(salary), max(salary) from employee group by name, salary, department;
  name   | department  | salary |          avg          | min  | max  
---------+-------------+--------+-----------------------+------+------
 Edward  | engineering |   2100 | 2100.0000000000000000 | 2100 | 2100
 Abigail | sales       |   1000 | 1000.0000000000000000 | 1000 | 1000
 Cedric  | sales       |   1100 | 1100.0000000000000000 | 1100 | 1100
 Don     | engineering |   2000 | 2000.0000000000000000 | 2000 | 2000
 Bob     | sales       |    800 |  800.0000000000000000 |  800 |  800
 Frodo   | engineering |   1900 | 1900.0000000000000000 | 1900 | 1900
(6 rows)
```

There we go! Simple, right? 
But if you look closer the avg salary for each row is equal to the employee's salary - this is because we made the rows effectively (in this case) unique due to the grouping name and salary. 

We can fix it by using windowed function call. Let's modify the query above:

```
postgres=# select name, department, salary, avg(salary) over (partition by department), min(salary) over (partition by department), max(salary) over (partition by department) from employee;
  name   | department  | salary |          avg          | min  | max  
---------+-------------+--------+-----------------------+------+------
 Don     | engineering |   2000 | 2000.0000000000000000 | 1900 | 2100
 Edward  | engineering |   2100 | 2000.0000000000000000 | 1900 | 2100
 Frodo   | engineering |   1900 | 2000.0000000000000000 | 1900 | 2100
 Abigail | sales       |   1000 |  966.6666666666666667 |  800 | 1100
 Bob     | sales       |    800 |  966.6666666666666667 |  800 | 1100
 Cedric  | sales       |   1100 |  966.6666666666666667 |  800 | 1100
(6 rows)
```

The data is now displaying correct values across department, because windowed function call is not bound to the grouping of the selected rows into a single output row

# Syntax  

So we know what windowed function calls can be used for and how they work in practice. Now it is time for syntax. 

The simpliest example I can think of is doing avg() over entire employee table as presented below:

```
postgres=# select avg(salary) over () from employee;
          avg          
-----------------------
 1483.3333333333333333
 1483.3333333333333333
 1483.3333333333333333
 1483.3333333333333333
 1483.3333333333333333
 1483.3333333333333333
(6 rows)
```

## Grouping/Partitioning input rows
If we want to group the input rows we have to use `partition by` syntax:

```
postgres=# select avg(salary) over (partition by department) from employee;
          avg          
-----------------------
 2000.0000000000000000
 2000.0000000000000000
 2000.0000000000000000
  966.6666666666666667
  966.6666666666666667
  966.6666666666666667
(6 rows)
```

Of course it is not limited to a single column and like in the `group by` we can provide several columns:

```
postgres=# select name, salary, avg(salary) over (partition by department, name) from employee;
  name   | salary |          avg          
---------+--------+-----------------------
 Don     |   2000 | 2000.0000000000000000
 Edward  |   2100 | 2100.0000000000000000
 Frodo   |   1900 | 1900.0000000000000000
 Abigail |   1000 | 1000.0000000000000000
 Bob     |    800 |  800.0000000000000000
 Cedric  |   1100 | 1100.0000000000000000
(6 rows)
```

## Ordering input rows

For this showcase I'll use the built-in [`rank()`](https://www.postgresql.org/docs/current/functions-window.html#FUNCTIONS-WINDOW-TABLE) method which depends on the specified ordering.

```
postgres=# select name, salary, rank() over (order by salary desc) from employee;
  name   | salary | rank 
---------+--------+------
 Edward  |   2100 |    1
 Don     |   2000 |    2
 Frodo   |   1900 |    3
 Cedric  |   1100 |    4
 Abigail |   1000 |    5
 Bob     |    800 |    6
(6 rows)
```

As you can see the descending ordering by salary has assigned ranks from highest salary to the lowest. 
Lets look how we can modify it so we can see the same ranking but within a specified department by combining `partition by` and `order by` keywords:

```
postgres=# select name, salary, department, rank() over (partition by department order by salary desc) as department_rank from employee;
  name   | salary | department  | department_rank 
---------+--------+-------------+-----------------
 Edward  |   2100 | engineering |               1
 Don     |   2000 | engineering |               2
 Frodo   |   1900 | engineering |               3
 Cedric  |   1100 | sales       |               1
 Abigail |   1000 | sales       |               2
 Bob     |    800 | sales       |               3
(6 rows)
```

## Filtering input rows

Just like aggregate functions - we can filter input rows with windowed function calls as well. Lets repeat previous query with rankings within a department and filter out all salaries that are below 1000.


```
postgres=# select name, salary, department, rank() filter (where salary >= 1000) over (partition by department order by salary desc) as department_rank from employee;
ERROR:  FILTER is not implemented for non-aggregate window functions
LINE 1: select name, salary, department, rank() filter (where salary...        
```

It's worth to note that we cannot use `filter` with non-aggregate window functions. Let's use avg() instead:

```
postgres=# select name, salary, department, avg(salary) filter (where salary >= 1000) over (partition by department) as department_rank from employee;
  name   | salary | department  |    department_rank    
---------+--------+-------------+-----------------------
 Don     |   2000 | engineering | 2000.0000000000000000
 Edward  |   2100 | engineering | 2000.0000000000000000
 Frodo   |   1900 | engineering | 2000.0000000000000000
 Abigail |   1000 | sales       | 1050.0000000000000000
 Bob     |    800 | sales       | 1050.0000000000000000
 Cedric  |   1100 | sales       | 1050.0000000000000000
(6 rows)
```

Another worth-taking note is that even tho Bob's salary was not included in the avg() function - he is still present in the output rows :), if we wanted to filter him out, we would need to do it in the `where` clause:

```
postgres=# select name, salary, department, avg(salary) over (partition by department) as department_rank from employee where salary >= 1000;
  name   | salary | department  |    department_rank    
---------+--------+-------------+-----------------------
 Don     |   2000 | engineering | 2000.0000000000000000
 Edward  |   2100 | engineering | 2000.0000000000000000
 Frodo   |   1900 | engineering | 2000.0000000000000000
 Abigail |   1000 | sales       | 1050.0000000000000000
 Cedric  |   1100 | sales       | 1050.0000000000000000
(5 rows)
```

Due to the *query execution order* we can also remove the `filter` clause from the aggregate function since the Bob's input row won't be fed to the function at all. 

## Reusing the window

Let's look at the example wit min(), max() and avg():

```
postgres=# select name, department, salary, avg(salary) over (partition by department), min(salary) over (partition by department), max(salary) over (partition by department) from employee;
  name   | department  | salary |          avg          | min  | max  
---------+-------------+--------+-----------------------+------+------
 Don     | engineering |   2000 | 2000.0000000000000000 | 1900 | 2100
 Edward  | engineering |   2100 | 2000.0000000000000000 | 1900 | 2100
 Frodo   | engineering |   1900 | 2000.0000000000000000 | 1900 | 2100
 Abigail | sales       |   1000 |  966.6666666666666667 |  800 | 1100
 Bob     | sales       |    800 |  966.6666666666666667 |  800 | 1100
 Cedric  | sales       |   1100 |  966.6666666666666667 |  800 | 1100
(6 rows)
```

As you can see the `(partition by department)` repeats three times. Thankfully it is quite simple, but imagine larger definition of the window and the need to repeat it several times - sounds cumbersome and error prone. Fortunatelly we can fix it by defining the window once and repeat it in the select query like below:

```
postgres=# select name, department, salary,
avg(salary) over department_window,
min(salary) over department_window,
max(salary) over department_window
from employee
window department_window as (partition by department);

  name   | department  | salary |          avg          | min  | max  
---------+-------------+--------+-----------------------+------+------
 Don     | engineering |   2000 | 2000.0000000000000000 | 1900 | 2100
 Edward  | engineering |   2100 | 2000.0000000000000000 | 1900 | 2100
 Frodo   | engineering |   1900 | 2000.0000000000000000 | 1900 | 2100
 Abigail | sales       |   1000 |  966.6666666666666667 |  800 | 1100
 Bob     | sales       |    800 |  966.6666666666666667 |  800 | 1100
 Cedric  | sales       |   1100 |  966.6666666666666667 |  800 | 1100
(6 rows)
``` 


References:
- <https://www.postgresql.org/docs/16/sql-expressions.html#SYNTAX-WINDOW-FUNCTIONS>
