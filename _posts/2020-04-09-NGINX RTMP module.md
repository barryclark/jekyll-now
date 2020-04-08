---
layout: post
title: 【STREAMING】nginx rtmp module API 해석 및 분석
subject: blog
category: streaming
author: junseo.park
subtitle: nginx-rtmp-module API 한글로 정리해보자
---

## RTMP API 정리
RTMP Streaming Server를 개발하는 과정에서 무작정 구글링하고 블로그에서 하라는대로 하니까 점점 미궁으로 빠질 뿐, 어떻게 해야할 지 모르겠다!!
<br><br>
그래서 직접 API 해석/분석하면서 정리해 보고자 한다.

전부 다 하지는 않고 핵심적이거나 내게 필요해 보이는 API만 정리하도록 하겠다.

해당 자료 원본 사이트 : https://github.com/arut/nginx-rtmp-module/wiki/Directives#rtmp

## 용어정리
**Context** : Programming에서 Context라는 단어는 많은 부분에서 사용되고 있다. Context Switch라든지, 프로그램이 메모리에 올라갔을 때, 실행되기 위해서 필수로 필요한 Resource를 총칭하는 용도로 사용되기도 하는데, 이번 페이지에서 나오는 `Context`라는 단어는 해당 명령어가 들어가기 위한 `바탕`? 혹은, `배경`? 이라고 생각하면 될 듯 싶다.

## Core

**rtmp**
- 문법
```
rtmp {
    ...
}
```

- Context : Root

- 역할 : 모든 RTMP Setting을 담아두는 Block의 개념