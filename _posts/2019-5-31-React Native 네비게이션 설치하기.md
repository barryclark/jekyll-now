---
layout: post
title: React Native 네비게이션 설치하기
date: 2019-05-31
comments: true
categories: [Study, rnative]
tags: [React Native, Navigation]
excerpt: 대부분의 모바일 앱은 한 스크린으로만 이루어져 있지 않기 떄문에 navigator를 사용하여 스크린 간 이동을 해야한다. React Navigation과 React Native Navigation이다.
---

대부분의 모바일 앱은 한 스크린으로만 이루어져 있지 않기 떄문에 navigator를 사용하여 스크린 간 이동을 해야한다. React Native에 내장된 네비게이션은 없으나, 양대산맥을 이루는 라이브러리가 있다. [React Navigation](https://reactnavigation.org/)과 [React Native Navigation](https://github.com/wix/react-native-navigation)이다.

이 중, React Native 공식문서에 언급되어 있는 React Navigation을 설치해 보겠다.

### 1. react-navigation과 react-native-gesture-handler 설치

```bash
$ yarn add react-navigation
$ yarn add react-native-gesture-handler
```

### 2. react-native-gesture-handler 연결(link)

```bash
$ react-native link react-native-gesture-handler
```

.xcodeproj 파일의 Build Phases > Link Binary With Libararies에서 연결상태를 확인할 수 있으며, link가 안되었으면 하단의 '+' 버튼을 눌러 추가할 수 있다.

![React Native link](/images/rn_link.png "React Native link")
