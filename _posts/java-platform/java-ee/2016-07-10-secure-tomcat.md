---
layout: post
title: Secure Tomcat
permalink: /blog/java/java-ee/secure-tomcat
summary: Merhaba arkadaslar, bu yazımda Tomcat'i secure olarak ayağa kaldırmayı anlatmaya çalışacağım.
---

Merhaba arkadaslar, bu yazımda Tomcat'i secure olarak ayağa kaldırmayı anlatmaya çalışacağım.

Öncelikle bazı kavramlar hakkında ufak bilgiler verelim.

### SSL(Secure Sockets Layer)/TLS(Transport Layer Security)/HTTPS

Temel olarak client ile server arasındaki iletişimin gizlenmesi/şifrelenmesi anlamına gelir. SSL'in son kullanılan sürümü 3.0'dır. TLS ise SSL'in devamı olarak geliştirilen yeni bir teknolojidir. SSL'in standartlaşması için geliştirilmiştir. İkisi arasında bu daha güvenlidir gibi bir ayrım yapmak pek doğru değil. Temelde birkaç farklılıkları bulunur sadece. SSL ve TLS'in nasıl çalıştıklarını çok detaylı anlatamayacağım. Ancak TCP katmanında(UDP için de implementasyonu var) client ile server arasında bir handshake olduğunu söyleyebiliriz. Asimetrik bir şifreleme üzerinde client/server anlaşır ve aradaki iletişim/mesajlaşma artık encrypt edilerek gidip gelir.

HTTPS ise HTTP üzerine SSL/TLS'in eklenmesi sonucu web üzerinde iletişimin secure olduğunu belirtir.

### JKS(Java KeyStore)

Java içerisinde key ve sertifika yönetimini yapan bir araçtır. "keytool" command ile keystore oluşturulabilir, oraya girmeyeceğiz ama CSR, self-signed sertifika ve import işlemlerini yapabileceğiniz özellikli bir araç.

Tomcat SSL ve TLS destekliyor, öncesinde kendimiz için bir keystore oluşturacağız. Bunun için makinada Java kurulu olması gerekir tabi;

![JKS](/images/java-platform/jks.png)

Yukarıda ilk command olarak "keytool -genkey -alias tomcat -keyalg RSA" ile keystore oluşturmak için ilk adımı yaptık. Burada -alias'dan sonra gelen tomcat unique'dir her keystore için. Kendi domaininizi belirten birşey yazabilirsiniz. Devamında size keystore şifresi ile birlikte birkaç soru soracaktır. Değerleri girelim.

Devamında home dizini altında ".keystore" ile bir dosya oluşturacaktır. Detayını göründülemek istediğimizde çıktıyı görebileceğiz. Keystore type'ın JKS ve provider'ın SUN olduğuna dikkat edebiliriz.

### Tomcat with SSL/TLS

Tomcat JKS, PKCS11 ve PKCS12 formatlarındaki keystore'lar ile çalışabilmektedir. JKS, keytool ile üretilebilen Java keystore'dur, jdk içerisinde dahili olarak gelir.  PKCS12 ise genel internet standartıdır, openssl gibi araçlarla generate edilebilir.

Tomcat'i HTTPS olarak ayağa kaldırmak için Connector tanımı yapacağız. Tomcat'i Eclipse'de kullanmaya alıştı iseniz server sekmesinde açtığınızda sağ tarafta hangi port'lardan neyin ayağa kalktığını bulabilirsiniz. Son halini ekleyelim;

![tomcat ports](/images/java-platform/tomcat-port.png)

Default olarak gelen Tomcat admin port ve AJP ile birlikte SSL olarak tanımladığımız 8443 portundan bir Connector ayağa kalkacaktır. Bu tanımlamlar tomcat base directory içerisinde bulunan conf dizinindeki server.xml içerisinde yapılır.

