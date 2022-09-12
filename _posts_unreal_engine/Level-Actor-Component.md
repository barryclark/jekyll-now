---
layout: post
title: Level, Actor, Component
---

# Level(레벨)이란

**레벨은 게임 `월드`의 모든 것 또는 일부입니다.** 환경, 사용 가능한 오브젝트, 다른 캐릭터 등 플레이어가 보고 상호작용할 수 있는 모든 것이 레벨에 포함됩니다. 일반적으로 비디오 게임에서는 여러 레벨이 있으며 레벨 간 전환이 명확히 구분되어 있습니다. 

예를 들어 한 레벨의 최종 보스를 물리치면 다음 레벨로 이동하게 됩니다. 언리얼 엔진으로 제작하는 다른 유형의 인터랙티브 경험에서는 여러 가지 상황이나 환경간의 전환을 위해 다양한 레벨을 사용할 수도 있습니다.

* 언리얼 엔진은 각 레벨을 별도의 `.umap`파일로 저장합니다. 그래서 때때로 레벨이 맵(Map)이라고 불리기도 합니다.
* 비슷한 의미로 사용되는 용어로, 라운드(round), 구역(area), 챕터(chapter→장), 지도(map), 액트(act→장), 월드(world), 블록(block), 시나리오(scenario), 에피소드(episode), 피리어드(period→기간), 페이즈(phase→단계) 등이 있습니다.
* **용어는 시대, 장르, 제작자에 따라 관습적으로 이름붙여지는 것이 보통이며, 게임의 세계관을 드러내기 위한 수단이 되기도 한다.** 또한 이를 조합해 사용하는 경우도 있다.
    - 예를 들면 메가 드라이브판의 소닉 더 헤지호그 시리즈에서는, 하나의 스테이지가 여러 개의 액트로 구성되어, '스테이지 1 액트 1, 액트 2, …'와 같이 진행되며, 최종 액트를 완수하는 것이 곧 그 스테이지를 완수하는 것이 된다.

## 레벨로 작업하기

다른 많은 종류의 언리얼 엔진 데이터와 마찬가지로 레벨은 개별 애셋 파일에 저장됩니다. **레벨 자산에서 많은 공통 자산 작업을 수행할 수 있습니다.**

