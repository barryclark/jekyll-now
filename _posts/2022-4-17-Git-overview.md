---
layout: post
title: GIT overview
---  

### Git overview ###   

깃은 모든 개발자들이 복사된 레포지터리를 가지고, 자신의 로컬 히스토리와 브런치 구조에서 작업합니다. 사용자는 작은 변경집합이 아닌 커밋을 공유해야 합니다. 깃은 레포지터리간의 전체 브런치를 공유할 수 있게 해줍니다.

"git remote"커맨드는 변경사항을 동기화 하는 시스템의 한 부분입니다. 
git fetch, git push, git pull과 함께 사용됩니다. 이러한 명령에는 모두 해당 링크에서 탐색할 수 있는 자체 동기화 책임이 있습니다.

* SVN은 단일 중앙 저장소를 사용하여 개발자를 위한 커뮤니케이션 허브 역활을 합니다. 개발자들의 복사본과 중앙 레포지터리의 변경 집합을 조합하여 작업이 이루어 집니다. 

Repository   
저장소를 의미하며, 저장소는 히스토리, 태그, 소스의 가지치기 혹은 branch에 따라 버전을 저장합니다. 저장소를 통해 작업자가 변경한 모든 히스토리를 확인 할 수 있습니다.   
Working Tree   
저장소를 어느 한 시점을 바라보는 작업자의 현재 시점입니다.   
Staging Area   
저장소에 커밋하기 전에 커밋을 준비하는 위치이다.   
Commit   
현재 변경된 작업 상태를 점검을 마치면 확정하고 저장소에 저장하는 작업입니다.   

https://backlog.com/git-tutorial/kr/intro/intro1_2.html 
https://www.atlassian.com/git/tutorials/syncing

# git bash #

& git init   
& git remote add origion "https://github.com/kbmhansungb/kbmhansungb.github.io"   
& git pull origion master   


origin 레포지터리의 내용을 master브런치로 pull한다.

& git remote rename origion test   
& git remote -v   
& git remote rename test origion

origion 레포지터리를 test로 바꾼 후 확인한다.   
리포지터리들의 버전과 상태를 보여준다.   

& git add .   
& git commit -m "message"   
& git status   
& git push origion   


& git help   
& git help remote   

## 좋은 커밋 메세지 작성하기 위한 약속 ##

1. 제목과 본문을 빈 행으로 구분합니다.
2. 제목을 50글자 내로 제한합니다.
3. 제목 첫 글자는 대문자로 작성합니다.
4. 제목 끝에 마침표 넣지 않습니다.
5. 제목은 명령문으로 사용하며 과거형을 사용하지 않습니다.
6. 본문의 각 행은 72글자 내로 제한합니다.
7. 어떻게 보다는 무엇과 왜를 설명합니다.

## 좋은 커밋 시점 ##

정해진 방법은 없지만, 커밋을 자주 해야하는 질문들에 대해서 받은 내용입니다.

* 어떤 기능에 대한 테스트가 끝났을 때, 보통 한 시간에 두 번 정도. 다섯번은 너무 많습니다.   
* 기능에 기반해서 커밋을 해야지 시간을 정해서 커밋을 하면 안됩니다. 새로운 기능을 추가했을 때 기능이 커밋할 만 하거나, 작동하는 메소드를 추가했거나, 글씨를 수정했거나, 잘못된 파일 들여쓰기를 수정했거나 등등일 때 커밋해야 합니다. 커밋이 의미가 있다면 작은 것을 커밋하는 것은 전혀 잘못된점이 아닙니다. 의미 없는 커밋은 히스토리로 이슈를 추적하는데 있어서 읽기 어렵게 합니다.   
* 새로운 테스트 케이스를 추가할 때, 테스트가 통과됐을 때, 변수 이름을 변경했을 때, 메소드를 삭제했을 때, 상태를 변경했을 때 등... 사실 커밋한 대상의 중요성은 중요하지 않습니다.   

## branch ##

Head   
현재 작업중인 Branch를 가리키는 것입니다.   
Branch   
독립적으로 어떤 작업을 진행하기 위한 개념입니다. 작업을 할때에 현재 상태를 복사하여 Branch에서 작업을 한 후에 완전하다 싶을때 Merge를 하여 작업을 합니다.  
Merge   
다른 Branch의 내용을 현재 Branch로 가져와 합치는 작업을 의미합니다.   

# git bash 연습 #

& git branch BranchTest   
& git branch   
& git checkout BranchTest   

BranchTest 브런치를 만들고, BranchTest로 이동한다.   

& git checkout master   
& git branch --delete BranchTest   

마스터 브런치로 돌아간 후, BranchTest를 삭제한다.   

& git branch test   
& git checkout test   
... work ...   
& git checkout master   
& git merge test   


& git branch -d test   

test 브런치를 삭제합니다.   

& git branch issue2   
& git branch issue3   
& git checkout issue2   
... work ...   

Master branch   
제품으로 출시될 수 있는 브랜치입니다.   
Develop branch   
기능 개발을 위한 브랜치들을 병합하기 위해 사용하는 브랜치 입니다.     
Feature branch   
기능을 개발하는 브랜치 입니다.
Release branch   
이번 출시 버전을 준비하는 브랜치 입니다.   
Htfix branch   
출시 버전에서 발생한 버그를 수정하는 브랜치입니다.   

& git log   
! type q exit it.   
& git log --graph --decorate --oneline   

& git branch issue2   
& git branch issue3   
... work ...   
& git merge issue2   
& git checkout issue3   
& git rebase master   
& git rebase --continue   

## 추가적으로 ##
locally와 remotely에서 branch를 지우는 방법입니다.   
& git branch -d branch_name   
& git push remote_name --delete branch_name   

로컬에서 브런치를 지웁니다.   
원격에서 브런치를 지웁니다. (Git v.1.7.0 이상부터)   


## 다른 것 ##

https://academy.realm.io/kr/posts/360andev-savvas-dalkitsis-using-git-like-a-pro/

https://dev.to/lydiahallie/cs-visualized-useful-git-commands-37p1


## .gitignore ##
프로젝트 작업시 로컬 환경의 정보나 빌드 정보등 원격 저장소에 관리하지 말아야되는 파일들에 대해서 지정하여 원격 저장소에 실수로 올라가지 않도록 관리하는 파일입니다. .gitignore는 프로젝트 파일의 최상단에 위치합니다. 다양한 황경에서의 샘플 .gitignore은 https://github.com/github/gitignore에서 확인할 수 있습니다.   


https://velog.io/@psk84/.gitignore-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0 

## .

## Git LFS ##
Git Large File Storage로 
깃허브 저장소에는 용량 제한이 없지만, 100Mb가 넘는 파일을 push하려고 error메세지를 출력하고 Git lfs를 사용하라고 알려줍니다. (50Mb 이상은 warning이 나온다고 합니다.)

```
?
```

