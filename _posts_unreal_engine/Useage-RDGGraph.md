---
layout: post
title: RDGGraph
---

버전: UE 5.0

* RDG그래프를 추가한다.

참고자료
: [Render Dependency Graph](https://docs.unrealengine.com/5.0/en-US/render-dependency-graph-in-unreal-engine/)
, [RDG 101 A Crash Course](https://epicgames.ent.box.com/s/ul1h44ozs0t2850ug0hrohlzm53kxwrz)
, [Analysis of the Unreal Rendering System(11) - RDG](https://www.programmerall.com/article/92242243123/)

## 개요

랜더 디펜던시 그래프는 UE 4.22에서 도입한 새로운 렌더링 하위 시스템입니다. DAG 스케줄링 시스템을 기반으로 하여 렌더링 파이프라인의 전체 프레임 최적화를 수행하는 데 사용합니다.

RDG의 아이디어는 GPU에서 즉시 실행되는 것이 아니라 렌더링이 필요한 모든 PASS를 수집한 다음 종속성 순서대로 컴파일 및 실행하며 각 유형의 크롭 및 최적화를 수행합니다.

RDG기본 유형 및 인터페으스는 주로 RenderGraphUtils.h 및 RenderGraphDefinitions.h에 집중되어 있습니다.
    * Engine\Source\Runtime\RenderCore\Public\RenderGraphDefinitions.h에서 볼 수 있습니다.

RDG Resource는 RHI리소스와 직접적으로 연결되는 것이 아니라 RHI 리소스 참조를 래핑한 다음 다른 유형의 리소스에 대해 패킹하고 정보를 추가합니다.   
RDG시스템에서는 기본적으로 모든 RHI리소스가 RHI리소스를 추가로 제어, 관리하고 수명 주기, 참조 관계 및 디버깅 정보를 정확하게 저아, 추가, 최적화, 잘라내기, 렌더링 성능 향상을 위한 패키지 등을 합니다.
    * Engine\Source\Runtime\RenderCore\Public\RenderGraphResources.h에서 볼 수 있습니다.

RDG Pass 모듈에는 장벽, 자원 변환, RDGPASS및 기타 개념이 포함됩니다.   
RDG의 PASS는 복잡합니다. 소비자, 생산자, 변환 의존성, 다양한 자원 상태, 기타 데이터 및 처리를 포함은 RDG시스템의 핵심입니다.   
RDG Pass와 Rendering Pass는 일치하지 않으며 여러 개의 병합된 Pass가 있을 수 있습니다.
    * Engine\Source\Runtime\RHI\Public\RHI.h에서 볼 수 있습니다.

FRDGBuilder는 RDG시스템의 핵심이자 엔진이며 렌더링 패스 및 매개변수 수집, 패스 컴파일, 데이터, 리소스 종속처리, 자르기 및 모든 종류의 데이터 최적화, 실행 인터페이스 제공을 담당하는 대규모 관리입니다.   
RDG시스템 드라이브로서 FRDGBuilder는 데이터 저장, 처리 상태 변환, 자동 관리 리소스 수명 주기, 장벽, 잘못된 리소스 자르기, 수집, 컴파일, 통과 실행, 텍스처 또는 버퍼 추출을 담당합니다.

## RDG 개발

FREDGTexture를 생성하기 위해서는 리소스에 대한 디스크립터를 생성하고 리소스 UAV 및 SRV를 생성할 때 이전에 생성된 리소스를 인스턴스로 사용할 수 있습니다. SRV를 생성하려면 디스크립터의 매개변수로 리소스 인스턴스가 필요합니다. 먼저 디스크립터를 생성한 다음 SRV를 생성합니다.

```cpp
// - Create RDG texture demonstration ----
 // Create RDG texture description
FRDGTextureDesc TextureDesc = Input.Texture->Desc;
TextureDesc.Reset();
TextureDesc.Format = PF_FloatRGBA;
TextureDesc.ClearValue = FClearValueBinding::None;
TextureDesc.Flags &= ~TexCreate_DepthStencilTargetable;
TextureDesc.Flags |= TexCreate_RenderTargetable;
TextureDesc.Extent = OutputViewport.Extent;
 // Create RDG texture.
FRDGTextureRef MyRDGTexture = GraphBuilder.CreateTexture(TextureDesc, TEXT("MyRDGTexture"));

 // ---- Create RDG Texture UAV Demonstration ----
FRDGTextureUAVRef MyRDGTextureUAV = GraphBuilder.CreateUAV(MyRDGTexture);

 // ---- Create RDG texture SRV demonstration ----
FRDGTextureSRVRef MyRDGTextureSRV = GraphBuilder.CreateSRV(FRDGTextureSRVDesc::CreateWithPixelFormat(MyRDGTexture, PF_FloatRGBA));
```

RDG가 생성하지 않은 외부 리소스의 등록은 RegisterExternalTexture를 이용하여 이루어집니다.

```cpp
// Create a RHI resource outside RDG.
FRHIResourceCreateInfo CreateInfo;
FTexture2DRHIRef MyRHITexture = RHICreateTexture2D(1024, 768, PF_B8G8R8A8, 1, 1, TexCreate_CPUReadback, CreateInfo);

 // Register an external RHI resource to RDG resources.
FRDGTextureRef MyExternalRDGTexture = GraphBuilder.RegisterExternalTexture(MyRHITexture);
```

전체 RDG 시스템에 의해 구현된 단위는 RDG Pass이며, 이들의 종속성, 참조, 입력 및 출력은 FRDGBuilder::addPass에 의해 완료됩니다.   
RDG Pass와 RHI Pass는 일치하지 않으며 여러 RDG Pass가 RHI Pass실행으로 병합될 수 있습니다.

```cpp
// Create a Pass's Shader parameter.
FMyPS::FParameters* PassParameters = GraphBuilder.AllocParameters<FMyPS::FParameters>();
PassParameters->InputTexture = InputTexture;
PassParameters->RenderTargets = FRenderTargetBinding(InputTexture, InputTextureLoadAction);
PassParameters->InputSampler = BilinearSampler;

 // Treat the shader.
TShaderMapRef<FScreenPassVS> VertexShader(View.ShaderMap);
TShaderMapRef<FMyPS> PixelShader(View.ShaderMap);

const FScreenPassPipelineState PipelineState(VertexShader, PixelShader, AdditiveBlendState);

 // Add RDG Pass.
GraphBuilder.AddPass(
    RDG_EVENT_NAME("MyRDGPass"),
    PassParameters,
    ERDGPassFlags::Raster,
         // pas of Lambda
    [PixelShader, PassParameters, PipelineState] (FRHICommandListImmediate& RHICmdList)
    {
                 // Set the viewport.
        RHICmdList.SetViewport(0, 0, 0.0f, 1024, 768, 1.0f);

                 // Set PSO.
        SetScreenPassPipelineState(RHICmdList, PipelineState);

                 // Set shader parameters.
        SetShaderParameters(RHICmdList, PixelShader, PixelShader.GetPixelShader(), *PassParameters);

                 // Draw a rectangular area.
        DrawRectangle(RHICmdList, 0, 0, 1024, 768, 0, 0, 1.0f, 1.0f, FIntPoint(1024, 768), FIntPoint(1024, 768), PipelineState.VertexShader, EDRF_Default);
    });
```

FRDGBuilder를 만드는 것은 매우 간단합니다.

```cpp
void RenderMyStuff(FRHICommandListImmediate& RHICmdList)
{
         // ---- Create a partial object of frDGBuilder ----
    FRDGBuilder GraphBuilder(RHICmdList, RDG_EVENT_NAME("GraphBuilder_RenderMyStuff"));
    
    (......)
    
         // ---- Increase Pass ----
    
    GraphBuilder.AddPass(...);
    
    (......)
    
    GraphBuilder.AddPass(...);
    
    (......)
    
         // ---- Add resource extraction ----
    
    GraphBuilder.QueueTextureExtraction(...);
    
    (......)
    
         // ---- Execute frDGbuilder ----
    
    GraphBuilder.Execute();
}
```

## RDG추가하기

렌더 그래프 또는 RDG라고도 하는 렌더 종속성 그래프는 렌더 명령을 컴파일 및 실행할 그래프 데이터 구조에 기록하는 API입니다. RDG는 오류가 발생하기 쉬운 작업을 자동화하여 고급 렌더링 코드를 단순화하고 그래프를 탐색하여 CPU 및 GPU에서 메모리 사용을 최적화하고 렌더 패스를 병렬화합니다.

* 비동기 컴퓨팅 펜스 스케줄링
* 최적의 수명 및 메로리 앨리어싱으로 임시 리소스 할당
* GPU에서 대기 시간을 숨기고 겹침을 개선하기 위해 분할 장벽을 사용한 하위 리소스 전환
* 병렬 명력 목록 기록
* 그래프에서 사용하지 않는 리소스 및 패스 제거
* API사용 및 리소스 종속성 검증
* RDG Insights의 그래프 구조 및 메모리 수명 시각화

