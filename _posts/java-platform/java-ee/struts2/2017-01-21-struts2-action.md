---
layout: post
title: Struts2 Action
permalink: /blog/java-platform/java-ee/struts2/struts2-action
summary: Merhaba arkadaşlar, bu yazımızda Struts2 içerisidneki Action'lara giriş yapacağız.
image: /images/java-platform/java-ee/struts2/Struts2-Architecture.png
---

### Struts2 Action
Merhaba arkadaşlar, bu yazımızda Struts2 içerisidneki Action'lara giriş yapacağız.

Action, MVC tasarım prensibindeki Controller olarak görev alır Strtus2 içerisinde. Bugün, action tanımına, nasıl kullanılacağına ve trick bilgilerine yer vermeye çalışacağız.

Bir class'ın action/controller olabilmesi için herhangi bir class extends etmesi veya interface implemente etmesi gerekmez. Pure class ile de request handling yapabiliyor olacağız.
Action/Controller request'i işler ve eğer gerekli ise view'a işaret ederek view mapping'in yapılmasını sağlar.

Hemen örnek bir action yazalım;

{% highlight java linenos %}
package com.caysever.action;

public class CounterAction {

    int count;
    boolean incrementOrDecrement;

    public String execute() {
    	if (incrementOrDecrement) {
    	    count++;
    	} else {
    	    count--;
    	}
    	return "success";
    }

    public int getCount() {
	     return count;
    }

    public void setCount(int count) {
	     this.count = count;
    }

    public void setIncrementOrDecrement(boolean incrementOrDecrement) {
	     this.incrementOrDecrement = incrementOrDecrement;
    }

    public boolean isIncrementOrDecrement() {
	     return incrementOrDecrement;
    }
}
{% endhighlight %}

CounterAction class'ı request handling yapabilen bir class aslında. Dikkat ederseniz herhangi bir servlet extends etme söz konusu değil veya bir implemente etme söz konusu değil. CounterAction içerisinde **execute** adlı özel bir method bulunuyor. Bu method, request'in handling edileceği kısımdır. Default isimlendirmedir, eğer özel olarak belirtilmedi ise request bu method içerisinde işlenecek demektir. JSP sayfası oluşturup çalıştıralım sonra ise detayına inelim;

{% highlight html linenos %}
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Struts2 Action</title>
</head>
<body>

	<div class="container">
		<form action="count">
			<fieldset>
				<!-- Form Name -->

				<legend>Counter</legend>

				Count : ${count}
				<s:hidden id="count" name="count" />
				<s:select label="Select a operation"
					list="#{'true':'increment', 'false':'decrement'}" name="incrementOrDecrement" value="1" />
				<s:submit value="Add"></s:submit>
			</fieldset>
		</form>

	</div>

</body>
</html>
{% endhighlight %}

Çıktıyı gösterelim;

![struts2-action_1](/images/java-platform/java-ee/struts2/struts2-action_1.png)

Anlayacağınız gibi int alan üzerinde increment yada decrement yapıyoruz;

![struts2-action_2](/images/java-platform/java-ee/struts2/struts2-action_2.png)

Şimdi detayına inelim, request lifecyle şöyledir;

![Struts2-Architecture](/images/java-platform/java-ee/struts2/Struts2-Architecture.png)

Öncelikle startup anında Configuration Manager, struts.xml dosyasından veya annotation'lar ile işaretlendi ise java package'lardan action tanımlarını oluşturur. Burada struts.xml veya annotation ile oluşturulmuş tanımlar kullanıcı tabanlı tanımlardır. Action proxy, Configuration Manager ve action mapping vb işler Struts'ın sorumluluğundadır.

Bir http request'i ilk olarak Servlet Container'a uğrar, buradan ise filter'lara geçer. Sonrasında ise zorunlu olan struts filter'a uğrar. Bu filter, action mapper ile actionun var olup olmadıgını sorgular. Var ise bir sonraki adım işletişir. Action Mapper eğer ilgili action var ve çağrılabilir bilgisini döner ise yukarıda gördüğünüz gibi ActionProxy ile devam edilir. ActionProxy ise Configuration Manager ile iletişime geçerek son noktaya ulaşılır ve Java class'ı içerisinde http requesti handle edilebilir duruma gelir.

