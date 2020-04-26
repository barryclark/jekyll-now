---
layout: post
title: 【STUDY】MAVEN HTTPS 이슈
subject: blog
category: study
author: junseo.park
subtitle: Maven Https 정책 변경에 대응하는 방법
---

**2020년 1월 15일 부로 Maven에서 Central Repository의 http 지원이 중단되었다.**

회사에서 개발환경 수정 중 pom.xml이 오류가 발생하는 문제가 있어서 검색하던 중 찾게 되었다.

새로운 외부 라이브러리를 다운받는 과저에서 501 Bad Request 에러가 나는 것. 처음에는 문법 에러나 IDE 설정이 잘못되었나 싶었지만 그런 것도 아니었다.
JDK 1.5로 설정했었기에 너무 낮아서 그런가? (Received fatal alert: protocol_version 에러가 있었다.) 싶어서 버전도 1.7로 올려봤지만 풀리지 않았다.

이러한 이슈에 민감한 분들은 이미 뒷북인 이야기겠지만, 프로 개발자가 된 지 얼마 안된 입장에서 기록할 만한 일이다 싶어 적는 것이니... (그러려니...해주십사)

Maven에서 안내했던 원문은 이렇다.

<code class="highlight">
Effective January 15, 2020, The Central Repository no longer supports insecure communication over plain HTTP and requires that all requests to the repository are encrypted over HTTPS.

If you're receiving this error, then you need to replace all URL references to Maven Central with their canonical HTTPS counterparts:

Replace http://repo1.maven.org/maven2/ with https://repo1.maven.org/maven2/

Replace http://repo.maven.apache.org/maven2/ with https://repo.maven.apache.org/maven2/

If for any reason your environment cannot support HTTPS, you have the option of using our dedicated insecure endpoint at http://insecure.repo1.maven.org/maven2/

For further context around the move to HTTPS, please see https://blog.sonatype.com/central-repository-moving-to-https.
</code>
<br/>

요약하자면 1월 15일 부로, Central Repository는 http URL을 제공하지 않기 때문에 Rerpositories 주소를 제시된 대로 변경하기를 요청하는 내용.

이로 인해 maven pom.xml 작성 시 Repository 부분을 새로 작성하거나 기존 프로젝트의 수정이 불가피해졌다.

Maven에서 SSL 프로토콜 정책을 TLSv1.2로 지정했기 때문에 프로젝트들도 이에 맞추는 것이 관건이다.
특히 JDK 버전. 밑에 설명을 자세히 하겠지만, 앞으로 안전성과 보안을 굳건히 하고 싶다면 JDK를 1.7 이상으로 올려야 한다.

**JDK 1.8**
JDK 1.8 이상은 HTTPS TLSv1.2가 Default 값으로 내장되어 있기에 새로운 Repository 주소로 변경만 하면 된다.

**JDK 1.7**
JDK 1.7은 HTTPS TLS 버전 중 1.1를 Default로 제공하지만, 옵션 추가 시 1.2까지 지원이 가능하기 때문에, maven 명령어에 `-Dhttps.protocols=TLSv1.2`라는 옵션을 주면 정상 작동이 가능하다.

**JDK 1.6**
JDK 1.6 이하로는 TLSv1.0 이상으로 지원을 하지 않기 때문에 `Received fatal alert: protocol_version`이라는 에러를 반환한다.
  - JDK 버전 변경 권한이 없다 : http://insecure.repo1.maven.org/maven2 라는, 안전성이 결여된 주소를 사용.
  - 안정성& 보안환경이 우선 : 최소 JDK 버전을 1.7로 상향

참고로, 대기업이나, 자본이 꽤 있는 곳에서 구축하는 웹 서비스라면, Nexus를 사용하여 Proxy Repository를 생성해서 사용하는 것이 좋다.
