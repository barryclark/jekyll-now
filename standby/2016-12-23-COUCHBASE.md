CouchBase(Membase) 문제점 극복!
===============================

Membase를 사용하면서 발생한 문제점을 분석하고, 개선을 진행하면서 문서를 작성합니다.

환경
----

-	Membase Server

	-	Version : 1.7.2
	-	Node

		-	4개
		-	노드당 Replica 2개
		-	노드당 할당 메모리 2GB

	-	Bucket

		-	1개
		-	메모리 8GB(노드당 메모리 * 노드 수)

	-	각 서버 스팩

		-	RAM 8GB
		-	HDD 30GB

-	WEB Server

	-	Spring Boot Web Application
		-	SpyMemCached

---

사전 알아야 할 내용
-------------------

### CouchBase(Membase)

#### 1. Bucket

Couchbase Server 클러스터의 물리적 리소스의 논리적 그룹

**종류**

-	Couchbase
	-	영구 및 복제 서비스를 제공하여 높은 가용성과 동적 재구성 가능한 분산 데이터 스토리지를 제공
-	Memcached
	-	직접 주소 지정 (확장)은 분산 메모리에 키와 값의 캐시를 제공
	-	버킷은 관계형 데이터베이스 기술과 함께 사용하도록 설계

**주요 기능**

-	Rebalancing
	-	자원과 동적 추가 또는 클러스터의 버킷과 서버 제거 간 부하 분산을 가능하게 함
-	Replacing
	-	복제 서버 설정 가능한 수는 Couchbase(Membase) 유형 버킷의 모든 데이터 객체의 복사본을 받을 수 있습니다. 호스트 시스템에 장애가 발생한 경우, 복제 서버가 Fail Over를 통해 avilability 클러스터 작업을 제공하고 호스트 서버로 승격 할 수 있습니다. 복제가 버킷 레벨로 설정되어 있습니다.

**vBucket**

-	실제데이타와 물리서버간의 맵핑을 관리
-	각 키가 어디에 저장되어 있는지를 vBucket이라는 단위로 관리
-	키에 대한 해쉬값을 계산한 후에, 각 해쉬값에 따라서 저장되는 vBucket을 맵핑한다음 각 vBucket을 노드에 맵핑

![vBucket](/images/2016/2016_12_23_COUCHBASE/vbucket.png)

출처 : http://docs.couchbase.com/couchbase-manual-2.5/cb-admin/#vbuckets

#### 2. Node

-	Couchbase(Membase)는 여러 개의 노드로 이루어진 클러스터로 구성
-	물리적인 서버에서 기동하는 하나의 Couchbase(Membase) 인스턴스

![vBucket](/images/2016/2016_12_23_COUCHBASE/node.png)

출처 : http://hamait.tistory.com/198

**Cluster Manager**

-	8091 포트의 REST API를 통해서, 설정 정보와 vBucket 정보를 읽어옴

**Data Manager**

-	직접 데이터에 접근하는 부분
-	윗단에는 memcached가 있으며, 데이터를 cache하는데 사용
-	Memcached 위에는 moxi가 Proxy로 사용

**데이터 쓰기, 복제**

1.	Client SDK를 통해서 쓰기 요청
2.	해쉬 알고리즘에 따라 데이터의 키 값에 맵핑 되는 vBucket을 탐색
3.	vBucket에 맵핑 되는 노드를 찾아서 쓰기 요청
4.	쓰기 요청은 해당 노드의 Listener로 전달
5.	들어온 데이터를 로컬의 캐쉬에 씀
6.	클러스터의 다른 노드로 복제 요청
7.	노드의 디스크에 데이터 저장

![vBucket](/images/2016/2016_12_23_COUCHBASE/node_copy.png)

출처 : http://hamait.tistory.com/198

#### 3. Rebalancing

-	새롭게 배치된 데이터에 따라서 vBucket to 노드간의 데이터 맵핑 정보 업데이트
-	노드가 클러스터에 추가되거나, 장애등의 이유로 삭제되었을 때 물리적으로 데이터가 다른 노드로 다시 분산 배치
-	**노드간에 데이터 복제가 심하게 일어나기 때문에, 리밸런스는 부하가 적은 시간대에 하도록 권장**

