---
layout: post
title: Jekyll Now로 쉽고 빠르게 깃허브 블로그 시작하기
date: 2019-06-18
comments: true
categories: [Project, blogwithjekyll]
tags: [Jekyll, Mac OS]
excerpt: 네이버, 이글루, 티스토리, 미디엄 등 많은 블로그를 사용해 보았지만, 내 입맛에 맛는 블로그를 찾기란 여간 힘든게 아니였다. 코딩을 배우고 가장 좋은 것은 이렇게 직접 만들어 볼 수 있는게 아닐까?
---

네이버, 이글루, 티스토리, 미디엄 등 많은 블로그를 사용해 보았지만, 내 입맛에 맛는 블로그를 찾기란 여간 힘든게 아니였다. 코딩을 배우고 가장 좋은 것은 이렇게 직접 만들어 볼 수 있는게 아닐까?

이것저것 알아본 결과, Github Page로 블로그를 개설하면 호스팅도 간편하고, 요즘 매일같이 하고있는 커밋과 푸시로 콘텐츠를 포스팅할 수 있다는 것이 마음에 들었다. 호기롭게 시작했으나, 생각보다 초기 구조파악과 커스터마이징에 많은 시간을 투자해야 했다. 🤯

하지만 조금 틀을 잡고 나니 역시 만들길 잘했다는 생각!

Github Page 제작 시, Jekyll Hexo가 가장 많이 쓰이는 것 같은데, 더 많은 자료를 찾을 수 있었던 Jekyll 선택했다. zero 부터 쌓아올리려다 여러번 실패한 뒤, 이러다블로그를 못만들겠다..싶어 쉽고 빠르게 시작할 수 있는 [Jekyll Now](https://github.com/barryclark/jekyll-now)로 겨우 시작할 수 있었다. 😢

Jekyll Now 깃허브 페이지에 설명되어 있듯이,

### 1. [Jekyll Now](https://github.com/barryclark/jekyll-now) 레파지토리 포크 받기

### 2. 포크받은 레파지토리 이름을 [username.github.io]로 변경하기

### 3. \_conifg.yml 파일 내 주요 정보 수정하기

Jekyll Now를 사용하면, \_config.yml 파일 내 title, description, avatar 등이 웹페이지의 nav bar 부분에 home link 형식으로 표출되므로 필수적으로 변경해주어야 하며, avatar는 깃허브 프로필 이미지도 사용할 수 있어 편리하다.
또한, 잊지않고 필수적으로 변경해야할 부분은 **url** 정보인데,**username.github.io**로 변경해야 이 주소로 웹페이지에 접 접글할 수 있다.

### 4. 이제, 로컬에 파일을 가져와 보자!

1. 한 줄의 명령어, `gem install github-pages`로 Jekyll과 관련 플러그인을 설치할 수 있다. 👍
2. 다음은, 깃허브 저장소로부터 클론받기! `git clone https://github.com/username/username.github.io.git`
3. 이제 모든 준비는 끝났다. 로컬에서 웹페이지를 구동해보자. `jekyll serve` 명령어를 실행하면, 친절하게도 터미널에 로컬호스트 주소가 안내된다. [http://127.0.0.1:4000/](http://127.0.0.1:4000/)

### 5. 커밋 & 푸시로 포스팅하기

이제 커밋 & master branch에 푸시하면 **https://maruzzing.github.io/** 주소의 웹페이지에 포스팅 할 수 있다.

정말 쉽고 빠른 블로그 호스팅하기!
이제 내 입맛에 맞게 커스터마이징 하고 운영하는 것만 남았다!
