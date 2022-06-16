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


# 스크린에 메시지를 출력하기
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