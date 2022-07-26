---
layout: post
title: Control Rig
---


# Control Rig
## Control Rig란?
Contol RIg는 엔진에서 캐릭터를 직접 애니메이션화하는 언리얼 엔진의 솔루션 입니다.

캐릭터에 대한 사용자 정의 컨트롤을 만들고 조작할 수 있고, 시퀀서 에서 애니메이션을 적용할 수 있으며, 기타 다양한 애니메이션 도구를 사용하여 애니메이션 프로세스를 지원할 수 있습니다.

* Rig는 조작하다의 의미를 가지고 있습니다. 이미지로는 낚시줄입니다.
* Message Log / Control RIg Python Log를 통해서 파이썬 명령어를 볼 수 있습니다. 
* 조작할 수 있는 것과 잘만드는 것은 다르다는 것을 알고 **애니메이터를 신뢰합시다.**

[컨트롤 리그](https://docs.unrealengine.com/4.27/en-US/AnimatingObjects/SkeletalMeshAnimation/ControlRig/) **공식문서를 차분히 읽어볼 수 있습니다.** 추가적으로 4.27에서는 실험적이지만, 5.0에서는 공식으로 바뀌었습니다.

## Control Rig의 solve
**forward solve는 시퀀서 및 애니메이션 블루프린트 내에서 사용됩니다.** **backward solve는 애니메이션 시퀀스의 애니메이션을 Control Rig에 굽는데 사용됩니다.** Setup Event는 Control Rig의 초기화 후 한번 실행됩니다.

Control Rig Editor에서는 캐릭터에 대한 사용자 정의 컨트롤, 채널 및 기타 조작기를 만들 수 있습니다. 리그를 만든 후에는 **시퀀서와 같은 Unreal Engine의 다른 영역 내에서 이러한 컨트롤을 에니메이션화 할 수 있습니다.**

* Control Rig를 이용해서 Unreal에서 Animation을 만들 수 있습니다.
* **AnimBlueprint에서 ControlRig로 호출할 수 있습니다. 이를 이용해 보다 자연스로운 애니메이션을 만들 수 있습니다.**
* Animation을 만들 때 FK Control Rig를 이용하여 Control Rig를 만들지 않고 작업할 수 있습니다.

Control Rig의 포즈 캐싱 기능은 **컨트롤 리그 그래프에서 애니메이션 포즈를 저장하고 다른 시간에 적용하는 데 사용됩니다.**
    - AnimBlueprint의 포즈 캐싱과 비슷합니다.