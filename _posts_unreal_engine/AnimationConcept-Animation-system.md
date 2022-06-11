---
layout: post
title: Unreal engine Animation system
---

UE 5.01
2022 05 25

목표
* 절차적 애니메이션을 만들고 적용.
* 이를 위한 자료조사.

## Unreal engine Animating Characters and Objects

* Rig는 조작하다의 의미를 가지고 있습니다. 이미지로는 낚시줄이 나오는데 잘 모르겠습니다.

상세한 내용은 [공식문서](https://docs.unrealengine.com/5.0/en-US/animating-characters-and-objects-in-unreal-engine/)에서 읽을 수 있습니다.

* **[스켈레탈 메시 애니메이션 시스템(Skeletal Mesh Animation System)](https://docs.unrealengine.com/5.0/en-US/skeletal-mesh-animation-system-in-unreal-engine/)은 애니메이션 및 캐릭터 제어를 위한 언리얼 엔진 시스템입니다.**
    - 언리얼 엔진의 캐릭터 애니메이션은 애니메이션 생성을 위해 조작할 수 있는 조작된 메시인 스켈레탈 메시를 기반으로 구축됩니다. 
    - **애니메이션 블루프린트를 스켈레탈 메시로 확장하여 레벨 내에서 애니메이션 동작과 상호작용을 제어하는 로직을 적용할 수 있습니다.**
    * [Animation Editor](https://docs.unrealengine.com/5.0/en-US/animation-editors-in-unreal-engine/)을 이용하여 캐릭터 애니메이션, 레벨 내 상 호작용 및 기타 절차적 동작을 만들 수 있습니다.
        - Skeleton Editor는 릭 작업에 사용되며 스켈레탈 메시와 관련된 뼈 및 관절 계층 구조를 시각적으로 제어합니다.
        - Animation Sequence Editor에서 뼈대 배치를 조정 하고, 스켈레톤 소켓을 만들고, 애니메이션 곡선을 미리 볼 수 있습니다.
        - Skeletal Mesh Editor에서 스켈레탈 메시의 시각적 속성을 편집할 수 있습니다.
    * Animation Blueprint
        - 애니메이션 동작을 시각적으로 스크립팅하는 기능을 제공하는 시스템입니다. 또한 애니메이션 블렌딩, 스크립트 상호 작용 및 기타 절차적 동작을 제어할 수 있습니다.
        - **Skeletal Mesh Asset에서 Post Process Animation Blueprint로 변수가 선언되어 있습니다.**
        * Animation Blueprint Editor
            - Graph패널은 게임 플레이 중에 캐릭터를 제어하는 로직을 생성하는 곳입니다. 그래프에는 세가지 주요 유형이 있습니다.
            - **Event Graph는 다른 그래프 영역에 알리는 노드 속성과 변수를 정의하는 블루프린트 기반 로직을 구성하는 이벤트 그래프입니다.**
            - **Anim Graph는 현재 프레임에 대한 스켈레탈 메시의 최종 포즈를 평가하는 포즈 기반 로직을 구성합니다.**
            - **State Machine은 일반적으로 이동에 사용되는 상태 기반 논리를 구성합니다.**
        - Animation slot을 이용하여 일회성 애니메이션을 삽입할 수 있습니다. 슬롯은 주로 애니메이션 몽타주와 함께 사용 되지만 시퀀서에서도 사용할 수 있습니다. **슬롯의 주요 목적은 애니메이션 블루프린트에 애니메이션을 삽입할 수 있는 애님 그래프의 위치를 제공하는 것입니다.**
            - 슬롯을 블렌딩 노드와 함께 사용하여 상체나 팔과 같은 캐릭터의 특정 본에서만 발생하도록 재생을 분리할 수도 있습니다.
            - Anim Slot Manager window에서 만들 수 있습니다.
            - **애니메이션 몽타주에서 슬롯을 할당하여 사용할 수 있습니다.** 
        - State Machines는 복잡한 애니메이션 블렌딩을 쉽게 처리하기 위하여 고안되었습니다. 상태 머신은 스켈레탈 애니메이션을 다양한 상태로 나눌 수 있게 해줍니다.
        - Graphing in Animation Blueprints(애니메이션 블루프린트의 그래프 그리기)를 사용하는 주된 방법은 애님 그래프와 이벤트 그래프에서 로직을 만드는 것 입니다.
            - [공식문서](https://docs.unrealengine.com/5.0/en-US/graphing-in-animation-blueprints-in-unreal-engine/)에 방법들이 설명되어 있습니다.
            - 애님 그래프는 캐릭터에 대한 애니메이션 관련 로직을 생성하는 곳입니다. 일반적으로 여기에는 혼합, 본 병형, 트렌스폼 및 기타 유사한 애니메이션 효과를 제어하는 노드 생성이 포함됩니다.
            - 실행 흐름 및 정보는 이벤트 발생에 따라 재생 중 시각화됩니다. 애님 그래프는 이벤트 기반이 아니며 매 프레임마다 평가되기 때문에 항상 실행 흐름을 표시한다는 점에서 다릅니다.
            - 쓰레드 나오닌까 이해하기 급격히 어려워 지는구만!
            - **애니메이션 블루프린트의 성능을 향상시키기 위해 업데이트 애니메이션 대신 사용할 수 있습니다.** BlueprintThreadSafeUpdateAnimation을 오버라이드 함으로써 사용할 수 있습니다. BlueprintThreadSafeUpdateAnimation이 먼저 호출되고 그 다음 AnimGraph가 호출됩니다.
        - **Sync Groups를 이용하여 재생 길이가 다른 두 에니메이션을 혼합하여 자연스러운 결과를 얻을 수 있습니다.**
            - 동기화 그룹은 역활 개념으로 작동합니다. 하나의 애니메이션은 리더이고 다른 모든 애니메이션은 팔로워 입니다.
            - 기본적으로 blende중에 가장 가중치가 높은 애니메이션이 리더로 간주됩니다.
            - **이 방법은 애니메이션의 길이를 일치시키는 방법이므로 시작 애니메이션의 일반적인 특징(오른발이 디딘 상태로 시작)이 일치하지 않는다면 이상한 결과를 가져올 수 있습니다.**
            - **블렌딩하는 애니메이션 사이에 급격한 길이 차가 있다면 애니메이션이 전환될 때 튀는 현상이 발생할 수도 있습니다.**
            - Sync Marker를 이용하여 애니메이션의 재생이 애니메이션의 타임라인을 따라 배치된 마커 간의 재생으로 동기화 시킬 수 있습니다.
            - 복잡한 애니메이션 블루프린트의 경우 동기화 그룹을 관리하는 것은 상당히 귀찮을 수 있습니다. 그럴 때 Graph based sync를 이용할 수 있습니다. 그래프 기반 동기화를 사용하여 단일 동기화 그룹을 다양한 하위 그래프 및 자식 노드로 전파할 수 있습니다.
            - 추가적으로 위와 유사하게 Blend space graphs를 이용할 수 있습니다.
        - [Animation Node Reference](https://docs.unrealengine.com/5.0/en-US/animation-blueprint-nodes-in-unreal-engine/)는 AnimBP는 EventGraph(애니메이션 논리 및 상호 작용 동작을 제어), AnimGraph(개채에 대한 애니메이션 포즈 출력을 제어)하는 용도로 나뉩니다.
            - ????
        - **Animation blueprint link를 이용하여 다른 애니메이션 블루프린트 내에서 애니메이션 블루프린트의 일부를 재사용 할 수 있습니다.** 이는 복잡한 애니메이션 블루프린트를 효과적으로 다룰 수 있습니다.
            - **Linked Anim Blueprints를 이용하여 다른 Anim Blueprint를 불러올 수 있습니다.** 이때 Input pose와 변수를 노출 시킬수 있습니다.
            - **Linked Anim Layers를 사용하면 보다 표준화된 형식으로 연결할 수 있습니다.** 이를 위해서는 Animation Layer Interface를 생성해야 합니다. **단일 애니메이션 블루프린트를 지속적으로 업데이트하고 관리하는 대신 로직을 이러한 레이어로 분리하는 것은 협업 및 메모리 절약을 가능하게 합니다.** 
            - 애니메이션 블루프린트를 여러 애셋 파일로 분할하여 Linked Anim Layers로 애니메이션 메모리를 제어가 가능합니다. 연결된 레이어가 포함된 애니메이션 블루프린트는 언리얼 엔진의 메모리 관리 시스템을 사용하여 필요할 때 로드 및 언로드 할 수 있게 됩니다. 따라서 연결 해제된 애니메이션 블루프린트를 메모리에서 제거하려면 스트리밍 로직을 추가로 설정해야 합니다. 흠... 이거는 어떻게 정리할까? 유부초밥먹고싶다.
            - Animation Layer Interface를 생성 후 Anim Blueprint에서 상속함으로써 구현 가능하게 만들고, 마지막으로 Link Anim Class Layers를 이용하여 래아오 사수탬애 바인딩하여 내부 레이어 로직을 덮어씌웁니다.
                - **무기 액터 블루프린트에 Weapon Animation Blueprint Layer에 대한 참조를 저장하고, 무기가 활성화 될 때만 Animation을 로드하는 로직을 작성합니다.**
                - **활 또는 로켓 발사기와 같은 다른 무기에 대한 유사한 로직 및 자산을 만들 수 있습니다.**
                - **각 무기는 연결된 애니메이션 블루프린트 레이어에 대한 참조를 저장하므로 해당 무기가 로드될 때 특정 애니메이션만 로드되게 됩니다.**
    * Animation Assets and features
        - **로코모션(운동)**
            - **루트 모션을 활성화 하면 루트 본의 모션 데이터를 사용하는 애니메이션 시퀀스에 의해 캐릭터의 움직임이 구동될 수 있습니다. 루트 모션이 있는 애니메이션을 활성화 하면 레벨 내에서 보다 현실적이고 근거 있는 움직임 동작과 상호 작용을 생성할 수 있습니다.**
            - Pose warping(포즈 뒤틀림)을 활성화 하여 캐릭터의 애니메이션 포즈를 동적으로 조정하여 캐릭터 움직임에 맞출 수 있습니다. 이를 이용하여 애니메이션과 게임플레이를 동시게 개발할 수 있게 됩니다.
            - **Motion warping은 캐릭터의 루트 모션을 동적으로 조정하여 대상에 맞출 수 있는 기능입니다.** 이를 이용해 루트모션을 월드와 자연스럽게 상호작용 하도록 만들 수 있습니다.
            - **Distance Matching은 시간 기반으로 재생이 아닌 거리 변소루 애니메이션 시퀀스를 구동할 수 있습니다.**
                - 캐릭터 위치에서 지면까지의 남은 거리를 기반으로 애니메이션 포즈를 선택하는 것을 보여줍니다.
        - Animation Composite을 통해 애니메이션 시퀀스를 하나의 시퀀스로 재생할 수 있는 단일 자산으로 결합할 수 있습니다. 그러나 혼합과 같은 추가 기능은 제공하지 않습니다. 
        - **Animation Pose Assets를 이용해 애니메이션 시퀀스의 타임라인에서 포즈 A와 포즈 B를 혼합하는 새로운 모션을 만들 수 있습니다.**
        - Animation Sequence는 캐릭터를 애니메이션화 하기 위해 스켈레탈 메시에서 재생할 수 있는 애니메이션 데이터가 포함된 애니메이션 자산입니다. 애니메이션 시퀀스에는 특정 시점의 스켈레탈 메시 스켈레톤의 위치, 회전, 스케일을 지정하는 키프레임이 포함되어 있습니다.
            - Sync Marker를 추가할 수 있습니다.
            - **스켈레탈 구조가 동일한 경우 호환 가능으로 정의하여 애니메이션 시퀀스를 공유할 수 있습니다.**
            - **스켈레톤을 공유하지만 비율이 다른 경우 리타겟팅을 통해 애니메이션을 공유할 수 있습니다.**
            - Additive Layer Track 또는 Curves를 통해 애니메이션 시퀀스에서 작업할 수 있습니다.
            - 그다음 녹화를 통해 새로운 애니메이션 시퀀스를 만들 수 있습니다.
            - 애니메이션 압축을 통해 애니메이션 메모리 비용을 줄여 프로젝트의 성능을 향상시킬 수 있습니다.
            - ?? 본도 압축할 수 있습니다.
            - ???? 곡선도 압축할 수 있습니다.
            - 찾아봐야 알겠지만, 나라면 Default Skeletal을 만든 후 리타겟팅을 통해 애니메이션 시퀀스를 공유할 수 있도록 작성하고, Default Skeletal을 통해 애니메이션을 작업하는 방향으로 만들 것 같다.
        - **Animation Modifiers를 통하여 자동 발 Sync 마커를 만드는 등의 작업을 적용할 수 있도록 하는 네이티브 또는 블루프린트 클래스 유형입니다.**
            - **Animation Data에 Anim modifer를 적용하면 스켈레톤을 기반으로 하는 모든 애니메이션 시퀀스에 적용됩니다. 애니메이션 시퀀스에 수정자를 적요하면 시퀀스 자체에만 적용되고 다른 시퀀스에는 적용되지 않습니다.**
            - 실험기능이며 [공식문서](https://docs.unrealengine.com/5.0/en-US/animation-modifiers-in-unreal-engine/)에 설명이 나와있습니다.
            - Foot의 Sync마커의 경우 모든 애니메이션 시퀀스에 적용되어야 한다 생각합니다.
        - Animation Montages는 애니메이션 시퀀스를 단일 자산으로 결합해주며 Animation Composite보다 더 많은 기능을 제공해줍니다.
            - 이를 활용하기 위해서는 [애니메이션 몽타주 사용](https://docs.unrealengine.com/4.27/en-US/AnimatingObjects/SkeletalMeshAnimation/AnimMontage/UserGuide/)과 [계층화된 애니메이션 사용](https://docs.unrealengine.com/4.27/en-US/AnimatingObjects/SkeletalMeshAnimation/AnimHowTo/AdditiveAnimations/)을 읽을 수 있습니다.
            - **Anim Montages를 재생하면 Anim Montage의 슬롯을 통해서 Anim Blueprint와 연결 시킬 수 있습니다.**
        - Blend space는 여러 애니메이션이나 포즈를 1차원 또는 2차원 그래프에 그려서 혼합할 수 있는 애셋입니다.
            - 블렌드 스페이스는 조준 오프셋, 조준 오프셋1D 블렌드 스페이스, 블렌드 스페이스 1D의 애셋 유형이 있습니다.
            - 조준 오프셋은 일반적으로 무기 또는 기타 조준 블렌드 공간을 만드는데 사용됩니다.
            - **애셋 디테일에서 스무딩 옵션을 이용해서 자연스러운 보간을 적용할 수 있습니다.**
        - Skeletons는 본(세그먼트)을 정의 하느데 사용되는 계층 구조입니다.
            - **스켈레톤 애셋의 중요 기능은 본의 이름과 계층적 순서가 일관되면 단일 스켈레톤 애셋을 여러 스켈레탈 메시에서 사용할 수 있다는 점 입니다.**
            - Compatible Skeltons는 스켈레톤 병합과 유사하게 작동하지만, 별도의 스켈레톤 애셋을 유지함으로써 안전한 방식으로 스켈레톤을 공유합니다.
            - **virtual bone을 소총과 손 위치를 유지하는 등 복합적인 애니메이션의 흔들림 문제를 해결할 수 있게 합니다.**
                - 가상본을 만든 후 기본적으로 재생될 Slot과 손모양을 결정할 Slot을 나눕니다.
                - 이를 위해서 애니메이션 에디터에서 Blend Mask를 적용해야 합니다.
                - 가상 본 슬랏의 AnimGraph를 가상 본 블렌드 마스크로 설정된 Layered blend per bone과 연결시킵니다.
                - 기본 애니메이션에 가상본 애니메이션을 Apply Addtive합니다.
                - 마지막으로 가상본에 IK를 설정합니다.
            - Skeletal Mesh LOD를 사용하여 LODF를 생성할 수 있습니다.
        - **미러링 애니메이션은 캐릭터의 한 면에서 다른 면으로 애니메이션을 복사하고, 다른 상황에서 동일한 애니메이션을 재사용 할 수 있습니다.**
            - 두 번째 사본을 관리할 필요 없이 미러링된 애니메이션을 생성하는 방법을 제공합니다.
            - 블루프린트에서 미러링된 애니메이션을 감지 할 수 있습니다.
        - Skin Weight Profiles(SWP)를 사용하여 로우 엔드 플랫폼에서 시각적 충실도를 향상시킬 수 있습니다. 스킨 웨이트 프로파일을 사용하면 비싼 역학 대신 적절한 대안을 제공합니다.
            - [Unreal engine에서 클로딩 툴 공신문서 는 Physics에 있습니다.](https://docs.unrealengine.com/5.0/ko/clothing-tool-in-unreal-engine/)
        - 애니메이션 공유 플러그인
        - 정점 애니메이션 도구
    * Debugging and optimize
        - 디버거 되감기
            - Animation Insight란 것도 있네??
        - 애니메이션 최적화
            - 애니메이션 최적화 방법들을 설명함
        - 애니메이션 예산 할당자
            - 스켈레탈 메시 컴포넌트 틱을 동적으로 조절하여 애니메이션 데이터에 걸리는 시간을 제한하는 시스템.
    * 애니메이션 단축키 및 팁
        - 별의별 내용이 다 있구만,
* Cinematics and Sequencer
    - Sequencer는 시간이 지남에 따라 액터, 카메라, 속성 및 기타 자산을 직접 조학할 수 있는 시네마틱 툴 셋입니다.
    - 이 워크폴로우는 트랙과 키프레임이 타임라인을 따라 생성되고 수정되는 비선형 편집 환경을 제공함으로써 달성됩니다.
    - 시퀀서를 이용해 월드의 기본 애니메이션을 제작할 수 있습니다.
        - 예를 들어 카메라, 캐릭터, 라이트, 파티클 애니메이션을 만들 수 있습니다.
    - 레벨 시퀀스 애셋은 시퀀서의 데이터를 담고 있습니다. 여기에는 트랙, 카메라, 키프레임 및 애니메이션이 포함됩니다.
    - 레벨 시퀀스 액터는 레벨에 있으며 레벨 시퀀스 애셋 용 컨테이너 입니다.
    - **게임 플레이와 시퀀서 애니메이션을 매끄럽게 혼합할 수 있습니다.**
    - 시퀀서와 애니메이션 블루프린트를 혼합하여 사용할 수 있습니다.
* Control Rig
    - Contol RIg는 엔진에서 캐릭터를 직접 애니메이션화하는 언리얼 엔진의 솔루션 입니다.
        - **forward solve는 시퀀서 및 애니메이션 블루프린트 내에서 사용됩니다.**
        - **backward solve는 애니메이션 시퀀스의 애니메이션을 Control Rig에 굽는데 사용됩니다.**
        - Setup Event는 Control Rig의 초기화 후 한번 실행됩니다.
    - Control Rig Editor에서는 캐릭터에 대한 사용자 정의 컨트롤, 채널 및 기타 조작기를 만들 수 있습니다. 리그를 만든 후에는 **시퀀서와 같은 Unreal Engine의 다른 영역 내에서 이러한 컨트롤을 에니메이션화 할 수 있습니다.**
    - Control Rig를 이용해서 Unreal에서 Animation을 만들 수 있습니다.
    - **AnimBlueprint에서 ControlRig로 호출할 수 있습니다. 이를 이용해 보다 자연스로운 애니메이션을 만들 수 있습니다.**
        - Animation을 만들 때 FK Control Rig를 이용하여 Control Rig를 만들지 않고 작업할 수 있습니다.
    - Anim Graphr가 멀티스레드를 이용한 업데이트가 아닐 경우 멀티 쓰레드에서 안전하지 않은 함수는 호출할 수 없습니다.
        - 따라서 Trace함수는 호출할 수 없습니다.
        - **애니메이션을 업데이트 할 떄 멀티 쓰레드를 이용한 업데이트는 필수라고 생각하므로 Trace를 적용할 다른 방법이 필요합니다.**
    - Control Rig의 포즈 캐싱 기능은 **컨트롤 리그 그래프에서 애니메이션 포즈를 저장하고 다른 시간에 적용하는 데 사용됩니다.**
        - 따라서 포즈 캐싱을 위해서는 Control Rig Asset을 필요로 합니다.
        - ??? 포즈 캐싱을 통해서 Control Rig끼리 포즈를 공유할 수 있나요? 적혀 있는 것들로 봤을 때는 공유되는거 같은데.
* IK Rig
    - **IK Rig Editor에서 다양한 솔버를 만들고 뼈대 설정을 조정할 수 있습니다.**
    - 이렇게 만들어진 IK Rig는 AnimBlueprint에서 IK Rig를 통해서 불러올 수 있습니다.
* Paper 2D
    - 페이퍼 2D는 에디터 내에서 2D 및 2D/3D 하이브리드 게임을 제작하기 위한 스프라이트 기반 시스템입니다. Paper2D의 핵심에는 스프라이트가 있습니다. 스프라이트 편집기를 사용하여 UE4 내에서 스프라이트를 편잡하고 플립북으로 스프라이트 기반 애니메이션을 만들 수 있습니다.
    - 추가적으로 [spine 플러그인](Plugin-Spine)을 볼 수 있습니다.
* 그외
    - [라이브 링크](https://docs.unrealengine.com/5.0/en-US/skeletal-mesh-animation-system-in-unreal-engine/)

# Useage

* 애니메이션 혼합
    - Animation blending은 개념적으로 단일 스켈레탈 메시에서 둘 이상의 애니메이션 사이를 부드럽게 전환하는 것을 의미합니다.
    - [AnimGraph는 코딩할 수 없으므로 CPP에서 애니메이션 블렌딩을 실행 할 수 없습니다.](https://forums.unrealengine.com/t/blend-two-animations-in-c/466229)
    - **스켈레톤의 특정 본과 자식에게 애니메이션을 적용함으로써 캐릭터가 달리는 애니메이션에서 오른쪽 팔만 흔드는 애니메이션을 선택적으로 적용할 수 있습니다.**
    - ? Animation Montage를 이용하여 Blend할 수 있습니다.
    - ? Animation Blueprint Interface를 이용하여 보다 복잡한 작업을 수행 할 수 있습니다.
* 계층화된 애니메이션(Layered Animations) 사용
    - 슬랏을 이용해 계층화된 애니메이션을 구현할 수 있습니다. 이를 통해 캐릭터가 달리는 애니메이션으로 시작하여 캐릭터의 상체에 선택적으로 슈팅 애니메이션을 적용할 수 있습니다.
    1. 혼합할 애니메이션을 설정합니다. 애니메이션 몽타주를 만들고 몽타주에서 실행할 애니메이션의 슬랏을 설정합니다.
    2. 포즈를 캐싱한후 자연스럽게 블렌딩 될 수 있는 로직을 작성합니다.
    3. 슬랏으로 몽타주가 애님 블루프린트에서 실행되도록 작성합니다.
    4. 블랜드 설정에서 블렌드를 설정합니다.
* 조준 오프셋 만들기
    - 캐릭터가 무기를 조준하는 데 도움이 되도록 혼합 가능한 일련의 포즈를 저장하는 애셋입니다.
    - ? Blend로 Aim Offset을 만드는게 그렇게 어렵다고 생각되지는 않는데 AimOffset을 만든 이유는 무엇일까?
* 애니메이션 블루프린트 오버라이드
    - **Anim blueprint를 상속받음으로 Asset Override Edtior에서 다른 애니메이션이 실행되도록 오버라이드 할 수 있습니다.**
* Creating a Pose Asset
    - 이 시스템을 사용하여 포즈를 만들고 또 혼합하여 새로운 포즈를 만들 수 있습니다.
    - 포즈로 부터 새 애니메이션을 만들 수 있습니다.
* 곡선 기반 애니메이션
    - 애니메이션 생성해서 Create Reference Pose를 이용하여 포즈를 이용하여 애니메이션을 생성할 수 있습니다.
* 애니메이션 레이어 편집
    - 애니메이션 레이어 편집을 통해 기존 애니메이션을 수정하거나  시퀀스로 부터 새로운애니메이션을 만들 수 있습니다.
* 애니메이션 블루프린트 링크 사용하기
    - 애니메이션 블루프린트는 더이상 사용하지 않는 애니메이션 에셋을 로드하지 않기 때문에 메모리 절약이 가능합니다.
    - 하위 섹션을 동적으로 전환할 수 있어 다중 사용자 협업과 메모리 절약이 모두 가능합니다.
    - 그렇다는 말은 로드하는데 오래 걸리는 애니메이션이라면 애님 인스턴스에서 로드되도록 만들어야 한다고 생각합니다.
* **리타겟팅된 애니메이션 사용하기**
    - 애니메이션 리타기팅은 동일한 스켈레톤 자산을 사용하지만 비율이 크게 다를 수 있는 애니메이션을 재사용 할 수 있도록 하는 기능입니다.
    - 키가 큰 캐릭터가 더 빨리 달리거나, 하는 등의 설정은 플레이어에게 달려있습니다.
    - 원본 애니메이션의 손을 따라가는 별도의 스켈레톤 체인을 만듬으로써 총이나 소품등에서 리타겟팅 문제를 해결할 수 있습니다.
* 서브 애님 인스턴스 사용하기
    - Sub Anim Graph를 통해 다른 애니메이션 블루프린트 내에서 애니메이션 블루프린트 일부를 재사용 할 수 있습니다.
    - 이는 복잡한 애니메이션 블루프린트를 만드는데 유용할 수 있습니다.
* **운동 기반 혼합**
    - 조금더 찾아봐야할 필요성을 느낌.
    - 적용을 한다고 하면,
    - 구조를 어떻게 잡아야 할지를 모르겠음.
    - 어디가 얼만큼 실행되는지를 모르겠음.
    - 피직스 블랜드 웨이트로 Weight를 조절할 수 있다고 함.
* 다른 스켈레탈 메시에서 포즈 복사???
* 동적 애니메이션 만들기
    - 제약조건을 가진 본의 시뮬레이션을 활용하여 애니메이션이 보다 사실적으로 보여지게 만듬.
* 애니메이션 리타게팅
* 캐릭터 설정
* 얼굴 애니메이션 공유(Facial Animation Sharing)
    - Bone데이터를 제외하고 곡선 데이터를 공유함으로써 다른 스켈레탈 메시간의 애니메이션을 공유할 수 있음.
* 물리학 기반 애니메이션
    - 물리학 기반 애니메이션 결과를 혼합하여 캐릭터를 레그돌로 만들 수 있음.
* 애니메이션 포즈 스냅샷
* 모듈식 캐릭터 작업
    - Copy Pose From Mesh를 이용해서 모듈식 애니메이션 작업이 완성되도록 할 수 있습니다.
* 기계학습 Deformer 사용 (? 어디다 쓰는 용도일까?)
    - 마야에 학습 데이터 생성 후, MLDeformer플러그인으로 적용. 현재 experimental단계임.
* IOS기기에서 얼굴 애니메이션 녹화하기

* IK Solver를 Control Rig에서 사용할 수 있나?

## Implement
* [IK를 이용한 걷는 애니메이션](https://www.youtube.com/watch?v=c4-KYbYyxhg)
    - 걷는 애니메이션을 준비합니다.
    - 발의 x, y값을 기억합니다. (일반적인 서있는 상태)
    - 레이 케스트로 발이 지면과 부딛히는 z값을 구합니다.
    - 애니메이션의 z값과 지면의 z값을 이용해서 발위치를 수정합니다. 

* [Unreal engine Jump prediction](https://www.youtube.com/watch?v=pL-k4a7opWk)
    - 시뮬레이션 해서 떨어지는 포지션을 구합니다.
    - 캐릭터의 콜리전이 캡슐이므로 캡슐을 시뮬레이션합니다.
    - 떨어지는 위치를 구했다면, 애니메이션과 바인딩 해서 사용할 수 있습니다. 

* [잔상 효과](https://mingyu0403.tistory.com/247)
    - 애니메이션 되는 스켈레탈 메쉬의 포즈를 새로 스폰된 포즈어블 메쉬에 포즈로 설정합니다.
    - 노티파이로 애니메이션 효과를 보여줄 수 있습니다.

* [Interaction with IK](https://www.reddit.com/r/Unity3D/comments/pz6j39/made_an_ik_interaction_tool_it_takes_only_two/)
    - 이거 공들여서 이해하고 싶은데.
    - 일단은 초보임으로, 1인 캐릭터를 기준으로 만들어야 하나?

* [Using Control Rig in Unreal Engine](https://www.youtube.com/watch?v=y2WzNvJZk0E)

* [Animating with the Control Rig Sample Project](https://www.youtube.com/watch?v=SIp4vFoU_d8)

* [Animation Bootcamp : An Indie Approach to procedural Animation](https://www.youtube.com/watch?v=LNidsMesxSE)

* [IK Rig : procedural pose animation](https://www.youtube.com/watch?v=KLjTU0yKS00)

* [Making the believable horeses of 'Red Dead Redemption II'](https://www.youtube.com/watch?v=8vtCqfFAjKQ)

* [Generalizing Locomotion Style to New Animals With Inverse Optimal Regression](https://grail.cs.washington.edu/projects/inverse_locomotion/paper/animal_motion_joint_inverse.pdf)

* Rune Skovbo Johansen의 "Automated Semi-Procedural Animation for Character Locomotion'

* https://forums.unrealengine.com/t/how-to-share-1-animation-between-2-skeletons/232893/2

## 읽어볼만한 것들

* [NDC 프로젝트 DH의 절차적 애니메이션 시스템](http://ndcreplay.nexon.com/NDC2017/sessions/NDC2017_0026.html#k%5B%5D=%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98)
* [NDC 프로젝트 DH의 절차적 애니메이션 시스템2](http://ndcreplay.nexon.com/NDC2018/sessions/NDC2018_0042.html#k%5B%5D=%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98)

## 언리얼 엔진 애니메이션 시스템