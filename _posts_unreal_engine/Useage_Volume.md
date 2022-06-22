---
layout: post
title: Volume
---

UE 4.27
2022 06 21

# 엔진 지원

## 피직스 불륨이용하기

* Terminal Velocity(종단 속도)
    - 낙하시 CharacterMovement 를 사용하여 Pawn 의 종단 속도를 결정합니다.
* Priority(우선권)
    - 다수의 PhysicsVolume 이 겹칠 때의 우선권을 결정합니다.
* Fluid Friction(유체 마찰)
    - CharacterMovement 를 사용하는 Pawn 이 볼륨을 지나갈 때 볼륨에 적용시킬 마찰력의 양을 결정합니다. 값이 클 수록 볼륨을 통과하기가 어렵게 느껴집니다.
    - Fluid Friction이므로 Water Volume이 true일 때 적용됩니다.
* Water Volume(수량)
    - 볼륨에 물과 같은 유체가 들어있는지를 나타냅니다.
* Physics on Contact(접촉시 물리)
    - 액터를 건드리면 볼륨에 영향을 받을지를 결정합니다 (기본적으로 액터는 볼륨 안에 있어야 영향을 받을 수 있습니다).


Water Volume을 true로 설정한다면, CharacterMovement의 IsInWater()는 true를 반환하게 됩니다. (즉 물에 있습니다.)

## 포스트 프로세스 볼륨


# 확장
## Converyor Volume(컨베이어 볼륨)
컨베이어 볼륨에 겹쳤을 때, 원하는 방향으로 물체를 밀어내도록 구현합니다.

* 트렌스폼을 조정(AddActorWorldOffset)할 수 있습니다.
* AddForce로 구현 할 수도 있습니다