---
layout: post
title: byType DI로 복수의 Bean 받기
lang: kr
categories: [spring]
tags: spring
---

 Spring에서의 DI는 Collection, List, Set. Array 등으로 N개의 Bean을 받을 수 있다.

설명이 애매하니 코드로 살펴보면 아래와 같다.

{% highlight java %}
@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        ConfigurableApplicationContext applicationContext =
            SpringApplication.run(DemoApplication.class, args);

        applicationContext.getBean(SomeConfiguration.class).initialize();
    }

    @Component
    public class SomeConfiguration {

        @Autowired
        private Collection<SomeInitializer> initializers;

        public void initialize() {

            initializers.forEach(SomeInitializer::init);
        }
    }

    public interface SomeInitializer {
        void init();
    }

    @Component
    @Slf4j
    public static class AInitializer implements SomeInitializer {

        @Override
        public void init() {
            log.info("A Initializer");
        }
    }

    @Component
    @Slf4j
    public static class AAInitializer implements SomeInitializer {

        @Override
        public void init() {
            log.info("AA Initializer");
        }
    }

    @Component
    @Slf4j
    public static class BInitializer implements SomeInitializer {

        @Override
        public void init() {
            log.info("B Initializer");
        }
    }
{% endhighlight %}

실행시켜보면 3개의 Log가 잘 찍히는 것을 확인할 수 있다.

Collection뿐 아니라 List, Set, Array로도 받을 수 있다.


### 응용1
위 코드를 실행시켜보면 Collection, List, Set, Array를 불문하고 AA, A, B 순서로 출력된다.

AAInitializer 등을 추가해봐도 BeanName순으로 정렬되어 돌아오는 것을 알 수 있다.

이러한 경우, @Order와 함께 쓸 수 있다.

{% highlight java %}

@Component
@Order(2)
@Slf4j
public static class AInitializer implements SomeInitializer {

    @Override
    public void init() {
        log.info("A Initializer");
    }
}

@Component
@Slf4j
public static class AAInitializer implements SomeInitializer {

    @Override
    public void init() {
        log.info("AA Initializer");
    }
}

@Component
@Order(1)
@Slf4j
public static class BInitializer implements SomeInitializer {

    @Override
    public void init() {
        log.info("B Initializer");
    }
}
{% endhighlight %}

B, A, AA 순으로 출력되는 것을 확인할 수 있다.

> @Order의 경우 attribute를 입력하지 않으면 기본값으로 2147483647, Integer의 MAX 값으로 입력됨을 알아두자.


### 응용2

이러한 Spring의 기능은 @Resource, @Inject 등과도 함께 사용할 수 있지만, @Autowired 한정으로 @Qualifier와 함께 쓸 수 있다.

Bean 설정 및 Autowired에 아래와 같이 @Qualifier를 추가하면

{% highlight java %}
@Component
public class SomeConfiguration {

    @Autowired
    @Qualifier("live")
    private SomeInitializer[] initializers;

    public void initialize() {

        Stream.of(initializers).forEach(SomeInitializer::init);
        //initializers.(SomeInitializer::init);
    }
}

public interface SomeInitializer {
    void init();
}

@Component
@Qualifier("live")
@Slf4j
public static class AAInitializer implements SomeInitializer {

    @Override
    public void init() {
        log.info("AA Initializer");
    }
}

@Component
@Qualifier("live")
@Order(2)
@Slf4j
public static class AInitializer implements SomeInitializer {

    @Override
    public void init() {
        log.info("A Initializer");
    }
}

@Component
@Order(1)
@Slf4j
public static class BInitializer implements SomeInitializer {

    @Override
    public void init() {
        log.info("B Initializer");
    }
}
{% endhighlight %}

B를 제외하고 A, AA만 확인할 수 있다.

이러한 세부설정은 @Profile이나 @Conditional~ 과도 함께 쓸 수 있다.(이 부분은 다음 기회에)

### 마치며
실제 위 코드를 실행해보면 Collection이나 List, Array 대신 Set으로 DI를 받는 경우에도, Bean의 순서가 일정하게 유지되는 것을 확인할 수 있다.

이를 Debuger로 확인해보면 Set의 구현체가 LinkedHashSet으로 되어 있는 것을 확인할 수 있다.

실제 Spring에서는 순서를 보장하면서도 동일한 Bean이 중복되지 않게 하기 위해 내부적으로 Set을 사용하면서도 LinkedHashSet을 사용하는 경우를 꽤 볼 수 있다.