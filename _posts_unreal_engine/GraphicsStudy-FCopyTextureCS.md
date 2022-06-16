---
layout: post
title: CopyTextureCS
---

UE 5.0

D:\Program Files\Epic Games\UE_5.0\Engine\Source\Runtime\RenderCore\Public\CopyTextureShader.h

## 클래스 선언은 다음과 같습니다.
```cpp
class FCopyTextureCS : public FGlobalShader
{
	DECLARE_EXPORTED_TYPE_LAYOUT(FCopyTextureCS, RENDERCORE_API, NonVirtual);
    ...
```
* ComputeShader는 GlobalShader를 상속받습니다.

* DECLARE_EXPORTED_TYPE_LAYOUT란?
    - D:\Program Files\Epic Games\UE_5.0\Engine\Source\Runtime\Core\Public\Serialization\MemoryLayout.h에서 찾을 수 있습니다.
    - (T, RequiredAPI, Interface)를 파라메터로 받고, 
    - 정의는 INTERNAL_DECLARE_LAYOUT_BASE(T); INTERNAL_DECLARE_TYPE_LAYOUT(T, Interface, RequiredAPI)입니다.

* cpp를 보면 다음과 같이 되어있습니다.
```cpp
IMPLEMENT_TYPE_LAYOUT(FCopyTextureCS);
```

<detail>
<summary>추가적으로 다음과 같이 되어있습니다.</summary>

```cpp
#define IMPLEMENT_COPY_RESOURCE_SHADER(SrcType,DstType,ValueType)\
	typedef TCopyResourceCS<ECopyTextureResourceType::SrcType, ECopyTextureResourceType::DstType, ECopyTextureValueType::ValueType, 4> FCopyTextureCS_##SrcType##_##DstType##_##ValueType##4;\
	IMPLEMENT_SHADER_TYPE4_WITH_TEMPLATE_PREFIX(template<>, RENDERCORE_API, FCopyTextureCS_##SrcType##_##DstType##_##ValueType##4, SF_Compute);

#define IMPLEMENT_COPY_RESOURCE_SHADER_ALL_TYPES(SrcType,DstType)\
	IMPLEMENT_COPY_RESOURCE_SHADER(SrcType,DstType,Float)\
	IMPLEMENT_COPY_RESOURCE_SHADER(SrcType,DstType,Int32)\
	IMPLEMENT_COPY_RESOURCE_SHADER(SrcType,DstType,Uint32)

IMPLEMENT_COPY_RESOURCE_SHADER_ALL_TYPES(Texture2D     , Texture2D     );
IMPLEMENT_COPY_RESOURCE_SHADER_ALL_TYPES(Texture2D     , Texture2DArray);
IMPLEMENT_COPY_RESOURCE_SHADER_ALL_TYPES(Texture2D     , Texture3D     );
IMPLEMENT_COPY_RESOURCE_SHADER_ALL_TYPES(Texture2DArray, Texture2D     );
IMPLEMENT_COPY_RESOURCE_SHADER_ALL_TYPES(Texture2DArray, Texture2DArray);
IMPLEMENT_COPY_RESOURCE_SHADER_ALL_TYPES(Texture2DArray, Texture3D     );
IMPLEMENT_COPY_RESOURCE_SHADER_ALL_TYPES(Texture3D     , Texture2D     );
IMPLEMENT_COPY_RESOURCE_SHADER_ALL_TYPES(Texture3D     , Texture2DArray);
IMPLEMENT_COPY_RESOURCE_SHADER_ALL_TYPES(Texture3D     , Texture3D     );
```

</detail>


