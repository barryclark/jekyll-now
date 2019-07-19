---
layout: post
title: 2019-7-18-Passport와 JWT를 이용한 로그인 구현_local
date: 2019-07-18
comments: true
categories: [Study, nodejs]
tags: [NodeJs, Passport, JWT]
excerpt: 요즘은 대부분의 서비스가 자체 사이트 회원가입과 로그인 뿐만 아니라 구글, 페이스북 등 기존 유저가 가지고 있던 어카운트를 활용하여 로그인 하는 소셜로그인 서비스를 제공한다.
---

요즘은 대부분의 서비스가 자체 사이트 회원가입과 로그인 뿐만 아니라 구글, 페이스북 등 기존 유저가 가지고 있던 어카운트를 활용하여 로그인 하는 소셜로그인 서비스를 제공한다. 한 가지의 소셜 로그인만 제공을 한다면 해당 SNS에서 제공하는 API를 사용하면 되겠지만, 여러가지 로그인 방법을 앱에 탑재하고 싶다면 **[Passport 모듈](https://github.com/jaredhanson/passport)을 활용**하는것이 좋을 것 같다.

Passport 모듈은 다양한 인증 API를 간편하게 구현할 수 있도록 하는 모듈로, user 정보를 session에 저장한다. 하지만 JWT을 사용하는 동시에 session을 사용하는 것은 불필요한 작업이다. 다행히도 Passport는 사용자 정보를 session에 저장하는 대신 request에 저장할 수 있는 기능을 제공하고 있다.

### Passport 설치

Passport는 각 SNS별 로그인 기능을 패키지화해서 제공하므로, `passport`와 원하는 패키지를 설치해 주면 되는데, 이번 포스팅은 local 로그인에 관한 내용을 다룰 것이므로, `passport`와 `passport-local`을 설치한다. 또한, JWT 구현을 위해 `passport-jwt`와 `jsonwebtoken`도 설치한다.

```bash
$ yarn add passport passport-local passport-jwt jsonwebtoken
```
