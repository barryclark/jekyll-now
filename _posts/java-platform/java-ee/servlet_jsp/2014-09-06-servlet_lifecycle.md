---
layout: post
title: Servlet Lifecycle
permalink: /blog/java-platform/java-ee/servlet-jsp/servlet-lifecycle
summary: Merhaba arkadaslar, bu yazımızda Servlet Lifecycle konusuna deginicez. Servlet'lerin yaşam döngüsüne bakınmış olucaz.
---


Merhaba arkadaslar , bu yazımızda Servlet Lifecycle konusuna deginicez. Servlet'lerin yaşam döngüsüne bakınmış olucaz. Başlayalım :)

* Külli nefsin zaikatül mevt sümme ileyna türceûn. Her canlı doğar, yaşar ve ölür. Servlet'lerimizde doğar(Servlet instance), yaşar(Servlet service) ve ölür(Servlet Destroy).

### Servlet Lifecycle'de gerçekleşen olaylar
Bir Servlet'in yasam döngüsü 5 adımdan ibarettir ;

1. Servlet sınıfının yüklenmsi
2. Servlet objesinin oluşturulması
3. init methodunun çağrılması
4. service methodunun çağrılması
5. destroymethodunun çağrılması

![Servlet Lifecycle](/images/java-platform/java-ee/servlet-jsp/Servlet-Life-Cycle.jpg)


* İlgili Servlet class'ımız **Web Contaıner** tarafından bulunur ve yüklenir. Servlet Contaıner iligli servlet'i projemiz için önemli bir konfigurasyon dosyası olan **deployment descriptor (web.xml)** de arar. Eğer iligli Servlet bulunamaz ise **404 not found** gibi bir hata ile karsılasırız.

* Daha sonra Servlet'imizin bir objesi olusturulur. Unutmayalım ki Servlet objesi sadece bir ddefa olusturulur.

* Sıradaki adım da ise **init()** methodu cagrılır.**init()** methodu **Servlet'i** ilk kullanıma hazırlar. Bu method servlet yaşam döngüsü içerisinde sadece bir defa çağrılır. **init()** methodu tamamlandıgında Servlet'imiz artık istekleri karsılamaya hazıdır.

```java
public void init(ServletConfig config) throws ServletException
```

* **service()** methodu ile beraber Servlet istekleri işler. **service()** methodu gelen **HTTP** methodu tipine göre Servletimizde buluna **doXXX()** methodunu çağırır. Unutmayalım ki her bir istek aynı servlet üzerinde farklı thread'larda çalışır. **service()** methodu iki obje barındırır. Bunlar ; **request** ve **response** objeleridir. Bu objeler ilgili **doXXX()** methoduna çağrılırken parametre olarak  yollanır.
```java
public void service(ServletRequest request, ServletResponse response)   
  throws ServletException, IOException
```
* Son olarak **destroy()** methodu ile Servlet'imiz ölür :) . Servlet'in kullandıgı kaynaklar serbest bıraklılır . Bu methodunda servlet yaşam döngüsünde sadece birkez çağrıldıgını unutmayalım.
```java
public void destroy()
```
#### Destroy methodu ile ilgili Trick ;
* **destroy()** methodu şu durumlarda çağrılır ;
  * **Contaıner** yada **applicaton** kapandıgında.
  * **Servlet** uzun süre **request** alamadıgında.
  * **Contaıner** bellek sıkıntısı olustuguna karar verdiginde(Servlet yasam dongusu tamamıyla Servlet Contaıner'in elindedir).


Yazımızda dikkat etmemiz gereken birkaç noktayı belirterek yazımızı sonlandıralım;
* **Servlet'in** yaşam döngüsünden **Servlet** **Contaıner'ı** sorumludur.
* **Servlet** **init()** methodu çalışmasını tamamlayana kadar istekleri karşılayamaz.
* **Servlet'in** yaşam döngüsünde ; **servlet class'**ın yüklenmsi ,** servlet'in ilk kullanımına** hazırlanması ,**init()** methodu ve **destroy()** methodu sadece bir kez çağrılır.
* **Servlet** objesi bir kez olusturulur ve her **request** alındıgında aynı **Servlet** objesi üzerinde işlem yapılır. Örneğin;
A istegi threadA , B istegi threadB ile aynı servlet üzerinde çalışır.

* Yazımız burada sonlandı arkadaslar. Bir sonraki yazıda **ServletConfig** ve **ServletContext** konularına deginicez insaAllah.

* Mutlu kalın , kod'la kalın ve bol bol Çay için :)

~ Alican Akkus
