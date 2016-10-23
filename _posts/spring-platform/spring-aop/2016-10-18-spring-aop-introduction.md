---
layout: post
title: Spring AOP Introduction
permalink: /blog/spring-platform/spring-aop-tutorial/spring-aop-introduction
---


Merhaba arkadaslar, bugün AOP paradigmasına giriş yapacağız. Klasik ilk yazılarımda olduğu gibi, nedir ne dedildir niçin kullanacağız gibi konulara değineceğim.
<h3>AOP (Aspect Oriented Programming)</h3>
İlk olarak bir programlama dili değildir. Aspect'in kelime anlamı endişe/çehre/cephe/ilgi gibi anlamları vardır. AOP'u tek başına ifade etmese de çoğu durumda işe yarayacaktır.

AOP, ilgi odaklı programlama. Proje, modül, class vb birimler de ilgilerin ayrılması, sorumlulukların belirlenmesi, single responsibility principle gibi kavramlar AOP terminolojisinde oldukça yaygındır.

Neden AOP'a ihtiyaç duyarız onu sorguyalaım;

AOP bir programlama dili olmadığından ve bir yaklaşım olduğundan dolayı AOP kullanmak zorunda değilsiniz, Java'ya özgü birşey de değildir. Şimdi bir Java class'ı tahayyül edin. Bu class klasik bir DAO olsun ve veritabanı ile ilgili işlemler de bulunsun.

Genel olarak şu adımların methodun içerisinde olmasını bekleriz;

- Connection Taken : Veritabanı bağlantısının alınması/kapatılması.
- Transaction : Atomik bir işlem yapılması gerekiyor.
- Query : Çalıştırılacak sorgu ve alınacaksa result. Bu kaynakların oluşturulması/kapanması.
- Exception Handling : Methodun runtime anında herhangi bir hata alması durumunda bunu handle etmesi için gerekli kod kısımları.
- Logging : DB'ye gönderilecek sorgu/parametreler vs loglanır ki uygulamanın anlık davranışı hakkında fikir sahibi olunabilsin.
- Extra : Bu methodun başka servisleri çağırdığını ve kullandığını da düşünelim.

Methodun asıl amacı aldığı bilgiyi db'de çalıştırması olmasını bekleriz. Ancak en iyi planlanmış OOP modülllerinde dahi bu imkansıza yakındır. Method amacı dışına çıkarak exception handling, logging gibi davranışları da üstlenmektedir.

Burada bize AOP yardımcı olacaktır. Dikkatinizi çekerim, AOP, OOP yerine **kullanılmayacaktır.** AOP yada OOP birbiri yerine geçmez, birbirini tamamlayan paradigmalardır. OOP + AOP ile işi ehline vereceğiz. Herkesin sorumluluğu net olarak ifade edilecek olup, bir cambazı iki ipte oynatmayacağız.

Yukarıdaki örneğe geri dönecek olursak AOP içerisindeki birkaç terminolojiye değinmemiz gerekiyor.
<h4>Seperation of Concerns</h4>
Endişelerin ayrılması olarak çevrilse de ben davranışların/özelliklerin ayrılması olarak tanımlamayı tercih ederim. Şöyle ki, az-çok java paketleri ile uğraştı iseniz birbiri içerisinde benzer davranışları sergileyen class'ların bir araya toplandığını biliyorsunuzdur. Burada endişeleri aynı olan class'lar değil, davranışları aynı olan class'lar bir araya toplanır. Örneğin; com.caysever.utils paketi altında DAO işlemi yapan bir class bulunamaz, bulunmaması gerekir!

Örneğin markete gittiniz ve markette ne nerde belli değil! Çay alacaksınız ama ara ara bulmak nafile. Markette 1000 kalem ürün olduğunu düşünün ve bulmaya çalışın. İmkansıza yakın değil mi? Reel projeler de de durum böyledir. Oysa markette her kalem/ürün SoC'a göre ayrılmış olsa yani kahvaltılıklar bir yana, sebze/mevye bir yana gibi tüm ürünler sahip olduğu özelliklere göre sınıflandırılıp ayrılmış olsa istediğiniz ürünü çok daha kısa sürede bulabilecektiniz. Sebze/Meyve reyonunda çay aramıyorsanız tabi ki de :)

Davranış dedik ya şunu da ekleyelim yukarıdaki örneğe, **com.cayserver.utils** altında ki **XMLUtils** Xml ile çalışırken yardımcı olacak bir classtır, **DBUtils** ise db ile çalışırken yardımcı olacak bir classtır. Dışarıdan bakıldığında endişe ile bunu tanımlamak yanlıştır. İfade ettiğimiz class'ların davranış biçimi "yardımcı" olmaktır. Bu class'lar yardımcı class'lardır bu nedenle davranışları da benzerdir. Buradan da benzer davranışlara benzer ilgilerin sebep olduğunu çıkartabiliriz.

