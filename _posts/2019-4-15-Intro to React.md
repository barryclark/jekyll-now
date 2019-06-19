---
layout: post
title: Intro to React
date: 2019-04-15
comments: true
categories: [Study, react]
tags: [React]
excerpt: React는 Facebook이 만든 JavaScript 라이브러리다. 그렇다면, JavaScript 라이브러리는 무엇이고, 왜 필요한 것일까?
---

## JavaScript Library

React는 Facebook이 만든 JavaScript 라이브러리다. 그렇다면, JavaScript 라이브러리는 무엇이고, 왜 필요한 것일까? 라이브러리란 자주 사용하는 특정 기능에 대한 API(도구 / 함수)를 모은 집합이다. JS는 HTML과 CSS로 만들어진 웹페이지를 동적으로 변경해주는 언어이다. 사용자 인터랙션이 많을수록 수 많은 DOM 요소를 관리해야 하는데, 이것은 생각만으로도 머리아픈 이야기다. 개발자의 DOM 관리를 최소화하고, 기능구현에 집중할 수 있도록 하기 위해 개발된 것이 라이브러리/프레임워크이다. 그 동안 다양한 라이브러리가 등장했고, 쉬운 DOM 컨트롤로 Jquery가 한 시대를 군림하기도 했지만, 현재 React, Vue.js, 그리고 Angular(프레임워크)가 주로 사용되고 있다. (참고: 구글 트렌드 [react vs. vue vs. angular](https://trends.google.com/trends/explore?q=react,vue,angular))

_한 동안 리액트를 다루게 되겠지만, Vue.js, Angular도 사용해 보고 각각의 장/단점과 사상을 경험해 봐야 겠다!_

## What is React?

그럼 페이스북은 왜 리액트를 만들게 되었을까?

> 우리는 지속해서 데이터가 변화하는 대규모 어플리케이션을 구축하기 위해 리엑트를 만들었습니다.
>
> We built React to solve one problem: building large applications with data that changes over time.

현대 웹어플리케이션에서 데이터는 실시간으로 변화한다. 특정 이벤트/변화가 발생했을 때, 웹페이지의 view 또한 변화(Mutation)하게 되는데, 이것이 상당히 복잡한 작업이다. 페이스북은 이 Mutation 대신 기존의 view를 날려버리고 새로운 view를 생성하면 어떨까 하는 발상으로 리액트를 만들었다. 물론, 이 또한 상당히 복잡한 작업일 테지만 페이스북은 이 문제를 Virtual DOM으로 해결했다.

### Virtual DOM

Virtual DOM은 변화가 일어나면 실제 DOM에서 변경하는 것이 아니라, 가상의 DOM에 먼저 적용을 시키고 실제 DOM과 비교하여 바뀐 부분만 찾아서 바꿔주어 DOM의 변화를 최소화 시켜주어 웹어플리케이션의 성능을 높여준다. Virtual DOM의 장점을 극대화 하려면 사용자 인터페이스(UI) 단위로 코드가 구성되어 있어야 한다. 이것이 리액트의 가장 큰 특징중의 하나인 Component이다.

### Compoenet

Component는 UI를 구성하는 개별적인 뷰 단위로, 각 Component들의 결합으로 전체 앱이 만들어지게 된다. **리액트는 하나의 의미를 가진 Component 단위로 어플리케이션을 구성하여 보다 직관적이고 재사용성이 높은 코드를 작성할 수 있게 한다.**

### JSX

JSX는 리액트를 위해 만들어진 Javascript + XML로 탄생한 자바스크립트의 확장 문이다. 최종적으로 만들어질 view에 가깝게, 직관적으로 코딩을 할 수 있도록 도와주는 도구이다. JSX를 사용하여 쓰여진 코드는 바로 DOM에 적용되는 것이 아니라, Babel이 브라우저 호환 JavaScript로 번역해준다.

![JSX](https://cdn-images-1.medium.com/max/1600/1*mEZoxtRgKFSRlDrJbMvJdg.png "JSX")

JSX를 통해 직관적인 리액트의 장점을 살릴 수 있고, 코드의 양도 줄일 수 있다! 따라서, JSX가 필수는 아니지만 쓰지 않는다면 리액트의 큰 이점을 포기하는 것인것 같다.
