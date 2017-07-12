---
layout: post
title: SPRING CLOUD STREAM, MQ 도입 사례 - 1.기본개념
subtitle: SPRING CLOUD STREAM, MQ 도입 사례 -1.기본개념
author: 김시은
category: zuminternet
nickname: sieunkim
tag: [spring,cloud,rabbitmq,microservices]
---

SPRING CLOUD STREAM, MQ(Message Queuing) 도입 사례를 공유합니다.
좋은 의견 있으시면 꼭 말씀 부탁드리겠습니다. 

글의 목차입니다.

1. 도입 배경
2. 관련 연구
3. RabbitMQ 따라잡기
4. Spring Cloud Stream , RabbitMQ 연동하기
5. 추가 작업
6. 정리


다소 불친절한 설명이 포함되어 있습니다. 상세 내용에 대해서 모두 작성하기에는 무리가 있었습니다. 
관련 기술들은 레퍼런스를 통해서 확인부탁드립니다.

사내 서비스이기 때문에 공개하기 어려운 내용들은 비공개 처리하였습니다. 
아키텍처는 외부에 공유해도 되겠다는 판단으로 공유합니다. 혹시라도 공유되면 안되는 내용 있으면 반드시 말씀 부탁드립니다.


그리고 현재 서비스 적용 전입니다. 피드백 주시면 배포 전에 개선을 할 수 있을 것 같습니다. 부디~ 피드백!ㅠㅠ 도와주세요

# 1.도입 배경

줌닷컴 메인(zum.com)에 노출되고 있는 뉴스기사 배포 시스템을 개선하는 작업으로  Spring Cloud Stream 를 적용하여 메시지 큐잉 서비스를 도입하였습니다. 

![TO-BE](/images/20170610/20170610_newsbox.png)




#### 1.1 개선 전 줌닷컴 메인(zum.com) 페이지 뉴스 기사

줌닷컴 메인 서버에서 30초 주기로 뉴스 API 호출하여 뉴스 데이터를 폴링합니다. 뉴스편집 이후 최대 30초 정도 뉴스 기사가 지연될 수 있습니다. 
또한 주기적으로 API를 호출하기 때문에 뉴스 편집이 되지 않은 상황에서도 불필요한 API 호출을 합니다.

![AS-IS](/images/20170610/20170610_arche_asis.png)

정치 이슈 및 스포츠 소식 등 실시간 뉴스에서 1초가 중요한 뉴스서비스에서 해당 시스템은 반드시 개선이 필요한 아키텍처입니다.
그래서 현실적으로 가능한 방법을 3가지로 검토해봤습니다. 
일단 먼저 말씀을 드리면 현재는 뉴스개발팀과 팀이 분리되어 있기 때문에 저희 마음대로 뉴스시스템을 개선할 수는 없는 상황입니다.


#### 1.2 첫번째 방법 - 뉴스 데이터를 각 서버에 PUSH 하는 방법

JSON 또는 HTML의 STATIC 뉴스 데이터를 줌닷컴 메인(zum.com) 서버에 PUSH 해서 순차적으로 배포하는 방식입니다.
일반적으로 많이 사용하는 방식이라서 제일 먼저 검토하였습니다.
고전적인 웹서비스 방식이지만 지금도 많이 사용하고 가장 깔끔한 방식이라고 생각합니다.
나쁘지 않은 방법이지만 아래와 같은 검토 사항이 있습니다.

- 줌닷컴 메인 서버 대수가 많기 때문에 순차적인 배포가 되는 과정에서 최대 1~3초 정도 콘텐츠 동기화가 안되는 이슈는 발생
- API 호출방식에서 STATIC 파일 로딩 방식으로의 변경에 대한 추가 개발
- 뉴스 개발 파트에서 Static 한 파일을 Push 해줘야 하는 추가 개발

Static 한 파일로 콘텐츠를 구성하는 것이 서비스 운영에 있어서는 더 안전하다는 생각을 갖고 있습니다. 
단, 유효성 체크를 완벽하게 해서 오류 없는 Static 파일을 생성해야 합니다.
이렇게 하면 서버통신의 비용도 줄일 수 있어서 심플한 웹서비스를 구축할 수 있다고 생각합니다. 
하지만, 현재 시스템을 많이 뜯어(?) 고쳐야 하기 때문에 일단 검토 대상에서 제외했습니다.


