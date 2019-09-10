## 1. Bean的作用域--@Scope("singleton")
1. singleton：单例模式，Spring IoC 容器中只会存在一个共享的 Bean 实例，无论有多少个
Bean 引用它，始终指向同一对象。该模式在多线程下是不安全的。Singleton 作用域是
Spring 中的缺省作用域，也可以显示的将 Bean 定义为 singleton 模式 
2. prototype:原型模式，每次通过 Spring 容器获取 prototype 定义的 bean 时，容器都将创建
一个新的 Bean 实例，每个 Bean 实例都有自己的属性和状态，而 singleton 全局只有一个对
象。根据经验，对有状态的bean使用prototype作用域，而对无状态的bean使用singleton
作用域
3.request：在一次 Http 请求中，容器会返回该 Bean 的同一实例。而对不同的 Http 请求则会
产生新的 Bean，而且该 bean 仅在当前 Http Request 内有效,当前 Http 请求结束，该 bean
实例也将会被销毁
4. session：在一次 Http Session 中，容器会返回该 Bean 的同一实例。而对不同的 Session 请
求则会创建新的实例，该 bean 实例仅在当前 Session 内有效。同 Http 请求相同，每一次
session 请求创建新的实例，而不同的实例之间不共享属性，且实例仅在自己的 session 请求
内有效，请求结束，则实例将被销毁
5. global Session：在一个全局的 Http Session 中，容器会返回该 Bean 的同一个实例，仅在
使用 portlet context 时有效

## 2. Bean的生命周期
1. Bean的实例化：Spring IoC容器找到关于Bean的定义并实例化该Bean
2. Bean属性注入：利用反射技术实现属性及依赖Bean的注入
3. setBeanName 实现:如果这个 Bean 已经实现了 BeanNameAware 接口，会调用它实现的 setBeanName(String)
方法，此处传递的就是 Spring 配置文件中 Bean 的 id 值
4. ApplicationContextAware 实现:如果这个 Bean 已经实现了 ApplicationContextAware 接口，会调用
setApplicationContext(ApplicationContext)方法，传入 Spring 上下文
5. postProcessBeforeInitialization 接口实现-初始化预处理:如果这个 Bean 关联了 BeanPostProcessor 接口，将会调用
postProcessBeforeInitialization(Object obj, String s)方法，BeanPostProcessor 经常被用
作是 Bean 内容的更改，并且由于这个是在 Bean 初始化结束时调用那个的方法，也可以被应
用于内存或缓存技术
6. init-method:如果 Bean 在 Spring 配置文件中配置了 init-method 属性会自动调用其配置的初始化方法
7. postProcessAfterInitialization：如果这个 Bean 关联了 BeanPostProcessor 接口，将会调用
postProcessAfterInitialization(Object obj, String s)方法。注：以上工作完成以后就可以应用这个 Bean 了，那这个 Bean 是一个 Singleton 的，所以一
般情况下我们调用同一个 id 的 Bean 会是在内容地址相同的实例，当然在 Spring 配置文件中
也可以配置非 Singleton
8. 使用Bean：此时有关Bean的所有准备工作均已完成，Bean可以被程序使用了，它们将会一直驻留在应用上下文中，直到该上下文环境被销毁
9. DisposableBean的destory()方法：如果Bean实现了DisposableBean接口，Spring将会在Bean实例销毁之前调用该接口的destory()方法，来完成一些销毁之前的处理工作

## 3. 两种代理JDK和CGLIB的区别
1. JDK 动态接口代理：DK 动态代理主要涉及到 java.lang.reflect 包中的两个类：Proxy 和 InvocationHandler。
InvocationHandler是一个接口，通过实现该接口定义横切逻辑，并通过反射机制调用目标类
的代码，动态将横切逻辑和业务逻辑编制在一起。Proxy 利用 InvocationHandler 动态创建
一个符合某一接口的实例，生成目标类的代理对象
2. CGLib 动态代理：CGLib 封装了 asm，可以再运行期动态生成新
的 class。和 JDK 动态代理相比较：JDK 创建代理有一个限制，就是只能为接口创建代理实例，
而对于没有通过接口定义业务方法的类，则可以通过 CGLib 创建动态代理
3. JDK动态代理只能对实现了接口的类生成代理，而不能针对类；CGLIB是针对类实现代理，主要是对指定的类生成一个子类，覆盖其中的方法，因为是继承，所以该类或方法不要声明成final 

## 4. spring事务
1. Spring并不直接管理事务，而是提供了多种事务管理器，他们将事务管理的职责委托给Hibernate或者JTA等持久化机制所提供的相关平台框架的事务来实现
2. 事务属性
    + 传播行为
    + 隔离级别
    + 只读
    + 事务超时
    + 回滚规则




