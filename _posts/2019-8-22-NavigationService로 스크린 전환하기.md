---
layout: post
title: NavigationService로 스크린 전환하기
date: 2019-08-22
comments: true
categories: [Study, rnative]
tags: [React Native, React Navigation]
excerpt: React Navigation에서 screen에서 screen 사이를 오가는건 간단하지만 리스트나 컴포넌트에서 바로 스크린으로 넘어가긴 어렵다. 이때 사용할 수 있는 것이 NavigationService이다.
---

React Navigation에서 screen에서 screen 사이를 오가는건 간단하지만 리스트나 컴포넌트에서 바로 스크린으로 넘어가긴 어렵다. 이때 사용할 수 있는 것이 `NavigationService`이다. Navigation으로 연결되어 있지 않더라도 앱의 최상단에서 원하는 스크린으로 이동할 수 있도록 해준다.

### NavigationService 세팅

**NavigationService.js**

다른 곳에서 `NavigationService.navigate(routeName, params)`로 페이지 이동을 할 수 있도록 함수를 작성해 준다.

```react
import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
}

export default {
  navigate,
  setTopLevelNavigator
};
```

<br>
**App.js**

`NavigationService`를 `TopLevelNavigoator`로 설정해 준다.

```react
import NavigationService from './NavigationService';

const App = () => {
  return (
    <View style={styles.container}>
      <AppNavigator
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    </View>
  );
};
```

### NavigationService 활용

이제 실제 필요한 곳에서 `NavigationService`를 import 해와서 활용하면 끝!

```react
// any js module
import NavigationService from 'path-to-NavigationService.js';

// ...

NavigationService.navigate('ChatScreen', { userName: 'Lucy' });
```
