---
layout: post
title: Spring Boot로 TEAMUP BOT 만들기 - (1)
subtitle: Spring Boot로 TEAMUP BOT 뼈대 만들기!
category: zuminternet
author: 권용근
nickname: kingbbode
tag: [spring,boot,bot,teamup]
---

Spring Boot로 TEAMUP BOT 만들기 - (1)
-------------------------------------

2016년 연초 줌인터넷에서는 2016년 전략이 발표되었습니다. <br>그 중 눈을 의심하게 만드는 목표가 있었으니, 그것이 바로<br><br>`잉여력 확보!?`<br> ![잉여력?](/images/2016/2016_10_13_TEAMUP_BOT_START/yy.png)

이런 의미는 아니고, `더 높은 도약을 위해 개개인의 잉여 시간을 확보하여 업무를 더 효율적으로 하자는 의도!` 그렇게 확보된 잉여력으로 무엇을 할까 고민하여 사내에서 사용하는 메신저 팀업의 봇을 만들게 되었습니다.

### 팀업이란?

이스트소프트의 기업용 메신저 [팀업(TeamUP)](http://tmup.com)은

-	사내 메신저
-	프로젝트별 그룹피드(게시판)
-	문서 등 자료 중앙관리
-	대용량 파일 전송

등 다양한 업무 도구를 제공해 빠른 커뮤니케이션(소통)을 통한 업무 효율을 향상시켜주는 기업용 통합 커뮤니케이션 플랫폼입니다.

[![팀업](/images/2016/2016_10_13_TEAMUP_BOT_START/teamup.jpg)](https://tmup.com/)

자세한 내용은 [팀업 소개 페이지](https://tmup.com/main/function)로!

---

### 활용 예시?!

-	피드에 연차 알림  
	![연차](/images/2016/2016_10_13_TEAMUP_BOT_START/ex1.jpg)  
-	빈 회의실 조회  
	![회의실](/images/2016/2016_10_13_TEAMUP_BOT_START/ex2.png)  
-	통계  
	![통계](/images/2016/2016_10_13_TEAMUP_BOT_START/ex3.jpg)  
-	근처 식당 점심 메뉴  
	![점심](/images/2016/2016_10_13_TEAMUP_BOT_START/ex4.png)  
-	모임 알림  
	![모임](/images/2016/2016_10_13_TEAMUP_BOT_START/ex5.jpg)

<br>외에도 투표, 사다리 등등 **귀차니즘을 해결해줄 수 있는 다양한 기능** 을 구현할 수 있습니다!

---

### API Key 신청

[팀업 Developer Center](https://tmup.com/main/developer)로 접속하여 API Key 신청합니다!  
![팀업](/images/2016/2016_10_13_TEAMUP_BOT_START/developer_center.png)

신청이 승인되어 `client_id`와 `client_secret`을 발급받으면 모든 준비 완료!<br><br>

### **본격적으로 개발을 시작하여보겠습니다!**

<br>

Spring Boot 기반 개발 시작!
---------------------------

스프링 부트는 스프링 프레임워크를 사용하는 프로젝트를 아주 간편하게 최소한의 설정으로 셋업할 수 있는, 스프링 프레임워크의 진입장벽을 낮춰준 고마운 서브프로젝트입니다. 스프링 부트로 간편하게 stand-alone 환경의 봇을 만들어보겠습니다!

### **Dependency**

> build.gradle

```
compile('org.springframework.boot:spring-boot-starter-web')
compile('org.springframework.security.oauth:spring-security-oauth2:2.0.8.RELEASE')
```

-	**spring-boot-starter-web**
	-	내장 톰켓과 RESTful 등 웹서버를 구축하기 위한 기본 의존성을 제공
-	**spring-security-oauth2**
	-	TeamUP의 Oauth2 Token을 쉽게 사용하기위해 사용

---

### Configuration

#### POJO

![teamupAPI](/images/2016/2016_10_13_TEAMUP_BOT_START/teamup_api.png)  
[TeamUp developer에서 제공하는 API 문서](http://team-up.github.io/)를 참고하여 POJO를 작성하여 주도록 합니다.

<br>

#### Properties

스프링에서는 변경될 여지가 있는, 민감하고 다소 정적인 설정 값들을 주로 외부 설정 파일로 관리를 하고 있습니다. 스프링에서는 `@PropertySource` 어노테이션을 통해서 Spring initializr로 제공되는 `application.properties` 외에 별도로 생성한 properties로 환경 변수를 할당할 수 있도록 지원하고 있습니다.

properties로 API를 사용하기 위해 먼저 발급받은 `client id`,`client_secret`과 봇과 연동될 `팀업 계정 정보`를 properties에 적어줍니다.<br> 사용할 TeamUP API도 명세해줍니다.

> src/main/resources/properties/bot.properties

```java
bot.event.url=https://ev.tmup.com/v3/events
bot.event.message.read.url=https://edge.tmup.com/v3/messages/
bot.event.message.send.url=https://edge.tmup.com/v3/message/
bot.event.feed.write.url=https://edge.tmup.com/v3/feed/
bot.oauth.token.url=https://auth.tmup.com/oauth2/token
bot.oauth.client.id={{발급받은 id}}
bot.oauth.client.secret={{발급받은 secret}}
bot.teamup.id={{봇과 연동될 팀업 계정 ID}}
bot.teamup.pw={{봇과 연동될 팀업 계정 비밀번호}}
```

<br> `@Configuration` 어노테이션을 사용하여 기본 환경 변수를 셋팅합니다.

> src/main/java/com.teamup.bot/config/TeamUpConfiguration.java

```java
@Configuration
@PropertySource(
        ignoreResourceNotFound = true,
        value = {
                "classpath:/properties/bot.properties"
                ,"file:/data/etc/teamup-bot/bot.properties"
        }
)
public class TeamUpConfiguration {
}
```

`PropertySource`는 명세된 순서데로 환경 변수를 로드하며, 같은 이름으로 할당된 환경 변수는 나중에 불러진 것으로 덮어씌워집니다. classpath에는 내부 테스트용으로 사용할 환경변수를 할당하고, 외부 설정파일에 다소 민감한 정보를 명세하도록 합니다.

환경변수를 사용하는 각 서비스 계층에서 `@Value` 어노테이션으로 환경 변수를 직접 호출하여도 괜찬지만, 통합하여 관리하기 위하여 저는 `Component`를 하나 만들었습니다.

> src/main/java/com.teamup.bot/properties/TeamUpProperties.java

```java
@Component
public class TeamUpProperties {
    @Value("${bot.event.message.read.url}")
    private String readUrl;

    @Value("${bot.event.message.send.url}")
    private String sendUrl;

    @Value("${bot.event.feed.write.url}")
    private String feedWriteUrl;

    @Value("${bot.event.url}")
    String eventUrl;

    @Value("${bot.oauth.token.url}")
    String tokenUrl;

    @Value("${bot.oauth.client.id}")
    private String clientId;

    @Value("${bot.oauth.client.secret}")
    private String clientSecret;

    @Value("${bot.teamup.id}")
    private String name;

    @Value("${bot.teamup.pw}")
    private String password;

    ...
}
```

<br>

#### RestTemplate

스프링은 RESTful 서비스를 쉽게 사용할 수 있도록 `RestTemplate` 객체를 제공합니다. API 통신을 위해서 `Bean`을 생성합니다. API와 통신 조건을 만족하기 위해 4가지 MessageConverter를 사용하였습니다.

> src/main/java/com.teamup.bot/config/ApplicationConfig.java

```java
@Configuration
public class ApplicationConfig {

    @Bean(name = "messageRestOperations")
    @Primary
    public RestOperations messageRestOperations() {
        HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
        factory.setConnectTimeout(1000);
        factory.setReadTimeout(1000);
        return getRestOperations(factory);
    }

    @Bean(name = "eventRestOperations")
    public RestOperations eventRestOperations() {
        HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
        factory.setConnectTimeout(1000);
        factory.setReadTimeout(30000);
        return getRestOperations(factory);
    }

    private RestOperations getRestOperations(HttpComponentsClientHttpRequestFactory factory) {
        RestTemplate restTemplate = new RestTemplate(factory);

        StringHttpMessageConverter stringMessageConverter = new StringHttpMessageConverter(Charset.forName("UTF-8"));
        MappingJackson2HttpMessageConverter jackson2Converter = new MappingJackson2HttpMessageConverter();
        ByteArrayHttpMessageConverter byteArrayHttpMessageConverter = new ByteArrayHttpMessageConverter();
        FormHttpMessageConverter formHttpMessageConverter = new FormHttpMessageConverter();
        formHttpMessageConverter.setCharset(Charset.forName("UTF-8"));

        List<HttpMessageConverter<?>> converters = new ArrayList<>();
        converters.add(jackson2Converter);
        converters.add(stringMessageConverter);
        converters.add(byteArrayHttpMessageConverter);
        converters.add(formHttpMessageConverter);

        restTemplate.setMessageConverters(converters);
        return restTemplate;
    }

    ...
}
```

`eventRestOperations`의 ReadTimeout이 30초인 이유는 아래에 `RealTime Message Event`에 설명하겠습니다!<br> 두 개 이상의 같은 객체를 반환되는 `Bean`을 설정할 때는 `@Primary` 어노테이션으로 default로 사용될 Bean을 명시해주어야 합니다.

<br>

#### ThreadPoolTaskExecutor

스레드 풀은 작업 처리에 사용되는 스레드를 제한된 개수만큼 정해 놓고 작업 큐에 들어오는 작업들을 하나씩 스레드가 맡아 처리하며 스프링에서는 `ThreadPoolTaskExecutor`를 제공합니다.<br> Message Event를 병렬로 효과적으로 처리하기 위해서 사용될 것 입니다.

> src/main/java/com.teamup.bot/config/ApplicationConfig.java

```java
@Configuration
public class ApplicationConfig {
        ...

        @Bean
    public ThreadPoolTaskExecutor threadPoolTaskExecutorDefault() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);
        executor.setMaxPoolSize(10);
        executor.setQueueCapacity(1000);
        executor.setWaitForTasksToCompleteOnShutdown(true);
        return executor;
    }

        ...
}
```

여기까지 했다면 기본 Configuration 끝!

---

### **Oauth2 인증**

TeamUp API는 Oauth2 Token 기반이며, Oauth2를 제외한 모든 API 기능은 Access 토큰을 필요로하고 있습니다.

`Oauth2Template`는 TeamUp API와 Auth 통신을 하는 Template 구현체 입니다.

> src/main/java/com.teamup.bot/teamup/templates/template/Oauth2Template.java

```java
@Component
public class Oauth2Template  {
    ...

    public OAuth2AccessToken token(OAuth2AccessToken accessToken){
        if (accessToken == null) {
            return post(accessToken, GrantType.PASSWORD);
        }else{
            if (accessToken.isExpired()) {
                return post(accessToken, GrantType.REFRESH);
            }
        }
        return accessToken;
    }

    private OAuth2AccessToken post(OAuth2AccessToken accessToken, GrantType grantType) {
        ResponseEntity<OAuth2AccessToken> response = restOperations.postForEntity(teamUpProperties.getTokenUrl(), getEntity(accessToken, grantType),
                OAuth2AccessToken.class);

        if (response.getStatusCode().equals(HttpStatus.OK)) {
            accessToken = response.getBody();
        }

        return accessToken;
    }


    private HttpEntity<Object> getEntity(OAuth2AccessToken oAuth2AccessToken, GrantType grantType) {
        HttpHeaders header = new HttpHeaders();
        header.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        MultiValueMap<String, Object> data = new LinkedMultiValueMap<>();
        data.add("grant_type", grantType.getKey());

        if (GrantType.PASSWORD.equals(grantType)) {
            data.add("client_id", teamUpProperties.getClientId());
            data.add("client_secret", teamUpProperties.getClientSecret());
            data.add("username", teamUpProperties.getName());
            data.add("password", teamUpProperties.getPassword());
        } else if (GrantType.REFRESH.equals(grantType)) {
            data.add("refresh_token", oAuth2AccessToken.getRefreshToken().getValue());
        }
        return new HttpEntity<>(data, header);
    }
}
```

반환되는 Oatuh2 Token은 `spring-security-oauth2`에서 제공하는 `Oatuh2Token` 객체로 쉽게 만료를 확인하고 갱신을 해주고 있습니다!

<br>

다음으로 Oauth2 Token을 보관, 관리하는 `TokenManager`입니다. getAccessToken()이 실행될 때마다 `Oauth2Template`의 token()을 호출하여, 없다면 생성, 만료되었다면 갱신한 토큰을 전달해 주게됩니다.

`@PostConstruct`는 자바 객체의 기본 생성자와는 다르게, 의존하는 객체를 설정한 이후의 초기화 작업입니다. 의존성이 주입된 oatuh2Template 객체를 사용하기 위해 PostConstruct에서 초기화합니다. 최초 토큰을 할당받은 후 이벤트 스레드를 구동시킵니다.

> src/main/java/com.teamup.bot/teamup/TokenManager.java

```java
@Component
public class TokenManager {
        ...
    @PostConstruct
    void init(){
        accessToken = oauth2Template.token(accessToken);
				TeamUpEventSensorRunner.exceute();
    }

    public String getAccessToken() {
        accessToken = oauth2Template.token(accessToken);
        return accessToken.getValue();
    }
}
```

---

### **BaseTemplate**

`Oaut2Template`는 다른 Template와 다르게 동작하여 따로 생성하였지만, Read, Write 등 API 통신을 하는 다른 요청은 기본적으로 같은 방식으로 동작을 합니다. `BaseTemplate`는 공통으로 사용될 RESTful 서비스를 제공하는 상위 구현체입니다.

```java
public class BaseTemplate {
    ...

        public void setRestOperations(RestOperations restOperations) {
        this.restOperations = restOperations;
    }

    protected <T> T get(String url, ParameterizedTypeReference<T> p) {
        return send(url, null, p, HttpMethod.GET);
    }

    protected <T> T post(String url, Object request, ParameterizedTypeReference<T> p) {
        return send(url, request, p, HttpMethod.POST);
    }

    private <T> T send(String url, Object request, ParameterizedTypeReference<T> p, HttpMethod httpMethod) {

        HttpEntity<Object> entity = getEntity(request);
        ResponseEntity<T> responseEntity = null;

        try {
            responseEntity = restOperations.exchange(url, httpMethod, entity, p);
        } catch (ResourceAccessException e) {
            Throwable t = e.getCause();
            if (t != null && !(t instanceof SocketTimeoutException)) {
                logger.error("ResourceAccessException - {}", e);
            }
        }catch (HttpClientErrorException e){            
            logger.error("HttpClientErrorException - {}", e);        
        } catch (RestClientException e) {
            logger.error(url, e);
        }
        catch (Exception e) {
            logger.error("url", e);
        }

        if (responseEntity != null && responseEntity.getStatusCode().equals(HttpStatus.OK)) {
            return responseEntity.getBody();
        } else {
            if(responseEntity != null){
                logger.error("StatusCode : " + responseEntity.getStatusCode());
            }
        }
        return null;
    }

    private HttpEntity<Object> getEntity(Object request) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.add("Authorization", "bearer " + tokenManager.getAccessToken());
        return new HttpEntity<>(request, headers);
    }
}
```

---

### **RealTime Message Event**

`EventTemplate`는 `BaseTemplate`를 상속하여 Event에 대한 API 통신만 하는 구현체입니다. 팀업에서 제공하는 Event API는 이벤트 대기 API이며, 요청 중 이벤트가 발생했을 때 이벤트를 반환합니다. 아무런 이벤트가 없을 경우 발생하는 ReadTimeout을 최소화하기 위하여 ReadTimeout을 30초로 지정해두었던 `eventRestOperations`을 사용합니다.

```java
@Component
public class EventTemplate extends BaseTemplate {
        ...

        @Autowired
        @Qualifier(value = "eventRestOperations")
        RestOperations restOperations;

    @PostConstruct
    void init(){
        super.setRestOperations(restOperations);
    }

    public EventResponse getEvent() {
        ParameterizedTypeReference<EventResponse> p = new ParameterizedTypeReference<EventResponse>() {
        };
        return get(teamUpProperties.getEventUrl(),  p);
    }
}
```

실시간으로 메세지를 처리하기 위해 `ThreadPoolTaskExecutor`를 사용할 것 입니다. 이벤트 대기 상태에서 이벤트가 반환되었을 때 바로 다음 이벤트를 대기할 수 있도록 `teamUpEventSensorRunner.exceute()`를 실행하여 이벤트 대기 스레드를 병렬로 할당합니다.

> src/main/java/com.teamup.bot/sensor/TeamUpEventSensor.java

```java
@Component
public class TeamUpEventSensor {
        ...

    private static final String EVENT_MESSAGE = "chat.message";
    private static final String EVENT_JOIN = "chat.join";    

    public void sensingEvent(){
        EventResponse eventResponse = null;
        try {
            eventResponse = eventTemplate.getEvent();
        }catch (Exception e) {
            logger.error("TeamUpEventSensor - sensingEvent : {}", e);
        }
        teamUpEventSensorRunner.exceute();
        if (!ObjectUtils.isEmpty(eventResponse)) {
            ArrayList<EventResponse.Event> eventTypes = eventResponse.getEvents();
            if (eventTypes.size() > 0) {
                eventTypes.stream().forEach(event->{
                    if(EVENT_MESSAGE.equals(event.getType())){
                        messageService.readMessage(event.getChat().getMsg(), event.getChat().getRoom(), event.getChat().getUser());
                    }else if(EVENT_JOIN.equals(event.getType())){
                        messageService.sendMessage(BrainUtil.getGreeting(),event.getChat().getRoom());
                    }
                });
            }
        }
    }
}
```

`ThreadPoolTaskExecutor`를 사용하는 구현체입니다. Task로 `TeamUpEventSensor`의 sesingEvent를 사용합니다.

> src/main/java/com.teamup.bot/sensor/TeamUpEventSensorRunner.java

```java
@Service
public class TeamUpEventSensorRunner {
    public static class FetcherTask implements Runnable {
        TeamUpEventSensor teamUpEventSensor;
        public FetcherTask(TeamUpEventSensor teamUpEventSensor) {
            this.teamUpEventSensor = teamUpEventSensor;
        }

        @Override
        public void run() {
            teamUpEventSensor.sensingEvent();
        }
    }

    @Autowired
    private ThreadPoolTaskExecutor executer;

    @Autowired
    private TeamUpEventSensor teamUpEventSensor;

    public void exceute() {
        executer.execute(new FetcherTask(teamUpEventSensor));
    }
}
```

---

### **Meesage Read, Write**

팀업의 Event API는 메시지 내용을 반환하여 주지 않습니다.([TeamUP API : EVENT](http://team-up.github.io/v3/ev/)\) 대신 Event에서는 메시지번호를 반환하여 주는데 이 메세지 번호를 통해 메세지를 읽어올 수 있습니다. 또한 Event는 해당 이벤트가 발생한 room id와 발생시킨 주체의 user id를 반환하여 줍니다. 메세지를 write 할 때는 room id를 사용하여 해당 방에 설정해둔 반응을 전송하여 줍니다. TeamUp API의 다양한 기능으로 보다 정밀하고 고도화된 기능 구현도 가능합니다.

`EdgeTemplate`는 `BaseTemplate`를 상속하여 Message에 대한 API 통신만 하는 구현체입니다.

> src/main/java/com.teamup.bot/teamup/templates/template/EdgeTemplate.java

```java
@Component
public class EdgeTemplate extends BaseTemplate {
    @Autowired
    EnvironmentProperties environmentProperties;

    @Autowired
    BotProperties botProperties;

    @Autowired
    MessageService messageService;

    @Autowired
    @Qualifier(value = "messageRestOperations")
    RestOperations restOperations;
    @PostConstruct
    void init(){
        super.setRestOperations(restOperations);
    }

    public ReadResponse readMessage(String message, String room) {
        ParameterizedTypeReference<ReadResponse> p = new ParameterizedTypeReference<ReadResponse>() {
        };
        return get(environmentProperties.getReadUrl() + room + "/1/0/" + message, p);
    }

    public void sendMessage(String message, String room) {
        if(!StringUtils.isEmpty(message)) {
            ParameterizedTypeReference<ReadResponse> p = new ParameterizedTypeReference<ReadResponse>() {
            };
            post(environmentProperties.getSendUrl() + room, new SendMessage(message), p);
        }
    }
}

```

`edgeTemplate`를 서비스로 사용할 수도 있지만, `@Service` 어노테이션을 사용하는 것이 서비스계층의 클래스들을 처리하는데 더 적합하며 관점에 더 연관성을 부여할 수 있습니다. 구조적인 효율을 위해 서비스계층인 `MessageService` 구현합니다.

서비스계층에서 room, user, meesage를 조합하여 비지니스로직을 구현합니다.

> src/main/java/com.teamup.bot/service/impl/MessageServiceImpl.java

```java
@Service
public class MessageServiceImpl implements MessageService {
    @Autowired
    EdgeTemplate edgeTemplate;

    @Override
    public void readMessage(String message, String room, String user) {
        ReadResponse readResponse = edgeTemplate.readMessage(message, room);
        if (!ObjectUtils.isEmpty(readResponse) && readResponse.getMsgs().size() > 0) {
            String content = readResponse.getMsgs().get(0).getContent();
            if (!StringUtils.isEmpty(content)) {
                excuteMessage(room, user, content);
            }
        }
    }

    @Override
    public void sendMessage(String message, String room) {
        edgeTemplate.sendMessage(message, room);
    }
        ...
}
```

다음은 `excuteMessage`의 예제입니다.

```java
public void excuteMessage(String room, String user, String content){
    if("#안녕".equals(content)){
        sendMessage("그래 안녕", room);
    }
}
```

여기까지 구현된 봇 어플리케이션을 구동하여보면,

![그래, 안녕!](/images/2016/2016_10_13_TEAMUP_BOT_START/message_ex.png)

<br>

완성!

---

끝
==

Event부터 Message까지 기본적인 봇의 뼈대를 구성해보았습니다. 이제 이 봇에 코딩을 통해 보다 많은 기능을 마음 껏 달 수가 있습니다. <br> 봇을 활용해서 재미있는 사내 문화를 만들어보세요!

[팀업 문의](https://tmup.com/)  
[팀업 API](http://team-up.github.io/)
