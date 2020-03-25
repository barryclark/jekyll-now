---
layout: post
title: Hive Partitioning Best Practices
tags: hive, tez, apache, big data
last_updated: 2020-03-16
---
Hive Partitioning Best Practices

I/O operations are the most significant performance bottleneck when running Hive queries. One way to improve performance is by reducing the amount of data that needs to read. By default, Hive queries use the entire hive table, which translates to reading every file associated with the Hive table. However, when you need to scan a small amount of data using a filter, the behavior of reading the whole table is unnecessary and causes a lot of overhead. Hive partitioning enables Hive to access only the necessary amount of data in Hive Tables. Partitioning organizes raw data into a set of new directories, one directory for each partition defined by the user.

The example below is how a partitioned table stores data if it's partitioned by year:
```
|-- weather_partitioned_by_year/
|   |-- year=1986/
|   |   |-- 001.dat
|   |   |-- 002.dat
|   |   |-- ...
|   |   |-- 00N.dat
|   |-- year=1986/
|   |   |-- 001.dat
|   |   |-- 002.dat
|   |   |-- ...
|   |   |-- 00N.dat
|   |-- ...
|   |-- year=NNNN/
|   |   |-- 001.dat
|   |   |-- 002.dat
|   |   |-- ...
|   |   |-- 00N.dat
```

## Partitioning Best Practices:
### Do Not Under Partition
Partitioning on columns with only a few values can cause few partitions reducing the effectiveness of partitioning.

### Do Not Over Partition
Creating a partition on a column with a  unique value causes multiple partitions that can put a lot of stress on the cluster NameNode that has to handle a large number of directories

### Avoid Data Skew
Choose your partitioning key wisely so that all partitions are even size. Otherwise, performance varies tremendously. The hard truth is sometimes it is unavoidable, and you choose to partition as a way to isolate data as well.

## How to Create A partitioned table
Use the `PARTITIONED BY` clause.

```hql
CREATE TABLE weather_partitioned_by_year (
    date STRING,
    temperature DOUBLE,
    humidity DOUBLE
)
PARTITIONED BY (year STRING)
ROW FORMAT DELIMITED FIELDS TERMINATED BY '\t'
STORED AS TEXTFILE;
```

## Dynamic and Static Partitioning
Once you create a partitioned table, you can create partitions using static partitioning or dynamic partitioning.
### Static Partitions
When you already sharded data into appropriate directories, you can add each partition manually based on the directory location.
```hql
INSERT OVERWITE TABLE
PARTITION (YEAR = '1987')
SELECT * FROM
weather_not_partitioned_by_year
WHERE weather.year = '1987'

ALTER TABLE weather_partitioned_by_year ADD PARTIION (year='1987')
LOCATION s3://<path_to_s3_parition_directory>
```

### Dynamic Partitioning
Hive can create partitions automatically for you. All you have to do is insert data to the partitioned table
```
SET hive.exec.dynamic.partition = true;
SET hive.exec.dynamic.parititon.mode = nonstrict;
INSERT INTO TABLE weather_partitioned_by_year
PARTITION (YEAR)
SELECT
*
FROM
weather_not_partitioned_by_year;
```
To mitigate many files in many partitions, use the `DISTRIBUTE BY` clause.

### More Information
For more on partitioned tables take a look at the [wiki](https://cwiki.apache.org/confluence/display/Hive/LanguageManual+DDL#LanguageManualDDL-PartitionedTables)

