---
layout: post
title: Spring MVC Controller
permalink: /blog/spring-platform/spring-mvc-tutorial/spring-mvc-controller
summary: Merhaba arkadaslar, bu yazımızda Spring MVC'deki Controller'a bakacağız.
image: /images/spring-platform/spring-mvc/spring_mvc_controller_image.png
---

Merhaba arkadaslar, bu yazımızda Spring MVC'deki Controller'a bakacağız.

### Controller
MVC mimarisinde önemli bir role sahiptir. MVC bir yaklaşım olduğu için kendisini MVC olarak nitelendiren teknolojiler/frameworkler vs implementasyonunu farklı yapabilirler. Şuana kadar Struts MVC, Servlet&JSP MVC, Spring MVC, Play MVC, Backbone gibi MVC mimarileri ile çalışma fırsatı buldum. Model-View-Controller tanımlarının kesin bir şekilde birbirinden ayrıldığı, mimarinin anlaşılması en kolay olanı sanırım Play MVC'dir. Gerçi Play'de ek olarak bir de Router var ama en temiz MVC diyebilirim. Mesela Backbone'da bir Controller yoktur, collection bu görevi üstlenmiştir.

Controller'ın amacı, model ile view arasında ki iletişimdir en temelde. Client'dan gelen request'i handle etmekle görevlidir. Tabi ki sadece bu değildir. Controller Backbone'da mode'li/collection'u fetch eden/render eden bir katman da olabilir Spring'de ki gibi view'a işaret edebilir. Kendi içerisinde logic oluşturabilir. Modelin validasyonunu yapabilir. Biz Spring MVC'de ki Controller'ı inceleyeceğiz.

Öncelikle Controller oluşturmak için sizi herhangi bir class'ı extend etmeye yada bir interface'ı implemente etmeye zorlamaz. Spring'in temel bir avantajı olarak kodunuza çok elleşmeden Controller oluşturmanızı sağlar. Spring'i asıl popüler yapan maddelerden biri de budur. Controller oluşturmak için @Controller ile sınıfı işaretlemeniz yeterlidir.

Bir önceki örneğimizdeki Controller'ı kullanalım;

{% highlight java linenos %}
package com.wora.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

  @Controller
  public class BaseController {

  @RequestMapping("/")
  public String home() {
  return "index";
  }

}
{% endhighlight %}

BaseController normal bir Java class'dır. Spring Controller olabilmesi için @Controller ile işaretlenmesi yeterlidir. @Controller annotation'u class level'dır, method level de kullanılamaz.

@Controller'ın aktif çalışabilmesi için context spring xml'de <annotation-driven /> bulunması gerekir.

Controller içerisinde birden fazla request mapping bulunabilir. Ben bunları action olarak isimlendiriyorum. Örneğin; BaseController'daki home action'u gibi. Spring'in handle etmesini istediğiniz bir request geldiğinde context scan işlemi yapılır ve paketler aranır. Package'ler içerisinde tüm class'larda @Controller annotation'u aranır. Bulunur ise ilgili class pool'a alınır. Poolun içerisinde her class'da bulunan methodlar da da RequestMapping(GetMapping, PostMapping vs de olabilir) yani temel de bir request mapping var ise bu da pool'a eklenir.

Gelen request'in hangi action'a ait oldugu ise url resolver ile bulunur. Request map işlemi class level ve/veya method level yapılabilir. Yukarıdaki örneğimiz de web uygulamasının context name'inden sonra / şeklinde ki istek home action'una yönlendirilir. Burada BaseController da home() da Controller olarak nitelendirilebilir. Çünkü method'lar class'lara aittir bu nedenle methodlar class'ların özelliklerini taşır. Yani class visibility method visibility'den yüksek olduğu için class level, method level'ı kapsar. Class'a erişilemiyor ise method'a da erişilimez. Biraz felsefik işte.

home() action'una dikkat edelim biraz;

method signature olarak access modifiers olarak <strong>public</strong> return type olarak <strong>String</strong> ve herhangi bir parametre yada throw ifadesi yok. Spring Controller method signature'si public/protected/private/default access modifers olabilir, static ifadesini alabilir. Tüm parametre tiplerini kabul edebilir, tüm return type çeşitleri kullanılabilir. Exception throw edebilir. Tüm annotation'larla da işaretlenebilir.

Spring Controller methodunun 3 önemli kısmı vardır;

* Request Map : URL/Request mapping yapar. HTTP methodunu belirler. URL mapping'de regex validasyon kullanabilir. Consumes, Produces tiplerini belirleyebilir. URL template belirleyebilir, örn : /api/{username}/products gibi. RequestMapping'de multiple url verebilirisiniz;
{% highlight java linenos %}
@RequestMapping("/","home","index")
{% endhighlight %}

* Parameters : Tüm parametre tiplerini alabilir. View'dan model'i parametre olarak alabilir. RequestParam, MatrixParam gibi parametreleri alabilir. Current request Locale bilgisini alabilir, Request input stream'ı ve/veya Response output stream'ı parametre olarak alabilir. Servlet request/response objelerini alabilir, currently authenticated user'ı principial olarak alabilir.
* Return : Return type olarak ModelAndView, Model, String, void, ResponseBody gibi return type belirlenebilir. Dönüş tipine göre Spring ya view'ı bulup model ile render eder yada direk olarak response'a yazar. Void ile ResponseBody çok benzerdir. ResponseBody ise http response'ın body kısmına yazılır, void olursa response output stream'e yazılır.