[레벨을 생성, 저장, 여는 워크플로](https://docs.unrealengine.com/5.0/ko/working-with-levels-in-unreal-engine/)

[에디터의 기본 레벨 설정](https://docs.unrealengine.com/5.0/ko/changing-the-default-level-of-an-unreal-engine-project/)

## 레벨에서 액터 찾는 쉬운 방법

Wolrd Outliner 또는 애셋으로 작업할 때 팁.
검색에서 Or연산자를 이용해서 편하게 찾자


## 다수의 레벨 관리

레벨은 항상 하나의 Persistent Level(지속 레벨, 퍼시스턴트 레벨)이 있으며, 항상 로드되거나 레벨 스트리밍 불륨, 블루프린트, C++ 코드를 통해 스트림 인 가능한 서브 레벨 하나 이상으로 구성됩니다. 레벨 창에는 이 레벨이 전부 표시되어, (두꺼운 파랑 글씨로 표시된) 현재 레벨 설정을 변경하거나, 하나 이상의 레벨을 저장하거나, 레벨 블루프린트에 접근할 수 있습니다. 

현재 레벨은 레벨 에디터 뷰포트에서 변경할 때 실제로 변경되는 레벨입니다. 이를 통해 다수의 맵에 대한 작업을, 전부 쓰기 가능하게 설정된 경우 쉽게 할 수 있습니다.

* 서브레벨 시각화를 통해 쉽게 구분할 수 있습니다.

[레벨을 관리하는 방법](https://docs.unrealengine.com/5.0/ko/managing-multiple-levels-in-unreal-engine/)

## 레벨의 월드 세팅

레벨별로 고유한 월드 세팅을 가질 수 있습니다. 레벨을 플레이할 때 올바른 게임 모드(Game Mode)가 활성화되게 하는 것부터 글로벌 일루미네이션의 작동 방식 조절에 이르기까지 다양한 세팅을 변경할 수 있습니다.

[레벨의 월드 세팅](https://docs.unrealengine.com/5.0/ko/world-settings-in-unreal-engine/)

# 자동화 테스트를 위한 레벨 관리  2022 07 04
PIE할 수 있는 레벨을 만든 후, PIE를 항상 로드하는 자동화 테스트 레벨을 만들고 자동화 할 수 있습니다.

레벨의 구성은 다음과 같게 됩니다. 

* Overview

* AutoTest
    * Overview

# 코드

**TODO**
레벨을 제어하고 관리하는 코드가 필요...

# 스토리 중심의 게임의 레벨 관리  2022 07 04

**공포 게임에서 스토리 중심의 게임에 대해서 생각한 방법.**

## Plot(구성)이란
주제의 효과적 표현을 위한 사건의 인과적 질서로서 구성은 어떤 사물의 짜임새, 틀을 말합니다.

[플롯의 예시](https://hwiki.eumstory.co.kr/index.php/%ED%94%8C%EB%A1%AF%EA%B5%AC%EC%A1%B0)를 보면 다음과 같습니다.

1. 도념이 추부에게 자신의 어머니가 언제쯤 오느냐며 묻자 초부는 내년 봄보리 필 때 쯤이면 올 것이라고 발뺌을 함
2. 도념이 절을 찾은 과부와 새댁에게 서울의 안대가집 아가씨가 자기 어머니와 똑같이 예쁘다고 자랑함
3. 총각이 노인에게 도념의 출생 비밀을 얘기하자, 도념은 모두들 자신의 어머니 사시는 곳을 가르쳐 주지 않는다며 투덜댐
4. 초부의 아들 인수가 도념한테 자기는 토끼를 잡을 덫을 놓고는 자신을 산문으로 들여보내지 않는다며 서로 실랑이를 벌임
...

* 줄거리(Story, 이야기)는 시간의 흐름에 따른 사건의 순차적 배열을 의미합니다. 플롯도 사건의 서술이지만 인과 관계에 중점을 두는 차이가 있습니다.
* Plot은 Act로 나뉠 수 있습니다.

플롯이 극적 재미를 더해주기도 하지만 때에 따라 그저 관객을 속이는 방편으로 활용되는 측면으로 사용할 수 있습니다.

같은 이야기라도 어떻게 구성하느냐에 따라 관객이 받아들이는 감흥이 달라진다고 합니다.

* Plot에서 Sequence를 이용한 개발이 중심이 될 수 있습니다.

**TODO**
플롯을 작성하는 예시나 다른 내용이 필요한지는 보다 고민해봐야 함.
드라마 등의 개념에서 접근 http://contents.kocw.or.kr/contents4/document/lec/2013/Hufs/LeeRan/9.pdf 
기획자의 작업

## Stage(무대)란
**게임 캐릭터가 움직이는 공간을 의미합니다.** Stage에 모든 Plot에서 사용할 공통된 소리, 사물, 조명이 배치되게 됩니다. 즉 게임에서 배경을 의미합니다.

* 플롯에 의해서 길이 막혀있거나 할 수 있습니다. 이때 길은 스테이지가 됩니다.
* 따라서 Stage를 만들 때 원하지 않는 이동이 가능하지 않나 집중해서 검사해야 합니다.

**TODO**
조금더 부드러운 로딩을 위한, 맵 쪼개기,
레벨 디자이너의 작업
라이팅 아티스트의 작업
https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=parkjiseon87&logNo=220124932302 

## 레벨의 구조와 관리
게임의 진행은 한개의 플롯씩 진행됩니다. 따라서 레벨의 저장은 현재 레벨을 저장하고 불러오는 것으로 할 수 있습니다.

만일 한방향으로만 플롯이 연결되어 있을 경우, 현재 플롯의 상태는 전에 연결된 플롯들을 반드시 진행했음을 보장합니다. 트리 구조인 경우에는 진행한 레벨을 각각 저장하는 방식을 생각할 수 있습니다.

플롯에 따른 스테이지의 로드는 다음과 같은 예를 들 수 있습니다.

* Stage
    1. 복도
    2. 방
* Plot
    1. 방에 들어가기 위해 복도를 이동한다.
    2. 방에 들어가서 목적을 달성한다.

* Plot의 순서대로 게임이 진행될 때, 먼저 Plot 1을 스트림 인 합니다. 그리고 Plot 2를 스트림 인 합니다.
* Plot에 의한 Stage의 스트림 인
    - Plot 1은 Stage 1을 로드합니다.
    - Plot 2는 Stage 1, 2를 로드합니다.

Stage와 Plot은 필요에 게임의 진행 상황에 따라서 스트림 인 됩니다. 따라서 Plot과 Stage를 담은 퍼시스턴트 레벨을 두고 Plot과 Stage는 스트리밍 레벨이 됩니다.

* MainLevel(Persistent Level)
    * Plot
    * Stage

## 레벨의 저장과 로드
레벨의 로드는 다음의 순서를 따릅니다. 

1. MainLevel로 트레블(레벨 이동)하면
2. 먼저 임시 장소에서 스폰과 동시에 로딩 화면을 띄웁니다.
3. 저장상태를 불러온 후
4. 필요한 레벨을 로드하거나 설정을 완료하고
5. 캐릭터를 원하는 위치로 이동시킵니다.

따라서 죽어서 마지막 저장위치에서 다시 시작하거나, 이전 플레이를 이어하는 것은 MainLevel로 트레블 하는 것을 의미합니다. 마지막으로 진행한 플롯의 시작부분으로 이동하게 됩니다.

* 아이템, 캐릭터의 체력 등의 변할 수 있는 상태는 별도로 저장방식을 결정해야 합니다.

## Component

<details><summary>컴포넌트 만들고 붙이기</summary>
<div markdown="1">

[컴포넌트 만들고 붙이기](https://docs.unrealengine.com/4.27/ko/ProgrammingAndScripting/ProgrammingWithCPP/CPPTutorials/Components/1/)

1. 변수를 선언하고, 컴포넌트 생성 코드를 추가합니다.
2. 생성된 컴포넌트를 부모 컴포넌트에 붙입니다.

```cpp
    // 루트 컴포넌트의 생성
    USphereComponent* SphereComponent = CreateDefaultSubobject<USphereComponent>(TEXT("RootComponent"));
    RootComponent = SphereComponent;
    SphereComponent->InitSphereRadius(40.0f);
    SphereComponent->SetCollisionProfileName(TEXT("Pawn"));
    
    // 자식 컴포넌트를 생성 후 부모 컴포넌트에 붙이기
    UStaticMeshComponent* SphereVisual = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("VisualRepresentation"));
    SphereVisual->SetupAttachment(RootComponent);
    static ConstructorHelpers::FObjectFinder<UStaticMesh> SphereVisualAsset(TEXT("/Game/StarterContent/Shapes/Shape_Sphere.Shape_Sphere"));
    if (SphereVisualAsset.Succeeded())
    {
        SphereVisual->SetStaticMesh(SphereVisualAsset.Object);
        SphereVisual->SetRelativeLocation(FVector(0.0f, 0.0f, -40.0f));
        SphereVisual->SetWorldScale3D(FVector(0.8f));
    }
```

</div></details>