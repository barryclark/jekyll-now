---
layout: post
title: Struts2 Introduction
permalink: /blog/java-platform/java-ee/struts2/struts2-introduction
summary: Merhaba arkadaşlar, bu yazımızda J2EE web framework'lerinden biri olan Struts2'ye giriş yapacağız.
image: /images/java-platform/java-ee/struts2/struts2-index.png
---

### Struts2
Apache çatısı altında olan, open-source, esnek ve genişletilebilir olan, MVC yaklaşımını destekleyen bir web frameworküdür.

Not : Esnek ve genişletilebilir ne ola ki? Bu kavramlar bolca tutoriallarda, yazılarda vs dolaşır. Esnek ve genişletilebilir size birşeyler çağrıştırabilir, bunu yazılım gözü ile değerlendirelim.
Esnek : Kullandığınız tool, framework vs  yapısı itibari ile değişikliklerden ne kadar etkileniyor. Bu değişiklere adapte olabilir mu? Flexible kavramının birçok bilimde karşılığı vardır, mühendislik anlamında ise çevresinde gelişecek olan değişiklere karşı tutumu/davranışı olacaktır.

Genişletilebilir : Kullandığınız tool, framework vs size ne kadar ek katman/özellik vs eklemeye/düzenlemeye izin veriyor. Örneğin bir export app düşünelim, export destination olarak Local File System, DB, FTP vb olabilir. Yarın müşteri, ben Messaging Service katmanına da export almak istiyorum diyebilir. Yazdıgımız uygulamaların genişletilebilir özelliği bu noktada devreye girecektir.

Struts2'nin temel avantajları şunlardır;
* MVC tabanlı.
* POJO tabanlı actions
* AJAX support
* Views plugin support
* Views tag support
* Theme and internalization support

#### Strut2 Starter Project
Struts2'ye giriş yapacağımız örneğe geçelim. Öncelikle Struts2 de dosya/dizin yapısı nasıldır ona bakalım;
{% highlight java %}
project(web-app)
│   
│    
│
└───WEB-INF
│   |───classes
|   |      └─── class files
|   |      └─── struts.xml
│   │───web.xml
│   │
│   └───libs
│       │   lib
│       │   lib
│       │   ...
│   
└───JSP
│    │─── jsp page
│    │─── jsp page
│
└───Static resources    
{% endhighlight %}

Struts2 de Controller kısımları pure Pojo class'larından oluşmaktadır. Bunları action olarak isimlendireceğiz. Action tanımı, Annotation based yada xml conf based olmak üzere 2 şekilde yapabiliriz. XML conf seçecek olursak config dosyasının WEB-INF\classes dizini altında olması gerekmektedir. Development anında ..\src dizini altında ben bulunduruyorum, deployment assembly olarak src dizini WEB-INF\classes altında taşındığı için bir problem oluşmuyor.

