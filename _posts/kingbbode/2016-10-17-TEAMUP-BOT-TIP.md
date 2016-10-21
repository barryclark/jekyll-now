---
layout: post
title: Spring Boot로 TEAMUP BOT 만들기 - (2)
subtitle: Spring Boot로 TEAMUP BOT 구조 잡기!
category: zuminternet
author: 권용근
nickname: kingbbode
tag: [spring,boot,bot,teamup]
---

![post_main](/images/2016/2016_10_13_TEAMUP_BOT_START/main.png)

이전 포스팅에서 기본적인 봇의 뼈대를 완성했다면, 이번 포스팅에서는 보다 체계적인 구조와 기능을 완성하기 위해 스프링에서 제공해주는 아래 기능들을 활용해보려고 합니다!

-	**Reflection**
	-	MVC의 Controller와 같이 봇에서 구현한 명령어의 Controller를 만들어 봅니다.
-	**AOP**
	-	구현된 명령어에 권한 설정을 해봅니다.
-	**Scheduling**
	-	스케줄링을 활용하여 기능을 구현합니다.

### **Reflection**

`Reflection`이란 객체를 통해 클래스의 정보를 분석해 내는 프로그램 기법을 말합니다. 스프링이 아닌 자바의 특징으로 실행중인 자바프로그램 내부를 검사하고 내부의 속성을 수정할 수 있습니다. `Spring Container`의 `BeanFactory`가 어플리케이션이 실행한 후 객체가 호출 될 당시 객체의 인스턴스를 생성하게 되는데 그 때 Reflection 기술을 사용하고 있습니다.

늘어나는 명령어를 하나씩 분기처리 또는 어딘가에 저장하여 매칭하는 수고를 덜기 위하여, `Reflection`을 사용하여 봇의 기능 컨트롤러를 만들어보겠습니다.

<br>

#### Defendency

```java
compile('org.reflections:reflections:0.9.10')
```

<br>

#### Annotation

어노테이션(Annotation)은 Java 5부터 등장한 기능입니다.

