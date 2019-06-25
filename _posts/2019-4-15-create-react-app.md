---
layout: post
title: create-react-app
date: 2019-04-15
comments: true
categories: [Study, react]
tags: [React, setting]
excerpt: 리액트를 쉽게 시작할 수 있는 방법은 페이스북에서 제공하는 create-react-app을 이용하는 것이다. 리액트 앱을 만들수있는 기본 프로젝트 환경이다. 컴퓨터에 npm 5.6버전 이상이 설치되어 있다면, 터미널에서 간단한 코드를 실행하여 프로젝트를 생성할 수 있다.
---

## create-react-app

리액트를 쉽게 시작할 수 있는 방법은 페이스북에서 제공하는 [create-react-app](https://github.com/facebook/create-react-app)을 이용하는 것이다. 리액트 앱을 만들수있는 기본 프로젝트 환경이다. 컴퓨터에 npm 5.6버전 이상이 설치되어 있다면, 터미널에서 간단한 코드를 실행하여 프로젝트를 생성할 수 있다.

```bash
npx create-react-app [프로젝트명]
```

프로젝트가 성공적으로 설치되고 나면 아래와 같은 결과가 뜨는데, 터미널에 npm start를 치면 브라우저 앱이 실행된다.

![CRA](https://cdn-images-1.medium.com/max/1600/1*0CuiKgGmH17SBG7M-riWPA.png "CRA")

### import/export

리액트에서는 import/export 명령어를 사용하여 다른 파일에서 특정 코드를 가져와서 사용할 수 있다.

- import [코드] from [파일]
- export {변수} : 변수안에 있는 데이터를 객체에 담아 전달
- export default : 변수, 함수, 오브젝트, 클래스 등을 내보낼 수 있는 명령어로, 중괄호 없이 작성한다.

JSX를 사용하려면 꼭 React를 import 해주어야 하며,

App.js 파일에서 App 컴포넌트를 import 하려면, App.js 파일의 하단에는 아래 그림처럼 App이 export 되어있어야 한다.

```javascript
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
```

<br>
```javascript
export default App;
```

### JSX 사용하기

1. 태그는 꼭 닫혀있어야 한다.
2. 두개 이상의 엘리먼트는 하나의 엘리먼트로 감싸져 있어야 한다. 가장 간단하게 `<div></div>`를 사용할 수 있고, 단순 감싸는 용도라면 `<Fragment></Fragment>`를 사용할 수 도 있다.
3. JSX 내부에서 자바스크립트 값을 사용할 때에는 `{}` 을 사용한다.

```react
class Human extends React.Component {
  render() {
    const name = "Steve";
    return <div>hello {name} !</div>;
  }
}
```

4. 조건부 렌더링 : JSX 내부에서는 if문은 사용하기 까다롭다.(꼭 필요하다면 IIFE 를 써야함) 따라서 삼항 연산자 혹은 AND 연산자를 사용한다. 삼항연산자는 true 일 때와 false 일 때 다른것을 보여주고 싶을 때 사용하며, AND 연산자는 조건이 true 일 때만 보여주고 false 경우 아무것도 보여주고 싶지 않을 때 사용한다.

5. style 과 className은 아래와같이 사용한다.

```react
class Human extends React.Component {
  render() {
    const name = "Steve";
    const style={
        fontSize: '20px',
        color:'red'
    }
    return (
    <div className="greeting" style={style}>
        hello {name} !
    </div>
    )
  }
}
```

6. 주석은 `{/* … */}` 쓰거나, 태그 사이에서 `//`로 쓰인다.
