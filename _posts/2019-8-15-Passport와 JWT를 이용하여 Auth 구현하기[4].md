---
layout: post
title: Passport와 JWT를 이용하여 Auth 구현하기[4]
date: 2019-08-15
comments: true
categories: [Study, nodejs]
tags: [NodeJs, Passport, JWT]
excerpt: 요즘은 대부분의 서비스가 자체 사이트 회원가입과 로그인 뿐만 아니라 구글, 페이스북 등 기존 유저가 가지고 있던 어카운트를 활용하여 로그인 하는 소셜로그인 서비스를 제공한다.
---

요즘은 대부분의 서비스가 자체 사이트 회원가입과 로그인 뿐만 아니라 구글, 페이스북 등 기존 유저가 가지고 있던 어카운트를 활용하여 로그인 하는 소셜로그인 서비스를 제공한다. 한 가지의 소셜 로그인만 제공을 한다면 해당 SNS에서 제공하는 API를 사용하면 되겠지만, 여러가지 로그인 방법을 앱에 탑재하고 싶다면 **[Passport 모듈](https://github.com/jaredhanson/passport)을 활용**하는것이 좋다.

Passport 모듈은 다양한 인증 API를 간편하게 구현할 수 있도록 하는 모듈로, user 정보를 session에 저장한다. 하지만 JWT을 사용하는 동시에 session을 사용하는 것은 불필요한 작업이다. 다행히도 Passport는 사용자 정보를 session에 저장하는 대신 request에 저장할 수 있는 기능을 제공하고 있다.

**Express.js, passport, JWT, 그리고 React Native로 회원가입과 로그인을 구현하는 방법**이자, 삽질의 결과를 아래와 같은 시리즈로 포스팅 하겠다.

- [Passport와 JWT를 이용하여 Auth 구현하기[1]](/study/nodejs/Passport와-JWT를-이용하여-Auth-구현하기-1/) - (server) 자체 회원가입, 로그인 및 JWT
- [Passport와 JWT를 이용하여 Auth 구현하기[2]](/study/nodejs/Passport와-JWT를-이용하여-Auth-구현하기-2/) - (server) 소셜로그인
- [Passport와 JWT를 이용하여 Auth 구현하기[3]](/study/rnative/Passport와-JWT를-이용하여-Auth-구현하기-3/) - (client) 소셜로그인
- [Passport와 JWT를 이용하여 Auth 구현하기[3]](/study/rnative/Passport와-JWT를-이용하여-Auth-구현하기-3/) - (client) 소셜로그인

## 자체 회원가입, 로그인 및 JWT

### Passport 설치

Passport는 각 SNS별 로그인 기능을 패키지화해서 제공하므로, `passport`와 원하는 패키지를 설치해 주면 되는데, 이번 포스팅은 local 로그인에 관한 내용을 다룰 것이므로, `passport`와 `passport-local`을 설치한다. 또한, JWT 구현을 위해 `passport-jwt`와 `jsonwebtoken`도 설치한다.

```bash
$ yarn add passport passport-local passport-jwt jsonwebtoken
```

### app.js 작성

app.js 파일에 작성할 passport 모듈을 import하고, `/users` 라우터를 작성한다.
'

```javascript
...
require("./module/passport");
...

app.use("/users", usersRouter);

module.exports = app;
```

### users 라우터 작성

`/users/signin` 엔드포인트로 로그인을 하도록 작성했다.
`passport.authenticate("local", )`을 통해 이전에 작성한 passport 미들웨어 중, 'local'에 해당하는 미들웨어를 사용할 수 있다.
로그인에 성공한다면, token을 형성하여 프론트 엔드로 userToken을 전달한다.

```javascript
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { Users } = require("../models");

router.post("/signin", function(req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(400);
    }
    if (!user) {
      return res.status(200).json({
        message: "로그인에 실패했습니다.",
        success: false
      });
    }
    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign(user.email, `${process.env.JWT_SECRET}`);
      return res.json({ userToken: token, success: true });
    });
  })(req, res);
});
```

### module 폴더 내 passport.js 작성

module 디렉토리를 만들고, passport.js 파일을 만든다.
회원가입 시, 비밀번호를 암호화하여 저장하였기 때문에, 저장된 암호화된 비밀번호와, 입력된 비밀번호의 암호화 값이 같은지를 확인하는 내용을 추가하였다.

'local' 계정으로 로그인하는 로직을 작성하고 있기 때문에, `passport.use( "local", new LocalStrategy())`을 활용한다.

```javascript
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const { Users } = require("../models");
const crypto = require("crypto");

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "pw",
      passReqToCallback: true
    },
    (req, email, password, cb) => {
      try {
        Users.findOne({ where: { email } }).then(user => {
          if (user) {
            return cb(null, false, { message: "Already registered!" });
          } else {
            let encryptedPw = crypto
              .createHash("sha1")
              .update(password)
              .digest("hex");
            Users.create({
              name: req.body.name,
              email: email,
              pw: encryptedPw,
              provider: "local"
            }).then(user => {
              return cb(null, user, { message: "Successfully registered!" });
            });
          }
        });
      } catch (err) {
        cb(err, false);
      }
    }
  )
);

passport.use(
  "local_login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "pw"
    },
    function(email, password, cb) {
      let encryptedPw = crypto
        .createHash("sha1")
        .update(password)
        .digest("hex");

      return Users.findOne({ where: { email } })
        .then(user => {
          if (!user || user.dataValues.pw !== encryptedPw) {
            return cb(null, false, { message: "Incorrect email or password." });
          }
          return cb(null, user, { message: "Logged In Successfully" });
        })
        .catch(err => cb(err, false));
    }
  )
);
```
