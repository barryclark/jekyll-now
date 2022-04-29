---
layout: post
title: code block
---

# 코드 블럭 달기

[GitHub Docs - Creating and highlighting code blocks](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-and-highlighting-code-blocks)

코드블럭은 다음과 같이 달 수 있다고 합니다.
```

```
코드
```

```

# [코드 블럭이 더블 프레임으로 표시되는 경우](https://stackoverflow.com/questions/55308142/why-do-i-get-a-double-frame-around-markdown-code-block-on-jekyll-site)

stackoverflow의 해결방법은 _sass/_higlights.scss파일에서 .highlight를 pre.highlight로 대체하면 된다고 합니다.

이것을 지정하지 않으면 일부 스타일링이 두 번 적용될 수 있다고 합니다.