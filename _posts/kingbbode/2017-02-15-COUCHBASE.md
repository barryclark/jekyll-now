Membase 문제점 극복!
====================

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

<detail>

<summary> 사전 알아야 할 내용 </summary>

<p>

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

![vBucket](/images/2017/2017_02_15_COUCHBASE/vbucket.png)

출처 : http://docs.couchbase.com/couchbase-manual-2.5/cb-admin/#vbuckets

#### 2. Node

-	Couchbase(Membase)는 여러 개의 노드로 이루어진 클러스터로 구성
-	물리적인 서버에서 기동하는 하나의 Couchbase(Membase) 인스턴스

![vBucket](/images/2017/2017_02_15_COUCHBASE/node.png)

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

![vBucket](/images/2017/2017_02_15_COUCHBASE/node_copy.png)

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

</detail>

---

장애 원인 파악 및 개선
----------------------

### 첫번째 문제

**특정 서버가 `Out Of Memory` 문제를 일으키며, 최초 로그인 문제 발생**

-	어플리케이션 상 로그

	```java
	net.spy.memcached.OperationTimeoutException: Timeout waiting for value
	```

-	Membase 로그

	```
	Hard Out Of Memory. Bucket "***" on node ***.***.***.*** is full. All memory allocated to this bucket is used for metadata.
	```

서버 로그를 확인해보니 발생한 특정 서버의 문제는 `Out Of Memory`였습니다.

'그동안 문제가 없었고, 큰 트래픽의 변화도 없었는데 어째서?'라고 생각하고 Membase의 처음부터 다시 생각을 해보았습니다.

일단 하루 데이터 수치를 기준으로 최소 필요 메모리양을 계산해보았습니다.

`(키크기(60바이트) + 메타 데이터(60바이트))*(332K)/ 4(노드수) * 3 (복제본수)` = `약 30MB`

Membase가 가지고 있어야 하는 데이터는 많이 여유롭습니다. 계산 필요없이 Membase Console로만 보아도 Membase가 가지고 있는 메모리는 적다는 것을 쉽게 알 수 있습니다.

![램 사용량](/images/2017/2017_02_15_COUCHBASE/couchbaseuseram.png)

그렇다면 저장되는 value 데이터로 인한 `Out Of Memory`일 가능성이 매우 크다고 생각됩니다. 저장되는 데이터는 메모리 캐쉬 솔루션인 `memcached`에 의해 메모리에 저장되고 있습니다. 그러나 사용하는 버전에서는 Memcached의 실시간 모니터링이 불가능했기 때문에 통계 로그를 통해 메모리를 확인해야 했습니다.

2016년 10월 28일(장애 발생 당일)과 2017년 01월 04일(안정화)의 Membase 로그를 추출하였고, 다수의 이상 항목이 발견되어 뽑아보았습니다.

#### 이상 로그

**1. 계속 줄어드는 free memory**

![현상](/images/2017/2017_02_15_COUCHBASE/memorystatus.png)

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

**2. 장애 직전 / 안정화 후 100배 이상 차이가 나는 diskqueue memory**

```
ep_diskqueue_items -> 641450407/633768
ep_diskqueue_memory -> 56447635816/55771584
ep_diskqueue_pending -> 201470649572/128580374
```

