---
layout: post
title: Styled Components 적용하기
date: 2019-06-30
comments: true
categories: [Study, react]
tags: [React, Styled Components, Basics]
excerpt: Styled Components는 자바스크립트 파일 안에 CSS 를 작성하는 style 라이브러리이다. CSS 파일을 따로 만들 필요가 없어 더욱 간편하게 쓸 수 있다. 이번 포스트에서는 Styled Components를 활용하여 Global Navigation Bar를 만들어 보겠다.
---

Styled Components는 자바스크립트 파일 안에 CSS 를 작성하는 style 라이브러리이다. CSS 파일을 따로 만들 필요가 없어 더욱 간편하게 쓸 수 있다.

이번 포스트에서는 Styled Components를 활용하여 **Global Navigation Bar**를 만들어 보겠다.

### Styled Components 설치하기

먼저, Styled Components 라이브러리를 설치한다. 관련 공식문서는 [여기](https://www.styled-components.com/)서 확인할 수 있다.

```bash
$ yarn add styled-components
```

### Style Components의 기본 문법 익히기

Styled Components는 말 그대로 css가 포함된 컴포넌트이다.
아래와 같은 문법으로 사용하면 되며, 컴포넌트 이므로 props를 활용할 수 있다.
이 부분은 'advanced' 포스트에서 다루겠다.

```react
const [컴포넌트 명] = styled.[html element]`
[css 내용]
`;
```

### Style Components 적용하기

Menu라는 컴포넌트에 `Home`과 `About` 라우터를 만들었다.

```react
const Menu = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/about" activeClassName="active">
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
```

<br>
먼저 mainTheme.js 파일을 만들고, 주로 사용 할 색상과 폰트를 정의한다.

```javascript
export default {
  mainOrangeColor: "#d85a4d",
  mainBlueColor: "#587aed",
  mainTextColor: "#666",
  mainFont: "'Noto Sans KR', sans-serif"
};
```

<br>
다시 Menu.js 파일로 돌아와서, `styled`와 `mainTheme`을 `import` 하고,
```react
import styled from 'styled-components';
import mainTheme from './MainTheme';
```

<br>
Style Components를 만든다. 위의 `nav` 컴포넌트를 `Nav` 컴포넌트로, `ul` 컴포넌트를 `GnbLists`로, `li` 컴포넌트를 `GnbItem`라는 컴포넌트로 스타일화 하면, 아래와 같이 나타낼 수 있다.

```react
const Nav = styled.nav`
  height: 60px;
  width: 100%;
  text-align: center;
`;

const GnbLists = styled.ul`
  list-style: none;
  height: 60px;
  margin: auto;
  padding: 0;
`;

const GnbItem = styled.li`
  display: inline-block;
  height: 60px;
  a {
    font-family: ${mainTheme.mainFont};
    display: block;
    position: relative;
    height: 60px;
    line-height: 65px;
    font-size: 16px;
    font-weight: 500;
    padding: 0 0px;
    margin: 0 16px;
    text-decoration: none;
    color: ${mainTheme.mainTextColor};
  }
  .active {
    border-bottom: solid 3px ${mainTheme.mainOrangeColor};
  }
`;
```

<br>
이를 Menu 컴포넌트에 적용하면, 
```react
const Menu = () => {
  return (
    <Nav>
      <GnbLists>
        <GnbItem>
          <NavLink exact to="/" activeClassName="active">
            Home
          </NavLink>
        </GnbItem>
        <GnbItem>
          <NavLink exact to="/about" activeClassName="active">
            About
          </NavLink>
        </GnbItem>
      </GnbLists>
    </Nav>
  );
};
```

<br>
실제 적용된 모습은 아래와 같다.

<img src="/images/styled-component.png" alt="styled-component-applied" style="border:1px solid #bcbcbc">
<br>
