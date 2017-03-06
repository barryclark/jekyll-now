---
layout: post
title: JMS with ActiveMQ
permalink: /blog/java-platform/java-ee/jms/jms-with-activemq
summary: Merhaba arkadaslar, bu yazımızda JMS vendor olarak ActiveMQ kullanarak örnek yapacağız.
image: images/java-platform/java-ee/jms/ActiveMQ-logo-2.png
---

Merhaba arkadaslar, bu yazımızda JMS vendor olarak ActiveMQ kullanarak örnek yapacağız.

### ActıveMQ
Apache tarafından geliştirilen, open-source bir JMS implementasyonudur. Apache çatısı olması dolayısıla diğer Apache ürünleri ile benzer bir yapıdadır.
Detaylı bilgiye [şuradan](http://activemq.apache.org) erişebilirsiniz.

ActiveMQ'yu indirip default ayarlar ile çalıştıralım.
![activemq start](/images/java-platform/java-ee/jms/activemq_start.png)

Browser'dan şu url'e gidelim -> http://localhost:8161/admin
Basic authantication ile login olalım, default olarak admin/admin ile giriş yapabilirz.
![activemq start](/images/java-platform/java-ee/jms/activemq_console.png)

Web arayüzünden Queue/Topic oluşturabilir, Queue/Topic'deki mesajları görüntüleyebilir, mesaj vs gönderebilirsiniz.

Biz konumuza dönecek olursak;
JMS için gerekli olan 2 adet bileşen vardır.

  * Factory name : Vendor'un impelementasyonudur. Her vendor için farklıdır.
  * Provider URL : Vendor'un JMS'i implemente edebilmesi için gereken config bilgileridir. Her vendor için farklıdır.

JMS bir abstraction ve/veya spec olduğu için alt vendorler ile çalışacağız. Burada MQ'ya bağlanabilmek için şu adımlar gerçekleşir.
  1. JMS'e şu factory için bir Connection ver diyeceğiz. Burada JMS bizim için vendor ile konuşup bize connection objesi verecektir.
  2. JMS'e connection alırken MQ bilgilerini nereden alacağını belirteceğimiz Provider URL(Broker URL'de denir) bilgisini vereceğiz.
  3. Total de elimizde MQ üzerinde bir connection olacaktır. Bir sonraki adım ise Queue veya Topic'lere bağlanmaktır.

ActiveMQ özelinde factory name ve default ayarlar şu şekilde;

* Factory name : org.apache.activemq.jndi.ActiveMQInitialContextFactory
* Provider URL : tcp://localhost:61616
* Connection Factory JNDI name : ConnectionFactory
* Queue JNDI name : dynamicQueues/{QueueName}

Default ayarları ActiveMQ/conf dizini altında bulabilirsiniz.

> Yukarıda ifade edilecek şekilde bir MQ bağlantısı yaptığınız takdirde vendor bağımsız bir JMS çalışması yapmış olursunuz. Vendor, TibcoMQ, ActiveMQ, RabbitMQ, SonicMQ veya IBM MQ vs olabilir.

Provider url, bazı vendorler için tcp üzerinden erişilirken bazı vendorlerde ise IBM MQ gibi, Ldap provider url olabilir yada file systemde file binding olabilir.
Birkaç örnek verelim;

* IBM WebSphere MQ için Factory name **com.sun.jndi.ldap.LdapCtxFactory** ise provider URL de **ldap://<ldap_url>** şeklinde olmalıdır.
* IBM WebSphere MQ için Factory name **com.sun.jndi.fscontext.RefFSContextFactory** ise provider URL de **file:<url_ of_bindings_file>** şeklinde olmalıdır.
* ActiveMQ, SonicMQ için Provider URL -> **tcp://host:port**
* TibcoMQ için Provider URL -> **tibjmsnaming://host:port** şeklindedir.

Bir tane Queue oluşturalım;
![activemq create queue](/images/java-platform/java-ee/jms/activemq_create_queue.png)


> Naming conventions olarak şu şekilde oluşturmak tavsiye edilir -> jms/mygroup.myproject.version.resource.queue

