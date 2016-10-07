---
layout: post
title: Golangで簡単掲示板作成
---

## はじめに

### go、mysqlのversion確認

```
$ go version
go version go1.7.1 darwin/amd64
```

```bash:
$ mysql --version
mysql  Ver 14.14 Distrib 5.7.15, for osx10.11 (x86_64) using  EditLine wrapper

```

### 環境変数を設定する

1) golangチュートリアルで設定した.zshvrの$GOPATHをコメントアウト

```diff:
-export GOPATH=~/.go
+#export GOPATH=~/.go
```

2) .bash_profileに以下を追加

```
#golang
export GOROOT=/usr/local/opt/go/libexec
export GOPATH=$HOME/.go
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin
```

### revel を install する

```
$ go get github.com/revel/revel
$ go get github.com/revel/cmd/revel
```

### インストールされたrevelを確認

```
$ revel version
~
~ revel! http://revel.github.io
~
Version(s):
   Revel v0.13.1 (2016-06-06)
   go1.7.1 darwin/amd64
```


### revel new app_nameでプロジェクトを作成する

shiro16さんのgolang-bbsを拝借

```
$ revel new github.com/shiro16/golang-bbs
~
~ revel! http://revel.github.io
~
Your application is ready:
   /Users/xxxxxx/.go/src/github.com/shiro16/golang-bbs

You can run it with:
   revel run github.com/shiro16/golang-bbs
```

### revel runコマンドでwebサーバを起動する



```
$ revel run github.com/shiro16/golang-bbs
~
~ revel! http://revel.github.io
~
INFO  2016/10/07 14:28:23 revel.go:365: Loaded module testrunner
INFO  2016/10/07 14:28:23 revel.go:365: Loaded module static
INFO  2016/10/07 14:28:23 revel.go:230: Initialized Revel v0.13.1 (2016-06-06) for >= go1.4
INFO  2016/10/07 14:28:23 run.go:57: Running golang-bbs (github.com/shiro16/golang-bbs) in dev mode
INFO  2016/10/07 14:28:23 harness.go:170: Listening on :9000
INFO  2016/10/07 14:28:30 build.go:179: Cleaning dir tmp
INFO  2016/10/07 14:28:30 build.go:179: Cleaning dir routes
INFO  2016/10/07 14:28:30 build.go:179: Cleaning dir tmp
INFO  2016/10/07 14:28:30 build.go:179: Cleaning dir routes
INFO  2016/10/07 14:28:31 revel.go:365: Loaded module static
INFO  2016/10/07 14:28:31 revel.go:365: Loaded module testrunner
INFO  2016/10/07 14:28:31 revel.go:230: Initialized Revel v0.13.1 (2016-06-06) for >= go1.4
INFO  2016/10/07 14:28:31 main.go:30: Running revel server
Go to /@tests to run the tests.
```

Ctrl+Cでサーバ停止


## API作成

### routesファイルを編集

```diff:
GET     /                                       App.Index
+ GET     /api/v1/comments                        ApiV1Comments.Index
+ GET     /api/v1/comments/:id                    ApiV1Comments.Show
+ POST    /api/v1/comments                        ApiV1Comments.Create
+ DELETE  /api/v1/comments/:id                    ApiV1Comments.Delete
```

### controller作成

