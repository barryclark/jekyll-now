---
layout: post
title: Passport와 JWT를 이용하여 Auth 구현하기[4]
date: 2019-08-15
comments: true
categories: [Study, nodejs]
tags: [NodeJs, Passport, JWT, Middleware]
excerpt: 이전 포스팅에서 Express.js 환경에서 passport를 사용하여 자체회원 및 소셜회원의 회원가입과 로그인, 그리고 리액트 네이티브에서의 소셜로그인을 구현해 보았다. 이제 남은 것은 로그인 시 발급받은 토큰으로 로그인 상태를 유지하는 미들웨어를 구현하는 것이다.
---

이전 포스팅에서 Express.js 환경에서 passport를 사용하여 자체회원 및 소셜회원의 회원가입과 로그인, 그리고 리액트 네이티브에서의 소셜로그인을 구현해 보았다. 이제 남은 것은 로그인 시 발급받은 토큰으로 로그인 상태를 유지하는 미들웨어를 구현하는 것이다.

로그인 한 유저만 사용할 수 있는 기능의 경우, 클라이언트는 서버에 보내는 요청에 로그인 시 발급받은 토큰을 가지고 온다. 서버는 이 토큰의 유효성을 검사하여 요청에 대한 응답을 하게 되는데, 이 때, passport의 `JWTStrategy`를 사용할 수 있다.

## JWT 유효성 검사 (IsLoggedIn 미들웨어 구현)

### Passport 설치

모든 과정의 시작단계, 패키지 설치! `JWTStrategy` 사용을 위해 `Jpassport-jwt`를 설치한다.

```bash
yarn add passport-jwt
```

### module 폴더 내 passport.js 작성

module/passport.js 파일에 토큰의 유효성을 검사하는 미들웨어를 작성한다. 설치된 패키지에서 `JWTStrategy`와 요청에서 토큰을 추출하는 `ExtractJWT` 모듈을 import 한다.

토큰 추출과 디코딩을 위해 요청(`req`)에 토큰이 어떤 형식으로 전달하고 있는지와, 만들때 사용했던 secret을 `JWTStrategy`의 인자로 넘겨주어야 한다.
이 프로젝트에서는 요청 헤더의 `Authorization`의 값으로 토큰을 `Bearer xxxxx(token)` 형식으로 담아서 보내기 때문에 `fromAuthHeaderAsBearerToken`을 사용했지만, 이 외에도 다양한 방법을 지원한다. (참고: [Extracting the JWT from the request](https://github.com/mikenicholson/passport-jwt#extracting-the-jwt-from-the-request))

지난 포스트에서 토큰을 생성할 때 `{id: email or social_id}`를 `payload` 설정했으므로, 디코딩된 페이로드의 id가 서버에 존재하는 유저 id인지를 확인하는 과정을 거치면 유효성 검사가 끝난다.

```javascript
const passportJWT = require("passport-jwt"),
  JWTStrategy = passportJWT.Strategy,
  ExtractJWT = passportJWT.ExtractJwt;

const jwtOpts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(
  "jwt",
  new JWTStrategy(jwtOpts, (jwtPayload, cb) => {
    return Users.findOne({
      where: {
        [Op.or]: [{ email: jwtPayload.id }, { social_id: jwtPayload.id }]
      }
    })
      .then(user => {
        if (user) {
          return cb(null, user);
        } else {
          return cb(err, false);
        }
      })
      .catch(err => {
        return cb(err, false);
      });
  })
);
```

### IsLoggedIn 미들웨어 작성

이제, 로그인한 유저를 판별하는 `IsLoggedIn` 미들웨어를 작성해 보자. module/middleware.js 라는 파일을 만들어 위에서 작성한 `JWTStrategy`의 콜백으로, 유효한 user라면 `req.user`에 user 정보를 담아 다음 미들웨어 혹은 라우터에서 사용할 수 있도록 하고, user 정보가 없다면 응답으로 에러메시지를 보낸다.

```javascript
const passport = require("passport");

exports.isLoggedIn = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(403).send("로그인 필요");
    }
  })(req, res, next);
};
```

### app.js에서 IsLoggedIn 미들웨어 적용

app.js 파일에 작성한 `IsLoggedIn` 미들웨어를 import 해오고, 로그인이 필요한 라우터에 적용시키면 끝!!!

```javascript
...
const { isLoggedIn } = require("./module/middleware");
...
app.use("/category", isLoggedIn, categoryRouter);
...
```

<br>
<span class="reference">관련 post</span>

- [Passport와 JWT를 이용하여 Auth 구현하기[1]](/study/nodejs/Passport와-JWT를-이용하여-Auth-구현하기-1/)
- [Passport와 JWT를 이용하여 Auth 구현하기[2]](/study/nodejs/Passport와-JWT를-이용하여-Auth-구현하기-2/)
- [Passport와 JWT를 이용하여 Auth 구현하기[3]](/study/rnative/Passport와-JWT를-이용하여-Auth-구현하기-3/)
