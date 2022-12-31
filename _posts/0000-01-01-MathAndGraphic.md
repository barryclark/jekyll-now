---
layout: post
title: Math & Graphic
---

> 이페이지는
> 
> 1. 엔진을 이미 능숙하게 사용할 줄 알며
> 2. 수학식이나 구현방법이 기억이 안날 경우 참고
> 
> 하는 것을 목적으로 만들어졌습니다.

## Math
<details><summary>Books</summary>
<div markdown="1">

- [ ] [선형대수학 Linear Algebra](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)
- [ ] [수치해석](http://www.ktword.co.kr/word/abbr_view.php?nav=&m_temp1=1064&id=751)
- [ ] [NumericalRecipesinC](http://www.grad.hr/nastava/gs/prg/NumericalRecipesinC.pdf)
- [ ] GamePhysicsCookbook (game-physics-cookbook_compress)
- [ ] [LIBIGL](https://libigl.github.io/tutorial/)
- [ ] [Interactive Mesh Processing with libigl in Unreal Engine 4.24](http://www.gradientspace.com/tutorials/2020/1/2/libigl-in-unreal-engine)

</div></details>

백터와 선형공간
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

삼각함수
* [Radian and Steradian](/posts_math/RadianSteradian)
## Graphic
- [ ] Unity Shader
- [ ] Wiper퀄리티를 높이고 어떻게 만들었는지 작성하기
- [ ] Test01의 내용을 정리해야함
- [ ] 간접광 어떻게 주었나 보았지만, 조명이었습니다.

### PBR
* [PhysicallyBasedRendering](/posts_math/PhysicallyBasedRendering)

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