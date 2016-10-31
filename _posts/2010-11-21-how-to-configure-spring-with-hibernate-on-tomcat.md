---
layout: post
status: publish
published: true
title: How to configure Spring with Hibernate on Tomcat?
author:
  display_name: Gunith
  login: admin
  email: gunith@gmail.com
  url: ''
author_login: admin
author_email: gunith@gmail.com
excerpt: The steps below guides how to set up the back end of a Java Webapp on Tomcat
  while using Spring with Hibernate as the ORM.
wordpress_id: 25
wordpress_url: http://www.beta.gunith.com/?p=25
date: '2010-11-21 13:39:55 +0530'
date_gmt: '2010-11-21 08:09:55 +0530'
categories:
- Java
- Tomcat
- Spring
- Hibernate
tags:
- programming
- Java
- code
- tomcat
- jee
- spring
- hibernate
- xml
- coding
comments:
- id: 371
  author: How to configure Spring with Hibernate on Tomcat?
  author_email: ''
  author_url: http://codebix.com/posts/post/151463/How-to-configure-Spring-with-Hibernate-on-Tomcat
  date: '2010-12-17 14:19:54 +0530'
  date_gmt: '2010-12-17 08:49:54 +0530'
  content: "[...] to set up the back end of a Java Webapp on Tomcat while using Spring
    with Hibernate as the ORM.... [full post]    Gunith     Coder&#039;s Block   hibernatejavaspringtomcat
    \           0        0        0        0     [...]"
---
The steps below guides how to set up the back end of a Java Webapp on Tomcat while using Spring with Hibernate as the ORM.

## Configure Connection String

In the `/WEB-INF/classes/conf/jdbc.properties`, we store the connection info,

```
jdbc.driverClassName=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost/JTest
jdbc.password=admin
hib.dialect=org.hibernate.dialect.MySQLDialect
```

## Configure Spring for Hibernate related beans: SessionFactory, Transaction Manager and [HibernateTemplate](http://static.springsource.org/spring/docs/2.5.6/api/org/springframework/orm/hibernate3/HibernateTemplate.html)

In the `/WEB-INF/classes` folder have the `applicationContext.xml` file.

```xml
<beans>

<!-- ========================= HIBERNATE CONFIG ========================= -->
<!-- Configurer that replaces ${...} placeholders with values from a properties file -->
<!-- (in this case, JDBC-related settings for the dataSource definition below) -->

<bean id="propertyConfigurer">
    <property name="location"><value>conf/jdbc.properties</value></property>
</bean>

<!-- Local DataSource that works in any environment -->
<!-- Note that DriverManagerDataSource does not pool; it is not intended for production -->
<bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
    <property name="driverClassName"><value>${jdbc.driverClassName}</value></property>
    <property name="url"><value>${jdbc.url}</value></property>
    <property name="username"><value>${jdbc.username}</value></property>
    <property name="password"><value>${jdbc.password}</value></property>
</bean>

<!-- Hibernate SessionFactory -->
<bean id="sessionFactory" class="org.springframework.orm.hibernate3.LocalSessionFactoryBean">
    <property name="dataSource"><ref local="dataSource"/></property>
    <property name="mappingResources">
        <list>
            <value>Product.hbm.xml</value>
        </list>
    </property>
    <property name="hibernateProperties">
        <props>
            <prop key="hibernate.dialect">${hib.dialect}</prop>
            <prop key="hibernate.show_sql">true</prop>
        </props>
    </property>
</bean>

<!-- <strong>Transaction manager for a single Hibernate SessionFactory</strong> (alternative to JTA) -->
<bean id="transactionManager" class="org.springframework.orm.hibernate3.HibernateTransactionManager">
    <property name="sessionFactory"><ref local="sessionFactory"/></property>
</bean>

<bean id="hibernateTemplat</strong><strong>e" class="org.springframework.orm.hibernate3.HibernateTemplate">
    <property name="sessionFactory">
        <ref bean="sessionFactory"/>
    </property>
</bean>

</beans>
```

`HibernateTemplate` is a Spring class to bridge between Hibernate. More details [here](http://www.packtpub.com/article/data-access-using-spring-framework-hibernate-template)


## Configure the Persistence classes and DAO classes

In the `<beans>` tag of applicationContext, have the following

```xml
<!-- ========================= APP BEANS ========================= -->
<bean id="Product" class="gunith.jtest.model.impl.BasicProduct"></bean>

<bean id="ProductDao" class="gunith.jtest.dao.hibernate.ProductHibernateDao">
  <property name="hibernateTemplate">
    <pre style="padding-left: 60px;"><ref bean="hibernateTemplate"/>
  </property>
</bean>
```

## Create the Mapping File

This is the definition of spring beans related to the business logic. BasicProduct is a persistence POJ class, the realization of an interface Product. The 2 are mapped in the `/WEB-INF/classes/Product.hbm.xml`. (Here we have another class called MeasurableProduct)

```xml
<hibernate-mapping>
   <class name="gunith.jtest.model.Product" table="product">
      <id name="id">
        <generator class="native"></generator>
      </id>
      <discriminator column="type"></discriminator>
      <property name="name"></property>
      <property name="price"></property>
      <many-to-one name="brand" class="gunith.jtest.model.Brand" column="brand_id" lazy="false"></many-to-one>
      <subclass name="gunith.jtest.model.impl.BasicProduct" discriminator-value="0"></subclass>
      <subclass name="gunith.jtest.model.impl.MeasurableProduct" discriminator-value="1">
        <property name="unit"></property>
      </subclass>
   </class>
</hibernate-mapping>
```

## Create The DAO

The Database operations of Product is done by the `gunith.jtest.dao.hibernate.ProductHibernateDao`.  It extends `org.springframework.orm.hibernate3.support.HibernateDaoSupport`. (Note that there's a setter for hibernateTemplate in spring config)

```java
public abstract class ProductHibernateDao extends HibernateDaoSupport {
    /** Saves an object in the DB */
    public Serializable add(Object obj) {
       return getHibernateTemplate().save(obj);
    }

    /** Gets all objects of a given class */
    public List getAllObjects(Class entityClass) {

       List all = getHibernateTemplate().loadAll(entityClass);
       return all;
    }
}
```
