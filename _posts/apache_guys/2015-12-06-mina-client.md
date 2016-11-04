---
layout: post
title: Apache Mina Client
permalink: /blog/apache-guys/apache-mina/apache-mina-client
summary: Merhaba arkadaslar, bir önceki yazımda Mina ile basit bir server socket'in nasıl oluşturulabileceğini, NIO tabanlı olduğunu ve mina hakkında birkaç detay vermiştik. Bugün ise Mina ile bir socket client oluşturmaya çalışacağız.
---

Merhaba arkadaslar, bir önceki yazımda Mina ile basit bir server socket'in nasıl oluşturulabileceğini, NIO tabanlı olduğunu ve mina hakkında birkaç detay vermiştik. Bugün ise Mina ile bir socket client oluşturmaya çalışacağız.

### Apache Mina Client
Everything going to be ok if server socket is alive. ~ Alican Akkus

Bir önceki yazımızda server socketi olusturup herhangi bir port'a bind etmiş ve daha sonra telnet ile ip ve port adresini yazarak aslında bir client gibi davranmıştık. Bkz: [telnet](https://en.wikipedia.org/wiki/Telnet) , bugün ise client kodunu yazacagız, mesaj göndereceğiz ve açtığımız session'un durumunu handle edeceğiz.

Mina ile client socket oluşturmak için şu adımları yapmalıyız;

* Öncelik olarak server socketin alive olduğun u bilmemiz gerekiyor.
* Socket Connector oluşturmak ve server ip üzerindeki porta bağlanmamız gerekiyor. Session almak.
* Session kapandığında safe olacak biçimde yeni session almak, safe şekilde bağlantıyı kapatmak.
* Mesaj göndermek için sessiona mesaj yazmak.


Bir önceki yazımda kullanmış olduğum IO handler sınıfını olduğu gibi kullanacağız. Yeni oluşturacağımız MinaClient sınıfını connector olarak çalıştıracağız;

**MinaClient.java**

```java
package com.caysever.mina.tutorial.client;

import java.net.InetSocketAddress;
import java.nio.charset.Charset;

import org.apache.mina.core.future.ConnectFuture;
import org.apache.mina.core.session.IdleStatus;
import org.apache.mina.core.session.IoSession;
import org.apache.mina.filter.codec.ProtocolCodecFilter;
import org.apache.mina.filter.codec.textline.TextLineCodecFactory;
import org.apache.mina.filter.logging.LoggingFilter;
import org.apache.mina.transport.socket.nio.NioSocketConnector;

import com.caysever.mina.tutorial.TimeServerHandler;

public class MinaClient {

  private NioSocketConnector socketConnector = null;// socket connector
  private IoSession socketSession = null; // minanın bize atadıgı session
  private final String SERVER_ADRESS = "127.0.0.1"; // server ip
  private final int SERVER_PORT = 5003; // server port

  public boolean isServerConnectionAlive() {
    return socketSession != null &amp;&amp; socketSession.isConnected(); // session null degil ve hala baglı?
  }

  public void createSocketConnector() {
    try {
                        //connector olustur ve filterları ekle
      socketConnector = new NioSocketConnector();
      socketConnector.getFilterChain().addLast("logger", new LoggingFilter());
      socketConnector.getFilterChain().addLast("protocol", new ProtocolCodecFilter(new TextLineCodecFactory(Charset.forName("UTF-8"))));
                        //socket handler set
      socketConnector.setHandler(new TimeServerHandler());
      socketConnector.getSessionConfig().setReadBufferSize(2048);
      socketConnector.getSessionConfig().setIdleTime(IdleStatus.BOTH_IDLE, 60);

    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  public void closeServerConnection() {
                 //senkron kapat
    if (socketSession != null) {
      socketSession.close(false);
    }
    if (socketConnector != null) {
      socketConnector.dispose();
    }
  }

  public void openServerConnection() {

    try {
                      // session baglı degilse once bir connect olalım sonrasında session alalım.
      if (socketSession == null || socketSession != null &amp;&amp; !socketSession.isConnected()) {
        ConnectFuture future = socketConnector.connect(new InetSocketAddress(SERVER_ADRESS, SERVER_PORT));
        future.awaitUninterruptibly();
        socketSession = future.getSession();
      } else {
        System.out.println("Session already active.");
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  public void sendMessage(String message) {
                // server alive degilse once acmayi deneyeliö
    if (!isServerConnectionAlive()) {
      openServerConnection();
    }
                // server alive , o zaman sessiona yazalim mesajimizi.
    if (isServerConnectionAlive()) {
      System.out.println("session is open, sending message : " + message);
      socketSession.write(message);
    }
  }
}
```

