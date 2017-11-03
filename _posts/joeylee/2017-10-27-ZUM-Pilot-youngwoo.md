---
layout: post
title: 신입사원 파일럿 프로젝트
subtitle: 줌에서 스프링을 만나다!
category: pilot
author: 이영우
nickname: joeylee
tag: [spring,boot,pilot,신입,zum,줌인터넷,board,게시판]
---

# 소개
안녕하세요! 포털개발팀 신입사원 이영우입니다.
이 글은 파일럿 프로젝트를 진행하면서 제가 느낀 점과 주어진 기술들을 어떤 식으로 적용했나에 대한 후기를 작성한 글입니다.

# 스프링을 만나다
## 1. 게시판
1차 파일럿 프로젝트의 주제는 계층형 게시판 이었습니다.

계층형 게시판은 웹에 관심이 있다면 한 번쯤은 만들어봤을 가장 심플한 주제가 아닐까 싶습니다

하지만 스펙은 아래와 같았습니다..

필수 스펙
-Java8
-Intellij
-Spring 4.0 MVC
-Spring Security
-ORM(Hibernate, JPA 등)
-Git
-MySQL
-Log4j
-Springboot
-Gradle
-jQuery

선택 스펙
-Freemarker
-Ajax
-JUnit
-Node.js
-Backbone.js
-BootStrap
-빌드 시스템(grunt)
-다양한 Spring Annotation
-다양한 Design Pattern
-다양한 opensource, framework

이게 다 뭘까요??

![말잇못](/images/joeylee/cantspeak.jpg)

**1차 코드리뷰까지 단 13일**

필수 스펙만 하더라도 어려운 기술이 많다고 느껴 필수 스펙으로 진행 하였습니다

**강력한 보안 프레임워크, Spring Security**

스프링 시큐리티가 하는 일은 웹 요청에 대한 보안과 URL 수준의 접근을 제한합니다.
좀 더 자세히 본다면 

`"인증(Authentication) 권한(Authority) 형태를 재활용할 수 있으며 
다양한 환경에서 확장하여 사용할 수 있도록 정리하여 만든 프레임워크"` 입니다


**객체와 관계형 데이터베이스 간의 매핑을 지원하는 프레임워크, ORM**

 ORM(Object Relational Mapping)이란 `" RDB 테이블을 객체지향적으로 사용하기 위한 기술"`입니다. 
 RDB 테이블은 객체지향적 특징(상속, 다형성, 레퍼런스, 오브젝트 등)이 없고 자바와 같은 언어로 접근하기 쉽지 않습니다.
 때문에 ORM을 사용해 오브젝트와 RDB 사이에 존재하는 개념과 접근을 객체지향적으로 다루기 위한 기술입니다.


__그리고 2주 후.. 대망의 코드 리뷰__

![보노보노_고통](/images/joeylee/bonobono.png)
1. 서버 예외처리(validation, error 표기 및 처리)
2. 프론트 예외처리
3. Rest 규약에 맞게 설계
4. 트랜잭션 하나의 작업의 단위를 잘 생각해서 설계
5. 중복 로직 공통 모듈로 빼기
6. Handlebars 사용
등등 많은 수정 사항을 주셨습니다

역대급 많은 수정 사항으로 코드리뷰를 두번이나 더 했답니다..ㅎㅎ



## 2. 줌끼리(사내 모임 SNS)

2차 파일럿으로 진행한 프로젝트는 사내 모임(동호회)를 증진 시킬 수 있는 SNS을 만드는 것이었습니다

어떻게 보면 좀더 확장된 기능을 가진 것 뿐이지 실체는 게시판이었습니다.

![또](/images/joeylee/replay.jpg)

1차때와 비슷한 주제이고 좀 더 설계에 대한 자유도가 있어서

기술 스펙 업그레이드와 오픈소스 활용을 하기로 하였습니다

사용한 기술 스펙은 다음과 같습니다

Front-end
-Backbone.js
-jQuery
-Webpack
-Handlebars
-lodash

Back-end
-Handlebars.java
-Java8
-Spring MVC
-Springboot
-JPA
-Gradle
-Mysql
-QueryDSL


기본적으로 사내에서 구글 로그인을 쓰기때문에 OAuth2 를 활용한 구글 로그인을 사용하였고
글 작성에 들어가는 에디터는 summernote 라는 오픈소스 라이브러리를 사용하였습니다

그렇게 개발을 하던중 개발을 진행하던 중 양방향 참조를 할 수 밖에 없는 상황이 왔습니다

~~~java
@Entity
@Data
@Table(name= "post")
public class Post {

    @OneToMany(mappedBy = "post")
    @JsonManagedReference
    private List<Sympathy> sympathy;
}


@Entity
@Data
@Table(name="sympathy")
public class Sympathy {
    
    @ManyToOne
    @JoinColumn(name="post_id", insertable = false, updatable = false)
    @JsonBackReference
    private Post post;
}
~~~

