---
layout: post
title: Spring MVC Introduction
---

Merhaba arkadaslar, bu yazımda Spring MVC konusuna giriş yapacağız.

Öncelikle Spring'in ne olduğundan, neyi amaçladığından, kime ne olarak alternatif olduğundan bahsetmek gerekir.
<h3>SPRING PLATFORM</h3>
İlk sürümü 2003'de çıkan, open source olan ve minimum core paket boyutu 2mb civarı olan, sağlam/güvenilir/esnek/hızlı ve basitçe uygulamalar yazmanızı sağlayan bir platform'dur ve hemen hemen dünyanın tamamında kullanılır.

Bazı kimseler Spring'e bağımlı kalmamak için bulaşmak istemezler. Ama bana göre eğer destekli/mantıklı/ihtiyaca göre servis/çatı/platform seçilirse bunun adı bağımlılık olmaz, tekerleği yeniden icat etmeye gerek yok. Ayrıca Spring, birçok platform/teknoloji ile de rahatça entegre olabilmektedir. Mesela, Spring MVC yazdığım bir uygulama da J2EE security kullandım, bu bir örnektir.

Spring'in bu kadar ünlü olmasını sağlayan birkaç en temel yaklaşım vardır. Bunlara ufaktan değineceğim ama aslında çok derin konular olduğundan external kaynaklardan bolca okumanız gerekmektedir.

Evet, Spring koca bir platform'dur. İçerisinde birçok modül barındıran bir ekosistemdir. J2EE değildir ona alternatiftir. J2EE'de Java kullanan bir çatıdır keza Spring'de Java'yı kullanarak kendi ekosistemini oluşturmuş durumdadır.

Aşağıdaki görselde Spring'in ekosistemini görebilirsiniz;

<img class="size-full wp-image-1461 aligncenter" src="http://alicanakkus.com/wp-content/uploads/2016/08/spring.png" alt="spring" width="694" height="514" />

Spring, belli amaçlar için belli bölümlere ayrılmıştır. Minimum bir Spring uygulaması yazmak istiyor iseniz en azından Core Contaıner'ı kullanmış olursunuz. Bunun yanunda ihtiyaca göre birçok modülden yararlanabilirsiniz. Spring'in bir platform oldugundan söz etmiştik. Şuradan Spring projelerine bakabilirsiniz : <a href="https://spring.io/projects">https://spring.io/projects</a>
<h4>Spring neden bu kadar ünlü?</h4>
DI(Dependency Injection), IOC(Inversion of Control), AOP(Aspect Oriented Programming) gibi çok kesin çözümler ile developer'ın hayatını kolaylaştıran birçok yaklaşımı gerçeklemesinden dolayı Java dünyasında oldukça popüler olmuştur. Karmaşık ve zor logicleri EJB gibi yapılardan ziyade pure POJO class'ları ile gerçekleyebiliyor desem hoşunuza gider sanırım :) Bu yüzden tercih edilmektedir.
<h4>IoC(Inversion of Control)</h4>
Inversion of Control, kontrolün el değişmesi anlamındadır. Object oritented bir dil olan Java'da nesne oluşturmanın tek yolu new anahtar kelimesi ile nesne oluşturmaktan geçer. Developer, nesne oluşturmaktan onu yönetmeye kadar nesnenin tüm lifecycle'ına hakim olması gerekmetedir. IoC ile bu görevi developer'dan alıp bir Contaıner'a verecegiz. Burada amaç daha önce developer'ın ugrasmak zorunda olduğu birçok şey'i contaıner'ın yapmasını sağlamaktır.

Bu sayede biz developer'lar sadece uygulamamıza/logic'imize odaklanabiliriz. Peki IoC Contaıner bunu nasıl yapıyor veya yapacak?

