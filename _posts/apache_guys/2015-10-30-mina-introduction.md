---
layout: post
title: Apache Mina Introduction
permalink: /blog/apache-guys/apache-mina/apache-mina-introduction
summary: Merhaba arkadaslar, Apache Mina yazılarına giriş yazımızla başlamış bulunmaktayız. Blogumu az çok takip ediyorsanız yazıların nasıl bir taslak içerdiği hakkında bir fikriniz vardır diye düşünüyorum.
---

Merhaba arkadaslar,

Apache Mina yazılarına giriş yazımızla başlamış bulunmaktayız. Blogumu az çok takip ediyorsanız yazıların nasıl bir taslak içerdiği hakkında bir fikriniz vardır diye düşünüyorum.  Socket programlama basit olmakla beraber pure java ile yazmadığımız için java ve bazı protokolleri biliyor olmanız gerekmektedir.

Mina nedir? ne için kullanılır? diyerek giriş yazımıza başlayalım;

### Apache Mina Project
Mina, Java NIO API'sini kullanarak TCP ve UDP olacak şekilde portlarla haberleşmeyi sağlayan bir yapıdır. Transport(taşıma) işlemi APR üzerinden (Apache Portable Runtime) gerçekleşir. Mina ile birlikte TCP ve UDP dışında kendi implementasyonlarınızı da yazarak transfer tipini ayarlayabilirsiniz. Bu nedenle Apche mina transport-indepented'tir.

Mina ile birlikte Client ve Server applicationlar yazabilir, HTTP gibi text protokollerini handle edebilirsiniz. Ayrıca siz session üzerinden close methodunu açık biçimde çağırmadığınız sürece yada client bağlantıyı kapatmadıkça/connection alive olduğu sürece prokolünüz devam eder.

Mina'nın özellikleri arasında SSL/TSL kullanabilme ve  binary protocol LDAP kullanabilme gibi yetenekler bulunmakta. Dediğim gibi Mina ile HTTP,  XML,  TCP,  LDAP,  DHCP,  NTP,  DNS,  XMPP,  SSH,  FTP gibi protoklleri destekleyen uygulamalar yazabilirsiniz. Socket programlama low development olduğu için merakınız yada ihtiyacınız yoksa sıkılabilirsiniz :) Yapılar çok karmaşık değil, gözünüz korkmasın. Okudukça, örnek yaptıkça pekişecektir. CV'nizde en azından profesyonel olarak soket programlama yapabileceğinize dair bir özelliğiniz olur :)

Mina yazılarına başlamadan önce; TCP/IP, UDP(gerekmeyecektir ama ne olduğunu bilmekte fayda var), Session ve orta da olsa core Java bilmeniz gerekmektedir.

Mina, IOHandler ile birlikte session açılıp/kapandığında, mesaj alındığında, transport anında herhangi bir sessionda oluşan hata/exception yakalandığında haberdar olabilir, yazdığınız uygulamaları buna göre şekillendirebilirsiniz.

Mina, temelinde bir server ve client objesi oluşturulduktan sonra filter ile logger, protocol gibi filterlar ekleyebilirsiniz. Bu şu demektir; logger filter ile gelen/giden mesajların loglanması, protocol filter ile haberleşmede kullanılacak protokolün belirlenmesi vs hepsi elinizdedir.
### NIO
Mina'nın NIO API ile haberlerşme yaptığından bahsettik. NIO, Java 1.4 ile gelen non-blocking IO yönetim yapısını içermektedir. NIO yanısıra BIO olarak bilinen yada Blocking-IO ise socket üzerinde herhangi bir read/write yada herhangi bir işlemde bloklar ve diğer operasyonlar bunun bitmesini bekler. Bu nedenle NIO, event mantığı ile çalışarak bloklama yapmaz ve ilgilendiği event oluştuğunda devreye girer. NIO, BIO'ya göre daha fazla connection'a destek verebilir ve daha da hızlıdır.

&nbsp;

Mina Example

