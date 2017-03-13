---
layout: post
title: jekyllで作成したページをローカルでプレビューする
categories: ['env development']
---

UbuntuでGithub Pagesに公開するjekyllで作成したサイトをローカルで確認できるようになることが目標。
ちなみにUbuntu 16.04 LTS。

<br>

### rbenvを用いたRuby環境の構築
version management toolであるrbenvを用いてRuby環境を構築する。<br>
まずは必要な依存関係のあるパッケージをインストール。

```
$ sudo apt-get update
$ sudo apt-get install git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties libffi-dev nodejs
```

必要なrepositoryをcloneしてpathを通す。

```
$ cd
$ git clone https://github.com/rbenv/rbenv.git ~/.rbenv
$ echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
$ echo 'eval "$(rbenv init -)"' >> ~/.bashrc
$ exec $SHELL
$ git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
$ echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.bashrc
$ exec $SHELL
```

Rubyをインストールする。とりあえずglobalの環境も2.4.0にしておくが、この辺は好みで。

```
$ rbenv install 2.4.0
$ rbenv global 2.4.0
$ ruby -v
ruby 2.4.0p0 (2016-12-24 revision 57164) [x86_64-linux]
```

最後に3rd party製のlibraryを管理するためのgemを扱うのに有用なbundlerを入れておく。

```
$ gem install bundler
```

<br>

### Railsをインストール
Railsでアプリケーションを動かすために必要になるNode.jsもインストールする。

```
$ curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
$ sudo apt-get install -y nodejs
$ gem install rails -v 5.0.1
$ rbenv rehash
$ rails -v
Rails 5.0.1
```

<br>
### jekyllとgithub-pagesのインストール
これも素直に入れるだけ。

```
$ gem install jekyll
$ gem install github-pages
```

<br>

### repositoryをcloneしてきてローカルで確認
自分の場合はこんな感じ。

```
$ git clone https://github.com/yoheikikuta/yoheikikuta.github.io.git
$ cd yoheikikuta.github.io/
$ jekyll serve
Configuration file: /home/yohei/git/yoheikikuta.github.io/_config.yml
...
    Server address: http://127.0.0.1:4000/
...
```

これでブラウザで [http://127.0.0.1:4000/](http://127.0.0.1:4000/) にアクセスすれば確認できる。<br>
止める場合は ```Ctrl+c``` で止める。ちなみに起動中にファイルを変更して保存すると自動的にウェブページの再生成が走るので、ブラウザをリロードすれば変更を確認できる。

最も基本的な使い方はこんなもんでしょうか。

---
---
<br>