#### 共通controllerを作成
```go:
// app/controllers/api/v1/v1.go
package controllers

import (
        "github.com/revel/revel"
        "github.com/shiro16/golang-bbs/app/utils"
        "net/http"
)

// 埋め込みによって revel.Controller をラップした ApiV1Controller を定義する
type ApiV1Controller struct {
        *revel.Controller
}

// エラーの際に返す Json 用の構造体
type ErrorResponse struct {
        Code    int    `json:"code"`
        Message string `json:"message"`
}

// 正常な際に返す Json 用の構造体(今回は1種類で統一する)
type Response struct {
        Results interface{} `json:"results"`
}

// 引数として渡されて interface にリクエストの Json の値を格納する
func (c *ApiV1Controller) BindParams(s interface{}) error {
        return utils.JsonDecode(c.Request.Body, s)
}

// Bad Request Error を返すやつ
func (c *ApiV1Controller) HandleBadRequestError(s string) revel.Result {
        c.Response.Status = http.StatusBadRequest
        r := ErrorResponse{c.Response.Status, s}
        return c.RenderJson(r)
}

// Not Found Error を返すやつ
func (c *ApiV1Controller) HandleNotFoundError(s string) revel.Result {
        c.Response.Status = http.StatusNotFound
        r := ErrorResponse{c.Response.Status, s}
        return c.RenderJson(r)
}

// Internal Server Error を返すやつ
func (c *ApiV1Controller) HandleInternalServerError(s string) revel.Result {
        c.Response.Status = http.StatusInternalServerError
        r := ErrorResponse{c.Response.Status, s}
        return c.RenderJson(r)
}
```

#### comments controllerを作成

```go:
// app/controllers/api/v1/comments.go
package controllers

import (
        "github.com/revel/revel"
        "github.com/shiro16/golang-bbs/app/controllers"
)

type ApiV1Comments struct {
        ApiV1Controller
}

func (c ApiV1Comments) Index() revel.Result {
        r := Response{"index"}
        return c.RenderJson(r)
}

func (c ApiV1Comments) Show(id int) revel.Result {
        r := Response{"show"}
        return c.RenderJson(r)
}

func (c ApiV1Comments) Create() revel.Result {
        r := Response{"create"}
        return c.RenderJson(r)
}

func (c ApiV1Comments) Delete(id int) revel.Result {
        r := Response{"delete"}
        return c.RenderJson(r)
}
```

## APIの動作確認

サーバを起動する
`$ revel run github.com/shiro16/golang-bbs`

別terminalを立ち上げてcurlコマンドを試す

`$ curl http://localhost:9000/api/v1/comments`

```
{
  "results": "index"
}
```

`$ curl http://localhost:9000/api/v1/comments/1`

```
{
  "results": "show"
}
```

`$ curl -X POST http://localhost:9000/api/v1/comments`

```
{
  "results": "create"
}
```

`$ curl -X DELETE http://localhost:9000/api/v1/comments/1`

```
{
  "results": "delete"
}
```

サーバを起動したterminalにコンソールログが表示された

```bash:
2016/10/07 15:31:00.070 ::1 200 4.097022ms GET /api/v1/comments
2016/10/07 15:31:26.809 ::1 200  146.966µs GET /api/v1/comments/1
2016/10/07 15:31:39.625 ::1 200  108.271µs POST /api/v1/comments
2016/10/07 15:31:50.521 ::1 200  105.353µs DELETE /api/v1/comments/1
```



## DB周り

