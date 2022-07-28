---
layout: post
title: Animation Character
---

# Animation
## 기억해야 할 것
* **애니메이션 처음 만드는 사람이, 정교하게 애니메이션을 만든다고, 게임이 재미있어지지 않습니다.**
* **대부분의 애니메이션은 서로 섞이지 않습니다.**
* 어렵다 생각하기 보다 쉽게쉽게 생각하면, 사용할 수 있습니다.
* 잘 분리하고 프로그래밍하는 것이 정말 잘하는 것입니다.
    - **장기적으로 기능이 미친듯이 들어가면, 잘라서 작업 할 수밖에 없습니다.**
    - 개발 당시에는 잘 모르지만, 정말 전체적으로 큰 시선으로, 이런일이 앞으로 벌어질꺼다 예측하는 능력좋은 개발 팀장을 만날 확률은 거의 제로입니다.
* 잘 모르겠으면, 노티파이는 원본 애니메이션에다가 하는 것이 좋습니다.
    - 노티파이가 호출되지 않아, 정상적으로 처리되지 않는 경우가 있습니다.
* 만약에 어떤 상황이 벌어질지, 오만가지 상황을 염두에 둬야합니다.
* 애니메이션을 만들고 싶어도, 맞는 애니메이션이 있는지 아는게 더 중요합니다.
* 애니메이션도 그렇고 게임은 자연스럽게 만드는 것이 가장 중요합니다.
* 게임을 만들 때, 대부분 이벤트를 애니메이션 중에 발생시킵니다.

## 모션에 대한 이해
* 애니메이션의 선행 동작이 있을 때, 마우스를 누르고 때는 점을 생각해볼 수 있습니다.

* FPS에서 모든 총은 누르자 마자 나갑니다.
    - 누르자 마자 나간다는 것은 누르는 타이밍에 총알이 나간다는 것을 의미합니다.
    - 화살 같은 경우에는 누르는 타이밍이 아니라 활 시위를 당기는 (특정 애니메이션)이 있고, 그 다음에 나갑니다. 선행하는 애니메이션이 있다는 의미입니다.

## 고려해야할 버그들
* 로아의 경우, 애니메이션 발생의 취소와 틱타임이 꼬여서 생긴게 있습니다. 
    - 스킬을 쓰고 취소하면 1초 쿨, 스킬을 다쓰면 쿨이 도는 시스템.
    - 누르고 있다가 나가자 마자 취소하면서, 스킬을 안쓴 것으로 처리되어 버그가 발생했습니다.
    - 이는 블렌드되면서 노티파이가 발생하지 않아서 였습니다.

## Blend animation
애니메이션(예를 들어 몽타주)을 특정 본들만 적용하기 위해서 사용합니다.

