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