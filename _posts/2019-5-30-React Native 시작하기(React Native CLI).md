---
layout: post
title: React Native 시작하기(React Native CLI)
date: 2019-05-30
comments: true
categories: [Study, rnative]
tags: [React Native, setting]
excerpt: ios와 안드로이드를 한 번에 개발할 수 있는, React를 알면 쉽게(😉) 시작할 수 있는 React Native를 시작해 보자.
---

ios와 안드로이드를 한 번에 개발할 수 있는, React를 알면 쉽게(😉) 시작할 수 있는 **React Native**를 시작해 보자.

Expo라는 플랫폼을 사용할 수 있지만, 개발을 하다보면 여러가지 한계점이 있기 때문에 **React Native CLI**로 시작해보겠다.

## 1. 앱스토어에서 xcode를 설치

![xcode](/images/xcode.png "xcode")

## 2. React Native CLI로 설치하기

```bash
$ brew install watchman
$ npm install -g react-native-cli # React Native CLI 설치
```

1, 2번은 한 번 설치하고 나면 더이상 안해도 된다(당연)

## 3. React Native 시작하기

```bash
$ react-native init <project_name>
$ cd <project_name>
$ react-native run-ios # xcode에서 시뮬레이터가 열림
```

노트북이 이륙할 것 같은 소리가 나지만, 당황하지 않고 기다리면 시뮬레이터가 열린다. 다양한 아이폰, 아이패드 사이즈로 앱 개발 상황을 확인할 수 있으며, 안드로이드는 안드로이드 스튜디오를 따로 설치해야 한다.

## 4. 유용한 기능

시뮬레이터가 실행되고 있는 상황에서 `cmd+d`를 누르면 개발자 도구 창이 뜬다.

![RN_개발자도구](/images/rn_dev.png "RN_개발자도구")

여기서 많이 쓰이는 것이 브라우저에서 콘솔을 확인할 수 있는 **Debug JS Remotely**와 스타일을 확인할 수 있는 **Toggle Inspector**이다.

---

<span class="reference">참고자료</span>

[React Native 공식문서 Getting Started](https://facebook.github.io/react-native/docs/getting-started)
