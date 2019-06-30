---
layout: post
title: ESLint와 Prettier 설정하기(VSCode)
date: 2019-06-30
comments: true
categories: [Study, react]
tags: [React, ESLint, Prettier]
excerpt: 개발자 경험 향상에 유용한 두가지 tool, ESLint와 Prettier. ESLint는 JavaScript 코딩 컨벤션과 에러 체크를 도와주며, Prettier는 말 그대로 코드를 더 이쁘게 만들어 주는 도구로 사전에 설정한 규칙에 따라 코드를 포맷해준다.
---

개발자 경험 향상에 유용한 두가지 tool, ESLint와 Prettier. ESLint는 JavaScript 코딩 컨벤션과 에러 체크를 도와주며, Prettier는 말 그대로 코드를 더 이쁘게 만들어 주는 도구로 사전에 설정한 규칙에 따라 코드를 포맷해준다.

VSCode Extensions에서 ESLint와 Prettier를 설치하면 기본적으로 설정된 문법 옵션으로 사용할 수 있지만 추가적인 config를 설정할 수 있다.

[npm trends 통계](https://www.npmtrends.com/eslint-config-airbnb-vs-eslint-config-standard)에 따르면, 많은 개발자들이 airbnb에서 정의한 규칙을 사용하므로, `eslint-config-airbnb`로 설정해 보겠다.

![Eslint Config 통계](/images/eslint-config-stat.png "Eslint Config 통계")

### VSCode Extensions에서 ESLint와 Prettier 설치하기

아래와 같이 VSCode Extensions에서 ESLint와 Prettier를 검색하여 설치하고,
**enable**을 꼭 설정해 준다.

ESLint
![Eslint 설치](/images/eslint-install.png "Eslint 설치")

<br>
Prettier
![Prettier 설치](/images/prettier-install.png "Prettier 설치")

### eslint-config-airbnb 설치 및 적용하기

먼저, 사전에 설치해야 하는 패키지 정보를 확인한다.

```bash
$ npm info "eslint-config-airbnb@latest" peerDependencies
{ eslint: '^4.19.1 || ^5.3.0',
  'eslint-plugin-import': '^2.14.0',
  'eslint-plugin-jsx-a11y': '^6.1.1',
  'eslint-plugin-react': '^7.11.0' }
```

<br>
CRA를 통해 앱을 생성했다면 위의 패키지는 모두 설치되어 있어 설치가 필요하지 않다.
관련 패키지를 한꺼번에 설치하는 명령어는 아래와 같다.

```bash
$ npx install-peerdeps --dev eslint-config-airbnb
```

<br>
이제 `eslint-config-airbnb`를 설치한다.

```bash
$ npx install-peerdeps --dev eslint-config-airbnb
```

<br>

설치가 완료되면, package.json파일의 `eslintConfig` 부분에 "airbnb"를 추가한다.

```javascript
  "eslintConfig": {
    "extends": [ "react-app" , "airbnb" ]
  }
```

<br>

여기까지 하고 App.js파일을 열어보면 airbnb rule이 적용되어 에러파티가... 😂

![Eslint 에러](/images/eslint-error.png "Eslint 에러")

<br>
위에서 뜬 오류는 아래 두 가지인데, 첫 번째는 사용하지 않을 것이므로 ESLint 설정으로 끌 수 있고,
두 번째는 Prettier 설정으로 자동으로 수정할 수 있다.

1. JSX 코드는 .jsx 확장자로 사용
2. 문자열은 single quote로 사용

### ESLint rule 수정하기

JSX 코드는 .jsx 확장자로 사용해야 한다는 에러코드 뒷부분에 보면 rule 이름이 표시되어 있다.
package.json파일의 `eslintConfig` 부분에서 이것을 사용하지 않겠다는 rule을 추가하면 해결된다.
`0`은 사용하지 않겠다는 것이고, `1`은 사용하겠다는 것이니, `"react/jsx-filename-extension": 0`으로 설정한다.

```javascript
  "eslintConfig": {
    "extends": [
      "react-app",
      "airbnb"
    ],
    "rules": {
      "react/jsx-filename-extension": 0
    }
  }
```

<br>

추가적으로, App.test.js 파일을 저장해 보면, 아래와 같은 오류가 발생하는데,

![Eslint env 에러](/images/env-error.png "Eslint env 에러")

<br>
`env`에 `browser`와 `jest`를 추가해주면 된다.

```javascript
  "eslintConfig": {
    "extends": [
      "react-app",
      "airbnb"
    ],
    "rules": {
      "react/jsx-filename-extension": 0
    },
    "env": {
      "jest": true,
      "browser": true
    }
  }
```

### Prettier 설정하기

프로젝트의 루트 디렉토리에 `.prettierrc` 파일을 만들고, 사용하고자하는 옵션을 추가한다.

```javascript
 {
  "singleQuote": true, //문자열은 single quote 사용
  "semi": true, //코드 뒤에 세미콜론(;) 사용
  "useTabs": false, //tap키 사용하지 않음
  "tabWidth": 2, //들여쓰기 2칸 사용
  "printWidth": 80 //한 줄은 80칸이 넘지 않도록 함
}
```

<br>
이제 다시 App.js 파일로 돌아가 저장하면 문자열의 double quote가 자동으로 single quote로 바뀌고,
에러 메시지도 사라짐을 확인할 수 있다.

### eslint-config-prettier 적용하기

[eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)는 prettier 옵션과 중복되어 필요하지 않은 eslint 규칙을 비활성화 한다. 이 패키지를 사용함으로써 style적인 부분은 prettier가 담당하고, eslint는 문법적인 부분을 담당하여 효율적으로 두가지 툴을 사용할 수 있다.

사용을 위해서는 패키지를 설치하고,

```bash
$ yarn add eslint-config-prettier
```

<br>
package.json 파일에 적용한다.
```javascript
  "eslintConfig": {
    "extends": [
      "airbnb",
      "prettier"
    ],
    "rules": {
      "react/jsx-filename-extension": 0
    },
    "env": {
      "jest": true,
      "browser": true
    }
  }
```
<br>
 
이제 깔끔한 코드 작성할 준비 완료 ! 😎

<br>
