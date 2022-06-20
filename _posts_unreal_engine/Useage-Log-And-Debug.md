---
layout: post
title: Log and debug
---

UE 4.27
2022 06 16

# UE_LOG

## 매크로의 선언
**커스텀 로그 카테고리(Custom Log Category)**는 언리얼 엔진에서 제공하는 로그 카테고리 이외에 개발자가 필요한 카테고리를 직접 만들어서 사용할 수 있습니다.

*.h
```cpp
DECLARE_LOG_CATEGORY_EXTERN(LogName, Log, All);
```

*.cpp
```cpp
DEFINE_LOG_CATEGORY(LogName);
```

또는 *.cpp아래에 ```DEFINE_LOG_CATEGORY_STATIC```를 이용할 수 있습니다.

* 매크로의 선언은 \Engine\Source\Runtime\Core\Public\Logging\LogMacros.h에 정의되어 있습니다.
* /Engine/Source/Runtime/Core/Public/CoreGlobals.h에 정의된 매크로를 볼 수 있습니다.

## 로그 출력하기
로그를 출력할 수 있으며 TEXT("")에 서식 지정자를 이용하여 해당 자료형에 맞는 데이터를 출력할 수 있습니다.
```cpp
UE_LOG(LogClass, Log, TEXT("Log text."));
```

* LogClass는 로그 카테고리 입니다.
* Log는 상세도이며 ELogVerbosity Enum에 정의됩니다.
* 다음 인수는 출력하고자 하는 텍스트로 파라미터 마크업 포함입니다.

## Log Formatting
* 일반 : UE_LOG(LogTemp, Log, TEXT("Log Message"));
* FString : UE_LOG(LogTemp, Log, TEXT("FString : %s"), *FString);
    - 로그에서 %s는 TCHAR* 타입을 받습니다. *FString에 오버라이드 되어 있습니다.
    - 추가적으로 FString 클래스는 TCHAR의 TArray로 만들어져 있습니다. 인코딩 변환 매크로는 아키텍쳐의 FString문서를 읽을 수 있습니다.
* FName : Name->ToString()으로 FString을 받아온 후 FString을 로그로 출력합니다.
* bool : UE_LOG(LogTemp, Log, TEXT("Bool : %s"), bValue ? TEXT("true") : TEXT("false"));
* int : UE_LOG(LogTemp, Log, TEXT("Int : %d"), intValue);
* float : UE_LOG(LogTemp, Log, TEXT("Float : %f"), floatValue);
* FVector : UE_LOG(LogTemp, Log, TEXT("FVector : %s"), *Vector().ToString());

## 로그 상세(Verbosity) 수준의 종류
* Fatal은 치명적인 오류로 콘솔 및 파일에 출력합니다. 로그를 비활성화해도 출력이 됩니다.
* Error는 콘솔 및 로그 파일에 오류를 출력합니다.
* Warning은 콘솔 및 로그 파일에 경고를 출력합니다.
* Log는 메시지를 로그 파일로 출력, 콘솔은 출력 되지 않습니다.
* Verbose는 상세 로그에 사용합니다. 상세 메시지를 로그 파일에 출력합니다.
* VeryVerbose는 파일에 출력합니다. 대량의 로그를 출력하는 상세 로그를 남길때 사용합니다.
* 추가적으로 \Engine\Source\Runtime\Core\Public\Logging\LogVerbosity.h에서 로그 상세를 볼 수 있습니다.

# Consol 변수

