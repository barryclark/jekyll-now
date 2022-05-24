---
layout: post
title: UE compute shader
---

## C++에서 ComputeShader 생성

```cpp
class FGlobalComputeTestShader : public FGlobalShader
{
	DECLARE_SHADER_TYPE(FGlobalComputeTestShader, Global);

public:
	FGlobalComputeTestShader() {}
	FGlobalComputeTestShader(const ShaderMetaType::CompiledShaderInitializerType& Initializer)
		: FGlobalShader(Initializer)
	{
		OutputSurface.Bind(Initializer.ParameterMap, TEXT("OutputSurface"));
		TestStructureBufferSurface.Bind(Initializer.ParameterMap, TEXT("TestStructureBuffer"));
	}

	static bool ShouldCache(EShaderPlatform Platform)
	{
		return IsFeatureLevelSupported(Platform, ERHIFeatureLevel::SM5);
	}

	static bool ShouldCompilePermutation(const FGlobalShaderPermutationParameters& Parameters)
	{
		return IsFeatureLevelSupported(Parameters.Platform, ERHIFeatureLevel::SM5);
	}

	virtual bool Serialize(FArchive& Ar) override
	{
		bool bShaderHasOutdatedParam = FGlobalShader::Serialize(Ar);
		Ar << OutputSurface << TestStructureBufferSurface;
		return bShaderHasOutdatedParam;
	}

	void SetSurface(FRHICommandList& RHICmdList, FUnorderedAccessViewRHIRef OutputSurfaceUAV
		, FGlobalShaderStructData& ShaderStructData, FUnorderedAccessViewRHIRef& TestStructureBuffUAV)
	{
		// RenderTargetTexture
		FComputeShaderRHIRef ComputeShaderRHI = GetComputeShader();
		if (OutputSurface.IsBound())
			RHICmdList.SetUAVParameter(ComputeShaderRHI, OutputSurface.GetBaseIndex(), OutputSurfaceUAV);

		// UniformBuffer
		FGlobalUniformStructData UniformData;
		UniformData.ColorOne = ShaderStructData.ColorOne;
		UniformData.ColorTwo = ShaderStructData.ColorTwo;
		UniformData.ColorThree = ShaderStructData.ColorThree;
		UniformData.ColorFour = ShaderStructData.ColorFour;
		UniformData.ColorIndex = ShaderStructData.ColorIndex;
		SetUniformBufferParameterImmediate(RHICmdList, GetComputeShader(), GetUniformBufferParameter<FGlobalUniformStructData>(), UniformData);

		// StructuredBuffer
		if (TestStructureBufferSurface.IsBound())
			RHICmdList.SetUAVParameter(ComputeShaderRHI, TestStructureBufferSurface.GetUAVIndex(), TestStructureBuffUAV);
	}

	void UnbindBuffers(FRHICommandList& RHICmdList)
	{
		FComputeShaderRHIRef ComputeShaderRHI = GetComputeShader();
		if (OutputSurface.IsBound())
			RHICmdList.SetUAVParameter(ComputeShaderRHI, OutputSurface.GetBaseIndex(), FUnorderedAccessViewRHIRef());

		if (TestStructureBufferSurface.IsBound())
			RHICmdList.SetUAVParameter(ComputeShaderRHI, TestStructureBufferSurface.GetUAVIndex(), FUnorderedAccessViewRHIRef());
	}

private:
	FShaderResourceParameter OutputSurface;
	FRWShaderParameter TestStructureBufferSurface;
};

IMPLEMENT_SHADER_TYPE(, FGlobalComputeTestShader, TEXT("/Plugin/globalShaderTest/Private/GlobalShaderTest.usf"), TEXT("MainCS"), SF_Compute);
```

## Compute Shader .usf 작성