#### 1.3 두번째 방법 - MQ 실시간 배포 시스템 구축

뉴스 기사가 편집되는 순간 MQ 브로커에 뉴스 기사 콘텐츠의 JSON을 전달합니다.
해당 MQ 를 구독하고 있는 줌닷컴 메인은 뉴스 기사 콘텐츠를 실시간으로 구독&리스닝 하는 순간 서버에서 바로 적용합니다.

![TO-BE](/images/20170610/20170610_arche_tobe_01.png)

해당 방법이 최선이라고 생각했습니다만 몇가지 고려해야할 사항이 있습니다.

- 뉴스 개발파트에서 뉴스 기사 콘텐츠의 JSON을 MQ 브로커에 Pub 하는 추가 개발
- 뉴스 기사 포맷이 바뀌었을 때에 대해서 고려해야할 사항이 많음

해당 방법도 시스템을 많이 뜯어(?) 고쳐야 하기 때문에 좀 더 심플한 방법을 생각해봤습니다.


#### 1.4 세번째 방법 - MQ 실시간 배포 시스템 구축(뉴스 업데이트 정보만 전달)

뉴스 기사가 편집되는 순간에 MQ 을 통해서 뉴스 기사가 업데이트가 됐다는 신호만 전달합니다. 
해당 MQ 를 구독하고 있는 줌닷컴 메인은 업데이트가 됐다는 신호를 받는 순간 뉴스 API 를 호출합니다. 
뉴스 기사 콘텐츠 변경이 없을 시에는(=MQ 를 통해서 메시지가 전달이 되지 않는 경우에는) API 호출을 하지 않습니다.
기존 API 시스템을 유지합니다. 비록 두번 째 방법과 비교하여 API 를 호출하는 1회의 Request/Response 비용이 더 필요합니다.
전체적인 상황을 고려했을 때 해당 방법이 가장 심플하고 빠르게 구현 가능하였고, 이 방법으로 진행하기로 본부 협의를 통해서 결정하였습니다.

![TO-BE](/images/20170610/20170610_arche_tobe.png)


> 아키텍처 결정은 본부간의 협의를 통해서!

# 2. 관련 연구

이번 작업을 진행하기 전에 관련 기술을 간단하게 정리해봤습니다. 
모든 내용을 상세하게 전부 작성하기엔 시간적,물리적 여유가 없기 때문에 간략하게만 정리했습니다.

- MQ(Message Queuing)
- RabbitMQ vs 카프카
- Spring Cloud, Spring Cloud Stream
- Spring Boot
- 마이크로서비스 아키텍처
- 정리


#### 2.1 Message Queuing

느슨하게 결합된 시스템 사이에서 상호 정보 교환이 가능한 메시지 전달 방식을 `메시지 큐잉` 이라고 합니다.


`일반적인 상호작용의 요청-응답 방식`은 아래와 같습니다.  
![request-response](/images/20170610/20170610_mq_flow_01.png)



`메시지 큐를 사용하여 메시지 전송 시스템 프로세스`는 아래와 같습니다.  
![request-response](/images/20170610/20170610_mq_flow_02.png)


`느슨한 결합 시스템` 구성이 가능합니다.  
![request-response](/images/20170610/20170610_mq_flow_03.png)


느슨하게 결합된 시스템 구성의 장점은 아래와 같습니다. (RabbitMQ 따라잡기-에이콘출판사-32page)

- 발행자 또는 소비자 간 문제 발생 시 서로 영향을 주지 않는다.
- 각 시스템의 성능은 다른 측면에 영향을 미치지 않는다.
- 발행자와 소비자의 인스턴스 수는 작업량을 수용할 수 있을 만큼 독립적으로 증가하고 감소한다.
- 발행자는 소비자의, 소비자는 발행자의 위치가 어디인지 혹은 어떤 기술을 사용하는지 알지 못한다.


#### 2.2 RabbitMQ vs 카프카

카프카 vs RabbitMQ 비교 글은 아래 링크를 참고 부탁드립니다.

