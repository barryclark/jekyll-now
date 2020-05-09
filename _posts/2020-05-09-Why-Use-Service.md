---
layout: post
title: 【SPRING】Spring MVC에서 Service의 역할
subject: blog
category: spring
author: junseo.park
subtitle: Service가 가지는 역할은 무엇일까
---

### 의문점 제기
흔히 얘기되는, MVC 패턴에서 비즈니스 로직 구성은 Controller, Service, Dao로 역할을 분산시켜 개발한다는 이야기는 일반적이다.

하지만, 많은 사람들은 Service 인터페이스 클래스를 생성하고, 이에 1대 1로 매칭되는 Impl을 새로 구현하여 사용할 뿐이다.

이럴거면 Interface를 만들어내는 의미가 없다. 애초에 Interface는 하나의 규칙을 바탕으로 여러 개의 클래스를 생성하고자 하는 목적으로 만들어진 객체지향 방식이기 떄문.

### MVC 패턴에서 Service Model의 역할
MVC 패턴의 핵심은 책임 분산에 있다.

View는 자신이 요청할 Controller만 알면 되며
Controller는 넘어온 매개변수를 이용해 Service 객체를 호출하기만 하면 된다.
DAO는 ibatis / Mybatis 등 데이터베이스 Connection을 통해 데이터를 주고 받는 역할이다.

Service는 POJO객체로 구성된다. Controller처럼 Request / Response를 받지도 않고, DAO처럼 DB와 데이터를 주고받지도 않는다.

언뜻 생각하면 Service가 왜 필요한지 의문이 들기 시작한다. Controller에 Service 로직을 섞어서 바로 DAO를 붙이면 되지 않을까? 하고...

결론적으로, Service가 필요없다고 생각했던 점은 굉장히 어리숙하고 내 자신이 초짜라는 것을 증명하는 셈이었다.

DAO는 단일 데이터 접근 로직이다. 말 그대로 SQL 하나 보내고 결과를 받는 것이 전부인 로직. 하나의 비즈니스 로직이 단순이 SQL 하나 보내서 끝나는가? 전혀 아니다.

여러 번의 DB 접근이 필요하고, 어떤 `서비스`는 병렬식으로 동시접근하여 데이터를 가져와야 하는 상황도 발생한다. 그렇기 떄문에 Service라는 개념이 나온 것이다.
하나의 서비스를 위해 여러개의 DAO를 묶은 트랜잭션이 생성되고, Service는 곧 트랜잭션의 단위가 된다.

또 다른 점으로, Controller 내부에서 필요한 여러 Service를 구분하는 필요성을 가진다. 비슷한 요청이더라도 내부 로직이 달라야한다면 Controller는 매우 복잡해질 가능성이 있다. 이러한 점을 분리하여 Controller는 단순이 요청을 받아 해당 요청에 맞는 Service에 데이터를 주입하는 역할. Service는 자신이 수행해야 할 서비스를 진행할 뿐이었다.

비록, 실무에서 Service 특징을 제대로 못살리는 경우가 많아 Service Interface 하나에 Impl 하나 생성해서 끝마치는 경우가 많지만, 그렇다고 해서 Service를 과소평가해서는 안된다는 점.

`재사용`이라는 Spring의 큰 장점은 Service가 중요한 작용점이었다는 거


새로 알았다.


Rmx