이러한 상황에서

Post 클래스의 toString() 을 호출하게 되면 LAZY 로딩이더라도 Sympathy를 조회하고 다시 Post를 조회하고 계속 무한으로 호출합니다

이럴 경우에 sympathy값이 비어있더라도 무조건 읽어 오게 되어서 view에서 문제가 되었습니다

이 순환을 해결하기 위해서는 

@JsonIgnore를 사용하는 방법이 있고 @JsonManagedReference와 @JsonBackReference를 사용하는 방법이 있습니다. 

json serialize 과정에서 null로 세팅하고자 하면 @JsonIgnore 사용하면 되고, 순환참조에 대한 문제를 해결하고자 한다면 부모 클래스측에 @JsonManagedReference를, 자식측에 @JsonBackReference를 Annotation에 추가해주면 됩니다.


그 다음 소셜 로그인을 구현하는데 있어 인증 받은후 따로 유저 테이블 관리가 필요했습니다

먼저 소셜 로그인을 사용하기 위해 OAuth2 의존성을 세팅 했습니다

~~~java
<dependency>
    <groupId>org.springframework.security.oauth</groupId>
    <artifactId>spring-security-oauth2</artifactId>
</dependency>
~~~

application.properties에 필요한 설정정보들을 기술 해줍니다.

@EnableOAuthClient 어노테이션을 사용함으로써 OAuth2ClientContext를 주입할 수 있어, 

시큐리티 설정에 추가할 인증 필터를 만들고 등록할수 있습니다

~~~java
@Configuration
@EnableOAuth2Client
public class OAuth2ClientConfig {

    @Autowired
    OAuth2ClientContext oAuth2ClientContext;
}
~~~

그리고  구글 전용 인증처리용 필터를 만듭니다(다른 oauth2를 지원하는 플랫폼들도 각각에 맞게 생성해주면 됩니다)

/login/google 로 get 요청을 할 경우 자동으로 OAuth 로그인이 진행됩니다.
@ConfigurationProperties로 각 필드에 할당된 인스턴스들도 등록 해줍니다
인증 성공시 사용하게 될 OAuth2SuccessHandler도 등록합니다

~~~java
@Bean
@ConfigurationProperties("google.client")
OAuth2ProtectedResourceDetails google() { return new AuthorizationCodeResourceDetails(); }

@Bean
@ConfigurationProperties("google.resource")
ResourceServerProperties googleResource() { return new ResourceServerProperties(); }

@Bean("sso.filter")
Filter ssoFilter() {
    OAuth2ClientAuthenticationProcessingFilter googleFilter = new OAuth2ClientAuthenticationProcessingFilter("/login/google");
    OAuth2RestTemplate googleTemplate = new OAuth2RestTemplate(google(), oAuth2ClientContext);
    googleFilter.setRestTemplate(googleTemplate);
    googleFilter.setTokenServices(new UserInfoTokenServices(googleResource().getUserInfoUri(), google().getClientId()));
    googleFilter.setAuthenticationSuccessHandler(new OAuth2SuccessHandler("google", userService));
    return googleFilter;
}
~~~

저 같은 경우에는 사용자 정보 일부를 디비에서 관리를 해야해서 

OAuth2SuccessHandler 에서 인증 받은 유저의 정보를 테이블에 넣어주고

SecurityContextHolder에 해당 정보를 넣어주는 로직을 넣었습니다

만든 필터를 메인 스프링 시큐리티 필터가 불러지기 전에 호출되도록 충분히 낮은 순서로 등록했습니다

~~~java
@Override
protected void configure(HttpSecurity http) throws Exception {
    http
    ...
    .and()
        .addFilterBefore((Filter)context.getBean("sso.filter"), BasicAuthenticationFilter.class);

}
~~~
~~~java
@Bean
public FilterRegistrationBean oauth2ClientFilterRegistration(OAuth2ClientContextFilter filter) {
    FilterRegistrationBean registration = new FilterRegistrationBean();
    registration.setFilter(filter);
    registration.setOrder(-100);
    return registration;
}
~~~

![흡족](/images/joeylee/gmqwhr.jpg)




![디비](/images/joeylee/db.png)

해당 프로젝트 디비 스키마 입니다.
 
뭔가 굉장히 복잡한 쿼리가 필요할것 같았습니다(사실상 그렇게 복잡한 쿼리는 없었습니다..)

그래서 JPA를 그대로 사용해도 될까라는 고민이 들었습니다

우선 JPA 를 사용하면서 객체간 관계로 Join 하는 것은 가능하지만 where 절을 사용하는 것은 제한 됩니다. 

이런 문제를 해결 해주는 것이 JPQL 인데 이것으로도 Join 등 복잡한 상황에서는 구현이 제한 되어있습니다.

그걸 다시 보완해줄 Criteria 라이브러리가 있지만 사용이 복잡합니다

