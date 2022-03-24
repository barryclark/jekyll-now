---
title: Colab / MD
author: Min
date: 2022-03-14
category: Jekyll
layout: post
---

간편하게 Colab 기준으로 작성 `Google Colaboratory`:

Colab 설치 하기
-------------
1. Google Drive로 이동 1 - branch_b1
2. +새로만들기 (New) 클릭
3. 더보기 - 연결할 앱 더보기 클릭
4. Colaboratory 검색
5. "추가" 버튼 클릭하기

Cell 단축키
-------------

- Ctrl + M A = 코드 셀 위에 삽입
- Ctrl + M B = 코드 셀 아래 삽입
- Ctrl + M D = 셀 지우기
- Ctrl + M Y = 코드 셀로 변경
- Ctrl + M M = 마크다운 셀로 변경
- Ctrl + M Z = 실행 취소
- Ctrl + M K = 위로 셀 이동
- Ctrl + M J = 아래로 셀 이동

마크다운 문법
-------------

- 제목(Heading) 표시  : #

```yaml
#Heading 1
##Heading 2
###Heading 3
####Heading  4
#####Heading 5
######Heading 6
```

- 목록(List) 구성

```yaml
1. 첫째
2. 둘째
3. 셋째
* 1단계
  +2단계
    -3단계
```

- Font Style

~~~
**bold**                                                  ▶  bold 
__bold__                                                  ▶  bold 
*italic*                                                  ▶  italic
_italic_                                                  ▶  italic
~~strike~~                                                ▶  strike
<u>underbar</u>                                           ▶  underbar
"""bold***                                                ▶  bold
___bold___                                                ▶  bold
~~~

- 인용구

~~~
> 인용 1
>> 인용 2
>>> 인용 3
~~~

- 링크  : [대표글](주소)

~~~
[구글](http://www.google.com)
[네이버](www.naver.com)
~~~

- 이미지 : \![이미지](이미지위치)

~~~
![이미지](http://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png)
~~~

- 수평선

~~~
---
~~~
