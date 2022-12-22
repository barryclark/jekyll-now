---
layout: post
title: VR Development
---

- [ ] [Testing in VR without equipment](https://forums.unrealengine.com/t/testing-in-vr-without-equipment/462833)
- [ ] [UI Widget 직접 누르기](https://docs.unrealengine.com/4.27/ko/InteractiveExperiences/UMG/HowTo/InWorldWidgetInteraction/)
- [ ] [Oculus Development](https://developer.oculus.com/documentation/unity/meta-avatars-overview/)

# VR - AR - MR
게임, 엔터테인먼트, 건축, 훈련 및 교육과 같은 산업에서 VR의 급속한 성장으로 이 기술 세트에 대한 수요가 그 어느 때보다 높아졌습니다. Hired의 2021년 소프트웨어 엔지니어 현황 보고서에 따르면 VR/AR 엔지니어는 또한 가장 높은 급여를 받는 개발자 중 하나입니다.

- VR을 직접 플레이해서 테스트하는데 굉장히 힘이 많이드므로, 로그를 이용하도록 합시다.
- VR은 회사마다 기기마다 작동하는 방법이 다다르니 그 회사 홈페이지로 가야합니다.
- 버전마다 다르고, 패키지 버전 마다 다르고… 정신이 혼미한데…
- ObjectActivator를 만들고 이벤트를 추가하여 사용하는 이유는, 오브젝트의 실제 상호작용과 물체의 상호작용이 다르기 때문…?
- XR Base Interactable은 상속받아서 덮어씌우기 어려움..? 어찌되었건, 사실 행동을 다시 정의할 일은 거의 없음.

### XR
XR은 다음을 포함하여 현실 세계와 디지털 세계를 혼합하는 모든 기술을 포괄하는 용어입니다.

- **VR** 가상 현실
- **AR** 증강 현실
- **MR** 혼합 현실

XR의 X는 각각 VR, AR, MR의 V, A, M의 대명사입니다. X는 아직 발명되지 않은 미래의 두문자어를 나타낼 수도 있습니다!

### VR
VR은 실제 환경을 완전히 대체하는 디지털 환경을 만들어 사용자를 디지털 세계에 몰입시킵니다. VR은 사용자가 두 개의 렌즈를 통해 화면을 직접 볼 수 있는 HMD(Head Mounted Display)가 필요합니다.

### AR
AR은 디지털 방식으로 생성된 콘텐츠를 사용자의 실제 환경에 오버레이합니다. VR과 달리 AR 사용자는 여전히 주변의 현실 세계를 볼 수 있습니다.

### MR
MR은 AR 및 VR의 요소를 포함할 수 있으므로 세 가지 용어 중 가장 넓은 용어입니다. 한쪽 끝에 실제 물리적 환경이 있고 다른 쪽 끝에 완전한 가상 환경이 있는 현실-가상 연속체를 따라 이러한 기술에 대해 생각하는 것이 아마도 가장 도움이 될 것입니다.

![https://connect-prd-cdn.unity.com/20220615/learn/images/aca27594-cb34-4d7a-ae78-e133d24d7399_A.1.4_Reality_Diagram.jpg.2000x0x1.jpg](https://connect-prd-cdn.unity.com/20220615/learn/images/aca27594-cb34-4d7a-ae78-e133d24d7399_A.1.4_Reality_Diagram.jpg.2000x0x1.jpg)

### VR 하드웨어 요구사항
이 경로를 완료하는 데 VR 헤드셋이 필요하지 않습니다. 헤드셋에 액세스할 수 없는 경우 XR 장치 시뮬레이터를 사용하여 프로젝트를 테스트할 수 있습니다. 이를 통해 마우스와 키보드를 사용하여 헤드 마운트 디스플레이 및 컨트롤러의 움직임과 입력을 시뮬레이션할 수 있습니다.

XR 장치 시뮬레이터를 사용하는 것은 어렵고 비효율적일 수 있으며 VR에서 프로젝트를 완전히 경험할 수 없으므로 가능한 경우 헤드셋에 액세스하는 것이 좋습니다.

이 학습 콘텐츠는 Oculus/Meta Quest 모델로 검증 및 테스트되었으므로 이러한 헤드셋 중 하나를 사용하여 원활한 경험을 할 가능성이 매우 높습니다.

Valve Index, HTC Vive, Windows Mixed Reality 헤드셋 또는 Oculus Rift 모델을 포함하여 [OpenXR](https://www.khronos.org/openxr/) 을 지원하는 다른 헤드셋을 사용할 수 있습니다 . 모든 것이 제대로 작동해야 하지만 이 학습 콘텐츠는 이러한 장치에서 철저히 테스트 및 검증되지 않았습니다.

# VR 개발
## VR 기기 및 개발환경
<center><div class="mermaid"> 
graph RL;

Oculus
Vive

OculusLink(OculusLink\nUSE 3.0\nAir Link)
UnrealSteamVRPlugin(Unreal\nSteamVR Plugin)
XRInteraction(XR Interaction)
OculusInteraction(Oculus Interaction)

UnrealViveWindow(UnrealVive\nWindowEXE)
UnityOculusAndroid(UnityOculus\nAndroidAPK)
UnityOculusWindow(UnityOculus\nWindowEXE)

Vive-->SteamVR

Oculus-->OculusLink
OculusLink-->XRInteraction
OculusLink-->OculusInteraction
OculusLink-->SteamVR

SteamVR-->XRInteraction
SteamVR-->UnrealSteamVRPlugin

XRInteraction-->UnityOculusAndroid
OculusInteraction-->UnityOculusAndroid
XRInteraction-->UnityOculusWindow
OculusInteraction-->UnityOculusWindow
UnrealSteamVRPlugin-->UnrealViveWindow
</div></center>

### Vive

<center><div markdown="1">

![바이브 입출력](https://t1.daumcdn.net/cfile/tistory/9944023B5A70A6B624)

</div></center>

### Oculus

### Steam VR

[개발을 위한 Steam VR 퀵 스타트](https://docs.unrealengine.com/4.27/ko/SharingAndReleasing/XRDevelopment/VR/VRPlatforms/SteamVR/QuickStart/)

1. SteamVR 초기 구성을 설치합니다.
2. 언리얼에서 VR 프리뷰로 실행합니다.

### Oculus Link

### Unreal

* Steam VR 플러그인을 이용하여 연결할 수 있습니다.

### Unity

코어 프로그램으로 Steam VR과 Google VR 등이 있습니다.

## VR 개발시 고려사항

* 현실 공간과 가상 공간의 위치 고려
  * VR의 경우 실제로 움직이기 때문에, 현실 공간과 가상 공간 둘다 고려해야합니다. 예를 들어 새로운 위치로 이동할 때 마다, 시작위치로 이동시킨다면 결국에는 벽에 부딛히게 됩니다.
* VR 기본 방설정
  * 문제가 무엇인이 정확하게 알기위해, 방설정은 완변하게, 명확하게 해야합니다. 시작위치의 문제인지, VR 세팅의 문제인지 알기 위해서입니다.
* **VR기기 이동을 구현할 때, 간단하게 먼저 만들고 테스트해봅니다. 이동이 이상하면, 정말로 매스껍습니다.**

# VR...
- [ ] 목차간의 구분을 위한 내용을 명시하는 명확한 목차이름 정하기

## Tips
[VR Cheet Sheet](https://docs.unrealengine.com/4.27/en-US/SharingAndReleasing/XRDevelopment/VR/VRTipsAndTricks/)

## API, SDK...

### Unreal Steam VR Plugin
- [ ] Steam VR API 공부 후 채워넣기

### Unity XR Interaction toolkit
- [ ] AR 공부후 내용 채워넣기

### Unity Oculus Interaction toolkit
- [ ] 핸드트래킹 샘플 예제 공부후 채워넣기
- [ ] 핸드트래킹을 이용한 개인 프로젝트 진행 후 채워넣기

## UI
### Unreal VR 스테레오 레이어

[VR 스테레오 레이어](https://docs.unrealengine.com/4.26/ko/SharingAndReleasing/XRDevelopment/VR/DevelopVR/StereoLayers/)

가상 현실 (VR) 스테레오 레이어로 VR 머리 장착 디스플레이(HMD)에 텍스처를 전송하고 나머지 프로젝트와 다른 독립 렌더링 패스에서 재투영시킵니다.

* [스테레오 타입](https://docs.unrealengine.com/5.0/ko/openxr-stero-layers-overview-in-unreal-engine/)에서 스테레오 레이어 타입별 동작을 볼수 있습니다.


# 구현
## VR 위치 표현(HMD Follow)

<center><div markdown="1">

![Result](/images/VR_Focuse_1_Animation.gif)

</div></center>

1. 화면의 중심에서 스크린 스페이스화된 월드 포지션까지의 벡터를 구합니다.
2. 벡터를 정규화 하고 원하는 길이만큼 곲해준 후, 바라보도록 회전각을 만들어, 위젯의 트렌스폼을 만듭니다. 

* PlayerController에서 WidgetGeometry를 가져와, 로컬 스크린 사이즈를 구합니다. 이를 반으로 나누면, 스크린의 중심이 됩니다.
* PlayerController에서 월드 로케이션에 대해 ProjectWorldLocationToWidgetPosition을 통해 스크린 스페이스를 구하면, 스크린에서 위젯의 포지션을 구할 수 있습니다.
* 월드 로케이션의 스크린 스페이스에서 로컬 스크린의 중심을 빼면, 중심에서 스크린 스페이스로 가는 벡터를 구할 수 있습니다.
* 위젯의 엥글은 -180 ~ 180 디그리, 시계방향으로 6시까지 0 ~ 180 디그리로 되어있습니다.

<center><div markdown="1">

![Image1](/images/VR_Focuse_1_1.png)

![Image2](/images/VR_Focuse_1_2.png)

![Image3](/images/VR_Focuse_1_3.png)

</div></center>
## 콜리전을 이용한 월드의 UI 상호작용

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

상호작용되는 버튼의 크기를 실제보다 작게 만듬으로써, 콜리전의 크기로 인해 다른 버튼이 눌리는 것을 줄일 수 있습니다.

**드래그로 탭 되지 않게 하기**

큰 박스 콜리전을 두어, 컨트롤러의 콜리전이 오버라이드 이벤트를 발생시켜 탭하면, 큰 박스 콜리전과의 오버랩이 끝날 때 까지, 오버라이드 이벤트시 동작하지 않게 하면 드래그로 탭 이벤트가 발생하지 않게 할 수 있습니다. 

<center><div markdown="1">

![Double Box](/images/VR_Development_InteractionWithUI_DoubleBox.png)

</div></center>

* 더티 플래그 패턴은 불필요한 작업을 피하기 위해 실제로 필요할 때까지 그 일을 미루는 의도입니다. 비슷하나 다른 개념입니다.

## Mobile Gesture
- [ ] 용어정리로 옮기기

![Touch Gestures](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F2611613A5758E5B932)

* 이러한 인터랙션은 UI 가이드 문서를 제작할 때 화면의 플로우(Flow)를 보여주기 위해 주로 사용합니다.
* 디자이너와 개발자의 소통에 있어서도 관련 용어의 정의를 정확히 알고 있다면 서로에게 명확한 단어로 의사를 전달 할 수 있습니다.

**뒷면에 의해 클릭되는 문제를 해결하기**

상호작용 이벤트가 발생했을 때, WidgetComponent가 바라보고 있는 Forward와 폰의 Forward가 서로 마주본다면(음수라면) 이벤트가 발생하도록 합니다.

## VR에서 FOV/Zoom 조작

[Unreal VR Zoom](https://forums.unrealengine.com/t/4-11-1-manipulating-fov-zooming-in-vr/355776)

카메라의 FOV는 헤드셋 자체에 의해 오버라이드됩니다. 따라서 VR에서 줌하기 위해서는 
1. 머티리얼에 렌더 타겟을 사용하고 이 렌더 캡쳐가 확대하도록 합니다.
2. SteamVRHMD Class의 SCale을 변경합니다.

[가상 현실 모범 사례|언리얼 엔진(VR 및 시뮬레이션 멀미)](https://forums.unrealengine.com/t/4-11-1-manipulating-fov-zooming-in-vr/355776/2)

하지만 줌을 변화하는 것은 VR 멀미를 유발할 수 있다고 합니다. 모범사례에서 FOV9Field of View) 장치와 일치해야 함을 나타냅니다. FOV 값이 변경되면 머리를 돌릴 때 세상이 뒤틀리는 것처럼 보여 불편할 수 있습니다.

**1. 머티리얼에 렌더 타겟을 사용하고 이 렌더 캡쳐가 확대하도록 합니다.**
**2. SteamVRHMD Class의 Scale을 변경합니다.**
