> An aggregate function reduces **multiple inputs** to a **single output**

There are two types of aggregate functions where:
- order of inputs is optional
- order of inputs is **required** and they are called *ordered-set aggregate functions*

For the purpose of this post let's define a table like below:
```
create table user_t
(
    first_name varchar,
    last_name  varchar,
    rank		 integer
);

select * from user_t;

result:
first_name last_name rank
Abdal      Stalinsky 1     
Bob        Smith     2     
Celine     Doe       3     
Donn       Doe       4     
Edgard     Stalinsky 5     
Flark      Stalinsky 6     
George     Smith     7     
Hannah     Doe       8     
Isabelle   Belle     9 
```

## Aggregate functions with *optional* order

Example of such function is well-known `count()` 

Let's look at the code below:
```
select
    count(first_name) as count,
    count(first_name order by first_name) as count_order
from user_t;

result:
count ordered_count 
9     9      
```

No matter what is the order of rows from *user_t* - the result of `count()` is always the same

But there are examples of functions where such order would matter,
lets say we want to produce an array with first_names in ascending order:

```
select
    array_agg(first_name) as unordered_array,
    array_agg(first_name order by first_name) as ordered_array
from user_t;

result:
unordered_array                                               
{Edgard,Flark,Donn,George,Bob,Abdal,Hannah,Isabelle,Celine}

ordered_array
{Abdal,Bob,Celine,Donn,Edgard,Flark,George,Hannah,Isabelle} 
```

### Removing duplicates from input rows

In our example we have a several common last names like *Doe* or *Stalinsky*.  
What if we wanted to produce an array containing unique last names of our users?  
**DISTINCT** keyword to the rescue!  
This keyword will reduce the number of input rows in such way that the aggregate function will be called once per each distinct value or distinct set of values  

Example:
```
select 
 array_agg(last_name) as simple_list,
 array_agg(distinct last_name) as distinct_list
from user_t;

result:
simple_list
{Stalinsky,Stalinsky,Doe,Smith,Smith,Stalinsky,Doe,Doe,Belle} 
distinct_list
{Belle,Doe,Smith,Stalinsky} 
```

## Ordered-set aggregate functions

Sometimes the function to work properly has to have defined order of inputs. 
Lets think of a median and its simple definition  
> The median is the middle value in a dataset when it is ordered

So the ordering of the input matters, lets look at the following numbers

[3, 2, 1, 4, 5]  
Middle value is 1 but it is not median since the dataset is not ordered, to find the median first we need to order the dataset  

[1, 2, 3, 4, 5]  
After ordering we can see that the median is 3. 

How can we achieve enforcing this rule using PostgreSQL? Using *ordered-set aggregate functions*  

Median value is nothing else as 50th percentile, so we can also use the built-in `percentile_cont()` function.

Our order dataset looks like this [1, 2, 3, 4, 5, 6, 7, 8, 9] so the median is 5. 

Attempt to call the `percentile_cont()` without specyfing the order will result in a database exception:

```
postgres=# select percentile_cont(0.5, rank) from user_t;
ERROR:  WITHIN GROUP is required for ordered-set aggregate percentile_cont
LINE 1: select percentile_cont(0.5, rank) from user_t;
```

Lets look at the median when we have dataset as this [1, 2, 3, 4] the median should be 2.5
```
select percentile_cont(0.5) within group (order by rank) filter ( where rank < 5 ) from user_t;

result:
percentile_cont
2.5
```

## Filtering out input rows

Unlike *distinct* the *filter* operation can be applied to bot types of aggregate functions

When we filter the results the aggregation function is called once per filter evaluated to true: 
```
select
    array_agg(last_name) as simple_list,
    array_agg(last_name) filter ( where last_name not like 'D%' ) as filtered_list
from user_t;

result:
simple_list
{Stalinsky,Stalinsky,Doe,Smith,Smith,Stalinsky,Doe,Doe,Belle}
filtered_list
{Stalinsky,Stalinsky,Smith,Smith,Stalinsky,Belle}
```

# References:  
- https://www.postgresql.org/docs/16/sql-expressions.html#SYNTAX-AGGREGATES





