---
layout: post
title: [DEV]jekyll
category: blog
author: junseo.park
subtitle: jekyll 개념과 구성요소
---

## JEKYLL
개인, 조직 등의 사이트를 위한 간단한 블로그 인식 정적 사이트 생성기
Ruby로 작성했으며, Open Source MIT License에 따라 배포된다.

<hr>

Github의 Repository와 각 Repo에 흩어져있는 Issue들을 정리하면서<br>
이참에 블로그를 하나 만들어 통합적으로 정리하면 좋겠다라는 생각에<br>
평소 부러워하기만 하던 Github.io 블로그 페이지를 생성하게 되었다.
<br><br>
MarkDown으로만 작성하려다 보니 뭔가 밋밋하고 멋이 없어서<br>
구글에 Github.io를 검색하면 같이 딸려나오는 'Jekyll'을 더하기로 했다.<br>(그런 짓은 하지 말아야 했는데 난 그 사실을 몰랐어...)
<br><br>
직접 Standalone을 설치해서 프로젝트를 생성하려다가... 너무 아닌거같아 버렸다.

(각설하고)

Jekyll 프로젝트를 Fork해오면 기본적으로 주어지는 구성이 있다.

- _inclues
- _layouts
- _posts
- _sass
- images
- index.html
- style.scss

**_include**
* html에서 공통적으로 사용되는 module을 모아두는 공간

**_layouts**
* 말 그대로 layout을 설정할 수 있는 html 파일을 모아두는 공간
* 필자는 post와 portfolio post를 구분하는 용도로 사용했다.
* page.html은 about같이 완전히 정적으로 하나의 페이지만을 보여주고자 할 때 유용
* default.html이 블로그 구성 layout의 가장 토대가 되는 html

**_posts**
* 블로그에 posting하는 모든 글들을 포함하는 공간
* jekyll의 전역변수인 site의 site.posts가 이 공간을 가르킨다.

**_sass**
* scss 모듈 설정하는 공간. 디자인에 관심이 없어서 여긴 안건들인다.

**images**
* 블로그에 필요한 이미지를 저장하는 공간

**index.html**
* post들을 나열식으로 공개하는 html
* 현 블로그에는 blog / portfolio로 분할하였다.
****

jekyll html 파일 중 하나이다.
```
---
# front matter라 하여 각 파일의 metadata를 지정할 수 있다.
layout: default # layout/default.html을 가져다 쓰겠다는 의미
permalink: /portfolio # navigate로 html 이동하고자 할 때 지정하면 된다.
--- 

<div class="posts">
  {% for post in site.posts %}
    {% if post.category == "portfolio" %}
    <!-- post의 category 항목이 portfolio인 post만 뽑아서 나열 -->
      <article class="post">
        <h1><a href="{{ site.baseurl }}{{ post.url }}" style="color:#32859e;">{{ post.title }}</a></h1>
        {{ post.subtitle }}
      </article>
    {% endif %}
  {% endfor %}
</div>
```

navigate 기능을 쓰고자 할 때 post에 metadata를 추가해서
해당 post를 나열하는 html에 조건문을 추가하여 선택하는 방식이
가장 무난할 것이다.
(이걸 파악하느라 4시간을 할애....)