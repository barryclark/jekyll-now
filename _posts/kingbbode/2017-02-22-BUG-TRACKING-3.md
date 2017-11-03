---
layout: post
title: 버그 트래킹 일지(3) - 임시방편보단 장기적으로
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
**버그 트래킹 일지(3) - 임시방편보단 장기적으로** <br>
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

---

임시방편보단 장기적으로
-----------------------

오래된 프로젝트를 볼 때 항상 저에게 스트레스를 주는 것은 당시의 하나의 상황을 해결하기 위한 임시방편적인 코드들이 많다는 것 입니다. 결국 레거시는 레거시를 낳고, 레거시가 또 레거시를 낳아 프로젝트 자체가 레거시가 될 것 같은..!

다급한 버그트래킹 과정에서 임시방편이 아닌 범용적인 것을 만들기란 쉽지 않을 것 입니다. 이것은 시간적 여유가 확보 되어있을 때 이야기입니다. 다만 중요한 것은 임시방편으로 해놓았다면 반드시 다음엔 안정적으로 고치는 것 입니다.

`"잘 돌아가는데 그냥 냅둬도?"`

라는 생각이면 반드시 프로젝트의 레거시를 해결하기 위해 더 많은 리소스를 낭비하게 될 것 입니다. 밀린 방학숙제 처럼..

---

장애개선 - 빈 로드 실패를 해결하기 위한 동적 빈 생성 모듈 개발
--------------------------------------------------------------

**지금까지는 Membase의 서버 부하를 줄여 서버를 조금 더 안정적으로 만들고자 하는 개선을 해보았습니다. 그러나 이번 이슈로 떠오른 이슈가 한가지 더 있습니다. <br><br>바로 Membase 서버가 죽었을 때 어플리케이션을 구동할 수 없는 문제입니다. Membase는 세션을 관리해주는 용도로 사용하기 때문, Membase가 죽었다고 어플리케이션을 올릴 수 없는 문제는 일어나서는 안되기 때문입니다.**

### 첫번째 상황

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

### 두번째 상황

**일부 Membase 서버가 죽었을 때 어플리케이션 로드**

일부 서버가 죽었을 때도 `어플리케이션 실행 중 Membase 서버가 죽었을 때`와 같은 과정이 반복되어 동작하게 됩니다.

### 세번째 상황

**모든 Membase 서버가 죽었을 때 어플리케이션 로드**

모든 어플리케이션 서버가 죽었을 때 어플리케이션은 아래 Exception을 뱉으며, 로드에 실패하게 됩니다.

![Application Exception](/images/2017/2017_02_15_COUCHBASE/exception.png)

원인은 **Bean 생성 실패** 입니다.

Spring Application은 의존성 부여된 모든 Bean들이 로드되어야 합니다. 일부 빈의 실패만으로도 어플리케이션 로드가 실패게 됩니다.

SpyMemchaced의 MemcachedClient는 최초 어플리케이션 로드시 주입해준 Bucket 정보의 노드들이 하나 이상 connection을 성공적으로 맺지 못하면 null을 리턴하게 되며, null을 리턴하므로 Bean 생성을 실패하게 됩니다.

MemcachedClient의 Bean 생성 실패로 의존성을 갖는 나머지 빈들(MemcachedSession, MemcachedSecurityContextRepository)도 로드할 수 없게 됩니다.

![Memcached 의존성](/images/2017/2017_02_15_COUCHBASE/dependence.jpg)

### 개선 - 어플리케이션-Membase 간 의존성 제거

첫번째, 두번째 상황은 어플리케이션의 동작 제어를 통해서는 해결이 될 수 없습니다. 지속적인 서버의 모니터링으로만 예방 및 해결이 가능할 것 입니다. 또한 두 상황은 에러가 발생하여도 어플리케이션은 이미 정상적으로 동작되기 때문에 어플리케이션과의 의존성 문제와는 거리가 먼 문제라고 판단됩니다.

그렇지만 세번째 상황은 어플리케이션의 문제이므로 어플리케이션의 수정으로 해결 가능합니다.

스프링의 `BeanFacotry`를 활용하여 직접 원하는 빈을 등록하면 간단하게 해결할 수 있으나 임시방편으로 만들어놓은 코드는 결국 레거시가 될 것이란 생각으로, 해당 `Bean`만을 위한 클래스를 만드는 것보다 확장할 수 있는 범용적인 구조를 만드는 것이 더 좋은 프로젝트가 될 것이라 판단하여 범용적인 모듈을 만들게 되었습니다.

#### 동적 빈 생성 모듈 : DynamicGenerator

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

#### 동적 빈 생성 관리자 : DynamicBeanFactory

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

어플리케이션 로드시 빈 로드 실패를 해결하기 위하여 동적 빈 생성 모듈이란 것을 만들었습니다. 제 지식과 경험이 짧아 모듈을 만드는 것보다 더 쉽게 해결할 수 있는 방법을 알지 못하였을 수도 있고, 모듈을 만듬에 더 쉽고 좋은 기술을 사용하지 못하였을 수도 있습니다.

그러나 중요한 것은 임시방편적인 것을 안정적인 코드로 해결해가려는 것이라고 생각했습니다! 다행히 시간적 여유가 있어 모듈을 만들어보았습니다.

다음에 계속..[버그 트래킹 일지(4) - 의심하고 또 의심하자](https://zumdev.github.io/BUG-TRACKING-4)<br>

