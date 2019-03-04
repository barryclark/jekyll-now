---
layout: post
title: Spring의 Request Logging Filter
categories: [spring]
tags: [spring]
---

 - 이 글은 같은 주제로 popit에도 기고되어 있습니다.
 
 
### popit에는 안했던 이야기
 
 RESTful API를 작성하다 보면 개발단계에서 디버깅을 해야할일이 많은데, Logging이 항상 문제였다.
 
재작년(2017)년쯤 늘 하던대로 Api Logging을 위한 Filter와 Request Wrapper를 만드려 하다가 문득 귀찮아졌다.

Google을 뒤지다가 발견한 것이 [ContentCachingRequestWrapper](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/util/ContentCachingRequestWrapper.html). 조금 뜯어보니 더이상 매번 Request Wrapper를 만들어 쓰지 않아도 될것 같았다.
그렇게 Logging Filter를 만들고 나서 문득 든 생각

> "얘넨 이걸 어디에 쓰려고 만들어 놓은거지?"

문서에 대놓고 쓰여 있는 것이 [AbstractRequestLoggingFilter](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/filter/AbstractRequestLoggingFilter.html)

_**불변의 진리. 세상에 똑똑한 사람은 많고, 내가 만드려는건 이미 누가 다 만들어놨다.**_

심지어 구현체도 있다. [CommonsRequestLoggingFilter](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/filter/CommonsRequestLoggingFilter.html)

굉장히 유용하다고 생각하는 기능인데 지금까지 찾아본 경험으로는 그냥 아는 사람만 알고

뭔가 그럴싸하게 설명하기에는 사실 대단한건 없는 기능이라 더더욱 알려지지 않은 것 같다.


### 맛보기

{% highlight java %}
package org.springframework.web.filter;

import javax.servlet.http.HttpServletRequest;

/**
 * Simple request logging filter that writes the request URI
 * (and optionally the query string) to the Commons Log.
 *
 * @author Rob Harrop
 * @author Juergen Hoeller
 * @since 1.2.5
 * @see #setIncludeQueryString
 * @see #setBeforeMessagePrefix
 * @see #setBeforeMessageSuffix
 * @see #setAfterMessagePrefix
 * @see #setAfterMessageSuffix
 * @see org.apache.commons.logging.Log#debug(Object)
 */
public class CommonsRequestLoggingFilter extends AbstractRequestLoggingFilter {

	@Override
	protected boolean shouldLog(HttpServletRequest request) {
		return logger.isDebugEnabled();
	}

	/**
	 * Writes a log message before the request is processed.
	 */
	@Override
	protected void beforeRequest(HttpServletRequest request, String message) {
		logger.debug(message);
	}

	/**
	 * Writes a log message after the request is processed.
	 */
	@Override
	protected void afterRequest(HttpServletRequest request, String message) {
		logger.debug(message);
	}

}
{% endhighlight %}

> 뚜렷하게 찍혀 있는 @since 1.2.5에 한번 충격

> Juergen Hoeller에 한번 더 충격

가장 기본적인 구현체 [CommonsRequestLoggingFilter](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/filter/CommonsRequestLoggingFilter.html)의 코드이다.

이 기능을 쓰는 방법은 간단하다.

* Logger의 debug level을 활성화시키고
* CommonsRequestLoggingFilter(더 정확히는 AbstractRequestLoggingFilter)를 Spring Bean으로 만들어줄 것

'''
logging.level.org.springframework.web.filter=debug
'''
{% highlight java %}
    @Bean
    public CommonsRequestLoggingFilter requestLoggingFilter() {

        return new CommonsRequestLoggingFilter();
    }
{% endhighlight %}

대충 이렇게.


### 테스트1

{% highlight java %}
    @RestController
    public class DummyController {
    
        private Logger logger = LoggerFactory.getLogger(getClass());
    
        @PostMapping
        @ResponseStatus(HttpStatus.ACCEPTED)
        public void dummyPost(@RequestBody @Validated Parameter parameter) {
    
            logger.info(parameter.getName() + ", " + parameter.getAge());
        }
    
        public static class Parameter {
    
            @NotNull
            private String name;
    
            @Min(0)
            private Integer age;
    
            /** ignore getter/setter **/
        }
    }
{% endhighlight %}

{% highlight shell %}
curl -X POST \
  http://localhost:8080/ \
  -H 'Content-Type: application/json' \
  -d '{
	"age" : 0,
	"name" : "TEST"
}'
{% endhighlight %}

'''
2019-02-28 06:59:34.383 DEBUG 19200 --- [nio-8080-exec-2] o.s.w.f.CommonsRequestLoggingFilter      : Before request [uri=/]
2019-02-28 06:59:34.551  INFO 19200 --- [nio-8080-exec-2] com.example.apiLogging.DummyController   : TEST, 0
2019-02-28 06:59:34.553 DEBUG 19200 --- [nio-8080-exec-2] o.s.w.f.CommonsRequestLoggingFilter      : After request [uri=/]
'''