* 생성자는 다음과 같습니다. 
```cpp
	... 클래스 선언 ...
protected:
	FCopyTextureCS() {}
	FCopyTextureCS(const ShaderMetaType::CompiledShaderInitializerType& Initializer)
		: FGlobalShader(Initializer)
	{
		DstOffsetParam.Bind(Initializer.ParameterMap, TEXT("DstOffset"), SPF_Mandatory);
		SrcOffsetParam.Bind(Initializer.ParameterMap, TEXT("SrcOffset"), SPF_Mandatory);
		DimensionsParam.Bind(Initializer.ParameterMap, TEXT("Dimensions"), SPF_Mandatory);
		SrcResourceParam.Bind(Initializer.ParameterMap, TEXT("SrcResource"), SPF_Mandatory);
		DstResourceParam.Bind(Initializer.ParameterMap, TEXT("DstResource"), SPF_Mandatory);
	}
```

* Initializer를 보면 Parameter를 바인드 하는 것을 알 수 있습니다.
	- Parameter는 FCopyTextureCS아래에 Protected로 정의되어 있습니다.

```cpp
	... 클래스 선언 ...
public:
	inline const FShaderResourceParameter& GetSrcResourceParam() { return SrcResourceParam; }
	inline const FShaderResourceParameter& GetDstResourceParam() { return DstResourceParam; }
```

* Dispatch를 정의했습니다.
```cpp
	void Dispatch(
		FRHIComputeCommandList& RHICmdList,
		const CopyTextureCS::DispatchContext& Context,
		FIntVector const& SrcOffset,
		FIntVector const& DstOffset,
		FIntVector const& Dimensions
	)
	{
		check(SrcOffset.GetMin() >= 0 && DstOffset.GetMin() >= 0 && Dimensions.GetMin() >= 0);
		check(Context.DstType != ECopyTextureResourceType::Texture2D || Dimensions.Z <= 1);

		FRHIComputeShader* ShaderRHI = RHICmdList.GetBoundComputeShader();
		SetShaderValue(RHICmdList, ShaderRHI, SrcOffsetParam, SrcOffset);
		SetShaderValue(RHICmdList, ShaderRHI, DstOffsetParam, DstOffset);
		SetShaderValue(RHICmdList, ShaderRHI, DimensionsParam, Dimensions);

		RHICmdList.DispatchComputeShader(
			FMath::DivideAndRoundUp(uint32(Dimensions.X), Context.ThreadGroupSizeX),
			FMath::DivideAndRoundUp(uint32(Dimensions.Y), Context.ThreadGroupSizeY),
			FMath::DivideAndRoundUp(uint32(Dimensions.Z), Context.ThreadGroupSizeZ)
		);
	}
```
* SetShaderValue는 D:\Program Files\Epic Games\UE_5.0\Engine\Source\Runtime\RenderCore\Public\ShaderParameterUtils.h에 정의되어 있습니다.
	- 템플릿의 세이더 유형에 대해서 매개변수의 값을 설정합니다.
	- 그 외에 유용한 유틸들이 많습니다.
<detail>
<summary>Code</summary>

```cpp
template<typename ShaderRHIParamRef, class ParameterType, typename TRHICmdList>
void SetShaderValue(
	TRHICmdList& RHICmdList,
	const ShaderRHIParamRef& Shader,
	const FShaderParameter& Parameter,
	const ParameterType& Value,
	uint32 ElementIndex = 0
	)
{
	static_assert(!TIsPointer<ParameterType>::Value, "Passing by value is not valid.");

	const uint32 AlignedTypeSize = (uint32)Align(sizeof(ParameterType), SHADER_PARAMETER_ARRAY_ELEMENT_ALIGNMENT);
	const int32 NumBytesToSet = FMath::Min<int32>(sizeof(ParameterType),Parameter.GetNumBytes() - ElementIndex * AlignedTypeSize);

	// This will trigger if the parameter was not serialized
	checkSlow(Parameter.IsInitialized());

	if(NumBytesToSet > 0)
	{
		RHICmdList.SetShaderParameter(
			Shader,
			Parameter.GetBufferIndex(),
			Parameter.GetBaseIndex() + ElementIndex * AlignedTypeSize,
			(uint32)NumBytesToSet,
			&Value
			);
	}
}
```