[C++의 콘솔 변수](https://docs.unrealengine.com/4.27/ko/ProductionPipelines/DevelopmentSetup/Tools/ConsoleManager/) : 또한 추가적으로 함수 안에서 콘솔 변수를 생성하는 방법과 등록 해제하는 방법을 설명합니다.

콘솔 명령이란 사용자가 입력한 무자열을 엔진에 전송하여, 엔진이 어떤 식으로 반응하는 것을 말합니다. 콘솔 변수는 콘솔을 통해 변경할 수 있는 몇몇 상태를 추가적으로 저장합니다.

**콘솔 매니저에서 콘솔 명령과 변수를 등록하는 것으로 자동 완성과 Enum을 통해 콘솔 오브젝트 전체 목록을 구할 수 있습니다.** 콘솔 변수에는 이름이 있어 콘솔에 이름을 입력하기 시작하면 자동 완성 기능이 지원됩니다.

**콘솔 변수란 엔진 측면의 state를 저장하는 단순 데이터**입니다. 사용자가 state를 읽고 설정할 수 있습니다.

* 변수는 엔진이 생성되는 초기에 등록해 줘야 합니다.
* 필요하다면 함수 안에 선언할 수 있습니다.

## 콘솔 변수 생성/등록하기
*.h
```cpp
#include "HAL/IConsoleManager.h"
...

#if !NO_CVARS

// consol 변수 선언
// Name true/false로 설정 가능
extern TAutoConsoleVariable<bool> DebugDraw(TEXT("Name"), false, TEXT("Help"), ECVF_Default);

#endif
```

*.cpp
```cpp
#if !NO_CVARS

FAutoConsoleCommand CCmd_HorrorEvent_PrintConsoleState(
    TEXT("Name"),
    TEXT("Help"),
    FConsoleCommandWithArgsDelegate::CreateLambda([](const TArray<FString>& Params)
        {
            ...
        }),
    ECVF_Default);

#endif
```

## 콘솔 변수의 활용
애셋의 프로퍼티항목은 에디터 안에서 수정할 수 있지만, 그 외의 기능에서는 콘솔 변수와 콘솔 명령어를 활용해야 합니다. **개발 단계에서 코드 수정없이 디테일한 값을 설정하거나 테스트를 하기에 유용합니다. 콘솔 명령어의 델리게이트 종류와 플래그 값의 종류 등 세세한 항목은 엔진 코드나 언리얼 문서를 통해서 확인할 수 있습니다.**

Getter함수를 사용해서 콘솔 변수를 받을 수 있지만, 다음의 방법으로도 가능합니다.

```cpp
static const auto CVar = IConsoleManager::Get().FindConsoleVariable(TEXT("Name")); 
int32 Value = CVar->GetInt();
```

이렇게 하면, 변수로의 포인터를 구해서 사용하게 됩니다. 이를 통해 처음 호출될 때만 콘솔 변수를 찾게 됩니다.

## 콘솔 변수 행위와 스타일에 의도된 사항
* 콘솔 변수는 사용자 입력을 반영하나, (MotionBlur 0/1 같은 옵션은 지원하지 않는 플랫폼이 있을 수 있기에) 시스템의 state 까지 반영하지는 않습니다. 
* **변수 state 는 코드로 변경하지 않는 것이 좋습니다. 왜냐하면 사용자가 지정한 state 가 변수에 반영되지 않으면 잘못 입력했나 혼란을 줄 수도 있고, 다른 변수의 state 때문에 콘솔 변수를 변경하지 못하게 될 수도 있기 때문입니다.**
* 항상 변수의 용도와 적정값을 설명해 주는 도움말을 작성해 주시기 바랍니다.
* 대부분의 콘솔 변수는 개발 전용으로만 쓰이기에, 일찍 ECVF_Cheat 옵션을 붙여 주는 것도 좋은 생각입니다. 디파인을 사용하여 피처를 컴파일에서 빼버리는 것도 더욱 좋을 수 있습니다 (예: #if !(UE_BUILD_SHIPPING || UE_BUILD_TEST)).
* 변수 이름은 가급적 최소 길이로 하면서도 이름 자체로 설명이 되게끔 하는 것이 좋으며, 부정적인 의미는 피하는 것이 좋습니다 (나쁜 이름의 예: EnableMotionBlur, MotionBlurDisable, MBlur, HideMotionBlur). 대소문자를 적절히 사용하여 읽기 쉽고 일관되게 해 주시기 바랍니다 (예: MotionBlur).
* 들여쓰기의 경우 (폭이 가변적이지 않은) 고정폭 폰트로 출력한다 가정하는 것이 좋습니다.
* 자동 완성과 DumpConsoleCommands 및 Help 의 동작을 위해서는 엔진 초기화 도중 변수를 등록시키는 것이 중요합니다.

더 자세한 내용은 IConsoleManager.h 를 참고해 보시기 바랍니다.

# Debug print
```cpp
GEngine->AddONScreenDebugMessage(-1, 5.f, FColor::White, TEXT("Test!"));
```

## 디버그 드로잉
화면상에 원하는 도형을 그려, 디버깅을 수월하게 도와줍니다.

```cpp
... include
#include "DrawDebugHelpers.h"

    ... func
#if ENABLE_DRAW_DEBUG
    DrawDebugCapsule(...);
#endif
    
```

* \Engine\Source\Runtime\Engine\Public\DrawDebugHelpers.h에 있으며 "DrawDebugHelpers.h"로 인클루드 할 수 있습니다.