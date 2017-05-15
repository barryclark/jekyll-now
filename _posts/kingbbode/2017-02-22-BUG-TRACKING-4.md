---
layout: post
title: 버그 트래킹 일지(4) - 의심하고 또 의심하자
subtitle: 웹 서비스(Spring Framework)의 세션을 Membase(현재의 Couchbase)로 관리하면서 발생한 이슈입니다. 이슈를 해결해 나가는 과정을 기록으로 남깁니다.
category: zuminternet
author: 권용근
nickname: kingbbode
tag: [membase, bugtracking, resource, io, nosql]
---

주니어개발자의 버그 트래킹 일지입니다!

주 내용은 웹 서비스의 세션을 Membase(현재의 Couchbase)로 관리하면서 발생한 이슈입니다. 이슈를 해결해 나가는 과정을 기록으로 남깁니다.

[버그 트래킹 일지(1) - 시작은 사전지식 확보부터](https://zumdev.github.io/BUG-TRACKING-1)<br>
[버그 트래킹 일지(2) - 로그를 보자!](https://zumdev.github.io/BUG-TRACKING-2)<br>
[버그 트래킹 일지(3) - 임시방편보단 장기적으로](https://zumdev.github.io/BUG-TRACKING-3)<br>
**버그 트래킹 일지(4) - 의심하고 또 의심하자** <br>
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

---

의심하고 또 의심하자
--------------------

버그를 트래킹할 때 많은 사람들이 놓칠 수도 있겠다고 생각한 것이 바로 근본적인 의심입니다.

`현재 로직을 고침으로 문제가 해결될 수 있으나, 애초에 그 로직을 호출하지 않는 것이 맞지 않을까`

현재의 시스템이 안정적일지라도, 이 시스템을 이렇게 사용하는게 맞는 것인지 근본적으로 한번 더 의심해볼 필요는 충분히 있을 것 같습니다.

아래에서는 그런 발상으로 해결한 과정을 작성했습니다.

장애 개선 - 세션 관리 대상 변경을 위한 Spring Security Skip Filter 개발
-----------------------------------------------------------------------

모든 사용자를 대상으로 세션을 관리할 필요가 있는가 하는 의문이 생겼습니다.

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

### 개선 - 어플리케이션 세션 관리 대상 변경

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

첫 시작은 의심으로부터 시작되었습니다. 생각해보면 지금까지 해결해왔던 모든 버그 트래킹 과정에 의심과 가설로부터 시작점을 찾을 수 있었습니다. 버그 트래킹에 있어서 의심하고 가설을 세워보는 것은 정말 중요한 일인 것 같습니다!

다음에는 결론을..[버그 트래킹 일지(5) - 대망의 적용 배포 그리고 결론](https://zumdev.github.io/BUG-TRACKING-5)