그래서 비교적 손쉬운(?) QueryDsl 을 쓰게 되었습니다.

QueryDsl은 `"몇가지 데이터 관리 엔진에 대해서 하나의 통일된 문법으로 쿼리를 작성하게 해줍니다
쿼리작성을 자바코드로 하며 type safe 하게 작성 할 수 있습니다."`


먼저 의존성을 등록해줍니다.

~~~java
compile ("com.querydsl:querydsl-core:$querydslVersion")
compile ("com.querydsl:querydsl-apt:$querydslVersion")
compile ("com.querydsl:querydsl-jpa:$querydslVersion")
~~~

Qdomain이라고 부르는 자바 코드를 생성하는 task를 만들었습니다.

QueryDsl을 통해 쿼리를 생성할때 바로 Qdomain 객체를 사용합니다
 
실제 도메인 객체의 모든 필드들에 대해서 사용가능한 모든 operation 을 호출할 수 있는 메서드들이 정의 되어 있습니다

~~~java
def queryDslOutput = file("src-gen/main/java")

sourceSets {
	main {
		java {
			srcDir "src-gen/main/java"
		}
	}
}

clean {
	delete queryDslOutput
}

task generateQueryDSL(type: JavaCompile, group: 'build') {
	doFirst {
		if (!queryDslOutput.exists()) {
			logger.info("Creating `$queryDslOutput` directory")

			if (!queryDslOutput.mkdirs()) {
				throw new InvalidUserDataException("Unable to create `$queryDslOutput` directory")
			}
		}
	}

	source = sourceSets.main.java
	classpath = configurations.compile
	options.compilerArgs = [
			"-proc:only",
			"-processor",
			"com.querydsl.apt.jpa.JPAAnnotationProcessor"
	]
	destinationDir = queryDslOutput
}

compileTestJava.dependsOn(generateQueryDSL)
~~~

간단한 작업들은 JPA named Query 를 사용하고 있었는데 기존의 메소드들은 유지하고 
좀더 복잡한 쿼리 사용이 필요하였고 queryDslRepositorySupport를 상속받아 사용자 정의 쿼리를 사용하게 되었습니다


사용자 정의 쿼리를 작성할 메서드를 정의하는 인터페이스 생성합니다

~~~java
public interface CustomGroupDetailRepository {

    List findGroupListByUserId(Long userId);
}
~~~


그런 다음 JpaRepository 인터페이스를 상속하는 repository 인터페이스가 첫단계에서 만든 사용자 정의 인터페이스를 상속하도록 수정합니다
~~~java
public interface GroupDetailRepository extends 
JpaRepository<GroupDetail, GroupDetailPK>, 
CustomGroupDetailRepository {

//기존 네임드 쿼리 ..

}
~~~

사용자 정의 쿼리 메서드를 작성할때 queryDslRepositorySupport 상속하면 코드를 줄여줄만한 헬퍼 기능들을 제공합니다
 
단 클래스의 이름은 repository 인터페이스이름 + Impl로 끝나야 합니다 (설정파일에서 변경 가능)

이렇게 명명규칙을 맞춰야 스프링이 클래스 이름을 보고 해당 클래스가 domain repository의 사용자 정의 메서드를 구현하고 있다는 것을 알고 bean으로 등록합니다


~~~java
public class GroupDetailRepositoryImpl extends QueryDslRepositorySupport implements CustomGroupDetailRepository{

    public GroupDetailRepositoryImpl() {
        super(GroupDetail.class);
    }

    @Override
    public List findGroupListByUserId(Long userId) {
        QGroupDetail groupDetail = QGroupDetail.groupDetail;
        QUser user = QUser.user;

        JPQLQuery<GroupDetail> query = from(groupDetail)
                .innerJoin(groupDetail.user, user)
                .where(groupDetail.id.userId.eq(userId).and(groupDetail.status.eq(Status.STATUS_JOIN)));

        return query.fetch();
    }
    
}
~~~

이것으로 어떠한 복잡한 쿼리도 자바코드로 손쉽게 작성 할 수 있었습니다!!

![성공](/images/joeylee/success.jpg)


## 느낀 점

처음 프로젝트를 받았을때 주제는 분명 간단한데 모르는 것 투성이에다가 이해할 수 없는 기술들을 쓰려고 하니 너무 답답했습니다.

모든 것이 뒤죽박죽 되어서 진행해 나가기가 너무 어려웠습니다.

하지만 ZUM 의 개발자라면 누구나 똑같이 거쳐야할 통과의례라는 생각으로 최선을 다했고 잘 마무리 할 수 있었습니다. 
 
그리고 물론 아직도 갈 길이 멀지만 그때 다양하게 쌓았던 스펙트럼이 실무를 하고 있는 지금 많은 도움이 되고 있습니다

앞으로도 한 팀의 개발자로써 성장을 위해 많이 노력하겠습니다.

두서 없는 글 읽어주셔서 감사합니다.