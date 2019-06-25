---
layout: post
title: Platform에 따른 Style 적용하기
date: 2019-06-24
comments: true
categories: [Study, rnative]
tags: [React Native, Platform, Style]
excerpt: React Native의 가장 큰 장점은 ios와 android를 동시에 개발 할 수 있다는 것이다. 하지만 각 운영체제별로 다르게 설정해줘야 하는 기능이 있다. 운영체제에 따른 Style을 다르게 적용하려면 어떻게 해야할까?
---

React Native의 가장 큰 장점은 ios와 android를 동시에 개발 할 수 있다는 것이다. 하지만 각 운영체제별로 다르게 설정해줘야 하는 기능이 있다. 운영체제에 따른 Style을 다르게 적용하려면 어떻게 해야할까?

## Platform.OS

실행되는 운영체제에 따라 `Platform.OS` 값이 `android`와 `ios`로 결정된다. 이를 이용하여 3항 연산자로 운영체제 별 다른 값을 줄 수 있다.
동일한 background color를 가진 screen에 아래 코드를 추가하여 안드로이드 Status Bar에만 색상을 부여했다.

```react
<StatusBar
  backgroundColor={Platform.OS === "android" ? "#4E0D3A" : null}
  barStyle="light-content"
/>
```

![React Native link](/images/ex_platform.os.png "React Native link")

## Platform.select

`Platform.select` 메소드도 쓸 수 있는데, 실행되는 운영체제에 따라 `Platform.OS` 값을 key로 인식하여 구현된다.
아래 예제에서 android와 ios에서 shadow 값을 주는 방법이 다르기 때문에 `Platform.select` 메소드를 사용했다.

```react
...
<View style={styles.card}>
  <TextInput style={styles.input} placeholder="New To Do" />
</View>

...
const styles = StyleSheet.create({
...
  card: {
    flex: 1,
    backgroundColor: "white",
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 3
      }
    })
  }
});

```

<br>

---

<span class="reference">참고자료</span>

[React Native 공식문서](https://facebook.github.io/react-native/docs/platform-specific-code#docsNav)