#### 4. FailOver

`Failover`는 Couchbase(membase) 클러스터의 노드에서 수행되며 이는 비정상이고 더 이상 도달 할 수없는 노드에서 수행됩니다. 그 목적은 비정상적인 노드를 제거하고 다른 노드에서 복제본 데이터를 사용 가능하게하여 클러스터를 일관된 상태로 만드는 것입니다.

Failover의 동작은 아래와 같습니다.

1.	클러스터의 새로운 토폴로지로 업데이트 된 클러스터 맵을 수신
2.	새로운 설정에 적응
3.	현재 활성 구성과 비교
4.	어떤 TCP 연결 및 자원을 종료 및 제거해야하는지 결정
5.	장애 조치 노드에서 처리하는 복제 된 데이터가 클러스터의 다른 노드에서 활성화

공식 홈페이지에서는 FailOver 동작에 대해 아래의 경고를 제공합니다.

```
When a node is removed from the cluster during failover, it's possible for operations to be in mid-flight as a request or response from the server or being processed on the server. This means that the underlying TCP connection executing the operation may be closed by the server or the client which would result. In most cases this will result in that operation failing with either a with a client or server IO exception. In certain cases the operation will be retried up until it's configured operation "lifespan". It may be retried multiple times and fail multitple times until it either succeeds to or times out. In the event of a timeout, an OperationTimeoutException will returned in the Exception field of the IOperationResult.
```

위의 동작 과정 등이 리소스에 어느 정도 영향을 미치므로, 아래의 Exception들이 발생할 수 있다고 합니다.

-	OperationTimeoutException
-	NodeUnavailableException
-	ConnectionUnavailableException

**Auto FailOver**

`Auto Fialover`는 설정해준 시간을 주기로 각 노드 서버의 상황을 확인하고, 해당 노드 서버가 장애라고 판단되면 해당 서버를 FailOver 시켜주는 옵션입니다.<br>

-	세 개 이상의 노드가 포함 된 클러스터에서만 사용 가능
-	Default는 사용하지 않도록 비활성화
-	모든 노드 연쇄 FailOver를 방지하기 위해 하나의 노드까지만 자동 장애 조치
-	지정된 지연 기간 내에 두 개 이상의 노드가 동시에 다운되면 자동 장애 조치를 하지 않음
-	확인 주기는 최소 30초

---

