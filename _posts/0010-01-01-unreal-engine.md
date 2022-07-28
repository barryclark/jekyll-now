---
layout: post
title: Unreal engine
---

<details>
<summary>블로그 작성 규칙</summary>
<div markdown="1">

# 목차
* Language
* Algorithm and data struct
* CS And IT
* Design pattern
* Game
* Git
* Math
* Optimize life
* Visual studio
* Posts jekyll blog
* Posts unreal engine

# 포스트 구성
이론을 몰라도 사용할 수 있도록 정리합니다.

사용법에 대한 정리합니다.

이론을 이해하기 위한 성행지식과, 이론을 작성합니다.

</div>
</details>


<details>
<summary>Other</summary>
<div markdown="1">

* [IT_TDD](/posts/_CS_And_IT/IT_TDD)

</div>
</details>

# Concept
* [Garbage-collection](/posts_unreal_engine/Concept-Garbage-collection)
    - 가비지 컬렉션의 작동방식
* Replaction
    * [```UPROPERTY : *Anywhere```](/posts_unreal_engine/Concept-EditAnywhere-VisibleAnywhere)
        - EditAnywhere
        - VisibleAnywhere
        - private접근 지정자인 경우에
    * [```UPROPERTY : Blueprint*```](/posts_unreal_engine/Concept-ReadOnly-ReadWrite-Getter-Setter)
        - BlueprintReadOnly
        - BlueprintReadWrite
        - BlueprintGetter
        - BlueprintSetter
        - GetterSetter를 쓰는 이유 
    * [```UFUNCTION : Blueprint*```](/posts_unreal_engine/Concept-BlueprintCallable-ImplementationEvent-NativeEvent)
        - BlueprintCallable
        - ImplementationEvent
        - NativeEvent
    * [```UCLASS : Blueprint*```](/posts_unreal_engine/Concept-Blueprinttype-BlueprintAble)
        - Blueprinttype
        - BlueprintAble
        - Blueprint class의 reparent
* Project
    * [Project struct](/posts_unreal_engine/Conept-Project-struct)
        - 프로젝트 폴더 구성
    * [Module](/posts_unreal_engine/Concept-Module)
        - 모듈
        - 모듈 사용의 이점
        - 고려사항
        - 참고사항
    * [Version control](/posts_unreal_engine/Version-control)
        - 버전 컨트롤(Version Control)이란?
* Graphics
    * [Create shader](/posts_unreal_engine/Concept-Create-shader)
        - 읽을 수 있게 되는 것들
        - 셰이더 컴파일 작업
        - 패스
        - 머티리얼
        - 언리얼 셰이더 파일
        - 셰이더 및 머티리얼
    * [RHI](/posts_unreal_engine/Concept-RHI)
        - Render hardware interface
        - API features
        - 렌더링 상태 기본값
* [UMG and UI](/posts_unreal_engine/Concept-Actor)
    - HUD (Head Up Displays)란
    - 참고
* [Mobility](/posts_unreal_engine/Concept-Mobility)
    - 스태틱 모빌리티
    - 스태틱메시의 모빌리티 설정
    - 코드에서 설정하는 방법
    - 모빌리티와 Lumen에서
* [Actor](/posts_unreal_engine/Concept-Actor)
    - 월드
    - 액터
    - 컴포넌트
    - 레벨

## AnimationConcept
* [Animation-system](/posts_unreal_engine/AnimationConcept-Animation-system)
* [Control Rig](/posts_unreal_engine/AnimationConcept-Animation-system)
    - Control Rig란?
    - Control Rig의 solve

## 활용
* Module
    * [Module](/posts_unreal_engine/Useage-Create-module)
        - 보조 모듈 만들기
        - 모듈 빌드에 추가하기
        - 에디터에 모듈 추가하기
    * [Increase-compile-speed](/posts_unreal_engine/Useage-compile-speed)
        - 유니티 빌드 비활성화 하기
* Animation
    * [Anim-notify](/posts_unreal_engine/Useage-Anim-notify)
        - Animation notify
* Automation
    * [Test](/posts_unreal_engine/Useage-Automation_test)
        - Automation test
* [Version control](/posts_unreal_engine/Concept-Version-control)
    - 버전 컬트롤이란?
* [Log and debug](/posts_unreal_engine/Useage-Log-And-Debug)
    - 매크로의 선언
    - 로그 상세(Verbosity) 수준의 종류
    - 로그 출력하기
    - 스크린에 메시지를 출력하기
    - 디버그 드로잉
* [Asset with cpp](/posts_unreal_engine/Useage-Asset-with-cpp)
    - Asset의 경로
    - LoadClass와 LoadObject
    - 생성자(Constructor)에서의 ConstructorHelpers
* [UUserWidet](/posts_unreal_engine/Useage-UUserWidget)
    - 위젯 클래스 생성하기
    - NativePreConstruct 이용하기
    - Asset 불러오기
    - Widget C++에 Bind하기

## 구현
* [FABRIK](/posts_unreal_engine/Implement-FABRIKComponent)
    - 1차 구현
    - 디버그
    - 코드와 설명
    - 코드 리뷰
    - 테스트 코드
