---
layout: post
title: Global shader
---

## 준비단계
글로벌 셰이더는 머티리얼 에디터로 생성되지 않은 셰이더입니다. 그 대신 C++로 생성되어 고정된 지오메트리에서 작동하며 머티리얼 또는 메시와의 상호 작용이 필요하지 않습니다.
    - 글로벌 셰이더를 사용하는 이유는 원하는 외관을 얻기 위해 때때로 더 고급 기능이 요구되며 이를 위해 커스텀 셰이더 패스가 필요하기 때문입니다.
    - **이를 이용하여 포스트 프로세싱 효과 렌더링, 컴퓨팅 셰이더 디스패치, 그리고 화면 지우기등에 사용할 수 있습니다.**
    - 보다 자세한 내용은 [언리얼 엔진 글로벌 쉐이더 추가하기](https://docs.unrealengine.com/5.0/en-US/adding-global-shaders-to-unreal-engine/)을 참고할 수 있습니다.

글로벌 셰이더를 컴파일 하기 위해 콘설 변수 설정을 바꿀 필요가 있습니다.
    - 엔진 > UE_X.X > Engine > Config > ConsolVariables.ini에서 r.ShaderDevelopmentMode를 찾아 r.ShaderDevelopmentMode=1로 변경하면 됩니다.

* [.ini란](https://ko.wikipedia.org/wiki/INI_%ED%8C%8C%EC%9D%BC), [Consol variable](https://docs.unrealengine.com/4.27/en-US/ProductionPipelines/DevelopmentSetup/Tools/ConsoleManager/)

## Global shader 만들기
[Create shader](/Concept-Create-shader)

1. 글로벌 셰이더는 엔진이 시작되기 전에 로드 되어야 합니다. 게임이나 Editor가 시작된 후에는 동적 모듈에 자체 셰이더 유형을 추가할 수 없습니다.  
    - Project의 .Build.cs에 다음의 내용을 추가하도록 합니다.
```json
"Modules" : [
    {
        ...
        "LoadingPhase": "PostConfigInit"
    }
]
```

2. Global Shader는 RenderCore 모듈을 필요로 합니다. 따라서 디펜던시를 추가해야 합니다.

```c#
    publicDependencyModuleNames.AddRange(
        new string[]
        {
            "Core",
            // ...

            "RenderCore"
        }
    );
```

3. 컴파일 하기 위해서는 Shader를 프로젝트가 읽을 수 있는 경로에 추가할 필요가 있습니다.
    - 프로젝트에 추가하기 위해서는 Projects\Intermediate\ShaderAutogen\에 MyTest.usf를 추가합니다.

* MyTest.usf
```hlsl
#pragma once

#include "/Engine/Public/Platform.ush"

void MainVS(
    in float4 InPosition : ATTRIBUTE0,
    out float4 Output : SV_POSITION
)
{
    Output = InPosition;
}

float4 MainPS() : SV_Target0
{
    return float4(1.0f, 1.0f, 1.0f, 1.0f);
}
```

4. 그 다음 ShaderClass를 추가합니다. 

* MyTest.h
```cpp
#include "GlobalShader.h"
#include "ScreenRendering.h"

class FMyTestVS : public FGlobalShader
{
    DECLARE_EXPORTED_SHADER_TYPE(FMyTestVS, Global, /*MYMODULE_API*/);

    FMyTestVS() { }
    FMyTestVS(const ShaderMetaType::CompiledShaderInitializerType& Initializer)
        : FGlobalShader(Initializer)
    {
    }

    static bool ShouldCache(EShaderPlatform Platform)
    {
        return true;
    }
};

class FMyTestPS : public FGlobalShader
{
    DECLARE_EXPORTED_SHADER_TYPE(FMyTestPS, Global, /*MYMODULE_API*/);

    FMyTestPS() { }
    FMyTestPS(const ShaderMetaType::CompiledShaderInitializerType& Initializer)
        : FGlobalShader(Initializer)
    {
    }
    static bool ShouldCache(EShaderPlatform Platform)
    {
        return true;
    }
};
```

5. GlobalShaderMap에 만든 클래스를 등록해야 합니다.
    - 참고로 TEXT("/ShaderAutogen/MyTest.usf")에 잘못된 경로를 추가하면 어떤 경로를 지원해주는지 친절히 알려줍니다.

* MyTest.cpp
```cpp
#include "MyTest.h"

IMPLEMENT_SHADER_TYPE(, FMyTestVS, TEXT("/ShaderAutogen/MyTest.usf"), TEXT("MainVS"), SF_Vertex);
IMPLEMENT_SHADER_TYPE(, FMyTestPS, TEXT("/ShaderAutogen/MyTest.usf"), TEXT("MainPS"), SF_Pixel);
```

6. 이제 렌더타겟에 그리는 블루프린트 함수를 추가하기위해 RHI 종속성을 추가합니다.

* .Build.cs
```c#
    publicDependencyModuleNames.AddRange(
        new string[]
        {
            ...
            "RHI"
            ...
        }
    );
```

7. 먼저 그리는데 사용할 버퍼를 생성해야 합니다. 인덱스 버퍼와 버텍스 버퍼를 생성할 수 있습니다.

* MyTestFunctionLibrary.cpp
```cpp
... includes ...

struct FMyBufferStruct
{
	FVector4f Position;
};

class FMyVertexDeclaration : public FRenderResource
{
public:
	FVertexDeclarationRHIRef VertexDeclarationRHI;

	virtual void InitRHI() override
	{
		FVertexDeclarationElementList Elements;
		uint32 Stride = sizeof(FMyBufferStruct);
		Elements.Add(FVertexElement(0, STRUCT_OFFSET(FMyBufferStruct, Position), VET_Float4, 0, Stride));
		VertexDeclarationRHI = RHICreateVertexDeclaration(Elements);
	}

	virtual void ReleaseRHI() override
	{
		VertexDeclarationRHI->Release();
	}
};

class FMyVertexBuffer : public FVertexBuffer
{
public:
	virtual void InitRHI() override
	{
		FRHIResourceCreateInfo CreateInfo(L"MyTest");
		VertexBufferRHI = RHICreateVertexBuffer(sizeof(FMyBufferStruct) * 4, BUF_Static, CreateInfo);
		void* VoidPtr = RHILockBuffer(VertexBufferRHI, 0, sizeof(FMyBufferStruct) * 4, RLM_WriteOnly);

		FMyBufferStruct* Vertices = reinterpret_cast<FMyBufferStruct*>(VoidPtr);
		Vertices[0].Position = FVector4f(-1.0f, 1.0f, 0.0f, 1.0f);
		Vertices[1].Position = FVector4f(1.0f, 1.0f, 0.0f, 1.0f);
		Vertices[2].Position = FVector4f(-1.0f, -1.0f, 0.0f, 1.0f);
		Vertices[3].Position = FVector4f(1.0f, -1.0f, 0.0f, 1.0f);

		RHIUnlockBuffer(VertexBufferRHI);
	}
};

class FMyIndexBuffer : public FIndexBuffer
{
public:
	virtual void InitRHI() override
	{
		FRHIResourceCreateInfo CreateInfo(L"MyTest");
		using TYPE = uint16;
		const uint32 Stride = sizeof(TYPE);
		const uint32 Size = Stride * 6;

		IndexBufferRHI = RHICreateIndexBuffer(Stride, Size, BUF_Static, CreateInfo);
		void* VoidPtr = RHILockBuffer(IndexBufferRHI, 0, Size, RLM_WriteOnly);

		TYPE* Indices = reinterpret_cast<TYPE*>(VoidPtr);
		Indices[0] = 0;
		Indices[1] = 1;
		Indices[2] = 2;
		Indices[3] = 2;
		Indices[4] = 1;
		Indices[5] = 3;

		RHIUnlockBuffer(IndexBufferRHI);
	}
};

TGlobalResource<FMyVertexBuffer> VertexBuffer;
TGlobalResource<FMyIndexBuffer> IndexBuffer;
```

8. 랜더링을 시행할 BlueprintFunctionLibrary리를 추가하고 RenderingThread에서 실행할 메서드를 정의해야합니다.

* MyFunctionLibrary.h
```cpp
#pragma once

#include "CoreMinimal.h"
#include "Kismet/BlueprintFunctionLibrary.h"
#include "MyTestFunctionLibrary.generated.h"

UCLASS(MinimalAPI, meta = (ScriptName = "MyTestShaderLibrary"))
class UGlobalTestShaderBlueprintLibrary : public UBlueprintFunctionLibrary
{
    GENERATED_BODY()

public:

    UFUNCTION(BlueprintCallable, Category = "GlobalShaderTest", meta = (WorldContext = "WorldContextObject"))
    static void DrawGlobalTestShaderRenderTarget(
        class UTextureRenderTarget2D* OutputRenderTarget,
        AActor* Actor
    );
};
```

* MyFunctionLibrary.cpp
```cpp
#include "MyTestFunctionLibrary.h"
#include "MyTest.h"

#include "TextureResource.h"
#include "Engine/TextureRenderTarget2D.h"
#include "Engine/World.h"
#include "GlobalShader.h"

... Buffer ...

static void DrawMyShader_RenderThread (
	FRHICommandListImmediate& RHICmdList,
	ERHIFeatureLevel::Type FeatureLevel,
	FTextureRenderTargetResource* OutputRenderTargetResource
)
{
	check(IsInRenderingThread());

	

	FRHIRenderPassInfo RPInfo(
		OutputRenderTargetResource->GetRenderTargetTexture(),
		ERenderTargetActions::DontLoad_Store
	);
	RHICmdList.BeginRenderPass(RPInfo, TEXT("DrawGlobalTest"));
	
	auto GlobalShaderMap = GetGlobalShaderMap(FeatureLevel);
	TShaderMapRef<FMyTestVS> VertexShader(GlobalShaderMap);
	TShaderMapRef<FMyTestPS> PixelShader(GlobalShaderMap);

	FMyVertexDeclaration VertexDec;
	VertexDec.InitRHI();

	FGraphicsPipelineStateInitializer GraphicsPSOInit;
	RHICmdList.ApplyCachedRenderTargets(GraphicsPSOInit);

	GraphicsPSOInit.RasterizerState = TStaticRasterizerState<>::GetRHI();
	GraphicsPSOInit.BlendState = TStaticBlendState<>::GetRHI();
	GraphicsPSOInit.DepthStencilState = TStaticDepthStencilState<false, CF_Always>::GetRHI();

	GraphicsPSOInit.BoundShaderState.VertexDeclarationRHI = VertexDec.VertexDeclarationRHI;
	GraphicsPSOInit.BoundShaderState.VertexShaderRHI = VertexShader.GetVertexShader();
	GraphicsPSOInit.BoundShaderState.PixelShaderRHI = PixelShader.GetPixelShader();
	GraphicsPSOInit.PrimitiveType = PT_TriangleList;

	SetGraphicsPipelineState(RHICmdList, GraphicsPSOInit, EApplyRendertargetOption::ForceApply);

	RHICmdList.SetStreamSource(0, VertexBuffer.VertexBufferRHI, 0);

	const uint32 VerticiesNum = 4;
	const uint32 TriangleNum = 2;
	RHICmdList.DrawIndexedPrimitive(IndexBuffer.IndexBufferRHI, 0, 0, VerticiesNum, 0, TriangleNum, 1);

	RHICmdList.EndRenderPass();
}

void UGlobalTestShaderBlueprintLibrary::DrawGlobalTestShaderRenderTarget(
	UTextureRenderTarget2D* OutputRenderTarget,
	AActor* Actor
)
{
	check(IsInGameThread());

	if (!OutputRenderTarget)
		return;
	if (!Actor)
		return;

	FTextureRenderTargetResource* TextureRenderTargetResource = OutputRenderTarget->GameThread_GetRenderTargetResource();

	UWorld* World = Actor->GetWorld();
	ERHIFeatureLevel::Type FeatureLevel = World->Scene->GetFeatureLevel();

	ENQUEUE_RENDER_COMMAND(CaptureCommand)(
			[FeatureLevel, TextureRenderTargetResource]
			(FRHICommandListImmediate& RHICmdList)
			{
				DrawMyShader_RenderThread(RHICmdList, FeatureLevel, TextureRenderTargetResource);
			}
		);
}
```

## 다음
이제 블루프린트 함수를 호출하면 렌더타겟텍스쳐를 하얀색으로 색칠하는 메서드를 생성했습니다.

이제 ImagePlateComponent, BasePassRendering, ClearQuad를 보고 참고할 수 있습니다.