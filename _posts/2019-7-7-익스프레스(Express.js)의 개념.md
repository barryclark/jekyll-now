---
layout: post
title: 익스프레스(Express.js)의 개념
date: 2019-07-07
comments: true
categories: [Study, nodejs]
tags: [NodeJs, Express, Middleware]
excerpt: 스프레스(Express.js)는 노드(NodeJS) 상에서 동작하는 웹 개발 프레임워크이다. 익스프레스의 핵심이라고 할 수 있는 미들웨어(Middleware) 덕에 가볍고 유연하게 웹을 구성할 수 있다.
---

## 익스프레스(Express.js)

익스프레스(Express.js)는 노드(NodeJS) 상에서 동작하는 웹 개발 프레임워크이다. 익스프레스의 핵심이라고 할 수 있는 미들웨어(Middleware) 덕에 가볍고 유연하게 웹을 구성할 수 있다.

## 미들웨어(Middleware)

**미들웨어(Middleware)**란 요청과 응답 중간에 거쳐가는 함수로, 어떠한 동작을 하거나, 오류를 걸러내기도 한다.
`app.use()` 메서드를 사용하며, 인자로 미들웨어 함수를 넣으면 된다. 많이 쓰이는 미들웨어 중 `Cors`를 예로 들면, 아래와 같이 사용할 수 있다.

```javascript
const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors());

app.listen(3000, () => {
  console.log("express server listen on 3000");
});
```

<br>

미들웨어의 경우, 동기적으로 작성 순서대로 실행되므로, 순서를 주의해서 작성해 주어야 한다.

<br>

## Node.js http 서버 vs Express.js

그렇다면, Node.js 기본 모듈을 사용하는 것 보다 Express를 사용하는 것이 얼마나 효율적일까?

`/upper`로 온 post 요청의 body 내용을 대문자로 변환해서 응답하고, `/lower`로 온 post 요청의 body 내용을 소문자로 변환해서 응답하는 간단한 서버를 Node.js와 Express.js로 구현하여 비교해 보겠다.

### Node.js http 서버 구성

```javascript
const http = require("http");
const PORT = 5000;
const ip = "localhost";

const server = http.createServer((request, response) => {
  let headers = defaultCorsHeader;
  if (request.method === "POST") {
    let body = "";
    request.on("data", chunk => {
      body += chunk;
    });
    request.on("end", () => {
      try {
        body = body.toString();
        if (request.url === "/upper") {
          body = body.toUpperCase();
        } else {
          body = body.toLowerCase();
        }
        response.writeHead(200, headers);
        response.end(JSON.stringify(body));
      } catch (err) {
        console.error(err);
      }
    });
  } else if (request.method === "OPTIONS") {
    response.writeHead(200, headers);
    response.end("hello http server");
  }
});

server.listen(PORT, ip, () => {
  console.log(`http server listen on ${ip}:${PORT}`);
});

const defaultCorsHeader = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10
};
```

### Express.js를 사용하여 서버 구성하기

**1. express를 설치한다.**

```bash
$ npm install express --save
```

<br>

**2. express를 사용하여 5000번 포트에 서버를 연결한다.**

```javascript
const express = require("express");
const app = express();

app.set("port", process.env.PORT || 5000);

app.listen(app.get("port"), () => {
  console.log("express server listen on " + app.get("port"));
});
```

<br>

**3. 미들웨어 작성**

CORS(Cross Origin Resource Sharing)를 허용하는 [`cors`](https://expressjs.com/en/resources/middleware/cors.html) 미들웨어와, 요청의 body 데이터를 파싱처리 해주는 [`body-parser`](https://www.npmjs.com/package/body-parser)를 추가한다. `body-parser`의 경우, 요청 header의 `Content-Type`에 상응하는 메서드를 사용해야하며, 그렇지 않은 경우 `req.body`는 빈 객체 `{}`로 인식된다.

```javascript
app.use(cors());
app.use(bodyParser.text({ type: "json" }));
```

<br>

**4. 요청별 라우팅 작성**

라우팅이란, 요청 엔드포인트와 메소드 별 응답방법을 결정하는 것을 말하는데, `app.METHOD(PATH, HANDLER)` 구조이다.

```javascript
app.post("/upper", function(req, res) {
  let { body } = req;
  body = body.toUpperCase();
  res.json(body);
});

app.post("/lower", function(req, res) {
  let { body } = req;
  body = body.toLowerCase();
  res.json(body);
});
```

<br>

최종 코드는 아래와 같으며, node.js 기본 모듈로 작성했을 때보다 한결 가벼워진것을 확인할 수 있다.

```javascript
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.text({ type: "json" }));

app.post("/upper", function(req, res) {
  let { body } = req;
  body = body.toUpperCase();
  res.json(body);
});

app.post("/lower", function(req, res) {
  let { body } = req;
  body = body.toLowerCase();
  res.json(body);
});

app.set("port", process.env.PORT || 5000);

app.listen(app.get("port"), () => {
  console.log("express server listen on " + app.get("port"));
});
```

<br>