Dışarıdan kodu inceleyen bir arkadaş, com.cayserver.utils paketi altında yardımcı sınıfları bulabileceğini bilir. Yine com.caysever.dao paketi altında veritabı ile alakalı sınıfların olduğunu bilecektir. SoC paradigması **kod level -&gt; method level -&gt; class level -&gt; package level'a** kadar hatta project level'a kadar çıkabilir. Benzer davranış sergileyen kısımların birbirinden ayrılması ile **reusable, robust, loose coupling, high cohesion** tanımlamarına uyan uygulamalar yazılabilecektir.

Soc'un daha iyi anlaşılması için şunu okuaylım;
> Concerns are the different aspects of software functionality. For instance, the "business logic" of software is a concern, and the interface through which a person uses this logic is another.

> The separation of concerns is keeping the code for each of these concerns separate. Changing the interface should not require changing the business logic code, and vice versa.

SoC'a verilebilecek örnekler Internet Protocol Stack, MVC, AOP gibi kavramlar verilebilir.

#### Crosscutting Concerns
Modulleri, Class'ları sahip oldukları davranışlara/özelliklere göre sınıflandırmalıyız dedik, öyle de yaptık.  Ama bir sorunumuz var. Kesişen davranışlar. Birbirinden tamamen farklı sınıflarda/moduller de hatta projeler de olmalarına rağmen aynı davranışı içerebilen kısımlardır diyebiliriz.

Yukarıdaki market örneğine dönelim. Kahvaltılık reyonunda da baklagiller reyonununda da ortak noktalar var. Dışarıdan bakıldığında yok gibi ama var, inceleyelim. İki reyonda da ürünler **ambalajlanmıştır, fiyatlandırılmıştır.**

Bu iki ortak nokta birbirinden farklı olan iki kısmı birleştirdi. Programlama dünyasına geçelim. DAO katmanında veritabanı işlemlerini yaptık, Mail Service katmanımızda da mail gönder vs yapıyoruz. Bu iki katman içerisinde de loglama, exception handling gibi ortak noktalar bulunmaktadır.

Örnek bir şekil ile tahayyül edelim;

![Crosscutting concerns](/images/spring-platform/spring-aop/crosscuttion_concerns.png)


Yukarıda görüldüğü gibi DAO ve Mail katmanı birbirinden farklı ve bağımsız katmanlar olmalarına rağmen Exception Handling, Logging gibi davranışları da içerisinde barındırmaktadırlar. Exception Handling ve Logging davranışları, DAO ve Mail Service davranışlarını enine keser ve ortak bir nokta oluşturur.

Kesişen davranışlar genel olarak şunlardır; Logging, Exception Handling, Transaction, Caching, Resource pool vb.

Kesişen davranışlar aslında methodların yerine getirmek istedikleri davranışı doğrudan etkilemezler. Sadece sistemin çalışmasında yardımcı roller almaktadırlar.

Davranışların kesişmesi sonucu bazı kaygılar da ortaya çıkmaktadır. Bunlar Code Scattering(Kod Saçılması) ve Code Tangling(Kod Dağılması)'dır.

#### Code Scattering
Davranışın birden fazla modüle saçılmasıdır. Örneğimizde DAO katmanı ve Mail Service katmanına Logging saçılmış durumundandır.

#### Code Tangling
Bir modülün birden fazla davranışı içermesi ile alakalı bir durumdur.

## ASPECT ORIENTED PROGRAMMING
Yukarıda ifade ettigimiz tüm sorunlara AOP ile çözüm bulmaya çalışacağız. AOP, birbirinden bağımsız/ayrı görevleri olan ancak code scattering ve tangling durumlarını barındıran davranışların/özelliklerin birbirinden ayrılmasını sağlayan bir yaklaşımdır. Ben blog üzerinde Spring AOP konusuna değinecem. Spring AOP, Aspect Oriented Programming'in bir implementasyonudur. AspectJ ile Java içerisinde Spring bagımsız aop'u kullanabilirsiniz.

Spring AOP ile AspectJ arasındaki farklara kısmen değinebiliriz. AspectJ'nin SpringAOP'dan daha yetenekli olduğunu düşünüyorum. Spring ile haşır neşir olmamdan dolayı Spring AOP özelinde yazılar yazacağım.

AspectJ'de LTW(Load Time Veawing) yada Aspect compiler kullanmak yerine daha basit olan proxy-based Spring AOP kullanılabilir. AspectJ'nin gücü ise SpringAOP'dan daha fazladır. SpringAOP'da örneğin sadece method-execution pointcut kullanabiliyoruz. Detaylarına değineceğiz.

Giriş yazısını burada sonlandırıyoruz arkadaslar, bir sonraki yazıda AOP terminolojisinde bolca kullanacağımız advice yapılarına, jointpoing, pointcut gibi tanımlamalara yer vereceğiz.

Sağlıklı ve esen kalın.

~ A.Akkus
