---
layout: post
title: Folder & Prefab & Package
---

## Folder

- [ ] 폴더를 어떻게 관리할 것인가?

* 폴더를 어떻게 정리하냐에 진행방향이 결정됩니다.
* 규모가 클수록 폴더를 세밀하게 정리해야 합니다. 그렇지 않으면 관리가 안됩니다.

<details><summary>폴더구조 예시</summary>
<div markdown="1">

![RoomComponentPrefabExample](/images/RoomComponentPrefabExample.png)

Prefabs/Rooms/RoomComponent/Room…의 폴더구조에서 Rooms의 Prefab은 RoomComponent의 Prefab들을 이용해서 만들어져 있습니다.

</div></details>

## Prefab
### Prefab
{% include _shared_block/DevelopmentEnvironment/Unity/Unity_Prefab_01_Default.md %}

### Nested Prefab
{% include _shared_block/DevelopmentEnvironment/Unity/Unity_Prefab_02_NestedPrefab.md %}

### Prefab Variants
{% include _shared_block/DevelopmentEnvironment/Unity/Unity_Prefab_03_PrefabVariants.md %}

## Package
- [ ]  패키지
    - 패키지를 내보낼 수 있으며, 당연하게 패키지를 불러올 수 있다.
- [ ] Asset을 구매하면 Unity의 PackageManager에서 Asset을 볼 수 있습니다.
    - `Reference Explorer`

[Unity Package and Feature Sets](https://docs.unity3d.com/Manual/PackagesList.html)

패키지 에는 프로젝트의 다양한 요구 사항에 맞는 기능이 포함되어 있습니다 . 여기에는 에디터 설치 중에 포함된 핵심 Unity 기능이나 필요에 따라 설치할 수 있는 기타 패키지가 포함될 수 있습니다.

* 패키지를 이용할때는 특히 버전을 신경써야합니다.
  * 이를 위해서 마지막 업데이트를 언제했는지 확인해야합니다.
  * 유니티의 프로젝트, 패키지등의 버전을 함부로 올리면 안됩니다. API가 달라져 오류에 고통받습니다.
* Asset을 구매할 때, 시트란 개념이 있습니다. 이는 몇명이 애셋을 공유할 수 있는지를 나타냅니다.

<details><summary>XR Setting</summary>
<div markdown="1">

[VR Project Setup](https://learn.unity.com/tutorial/vr-project-setup?uv=2021.3&pathwayId=627c12d8edbc2a75333b9185&missionId=62554983edbc2a76a27486cb#)

[XR Rig Simulator Keyboard Shortcuts](https://connect-prd-cdn.unity.com/20210604/28db6ca9-aba1-4ac3-a15a-24664daff3ea/Rig%20Simulator%20Keyboard%20Shortcuts.pdf)

**Device Simulator**로 장면을 테스트할 수 있습니다 . 이 시뮬레이터를 사용하면 장치에 연결하고 착용할 필요 없이 마우스와 키보드를 사용하여 편집기 내에서 앱을 테스트할 수 있습니다. 이는 빠른 테스트에 도움이 될 수 있습니다.

</div></details>

<details><summary>Steam VR</summary>
<div markdown="1">

1. [Steam VR](https://assetstore.unity.com/packages/tools/integration/steamvr-plugin-32647)을 설치합니다.
2. 플레이할 씬에 [CameraRig]를 추가합니다.

</div></details>

<details><summary>Addressable asset</summary>
<div markdown="1">

[Addressables](https://docs.unity3d.com/Packages/com.unity.addressables@1.20/manual/index.html)

Addressable 시스템은 런타임에 자산을 로드하고 릴리스하기 위한 API와 애플리케이션용 콘텐츠를 구성하고 패키징하는 도구와 스크립트를 제공합니다.

**자산을 "주소 지정 가능"으로 만들면 해당 자산의 주소를 사용하여 어디에서나 로드할 수 있습니다. 해당 자산이 로컬 애플리케이션에 있든 콘텐츠 전송 네트워크에 있단 Addressable 시스템은 이를 찾아 반환합니다.**

</div></details>