---
layout: post
title: 젠킨스 사용하여 자동 배포환경 만들기!
subtitle: 푸시-빌드-전송-배포가 지겹다! 이젠 자동으로 하고싶다!하여 만들었습니다.
category: zuminternet
author: 권용근
nickname: kingbbode
tag: [jenkins, ci, deploy]
---


젠킨스 사용하여 자동 배포환경 만들기!
---------------------------

(Git으로 형상관리가 되고 있는 Gradle 프로젝트를 기준으로 이 글이 작성되었습니다.)

개발환경과 어플리케이션 서버가 분리되어 있고, 여러 원격 서버를 가지고 있는 구성에서 어플리케이션을 배포하기는 굉장히 까다롭습니다.

## 현재 상황

- Gitlab으로 형상관리
- 작업망과 개발망 분리(대략 개발하는 PC에서부터 각 어플리케이션 서버까지 3~4 Depth로 망 분리)
- Spring Framework
- Gradle or Maven Project

## 구시대적 배포(?)!

제가 겪어본 환경 기준으로 원시적인 배포 방법을 먼저 살펴보겠습니다. (자세한 git flow나 서버 환경은 생략)

1.	수정된 사항을 Git에 feature 브랜치에 **Push** 합니다.
2.	로컬 환경에서 프로젝트를 **빌드** 합니다.
3.	빌드 완료된 추출물(jar 또는 war)를 테스트 서버로 **전송** 합니다.
4.	배포 스크립트를 통해 **배포** 합니다.
5.	테스트를 진행합니다.(수정 사항이 있다면 1~5 반복)
6.	테스트 완료된 버전을 release 브랜치에 **Push** 합니다.
7.	버저닝 후 로컬 환경에서 프로젝트를 **빌드** 합니다.
8.	다시 빌드 완료된 추출물을 중앙 관리 서버로 **전송** 합니다.
9.	중앙 배포 스크립트를 실행하여 QA 서버로 복사 및 **배포** 합니다.
10.	QA가 진행됩니다.(수정사항이 있다면 6~10 반복)
11.	중앙 배포 스크립트를 실행하여 Product로 복사 및 **배포** 합니다.(무중단 배포 포함)

자세한 과정은 거의 생략하였고 빌드나 원격 서버로 전송 등을 중점으로 기술하였습니다. 위 과정을 보면 `푸시-빌드-전송-배포 과정`이 굉장히 많습니다. 반복적인 과정이 많습니다.

![new Item](../../../images/2017/2017-05-10-JENKINS-BUILD/ang.png)

### 문제점

**배포 flow 및 history**

현재 진행되고 있는 배포의 진행사항을 내가 직접 말로 해야만 한다. 나 또한 헛갈릴 수 있다.

누가 언제 배포했고, 어떤 이슈가 있었는지를 수기로 작성하여 확인해야 한다. 즉, 굉장히 귀찬고 속이기 쉬운 환경이다.

**개발 환경**

로컬에서 빌드가 되기 때문에 다른 사람이 코드를 한 글자라도 수정하여 배포하려면 해당 프로젝트에 맞는 개발 환경을 셋팅해야만 한다.

**테스트**

통합 테스트를 진행함에 로컬 환경을 믿을 수 있을까?

**귀찮다**

푸시-빌드-전송-배포를 계속해야 한다. 정말 귀찮다. 언급하지 않았지만 원격 서버로 빌드 추출물을 복사하는 depth가 굉장히 깊은 환경이 있다.

![new Item](../../../images/2017/2017-05-10-JENKINS-BUILD/ang2.png)

**그래서 저는 배포 자동화를 해보려 했습니다**

---

## Jenkins로 자동 배포 환경 만들기

Jenkins에 대한 설명은 굉장히 많기 때문에 생략하겠습니다.

일단 Jenkins를 올려야하고, Git과 연동이 필요합니다. 이에 대해서도 잘 정리된