Kod içerisinde gerekli yerlere yorumlar yazdım, yapı basit çünkü default protocol ile ilerliyoruz.  IoHandler, bir önceki yazımızdaki handler idi. Tekrar yer verelim;
```java
package com.caysever.mina.tutorial;

import org.apache.mina.core.service.IoHandlerAdapter;
import org.apache.mina.core.session.IdleStatus;
import org.apache.mina.core.session.IoSession;

public class TimeServerHandler extends IoHandlerAdapter {

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

Test classımıza bakalım;
```java
package com.caysever.mina.tutorial.client;

import java.util.Date;

public class ClientTest {

  public static void main(String[] args) {

    try {

      MinaClient client = new MinaClient();
      client.createSocketConnector();
      client.openServerConnection();

      while (true) {
        Date date = new Date();
        client.sendMessage("Client message [ " + date.getTime() + " ]");

        Thread.sleep(1000);
      }

    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
```

Client'ımız servera bağlandıktan sonra 1 sn aralıklarla mesaj göndermekte. Örneği çalıştırabilmek için server socketin ayakta olması gerekmektedir. Bu nedenle bir önceki yazımda vermis oldugum uygulamayı çalıştırmış olmanız ve 5003 portunda gelen istekleri kabul ettiğini biliyor olmanız gerekmektedir. Yada yazının sonundaki projenin son halini indirip önce server kısmını çalıştırıp daha sonra client tarafını çalıştırırsanız yine çalışacaktır.

Eclipse üzerinde server ve client tarafını çalıştıralim ve consola bakalım. Kişisel tavsiyemdir; consola, log'a, exception tipine, satırına vs vs gibi verilere dikkat edin. Karşılaştığınız hatanın çözümü orada yer almaktadır, sadece doğru analiz etmek size kalan taraftır.

Öncelikle Server socketi ayağa kaldıralim;

![server-created](/images/apache-guys/apache-mina/server-created.png)

Server socketin ayağa kalktıgını ve bir clientin baglandıgını görmekteyiz. Client, bizim olusturdugumuz client'dır. Client consola bakalım;

![session-created](/images/apache-guys/apache-mina/session-created.png)

Client'ın session aldıktan sonra sessionu açmasını ve mesajı göndermesini görebilirsiniz.<strong> "Client message [1449351169754]"</strong> asıl gönderilen mesajdır.

Server'ın clienttan aldıgı mesajları görmek icin tekrar server consola dönelim;

![session-message](/images/apache-guys/apache-mina/session-message.png)

Client uygulamasını durduralım ve serverın cevabına bakalım;

![session-closed](/images/apache-guys/apache-mina/session-closed.png)

Client tarafında; Connector oluşturmak ve ilgili ip/port'a bağlandıktan sonra session'a mesaj göndermek gibi işler duruyor. Ancak server socket tarafı daha karmaşıktır ve olması gerekende budur. Server socket'ın, bağlanan sessionları tutması, belirli bir sessiondan gelen mesajın karıştırılmaması ve cevap dönülecekse sadece ilgili sessiona cevap dönülmesi gerekmektedir. Bu ve buna benzer örnekler dolayısıla server socketin daha karmasık olması en azından client'a göre doğaldır.

Örnek basit bir client oluşturup mesaj gönderdik, bir sonraki yazımızda default protocol yerine kendi belirleyeceğimiz protocol üzerinden socketlerin haberleşmesini sağlayacağız.

Yazımı burada sonlandırmak istiyorum arkadaslar.

Uygulamanın son haline [buradan](https://www.dropbox.com/s/0bsefaa0napsoxa/MinaTutorial.zip?dl=0) erişebilirsiniz.

~ Alican Akkus.