Burada action oluşturulma mantığı şöyledir;

* Her HTTP request'i yeni bir Struts Action oluşturulmasına neden olur.
* Her HTTP redirect yeni bir Struts Action oluşturulmasına neden olur.
* Core Servlet'den hatırlayacağınız gibi Servlet'ler app lifecyle içerisinde sadece bir kez oluşturulurdu. Gelen her http isteğinde ise yeni bir Thread oluşturulup istek işlenmeye çalışılırdı. Bu yüzden Servletler thread safe değiller.
* Strtus1 ve Struts2 arasındaki önemli farklardan biri de burada ortaya çıkar. Strtus1 de action'lar thread safe değilken, Struts2 ile birlikte action'lar thread safe özelliğe kavuşmuştur.

View'dan action'a ve action'dan view'a geçerken data bindingden strtus sorumludur. Örneğimizde int count ve boolean incrementOrDecrement değişkenlerini kullandık. Bu değişkenlerin setter-getter'lerinin olmaması data bindigi engeller. Data bindinin oldukça başarılı olduğunu söyleyebilirim. Şimdi yukarıdaki kodları şöyle değiştirelim;

{% highlight java linenos %}
package com.caysever.action;

import com.caysever.model.CounterBean;

public class CounterAction {

    CounterBean counter;

    public String execute() {
    	if (counter.isIncrementOrDecrement()) {
    	    counter.setCount(counter.getCount() + 1);
    	} else {
    	    counter.setCount(counter.getCount() - 1);
    	}
    	return "success";
    }

    public void setCounter(CounterBean counter) {
	     this.counter = counter;
    }
    public CounterBean getCounter() {
	     return counter;
    }

}

{% endhighlight %}

{% highlight html lineos %} 
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Struts2 Action</title>
</head>
<body>

	<div class="container">
		<form action="count">
			<fieldset>
				<!-- Form Name -->

				<legend>Counter</legend>

				Count : ${counter.count}
				<s:hidden id="counter.count" name="counter.count" />
				<s:select label="Select a operation"
					list="#{'true':'increment', 'false':'decrement'}" name="counter.incrementOrDecrement" value="1" />
				<s:submit value="Add"></s:submit>
			</fieldset>
		</form>

	</div>

</body>
</html>
{% endhighlight %}

CounterAction içerisine CounterBean ekledik, count ve incrementOrDecrement degiskenlerini sarmalamaktadır. View içerisinde de action class içerisindeki tanımla aynı olmak şartı ile **counter.count** şeklinde kullanabiliriz.

View'a daha sonra detaylı değineceğiz insaAllah. Burada bir örneğini görmüş olduk sadece.

Yukarıda ifade ettiğim gibi her HTTP request'i için yeni bir Action oluşturulur. Action'ı farklı yollardan oluşturabiliriz;

1. **Action** interface'ini implemente ederek.
2. **@Action** annotation'u kullanrak.
3. **ActionSupport** classını extends ederek.
4. Ççerisinde **execute** methodu olan ve **String** döndüren bir class olması.

Configuration dosyasındaki action tanımına bakalım;

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
		<action name="count" class="com.caysever.action.CounterAction" method="execute">
			<result name="success">/count.jsp</result>
		</action>
	</package>

</struts>
{% endhighlight %}
**package** etiketleri arasına action tanımlarını yapabiliriz. Action'ları **action** ile ifade ediyoruz. Buradaki attribute'lara bakalım;
* **name** : Action için url tanımıdır.
* **class** : Action class'ını ifade eder.
* **method** : HTTP requestin handle edileceği methodun adıdır. Default olarak execute'dır. Bir action class, birden fazla action methodu barındırabilir.
* **result** : Result etiketleri ile action methoddan dönülecek olan string ifadeye göre isteğin hangi view'a yönlendirileceği ifade edilir. Birden fazla result tanımı yapılabilir.

