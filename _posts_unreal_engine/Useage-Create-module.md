---
layout: post
title: Module
---

[Module](/Concept-Module)

엔진 자체가 모듈 모음으로 구성된 것과 같이, 각 게임은 하나 이상의 게임플레이 모듈로 구성됩니다. 관련 클래스 모음을 위한 컨테이너라는 점에서 이전 버전의 엔진 패키지와 유사합니다.
게임을 많은 DLL파일로 분할하는 것은 링크 시간이 더 빨라지겠지만, DLL내보내기 및/또는 인터페이스 클래스를 더 자주 처리해야합니다.

하나 이상의 모듈은 IMPLEMENT_**PRIMARY**_GAME_MODULE로 선언해야 하며, 나머지 모듈은 IMPLEMENT_GAME_MODULE매크로를 사용해야 합니다. UBT(언리얼 빌드 툴)은 자동으로 모듈을 검색하고 추가 게임 DLL을 컴파일 합니다.

* 상호 의존적인 모듈 생성을 지원하지만, 이는 컴파일 시간에 이상적이지 않습니다. 또한 변수의 정적 초기화에 문제를 일으킬 수 있습니다. 상호 의존적이지 않은 게임 플레이 모듈은 설계 및 유지 관리가 더 어렵지만 코드는 더 깨끗할 수 있습니다.

* [Kantan Code Examples](https://github.com/kamrann/KantanCodeExamples)
, [KantanCharts](https://github.com/kamrann/KantanCharts)
는 좋은 예시가 될 수 있습니다.

# 보조 모듈 만들기
1. SubModule폴더를 만듭니다. (한곳에 몰아넣어도 됩니다.)
2. SubModule.Build.cs를 추가합니다.
    ```c#
    using UnrealBuildTool;

    public class SubModule : ModuleRules
    {
	    public SubModule(ReadOnlyTargetRules Target) : base(Target)
	    {
		    PCHUsage = PCHUsageMode.UseExplicitOrSharedPCHs;

	    	PublicDependencyModuleNames.AddRange(new string[] { "Core", "CoreUObject", "Engine", "InputCore", "HeadMountedDisplay" });
	    }
    }
    ```
3. SubModule.h, .cpp를 추가합니다.
    SubModule.h
    ```cpp
    #pragma once

    #include "CoreMinimal.h"
    ```
    SubModule.cpp
    ```cpp
    #include "SubModule.h"
    #include "Modules/ModuleManager.h"

    IMPLEMENT_GAME_MODULE(FDefaultGameModuleImpl, SubModule, "SubModule" );
    ```
# 모듈 빌드에 추가하기
1. 빌드 Target과 EditorTarget에 다음을 추가해 줍니다.
	```c#
		ExtraModuleNames.Add("..", "SubModule"); //현재 작동안함. 찾아봐야 할지 고민중.
	```
	또는
	```c#
		ExtraModuleNames.Add("SubModule");
    ```
# 에디터에 모듈 추가하기
1. .uproject에 모듈을 추가해 줍니다.
    ```
    	"Modules": [
    		{
				...
    		},
    		{
    			"Name": "SubModule",
    			"Type": "Runtime"
    		}
    	],
    ```

이제 에디터에서 c++파일을 추가할 때 SubModule에 추가할 수 있습니다. 

[ModuleRules](https://docs.unrealengine.com/4.26/en-US/ProductionPipelines/BuildTools/UnrealBuildTool/ModuleFiles/)
, [Targets](https://docs.unrealengine.com/4.26/en-US/ProductionPipelines/BuildTools/UnrealBuildTool/TargetFiles/)
, .uproject는 [plugins](https://docs.unrealengine.com/4.27/en-US/ProductionPipelines/Plugins/)와 \Engine\Source\Runtime\Projects\Public\ProjectDescriptor.h 그리고 \Engine\Source\Runtime\Projects\Public\ModuleDescriptor.h을 참고할 수 있습니다.