</detail>

* 어떤 쉐이더를 이용할지에 대해 템플릿으로 구현되어 있습니다.
```cpp
	static inline TShaderRef<FCopyTextureCS> SelectShader(FGlobalShaderMap* GlobalShaderMap, ECopyTextureResourceType SrcType, ECopyTextureResourceType DstType, ECopyTextureValueType ValueType, CopyTextureCS::DispatchContext& OutContext);

protected:
	template<typename ShaderType>
	static inline TShaderRef<FCopyTextureCS> SelectShader(FGlobalShaderMap* GlobalShaderMap, CopyTextureCS::DispatchContext& OutContext);

	template <ECopyTextureResourceType SrcType>
	static inline TShaderRef<FCopyTextureCS> SelectShader(FGlobalShaderMap* GlobalShaderMap, ECopyTextureResourceType DstType, ECopyTextureValueType ValueType, CopyTextureCS::DispatchContext& OutContext);

	template <ECopyTextureResourceType SrcType, ECopyTextureResourceType DstType>
	static inline TShaderRef<FCopyTextureCS> SelectShader(FGlobalShaderMap* GlobalShaderMap, ECopyTextureValueType ValueType, CopyTextureCS::DispatchContext& OutContext);
```

<detail>
<summary>하단에 정의되어 있습니다.</summary>

```cpp
template <typename ShaderType>
inline TShaderRef<FCopyTextureCS> FCopyTextureCS::SelectShader(FGlobalShaderMap* GlobalShaderMap, CopyTextureCS::DispatchContext& OutContext)
{
	TShaderRef<ShaderType> Shader = GlobalShaderMap->GetShader<ShaderType>();
	Shader->GetDispatchContext(OutContext);
	return Shader;
}

template <ECopyTextureResourceType SrcType, ECopyTextureResourceType DstType>
inline TShaderRef<FCopyTextureCS> FCopyTextureCS::SelectShader(FGlobalShaderMap* GlobalShaderMap, ECopyTextureValueType ValueType, CopyTextureCS::DispatchContext& OutContext)
{
	switch (ValueType)
	{
	default: checkNoEntry();
	case ECopyTextureValueType::Float:  return SelectShader<TCopyResourceCS<SrcType, DstType, ECopyTextureValueType::Float,  4>>(GlobalShaderMap, OutContext);
	case ECopyTextureValueType::Int32:  return SelectShader<TCopyResourceCS<SrcType, DstType, ECopyTextureValueType::Int32,  4>>(GlobalShaderMap, OutContext);
	case ECopyTextureValueType::Uint32: return SelectShader<TCopyResourceCS<SrcType, DstType, ECopyTextureValueType::Uint32, 4>>(GlobalShaderMap, OutContext);
	}
}

template <ECopyTextureResourceType SrcType>
inline TShaderRef<FCopyTextureCS> FCopyTextureCS::SelectShader(FGlobalShaderMap* GlobalShaderMap, ECopyTextureResourceType DstType, ECopyTextureValueType ValueType, CopyTextureCS::DispatchContext& OutContext)
{
	switch (DstType)
	{
	default: checkNoEntry();
	case ECopyTextureResourceType::Texture2D:	   return FCopyTextureCS::SelectShader<SrcType, ECopyTextureResourceType::Texture2D     >(GlobalShaderMap, ValueType, OutContext);
	case ECopyTextureResourceType::Texture2DArray: return FCopyTextureCS::SelectShader<SrcType, ECopyTextureResourceType::Texture2DArray>(GlobalShaderMap, ValueType, OutContext);
	case ECopyTextureResourceType::Texture3D:      return FCopyTextureCS::SelectShader<SrcType, ECopyTextureResourceType::Texture3D     >(GlobalShaderMap, ValueType, OutContext);
	}
}

inline TShaderRef<FCopyTextureCS> FCopyTextureCS::SelectShader(FGlobalShaderMap* GlobalShaderMap, ECopyTextureResourceType SrcType, ECopyTextureResourceType DstType, ECopyTextureValueType ValueType, CopyTextureCS::DispatchContext& OutContext)
{
	switch (SrcType)
	{
	default: checkNoEntry();
	case ECopyTextureResourceType::Texture2D:	   return FCopyTextureCS::SelectShader<ECopyTextureResourceType::Texture2D     >(GlobalShaderMap, DstType, ValueType, OutContext);
	case ECopyTextureResourceType::Texture2DArray: return FCopyTextureCS::SelectShader<ECopyTextureResourceType::Texture2DArray>(GlobalShaderMap, DstType, ValueType, OutContext);
	case ECopyTextureResourceType::Texture3D:      return FCopyTextureCS::SelectShader<ECopyTextureResourceType::Texture3D     >(GlobalShaderMap, DstType, ValueType, OutContext);
	}
}
```

