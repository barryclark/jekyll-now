---
layout: post
title: GIT for UE5
---

### 버전 컬트롤(version control)이란? ###

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

https://backlog.com/git-tutorial/kr/intro/intro1_2.html  

### Git ###

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

## branch ##

Head   
현재 작업중인 Branch를 가리키는 것입니다.   
Branch   
독립적으로 어떤 작업을 진행하기 위한 개념입니다. 작업을 할때에 현재 상태를 복사하여 Branch에서 작업을 한 후에 완전하다 싶을때 Merge를 하여 작업을 합니다.  
Merge   
다른 Branch의 내용을 현재 Branch로 가져와 합치는 작업을 의미합니다.   

# git bash #

& git branch
& git branch BranchTest
& git checkout BranchTest


Master branch

Integration branch   

Topic branch   

https://academy.realm.io/kr/posts/360andev-savvas-dalkitsis-using-git-like-a-pro/ 