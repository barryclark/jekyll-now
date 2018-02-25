---
layout: post
title: プレゼン用の資料作成のためのツールをいくつか試した
categories: ['env development']
---
<script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>


### TL;DR
- プレゼンで資料を作るときに自分に合うものをちょっと探してみた
- 結論としては Deckset（もしくは gitpitch）が良さそう

発表資料を作るとき、結構大変である。

具体的には、自分の場合は数式を入れたいという欲求があるが画像で切り貼りするとかもう無理なのでやめようという話。
ちなみにこれまでは Keynote + LaTeXiT とか、数式あまり使わない場合は google slides とかを使っていた。
自分は図表の位置とか細かく調整したいタイプなのでこれらのツール以外は合わないかなと思っていたが、
ある意味で悪い癖でもあるのでこれを機にそういう細かい操作が許されないツールで矯正するのもよいかなと思い始めた。

ということで以下の条件を満たすものを探してみた。
- 数式を LaTeX を使って書けて、かつ inline 挿入可
- 自分にとって馴染みのある記法で書ける（具体的には markdown か LaTeX）
- 画像を入れるのが大変じゃない（できれば調整も可能）
- 可能なら他の人への共有などが容易

パワポ？あ〜〜〜聞こえんな！！（獄長）


## 試してみたものと感想

### gitpitch
これ: [https://github.com/gitpitch/gitpitch](https://github.com/gitpitch/gitpitch)

GitHub のレポジトリに markdown と設定用の yaml ファイルを push しておくと、https://gitpitch.com/user/repo/branch にアクセスすることで presentation が実施できるというもの。
[こんな感じ](https://gitpitch.com/yoheikikuta/test-gitpitch/master#/) である。

作業途中の確認はちょっと手間で細かい作業はし難いが、それを許容できればこれでいいのではないかという気がしてきた。ちなみに pdf 出力とかも可能。

公開できない資料とかは public repository に push できないので、そういう資料を作らないといけないことが多い人は無理そう（private repositoryではできないっぽい）。


### Deckset
これ: [https://www.decksetapp.com/](https://www.decksetapp.com/) （20180225現在で$30）

Mac のアプリで markdown で良い感じの資料がサクッと作れるとというもの。
MathJax を使っているので LaTeX 記法で数式も書けるし、画像の位置調整などもそこそこ可能。

ローカルでサクサク作業できるし、テーマが充実しているので良い感じの資料が小さい労力で作れると感じた。

自分も使ってみて、最初は画像が細かく調整できないし進んで移行するかは微妙だなと思っていたが、ある程度使ううちに結構いいなと感じるようになってきた。
少なくとも keynote + LaTeXiT で作ろうという気持ちは消え去るくらいには使いやすかった。


## Overleaf + Beamer
これ: [テンプレートの一例（Creative Commons License）](https://www.overleaf.com/latex/templates/beamer-presentation/zxrfltwmbcrt#.WpKU9nWGPdE)

LaTeX じゃないと気が済まないという人はこういう構成もありだと思う。[こんな感じ](https://www.overleaf.com/read/xdndnnwrnbwk)である。

正直 themes はイケてない感じのものが多いが、Overleaf ラクだし LaTeX を頑張れば細かい調整などは可能だと想われる（そんなに試してはいない）。


## まとめ
自分としては gitpitch に寄せていきたい気持ちがあるが、公開できない資料とかもあるのでとりあえず Deckset をメインで使っていくつもり。
こういうツールで変に微調整してしまう癖を矯正していこう。

（google slides で LaTeX 記法が使えるようになれば寝返りそうな気もする）

---
---
<br>

