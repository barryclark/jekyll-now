---
layout: post
title: Jekyll Now 댓글 기능 추가하기(Dispus)
date: 2019-06-22
comments: true
categories: [Project, blogwithjekyll]
tags: [Jekyll, Comments]
excerpt: 점점 블로그의 모습을 갖추고 있는 것 같다. 이쯤에서 필요한 것이 댓글기능 아닐까? 내가 사용한 Jekyll Now는 이미 Front Matter과 /_includes/disqus.html 파일이 준비되어 있기 때문에 Disqus를 이용한 댓글기능을 추가하는것은 아주 간단하다.
---

점점 블로그의 모습을 갖추고 있는 것 같다. 이쯤에서 필요한 것이 댓글기능 아닐까? 내가 사용한 Jekyll Now는 이미 Front Matter과 /\_includes/disqus.html 파일이 준비되어 있기 때문에 Disqus를 이용한 댓글기능을 추가하는것은 아주 간단하다.

### 1. Disqus 가입 및 사이트 생성

먼저, [Disqus](https://disqus.com/) 서비스에 가입한다.

가입하고 나면, 아래와 같은 화면이 뜨는데, 'I want to install Disqus on my site'를 선택하고 사이트 정보를 입력하여 disqus 사이트를 생성한다.

<img src="/images/disqus.png" alt="disqus" width="400em">

### 2. \_config.yml discus shortname 입력

`_config.yml`의 `disqus` 부분에 Disqus 홈페이지 admin/settings에서 확인할 수 있는 Shortname을 입력한다.

```yml
# Enter your Disqus shortname (not your username) to enable commenting on posts
# You can find your shortname on the Settings page of your Disqus account
disqus: Shortname 입력
```

고맙게도 Jekyll Now에는 나머지 세팅이 되어있기 때문에 3, 4번은 건너뛰어도 된다.

### 3. /\_includes/discus.html 만들기

```html
{%raw%}{% if site.disqus %}
<div class="comments">
  <div id="disqus_thread"></div>
  <script type="text/javascript">
    var disqus_shortname = "{{ site.disqus }}";

    (function() {
      var dsq = document.createElement("script");
      dsq.type = "text/javascript";
      dsq.async = true;
      dsq.src = "//" + disqus_shortname + ".disqus.com/embed.js";
      (
        document.getElementsByTagName("head")[0] ||
        document.getElementsByTagName("body")[0]
      ).appendChild(dsq);
    })();
  </script>
  <noscript
    >Please enable JavaScript to view the
    <a href="http://disqus.com/?ref_noscript"
      >comments powered by Disqus.</a
    ></noscript
  >
</div>
{% endif %}{%endraw%}
```

### 4. /\_layouts/post.html에 disqus.html include 하기

댓글창을 넣을 위치에 아래 내용을 추가한다.

{% highlight liquid %}
{%raw%}{% include disqus.html %}{%endraw%}
{% endhighlight %}

### 5. Front Matter에 comments: true 추가하기

```markdown
comments: true
```

물론, 코멘트 창이 필요없는 경우, `comments: false`를 입력하면 된다.

<br>
👏 **댓글창 구현된 모습**

<img src="/images/disqus_applied.png" alt="disqus_applied" style="border:1px solid #bcbcbc">
<br>
<br>
<br>
