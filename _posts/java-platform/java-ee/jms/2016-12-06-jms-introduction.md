---
layout: post
title: JMS Introduction
permalink: /blog/java-platform/java-ee/jms/jms-introduction
summary: Merhaba arkadaslar, bu yazımızda JMS'in genel yapısından bahsediyor olacağız.
image: images/java-platform/java-ee/jms/jms_logo.png
---

Merhaba arkadaslar, bu yazımızda JMS'in genel yapısından bahsediyor olacağız. JMS ve vendor'lerinden bahsedeceğiz.

### JMS(Java Message Service)
JMS, en temelde bir mesajlaşma yapısıdır. Java'da bir spec'dir, kendi başına kullanılabileceği gibi herhangi bir vendor ile de kullanılabilir.

JMS, network üzerinde iki uç sistemin haberşelmesini sağlayan api'idir. Ortak bir interface ve belirlenmiş bir prokol üzerinden işler yürür.

#### Neden JMS'e ihtiyaç duyarız?
İki uç sistemin haberleşmesini sağlamak isterken aynı anda loose coupling yani birbirinden bağımsız olmasını istediğimiz durumlarda bize yardımcı olacaktır. Örneğin;
İstanbul lokasyonunda çalışan bir uygulama, ABD lokasyonunda çalışan bir uygulama ile haberleşmek istiyor. Farklı sistemlerde, farklı servler'larda çalışabilirler.

Ayrıca JMS ile event based programlar yazabilir, kod'un test edilebilir/bakımı kolay/genişletilebilir bir yapıda olmasını sağlayabilirsiniz.

#### JMS Avantajı

* Asynchronous : JMS'de default mesajlaşma şekli asenkron şekildedir. İki uç sistemin aynı anda up durumda olması gerekmez. Sender mesajını JMS ile gönderir, Receiver ise ne zaman up oldu ise o zaman alır. Time independent'tır bu sayede. Ayrıca JMS bu mesajın persist edileceğini de garanti eder. Senkron şekilde de mesajlaşma başlatılabilir.

* Reliable : JMS ve JMS vendorları(IBM MQ, ActiveMQ vs) bir mesajın teslim edileceğini ve sadece birkez teslim edileceğini garanti etmektedir. Bu durumda, mesajınızın karşı tarafa iletileceğinden eminsiniz ve duplicate mesajın oluşmayacağından da eminsinizdir.

#### JMS Messaging Domains
JMS'de iki mesajlaşma şekli vardır. İkisi de önemlidir, ihtiyaca göre kullanılabilir.

* Point-to-Point Messaging Domain : Bu model de Queue(mesajın bulunduğu kısım), Sender ve Receiver vardır.

  ![jms ptp](/images/java-platform/java-ee/jms/jms-pointToPoint.jpg)  

Point To Point model'de mesajı gönderen sender client , mesajın bulunduğu kısım queue ve mesajı alacak olan receiver client bulunur. Burada her mesaj için birer client olmalıdır. Mesajı alacak olan tek bir client'dır. JMS ve vendorlar, ilgili mesajın receiver client'ın up/down durumundan bağımsız olarak karşı tarafa iletileceğini garanti eder. Mesaj client tarafından browse edilgidinde ve/veya expiry time dolduğunda queue'dan silinir.

Burada Expiration Policy farklı amaçlar için kullanılabilir.

* Persist edilecek sekilde ayarlayabilirsiniz ki herhangi bir expiry time bulunmaz ve receiver hazır olup mesajı aldığında queue'dan silinir.
* Data için zamanın önemli olduğu durumlarda expiry policy kullanabilirsiniz. Örneğin; Döviz/Kur yayını yaptığınızı düşünün. USD/TRY currency pair için bir çapraz kur yayınladınız. Ancak bu kurun 5dk için geçerli olmasını istiyorsunuz. 5dk sonra ilgili mesaj herhangi bir receiver tarafından alınmadı ise mesaj silinecektir. Sender ise yeni kur yayını yapabilir bu durumda.

Ayrıca mesaj expiry olduğunda hangi aksiyonun alınması gerektiğini ayarlayabilirsiniz. Expiry address tanımı yaparak expiry olan mesajın başka bir queue'ya atılmasını sağlayabilirsiniz. Expiry address tanımlanmadı ise mesaj silinecektir, geri dönüşü yoktur.

* Publish/Subscribe Messaging Domain : Bu model de Sender mesajı publis eder yani gönderir. Point To Point model'den farklı olarak ilgili mesajı birden fazla receiver alabilir. Modelde, sender, topic ve receiver'lar vardır. Publishers'ın, Subscriber'ları bilmesine gerek yoktur. Publishers ve Subscriber'lar dinamik olarak topic'e Publish yapabilir yada Subscribe/UnSubscribe olabilirler.

  ![jms PublishSubscriber](/images/java-platform/java-ee/jms/jms-publishSubscribe.jpg)


