---
layout: post
title: DLを誤認識させるノイズの話
categories: ['ML paper']
---
<script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>


### TL;DR
- 普遍的な摂動ノイズによって様々な画像がDLで誤認識されるという論文を読んで発表した

<script async class="speakerdeck-embed" data-id="5bf2665215fd4037823335e53b4c6d74" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

<br>

## ちょっとコメント
DLは性能が高いが、実は騙されやすい側面もあり、人間には微小なノイズでもそのノイズによって誤認識してしまう場合があることが知られている。
なんと単一のノイズで様々な画像が誤認識されるという論文があるというので、それを読んでCVPR読み会で発表したので、その資料を貼っておく。
関連論文を結構読んでちゃんと資料をまとめたので、これは資料を読んでもらえれば内容が大体理解してもらえるだろう。
DLの decision boundary がどうやって形成されているのか、というのはもっと色々深堀りできそうで面白い話題だと思う。

原論文で repository が紹介されていて python コードもあるので、これを動かすようにちょっとだけ修正を加えた repository も作った:
[repository](https://github.com/yoheikikuta/universal) <br>
まあ docker 環境を作って matplotlib の display 設定でエラーが出ないようにした、というだけの話なんですけど。
算出済みの摂動ノイズが準備されているので、これを使えば自分が準備した画像が確かに誤認識されることが確認できるので、結構面白い。


<br>
この手の論文はそんなに難しいことをしていない割には結果が面白いので、この界隈に目をつけて研究するのは結構良い選択だと感じる。
自分としてもアイデアはあるので、副業とか落ち着いたら色々取り組んでみたいな。

---
---
<br>

