---
layout: post
title: SPRING CLOUD STREAM, MQ 도입 사례 - 2.구현
subtitle: SPRING CLOUD STREAM, MQ 도입 사례 - 2.구현
author: 김시은
category: zuminternet
nickname: sieunkim
tag: [spring,cloud,rabbitmq,microservices]
---



지난 번 글에 이어서 작성하는 실제 연동 과정 입니다.

전체 글의 목차입니다. 지난번에는 도입배경,관련연구,RabbitMQ 따라잡기 라는 주제로 설명하였습니다.

1. 도입 배경
2. 관련 연구
3. RabbitMQ 따라잡기
4. Spring Cloud Stream , RabbitMQ 연동하기
5. 추가 작업
6. 정리





# 4. RabbitMQ 연동하기

자바+스프링 웹서비스 환경에서 RabbitMQ 연동을 할수 있는 방법에 대해서 소개합니다.
참고로 Consumer(=Subcribe) 입장에서만 정리하였습니다. 

- RabbitMQ Java client library(com.rabbitmq.client)
- Spring Framework RabbitMQ
- Spring Cloud Stream RabbitMQ binder 1.0.3
- Spring Cloud Stream RabbitMQ binder 1.2.0


#### 4.1 RabbitMQ Java client library

com.rabbitmq.client 입니다.
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




#### 4.2 Spring Framework RabbitMQ

Spring Cloud Stream 이 나오기 전에, 대부분은 스프링 환경의 플랫폼에서는 해당 라이브러리(org.springframework.amqp)로 RabbitMQ 연동을 구축하였을 것입니다. 
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
[레퍼런스링크](http://docs.spring.io/spring-cloud-stream/docs/1.0.3.RELEASE/reference/htmlsingle/index.html){: target="_blank" }

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



#### 5.2 [장애대응-1]ShutDown listener 연동

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

CachingConnectionFactory 를 생성해주는 RabbitAutoConfiguration 클래스를 확인해보면 아래와 같이 @ConditionalOnMissingBean (ConnectionFactory.class) 로 되어있습니다.

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

