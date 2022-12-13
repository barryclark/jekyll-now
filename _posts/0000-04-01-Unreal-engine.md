---
layout: post
title: Unreal engine
---

- [ ] Level, Actor, Component
- [ ] AutomationTool, UnrealBuildTool... 그리고 이를 이용한 배치파일

<details><summary>Links</summary>
<div markdown="1">

|:---|---|
|[넥슨의 NDC](http://ndcreplay.nexon.com/index.html#)|모범 사례들|
|[TA 업무 파해치기](https://www.unrealengine.com/ko/tech-blog/jobs-in-unreal-engine---technical-artist)|TA에 대한 이해|
|[수까락의 프로그래밍 이야기](http://egloos.zum.com/sweeper/v/3208657)|언리얼 참고 사이트|

- [ ] [Real Shading in Unreal Engine 4](https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf)

</div></details>

## Unreal Material

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

## Links
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