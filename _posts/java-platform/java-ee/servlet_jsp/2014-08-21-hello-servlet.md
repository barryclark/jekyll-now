---
layout: post
title: Hello Servlet
permalink: /blog/java-ee/servlet-jsp/helloservlet
summary: Merhaba arkadaşlar , bugün Servlet&Jsp yazı dizimizin üçüncüsü ile beraberiz.
image: /images/java-platform/java-ee/servlet-jsp/hello-servlet.png
---


Merhaba arkadaşlar , bugün **Servlet&Jsp yazı** dizimizin üçüncüsü ile beraberiz.

Bugün ilk Servlet'imizi yazmış ve klasik olarak Hello Servlet demiş olucağız :) . Birazda web.xml yapısına bakınmış olucaz.

Ve ek olarak örnek açısından Servlet'imizde Remote Host ve Port numarasını da  olarak göstemiş olucaz.

* Hatırlayacagınız üzere **javax.servlet** ve** javax.servlet.htpp** paketlerinde servletleri yazmamızı sağlayan sınıflar bulunurdu.

* Unutmayacagımız diğer bir madde ise her Servlet'in** javax.servlet.Servlet interface**'ni implement ettiğidir.Bu interface Servlet için **lifecycle** methodlarını tanımlar.

* Eğer genel service methodunu kullanmak istiyorsak sınıfımızı Servlet Api'de bulunan GenericsServlet sınıfından extends etmemiz gerekicektir.

* Genelde biz HttpServlet sınıfını kullanarak servlet'lerimizi olusturucaz.

* HttpServlet sınıfı özel Http methodlarını karşılamak için doGet() , doPost ve doXXX() gibi methodları tanımlar.

Öncelikle ilk Servlet'imizi daha dogrusu ilk projemizi nasıl oluşturucağımızı görsellerle pekiştirelim. İde olarak İntellij kullanıyoruz :)


![serlvet new project](/images/java-platform/java-ee/servlet-jsp/hello-servlet-newproject.png)

* New Project > Web Application > Create web.xml seçili olsun :) > Son olarak projeye bir ad verip Finish deyiniz.

* Projemiz olustuktan sonra bizi şöyle bir resim karşılıyor ;

![serlvet new project2](/images/java-platform/java-ee/servlet-jsp/hello-servlet-newproject2.png)

* Bazı yerlere şimdilik takılmayalım :) . Sol tarafta **HelloServlet** adındaki projemiz gözukmekte ve src klasörü altında **_03_MyServlet paketi** görünmekte ve pakette bir adete MyServlet adında bir sınıf bulunmakta.

* Web klasöründe ise **WEB-INF** klasörü ve **web.xml** dosyası bulunmakta.(Şimdilik index.jsp sayfasını göz ardı edelim :) )

* Önce **MyServlet** Sınıfımıza bir bakalım ;

{% highlight java linenos %}
package _03_MyServlet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
* Created by wora on 8/21/14.
*/
public class MyServlet extends HttpServlet {



  protected void doGet(final HttpServletRequest request, final  HttpServletResponse response)
          throws ServletException, IOException {


      String hello = "Hello MyFirstServlet :) ";
      String name = "Alican";
      String surname = "Akkus";
      String nick = "CaySever :) ";

      final PrintWriter pw = response.getWriter();//Get printwriter from response
      pw.println(hello);
      pw.println(name);
      pw.println(surname);
      pw.println(nick);

      pw.println("----------");
      pw.println("Remote Host : "+request.getRemoteHost());//Get Remote
      pw.println("Port number : "+request.getRemotePort());//Get Port


  }
}
{% endhighlight %}

Yukarıdaki işlemelere bakalım biraz ;

* Öncelikle sınıf tanımlamamızdan görebileceğiniz gibi sınıfımız bir **Servlet** sınıfıdır ;

{% highlight java linenos %}
public class MyServlet extends HttpServlet
{% endhighlight %}

Hatırlayacagınız gibi Servlet'ler aslında bir Java sınıfından farksız degildir.