Örnek bir Controller üzerinden devam edelim;
{% highlight java linenos %}
package com.kahveciefendi.sales.controller;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.kahveciefendi.sales.dto.ProductDto;
import com.kahveciefendi.sales.exceptions.ProductNotFoundException;
import com.kahveciefendi.sales.service.SalesService;

@Controller
public class SalesController {

  private static final Logger LOG = LoggerFactory.getLogger(SalesController.class);

  @Autowired
  private SalesService salesService;

  @RequestMapping("/")
  public String onRootAccess() {
    return "redirect:/drink";
  }

  @RequestMapping("/drink")
  public String getDrinkPage(Model model) throws ProductNotFoundException {
    if (LOG.isDebugEnabled()) {
      LOG.debug("Drink page is called");
    }

    Map<Integer, ProductDto> drinks = salesService.getDrinksMap();
    model.addAttribute("drinks", drinks);
    model.addAttribute("selectedDrink", null);

    return "drink";
  }

  @RequestMapping("/extra")
    public String extrasPage(@RequestParam Integer selectedDrink, Model model) {

    if (LOG.isDebugEnabled()) {
      LOG.debug(new StringBuffer().append("Extra page is called with selectedDrink : ").append(selectedDrink)
          .toString());
    }

    Map<Integer, ProductDto> extras = salesService.getExtrasMap();
    model.addAttribute("extras", extras);
    model.addAttribute("selectedDrink", selectedDrink);

    return "extra";
  }

  @RequestMapping(path = "/complete")
    public String completePage(@RequestParam Integer selectedDrink, @RequestParam(defaultValue="") Integer[] selectedExtras, Model model)
      throws ProductNotFoundException {
    if (LOG.isDebugEnabled()) {
      LOG.debug(new StringBuffer()
          .append("Complete page is called with selectedDrink : ")
          .append(selectedDrink)
          .append(" and selectedExras : ")
          .append(Arrays.toString(selectedExtras)).toString());
    }

    BigDecimal price = salesService.getPrice(selectedDrink, Arrays.asList(selectedExtras));
    model.addAttribute("price", price);

    return "complete";
  }

}
{% endhighlight %}

Sales controller'ımız toplam 3 controller methoda sahip. Methodlar parametre olarak Model, RequestParam gibi parametreler alıyor. Return type olarak view name verdik. View name verdiğimizde template resolver tanımı olarak InternalResourceViewResolver kullanmalıyız. Bu resolver jsp,html gibi sayfaları prefix ve suffix gibi propertieslerle map eder ve controllerın işaret ettiği view name ile ilişklilendirilir. Genel de bu kullanılır zaten.

Farklı bir Controller'a bakalım;
{% highlight java linenos %}
package com.kahveciefendi.sales.controller;

import java.security.Principal;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.kahveciefendi.sales.dto.ProductDto;
import com.kahveciefendi.sales.exceptions.ProductNotFoundException;
import com.kahveciefendi.sales.service.SalesService;


@Controller
public class AuthanticationController {
  private static final Logger LOG = LoggerFactory.getLogger(SalesController.class);

  @Autowired
  private SellerService sellerService;

  @RequestMapping("/auth")
  public String auth(Principal principal, Model model) {

    if(principal != null) {
      ArrayList<Product> products = sellerService.findProducts(principal.getName());
      model.addAllAttributes("products", products);
      return "redirect:/drink";
    }else {
      throw new Exception("Seller dont authanticed.");
    }

  }

}
{% endhighlight %}

Parametre olarak user principal aldık. Auth olan biri yoksa exception atıyoruz. Spring üzerinde Exception handling konusuna deginecegim daha sonra ancak ufak da olsa exception handling'i nasıl yaptıgımıza bakalım;

{% highlight java linenos %}
package com.kahveciefendi.sales.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;

@ControllerAdvice
public class ExceptionHandlingController {

  private static final Logger LOG = LoggerFactory.getLogger(ExceptionHandlingController.class);

  @ExceptionHandler(Exception.class)
  public ModelAndView defaultErrorHandler(HttpServletRequest req, Exception exception) {
    LOG.error(new StringBuffer()
        .append("Request: ")
        .append(req.getRequestURL())
        .append(" raised ")
        .append(exception).toString(),exception);

    ModelAndView mav = new ModelAndView();
    mav.addObject("exception", exception);
    mav.addObject("url", req.getRequestURL());
    mav.setViewName("error");
    return mav;
  }

}
{% endhighlight %}

* ControllerAdvice ile global exception handling yapıyoruz ve return olarak hata detayını bind ettigimiz modelView'ı vererek /error sayfasını işaret ediyoruz.

Genel olarak Controller'da bulunan özellikler bunladır, detaylar için farklı kaynaklara bakınız. Sonraki yazımızda View Resolver ile view'a giriş yapacagız. Controller'da modellerimize put ettigimiz degerleri nasıl kullanırız vs onlara bakacağız.

Mutlu ve esen kalınız.

Not: Yazıyı bitirdiğimde saat 00:15 olmuştu. Bayramınız kutlu olsun :)

~ A.Akkus