server.xml içerisindeki Service içerisinde aşağıdaki Connector tanımını ekliyoruz;
```xml

<?xml version="1.0" encoding="UTF-8"?>
    <Server port="8005" shutdown="SHUTDOWN">
<Listener className="org.apache.catalina.startup.VersionLoggerListener"/>
<Listener SSLEngine="on" className="org.apache.catalina.core.AprLifecycleListener"/>
<Listener className="org.apache.catalina.core.JasperListener"/>
<Listener className="org.apache.catalina.core.JreMemoryLeakPreventionListener"/>
<Listener className="org.apache.catalina.mbeans.GlobalResourcesLifecycleListener"/>
<Listener className="org.apache.catalina.core.ThreadLocalLeakPreventionListener"/>

<GlobalNamingResources>
<Resource auth="Container" description="User database that can be updated and saved"
                   factory="org.apache.catalina.users.MemoryUserDatabaseFactory" name="UserDatabase"
                   pathname="conf/tomcat-users.xml" type="org.apache.catalina.UserDatabase"/>
</GlobalNamingResources>

<!-- A "Service" is a collection of one or more "Connectors" that share
a single "Container" Note: A "Service" is not itself a "Container", so you
may not define subcomponents such as "Valves" at this level. Documentation
at /docs/config/service.html -->
<Service name="Catalina">

<!-- A "Connector" represents an endpoint by which requests are received
  and responses are returned. Documentation at : Java HTTP Connector: /docs/config/http.html
  (blocking &amp; non-blocking) Java AJP Connector: /docs/config/ajp.html APR (HTTP/AJP)
  Connector: /docs/apr.html Define a non-SSL HTTP/1.1 Connector on port 8080 -->
<!-- <Connector connectionTimeout="20000" port="8080" protocol="HTTP/1.1" redirectPort="8443"/> -->
<!-- A "Connector" using the shared thread pool -->
<!-- <Connector executor="tomcatThreadPool" port="8080" protocol="HTTP/1.1"
  connectionTimeout="20000" redirectPort="8443" /> -->
<!-- Define a SSL HTTP/1.1 Connector on port 8443 This connector uses the
  BIO implementation that requires the JSSE style configuration. When using
  the APR/native implementation, the OpenSSL style configuration is required
  as described in the APR/native documentation -->
<!-- <Connector port="8443" protocol="org.apache.coyote.http11.Http11Protocol"
  maxThreads="150" SSLEnabled="true" scheme="https" secure="true" clientAuth="false"
  sslProtocol="TLS" /> -->

<!-- Define an AJP 1.3 Connector on port 8009 -->
<Connector port="8009" protocol="AJP/1.3" redirectPort="8443"/>

            <!-- Tomcat with SSL -->
<Connector SSLEnabled="true" clientAuth="false" keystoreFile="/home/wora/wora.keystore"
  keystorePass="caysever" maxThreads="150" port="8443" protocol="HTTP/1.1"
  scheme="https" secure="true" sslProtocol="TLS"/>

<!-- An Engine represents the entry point (within Catalina) that processes
  every request. The Engine implementation for Tomcat stand alone analyzes
  the HTTP headers included with the request, and passes them on to the appropriate
  Host (virtual host). Documentation at /docs/config/engine.html -->

<!-- You should set jvmRoute to support load-balancing via AJP ie : <Engine
  name="Catalina" defaultHost="localhost" jvmRoute="jvm1"> -->
<Engine defaultHost="localhost" name="Catalina">

  <!--For clustering, please take a look at documentation at: /docs/cluster-howto.html
    (simple how to) /docs/config/cluster.html (reference documentation) -->
  <!-- <Cluster className="org.apache.catalina.ha.tcp.SimpleTcpCluster"/> -->

  <!-- Use the LockOutRealm to prevent attempts to guess user passwords
    via a brute-force attack -->
  <Realm className="org.apache.catalina.realm.LockOutRealm">
    <!-- This Realm uses the UserDatabase configured in the global JNDI resources
      under the key "UserDatabase". Any edits that are performed against this UserDatabase
      are immediately available for use by the Realm. -->
    <Realm className="org.apache.catalina.realm.UserDatabaseRealm" resourceName="UserDatabase"/>
  </Realm>

  <Host appBase="webapps" autoDeploy="true" name="localhost" unpackWARs="true">

    <!-- SingleSignOn valve, share authentication between web applications
      Documentation at: /docs/config/valve.html -->
    <!-- <Valve className="org.apache.catalina.authenticator.SingleSignOn"
      /> -->

    <!-- Access log processes all example. Documentation at: /docs/config/valve.html
      Note: The pattern used is equivalent to using pattern="common" -->
    <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs" pattern="%h %l %u %t &amp;quot;%r&amp;quot; %s %b" prefix="localhost_access_log." suffix=".txt"/>


  <Context docBase="SpringMVCTutorial" path="/SpringMVCTutorial" reloadable="true" source="org.eclipse.jst.jee.server:SpringMVCTutorial"/></Host>
</Engine>
</Service>
</Server>
```
Connector tanımımız şu şekilde;
```xml
<!-- Tomcat with SSL -->
<Connector SSLEnabled="true" clientAuth="false" keystoreFile="/home/wora/wora.keystore"
keystorePass="caysever" maxThreads="150" port="8443" protocol="HTTP/1.1"
scheme="https" secure="true" sslProtocol="TLS"/>
```
Burada keystore dosyasınını, sifre olarak "caysever", port, protocol, scheme(https) gibi bilgileri giriyoruz. Tomcati restart ettikten sonra HTTPS olarak HTTP + SSL olarak çalışabiliyor olacağız.

Herhangi bir uygulama deploy edip HTTPS olarak gidelim;

![secured tomcat](/images/java-platform/tomcat-secured.png)

HTTPS olarak gidebildik ancak firefox bu site güvenli değildir diyerek bizi uyardı. Sertifikayı valide edemediginden dolayı bu uyarıyı verecektir. Development anında bu uyarıyı dikkate almayabilirsiniz ancak production ortamlarında self signed sertifika almanız gerekmektedir yada kendi CA server'ınızın bulunması gerekecektir.

Not : Yukarıdaki uyarının verilmiş olması client ile server arasındaki communication'nun not secure olduğu anlamına gelmez. Yine tüm iletişim SSL üzerinden şifreli olarak gidip gelecektir.

Yazıyı burada sonlandırıyoruz, mutlu ve esen kalın.

- A.Akkus
