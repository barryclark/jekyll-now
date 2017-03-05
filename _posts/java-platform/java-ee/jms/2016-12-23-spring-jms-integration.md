---
layout: post
title: Spring&JMS Integration
permalink: /blog/java-platform/java-ee/jms/jms-spring-integration
summary: Merhaba arkadaslar, bu yazımızda Spring ile JMS kullanımına bakacağız.
image: /images/java-platform/java-ee/jms/spring-jms-and-activemq.jpg
---

Merhaba arkadaslar, bu yazımızda Spring ile JMS kullanımına bakacağız.

### JMSTemplate
Spring ekosisteminde ki birçok entegrasyondan biri de JMS entegrasyonudur. Daha önceden de ifade ettiğim gibi Spring'in işleri kolaylaştırdığı teknolojileri kullanmadan önce mutlaka işin mutfağına girmelisiniz.
Örneğin; Spring DATA kullanacak iseniz öncesinde ORM vendor'unu iyice kavramanız gerekir. Onun öncesinde ise JDBC yapısını kavramanız gerekmektedir. Aksi taktirde arka tarafta yapılan/yapılacak olan işleri tam olarak anlayamazsınız. Yada Spring MVC ile çalışmadan önce mutlaka Servlet benzeri yapıları biliyor olmanız gerekmektedir.
Kısacası Spring arka tarafta sizin yerinize birçok işi hallediyor ama hangi işleri nasıl yapılıyor konusunda fikrinizin olması gerekmektedir.

Bugün kısaca Spring&JMS entegrasonunu ActvieMQ kullanarak yapmaya çalışacağız. Hemen bir proje oluşturalım ve pom.xml'i ayarlayalım;

**pom.xml**;

{% highlight xml linenos %}

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>

	<groupId>com.caysever</groupId>
	<artifactId>springjms</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<packaging>jar</packaging>

	<name>springjms</name>
	<url>http://maven.apache.org</url>

	<properties>
		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
		<java.version>1.7</java.version>
		<maven.compiler.plugin.version>2.5.1</maven.compiler.plugin.version>
		<spring.version>4.3.3.RELEASE</spring.version>
		<activemq.all.version>5.14.1</activemq.all.version>
		<junit.version>4.12</junit.version>
	</properties>


	<dependencies>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-context</artifactId>
			<version>${spring.version}</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-jms</artifactId>
			<version>${spring.version}</version>
		</dependency>
		<dependency>
			<groupId>org.apache.activemq</groupId>
			<artifactId>activemq-all</artifactId>
			<version>${activemq.all.version}</version>
		</dependency>
		<dependency>
			<groupId>junit</groupId>
			<artifactId>junit</artifactId>
			<version>${junit.version}</version>
			<scope>test</scope>
		</dependency>
	</dependencies>
	<build>
		<plugins>
			<plugin>
				<groupId>org.apache.maven.plugins</groupId>
				<artifactId>maven-compiler-plugin</artifactId>
				<version>${maven.compiler.plugin.version}</version>
				<configuration>
					<source>${java.version}</source>
					<target>${java.version}</target>
				</configuration>
			</plugin>
		</plugins>
	</build>

</project>
{% endhighlight %}

ActiveMQ'yu default ayarlar ile çalıştıralım.
![activemq start](/images/java-platform/java-ee/jms/activemq_start.png)

Spring bean definition'lara bakalım;
**appContext.xml**;

{% highlight xml linenos %}

<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

	<bean id="propertyConfigurer" class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer">
		<property name="locations">
			<list>
				<value>conf/appProperties.properties</value>
			</list>
		</property>
		<property name="placeholderPrefix" value="${" />
	</bean>

	<bean id="connectionFactory" class="${jms.connection.factory.name}">
		<property name="brokerURL" value="${jms.connection.broker.url}" />
	</bean>

	<bean id="jmsMessageTemplate" class="org.springframework.jms.core.JmsTemplate">
		<property name="connectionFactory" ref="connectionFactory" />
		<property name="explicitQosEnabled" value="true" />
		<property name="deliveryPersistent" value="false" />
		<property name="receiveTimeout" value="1000" />
		<property name="timeToLive" value="1000" />
	</bean>

	<bean id="destinationOutputQueue" class="${jms.destination.factory.name}">
		<constructor-arg value="${jms.output.queue.name}" />
	</bean>
	<bean id="destinationReplyQueue" class="${jms.destination.factory.name}">
		<constructor-arg value="${jms.reply.queue.name}" />
	</bean>

	<bean id="jmsSender" class="com.caysever.jms.MessageSender">
		<property name="jmsTemplate" ref="jmsMessageTemplate" />
		<property name="destination" ref="destinationOutputQueue" />
	</bean>
	<bean id="jmsReceiver" class="com.caysever.jms.MessageReceiver">
		<property name="jmsTemplate" ref="jmsMessageTemplate" />
		<property name="destination" ref="destinationReplyQueue" />
	</bean>

</beans>

{% endhighlight %}

