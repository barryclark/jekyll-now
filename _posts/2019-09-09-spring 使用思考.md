****************
spring 相关
================
**spring的ioc，di的作用。有什么好处**
1. 不用关心对象的创建。
2. 不用关心生命周期，对象都是单例的Singleton
3. 依赖注入使面向接口编程成为可能。

**spring 和mybatis怎么高效整合**
**怎么整合多数据源**

**事务的概念，spring声明式事务的原理**
spring管理事务主流的方式：
1. tx:advice+aop,一次配置永久生效。详见：https://github.com/HaoPractice/netmarket_springboot/blob/master/src/main/resources/configs/spring-mybatis.xml 缺点：没有明确指定哪些方法需要事务控制。控制细粒度粗。
2. 使用transactional注解。优点：控制细粒度高，目标明确。对于只读操作，单个的crud操作，一般是不需要事务的。

事务的使用注意：保证事物方法的执行时间尽可能短。不要把其他的操作放进事务管理，比如在事务中，不要写取缓存、方法调用等耗时的代码，把这些操作放在事务外。

事务的隔离级别与传播属性:
http://zhangrong-0825-163-com.iteye.com/blog/1434529

声明式事务

**spring定时任务怎么使用，默认是多线程还是单线程？如何配置为多线程，怎么让多个任务一起运行？**


***************************
spring mvc相关
================
**spring mvc的运作流程**
**controller 开发技巧**··