---
title: "파스칼표기법(PascalCase)/카멜표기법(camelCase)/스네이크표기법(snake_cse)"
excerpt: "여러가지 표기법 알아보기"

categories:
    - Blog
tags:
- [camelCase, PascalCase, snake_case]

toc: true
toc_sticky: true

date: 2023-06-15
last_modified_at: 2023-06-15
---

## PascalCase (파스칼 표기법)
 
```kotlin
fun HomePage(){}
```

### 특징
* 단어 첫 시작은 항상 대문자

## camelCase (카멜 케이스)
```kotlin
fun homePage(){}
```

### 특징
* 대문자와 소문자의 조합이 낙타의 혹같아서 붙여진 표기법
* Java 언어에서 주로 사용

## snake_case (스네이크 케이스)
```kotlin
fun home_page(){}
```
### 특징
* 변수명,함수명,데이터 타입 활용

***
#이름 지정 규칙
* Kotlin
    + 패키지 이름은 항상 소문자 (여러 단어를 사용해야할 경우 카멜 표기법 사용 가능)
    + 클래스와 객체 이름은 파스칼 표기법
    + 함수, 속성, 지역 변수 이름은 카멜 표기법
    
