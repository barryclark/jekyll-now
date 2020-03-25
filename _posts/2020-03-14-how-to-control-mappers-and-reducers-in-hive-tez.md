---
layout: post
title: How to Control Mappers and Reducers in Apache Hive on Tez
tags: hive, tez, apache
last_updated: 2020-03-04
---
Tez is an application framework built on Hadoop Yarn that can execute complex Directed Acyclic Graphs (DAGs) of general data processing tasks. Consider it a more flexible and powerful successor of the MapReduce framework on Hadoop.

Frankly, working with Tez is not great. The community is dead, and documentation is sparse. The last Tez release was on March 29, 2019, with 0.9.2. You're likely reading this because you're stuck with Tez. So let's get to controlling Mappers and Reducers.

## Controlling Mappers in Apache Hive on Tez
The parameters that control mappers on Tez are as follow:
```bash
- tez.grouping.max-size (default is 1,073,741,824 bytes or 1GB)
- tez.grouping.min-size (default is 16,777,216 bytes or 16MB)
- tez.am.grouping.split-waves (default is 1.7)
- tez.grouping.split-count (default not set)
```
You can view the effects of these settings in the DAG Syslog of the DAG Application master container directory by searching for `grouper.TezSplitGrouper`.
For example:
```bash
grep grouper.TezSplitGrouper syslog_dag_<app_number>
```

Each of the settings above manipulates the way initial task parallelism works. `max-size` and `min-size` together set an upper and lower bound on how much data should be split by and sent off to each mapper. `tez.am.grouping.split-waves` multiplies the number of mappers that to use with the chosen split. If `split-count` is set, `max-size` and `min-size` are ignored and Tez launches `split-count` number of mappers initially.

Initial task parallelism details are on the Tez Apache [wiki](https://cwiki.apache.org/confluence/display/TEZ/How+initial+task+parallelism+works).
The source code to initial task parallelism is available on [Git](https://github.com/apache/tez/blob/master/tez-mapreduce/src/main/java/org/apache/tez/mapreduce/grouper/TezSplitGrouper.java)

## Controlling the Number of Reducers in Apache Hive on Tez
Below are the parameters shared by Map Reduce and Tez that control the number of reducers:
`hive.exec.reducers.byters-per-reducer (default is 1000000000 or 1GB)`
`hive.exec.reducers.max (default is 1009)`
Tez has an additional parameter to control reducers:
`hive.tez.auto.reducer.parallelism (default false)`

The settings above manipulate how many reducers will spawn. For example, doubling the `bytes-per-reducer` parameter halves the number of reducers generated. If `max` has a value, no more than `max` reducers can spawn.

When `parallelism` is `true` Tez will estimate data sizes and set parallelism estimates by sampling the source vertice output sizes and adjusting the forecast at runtime as necessary.

Enjoy!