**package** etiketine farklı bir attribute ekleyelim. Bu attr namespace olacaktır.

{% highlight xml lineos %}
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE struts PUBLIC
   "-//Apache Software Foundation//DTD Struts Configuration 2.0//EN"
   "http://struts.apache.org/dtds/struts-2.0.dtd">
<struts>

  <package name="default" namespace="custom" extends="struts-default">
  		<action name="hello" class="com.caysever.action.HelloWordAction">
  			<result name="success">/hello.jsp</result>
  		</action>
  		<action name="count" class="com.caysever.action.CounterAction">
  			<result name="success">/count.jsp</result>
  		</action>
  </package>

</struts>
{% endhighlight %}
**namespace** attribute'u, action'ları sınıflandırmaya yarar. Url üzerinde grouplama işlemi için yapılır. Örneğin kullanıcı ile ilgili olan işlemlerde package namespace'i **user** yapabiliriz. Yukarda **custom** yapmayı tercih ettik. Bu ifadeden sonra action mapping'de url'in başına **custom** gelmeli. Örn: hostname:port/contextName/**custom**/**actionName** şeklinde olacaktır.

### Action wildcard mapping
Bazı durumlarda mappingi dinamik olarak üretmek isteyebilir yada daha az config yaparak mapping yapmak isteyebiliriz. Örnek bir senaryoya bakalım. Örneğimizde 4 işlem yapan ufak bir calculator yapalım;

Mappingimiz şöyle olsun;

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
  		<action name="count" class="com.caysever.action.CounterAction">
  			<result name="success">/count.jsp</result>
  		</action>
  		<action name="addNumber" method="add"
  			class="com.caysever.action.CalculatorAction">
  			<result name="success">/result.jsp</result>
  		</action>
  		<action name="multiplytNumber" method="multiply"
  			class="com.caysever.action.CalculatorAction">
  			<result name="success">/result.jsp</result>
  		</action>
  		<action name="subtractNumber" method="subtract"
  			class="com.caysever.action.CalculatorAction">
  			<result name="success">/result.jsp</result>
  		</action>
  		<action name="divideNumber" method="divide"
  			class="com.caysever.action.CalculatorAction">
  			<result name="success">/result.jsp</result>
  		</action>
    </package>

</struts>
{% endhighlight %}
Gördüğünüz gibi 4 işlem için ayrı ayrı mapping yaptık. Aynı action class içerisindeki farklı methodlara yönlendiriliyorlar. CalculatorAction şöyle;

{% highlight java linenos %}
package com.caysever.action;

import com.caysever.model.CalculatorBean;

public class CalculatorAction {

    CalculatorBean calculator;

    public String add() {
	calculator.setResult(calculator.getFirstNumber() + calculator.getSecondNumber());
	return "success";
    }

    public String multiply() {
	calculator.setResult(calculator.getFirstNumber() * calculator.getSecondNumber());
	return "success";
    }

    public String subtract() {
	calculator.setResult(calculator.getFirstNumber() - calculator.getSecondNumber());
	return "success";
    }

    public String divide() {
	calculator.setResult(calculator.getFirstNumber() / calculator.getSecondNumber());
	return "success";
    }

    public void setCalculator(CalculatorBean calculator) {
	this.calculator = calculator;
    }
    public CalculatorBean getCalculator() {
	return calculator;
    }
}
{% endhighlight %}

CalculatorBean ise;

{% highlight java linenos %}
package com.caysever.model;

public class CalculatorBean {
    int firstNumber;
    int secondNumber;
    int result;

    public int getFirstNumber() {
        return firstNumber;
    }
    public void setFirstNumber(int firstNumber) {
        this.firstNumber = firstNumber;
    }
    public int getSecondNumber() {
        return secondNumber;
    }
    public void setSecondNumber(int secondNumber) {
        this.secondNumber = secondNumber;
    }
    public int getResult() {
        return result;
    }
    public void setResult(int result) {
        this.result = result;
    }
}
{% endhighlight %}

