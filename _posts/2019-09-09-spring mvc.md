绑定网页来的数据：


### spring mvc控制接受的类型和返回的mime类型：
在@RequestMapping中，设置属性consumes和produces
- consumes设置接受的类型
- produces设置返回的类型
例：consumes="text/event-stream;charset=UTF-8",produces="text/event-stream;charset=UTF-8"
未对响应生效的原因：RequestMapping中设置返回值类型，只会影响：1.是否接受请求;2.是否返回结果,而不会对结果进行转换，也就是说，只会判断请求的类型和返回类型和设置的是否一致。然后使用了ResponseBody注解,注解会指定请求结果通过转换器：StringHttpMessageConverter，该转换器会使返回值强制设为text/plain,因此实际返回的是text/plain类型的数据，但RequestMapping中设置的是只支持json格式的数据。因此什么都没返回。
想要返回自己想要的类型，正确的做法是返回ResponseEntity类型值.
ref: 
http://stackoverflow.com/questions/30548822/spring-mvc-4-application-json-content-type-is-not-being-set-correctly
https://docs.spring.io/spring/docs/current/spring-framework-reference/html/mvc.html#mvc-ann-requestmapping-produces

根据请求后缀，设置返回的mime类型

	public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
	    configurer.defaultContentType(MediaType.APPLICATION_JSON_UTF8);
	    configurer.mediaType(extension, mediaType);
	
	org.springframework.web.accept.ContentNegotiationManager.resolveMediaTypes(NativeWebRequest) 



### 处理controller返回异常的情况：

定义一个controller增强，使用@ControllerAdvice标注
使用ExceptionHandler标注处理方法，在方法中改变返回结果
	
	@ControllerAdvice
	public class OnExceptionControllerAdvice {
	  @ExceptionHandler
	  public ModelAndView handle(UserNotLoginException e) {
	    RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
	    Object attribute = requestAttributes.getAttribute("", RequestAttributes.SCOPE_REQUEST);
	    HashMap<String, Object> model = Maps.newHashMap();
	    model.put("fromPage", attribute);
	    return new ModelAndView(ViewEnum.NOT_LOGIN_PAGE.getPath(),model);	    
	  }
	}

### 错误页面配置的方式：
  @Bean
  EmbeddedServletContainerCustomizer configErrPage(){
    return container -> {
      ErrorPage errorPage404 = new ErrorPage(HttpStatus.NOT_FOUND, "/404");
      ErrorPage errorPage500 = new ErrorPage(HttpStatus.INTERNAL_SERVER_ERROR, "/500");
      container.addErrorPages(errorPage404,errorPage500);
    };
  }

### 没有报错也没返回值的原因：

 被切面捕获了

 
### 在freemarker中设置basePath的方法：
	<base id="basePath" href="${rc.getContextPath()}/">
注意：要加斜杠!




### spring boot 不想要单独的controller来映射的一些模板的情况
配合free marker使用时，对于不想要单独的controller来映射的一些模板。可以使用如下方法配置想要映射的路径：

	@EnableWebMvc
	@Configuration
	public class WebConfig extends WebMvcConfigurerAdapter {
	  @Override
	  public void addViewControllers(ViewControllerRegistry registry) {
	    registry.addViewController("/iii/index2.html").setViewName("/iii/index2"); // 前面是url路径，后面是不带文件后缀的模板路径+文件名
	    registry.addViewController("/iii/").setViewName("/iii/index2");
	  }
	}
详见：https://docs.spring.io/spring/docs/current/spring-framework-reference/html/mvc.html#mvc-config-view-controller




在controller中获取来源路径的方法：