Yukarıda belirttigim gibi new'leme dışından hiçbir şekilde yeni nesne oluşturulamaz. IoC Contaıner'da arka planda bizim için new'leme işlemini yapacaktır. Daha detaylı olarak farklı kaynaklardan yararlanmanızı tavsiye ederim.
<h4>DI(Dependency Injection)</h4>
DI, IoC'un bir implementasyonudur. Bağımlılıkların zerk edilmesi/enjekte edilmesi gibi birçok yerde açıklamalar mevcut ama bana anlamsız geliyor. Neyi zerk ediyoruz? Zerk ne? enjekte de ne oluyor? hasta? doktor?

Dependency Injection en temelde bir işi biri yapıyor ise tek başına ve/veya kendi yapabilmelidir anlamı taşır. Bir işi yapmak için başka bir nesneye/service bağımlı iseniz yada bağlı olduğunuz herhangi birşey'in ömrü ile ömrünüz belirleniyorsa orada sıkıntı vardır ve DI uygulanmalıdır. Mesela,

Örneğin;

``` java
// An example without dependency injection
public class Client {
    // Internal reference to the service used by this client
    private Service service;

    // Constructor
    Client() {
        // Specify a specific implementation in the constructor instead of using dependency injection
        service = new ServiceExample();
    }

    // Method within this client that uses the services
    public String greet() {
        return "Hello " + service.getName();
    }
}
```

Yukarıdaki örnekte Client'ın greet ile hello diyebilmesi için service nesnesinin null olmaması gerekiyor. Peki bu service nesnesi nasıl oluşuyor?

Cevap olarak Client nesnesi oluşurken constructor içerisinde yer alıyor olacaktır. Peki biz dışarıdan bir servis veremicek miyiz? Service objesi Client'sız var olamayacaktır. Burada Client ile Service arasında tightly coupling(sıkı bağ) bir birliktelik mevcuttur.

En kötü senaryo ile bir injection yapalım, bağımlılığı ortadan kaldıralım yani. Service objesi Client dışında da var olabilsin yani.

``` java
// An example with dependency injection
public class Client {
    // Internal reference to the service used by this client
    private Service service;

    // Constructor
    Client(Service service) {
        // Specify a specific implementation in the constructor of using dependency injection
        this.service = service;
    }

    // Method within this client that uses the services
    public String greet() {
        return "Hello " + service.getName();
    }
}
```

Aslında ne yaptık? Constructor bir injection ile servisi dışarıdan aldık. Bu sayede Service objesi Client'dan önce var olabilecektir. DI olmadan yaptıgımız örnekte Service objesi ancak ve ancak Client objesi oluştuktan sonra oluşabilecekti. Setter injection ile yapalım;

``` java
// An example with dependency injection
public class Client {
    // Internal reference to the service used by this client
    private Service service;

    // Constructor
    Client() {
       
    }

    public void setService(Service service){
        this.service = service;
    }

    // Method within this client that uses the services
    public String greet() {
        return "Hello " + service.getName();
    }
}
```
Aynı injectionu, bağımlılığı kaldırmak için setter ile yaptık. Yazdığınız tüm uygulamalarda class'lar arası olsun, servisler arası olsun veya logic'ler arası olsun her zaman DI uygulamaya çalışın. Bu ilerde kodu değiştirmek istediginizde asıl size faydalı olacaktır. Birkaç sene sonra elinize bomba almamak için bunu yapmalısınız. Temel felsefe, loose coupling ve high cohesion ile uygulama yazmaktır.

Bunlar kısa birer örneklerdi, detaylarına lütfen bolca bakınız.

Konumuza dönelim, SPRING MVC.
<h4>Spring MVC</h4>
Spring MVC, Spring'in diğer tüm modüllerini kullanabileceginiz, sağlam, MVC mimarisinde web uygulamalarını oluşturabileceğiniz bir Spring modülüdür. Merkezi bir Servlet üzerinden tüm işlemler gerçekleşir.

