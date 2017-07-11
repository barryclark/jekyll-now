---
layout: post
title: SPRING CLOUD STREAM, MQ 도입 사례
subtitle: SPRING CLOUD STREAM, MQ 도입 사례
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



# 4. RabbitMQ 연동하기

자바+스프링 웹서비스 환경에서 RabbitMQ 연동을 할수 있는 방법에 대해서 소개합니다.
참고로 Consumer(=Subcribe) 입장에서만 정리하였습니다. 

- RabbitMQ Java client library(com.rabbitmq.client)
- Spring Framework RabbitMQ
- Spring Cloud Stream RabbitMQ binder 1.0.3
- Spring Cloud Stream RabbitMQ binder 1.2.0


#### 4.1 RabbitMQ Java client library(com.rabbitmq.client)


기본적인 연동 프로세스는 ConnectionFactory --> Connection --> Channel 생성의 순서입니다.

- ConnectionFactory : 
- Connection :
- Channel : 


![rabbitmq 기본 연동](/images/20170610/20170610_scs_rabbit01.png)

급하게(?) 그려본 시퀀스 다이어그램을 보면 ConnectionFactory 팩토리를 생성하고, 팩토리에서 newConnection() 으로 커넥션 객체를 생성합니다.
커넥션 객체에서는 createChannel() 를 실행하여 채널을 생성하는 프로세스입니다.
소스 예제는 아래와 같습니다.

```java
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.Channel;

ConnectionFactory factory = new ConnectionFactory();
factory.setUsername(userName);
factory.setPassword(password);
factory.setVirtualHost(virtualHost);
factory.setHost(hostName);
factory.setPort(portNumber);
Connection conn = factory.newConnection(); // 커넥션 생성

.
.
.

Channel channel = conn.createChannel(); // 채널 생성
```


`Channel` 객체에서는 익스체인지 선언, 큐 선언, 익스체인지-큐 바인딩 등 핵심 작업을 수행합니다.
각 역할에 따라서 exchangeDeclare(), queueDeclare(), queueBind() 를 사용합니다. 정리하면 

팩토리-->커넥션-->채널-->익스체인지 선언-->큐 선언 --> 큐 바인딩 

순서로 RabbitMQ 연동을 합니다.

자... 굳이 이부분을 왜 설명을 하냐면요, 스프링에서 제공해주는 기술도 마찬가지로 똑같은 프로세스로 실행하기 때문입니다.
기본 흐름은 이해 할 필요는 있습니다.


참고로 연결을 실패했거나 강제로 채널 또는 커넥션이 종료가 된 경우를 대비하여 아래와 같이 셧다운 이벤트 리스너를 추가할 수 있습니다.

```java
import com.rabbitmq.client.ShutdownSignalException;
import com.rabbitmq.client.ShutdownListener;

connection.addShutdownListener(new ShutdownListener() {
    public void shutdownCompleted(ShutdownSignalException cause)
    {
        ...
    }
});
```

