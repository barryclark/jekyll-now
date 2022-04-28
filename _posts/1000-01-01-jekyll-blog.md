---
layout: post
title: jekyll 기록
---

## 시작

[처음 재미를 붙이기 위한 튜토리얼](https://commonmark.org/help/tutorial/05-blockquotes.html)

# [Jekyll DOC](https://jekyllrb.com/docs/)

지킬은 정적 사이트 생성기입니다. **마크업 언어로 작성된 텍스트를 사용**하고 레이아웃을 사용하여 정적 웹사이트를 만듭니다. **사이트의 모양과 느낌, URL, 페이지에 표시되는 데이터 등을 조정할 수 있습니다.**

# [Markdown API](https://docs.gitlab.com/ee/api/markdown.html)

**마크다운은 일반 텍스트 기반의 경량 마크업 언어입니다. 일반 텍스트로 서식이 있는 문서를 작성하는 데 사용되며, 일반 마크업 언어에 비해 문법이 쉽고 간단한 것이 특징입니다.** HTML과 리치 텍스트(RTF)등 서식 문서로 쉽게 변환되기 때문에 응용 소프트웨어와 함께 배포되는 README파일이나 온라인 게시물 등에 많이 사용됩니다. 

[마크다운 위키피디아](https://ko.wikipedia.org/wiki/%EB%A7%88%ED%81%AC%EB%8B%A4%EC%9A%B4)

# [MDN](https://developer.mozilla.org/ko/)

MDN(모질라 개발자 네트워크)은 웹 표준과 모질라 프로젝트에 대한 개발 문서들이 담긴 모질라의 공식 웹사이트 입니다.

[MDN 위키피디아](https://ko.wikipedia.org/wiki/MDN_%EC%9B%B9_%EB%AC%B8%EC%84%9C)

## 정리

* [링크](1000-01-02-link.md)
  * 링크 달기
  * 텍스트 링크를 달기
  * 문서 링크 만들기
  * 마크다운 링크 달기
* [강조](1000-01-02-emphasis.md)
  * 강조하기
  * 인용구 추가하기
* [코드블럭](1000-01-02-code-block.md)
  * 코드 블럭 달기
  * 코드 블럭이 더블 프레임으로 표시되는 경우
* [테이블](1000-01-02-table.md)
  * 일반적인 표 구성
  * 정렬하기



## 해야할 목록들

[ ] 커스텀 페이지 추가하기

[ ] 모질라가 어떤건가요?

[ ] [Extended Syntax]<https://www.markdownguide.org/extended-syntax/>, 자동으로 해당 링크의 목차를 가져오고 싶어요.

[ ] 미분류 정리하기

[ ] 코드 블럭이 더블 프레임으로 추가되는 경우 해결하는 방법이 나와있는데 왜 그렇게 되는 건지 전혀 모르겠네요.   
<https://talk.jekyllrb.com/t/different-syntax-highlighting-on-github-pages-and-locaklly/1084>   
이를 이해하기 위해서 GitHub페이지가 무엇인지 부터 알아야 할까요?

## Blog 주소
Post의 주소는 _posts폴더의 .md파일의 이름에서 YYYY-MM-DD-를 제외하면 주소를 알 수 있습니다.

ex)
2022-4-16-New-post >>> https:://kbmhansungb.github.io/New-post/

## Blog About 옆에 Github링크 추가하기
_default.html에서 nav를 찾습니다.

* nav는 

```
<nav>
  <a href="{{ site.baseurl }}/">Blog</a>
  <a href="{{ site.baseurl }}/about">About</a>
  <a href="https://github.com/kbmhansungb">GitHub</a>
</nav>
```

## 미정리
    
? GitHub 페이지를 추가하였다. 왜 About을 누르면 GitHub페이지가 나오지 않는가?
! 업데이트 하는데 시간이 걸리는 것 같다. 
&#42; 상관 없는 것을 했고, 나중에 다시 확인해보니 이제는 나온다.

? 깃허브 블로그에 코드블락을 추가하기 위해선 어떻게 해야하나?
! 프로그래밍 블럭을 MD Code Block 이라고 한다.
! GitHub Docs에서 찾아보았다. Creating and highlighting code blocks문서가 있다.
&#42; https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-and-highlighting-code-blocks


! 텍스트 뒤에 스페이스를 세번하면 여러줄을 줄바꿈이 된다고 한다.   
&#42; 이렇게 말이다.   


? 이미지는 어떻게 넣는 것인가?   
https://blog.jaeyoon.io/2017/12/jekyll-image.html


? HTML 이미지 가운데 정렬   
https://m.blog.naver.com/mathesis_time/221807095356

