---
layout: post
title: Example - Rstudio에서 md 파일을 남기는 방법
---

<br/>
RStudio의 여러 가지 장점중에 리포팅을 바로 할 수 있는 knit는. 또한 md파일에서 바로 웹파일을 생성해 블로그나 웹페이지처럼 이용할 수 있는 github의 페이지


```
---
title: "title"
author: "name"
date: "date"
output:
   html_document:
      keep_md: true
---
```

우선 Rstudio에서 knit하기전 헤더부분에 위처럼 `html_document`이하의 코드를 삽입하고 문서를 knit한다.



<br/>
## R과 블로그의 연동 절차
* RStudio에서 md file 추출
* RStudio에서 HTML로 publish
* Rpub에서 이미지 파일들의 위치 확인
* 추출된 md파일에서 blog md file의 헤더부분을 삽입
* 이미지 들의 위치 변경
* repository에 md file 추가
* github 에서 commit

----
 