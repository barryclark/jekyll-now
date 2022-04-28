---
layout: post
title: jekyll 기록
---

## 시작 ##
일단 모르겠으면 DOC을 보도록 합시다.

# Jekyll DOC #
https://jekyllrb.com/docs/

# Markdown API #   
https://docs.gitlab.com/ee/api/markdown.html

# MDN #
https://developer.mozilla.org/ko/

## Blog 주소 ##
Post의 주소는 _posts폴더의 .md파일의 이름에서 YYYY-MM-DD-를 제외하면 주소를 알 수 있습니다.

ex)
2022-4-16-New-post >>> https:://kbmhansungb.github.io/New-post/

## Blog About 옆에 Github링크 추가하기 ##
_default.html에서 nav를 찾습니다.

* nav는 

```
<nav>
  <a href="{{ site.baseurl }}/">Blog</a>
  <a href="{{ site.baseurl }}/about">About</a>
  <a href="https://github.com/kbmhansungb">GitHub</a>
</nav>
```

## 코드 블럭이 더블 프레임으로 표시되는 경우 ##

https://stackoverflow.com/questions/55308142/why-do-i-get-a-double-frame-around-markdown-code-block-on-jekyll-site

stackoverflow의 해결방법은 _sass/_higlights.scss파일에서 .highlight를 pre.highlight로 대체하면 된다고 합니다.

이것을 지정하지 않으면 일부 스타일링이 두 번 적용될 수 있다고 합니다.

https://talk.jekyllrb.com/t/different-syntax-highlighting-on-github-pages-and-locaklly/1084

? 이를 이해하기 위해서는 GitHub Pages가 무엇인지 이해할 필요가 있는 것 같습니다.

## 강조(Emphasis) ##

https://docs.gitlab.com/ee/development/documentation/styleguide/#emphasis

* ```*```를 asterisks라 합니다. ```**Bold**```와 같이 사용할 수 있습니다.   
* ```_```를 underscore라 합니다. ```_italic_와 같이 사용할 수 있습니다.   
* greater```>```를 이용하여 인용구(blockquotes)를 할 수 있습니다.   
인용구>

## 미정리 ##
    
? GitHub 페이지를 추가하였다. 왜 About을 누르면 GitHub페이지가 나오지 않는가?
! 업데이트 하는데 시간이 걸리는 것 같다. 
&#42; 상관 없는 것을 했고, 나중에 다시 확인해보니 이제는 나온다.

? 깃허브 블로그에 코드블락을 추가하기 위해선 어떻게 해야하나?
! 프로그래밍 블럭을 MD Code Block 이라고 한다.
! GitHub Docs에서 찾아보았다. Creating and highlighting code blocks문서가 있다.
&#42; https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-and-highlighting-code-blocks

```
int main()
{
    printf("Print!");
}
```

? 이해하기 어렵다. 왜 이렇게 나오는가?
! 문법을 알기 위해 md format을 github doc에서 찾았다.
! Basic writing and formatting syntax를 찾았다.
! Quating code 목록을 보았다. 복사해보았다.

Some basic Git commands are:
```
git status
git add
git commit
```

! 여전히 작동하지않는다.

! 텍스트 뒤에 스페이스를 세번하면 여러줄을 줄바꿈이 된다고 한다.   
&#42; 이렇게 말이다.   


? Play PIE 모드란 무엇인가?


? 이미지는 어떻게 넣는 것인가?   
https://blog.jaeyoon.io/2017/12/jekyll-image.html


? HTML 이미지 가운데 정렬   
https://m.blog.naver.com/mathesis_time/221807095356

? 프로그래머에게 논리력이란 무엇인가?   
* 어떤 문제를 어떻게 접근해야 효율적일지 판단하는게 논리력인가?   
* 컴퓨터에게 자신의 생각을 구현하는 것이 논리력인가?   