어노테이션은 설명 그 이상의 활동을 합니다. 어노테이션이 붙은 코드는 어노테이션의 구현된 정보에 따라 연결되는 방향이 결정됩니다. 따라서 전체 소스코드에서 비즈니스 로직에는 영향을 주지는 않지만 해당 타겟의 연결 방법이나 소스코드의 구조를 변경할 수 있습니다. 쉽게 말해서 "이 속성을 어떤 용도로 사용할까, 이 클래스에게 어떤 역할을 줄까?"를 결정해서 붙여준다고 볼 수 있습니다. 어노테이션은 소스코드에 메타데이터를 삽입하는 것이기 때문에 잘 이용하면 구독성 뿐 아니라 체계적인 소스코드를 구성하는데 도움을 줍니다.([참고:nextree](http://www.nextree.co.kr/p5864/)\)

어노테이션은 Method에도 사용 가능합니다. `Brain`이라는 `Annotation`을 새로 작성하여 해당 Method가 봇의 기능을 담당하는 Method라는 것을 설명해주려고 합니다. 봇의 두뇌와 같다고 생각하여 Brain이라는 이름으로 작성하였습니다.

> src/main/java/com.teamup.bot/annotations/Brain.java

```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Brain {
    String key();
    String param();
}
```

`key`는 해당 Method와 매핑되는 메시지가 될 것이며, param은 parameter의 type(필요없는지, String인지, Integer인지를)을 설명합니다.

<br>

#### Reflection 하기!

명령들의 집합을 가지고 있는 컨트롤러 기능을 수행할 Comoponent를 생성합니다.<br> 모든 기능 Method는 String room, String user를 가져야하며, param이 null이 아닌 Method는 String param을 갖도록하는 규칙을 가져야 합니다. 이는 Reflection으로 추출된 Method를 Invoke 시키기 위함입니다.

> src/main/java/com.teamup.bot/annotations/BrainComponent.java

```java
@Component
public class BrainComponent {
        @Brain(key = "안녕", param = BrainUtil.PARAM_NULL)
    public String hello(String room, String user) {
        return "그래, 안녕";
    }

    @Brain(key = "너는", param = BrainUtil.PARAM_STRING)
    public String me(String room, String user, String param) {
        return "나는 " + param;
    }
```

이제 이 Method들을 어떻게 매칭시킬 것인가?! 지난 포스팅에서 구현되었던 `MessageService`에서 매칭을 해보겠습니다.

> src/main/java/com.teamup.bot/service/MessageService.java

```java
 private Map<String, Method> brain = new HashMap<>();
 private Map<String, String> brainType = new HashMap<>();

 @PostConstruct
 public void loadBrain() {
         Reflections reflections = new Reflections(new ConfigurationBuilder()
                         .setUrls(ClasspathHelper.forPackage("com.teamup.bot")).setScanners(
                                         new MethodAnnotationsScanner()));

         Set<Method> methods = reflections
                         .getMethodsAnnotatedWith(Brain.class);

         try {
                 methods.stream().forEach(method -> {
                         Brain brainAnnotation = method.getAnnotation(Brain.class);
                         String key = brainAnnotation.key();
                         brain.put(key, method);
                         brainType.put(key, brainAnnotation.param());
                 });
         } catch (RuntimeException e) {
                 logger.error("MessageComponent - loadBrain : {}", e);
         }
 }
```

지난 포스팅에서 설명했던 PostConstruct를 활용하여 의존성이 주입된 후 초기화 작업으로 brain, brainType을 설정했습니다. `Class`를 따로 생성하여 brain과 brainType을 하나의 map에 저장하여도 좋습니다. `Reflection`을 사용하여 `Annotation`을 기준으로 Method를 추출하여 저장하였습니다.

<br>

#### Invoke

> src/main/java/com.teamup.bot/service/MessageService.java

```java
public void excuteMessage(String room, String user, String content){
    /*
    * 지난 코드는 지우고!
    if("#안녕".equals(content)){
        sendMessage("그래 안녕", room);
    }
    */
    String command = content.split(" ")[0];
    String param = cotent.replaceAll(command+" ","");
    if (brain.containsKey(command)) {
         try {
                 if (BrainUtil.PARAM_STRING.equals(brainType.get(command))) {
                         result = (String) brain.get(command).invoke(brainComponent, room, user, param);
                 } else {
                         result = (String) brain.get(command).invoke(brainComponent, room, user);
                 }
         } catch (Exception e) {
                 logger.error("MessageComponent - readMessage - invoke : {}", e);
         }
    }
}
```

`excuteMessage`는 조건을 만족한다면 저장해두었던 Method를 `invoke()`시킵니다.<br> 그러면 짜잔! <br> ![그래, 안녕!](/images/2016/2016_10_13_TEAMUP_BOT_TIP/ex1.png)

기능이 완성되었습니다!

**TIP**

-	각 기능에서 사용되는 비지니스로직은 서비스 계층으로 뺀다면 더 깔끔한 구조가 될 것 입니다.
-	command와 param을 분리시키는 방식은 마음데로 바꾸어도 됩니다.
-	기능들에 대해서는 prefix를 붙여주는 것이 좋습니다. 예) #기능

---

### **AOP**

AOP(Aspect Oriented Programming)는 관점 지향 프로그래밍을 의미합니다. 스프링의 `AOP`는 기본적으로 프록시 방식입니다. 프록시 오브젝트를 타깃 오브젝트를 앞에 두고 호출과정을 가로채서 트랜잭션과 같은 부가적인 작업을 진행해줍니다. `AOP`는 보기보다 어려운 개념이므로 따로 더 찾아보는 것을 추천!

Brain Method의 앞단에 프록시를 두어 메소드가 실행되기 전 권한에 대한 유효성 체크를 해보도록 하겠습니다! 늘어나는 명령어에서 모두 권한 검사를 하는 수고를 덜기 위하여, AOP를 사용하여 봇 기능의 권한 체크 기능을 만들어보겠습니다.

<br>

#### 준비

TeamUp Event API는 기본적으로 USER의 번호를 줍니다. 이 유저에 대한 권한을 체크하려면 해당 유저의 권한을 가지고 있는 테이블이 있어야 합니다. 데이터베이스든 내부 소스든 어딘가에는 User의 권한 정보를 입력해주시기 바랍니다!

ex)  
![권한](/images/2016/2016_10_13_TEAMUP_BOT_TIP/ex2.jpg)

<br>

#### Defendency

```java
compile ("org.aspectj:aspectjweaver:1.8.8")
```

<br>

#### Annotation

어노테이션에 대한 설명은 위 Reflection에서 했으므로 생략하겠습니다!

> src/main/java/com.teamup.bot/annotations/Level.java

```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Level {
    LevelType level();
}
```

`LevelType`이라는 Enum 객체를 갖는 `Annotation`입니다. Brain과 함께 설정해도 좋지만 의미상 더 명확하게 하기 위해 분리시켰습니다.

