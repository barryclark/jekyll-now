---
layout: post
title: Jekyll blog
---

## Jekyll (지킬, 깃 블로그)

> 제일 중요하다고 생각하는 것은, VSC에서 우측 상단에 Preview 사용하기
> 일단 재미있어야 하기 때문에.

* [Jekyll Doc](https://jekyllrb-ko.github.io/docs/)

### 로컬에서 Jekyll 빌드하기

[Testing your GitHub Pages site locally with Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll) 

### include

[include](https://jekyllrb.com/docs/includes/)

include태그를 사용하면 _includes폴더 에 저장된 다른 파일의 콘텐츠를 포함할 수 있습니다 .

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

#### 마크다운으로 이미지 넣기

```markdown
![Image](/images/404.jpg)
```

<center><div markdown="1">

![Image](/images/404.jpg)

</div></center>

#### 구글 드라이브 이미지
[구글 드라이브로 이미지 호스팅하기](https://namhoon.kim/2020/07/02/topic/001/index.html)

공유링크를 이용하여 FileID를 구한 후 이미지 만을 공유합니다.

1. https://drive.google.com/file/d/`1r-lFsDNAjnoDgZHQHGhA5tr96CZ6_9sP`/view?usp=sharing
2. https://drive.google.com/uc?id=`1r-lFsDNAjnoDgZHQHGhA5tr96CZ6_9sP`

<center><div markdown="1">

![ExampleImage](https://drive.google.com/uc?id=1r-lFsDNAjnoDgZHQHGhA5tr96CZ6_9sP)

</div></center>

#### 파일 다운로드 추가

```
[MakeBaseColorMaterialFunction_Inst]({{ site.url }}/files/MakeBaseColorMaterialFunction_Inst.uasset)
```

[MakeBaseColorMaterialFunction_Inst]({{ site.url }}/files/MakeBaseColorMaterialFunction_Inst.uasset)

### mermaid

[mermaid](https://mermaid-js.github.io/mermaid/#/), [mermaid setting](https://frhyme.github.io/mermaid/Embedding_mermaid_in_github_page/)

다이어 그램과 차트를 그리는 용도입니다. `mermaid `는 html에서 인코딩 되므로, mermaid을 Jekyll에서 빌드될 때, 변환되도록 만들어야 합니다. `<div class="mermaid"> ... </div>`를 이용하여 mermaid가 html에서 만들어 지도록 합니다.

#### UML class diagram

[UML 클래스 다이어그램](https://sabarada.tistory.com/72)

클래스 다이어그램을 어떻게 만들어야 하는지, 참고하는 용도로 사용합니다.

### MathJaxx

[MathJax v3 in Jekyll](https://quuxplusone.github.io/blog/2020/08/19/mathjax-v3-in-jekyll/)

<!--
* [How to show math equations in general github's markdown(not github's blog)](https://stackoverflow.com/questions/11256433/how-to-show-math-equations-in-general-githubs-markdownnot-githubs-blog)를 보면 행렬 표현식이 제대로 표현되지 않는 문제가 있기 때문에, v3를 이용해야 합니다.
-->

### HTML

* [HTML Tutorial](https://www.w3schools.com/html/default.asp)
* [HTML Reference](https://www.w3schools.com/tags/default.asp)

#### django
HTML 은 기본적으로 정적인 언어입니다. 작성해놓고 나면, 동적으로 무언가를 변경하거나 수정할 수 없죠. 그런 HTML 의 한계를 극복하기 위해 사용하는 것이 django 의 템플릿 기능입니다.

* [Diango](https://docs.djangoproject.com/en/3.2/topics/templates/#the-django-template-language)

#### html에서 if문 사용하기

[Conditional logic](https://idratherbewriting.com/documentation-theme-jekyll/mydoc_conditional_logic.html)

#### 스크롤에 따른 목차를 띄우는 ScrollSpy 기능 구현하기

[스크롤에 따른 목차를 띄우는 ScrollSpy 기능 구현하기](https://velog.io/@outstandingboy/Github-%EB%B8%94%EB%A1%9C%EA%B7%B8-%ED%8F%AC%EC%8A%A4%ED%8A%B8%EC%97%90-%EC%8A%A4%ED%81%AC%EB%A1%A4%EC%97%90-%EB%94%B0%EB%A5%B8-%EB%AA%A9%EC%B0%A8Table-of-Contents-TOC%EB%A5%BC-%EB%9D%84%EC%9A%B0%EB%8A%94-ScrollSpy-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0)