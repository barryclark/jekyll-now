---
layout: post
title: 내가 알기 위해 작성해보는 React 18
---

# React v18.0

## 리액트란 ?
리액트는 사용자 인터페이스를 만들기 위한 자바스크립트 라이브러리

## 무엇이 바뀌었을까요 ?

- Automatic Batching
- Transitions
- Suspense 
- new APi

### Automatic Batching
Batching이란 리액트가 여러 상태값들을 좋은 성능을 위해 하나로 그룹화하는 것이다.
우리가 리액트를 활용하여 웹을 만들 때, 흔히 겪는 일 중 하나가 바로 무엇가 작업을 수행할 때 컴포넌트가 여러번 리렌더되는 경우일 것이다. ( ~~물론 올바른 값을 준다면 괜찮을 수도.. ~~ )
이러한 경우 불필요한 리렌더링 때문에 좋지 못한 성능을 갖게 될 것이다.

이것을 방지해주는 기능이 추가가되었다.

#### 사용법

사용법은 매우 간단하다. 
우린 기존에 index.js( html에 붙이는 root js)의 마지막 줄에 

```js
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

이와 같은 코드를 보았을 것이다. 

이 부분을 

```js
const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<App />);
```
와 같은 형태로 바꾸면 자동적으로 Batching이 이루어진다.

하지만 Batching을 원하지 않는 경우도 발생할 수 있을 것이다.

이러한 경우 ```ReactDom.flushSync()``` 를 사용할 수 있다.

```js
import {flushSync} from 'react-dom'

//Batching을 원하지 않는 함수 내부에서 사용
function handleNotBatching (){
	flushSync(()=>{
    	setState((prev)=>prev+1)
    })
  	flushSync(()=>{
    	setState2((prev2)=>prev+2)
    })
}
```

### Transitions
Transition은 먼저 변해야하는 것과 나중에 변해도되는 것을 구분짓는 이번 React v18.0이 새롭게 추가된 기능이다.

>
먼저 변해야하는 것(Urgent Updates)
입력, 클릭 등과 같은 것(상태 변화)에 즉각적으로 반응하고 반영해야하는 것

>나중에 변해야하는 것(non-urgent updates || Transition updates)
상태 변화가 UI,화면 등에 즉각적으로 바뀌지 않아도 되는 것들



바로 바뀌지 않아도 될 상황이 무엇이 있을까를 생각해보자.

리액트 공식 홈페이지에서 알려주는 상황은 바로 검색과 자동완성이다.
타이핑이 될 때 마다 계속해서 자동완성 창이 바뀔 것이다.

> 아니 원래 바뀌자나 !

라고 할 수 있지만 지금 당장 구글창으로 달려가서 내가 쓸 수 있는 가장 빠른 속도로 타이핑을 해보자

![](https://images.velog.io/images/kbm940526/post/ad064040-d4d1-42d2-84fe-3955f6af28b0/%E1%84%87%E1%85%B3%E1%86%AF1.gif)

이제는 조금 감이 올 것이다. 
자동완성창이 한글자 한글자마다 바뀌는 것이 아닌 일정 시간이 지난 뒤에 바뀌는 것이다.

이렇게 Transition을 활용하면 우선 순위를 지정해 놓을 수 있다.

#### 사용법

```js
import {useTransition} from 'react';
.
.
.
const [ispending, startTransition] = useTransition()
// ispending
// startTransition
.
function handleTransition(){
	startTransition(()=>{
    	useState((prev)=>prev+1)
    })
}

```

여기서 ```isPending```이란 뭔가 싶을 것이다.

자 쉽게 말해서 startTransition이 작동 상태를 boolean값으로 나타내주는 것이다. 

이게 왜 필요할까?

만약 내가 엄청 성격이 진짜 말도안되게 급한 사람이라고 가정하자.
현재 검색창에 검색어를 치면 5초 뒤에 자동완성이 나오는데 5초가 걸린다.(똥망한 사용자 경험 ..ㅎ ) 근데 나는 성격이 너무너무 급해서 3초 안에 자동완성이 안나오면 렉걸렸다고 생각을하는 것이다. 이러한 경우 개발자 김아무개는 isPending을 사용해서 성격이 매우 급한 나에게 알려주는 것이다. 이건 렉이 아니고 처리 중이라고 ...



### Suspense

Suspens를 사용하면 컴포넌트가 아직 렌더되기에 준비되지 않은 상태라면 사용자에게 로딩 상태를 알려주는 기능을 한다.

쉽게 말해 우리가 로딩 상태를 알려주기 위해
```js
const [isLoading, setIsLoading]= React.useState(false)
useEffect(()=>{
	setIsLoading(true)
  	someThingToDo()
	setIsLoading(false)
},[])
return (
	...
  {isLoading && <Loading />}
  ...
)
```
이러한 로직을 짰을 것이다. 

하지만 이럴 필요 없이

#### 사용법

```js
return (
	...
  <Suspense fallback={<Loading/>} >
  	<Components />
  </Suspense>
  ...
)
```

이렇게 깔끔하게 끝이 난다.

### new API

간단하게 useTransition을 제외한 두 녀석만 적어봅니다.

#### useId
고유 ID를 만들어내는 Hook

```js
const id = useId()
// 고유 아이디 생성
```

단, CSS selector 및 QuerySelector 등에 사용 불가


#### useDeferredValue
컴포넌트에 데이터를 넘기는 것 자체를 지연시킴

```js
const defferredValue = useDeferredValue(value,{timeoustMs : 100000000000})

return(
	<Test value={defferredValue} />
)
```
Test 컴포넌트에 전달해주는 value값만 딜레이가 발생함.

>useTransition vs useDefferredValue
Transition는 우선 순위를 정해주는 것
defferredValue는 데이터 전달을 지연시키는 것

## 마무리

글을 작성하며 batching에 대해 감탄하게 되었다. 또한, 이젠 
isLoading, setIsLoading과 같은 이상한 로직을 짤 일도 줄어들 것이다. 
( Next...? )

주말에 언능 18버전을 통해 새로운 것을 간단하게 구현하여 기능을 확인해봐야겠다.
