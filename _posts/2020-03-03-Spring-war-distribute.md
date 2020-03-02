---
layout: post
title: 【DEV】Linux Tomcat에 Spring을 올려보자(1)
category: blog
author: junseo.park
subtitle: Spring war 파일로 배포하기
---

개발 프로젝트를 어느정도 하고보면 개발환경에서 프로젝트를 만드는것보다 서버에 프로젝트를 올리는 것이 더 까다롭다는 것을 깨닫게 되고,
개발 시작부터 이 프로젝트를 어떻게 배포하지? 라는 의문부터 가지게 된다.

Spring Project 공부를 시작하면서부터 생긴 의문이 이와 같은 것이었다.


### Spring을 어떻게 Linux Tomcat에 올리지?? ###


이 질문이 머릿속에 들어온 순간 CRUD라든지 Intercepter같은 설계 방법들은 눈에 안들어왔다.
<br/>
**이렇게 만든다 한들, 서버에 올려 접속을 못하면 무슨 소용이란 말인가!**
<br/>

그래서 구글을 뒤지고, 책을 사고, document를 읽었다. 정말이지 무슨 소리인지 알아듣기가 어려웠다. 분명 내 실력이 거기까지니까 그런거겠지만...

앞으로 다시 Spring을 배포할 일이 있을 때 까먹었다면 보려고 쓰는 글이니 혹여 비슷한 이유로 구글을 떠다니시는 분이 있다면 참고하셨으면 좋겠다.

<hr/>

웹 프로젝트를 배포하기 위해 가장 필요한 것은? Packaging이다.

배포를 찾아본다는 것은 웹 프로젝트를 한번쯤은 만들어봤다는 것이고, 웹 프로젝트를 만들어봤다는 것은 Maven / Gradle을 한번쯤은 마주했다는 증거일 것이다.

maven은 의존성 라이브러리를 관리해주는 툴일 뿐 아니라, java 프로젝트를 알아서 빌드해주는 참 고마운 녀석이다.
xml이라는 그지같은 형식을 써서 그렇지..(gradle보단 편한거 같더라)

maven에게 우리가 원하는 것을 말해주기 위해선 pom.xml에 적어주어야 한다.
어떤 라이브러리를 사용할 것인지, 어떤 형식으로 packaging을 할 것인지 등등

### 첫째. 어떤 형식으로 packaging할 것인지 알려주어야 한다.
java project packaging에는 크게 2가지 방법이 존재한다.
- war : Web Application Archive. java server page, java servlet, java class, xml, static web page 등 웹 Application을 이루는 자원을 한데 모아 배포할 수 있도록 만든 JAR File
- jar : Java Archive. 여러 개의 java class, resource, metadata를 하나의 file로 모아서 platform에 응용 소프트웨어나 라이브러리 배포를 위해 만든 software package file.

간단히, java 파일을 모아두는 압축이 jar, jar를 포함, 웹 구성에 필요한 자원들까지 한데 모은 것이 war라 생각하면 된다.

이를 결정할 수 있도록 도와주는 부분이다.

![war-packaging.png]({{ site.baseurl }}/images/war-packaging.PNG)


### 둘째. build 태그에 적절한 plugin을 넣어주는 것이 필요하다.
pom.xml을 공부하면서 가장 까다로웠던 부분이다. 내가 이 프로젝트를 빌드하기 위해 어떤 plugin을 써야하며, 어떤 provided를 주어야 하며, configuration으로 어떤 종류가 있는지 알 수가 없었다. (영어를 능숙했다면 maven 문서들을 술술 읽었겠지만 나는 무리야...)

![war-build.png]({{ site.baseurl }}/images/war-build.PNG)


### 셋째. Resource 파일 위치를 명시하라
resource에서 필요한 파일들을 잊지않고 포함시켜라 라는 의미의 문구이다.
필자의 경우, 여기에 myBatis config와 mapper를 넣어놓고 있기 때문에 넣었다.

프로젝트 규모가 커질 경우 개발기와 운영기를 나누어 properties를 관리하곤 하는데, 이 때 이 위치에서 dev와 real을 나눌 수 있다.

![war-build.png]({{ site.baseurl }}/images/war-build.PNG)