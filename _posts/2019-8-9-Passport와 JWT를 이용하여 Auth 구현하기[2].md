---
layout: post
title: Passport와 JWT를 이용하여 Auth 구현하기[2]
date: 2019-08-09
comments: true
categories: [Study, nodejs]
tags: [NodeJs, Passport, JWT]
excerpt: 이전 포스팅에선느 로컬로 계정을 생성한 사용자의 로그인을 진행해 보았다. 그렇다면 소셜 로그인은 어떻게 구현할까?
---

[이전 포스팅](/study/nodejs/Passport와-JWT를-이용한-로그인-구현_local/)에서는 로컬로 계정을 생성한 사용자의 로그인을 진행해 보았다. 그렇다면 소셜 로그인은 어떻게 구현할까?

호기롭게도 현재 개발중인 앱의 로그인 스크린에는 카카오톡, 네이버, 페이스북 그리고 구글까지 4개의 소셜로그인 버튼이 생성되어 있다.

<img src="/images/turtleStep-loginScreen.png" alt="disqus" width="350em">

이 모든걸 Passport 모듈의 strategy를 써서 구현할 수 있다니! 차근차근 만들어 보자!