ActvieMQ ile çalışırken lib olarak şurayı kullanabiliriz;
[activemq all jar](https://mvnrepository.com/artifact/org.apache.activemq/activemq-all/5.12.0)

Bir örnek yapalım;

Properties file'da aşağıdaki tanımları yapalım;


* jms.connection.factory.name -> **org.apache.activemq.jndi.ActiveMQInitialContextFactory**
* jms.provider.url -> **tcp://localhost:61616**
* connection.factory.jndi.name -> **ConnectionFactory**
* output.queue.name -> **jms/caysever.shop.1.1.Shopping**
* jms.message.timetolive -> **60**
* jms.correlation.id.delimeter -> **:**
* jms.connection.username -> **""**
* jms.connection.password -> **""**


{% highlight java linenos %}
package com.caysever.jms.adaptors;

import java.net.InetAddress;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Hashtable;
import java.util.Locale;
import java.util.Properties;
import java.util.concurrent.ConcurrentHashMap;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageProducer;
import javax.jms.Queue;
import javax.jms.QueueConnection;
import javax.jms.QueueConnectionFactory;
import javax.jms.QueueReceiver;
import javax.jms.QueueSession;
import javax.jms.Session;
import javax.naming.Context;
import javax.naming.InitialContext;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.w3c.dom.Document;

import com.caysever.beans.JMSReplyResultBean;
import com.caysever.beans.MessageBean;
import com.caysever.jms.processor.JMSReplyProcessorFactory;
import com.caysever.jms.processor.ReplyProcessor;

public class JMSAdaptor {

	private Logger logger = Logger.getLogger(JMSAdaptor.class);
	private SimpleDateFormat fmt = new SimpleDateFormat("ddMMyyyy_hhmmss_S", Locale.ENGLISH);

	private InitialContext initialContext;// jms factory alacagimiz context

	private ReplyProcessor replyProcessor;
	private ConcurrentHashMap<String, MessageBean> replyHoldMap = new ConcurrentHashMap<String, MessageBean>();

	private QueueConnectionFactory connectionFactory;// queue connection factory
	private QueueConnection connection;// queue connection icin
	private Queue outputQueue;// mesajin export edilecegi queue
	private Queue replyQueue;// cevabin alinacagi queue
	private QueueReceiver replyQueueReceiver;// reply queue icin receiver
	private QueueSession queueSession;// receiver icin session olusturma

	private String jndiFactoryName;// vendor bagimsiz factory alabilmek icin
	private String providerUrl;// provider url, url ve/veya file olabilir

	//senkron sekilde calismak icin.
	private long timeToLive;

	// username&passsword var ise connection'a bunlari ekleyelim.
	private String jmsUsername;// username
	private String jmsPassword;// password

	// ssl settings
	private boolean sslEnabled = false;
	private String keyStore;
	private String keyStorePassword;
	private String trustStore;
	private String trustStorePassword;

	// correlation id uretmede kullanilacak.
	private String delimeter;

	public void initialize(String adaptorPrefix, Properties appProps) {

		try {
			if (appProps != null) {
				sslEnabled = PropertiesUtils.getBooleanProperty(appProps, adaptorPrefix + ".mq.ssl.enabled", false);
				if (sslEnabled) {
					logger.info("MQ ssl connection enabled.");
					keyStore = PropertiesUtils.getStringProperty(appProps, adaptorPrefix + ".mq.ssl.keystore","");
					keyStorePassword = PropertiesUtils.getStringProperty(appProps, adaptorPrefix + ".mq.ssl.keystorePassword","");
					trustStore = PropertiesUtils.getStringProperty(appProps, adaptorPrefix + ".mq.ssl.trustStore","");
					trustStorePassword = PropertiesUtils.getStringProperty(appProps, adaptorPrefix + ".mq.ssl.trustStorePassword","");
				}

				timeToLive = PropertiesUtils.getLongProperty(appProps, adaptorPrefix+ ".jms.message.timetolive", 60)*1000;///default 60 sn
				delimeter = PropertiesUtils.getStringProperty(appProps, adaptorPrefix + ".jms.message.id.delimeter", ":");
				jndiFactoryName = PropertiesUtils.getStringProperty(appProps, adaptorPrefix + ".jms.connection.factory.name", "");
				providerUrl = PropertiesUtils.getStringProperty(appProps, adaptorPrefix + ".jms.provider.url", "");
				String outputQueueJndiName = PropertiesUtils.getStringProperty(appProps, adaptorPrefix + ".output.queue.name", "");
				String replyQueueJndiName = PropertiesUtils.getStringProperty(appProps, adaptorPrefix + ".reply.queue.name", "");
				jmsUsername = PropertiesUtils.getStringProperty(appProps, adaptorPrefix + ".jms.connection.username", "");
				jmsPassword = PropertiesUtils.extractEncryptedPassword(appProps, adaptorPrefix + ".jms.connection.password");

				Hashtable<String, String> env = new Hashtable<String, String>();
				env.put(Context.INITIAL_CONTEXT_FACTORY, jndiFactoryName);
				env.put(Context.PROVIDER_URL, providerUrl);

				initialContext = new InitialContext(env);

				String connectionFactoryJndiName = PropertiesUtils.getStringProperty(appProps, adaptorPrefix + ".connection.factory.jndi.name", "");
				if (StringUtils.isNotBlank(connectionFactoryJndiName)) {
					connectionFactory = (QueueConnectionFactory) initialContext.lookup(connectionFactoryJndiName);
					if (connectionFactory == null) {
						throw new RuntimeException("ConnectionFactory could\'t taken!");
					}
				}

				boolean isConnectd = connect();
				if (!isConnectd) {
					throw new RuntimeException("Connection could\'t taken!");
				}

				// try to start connection
				connection.start();

				if (StringUtils.isNotBlank(outputQueueJndiName)) {
					outputQueue = (Queue) initialContext.lookup(outputQueueJndiName);
				}

				if (StringUtils.isNotBlank(replyQueueJndiName)) {
					replyQueue = (Queue) initialContext.lookup(replyQueueJndiName);
					// reply queue icin ayarlari yapalim.
					queueSession = connection.createQueueSession(false, QueueSession.CLIENT_ACKNOWLEDGE);
					replyQueueReceiver = queueSession.createReceiver(replyQueue);
					//replyQueueReceiver.setMessageListener(this);
				}

				String replyProcessorName = PropertiesUtils.getStringProperty(appProps, adaptorPrefix + ".reply.processor.name","");
				if (StringUtils.isNotBlank(replyProcessorName)) {
					replyProcessor = JMSReplyProcessorFactory.getReplyProcessor(adaptorPrefix, appProps);
				}


				StringBuilder info = new StringBuilder("\nJMSAdaptor Details;");
				info.append("\n\tJMS Username : ").append(jmsUsername);
				info.append("\n\tJMS Password : ").append(jmsPassword);
				info.append("\n\tJMS ConnectionFactory JNDI Name : ").append(connectionFactoryJndiName);
				info.append("\n\tJMS Output Queue JNDI Name : ").append(outputQueueJndiName);
				info.append("\n\tJMS Reply Queue JNDI Name : ").append(replyQueueJndiName);

				logger.info(info.toString());
			}
		} catch (Exception e) {
			logger.error(e, e);
		}
	}

	@SuppressWarnings({ "resource" })
	private boolean writeToMQ(MessageBean messageBean) throws Exception {
		logger.info("JMSAdaptor writeToMQ method is started.");
		Session session = null;
		boolean result = false;
		try {

			Document resultDoc = messageBean.getRecordXml();
			String msg = XmlUtils.xmlToString(resultDoc);

			if (connection == null) {
				connect();
			}

			// transactional session alalim.
			session = connection.createSession(true, QueueSession.SESSION_TRANSACTED);

			MessageProducer producer = session.createProducer(outputQueue);
			producer.setTimeToLive(timeToLive);

			Message jmsMessage = session.createTextMessage(msg);

			// reply queue var ise set edelim.
			if (replyQueue != null) {
				jmsMessage.setJMSReplyTo(replyQueue);
			}

			jmsMessage.setJMSCorrelationID(generateCorrelationID(messageBean));
			producer.send(jmsMessage);

			String jmsCorrelationID = jmsMessage.getJMSCorrelationID();
			// reply queue var ise map'e atalim.
			if (replyQueue != null) {

				synchronized (replyHoldMap) {
					replyHoldMap.put(jmsCorrelationID, messageBean);
					logger.info(jmsCorrelationID + " jms id put to reply hold map.");
				}

			}

			logger.info("Message has been sent to (" + outputQueue.getQueueName() + ") Message : " + msg);

			session.commit();

			producer.close();
			session.close();

			if(replyQueue != null){
				Message replyMessage = replyQueueReceiver.receive(timeToLive*2);//2 t kadar bekleyelim. 1t -> alabilmesi, 1t -> cevap donmesi icin.

				if(replyMessage != null){
					MessageBean replyMessageBean = replyHoldMap.get(jmsCorrelationID);
					result = processJMSResult(replyMessageBean, replyMessage);

					replyMessage.acknowledge();//ack gonderelim.
				}else{
					logger.error("Could\'t receive reply message!");
					result = false;
				}


			}


			return result;
		} catch (Exception e) {
			logger.error(e, e);
			throw e;
		}
	}

	protected void shutdown() {
		logger.debug("JMS adaptor is shutting down....");
		try {
			if (connectionFactory != null) {
				if (connection != null) {
					connection.close();
				}
			}
		} catch (JMSException e) {
			logger.error(e, e);
		}
	}

	private boolean connect() {
		logger.info("JMSAdaptor connect method is started.");

		try {

			if (jmsUsername != null && jmsPassword != null) {
				connection = connectionFactory.createQueueConnection(jmsUsername, jmsPassword);
			} else {
				connection = connectionFactory.createQueueConnection();
			}

			if (connection == null) {
				throw new RuntimeException("Connection could\'t taken!");
			}

		} catch (Exception e) {
			logger.error(e, e);
			return false;
		}

		logger.info("JMSAdaptor connect method is finished.");
		return true;
	}

	public static void main(String[] args) {
		try { // Create and start connection
			Properties properties = new Properties();
			PropertiesUtils.loadProperties("localConfig/bin/JMSAdaptor.properties", properties);

			JMSAdaptor jmsAdaptor = new JMSAdaptor();
			jmsAdaptor.initialize("adaptor.1", properties);
			MessageBean bean = new MessageBean();
			bean.setRecordXml(XmlUtils.loadXmlFromFile("simulation/ticket.xml"));
			bean.setTcid("BAJJ");
			bean.setMessageId(5);
			bean.setRecordNo(1);
			bean.setRecordDate(new Date().getTime());

			jmsAdaptor.writeToMQ(bean);

		} catch (Exception e) {
			logger.error(e, e);
		}
	}

	private boolean processJMSResult(MessageBean messageBean, Message message) throws Exception {
		logger.info("JMSAdaptor processJMSResult method is started.");
		boolean exported = false;
		try {
			if (replyProcessor != null) {


				JMSReplyResultBean jmsResult = replyProcessor.doProcess(message);
				logger.info(jmsResult);

				String jmsCorrelationID = message.getJMSCorrelationID();
				logger.info("Received Message Correlation ID : " + jmsCorrelationID);

				if (jmsResult.isAccept()) {
					logger.info("JMS Adaptor message accepted.");
					// reply mesajı true oldugu icin onsuccessi cagirsin.
					// true parametresi super deki onsuccess icin kullanilacak.
					synchronized (replyHoldMap) {
						replyHoldMap.remove(jmsCorrelationID);
					}

					exported = true;
				} else {
					exported = false;
					logger.info("JMS Adaptor message rejected. Reject reason : " + jmsResult.getErrorReason());
				}

			}
		} catch (Exception e) {
			logger.error(e, e);
			throw e;
		}
		logger.info("JMSAdaptor processJMSResult method is finished.");
		return exported;
	}

	private String generateCorrelationID(MessageBean messageBean) throws Exception {
		logger.info("JMSAdaptor generateCorrelationID method is started");

		StringBuilder correlationID = new StringBuilder("ID");
		try {
			correlationID.append(delimeter).append(InetAddress.getLocalHost().getHostName());
			correlationID.append(delimeter).append(messageBean.getTcid());
			correlationID.append(delimeter).append(messageBean.getMessageId());
			correlationID.append(delimeter).append(messageBean.getRecordNo());
			correlationID.append(delimeter).append(messageBean.getRecordDate());
		} catch (Exception e) {
			logger.error(e, e);
			throw e;
		}
		logger.info("JMSAdaptor generateCorrelationID method is finished. Correlation ID : " + correlationID);
		return correlationID.toString();
	}
}
{% endhighlight %}

MQ'ya mesajı ilettik, şimdi browse edelim;
![activemq message](/images/java-platform/java-ee/jms/activemq_message.png)

Kod içerisinde açıklamalar mevcut ancak şunlara değinelim.
İlk olarak initialize ile MQ ile ilgili bilgileri alıyor ve gerekli objeleri oluşturuyoruz. JNDI name ile lookup yaparak bir ConnectionFactory elde ediyoruz. Burada sadece jndi lookup yapıp bırakıyoruz arka tarafda jms vendor ile konuşup sonuç olarak bir ConnectionFactory veriyor bize.

> Örneğimizde QueueConnectionFactory kullandık. TopicConnectionFactory de kullanılabilir. Ya da sadece ConnectionFactory kullanılabilir.

1. Eğer QueueConnectionFactory kullanıyor isek sadece MQ üzerindeki Queue'lara erişebiliriz.
2. Eğer TopicConnectionFactory kullanıyor isek sadece MQ üzerindeki Topic'lere erişebiliriz.
3. Eğer ConnectionFactory kullanıyor isek MQ üzerindeki Queue ve Topic'lere erişebiliriz.

Örneğimizde Topic ile işimiz olmadığı için QueueConnectionFactory kullandık.
writeToMQ methodunda önce SESSION_TRANSACTED olacak şekilde bir Queue session aldık daha sonra MessageProducer ile sender oluşturup bir text mesaj gönderdik. Mesaj tipi text, stream veya obje olabilir.

Gönderilen mesaj şöyle;
{% highlight xml lineos %}
<?xml version="1.0" encoding="UTF-8"?>
<Ticket captureDate="09 Dec 2016 11:18:12" recordTemplateCode="501">
	<TicketDate>2016-12-19 14:53:00.000</TicketDate>
	<TicketExpiryDate>2016-12-20 14:53:00.000</TicketExpiryDate>
	<TicketPrice>59.9</TicketPrice>
	<TicketCurrency>
		<CurrencyCode>USD</CurrencyCode>
	</TicketCurrency>
	<Dealer>AAkkus</Dealer>
	<BankName>TRET</BankName>
</Ticket>
{% endhighlight %}

Dikkat edilecek iki nokta var;

1. Correlation id'yi kendimiz oluşturduk. JMS spec içerisinde Message ID set etmeye izin verilmez. Design pattern olarak Queue'ya atılan mesaj ile mesaja verilen cevap Correlation ID üzerinden match edilir.
2. JMS'e bir mesaj gönderirken mesaja cevap verilecek ise verilecek olan cevabın nereye konulacağını söyleyebiliriz. Kod içerisinde mesaj gönderme kısmında replyQueue set etmeyi görebiliriz.
3. Mesajı gönderdikten sonra reply Queue var ise 2T kadar yani 2 timeToLive kadar mesajın gelmesini bekliyoruz. Bu yapı JMS'in senkron yapısını ifade etmektedir. Mesaj göndermek ve karşı tarafın alması için 1T , cevabın oluşturulup bize gelmesini sağlamak için de 1T olmak üzere totalde 2T kadar iş yapmış oluyoruz.

Kodu asenkron olacak şekilde refactor edelim.

{% highlight java linenos %}
package com.caysever.jms.adaptors;

import java.net.InetAddress;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Hashtable;
import java.util.Locale;
import java.util.Properties;
import java.util.concurrent.ConcurrentHashMap;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageProducer;
import javax.jms.Queue;
import javax.jms.QueueConnection;
import javax.jms.QueueConnectionFactory;
import javax.jms.QueueReceiver;
import javax.jms.QueueSession;
import javax.jms.Session;
import javax.naming.Context;
import javax.naming.InitialContext;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.w3c.dom.Document;

import com.caysever.beans.JMSReplyResultBean;
import com.caysever.beans.MessageBean;
import com.caysever.jms.processor.JMSReplyProcessorFactory;
import com.caysever.jms.processor.ReplyProcessor;

public class JMSAdaptor implements MessageListener{

	private Logger logger = Logger.getLogger(JMSAdaptor.class);
	private SimpleDateFormat fmt = new SimpleDateFormat("ddMMyyyy_hhmmss_S", Locale.ENGLISH);

	private InitialContext initialContext;// jms factory alacagimiz context

	private ReplyProcessor replyProcessor;
	private ConcurrentHashMap<String, MessageBean> replyHoldMap = new ConcurrentHashMap<String, MessageBean>();

	private QueueConnectionFactory connectionFactory;// queue connection factory
	private QueueConnection connection;// queue connection icin
	private Queue outputQueue;// mesajin export edilecegi queue
	private Queue replyQueue;// cevabin alinacagi queue
	private QueueReceiver replyQueueReceiver;// reply queue icin receiver
	private QueueSession queueSession;// receiver icin session olusturma

	private String jndiFactoryName;// vendor bagimsiz factory alabilmek icin
	private String providerUrl;// provider url, url ve/veya file olabilir

	//senkron sekilde calismak icin.
	private long timeToLive;

	// username&passsword var ise connection'a bunlari ekleyelim.
	private String jmsUsername;// username
	private String jmsPassword;// password

	// ssl settings
	private boolean sslEnabled = false;
	private String keyStore;
	private String keyStorePassword;
	private String trustStore;
	private String trustStorePassword;

	// correlation id uretmede kullanilacak.
	private String delimeter;

	public void initialize(String adaptorPrefix, Properties appProps) {

		try {
			if (appProps != null) {
				sslEnabled = PropertiesUtils.getBooleanProperty(appProps, adaptorPrefix + ".mq.ssl.enabled", false);
				if (sslEnabled) {
					logger.info("MQ ssl connection enabled.");
					keyStore = PropertiesUtils.getStringProperty(appProps, adaptorPrefix + ".mq.ssl.keystore","");
					keyStorePassword = PropertiesUtils.getStringProperty(appProps, adaptorPrefix + ".mq.ssl.keystorePassword","");
					trustStore = PropertiesUtils.getStringProperty(appProps, adaptorPrefix + ".mq.ssl.trustStore","");
					trustStorePassword = PropertiesUtils.getStringProperty(appProps, adaptorPrefix + ".mq.ssl.trustStorePassword","");
				}

				timeToLive = PropertiesUtils.getLongProperty(appProps, adaptorPrefix+ ".jms.message.timetolive", 60)*1000;///default 60 sn
				delimeter = PropertiesUtils.getStringProperty(appProps, adaptorPrefix + ".jms.message.id.delimeter", ":");
				jndiFactoryName = PropertiesUtils.getStringProperty(appProps, adaptorPrefix + ".jms.connection.factory.name", "");
				providerUrl = PropertiesUtils.getStringProperty(appProps, adaptorPrefix + ".jms.provider.url", "");
				String outputQueueJndiName = PropertiesUtils.getStringProperty(appProps, adaptorPrefix + ".output.queue.name", "");
				String replyQueueJndiName = PropertiesUtils.getStringProperty(appProps, adaptorPrefix + ".reply.queue.name", "");
				jmsUsername = PropertiesUtils.getStringProperty(appProps, adaptorPrefix + ".jms.connection.username", "");
				jmsPassword = PropertiesUtils.extractEncryptedPassword(appProps, adaptorPrefix + ".jms.connection.password");

				Hashtable<String, String> env = new Hashtable<String, String>();
				env.put(Context.INITIAL_CONTEXT_FACTORY, jndiFactoryName);
				env.put(Context.PROVIDER_URL, providerUrl);

				initialContext = new InitialContext(env);

				String connectionFactoryJndiName = PropertiesUtils.getStringProperty(appProps, adaptorPrefix + ".connection.factory.jndi.name", "");
				if (StringUtils.isNotBlank(connectionFactoryJndiName)) {
					connectionFactory = (QueueConnectionFactory) initialContext.lookup(connectionFactoryJndiName);
					if (connectionFactory == null) {
						throw new RuntimeException("ConnectionFactory could\'t taken!");
					}
				}

				boolean isConnectd = connect();
				if (!isConnectd) {
					throw new RuntimeException("Connection could\'t taken!");
				}

				// try to start connection
				connection.start();

				if (StringUtils.isNotBlank(outputQueueJndiName)) {
					outputQueue = (Queue) initialContext.lookup(outputQueueJndiName);
				}

				if (StringUtils.isNotBlank(replyQueueJndiName)) {
					replyQueue = (Queue) initialContext.lookup(replyQueueJndiName);
					// reply queue icin ayarlari yapalim.
					queueSession = connection.createQueueSession(false, QueueSession.CLIENT_ACKNOWLEDGE);
					replyQueueReceiver = queueSession.createReceiver(replyQueue);
					replyQueueReceiver.setMessageListener(this);
				}

				String replyProcessorName = PropertiesUtils.getStringProperty(appProps, adaptorPrefix + ".reply.processor.name","");
				if (StringUtils.isNotBlank(replyProcessorName)) {
					replyProcessor = JMSReplyProcessorFactory.getReplyProcessor(adaptorPrefix, appProps);
				}


				StringBuilder info = new StringBuilder("\nJMSAdaptor Details;");
				info.append("\n\tJMS Username : ").append(jmsUsername);
				info.append("\n\tJMS Password : ").append(jmsPassword);
				info.append("\n\tJMS ConnectionFactory JNDI Name : ").append(connectionFactoryJndiName);
				info.append("\n\tJMS Output Queue JNDI Name : ").append(outputQueueJndiName);
				info.append("\n\tJMS Reply Queue JNDI Name : ").append(replyQueueJndiName);

				logger.info(info.toString());
			}
		} catch (Exception e) {
			logger.error(e, e);
		}
	}

	@SuppressWarnings({ "resource" })
	private boolean writeToMQ(MessageBean messageBean) throws Exception {
		logger.info("JMSAdaptor writeToMQ method is started.");
		Session session = null;
		boolean result = false;
		try {

			Document resultDoc = messageBean.getRecordXml();
			String msg = XmlUtils.xmlToString(resultDoc);

			if (connection == null) {
				connect();
			}

			// transactional session alalim.
			session = connection.createSession(true, QueueSession.SESSION_TRANSACTED);

			MessageProducer producer = session.createProducer(outputQueue);
			producer.setTimeToLive(timeToLive);

			Message jmsMessage = session.createTextMessage(msg);

			// reply queue var ise set edelim.
			if (replyQueue != null) {
				jmsMessage.setJMSReplyTo(replyQueue);
			}

			jmsMessage.setJMSCorrelationID(generateCorrelationID(messageBean));
			producer.send(jmsMessage);

			String jmsCorrelationID = jmsMessage.getJMSCorrelationID();
			// reply queue var ise map'e atalim.
			if (replyQueue != null) {

				synchronized (replyHoldMap) {
					replyHoldMap.put(jmsCorrelationID, messageBean);
					logger.info(jmsCorrelationID + " jms id put to reply hold map.");
				}

			}

			logger.info("Message has been sent to (" + outputQueue.getQueueName() + ") Message : " + msg);

			session.commit();

			producer.close();
			session.close();
			return result;
		} catch (Exception e) {
			logger.error(e, e);
			throw e;
		}
	}

	protected void shutdown() {
		logger.debug("JMS adaptor is shutting down....");
		try {
			if (connectionFactory != null) {
				if (connection != null) {
					connection.close();
				}
			}
		} catch (JMSException e) {
			logger.error(e, e);
		}
	}

	private boolean connect() {
		logger.info("JMSAdaptor connect method is started.");

		try {

			if (jmsUsername != null && jmsPassword != null) {
				connection = connectionFactory.createQueueConnection(jmsUsername, jmsPassword);
			} else {
				connection = connectionFactory.createQueueConnection();
			}

			if (connection == null) {
				throw new RuntimeException("Connection could\'t taken!");
			}

		} catch (Exception e) {
			logger.error(e, e);
			return false;
		}

		logger.info("JMSAdaptor connect method is finished.");
		return true;
	}

	public static void main(String[] args) {
		try { // Create and start connection
			Properties properties = new Properties();
			PropertiesUtils.loadProperties("localConfig/bin/JMSAdaptor.properties", properties);

			JMSAdaptor jmsAdaptor = new JMSAdaptor();
			jmsAdaptor.initialize("adaptor.1", properties);
			MessageBean bean = new MessageBean();
			bean.setRecordXml(XmlUtils.loadXmlFromFile("simulation/ticket.xml"));
			bean.setTcid("BAJJ");
			bean.setMessageId(5);
			bean.setRecordNo(1);
			bean.setRecordDate(new Date().getTime());

			jmsAdaptor.writeToMQ(bean);

		} catch (Exception e) {
			logger.error(e, e);
		}
	}

	private boolean processJMSResult(MessageBean messageBean, Message message) throws Exception {
		logger.info("JMSAdaptor processJMSResult method is started.");
		boolean exported = false;
		try {
			if (replyProcessor != null) {


				JMSReplyResultBean jmsResult = replyProcessor.doProcess(message);
				logger.info(jmsResult);

				String jmsCorrelationID = message.getJMSCorrelationID();
				logger.info("Received Message Correlation ID : " + jmsCorrelationID);

				if (jmsResult.isAccept()) {
					logger.info("JMS Adaptor message accepted.");
					// reply mesajı true oldugu icin onsuccessi cagirsin.
					// true parametresi super deki onsuccess icin kullanilacak.
					synchronized (replyHoldMap) {
						replyHoldMap.remove(jmsCorrelationID);
					}

					exported = true;
				} else {
					exported = false;
					logger.info("JMS Adaptor message rejected. Reject reason : " + jmsResult.getErrorReason());
				}

			}
		} catch (Exception e) {
			logger.error(e, e);
			throw e;
		}
		logger.info("JMSAdaptor processJMSResult method is finished.");
		return exported;
	}

	private String generateCorrelationID(MessageBean messageBean) throws Exception {
		logger.info("JMSAdaptor generateCorrelationID method is started");

		StringBuilder correlationID = new StringBuilder("ID");
		try {
			correlationID.append(delimeter).append(InetAddress.getLocalHost().getHostName());
			correlationID.append(delimeter).append(messageBean.getTcid());
			correlationID.append(delimeter).append(messageBean.getMessageId());
			correlationID.append(delimeter).append(messageBean.getRecordNo());
			correlationID.append(delimeter).append(messageBean.getRecordDate());
		} catch (Exception e) {
			logger.error(e, e);
			throw e;
		}
		logger.info("JMSAdaptor generateCorrelationID method is finished. Correlation ID : " + correlationID);
		return correlationID.toString();
	}

  @Override
	public void onMessage(Message message) {
		logger.info("JMSAdaptor onMessage started.");

		try {
			if (replyProcessor != null) {

				String jmsCorrelationID = message.getJMSCorrelationID();
				logger.info("Received Message Correlation ID : " + jmsCorrelationID);

				if (replyHoldMap.containsKey(jmsCorrelationID)) {

					MessageBean messageBean = replyHoldMap.get(jmsCorrelationID);
					processJMSResult(messageBean, message);

				} else {
					//find message from db etc.
				}

				message.acknowledge();// ack gonderelim.
			}

		} catch (Exception e) {
			logger.error(e, e);
		}
		logger.info("JMSAdaptor onMessage finished.");
	}

}
{% endhighlight %}

Yaptığımız işler şunlar;
1. MessageListener'ı implemente etmek ve onMessage içeriğini doldurmak.
2. QueueReceiver oluşturup referans vermek.

Bunları yaptıktan sonra asenkron şekilde time independent iş yapabiliyor olacağız. ActiveMQ web console'dan mesaj gönderebiliriz. İlk olarak properties'leri şöyle güncelleyelim.

* jms.connection.factory.name -> **org.apache.activemq.jndi.ActiveMQInitialContextFactory**
* jms.provider.url -> **tcp://localhost:61616**
* connection.factory.jndi.name -> **ConnectionFactory**
* output.queue.name -> **jms/caysever.shop.1.1.Shopping**
* jms.message.timetolive -> **60**
* jms.correlation.id.delimeter -> **:**
* jms.connection.username -> **""**
* jms.connection.password -> **""**
* reply.queue.name -> **jms/caysever.shop.1.1.ShoppingR**

Queue name + "R" şeklinde yeni bir Queue oluşturalım. Web konsoldan Queue'ya mesaj gönderelim;

![activemq reply message](/images/java-platform/java-ee/jms/activemq_reply.png)

Mesaj geldiginde onMessage tetiklenecektir. Event based iş yaptık sayılır.
> ReplyProcessor'un bir modül olduğunu ve jms reply mesajını handle ettiğini varsayalım.

JMS'in farklı özelliklerinden biri de Session alma mantığıdır. Normal session'dan farklı olarak transactional session alabilir herhangi bir sorunda rollback yapabilirsiniz.
Client ACK şeklinde alıp mesajı tamamen kendi sisteminize aldıktan sonra JMS vendor'üne ack gonderebilirsiniz.

Bir sonraki yazıda görüşmek dileğiyle.

~ A.Akkus
