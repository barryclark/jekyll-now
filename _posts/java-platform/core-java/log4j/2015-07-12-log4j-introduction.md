---
layout: post
title: Log4j Introduction
permalink: /blog/java-platform/core-java/log4j/log4j-introduction
summary: Merhaba arkadaşlar, blog'da Log4j yazılarıma başlıyorum. Başlamak bizden başarı Allah'tan.
---

Merhaba arkadaşlar, blog'da Log4j yazılarıma başlıyorum. Başlamak bizden başarı Allah'tan.

Log4j'nin şuan mevcut 2 versiyonu bulunmakta. Log4j ve Log4j2. Önceden Log4j 2 versiyonunu anlatmak istiyordum ancak yazılarımı Log4j üzerine yazıcağım. Hem Log4j2'nin yeni oluşu hem çalıştığım şirket içerisinde Log4j kullanıyor olmamdan dolayı bu karar verdim. Unutmayalım, yaptığımız her şey loglanmaktadır :)

> Everythings logging by Kiramen-Katibin.


### Log4j
Güvenilir, esnek, hızlı olan Java'da yazılmış open-source ve Apache lisanslı loglama frameworkudur. Geliştirilen büyük ve kapsamlı uygulamaların takibi, debug edilmesi, sistematik olarak kontrol edilmesi, farklı hata seviyelerine olan gereksinimlerden dolayı loglama framework'ları ortaya çıkmıştır. Log4j'nin mimarı da bir Türk olan Ceki Gülcü'dür.

Loglama kavramı bir uygulamanın çalışma zamanı hakkında bilgi vermesidir. Tabi bu bilgi biraz özet şekilde, bunun detaylandırılmasına bakacağız.

Log4j hakkında bilgiler vermeye devam edicem ancak ne için kullanmalıyız ona bakalım;

Log4j java'da yazılmış olmasına rağmen diğer programlama dillerine de entegre edilebilir. C/C++, C#, Python vs gibi diller için de log4j kullanabilirsiniz.

Log4j'nin başlıca özelliklerine bakalım;

* Thread safe'dir.
* Loglama hiyerarşileri mevcuttur. İsim merkezli loglama kullanılabilir.
* Multiple output verilebilir loglama için. Aynı anda consola yazılırken file yada db yada mail ile log yazılabilir.
* Log4j property'leri runtime anında değiştirilebilinir.
* Farklı log levellera sahiptir. Bu sayede önceliğe göre log yazılabilir.

Log'lamanın avantajı büyük projelerde ortaya çıkmaktadır. Uygulamanın ne yaptığı, durumu ve o anki davranışı hakkında bilgi verir. Loglama yapılırken, sistematik, izlenebilir, mantıklı bir log mimarisi seçilmelidir. Keyfiyete göre değil faydalı bilgiler ile log tutulmalıdır. Nerelerde log kullanılacağı, hangi durumlarda kullanılacağı gibi loglama konumları doğru ayarlanmalıdır. Örn; Bir java web uygulamasında context initialize olduğunda veya destroy olduğunda loglama yapmak doğru bir seçenektir. Kısacası o bilgi sizin için ve uygulamanız için önemli ise mutlaka loglanmalıdır. Kötü tasarlanmış bir loglama yapısı faydadan çok zarar getirebilir, uygulamaya ekstra yük yükleyebilir.

Loglamanın faydalarına gelicek olursak;

* Kolay debug edebilme.
* Geriye dönük log takibi. Sektorde projeye göre log dosyaları belli süreler boyunca saklanır. Şuan çalıştığım şirkette uygulama log dosyaları 10, web servis logları 30 güne kadar tutulmaktadır. Burada bu işi Log4j yapıcaktır merak etmeyin. Hemde önceki log dosyalarını zipleyerek :)
* Kolay test etme, uygulamaların bakımını sağlama.
* Filter ile application-spesific/uygulamaya özel logların tutulması sağlanır. Loglanıcak olan bilgi analiz edilir ve filtrelenir.
* Loglama config bilgileri properties file yada xml file'da tutulabilir.

Log4j mimarisine bakalım;

Log4j genel olarak 2 tane objeden oluşmaktadır. Bunlar; Core Object ve Support Object. Core object, log4j frameworkunu kullanmak için gerekli olan objedir. Support object ise opsiyoneldir.

Genel olarak blog yazılarımda Core Object konusuna değineceğim. Core Object, 3 tane objeden oluşmaktadır toplamda. Bu objeler birbiri ile ilişkili olup sonuç olarak bilgiyi log'lama görevi görmektedir.

Bunlar;

* Logger Object
* Layout Object
* Appender Object

<h4>Logger Object</h4>
Log4j mimarisinin en üst noktasında bulunur. Loglamanın yapıldığı kısımdır. Log4j için merkez görevi görür. Tüm loglama operasyonlarının yapıldı kısımdır. Sadece configurasyon ayarları dahil değildir. Uygulama, bir logger instance alır ve bunun üzerinden loglama işlemi yapar.
<h4>Layout Object</h4>
Loglamanın hangi formatta yapılacağını belirtir. Custom olarak kendimize özel loglama pattern'i oluşturabiliriz. Web uygulamalarında hostname, ip vs gibi değişkenler pattern'lara eklenebilir.
<h4>Appender Object</h4>
Appender, logların yazılacağı hedefi belirlemeye yarar. Log4j, burada birden fazla yani multiple logging desteklediğinden dolayı console, file, db, mail gibi appenderları destekler. Appender object, Layout objecti kullanır.

Yukarıdaki objelerin tanımlamarına ve kullanımlarına değineceğim daha sonra. Log4j mimarisine bakalım ve yukardaki objelerin mimarideki konumlarına göz gezdirelim;

![log4j arch](/images/java-platform/core-java/log4j/log4j-arch.jpg)

Bir Java programında Log4j'nin konumu yukardaki gibidir. Logger, Layout ve Appender objectleri açıkladık.

**LogManager :** Loglamanın yönetilmesinden sorumludur. Config dosyasını okur ve initalize işlemlerini başlatır.

**Filter Object :** Logları analiz ederek filtrelenmesini sağlar ve loglamanın yapılıp yapılmayacağına karar verir. Bu sayede uygulama özelinde log tutulabilir. Appender objeleri farklı filter objelerini içerebilirler.

**ObjectRenderer :** Logging frameworka gönderilen objeleri string olarak temsil etmeyi sağlar.

**Level Object :** Log4j mimari, bize 7 farklı log level sunar. Bunlar OFF, FATAL, ERROR, WARN, INFO, DEBUG, TRACE, ALL. Log levelları sırasıyla yazdım. En tepede **all** level ve en altta **off** bulunmaktadır. All level seviyede kullanılırsa her log bilgisi appender ile belirlenmiş kaynağa yazılır, off için ise tam tersi durum geçerlidir. Yukarda aşağıya doğru bir sıralama vardır. Log level WARN ise WARN, ERROR ve FATAL için loglama yapılacaktır ancak altı kullanılamaz. Development aşamasında log level olarak debug kullanılabilir.

Yazımı burada sonlandırmak istiyorum arkadaslar. Bir sonraki yazıda görüşmek üzere.

Mutlu kalın, kod'la kalın ve bol bol Çay için :)

~ Alican Akkus.
