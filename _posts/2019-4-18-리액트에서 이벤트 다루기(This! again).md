---
layout: post
title: 리액트에서 이벤트 다루기(This! again)
date: 2019-04-18
comments: true
categories: [Study, react]
tags: [React, Props, Arrow function]
excerpt: 단방향 데이터 플로우(one-way data flow)는 리액트의 큰 특징 중 하나이다. 위의 그림처럼 상위 컴포넌트는 하위 컴포넌트에게 props의 형태로 data를 전달할 수 있으나, 하위 컴포넌트는 받은 props를 변경할 수도 없을 뿐더러, 상위 컴포넌트로 전달할 수도 없다. 그렇다면, 하위 컴포넌트에서의 변화로 인해 상위 컴포넌트가 변화해야하는 경우엔 어떻게 해야할까?
---

![one-way data flow](https://cdn-images-1.medium.com/max/1600/1*hVg7IH1gwCz08RR4ikWAXA.png "one-way data flow")

**단방향 데이터 플로우(one-way data flow)**는 리액트의 큰 특징 중 하나이다. 위의 그림처럼 상위 컴포넌트는 하위 컴포넌트에게 props의 형태로 data를 전달할 수 있으나, **하위 컴포넌트는 받은 props를 변경할 수도 없을 뿐더러, 상위 컴포넌트로 전달할 수도 없다.** 그렇다면, 하위 컴포넌트에서의 변화로 인해 상위 컴포넌트가 변화해야하는 경우엔 어떻게 해야할까? 이 경우에는 상위 컴포넌트의 state를 변경하는 함수를 정의하고, 이것을 props 형태로 하위 컴포넌트에 전달하면 된다. 이 때, 부모의 state를 변경하는 함수를 setState 함수로 정의해야 한다는 점을 잊지 말자.

현재 Quote 저장하는 앱을 만들어보고 있는데, InputQuote component에서 입력값을 받아, save 버튼을 클릭하면 App component의 데이터에 저장되고, 저장된 값을 QuoteList component에표시되게 하도록 하고싶다.

![QuoteList data flow](https://cdn-images-1.medium.com/max/1600/1*QmLZc6eRFEqjNLG87o-V-Q.png "QuoteList data flow")

먼저, 변경되는 값인 data를 App component의 state로 정의하고, App component 내에서 값을 저장해주는 함수를 만든다.

```react
class App extends React.Component{
    constructor(){
        super()
        this.state={
            savedData: []
        }
    }
    newQuoteSetMaker = (quote, speaker) => {
        let newObj = {};
        newObj.quote1 = quote;
        newObj.speaker1 = speaker;
        return newObj
    }
    SavedData(newQuote, newSpeaker){
        let newQuoteSet = this.newQuoteSetMaker(newQuote, newSpeaker);
        let temp = this.state.savedData.concat([newQuoteSet]);
        this.setState({
            savedData:temp
        })
    }
}
```

그리고 InputBox component에 `props`로 함수를 전달한다. App component의 `render()` 내부에 아래의 코드를 작성했다. 이걸로 끝일까?

```react
<InputBox dataSave={this.SaveData}/>
```

<br>
That’s nono! 그렇지 않다. 이건 또 다시 **This**의 문제!

`props` 형태로 InputBox component에 `SaveData()` 를 전달해 줬기 때문에, `console.log`를 확인해보면, 이 때 This는 InputBox component에 전달해 준 props가 된다. 따라서, 아래와 같이 `SaveData()`의 `This`를 **바꾸려고 하는 state를 가진 컴포넌트로 bind 해줘야 한다.**

```react
<InputBox dataSave={this.SaveData.bind(this)}/>
```

<br>

`.bind(this)`를 쓰지 않고 바인딩 해주는 또 다른 방법이 있는데, 바로 **Arrow function**을 사용하는 것이다. Arrow function은 실행 컨텍스트를 형성하지 않으며, function을 감싸고 있는 컴포넌트로 this로 계속 bind 되는 특성이 있다.

따라서, `SaveData`를 아래와 같이 Arrow function으로 작성할 수도 있다.

```react
SaveData = (newQuote, newSpeaker) => {
    let newQuoteSet = this.newQuoteSetMaker(newQuote, newSpeaker)
    let temp = this.state.savedData.concat([newQuoteSet])
    this.setState({
        savedData: temp
    })
}
```
