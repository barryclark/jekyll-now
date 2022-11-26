---
layout: post
title: 지킬 블로그
---

- [ ] 다른 문서에서 해당 문서의 참조를, 링크가 아닌, 태그에 따라 다르게 설명하도록 하기
  - [ ] 마크다운에 HTML if문 적용하기
  - [ ] 지킬 조각파일, 그리고 include에 태그 붙이기
  - [ ] 태그별 LOD에 따라, 설명하는 깊이를 다르게 표시하기

# Jekyll (지킬, 깃 블로그)

> 제일 중요하다고 생각하는 것은, VSC에서 우측 상단에 Preview 사용하기
> 일단 재미있어야 하기 때문에.

* [Jekyll Doc](https://jekyllrb-ko.github.io/docs/)

<details><summary>로컬에서 Jekyll 빌드하기</summary>
<div markdown="1">

[Testing your GitHub Pages site locally with Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll) 

</div></details>

## Markdown

[기초 문법](https://www.markdownguide.org/basic-syntax/#code)
[math](https://katex.org/docs/supported.html) (수식을 그리는 용도)

<details><summary>코드 블럭이 더블 프레임으로 표시되는 경우</summary>
<div markdown="1">

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
<div markdown="1">

```
![Image](/images/404.jpg)
```

![Image](/images/404.jpg)

* !표 뒤에 띄어씌기 없습니다.

다음은 작동하지 않습니다.

```
![Image](../images/404.jpg)
```

</div></details>

<details><summary>파일 다운로드 추가</summary>
<div markdown="1">

```
[MakeBaseColorMaterialFunction_Inst]({{ site.url }}/files/MakeBaseColorMaterialFunction_Inst.uasset)
```

[MakeBaseColorMaterialFunction_Inst]({{ site.url }}/files/MakeBaseColorMaterialFunction_Inst.uasset)

</div></details>

<details><summary>mermaid</summary>
<div markdown="1">

[mermaid](https://mermaid-js.github.io/mermaid/#/) 

다이어 그램과 차트를 그리는 용도입니다.

` ```mermaid `는 html에서 인코딩 되므로, mermaid을 Jekyll에서 빌드될 때, 변환되도록 만들어야 합니다. `<div class="mermaid"> ... </div>`를 이용하여 mermaid가 html에서 만들어 지도록 합니다.

[UML 클래스 다이어그램](https://sabarada.tistory.com/72)

클래스 다이어그램을 어떻게 만들어야 하는지, 참고하는 용도로 사용합니다.

</div>

<details><summary>MathJaxx</summary>
<div>

[MathJax v3 in Jekyll](https://quuxplusone.github.io/blog/2020/08/19/mathjax-v3-in-jekyll/)

행렬 표현식이 제대로 표현되지 않는 문제가 있기 때문에, v3를 이용해야 합니다.

**아래는 오래된 내용입니다.**

[How to show math equations in general github's markdown(not github's blog)](https://stackoverflow.com/questions/11256433/how-to-show-math-equations-in-general-githubs-markdownnot-githubs-blog)

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