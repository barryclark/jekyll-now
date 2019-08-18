---
layout: post
title: React Native에서 Lottie 사용하기
date: 2019-08-18
comments: true
categories: [Study, rnative]
tags: [React Native, Lottie, animation, ios]
excerpt: 모바일이나 웹페이지에 애니메이션을 구현하기 위해서 gif를 사용해 왔는데, gif는 용량이 무겁고, 해상도 대응이 어렵다는 단점이 있다. 이에, gif의 훌륭한 대체재로 'Lottie'라는 라이브러리가 주목받고 있다고 하여 React Native에서 사용해 보았다.
---

모바일이나 웹페이지에 애니메이션을 구현하기 위해서 gif를 사용해 왔는데, gif는 용량이 무겁고, 해상도 대응이 어렵다는 단점이 있다. 이에, gif의 훌륭한 대체재로 'Lottie'라는 라이브러리가 주목받고 있다고 하여 React Native에서 사용해 보았다.

React Native의 경우, React Native Community에서 [`LottieView`](https://github.com/react-native-community/lottie-react-native) API를 제공하고 있다.

### lottie-react-native 설치

**react-native 0.6 버전** 기준으로 `lottie-react-native`와 `lottie-ios@3.0.3` 패키지를 설치하고 `pod install`을 해준다.

```bash
yarn add lottie-react-native
yarn add lottie-ios@3.0.3

cd ios
pod install
```

하지만, 이렇게해도 영역만 잡힐 뿐 애니메이션 렌더링이 되지 않는 경우가 있는데, [stackoverflow](https://stackoverflow.com/questions/52536380/why-linker-link-static-libraries-with-errors-ios)에 해결방법이 자세히 나와있다!

프로젝트의 `.xcworkspace`를 열고 왼편의 네비게이터에 있는 프로젝트 네임에서 우클릭 > New File을 클릭하여 swift파일을 생성한다. 이 때, target으로 앱 이름이 선택되어 있어야 한다.

<img src="/images/xocode-newFile.png" alt="xocode-newFile" width="600em">

그리고, alert창이 뜨면, 'Create Bridging Header'를 클릭한다. 👍

### LottieView 컴포넌트 작성

이제, `.json` 형태의 애니메이션 파일을 불러와서 아래와 같이 간단한 코드로 애니메이션을 구현할 수 있으며, `style` props로 크기를 변형해 보면 다양한 크기로 구현해도 해상도가 깨지지 않는 것을 확인할 수 있다. 😎

```react
import React from 'react';
import LottieView from 'lottie-react-native';

export default class BasicExample extends React.Component {
  render() {
    return <LottieView source={require('./loading.json')} autoPlay loop />;
  }
}
```

<img src="/images/lottie-ex.gif" alt="lottie-ex" width="300em" style="border:1px solid #bcbcbc">