NOT : Her zaman belirtmeye gayret gösterdim. Tekrar dile getiriyorum, dikkate alınız lütfen. Şaşıracaksınız ama Spring MVC'nin de temeli Servlet'tir. Servlet'lerden kurtulamayız :) Her zaman ilk tavsiye olarak Servlet'lerin öğrenilmesini tavsiye ettim. Arkadaslar, Java Web'in temeli Servlet'tir. Servlet'siz hiç birşey yapamazsınız.

NOT 2 : Spring MVC öğrenmek için Servlet ve kısmen de olsa JSP bilmeniz gerekiyor. 19 adet Servlet&amp;JSP yazılarıma <a href="http://alicanakkus.com/java-ee/servletjsp/servlet-yazi-dizisi/">şuradan</a> ulaşabilirsiniz.

Spring MVC'in mimarisine bakalım;

<img class="size-full wp-image-1462 aligncenter" src="http://alicanakkus.com/wp-content/uploads/2016/08/Screenshot-from-2016-08-14-18-58-36.png" alt="Screenshot from 2016-08-14 18-58-36" width="735" height="471" />

Spring MVC, request oriented bir mimariye sahiptir. JSF gibi component based değildir, component based'ın dez avantajları yoktur bu nedenle. Spring MVC en temelde bir Front Controller ile çalışır.

Front Controller, tüm request'lerin ana bir merkezden geçmesini sağlar. Front Controller design pattern'a bakabilirsiniz. Neden Front Controller kullanılmış derseniz ise cevap olarak tüm isteklerin tek bir merkezden kontrol edilmesi ve yönlendirilmesi amacıyla yapılmıştır.

Front Controller en basit olarak bir Servlet'tir. URL mapping olarak Spring'in handle etmesi istediğiniz request'ler için bir mapping yaparsınız(misal /*) ve bu isteklerin tamamı FrontController tarafından ilk olarak yakalanır. DispatcherServlet olarak adlandırılır.

<img class="size-full wp-image-1463 aligncenter" src="http://alicanakkus.com/wp-content/uploads/2016/08/Screenshot-from-2016-08-14-19-03-54.png" alt="Screenshot from 2016-08-14 19-03-54" width="583" height="498" />

Yukarıdaki figür'den sonra bir request'in ilk çıkış anından son kullanıcıya ulaşmasına kadar gerçekleşen adımları belirtelim;
<ol>
 	<li>Client/Browser herhangi bir sayfaya bir istekde bulunur.</li>
 	<li>Spring Front Controller(Dispatcher Controller) bu isteği yakalar.</li>
 	<li>Gelen istek ile ilişkilendirilmiş bir Controller arar. HandlerMapping yardımıyla isteği handle edecek controller aranır,  index.jsp için şu controller çalışsın diyebilirsiniz. Controller bulunamaz ise request lifecycle kesilir ve hata dönülür.</li>
 	<li>Controller ile ilişkilendirildi ise istek yoluna devam eder. Controller, Model ile gerekli aksiyonları gerçekleştirerek bir view döndürür. DispatcherServlet, ViewResolver yardımı ile view'ı bulur ve var ise model bilgilerini view'a bind eder. View Resolver olarak JSP, Thymeleaf gibi çözümler kullanılabilir. İkisi ile de örnekler yapacağız.</li>
 	<li>Request'e response olarak içerisine model bind edilmiş bir view döndürülür.</li>
</ol>
Tüm akış aşağıdakine benzerdir;

<img class="size-full wp-image-1464 aligncenter" src="http://alicanakkus.com/wp-content/uploads/2016/08/lifecycle.jpg" alt="lifecycle" width="638" height="479" />

&nbsp;

DispatcherServlet'i temel olarak url mapping yapan birşey gibi görmeyin. Spring IoC ile beraber kullanabileceğiniz ve diğer tüm Spring özelliklerini kullanabileceğiniz bir yapıdır.

Giriş yazımızı burada sonlandırılıyoruz arkadaslar. Bir sonraki yazıda DispatcherServlet tanımı yapmayı bir örnek üzerinden inceleyeceğiz ve daha da detaylandıracağız.

Mutlu ve esen kalın.

~ A.Akkus
