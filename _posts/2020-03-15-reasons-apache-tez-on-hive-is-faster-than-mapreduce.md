---
layout: post
title: Reasons Apache Tez on Hive is Faster than MapReduce
tags: hive, tez, apache
last_updated: 2020-03-15
---
Here's a shortlist of reasons Apache Tez on Hive is faster than MapReduce:

## Tez Executes Directed Acyclic Graph (DAG) as a Single Job in the MapReduce Engine
The MapReduce Engine DAG requires each set of mappers to be followed by one set of reducers. Causing multiple MapReduce jobs to be spun off for each Hive query. Tez does not have this constraint and can process complex DAGs as one job minimizing the job overhead.

## Tez Avoids Unnecessary Writes
Multiple jobs process the same Hive query in the MapReduce engine. Each of these MapReduce jobs outputs intermediate data written to HDFS. Since Tez reduces the number of jobs for each Hive query, it's able to avoid writing unnecessary intermediate data.

## Tez Minimizes Start-up Delays
Tez is better able to minimize start-up delay by reducing the number of mappers it needs to start, improving optimization throughput.

## Tez Reuses YARN Containers
Whenever possible, Tez can reuse containers, ensuring lower latency due to starting, minimizing containers required.

## Tez Uses Continuous Optimization Techniques
Traditionally optimization is done during the compilation phase. However, Tez can gather information about the inputs allowing for better optimization during runtime. Tez uses continuous optimization techniques that will enable the plan to be optimized further during the runtime phase.

To enable Tez, prefix any hive query with the following set command:
`set hive.exectution.engine=tez;`