**창천향로님의 [docker를 활용한 CI 구축 연습하기(젠킨스,슬랙)](http://jojoldu.tistory.com/139)를**

추천하여 대신합니다.

젠킨스의 배포 플로우를 중심으로 이 글을 작성하며 **지극히 개인적으로 생각하여 진행한 플로우이기에 피드백을 기대합니다.**

### 주 사용 Jenkins 기능 및 플로그인

-	Build Pipeline Plugin

	-	쉽게 말하면 Job들 간에 관계를 제공합니다. Job 간의 순서와 트리거 기능을 제공합니다.

-	Parameterized Trigger Plugin

	-	Build Pipeline Plugin에 종속성을 가지고 있는 플러그인으로, 트리거에 Parameter를 보낼 수 있는 기능을 제공합니다.

-	dashboard-view

	-	Build Pipeline Plugin에 종속성을 가지고 있는 플러그인으로 연관 관계가 있는 Job들 간의 Dashboard를 제공합니다.

-	Parameterized Build

	-	Parameter를 사용하여 빌드할 수 있는 환경을 제공합니다.

### Step 1. 프로젝트 Job 생성

각 프로젝트를 빌드하는 Job이 필요합니다. `new Item`을 클릭한 후

![new Item](../../../images/2017/2017-05-10-JENKINS-BUILD/newItem.png)

`freestyle project`를 생성합니다.

![freestyle project](../../../images/2017/2017-05-10-JENKINS-BUILD/freestyle.png)

<br>

#### git 특정 브랜치와 Trigger 연동

**1. `Build Triggers`의`Build when a change is pushed to Git`을 선택합니다.**

![freestyle project](../../../images/2017/2017-05-10-JENKINS-BUILD/git1.png)

**2. `Allowed brances`에 `Filter branches by regex`를 선택하고 정규식을 사용하여 Trigger되는 브랜치와 연동합니다. 저 같은 경우는 모든 feature 하위 브랜치를 대상으로 했습니다.**

![freestyle project](../../../images/2017/2017-05-10-JENKINS-BUILD/git2.png)

**3. `Source Code Management`에서는 `Brances to build`에 feature 하위 브랜치를 빌드하도록 설정합니다.**

![freestyle project](../../../images/2017/2017-05-10-JENKINS-BUILD/git.png)

#### Build

저 같은 경우는 `Invoke Gradle script`를 사용하여 Gradle Version을 지정해주고, Task 및 Build File을 지정해주었습니다. Wrapper를 사용하여 다른 방법으로 빌드해도 상관없습니다. 각 프로젝트에 맞는 Build 설정을 합니다.

![freestyle project](../../../images/2017/2017-05-10-JENKINS-BUILD/build.png)

**이 과정까지는 여느 일반 젠킨스 사용과 같습니다.**

### Step 2. 공용 Job 생성

공용 Job이란 빌드 후 진행될 과정에 대한 `Job`을 말합니다.

제 기준으로 작성하자면

-	빌드 추출물을 중앙 원격 서버로 전송하는 `scp` Job
-	중앙 원격 서버의 배포스크립트를 실행하는 `deploy` Job

위 2가지 Job을 만드려고 합니다. 빌드 후에 진행되는 과정이 동일하기 때문에 가능한 구성입니다.

**공용 Job이지만, 전송해야할 파일이 다르고 배포해야할 원격 서버가 다를텐데 어떻게라고 생각하실 수 있습니다.**

이 때 유용한 기능이 Jenkins의 `Parameterized` 기능입니다. 

**다음 Job으로 Parameter를 넘길수도 있고, 현재 Job에서 사용될 Parameter를 정의할 수도 있습니다. 즉 재사용이 가능하다는!**

#### 공통

**1. Job을 생성하는 방법은 기존과 같이 생성을 합니다.**

**2. `This project is parameterized`를 선택하여 이 프로젝트가 파라미터를 사용하는 Job임을 체크하고, 해당 작업에서 사용할 파라미터를 정의합니다.(여기서 정의되는 파라미터는 이전 Job을 통해 값을 주입받을 수 있습니다.)**

![freestyle project](../../../images/2017/2017-05-10-JENKINS-BUILD/thisproject.png)

**3. 공용 Job은 Git과 무관하므로 `Source Code Management`를 `None`으로 체크합니다.**

#### Scp Job

Scp Job은 빌드 추출물을 중앙 원격 서버로 전송하는 역할을 하게 됩니다.

`This project is parameterized`의 Add Parameter를 사용하여 이 Job에서 필요한 파라미터를 정의합니다.

저는 Scp를 위해 필요한 정보를

-	어느 위치에 있는 war 파일인지 알려주는 `TARGET`
-	원격 서버의 어떤 경로로 전송해야 하는지 알려주는 `REMOTE_PATH`

로 생각하였습니다.

**1. 사용할 파라미터 정의**

![freestyle project](../../../images/2017/2017-05-10-JENKINS-BUILD/paramsetting.png)

**2. 파라미터를 사용하는 `Execute shell Build Step` 작성**

![freestyle project](../../../images/2017/2017-05-10-JENKINS-BUILD/scpshell.png)

저는 Scp JOB이 끝난 후에는 다음에 설명할 Deploy JOB을 자동 진행시키려고 합니다. Deploy Job에서도 아마 Job을 구동시키기 위한 정보가 필요할 것 입니다. 이 때 사용할 것이 `Trigger parameterized build on other projects` 기능 입니다.

**3. Post-build Actions에 `Trigger parameterized build on other projects` Step을 추가합니다. `Predefined parameters`에 다음과 같이 넘길 파라미터를 작성해줍니다. 이 때 넘겨받은 파라미터를 그대로 사용 가능합니다. Trigger를 위해 필요한 파라미터도 최초 Job에게 받을 수 있도록 `This project is parameterized`의 Add Parameter를 통해 작성합니다.**

![freestyle project](../../../images/2017/2017-05-10-JENKINS-BUILD/trigscp.png)

**다음 단계 자동 진행이 아닌 Dashboard를 통한 수동 진행을 하려면, `Trigger parameterized build on other projects` 대신 Build other projects (manual step)을 사용하면 됩니다.**

![freestyle project](../../../images/2017/2017-05-10-JENKINS-BUILD/manual.png)

#### Deploy Job

Deploy Job은 중앙 원격 서버의 배포 스크립트를 실행하는 역할을 합니다. 이 배포 스크립트는 argument로 config 파일을 받아 특정 서버로 배포를 하도록 되어있습니다.

여기에서는 필요한 정보를, 배포 스크립트에서 사용될 argument를 알려주는 `CONFIG`로 생각하였습니다.

작성 과정은 Scp Job과 같습니다.

**1. 사용할 파라미터 정의**

![freestyle project](../../../images/2017/2017-05-10-JENKINS-BUILD/deployparam1.png)

**2. 파라미터를 사용하는 `Execute shell Build Step` 작성**

![freestyle project](../../../images/2017/2017-05-10-JENKINS-BUILD/deployshell.png)

### Step 3. 프로젝트 Job에 Scp Job 연동

Scp Job과 Deploy Job을 연동할 때 사용했던 `Post-build Actions`의 `Trigger parameterized build on other projects` Step을 사용하여 Scp Job과 연동합니다.

Scp Job에서 필요한 `TARGET`, `REMOTE_PATH` 파라미터와 Deploy Job에서 필요한 `CONFIG` 파리미터가 필요합니다.

Jenkins는 각 빌드 환경에서 사용할 수 있는 변수를 제공합니다. [Jenkins Wiki](https://wiki.jenkins-ci.org/display/JENKINS/Building+a+software+project)에서 `Jenkins Set Environment Variables`를 참고하면 됩니다.

`TARGET` 파라미터에서는 `${WORKSPACE}` 변수를 사용하였고 그 외 설정 값은 필요한 내용을 작성하였습니다.

![freestyle project](../../../images/2017/2017-05-10-JENKINS-BUILD/trigpc.png)

### Dashboard

여기까지 구성했다면 아마 아래와 같이 Dashboard가 생성될 것 입니다!

![freestyle project](../../../images/2017/2017-05-10-JENKINS-BUILD/dashboard.png)

빌드 히스토리를 볼 수 있고, 각 Job에서 실행된 내용을 Console로 Live 확인이 가능하며, 수동 빌드를 선택했다면 진행 버튼을 통해 다음 단계를 진행 시킬 수 있습니다.

## 마무리

이렇게 해서 Git의 특정 브랜치에 Push를 했을 때 자동으로 원격 서버까지 배포하는 과정을 만들어 보았습니다.

아래는 제가 만든 챗봇과 연동한 빌드 과정!

![freestyle project](../../../images/2017/2017-05-10-JENKINS-BUILD/ultron.png)

다른 어느 곳도 벤치마킹하지 못했기때문에(정보가 없습니다ㅜㅜ) 제 마음대로 구성을 해보았습니다.
감사합니다.
