---
layout: post
title: Building a Highly-Available PostgreSQL Cluster on Azure 
subtitle:
category: howto
tags: [cloud, automation]
author: esmaeil_sarabadani
author_email: esmaeil.sarabadani@haufe-lexware.com
header-img: "images/bg-post.jpg"
---

The possibility to create a PostgreSQL cluster on your Azure subscription is now only few clicks away. The use of PostgreSQL database (a.k.a the most advanced open-source database) has increased in different software development projects in Haufe and setting it up in a cluster on Azure in an easy and convenient way (preferably as-a-Service) was always a wish for developers. 

We would like to announce that with our new Azure template it is now possible to automate the creation of a highly-available PostgreSQL cluster on your Azure subscription. 
It uses Ubuntu 14.04 LTS machines with 128 GB SSD data disks for high performance. A [Zookeeper] ensemble of three machines is used to orchestrate the behavior of the postgres cluster. For automated PostgreSQL server management and leader election the open source solution [Patroni] (developed by zalando) is used and installed side by side with PostgreSQL 9.5 on the machines. 

To use this template simply click [here] and you will be redirected to the Azure login page where you can log in and provide values for the following parameters:

 - ClusterName: The name of the cluster to create. Avoid spaces and special characters in this name
 - InstanceCount: The number of postgreSQL servers to create. Minimum: 2, Maximum: 5
 - AdminUsername: Name for user account with root privileges. Can be used to connect to the machines using ssh
 - AdminPassword: Password for admin user account

After deployment, you can connect to clusterName.regionName.cloudapp.azure.com on postgreSQL default port 5432 using username "admin" and the password you set as a parameter value in the template.
In order to connect to the postgreSQL instances, use any ssh client on port 10110 for instance postgres0, 10111 for postgres1 and etc.

We hope this brings some joy and of course convenience on your journey to cloud.

   [Zookeeper]: <http://zookeeper.apache.org/>
   [Patroni]: <https://github.com/zalando/patroni>
   [here]: <https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Ftangibletransfer.blob.core.windows.net%2Fpublic%2Fpostgresha%2FPostgresHA.json>
