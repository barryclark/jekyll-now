---
layout: post
title: Servlet Container
permalink: /blog/java-platform/java-ee/servlet-jsp/servlet-container
summary: Merhaba arkadaşlar , Servlet&Jsp yazılarımıza 2.ci yazı ile devam ediyoruz. Bugün Servlet hakkında yine birkaç bilgi verip , Servlet Contaıner'ın görevlerinden biraz bahsedicez.
---

Merhaba arkadaşlar , Servlet&Jsp yazılarımıza 2.ci yazı ile devam ediyoruz. Bugün Servlet hakkında yine birkaç bilgi verip , Servlet Contaıner'ın görevlerinden biraz bahsedicez.Kullanacagımız Servlet Motoru Tomcat olacaktır. Bugün Tomcat kurulumunu da İntellij İdea üzerinden gerçekleştireceğiz. Başlayalım :) Daha önce söylediğimiz gibi Servlet'ler sunucu ile istemci arasında dynamic bir yapı oluşturmamızı sağlar.

Peki nasıl olur bu ? biraz ona bakalım;  

![servlet arch](/images/java-platform/java-ee/servlet-jsp/servlet-arch.jpg)


Yukarıdaki servlet mimarisine bakacak olursak kaba taslak bişeyler anlayabiliriz. Web browser yani Client bir HTTP protokolü yollar Server'a.
Server yani Container bunu ilgili Servlet ile eşler. Ve Servlet kendi içerisinde gerekli işlemleri yapar. Bu işlem login kaydı, database veri alma/veri çekme vs. kompleks yada ufak işlemler de olabilir.

Unutmayalım Server ile Client arasındaki dil HTTP 'dir. Daha Önce Servlet'lerin CGI'den farkına değinmiştik hatırlarsanız. Bunlardan biri CGI'nin  her istek için ayrı bir proses olusturması ve buna bağlı olarak performans kaybı yaşaması oldugundan söz etmiştik.Şimdi bu konuda ufak bir bilgi vermemiz lazım.

Servlet'ler her istek için sadece ama sadece tek bir tane Servlet instance oluşturulur.Yani her request aynı Servlet üzerinde çalışır. Biraz karışık gibi gelse de hiç öyle değil :). Gelen her bir request için Contaıner bir Thread oluşturur.Ve yeni iki request(istek) ve response(cevap) oluşuturur. Bunlara daha sonra tekrar değinicez .

Şimdilik şunu unutmayalım ; Her istek için ; Tek Servlet instance , farklı Thread , farklı request ve response nesneleri kullanılır. ^ Burada endişelenicek bir durum yok , Servlet Contaıner bunu bizim için kendisi halledicektir . Biz programımıza odaklanalım :)

### Servlet'in Görevleri
Servlet'in görevlerini birkaç madde ile şöyle sıralayabiliriz ;

* Client(Browser)'dan açık(explicit) şekilde bilgi okur. Bu bilgi Web page'den html ile gelen bilgi de olabilir yada Applet yada diger HTTP Client programlarından olabilir.
* Kapalı(implicit) olarak data döndürür.Bu cookie, media yada browserin anlayabileceği baska data da olabilir.
* Datayı kullanrak sonuç üretir , database'ye bağlanabilir yada bir web service'i call edebilir.
* Responce olarak istemciye ; Html , cookie ayarları , cashing parametreleri vs. gibi veriler döndürebilir.
* Kısaca , size kalmış :)


### Servlet Api Hierarchy
javax.servlet ve javax.servlet.http paketleri servletleri yazmamıza yarayan paketlerdir. Bir şema ile bakalım buna ;  

![servlet Hierarchy](/images/java-platform/java-ee/servlet-jsp/Servlet-Hierarchy.png)

Bu paketteki class'lar Java specifiacation'u gerçeklerler. Bizi ilgilendiren en önemli kısım HttpServlet sınıftır.Daha sonra detaylıca deginicez. Şunu bilelim ki ; Yazacagımız her Servlet , Servlet(javax.servlet.Servlet) arabimini implemente eder.Bu interface şu methodları declare eder;
##### javax.servlet.Servlet;

