---
layout: post
title: Submodule
---

## 서브모듈
[서브모듈](https://git-scm.com/book/ko/v2/Git-%EB%8F%84%EA%B5%AC-%EC%84%9C%EB%B8%8C%EB%AA%A8%EB%93%88)

프로젝트를 수행하다 보면 다른 프로젝트를 함께 사용해야 하는 경우에 사용합니다. 즉 두 프로젝트를 서로 별개로 다루면서도 그 중 하나를 다른 하나안에서 사용할 수 있어야 합니다.
Git의 서브모듈은 이런 문제를 다루는 도구입니다. Git저장소 안에 다른 Git저장소를 디렉토리로 분리해 넣는 것을 서브모듈이라고 합니다.

## 서브모듈 시작하기
```& git submodule add <repository> [path]```를 이용해서 서브모듈을 추가할 수 있습니다. path는 생략 가능하며 생략 시 리파지터리 이름과 동일한 디렉토리를 사용합니다.

```
$ git submodule [--quiet] add [-b <branch>] [-f|--force] [--name <name>] [--reference <repository>] [--] <repository> [<path>]

```

본 문서는 Git Notes for Professionals (라이센스:CC-BY-SA) 를 한글로 번역한 문서입니다. 번역상 오류가 있을 수 있으므로 정확한 내용은 원본 문서를 참고하세요.
Section 9.2: submodule 갱신 (update) 하기
submodule 은 다른 저장소의 특정 커밋을 참조하게 되어있다. 모든 submodule 들에 대해 참조 중인 상태로의 checkout 을 수행하려면, 다음과 같은 명령어를 이용한다.

git submodule update --recursive
가끔씩은 submodule 이 참조 중인 상태를 이용하기보다 원격 저장소에서 가장 최신 상태를 update 해오고 싶을때가 있다. 하나의 명령어를 사용하여 모든 submodule 을 원격 저장소의 가장 최신 상태로 update 하려면 아래와 같이 수행한다.

git submodule foreach git pull <remote> <branch>
혹은, git pull 의 기본 인자를 사용할 수 있다

git submodule foreach git pull
유의할 점은, 위 명령어들은 사용자의 로컬 작업본만을 갱신할 것이라는 점이다. 만약 submodule 디렉토리의 내용이 이 명령으로 인해 변경되었다면, git status 명령으로 확인 시 수정된 것으로 (dirty) 표시될 것이다. 사용자의 저장소에서 새로운 상태를 참조하도록 업데이트 하려면, 현재의 변경사항을 커밋하는 작업이 필요하다:

git add <submodule_directory>
git commit
사용자 저장소의 변경 사항이 git pull 을 수행했을 때 merge conflict 을 유발하는 경우가 종종 있으므로, 많은 경우에 conflict 의 가능성을 줄여주는 git pull --rebase 를 통해 사용자의 변경사항이 가장 최신 커밋 이후에 반영되도록 한다.

git submodule foreach git pull --rebase
하나의 특정 submodule 에 대해서만 최신 상태로 update 하기 위해서는 아래와 같은 명령어를 수행할 수 있다:

git submodule update --remote <submodule_directory>