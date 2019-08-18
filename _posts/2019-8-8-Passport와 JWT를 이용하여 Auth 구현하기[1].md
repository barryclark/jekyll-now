---
layout: post
title: Passport와 JWT를 이용하여 Auth 구현하기[1]
date: 2019-08-08
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
- [Passport와 JWT를 이용하여 Auth 구현하기[4]](/study/rnative/Passport와-JWT를-이용하여-Auth-구현하기-4/) - (server) JWT 유효성 검사

## 자체 회원가입, 로그인 및 JWT

### Passport 설치

Passport는 각 SNS별 로그인 기능을 패키지화해서 제공하므로, `passport`와 원하는 패키지를 설치해 주면 되는데, 이번 포스팅은 local 로그인에 관한 내용을 다룰 것이므로, `passport`와 `passport-local`을 설치한다. 또한, JWT 구현을 위해 `jsonwebtoken`도 설치한다.

```bash
$ yarn add passport passport-local jsonwebtoken
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

먼저, 자체 회원가입과 로그인 API는 다음과 같다.

| 메서드 |   엔드포인트    |   역할   |
| :----: | :-------------: | :------: |
|  POST  | `/users/signup` | 회원가입 |
|  POST  | `/users/signin` |  로그인  |

```javascript
const router = express.Router();
const controllers = require("../controllers");

router.post("/signup", controllers.users.signup.post);
router.post("/signin", controllers.users.signin.post);

module.exports = router;
```

### users 컨트롤러 작성

passport 미들웨어는 `passport.authenticate(passport 미들웨어 이름, callback)`를 통해 사용한다. passport 미들웨어 실행결과 `(err, user, info*)`가 callback 함수로 넘어오기 때문에, 어떤 작업을 수행할지 정의해주면 된다.

또한, session을 사용하지 않는 경우, `{ session: false }`를 `passport.authenticate()`의 인자로 넘겨주어야 한다. signin 시, "local_login"이라는 패스포트 미들웨어를 통해 유효한 유저인지 확인이 되고 나면, token을 생성하여 client로 보내주는 코드를 추가하였다.

```javascript
const jwt = require("jsonwebtoken");

module.exports = {
  signup: {
    post: async (req, res, next) => {
      passport.authenticate(
        "register",
        { session: false },
        (err, user, info) => {
          if (err) {
            res.status(400);
          } else if (!user) {
            res.status(200).send("이미 가입된 이메일입니다.");
          } else {
            res.status(200).send("정상적으로 회원가입 되었습니다.");
          }
        }
      )(req, res, next);
    }
  },
  signin: {
    post: async (req, res, next) => {
      passport.authenticate(
        "local_login",
        { session: false },
        (err, user, info) => {
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
            const token = jwt.sign({ id: user.email }, process.env.JWT_SECRET);
            return res.status(200).json({ userToken: token, success: true });
          });
        }
      )(req, res);
    }
  }
};
```

### module 폴더 내 passport.js 작성

module 디렉토리를 만들고, passport.js 파일을 만든다.

기본적으로 `passport.use(미들웨어 이름, Strategy)` 형태로 작성해주면 되는데, local 계정으로 회원가입과 로그인 하는 미들웨어를 작성하고 있기 때문에, `new LocalStrategy()`를 사용한다. passport의 LocalStrategy는 `usernameField` `email`를 사용하기 때문에 `req`에 담겨온 추가적인 정보를 미들웨어 내에서 사용하고 싶다면 `passReqToCallback: true`라는 속성을 추가해 준다.

회원가입 시, 비밀번호를 암호화하여 저장하였기 때문에, 저장된 암호화된 비밀번호와, 입력된 비밀번호의 암호화 값이 같은지를 확인하는 내용을 추가하였다.

```javascript
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
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

<br>
<span class="reference">관련 post</span>

- [Passport와 JWT를 이용하여 Auth 구현하기[2]](/study/nodejs/Passport와-JWT를-이용하여-Auth-구현하기-2/)
- [Passport와 JWT를 이용하여 Auth 구현하기[3]](/study/rnative/Passport와-JWT를-이용하여-Auth-구현하기-3/)
- [Passport와 JWT를 이용하여 Auth 구현하기[4]](/study/rnative/Passport와-JWT를-이용하여-Auth-구현하기-4/)