Öncelikle simple bir örnek ile soket programlama girelim. Yapacağımız işlem bir soket acceptor oluşturmak ve herhangi bir port'a bind etmek. Socketimiz üzerinde de iki filter tanımı yapacağız. Öncelikle Mina için gerekli jar dosyalarını indirelim ve classpath'e ekleyelim. Bunun için [şurayı](https://mina.apache.org/mina-project/userguide/ch1-getting-started/first-steps.html) kullanabilirsiniz.

Öncelikle NioSocketAcceptor oluşturalım. Socket Acceptor, cliet'lardan gelecek isteklere hizmet verecek kısımdır;
```java
package com.caysever.mina.tutorial;

import java.net.InetSocketAddress;
import java.nio.charset.Charset;

import org.apache.mina.core.service.IoAcceptor;
import org.apache.mina.core.session.IdleStatus;
import org.apache.mina.filter.codec.ProtocolCodecFilter;
import org.apache.mina.filter.codec.textline.TextLineCodecFactory;
import org.apache.mina.filter.logging.LoggingFilter;
import org.apache.mina.transport.socket.nio.NioSocketAcceptor;

public class MinaTimeServer {

public static final int PORT = 5003;// bind to 5003

// private static Logger logger = LoggerFactory.getLogger(MinaTimeServer.class);

public static void main(String[] args) {

try {
  // Create the acceptor
  IoAcceptor acceptor = new NioSocketAcceptor();

  // Add two filters : a logger and a codec
  acceptor.getFilterChain().addLast("logger", new LoggingFilter());
  acceptor.getFilterChain().addLast("codec", new ProtocolCodecFilter(new TextLineCodecFactory(Charset.forName("UTF-8"))));

  // Attach the business logic to the server
  acceptor.setHandler(new TimeServerHandler());

  // Configurate the buffer size and the iddle time
  acceptor.getSessionConfig().setReadBufferSize(2048);
  acceptor.getSessionConfig().setIdleTime(IdleStatus.BOTH_IDLE, 10);

  // And bind!
  acceptor.bind(new InetSocketAddress(PORT));

} catch (Exception e) {
  System.out.println("Somenthings went wrong! : " + e.getMessage());
  // logger.error("Somenthings went wrong! : " + e.getMessage());
}

}

}
```

Yukarda örnek bir Socket Acceptor bulunmakta ve 5003 portundan çalışmaktadır. Acceptor üzerinde iki adet filter tanımlanmıştır. Bunlardan biri socket ile ilgili olan işlemlerin default console yazdırılması için "logger" filter ve Protocol olarak text codec olan TextLineCodecFactory kullanmaktayız.  Buraya kadar olan kısmı aşağıdaki kod blogu yapmaktadır.
```java
// Create the acceptor
IoAcceptor acceptor = new NioSocketAcceptor();

// Add two filters : a logger and a codec
acceptor.getFilterChain().addLast("logger", new LoggingFilter());
acceptor.getFilterChain().addLast("codec", new ProtocolCodecFilter(new TextLineCodecFactory(Charset.forName("UTF-8"))));
```

Daha sonra uygulamamızın business logic kısmıs olan IO handler'ı set ediyoruz. TimeServerHandler classımız IoHandlerAdapter sınıfı extend eden ve socket üzerinde session açılması/kapanması, mesaj alınması/gönderilmesi gibi durumları handle eden logic class'dır.
```java
// Attach the business logic to the server
acceptor.setHandler(new TimeServerHandler());
```

Daha sonra acceptor üzerinde buffer size ve idle(boşta) zamanı için ayarlamalar yapıyoruz. En son ise acceptor  5003 portuna bind ediliyor ve 5003 portuna gelecek olan bağlantıları dinlemeye geçiyor.
```java
// And bind!
acceptor.bind(new InetSocketAddress(PORT));
```

Business logic olan TimeServerHandler sınıfımıza bakalım;
```java
package com.caysever.mina.tutorial;

import org.apache.mina.core.service.IoHandlerAdapter;
import org.apache.mina.core.session.IdleStatus;
import org.apache.mina.core.session.IoSession;

public class TimeServerHandler extends IoHandlerAdapter {

// Logger logger = LoggerFactory.getLogger(TimeServerHandler.class);

@Override
public void exceptionCaught(IoSession session, Throwable cause) throws Exception {
System.out.println(cause.getMessage());
}

@Override
public void messageSent(IoSession ioSession, Object obj) throws Exception {
System.out.println("\nSent message :" + obj.toString());
}

@Override
public void messageReceived(IoSession session, Object obj) throws Exception {
String message = obj.toString();
System.out.println("\nNew Message Received:" + message);
}

@Override
public void sessionIdle(IoSession session, IdleStatus status) throws Exception {
System.out.println("\nIDLE " + session.getIdleCount(status));
}

@Override
public void sessionClosed(IoSession session) throws Exception {
super.sessionClosed(session);
System.out.println("\nSession closed.  Session ID:" + session.getId() + " - Local address:" + session.getLocalAddress() + " - Remote Address:"
    + session.getRemoteAddress() + " - Service Address:" + session.getServiceAddress() + " - TransportMetadata:" + session.getTransportMetadata());

// connector.setSessionState(SessionState.closed);
}

@Override
public void sessionCreated(IoSession session) throws Exception {
super.sessionCreated(session);
System.out.println("\nSession created .. ");
}

@Override
public void sessionOpened(IoSession session) throws Exception {
super.sessionOpened(session);
System.out.println("\nSession opened. Session ID:" + session.getId() + " - Local address:" + session.getLocalAddress() + " - Remote Address:"
    + session.getRemoteAddress() + " - Service Address:" + session.getServiceAddress() + " - TransportMetadata:" + session.getTransportMetadata());

// connector.setSessionState(SessionState.open);
}

}
```

Business logic sınıfımızda bazı eventların oluşması durumunda console ekranına bazı bilgiler yazmaktayız.  Main classımızı çalıştıralım ve telnet ile portumuza erişmeye çalışalım;

Uygulama çalışmaya başladığında 5003 portunu dinlemeye başlar ve gelen sessionları handle etmeye hazır durumdadır;

![hi mina](/images/apache-guys/apache-mina/hi-mina.png)

5003 protuna bağlandımızda consola bakalım;

![mina-message](/images/apache-guys/apache-mina/mina-message.png)

Bir mesaj gönderelim, mesajımız "Hi, Mina!" olsun :) Consola bakalım daha sonra;