[참고 : Couchbase Docs](http://docs.couchbase.com/admin/admin)

[참고 : Couchbase Administrator Guide](http://docs.couchbase.com/couchbase-manual-2.5)

[참고 : Bucket이란? : hans story](http://goldfing.blogspot.kr/2013/03/couchbase-server-20-bucket.html)

[참고 : 카우치베이스(Couchbase) 서버-#6 아키텍쳐 구조 살펴보기 : 조대협의 블로그](http://hamait.tistory.com/198)

<br>

### Spring Security

-	인증(Authentication)과 권한부여(Authorization)를 담당
-	세션 정보의 존재 여부에 따라 인증을 판단
-	사용자의 보호 및 인증된 세션을 SecurityContext에 저장

#### 1. SecurityContextPersistenceFilter

-	`SecurityContext`를 로드하고 저장하는 역할을 담당

#### 2. SecurityContextRepository

-	`SecurityContextPersistenceFilter`에서 `SecurityContext`가 저장될 저장소와의 통신과 관련된 기능을 담당
	-	`MemcachedSecurityContextRepository`(자체 구현) 사용
-	`Session` Object를 생성 인자로 갖음

### 3. SpyMemcached

클라이언트단에서 Couchbase(Membase)와 통신을 지원하는 오픈소스 클라이언트 SDK

#### 4. MemcachedClient

-	Couchbase(Membase)의 정보 및 통신과 관련된 기능을 담당
-	생성 인자로 Bucket 생성에 필요한 정보(server list, bucket name, pwd)를 갖음

#### 5. Session

-	`Session` 정보를 생성, 변경 및 로드하는 역할을 담당
	-	`MemcachedSession`(자체 구현) 사용
-	`SecurityContextRepository`의 생성인자로 `SecurityContextRepository`에 유일한 객체로 생성 됨

---

문제 접근
---------

### 문제점

특정 서버가 `Out Of Memory` 문제를 일으키며, 로그인 문제 발생

-	어플리케이션 상 로그

	```java
	net.spy.memcached.OperationTimeoutException: Timeout waiting for value
	```

-	Membase 로그

	```
	Hard Out Of Memory. Bucket "***" on node ***.***.***.*** is full. All memory allocated to this bucket is used for metadata.
	```

서버 로그를 확인해보니 발생한 특정 서버의 문제는 `Out Of Memory`였습니다.

'그동안 문제가 없었고, 큰 트래픽의 변화도 없었는데 어째서?'라고 생각하고 CouchBase(Membase)의 처음부터 다시 생각을 해보았습니다.

일단 하루 데이터 수치를 기준으로 최소 필요 메모리양을 계산해보았습니다.

`(키크기(60바이트) + 메타 데이터(60바이트))*(332K)/ 4(노드수) * 3 (복제본수)` = `약 30MB`

CouchBase(Membase)가 가지고 있어야 하는 데이터는 많이 여유롭습니다. 계산 필요없이 Membase Console로만 보아도 CouchBase가 가지고 있는 메모리는 적다는 것을 쉽게 알 수 있습니다.

![램 사용량](/images/2016/2016_12_23_COUCHBASE/couchbaseuseram.png)

그렇다면 저장되는 value 데이터로 인한 `Out Of Memory`일 가능성이 매우 크다고 생각됩니다. 저장되는 데이터는 메모리 캐쉬 솔루션인 `memcached`에 의해 메모리에 저장되고 있습니다. 그러나 사용하는 버전에서는 Memcached의 실시간 모니터링이 불가능했기 때문에 통계 로그를 통해 메모리를 확인해야 했습니다.

2016년 10월 28일(장애 발생 당일)과 2017년 01월 04일(안정화)의 Membase 로그를 추출하였고, 다수의 이상 항목이 발견되어 뽑아보았습니다.

### 이상 로그

**1. 계속 줄어드는 free memory**

![현상](/images/2016/2016_12_23_COUCHBASE/memorystatus.png)

```
<Node - 1>
free_memory ->
	장애 직전 : 71368704
	안정화 후 : 2002853888
<Node - 2>
free_memory ->
	장애 직전 : 110706688
	안정화 후 : 3659141120
<Node - 3>
free_memory ->
	장애 직전 : 67575808
	안정화 후 : 3229872128
<Node - 4>
free_memory ->
	장애 직전 : 95576064
	안정화 후 : 3940560896
```

장애 직전을 보았을 때 1번 서버뿐 아니라 모든 서버에서 free memory가 부족한 상태였습니다. (장애 상황에서는 1번 서버의 free memory가 64MB 밑으로 떨어졌습니다.)

**2. 비정상적인 Replica Item**

1개의 노드에서 2개의 Replica Node를 갖도록 설정되어 있지만, 장애 상황에서 1,3번의 Replica 통계는 비정상적으로 높았고, 2,4번의 Replica 통계는 0이였습니다.

```
<Node - 1>
curr_items ->
	장애 직전 : 377491
	안정화 후 : 414453
vb_replica_curr_items ->
	장애 직전 : 10425536
	안정화 후 : 829999

<Node - 2>
curr_items ->
	장애 직전 : 383384
	안정화 후 : 420429
vb_replica_curr_items ->
	장애 직전 : 0
	안정화 후 : 831116

<Node - 3>
curr_items ->
	장애 직전 : 377877
	안정화 후 : 414262
vb_replica_curr_items ->
	장애 직전 : 10603310
	안정화 후 : 830212

<Node - 4>
curr_items ->
	장애 직전 : 383150
	안정화 후 : 420267
vb_replica_curr_items ->
	장애 직전 : 0
	안정화 후 : 830709
```

**3. 장애 직전 / 안정화 후 100배 이상의 통계 수치들**

```
ep_bg_fetched -> 2176105/0
ep_commit_time_total -> 51599008351/5570838
ep_diskqueue_items -> 641450407/633768
ep_diskqueue_memory -> 56447635816/55771584
ep_diskqueue_pending -> 201470649572/128580374
ep_expired -> 205175389885/172392843
ep_io_num_read -> 2176873/0
ep_io_read_bytes -> 624829812/0
ep_num_active_non_resident -> 10323325/0
ep_num_eject_failures -> 161119834/0
ep_num_eject_replicas -> 103088739/0
ep_num_non_resident -> 16768831/0
ep_num_not_my_vbuckets -> 5898/8368508
ep_num_pager_runs -> 20546/0
ep_num_value_ejects -> 115591616/0
ep_pending_ops_max_duration -> 0/75323
ep_storage_age_highwat -> 4294967295/11539
ep_too_old -> 0/1426329
ep_too_young -> 134793/0
ep_vbucket_del -> 1/780
ep_vbucket_del_total_walltime -> 26932/8323312
ep_warmup_time -> 3167194/11148
get_misses -> 207714469157/597466795
tap_connect_received -> 3/1060
vb_active_eject -> 12502877/0
vb_active_num_non_resident -> 10323325/0
vb_active_ops_reject -> 134793/0
vb_active_perc_mem_resident -> 0/100
vb_active_queue_age -> 4312177000/431741583187000
vb_replica_eject -> 103088739/0
vb_replica_num_non_resident -> 6445506/0
vb_replica_queue_age -> 1066178329754685000/999121432430000
vb_replica_queue_memory -> 56439928952/38455472
vb_replica_queue_pending -> 201443403603/104791634
vb_replica_queue_size -> 641362829/436994
```

각 항목에 대한 설명은 [[memory : couchbase doc]](https://developer.couchbase.com/documentation/server/current/cli/cbstats/cbstats-memory.html)와 [[cbstats : couchbase doc]](https://developer.couchbase.com/documentation/server/current/cli/cbstats-intro.html)에서 확인 가능하지만, Membase Server 1.7.2 이후로 굉장히 많은 수정사항이 업데이트되며 사라지거나 새로 생긴 통계 항목들이 많기 때문에 정확한 확인이 어려웠습니다.

문제 분석 및 개선
-----------------

### 로그 수치 분석

메모리 반환 작업이 정상적으로 수행되지 못하는 것을 의심하였으나 ep engine은 정상적인 주기로 동작하고 있는 것을 확인

```
ep_exp_pager_stime            3600
ep_item_flush_expired         1240193940
```

eject에 실패했다는 `ep_num_eject_failures` 수치가 비정상적으로 높은 것을 확인하였고, 메타데이터-키-값을 저장하는데 사용되는 메모리인 `ep_kv_size`가 지속적으로 증가하고 있는 것을 확인

```
ep_num_eject_failures  161119834
ep_kv_size 누적 증가량 321088428
```

메모리는 해제되고 있으나, 메모리가 해제되는 것보다 쌓이는 속도가 더 클 수 있다는 가설을 세워 봄(가설이 맞다면 비정상적으로 많이 쌓인 DiskQueue가 설명이 됨)

메모리를 쌓는 set, update operation 수치를 확인

**신규 Key 값에 대한 통계 수치**

![램 사용량](/images/2016/2016_12_23_COUCHBASE/new_item.png)

트래픽 대비 일반적인 신규 Key 값을 갖음(약간 높다고는 생각)

**Update Operation 통계 수치**

![램 사용량](/images/2016/2016_12_23_COUCHBASE/update_item.png)

membase에서 관리되는 Value가 사용자의 세션이기 때문에 사용자가 새로고침을 했을 경우에 expire를 갱신하는 update 쿼리가 발생했을 것으로 예상

**Set Operation 통계 수치**

![램 사용량](/images/2016/2016_12_23_COUCHBASE/set_item.png)

신규 Key 값에 대한 수치보다 몇 배가 되는 Set Operation이 발생하는 이상 현상 발견

어플리케이션의 동작 로직에 문제가 있다는 예상을 함

### 어플리케이션 개선

#### 1. 불필요한 요청 제거

첫번째로 테스트 환경을 구성하여 단일 사용자 접속시 그래프가 어떻게 그려지는지 확인을 해보았습니다.

**New User**

![단일 사용자 테스트1](/images/2016/2016_12_23_COUCHBASE/newuser.png)

**Set**

![단일 사용자 테스트1](/images/2016/2016_12_23_COUCHBASE/set.png)

**Update**

![단일 사용자 테스트1](/images/2016/2016_12_23_COUCHBASE/update.png)

**Get**

![단일 사용자 테스트1](/images/2016/2016_12_23_COUCHBASE/get.png)

단일 첫 접속 대비 너무 많은 요청이 가고 있다는 것을 확인하여 `Debuger`를 통해 요청 트래픽을 알보았습니다.

문제는 Spring Security의 `fillterChaninMap` 이였습니다. 과거 동적 요청이 거의 없었던 시절 개발되었던 프로젝트에서 동적 요청이 다수 추가되었지만, 필터는 업데이트되지 않았기 때문입니다.

```java
filterChainMap.put((String) urlMatcher.compile("/**"), filters);
```

*(resource 요청을 제외한 모든 트래픽이 Security fillter를 거침)*

수정 후

```java
filterChainMap.put((String) urlMatcher.compile("/view/**"), Lists.<Filter>newArrayList());
filterChainMap.put((String) urlMatcher.compile("/**"), filters);
```

`동적 요청을` 처리하지 않도록 빈 필터를 적용

다시 테스트!

**New User**

![단일 사용자 테스트2](/images/2016/2016_12_23_COUCHBASE/newuser2.png)

**Set**

![단일 사용자 테스트2](/images/2016/2016_12_23_COUCHBASE/set2.png)

**Update**

![단일 사용자 테스트2](/images/2016/2016_12_23_COUCHBASE/update2.png)

**Get**

![단일 사용자 테스트2](/images/2016/2016_12_23_COUCHBASE/get2.png)

눈에 띄게 요청 빈도가 떨어졌습니다. 사용자 체류시간과 활동을 알아야 정확히 통계를 낼 수 있기 때문에, 정확한 수치를 낼 수는 없지만 많은 트래픽이 이 부분에서 감소할 수 있을 거라고 생각합니다.

#### 2. Touch Command를 활용

위에서 설명했 듯 `Membase`를 어플리케이션은 `SpringSecurity`의 `SecurityContextPersistenceFilter`에서 사용하는 `SecurityContextRepository`를 통해 `Membase`와 교류를 하고 있고 우리는 `SecurityContextRepository`를 상속한 `MemcachedSecurityContextRepository`를 구현해서 사용하고 있습니다.

`SecurityContextRepository`의 핵심 로직은 `loadContext`와 `saveContext`입니다.

Spring Docs에서는 `loadContext`는 보안 콘텍스트를 로드하는 역할을 하도록 명시되어 있고, `saveContext`는 보안 콘텍스트를 저장하는 역할을 하도록 명시되어 있습니다.

눈 여겨 볼 부분은 `saveContext` 입니다.

`saveContext`은 보안 콘텍스트를 저장하는 역할을 하지만, 이미 데이터가 있을 경우 expire를 갱신하는 역할을 수행할 수도 있습니다. 그리고 expire를 갱신할 때 사용할 수 있는 mamcached의 유용한 기능이 바로 `touch` 입니다.

`touch` 기능은 `Membase 1.7`에서부터 적용이 되었으며, `spymemcached 2.7`로 자바로 공식 지원을 하고 있습니다.

Couchbase 공식 홈페이지에서 `touch` 기능을 아래와 같이 설명하고 있습니다.

```
Touch

We have heard from quite a few projects owners that they’d like the ability to have items with a sliding window of expiration. For example, instead of having an item expire after five minutes of mutating (which is how you specify an object’s time-to-live today), we’d like it to expire after five minutes of inactivity.

If you’re familiar with LRU caches (such as memcached), you should note that this is semantically quite different from LRU. With an LRU, we effectively don’t care about old data. The use cases for touch require us to actively disable access to inactive data on a user-defined schedule.

The touch command can be used to adjust expiration on an existing key without touching the value. It uses the same type of expiration definition all mutation commands use, but doesn’t actually touch the data.

Similar to touch we added a gat (get-and-touch) command that returns the data and adjusts the expiration at the same time. For most use cases, gat is probably more appropriate than touch, but it really depends on how you build your application.
```

이 내용의 핵심은

```
The touch command can be used to adjust expiration on an existing key without touching the value. It uses the same type of expiration definition all mutation commands use, but doesn’t actually touch the data.
```

`touch` 명령을 사용한다면, 실제로 데이터를 건드리지않고, 키 값의 만기를 저장할 수 있다는 내용입니다. 또한 `get-and-touch` 기능으로 조회와 만기 수정을 한번에 할 수 있는 기능도 제공합니다.

이 기능을 보았을 때 의아한 점이 생기게 되었습니다.

*TEST CODE<br>(Disk Queue를 보기 위하여 일시적으로 많은 데이터 전송)*

```java
memcachedClient.set("TEST1", 10000, "TEST DATA");
for(int i=0;i<10;i++) {
    memcachedClient.set("TEST1",10000);
}
```

**Update**

![단일 사용자 테스트3](/images/2016/2016_12_23_COUCHBASE/update3.png)

**Disk Wirte Queue**

![단일 사용자 테스트3](/images/2016/2016_12_23_COUCHBASE/diskqueue3.png)

현재의 expire를 갱신하는데에는 disk queue를 사용하고 있고, 이 말은 expire를 갱신하는데에 set operation을 사용하고 있다는 점 입니다. 이 부분에 touch 기능을 사용한다면 조금 더 서버 성능에 개선이 가능해보였습니다.

다시 테스트!

*TEST CODE<br>(Disk Queue를 보기 위하여 일시적으로 많은 데이터 전송)*

```java
memcachedClient.set("TEST2", 10000, "TEST DATA");
for(int i=0;i<10;i++) {
    memcachedClient.getAndTouch("TEST2",10000);
}
```

**Update**

![단일 사용자 테스트4](/images/2016/2016_12_23_COUCHBASE/update4.png)

**Disk Wirte Queue**

![단일 사용자 테스트4](/images/2016/2016_12_23_COUCHBASE/diskqueue4.png)

즉 서버의 Disk Write Queue를 사용하지 않을 수 있으며, 서버의 부담을 덜어줄 수 있습니다. 확인해볼 결과 현재도 `touch` 기능을 일부 사용하고 있으나, 해당 어플리케이션의 주요 로직에서는 적용되어 있지 않았습니다.

개선할 현재의 로직 입니다.

```java
...
if(!trustResolver.isAnonymous(context.getAuthentication())) {
	memcachedSession.set(MEMCACHE_SECURITY_CONTEXT_KEY, context);
	...
}
```

수정 후

```java
...
if(!trustResolver.isAnonymous(context.getAuthentication())) {
	if(memcachedSession.getAndTouch(MEMCACHE_SECURITY_CONTEXT_KEY) == null) {
		memcachedSession.set(MEMCACHE_SECURITY_CONTEXT_KEY, context);
	}
	...
}
```

---

**여기까지 Membase의 서버 부하를 줄여 서버를 조금 더 안정적으로 만들고자 하는 개선을 해보았습니다. 그러나 이번 이슈로 떠오른 이슈가 한가지 더 있습니다. <br><br>바로 Membase 서버가 죽었을 때 어플리케이션을 구동할 수 없는 문제입니다. Membase는 세션을 관리해주는 용도로 사용하기 때문, Membase가 죽었다고 어플리케이션을 올릴 수 없는 문제는 일어나서는 안되기 때문입니다.**

어플리케이션 - Membase 의존성 제거하기
--------------------------------------

### 문제

-	상황 1. 어플리케이션 실행 중 일부 Membase 서버가 죽었을 때

-	상황 2. 어플리케이션 실행 중 모든 Membase 서버가 죽었을 때

-	상황 3. 일부 Membase 서버가 죽었을 때 어플리케이션 로드

-	상황 4. 모든 Membase 서버가 죽었을 때 어플리케이션 로드

	![Application Exception](/images/2016/2016_12_23_COUCHBASE/exception.png)

#### 문제 원인

**Bean 생성 실패**

Spring Application은 의존성 부여된 모든 Bean들이 로드되어야 합니다. 일부 빈의 실패만으로도 어플리케이션 로드가 실패게 됩니다.

SpyMemchaced의 MemcachedClient는 최초 어플리케이션 로드시 주입해준 Bucket 정보의 노드들이 하나 이상 connection을 성공적으로 맺지 못하면 null을 리턴하게 되며, null을 리턴하므로 Bean 생성을 실패하게 됩니다.

MemcachedClient의 Bean 생성 실패로 의존성을 갖는 나머지 빈들(MemcachedSession, MemcachedSecurityContextRepository)도 로드할 수 없게 됩니다.

![Memcached 의존성](/images/2016/2016_12_23_COUCHBASE/dependence.jpg)

#### 해결 방안

스프링의 `BeanFacotry`를 활용하여 직접 원하는 빈을 등록하면 간단하게 해결할 수 있씁니다. 그러나 해당 `Bean`만을 위한 클래스를 만드는 것보다 확장할 수 있는 범용적인 구조를 만들어보았습니다.

##### 동적 빈 생성 모듈 : DynamicGenerator

![DynamicGenerator 설계](/images/2016/2016_12_23_COUCHBASE/dynamicbeanpattern.png)

Adapter Pattern을 적용하여 `DynamicGeneratorAdapter`를 만들었고, Adapter를 상속하는 3개의 `DynamicGenerator`를 만들었습니다.

**빈 생성 정의**

각 `DynamicGenerator` 구현체는 `Generic`을 통해 생성하여 등록해야 하는 `Bean` Class를 정의하였고, `generate` Method를 재정의하여 세부적인을 객체 생성을 할 수 있도록 만들었습니다.

**후 처리 정의**

빈 생성 후에 수행해야 할 작업이 있다면 `DynamicBeanExecuter`를 상속하여 `execute` Method를 정의할 수 있도록 하였습니다.

**의존성 주입**

![DynamicGenerator 설계](/images/2016/2016_12_23_COUCHBASE/dynamicbeanpattern2.png)

구현체들을 스프링 `Component`로 등록하여, 각 구현체에게 기본적인 의존성 주입을 스프링에서 해주도록 했습니다.

**생성 실패시 복구 스케줄링 정의**

`DynamicGeneratorAdapter`가 상속하고 있는 `RecoverableAdapter`는 해당 객체가 로드에 실패했을 경우 복구가 필요한지에 대한 정의를 정의할 수 있도록 합니다. `Default`로는 복구가 필요하지 않도록 정의되어 있으며, `getDelaySeconds` Method를 재정의하여 몇 초를 주기로 복구를 시도할지 정의할 수 있습니다.

**동적 의존성 주입**

동적으로 생성하려는 `Bean` 간에도 의존 관계를 갖을 수 있는데, 기존 `@Autowired`와 같은 원리이지만 동적으로 의존성 주입을 표시할 수 있도록 `@DynamicAutowired`라는 어노테이션을 생성했습니다. 이 어노테이션을 기반으로 동적 `Bean`들 간의 관계를 파악하여 의존성을 주입받을 수 있습니다.

**즉시 생성 정의**

`DynamicGeneratorAdapter`는 `isOnlyDirectGenerate` 메서드를 정의하고 있으며, 기본 값은 `false` 입니다. 해당 메서드는 아래에서 설명할 동적 빈 생성 관리자인 `DynamicBeanFactory`가 생성될 때 자동으로 생성되도록 할 것인가를 정의하는 메서입니다. 반환 값을 `true`로 재정의할 경우, 자동으로 생성되지 않고 `DynamicBeanFactory를` 통해 직접 생성할 수만 있습니다.

##### 동적 빈 생성 관리자 : DynamicBeanFactory

`DynamicGenerator`에서 정의하고 있는 모든 내용을 기반으로 실제 Bean을 생성하고 등록, 복구하는 역할을 하는 객체는 `DynamicBeanFactory` 입니다.

![DynamicGenerator 설계](/images/2016/2016_12_23_COUCHBASE/dynamicbeanpattern3.png)

`DynamicBeanFactory`은 스프링 `Component`로 등록되어, 스프링으로부터 `beanFactory`와, `Generator Map`을 주입받아 사용도록 하였습니다.

**빈 생성**

`@PostConstruct`를 통해 초기화 작업에서 즉시 생성하도록 정의되어있는 `Generator`만 사용하여 동적 빈을 생성합니다.

빈을 생성할 때 `@DynamicAutowired`를 기반으로 재귀로 동적 빈들을 탐색하여, 동적 관계를 파악하고 빈을 생성하여 동적으로 의존성 주입을 하게 됩니다.

성공적으로 생성된 객체는 `BeanFactory에` `singleton`으로 등록됩니다.

**후 처리**

`DynamicBeanFactory`는 빈이 성공적으로 생성되어 `BeanFactory`에 등록되면, 해당 `Generator`가 `DynamicBeanExecuter`를 `Interface`로 가지고 있을 시 `execute` 메서드를 실행하게 됩니다.

**복구 스케줄링**

![DynamicGenerator 설계](/images/2016/2016_12_23_COUCHBASE/dynamicbeanpattern4.png)

스프링 스케줄링을 사용하여, 30초를 주기로 recover()를 실행하는 역할을 하는 `DynamicBeanRecover`를 생성하였습니다.

```java
@Service
@EnableScheduling
public class DynamicBeanRecover {

    @Autowired
    private DynamicBeanFactory dynamicBeanFactory;

    @Scheduled(cron = "0/30 * * * * *")
    @SuppressWarnings("unchecked")
    public void recover() {
        dynamicBeanFactory.recovery((new DateTime().getSecondOfDay()) + 86400);
    }
}
```

`DynamicBeanRecover`는 일정 주기로 복구를 수행하는 스케줄링 역할만 하고, 실제 복구 작업은 `DynamicBeanFactory` 객체로 위임하였습니다. `DynamicBeanFactory`는 Generator를 탐색하여, 해당 시간에 맞는 Generator를 통해 빈 객체 생성을 시도하게 됩니다.

스케줄 단위를 30초로 해두었으므로, `getDelaySeconds`를 재정의할 때는 30초 단위로 작성하여야 합니다.

생성하려는 Bean의 의존성 관계의 최상단에 위치하고 있는 `MemcachedSecurityContextRepository`을 생성하기 위한 `MemcachedSecurityContextRepositoryDynamicGenerator`로 예를 들자면,

```java
@Component
public class MemcachedSecurityContextRepositoryDynamicGenerator extends DynamicGeneratorAdapter<MemcachedSecurityContextRepository> implements DynamicBeanExecuter {

		@Autowired
		private FilterChainProxy filterChainProxy;

    @DynamicAutowired
    private MemcachedSession memcachedSession;

    @Override
    public MemcachedSecurityContextRepository generate() throws Exception {
        return new MemcachedSecurityContextRepository(memcachedSession);
    }    

    @Override
    public void execute() {
				...
				(생략)
				...

        filterChainMap.put((String) urlMatcher.compile("/**"), generateMemcachedSessionFilters(securityContextPersistenceFilter));
    }

    private List<Filter> generateMemcachedSessionFilters(SecurityContextPersistenceFilter securityContextPersistenceFilter) {
        ...
				(생략)
				...
    }

    @Override
    public int getDelaySeconds() {
        return 30;
    }
}
```

Generic Type으로 `MemcachedSecurityContextRepository`을 등록하여 해당 객체를 생성해주도록 하였고,

DynamicGeneratorAdapter의 `generate` Method를 재정의하여 세부적인 설정으로 객체를 생성할 수 있도록 하였으며,

내부에서 사용한 `Environment` 객체에 대한 의존성 주입은 `@Autowired`을 통해 스프링에서 해주게 했습니다.

`@DynamicAutowired`이 선언된 `MemcachedSession` 객체는 `DynamicBeanFactory`로부터 의존성을 주입받도록 하였습니다.

`DynamicBeanExecuter`를 `Interface`로 갖고 있으므로, 빈이 등록된 후 `execute` 메서드가 실행되어 해당 어플리케이션의 SecurityFilter에 Memcached 반영된 필터를 등록하게 됩니다.

`getDelaySeconds` 메서드를 재정의하여 30초를 주기로 복구 스케줄을 실행하도록 하였기 때문에 빈 생성에 실패했다면 30초를 주기로 빈 생성을 시도하게 됩니다.