```cpp
// GlobalShaderTest.usf

#include "/Engine/Public/Platform.ush"
#include "/Engine/Private/Common.ush"      // C++에서 만든 UniformBuffer 사용위해 추가
                                           // C++에서 정의한 모든 UniformSturct는 Common에 있음

struct TestStruct
{
    float3 TestPosition;
};

RWStructuredBuffer<TestStruct> TestStructureBuffer;
RWTexture2D<float4> OutputSurface;

[numthreads(32, 32, 1)]
void MainCS(uint3 ThreadID : SV_DispatchThreadID)
{
    float SizeX, SizeY;
    OutputSurface.GetDimensions(SizeX, SizeY);
    
    float2 Resolution = float2(SizeX, SizeY);
    float2 UV = (ThreadID.xy / Resolution.xy) - 0.5f;
    
    // FGlobalShaderTestUniform 라는 UniformBuffer의 ColorOne.r를 시간으로 사용.
    float GlobalTime = FGlobalShaderTestUniform.ColorOne.r;
    
    float T = GlobalTime * 0.1 + ((0.25 + 0.05 * sin(GlobalTime * 0.1)) / (length(UV.xy) + 0.07)) * 2.2;
    float SI = sin(T);
    float CO = cos(T);
    float2x2 MA = { CO, SI, -SI, CO };
    
    float V1, V2, V3;
    V1 = V2 = V3 = 0.0;
    
    float S = 0.0;
    for (int i = 0; i < 90; i++)
    {
        float3 P = S * float3(UV, 0.0);
        P.xy = mul(P.xy, MA);
        P += float3(0.22, 0.3, S - 1.5 - sin(GlobalTime * 0.13) * 0.1);
          
        for (int i = 0; i < 8; i++)    
            P = abs(P) / dot(P, P) - 0.659;
  
        V1 += dot(P, P) * 0.0015 * (1.8 + sin(length(UV.xy * 13.0) + 0.5 - GlobalTime * 0.2));
        V2 += dot(P, P) * 0.0013 * (1.5 + sin(length(UV.xy * 14.5) + 1.2 - GlobalTime * 0.3));
        V3 += length(P.xy * 10.0) * 0.0003;
        S += 0.035;
    }
  
    float Len = length(UV);
    V1 *= lerp(0.7, 0.0, Len);
    V2 *= lerp(0.5, 0.0, Len);
    V3 *= lerp(0.9, 0.0, Len);

    float3 Col = float3(V3 * (1.5 + sin(GlobalTime * 0.2) * 0.4), (V1 + V3) * 0.3, V2)
                    + lerp(0.2, 0.0, Len) * 0.85
                    + lerp(0.0, 0.6, V3) * 0.3;
  
    float3 Powered = pow(abs(Col), float3(1.2, 1.2, 1.2));
    float3 Minimized = min(Powered, 1.0);
    float4 OutputColor = float4(Minimized, 1.0);
    
    OutputSurface[ThreadID.xy] = OutputColor;
    TestStructureBuffer[0].TestPosition = float3(0.5, 0.5, 0.5);    // 테스트로 임의의 값으로 변경 시켜봄
}
```

## StructuredBuffer에 사용할 멤버를 관리할 구조체 정의

```cpp
struct FStructuredDataTest
{
	struct TestStruct
	{
		FVector TestPosition;
	};

	void Init()
	{
		if (IsInitied)
			return;
		IsInitied = true;

		TestStruct TestElement;
		TestElement.TestPosition = FVector(1.0f, 1.0f, 1.0f);
		TResourceArray<TestStruct> BuffferData;
		BuffferData.Reset();
		BuffferData.Add(TestElement);
		BuffferData.SetAllowCPUAccess(true);

		FRHIResourceCreateInfo TestCreateInfo;
		TestCreateInfo.ResourceArray = &BuffferData;

		TestStructureBuff = RHICreateStructuredBuffer(sizeof(TestStruct)
			, sizeof(TestStruct) * 1, BUF_UnorderedAccess | BUF_ShaderResource, TestCreateInfo);;
		TestStructureBuffUAV = RHICreateUnorderedAccessView(TestStructureBuff, true, false);
	}

	FVector ReadStructuredBuffer(FVector InVector)
	{
		TArray<FVector> Data;
		Data.Reset();
		Data.Add(InVector);

		FVector* SrcPtr = (FVector*)RHILockStructuredBuffer(TestStructureBuff.GetReference(), 0, sizeof(FVector), EResourceLockMode::RLM_ReadOnly);
		FMemory::Memcpy(Data.GetData(), SrcPtr, sizeof(FVector));
		RHIUnlockStructuredBuffer(TestStructureBuff.GetReference());
		return Data[0];
	}

	bool IsInitied = false;
	FStructuredBufferRHIRef TestStructureBuff;
	FUnorderedAccessViewRHIRef TestStructureBuffUAV;
};
```

## Compute Shader를 Dispatch 해주는 함수 작성

