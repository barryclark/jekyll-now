---
layout: post
title: Math & Graphic
---

# Math
<details><summary>Books</summary>
<div markdown="1">

- [ ] [선형대수학 Linear Algebra](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)
- [ ] [수치해석](http://www.ktword.co.kr/word/abbr_view.php?nav=&m_temp1=1064&id=751)
- [ ] [NumericalRecipesinC](http://www.grad.hr/nastava/gs/prg/NumericalRecipesinC.pdf)
- [ ] GamePhysicsCookbook (game-physics-cookbook_compress)
- [ ] [LIBIGL](https://libigl.github.io/tutorial/)
- [ ] [Interactive Mesh Processing with libigl in Unreal Engine 4.24](http://www.gradientspace.com/tutorials/2020/1/2/libigl-in-unreal-engine)

</div></details>

* [Vector](/posts_math/Vector)
    - 벡터
    - 3차원 공간에서의 벡터
    - 벡터 공간
* [Linear algebra](/posts_math/Linear_Algebra)
    - 선형성
    - 선형 결합
    - 유클리드 공간
    - 벡터 공간
    - 선형 변환
* [Matrix](/posts_math/Matirx)
    - 행렬
* [Linear Transformation](/posts_math/Linear_Transformation)
    - Affine Space
    - Triangle (삼각형)
    - Affine Transformation (아핀 변환)
    - Homogeneous Coordinates (동차 좌표계)
* [Orientation](/posts_math/Orientation)
    - Quaternion

# PBR
- [x] MASTER THESIS no. 1375 Physically based rendering, Jure Ratkovic, Zagreb, April 2017



# Graphic
- [ ] Unity Shader
- [ ] Wiper퀄리티를 높이고 어떻게 만들었는지 작성하기
- [ ] Test01의 내용을 정리해야함
- [ ] 간접광 어떻게 주었나 보았지만, 조명이었습니다.

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

# 구현

<details><summary>Wiper</summary>
<div markdown="1">

![WiperAnimation](/images/WiperAnimation.gif)

\\<!--리소스는 회사에서 사용하는 리소스를 쓰므로 공유하지 않는다.-->

<details><summary>유리 머티리얼과 빗방울 표현</summary>
<div markdown="1">



</div></details>

<details><summary>마스크 만들기</summary>
<div markdown="1">

</div></details>

<details><summary>마스크를 이용한 빗방울 제거하기</summary>
<div markdown="1">

</div></details>

<details><summary>와이퍼 구현하기</summary>
<div markdown="1">

</div></details>

</div></details>

<details><summary>Unreal VR Station</summary>
<div markdown="1">

VR의 방 공간 정보를 받아 텔레포트시에 조정할 수 있도록 보여주도록 합니다.

<details><summary>스테이션 정보 받아오기</summary>
<div markdown="1">

- [ ]  GetTrackedDevicePositionAndOrientation을 이용하여 스테이션 정보를 받아옵니다.
스테이션의 포즈와 로테이션을 이용해, 스테이션 위치를 업데이트합니다.

</div></details>

<details><summary>스테이션 렌더링 하기</summary>

<div markdown="1">

* 머티리얼이 Translucent일 때, DissableDepthTest기능을 이용하면, 패스와 상관없이 그릴 수 있습니다.

</div></details>

</div></details>

<details><summary>머티리얼 레이어</summary>
<div markdown="1">

[머티리얼 레이어](https://docs.unrealengine.com/5.0/ko/using-material-layers-in-unreal-engine/)

</div></details>