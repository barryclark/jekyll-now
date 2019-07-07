---
layout: post
title: 익스프레스(Express.js) 미들웨어 만들기
date: 2019-07-08
comments: true
categories: [Study, nodejs]
tags: [NodeJs, Express, Middleware]
excerpt: Express.js에서는 미들웨어 패키지를 설치하여 사용할 뿐만 아니라, 각 프로젝트에서 필요한 미들웨어를 생성하여 사용할 수도 있다.
---

Express.js에서는 미들웨어 패키지를 설치하여 사용할 뿐만 아니라, 각 프로젝트에서 필요한 미들웨어를 생성하여 사용할 수도 있다.

미들웨어의 구조는 아래 그림과 같으며, 상세내용은 [공식문서](https://expressjs.com/ko/guide/writing-middleware.html)를 참조하면 된다.

![Express Middleware](/images/express_middleware.png "Express Middleware")

<br>

주의할 점은, 미들웨어 내부에서 `next()`를 호출해야 다음 미들웨어로 넘어갈 수 있다. cors, body-parser 등의 미들웨어 패키지는 `next()`가 내장되어 있기 때문에 따로 명기해주지 않는 것이다.

jwt를 활용하여 admin을 확인하는 미들웨어 `isAdmin`을 작성해 보자. `/checkAuth` 경로로 header에 token을 담아 `GET` 요청을 보내어 amdin 계정인지를 확인하는 로직이다. 로그인시 발행한 토큰에는 `isAdmin=true`라는 옵션이 포함되어 `isAdmin=true`인 경우 `tokenVerifier`가 `true`를 반환하도록 작성하였다.

```javascript
//  routes/middleware.js
const jwt = require("jsonwebtoken");

const tokenVerifier = token => {
  try {
    let decoded = jwt.verify(token, "secret");
    if (decoded.isAdmin) {
      return true;
    }
  } catch (err) {
    return false;
  }
};

exports.isAdmin = (req, res, next) => {
  let isValid = tokenVerifier(req.headers.authorization);
  if (isValid) {
    next();
  } else {
    res.status(403).send("로그인 필요");
  }
};
```

<br>

`isAdmin` 미들웨어가 필요한 경로에 아래와 같이 미들웨어를 포함하여 라우터를 작성하면 된다.

```javascript
//  routes/admin.js
const express = require("express");
const router = express.Router();
const { isAdmin } = require("./middleware");
const admin = require("../controllers/admin");

router.get("/checkAuth", isAdmin, (req, res) => {
  res.status(201).send("logged in");
});

module.exports = router;
```

<br>
