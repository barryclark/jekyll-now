---
layout: post
title: 【TIP】구글 드라이브로 우회해서 oracle jdk 파일 받기
subject: blog
category: tip
author: junseo.park
subtitle: wget으로 oracle JDK를 쉽게 받아보자
---

아직은 Open JDK보다 Oracle JDK가 더 필요하다보니 Linux (필자는 Naver Cloud Platform & AWS server를 이용중이다.) 에 Oracle JDK Binary Source를 다운로드하는 일이 잦다.

아마 wget이나 curl을 통해서 tar.gz 파일 (또는 rpm 파일)을 직접 받는걸 시도해본 분들은 다들 봤을 문구가 필자를 너무 화나게 했다.

분명 시작은 이럴 것이다.

`wget https://download.oracle.com/otn/java/jdk/8u231-b11/...`

HTTP request가 요청되고 connected가 이어지지만 결국 나오는 결과는

`Authorized failed.`


아무리 login을 하거나

```bash
--no-check-certificate --no-cookies --header "Cookie:oraclelicense=accept-securebackup-cookie"
```

이런 header를 추가해줘도 쉽사리 Download 되지는 않았다.

(필자가 실력이 없어서 그럴수도 있지만...)


저 Authorized failed 라는 문구를 피하기 위해서 머리를 굴리기 시작했다.

그러다 문득 떠오른 한 곳.

## GOOGLE DRIVE!

windows 환경에서 tar.gz를 직접 다운로드하는 것? **[EASY]**<br>
google drive에 파일을 업로드하는 것? **[EASY]**<br>
linux wget으로 google drive에 access하는 것? **[EASY]**

-> 그럼 이렇게 우회하자!!


1. 구글 드라이브에 jdk tar.gz 압축파일을 업로드한다.
2. 압축파일을 '공유하기' 하여 전체공개 상태의 URL을 받는다.
3. `https://drive.google.com/file/d/<FILEID>/view?usp=sharing`
4. 3번의 FILEID 위치의 해시값을 기억하자. 뒤에 쓰일 FILEID 값이다.
5. wget으로 해당 파일을 원하는 linux server에 다운로드 한다

```bash
wget --load-cookies /tmp/cookies.txt \
"https://docs.google.com/uc?export=download&confirm=$( \
wget --quiet --save-cookies /tmp/cookies.txt \
--keep-session-cookies --no-check-certificate \
'https://docs.google.com/uc?export=download&id=FILEID'  \
-O- | sed -rn 's/.*confirm=([0-9A-Za-z_]+).*/\1\n/p')&id=FILEID" \
 -O FILENAME && rm -rf /tmp/cookies.txt

FILENAME : 다운받을 파일의 이름을 임의로 정해주면 된다
FILEID : 구글 드라이브에 업로드한 파일의 ID값
```

위 명령어에 FILENAME과 FILEID를 적절히 입력해주고 명령어를 입력하면
편하게, 아주 편하게 oracle JDK Binary source를 얻을 수 있다.