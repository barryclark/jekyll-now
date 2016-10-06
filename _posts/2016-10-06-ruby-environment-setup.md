---
layout: post
title: Ruby 開発環境セットアップ
---

## はじめに

### Ruby、RubyGems、Rails、Git

rbenv、またはrvmでrubyをインストールする。

- [rbenvとは？（rbenvを利用したRubyのインストール）](http://qiita.com/yunzeroin/items/33a51c805e60ed5eca0e)
- [RVMとは？(RVMを利用したRubyのインストール)](http://qiita.com/yunzeroin/items/f685c66a5455d354f6b6)

rubyのバージョンを確認する。

`$ ruby -v`

gemのバージョンを確認し、特定のバージョンに固定する。こうする事で、今後RubyGemsが変更されたときのコンフリクトを防止できる。

`$ which gem`

`$ gem update --system 2.0.3`

.gemrcにriとrdoc生成を抑制するコマンドを追加する。

`$ vi ~/.gemrc`

```
install: --no-rdoc --no-ri
update:  --no-rdoc --no-ri
```

railsのバージョンを確認する。

`$ rails -v`

## 最初のコマンド

プロジェクト用のフォルダを作成し、そのフォルダの中で`rails new app_name`を実行する。

```
$ mkdir rails_projects
$ cd rails_projects
$ rails new first_app
：
Bundle complete! 15 Gemfile dependencies, 62 gems now installed.
Bundled gems are installed into ./vendor/bundle.
         run  bundle exec spring binstub --all
* bin/rake: spring inserted
* bin/rails: spring inserted
```

## Bundler

Gemfileを編集し、インストールするgemのバージョンを指定します。

```
$ cd first_app
$ vi Gemfile
```

Gemfileを正しく設定した後、bundle update14とbundle installを使用してgemをインストールします。

```
$ bundle update
$ bundle install
```

## rails server

rails serverコマンドを実行して


-----
つづく
