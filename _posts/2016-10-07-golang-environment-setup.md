---
layout: post
title: Golang 開発環境セットアップ
---

## はじめに

### goインストール

Homebrewでgoをインストールする。

`$ brew install go`

go用pluginを格納するフォルダを作成して、環境変数GOPATHにセットする。

`$ mkdir ~/.go`<br>
`$ echo "export GOPATH=~/.go" >> ~/.zshrc`

### atomエディタsetup

- go-plusプラグインインストール

Atomの設定-installのSearch Packagesにgo-plusと入力して、パッケージボタンを押すと、go-plusプラグインが表示されるので、インストールボタンをクリックする。

### まずはHello World!

以下のリンクのHello Worldを進めても良いですが、せっかく環境を整えたのでそちらでもHello Worldを試しましょう。

- [A Tour of Go](https://go-tour-jp.appspot.com/welcome/1)

#### hello.goファイルを作成

`$ vi hello.go`

```golang:
package main

import "fmt"

func main() {
    fmt.Println("Hello World!")
}
```

#### go buildコマンドでコンパイルする

`$ go build hello.go`

##### 実行ファイル「hello」が生成されたことを確認

```
$ ls -ltr
total 3160
-rw-r--r--  1 val  staff       76 Oct  7 10:47 hello.go
-rwxr-xr-x  1 val  staff  1607616 Oct  7 10:47 hello
```

#### 実行ファイル「hello」を実行してみる

```
$ ./hello
Hello World!
```

#### go runコマンドを使うとコンパイルと実行を同時に行ってくれる

```
$ go run hello.go
Hello World!
```

※この場合、実行ファイル「hello」は生成されない。

### 現在時刻を表示してみる

#### time.goファイルを作成

`$ vi time.go`

```golang:
package main

import (
  "fmt"
  "time"
)
func main() {
    fmt.Println("The current time is", time.Now())
}
```

#### go runコマンドで実行してみる

```
$ go run time.go
The current time is 2016-10-07 11:00:11.027383849 +0900 JST
```

```
$ date
Fri Oct  7 11:00:19 JST 2016
```
