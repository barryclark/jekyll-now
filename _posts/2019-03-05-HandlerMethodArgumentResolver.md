---
layout: post
title: HandlerMethodArgumentResolver 이야기
categories: [spring]
tags: [spring]
---

[HandlerMethodArgumentResolver](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/method/support/HandlerMethodArgumentResolver.html)라는 녀석이 있다.

친구로 [HandlerMethodReturnValueHandler](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/method/support/HandlerMethodReturnValueHandler.html)도 있고,

javadoc을 보면 PathVariableMethodArgumentResolver 등등 유사한 형제들도 많다.(하도 많아서 일일이 링크를 걸기도 힘들 정도로.)

다만 구조 자체는 비슷하기 때문에 대표적으로 이녀석만 설명하고 넘어갈 생각이다. 

이 interface의 경우 @since 3.1이지만, 2.5.2에서도 유사한 기능을 [WebArgumentResolver](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/bind/support/WebArgumentResolver.html)을 통해 제공하고 있었다.

다만 돌아가는 구조가 이제는 많이 달라져서 굳이 저쪽까지 다룰 생각은 없고..


### 실사용예 보기

Spring-data-jpa(+QueryDsl)를 쓴다면 이런 코드에 익숙할 것이다.
 
{% highlight java %}
    @RequestMapping(path = "/test", method = RequestMethod.GET)
    public String getTest(Pageable page) {

        log.info("size : " + page.getPageSize());
        log.info("number : " + page.getPageNumber());
        
        return "SUCCESS";
    }
{% endhighlight %}

{% highlight shell %}  
curl -X GET \
  'http://localhost:12001/test?page=0&size=50' \
  -H 'Accept: application/json' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 715f37b6-2516-4182-9440-826e2ee2277f'
{% endhighlight %}

```
2019-03-05 16:05:21.761  INFO 21332 --- [io-12001-exec-4] tech.sollabs.webdemo.TestResource        : size : 50
2019-03-05 16:05:21.761  INFO 21332 --- [io-12001-exec-4] tech.sollabs.webdemo.TestResource        : number : 0
```

page parameter에는 @RequestParam도, @ModelAttribute도, @RequestBody도 없지만 이러한 기능을 가능케 하는 것이 HandlerMethodArgumentResolver이다.

이 기능을 위해 활성시켜야 하는 것이 @EnableSpringDataWebSupport이고, 해당 @Enable Annotation은 QuerydslWebConfiguration을 활성화시킨다.

그리고 해당 Configuration 안에서는 [QuerydslPredicateArgumentResolver](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/web/querydsl/QuerydslPredicateArgumentResolver.html)를 구현해서 등록해준다.


### 써보기

지금 하고 있는 프로젝트에서도 페이징을 하는데, parameter가 pagenum, pagesize라고 하자.

덤으로 JPA를 안쓰기 때문에 spring-data-jpa도 안쓴다고 하자.

(내가 생각했지만 실화 같다..)

이러면 만들어 써야지..

{% highlight java %}
    public class PagingRequest {
    
        private int pagenum;
    
        private int pagesize;
    
        public PagingRequest(int pagenum, int pagesize) {
            this.pagenum = pagenum;
            this.pagesize = pagesize;
        }
    
        public int getPagenum() {
            return pagenum;
        }
    
        public int getPagesize() {
            return pagesize;
        }
    }
{% endhighlight %}

일단 필요한건 요거부터. 그리고 ArgumentResolver를 만들어 보면..

{% highlight java %}
    public class PagingRequestArgumentResolver implements HandlerMethodArgumentResolver {
    
        @Override
        public boolean supportsParameter(MethodParameter methodParameter) {
            return methodParameter.getParameterType().isAssignableFrom(PagingRequest.class);
        }
    
        @Override
        public Object resolveArgument(MethodParameter methodParameter, ModelAndViewContainer modelAndViewContainer, NativeWebRequest nativeWebRequest, WebDataBinderFactory webDataBinderFactory) throws Exception {
    
            int pageNum = Integer.parseInt(nativeWebRequest.getParameter("pagenum"));
            int pageSize = Integer.parseInt(nativeWebRequest.getParameter("pagesize"));
    
            return new PagingRequest(pageNum, pageSize);
        }
    }
{% endhighlight %}
> null check나 기타 Validation은 각자 재량껏 하자.

{% highlight java %}
    @EnableWebMvc
    @Configuration
    public class WebConfig extends WebMvcConfigurerAdapter {
    
        @Override
        public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
            argumentResolvers.add(new PagingRequestArgumentResolver());
        }
    }
{% endhighlight %}

가장 쉽게 활성화 시킬 수 있는 방법이다.

{% highlight java %}
    @RequestMapping(path = "/test", method = RequestMethod.GET)
    public void getTest(PagingRequest page, @RequestParam("other") String otherParameter) {
    
        log.info("page size : " + page.getPagesize());
        log.info("page number : " + page.getPagenum());

        log.info("parameter : " + otherParameter);
    }
{% endhighlight %}

Controller를 바꿔서 호출해 보면,

{% highlight shell %}
curl -X GET \
  'http://localhost:12001/test?pagenum=2&pagesize=51&other=PARAMETER' \
  -H 'Accept: application/json' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: c61ab1b8-7667-4d71-a79d-b59193191ea6'
{% endhighlight %}

'''
2019-03-05 17:36:10.428  INFO 21272 --- [io-12001-exec-3] tech.sollabs.webdemo.TestResource        : page size : 51
2019-03-05 17:36:10.428  INFO 21272 --- [io-12001-exec-3] tech.sollabs.webdemo.TestResource        : page number : 2
2019-03-05 17:36:10.429  INFO 21272 --- [io-12001-exec-3] tech.sollabs.webdemo.TestResource        : parameter : PARAMETER
'''

있는지만 알아두면 다양하게 응용하기도 좋고 전역 설정을 하기도 좋다.(가장 좋은건 쓰기 쉽다.)

특히 유사한 구조가 많기 때문에 응용의 폭이 훨씬 더 넓어진다는게 장점.