https://content.pivotal.io/blog/understanding-when-to-use-rabbitmq-or-apache-kafka  
https://www.quora.com/What-are-the-differences-between-Apache-Kafka-and-RabbitMQ  
http://www.cloudhack.in/2016/02/29/apache-kafka-vs-rabbitmq/  
https://content.pivotal.io/blog/understanding-when-to-use-rabbitmq-or-apache-kafka  
https://yurisubach.com/2016/05/19/kafka-or-rabbitmq/  
https://www.quora.com/What-are-the-differences-between-Apache-Kafka-and-RabbitMQ  

![카프카](/images/20170610/20170610_kafka.png)
![RabbitMQ](/images/20170610/20170610_rabbitmq.png)

자세한 내용은 생략합니다.  
어쨋든 이번 작업을 진행하기 전에 카프카 vs RabbitMQ , 뭘 도입할지 정말 많은 고민을 하였습니다.
최종적으로 RabbitMQ 를 도입하기로 결정하였고 사유는 2.6 정리 에서 기록하였습니다.

#### 2.3 스프링 마이크로서비스 

자세한 설명은 생략합니다. 스프링 마이크로서비스를 검토하기 전에 아래와 같은 주제로 따고 고민이 필요합니다.

- Cloud
- MicroServices
- Cloud 와 MicroServices 는 무슨 연관이 있는지?
- Spring 에서 MicroServices 를 구축하기 위해 제공해 주는 기술이 무엇인지?

> Cloud와 마이크로서비스는 왜 연관이 있는지에 대해서 먼저 생각해야 합니다. 그 이후에 마이크서비스를 구축하기 위한 스프링 기술에 대해서 검토하는 것이 좋겠습니다.

일단 2.5 장에서 간략하게 Spring Cloud 에 대해서 간단한 소개만 하였습니다. 

#### 2.4 Spring Boot

생략

#### 2.5 Spring Cloud, Spring Cloud Stream

스프링 레퍼런스 웹사이트를 참고하였습니다.  
http://projects.spring.io/spring-cloud/ 


`Spring Cloud`는 분산 시스템(e.g. configuration management, service discovery, circuit breakers, intelligent routing, micro-proxy, control bus, one-time tokens, global locks, leadership election, distributed sessions, cluster state)의 
공통 패턴을 빠르게 구축할 수 있는 스프링 프레임워크 기술입니다.
`Spring Cloud` 에 포함된 메인 프로젝트는 아래와 같습니다.

- spring-cloud-aws
- spring-cloud-bus
- spring-cloud-cli
- spring-cloud-commons
- spring-cloud-contract
- spring-cloud-config
- spring-cloud-netflix
- spring-cloud-security
- spring-cloud-cloudfoundry
- spring-cloud-consul
- spring-cloud-sleuth
- spring-cloud-stream
- spring-cloud-zookeeper
- spring-cloud-task


`Spring Cloud Stream`은 메시지 기반 마이크로 서비스를 구현하기 위한 프레임 워크입니다.
`Spring Cloud Stream`은 Spring Boot를 기반으로 DevOps 친화적인 마이크로 서비스 애플리케이션을 만들고 Spring Integration은 메시지 브로커와의 연결을 제공합니다. 
Spring Cloud Stream은 메시지 브로커의 독창적인 구성을 제공하여 여러 미들웨어 공급 업체에 pub/sub, 소비자 그룹 및 파티션 개념을 도입합니다. 
이 독창적인 구성은 스트림 처리 응용 프로그램을 만드는 기초를 제공합니다.
응용 프로그램에 `@EnableBinding`을 추가하면 메시지 브로커에 즉시 연결되며 메서드에 `@StreamListener`를 추가하면 스트림 처리를 위한 이벤트가 수신됩니다.



Pub&Sub 개념에서 Pub 의 역할을 하는 부분이 Source 입니다. Sub 의 역할이 Sink 입니다.  
![spring cloud stream](/images/20170610/20170610_sourcesink.png)


> 어쨋든 Spring Cloud 는 마이크로서비스를 구축할 수 있는 스프링 프레임워크 기술입니다.

#### 2.6 정리

간략하게 아래 기술을 정리를 해봤습니다.

- MQ(Message Queuing)
- RabbitMQ vs 카프카
- Spring Cloud, Spring Cloud Stream
- Spring Boot
- 마이크로서비스 아키텍처