- 使用するORM: [github.com/jinzhu/gorm](https://github.com/jinzhu/gorm)
- 使用するvalidation: [github.com/go-validator/validator](https://github.com/go-validator/validator)

### DB の接続情報を追加

`$ vi conf/app.conf`

[dev]セクションに一行追加

```diff:
+ db.info = "root@/golang_bbs_development?charset=utf8&parseTime=True
```

### modelを作成

使用するORM(gorm)と使用するvalidation(validator)をインストールする

```
$ go get github.com/jinzhu/gorm
$ go get gopkg.in/validator.v2
```

#### comments modelを作成

```go:
// app/models/comment.go
package models

import (
        "time"
)

type Comment struct {
        ID        uint64     `gorm:"primary_key" json:"id"`
        Nickname  string     `sql:"size:64" json:"nickname" validate:"max=64"`
        Body      string     `sql:"size:255" json:"body" validate:"min=1,max=255"`
        CreatedAt time.Time  `json:"created_at"`
        UpdatedAt time.Time  `json:"updated_at"`
        DeletedAt *time.Time `json:"deleted_at"`
}
```

#### gorm controllerを作成

```
// app/controllers/gorm.go
package controllers

import (
        _ "github.com/go-sql-driver/mysql"
        "github.com/jinzhu/gorm"
        "github.com/revel/revel"
        "github.com/shiro16/golang-bbs/app/models"
        "log"
)

var DB *gorm.DB

func InitDB() {
        db, err := gorm.Open("mysql", dbInfoString())
        if err != nil {
                log.Panicf("Failed to connect to database: %v\n", err)
        }

        db.DB()
        db.AutoMigrate(&models.Comment{}) # ここで table の作成を行っている
        DB = &db
}

func dbInfoString() string {
        s, b := revel.Config.String("db.info")
        if !b {
                log.Panicf("database info not found")
        }

        return s
}
```

#### 上記のcontrollerを呼び出す処理を追記する

`$ vi app/init.go`

```diff:
- import "github.com/revel/revel"
+ import(
+         "github.com/revel/revel"
+         "github.com/shiro16/golang-bbs/app/controllers"
+ )

func init() {
....
+ revel.OnAppStart(controllers.InitDB) // 28行目くらいに
}
```

### controller で model を使用する

#### comments controller を編集

```diff:
package controllers

import (
	"github.com/revel/revel"
+ 	"github.com/shiro16/golang-bbs/app/controllers"
+ 	"github.com/shiro16/golang-bbs/app/models"
+ 	"gopkg.in/validator.v2"
)

type ApiV1Comments struct {
	ApiV1Controller
}

func (c ApiV1Comments) Index() revel.Result {
+ 	comments := []models.Comment{}

+ 	if err := controllers.DB.Order("id desc").Find(&comments).Error; err != nil {
+ 		return c.HandleInternalServerError("Record Find Failure")
+ 	}

+ 	r := Response{comments}
- 	r := Response{"index"}
	return c.RenderJson(r)
}

func (c ApiV1Comments) Show(id int) revel.Result {
+ 	comment := &models.Comment{}

+ 	if err := controllers.DB.First(&comment, id).Error; err != nil {
+ 		return c.HandleNotFoundError(err.Error())
+ 	}

+ 	r := Response{comment}
- 	r := Response{"show"}
	return c.RenderJson(r)
}

func (c ApiV1Comments) Create() revel.Result {
+ 	comment := &models.Comment{}

+ 	if err := c.BindParams(comment); err != nil {
+ 		return c.HandleBadRequestError(err.Error())
+ 	}

+ 	if err := validator.Validate(comment); err != nil {
+ 		return c.HandleBadRequestError(err.Error())
+ 	}

+ 	if err := controllers.DB.Create(comment).Error; err != nil {
+ 		return c.HandleInternalServerError("Record Create Failure")
+ 	}

+ 	r := Response{comment}
- 	r := Response{"create"}
	return c.RenderJson(r)
}

func (c ApiV1Comments) Delete(id int) revel.Result {
+ 	comment := models.Comment{}

+ 	if err := controllers.DB.First(&comment, id).Error; err != nil {
+ 		return c.HandleNotFoundError(err.Error())
+ 	}

+ 	if err := controllers.DB.Delete(&comment).Error; err != nil {
+ 		return c.HandleInternalServerError("Record Delete Failure")
+ 	}

+ 	r := Response{"success"}
- 	r := Response{"delete"}
	return c.RenderJson(r)
}
```

## APIの動作確認

サーバを起動する
`$ revel run github.com/shiro16/golang-bbs`

別terminalを立ち上げてcurlコマンドを試す→エラーになった！

`$ curl -H "Content-type: application/json" -X POST -d '{"nickname":"shiro16", "body":"test comment"}' http://localhost:9000/api/v1/comments`

```go:
Go Compilation Error
The Go code src/github.com/shiro16/golang-bbs/app/controllers/gorm.go does not compile: cannot use &db (type **gorm.DB) as type *gorm.DB in assignment

In src/github.com/shiro16/golang-bbs/app/controllers/gorm.go (around line 22)

17:
                log.Panicf("Failed to connect to database: %v\n", err)
18:
        }
19:
20:
        db.DB()
21:
        db.AutoMigrate(&models.Comment{})
22:
        DB = &db
23:
}
24:
25:
func dbInfoString() string {
26:
        s, b := revel.Config.String("db.info")
```

## エラー解析中
続きは来週...