#### Message Consumption

Queue'dan mesaj alma işini seknron yada asenkron şekilde yapabilirsiniz.
Eğer;

  * Senkron olarak alınacak ise JMS üzerinde client'ın istek yapması gerekir. JMS receive ile mesaj gelene kadar sistem bloklanabilir. Bir diğer yöntem de XX kadar süre bekle gelirse kullanırım gelmezse işi bitir de diyebilirsiniz.

  * Asnekron seçilirse message listener'lara register olunur ve queue'a bir mesaj put edildiğinde callback ile listener method çağrılır ve mesaj receiver'a iletilmiş olur.

#### JMS Message Structure
Bir JMS mesajında; message header, message properties ve message body olmak üzere 3 kısım vardır.

Message Header

 * JMSDestination : Mesajın gönderileceği kısımır. Queue yada Topic olabilir.
 * JMSDeliveryMode : Mesajın saklanma biçimidir. Persistance yada NonPersitence olabilir. Her iki durumda da duplicate mesaj oluşmaz ve karşı tarafa iletileceği garanti edilmektedir.
    Persistance durumda JMS provider fail olsa bile revoery ederek mesajı işler , NonPersitence durumda ise fail olursa JMS provider ilgili mesaj çöpe gider. Default'da JMS delivery mode Persistance'dır.
 * JMSMessageID : JMS yada JMS Provider tarafından oluşturulan unique bir id'dir. Mesaj gönderen sender bunu set etmemelidir. Set ediyorsa JMS mantığında sorun vardır.
 * JMSTimestamp : JMS Sender tarafından otomatik olarak set edilir, gönderme işleminin başladığı yaklaşık time'ı ifade eder. Mesajın transmit zamanı değildir, network vs gibi nedenlerden doalyı gönderilme zamanında gecikmeler olabilir.
 * JMSCorrelationID : İki mesajın eşleştirilmesinde/matching de kullanılır. JMSMessageID yerine bu alan matching için kullanılmalıdır.
 * JMSReplyTo : Mesajı gönderen sender cevabını başka bir queue'ya gönderilmesini isteyebilir. Örneğin; yeni bir reply mesajı olabilir yada receiver mesajı aldım diye ack mesajı gönderebilir.
 * JMSRedelivered : Default değeri false'dır. Bir mesajın tekrar gönderilebileceğini ifade eder. Eğer client, session'u
 * JMSType : Mesajın tipini ifade eder. Default olarak String/Text'dir. Bytes, Stream ve Map olabilir.
 * JMSExpiration : Yukarıda expiry olayını anlatmıştık.
 * JMSPriority : Mesajlara öncelik verebiliyoruz. Önceliği yüksek olan mesaj ilk önce receiver'a gönderilecektir.

Message properties

 * Custom properties olarak name/value şeklinde set edilebilir.

Message Body

 * Aynı zamanda JMSType'a karşılık gelmektedir. Text message, Object message, Bytes message, Stream message ve Map message olabilir.



JMS yada mesajlaşma servisleri önemli ve ciddi konularda oldukça kullanılır. Yukarda örnek olarak bir kur yayınından bahsettik. Merkez bankasının bir kur yayınlandığını düşünün, topic veya queue olabilir bu. Sonuçta işin içinde para var. Bir diğer örnek olarak bir seyahat acentasını düşünün, uçak rezervasyonundan otel rezervasyonuna, ulaşım vb tüm işlemlerin yapıldığını düşünün. Ana sistem, uçak bileti için bir queue'a, otel rezervasyonu için başka bir queue'a mesaj ekler. Sistemler arası bağlantı gevşektir, uçak bileti otel rezervasyonunu etkilemez. Örnekler çoğaltılabilir.

Kullanılan alanlar önemli alanlar olduğu için best practice olarak bazı pattern'ların incelenmesi gerekir. Bunlardan biri message id, correletion id ve req/resp yaklaşımıdır;
[şu kaynağa](https://docs.oracle.com/cd/E13171_01/alsb/docs25/interopjms/MsgIDPatternforJMS.html) göz atabilirsiniz.

Bir diğer pattern olarak da Delivery ve ACK pattern'a göz atabilirsiniz, [şuradan](http://wso2.com/library/articles/2013/01/jms-message-delivery-reliability-acknowledgement-patterns/)

Blogdaki örneklerde pure JMS ile ActiveMQ ile örnekler yapacağız. Hali hazırda IBM WebSphere MQ için sertifika sınavına hazırlanıyorum. IBM MQ'nun yapısı biraz daha farklı, farklı queue tipleri var, distributed olayları var.  

Bir sonraki yazıda görüşmek dileğiyle.

~ A.Akkus
