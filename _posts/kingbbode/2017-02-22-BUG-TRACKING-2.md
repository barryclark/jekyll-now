---
layout: post
title: 버그 트래킹 일지(2) - 로그를 보자!
subtitle: 웹 서비스(Spring Framework)의 세션을 Membase(현재의 Couchbase)로 관리하면서 발생한 이슈입니다. 이슈를 해결해 나가는 과정을 기록으로 남깁니다.
category: zuminternet
author: 권용근
nickname: kingbbode
tag: [membase, bugtracking, resource, io, nosql]
---

주니어개발자의 버그 트래킹 일지입니다!

주 내용은 웹 서비스의 세션을 Membase(현재의 Couchbase)로 관리하면서 발생한 이슈입니다. 이슈를 해결해 나가는 과정을 기록으로 남깁니다.

[버그 트래킹 일지(1) - 시작은 사전지식 확보부터](https://zumdev.github.io/BUG-TRACKING-1)<br>
**버그 트래킹 일지(2) - 로그를 보자!** <br>
[버그 트래킹 일지(3) - 임시방편보단 장기적으로](https://zumdev.github.io/BUG-TRACKING-3)<br>
[버그 트래킹 일지(4) - 의심하고 또 의심하자](https://zumdev.github.io/BUG-TRACKING-4)<br>
[버그 트래킹 일지(5) - 대망의 적용 배포 그리고 결론](https://zumdev.github.io/BUG-TRACKING-5)

### 버그트래킹 환경

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

	-	Spring Boot Web Application(version 1.2)
		-	SpyMemCached(version 2.7.3)

로그를 보자
-----------

장애 발생 상황 이후 유일한 단서는 로그! 평소에 이슈를 처리하기 위한 로그를 잘 작성해놓았다면 조금 더 수월하게 이슈를 해결해 나갈 수 있을 것 입니다.

대부분의 이슈는 로그에 답이 있을 것이라고 생각합니다. 그 로그가 무엇을 의미하는 것인지 모를 뿐..

---

장애 원인 분석 - 어플리케이션 Out Of Memory
-------------------------------------------

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

Membase에서 제공하는 통계로는 일주일 단위로 제공되었고, 다행히 장애 당시 로그를 백업해두었습니다. <br>로그의 용량은 무려 300MB!.. 사람이 보긴 힘들겠다고 생각하여 파싱하여 CSV로 정리하는 간단한 콘솔 프로그램을 만들었씁니다.(필요하면 귀찮아하지말고 만드는 개발자!!)

![콘솔](/images/2017/2017_02_15_COUCHBASE/console.png)

2016년 10월 28일(장애 발생 당일)과 2017년 01월 04일(안정화)의 Membase 로그를 추출하였고, 다수의 이상 항목이 발견되어 뽑아보았습니다.

### 로그 분석

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

**아무리보아도 어플리케이션의 동작 로직에 문제가 있다는 의심이 되었습니다.**

### 어플리케이션-Membase 간 요청 개선을 개선해보자!

#### 1. 불필요한 요청 제거

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

로그를 분석하여 첫번째 문제점인 불필요한 요청이 많다는 것을 알 수 있었고, 그것을 개선해나가는 과정을 작성했습니다. 아마 로그가 없었다면, 훨씬 더 오랜기간이 걸렸을 것 입니다. 로그는 정말 중요한 것 같습니다! (APM 도입이 시급한데 ㅜㅜ)

다음에 계속..[버그 트래킹 일지(3) - 임시방편보단 장기적으로](https://zumdev.github.io/BUG-TRACKING-3)<br>
