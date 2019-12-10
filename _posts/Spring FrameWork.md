---
Category: post
title: Learning Journal for Spring  FrameWork and MYSQL
---

![Spring Framework](https://github.com/EmilyStacy-droid/EmilyStacy-droid.github.io/blob/master/images/SpringFrameWork-1.PNG)
### General information
1.	It is a light-weight, loose coupling (an object in another object/ in a class can be replaced by another) framework that is often used in enterprise-level complex software development
2.	It is Layered architecture
3.	It enables POJO programming  https://www.youtube.com/watch?v=X_Wt4vvVemQ

     * Class must be public
     * properties must be private 
     * must have a public default constructor (zero argument constructor)
     * can also have a constructor with argument(s) (optional)
      * every property should have public getters and setters
 4. dependency injection  and inversion of control 

     https://www.youtube.com/watch?v=Eqi-hYX50MI

     * developers only configure the objects. They do not have control to the objects; objects are controlled by the Spring Framework

 5. Open-source and no vender lock-in

Example: Configuration

(1)Set up a Spring Configuration class
```
package org.improving.drill;//add the packiage

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ComponentScan;

@Configuration
//package is required
@ComponentScan("org.improving")

public class SpringConfiguration {

}


```
(2)Set up the scanning in Main class

```
package org.improving.drill;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
public class Drill {
    private final ConsoleInputOutput io;
    private final List<Command> commands;

    public Drill(ConsoleInputOutput io, List<Command> commands) {
        this.io = io;
        this.commands = commands;
    }

    public static void main (String [] args) {
        var context = new AnnotationConfigApplicationContext(SpringConfiguration.class);
        var drill = context.getBean(Drill.class);
        drill.run();
    }



```
Other classes in this bean need to have ***@component*** on top

***What do the following terms mean in Spring Framework? (1) constructor injection (2) setter injection (3) interface injection Spring Framework only supports (1) and (2). Is it talking about the dependencies as classes or external libraries?

#### SpringFrameWork IoC containers

Bean Factory                                 | Application Context
-------------                                | -------------
instantiate beans whenever asked by clients  | built on top of the bean factory interface; extra functionality

Example of Bean Factory (these are required to build up ***Spring JPA implemented by Hibernate***:
```
package org.improving.tag;
import java.util.Properties;
import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.dao.annotation.PersistenceExceptionTranslationPostProcessor;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories
public class JPAConfiguration {

    DataSource dataSource = null;

    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(dataSource());
        em.setPackagesToScan(new String[] { "org.improving.tag" });

        JpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        em.setJpaVendorAdapter(vendorAdapter);
        em.setJpaProperties(additionalProperties());

        return em;
    }

    @Bean
    public DataSource dataSource(){
        if( dataSource == null ) {
            DriverManagerDataSource dmDataSource = new DriverManagerDataSource();
            dmDataSource.setDriverClassName("******************");
            dmDataSource.setUrl("******************");
            dmDataSource.setUsername("******************");
            dmDataSource.setPassword("******************");
            dataSource = dmDataSource;
        }
        return dataSource;
    }

    Properties additionalProperties() {
        Properties properties = new Properties();
        properties.setProperty("hibernate.hbm2ddl.auto", "update"); // update for us is fine
        properties.setProperty("hibernate.dialect", "org.hibernate.dialect.MySQLDialect");
        return properties;
    }

    @Bean
    public PlatformTransactionManager transactionManager(EntityManagerFactory emf) {
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(emf);
        return transactionManager;
    }
    @Bean
    public PersistenceExceptionTranslationPostProcessor exceptionTranslation(){
        return new PersistenceExceptionTranslationPostProcessor();
    }
}


```

#### Different annotations ####
@Component: General stereotype and can be used across application

| @Controller                              | @Service            |   @Repository  
| -------------                            | -------------       |	-------------  
| Annotate classes at presentation layers  | service layer level |  persistence layer(database repository)

#### Spring Framework Layers (from Edureca! https://www.youtube.com/watch?v=210tVT2uPvI)
![Architecture Layers](https://github.com/EmilyStacy-droid/EmilyStacy-droid.github.io/blob/master/images/SpringFrameWork-2.PNG)

#### Spring JDBC or Hibernate ? What is Spring JPA ? ####
Hibernate has higher popularity, but Spring JDBC provides a less complex solution.

Spring JPA stands for Java Persistence API. It needs a provider like Hybernate that can implements the JPA. ***Spring Data JPA is merely a spring-centric wrapper that offers springy semantics and features that wrap a JPA provider of which Hibernate is one implementation***
(*https://stackoverflow.com/questions/42470060/spring-data-jdbc-spring-data-jpa-vs-hibernate/42473065*)

*Spring JPA with Hibernate Example* (sample codes from https://www.youtube.com/watch?v=YywLS8XdxLQ)
1. Create a "META-INF" directory and under it create a persistence.xml file. ***Names need to be 100% match***
2. Create a JPAUAuthority class
```
package org.improving.springPractice;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class JPAUAuthority {
    private static final EntityManagerFactory emFactory;

    static {
        emFactory = Persistence.createEntityManagerFactory("org.improving");
    }
    public static EntityManager getEntityManager() {
        return emFactory.createEntityManager();
    }
    public static void close() {
        emFactory.close();
    }

}
```
3. Create a repository to save data passing back and forth with MySQL. In this case "Alien class"
```
@Entity
@Table(name="Alien")
public class Alien {
    @Id
    private int aid;
    private String aidName;
    private String tech;

    public int getAid() {
        return aid;
    }

    public void setAid(int aid) {
        this.aid = aid;
    }

    public String getAidName() {
        return aidName;
    }

    public void setAidName(String aidName) {
        this.aidName = aidName;
    }

    public String getTech() {
        return tech;
    }

    public void setTech(String tech) {
        this.tech = tech;
    }

    @Override
    public String toString() {
        return "Alien [aid = " + aid + ", aname= " + aidName + " tech = " + tech + "]";
    }
}


```
4. In App class create or modify data
```
package org.improving.springPractice;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.List;

public class App {
    public static void main(String[] args) {

        Alien a = new Alien();
        a.setAidName("John");
        a.setTech("Ops");
        EntityManager emf = JPAUAuthority.getEntityManager();
        emf.getTransaction().begin();
        //List<Alien> alien = emf.createQuery("select al from alien al").getResultList();
        emf.persist(a);
        emf.getTransaction().commit();
        Alien id4 = emf.find(Alien.class, 4);
        System.out.println(id4);

    }



}

```
