---
layout: post
title: 【DEV】Linux Tomcat에 Spring을 올려보자(2)
category: blog
author: junseo.park
subtitle: Spring war 파일로 배포하기 - tomcat 설정은 이렇게
---

Spring 프로젝트의 Pom.xml 설정이 끝나고 성공적으로 war 파일을 생성했다면 이제 Tomcat이란 web server를 만나러 갈 차례이다.


Tomcat이란 웹서버를 따로 블로깅 하기위해 공부하고 있지만 간단하게 서술하면, Apache에서 제공하는 오픈소스로서, 자바EE에서 제공하는 Servlet / JSP를 관리해주고 요청에 맞게 실행해주는 하나의 Container라고 보면 된다.

Tomcat은 HTTP 자체 웹 서버기능도 수행할 수 있지만, 보통 웹 개발자들은 웹 서버와 연동하여 실행할 수 있는 JAVA Web Application을 위한 환경을 제공할 때 사용한다. Spring Framework Application을 올리는게 가장 기본적.

(Web server와 WAS의 차이점, Tomcat의 역할 등은 따로 깊게 서술하겠습니다.)

<p><hr/></p>

maven으로 java web application을 패키징 했다면 target 파일에 *.war 파일이 생성되었을 것이다.
이를 tomcat에 먼저 가져다 놓는것이 우선이다.

tomcat 구성요소를 보면 여러 Directory가 보이는데, 현재 집중해야 할 Directory는 **webapps**

![tomcat.png]({{ site.baseurl }}/images/tomcat.PNG)

webapps라는 Directory에 war 파일을 복사해놓자.
해당 Directory에 war 파일을 놓고 tomcat을 실행시키면 tomcat이 알아서 war파일을 압축해제하고 웹 서버에 올릴 준비를 한다.

정상적으로 tomcat에 올라갔다면 bin/startup.sh 파일을 실행하여 서버를 가동했을 때 http://{ip주소}:8080 주소에서 tomcat 안내 html이 보일 것이고 http://{ip주소}:8080/{project name}으로 들어가면 application의 메인 웹페이지가 뜰 것이다.

이걸로 우리는 Tomcat 어플리케이션 서버에 Java EE application을 띄울 수 있게 되었다.


하지만, 문제가 하나 있다면 "project name"이 우리가 원하는 URL 주소이름처럼 되지 않을 경우가 있다.

또는, 웹 주소의 root에 원하는 project를 위치시키고 싶을 경우도 있다.

이럴 때 tomcat에 설정하는 부분은 아래와 같다.

![tomcat_serverxml.png]({{ site.baseurl }}/images/tomcat_serverxml.PNG)

위 캡처는 conf Directory에 있는 server.xml 설정파일 중 일부를 가져온 것이다.
하단에 Context 태그 2개를 볼 수 있는데, 첫번째 태그는 ~base에 있는 application 1을 "/~"라는 path를 root로 삼아 보여주겠다 라는의미를 가지고 있다. 보통 war 파일을 생성하면 해당 war 파일의 프로젝트 명과 버전이 이름으로 되는데 이를 그대로 사용하게 되면 

![tomcat-url.png]({{ site.baseurl }}/images/tomcat-url.PNG)

위 캡처처럼 주소가 난잡해지게 된다.

이를 방지하기 위해 pom.xml에 finalname 태그를 추가해 이름을 임의로 정해주는 방법도 존재하긴 하는데, 개인 프로젝트, 단순 application이면 가능하겠지만 서비스 프로젝트가 커지면 버전관리라든지 이름 선정 등이 관리 면에서 중요하게 다루어지기 때문에 좋은 습관은 아니다.

때문에 tomcat 서버 configuration에서 해당 프로젝트를 이러한 path로 잡겠다 라는 설정을 해주는것이 더 안전하고 효과적이라 볼 수 있다.

두 번째 Context 태그는 application 2를 서버 root를 path로 삼아 웹 서버의 기본이 되는 주소로 가져가겠다라는 의미를 가지고 있다.

이 방법으로 별도의 URI 없이 웹 서버 기본 주소만으로 application 웹 페이지를 띄울 수 있다.


Spring application 빌드 과정부터 tomcat URI 설정까지 많은 오류, 버전확인 등 맨 땅에 헤딩하는 과정이 많았지만, 그러한 과정들까지 기록하기에는 너무 자질구레하고, 조금만 더 생각하면 바로 해결할 수 있는 문제들이기 때문에 따로 블로깅하지는 않는다.

앞으로 이러한 과정들을 또 똑같은 수순으로 고생하기 싫어서 블로깅 하는거니까... 성장하자