---
layout: post
title: Unreal engine
---

|---|
|[모르겠다 싶을때 Forum으로](https://forums.unrealengine.com/)|
|[어떻게 써야하나 싶을때 Document로](https://docs.unrealengine.com/5.0/en-US/)|
|[뭔소리인지 모르겠다 싶을때는 Community로](https://unrealcommunity.wiki/)|
|[궁금한게 있을때는 배우로](https://www.unrealengine.com/ko/onlinelearning-courses?tags=%EA%B2%8C%EC%9E%84)|
|[언리얼 엔진 공식 카페](https://cafe.naver.com/unrealenginekr)|
|[언리얼 유튜브](https://www.youtube.com/channel/UCBobmJyzsJ6Ll7UbfhI4iwQ)|
|Engine에서 찾기 어려울때는 공식 문서를 보도록 합시다.|
|[시간이 오래걸릴 것 같다 싶을때는 programmer all로](https://www.programmerall.com/article/60142006637/)|

도저히 답이 없다 싶을때는 코드를 분석해야 한다.

세상에 똑똑한 사람들이 너무 많아
: [Unreal 4 렌더링 프로그래밍 주제 개요 및 목차](https://zhuanlan.zhihu.com/p/36675543)
, [건강한 남자??](https://blog.csdn.net/qq_16756235)
, [Realities.io](https://medium.com/realities-io/creating-a-custom-mesh-component-in-ue4-part-1-an-in-depth-explanation-of-vertex-factories-4a6fd9fd58f2)
, [IT개발 노트](https://scahp.tistory.com/10?category=848072)
, [Space Panda](https://spacepanda.tistory.com/4?category=704623)
, [보트내에 물 뺴기](https://forums.unrealengine.com/t/take-out-water-from-inside-of-the-boat-with-custom-stencil-logic-puzzle/365545/6)

## 개념
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
* [Project struct](/posts_unreal_engine/Conept-Project-struct)
    - 프로젝트 폴더 구성
* [Mobility](/posts_unreal_engine/Concept-Mobility)
    - 스태틱 모빌리티
    - 스태틱메시의 모빌리티 설정
    - 코드에서 설정하는 방법
    - 모빌리티와 Lumen에서
* [Module](/posts_unreal_engine/Concept-Module)
    - 모듈
    - 모듈 사용의 이점
    - 고려사항
    - 참고사항
* [Create shader](/posts_unreal_engine/Concept-Create-shader)
    - 읽을 수 있게 되는 것들
    - 셰이더 컴파일 작업
    - 패스
    - 머티리얼
    - 언리얼 셰이더 파일
    - 셰이더 및 머티리얼

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


## 적용
* [FABRIK](/posts_unreal_engine/Implement-FABRIKComponent)
    - 1차 구현
    - 디버그
    - 코드와 설명
    - 코드 리뷰
    - 테스트 코드
