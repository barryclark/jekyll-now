---
layout: post
title: React Navigation 커스텀 헤더의 back button
date: 2019-08-22
comments: true
categories: [Study, rnative]
tags: [React Native, React Navigation]
excerpt: React Navigation의 기본 헤더가 지금 개발하고 있는 앱의 느낌과 맞지 않아 커스텀 헤더를 구현해 보았다. Stack Navigation에서 헤더의 가장 중요한 역할 중 하나가 back button인데, 커스텀 헤더에선 back button의 네비에이션을 어떻게 주어야 할까?
---

React Navigation의 기본 헤더가 지금 개발하고 있는 앱의 느낌과 맞지 않아 커스텀 헤더를 구현해 보았다. Stack Navigation에서 헤더의 가장 중요한 역할 중 하나가 back button인데, 커스텀 헤더에선 back button의 네비에이션을 어떻게 주어야 할까?

<br>
`this.props.navigation`을 콘솔에 찍어보면 익숙한 `navigate()`, `getParam()` 뿐만 아니라 `goBack()` 함수가 존재한다.

또한, `params`, `routeName` 그리고 `key`를 key로 가지는 `state` 객체가 존재하고 `Navigation.js`에 정의한 `params`와 `routeName`이 여기에 담겨있고, 숫자와 문자로 이루어진 `key`가 부여되어 있다.

이 `key`가 이 스크린을 찾아 돌아올 수 있는 열쇠가 된다.

<br>
A 페이지에서 B 페이지로 넘어갈 때, navigation params로 APage의 `this.props.navigation.state.key`를 저장해준다.

**APage.js**

```react
render() {
    const { state, navigate } = this.props.navigation;
    return (
        <View>
            <Button title="Go to BPage" onPress={ () => {
                navigate('BPage', { go_back_key: state.key });
            }} />
        </View>
    );
}
```

<br>
BPage에서 back button을 눌렀을 때, `this.props.navigation.goBack` 함수의 인자로 가고자 하는 페이지의 `key`를 넣어주면 된다.

**BPage.js**

```react
render() {
    const { state, goBack } = this.props.navigation;
    const params = state.params || {};
    return (
        <View>
            <Button title="Back to APage" onPress={ () => {
                goBack(params.go_back_key);
            }} />
        </View>
    );
}
```
