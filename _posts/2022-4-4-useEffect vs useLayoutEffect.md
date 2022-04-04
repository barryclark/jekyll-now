# useEffect vs useLayoutEffect
인터넷을 보던 중 useLayoutEffect에 대해 보게 되었고 useEffect와의 차이점에 대해 알아본 과정을 정리해보려한다.

## useEffect

useEffect에 전달된 함수는 **화면에 컴포넌트 렌더링이 완료된 후에 수행**
useEffect는 컴포넌트가 렌더된 후 실행되기도 하며, 특정값으 변경된 후에도 실행 가능

### 사용법
```js
React.useEffect(() => {
  // do someThing
  const subscription = props.source.subscribe();
  return () => {
    // Clean up the subscription
    subscription.unsubscribe();
  };
},[props.source]);
```

## useLayoutEffect

이 함수는 useEffect와 동일하다고 생각하면된다. 
하지만 확실한 차이점이 하나가 존재한다.

그것을 바로 

useLayoutEffect는 **모든 DOM이 변경 후에 동기적으로 발생**한다는 것

하지만 React 공식문서에는 

>팁
>
클래스 컴포넌트에서 코드를 변환하는 경우에 useLayoutEffect는 componentDidMount나 componentDidUpdate와 동일한 단계를 실행하게 된다는 것에 주의하기 바랍니다. 그렇기는 하지만, 먼저 useEffect를 사용해 보고 문제가 있다면 그다음으로 useLayoutEffect를 사용해 보기를 권합니다.
>
서버 렌더링을 사용하는 경우라면 자바스크립트가 모두 다운로드될 때까지는 useLayoutEffect와 useEffect 어느 것도 실행되지 않는다는 것을 명심해야 합니다. 이것이 서버에서 렌더링 되는 컴포넌트에서 useLayoutEffect가 사용되는 경우에 대해 React가 경고하는 이유입니다. 이를 수정하기 위해서는 (최초 렌더링 시에 필요하지 않다면) 로직을 useEffect로 이동한다거나 (useLayoutEffect가 수행될 때까지 HTML이 깨져 보이는 경우는) 클라이언트 렌더링이 완료될 때까지 컴포넌트 노출을 지연하도록 하세요.
>
서버에서 렌더링된 HTML에서 레이아웃 effect가 필요한 컴포넌트를 배제하고 싶다면, showChild && <Child />를 사용하여 조건적으로 렌더링 하고 useEffect(() => { setShowChild(true); }, [])를 사용하여 노출을 지연시키세요. 이런 방법으로 자바스크립트 코드가 주입되기 전에 깨져 보일 수 있는 UI는 표현되지 않게 됩니다.


라고 권고 중

### 사용법 

useEffect와 동일 


## 실험으로 확인하기

!codesandbox[ecstatic-benji-234mzd?fontsize=14&hidenavigation=1&theme=dark]

새로고침을 계속해서 눌러보면 

useLayoutEffect안 setState의 내용으로 바뀌지 않는다는 것을 알 수 있다.

정확히는 바뀌지 않는 것이 아닌 

DOM 변경 후 useLayoutEffect가 실행된 뒤 useEffect가 실행되어 값이 바뀌는 것 

그것을 증명해주는 것이 setState2는 상태가 잘 변경된다는 것이다.

### 차이

|제목|useEffect|useLayoutEffect|
|------|---|---|
|1|비동기적|동기적|
|2|렌더링=>화면 업데이트 => useEffect함수 실행|렌더링=> useLayoutEffect 함수 실행 => 화면 업데이트|
|3|대부분의 경우 사용 권장|DOM요소의 값이 필요할 때 |



