---
title: "마크다운 문법"
excerpt: "내가 보려고 쓰는 마크다운 문법"

categories:
    - MarkDown
tags:
- [MarkDown, git, github]

toc: true
toc_sticky: true

date: 2023-06-14
last_modified_at: 2023-06-14
---

마크다운 문법에 대해서 알아보자
===============================

마크다운 장점!
--------------
1. 문법이 쉽고 간결하다
2. 관리가 쉽다
3. 별도의 도구 없이 작성가능
4. Text로 저장되어 용량이 적어서 보관하기 좋다
5. 버전관리시스템을 이용해서 변경이력 관리 가능
6. 지원하는 프로그램과 플랫폼이 다양함

마크다운 단점!
--------------
1. 표준이 없다
2. 표준이 없어 표현하는 도구에 따라 동작하지 않거나, 다르게 표현될 수 있음
3. 모든 HTML 마크업을 대신하지 못함

마크다운 사용법
-----------------
### Headers 
-----------
```
# 제목(h1)
## 제목(h2)
### 제목(h3)
#### 제목(h4)
##### 제목(h5)
###### 제목(h6)
```
예시)
# 제목(h1)
## 제목(h2)
### 제목(h3)
#### 제목(h4)
##### 제목(h5)
###### 제목(h6)

 ```
 큰제목(h1)
 ===========
 
 작은제목(h2)
 -----------
 ```
 예시)
 큰제목(h1)
 ===========
 
 작은제목(h2)

### BlockQuote (인용문)
----------------
```
> First blockquote 인용문장
>  > Second blockquote 중첩된 인용문
>  >  > Third blockquote 중첩된 

> 다른 마크다운 요소 포함 가능
  * 글머리 기호
```

예시)
> First blockquote
>  > Second blockquote
>  >  > Third blockquote

> 다른 마크다운 요소 포함 가능
>  * 글머리 기호

### 목록
------------
* 순서있는 목록 (내림차순 정렬)
```
1. First
2. Second
3. Third
```    
예시)
1. First
2. Second
3. Third
    
* 글머리 기호 : *, -, + 
```
글머리를 띄울 땐, Tab키를 눌러서 띄워줘야지 확실히 적용됨
* First
    * Second
        * Third
  
- First
    - Second
        - Third
  
+ First
    + Second
        + Third

* First
    - Second
        + Third
혼합도 가능하다고 한다 
```
예시)
* First
    * Second
        * Third
  
- First
    - Second
        - Third
  
+ First
    + Second
        + Third

* First
    - Second
        + Third

### 줄 바꾸기
```
<br/>
```
예시) 
우리집 강아지 귀여워 <br/>엄청 귀여워

### 수평선
-----------------
```
페이지를 나눌 때 쓰곤 한다.
--- 얇은 줄
*** 두꺼운 줄 
___ 두꺼운 줄
****** 두꺼운 줄
```
예시)
---
***
___
******

### 코드블럭
-------------------
```
* <pre><code>{code}</code></pre> 

<pre>
<code>
fun MainPage(){
   print("Hello, World")
}
</code>
</pre>

* ``` ``` 사용하는 법 (시작점에 사용하는 언어 선언하여 문법강조(Syntax highlighting) 가능
```
fun MainPage(){
   print("Hello, World")
}
```

```
예시1)
<pre>
<code>
fun MainPage(){
   print("Hello, World")
}
</code>
</pre>

예시2)
```kotlin 
fun MainPage(){ //preview할 때 언어 색상이 나온다! 우앙
   print("Hello, World")
}
```

### 링크 연결하기
------------------------
```
참조링크
[link keyword][id]

[id]: URL "here"

// code
Link: [Naver][naverlink]

[naverlink]: https://naver.com "naver Link"

```
예시)
Link: [Naver][naverlink]

[naverlink]: https://naver.com "naver Link"

```
외부링크
[Title](link)
[Naver](https://naver.com, "naver Link"
```
예시)
[Title](link)
[Naver](https://naver.com, "naver Link"

### 표
--------------------
헤더와 셀을 구분할 때 --: 필요함
```
| Header | value | Description |
| --: | :-- | :--: |
| 정렬 | --: | 우측정렬 |
| 정렬 | :-- | 좌측정렬 |
| 정렬 | :--: | 가운데정렬 |
```
예시) 
| Header | value | Description |
| --: | :-- | :--: |
| 정렬 | --: | 우측정렬 |
| 정렬 | :-- | 좌측정렬 |
| 정렬 | :--: | 가운데정렬 |

### 이미지
-----------------------
```
![텍스트](이미지주소)

//코드
![Image Moomin](https://i.pinimg.com/originals/9a/4a/8e/9a4a8e42804f07f605257f720b1eed82.png)
```
![Image Moomin](https://i.pinimg.com/originals/9a/4a/8e/9a4a8e42804f07f605257f720b1eed82.png)

### 강조하기
```
백틱(``)으로 강조할 내용을 감싸면 된다. 

우리 `강아지` 귀여워
```
예시) 우리 `강아지` 귀여워

이정도만 알면.. 
어느정도는 쓸 수 있을 거라고 생각한당.. (To be continue...)

