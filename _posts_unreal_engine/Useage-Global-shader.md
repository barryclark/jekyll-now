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
    return 0.0f;
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
    Engine에 있는 Shader가 많아 개인적으로 Path를 불러오는 함수를 디버깅할려다 많은 시간을 낭비했습니다.

* MyTest.cpp
```cpp
#include "MyTest.h"

IMPLEMENT_SHADER_TYPE(, FMyTestVS, TEXT("/ShaderAutogen/MyTest.usf"), TEXT("MainVS"), SF_Vertex);
IMPLEMENT_SHADER_TYPE(, FMyTestPS, TEXT("/ShaderAutogen/MyTest.usf"), TEXT("MainPS"), SF_Pixel);
```

6. 이제 렌더타겟에 그리는 블루프린트 함수를 추가합니다.

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

* MyTest.h
```cpp
...
#include "Kismet/BlueprintFunctionLibrary.h"
#include "MyTest.generated.h"

... FMyTestVS, FMyTestPS ...

UCLASS(MinimalAPI, meta = (ScriptName = "MyTestShaderLibrary"))
class UGlobalTestShaderBlueprintLibrary : public UBlueprintFunctionLibrary
{
    GENERATED_BODY()

public:
    UFUNCTION(BlueprintCallable, Category = "GlobalShaderTest", meta = (WorlContext = "WorldContextObject"))
    static void DrawGlobalTestShaderRenderTarget(
        class UTextureRenderTarget2D* OutputRenderTarget,
        AActor* Actor,
        UTexture* MyTexture
    );
};
```

* MyTest.cpp
```cpp

```

<detail>
<summary>UE 4.xx를 위한 정리되지 않은 자료</summary>