`BrainComponet`에 구현된 기능에 붙입니다.

> src/main/java/com.teamup.bot/annotations/BrainComponent.java

```java
@Component
public class BrainComponent {
    @Level(level=levelType.LEVEL4)
    @Brain(key = "안녕", param = BrainUtil.PARAM_NULL)
    public String hello(String room, String user) {
        return "그래, 안녕";
    }
    ...
```

<br>

#### AspectJ

`@AspectJ`는 Java 5 어노테이션을 사용한 일반 Java 클래스로 관점(Aspect)를 정의하는 방식입니다.

`AspectJ`에서는 여러 관점의 `Advice`들을 제공합니다. 사용할 `Advice`는 `@Around` 입니다. `@Around`는 대상 객체의 메서드 실행 전, 후 또는 예외 발생 시점에 기능을 실행합니다. 위에서 설명한 AOP 동작방식을 생각하면 됩니다. 타겟을 프록시로 감싸 타겟의 실행 전 후에 실행할 수 있습니다.

```java
@Component
@Aspect
public class LevelAspect {
    @Autowired
    UserDao UserDao;

    @Around("@annotation(com.zum.front.bot.annotation.Level)")
    public Object checkLevel(ProceedingJoinPoint joinPoint) throws Throwable {
        MethodSignature methodSignature =  (MethodSignature) joinPoint.getSignature();
        LevelType type = methodSignature.getMethod().getAnnotation(Level.class).level();
        String[] params = methodSignature.getParameterNames();
        Object[] args = joinPoint.getArgs();
        for (int i = 0; i < args.length; i++) {
            if ("user".equals(params[i])){
                                User user = UserDao.get(args[i]);
                if(user == null || !type.equals(user.getLevel()))
                                    return type.getLelvel() + "만 사용할 수 있습니다.";
                }
            }
        }
        return joinPoint.proceed();
    }
}
```

`ProceedingJoinPoint`를 통해 해당 Proxy Method의 정보를 가져올 수 있습니다. `proceed()`로 Inner Method를 수행시키며, 그 전에 return을 하게 된다면 Inner Method가 실행되지 않고 Method가 종료됩니다. 권한이 맞지 않을 경우 Method를 실행시키지 않고 바로 경고 메시지를 return 하도록 하였습니다.

실행하여 보면!!

![레벨](/images/2016/2016_10_13_TEAMUP_BOT_TIP/ex3.png)

권한 체크 기능이 완성 되었습니다!

**TIP**

-	위 예제에서는 Level을 equals 비교를 하였지만, 사용할 Enum에 값을 할당하고 그 값으로 비교를 구현하는 방식으로 원하는 검사를 할 수도 있습니다.
-	switch문을 활용하는 방법도 있습니다.

---

### **Scheduling**

봇에 빠질 수 없는 Scheduling 기능!<br>Spring boot와 함께한다면 엄청나게 간단하게 구현할 수 있습니다. 바로 `EnableScheduling` 어노테이션 때문입니다!

`@EnableScheduling`은 Annotation으로 설정된 `@Scheduled` 를 찾아 등록하고 실행해줍니다.

예제로 매주 월~금요일 점심시간마다 점심시간을 알리는 스케줄을 등록해봅니다!

> src/main/java/com.teamup.bot/service/ScheduleService.java

```java
@Service
@EnableScheduling
public class ScheduleService {
    @Autowired
    MessageService messageService;

  @Scheduled(cron = "0 0 12 * * 1-5")
  public void lunch() {
      messageService.sendMessage("점심시간이다아~~!", {{방 번호}})
  }

}
```

`Scheduled` 어노테이션의 상세한 사용법은 [Spring Docs](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/scheduling.html#scheduling-annotation-support-scheduled) 참조!

다른 서비스계층에 구현한 로직과 함께 여러가지 기능이 구현 가능합니다!

ex)<br> ![레벨](/images/2016/2016_10_13_TEAMUP_BOT_TIP/ex4.png)

**TIP**

-	특정 저장소에 시간을 갖는 이벤트를 저장해두고, pixedDelay를 짧은 간격으로 주어 시간을 체크하는 방식으로 동기적인 스케줄 부여도 가능합니다.

---

끝
==

스프링에서 제공하는 기능으로 봇을 한 층 더 업그레이드 시켜보았습니다. <br> 봇을 활용해서 재미있는 사내 문화를 만들어보세요!

<br>[팀업 문의](https://tmup.com/)  
[팀업 API](http://team-up.github.io/)
