---
layout: post
title: Hello world!
images:

  - url: /images/jekyll-logo.png
    alt: Jekyll-logo
    title: Jekyll-logo
  - url: /images/jekyll_github.png
    alt: jekyll_github
    title: jekyll_github
---
Привет, меня зовут Дмитрий мне 29 лет и я изучаю веб разработку. В частности HTML, CSS, JS, GIT.

Этот сайт построен на jekyll и размещен на GithubPages. При подготовке я использовал отличную статью ["Barry Clark. Build A Blog With Jekyll And GitHub Pages"](https://www.smashingmagazine.com/2014/08/build-blog-jekyll-github-pages/ "Barry Clark. Build A Blog With Jekyll And GitHub Pages") а также github репозиторий [jekyll-now]( https://github.com/barryclark/jekyll-now). 

Здесь периодически будут появляться мои проекты, а также статьи, выдержки из книг, переводы статей разработчиков. Всем кому это интересно так же как и мне добро пожаловать)).

{% assign image = page.images[1] %} 
{% include image.html image=image %}


