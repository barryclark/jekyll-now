---
layout : post
title : URI, URL, URN 차이
---
원본 : https://www.charlezz.com/?p=44767
>URI는 식별하고, URL은 위치를 가르킨다
#### URI (Uniform Resource Identifier)
- 상세
    - 특정 리소스를 식별하는 통합 자원 식별자
    - 웹 기술에서 사용하는 논리적 또는 물리적 리소스를 식별하는 고유한 문자열 시퀀스

#### URL (Uniform Resource Locator)
- 상세
    - 웹주소
    - 컴퓨터 네트워크 상에서 리소스가 어디 있는지 알려주기 위한 규약
- URI의 구조
```
scheme:[//[user[:password]@]host[:port]][/path][?query][#fragment]
```
1. scheme: 사용할 프로토콜을 뜻하며 웹에서는 http 또는 https를 사용
2. user와 password: (서버에 있는) 데이터에 접근하기 위한 사용자의 이름과 비밀번호
3. host와 port: 접근할 대상(서버)의 호스트명과 포트번호
4. path: 접근할 대상(서버)의 경로에 대한 상세정보
5. query: 접근할 대상에 전달하는 추가적인 정보 (파라미터)
6. fragment: 메인 리소스 내에 존재하는 서브 리소스에 접근할 때 이를 식별하기 위한 정보

![_config.yml]({{ site.baseurl }}/images/posts/uri_url_venndiagram.png)

