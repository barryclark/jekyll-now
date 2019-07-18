---
layout: post
title: 2019-7-18-Sequelize와 MySQL 연결하기
date: 2019-07-18
comments: true
categories: [Study, nodejs]
tags: [NodeJs, Sequelize, MySQL]
excerpt: Sequelize는 MySQL의 복잡한 문법을 간단하게 자바스크립트 형식으로 사용할 수 있도록 해주는 라이브러리이다.
---

[Sequelize](http://docs.sequelizejs.com/manual/)는 DB의 복잡한 문법을 간단하게 자바스크립트 객체 형식으로 사용할 수 있도록 해주는 ORM(Object-relational Mapping) 중 하나이다. 이번 포스트 에서는 Sequelize를 MySQL db와 연결시키는 방법을 알아보겠다. **이미 db 내에 tables는 정의되어 있는 상황이다.**

### Sequelize와 필요 패키지 설치

```bash
$ yarn add sequelize mysql2
$ yarn global add sequelize-cli
$ yarn sequelize init
```

`sequelize init`을 하고나면 프로젝트의 루트디렉토리에 config, migrations, models, seeders 폴더가 생성된다.

### config.json 파일 수정하기

sequelize init으로 만들어진 config.json 파일을 프로젝트 db 정보에 맞춰 수정한다.
`"operatorsAliases": false`는 더이상 쓰이지 않으므로 삭제한다.

```json
{
"development": {
"username": [username],
"password": [password],
"database": [database name],
"host": [db server host],
"dialect": "mysql"
}
```

### MySQL 연결하기

app.js 파일에 아래 코드를 추가하여 Sequelize를 통해 익스프레스와 mysql을 연결한다.

```javascript
const sequelize = require("./models").sequelize;
sequelize.sync();
```

`sync` 메서드를 사용하면 서버 실행 시 자동적으로 MySQL과 연동된다.

### sequelize-auto를 사용하여 models 파일 만들기

db에 스키마가 정의되어 있지 않은 상황이라면, models에 손수 정의해주어야 하는데, 이미 MySQL db에 스키마가 정의되어 있는 상황이라면 `sequelize-auto` 모듈을 사용하여 간단하게 models 파일을 만들 수 있다.

먼저 `sequelize-auto`와 `mysql` 모듈을 설치한다.

```bash
$ yarn global add sequelize-auto
$ yarn global add mysql
```

그리고 아래 커맨드를 작성한다.

```bash
$ sequelize-auto -h [host] -d [database] -u [username] -x [password] -p [port]  --dialect [dialect] -o [/path/to/models] -C
```

그럼 자동적으로 db에 정의된 스키마에 따라 models폴더 내에 파일이 생성된다!

<br>
