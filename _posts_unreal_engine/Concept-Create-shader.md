---
layout: post
title: Create shader
---

## 읽을 수 있게 되는 것들
[셰이더 개발(5.0은 셰이더 디버깅으로 페이지가 연결되어 있습니다.)](https://docs.unrealengine.com/4.27/ko/ProgrammingAndScripting/Rendering/ShaderDevelopment/)
, [플러그인 내 셰이더 개요](https://docs.unrealengine.com/5.0/ko/overview-of-shaders-in-plugins-unreal-engine/)
, [언리얼 엔진에 글로벌 셰이더 추가하기](https://docs.unrealengine.com/5.0/en-US/adding-global-shaders-to-unreal-engine/)

## 셰이더 컴파일 작업
셰이더 작업을 할 때는 반드시 r.ShaderDevelopmentMode옵션을 1로 설정하여 켰는지 확인해야 합니다. 가장 쉬운 방법은 ConsoleVariables.ini를 편집하여 로드할 때마다 자동으로 설정되게 하는 것 입니다.

셰이더 컴파일 오류시 재시도할수 있습니다. 이는 글로벌 셰이더에 특히나 중요합니다. 컴파일에 성공하지 않으면 치명적인 오류가 발생합니다.

**셰이더 디버깅 주요 메서드는 셰이더가 중간 데이터를 출력하도록 변경한 다음, 적합한 VisualizeTexture명령으로 시각화 시키는 것입니다.** 이는 엔진을 재시작할 필요 없이 컴파일이 가능하므로 빠른 반복처리가 가능합니다.

## 패스(Pass)
[Direct3D 12 렌더링 패스](https://docs.microsoft.com/ko-kr/windows/win32/direct3d12/direct3d-12-render-passes)의 내용을 빌려서 패스를 설명하면 렌더링 패스란 렌더링 패스의 기간 동안 고정 된 출력 바인딩 집합입니다. 이러한 바인딩은 하나 이상의 RTVs(렌더링 대상 뷰) 및/또는 DSV에 대 한 것입니다. 해당 출력 바인딩 집합을 대상으로 하는 GPU작업 목록입니다. 렌더링 패스의 대상으로 지정 된 모든 출력 바인딩의 로드/저장소 종속성을 설명 하는 메타 데이터입니다. **간단히 말해서 렌더 패스는 렌더링 파이프라인의 단일 실행입니다.** [랜더 패스 이해](https://developer.arm.com/documentation/102479/0100/How-render-passes-work)를 볼 수 있습니다. 추가적으로 pass의 번역은 통과하다의 의미를 가지고 있습니다.    
랜더링 패스는 [Rendering Dependency Graph](https://docs.unrealengine.com/5.0/ko/render-dependency-graph-in-unreal-engine/)와 연결될 수 있습니다.

## 머티리얼
[머티리얼](https://docs.unrealengine.com/4.27/en-US/RenderingAndGraphics/Materials/)은 장면의 시각적 모양을 제어하기 위해 메시에 적용할 수 있는 Asset입니다. "페인트"로 생각하는 것이 가장 이해하기 쉬울 것 입니다. 머티리얼은 문자 그대로 오브젝트가 만들어지는 것처럼 보이는 표면 유형을 정의하기 때문에 약간 오해의 소지가 있지만, **색상, 광택 정도, 물체를 통해 볼 수 있는지 여부 등을 정의할 수 있습니다.** 

## 언리얼 셰이더 파일

언리얼에서 사용할 쎄이더를 새로 개발할 때는 알아둬야 할 쎄이더 파일 유형이 두 가지 있습니다. 각각 용도가 다릅니다.   
**생성된 셰이더의 소스 파일은 Engine/Shaders폴더에 저장되어야 합니다. 플러그인의 경우 Plugin/Shaders폴더에 저장해야 합니다.**

* 언리얼 셰이더 헤더(.USH)
    - 다른 USH또는 USF파일에서만 포함됩니다.
* 언리얼 셰이더 포맷(.USF)
    - 프라이빗 데이터 전용입니다. 따라서 프라이빗 디렉터리에 하휘 호완성이 보장되지 않습니다.
    - 셰이더 엔트리 포인트가 있어야 합니다.
    - C/C++파일과 동일하게, #include ".../usf"로 usf파일을 포함시킬 수 있습니다.

셰이더 파일은 HLSL언어에 기반했습니다. 멀티 플랫폼 셰이더 코드가 들어있는 언리얼 엔진 셰이더 파일 포맷입니다.

같은 파일을 여러번 포함시키는 것을 피하기 위해서는, 파일 상단에 #pragma once전처리 지시자를 사용하면 됩니다.

* 플러그인으로 작업할 때 플러그인에 대한 올바른 종속성을 추가하는 것은 개발자 책임입니다.

## 셰이더 및 머티리얼

* 글로벌 셰이더
    - 글로벌 셰이더는 고정된 지오메트리에 작동되는 셰이더로, 머티리얼과의 인터페이스가 필요치 않습니다. 섀도 필터링이나 포스트 프로세싱같은 것을 예로 들 수 있습니다. 주어진 글로벌 셰이더 유형의 셰이더 딱 하나만 메모리에 존재합니다.
* 머티리얼 및 메시 유형
    - 머티리얼은 (블렌드 모드, 양면 등) 머티리얼 렌더링 방식을 조절하는 상태 세트와 (베이스 컬러, 러프니스, 노멀 등) 머티리얼이 다양한 렌더링 패스와 상호작용하는 방시을 제어하는 머티리얼 입력 세트로 정의됩니다.
* 버텍스 팩토리
    - [Vertex factory의 용도](https://medium.com/realities-io/creating-a-custom-mesh-component-in-ue4-part-1-an-in-depth-explanation-of-vertex-factories-4a6fd9fd58f2)는 CPU에서 GPU로 특정 메쉬 유형의 정점을 전달하는 역활을 합니다. (이 링크에 Vertex팩토리에 대한 보다 자세한 내용이 있습니다.)
    - 머티리얼은 다양한 메시 유형에 적용할 수 있어야 하는데, 이는 버텍스 팩토리로 가능합니다. FVertexFactoryType는 고유 메시 유형을 나타냅니다. FVertexFactory인스턴스는 인스턴스별 데이터를 저장하며 그 고유 메시 유형을 지원합니다.
* 머티리얼 셰이더
    - FMaterialShaderType을 사용하는 셰이더는 머티리얼의 특성 일부에 접근할 필요가 있는 패스 전용 셰이더이므로, 각 머티리얼에 대해 컴파일되어야 하지만, 메시 특성에 접근할 필요는 없습니다. **이해하기 어렵다면 라이트 패스 셰이더를 봅시다.**
    - FMeshMaterialShaderType을 사용하는 셰이더는 머티리얼의 특성 그리고 메시 유형에 의존하는 패스 전용 셰이더이므로, 반드시 각 머티리얼/버텍스 팩토리 조합별로 컴파일되어야 합니다. **예를 들어 TBasePassVS/TBasePassPS는 포워드 렌더링 패스의 모든 머티리얼 입력을 계산할 필요가 있습니다.**
* 특수 엔진 머티리얼
    - UMaterial에는 bUedAsSpecialEngineMaterial라는 세팅이 있어서, **머티리얼을 어떤 버텍스 팩토리 유형과도 사용할 수 잇습니다.** 즉 모든 버텍스 팩토리는 머티리얼과 함께 컴파일되어, 매우 큰 세트가 될 것이라는 뜻입니다.
    - 라이팅만 같은 뷰모드 렌더링에서 사용되는 머티리얼, 컴파일 오류가 있을 때 예비로 사용되는 머티리얼, 캐시해야 하는 셰이더 수를 줄이기 위해 다른 머티리얼을 렌더링하는 데 셰이더가 사용된 머티리얼 등에서 유용합니다.