![mina-console](/images/apache-guys/apache-mina/mina-console.png)

Mesajın alındığını ve consola yazdırıldığını görebilmekteyiz. İdle time olarak 10 sn vermiştik bu zaman süresinde sessiondan/client'dan herhangi bir mesaj gelmezse IDLE diye mesaj yazmaktayız. Bağlanan session bilgisini de yine yukardan görebiliriz. Yeni bir mesaj gönderelim;

![mina-hello](/images/apache-guys/apache-mina/hello.png)

Gelen mesajı yeniden görebildik. Unix terminalden şu komutu girerek  netstat -tulpn 5003 portunun bilgisini alalım;

![mina-netstat](/images/apache-guys/apache-mina/mina-netstat.png)


5003 portunun dinlendiğini tcp ile transmit yapıldığını görebilmekteyiz.

Giriş yazımız için bir server socket örneği yaptık arkadaşlar. Bir sonraki yazıda yazdığımız server socket için client yaıyor olacağız. Daha sonra kendi Protocol'ümüzü yazmayı  ve birkaç ek özellikleri göreceğiz insaAllah. :)

Örnek uygulamanın yapısı aşağıdaki gibidir, indirme linkini de [şuradan](https://www.dropbox.com/sh/6xd27zhme67y35p/AABvwvbLGhw3vuyNwJxwUdR2a?dl=0) bulabilirsiniz.

Bir sonraki yazıda görüşmek dileğiyle, mutlu kalın, kod'la kalın ve bol bol Çay için :)

~ Alican Akkus
