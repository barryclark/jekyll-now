---
layout: post
title: 2019-7-18-Sequelize와 MySQL 연결하기
date: 2019-07-18
comments: true
categories: [Study, nodejs]
tags: [NodeJs, Sequelize, MySQL]
excerpt: Sequelize는 MySQL의 복잡한 문법을 간단하게 자바스크립트 형식으로 사용할 수 있도록 해주는 라이브러리이다.
---

[Sequelize](http://docs.sequelizejs.com/manual/)는 DB의 복잡한 문법을 간단하게 자바스크립트 객체 형식으로 사용할 수 있도록 해주는 ORM(Object-relational Mapping) 중 하나이다. 이번 포스트 에서는 Sequelize를 MySQL과 연결시키는 방법을 알아보겠다.

### Sequelize와 필요 패키지 설치

```bash
$ yarn add sequelize mysql2
$ yarn global add sequelize-cli
$ yarn sequelize init
```

`sequelize init`을 하고나면 프로젝트의 루트디렉토리에 config, migrations, models, seeders 폴더가 생성된다.
