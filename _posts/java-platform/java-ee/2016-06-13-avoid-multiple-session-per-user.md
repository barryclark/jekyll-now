---
layout: post
title: Avoid Multiple Session Per User
permalink: /blog/java/java-ee/avoid-multiple-per-user
summary: Merhaba arkadaslar, bu ufak yazıda web application'lar içerisinde karşılaşabileceğiniz bir durumu aktarmaya çalışacağım.
---

Merhaba arkadaslar,

Bu ufak yazıda web application'lar içerisinde karşılaşabileceğiniz bir durumu aktarmaya çalışacağım.

Sorun: Aynı username/password ile farklı tarayıcı/ortam üzerinden login olmaya çalışmak.

Çözümümüz ise öncelikle login olan kullanıcıyı bir yerde tutuyor olmamız lazım. Bu session vb bir yer de olabilir, core java içinde bir yerde olabilir. Core Java ile halledecegiz biz.

Öncelikle login olacak user'ı handle edecek user manager yazalım;

**UserSessionManager.java**

{% highlight java %}

import java.util.concurrent.ConcurrentHashMap;
import javax.servlet.http.HttpSession;

public class UserSessionManager {

  private ConcurrentHashMap<String, HttpSession> syncUserMap;
  private static UserSessionManager instance;

  public UserSessionManager() {
    syncUserMap = new ConcurrentHashMap();
  }

  public static UserSessionManager getInstance() {
    if (instance == null)
      instance = new UserSessionManager();
    return instance;
  }

  public boolean isExist(String username) {
    if (syncUserMap.containsKey(username)) {
      return true;
    }
    return false;
  }

  public void addUser(String username, HttpSession session) {
    syncUserMap.put(username, session);
  }

  public boolean addSession(HttpSession session) {
    if (syncUserMap.containsKey(session.getAttribute("username"))) {
      return false;
    }
    syncUserMap.put(session.getAttribute("username").toString(), session);
    return true;
  }

  public HttpSession getSession(String username) {
    return (HttpSession)syncUserMap.get(username);
  }

  public boolean removeSession(String username) {
    if (!syncUserMap.containsKey(username)) {
      return false;
    }
    syncUserMap.remove(username);
    return true;
  }
}

{% endhighlight %}

Basit bir Java classı yukarıdaki. Singleton pattern'ı barındırıyor, username - session ikilisini bir map'de tutuyoruz.

UserManager'ı efektik olarak kullanabilmek için bir listener ve bir filter kullanacağız.

<strong>LifeCycleListener.java</strong>
```java

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import com.wora.monitoring.UserSessionManager;

/**
* @version 1.0
* @author wora
*/
public class Startup implements ServletContextListener {

  private Logger log = Logger.getLogger(Startup.class);

  /**
  * @see javax.servlet.ServletContextListener#void (javax.servlet.ServletContextEvent)
  */
  @Override
  public void contextDestroyed(ServletContextEvent arg0) {
              .....
              .....
  }

  /**
  * @see javax.servlet.ServletContextListener#void (javax.servlet.ServletContextEvent)
  */
  @Override
  public void contextInitialized(ServletContextEvent contextEvent) {

    ServletContext context = contextEvent.getServletContext();

    //user audit icin eklendi.
    UserSessionManager userSessionManager = UserSessionManager.getInstance();
    context.setAttribute("UserSessionManager", userSessionManager);

  }

}
```

Listener ile birlikte context'imize user session manager ekliyoruz.

Şimdi ise bir filter tanımı yapacagız, pattern'ı /* şeklinde tüm url'leri kapsayacak şekilde ayarlayacağız.

<strong>LoginFilter.java</strong>
```java

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.apache.log4j.Logger;


public class LoginFilter implements Filter {

Logger logger = Logger.getLogger(LoginFilter.class);

  @Override
  public void destroy() {

  }

  @Override
  public void doFilter(ServletRequest req, ServletResponse res, FilterChain filter) throws IOException, ServletException {
  logger.info("LoginFilter is started..");

    boolean authorized = false;

    if (req instanceof HttpServletRequest) {
      HttpServletRequest request = (HttpServletRequest) req;
      if (request.getSession() != null) {

        if (request.getUserPrincipal() != null) {
          authorized = true;


            try {

              String username = request.getUserPrincipal().getName();
              logger.debug("Login User name : " + username);

              //aynı kullanıcı farklı yerlerden login oluyorsa oncekini invalidate edelim.
              UserSessionManager sessionManager = (UserSessionManager) request.getServletContext().getAttribute("UserSessionManager");
              HttpSession oldSession = sessionManager.getSession(username);
              if (oldSession != null) {
                logger.debug("Session already created. Old session will be invalidated..");
                oldSession.invalidate();
              } else {
                logger.debug("New Session added to UserSessionManager..");
                sessionManager.addUser(username, request.getSession());
              }

            } catch (Exception e) {
              logger.error(e, e);
            }
        }

      }
    }

    logger.debug("Request forwarding..");
    filter.doFilter(req, res);
  }

  @Override
  public void init(FilterConfig arg0) throws ServletException {

  }
}
```

Filter'ımızda /* tüm url'leri handle ediyoruz. Eğer kullanıcı login oldu ise User Principial null gelmeyecektir artık. Login olan kullanıcının adını alarak ilk önce session manager'ımızda böyle bir user var mı diye bakıyoruz. Var ise old session invalide ediliyor. Yok ise username-session olarak session manager'a eklemiş oluyoruz. Son olarak da isteği filter.doFilter(req, res) ile gittiği url'e gönderiyoruz.


Test;

Bir web app oldugu için servlet contaıner olarak Tomcat kullandım. Authanticatonu file based yapabilirsiniz. tomcat-user.xml'de admin/admin kullanıcı oluşturalım. İki farklı browserdan login olmaya çalışalım. İkisi ile de login olabileceğiz burada sorun yok. Ancak aktif olarak son login olan uygulamanın içerisinde kalabiliyor olacak. Yani old session invalidate olduğu için otomatik olarak login page'e yönlendirilecektir.

Örnek uygulamaya github'dan erisebilirsiniz : <a href="https://github.com/AlicanAkkus/UserSessionManagement">UserSessionManagement</a>

Yazıyı burada sonlandırıyoruz arkadaslar, mutlu ve esen kalın. Hayırlı Ramazanlar.

~ A.Akkus