{% highlight shell %}
curl -X POST \
  http://localhost:8080/ \
  -H 'Content-Type: application/json' \
  -d '{
	"age" : -1,
	"name" : "TEST"
}'
{% endhighlight %}

'''
2019-02-28 07:07:24.145 DEBUG 19200 --- [nio-8080-exec-6] o.s.w.f.CommonsRequestLoggingFilter      : Before request [uri=/]
2019-02-28 07:07:24.188  WARN 19200 --- [nio-8080-exec-6] .w.s.m.s.DefaultHandlerExceptionResolver : Resolved [org.springframework.web.bind.MethodArgumentNotValidException: Validation failed for argument [0] in public void com.example.apiLogging.DummyController.dummyPost(com.example.apiLogging.DummyController$Parameter): [Field error in object 'parameter' on field 'age': rejected value [-1]; codes [Min.parameter.age,Min.age,Min.java.lang.Integer,Min]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [parameter.age,age]; arguments []; default message [age],0]; default message [반드시 0보다 같거나 커야 합니다.]] ]
2019-02-28 07:07:24.188 DEBUG 19200 --- [nio-8080-exec-6] o.s.w.f.CommonsRequestLoggingFilter      : After request [uri=/]
'''

성공시에는 Filter는 물론, Controller 내부의 Log까지 정확히 찍히지만,
실패시에는 Controller 내부의 Log가 찍히지 않는다.

> 이는, Spring Controller의 돌아가는 구조와 연관이 있다.

> Spring Security, Validation, Parameter Binding 등에서 실패하면, Handler Method(Controller의 Method)에 진입 자체를 못하기 때문이다.

> 이 얘기는 Log가 누락된다는 얘기다.

### 추가설정

Log가 찍히는건 확인 가능하지만, 실제로 사용하기에는 정보가 매우 부족하다.

AbstractLoggingFilter class를 통해 세부적인 설정이 가능하다.

{% highlight java %}
    @Bean
    public CommonsRequestLoggingFilter requestLoggingFilter() {

	CommonsRequestLoggingFilter loggingFilter = new CommonsRequestLoggingFilter();

	loggingFilter.setIncludeHeaders(true);
	loggingFilter.setIncludeQueryString(true);
        loggingFilter.setIncludePayload(true);
	loggingFilter.setMaxPayloadLength(100);
	loggingFilter.setIncludeClientInfo(true);
	loggingFilter.setBeforeMessagePrefix("Before : ");
	loggingFilter.setBeforeMessageSuffix("");
        loggingFilter.setAfterMessagePrefix("After : ");
        loggingFilter.setAfterMessageSuffix("");

        return loggingFilter;
    }

{% endhighlight %}

'''
2019-02-28 07:18:35.261 DEBUG 7176 --- [nio-8080-exec-1] o.s.w.f.CommonsRequestLoggingFilter      : Before : uri=/;client=0:0:0:0:0:0:0:1;headers=[cache-control:"no-cache", postman-token:"65f03248-1b27-402b-9182-076dfca37bf1", user-agent:"PostmanRuntime/7.1.1", accept:"*/*", host:"localhost:8080", cookie:"JSESSIONID=A579B512FAB76D98833DB27213EA8555", accept-encoding:"gzip, deflate", content-length:"32", connection:"keep-alive", Content-Type:"application/json;charset=UTF-8"]
2019-02-28 07:18:35.391  INFO 7176 --- [nio-8080-exec-1] com.example.apiLogging.DummyController   : TEST, 0
2019-02-28 07:18:35.393 DEBUG 7176 --- [nio-8080-exec-1] o.s.w.f.CommonsRequestLoggingFilter      : After : uri=/;client=0:0:0:0:0:0:0:1;headers=[cache-control:"no-cache", postman-token:"65f03248-1b27-402b-9182-076dfca37bf1", user-agent:"PostmanRuntime/7.1.1", accept:"*/*", host:"localhost:8080", cookie:"JSESSIONID=A579B512FAB76D98833DB27213EA8555", accept-encoding:"gzip, deflate", content-length:"32", connection:"keep-alive", Content-Type:"application/json;charset=UTF-8"];payload={
	"age" : 0,
	"name" : "TEST"
}
'''

### 마치며
물론, 저것만으로도 사실 좀 세부적인 정보를 얻는건 힘들다.

하물며 Status Code조차 없기 때문에 요청의 성공/실패 여부조차 알기 힘드니 뭐..

[Gjall](https://gjall.sollabs.tech)은 그래서 만들었다.