---
layout: post
title: 지킬 블로그
---

# Jekyll (지킬, 깃 블로그)

> 제일 중요하다고 생각하는 것은, VSC에서 우측 상단에 Preview를 띄우기.

* [Jekyll Doc](https://jekyllrb-ko.github.io/docs/)


## Markdown

* [기초 문법](https://www.markdownguide.org/basic-syntax/#code)
* [mermaid](https://mermaid-js.github.io/mermaid/#/) (다이어 그램을 그리는 용도)
* [math](https://velog.io/@d2h10s/LaTex-Markdown-%EC%88%98%EC%8B%9D-%EC%9E%91%EC%84%B1%EB%B2%95#%ED%96%89%EB%A0%AC-%ED%91%9C%EA%B8%B0%EB%B2%95) (수식을 그리는 용도)


<details><summary>코드 블럭이 더블 프레임으로 표시되는 경우</summary>
<div markdown="1">

<br>

**[Why do I get a double frame around markdown code block on Jekyll site?](https://stackoverflow.com/questions/55308142/why-do-i-get-a-double-frame-around-markdown-code-block-on-jekyll-site)**

In the _sass/_highlights.scss file you simply need to replace .highlight with pre.highlight. It appears that some styling can be applied twice if this is not specified. I also had a entry in pre.highlight{...} that I changed from overflow: scroll; to overflow: auto; in order to hide the scroll bars if they are not necessary.

BEFORE:
```
.highlight{
    ...
    overflow: scroll;
    ...
} 
```
AFTER:
```
pre.highlight{
    ...
    overflow: auto;
    ...
} 
```

</div></details>