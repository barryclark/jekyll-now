---
layout: post
title: condition에 따라 style에 변화주기
date: 2019-06-24
comments: true
categories: [Study, rnative]
tags: [Conditional Style]
excerpt: condition/state에 따라 간단하게 style에 변화를 줄 수 있는 방법!
---

excerpt: condition/state에 따라 간단하게 style에 변화를 줄 수 있는 방법!

바로 style을 배열로 주는 것이다. 공통된 style과, state에 따라 달라지는 style을 조건부로 주어 `isCompleted`라는 state가 변할 때 마다 다른 style 효과를 줄 수 있다.

```javascript
<View
  style={[
    styles.circle,
    isCompleted ? styles.completedCircle : styles.unCompletedCircle
  ]}
/>
```

<br>
**전체 컴포넌트 코드**

```react
export default class ToDo extends Component {
  state = {
    isCompleted: false
  };

  _toggleComplete = () => {
    this.setState(prevState => {
      return {
        isCompleted: !prevState.isCompleted
      };
    });
  };

  render() {
    const { isCompleted } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._toggleComplete}>
          <View
            style={[
              styles.circle,
              isCompleted ? styles.completedCircle : styles.unCompletedCircle
            ]}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#bbb",
    flexDirection: "row",
    alignItems: "center"
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    marginRight: 20
  },
  completedCircle: { borderColor: "#bbb" },
  unCompletedCircle: { borderColor: "#720D5D" }
});
```

---

<span class="reference">참고자료</span>

[노마드코더 Kawai To Do](https://youtu.be/eGHUDwSI82M)
