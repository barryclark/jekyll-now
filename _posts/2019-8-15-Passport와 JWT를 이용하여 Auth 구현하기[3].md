---
layout: post
title: Passport와 JWT를 이용하여 Auth 구현하기[3]
date: 2019-08-15
comments: true
categories: [Study, rnative]
tags: [React Native, WebView, ios]
excerpt: 앞선 포스팅을 통해 소셜로그인을 위한 서버쪽 로직은 완성되었다. 이제 클라이언트 쪽(React Native)은 어떻게 구현하는지 알아보자.
---

앞선 포스팅을 통해 소셜로그인을 위한 서버쪽 로직은 완성되었다. 이제 클라이언트 쪽(React Native)은 어떻게 구현하는지 알아보자. **ios 위주로만 작성하였다.**

다른 API와 같이 `axios`를 썼다가 시간만 엄청 날렸다..😭 결론적으로 소셜로그인에서는 `axios`로 서버에 요청을 보내는 것이 아니라, React Native에서 웹페이지를 띄워주는 `WebView`의 연결 uri로 `http://localhost:3000/auth/facebook`를 설정해주면 된다.

## 소셜로그인

### SignUpScreen.js

먼저, SignUpScreen 컴포넌트를 작성하는데, 소셜로그인 연결 버튼과, `WebView`를 띄워줄 `Modal`을 만든다. 이 컴포넌트 내에서 바로 `WebView`를 사용할 수도 있다.

```react
//SignUpScreen.js
class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socialModalVisible: false,
      source: undefined
    };
  }

  signupWithSocial = async social => {
    this.setState({
      socialModalVisible: !this.state.socialModalVisible,
      source: `http://localhost:3000/auth/${social}`,
    });
  };

  closeSocialModal = () => {
    this.setState({
      socialModalVisible: !this.state.socialModalVisible
    });
  };

  render() {
        const { source, socialModalVisible } = this.state;
        return (
          <View>
            {source !== undefined ? (
              <SocialWebviewModal
                visible={socialModalVisible}
                source={source}
                closeSocialModal={this.closeSocialModal}
              />
            ) : null}
            <TouchableOpacity
              onPress={() => this.signupWithSocial('facebook')}
            >
              <Text>Sign up with Facebook<Text/>
            </TouchableOpacity>
          </View>
        )
  }
}
```

### SocialWebviewModal.js

이제 `WebView`가 렌더 될 `Modal`을 작성해 준다. [`WebView`](https://github.com/react-native-community/react-native-webview/blob/master/docs/Reference.md)는 uri이나 html로 웹페이지를 띄우는데, `{%raw%}source={{ uri: STRING }}{%endraw%}` 혹은 `{%raw%}source={{ html: STRING }}{%endraw%}`를 props로 가져야 한다.

```react
//SocialWebviewModal.js
const SocialWebviewModal = props => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      style={styles.container}
    >
      <SocialWebview
        {%raw%}source={{ uri: props.source }}{%endraw%}
        closeSocialModal={props.closeSocialModal}
      />
    </Modal>
  );
};
export default SocialWebviewModal;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
```

### SocialWebview.js

React Native의 `WebView`는 Deprecated 되었기 때문에, [React Native Community의 `WebView`](https://github.com/react-native-community/react-native-webview/blob/master/docs/Reference.md#source)를 사용해야 한다.

ios의 경우 WKWebView와 UIWebView가 있는데, UIWebView 또한 Deprecated 되었기 때문에 WKWebView를 사용해야 하며, 이때, 웹뷰의 셋팅인 `UserAgent`를 입력해 주어야 한다.

```react
import { WebView } from 'react-native-webview';

let userAgent =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1';

const SocialWebview = props => {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={ref => (this.webview = ref)}
        source={props.source}
        userAgent={userAgent}
        useWebKit={true}
        javaScriptEnabled={true}
      />
    </SafeAreaView>
  );
};
export default SocialWebview;
});
```

여기까지 하고나면 Facebook을 통해 로그인을 할 수 있게 되고, 로그인이 완료되면 로그인 결과({ userToken: STRING, success: BOOLEAN })가 Modal 창에 그대로 뜬다. 우리가 원하는 것은 로그인이 되면 모달창이 닫히고, 로그인 결과가 성공이면 userToken을 `asyncStorage`에 저장하는 것이다.

`WebView`의 `injectedJavaScript`와 `onMessage` props로 WebView의 콘텐츠와 앱이 통신할 수 있다.
`injectedJavaScript`는 `WebView`내에 콘텐츠가 로딩되고 난 후 그 웹페이지에 자바스크립트 동작을 추가할 수 있는데, 로그인 요청에 대한 response는 html의 `<pre>`라는 태그로 감싸져 있다. 웹페이지 돔에 접근하여 response를 `window.ReactNativeWebView.postMessage()`를 통해 `WebView`에 전달하고, `WebView`는 `onMessage`로 내용을 받아 후처리를 하면 된다.

```react
  const INJECTED_JAVASCRIPT =
    '(function() {if(window.document.getElementsByTagName("pre").length>0){window.ReactNativeWebView.postMessage((window.document.getElementsByTagName("pre")[0].innerHTML));}})();';
  const _handleMessage = async event => {
    console.log(JSON.parse(event.nativeEvent.data));
    let result = JSON.parse(event.nativeEvent.data);
    let success = result.success;
    if (success) {
      let userToken = result.userToken;
      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch (e) {
        console.log(e);
      }
    }
    props.closeSocialModal();
  };
```

작성된 함수를 `injectedJavaScript`와 `onMessage` props로 정의하면 끝!

```react
      <WebView
        ref={ref => (this.webview = ref)}
        source={props.source}
        style={styles.webviewStyle}
        userAgent={userAgent}
        useWebKit={true}
        javaScriptEnabled={true}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        onMessage={_handleMessage}
      />
```

<br>
<span class="reference">관련 post</span>

- [Passport와 JWT를 이용하여 Auth 구현하기[1]](/study/nodejs/Passport와-JWT를-이용하여-Auth-구현하기-1/)
- [Passport와 JWT를 이용하여 Auth 구현하기[2]](/study/nodejs/Passport와-JWT를-이용하여-Auth-구현하기-2/)
- [Passport와 JWT를 이용하여 Auth 구현하기[4]](/study/rnative/Passport와-JWT를-이용하여-Auth-구현하기-4/)
