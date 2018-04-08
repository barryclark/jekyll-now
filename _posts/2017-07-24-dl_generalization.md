---
layout: post
title: Deep Learning の汎化性能に関して論文を読んで発表した
categories: ['ML paper']
---


### TL;DR
- Deep Learningの汎化性能に関して軽くまとめてその内容を発表した
<br>

<script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

<script async class="speakerdeck-embed" data-id="4e335c08f3304c56b9b3d9ca7b4435ba" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

<br>

## ちょっとコメント
パラメタ数がデータサンプル数よりも多くなるような Deep Learning においては、汎化性能の振る舞いを理解することは容易ではない。
従来までの VC-dimension や Rademacher complexity はモデル性能を測る上で有用ではなくなってしまう。
そこで、weight の norm や path-norm などに注目して汎化性能を測る手がかりが得られないかというのが研究されている。
一部特徴を捉えている部分もあるが、やはり単純な指標を考えるだけでは汎化性能は完全には掌握できないというのが現時点での結論。
面白いのは linear system であっても overconstrained の場合の汎化性能は一考の価値があるというもので、具体的には weight の l2-norm が minimize されるような解を構築すると MNIST や CIFAR で良い汎化性能を持つモデルが得られたという結果がある。
これは一筋縄ではないかない問題であるのは明白なのですぐに答えが得られるものではないと思われるが、話としては興味があるので逐次追っていきたい。

<br>
結局どこかで発表したものをここで貼るだけになってしまっている。
論文は色々と読んでるので本当はそれらをこのブログで解説できればいいのだけど、まあやっぱりブログ書くのは結構面倒くさい。
ホワイトボードとかに書きなぐったものをよい感じにまとめてくれる画像からの文字認識と文章要約の技術発展が望まれる。

---
---
<br>

