---
layout: post
title: Human Character
---


목표. 적당히 애니메이션을 만들고, PostProcess에 의한 사실적인 애니메이션 구현 

목표. 애니메이션 시스템 숙지
목표. 연습

목표. 시퀀스를 이용한 애니메이션 생성
목표. Control Rig 활용

목표. IK를 위한 AnimBlueprint, Interface, Anim Notify State구현
    서브 목표. 자동화된 Anim Notify State생성
    이를 위해서 필요한 것은.
    BP에는 없지만 CPP에서는 Bone position을 받아올 수 있음.

? 당연하게도 기존 애니메이션에서 Control Rig로 구울 수 있고, 시퀀스로도 구울 수 있고, 포즈로도 구울 수 있다. 중요한 점은 어떻게 활용하냐는 것이다.

? 루트모션을 사용하는 애님 시퀀스를 Anim Blueprint에서 실행 불러오는 방법.
@ Anim blueprint에서 root motion값을 받도록 하고,
@ 애님 시퀀스를 루트모션 설정함.
! 이렇게 하고 루트모션 애니메이션을 실행하면 루트모션이 작동합니다.

? 루트 모션의 축 조절은 키프레임을 추가하여 할 수 있음.
@ 엄청난 노가다인듯함.
@ 만들어 주는 사람이 잘만들어서 주도록 하자.
@ 루트모션을 언리얼에서 수정할거면, Animation Sequence하나당 Level 하나씩으로 만들도록 하자.
! World Position으로 Bake하면, Offset을 맞추는 수고스러움을 조금 줄일 수 있다.

? IK를 바탕으로 하는 Root motion movement를 구현해야함.
@ Blend space로 구현 가능한지는 가늠조차 안됨. 따라서 사용하지 않음.
@ State machine을 이용하면 Animation을 유기적으로 연결하기 힘들거라 생각함.
@ 직접 구현하는 것은 비효율적이고 어리석은 짓이라 생각함. (어쩔수 없는 경우를 제외하고)
! Blend Space를 이용함. 다만 측면 이동은 다른 말그대로 측면으로 이동하는 것을 의미함.

? 애니메이션의 시작과 종료를 포즈로 만듬으로써 애니메이션간의 변환을 보다 쉽게 만들 수 있나?

! 발이 지면에 다아 교환되는 시점이 속도가 제일 느려지는 시점임.

? 망할, Anim sequence 프레임 간격 어떻게 조절한거냐,,,
! 실수하지 않게 Lock으로 닫혀있는 거구나.

? Blend를 통해서 애니메이션을 자연스럽게 할 수 있을거 같은데.

? MAX(Semi procedural 논문 읽기, Semi-procedural-animation만들기)
@ Animation의 특정 시점 keyframe값을 받아올 수 있음.
! Notify time을 알 수 있는지 파악
! Semi procedural 논문 읽기
! Semi-procedural-animation만들기

? Notify time 구할 수 있는가?
! 엄청 친절하게 AnimState의 Begin에서 Notify duraion을 반환함.
! 범용성을 위해서 Interface로 구현하는게 맞다고 생각한다. 성능이 저하되는 건 어쩔 수 없지만, 매 틱마다 호출되는게 아니니 받아들일만 하다고 생각한다.

? 본의 포지션을 Anim blueprint로 업데이트 하는 방법이 도저히 안떠오르니, 수동으로 업데이트 하도록 합시다.

? Thread safe한 Trace는 AsyncLineTraceByChannel이라고 합니다.

! Level sequence로 Animation을 만들 때, Yaw값을 신경안써도 된다.

! Trail Anim State 꼬리임.

**! 땅에 닫는 포지션을 알 수 있을 때 팔이 스윙될지 Pin이 될지 결정할 수 있다.**

## 목표

스켈레톤을 상속받음으로써 보다 구체화 시킬 수 있음.
모듈식으로 작업했을 때, 각 모듈의 연결부분을 어떻게 처리할 것인가?

카타콤(로마 지하 묘지)

Human

Teuthisan
https://www.youtube.com/watch?v=VDreVBXPtQ0

떨어지는 것 까지 데모.

## 이름 규칙

(Environment : BP, BPOnly, CPP)_
(Category name : )_
(Name : ForwardWalk)_
(Class type : Animation, )

## 구조

* Human_Default_Skeleton
    - Foots, Hands, Head
    - Movement animation
        - root motion
        - Interaction control rig
    - IK Anim blueprint
    - Interaction Anim blueprint
* Human_Metahuman_Skeleton (Default_Skeleton)
    - <- metahuman
* Human_Face_Skeleton (Metahuman_Skeleton)
    - Face control rig
    - Face Anim blueprint
* Human_Skin_Skeleton (Metahuman_Skeleton)
    - Skin control rig
    - Skin Anim blueprint

* Human_Skin_Material
    - Blood vessel
    - Skin
* Human_Fuzz_Material
* Human_Hair_Material
    - Hair

    
! Level Sequence와 Anim Sequence가 연결되어 있으면, Level Sequence를 변경했을 때 Anim Sequence가 업데이트 된다. 이를 저장해줘야 애니메이션이 업데이트 된다.

! 사용하는 BP Character를 바탕으로 작업하면, 부담을 줄일 수 있습니다. 하지만 BP Character의 스켈레탈 메시 포지션을 변경할 떄 많은 부담을 줄 수 있습니다. 반대로 스켈레톤으로 작업하면 모듈이 추가될 떄 부담을 줄 수 있습니다.

* Teuthisan_Skeleton
    - Anim blueprint
* Teuthisan_Material
* Teuthisan_Character
* Teuthisan_AIController