---
layout: post
title: Camera shake
---

# Camera shake

**카메라 흔들림 또는 화면 흔들림은 많은 비디오 게임에서 세계 또는 플레이어의 움직임 이벤트를 시뮬레이션하여 보다 사실적이거나 임팩트 있는 게임을 만드는 데 사용되는 기술입니다.** 

먼저 카메라 쉐이크를 적용하는 함수는 보통 **PlayController의 멤버 함수인 ClientPlayCameraShake와  UGameplayStatics의 전역 함수인 PlayWorldCameraShake가 있습니다.** 

* Client Play Camera Shake는 해당 플레이어의 카메라만을 흔들때 사용합니다. 
* PlayWorldCameraShake는 월드의 흔들림을 표시하는 용도로 사용합니다.
* [여기서 Camera shake의 튜토리얼을 볼 수 있습니다.](https://www.parallelcube.com/2021/03/23/camera-shakes/)
* [ueHow의 Play World Camera Shake를 볼 수 있습니다.](https://uehow.web.fc2.com/Contents/Eng/UE4/BluePrint/NodeReference_Game/PlayWorldCameraShake.html)

```cpp
GetWorld()->GetFirstPlayerController()->ClientPlayCameraShake(CS_shake, 1.0f);
```

```cpp
UGameplayStatics::PlayWorldCameraShake(GetWorld(), CS_shake, GetActorLocation(), ...);
```

## 카메라 쉐이크 옵션 기능
* Single Instance는 카메라 쉐이크를 여러번 재생했을 때, 한번 진동이 되게끔 하는 설정입니다.
* Oscillation Duration은 진동 지속 시간 / 초 단위입니다.
    - 음수이면 무한대로 재생됩니다.
* Oscillation Blend in Time은 블렌드 인 지속 시간으로 카메라 쉐이크 발동시 점점 강해지는 시간입니다.
* Oscillation Blend Out Time은 블렌드 아웃 지속 시간으로 카메라 쉐이크 발동시 점점 약해지는 시간입니다.

* Rot Oscillation은 카메라 회전 쉐이크입니다.
* Loc Oscillation은 카메라 위치 쉐이크입니다.
* FOV Oscillation은 카메라 화각 쉐이크입니다.
* Anim Shake는 카메라 애님 쉐이크로 그래프를 통한 직접적인 카메라 흔들기입니다.

* Amplitude는 카메라 쉐이킹 강도를 나타냅니다.
* Frequency는 카메라 쉐이킹 속도를 나타냅니다.
* Initial Offset은 카메라 초기 오프셋을 나타냅니다.

카메라 쉐이크를 C++클래스로 관리할 수도, Blueprint로 관리할 수도 있습니다. 이는 편의에 따른 선택입니다.

## 카메라 세이크 사용예시
* 폭팔
    - 캐릭터 근처에서 무언가가 폭팔할 때 충격파가 치고 플레이어를 혼란스럽게 하는 것을 표현합니다.
    - 흔들림은 거리에 따라 달라집니다.
    - Scale을 조절함으로서 폭팔의 크기를 조절할 수 있습니다.
* 충격효과
    - 캐릭터가 적이나 물체에 맞았을 때, 또는 캐릭터가 근접 무기로 적과 접촉했을 때 짧은 흔들림을 구현할 수 있습니다.
    - 여러 상황에서 여러 변형과 함께 사용할 수 있스니다.
* 캐릭터 모션
    - 카메라 스윙을 구현하여, 만취 모션을 구현할 수 있습니다.
    - 플레이어의 시야를 흐리게 하는 후처리 효과를 추가할 수 있습니다.
    - 달리는 효과에서는 FOV를 변경하여 미묘한 높이 진동 외에 가속감을 줄 수 있습니다.
    - Head bobbing(흔들리는)효과를 추가해, Velocity가 변경될 때 카메라 흔들림을 추가할 수 있습니다.
* 차량
    - 레버가 변경될 떄 앞쏠림을 구현할 수 있습니다.
* 환경
    - 지진등의 자연에서 발생하는 효과를 구현 할 수 있습니다.
    - 배에 타고있는 효과를 구현 할 수도 있습니다.
    - 바람이 부는 효과도 구현 할 수 있습니다.
* 위의 예제는 [해당 링크](https://www.parallelcube.com/2021/03/23/camera-shakes/)에 나와 있습니다.