</detail>


* 변수로 사용할 파라메터를 정의하는 부분입니다.
```cpp
	... 클래스 선언 ...
	LAYOUT_FIELD(FShaderParameter, DstOffsetParam);
	LAYOUT_FIELD(FShaderParameter, SrcOffsetParam);
	LAYOUT_FIELD(FShaderParameter, DimensionsParam);
	LAYOUT_FIELD(FShaderResourceParameter, SrcResourceParam);
	LAYOUT_FIELD(FShaderResourceParameter, DstResourceParam);
};

```

* 이부분은 제대로 찾은건지 모르겠습니다. CopyTextureShader.usf입니다. 

<detail>
<summary>.usf파일</summary>

```cpp
// Copyright Epic Games, Inc. All Rights Reserved.

/*=============================================================================
	CopyTextureShaders.usf:  
		Generic shader for copying 2D, 2D Array and 3D texture resources
=============================================================================*/

#include "Common.ush"

uint3 DstOffset;  // Front upper left texel in the destination texture to start writing data to
uint3 SrcOffset;  // Front upper left texel in the source texture to start reading data from
uint3 Dimensions; // The total x,y,z number of texels in the copy region

#if SRC_TYPE == 0

	Texture2D     <VALUE_TYPE> SrcResource;
	#define SRC_ADDR(p,o) ((p).xy + (o).xy)

#elif SRC_TYPE == 1

	Texture2DArray<VALUE_TYPE> SrcResource;
	#define SRC_ADDR(p,o) ((p).xyz + (o).xyz)

#elif SRC_TYPE == 2

	Texture3D     <VALUE_TYPE> SrcResource;
	#define SRC_ADDR(p,o) ((p).xyz + (o).xyz)

#endif

#if DST_TYPE == 0

	RWTexture2D     <VALUE_TYPE> DstResource;
	#define DST_ADDR(p,o) ((p).xy + (o).xy)

#elif DST_TYPE == 1

	RWTexture2DArray<VALUE_TYPE> DstResource;
	#define DST_ADDR(p,o) ((p).xyz + (o).xyz)

#elif DST_TYPE == 2

	RWTexture3D     <VALUE_TYPE> DstResource;
	#define DST_ADDR(p,o) ((p).xyz + (o).xyz)
	
#endif

#define COMP(a,b) (((a).x < (b).x) && ((a).y < (b).y) && ((a).z < (b).z))

[numthreads(THREADGROUPSIZE_X, THREADGROUPSIZE_Y, THREADGROUPSIZE_Z)]
void CopyTextureCS(uint3 Position : SV_DispatchThreadID)
{
	if (COMP(Position, Dimensions))
	{
		DstResource[DST_ADDR(Position, DstOffset)] = SrcResource[SRC_ADDR(Position, SrcOffset)];
	}
}

```

</detail>