---
layout: post
title: Unreal engine
---

> 언리얼 엔진의 철학은 다음과 같습니다.
> 
> * 개방성(Openness): 언리얼 엔진은 개방성을 중요시합니다. 개방성은 개발자들이 엔진을 커스터마이징하고 확장할 수 있도록 합니다. 또한, 개방성은 개발자들이 다른 엔진과 결합하여 사용할 수 있도록 합니다.
> * 커뮤니티(Community): 언리얼 엔진은 전 세계의 개발자들이 참여하는 커뮤니티를 중요시합니다. 커뮤니티는 개발자들이 서로 지원하고 정보를 공유할 수 있는 장소입니다. 언리얼 엔진은 개발자들이 커뮤니티를 통해 서로 연결되고, 개발자 커뮤니티를 통해 엔진 개발에 기여할 수 있도록 합니다.
> * 혁신성(Innovation): 언리얼 엔진은 게임 개발에서 혁신성을 중요시합니다. 엔진은 게임 개발자들이 새로운 기술을 시도하고 실험할 수 있는 자유를 제공합니다. 이는 게임 개발자들이 새로운 경험을 제공하고, 게임 산업을 선도할 수 있도록 도와줍니다.
> * 품질(Quality): 언리얼 엔진은 게임 개발에서 품질을 중요시합니다. 엔진은 개발자들이 높은 품질의 게임을 만들 수 있도록 다양한 도구와 기능을 제공합니다. 이는 게임의 시각적인 품질과 성능, 사용자 경험 등을 향상시키는 데 도움을 줍니다.

# Development
* [Understand Code](/posts_unreal_engine/UnderstandCode)
* [Log and debug](/posts_unreal_engine/Log-Debug-Console)
    - 언리얼의 로그(UE_LOG)
    - 언리얼 디버그(Debug)
    - 언리얼의 콘솔(Console)
* [Level, Actor, Component](/posts_unreal_engine/Level-Actor-Component)
* [UI, HUD, UMG](/posts_unreal_engine/UI-HUD-UMG)
    - 어떻게 만들어야 하는가
    - 최적화
* [Animation](/posts_unreal_engine/Animation)
    - Bone Space & indicies
    - 스켈레탈 메시위 캐릭터
    - 애니메이션 몽타주
    - Anim Blueprint (애님 블루프린트)
    - 애니메이션 시퀀스
    - 애니메이션 노티파이
    - Animation Notify State (애니메이션 노티파이 스테이트)
    - Control Rig (컨트롤 리그)
    - Skeletal mesh Animation System (스켈레탈 메시 애니메이션 시스템)
    - 캐릭터 애니메이션
* [Lighting](/posts_unreal_engine/Lighting)
    - 언리얼 라이팅
    - 조명
* [Event](/posts_unreal_engine/Event)
* [Localize Build Packaging](/posts_unreal_engine/LocalizeAndBuildAndPackagingSetting)

# Material

