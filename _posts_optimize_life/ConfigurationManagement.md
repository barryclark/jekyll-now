---
layout: post
title: Configuration management
---

## 형상 관리 (Configuration management, 구성 관리)

[Configuration management](https://en.wikipedia.org/wiki/Configuration_management)

형사 관리는 소프트웨어의 변경사항을 체계적으로 추적하고 통제하는 것으로, 형상 관리는 제품의 성능, 기능 및 물리적 속성과 요구 사항, 설계 및 운영 정보의 일관성을 전체 수명 기간 동안 설정하고 유지하기 위한 시스템 엔지니어링 프로세스입니다.

* 소프트웨어 개발에서 많이 쓰이지만, 문서의 변화와 변경에대한 기록, 추후에 동일한 변경이 필요한 경우 이에 대한 과거 변경 요인들을 확인하기 위해서도 많이 사용합니다.
* 소프트웨어 개발에서, 혼자 개발하는 경우에는 문서 변경과 같은 이력 조회로써 사용할 수 있지만, 여러 사람이 함께 개발하는 경우 이에 대한 내역 확인은 필수입니다. 버전을 확인하여 변경사항을 확인하고 이에 대해서 반영 및 수정하는 과정이 발생합니다.

<details><summary>버전 컨트롤(Version Control)</summary>
<div markdown="1">

* 프로젝트의 코드와 데이터의 백업입니다.   
* 팀 맴버와 프로젝트내 파일 공유를 위한 도구입니다.   
* 시간이 지남에 따라 어떻게 진화했는지 확인할 수 있는 타임 머신입니다.   
* QA수단이며 파일 변경 사항을 제출하면 변경 사항을 혹인할 수 있는 귀중한 기회입니다.   
* 컴퓨터에 로컬로 보관하거나 어딘가에 중앙 집중식 서버에 보관할 수 있습니다.   

* 모든 전문 프로젝트는 버전 컨트롤을 사용한다.   
* 모든 아마추어 프로젝트도 버전 컨트롤이 필요합니다.   
* 일회용 코드 외에는 없이 할 생각하면 안됩니다.   

* 버전 컨트롤을 위한 소프트웨어는 많습니다.   
* Git과 Perforce 등 Unreal Engine을 위한 많은 좋은 버전컨트롤이 존재합니다.   

</div></details>

<details><summary>Commit할 때 확인하기</summary>
<div markdown="1">

1. 적절한 단위로 나누었는지 확인한다.
2. 제목은 잘지었는지 확인한다.
3. 메시지는 충분히 설명하고 있는지 확인한다.

</div></details>

<details><summary>Pull request할 때 확인하기</summary>
<div markdown="1">

1. 더이상 작업할 내용이 없는지 확인한다.
2. 적절한 단위로 나눠져 있는지 확인한다.
3. request제목이 적절한지 확인한다.
4. 메세지가 정확한지 확인한다.

</div></details>

<details><summary>좋은 커밋 메세지 작성하기 위한 약속</summary>
<div markdown="1">

[좋은 git 커밋 메시지를 작성하기 위한 7가지 약속 (번역)](https://meetup.toast.com/posts/106   )

1. 제목과 본문을 빈 행으로 구분합니다.
2. 제목을 50글자 내로 제한합니다.
3. 제목 첫 글자는 대문자로 작성합니다.
4. 제목 끝에 마침표 넣지 않습니다.
5. 제목은 명령문으로 사용하며 과거형을 사용하지 않습니다.
6. 본문의 각 행은 72글자 내로 제한합니다.
7. 어떻게 보다는 무엇과 왜를 설명합니다.

</div></details>

<details><summary>좋은 커밋 시점</summary>
<div markdown="1">

정해진 방법은 없지만, 커밋을 자주 해야하는 질문들에 대해서 받은 내용입니다.

1. 어떤 기능에 대한 테스트가 끝났을 때, 보통 한 시간에 두 번 정도. 다섯번은 너무 많습니다.   
2. 기능에 기반해서 커밋을 해야지 시간을 정해서 커밋을 하면 안됩니다. 새로운 기능을 추가했을 때 기능이 커밋할 만 하거나, 작동하는 메소드를 추가했거나, 글씨를 수정했거나, 잘못된 파일 들여쓰기를 수정했거나 등등일 때 커밋해야 합니다. 커밋이 의미가 있다면 작은 것을 커밋하는 것은 전혀 잘못된점이 아닙니다. 의미 없는 커밋은 히스토리로 이슈를 추적하는데 있어서 읽기 어렵게 합니다.   
3. 새로운 테스트 케이스를 추가할 때, 테스트가 통과됐을 때, 변수 이름을 변경했을 때, 메소드를 삭제했을 때, 상태를 변경했을 때 등... 사실 커밋한 대상의 중요성은 중요하지 않습니다.  

</div></details>

## Git

- [ ] Git blame

[Github docs](https://docs.github.com/en), [Github skills](https://skills.github.com/)

깃은 모든 개발자들이 복사된 레포지터리를 가지고, 자신의 로컬 히스토리와 브런치 구조에서 작업합니다. 사용자는 작은 변경집합이 아닌 커밋을 공유해야 합니다. 깃은 레포지터리간의 전체 브런치를 공유할 수 있게 해줍니다.

* pull request를 통해서, 작은 변경을 하나의 큰 변경으로 바꿀 수 있습니다.

<details><summary>이해하기 위해 필요한 개념들</summary>
<div markdown="1">

|용어|의미|
|:-:|---|
|Repository|저장소를 의미하며, 저장소는 히스토리, 태그, 소스의 가지치기 혹은 branch에 따라 버전을 저장합니다. 저장소를 통해 작업자가 변경한 모든 히스토리를 확인 할 수 있습니다.|
|Working Tree|저장소를 어느 한 시점을 바라보는 작업자의 현재 시점입니다.|
|Staging Area|저장소에 커밋하기 전에 커밋을 준비하는 위치이다.|
|Commit|현재 변경된 작업 상태를 점검을 마치면 확정하고 저장소에 저장하는 작업입니다.|

|용어|의미|
|:-:|---|
|Head|현재 작업중인 Branch를 가리키는 것입니다.|
|Branch|독립적으로 어떤 작업을 진행하기 위한 개념입니다. 작업을 할때에 현재 상태를 복사하여 Branch에서 작업을 한 후에 완전하다 싶을때 Merge를 하여 작업을 합니다.|
|Merge|다른 Branch의 내용을 현재 Branch로 가져와 합치는 작업을 의미합니다.|

</div></details>

<details><summary>Git으로 작업하기</summary>
<div markdown="1">

1. 작성할 이슈를 선택한다.
2. branch를 따 작업한다.
3. pull request후 종료한다. 왜 풀리퀘스트를 이용해서 브런치를 관리해야 하는가? 더럽지 않게 하기 위해서이다.

</div></details>

<details><summary>GIT 브랜치 전략</summary>
<div markdown="1">

브랜치 전략이란 **여러 개발자가 하나의 저장소를 사용하는 환경에서 저장소를 효과적으로 활용하기 위한 work-flow입니다.** 브랜치의 생성, 삭제, 병합 등 git의 유연한 구조를 활용해서, 각 개발자들의 혼란을 최대한 줄이며 다양한 방식으로 소스를 관리하는 역할을 합니다. **즉, 브랜치 생성에 규칙을 만들어서 협업을 유연하게 하는 방법론을 말합니다.**

브랜치 전략이 없을 때, 다음과 같은 질문이 생길 수 있습니다.
* 어떤 브랜치가 최신 브랜치인가?
* 어떤 브랜치를 끌어와서 개발을 시작해야 하나?
* 어디에 Push를 보내야 하나?
* 핫픽스를 해야하는데 어떤 브랜치를 기준으로 수정해야하나?
* 배포 버전은 어떤 걸 골라야하지?

</div></details>

<details><summary>GIT-FLOW 전략</summary>
<div markdown="1">

**Git-flow 브랜치 구조**

![Git-flow](https://images.prismic.io/clubhouse/e02ba62c-26e6-4250-acff-1b2c93ecc789_image-32.png?ixlib=gatsbyFP&auto=compress%2Cformat&fit=max&q=50&rect=0%2C0%2C905%2C380&w=905&h=380)

|용어|설명|
|:-:|---|
|master|메인 브랜치로 라이브 서버에 제품으로 출시되는 브랜치입니다.|
|develop|메인 브랜치로 다음 출시 버전을 대비하여 개발하는 브랜치입니다. <br> 즉 develop 브랜치는 통합 브랜치의 역할을 하며, 평소에는 이 븐래치를 기반으로 개발을 진행합니다. develop 브랜치에는 기존에 잘 작동하는 개발코드가 담겨있습니다.|
|feature|보조 브랜치로 추가 기능 개발 브랜치로 develop 브랜치에 들어갑니다. <br> mevelop 브랜치에서 다시 feature 브랜치를 나눠 작업을 하는 브랜치입니다. 새로 변경될 코드를 분리하고 각각 보존하는 역할을 합니다. 보조 브랜치는 기능을 다 완성할 때까지 유지하고, 다 완성되면 develop 브랜치로 merge하고, 결과고 좋지 않다면 버리는 방향을 취합니다. <br> 보조 브랜치는 보통 개발자 저장소에만 있는 브랜치입니다.|
|release|다음 버전 출시를 준비하는 브랜치 입니다. 배포를 위한 최종적인 버그 수정 등의 개발을 수행하는 브랜치를 말합니다. <br> develop 브랜치를 release 브랜치로 옮긴 후 QA, 테스트를 진행합니다. 배포 가능한 상태가 되면 master 브랜치로 합칩니다. 이때 출시된 master 브랜치에 버전 태그(ex, v1.0, v2.0)를 추가합니다. <br> release 브랜치에서 기능을 점검하며 발견한 버그 수정 사항은 develop 브랜치에도 적용해줘야 합니다. 그러므로 배포 완료 후 develop 브랜치에 대해서도 merge 작업을 수행해야 합니다.|
|hotfix|master 브랜치에서 발생한 버그를 수정하는 브랜치입니다. 배포한 버전에서 긴급하게 수정할 필요가 있을 때 master 브랜치에서 분리하는 브랜치를 말합니다.|

보통 master와 develop가 많이 사용되며, 정상적인 프로젝트를 진행하기 위해서는 둘 모두를 운용해야 합니다.feature, release, hotfix branch는 사용하지 않는다면 지우더라도 오류가 발생하지 않기 때문에 깔끔한 프로젝트 진행을 원한다면 지워뒀다가 해당 가지를 활용해야 할 상황에 만들어도 괜찮습니다.

* 신규 기능 개발시, 개발자는 develop 브랜치로부터 본인이 신규 개발할 기능을 위한 feature 브랜치를 생성합니다. feature 브랜치에서 기능을 완성하면 develop 브랜치에 merge를 진행하게 됩니다.
* 라이브 서버로 배포시, feature 브랜치들이 모두 develop 브랜치에 merge 되었다면 QA를 위해 release 브랜치를 생성합니다. release 브랜치를 통해 오류가 확인된다면 release 브랜치 내에서 수정을 진행합니다. QA와 테스트를 모두 통과했다면, 배포를 위해 release 브랜치를 master 브랜치 쪽으로 merge하며, 만일 release 브랜치 내부에서 오류 수정이 진행되었을 경우 동기화를 위해 develop 브랜치 쪽에도 merge를 진행합니다.
* 배포 후 관리시 라이브 서버에서 버그가 발생된다면, hotfix 브랜치를 생성하여 버그 픽스를 진행합니다. 그리고 종료된 버그 픽스를 master와 develop 양 쪽에 merge하여 동기화 시킵니다.

1개월 이상의 긴 호흡으로 개발하여 주기적으로 배포, QA 및 테스트, hotfix 등 수행할 수 있는 여력이 있는 팀이라면 git-flow가 적합합니다.

</div></details>

<details><summary>GITHUB-FLOW 전략</summary>
<div markdown="1">

Git flow가 좋은 방식이지만 GitHub에 적용하기에는 복잡하다는 판단에 따라 만들어진 새로운 깃 관리 방식입니다. 자동화 개념이 들어가 있다라는 큰 특징이 존재하며 만일 자동화가 작용되어 있지 않은 곳에서만 수동으로 진행할 수 있습니다.

수시로 릴리즈 되어야 할 필요가 있는 서비스를 지속적으로 테스트하고 배포하는 팀이라면 github-flow 와 같은 간단한 work-flow가 적합합니다.

* 기본적으로 master branch에 대한 규칙만 정확하게 정립되어 있다면 나머지 가지들에 대해서는 특별한 관여를 하지 않으며 pull request 기능을 사용하도록 권장합니다.

GitHub-Flow의 특징으로
1. release branch가 명확하게 구분되지 않은 시스템에서의 사용이 유용합니다.
2. GitHub 자체의 서브스 특성상 배포의 개념이 없는 시스템으로 되어있기 때문에 이 flow가 유용합니다.
3. 웹 서비스들에 배포의 개념이 없어지고 있는 추세이기 때문에 앞으로도 Git flow에 비해 사용하기에 더 수월할 것 입니다.
4. hotfix와 가장 작은 기능을 구분하지 않습니다. 모든 구분사항들도 결국 개발자가 전부 수정하는 일들 중 하나이기 때문입니다. 대신 구분하는 것은 우선 순위가 어떤 것이 더 높은지에 대한 것 입니다.

* 브랜치 생성시, Github-flow 전략은 기능 개발, 버그 픽스 등 어떤 이유로든 새로운 브랜치를 생성하는 것으로 시작합니다. 단, 이때 체계적인 분류 없이 브랜치 하나에 의존하게 되기 때문에 브랜치 이름을 통해 의도를 명확하게 드러내는 것이 매우 중요합니다.
  * master 브랜치는 항상 최신 상태며, stable 상태로 product에 배포되는 브랜치입니다. 이 브랜치에 대해서는 엄격한 role과 함께 사용합니다.
  * 새로운 브랜치는 항상 master 브랜치에서 만듭니다.
  * Git-flow와는 다르게 feature 브랜치나 develop 브랜치가 존재하지 않습니다.
  * 그렇지만, 새로운 기능을 추가하거나 버그를 해결하기 위한 브랜치 이름은 자세하게 어떤 일을 하고 있는지에 대해서 작성하도록 합니다.
* 개발 & 커밋 & 푸쉬시, 개발을 진행하면서 커밋을 남깁니다. 이때도 브랜치와 같이 커밋 메세지에 의존해야 하기 때문에, 커밋 메세지를 최대한 상세하게 적어주는 것이 중요합니다.
  * 커밋메시지를 명확하게 작성합니다.
  * 원격지 브랜치로 수시로 push합니다.
  * Git-flow와 상반되는 방식입니다.
  * 항상 원격지에 자신이 하고 있는 일들을 올려 다른 사람들도 확인할 수 있도록 해줍니다.
  * 이는 하드웨어에 문제가 발생해 작업하던 부분이 없어지더라도, 원격지에 있는 소스를 받아서 작업할 수 있도록 해줍니다.
* PR(Pull Request) 생성시, 피드백이나 도움이 필요할 때, 그리고 merge 준비가 완료되었을 때는 pull request를 생성합니다.
  * pull request는 코드 리뷰를 도와주는 시스템입니다.
  * 이것을 이용해 자신의 코드를 공유하고, 리뷰받습니다.
  * merge 준비가 완료되었다면 master 브랜치로 반영을 요구합니다.
* 리뷰 & 토의시, Pull-Request가 master 브랜치 쪽에 합쳐진다면 곧장 라이브 서버에 배포되는 것과 다름 없으므로, 상세한 리뷰와 토의가 이루어져야 합니다.
* 테스트시, 리뷰와 토의가 끝났다면 해당 내용을 라이브 서버(혹은 테스트 환경)에 배포해봅니다. 배포시 문제가 발생한다면 곧장 master 브랜치의 내용을 다시 배포하여 초기화 시킵니다.
* 최종 Merge시, 라이브 서버(혹은 테스트 환경)에 배포했음에도 문제가 발견되지 않았다면 그대로 master 브랜치에 푸시를 하고, 즉시 배포를 진행합니다. 대부분의 Github-flow 에선 master 브랜치를 최신 브랜치라고 가정하기 때문에 배포 자동화 도구를 이용해서 Merge 즉시 배포를 시킵니다. master로 merge되고 push 되었을 때는, 즉시 배포되어야합니다.
  * GitHub-flow의 핵심입니다.
  * master로 merge가 일어나면 자동으로 배포가 되도록 설정해놓습니다. (CI / CD)

</div></details>

[GitHub Desktop](https://docs.github.com/en/get-started/using-github/github-desktop)

GitHub Desktop은 시각적 인터페이스를 사용하여 Git 및 GitHub 워크플로를 확장하고 간소화합니다.

[Git Bash(Git documentation)](https://git-scm.com/doc), [누구나 쉽게 이해할 수 있는 Git입문](https://backlog.com/git-tutorial/kr/intro/intro1_2.html)

<details><summary>git remote</summary>
<div markdown="1">

"git remote"커맨드는 변경사항을 동기화 하는 시스템의 한 부분입니다. 
git fetch, git push, git pull과 함께 사용됩니다. 이러한 명령에는 모두 해당 링크에서 탐색할 수 있는 자체 동기화 책임이 있습니다.

* Git은 파일 및 폴더의 대무자 소문자를 구분하지 않습니다.

```
& git init   
& git remote add origin "https://github.com/id/id.github.io"   
& git pull origin master   
```

```
& git remote rename origin test   
& git remote -v   
& git remote rename test origin
```

```
& git add .   
& git commit -m "message"   
& git status   
& git push origin   
```

```
& git help   
& git help remote   
```

</div></details>

<details><summary>특정 파일의 add</summary>
<div markdown="1">

```
& add file_name.xxx
```

커밋에 단일 파일의 변경사항을 포함합니다. 상관 없는 여러개의 파일을 변경한 다음 commit할 경우, 직접 변경한 파일을 지정하여 커밋할 수 있습니다.

</div></details>

<details><summary>commit의 삭제</summary>
<div markdown="1">

```
& git reset HEAD(16진수 숫자)~삭제갯수
& git log 
```

HEAD부터 삭제갯수만큼 commit을 삭제합니다.

</div></details>

<details><summary>git branch 이동</summary>
<div markdown="1">

```
& git branch BranchTest   
& git branch   
& git checkout BranchTest   
```

BranchTest 브런치를 만들고, BranchTest로 이동한다.   

```
& git checkout master   
& git branch --delete BranchTest   
```

마스터 브런치로 돌아간 후, BranchTest를 삭제한다.   

```
& git branch test   
& git checkout test   
... work ...   
& git checkout master   
& git merge test   

& git branch -d test   
```

test 브런치를 삭제합니다.  

</div></details>

<details><summary>git branch</summary>
<div markdown="1">

```
& git branch issue2   
& git branch issue3   
& git checkout issue2   
... work ...   
```

Master branch, 제품으로 출시될 수 있는 브랜치입니다.   

Develop branch, 기능 개발을 위한 브랜치들을 병합하기 위해 사용하는 브랜치 입니다.     

Feature branch, 기능을 개발하는 브랜치 입니다.

Release branch, 이번 출시 버전을 준비하는 브랜치 입니다.   

Hotfix branch, 출시 버전에서 발생한 버그를 수정하는 브랜치입니다.   

```
& git log   
! type q exit it.   
& git log --graph --decorate --oneline   
```

```
& git branch issue2   
& git branch issue3   
... work ...   
& git merge issue2   
& git checkout issue3   
& git rebase master   
& git rebase --continue   
```

**locally와 remotely에서 branch를 지우는 방법입니다.**

```
& git branch -d branch_name   
```

로컬에서 브런치를 지웁니다.   

```
& git push remote_name --delete branch_name   
```

원격에서 브런치를 지웁니다. (Git v.1.7.0 이상부터)  

</div></details>

<details><summary>.gitignore</summary>
<div markdown="1">

[git ignore sample](https://github.com/github/gitignore)

프로젝트 작업시 로컬 환경의 정보나 빌드 정보등 원격 저장소에 관리하지 말아야되는 파일들에 대해서 지정하여 원격 저장소에 실수로 올라가지 않도록 관리하는 파일입니다. .gitignore는 프로젝트 파일의 최상단에 위치합니다.

</div></details>

<details><summary>Submodule</summary>
<div markdown="1">

[Git Tools - Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules)

기존 프로젝트의 일부를 서브모듈로 만들기 위해서는 다음과 같은 방법을 따릅니다.

```
& git submodule deinit -f
```
먼저 명령어를 통해서 해당 모듈을 deinit 해줍니다.

```
& git submodule deinit -f test_app
```
그 다음 .git/modules 폴더에 들어가서 해당 폴더를 삭제합니다.

```
& rm -rf .git/modules/test_app
```
마지막으로 git에서 해당 폴더를 제거해주면 됩니다.

```
& git rm -f test_app
```

</div></details>

**Git LFS(Git Large File Storage)**로 깃허브 저장소에는 용량 제한이 없지만, 100Mb가 넘는 파일을 push하려고 error메세지를 출력하고 Git lfs를 사용하라고 알려줍니다. (50Mb 이상은 warning이 나온다고 합니다.)

## SVN 

[Tortoise SVN](https://tortoisesvn.net/)

SVN은 단일 중앙 저장소를 사용하여 개발자를 위한 커뮤니케이션 허브 역활을 합니다. 개발자들의 복사본과 중앙 레포지터리의 변경 집합을 조합하여 작업이 이루어 집니다.

TortoiseSVN은 Windows 셸 확장으로 구현된 Apache ™ Subversion(SVN) ® 클라이언트입니다. Subversion 명령줄 클라이언트를 실행할 필요가 없기 때문에 직관적이고 사용하기 쉽습니다.

* SVN은 대부분의 기능을 완성해놓고 소스를 중앙 저장소에 commit합니다.
* GIT과 가장 큰 차이점은 개발자가 자신만의 Version History를 가질 수 없습니다.
* Commit한 내용에 실수가 있을 시에 다른 개발자에게 바로 영향을 미치게 됩니다.

<details><summary>용어 & 명령어</summary>
<div markdown="1">

|용어|설명|
|:-:|---|
|Repository|프로젝틒일 및 변경 정보가 저장되는 장소로, 모든 프로젝트의 프로그램 소스들은 이 저장소 안에 저장됩니다. <br> 한 프로젝트 마다 하나의 저장소가 필요하며, 네트워크를 통해서 여러 사람이 접근 할 수 있고, 소스뿐만이 아니라 소스의 변경 사항도 모두 저장됩니다.|
|Trunk|프로젝트에서 가장 중심이 되는 디렉토리로, 개발 소스를 Commit 했을 때 개발 소스가 모이는 장소입니다. <br> 모든 개발 작업은 trunk 디렉토리에서 이루어지며, trunk 디렉토리 아래에는 바로 소스들의 파일과 디렉토리가 들어가게 됩니다.|
|Branch|trunk에서 뻗어져 나온 나뭇가지를 뜻하며, 프로젝트 내의 작은 프로젝트의 개념입니다. <br> trunk 디렉토리에서 개발하다 보면 큰 프로젝트에서 또 다른 작은 분류로 빼서 따로 개발해야 할 경우가 생기는데, 이 때 프로젝트안의 작은 프로젝트를 생성하는 개념으로, branches 디렉토리 안에 또 다른 디렉토리를 두어 그 안에서 개발하게 됩니다. <br> trunk에서 분리/복사한 소스로 버전별 배포판을 생성하거나 trunk와 별도로 운영환경을 위한 안정화된 소스 관리 목적으로 사용됩니다.|
|Tag|Tag는 꼬리표라는 뜻으로, 버전 별로 소스코드를 따로 관리하는 공간입니다. 특정 시점의 상태 보존 목적으로 사용하며, 장기적으로 버전 별로 소스코드를 따로 저장하는 공간입니다.|
|Revision|수정된 버전이라는 의미로, 클라이언트가 Repository에 새로운 파일, 수정 등을 commit할때 마다 번호가 하나씩 증가합니다.|
|Head|Repository에 저장된 최신 revision을 의미합니다.|
|Base|클라이언트가 checkout, update 등으 ㅣ명령을 통해 Repository로 부터 내려받은 revision을 의미합니다. 이 revision을 가지고 클라이언트는 수정 및 commit을 하게 됩니다. <br> 만약 Head와 Base가 다르다면, commit이 거부되고 update를 먼저 수행해야 commit이 가능해집니다.|

|명령어|설명|
|:-:|---|
|Import|맨 처음 프로젝트 시작할 때 빈 Repository에 맨 처음 파일들을 저장소에 등록하는 명령어입니다.|
|Checkout|저장소에서 소스를 받아 오는 명령어로, 받아온 소스에는 소스 뿐만이 아니라 버전관리를 위한 파일도 같이 받아옵니다.|
|Export|Checkout과 달리 버전관리 파일을 뺀 순수한 소스만 가져오는 명령어로 마지막에 사용합니다.|
|Commit|로컬 저장소의 체크아웃 한 소스의 변경된 내용(수정, 파일 추가, 삭제 등)을 저장소에 저장하여 갱신하는 명령어 입니다.|
|Update|체크아웃해서 받은 소스를 서버 저장소의 최신 소스 버전으로 업데이트 하는 명령어입니다.|
|Revert|로컬 저장소의 소스 코드 내용을 이전 상태로 돌리는 명령어입니다.|
|Log|저장소에 어떠한 것들이 변경 되었는지 revison을 통해 확인 할 수 있는 명령어입니다.|
|Diff|예전 소스 파일과 지금의 소스 파일의 차이점을 비교해 보는 명령어입니다.|
|Blame|한 소스 파일을 대상으로 각 리비전에 대해서 어떤 행을 누가 수정했는지 작업한 내용을 확인하는 명령어입니다. <br> 출력 순서는 리비전, 커밋한 사용자의 ID, 소스 순입니다.|
|Lock|파일에 락을 걸어 락을 건 사용자만이 수정할 수 있게 해주는 명령어입니다. 해제는 svn unlock을 통해 할 수 있으며, 왜 파일에 락을 걸었는지도 로그를 기록 할 수 있습니다.|
|Add|새 파일을 만들었을 경우에 파일을 추가해주는 명령어입니다. <br> 저장소에 저장은 되지 않아 add뒤엔 꼭 svn commit를 꼭 해줘야 합니다. add 후 commit을 안해주면 나중에 commit을 해도 안 올라갑니다.|
|Status|자신이 수정하고 있는 파일의 상태를 알려주는 명령어입니다.|
|Mkdir|새로운 디렉토리를 만드는 명령어로 실제 변경사항은 commit시에 적용됩니다.|
|Delete|파일/디렉토리를 삭제하는 명령어입니다.|
|Move|파일을 이동하는 명령어로 실제 변경사항은 commit시에 적용됩니다.|
|Rename|파일 이름을 변경하는 명령어로 실제 변경사항은 commit시에 적용됩니다.|
|List|파일 리스트를 확인하는 명령어입니다.|
|Switch|소스 서버를 변경하는 명령어입니다.|
|Info|로컬 저장소 또는 원격 저장소의 파일, 폴더 정보를 확인하는 명령어입니다.|

</div></details>

<details><summary>Tortoise SVN</summary>
<div markdown="1">

[TortoiseSVN DOC](https://tortoisesvn.net/docs/release/TortoiseSVN_en/index.html)

* 업데이트시 변경한 파일들을 덮어씌우므로 조심해서 해야합니다.
* 커밋시 변경사항을 변경한 내용을 명확히 확인한 다음 커밋해야 합니다.
  * 커밋하지 않고 업데이트하면 변경내용을 잃어버리게 됩니다.
  * 예를 들어 MainLevel은 아트팀에서 관리합니다. 메인 레벨을 변경하면 아트팀의 작업내역과 충돌하게 됩니다.
* 추적하지 않는 파일을 확인해서 커밋해야합니다.
  * 언리얼엔진의 블루프린트의 부모 클래스 누락하고 커밋하면, 블루프린트가 깨지게 됩니다.
* 커밋시 깨졌을 경우 정리 명령어를 실행하라고 표시됩니다. TortoiseSVN에서 정리명령을 실행할 수 있습니다.

</div></details>

<details><summary>커밋 실수했을 때 다시 올리기</summary>
<div markdown="1">

[SVN Revision 되돌리는 법](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=bb_&logNo=221412841585)

커밋을 실수해도 당황하지 말고 되돌려서 사용하도록 합니다. 커밋을 되돌릴 수 있기만 해도 어지간한 문제는 해결 할 수 있습니다.

</div></details>

<details><summary>With 언리얼 엔진</summary>
<div markdown="1">

언리얼 엔진에서 SVN 오류를 피하기 위한 전략

1. 저장하지 않는다. **자동 저장 기능을 사용하지 않고 직접 변경한 내역만 저장하도록 한다.**
   * 이때 연관된 래퍼런스가 깨질 수 있다.
2. 해당 하는 부분만 변경되었는지 확인하기 위해서, 엔진을 자주 껐다 킵니다.
3. 기존 프로젝트를 끈 후, 변경하지 않은 내역에 대해 되돌리기를 수행합니다. 그리고 다시 테스트합니다.

**실수 모음**

블루프린트 디폴트로 리셋, 후 커밋에서 제외하면 인스턴스의 위치값들이 기본값으로 변경됩니다.
* 이는 제가 변경사항을 블루프린트 디폴트로 리셋한 적이 있을 때마다 나타났으므로, 다른 BP의 변경사항을 건든 것으로 생각됩니다.

</div></details>