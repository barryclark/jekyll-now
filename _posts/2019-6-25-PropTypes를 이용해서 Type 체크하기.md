---
layout: post
title: PropTypes를 이용해서 Type 체크하기
date: 2019-06-25
comments: true
categories: [Study, react]
tags: [React, PropTypes]
excerpt: Javascript는 Type에 있어 매우 유연한 언어이다. React로 앱을 개발하면서 Type 체킹을 통해 많은 버그를 잡을 수 있는데, React에서 Type 체킹을 할 수 있는 방법으로는 PropTypes, Flow, Typescrip 등이 있다. 이 중, 컴포넌트의 props Type을 체크할 때 사용할 수 있는 PropTypes를 알아보자.
---

Javascript는 Type에 있어 매우 유연한 언어이다. React로 앱을 개발하면서 Type 체킹을 통해 많은 버그를 잡을 수 있는데, React에서 Type 체킹을 할 수 있는 방법으로는 **PropTypes, Flow, Typescript** 등이 있다. 이 중, 컴포넌트의 props Type을 체크할 때 사용할 수 있는 `PropTypes`를 알아보자.

```javascript
import PropTypes from "prop-types";
```
