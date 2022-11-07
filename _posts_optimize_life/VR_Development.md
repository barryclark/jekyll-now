---
layout: post
title: VR Development
---

- [ ] Steam VR 및 Google VR API
- [ ] [Testing in VR without equipment](https://forums.unrealengine.com/t/testing-in-vr-without-equipment/462833)
- [ ] [UI Widget 직접 누르기](https://docs.unrealengine.com/4.27/ko/InteractiveExperiences/UMG/HowTo/InWorldWidgetInteraction/)

## VR

코어 프로그램으로 Steam VR과 Google VR 등이 있습니다.

<details><summary>Steam VR</summary>
<div markdown="1">

[개발을 위한 Steam VR 퀵 스타트](https://docs.unrealengine.com/4.27/ko/SharingAndReleasing/XRDevelopment/VR/VRPlatforms/SteamVR/QuickStart/)

1. SteamVR 초기 구성을 설치합니다.
2. 언리얼에서 VR 프리뷰로 실행합니다.

</div></details>

VR 장치로는 바이브 등이 있습니다.

<details><summary>바이브</summary>
<div markdown="1">

![바이브 입출력](https://t1.daumcdn.net/cfile/tistory/9944023B5A70A6B624)

</div></details>

## 샘플 예시

<details><summary>콜리전을 이용한 월드의 UI 상호작용시</summary>
<div markdown="1">

자연스럽게 작동하기 위해 다음과 같은 코드를 작성할 수 있습니다.

```cpp
if (this::IsNoTouch() &&
    IsUserFaceToWidget(OtherComponent, OverlapedComponent))
    {
        // 오버랩 이벤트
        ...
    }
```

* Screen만 담당하는 클래스를 추가하여 만들 수 있습니다.


**자연스러운 터치를 위해 콜리전의 크기를 조정**

상호작용되는 버튼의 크기를 실제보다 작게 만듬으로써, 콜리전의 크기로 인해 다른 버튼이 눌리는 것을 줄일 수 있습니다. **다만 조금더 생각해봅시다.**

**드래그로 탭 되지 않게 하기**

큰 박스 콜리전을 두어, 컨트롤러의 콜리전이 오버라이드 이벤트를 발생시켜 탭하면, 큰 박스 콜리전과의 오버랩이 끝날 때 까지, 오버라이드 이벤트시 동작하지 않게 하면 드래그로 탭 이벤트가 발생하지 않게 할 수 있습니다. 

즉, 이벤트가 발생할 때는 

* 더티 플래그 패턴은 불필요한 작업을 피하기 위해 실제로 필요할 때까지 그 일을 미루는 의도입니다. 비슷하나 다른 개념입니다.

<details><summary>Mobile Gesture</summary>
<div markdown="1">

![Touch Gestures](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F2611613A5758E5B932)

* 이러한 인터랙션은 UI 가이드 문서를 제작할 때 화면의 플로우(Flow)를 보여주기 위해 주로 사용합니다.
* 디자이너와 개발자의 소통에 있어서도 관련 용어의 정의를 정확히 알고 있다면 서로에게 명확한 단어로 의사를 전달 할 수 있습니다.

</div></details>

**뒷면에 의해 클릭되는 문제를 해결하기**

상호작용 이벤트가 발생했을 때, WidgetComponent가 바라보고 있는 Forward와 폰의 Forward가 서로 마주본다면(음수라면) 이벤트가 발생하도록 합니다.

</div></details>

<details><summary>VR에서 FOV/Zoom 조작하기</summary>
<div markdown="1">

[Unreal VR Zoom](https://forums.unrealengine.com/t/4-11-1-manipulating-fov-zooming-in-vr/355776)

카메라의 FOV는 헤드셋 자체에 의해 오버라이드됩니다. 따라서 VR에서 줌하기 위해서는 
1. 머티리얼에 렌더 타겟을 사용하고 이 렌더 캡쳐가 확대하도록 합니다.
2. SteamVRHMD Class의 SCale을 변경합니다.

[가상 현실 모범 사례|언리얼 엔진(VR 및 시뮬레이션 멀미)](https://forums.unrealengine.com/t/4-11-1-manipulating-fov-zooming-in-vr/355776/2)

하지만 줌을 변화하는 것은 VR 멀미를 유발할 수 있다고 합니다. 모범사례에서 FOV9Field of View) 장치와 일치해야 함을 나타냅니다. FOV 값이 변경되면 머리를 돌릴 때 세상이 뒤틀리는 것처럼 보여 불편할 수 있습니다.

**1. 머티리얼에 렌더 타겟을 사용하고 이 렌더 캡쳐가 확대하도록 합니다.**

**2. SteamVRHMD Class의 Scale을 변경합니다.**

</div></details>

## Unreal VR

[VR Cheet Sheet](https://docs.unrealengine.com/4.27/en-US/SharingAndReleasing/XRDevelopment/VR/VRTipsAndTricks/)