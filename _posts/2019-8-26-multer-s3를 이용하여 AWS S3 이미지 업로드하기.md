---
layout: post
title: multer-s3를 이용하여 AWS S3 이미지 업로드하기
date: 2019-08-26
comments: true
categories: [Study, nodejs]
tags: [Express.js, Multer-S3, AWS]
excerpt: 이전 'multer 사용하여 이미지 업로드 구현하기' 포스팅 에서는 multer 모듈을 사용하여 클라이언트 쪽에서 보내온 이미지 파일을 서버의 특정 폴더 내에 저장하고, 그 저장 경로를 db에 저장하는 방법을 알아보았다.
---

이전 [multer 사용하여 이미지 업로드 구현하기](/study/nodejs/multer-사용하여-이미지-업로드-구현하기/) 포스팅 에서는 multer 모듈을 사용하여 클라이언트 쪽에서 보내온 이미지 파일을 서버의 특정 폴더 내에 저장하고, 그 저장 경로를 db에 저장하는 방법을 알아보았다. 이제 슬슬 배포를 준비하고 있기 때문에 이미지를 서버에 저장하는 것이 아니라 **AWS S3**에 저장하도록 코드를 수정해보려 한다.

## AWS S3 버킷 만들기

가장 먼저 해야할 일은 AWS S3 버킷을 만들고, 버킷에 접근하여 수정 작업을 진행할 수 있도록 자격증명을 얻어야 한다.

### S3 버킷 만들기

S3 버킷을 만드는데 주의할 점은, 아래 사진과 같이 '새 ACL을 통해 부여된 버킷 및 객체에 대한 퍼블릭 액세스 차단'과 '임의의 ACL을 통해 부여된 버킷 및 객체에 대한 퍼블릭 액세스 차단'을 풀어주어야 한다.
![S3 bucket setting](/images/s3_bucket_setting.png "S3 bucket setting")

또한, CORS 구성도 아래와 같이 편집해 주어야 한다.

```
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
  <CORSRule>
    <AllowedOrigin>*</AllowedOrigin>
    <AllowedMethod>POST</AllowedMethod>
    <AllowedMethod>GET</AllowedMethod>
    <AllowedMethod>PUT</AllowedMethod>
    <AllowedMethod>DELETE</AllowedMethod>
    <AllowedMethod>HEAD</AllowedMethod>
    <AllowedHeader>*</AllowedHeader>
  </CORSRule>
</CORSConfiguration>
```

### Cognito 자격증명 받기

버킷 생성이 끝났으면, [Amazon Cognito 콘솔](https://ap-northeast-2.console.aws.amazon.com/cognito/home?region=ap-northeast-2)에서 자격증명을 부여받아야 한다. '새 자격증명 풀'을 만드는데, '인증되지 않은 자격 증명에 대한 액세스 활성화'를 체크한 상태에서 풀을 생성해야 한다.
![AWS Cognito](/images/aws_cognito_pool.png "AWS Cognito")

또한, 다음 페이지에서 세부정보 숨기기를 펼치고 unauthenticated identities의 정책을 다음과 같이 편집해 준다. 여기서 BUCKET_NAME은 사용하고자 하는 S3 버킷 이름을 입력하면 된다.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:*"],
      "Resource": ["arn:aws:s3:::BUCKET_NAME/*"]
    }
  ]
}
```

<br>
여기까지 하면, 자격증명이 생성되고, 해당 자격증명의 대쉬보드 > 샘플코드에서 플랫폼에 따른 자격증명코드를 확인할 수 있다.
![AWS Cognito Code](/images/aws_cognito_code.png "AWS Cognito Code")

## multer-s3와 aws-sdk를 이용한 이미지 업로더 구현하기

먼저 필요한 모듈을 설치한다.

```bash
yarn add multer-s3 aws-sdk
```

### app.js에서 AWS 연결하기

이전 단계에서 부여받은 자격증명코드를 이용해 AWS에 연결한다.

```javascript
const AWS = require("aws-sdk");

AWS.config.region = process.env.PORT.AWS_CONFIG_REGION;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: process.env.PORT.AWS_CONFIG_IDENTITYPOOLID
});
```

### upload 모듈 만들기

upload 모듈을 만드는 방법은 [multer-s3 공식문서](https://github.com/badunk/multer-s3#readme)를 참고하면 된다.
`s3 = new aws.S3()`를 통해 s3를 정의해 주고, 사용할 BUCKET_NAME을 입력한다. `key`의 콜백함수를 이용하여 파일명을 설정해 준다. 여기선 원래의 파일명을 사용하기로 한다.

```javascript
var multer = require("multer");
var multerS3 = require("multer-s3");
var aws = require("aws-sdk");
const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: BUCKET_NAME, // 버킷 이름
    contentType: multerS3.AUTO_CONTENT_TYPE, // 자동을 콘텐츠 타입 세팅
    acl: "public-read", // 클라이언트에서 자유롭게 가용하기 위함
    key: (req, file, cb) => {
      console.log(file);
      cb(null, file.originalname);
    }
  })
  limits: { fileSize: 5 * 1024 * 1024 } // 용량 제한
});
```

### upload 라우터 작성하기

'uploadedImages'라는 이름으로 최대 5개의 파일을 보내올 것이기 때문에 아래와 같이 라우터를 작성한다. 하나의 파일만 업로드 한다면, `upload.single("uploadedImage")`을 사용한다. S3에 업로드가 되고 나면 `req.file` 혹은 `req.files`에 파일정보가 저장되며, `req.file.location`에서 url을 확인할 수 있다.

```javascript
router.post("/upload", upload.array("uploadedImages", 5), (req, res) => {
  try {
    console.log("file ::: ", req.files);
    for (let i = 0; i < req.file.length; i++) {
      console.log("image url ::: ", req.files[i].location);
    }
    res.status(201).send("success");
  } catch (err) {
    console.log(err);
    res.status(400).send("error");
  }
});
```
