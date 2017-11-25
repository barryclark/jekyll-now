---
layout: post
title: Speaker Deck Widget 🌎

---


<p align="center"> 
<img src="https://raw.githubusercontent.com/ezefranca/speakerdeck-widget/master/logo-sp.png"/>
<p> A very simple Speaker Deck Widget to show yours last talks. Just two html lines. Based on <a href="https://github.com/jcouyang/">@jcouyang</a>, <a href="https://github.com/jcouyang/gh-widget">
Github Widget</a>

</p>
</p>

```html
    <div id="speakerdeck-widget" data-sp_username="speakerdeck-username" data-display="talks"></div>
    <script src="http://ezefranca.github.io/speakerdeck-widget/index.js"></script>
```
<h3>Try it :)</h3>

![](https://github.com/ezefranca/speakerdeck-widget/raw/master/screenshot.png)

## Config
- username: put your Speaker Deck username in `sp-username` attribute
- display: for now, use `talks`

## Try
<p>Go to <b>http://ezefranca.github.io/speakerdeck-widget/your-speaker-deck-username</b> and see how your widget looks</p>

## Live Example
- http://ezefranca.github.io/widget.html

## How this works
The same way of <a href="https://github.com/jcouyang/gh-widget">gh-widget</a> works. A simple hosted gist get the data from speakerdeck site, and index.js parse and build the widget.

