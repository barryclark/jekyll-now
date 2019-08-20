---
layout: post
title: React Native에서 Redux-Saga 적용하기
date: 2019-08-20
comments: true
categories: [Study, rnative]
tags: [React Native, Redux]
excerpt: 이전 프로젝트에서는 API 호출과 같은 비동기 처리를 위해 redux-thunk 미들웨어를 사용했었는데, 여기저기서 redux-saga가 좋다, 기회가되면 한 번 써봐라고 해서 도전! 해보았다.
---

이전 프로젝트에서는 API 호출과 같은 비동기 처리를 위해 [redux-thunk 미들웨어](https://github.com/reduxjs/redux-thunk)를 사용했었는데, 여기저기서 [redux-saga](https://github.com/redux-saga/redux-saga)가 좋다, 기회가되면 한 번 써봐라고 해서 도전! 해보았다.

### redux-saga 설치

```bash
yarn add redux react-redux
```
