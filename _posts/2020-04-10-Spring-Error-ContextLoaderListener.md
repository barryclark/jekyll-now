---
layout: post
title: 【SPRING】STS ContextLoaderListener 문제해결
subject: blog
category: spring
author: junseo.park
subtitle: STS는 도대체 왜 ContextLoaderListener가 왜 없다고 할까?
---

Git에서 새로운 Spring Webapp을 가져와 Spring Tool Suites에 올리고 Tomcat으로 띄우려고 하면 이상하게 Exception Error가 뜨는 경우가 있다.

```
java.lang.ClassNotFoundException: org.springframework.web.context.ContextLoaderListener
```
이 문구와 함께 에러가 주루룩 뜨면서 Webapp이 띄워지지 않는다.

명확한 요구사항 없이 ContextLoaderListener가 없다고만 떠서 어떻게 수정해야 할 지 막막해서 코드들을 일일히 뜯어보는데, 그래도 이상한 점을 찾을 수 없었다.

결국 찾아낸 문제는 STS에서 각 Project의 Properties 설정이 제대로 되어있지 않아서 그런 것이었다.

1. **JDK Version이 잘못 설정되어 있는 경우**
- 최초 Project를 구축할 때 Library라든지 여러 설정들을 JDK version에 기반하여 쌓기 때문에 다른 환경으로 가져갔을 때 JDK version을 Project와 다르게 설정하여 Compile하게 되면 당연히 오류가 발생할 수 밖에 없다.
- 이 때는 Project 우클릭 -> Java Build Path -> Libraries 탭 -> JRE System Library 를 Project에 맞는 JRE(JDK를 포함한 Java Runtime Env) 버전으로 변경해주면 된다.
- 보통 기업들은 안정성을 위해 Old Version으로 유지하는 경우가 많아 STS 자체에서 설정을 1.6 등으로 Default 잡아주는게 아닐까 생각해본다...
<p>

2. **Maven Library가 Build에 추가되지 않는 경우**
- STS에서 처음으로 Project를 build하게 되면 `m2e-wtp` 라는 처음보는 Directory가 만들어진다. 이는 Eclipse STS에서 제공하는 Web Tools Platform이라 하여 Webapp 개발을 좀 더 심플하게 해주는 Tool이라 한다. 문제는 war 파일 형태로 tomcat에 올리고자 할 때 wtp 파일 때문에 Build 할 때 Maven Lib가 추가되지 않는다는 것. 
- 이 때는 Project 우클릭 -> Deployment Assembly -> Add... -> Java Build Path Entity -> Maven Library를 추가 -> Apply -> Maven Clean 후 재기동 하면 해결된다.
<br/>

Rmx
