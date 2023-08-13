---
layout: post
title: UnityEngine
---

기본적인 자료형은 다음과 같습니다.

<details><summary>Vector3</summary>
<div markdown="1">

|Direction|Value|
|---|:-:|
|Vector3.forward|new Vector3(0, 0, 1)|
|Vector3.back|new Vector3(0, 0, -1)|
|Vector3.up|new Vector3(0, 1, 0)|
|Vector3.down|new Vector3(0, -1, 0)|
|Vector3.right|new Vector3(1, 0, 0)|
|Vector3.left|new Vector3(-1, 0, 0)|
|Vector3.one|new Vector3(1, 1, 1)|
|Vector3.zero|new Vector3(0, 0, 0)|

</div></details>

## 이벤트 함수의 실행 순서

[이벤트 함수의 실행 순서](https://docs.unity3d.com/kr/2021.3/Manual/ExecutionOrder.html)

Unity 스크립트를 실행하면 사전에 지정한 순서대로 여러 개의 이벤트 함수가 실행됩니다. 이 페이지에서는 이러한 이벤트 함수를 소개하고 실행 시퀀스에 어떻게 포함되는지 설명합니다.

## 주요 스크립트 API


유니티의 주요 Scripting API입니다.

<details><summary>Object.Instantiate</summary>
<div markdown="1">

[Object.Instantiate](https://docs.unity3d.com/ScriptReference/Object.Instantiate.html)

기존의 object를 복제하여 새로운 object를 생성하는 함수입니다. 복제할 때 parameter들을 이용하여 parent object, position, rotation등의 값들을 지정할 수 있습니다.

편집기의 Duplicate 명령과 유사한 방식으로 개체의 복사본을 만듭니다. GameObject를 복제하는 경우 해당 위취와 회전을 지정할 수 있습니다. 구성 요소를 복제하는 경우 연결된 Gaeobject도 선택적 위치 및 회전으로 복제됩니다.

</div></details>


<details><summary>메인 카메라 관리</summary>
<div markdown="1">

메인 카메라를 따로 두고, 타겟을 따라가도록 관리합니다.

<center><div markdown="1">

![Unity main camera](/images/UnityMainCamera.png)

</div></center>

</div></details>

<details><summary>카메라의 렌더 관리</summary>
<div markdown="1">

카메라의 Depth로 카메라의 순서를 조절할 수 있습니다. 한번에 여러 카메라를 이용할 수 있습니다. 여러 카메라를 이용할 때 Tag와 Depth 그리고 Rect를 신경써야 합니다.

</div></details>

<details><summary>유니티 물체이동</summary>
<div markdown="1">

- 다음은 행렬의 위치 성분값을 변경합니다.
    - 어떤식으로 작동되는지 모르겠습니다. Vector3를 이동시켰는데… 로테이션이 적용됩니다. 로컬 좌표계를 기준으로 적용되는 것 같습니다.

```csharp
transform.Translate(Vector3.forward * forwardSpeed * Time.deltaTime);
```

</div></details>

## MonoBehaviour

{% include _shared_block/DevelopmentEnvironment/Unity/Unity_MonoBehaviour.md %}

## Mesh

{% include _shared_block/DevelopmentEnvironment/Unity/Unity_CombinedMesh.md %}

## Other Package
### Mesh Backer

{% include _shared_block/DevelopmentEnvironment/Unity/Package/Unity_Package_MeshBacker.md %}

### Spline Mesh

{% include _shared_block/DevelopmentEnvironment/Unity/Package/Unity_Package_SplineMesh.md %}

### XR

{% include _shared_block/DevelopmentEnvironment/Unity/Package/Unity_Package_XR.md %}

### Asset Management

{% include _shared_block/DevelopmentEnvironment/Unity/Package/Unity_Package_AssetManagement.md %}