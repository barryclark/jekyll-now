---
layout: post
title: 지킬 블로그
---

- [ ] 다른 문서에서 해당 문서의 참조를, 링크가 아닌, 태그에 따라 다르게 설명하도록 하기
  - [ ] 마크다운에 HTML if문 적용하기
  - [ ] 지킬 조각파일, 그리고 include에 태그 붙이기
  - [ ] 태그별 LOD에 따라, 설명하는 깊이를 다르게 표시하기
- [ ] 블로그, 꾸미고 싶어지네...

# Jekyll (지킬, 깃 블로그)

> 제일 중요하다고 생각하는 것은, VSC에서 우측 상단에 Preview 사용하기
> 일단 재미있어야 하기 때문에.

* [Jekyll Doc](https://jekyllrb-ko.github.io/docs/)


## Markdown

* [기초 문법](https://www.markdownguide.org/basic-syntax/#code)
* [mermaid](https://mermaid-js.github.io/mermaid/#/) (다이어 그램을 그리는 용도)
* [math](https://velog.io/@d2h10s/LaTex-Markdown-%EC%88%98%EC%8B%9D-%EC%9E%91%EC%84%B1%EB%B2%95#%ED%96%89%EB%A0%AC-%ED%91%9C%EA%B8%B0%EB%B2%95) (수식을 그리는 용도)

<details><summary>코드 블럭이 더블 프레임으로 표시되는 경우</summary>
<div markdown="1">
<br>

**[Why do I get a double frame around markdown code block on Jekyll site?](https://stackoverflow.com/questions/55308142/why-do-i-get-a-double-frame-around-markdown-code-block-on-jekyll-site)**

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

<details><summary>마크다운으로 이미지 넣기</summary>
<div>
<br>

```
![Image](/images/404.jpg)
```

* !표 뒤에 띄어씌기 없습니다.

</div></details>

<details><summary>마크다운으로 이미지 넣기, 상대경로는 안되나?</summary>
<div>
<br>

상대경로도 작동합니다. 다만, 폴더를 옮기면 링크가 깨지므로(고난이 예상되므로) 위의 방식을 이용하도록 합니다.

```
![Image](../images/404.jpg)
```

</div></details>

<details><summary>수식 표현하기</summary>
<div>
<br>

[How to show math equations in general github's markdown(not github's blog)](https://stackoverflow.com/questions/11256433/how-to-show-math-equations-in-general-githubs-markdownnot-githubs-blog)에서 설명한 내용은 하나같이 불편합니다... (10년전 내용이기 때문에)

아래로 내려가다 보면, \$를 이용해서 수식을 표현할 수 있다고 합니다.
```
It is officially supported since May 2022

Render mathematical expressions in Markdown
You can now use LaTeX style syntax to render math expressions within Markdown inline (using $ delimiters) or in blocks (using $$ delimiters).
```

</div></details>

### HTML
* [HTML Tutorial](https://www.w3schools.com/html/default.asp)
* [HTML Reference](https://www.w3schools.com/tags/default.asp)

#### django
HTML 은 기본적으로 정적인 언어입니다. 작성해놓고 나면, 동적으로 무언가를 변경하거나 수정할 수 없죠. 그런 HTML 의 한계를 극복하기 위해 사용하는 것이 django 의 템플릿 기능입니다.

* [Diango](https://docs.djangoproject.com/en/3.2/topics/templates/#the-django-template-language)

<details><summary>html에서 if문 사용하기</summary>
</div markdown="1">

[Conditional logic](https://idratherbewriting.com/documentation-theme-jekyll/mydoc_conditional_logic.html)

</div></details>