1. 플러그인 폴더의 .uplugin에서 [Modules](https://docs.unrealengine.com/4.27/en-US/ProductionPipelines/BuildTools/UnrealBuildTool/ModuleFiles/)에 "LoadingPhase" : ["PostConfigInit"](https://docs.unrealengine.com/5.0/en-US/API/Runtime/Projects/ELoadingPhase__Type/)를 추가해 줍니다.   
FGlobalShader를 추가하는 모듈은 엔진이 시작되기 전에 로드 되어야 합니다. 게임이나 Editor가 시작된 후에는 동적 모듈이 자체 셰이더 유형을 추가할 수 없습니다.
```json
"Modules": [
    {
        ...
        "LoadingPhase": "PostConfigInit"
    }
]
```

2. PublicDependencyModuleNames에 RenderCore와 Projects를 추가합니다.
```c#
...
    publicDependencyModuleNames.AddRange(
        new string[]
        {
            "Core",
            // ...

            "CoreUObject",
            "Engine",
            "RHI",
            "RenderCore",
            "Projects"
        }
    );
...
```

3. Plugin/Shaders/에 .usf파일을 추가합니다.   
    - Visual studio에서 syntax highlight가 적용되지 않는다면 옵션>텍스트 편집기>파일 확장명에서 usf : HLSL Editor, ush : HLSL Editor를 추가해 줍니다.
```
// Simple pass-through vertex shader

void MainVS(
    in float4 InPosition : ATTRIBUTE0,
    out float4 Output : SV_POSITION
)
{
    Output = InPosition;
}

// Simple solid color pixel shader
float4 MyColor;
float4 MainPS() : SV_Target0
{
    return MyColor;
}
```

4. Unreal Engine이 셰이더를 인식하고 컴파일을 시작하도록 C++클래스를 선언합니다.
```cpp
#include "GlobalShader.h"
#include "ScreenRendering.h"

// FGlobalShader의 하위클래스입니다. 이로인해 글로벌 쎄이더 맵에 나타나게 됩니다.
// 이는 머티리얼을 찾을 필요 없음을 의미합니다.
class FMyTestVS : public FGlobalShader
{
    // 셰이더 유형의 직렬화에 필요한 내보내기가 생성됩니다.
    // 세 번째 매개변수는 필요한 경우 셰이더 모듈이 위치할 코드 모듈의 외부 연결 유형입니다.
    // 예를 들어, 렌더러 모듈에 없는 모든 C++코드를 들 수 있습니다.
    DECLARE_EXPORTED_SHADER_TYPE(FMyTestVS, Global, /*MYMODULE_API*/);

    FMyTestVS() { }
    FMyTestVS(const ShaderMetaType::CompiledShaderInitializerType& Initializer)
        : FGlobalShader(Initializer)
    {
    }

    // 특정 상황에서 이 셰이더를 컴파일해야 하는지 결정하는 데 필요합니다.
    // 예를 들어, 비께산 셰이더 지원 RHI에서 계산 셰이더를 컴파일하고 싶지 않을 수 있습니다.
    static bool ShouldCache(EShaderPlatform Platform)
    {
        return true;
    }
};
```

5. 다음은 픽셀 셰이더를 선언합니다.
```cpp
... FMyTestVS ...

class FMyTestPS : public FGlobalShader
{
    DECLARE_EXPORTED_SHADER_TYPE(FMyTestPS, Global, /*MYMODULE_API*/);

    // MyColorParameter맴버는 바인딩을 찾을 수 있도록 런타임에 대한 정보를 보유하는 클래스에 추가됩니다.
    // 그러면 런타임에 매개변수 값을 설정할 수 있습니다.
    FShaderParameter MyColorParameter;

    FMyTestPS() { }
    FMyTestPS(const ShaderMetaType::CompiledShaderInitializerType& Initializer)
        : FGlobalShader(Initializer)
    {
        // 직렬화 생성자에서 함수는 매개변수를 파라메터맵에 바인딩합니다.
        // 파라메터의 .usf파일의 이름과 일치해야 합니다.
        MyColorParameter.Bind(Initializer.ParameterMap, TEXT("MyColor"), SPF_Mandatory);
    }

    // 이 함수는 동일한 C++클래스가 다른 동적에 대해 정의하고
    // 셰이더에서 #define값을 설정할 수 있을 때 사용됩니다.
    static void ModifyCompilationEnvironment(EShaderPlatform Platform, FShaderCompilerEnvironment& OutEnvironment)
    {
        FGlobalShader::ModifyCompilationEnvironment(Platform, OutEnvironment);
        // Add your own defines for the shader code
        OutEnvironment.SetDefine(TEXT("MY_DEFINE"), 1);
    }

    static bool ShouldCache(EShaderPlatform Platform)
    {
        // Could skip compiling for Platform == SP_METAL for example
        return true;
    }

    // 셰이더 바인딩의 컴파일과 cook time 정보가 런타임에 로드되고 저장되는 곳입니다.
    // FShader interface.
    virtual bool Serialize(FArchive& Ar) override
    {
        bool bShaderHasOutdatedParameters = FGlobalShader::Serialize(Ar);
        Ar << MyColorParameter;
        return bShaderHasOutdatedParameters;
    }

    // MyColor파라메터를 런타임에 특정한 값으로 바꾸는 메서드를 보여줍니다.
    void SetColor(FRHICommandList& RHICmdList, const FLinearColor& Color)
    {
        SetShaderValue(RHICmdList, GetPixelShader(), MyColorParameter, Color);
    }
};
```

5. cpp파일에 다음의 매크로를 등록합니다.
```cpp

// #define IMPLEMENT_SHADER_TYPE(TemplatePrefix,ShaderClass,SourceFilename,FunctionName,Frequency)

// 실제 C++클래스에 매핑되는 셰이더 코드로 지정되는 템플릿 또는 클래스입니다.
// 다음 코드를 사용하여 셰이더 유형을 Unreal Engine의 유형 목록에 등록할 수 있습니다.
// 이 매크로는 유형(FMyTestVS)을 .usf파일(MyTest.usf). 셰이더 진입점 (MainVS)및 주파수/쎄이더 단계(SF_Vertex)에 매핑합니다. 또한 ShouldCache()메서드가 true를 반환하는 한 셰이더가 컴파일 목록에 추가되도록 합니다.
IMPLEMENT_SHADER_TYPE(, FMyTestVS, TEXT("MyTest"), TEXT("MainVS"), SF_Vertex);

IMPLEMENT_SHADER_TYPE(, FMyTestPS, TEXT("MyTest"), TEXT("MainPS"), SF_Pixel);
```
</details>

## 수정하고 디버깅하기
.usf의 디버깅에 관한 정보는 [셰이더 컴파일 프로세스 디버깅](https://docs.unrealengine.com/5.0/en-US/debugging-the-shader-compile-process-in-unreal-engine)보라고 합니다.   

에디터가 실행되는 동안 Ctrl + Shift + .을 사용하거나 recompileshaders changed명령을 입력하여 셰이더를 다시 빌드할 수 있다고 합니다.