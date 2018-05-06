---
layout: post
title: arXiv の論文を google drive に保存する Chrome extension を作った
categories: ['env development']
---

### TL;DR
- iPad Pro で論文を読む際に Notability を使いたいが Mendeley などと異なり論文管理は手間
- Chrome extension を使って arXiv の論文を google drive に保存できるようにした：[Repository](https://github.com/yoheikikuta/arxiv-pdf-downloader)
- Notability との連携が改善されれば文句なしなのだが...
<br>

<script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

以前 iPad Pro で論文を読むにはどうしたらいいだろうと思って [こんな記事](https://yoheikikuta.github.io/ipadpro/) を書いた。
その時の結論は「Mendeley + PaperShip」というものだった。

しかしながら、やっぱりというかなんというか、気に入らない部分があって何とかできないかなぁと考えていた。
結果、自分好みの Chrome extension を作ればいけるのでは？と思って実際に作ってみたので、事の顛末を記しておく。

### 現状の不満点
- 複数アプリを跨って使っているので面倒
- 書き込んだ結果のPDFファイルをクラウドに保存しておきたい
- PaperShip の書き込みが（相対的に）気に入らない

最後が一番強い。
自分が好きな Notability と比べるとどうしても気に入らない点がある。
具体的には書き込みをしたときの書き心地や手でなぞっても線が引かれてしまう（Notability の場合は手でなぞるとスクロールができるのでスクロールと描写を切り替えなくて良くて便利）という点だ。


### どうしたいか？
Notability の書き心地にぞっこんなので、このアプリ一本で論文読みやメモ書きを完結させたい。

ただこの場合は論文をどう管理するかという問題が発生する。
論文を管理するというときに自分にとって必要なのは何かを考えた結果、arXivの論文が簡単に保存ができてかつファイル名にタイトルが含まれることくらいではないか、という考えに至った。

例えば自分はそんなにたくさん論文を書いているわけではないので、Mendeley から簡単に bib ファイルを作れるとかは恩恵がない（実際に論文書くときも使ってない）。
それ以外にも色々取得できるメタ情報もまあ使わないし、recommend される論文は大体が知ってるものなので有用性は特にない。

そして自分は基本的に arXiv に挙がっている論文しか読まない。
即時性（update含む）、ページ制限がないから long version も投稿できる、最近の機械学習の論文はかなり arXiv にも投稿されるようになっている、ということでこれでほとんど不便を感じない。
レビューがないから質の担保が...という意見も理解はできるが、自分が読みたい論文を読むのだから質は自分が判断すればいいだろう（オープンレビューにした方がいいのではとか色々話はあるが本題ではないので割愛）。


### どうしたか？
Google Chrome の extension を開発して arXiv の論文を簡単に google drive にダウンロードできるようにした。
使い方の流れは以下：
- arXiv の abstract または pdf のページで [CMD + SHIFT + A] を押下
  - これで事前に指定しておいた google drive の directory に `[1406.2661] Generative Adversarial Networks.pdf` みたいな名前で保存される
- Notability でこの論文を読み込む
  - ここが手動になってしまうのと、一括読み込みを複数回すると同じ pdf が複数個読み込まれてしまう
- Notability で書き込んだ結果は別途 google drive で自動で同期して保存される
  - これは単に Notability の機能を使っているだけ

Notability に読み込むところの不便さが残るが、これは定期的に新しく保存した論文をタップして読みこむだけなのでまあ許せる。
とりあえず必要なものはできたので使いながら利便性を検証していこう。


### Chrome extension に関して
Repository は [https://github.com/yoheikikuta/arxiv-pdf-downloader](https://github.com/yoheikikuta/arxiv-pdf-downloader) である。

完全に自分用に作ったので、ウェブストアに公開してなければちゃんとコードを書いたわけでもない。
特に JavaScript とか Chrome extension の開発とか全く経験がないので強引に実装した。
あまり良い情報源がなかったのだけど、これは探し方が下手なだけだろうか？
本家のページと適当な GitHub の Repository を見ながら何とかした。

需要があればもっとちゃんとするかもしれないが、自分のためのものなので別にしないかもしれない。



## まとめ
iPad Pro での論文読みを Notability で実行するために、arXiv の論文を保存できる Chrome extension を作った。
現時点ではまあまあ気に入っているが、もっと良い環境があるぞという場合は教えて下さい。

---
---
<br>