[블렌드에 대한 상세한 설명](https://docs.unrealengine.com/4.27/en-US/AnimatingObjects/SkeletalMeshAnimation/NodeReference/Blend/)

**Layered Blend Per Bone에서 Blend Depth란 본의 계층구조에서 블렌드를 어떻게 할지를 결정합니다.**

Pelvis에서 Blend Depth를 0으로 설정하면, 모든 본에 블렌드가 바로 적용되게 됩니다.
Blend Depth가 양수인 경우 하위 본까지 부드럽게 블렌드됨을 의미합니다.   
Blend Depth4의 경우 Spine1 25%, Spine2 50%, Spine3 75%, Shoulder 100%, UpperArm 100%, ...식으로 적용됨을 의미합니다.    
Blend Depth가 -1(음수)은 이 본부터 하위본까지 블렌드를 적용시키지 않음을 의미합니다.    

[Forum에서 확인할 수 있습니다.](https://forums.unrealengine.com/t/what-does-the-blend-depth-parameter-in-layered-blend-per-bone-do/350231) 

**몽타주를 이용한 방법**
코드에서 PlayMontage를 이용해 애니메이션을 재생시킬 수 있습니다. 이때 몽타주 슬랏을 이용해, 애님 인스턴스에 설정할 수 있습니다.

* 몽타주의 전체 재생 시간보다 blend 시간을 압도적으로 짧게 잡아야 합니다. 그렇지 않으면 blend 하는 사이에 애니메이션이 끝나 결과적으로 애니메이션이 재생되지 않는 것처럼 보입니다.

[애니메이션 몽타주 사용법](https://docs.unrealengine.com/4.27/ko/AnimatingObjects/SkeletalMeshAnimation/AnimMontage/UserGuide/)

**포즈 캐시를 이용한 방법**
Cache pose(캐시 포즈)는 애니메이션 포즈를 기억하고, 다른 곳에서 사용할 수 있게 합니다.

**Anim Instance에서 Anim Instance를 불러올 수도 있습니다.**

## Notify
* 노티파이 만들기 정석은 노티파이 관리에 있는 걸 추가해야 합니다.
    - 이는 노티파이를 삭제해도, 노티파이 관리에 남아있기 때문에 정리할려면 관리탭을 봐야합니다.

**Anim Notify State**
애님 노티피 스테이트는 오버랩과 마찬가지로 시작과 끝을 반드시 보장해줍니다.

* 노티파이 스테이트는 가능한 몽타주에서 호출하지 말고, 원본 애니메이션에 두도록 합니다.

# 신비 구현 예시
## Ground Locomotion
신비의 지면 운동은 Idle, (JogStart, Run, JogStop)의 상태를 가집니다. 

**변수에 대해서**
1. IsInAir는 공중에 있는지 나타내는 변수입니다.
2. IsAccelerating는 최근에 캐릭터 무브먼트 컴포넌트가 가속받았는지 나타냅니다.
3. Speed는 캐릭터의 이동속도를 나타냅니다.

**애니메이션에 대해서**
1. Idle은 멈춰있는 상태를 의미합니다. 여기서 Idle은 대기 애니메이션을 재생하는 것으로 설정되어 있습니다.
    - Idle은 JogStart로 트랜시션 될 수 있습니다. 속도가 있고, 하늘에 있는 상태가 아니며, 가속받는 상태여야 합니다. 
    1. 공중에 있지 않아야 달릴 수 있다는 것은 꽤 당연합니다.
    2. 속도가 0이상이고 가속되고 있을 때, 달리기를 시작합니다.
2. JogStart는 Jog를 자연스럽게 하기위한 상태입니다. 임시 상태로 **루프 애니메이션이 아닙니다.**
    - JogStart는 자연스럽게 Run으로 트랜시션됩니다.
3. Run은 상태입니다. **자연스럽게 회전하기 위해, 블렌드 2D를 이용합니다.** 
    - 여기서 경사 높이에 따라, 회전하는 애니메이션이 있습니다. 하지만, Slop을 결정하는 변수는 들어가 있지 않습니다.
    - 가속되지 않을 경우, JogStop으로 들어갑니다.
4. JogStop은 자연스럽게 멈추기 위한 상태입니다.
    - JogStop애니메이션에서 자연스럽게 Idle로 가거나, 가속될 때 Idle을 거쳐 조건 JogStart로 가게 됩니다.

* 상태를 어떻게 가지고 나눌지는 의도하고 만들지에 결정됩니다.

## Aim
1. 신비의 Aim을 보면, Anim Instance에서 Base Aim 로테이션과 Actor의 로테이션 사이의 델타를 구해, Raw, Pitch 변수를 구합니다.
2. 애니메이션에 Aim을 적용시킵니다.

* 이때 Aim은 위아래(Pitch)는 45도 까지 바라보고, 넘어가면 다시 정면으로, 양 옆(Yaw)는 90도 까지 바라보고, 넘어가면 다시 정면으로 보도록 만들어져 있습니다.

* **AimOffset은 AdditiveAnimation으로 되어있습니다.** [공식문서에 따라](https://docs.unrealengine.com/4.27/ko/AnimatingObjects/SkeletalMeshAnimation/AnimHowTo/AimOffset/) Asset Action/Bulk Edit via Property Matrix에서 Additive Setting을 해줘야 합니다. 
    - **애니메이션이 에임 오프셋과 호환되도록 하려면, 애디티브 애님 유형이 메시 스페이스 를 사용하도록 설정되어 있어야 합니다.**
    - **Asset Detail에서도 바꿀 수 있습니다.** 이에 따라, BasePose에서 Offset을 더할 수 있습니다.

[1.](/images/AnimationCharacter_Aim_RollPitchYaw.png)
[2.](/images/AnimationCharacter_Aim_Apply.png)
[3.](/images/AnimationCharacter_Aim_AdditiveSetting.png)

## Jump
점프는 뛰기 시작하는 단계와, 꼮대기에 도달하는 상태, 그리고 착지하기 전의 애니메이션으로 나뉩니다. 모든 애니메이션은 루프가 아니고, Preland상태를 목적지로 자연스럽게 블렌드 됩니다.

1. JumpStart 상태는 뛰기 전에 자연스럽게 하는 상태로 루프가 아닙니다.
    - JumpStart 애니메이션이 재생되고, 자연스럽게 JumpApex 애니메이션으로 블렌드 됩니다.
    - 여기서 점프가 되지 않았다면(WasJumping) 바로 Apex로 넘어갈 수 있습니다. 이는 높은 곳에서 떨어질 때 보다 자연스러울 수 있습니다.
2. JumpApex(Apex는 꼭대기) 상태는 꼭대기에 다다르는 것을 의미합니다.
    - Jump_Preland로 자연스럽게 넘어갑니다.
3. Jump_Preland 상태는 지면에 착지함을 나타냅니다.

지면에 착지하는 애니메이션은 로코모션에 구현되어 있습니다.

## Locomotion
로코모션은 가만히 있거나, 띄는 상태, 뛰는 상태, 착지하는 상태로 나눠집니다.

1. Idle/Jogs는 Ground Locomotion 캐시를 재생합니다.
    - 공중에 있을 때 Jumps상태로 블렌드 됩니다.
    - 점프로 가는 애니메이션은 매우 짧은 Duration을 가지고 있습니다. 이떄 Duration을 늘리면, 뛰는 모션이 살짝 부자연스러워 지고, 대신 블랜드 되면서 덜 튀게 됩니다.
2. Jumps는 Jump 상태머신을 이용합니다.
    - 공중에 있지 않다면 Jump_Land 상태로 넘어갑니다.
3. Jump_Land는 착지하는 상태로, 애디티브 애니메이션을 이용해서 Idle/Jogs상태로 동적으로 자연스럽게 블렌드 합니다. 
    - Idle/Jogs가 상태이므로 다른 애니메이션을 가질 수 있는데 이를 자연스럽게 더 할 수 있게 됩니다.
    - 애니메이션이 종료되면 자연스럽게 Idle/Jogs로 갑니다.
    - 만일 공중에 있다면 Idle상태를 통과하여 다시 Jumps상태로 넘어가게 됩니다.

## Combo
콤보는 왼쪽 마우스 버튼으로 시작해서, 애니메이션 노티파이를 통해서 콤보를 연결시킵니다.

**공격모션의 동작**
간략하게 설명하면, 공격하기로 하면(IsAttack) 먼저 첫번째 기본 공격 애니메이션을 재생합니다. 

그후 또 공격을 누르면(공격중인 상태에서 공격을 하면) 공격을 저장(SaveAttack)합니다.

**애니메이션의 재생**
애니메이션은 SaveAttack에 따라서 다음 모션을 재생시킬 목적의 Notify와 공격 모션을 초기화할 목적의 ResetCombo 노티파이가 있습니다.

노티파이는 애님 인스턴스에서 처리되어 신비 캐릭터의 메서드를 호출합니다.

**콤보의 연결**
콤보를 연결하는 ComboAttackSave 이벤트는 AttackCount로 스위치 합니다. 0일 때는 1로 증가시키고, 첫번째 공격 모션을, 1일 때는 2로 증가시키고, 두번째 공격 모션을, 2일 때는 0으로(연속적으로 공격할려고 했나 봅니다.) 공격모션을 이동시킵니다.

ComboAttackSave에서 콤보 공격을 하지 않는다면(SaveAttack이 false여서) 다음번 공격으로 넘어가지 않습니다.

콤보가 종료되면, AttackCount를 0으로, SaveAttack을 false인 기본값으로 설정 후, 공격중을 취소(IsAttacking = false)합니다.

## LegIK

## Cloth & Hair
메시에서 클로드 툴을 이용해서 작업합니다. 자세한 내용과 기능은 [클로딩 툴](https://docs.unrealengine.com/4.27/ko/InteractiveExperiences/Physics/Cloth/Overview/)에서 볼 수 있습니다.

* 디자이너의 도움이 필요합니다.

## Weapon

# TPose VS APose
## TPose
TPose로 포즈를 맞출 경우, 보다 편하게 애니메이션의 리타겟팅을 적용할 수 있습니다.

* 유니티와 Mixamo는 TPose를 사용합니다.

* 회사에서 작업할 때, 모든 작업은 일괄적으로 수행할 수 있어야 합니다.

## APose
APose는 리타겟팅이 힘든 면이 있습니다. 이는 기본 APose의 모양에 맞게 캐릭터의 리타겟팅 포즈를 맞춰야 하기 때문입니다.

* APose는 만드는 사람마다 포즈가 다른 경우가 많습니다.

# Animation Retargeting(애니메이션 리타겟팅)
* 리타겟팅 할 때, Retargeting Base pose를 가능한 비슷하게 만들어야 합니다.

* 인간형 릭은 바꿨을 떄 한번은 확인을 해야합니다. 본이 제대로 설정되어있는지, 본 리타겟팅 모양을 제대로 설정했는지 등을 말입니다.
    - 이는 적용되어 있는지 안알려 주기 때문입니다. 반드시 포즈 숨김, 포즈 보기로 정상적으로 적용되었는지 확인해야 합니다.

# 코드
## Bone Space
* Bone space는 부모 본으로 부터의 상대적입니다.
* Component space는 컴포넌트로 부터 상대적입니다.
* WorldSpace는 월드상의 절대 공간을 의미합니다.

[참고자료](https://www.unrealengine.com/en-US/tech-blog/demystifying-bone-indices)
[Unreal Engine Release 4.13](https://docs.unrealengine.com/4.27/ko/WhatsNew/Builds/ReleaseNotes/2016/4_13/)

## Bone Indices
* Mesh Bone Index
	- 메시 본 익덱스는 계층 구조의 순서대로 인덱싱 되어 있으며 렌더링에 사용됩니다.
	- 메시 본 인덱스를 이용해서 스켈레탈 메시의 ComponentSpaceTransforms(Old : SpaceBase)또는 BoneSpaceTransforms(Old : LocalAtom)에 접근합니다.
* Skeleton Bone Index
	- USkeletalMesh의 모든 본에 대한 인덱스입니다.
	- UAnimSequence 내부에는 내부 트랙 인덱스와 일치하는 스켈레톤 본 인덱스간의 맵핑이 있습니다.
		- 따라서 스켈레톤이 변경되면 애니메이션 데이터를 업데이트 해야합니다.
* FCompact Pose Bone Index
	- FCompactPose에서만 사용할 수 있는 인덱스입니다. FCompactPoseBoneIndex를 이용하여 여러 LOD를 가지는 Skelton Bone Index를 통합할 수 있습니다.
	- 모든 애니메이션 코드는 FCompactPose를 이용합니다. SkeletalMesh와 Skelton간의 대부분의 변환은 USkeleton에서 차즐 수 있습니다.

[본 인디시스를 이해하기](https://www.unrealengine.com/en-US/tech-blog/demystifying-bone-indices)


## 애니메이션 몽타주의 활용

|---|---|---|
|Start|Loop|End|
|Anim1|Anim2|Anim3|
|주문 외울 준비|주문을 외움|주문 종료|

이는 애님블루프린트에서 나눌 수 있지만, 애님 몽타주로도 가능합니다.

1. 몽타주에서 우클릭으로 섹션 추가, Start, Loop, End를 추가해줍니다.
    - Section 이란, 수학에서 섹션 또는 단면(斷面)은 다음 뜻으로 쓰인다.
    - 여기서는 애니메이션 위치를 마킹했다고 표현할 수 있습니다.

2. 몽타주 섹션에서 섹션의 끝에 다른 섹션을 연결함으로써 루프를 만들 수 있습니다.
    - 몽타주 섹션 플레이에서 플레이를 눌러보고 확인해 봅니다.. 
    - 참고로 UI가 상당히 별루입니다.
    - 분기로 나눠질 수 있는 애니메이션인 경우에는, Anim Blueprint를 이용하도록 합시다.

3. Anim Blueprint에서 몽타주를 재생 시킬 수 있도록 설정해야 합니다.

4. 키입력에 반응하는 몽타주 재생에서 입력했을 때 Start Section을 재생하고, 끝날때 End Section을 재생합니다. 이러면, Start로 시작해서, 루프에 있다가, End로 종료되는 몽타주 애니메이션을 만들 수 있습니다.

애님 블루프린트와 상태 머신을 결정 하는 기준을 나누기 애매하지만, 결론은 없다. 가능한 편한 용도로 사용하는 것이다.

상태는 로코모션의 상태(걷는, 가만히 있는)를 나타내지만, 몽타주는 움직이지 않는, 무시하고 재생하는 애니메이션이니 (재장전, 주문 외우기) 몽타주로 재생한다.

몽타주를 상태 머신에 추가하면, 심각하게 상태가 복잡해집니다.