각 항목에 대한 설명은 [[memory : couchbase doc]](https://developer.couchbase.com/documentation/server/current/cli/cbstats/cbstats-memory.html)와 [[cbstats : couchbase doc]](https://developer.couchbase.com/documentation/server/current/cli/cbstats-intro.html)에서 확인 가능하지만, Membase Server 1.7.2 이후로 굉장히 많은 수정사항이 업데이트되며 사라지거나 새로 생긴 통계 항목들이 많기 때문에 정확한 확인이 어려웠습니다.

#### 로그 수치 분석

지속적인 `Free Memory` 하강을 처음에는 메모리 반환 작업이 정상적으로 수행되지 못하는 것을 의심하였으나 ep engine은 정상적인 주기로 동작하고 있는 것을 확인했습니다.

```
ep_exp_pager_stime            3600
ep_item_flush_expired         1240193940
```

이 현상은 Membase의 `expire` 데이터 처리 방식으로 어느 정도 설명이 가능합니다.

[카우치베이스 공식 문서](https://developer.couchbase.com/documentation/server/4.0/developer-guide/expiry.html)에 의하면, expire된 데이터는 즉시 삭제되는 것이 아니고 메타 데이터에 저장된 expire 정보를 토대로 API로 요청이 있을 때 `expiry pager`에 의해 메모리에서 해제된다는 것 입니다.

그렇지만, 일정 시간이 지났을 경우 안정화되야하는 메모리가 지속적으로 떨어졌다는 문제는 여전합니다. 이 문제는 `diskqueue memory` 로그 수치를 보았을 때 예상이 가능했습니다. 로그를 더 자세히 확인한 결과 wirte diskqueue가 지속적으로 쌓이고 있다는 것을 확인했고, 그래서 데이터를 쓰는 속도보다 조금 더 빠르게, 쓰기 요청이 쌓이고 있다는 예상을 할 수 있었습니다.

그래서 데이터 쓰기 요청을 쌓는 API 요청 수치를 Membase Console을 통해 확인해보았습니다.

**신규 Key 값에 대한 통계 수치**

![램 사용량](/images/2017/2017_02_15_COUCHBASE/new_item.png)

트래픽 대비 일반적인 신규 Key 값을 갖습니다.(약간 높다고는 생각)

**Update Operation 통계 수치**

![램 사용량](/images/2017/2017_02_15_COUCHBASE/update_item.png)

membase에서 관리되는 Value가 사용자의 세션이기 때문에 사용자가 새로고침을 했을 경우에 expire를 갱신하는 update 쿼리가 발생했을 것으로 생각됩니다.

**Set Operation 통계 수치**

![램 사용량](/images/2017/2017_02_15_COUCHBASE/set_item.png)

신규 Key 값에 대한 수치보다 몇 배가 되는 Set Operation이 발생하는 이상 현상을 발견했습니다! 다시 보니 Update Operation도 많다고 생각되어 집니다.

아무리보아도 어플리케이션의 동작 로직에 문제가 있다는 의심이 되었습니다.

#### 개선 - 어플리케이션-Membase 간 요청 개선

##### 1. 불필요한 요청 제거

첫번째로 테스트 환경을 구성하여 단일 사용자 접속시 그래프가 어떻게 그려지는지 확인을 해보았습니다.

**New User**

![단일 사용자 테스트1](/images/2017/2017_02_15_COUCHBASE/newuser.png)

**Set**

![단일 사용자 테스트1](/images/2017/2017_02_15_COUCHBASE/set.png)

**Update**

![단일 사용자 테스트1](/images/2017/2017_02_15_COUCHBASE/update.png)

**Get**

![단일 사용자 테스트1](/images/2017/2017_02_15_COUCHBASE/get.png)

단일 첫 접속 대비 너무 많은 요청이 가고 있다는 것을 확인하여 `Debuger`를 통해 요청 트래픽을 알보았습니다.

문제는 Spring Security의 `fillterChaninMap` 이였습니다. 과거 동적 요청이 거의 없었던 시절 개발되었던 프로젝트에서 동적 요청이 다수 추가되었지만, 필터는 업데이트되지 않았기 때문입니다.

```java
filterChainMap.put((String) urlMatcher.compile("/**"), filters);
```

*(resource 요청을 제외한 모든 트래픽이 Security fillter를 거침)*

수정 후

```java
filterChainMap.put((String) urlMatcher.compile("/~~~/**"), Lists.<Filter>newArrayList());
filterChainMap.put((String) urlMatcher.compile("/**"), filters);
```

`동적 요청` 처리하지 않도록 빈 필터를 적용해봅니다.

다시 테스트!

**New User**

![단일 사용자 테스트2](/images/2017/2017_02_15_COUCHBASE/newuser2.png)

**Set**

![단일 사용자 테스트2](/images/2017/2017_02_15_COUCHBASE/set2.png)

**Update**

![단일 사용자 테스트2](/images/2017/2017_02_15_COUCHBASE/update2.png)

**Get**

![단일 사용자 테스트2](/images/2017/2017_02_15_COUCHBASE/get2.png)

눈에 띄게 요청 빈도가 떨어졌습니다. 사용자 체류시간과 활동을 알아야 정확히 통계를 낼 수 있기 때문에, 정확한 수치를 낼 수는 없지만 많은 트래픽이 이 부분에서 감소할 수 있을 거라고 생각합니다.

회의를 거친 끝에 가장 많이 사용되는 사용자 세션과 전혀 연관 없는 것으로 확인된 일부 `동적 요청`을 처리하지 않도록 빈 필터를 적용하기로 했습니다.

##### 2. Touch Command를 활용

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

![단일 사용자 테스트3](/images/2017/2017_02_15_COUCHBASE/update3.png)

**Disk Wirte Queue**

![단일 사용자 테스트3](/images/2017/2017_02_15_COUCHBASE/diskqueue3.png)

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

![단일 사용자 테스트4](/images/2017/2017_02_15_COUCHBASE/update4.png)

**Disk Wirte Queue**

![단일 사용자 테스트4](/images/2017/2017_02_15_COUCHBASE/diskqueue4.png)

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

### 두번째 문제

**리벨런싱 도중 어플리케이션 다운**

`리벨런싱`이 많은 리소스를 사용하므로, 트래픽이 많은 상황에서 피해야 한다는 경고는 알고 있습니다. 그러나 `리벨런싱` 상황에 `Membase Server`가 죽은 것이 아닌 `어플리케이션`이 죽은 상황에 대해서는 정확한 파악이 필요해보였습니다.

결론부터 이야기하자면 원인은 `Main Thread`의 `StackOverFlow` 입니다.

```java
Exception in thread "Memcached IO over {MemcachedConnection to xxxxxxxxxxxxxxxxxxxxxxx}" java.lang.StackOverflowError
        at net.spy.memcached.ops.MultiOperationCallback.complete(MultiOperationCallback.java:33)
				...
				at net.spy.memcached.ops.MultiOperationCallback.complete(MultiOperationCallback.java:33)
```

Memcached는 vBucket을 기반으로 해당 데이터가 어디에 있는지 판단을 하게 됩니다. vBucket을 통해 데이터를 탐색할 때 뱉게되는 Error로 `WARN` Level로 로깅되는 `NOT_MY_BUCKET`이란 것이 있습니다. 해당 Error는 해당 vBucket에 데이터가 없을 경우 경고를 띄운 뒤 재귀 탐색을 통해 다른 vBucket으로 데이터를 탐색하는 로직을 가지고 있습니다.

`리벨런싱` 작업이 수행될 때 수많은 데이터가 vBucket에서 제외되어 데이터를 분배하는 복잡한 과정이 수행됩니다. 이 과정 중간에 특정 데이터를 요청했을 때 해당 데이터가 `리벨런싱` 과정 중 vBucket에서 제외되었다면, vBucket 안에 데이터가 자리 잡을 때까지 재귀탐색을 하게 되며, 리벨런싱 되야하는 데이터양이 많은 경우 이 작업에 긴 시간이 생기며, 그 긴 시간동안 MainThread에서는 엄청나게 빠른 속도로 재귀 탐색을 하다 결국 StatckOverFlow Error를 뱉게 되는 상황이였습니다.

해당 문제의 해결방법은 `Couchbase`에서 경고하듯, `트레픽`이 적은 시간대에 최대한 빠르게 `리벨런싱`을 수행하는 방법뿐이 없다고 판단됩니다.

---

### 세번째 문제

**지금까지는 Membase의 서버 부하를 줄여 서버를 조금 더 안정적으로 만들고자 하는 개선을 해보았습니다. 그러나 이번 이슈로 떠오른 이슈가 한가지 더 있습니다. <br><br>바로 Membase 서버가 죽었을 때 어플리케이션을 구동할 수 없는 문제입니다. Membase는 세션을 관리해주는 용도로 사용하기 때문, Membase가 죽었다고 어플리케이션을 올릴 수 없는 문제는 일어나서는 안되기 때문입니다.**

#### 첫번째 상황

**어플리케이션 실행 중 Membase 서버가 죽었을 때**

**서버에서는** `Auto FailOver`가 작동되어 장애 조치 노드에서 처리하는 복제 된 데이터가 클러스터의 다른 노드에서 활성화되게 됩니다.

*Auto FailOver 전*

![Failver Before](/images/2017/2017_02_15_COUCHBASE/a_failover_before.png)

*Auto FailOver 후*

![Failver After](/images/2017/2017_02_15_COUCHBASE/a_failover_after.png)

8번 서버에 장애가 발생하였고 자동 장애 조치가 발생하여 8번 서버가 자동으로 `failover` 되었으며, 88번 서버에 존재하던 3개의 아이템에 대한 복제본을 가지고 있던 28번 서버에서 데이터가 활성상태로 변경된 것을 확인할 수 있습니다.

각 서버로 흩어져 있는 복제본 데이터가 비장애 서버에서 활성화되며, 이 때 데이터가 각 서버에 골고루 활성화되는 것은 아닙니다. 데이터를 재분배하려면 Rebalance 작업을 해야되며, 이 작업은 수동으로 진행되어야 합니다.

![Failver Status](/images/2017/2017_02_15_COUCHBASE/a_failover_status.png)

연쇄 장애를 막기 위해 `Auto failover`는 한번만 발생하며, `Quota`를 Reset해주어야만 다시 자동 장애 조치를 하게 됩니다.

`Auto Failover`는 최소 30초마다 서버를 확인하게 되므로 최대 30초 간 해당 서버의 데이터를 가져오려는 요청에 대해서 TimeOut을 발생시키게 되며, `Auto Failover` 과정에서는 기존 장애 서버에 대한 요청에 대하여 `Cancel`을 반환하는 작업을 하게 됩니다. 복제본 데이터를 활성화하는 서버에서는 리소스를 다소 사용할 수 있습니다.

**어플리케이션에서는** 이미 `Bean`으로 등록된 `SpyMemchaced`가 모든 노드의 정보를 가지고 있기 때문에, 장애 서버 외 다른 서버로부터 vBucket 정보를 수신받아 정상적으로 동작됩니다.

`Auto FailOver`되기 전에는 vBucket에서 장애 서버가 제외되지 않았기 때문에 SpyMemchaced Auto Reconnect 전략에 따라, 지속적으로 해당 노드의 connect를 확인하며, 이 과정에서 장애 서버로부터 응답을 기다리기 때문에 `TimeOutException`이 발생할 수 있습니다.

`Auto FailOver` 후에는 vBucket 정보를 새로 수신받아 장애 서버에 대한 connect를 확인하지 않으며, 기존 요청에 대해 `Cancel`이 발생됩니다.

`Quota`를 Reset하기 전 또 다른 서버의 장애가 발생했을 경우 역시 `TimeOutException`을 반환하게 되고, 어플리케이션에서는 Reconnect를 시도하게 되며 자동 장애 조치가 되지 않으므로, 수동으로 해당 서버를 FailOver 시켜야 합니다. 수동 FailOver 역시 자동 장애 조치의 FailOver와 같은 방식으로 동작하게 됩니다.

#### 두번째 상황

**일부 Membase 서버가 죽었을 때 어플리케이션 로드**

일부 서버가 죽었을 때도 `어플리케이션 실행 중 Membase 서버가 죽었을 때`와 같은 과정이 반복되어 동작하게 됩니다.

#### 세번째 상황

**모든 Membase 서버가 죽었을 때 어플리케이션 로드**

모든 어플리케이션 서버가 죽었을 때 어플리케이션은 아래 Exception을 뱉으며, 로드에 실패하게 됩니다.

![Application Exception](/images/2017/2017_02_15_COUCHBASE/exception.png)

원인은 **Bean 생성 실패** 입니다.

Spring Application은 의존성 부여된 모든 Bean들이 로드되어야 합니다. 일부 빈의 실패만으로도 어플리케이션 로드가 실패게 됩니다.

SpyMemchaced의 MemcachedClient는 최초 어플리케이션 로드시 주입해준 Bucket 정보의 노드들이 하나 이상 connection을 성공적으로 맺지 못하면 null을 리턴하게 되며, null을 리턴하므로 Bean 생성을 실패하게 됩니다.

MemcachedClient의 Bean 생성 실패로 의존성을 갖는 나머지 빈들(MemcachedSession, MemcachedSecurityContextRepository)도 로드할 수 없게 됩니다.

![Memcached 의존성](/images/2017/2017_02_15_COUCHBASE/dependence.jpg)

#### 개선 - 어플리케이션-Membase 간 의존성 제거

첫번째, 두번째 상황은 어플리케이션의 동작 제어를 통해서는 해결이 될 수 없습니다. 지속적인 서버의 모니터링으로만 예방 및 해결이 가능할 것 입니다. 또한 두 상황은 에러가 발생하여도 어플리케이션은 이미 정상적으로 동작되기 때문에 어플리케이션과의 의존성 문제와는 거리가 먼 문제라고 판단됩니다.

그렇지만 세번째 상황은 어플리케이션의 문제이므로 어플리케이션의 수정으로 해결 가능합니다.

스프링의 `BeanFacotry`를 활용하여 직접 원하는 빈을 등록하면 간단하게 해결할 수 있으나 해당 `Bean`만을 위한 클래스를 만드는 것보다 확장할 수 있는 범용적인 구조를 만드는 것이 더 좋은 프로젝트가 될 것이라 판단하여 범용적인 모듈을 만들게 되었습니다.

##### 동적 빈 생성 모듈 : DynamicGenerator

![DynamicGenerator 설계](/images/2017/2017_02_15_COUCHBASE/dynamicbeanpattern.png)

Adapter Pattern을 적용하여 `DynamicGeneratorAdapter`를 만들었고, Adapter를 상속하는 3개의 `DynamicGenerator`를 만들었습니다.

**빈 생성 정의**

각 `DynamicGenerator` 구현체는 `Generic`을 통해 생성하여 등록해야 하는 `Bean` Class를 정의하였고, `generate` Method를 재정의하여 세부적인을 객체 생성을 할 수 있도록 만들었습니다.

**후 처리 정의**

빈 생성 후에 수행해야 할 작업는 `Generator`는 `AbstractExecutableDynamicBeanGeneratorAdapter`를 상속하여 `execute` Method를 정의할 수 있도록 하였습니다.

**의존성 주입**

![DynamicGenerator 설계](/images/2017/2017_02_15_COUCHBASE/dynamicbeanpattern.png)

구현체들을 스프링 `Component`로 등록하여, 각 구현체에게 기본적인 의존성 주입을 스프링에서 해주도록 했습니다.

**생성 실패시 복구 스케줄링 정의**

`DynamicGeneratorAdapter`가 상속하고 있는 `RecoverableAdapter`는 해당 객체가 로드에 실패했을 경우 복구가 필요한지에 대한 정의를 정의할 수 있도록 합니다. `Default`로는 복구가 필요하지 않도록 정의되어 있으며, `getDelaySeconds` Method를 재정의하여 몇 초를 주기로 복구를 시도할지 정의할 수 있습니다.

**동적 의존성 주입**

동적으로 생성하려는 `Bean` 간에도 의존 관계를 갖을 수 있는데, 기존 `@Autowired`와 같은 원리이지만 동적으로 의존성 주입을 표시할 수 있도록 `@DynamicAutowired`라는 어노테이션을 생성했습니다. 이 어노테이션을 기반으로 동적 `Bean`들 간의 관계를 파악하여 의존성을 주입받을 수 있습니다.

**즉시 생성 정의**

`DynamicGeneratorAdapter`는 `isOnlyDirectGenerate` 메서드를 정의하고 있으며, 기본 값은 `false` 입니다. 해당 메서드는 아래에서 설명할 동적 빈 생성 관리자인 `DynamicBeanFactory`가 생성될 때 자동으로 생성되도록 할 것인가를 정의하는 메서입니다. 반환 값을 `true`로 재정의할 경우, 자동으로 생성되지 않고 `DynamicBeanFactory를` 통해 직접 생성할 수만 있습니다.

##### 동적 빈 생성 관리자 : DynamicBeanFactory

`DynamicGenerator`에서 정의하고 있는 모든 내용을 기반으로 실제 Bean을 생성하고 등록, 복구하는 역할을 하는 객체는 `DynamicBeanFactory` 입니다.

![DynamicGenerator 설계](/images/2017/2017_02_15_COUCHBASE/dynamicbeanpattern3.png)

`DynamicBeanFactory`은 스프링 `Component`로 등록되어, 스프링으로부터 `beanFactory`와, `Generator Map`을 주입받아 사용도록 하였습니다.

**빈 생성**

`@PostConstruct`를 통해 초기화 작업에서 즉시 생성하도록 정의되어있는 `Generator`만 사용하여 동적 빈을 생성합니다.

빈을 생성할 때 `@DynamicAutowired`를 기반으로 재귀로 동적 빈들을 탐색하여, 동적 관계를 파악하고 빈을 생성하여 동적으로 의존성 주입을 하게 됩니다.

성공적으로 생성된 객체는 `BeanFactory에` `singleton`으로 등록됩니다.

**후 처리**

`DynamicBeanFactory`는 빈이 성공적으로 생성되어 `BeanFactory`에 등록되면, 해당 `Generator`가 `AbstractExecutableDynamicBeanGeneratorAdapter`를 상속하고 있을 때 있을 시 `execute` 메서드를 실행하게 됩니다.

**복구 스케줄링**

![DynamicGenerator 설계](/images/2017/2017_02_15_COUCHBASE/dynamicbeanpattern4.png)

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
public class MemcachedSecurityContextRepositoryDynamicGenerator extends AbstractExecutableDynamicBeanGeneratorAdapter<MemcachedSecurityContextRepository> {

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

아래는 테스트 시나리오와 결과 입니다.

![DynamicGenerator 테스트](/images/2017/2017_02_15_COUCHBASE/testcase.png)

---

### 네번째 문제

모든 사용자를 대상으로 세션을 관리할 필요가 있는가 하는 의문이 추가로 제기되었습니다.

#### 세션이란?

세션이란 클라이언트를 식별하는 방법으로, 무상태 프로토콜인 HTTP에서 브라우저는 세션을 구현하는 방법으로 Session 쿠키를 사용하고 있으며 각 어플리케이션에서는 세션 쿠키와 매칭되는 데이터로 Session 상태 및 데이터를 보관하게 됩니다.

즉, 클라이언트를 식별할 필요가 있는 서비스만 어플리케이션에서 세션을 보관하고 관리하면 된다는 결론이 나옵니다.

#### 모든 사용자 서비스에서 세션을 사용하는가?

zum.com의 사용자 서비스는 쿠키 기반의 서비스와, 세션 기반의 서비스 두 가지로 나뉩니다. 비로그인 사용자들을 대상으로 쿠키 기반의 서비스를 제공하며, 로그인 사용자들은 세션 기반으로 서비스를 제공합니다.

즉, 비로그인 사용자를 대상으로는 세션을 관리할 필요가 없다는 이야기가 됩니다.

#### 세션없이 로그인, 비로그인 사용자를 구분 가능한가?

zum.com은 이미 특별한 로직을 통하여 사용자의 로그인, 비로그인 여부를 확인 가능하도록 설계되었습니다.

#### 결론

비로그인 사용자의 세션 정보를 Membase로 관리할 필요가 없다는 결론이 나옵니다. 그래서 비로그인 사용자는 Membase를 통하지 않도록 어플리케이션을 개선해야 합니다.

#### 개선 - 어플리케이션 세션 관리 대상 변경

`Spring`으로 개발된 해당 어플리케이션은 `Spring Security`라는 편리한 도구를 통하여 사용자의 세션을 관리하고 있습니다.

![servlet filter](/images/2017/2017_02_15_COUCHBASE/sevlet.png)

`Spring Security`의 `SecurityFilter`는 서블릿 필터 중간쯔음 위치하고 있으며, 아래와 같이 내부에서 또다른 `filter Chain` 구조를 가지고 있습니다.

![security filter](/images/2017/2017_02_15_COUCHBASE/security.png)

**해야할 일** 은 `SecurityFilter`를 제외한 모든 필터는 정상 동작하여야 하며, `SecurityFilter`는 로그인, 비로그인 사용자를 구분하여 Skip하거나 진행 시켜야 합니다.

**방법1.** Security Filter 앞에 Filter를 설치

`SecurityFilter` 앞에 검증 Filter를 설치하고, 검증 Filter에서는 로그인을 판별하고 비로그인 사용자라면 Filter Chain을 강제로 `iterator.next()`하여 `SecurityFilter`를 Skip할 수 있습니다.

그러나 Security Filter의 정확한 실행 위치를 파악하여야 하고, 해당 위치에 정확히 필터를 배치하는 일이 까다롭습니다.

**방법2.** Security Filter 내부의 첫번째 Filter에 Filter를 설치

`SecurityFilter`의 내부 첫번째 Filter에 검증 Filter를 설치하고, 검증 Filter에서는 로그인을 판별하고 비로그인 사용자라면 `SecurityFilter`의 내부 Filter Chain이 아닌 원래 서블릿의 Filter Chain을 타도록 하여 `SecurityFilter`를 Skip할 수 있습니다.

이 방법이 좋은 이유는 SecurityFilter의 내부 필터를 직접 추가하기 때문에, 순서 지정하기가 매우 쉽습니다.

```
filters.add(new 검증필터());
filters.add(new Filter1());
filters.add(new Filter2());
filterChainMap.put(urlMatcher.compile("/**"), filters);
filterChainProxy.setFilterChainMap(filterChainMap);
```

결과적으로 개선된 서블릿 필터 동작 순서도는 아래와 같습니다.

![security filter2](/images/2017/2017_02_15_COUCHBASE/security2.png)

아래는 테스트 시나리오 결과입니다.

![filter test](/images/2017/2017_02_15_COUCHBASE/testcase2.png)

부하 상황에서 추가한 필터가 제대로 작동하는지 불안하여 부하 테스트까지!

![ngrinder test](/images/2017/2017_02_15_COUCHBASE/ngrinder.png)

---

결과
----

이런 과정을 거쳐, 지난 2월 14일 릴리즈!

결과는?

![great](/images/2017/2017_02_15_COUCHBASE/result1.jpg)

**효과가 굉장했다!**

![result](/images/2017/2017_02_15_COUCHBASE/result2.jpg)

배포 직후 급감하기 시작하더니,

![result](/images/2017/2017_02_15_COUCHBASE/result22.png)

감소 이후 안정적인 형태를 보이기 시작합니다!

![result](/images/2017/2017_02_15_COUCHBASE/result3.png)

oepration 감소로 이루려고 했던 disk write queue도 매우 크게 감소했습니다.

**결론**

operation : **97%** 감소<br> disk write queue : **99.9%** 감소<br>cpu 사용량 : **95%** 감소<br> 서비스 영향 : **없음**

**효과가 굉장했다!**

### 마무리

Membase의 1도 모르는 상태에서 Bug Tracking을 해보았습니다.

오래된 프로젝트인지라 버전이 너무 낮아 문서를 찾기도 힘들었고...

![Forum 답글](/images/2017/2017_02_15_COUCHBASE/notfound.png)

한국 사용자 모임이 없는 Couchbase에 영어로 질문을 해가며(결론은 버전을 올리란,,) 힘겹게 문제를 해결해나가 보았습니다.

![Forum 답글](/images/2017/2017_02_15_COUCHBASE/reply.png)

긴 버그 트래킹(약 2주) 끝에 Operation 이상을 확인했고, 끊임없이 의심하며 기존 시스템을 바꾸어 나갔고 결과적으로 서비스에 큰 안정화를 가져올 수 있었습니다.

서버의 메모리부터 각종 데몬들과 용어들까지, 코드 외에도 알아야하고 배워나가야하는게 정말 많다는 것을 느꼈습니다. 이번 Bug Tracking 경험이 나중에 있을 개발에 많은 도움이 될 것 같습니다.
