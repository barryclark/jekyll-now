---
layout: post
title: Servlet Lifecycle
permalink: /blog/java-platform/java-ee/jax-rs/jax-rs-lifecycle
summary: Merhaba arkadaslar, bu yazımızda bir restful kaynağının yaşam döngüsünden bahsediyor olacağız.
---


Merhaba arkadaslar, bu yazımızda bir restful kaynağının yaşam döngüsünden bahsediyor olacağız.

Öncelikle hatırlamak gerekirse Jax-RS servisi sağlayan class'ımızın normal bir Java class'dan farklı olmadıgını, bazı annotationlarla özelleştirip servis sunabilecek hale getirdigimizi hatırlayalım.

Örnek olarak person apisi sunan bir rest servisimizin oldugunu varsayalım ve url template'in aşağıdaki biçimde oldugunu bilelim;


* Root Resource, root url mapping yani. **/person/api** olsun.
* HTTP methodları için ve temel crud işlemleri için ise şu methodların oldugunu varsayalım;
* POST : **/person/api/** post methodu Consumes olarak json tipte ve Person tipte bir Java bean aldıgını varsayalım.
* DELETE : **/person/api/{personId}** delete methodu ise aldıgı person id'sini silen bir işlem yapıyor olacak.
* PUT : **/person/api/** UPDATE methodu, aldıgı Person Bean'ini update etsin.
* GET : **/person/api/{personId}** methodu ilgili Person'u silsin.

Yukarıdaki api root path'e göre method url path'ler şöyle olacaktır, context name olarak projemizin RestfulTutorial adında olsun ve url mapping ile /rest url'den sonra gelecek olan istekleri restful karşılayacak şekilde oldugunu belirtelim. Bunlar önceki yazılarda mevcut;