Url'den şunları deneyelim;

* /subtractNumber?calculator.firstNumber=2&calculator.secondNumber=5 sonuç -> -3
* /divideNumber?calculator.firstNumber=2&calculator.secondNumber=5 sonuç -> 0 (int dolayı)
* /multiplytNumber?calculator.firstNumber=2&calculator.secondNumber=5 sonuç -> 10
* /addNumber?calculator.firstNumber=2&calculator.secondNumber=5 sonuç -> 7

Bir sorun yok ama biz daha akıllı yapalım şu işi dedik. Mappingleri wildcard ile yapalım şimdi;

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
		<action name="count" class="com.caysever.action.CounterAction">
			<result name="success">/count.jsp</result>
		</action>
		<action name="*Number" method="{1}" class="com.caysever.action.CalculatorAction">
      	  <result name="success">/result.jsp</result>
    	</action>
	</package>

</struts>

{% endhighlight %}

Action class'ında birşey değiştirmemize gerek yok. Yukarıdaki url'leri tekrar çağırdığımızda çalışabildiğini göreceğiz. Widlcardı birçok yerde de kullanabiliriz. Class resolve etmesinde yada result resolve etmesinde de kullanabiliriz. Tek class oldugu için class resolve göstermeyelim, result resolve gösterelim;

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
		<action name="count" class="com.caysever.action.CounterAction">
			<result name="success">/count.jsp</result>
		</action>
		<action name="*Number" method="{1}" class="com.caysever.action.CalculatorAction">
      	  <result name="success">/{1}Result.jsp</result>
    	</action>
	</package>

</struts>

{% endhighlight %}

4 adet jsp sayfası oluşturalım;
**addResult.jsp**

{% highlight html lineos %}
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Calculator</title>
</head>
<body>

	<div class="container">
		<fieldset>
			<legend>Calculator - Add</legend>

			Result of add : ${calculator.firstNumber} + ${calculator.secondNumber} =  ${calculator.result}  
		</fieldset>
	</div>

</body>
</html>
{% endhighlight %}

**substractResult.jsp**

{% highlight html lineos %}
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Calculator</title>
</head>
<body>

	<div class="container">
		<fieldset>
			<legend>Calculator - Substract</legend>

			Result of substract : ${calculator.firstNumber} - ${calculator.secondNumber} =  ${calculator.result}  
		</fieldset>
	</div>

</body>
</html>
{% endhighlight %}

**divideResult.jsp**

{% highlight html lineos %}
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Calculator</title>
</head>
<body>

	<div class="container">
		<fieldset>
			<legend>Calculator - Divide</legend>

			Result of divide : ${calculator.firstNumber} /  ${calculator.secondNumber} =  ${calculator.result}  
		</fieldset>
	</div>

</body>
</html>
{% endhighlight %}

**multiplyResult.jsp**

{% highlight html lineos %}
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Calculator</title>
</head>
<body>

	<div class="container">
		<fieldset>
			<legend>Calculator - Multiply</legend>

			Result of divide : ${calculator.firstNumber} * ${calculator.secondNumber} =  ${calculator.result}  
		</fieldset>
	</div>

</body>
</html>
{% endhighlight %}

Yapılan matematiksel işleme göre ilgili sayfayı kendisi bulacaktır;
![struts2-action-resultwidlcard2](/images/java-platform/java-ee/struts2/struts2-action-resultwidlcard2.png)
![struts2-action-resultwidlcard3](/images/java-platform/java-ee/struts2/struts2-action-resultwidlcard3.png)

İlgili uygulamaya bir önceki yazıda vermiş oldugum git reposundan erişebilirsiniz -> Örnek uygulamaya [şurada](https://github.com/AlicanAkkus/Struts2Starter) erişebilirsiniz.

Mutlu ve esen kalın.

~ A.Akkus
