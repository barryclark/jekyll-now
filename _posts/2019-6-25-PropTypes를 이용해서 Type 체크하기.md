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

### install and import

PropTypes을 사용하기 위해서는, [`prop-types`](https://www.npmjs.com/package/prop-types)를 설치하고, `import` 해야 한다.

```bash
npm install --save prop-types
```

<br>
```react
import PropTypes from "prop-types";
```
<br>

### PropTypes로 Type 체크하기(기초)

먼저, PropTypes는 상위 컴포넌트로 부터 전달된 `props`의 Type을 체크하는 것이기 때문에 하위 컴포넌트가 필요하다.
상위 컴포넌트 `App`에서 하위컴포넌트 `TypeTest`로 props를 전달하고, 아래와 같이 `PropTypes`를 사용하여 Type 체크를 할 수 있다.

```react
import React from "react";
import "./App.css";
import PropTypes from "prop-types";

const TypeTest = props => {
  return (
    <div>
      <h1>{props.str}</h1>
    </div>
  );
};
TypeTest.propTypes = {
  str: PropTypes.string
};
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <TypeTest str={"Typechecking With PropTypes"} />
      </div>
    );
  }
}

export default App;
```

<br>

만약, `PropTypes` 부분에서 type을 number로 정의하면, 아래와 같은 오류가 발생한다.

```react
TypeTest.propTypes = {
  str: PropTypes.number
};
```

![PropTypes error](/images/type_error.png "PropTypes error")

<br>

### PropTypes로 Type 체크하기(응용)

- 값을 필수적으로 가져야 한다면 Type 뒤에 `isRequired`를 붙여준다.

```react
TypeTest.propTypes = {
  str: PropTypes.number.isRequired
};
```

<br>

- 다양한 Type은 아래와 같이 나타낼 수 있다.

```react
TypeTest.propTypes = {
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,
};
```

<br>

- 두가지 이상의 Type 중 하나를 만족하면 될 때, `oneOfType([])`을 사용한다.

```react
  optionalStringOrNumber: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
```

<br>

- 특정 Type을 가진 element들로 이루어진 배열과, 객체를 확인할 때는,

```react
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  optionalObjectOf: PropTypes.objectOf(PropTypes.number),
```

<br>

- 특정 형태를 가진 객체를 확인할 때는,

```react
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),
```

<br>

- element를 props로 전달할 수도 있다.

```react
TypeTest.propTypes = {
  children: PropTypes.element.isRequired
};
```

<br>

- class의 instance를 전달할 때는,

```react
TypeTest.propTypes = {
  optionalMessage: PropTypes.instanceOf(Message),
};
```

<br>

- class component 내에서 static 형태로 쓰일 수도 있다.

```react
export default class State extends Component {
   static propTypes = {
    requiredNumber: PropTypes.number.isRequired

   }
}
```

<br>