* POST : **localhost:8080/RestfulTutorial/rest/person/api**
* DELETE : **localhost:8080/RestfulTutorial/rest/person/api/{personId}**
Örnek bir delete path : **localhost:8080/RestfulTutorial/rest/person/api/1122**
* PUT : **localhost:8080/RestfulTutorial/rest/person/api/**
* GET : **localhost:8080/RestfulTutorial/rest/person/api/1122**
Örnek bir get path : **localhost:8080/RestfulTutorial/rest/person/api/1122**

Dikkat ederseniz post ve put için aynı url path bulunuyor. Restful, hangi methodu çağıracağına ilgili methodun başında olan HTTP method tipini belirten annotationa göre belirleyecektir.

Şimdi bunu koda dökelim ve bakalım;

<span style="color: #808000;">com.wora.rest.PersonService</span>

```java

package com.wora.rest;
import java.util.Properties;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.sun.jersey.spi.resource.Singleton;
import com.wora.bean.Person;
import com.wora.dao.person.IPersonDao;
import com.wora.facade.ServiceFacade;


@Path("/person/api")
public class PersonService implements IPersonDao{

@GET
@Path("/{id}")
@Produces(MediaType.APPLICATION_JSON)
public Person getPerson(@PathParam("id") long personId) throws Exception {
Person person = ServiceFacade.getInstance().getPerson(personId);
return person;
}

@PUT
@Consumes(MediaType.APPLICATION_JSON)
public boolean updatePerson(Person person) throws Exception {
return ServiceFacade.getInstance().updatePerson(person);
}

@PUT
@Path("/{id}")
public boolean deletePerson(long personId) throws Exception {
return ServiceFacade.getInstance().deletePerson(personId);
}

@POST
@Consumes(MediaType.APPLICATION_JSON)
public boolean savePerson(Person person) throws Exception {
return ServiceFacade.getInstance().savePerson(person);
}

public void init(Properties appProps) throws Exception {
// TODO somethings
}

}
```

**web.xml**

``` xml

<web-app id="WebApp_ID" version="2.4"
xmlns="http://java.sun.com/xml/ns/j2ee" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://java.sun.com/xml/ns/j2ee
http://java.sun.com/xml/ns/j2ee/web-app_2_4.xsd">
<display-name>Restful Web Application</display-name>

<listener>
<listener-class>com.wora.servlet.ContextListener</listener-class>
</listener>

<servlet>
<servlet-name>jersey-serlvet</servlet-name>
<servlet-class>com.sun.jersey.spi.container.servlet.ServletContainer</servlet-class>
<init-param>
  <param-name>com.sun.jersey.config.property.packages</param-name>
  <param-value>com.wora.rest</param-value>
</init-param>
<init-param>
  <param-name>com.sun.jersey.api.json.POJOMappingFeature</param-name>
  <param-value>true</param-value>
</init-param>
<load-on-startup>1</load-on-startup>
</servlet>

<servlet-mapping>
<servlet-name>jersey-serlvet</servlet-name>
<url-pattern>/rest/*</url-pattern>
</servlet-mapping>

</web-app>

```
<span style="color: #808000;">com.wora.servlet.ContextListener.</span>

``` java
package com.wora.servlet;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import com.wora.facade.ServiceFacade;

public class ContextListener implements ServletContextListener{

public void contextDestroyed(ServletContextEvent event) {
//TODO log
}

public void contextInitialized(ServletContextEvent event) {

Properties appProps = null;
try {
  appProps = new Properties();
  String appPropsPath = event.getServletContext().getRealPath("/WEB-INF/classes/RestfulTutorial.properties");


  File f = new File(appPropsPath);
  if (f.exists() &amp;&amp; !f.isDirectory()) {
    try {
      FileInputStream fis = new FileInputStream(f);
      appProps.load(fis);

      fis.close();
    } catch (IOException e) {
      //TODO log
    }
  } else {
    //TODO log
  }


  ServiceFacade.getInstance().start(appProps);
} catch (Exception e) {
  //TODO log
}

}

}
```

<span style="color: #808000;">com.wora.facade.ServiceFacade</span>

``` java
package com.wora.facade;

import java.util.Properties;

import com.wora.bean.Person;
import com.wora.dao.person.IPersonDao;
import com.wora.dao.person.PersonDaoImpl;

public class ServiceFacade {
private static ServiceFacade applicationInstance;
private IPersonDao personDao = null;

public static ServiceFacade getInstance(){
if(applicationInstance == null)
  applicationInstance = new ServiceFacade();

return applicationInstance;
}

public void start(Properties appProps){


try{

  personDao = new PersonDaoImpl();
  personDao.init(appProps);



}catch(Exception e){
  //TODO Log
}

}

public  Person getPerson(long personId) throws Exception{
return personDao.getPerson(personId);
}
public  boolean updatePerson(Person person) throws Exception{
return personDao.updatePerson(person);
}
public  boolean deletePerson(long personId) throws Exception{
return personDao.deletePerson(personId);
}
public  boolean savePerson(Person person) throws Exception{
return personDao.savePerson(person);
}
}
```

<span style="color: #808000;">com.wora.dao.person.IPersonDao</span>
```java
package com.wora.dao.person;

import java.util.Properties;
import com.wora.bean.Person;

public interface IPersonDao {
public abstract void init(Properties appProps) throws Exception;
public abstract Person getPerson(long personId) throws Exception;
public abstract boolean updatePerson(Person person) throws Exception;
public abstract boolean deletePerson(long personId) throws Exception;
public abstract boolean savePerson(Person person) throws Exception;
}
```
İmplementasyonuna bakalım;

<span style="color: #808000;">com.wora.dao.person.PersonDaoImp</span>
```java
package com.wora.dao.person;

import java.util.Properties;

import com.wora.bean.Person;
import com.wora.db.DBConnectionHelper;

public class PersonDaoImpl extends DBConnectionHelper implements IPersonDao{

@Override
public void init(Properties appProps) throws Exception {
super.init(appProps);
}

public Person getPerson(long personId) throws Exception {
// TODO Auto-generated method stub
return null;
}

public boolean updatePerson(Person person) throws Exception {
// TODO Auto-generated method stub
return false;
}

public boolean deletePerson(long personId) throws Exception {
// TODO Auto-generated method stub
return false;
}

public boolean savePerson(Person person) throws Exception {
// TODO Auto-generated method stub
return false;
}

}
```

Göreceginiz üzere implementasyon var ama içi boş, doldurmadım :)

<span style="color: #808000;">com.wora.db</span>
```java
package com.wora.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Properties;

import com.wora.bean.DBParam;

public class DBConnectionHelper {
DBParam dbParam = null;

public void init(Properties appProps) throws Exception{
dbParam = new DBParam();

dbParam.setDriver(appProps.getProperty("database.driver"));
dbParam.setUrl(appProps.getProperty("database.url"));
dbParam.setUsername(appProps.getProperty("database.username"));
dbParam.setPassword(appProps.getProperty("database.password"));
}

public Connection getConnection() throws Exception{

Class.forName(dbParam.getDriver());
Connection conn = DriverManager.getConnection(dbParam.getUrl(), dbParam.getUsername(), dbParam.getPassword());

return conn;
}

public void closeConnection(Connection connection){
try{
  if(connection != null){
    connection.close();
  }
}catch(Exception e){
  //TODO log
}
}

public void closeResultSet(ResultSet rs){
try{
  if(rs != null){
    rs.close();
  }
}catch(Exception e){
  //TODO log
}
}

public void closePreparedStatement(PreparedStatement psmt){
try{
  if(psmt != null){
    psmt.close();
  }
}catch(Exception e){
  //TODO log
}
}

}
```

**Not : Yazı sonunda proje'ye erişebileceğiniz link yer alacaktır.**


Şimdi asıl konumuza gelelim ve root resource olan PersonService'in ne şekilde load oldugunu, lifecycle'ının ne olduguna deginmeye çalışalım;

Öncelikle default olarak bir root resourceun scope'u request scope'dur ve root resource yani örneğimizde /person/api  ile eşleşen her request için kaynak new'lenir. Normal bir java class oldugu icin constructor, member/instance variable'lar eklenebilir/düzenlenebilir. Constructor çağrıldıktan sonra injection yapılabilir hale gelmiş demektir. Requeste cevap dönültükten sonra ilgili kaynak hemen silinmez, referansı null'lanır ve garbace collector'a havale edilir. GB kendi çalışmasına göre ilgili kaynağı  silecektir.

Özetleyecek olursak eğer bir rest kaynagına istek geldiginde sırasıyla şu adımlar gerçekleşir;

* Gelen istekteki url path ilgili class ile eşlenir.
* Eşlenen rest class'ının constructoru çağrılır.
* Dependencies inject edilir.
* Uygun method çağrılır.
* Resource, garbace collector için uygun hale getirilir.

Defualt olarak Request Scope ama okunaklı olması ve hatırda kalması adına belirtmek isterseniz class'ın başına @RequestScoped annotation'unu koymalısınız. Şöyle ki;
``` java
@Path("/person/api")
@RequestScoped
public class PersonService implements IPersonDao{
.....
}
```
Request scope bazı durumlarda tercih edilmez, nedeni de performans düşüklüğü ve memory kullanımı'dır. Her request için rest resource oluşturulur, istek karşılanır ve gb için uygun hale getirilir ancak gb ne zaman çalışır bilinmez :)

Request scope yerine Singleton olarak resource'u değiştirebiliriz. Bu bize bir jax-rs applicationumuz var ise ilgili rest resource için tek instance olmasını sağlayacaktır. Bunun için rest class'ımızıa @Singleton annotationu koymamız ve Application'un bir instance'ı olması gerekmektedir. Şöyle ki;
```java
@Path("/person/api")
@Singleton
public class PersonService extends Application implements IPersonDao{
.....
}
```
Düşük kullanıcı sayısı ve network trafiğinde request scope ihtiyacınızı karşılacayaktır. Ancak kaynak kullanımında artış ve performans'da düşüş istemiyorsanız singleton olarak rest servisinizi dışarıya açabilirsiniz.

İlgili proje'ye şuradan erişebilirsiniz : [RestfulTutorial](https://www.dropbox.com/s/eu3wt6duww0uwmz/RestfulTutorial.rar?dl=0)

Yazımızın sonuna geldik, mutlu kalın.

~ A.Akkus
