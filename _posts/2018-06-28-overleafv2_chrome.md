---
layout: post
title: Chrome で Overleaf v2 を使う
categories: ['env development']
---

### TL;DR
- Overleaf の version 2 が出たので試してみた
- Chrome で遭遇するエディタのカーソルがズレる問題を解決した（フォントのカスタマイズで固定幅フォントを「Monaco」にする）
- reference search など新しい機能が使えて全体的に良い感じ
- 具体的な例は [こちら](https://v2.overleaf.com/read/fdjjqtsvgktj)
<br>

<script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

最近は LaTeX を使って何かを書くときは専ら Overleaf を使っていて、ローカルの環境構築とかは気が進まないなぁ思うようになっている。
そんな　Overleaf の v2 が出たということで試してみた。


### version 2 における変更点
[公式のページ](https://www.overleaf.com/blog/641-try-out-overleaf-v2#.WzOlNBIzbOY) に書いてあるので特に説明することがない...
個人的には検索や置換がよりシンプルなインターフェースでできるようになったのは嬉しい。
共著者とのコラボレーション機能の充実（個別の変更に対してやりとりが可能）は論文を書く時に細かいやりとりができるので便利そうには見えるが、そこまで使うかなぁという感じもする。
目玉は reference search かな、これは \cite{} の中で CTRL+SPACE を押下することで .bib の中身を検索できる。
.bib ファイルが肥大化すると補完だけではお望みのものを見つけられなくなったりもするので、これは良さそうだ！

### Chrome でのバグ
喜び勇んで使い始めたが、Chrome だと半角文字を使うことでエディタのカーソルがズレるという厳しいバグがあった。
人のツイートを引用させてもらうがこんな感じ。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="en" dir="ltr">This is how it looks like (as of today). <a href="https://t.co/rFDiwp4lcu">pic.twitter.com/rFDiwp4lcu</a></p>&mdash; ねぎぼ (@f_negibozu) <a href="https://twitter.com/f_negibozu/status/1008265075768025088?ref_src=twsrc%5Etfw">2018年6月17日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

ブラウザを変えるという workaround があるとのことだったが、さすがにこのためにブラウザを変えるのはしんどい。
自分でもサポートにバグレポートを投げたところ、再現はできないがフォントを変えるような Chrome Extension とかが悪さをしている可能性あり、という話だった。

どの道その辺が悪さをしているのは間違いなさそうとは思っていたので、Extension を全てオフにして試したが結果は変わらず。
それとは別にゲストアカウントを使ったらバグは発生せずにデフォルトのフォントが違っていた、ということを発見した。
ということで Chrome の設定で固定幅フォントをあれこれ変えて試していたら、少なくとも「Monaco」にすればバグが発生しないことが明らかになった。
全てのフォントを網羅的に調べてはいないが、自分はフォントに特にこだわりはないし、これで解決！ということと相成った。

サポートの人にも事の顛末を説明したメールを送り、この話はここでおしまい。
関係ないがサポートの人の肩書きが Overleaf TeXpert になっていて中々洒落てるねぇと思った。


## まとめ
Overleaf v2 を試してみて、そこで遭遇した Chrome でエディタのカーソルがズレるバグの対処法を発見したという話。
v2 はなかなか良い感じなのでこれを使っていこう。

---
---
<br>

