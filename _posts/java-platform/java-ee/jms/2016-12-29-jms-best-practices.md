---
layout: post
title: JMS Best Practices
permalink: /blog/java-platform/java-ee/jms/jms-best-practices
summary: Merhaba arkadaslar, bu yazımızda JMS için kullanabileceğimiz/kullanmamız gereken yaklaşımları ve design pattern'ları anlatmaya çalışacağız.
image: /images/java-platform/java-ee/jms/jms_bestpractice.png
---

Merhaba arkadaslar, bu yazımızda JMS için kullanabileceğimiz/kullanmamız gereken yaklaşımları ve design pattern'ları anlatmaya çalışacağız.

JMS yazarken JMS servler ile yapılan iletişimler olsun, JNDI lookup'lar olsun, Queue/Topic'lere mesaj gönderme/alma olsun birçok konuda kaynak tüketiriz. Tüketilen kaynakların sıkça kullanılması, kapatılmaması gibi durumlarda potansiyel hatalar alacağızdır. Bu kaynaklar, memory, CPU, disk I/O, network olabilir. Bunun yanında JMS'in desteklediği yaklaşımların yanlış kullanımı da bizi amacımızdan uzaklaştırabilir. Yazımız içerisinde JMS için kullanabileceğimiz design pattern'lar ve yaklaşımlardan bahsediyor olacağız.

#### Basic steps to write a JMS program
JMS'deki bir Queue'ya mesaj göndermek temel olarak şu adımlardan oluşur;

1. import package and classes
2. Lookup ConnectionFactory
3. Create and start Connection
4. Create Session
5. Lookup Destination (Topic or Queue)
6. Create Producers and Consumers
7. Create Message
8. Send and receive Messages

JMS yüksek performanslı olarak tasarlanmasına rağmen, network katmanında çalışmanız, mesaj gönderme/alma işlemleri yapıp birçok obje oluşturduğunuz, desteklediği bazı yaklaşımların yanlış kullanımından dolayı istenilen performansı veremeyebilir.

Aşağıdaki objeleri application scope olacak şekilde oluşturabiliriz. Bu sayede her mesaj alma/gönderme işleminde tekrar tekrar objeleri oluşturmak için efor sarf etmeyeceğiz.

1. Conneciton
2. Session
3. Producers
4. Consumers

Yukardaki kaynakların kapatılma yaklaşımı da şöyle olmalıdır;

* Eğer Producer yada Consumer ile işimiz bitti ama Session ve Connection'a ihtiyacımız var ise sadece Producer ve Consumer kapatılmalı.
* Eğer Session'a ihtiyacımız kalmadı ve/veya farklı Session açmak istiyor isek, transactional session gibi, Session'ı kapatmamız yeterli olacaktır. Session'un kapanması ile Producers ve Consumers da otomatik olarak kapatılacaktır.
* Eğer mesaj gönderme/alma işimiz bitti ise Connection kapatarak tüm resource'ların kapanmasını sağlayabiliriz.

#### Acknowledgement Patterns
Acknowledgement Patterns, JMS içerisinde performansı artıran yada azaltan önemli faktörlerden biridir. Yanlış seçilen ve/veya amaca uygun seçilmeyen ACK pattern'ı JMS vendor olarak JMS Server üzerinde hatta JMS Client üzerinde ek iş yükü anlamına gelecektir.

ACK pattern, client side olduğu için consumer'ın yapacağı bir iştir aslında. Consumer'ın seçebileceği ack pattern'larına bakalım;

* **Auto mode :** Eğer Consumer, ack pattern olarak auto mode'da bir session aldı ise JMS Serverdaki Queue yada Topic'den mesaj alındığında otomatik olarak JMS server'a ack gönderilir. Default olan bu yaklaşım ile bir mesajın karşı tarafa gönderileceği ve sadece bir kere gönderileceğini garanti edecektir.
* **Duplicates okey mode :** Auto mode'a benzemekle birlikte ack gonderilir ancak lazily(tembel) şekilde gönderilir. Auto mode'a göre daha performanslı mesaj işlemeyi sağlar ancak herhnagi bir fail durumunda duplicate mesaj alınabilir.
* **Client mode :** Client'ın yani Consumer'ın ack kontrolünü aldığı yaklaşımdır. Consumer, mesajı alıp tamamen işlediğine karar verdiği anda ack gönderebilir.

