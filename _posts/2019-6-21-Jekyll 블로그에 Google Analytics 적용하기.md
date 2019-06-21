---
layout: post
title: Jekyll 블로그에 Google Analytics 적용하기
date: 2019-06-21
comments: true
categories: [Project, blogwithjekyll]
tags: [Jekyll, Google Analytics]
excerpt: Github Page는 다른 블로그 서비스와는 다르게 이 기능을 제공하지는 않기 때문에 Google Analytics를 이용해야 한다. 어떻게?!
---

웹페이지를 개설했으니, 방문자 수가 궁금하다!

Github Page는 다른 블로그 서비스와는 다르게 이 기능을 제공하지는 않기 때문에 Google Analytics를 이용해야 한다. 어떻게?!

## 1. Google Analytics 가입하기

Google Analytics를 이용하려면, 서비스에 가입해야 한다. [Google Analytics](https://analytics.google.com/analytics/web/provision/?authuser=0#/provision)에 접속하여 가입을 진행한다.

![Google Analytics sign up](/images/GA_signup.png "Google Analytics sign up")

국가를 한국으로 설정하고, 약관에 동의하고 나면 **Tracking ID**가 발급된 것을 확인할 수 있다.

## 2. \_config.yml에 Tracking ID 추가하기

`_config.yml`에 아래와 같이 Tracking ID를 추가한다.

```yml
# Enter your Google Analytics web tracking code (e.g. UA-2110908-2) to activate tracking
google_analytics: Tracking ID
```

## 3. /\_includes/analytics.html 추가하기

Jekyll Now를 사용하면, 이미 아래와 같이 `/_includes/analytics.html` 파일이 만들어져 있다.
`_config.yml`에 입력해준 Tracking ID를 자동으로 가져오도록 코드가 짜여져 있기 때문에 추가적으로 수정할 내용은 없다.

```html
{%raw%}{% if site.google_analytics %}
<!-- Google Analytics -->
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', '{{ site.google_analytics }}', 'auto');
  ga('send', 'pageview', {
    'page': '{{ site.baseurl }}{{ page.url }}',
    'title': '{{ page.title | replace: "'", "\\'" }}'
  });
</script>
<!-- End Google Analytics -->
{% endif %} {%endraw%}
```

## 4. default.html 파일에 analytics.html include 하기

`default.html` 파일의 body 태그 끝자락에 `analytics.html`을 include한다.

```html
    </div>
   {%raw%}{% include analytics.html %}{%endraw%}
  </body>
```

## 5. GA 확인하기

이제 모든 준비는 끝!
다른 기기로 홈페이지에 접속해 보면 GA 콘솔에서 접속자를 확인할 수 있다.
아직은.. 접속자가 나 밖에 없지만..😓 연결은 성공!

![Google Analytics realtime](/images/GA_realtime.png "Google Analytics realtime")