[핵심 머티리얼 개념](https://docs.unrealengine.com/5.0/ko/essential-unreal-engine-material-concepts/)

언리얼 엔진의 머티리얼(Material)은 씬에서 오브젝트의 표면 프로퍼티를 정의합니다. 넓게 보면, 머티리얼이란 메시에 적용되어 시각적인 형태를 제어하는 '페인트'라고 할 수 있습니다.

* 구체적으로 설명하자면, 머티리얼은 표면이 씬의 라이트와 어떻게 상호작용해야 하는지를 엔진에 정확히 알려줍니다. 머티리얼은 색, 리플렉션, 러프니스, 투명도 등 표면의 모든 특징을 정의합니다.

[물리 기반 머티리얼](https://docs.unrealengine.com/5.0/ko/physically-based-materials-in-unreal-engine/)

Physically based rendering(PBR, 물리기반 렌더링)은 이름과는 반대로 표면이 현시릉 라이트 작용 방식을 모방한다는 뜻입니다. BPR원칙에 부합하는 머티리얼은 아티스트의 직관에만 의존하여 파라미터를 세팅하는 셰이딩 워크플로보다 더 정확하고 자연스럽게 보입니다.

물리 기반 머티리얼은 모든 라이팅 환경에서 동일하게 잘 작동합니다. 또한 머티리얼 값이 덜 복잡해지고 상호 의존성도 줄어들기 때문에 머티리얼 제작 워크플로가 더 사용자 친화적입니다.

<details><summary>Material Domain</summary>
<div markdown="1">

[머티리얼 도메인](https://docs.unrealengine.com/4.26/ko/Resources/ContentExamples/MaterialProperties/1_5/)

Domains(도메인)이란 머티리얼이 전체적으로 사요되는 곳을 정의합니다. 대부분의 셰이더는 Surface(표면)이지만, 데칼이나 라이트 함수 또는 포스트 프로세스를 사용할 필요가 있는 경우, 해당 도메인에 속해야 합니다.

</div></details>

<details><summary>Blend Mode</summary>
<div markdown="1">

[머티리얼 블렌드 모드](https://docs.unrealengine.com/4.27/ko/RenderingAndGraphics/Materials/MaterialProperties/BlendModes/)

Blend Mode(블렌드 모드)란 현재 배경에 실제로 그려지고 있는 것에 현재 머티리얼의 결과물을 어떻게 블렌딩할 것인지를 나타내는 것입니다. 좀 더 엄밀히 말하면, 이 머티리얼을 다른 픽셀 앞에 렌더링할 때, 엔진이 이 머티리얼(원복색)과 이미 프레임 버퍼에 있는 것 (대상색)을 합치는 방식을 조절하는 것입니다.

</div></details>

<details><summary>Shading Model</summary>
<div markdown="1">

[셰이딩 모델](https://docs.unrealengine.com/4.27/ko/RenderingAndGraphics/Materials/MaterialProperties/LightingModels/)

Shading Model(셰이딩 모델)은 머티리얼이 빛을 받아 반사하는 방식을 조절합니다. 다른 말로 하자면, 머티리얼을 이루는 입력 데이터를 어떻게 사용하여 최종적인 모양새를 만들어낼 것인지를 조절하는 것 입니다.

</div></details>

[Unreal Material Library](https://github.com/kbmhansungb/UnrealMaterialLibrary)


## Unreal engine transform 관련하여
* 절대 위치를 기준으로 변경사항을 블루프린트로 적용하면, 블루프린트에 실제로 절대 위치로 저장됩니다.
* 차일드 액터에 대해서, 블루프린트로 리셋을 할 경우 한번에 바로 적용되지 않습니다. 두번 적용해야 실제로 적용됩니다.


## GetPlayerContext

GetPlayerContext란 메서드

## 메인 루프의 종료

https://forums.unrealengine.com/t/c-quit-game/39177/5

```cpp
FGenericPlatformMisc::RequestExit(true);
```
다음을 이용하여 메인 루프를 종료시킬 수 있다고 하네. 흥미롭네.

## UMG
Widget이란 사용자가 기능을 수행하거나 서비스에 액세스할 수 있도록 하는 응용 프로그램 또는 인터페이스의 구성 요소입니다.

* 상호작용(Interaction)이란 두 대상 혹은 다양한 대상 사이에 정보가 오가고 그것에 따라 반응하는 것이라 할 수 있습니다.
* 인터페이스(Interface)란 서로 다른 사물이나 시스템 간에 소통이 가능하게 하도록 설계한 상호작용 방식입니다.


## CreateWidget 이해하기
UUserWidget의 파생 클래스인지를 먼저 static_assert합니다.

SCOPE_CYCLE_COUNTER <- CPU 프로파일링을 위해서 하는 것임.
를 작동시킵니다. 그래서, 이거는 공식문서 어디에 처박혀 있냐...

실제 생성은 UUserWidget의 Static CreateWidgetInstance 함수에서 호출됩니다.
이는 CreateInstanceInternal로 전달됩니다. 전달될 떄 파라메터를 설정합니다. 
* LocalPlayer는 첫번째 플레이어 컨트롤러가 됩니다. 위젯의 소유자는 0번 ID의 PlayerController가 됩니다.

WidgetComponent의 OwningObject는 World입니다.
실제 생성코드는 NewObject로 이루어 지고, Widget의 PlayerContext를 전달된 첫번째 플레이어 컨트롤러로 설정하고, 그 다음 Initialize가 호출됩니다.

? Construct는 NewObject에서 호출되는 것 같은데...
? 디자인 플래그가 언제 설정되는지 모르겠네.

? Inventory 변수 설정(ExposeOnSpawn)하기 위해서, 언제 선언해야 되는지 알아야함.
? NewObject와 Initialize에서 어디서 Construct가 호출되는가?
! 세상에 위젯의 모양이 생성되는 타임(위젯의 PreConstruct와 Construct)는, BeginPlay 따라서 부모함수의 BeginPlay가 호출되기 전에 InventoryWidget을 설정하면, 되야 하는거 아니냐? 빡치네..

위젯의 작동은 플레이어 컨트롤러와, 위젯의 결합.??? 상호작용하기 위한 인터페이스이니 당연한 건가??? 흐음....
아니 이걸 결정하기 전에, 위젯의 용도가 뭔지 명확하게 정의하는 것이 먼저이다. 그 다음에 기능을 구현할 수 있다.


## SafeZone

[UMG 세이프 존](https://docs.unrealengine.com/4.27/ko/InteractiveExperiences/UMG/UserGuide/UMGSafeZones/)

세이프 존은 TV 디스플레이의 테두리나 iPhoneX 의 노치와 홈 바 아래처럼 기술적으로 사용할 수는 있지만 플레이어가 볼 수는 없는 디스플레이 영역으로 UI 가 넘어가지 않도록 해줍니다. The UMG Designer(디자이너)를 사용하면 UI 에 세이프 존 위젯을 적용하여 디바이스의 해상도를 (또는 회전도) 테스트할 수 있습니다.

* UMG 디자이너가 사용합니다.