Gelelim hangi ack pattern'ı kullanacağımıza;
Öncelikle ihtiyacı belirlemek gerekmektedir. Örneğin, performans mı istiyorum? duplicate mesajların olması benim için önemli mi? ack'yı kendim sağlıklı bir şekilde gönderebilir miyim?

Bir durum düşünelim ve hangi ack pattern'ı kullanacağımıza karar verelim;
Bir para piyasası içerisindeyiz, bir kurum olarak kur yayını yaptık ve USD/TRY kurunu 3.52TL'den satılabileceğini Queue'a attık. Belirli aralıklarla kurun değiştiğini ve tekrar yayınlandığını versayalım. Bankalar, Finans kuruluşları veya kullanıcılar olarak bu bilgiyi kullanmak istiyoruz. JMS'den Duplicates okey mode'da bir session aldık. Nadir de olsa duplicate mesaj olabileceğini belirttik ya. 3.52TL'lik kur mesajını aldık, işledik ve yolumuza devam ettik. JMS Server, herhangi bir nedenden dolayı ack alamadı. ACK alamadığı için ilgili mesajı tekrar göndereceğine karar verdi. Bu arada kurum kur yayını yapmaya devam etti ve anlık kur bilgisini 3.53 olarak yayınladı. Consumer olarak banka veya kişiler bir önceki ACK alınamaması hatasından dolayı kur bilgisini tekrar 3.52 olarak aldı. Ancak kur bilgisi gerçekte 3.53 olmalı. Alınan 3.52'lik kur'a göre işlemler yapıldı. 0.01 kuruş gibi görünse de para piyasası içerisinde bu çok büyük bir meblağ! Böyle bir durumun yaşanması ile kurumlar/kişiler ciddi zararlar görebilir.

Client mode'da aldığımızı varsayalım: 3.52'lik kuru aldık işledik herşey güzel gibi görünüyor ancak ack'yı gönderemedik. Ama aslında ilgili kurla işim bitti artık kullanmamam gerekiyor. JMS Server, ack alamadığı için mesajı tekrar gönderecektir.
Auto mode, ack'ın otomatik olarak gönderildiğini söylemiştik. Mesaj alındı, ack gönderildi. İlgili mesaj artık Queue'da bulunmayacaktır. Ancak mesajı aldıktan sonra işlerken bir hata oluştu. Bu durum da can sıkıcı oluyor.

Cevap: Transactional session. Özellikle yukarıda belirttiğim gibi işin içinde para var ise hangi yaklaşımın seçileceği daha da önemli olmaktadır. Transactional session, JMS vendor'e göre özelleşebilir ancak en iyi seçim olacaktır. Consumer, tamamen mesajın kontrolünü ele almaktadır. Yukarıda birkaç senaryo ile örnek vermeye çalıştığım durumlardan biri oluşması durumunda mesaj commitlenebilir yada rollback yapılabilir.

Auto mode'da iki durumu inceleyelim;
Auto mode ile consumer bağımsız ack gönderimi yapılacağını ifade ettik. Aşağıda iki senaryo bulunuyor.

**Senaryo 1;**

![message handling crashed](/images/java-platform/java-ee/jms/jms_situations.png)

Senkron haberleşmede hatırlarsanız receive methodunu kullanarak mesaj alıyorduk. Uygulama mesajı aldı, ACK JMS'e gönderildi ve mesaj JMS Server'da silindi, artık geri dönüşü yok. Ancak mesajı işlerken bir hata aldık. **Bu durumda mesaj kaybedilmiş olacaktır!**

**Senaryo 1;**

![message handling crashed](/images/java-platform/java-ee/jms/jms_situations2.png)

Asennrkon haberleşme yapıyoruz, Listener'a bir mesaj geldi, aldık işledik güle güle dedik. Ancak ack JMS Server'a giderken crash oldu. Bu durumda mesajı kullandık ama mesaj hala JMS server'da var ve tekrar gönderilecek ack crash olduğundan dolayı. Yukarıda ifade ettiğim 3.52'lik kuru aldım kullandım işledim ama bana tekrar aynı kur bilgisi gelecek durumu oluşmuş oldu. **Senaryo 1 de mesajın kaybedilmesi söz konusu iken ikinci senaryo da ise duplicate mesaj durumu oluşacaktır.**