Öncelikle bir proje oluşturalım;
Dynamic Web Project oluşturalım. Struts2 için gerekli lib'leri
[şuradan](http://struts.apache.org) indirebilirsiniz. Eclipse üzerinden Struts2 için user library oluşturalım;

![user library](/images/java-platform/java-ee/struts2/struts2-userlibrary.png)

Build Path ve deployment assembly ayarlarının şu şekilde düzenleyelim;

Build Path;
![build path](/images/java-platform/java-ee/struts2/struts2-buildpath.png)

Deployment assembly;
![build path](/images/java-platform/java-ee/struts2/struts2-deploymentassembly.png)

Bir tane action oluşturalım;

com.caysever.action paketi altında oluşturacağız. HelloWordAction;

{% highlight java linenos %}
package com.caysever.action;

public class HelloWordAction {

    String message;

    public String execute(){
    	message = message + " - Struts2 Starter Project";
    	return "success";
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}

{% endhighlight %}

HelloWord class içerisinde message adlı bir field ve execute adlı bir method bulunmakta. Yapacağımız config ile execute methodunu action olarak tanımlaycağız.
Config'e bakalım;

{% highlight xml lineos %}
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE struts PUBLIC
   "-//Apache Software Foundation//DTD Struts Configuration 2.0//EN"
   "http://struts.apache.org/dtds/struts-2.0.dtd">
<struts>

	<package name="default" extends="struts-default">
		<action name="hello" class="com.caysever.action.HelloWordAction">
			<result name="success">/hello.jsp</result>
		</action>
	</package>

</struts>

{% endhighlight %}

Detaylarına daha sonra değineceğiz, root elementimiz **struts** olacaktır. Altında package ile action tanımı yapıyoruz. Action'a bir name, handle edileceği bir class ve result tanımı yaptık. Execute methodu içerisinde **retuern "success";** ifadesi burada **result** ile belirlenen view'lara map edilir. Execute action'dan **success** dönülürse istek **hello.jsp** forward edilecektir.

> Dikkat ederseniz config içerisinde execute methodunun adını vermedik. Struts'da action name default olarak execute gelmektedir. Eğer method name belirtilmedi ise ve class içerisinde birden fazla execute var ise Struts isteği kısmen handle edebilecektir. Buna daha sonra değineceğiz.

index.jsp dosyamıza bakalım;

{% highlight html lineos %}
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Struts2 Starter Project</title>
</head>
<body>

	<div class="container">
		<form action="hello">
			<fieldset>
				<!-- Form Name -->
				<legend>Hello</legend>

				<!-- Text input-->
				<label for="message">Message : </label>
				<s:textfield id="message" name="message" type="text"
					placeholder="Your first name" class="form-control input-md"
					required="" />
				<s:submit></s:submit>
			</fieldset>
		</form>

	</div>

</body>
</html>
{% endhighlight %}

Form'u **hello** action'a gönderiyoruz. HelloWordAction ise mesaja birşeyler ekleyip hello.jsp sayfasına iletiyor. **hello.jsp** dosyamıza bakalım;

{% highlight html lineos %}
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Hello Struts2</title>
</head>
<body>

	User message : ${message}

</body>
</html>
{% endhighlight %}
Struts intercept tanımı yaparak gelen url isteklerini dinlemesini sağlaycağız. Bu sayede Struts, gelen isteğin hangi actiona yönlendirileceğine karar verecektir. Bunun için web.xml dosyamıza aşağıdaki tanımı ekleyelim;

{% highlight xml lineos %}
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://java.sun.com/xml/ns/javaee" xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd" id="WebApp_ID" version="3.0">
  <display-name>Struts2Starter</display-name>
   <welcome-file-list>
    <welcome-file>index.jsp</welcome-file>
  </welcome-file-list>
  <filter>
    <filter-name>struts2</filter-name>
    <filter-class>org.apache.struts2.dispatcher.filter.StrutsPrepareAndExecuteFilter</filter-class>
    <init-param>
      <param-name>actionPackages</param-name>
      <param-value>com.caysever.action</param-value>
    </init-param>
  </filter>
  <filter-mapping>
    <filter-name>struts2</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>
</web-app>
{% endhighlight %}
Struts'a **com.caysever.action** paketi altında aramasını söylüyoruz.

Run edelim;
Deployment assembly;
![index page](/images/java-platform/java-ee/struts2/struts2-index.png)

Submit edelim;
![hello page](/images/java-platform/java-ee/struts2/struts2-hello.png)

Request lifecyle içerisindeki adımalara bakalım;
1. User, request'i başlatır.
2. Struts filter yardımı ile url'i yakalar ve action mappings uygular. Bulamaz ise request lifecyle biter. Bulur ise action'a yönlendirir.
3. Action da işlem yapılır ve result dönülür.
4. Result bulunamaz ise request lifecyle kesilir.
5. Result bulundu ise view'a bilgiler bind edilir.


Yukarıda genel itibari ile giriş yaptık. Struts'ın actionları nasıl handle ettiğine, verilerin nasıl bind edildiğine, actionların detayına ilerde değineceğiz.

Örnek uygulamaya [şurada](https://github.com/AlicanAkkus/Struts2Starter) erişebilirsiniz.

Mutlu ve esen kalın.
~ A.Akkus