* doGet methodu ile **Http** methodlarında Get methodunu karşılıyor sınıfımız. Ek olarak ; Eğer bir form'da method tipi belirtilmez ise default olarak get methodu seçilir.

{% highlight java linenos %}
protected void doGet(final HttpServletRequest request,final  HttpServletResponse response)
        throws ServletException, IOException {
{% endhighlight %}

**doGet()** methodunun **HttpServletRequest** ve** HttpServletResponse** tipinde parametreler aldığına dikkat edelim. Bu iki obje ile işlemlerimizi gerçekleştiricez. Request ve response nesneleri sayesinde istek ve cevap'ları rahatlıkla elde edebiliyoruz .Daha sonradan detaylıca deginicez.

* Bir kaç String tanımlıyoruz :)

* Burdaki kod satırı ile de response'den akışa veri yazmak için bir PrintWriter nesnesi alıyoruz.

{% highlight java linenos %}
final PrintWriter pw = response.getWriter();//Get printwriter from response
{% endhighlight %}

PrintWriter akışa yani cevap olarak response'ye text yazmamızı sağlıyor.

* Daha sonra remote host ve remote port'u alıp printwriter ile yazıyoruz ;

{% highlight java linenos %}
pw.println("Remote Host : "+request.getRemoteHost());//Get Remote
pw.println("Port number : "+request.getRemotePort());//Get Port
{% endhighlight %}

* Önemli bir noktaya geldik şuan arkadaslar ; Servlet sınıfıızı yazdıktan sonra yapacagımız ilk işlem bu servlet'mizi **web.xml**'e kaydetmek olacaktır. Servlet Contaıner web.xml'e bakarak servlet'leri ve diper configure yada param özelliklerini okur.Eğer servlet'imizi web.xml'e kaydetmezsek 404 hatası alırız : ) . Biz kaydedelim :)

* **Web.xml** ;

{% highlight xml linenos %}
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
     version="3.1">
<servlet>
    <servlet-name>MyServlet</servlet-name>
    <servlet-class>_03_MyServlet.MyServlet</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>MyServlet</servlet-name>
    <url-pattern>/MyFirstServlet</url-pattern>
</servlet-mapping>
</web-app>
{% endhighlight %}

* **web-app** etiketi içerisinde olacak yazacaklarımız . Bir servlet **web.xml'** de nasıl tanımlanır adım adım bakalım ;
* **servlet** tag'ı ile Servlet'e bir ad verilir. Ve bu Servlet'e karşılık gelen Servlet sınıfı verilir. Tam paket adı verilmeli.
* Daha sonra bu Servlet için  mapping(eşlemek) yapılır.
**servlet** ve **servlet-mapping** etiketleri arasında bulunan **servlet-name** değerlerinin aynı olması zorunludur.
* Contaıner bu iki isim üzerinden servleti eşler.
* Daha sonra Servletimiz için **url-pattern** ile url'de görünecek olan ismi belirtiyoruz.İsim size kalmış. Yanlız / ile başlanılması zorunludur.

* **Tomcat'i** run ettigimizde bizi şöyle birşey karşılıyor ,

![serlvet new project2](/images/java-platform/java-ee/servlet-jsp/hello-servlet.png)

* Url'den göreceginiz üzere **url-pattern** da verdigimiz isim görünmekte.

* Daha sonra **HttpServlet** ve **web.xml**'e detaylıca bakınıcaz. Neden **GenericsServlet** extends edilmemeli ve neden **service()** methodu bizim tarafımızdan tanımlanmamalı gibi detaylara deginicez insaAllah .

Şimdilik bu kadar arkadaşlar :)

* Kaynak kodlar : [hello servlet](https://www.dropbox.com/s/fy2hexqrtkeo9p6/HelloServlet.rar)

Bir sonraki yazıda görüşmek dileğiyle.
Mutlu kalın , kod'la kalın ve bol bol Çay için...


 ~ Alican Akkus