```cpp
static void UseComputeShader_RenderThread(FRHICommandListImmediate& RHICmdList, FTextureRenderTargetResource* OutputRenderTargetResource
	, FGlobalShaderStructData ShaderStructData, ERHIFeatureLevel::Type FeatureLevel, FName TextureRenderTargetName)
{
	check(IsInRenderingThread());

	TShaderMapRef<FGlobalComputeTestShader> ComputeShader(GetGlobalShaderMap(FeatureLevel));
	RHICmdList.SetComputeShader(ComputeShader->GetComputeShader());

	const int32 SizeX = OutputRenderTargetResource->GetSizeX();
	const int32 SizeY = OutputRenderTargetResource->GetSizeY();
	
	FRHIResourceCreateInfo CreateInfo;

	static FStructuredDataTest StructuredData;
	StructuredData.Init();

	// PF_A32B32G32R32F 이기 때문에 RenderTarget에서 RenderTargetFormat이 RTF_RGBA32f 와 같은 형태로 호환 가능해야 함
	FTexture2DRHIRef Texture = RHICreateTexture2D(SizeX, SizeY, PF_A32B32G32R32F, 1, 1, TexCreate_ShaderResource | TexCreate_UAV, CreateInfo);
	FUnorderedAccessViewRHIRef TextureUAV = RHICreateUnorderedAccessView(Texture);
	ComputeShader->SetSurface(RHICmdList, TextureUAV, ShaderStructData, StructuredData.TestStructureBuffUAV);
	DispatchComputeShader(RHICmdList, *ComputeShader, SizeX / 32, SizeY / 32, 1);
	ComputeShader->UnbindBuffers(RHICmdList);
	
	FVector StructuredDataResult = StructuredData.ReadStructuredBuffer(FVector(1.0f, 1.0f, 1.0f));

	// [UE4]Global Shader 파트에서 만든 함수. Texture의 내용을 OutputRenderTargetResource에 그려줌
	DrawTestShaderRenderTarget_RenderThread(RHICmdList, OutputRenderTargetResource, FeatureLevel, TextureRenderTargetName
		, FLinearColor(), Texture, ShaderStructData);
}
```

## Comopute Shader를 블루프린트로 호출할 수 있도록 함수 제공

```cpp
// GlobalShaderTestCode.h
USTRUCT(BlueprintType)
struct FGlobalShaderStructData
{
	GENERATED_USTRUCT_BODY()

	UPROPERTY(BlueprintReadWrite, VisibleAnywhere, Category = ShaderData)
	FLinearColor ColorOne;

	UPROPERTY(BlueprintReadWrite, VisibleAnywhere, Category = ShaderData)
	FLinearColor ColorTwo;

	UPROPERTY(BlueprintReadWrite, VisibleAnywhere, Category = ShaderData)
	FLinearColor ColorThree;

	UPROPERTY(BlueprintReadWrite, VisibleAnywhere, Category = ShaderData)
	FLinearColor ColorFour;

	UPROPERTY(BlueprintReadWrite, VisibleAnywhere, Category = ShaderData)
	int32 ColorIndex;
};

UCLASS(MinimalAPI, meta = (ScriptName = "TestShaderLibrary"))
class UGlobalTestShaderBlueprintLibrary : public UBlueprintFunctionLibrary
{
	GENERATED_UCLASS_BODY()

	UFUNCTION(BlueprintCallable, Category = "GlobalShaderTestPlugin", meta = (WorldContext = "WorldContextObject"))
	static void UseComputeShader(class UTextureRenderTarget2D* OutputRenderTarget, AActor* Actor, FGlobalShaderStructData ShaderStructData);
};

// GlobalShaderTestCode.cpp
void UGlobalTestShaderBlueprintLibrary::UseComputeShader(class UTextureRenderTarget2D* OutputRenderTarget, AActor* Actor, FGlobalShaderStructData ShaderStructData)
{
	check(IsInGameThread());

	if (!OutputRenderTarget)
		return;

	if (!Actor)
		return;

	FTextureRenderTargetResource* TextureRenderTargetResource = OutputRenderTarget->GameThread_GetRenderTargetResource();
	UWorld* World = Actor->GetWorld();
	ERHIFeatureLevel::Type FeatureLevel = World->Scene->GetFeatureLevel();
	FName TextureRenderTargetName = OutputRenderTarget->GetFName();
	ENQUEUE_RENDER_COMMAND(CaptureCommand)(
		[TextureRenderTargetResource, FeatureLevel, ShaderStructData, TextureRenderTargetName](FRHICommandListImmediate& RHICmdList)
		{
			UseComputeShader_RenderThread(RHICmdList, TextureRenderTargetResource, ShaderStructData, FeatureLevel, TextureRenderTargetName);
		}
	);
}
```