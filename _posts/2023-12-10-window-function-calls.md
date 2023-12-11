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

The task we are given is to create a query that will return employee's name, salary and minimum, maximum and average salary across a department.

Sounds simple, we have built-in methods for max(), min() and avg() so the only thing we need to do is to aggregate the salary by department and select name and salary in the query, right?

```
postgres=# select name, salary, avg(salary), min(salary), max(salary) from employee group by department;
ERROR:  column "employee.name" must appear in the GROUP BY clause or be used in an aggregate function
LINE 1: select name, salary, avg(salary), min(salary), max(salary) f...
```

We cannot simply query the fields when using aggregate functions and they must be used either in aggregate function or *GROUP BY* clause...
Since we do not want to use them in aggregate function lets add them to the GROUP BY - what could go wrong?

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

References:
- <https://www.postgresql.org/docs/16/sql-expressions.html#SYNTAX-WINDOW-FUNCTIONS>