아키텍처 및 기술에 대한 2주 간의 고민 결과 Spring Cloud Stream 을 사용하기로 했고, MQ 서버는 `RabbitMQ`를 도입하기로 결정하였습니다.
RabbitMQ 를 사용한 이유는 이렇습니다.  

- 신뢰성 있는 메시지 브로커에 더 큰 장점 
- 카프카를 도입 할 만큼 고성능의 분산 메시징 시스템이 필요한 건 아니였음
- 라우팅 적용을 통해서 추후 확장성있는 메시지 전송이 가능(추후에 다양한 방식으로 라우팅이 적용된 메시지 전송 예정)
- 팀내 다른 서비스에서 RabbitMQ 를 이미 도입하여 운영 중(팀내에서 운영하는 MQ는 하나로 통일하는게 좋겠다는 의견)

전체적인 상황을 고려하였지만 팀내에서 이미 사용하고 있다는 점이 가장 크게 작용하였습니다. 아무래도 운영 리소스도 생각을 해야했습니다.

> 추후 관리를 잘 할 수 있는 시스템 도입이 중요합니다.


# 3. RabbitMQ 따라잡기

RabbitMQ 에 대해서 간략하게 정리를 해봤습니다.



#### 3.1 기본 개념 이해

기본 개념을 참고 서적을 보고 정리했습니다.(RabbitMQ 따라잡기-에이콘출판사-34page)

- AMQP(Advanced Message Queuing Protocol) : 시스템 간 메시지를 교환하기 위해 공개 표준으로 정의한 프로토콜
- Broker : 발행자가 만든 메시지를 저장
- Virtual host : Broker 내의 가상 영역
- Connection : 발생자와 소비자, Broker 사이의 물리적인 연결
- Channel : 발행자와 소비자, Broker 사이의 논리적인 연결, 하나의 Connection 내에 다수의 Channel 설정 가능
- Exchange : 발행한 모든 메시지가 처음 도달하는 지점으로 메시지가 목적지에 도달할 수 있도록 라우팅 규칙 적용, 라우팅 규칙에는 direct, topic, fanout 
- Queue : 메시지가 소비되기 전 대기하고 있는 최종 지점으로 Exchange 라우팅 규칙에 의해 단일 메시지가 복사되거나 다수의 큐에 도달할 수 있다
- Binding : Exchange 와 Queue 간의 가상 연결

![request-response](/images/20170610/20170610_mq_flow_04.png)

라우팅과 바인딩을 특별히 빨간색으로 표시 해봤습니다. 카프카와 다른점이 많지만 가장 큰 차이점입니다. RabbitMQ 는 익스체인지에서 라우팅 규칙에 의해서 큐로 메시지가 전달됩니다.

> 기본 개념은 매우 중요합니다.

#### 3.2 RabbitMQ 특징

생략



#### 3.3 exchange type

해당 내용은 RabbitMQ 공식 홈페이지에서 참고하였습니다.


`Exchange`는 발행자로부터 수신한 메시지를 큐로 보내는 라우터 역할을 합니다. 
이때 라운딩키를 바인딩키에 비교하여 큐에 전송 합니다.
익스체인지는 Fanout, Direct, Topic 타입이 있습니다.



메시지큐는 생성이 되면서 익스체인지와 바인딩이 됩니다. 이때(바인딩이 될때) `바인딩 키`는 큐와 익스체인지 사이에 바인딩 되어있는 키를 말합니다. 
`라우팅 키`는 메시지를 익스체인지에 보낼 때 어떤 큐에 보낼지에 대한 라우팅 규칙을 의미합니다.

`Fanout exchange` - 바인딩이 되어있는 모든 큐에 메시지를 전송합니다.(라우팅키, 바운딩키 상관없이 무조건 전달)     
![Direct Exchange](/images/20170610/20170610_exchange_fanout_01.png)

`Direct exchange` - 바인딩키와 라운딩키가 완벽하게 일치하면 메시지를 전송합니다.
아래 예시는 각 큐는 orange, black, green 으로 바인딩이 되어있습니다. 
X 익스체인지에 메시지를 보내면서 black이라는 라우팅 키를 포함하여 전송하면 black으로 바인딩이 되어있는 큐에만 메시지가 전송됩니다.   
![Direct Exchange](/images/20170610/20170610_exchange_direct_01.png)