{% highlight properties linenos %} 
jms.connection.factory.name=org.apache.activemq.ActiveMQConnectionFactory
jms.connection.broker.url=tcp://localhost:61616
jms.destination.factory.name=org.apache.activemq.command.ActiveMQQueue
jms.output.queue.name=jms/caysever.shop.1.1.Shopping
jms.reply.queue.name=jms/caysever.shop.1.1.ShoppingR
{% endhighlight %}

**jmsMessageTemplate**, Spring tarafından yönetilen ve elinde ConnectionFactory barındıran objedir. JMS üzerinde kullanılabilecek birkaç properties'e de bean definition'da yer verdik.

İki adet queue tanımı yaptık;
**destinationOutputQueue**, mesaj göndereceğimiz queue adresi,
**destinationReplyQueue** ise mesaj beklediğimiz queu adresi olacaktır.

İki adet class tanımlayalım ve JMSTemplate ile mesaj gönderip alsınlar.
**jmsSender** mesaj gönderecek olan bean,
**jmsReceiver** mesaj alacak olan bean tanımıdır.

Properties dosyamız içerisinde pure JMS çalışırken kullandığımız yaklaşımı kullanıyoruz. ConnectionFactory name , broker url ve queue bilglerini buradan alıyoruz.

**jmsSender**;

{% highlight java linenos %}
package com.caysever.jms;

import javax.jms.Destination;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.Session;

import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessageCreator;

public class MessageSender {

	JmsTemplate jmsTemplate;
	Destination destination;

	public void setJmsTemplate(JmsTemplate jmsTemplate) {
		this.jmsTemplate = jmsTemplate;
	}

	public void setDestination(Destination destination) {
		this.destination = destination;
	}

	public void sendMessage(final String message) {
		try {
			MessageCreator creator = new MessageCreator() {
				@Override
				public Message createMessage(Session session) throws JMSException {
					return session.createTextMessage(message);
				}
			};

			System.out.println("Sender message : " + message);
			jmsTemplate.send(destination, creator);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}

{% endhighlight %}

Bean injection methodları yanında sendMessage methodumuz ile JMSTemplate üzerinden outputQueue'ya mesaj gönderiyoruz.

> MessageCreator'ü JMS'deki MessageProducer gibi düşünebilirsiniz.


**jmsReceiver**;

{% highlight java linenos %}
package com.caysever.jms;

import javax.jms.Destination;
import javax.jms.Message;
import javax.jms.TextMessage;

import org.springframework.jms.core.JmsTemplate;

public class MessageReceiver {

	JmsTemplate jmsTemplate;
	Destination destination;

	public void setJmsTemplate(JmsTemplate jmsTemplate) {
		this.jmsTemplate = jmsTemplate;
	}

	public void setDestination(Destination destination) {
		this.destination = destination;
	}

	public void receiveMessage() {
		try {
			Message message = null;
			if (destination == null) {
				message  = jmsTemplate.receive();
			} else {
				message = jmsTemplate.receive(destination);
			}

			if(message != null){
				System.out.println("Received message : " + ((TextMessage) message).getText());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
{% endhighlight %}

Yine bean injection methodları dışında receiveMessage methodumuz ile queue'daki mesajı almayı amaçlıyoruz.

Test edelim;

{% highlight java linenos %}
package com.caysever.springjms;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

import com.caysever.jms.MessageReceiver;
import com.caysever.jms.MessageSender;

/**
 * Unit test for simple App.
 */
public class JMSTemplateTest {

	ApplicationContext ctx;
	MessageSender messageSender;
	MessageReceiver messageReceiver;

	@Before
	public void initialize() {
		ctx = new FileSystemXmlApplicationContext("conf/appContext.xml");

		messageSender = (MessageSender) ctx.getBean("jmsSender");
		messageReceiver = (MessageReceiver) ctx.getBean("jmsReceiver");

	}

	@Test
	public void jmsSenderReceiver() throws InterruptedException {

		while (true) {
			messageSender.sendMessage("Test DATA");
			messageReceiver.receiveMessage();

			Thread.currentThread().sleep(1000);
		}

	}

}
{% endhighlight %}

Before class ile app Context'i oluşturup jms sender ve receiver için bean alıyoruz.

> FileSystemXmlApplicationContext kullanmaktaki amaç conf bilgilerini classpath dışından alıyor olmamızdır. İlerde değişebilecek olan herşeyi conf tabanlı yapıp uygulama dışından almak mantıklı olacaktır.


**jmsSenderReceiver** unit test ile mesaj gönderip hemen ardından mesaj bekliyoruz.

1. outputQueue'ya mesaj gönder.
2. replyQueue'dan receiveTimeout süresi kadar mesaj bekle. Burada synchronous yaklaşımını kullanıyoruz. replyQueue'dan mesaj gelene kadar method call stack'ini blokluyoruz. Belirtilen süreden önce mesaj alınırsa işlem yapılıp sonlandırılacaktır, mesaj alınamaz ise receiveTimeout'dan sonra ilgili kaynaklar serbest bırakılıp bir sonraki kod bloğu çalışacaktır.

İlgili projeye [şurdaki](https://github.com/AlicanAkkus/springjms) repodan erişebilirsiniz.

Bir sonraki yazıda JMS best practice ve JMS improve performance konularına değineceğiz.

Multlu ve şen kalın.

~ A.Akkus
