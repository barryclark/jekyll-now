---
layout: post
title: 一个Mysql的死锁问题，及复现过程
---

## 现象

最近发现生产环境的Mysql偶发出现死锁现象，通过`show engine innodb status`来查看事务状况，发现如下异常：

```
141111 15:23:29

*** (1) TRANSACTION:

TRANSACTION E652F8659, ACTIVE 0 sec, process no 768, OS thread id 1692539200 updating or deleting

mysql tables in use 1, locked 1

LOCK WAIT 4 lock struct(s), heap size 1248, 7 row lock(s), undo log entries 1

MySQL thread id 2707997, query id 1371160285 10.75.0.156 openapi Updating

update database_30.table_1405 set vflag=7, source=576792, fflag=1, mflag=7 where uid=2491598800 and vflag in(0,4,5,6,7,15,16) and status_id=3716431142880051

*** (1) WAITING FOR THIS LOCK TO BE GRANTED:

RECORD LOCKS space id 236 page no 198067 n bits 432 index `PRIMARY` of table `database_30`.`table_1405` trx id E652F8659 lock_mode X locks gap before rec insert intention waiting

Record lock, heap no 207 PHYSICAL RECORD: n_fields 8; compact format; info bits 0

 0: len 8; hex 000000009482c7d0; asc         ;;

 1: len 1; hex 0f; asc  ;;

 2: len 8; hex 000d2d24dd66eb5e; asc   -$ f ^;;

 3: len 4; hex 00007a12; asc   z ;;

 4: len 4; hex 00020001; asc     ;;

 5: len 6; hex 000c636448d3; asc   cdH ;;

 6: len 7; hex 28000001ad1d61; asc (     a;;

 7: len 1; hex 80; asc  ;;

*** (2) TRANSACTION:

TRANSACTION E652F865A, ACTIVE 0 sec, process no 768, OS thread id 1256171840 updating or deleting

mysql tables in use 1, locked 1

4 lock struct(s), heap size 1248, 6 row lock(s), undo log entries 1

MySQL thread id 2707970, query id 1371160282 10.75.24.210 openapi Updating

update database_30.timeline_1405 set vflag=7, source=576792, fflag=93, mflag=7 where uid=2491598800 and vflag in(0,4,5,6,7,15,16) and status_id=3716431457497283

*** (2) HOLDS THE LOCK(S):

RECORD LOCKS space id 236 page no 198067 n bits 432 index `PRIMARY` of table `status_timeline_30`.`table_1405` trx id E652F865A lock_mode X locks gap before rec

Record lock, heap no 189 PHYSICAL RECORD: n_fields 8; compact format; info bits 0

 0: len 8; hex 000000009482c7d0; asc         ;;

 1: len 1; hex 06; asc  ;;

 2: len 8; hex 000d2dc61663b517; asc   -  c  ;;

 3: len 4; hex 000000ae; asc     ;;

 4: len 4; hex 0000004d; asc    M;;

 5: len 6; hex 000c69baea0d; asc   i   ;;

 6: len 7; hex 98000003900084; asc        ;;

 7: len 1; hex 83; asc  ;;

Record lock, heap no 190 PHYSICAL RECORD: n_fields 8; compact format; info bits 0

 0: len 8; hex 000000009482c7d0; asc         ;;

 1: len 1; hex 07; asc  ;;

 2: len 8; hex 000d29dea6592c73; asc   )  Y,s;;

 3: len 4; hex 0008cd18; asc     ;;

 4: len 4; hex 00000009; asc     ;;

 5: len 6; hex 000c44bfa2a7; asc   D   ;;

 6: len 7; hex fa0000020f0084; asc        ;;

 7: len 1; hex 87; asc  ;;

Record lock, heap no 207 PHYSICAL RECORD: n_fields 8; compact format; info bits 0

 0: len 8; hex 000000009482c7d0; asc         ;;

 1: len 1; hex 0f; asc  ;;

 2: len 8; hex 000d2d24dd66eb5e; asc   -$ f ^;;

 3: len 4; hex 00007a12; asc   z ;;

 4: len 4; hex 00020001; asc     ;;

 5: len 6; hex 000c636448d3; asc   cdH ;;

 6: len 7; hex 28000001ad1d61; asc (     a;;

 7: len 1; hex 80; asc  ;;

Record lock, heap no 220 PHYSICAL RECORD: n_fields 8; compact format; info bits 0

 0: len 8; hex 000000009482ceda; asc         ;;

 1: len 1; hex 00; asc  ;;

 2: len 8; hex 000d2ad5921fcd74; asc   *    t;;

 3: len 4; hex 000000ae; asc     ;;

 4: len 4; hex 00000000; asc     ;;

 5: len 6; hex 000c4ceefc48; asc   L  H;;

 6: len 7; hex e8000001ba0084; asc        ;;

 7: len 1; hex 80; asc  ;;

*** (2) WAITING FOR THIS LOCK TO BE GRANTED:

RECORD LOCKS space id 236 page no 198067 n bits 432 index `PRIMARY` of table `database_30`.`table_1405` trx id E652F865A lock_mode X locks gap before rec insert intention waiting

Record lock, heap no 207 PHYSICAL RECORD: n_fields 8; compact format; info bits 0

 0: len 8; hex 000000009482c7d0; asc         ;;

 1: len 1; hex 0f; asc  ;;

 2: len 8; hex 000d2d24dd66eb5e; asc   -$ f ^;;

 3: len 4; hex 00007a12; asc   z ;;

 4: len 4; hex 00020001; asc     ;;

 5: len 6; hex 000c636448d3; asc   cdH ;;

 6: len 7; hex 28000001ad1d61; asc (     a;;

 7: len 1; hex 80; asc  ;;

*** WE ROLL BACK TRANSACTION (2)
```

两条SQL更新的并非同一条数据，只是不巧落到了一个Mysql的Page数据块上，第一感觉应该是业务SQL不合理。

所以准备下线复现一下，结果复现条件居然如此的简单。下面描述一下复现的过程：

####启动docker

```
docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=xxx -d mysql
docker inspect $instance_id | grep 'IPAddress'  // 查找image实例ip地址 
docker run -it --link some-mysql:mysql --rm mysql sh -c 'exec mysql -h"$IPAddress" -P"3306" -uroot -p"xxx"'
```

####检查Mysql的隔离级别

```
mysql> select @@global.tx_isolation, @@tx_isolation;
+-----------------------+-----------------+
| @@global.tx_isolation | @@tx_isolation  |
+-----------------------+-----------------+
| REPEATABLE-READ       | REPEATABLE-READ |
+-----------------------+-----------------+
```

####创建数据库

```
create database test;
use test;
CREATE TABLE `tx_rollback` (
  `id` bigint(16) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

####复现SQL

Session A | Session B | Session C
------------ | ------------- | ------------
start transaction | start transaction  | start transaction
insert into tx_rollback values(1) |   | 
| insert into tx_rollback values(1) | 
| | insert into tx_rollback values(1)
rollback | ERROR 1213 (40001): Deadlock found when trying to get lock; try restarting transaction | Query OK, 1 row affected (12.47 sec)

##问题原因

找到一篇文档也提到了这个问题：http://dev.mysql.com/doc/refman/5.0/en/innodb-locks-set.html

现在理解应该是事务A和事务B会首先获得共享锁，当事务C释放排它锁的时候，事务A和事务B尝试获取排它锁，这时就死锁了。因为两个事务会互相等待对方释放共享锁。

那问题来了，怎么破
