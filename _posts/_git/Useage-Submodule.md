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