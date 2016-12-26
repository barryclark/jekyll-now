CouchBase(Membase) 문제점 극복!
===============================

Membase를 사용하면서 발생한 문제점을 분석하고, 개선을 진행하면서 문서를 작성

환경
----

-	Membase Cluster
	-	DB Server 01 (Membase)
	-	DB Server 02 (Membase)
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

### 문제 상황

**1. 회원 로그인 문제 발생**

-	문제 발생 서버 임시 제외

**2. 특정 사용자의 로그아웃 오류**

-	장애 서버 재투입

**3. 리밸런싱 도중 어플리케이션 장애 발생**

-	재배포 통해 어플리케이션 장애 복구

### 문제 분석

**1. 회원 로그인 문제 발생**

-	특정 서버가 `Out Of Memory` 문제를 일으키며, 로그인 문제 발생

```
`net.spy.memcached.OperationTimeoutException: Timeout waiting for value`
```

**2. 특정 사용자의 로그아웃 오류**

**3. 리밸런싱 도중 어플리케이션 장애 발생**

---

개선
----

### 메모리 부족 현상 해소

### 무의미한 트래픽 제거

### 서버 구성

### 모든 Membase Server의 장애 상황에서 어플리케이션을 구동할 수 없는 문제

#### 문제 현상

#### 문제 원인

**Bean 생성 실패**

Spring Application은 의존성 부여된 모든 Bean들이 로드되어야 합니다. 일부 빈의 실패만으로도 어플리케이션 로드가 실패게 됩니다.

SpyMemchaced의 MemcachedClient는 최초 어플리케이션 로드시 주입해준 Bucket 정보의 노드들이 하나 이상 connection을 성공적으로 맺지 못하면 null을 리턴하게 되며, null을 리턴하므로 Bean 생성을 실패하게 됩니다.

MemcachedClient의 Bean 생성 실패로 의존성을 갖는 나머지 빈들(MemcachedSession, MemcachedSecurityContextRepository)도 로드할 수 없게 됩니다.

![Memcached 의존성](/images/2016/2016_12_23_COUCHBASE/dependence.jpg)

#### 해결 방안

**1. 동적 빈 생성**

**2. 복구 스케줄링**

### 어플리케이션이 구동 후 모든 Membase Server 장애 발생시

#### 해결 방안

**감지 및 복구 스케줄링**

**Server Restart & Pending**