자세한 내용은 RabbitMQ 공식 가이드에서 확인 가능합니다.  
[https://www.rabbitmq.com/api-guide.html](https://www.rabbitmq.com/api-guide.html){: target="_blank" }




#### 4.2 Spring Framework RabbitMQ(org.springframework.amqp)

Spring Cloud Stream 이 나오기 전에, 대부분은 스프링 환경의 플랫폼에서는 해당 라이브러리로 RabbitMQ 연동을 구축하였을 것입니다. 
실제로 사내 서비스에서도 해당 방법으로 연동하였습니다.



일단 `ORG.SPRINGFRAMEWORK.AMQP` 는 기본적으로 4.1에서 소개한 RabbitMQ Java client library(com.rabbitmq.client)를 사용합니다.

![Spring MQ - 사용뷰](/images/20170610/20170610_spring_mq_useview.png)

스프링 레퍼런스에서 제공하는 샘플 소스는 아래와 같습니다.
팩토리-->커넥션-->채널-->익스체인지 선언-->큐 선언 --> 큐 바인딩 의 연동 프로세스는 같습니다.

```java
package hello;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.amqp.rabbit.listener.adapter.MessageListenerAdapter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Application {

    final static String queueName = "spring-boot";

    @Bean
    Queue queue() {
        return new Queue(queueName, false);
    }

    @Bean
    TopicExchange exchange() {
        return new TopicExchange("spring-boot-exchange");
    }

    @Bean
    Binding binding(Queue queue, TopicExchange exchange) {
        return BindingBuilder.bind(queue).to(exchange).with(queueName);
    }

    @Bean
    SimpleMessageListenerContainer container(ConnectionFactory connectionFactory,
            MessageListenerAdapter listenerAdapter) {
        SimpleMessageListenerContainer container = new SimpleMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);
        container.setQueueNames(queueName);
        container.setMessageListener(listenerAdapter);
        return container;
    }

    @Bean
    MessageListenerAdapter listenerAdapter(Receiver receiver) {
        return new MessageListenerAdapter(receiver, "receiveMessage");
    }

    public static void main(String[] args) throws InterruptedException {
        SpringApplication.run(Application.class, args);
    }

}
```










상세한 가이드는 https://spring.io/guides/gs/messaging-rabbitmq/ 에서 확인 가능합니다. 



#### 4.3 Spring Cloud Stream Binder Rabbit 1.0.3 RELEASE

이제 드디어!! `Spring Cloud Stream` 를 검토해보는 시간입니다. 
참고로 Spring Cloud Stream Binder Rabbit 1.0.3 RELEASE 를 적용하기 위해서는 스프링부트 버전이 최소 1.3.7 (디펜던시)적용이 필요합니다. 


일단 모듈뷰-사용뷰 는 이렇습니다.
![Spring Cloud Stream RabbitMQ - 사용뷰](/images/20170610/20170610_spring_cloud_stream_rabbitmq_useview.png)





대략적인 시퀀스 다이어그램은 아래와 같습니다.
![Spring Cloud Stream 1.0.3 RELEASE](/images/20170610/20170610_scs_release_103_01.png)













![Spring Cloud Stream 1.0.3 RELEASE](/images/20170610/20170610_scs_release_103_02.png)


익스체인지 선언, 큐 선언, 익스체인지-큐 바인딩 하는 부분은 이렇게 구현이 되어있네요.
핵심 로직은 doBindConsumer() 에서 구현되어 있습니다.

```java
org.springframework.cloud.stream.binder.rabbit.RabbitMessageChannelBinder


public Binding<MessageChannel> doBindConsumer(
.
.
.
//익스체인지 선언
TopicExchange exchange = new TopicExchange(exchangeName);
.
.
.
```
읭??? 익스체인지 선언을 TopicExchange 으로 합니다. 무조건 익스체인지 타입을 Topic 으로만 만들겠다는 그런 소스입니다만?? 뭐지?


```java
org.springframework.cloud.stream.binder.rabbit.RabbitMessageChannelBinder


public Binding<MessageChannel> doBindConsumer(
.
.
.
//큐 선언
declareQueue(queueName, queue);

.
.
.

//실제 큐를 생성하는 로직
public void declareQueue(String beanName, Queue queue) {
	try {
		this.rabbitAdmin.declareQueue(queue);
	}
	catch (AmqpConnectException e) {
		if (logger.isDebugEnabled()) {
			logger.debug("Declaration of queue: " + queue.getName() + " deferred - connection not available");
		}
	}
	addToAutoDeclareContext(beanName, queue);
}
```


```java
org.springframework.cloud.stream.binder.rabbit.RabbitMessageChannelBinder

public Binding<MessageChannel> doBindConsumer(
.
.
.
//익스체인지-큐 바인딩 호출
if (partitioned) {
	String bindingKey = String.format("%s-%d", name, properties.getInstanceIndex());
	declareBinding(queue.getName(), BindingBuilder.bind(queue).to(exchange).with(bindingKey));
}
else {
	declareBinding(queue.getName(), BindingBuilder.bind(queue).to(exchange).with("#"));
}

.
.
.

//실제로 익스체인지-큐 바인딩하는 부분
public void declareBinding(String rootName, org.springframework.amqp.core.Binding binding) {
	try {
		this.rabbitAdmin.declareBinding(binding);
	}
	catch (AmqpConnectException e) {
		if (logger.isDebugEnabled()) {
			logger.debug("Declaration of binding: " + rootName + ".binding deferred - connection not available");
		}
	}
	addToAutoDeclareContext(rootName + ".binding", binding);
}
```

또한 소스를 자세히 보면 바인딩키는 오직 name-instanceIndex 의 형태로 구현되어있습니다. 여기서 name은 익스체인지 name 입니다. 
뭐지?? Topic 타입인데 바인딩키가 exchange-index 의 형태입니다. 예를 들어서 익스체인지 이름이 news 이고 index 가 1 이면 news-1 이런 형태입니다.
제가 위에 설명했던 *.news.# 이런 형태로 *, # 이 적용된 형태로 바인딩키를 설정할 수 없습니다.
아무튼 Topic 타입인데 *,# 를 사용하지 않는다면 이건 Topic 타입을 Direct 타입 처럼 쓰고 싶을때 하는 그 방법입니다.
또한 partitioned 가 false 일 경우에는 bindingKey 는 # 으로 설정됩니다. 
Topic 타입에서 바인딩키를 #으로 설정 된 경우에는 위에서 설명한 듯이 Fanout 타입 처럼 동작합니다.


다시 정리하면 Spring Cloud Stream `1.0.3` RELEASE 버전은 오직 Topic 타입만 제공합니다!
프로퍼티 설정인 partitioned 의 true/false 에 따라서 Fanout 처럼 또는 Direct 처럼 사용할 수만 있고 Topic 타입으로는 쓸수 없을 것 같습니다. 
바인딩키 설정 또한 매우 제한적입니다. 

여기까지는 라이브러리 백단 소스를 분석한 것이고, 실제로 MQ 연동 적용은 아주 간단합니다. 

```java
//스트림 연동하기
@EnableBinding(Sink.class)
public class listener {

  ...

  @StreamListener(Sink.INPUT)
  public void processVote(Vote vote) {
      //service 
  }
}
```

1.0.3 버전에 대한 상세한 레퍼런스는 아래 링크에서 참고 가능합니다.  
http://docs.spring.io/spring-cloud-stream/docs/1.0.3.RELEASE/reference/htmlsingle/index.html


혹시라도 제가 소스를 잘못 봤거나 했다면 꼭 말씀부탁드리겠습니다ㅠㅠ 제가 잘 몰라서 멍청하게 헤매고 있을 가능성도 있습니다.

>  1.0.3.RELEASE 버전은 라우팅 규칙을 적용하기에는 너무나도 제한적인 라우팅키,익스체인지타입 으로 구성되어 있습니다.


자 그래서 저는 1.0.3 버전은 실서비스에 적용하기에는 애매하다 라는 결론을 내렸습니다.
익스체인지 타입도 지정못하고, 라우팅키도 설정도 제한적이라면 차라리 Spring Cloud Stream 안쓰고 
4.2 Spring Framework RabbitMQ(org.springframework.amqp)로 구현하는게 낫겠다는 생각도 했지만 일단 상위 버전을 검토해보기로 했습니다.

참고로 밑에 작성하겠지만 `1.2.0.RELEASE` 버전은 서비스에 적용하기에 괜찮다는 결론을 내렸습니다.


#### 4.4 Spring Cloud Stream Binder Rabbit 1.2.0 RELEASE 소스 분석

나름 최근 버전인 `Release 1.2.0` 을 살펴볼려고 합니다. 스프링 부트 1.5.2 버전이 최소 적용이 디펜던시로 적용되어야 합니다.
참고로, 처음부터 1.2.0 버전을 확인하지 않은 이유는 스프링 부트 버전 때문이었습니다. 
프로젝트의 스프링부트 버전의 업그레이드로 인해서 해당 서비스에서 수정 및 테스트 해야 하는 내용이 많아졌습니다.


![Spring Cloud Stream 1.0.3 RELEASE](/images/20170610/20170610_scs_release_103_01.png)
기본적인 connection, channel 등 초기 작업은 1.0.3.RELEASE 와 유사합니다. 


![Spring Cloud Stream 1.2.0 RELEASE](/images/20170610/20170610_scs_release_1_2_0.png)

Exchange, 큐 생성 및 바인딩 하는 로직은 1.0.3.RELEASE 와 많이 변경이 되었고 
주요 로직은 RabbitExchangeQueueProvisioner -> provisionConsumerDestination() 에서 확인 가능합니다. 


```java
org.springframework.cloud.stream.binder.AbstractMessageChannelBinder

public final Binding<MessageChannel> doBindConsumer(
...
    final ConsumerDestination destination = this.provisioningProvider.provisionConsumerDestination(name, group, properties);
...
```

```java
org.springframework.cloud.stream.binder.rabbit.provisioning.RabbitExchangeQueueProvisioner


public ConsumerDestination provisionConsumerDestination(String name, String group, ExtendedConsumerProperties<RabbitConsumerProperties> properties) {
	boolean anonymous = !StringUtils.hasText(group);
	String baseQueueName = anonymous ? groupedName(name, ANONYMOUS_GROUP_NAME_GENERATOR.generateName())
			: groupedName(name, group);
	if (this.logger.isInfoEnabled()) {
		this.logger.info("declaring queue for inbound: " + baseQueueName + ", bound to: " + name);
	}
	String prefix = properties.getExtension().getPrefix();
	final String exchangeName = applyPrefix(prefix, name);
	Exchange exchange = buildExchange(properties.getExtension(), exchangeName);
	if (properties.getExtension().isDeclareExchange()) {
		declareExchange(exchangeName, exchange);
	}
	String queueName = applyPrefix(prefix, baseQueueName);
	boolean partitioned = !anonymous && properties.isPartitioned();
	boolean durable = !anonymous && properties.getExtension().isDurableSubscription();
	Queue queue;
	if (anonymous) {
		queue = new Queue(queueName, false, true, true, queueArgs(queueName, properties.getExtension(), false));
	}
	else {
		if (partitioned) {
			String partitionSuffix = "-" + properties.getInstanceIndex();
			queueName += partitionSuffix;
		}
		if (durable) {
			queue = new Queue(queueName, true, false, false,
					queueArgs(queueName, properties.getExtension(), false));
		}
		else {
			queue = new Queue(queueName, false, false, true,
					queueArgs(queueName, properties.getExtension(), false));
		}
	}
	declareQueue(queueName, queue);
	Binding binding = null;
	if (properties.getExtension().isBindQueue()) {
		binding = declareConsumerBindings(name, properties, exchange, partitioned, queue);
	}
	if (durable) {
		autoBindDLQ(applyPrefix(properties.getExtension().getPrefix(), baseQueueName), queueName,
				properties.getExtension());
	}
	return new RabbitConsumerDestination(queue, binding);
}
```

소스를 보시면 익스체인지 타입 과 라우팅 키를 Properties 에서 설정할 수 있도록 구현되어 있습니다.
그래서 1.2.0.RELEASE 에서는 (1.0.3.RELEASE비교하여) 아래와 같은 차이점이 있습니다.

- 익스체인지 타입을 지정할 수 있다.
- 바인딩키를 지정할 수 있다.
- 등등 내가 모르는 많은 기능이 적용이 되었다;

결국 스프링부트 버전을 올리는 RISK 를 감안하고 1.2.0.RELEASE 를 적용하는 것이 좋겠다고 판단하였습니다. 
부끄럽지만 현재 스프링부트 버전이... 1.1.3... 

#### 4.5 Spring Cloud Stream Binder Rabbit 1.2.0 RELEASE 적용 해보기

이제 드디어 Spring Cloud Stream 프로젝트로 RabbitMQ 를 연동해봤습니다.


`Gradle` 에 디펜던시 설정을 추가합니다. 스프링부트 버전도 업그레이드 했기 때문에 boot 버전도 변경하였습니다.

```java
build.gradle

dependencies {
	
	.
	.
	.
	compile('org.springframework.cloud:spring-cloud-starter-stream-rabbit:1.2.0.RELEASE')

```


`Properties` 설정을 추가합니다. 참고로 설정 관련해서는 반드시 레퍼런스 참고 부탁드립니다. 해당 설정은 저희 프로젝트 환경에 맞게 변경된 내용입니다.
```java
application-dev.properties

dependencies {
	
	spring.cloud.stream.bindings.SINK-INPUT-TEST.destination=news
	spring.cloud.stream.bindings.SINK-INPUT-TEST.group=서버의 유니크한 값 설정
	spring.cloud.stream.rabbit.bindings.SINK-TEST.consumer.bindingRoutingKey=newsbox.update.test
	spring.cloud.stream.rabbit.bindings.SINK-TEST.consumer.exchangeType=direct
	spring.cloud.stream.rabbit.bindings.SINK-TEST.consumer.durableSubscription=false
	spring.cloud.stream.binders.rabbit.type=rabbit
	
	//참고로 rabbitMQ 관련 설정 정보를 따로 properties 에 분리했습니다.
	spring.rabbitmq.host=${rabbitmq.host}
	spring.rabbitmq.virtual-host=testhost
	spring.rabbitmq.username=${rabbitmq.username}
	spring.rabbitmq.password=${rabbitmq.password}

```

```java
listener.java
	
@EnableBinding(*****Listener.Sink.class)
public class *****Listener {

    @Autowired
    private News*****Dao news*****Dao;

    @StreamListener(Sink.inboundTest)
    public void subscribe(PojoTest pojotest) {

        if(pojotest.is***()){
            
            //뉴스 업데이트 비즈니스 로직 
           
        }
    }

    public interface Sink {
        String inboundTest = "SINK-TEST";

        @Input(inboundTest)
        SubscribableChannel *****Listener();
    }

}

```

너무 간단하지만 이걸로 끝입니다.


#### 4.6 정리

Spring Cloud Stream 를 적용하여 RabbitMQ 를 연동하는 과정을 정리해봤습니다.
부족한 실력으로 혼자서 삽질을 많이 했습니다. 혹시라도 틀린 내용 있거나 다른 의견 있으시면 꼭 말씀 부탁드리겠습니다.

> 처음부터 1.2.0.RELEASE 버전을 검토 했으면 좋았을 것을.............ㅠㅠ 어쨋든 현재 서비스에 영향을 최소화하고 싶어서 부트 버전 업그레이드를 주저했었습니다.


# 5. 추가 작업

기본적인 연동작업 외에 추가로 작업한 내용에 대해서 공유합니다.




#### 5.1 Spring Boot 버전 업그레이드


Spring Cloud Stream 1.2.0.RELEASE 를 적용하기 위해서는 스프링 부트의 버전을 1.5.2 까지 업그레이드 해야 합니다.

현재 스프링부트의 버전은 1.1.X 로 비교적 낮은 버전이 적용되어 있었습니다. 
그동안 운영에 큰 지장은 없었습니다만, 이번 기회에 부트 버전을 1.5.2 로 올렸습니다. 올리면서 진행한 작업은 아래와 같습니다. 


작성 중



#### 5.2 [장애대응-1]ShutDownlistener 연동

RabbitMQ 의 장애 또는 강제 커넥션 종료로 인한 셧다운 발생 시 서비스 대응 작업이 필요했습니다. 
CachingConnectionFactory 소스를 보면 아래 소스처럼 셧다운이 발생하면 로그만 남기도록 되어있습니다.

```java
org.springframework.amqp.rabbit.connection.CachingConnectionFactory

.
.

@Override
public void shutdownCompleted(ShutdownSignalException cause) {
	this.closeExceptionLogger.log(logger, "Channel shutdown", cause);
}
```

CachingConnectionFactory 를 생성해주는 RabbitAutoConfiguration 클래스를 확인해보면 아래와 같이 @ConditionalOnMissingBean(ConnectionFactory.class) 로 되어있습니다.

```java
org.springframework.boot.autoconfigure.amqp.RabbitAutoConfiguration


@Configuration
	@ConditionalOnMissingBean(ConnectionFactory.class)
	protected static class RabbitConnectionFactoryCreator {

		@Bean
		public CachingConnectionFactory rabbitConnectionFactory(RabbitProperties config)
				throws Exception {
		.
		.
		.
		//실제로 이 부분을 변경할 것입니다...
		CachingConnectionFactory connectionFactory = new CachingConnectionFactory(
					factory.getObject());
```

그래서 저는 CachingConnectionFactory Bean 생성하는 소스를 그대로 복사해서 
신규 클래스로 작성하였고 CachingConnectionFactory 생성하는 부분에서 shutdownCompleted 만 오버라이드 했습니다. 

```java

@Bean
public CachingConnectionFactory rabbitConnectionFactory(RabbitProperties config)
        throws Exception {
        .
        .
        //라이브러스 소스와 똑같이 구현
        .
        .
        CachingConnectionFactory connectionFactory = new CachingConnectionFactory(factory.getObject()){


            //셧다웃 이벤트 발생 시 비즈니스 로직 적용
            @Override
            public void shutdownCompleted(ShutdownSignalException cause) {

                //비즈니스 로직 적용
                ***Dao.~~~; 
                
                super.shutdownCompleted(cause);
            }
        };
        .
        .
        //라이브러리 소스와 똑같이
		.
```

혹시 이런 방법에 대해서 의문점이나 잘못된 사항이 있다면 꼭 피드백 부탁드립니다ㅠㅠ


#### 5.3 [장애대응-2]커넥션 실패 등 장애상황에 대한 테스트

장애 상황에 대해서 여러가지로 테스트를 해봤습니다.

`스프링 부트를 처음 올리는 경우`

- MQ 서버 네트웍이 끊긴 경우 ->부트 올라옴, 단 커넥션타임아웃이 60초로 설정되어 있음
- MQ 서버는 정상이지만 RabbitMQ 중지된 경우 -> 부트 올라옴
- 설정된 vhost 정보가 잘못된 경우 -> 부트 올라옴
- 설정된 rabbitmq.password 가 잘못된 경우 -> 부트 안올라옴


`스프링 부트가 올라와 있는 서비스 중 상황에서`

- 갑자기 MQ 서버 네트워이 끊긴 경우 -> 커넥션 끊기지만 서비스 지장 없음, MQ 네트워크 연결되면 자동 커넥션 맺음
- RabbitMQ 관리툴에서 커넥션을 강제로 중지한 경우 -> 재연결 됨 
- (그럴리가 없겠지만)관리자가 갑자기 exchange 를 제거한 경우 -> ???

기타 상황에 대해서 테스트를 해본 결과 서비스에 크게 지장될 만한 사항은 없는 것 같다는 생각이었습니다. 
누군가가 MQ의 비번을 갑자기 바꿀 경우도 없을 테고...

단 네트워크가 끊겼을 경우 갑자기 부트를 올려야 하는 상황이라면 사실 60초의 커넥션은 너무 길게 느껴질수는 있습니다.
MQ 서버로의 장애와 상관없이 부트 애플리케이션은 빠르게 정상적으로 올라와야 합니다. 
(참고로 MQ 가 연동이 되지 않으면 기존 로직(뉴스기사가 API 연동)이 작동합니다. 셧다운 됐을때도 마찬가지로 대응 로직이 적용됩니다.)

어쨋든 CachingConnectionFactory 선언한 부분에서 아래와 같이 초기 연결시 타임아웃을 3초로 변경하였습니다.

```java

@Bean
public CachingConnectionFactory rabbitConnectionFactory(RabbitProperties config)
        throws Exception {
        .
        .
        //라이브러스 소스와 똑같이 구현
        .
        .
	//팩토리 생성 이후에 로직에 추가
	//초기 연결 시 타이아웃 60초 -> 3초
	connectionFactory.setConnectionTimeout(3000);

```



#### 5.3 HA or L4 구성 및 클러스터링 검토

HA구성을 검토하였으나 서버 담당자와 논의 끝에 L4 Active/Standby 이중화 구성을 하였습니다. (로드 밸런싱 아님!!)
그리고 고민을 많이 했지만 해당 Message 정보는 유실되어도 상관없는 정보이기 때문에 클러스터링 없이 구성하였습니다.
일반적으로는 클러스터링 구성해서 진행하겠지만, 추후에 검토하기로 했습니다.

MQ 서버 1 번에 L4 를 통해서 연결되어 있는 상황에서 갑작스럽게 MQ서버1 이 죽으면 자동으로 L4 에서 Standby 서버인 Mq 2번 서버로 재연결 합니다.
서버1의 큐는 자동으로 삭제 되고 MQ2 에 신규 큐가 생성이 됩니다.


참고로 Spring Cloud Stream 으로 연동되는 큐는 AutoDelete 설정을 추가하였습니다.



# 6. 정리

시간이 없어서 주저리주저리 작성해봤습니다. 나중에 시간이 된다면 깔끔하게 글 정리해보겠습니다.


암튼 서비스 적용 전에 피드백을 받고 싶어서 부끄럽지만 용기를 내서 공유를 해봅니다. 
좋은 의견 있으시면 꼭 말씀 부탁드리겠습니다.


허접하지만 긴 글 읽어주셔서, 감사합니다.

