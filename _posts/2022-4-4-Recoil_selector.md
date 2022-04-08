# React 상태관리

> - React는 왜 상태관리 라이브러리가 필요한가?
>   리액트는 단방향으로 상태를 전달해주기에 props drilling을 피하기 위해 필요
>
> 대표 EX
> **Redux, Recoi, mobX**

## Recoil

React를 위한 상태관리 라이브러리

> 가장 대중적으로 사용되는 Redux보다 쉽고 빠르게 사용할 수 있다고 생각한다.

### Atom

Atoms는 상태의 단위이며, 업데이트와 구독이 가능

> 상태 단위란 ?
> 쉽게 생각해서 value, state

atom이 업데이트되면 각각의 관련된 컴포넌트는 새로운 값을 반영하여 다시 렌더링

#### 사용법

```js
const fontSizeState = atom({
  key: "fontSizeState", // key value
  default: 14, //초기값
});

const [fontSize, setFontSize] = useRecoilState(fontSizeState);
```

### Selector

이 블로깅을하게 된 이유

상위의 atoms 또는 selectors가 업데이트되면 하위의 selector 함수도 다시 실행

쉽게 말해서 **atom의 값이 새롭게 변경되기 전 어떤 함수(selector)를 통해 가공시켜주는 역할**

파생 데이터를 계산하는 데 사용한다.

```js
const fontSizeLabelState = selector({
  key: "fontSizeLabelState",
  get: ({ get }) => {
    //get을 통해 atom값을 가지고 올 수 있다.
    const fontSize = get(fontSizeState);
    const unit = "px";
    return `${fontSize}${unit}`;
  },
});
```

위 코드를 설명하자면

get안에 들어있는 **fontSizeState Atom이 변경되면 fontSizeLabelState도 seletor이 적용**되어 변경된다.

[Selector 공식문서](https://recoiljs.org/ko/docs/basic-tutorial/selectors/)
[blog 참고](https://velog.io/@juno7803/Recoil-Recoil-200-%ED%99%9C%EC%9A%A9%ED%95%98%EA%B8%B0#-reactsuspense%EC%9D%98-%EC%A7%80%EC%9B%90-%EB%B9%84%EB%8F%99%EA%B8%B0-%EC%83%81%ED%83%9C-%EC%B2%98%EB%A6%AC)