Senaryoları [draw.io](https://www.draw.io) ile çizdim, xml'leri şurdan bulabilirsiniz. [senaryo 1](/attachment/jms_situations.xml) [senaryo 2](/attachment/jms_situations.xml)

ACK dediğim gibi JMS içerisinde çok önemli bir role sahiptir. ACK pattern, JMS vendor'e göre de değişebilir. Bazı vendor'lerde ek ack mode'lar bulunmakta hatta no ack gibi modlar da bulunmaktadır. İnclemenizi tavsiye ederim.

#### Redelivery Approach
JMS bir mesajı karşı tarafa gönderemedi, ancak göndereceğini garanti ediyor bize. Ancak biz bazı durumlarda bunu istemeyebiliriz. Az önce de ifade ettiğim gibi mesela 3.52TL kuru iletilemedi ancak JMS tekrar göndermeye çalışacak. Bu durum bizim açımızdan iyi mi kötü mü?

* **Tekrar gönderdiği durum :** Mesaj kaybolmadı evet bu güzel birşey. Ancak kur değişmiş olabilir, sn'ler içerisinde bazı kur'lar defalarca update alabiliyor. Bu durumda stale bir kur bilgisi karşı tarafda işlenmiş olacaktır.
* **Tekrar gönderilmediği durum :** Mesaj kayboldu :)

Bu iki duruma ek olarak şöyle de bir yaklaşım kullanabiliriz. İlk durum için yani bize güncel kur bilgisi lazım olduğu için Redelivery mode olarak false kullanmamız gerekir. İkinci durum da ise örneğin kur'larla ilgili genel bir açıklama/haber mevcut. Biz bunu başta gönderemedik. Mesajın önemi aslında çok değil yada tekrar gönderilmesi çok problem oluşturmayacaktır.
Bu durumda Redelivery mode olarak true seçebiliriz, Redelivery delay olarak uzun bir süre vererek network trafiğini rahatlatabiliriz, Redelivery count vererek sadece belli bir adet kadar tekrar denemesini isteyebiliriz.

#### Durable and Non-Durable Message
JMS'in özelliklerinden biri olarak da time independent olduğunu söylemiştik. Burada durable olan mesajlar JMS tarafından persist edilir ve karşı taraf hazır olup mesajı alana kadar da mesajı korur. İhtiyaca göre persist edilip edilmeyeceğine karar verebiliriz. Yukarıdaki 3.52 kur örneğini tekrar verelim, bu durumda non persit olarak mesajı gönderebiliriz.
Diyelim ki mesajı persist ediyoruz bu durumda timeToLive değeri set edebiliriz. Arkadaş bu mesaj 1 dk için geçerlidir, 1dk içinde aldın aldın alamadın güle güle diyoruz :)

#### Choose the Message type
JMS'de farklı tipte mesaj gönderebileceğimizi söylemiştik. Bunlar, text message, byte message, map message, object message vs idi. Byte message memory olarak en az yer kaplayan mesaj tipidir. İhtiyaca göre ilgili mesaj tipi seçilebilir. Object message seçilirse mesela karşı tarafa gönderilmesini istemediğimiz field'ları transient ile işaretleyebiliriz, bu da network trafiğini ve memory'i rahatlatacaktır.

#### Message Consume type
Yine ihtiyaca göre senkron veya asenkron seçilebilir. Ancak tip önemsiz ise asenkron seçilmesi daha iyi olacaktır. Event based yaklaşımla JMS'den herhangi bir mesaj gelene kadar başka bir işi yaptırabiliriz uygulamaya. Senkron seçilmiş olsa bile mutlaka bir receiveTimeout süresi verilmeli ve bu süre çok uzun tutulmamalıdır.

#### Message Selector
JMS ile Queue yada Topic'de bulunan mesajlardan selector yardımı ile spesific mesajları alabiliriz. Örneğin kur bilgisi 3.50TL'den fazla olan mesajları bana getir diyebiliriz. Bu tip durumlarda eğer mesajın içeriği  ile ilgili bir logic işleminiz yok ise selector kullanmamanız daha performanslı olacaktır.

Yaptığımız JMS örnekleri Java SE üzerindeydiler, bir sonraki yazımızda Java EE içerisinde kullanımını göstermeye çalışacağız.

Multlu ve şen kalın.

~ A.Akkus