* **public abstract void init(ServletConfig paramServletConfig) throws ServletException ->** Servlet'imiz için çok önemli bir methotdur.Servlet Contaıner , bu methodu Servlet'i initalize etmek için çağırır. Parametre olarak ServletConfig objesi alır.Bu **init** methodunun bir Servlet'in yaşam döngüsünde sadece bir kez çalıştıgını bilmemiz lazım.**init** methodunun çalışması bitene kadar Servlet istekleri karşılayamaz! . ; Bu methodu db connect gibi kaynakları initalize etmek icin manuel olarak biz yazabiliriz.İlerde deginicez insaAllah :)</span></span>
* **public abstract ServletConfig getServletConfig() ->** Servlet için bir config objesi döner. Objede initialization ve startup configure ayarları bulunur Servlet için . Bu methodu kullanarak init(daha sonra deginicez) parametrelerini web.xml(deployment desciriptor , daha sonra deginicez :)  ) alabiliriz . Yada Servlet 3.0 ile Annotation olarak da elde edebiliriz.
* **public abstract void service(ServletRequest req, ServletResponse res)** throws ServletException, IOException ->** Servlet'lerin requesti karşılamaya başladıgı yerdir. Servlet Contaıner herhangi bir request(istek) aldıgında yeni bir Thread olusturur ve service methoduna request ve response nesnelerini parametre olarak paslar .Servlet multi-threadingdir , bunu thread-safe yapabilmek icin service methodunu synchronized yaparak sağlayabliliriz.</span>
* **public abstract String getServletInfo() ->** Servlet hakkında bilgi döner.Author , version gibi.
* **public abstract void destroy() ->** Yine Servletimiz için önemli bir methoddur. Bir Servlet lifecycle'de destroy methodu sadece bir kez çağrılır! Destroy methodu iki zamanda çağrılır;
  1. Contaıner shut down oldugunda.
  2. Application refresh oldugunda


### Servlet Contaıner'ın görevleri
Web Serverin görevinin en temel tanımı , gelen request isteği karşılayıp response olarak cevap döndürmektir. Web Server Html dilini bilir ve Http protokolu ile çalışır. Biz Apache Web Server kullanacagız . Servlet ve Jsp dosyalarını koşturmaya yarayan web server olarak Tomcat kullanıcaz. Not : Web Server ile Application Server aynı şey değildir .App Serverin ek özellikleri vardır.Şimdilik bunu bilelim. Görevleri ;

* **İletişim** ; Servlet ile Web Server arasındaki iletişimden sorumldur.
* **Lifecycle** ; Servletin yaşam döngüsü tamamen Contaıner'in gorevindedir . Servletin yüklenmesi , initalize edilmesi ve destroy edilerek sonlanması contaıner'in gorevleridir.
* **MultiThread Support**; Contaıner'ın her request için aynı Servlet üzerinde çalışacak farklı Thread'ler oluşturacagını soylemiştik.
* **Declaretive Security**; Contaıner , web.xml dosyasını olusturur. Bu sayede hard-code yazılmadan , programın güvenirliği sağlanmış olur.
* **Jsp Support**; Jsp sayfalarının Java sınıflarına dönüşmesini Contaıner üstlenir.

Kısaca Contaıner'ın görevi ; İstek gelir -&gt; Contaıner bu isteği karşılar -&gt; İlgili Servlet ile eşlenir bu istek -&gt; Servlet'in bir objesi olusturulur ve ilk kullanıma hazırlama için initilaize edilir -&gt; Daha sonra service() methodu çağrılır ve gelen request'in tipine göre gerekli doPost,doGet yada doXXX methodunu çağırır ve request ve response objeleri methoda paslar. Ve gerekli işlemler method içerisinde yapılır. ^ Yularıda soylediğim bir Servlet'in ilk olusuturulma anı için gerçekleşen adımlardır . Servlet eger initalize edilmişse service() methodundan adımlar devam eder.


### İntellij İdea üzerinde Apache Tomcat kurulumu
İntellij üzerinde File -&gt; Setting ile ayarlar penceresini açalım  ve Application Servers seçeneğini seçelim ;

![tomcat install](/images/java-platform/java-ee/servlet-jsp/install-tomcat-1.png)

Tomcat Server seçeneğini seçiyoruz ve burada tomcat dosyamızı indiriyoruz -&gt; http://tomcat.apache.org/download-70.cgi
Zip dosyasını indirip herhangi bir yere çıkardıktan sonra yolunu vermemiz yeterli ;  

![tomcat install](/images/java-platform/java-ee/servlet-jsp/install-tomcat-2.png)   

Daha sonra Run -&gt; Edit Configuration ile yeni penceremizi açıyoruz ;

![tomcat install](/images/java-platform/java-ee/servlet-jsp/install-tomcat-3.png)     

Evet tomcatimiz kurulu  ve varsayılan Http portu 8080 olarak , hostname olarak da localhost kullanıyoruz. Dilersek port çakışmaları durumunda bu portları değiştirebiliriz.

 ^ Bugünlük bu kadar arkadaslar , bir sonraki yazımızda ilk Servlet'imizi yazmış olucaz ve bazı doXXX methodlarına bakmış olucaz. Mutlu kalın , kod'la kalın ve bol bol Çay için :)

~ Alican Akkuş