멀티 바인딩도 가능합니다. 익스체인지에 black 라는 라우팅키로 메시지를 전송하면 black 로 바인딩 되어있는 모든 큐에 메시지가 전송됩니다.   
![Direct Exchange](/images/20170610/20170610_exchange_direct_02.png)

`Topic exchange`  - 바인딩키와 라운딩키의 조합으로 라우팅하여 메시지를 전송합니다.음... 설명이 어렵지만, 
일단 *는 와일드카드(??맞는 표현인지 모르겠음) 개념으로 아무 값이나 들어와도 메시지가 전송이 됩니다만 정확히 1개의 단어만 가능합니다. 
hash(#)는 해당 방향으로 0개나 여러개의 단어가 와도 메시지가 전송이 됩니다...

자 그래서 첫번째 큐는 *.orange.** 로 큐와 익스체인지가 바인딩이 되어있습니다.
X익스체인지에 메시지 전송이 될 때 food.orange.sign 의 라우팅키로 익스체인지에 메시지를 전송을 하면
바인딩이 되어있는 큐 중에서... 라우팅키 와 바인딩 키를 비교(?) 하여 메시지를 전송을 하는데 이 경우에는 첫번째 큐로 메시지가 전송됩니다!
만약 X 익스체인지에 lazy.test.rabbit 이라는 라우팅 키로 전송되면 lazy.# 로 바인딩이 되어있는 Q2의 에 메시지가 전송됩니다. 
왜냐면 hash(#) 은 여러개의 단어가 와도 매칭이 되어 메시지가 전송이 됩니다.

![Direct Exchange](/images/20170610/20170610_exchange_topic_01.png)

아...........불친절한 설명 부끄럽습니다. 레퍼런스 자료를 참고하시면 도움이 되실것 같습니다.


자!! 그래서 어쨋든 RabbitMQ 가이드를 보면 아래와 같이 Topic 타입에 대한 설명이 되어있습니다. 

```
Topic exchange is powerful and can behave like other exchanges.  
When a queue is bound with "#" (hash) binding key - it will receive all the messages, regardless of the routing key - like in fanout exchange.  
When special characters "*" (star) and "#" (hash) aren't used in bindings, the topic exchange will behave just like a direct one.  
```



영어를 잘못해서, 내맘대로 설명을 추가해서 정리를 해보면

```
토픽 타입의 익스체인지에 바인딩 된 큐가... 바인딩키 설정이 딸랑 # 으로만 되어있다면,
익스체인지에 메시지를 보낼 때 라우팅키에 상관없이 바인딩이 되어있는 모든 큐에 메시지가 전송이 됩니다. 
즉 `Fanout Exchange` 와 같이 사용됩니다.  

만약, 토픽 타입의 익스체인지에 바인딩된 큐와 익스체인지 사이의 바인딩키 설정이 # 또는 * 가 전혀 사용하지 않는다면!!! 
이 경우에는 라우팅키와 바인딩키가 정확히 일치해야 메시지가 큐로 전송이 됩니다.
즉, `Direct Exchange` 와 같이 사용됩니다.
```

주저리주저리 했지만 결론은

> RabbitMQ의 Topic 타입은 은 Direct 타입 처럼, Fanout 타입 처럼 사용이 가능합니다.(바인딩키를 어떻게 설정하는지에 따라서)



#### 3.4 RabbitMQ 구성하기

자세한 내용은 생략합니다. 설치 가이드는 https://www.rabbitmq.com/download.html 참고하시면 됩니다.

> RabbitMQ는 반드시 Erlang 이 기본으로 설치가 되어야 하며, RabbitMQ 에 맞는 최소 Erlang 버전을 맞춰서 셋팅해야 합니다. 패키지로 제공하는 것도 있으니 참고하시면 됩니다.


#### 3.5 정리

RabbitMQ 에 대해서 간략하게 검토해봤습니다.



#### 정리

여기까지 기본적인 개념 정리 및 검토 진행하였습니다. 
다음 글에서는 실제로 연동 과정을 정리해보겠습니다. 
