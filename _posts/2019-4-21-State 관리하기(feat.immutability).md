---
layout: post
title: State 관리하기(feat.immutability)
date: 2019-04-21
comments: true
categories: [Study, react]
tags: [React, State, Immutability]
excerpt: 리액트를 다루면서 맞닥뜨리게 되는 중요한 개념 중 하나가 바로 state의 immutability(변경불가성)이다. 프로그래밍에서 immutability란, 객체가 생성된 이후 그 상태를 변경할 수 없는 디자인 패턴을 말한다.
---

![immutability](https://cdn-images-1.medium.com/max/1600/1*IugEwe6Lkm5iFB-Q9zvc5w.jpeg "immutability")

리액트를 다루면서 맞닥뜨리게 되는 중요한 개념 중 하나가 바로 **state의 immutability(변경불가성)이다.** 프로그래밍에서 immutability란, 객체가 생성된 이후 그 상태를 변경할 수 없는 디자인 패턴을 말한다.

리액트에서 immutability를 강조하는 이유는 리액트 자체가 view에 변화가 필요할 때, 전체 DOM을 다시 그리는 것이 아니라, 필요한 부분만 바꿔끼워주는 virtual DOM을 쓰고있기 때문이다. data의 변화를 state의 변화로 인식하여 다시 그려야 할 부분을 업데이트 하는 방식이기 때문에 side effect를 피하기 위해서는 state의 immutability가 중요하다.

[리액트 공식문서](https://reactjs.org/docs/state-and-lifecycle.html#using-state-correctly)에서는 state를 직접적으로 변경하지 말고, setState를 사용하여 업데이트 할 것을 강조하고 있다. 초기 state가 선언되고 난 후 변경이 필요할 때, 아래의 코드처럼 직접적으로 state에 접근하여 변경하는 것이 아니라,

```react
this.state.comment = 'Hello';
```

<br>
아래의 코드처럼 `setState()`를 사용해야 한다는 것이다.

```react
this.setState({comment: 'Hello'});
```

<br>
state가 단순히 string이나 boolean이라면 문제는 간단하지만, array나 object 형태일때면 문제는 조금 더 복잡해진다. JavaScript에서 object, array를 다른 변수에 할당하면, **레퍼런스 참조**로 복사되기 때문이다.

따라서, array로 된 state에 어떠한 요소를 추가하거나, 삭제하거나, 변경하고 싶다면, **반환값이 새로운 객체인 메서드를 사용**해야 한다. 즉, `push`, `slice` 등이 아닌, `concat`(추가), `filter`(삭제), `map`(변경)등을 사용해야 한다는 것이다.

<br>
object로 된 state의 경우, 예를들어 `this.state = {student = {name: “Steve”, age: 18}}`이라는 state가 있는데, `hobby: “swimming”`이라는 값을 추가하고 싶을 때, 아래와 같이 작성할 수 있다.

```react
let newState = Object.assign({}, this.state.student)
let newState.hobby= "swimming"
this.setState({
  data: newState
});
```

<br>
또는, 바벨의 도움을 받아 ES6의 [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)를 쓰면 더 간단하게 만들 수 있다.

```react
let newState = {...this.state.student, hobby: “swimming”}
```

<br>
