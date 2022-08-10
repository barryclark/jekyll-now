---
layout: post
title: Log, Debug, Console
---

- [ ] 디버그...
- [ ] 콘솔오올....
- [ ] [게임플레이 디버거](https://docs.unrealengine.com/4.27/ko/ProgrammingAndScripting/GameplayDebugger/)
- [ ] 언리얼 콘솔, 디버그, 로그 활용 예시들...
- [ ] [네트워크 디버깅](https://docs.unrealengine.com/5.0/ko/network-debugging-for-unreal-engine/)
- [ ] 로그 카테고리....

## 선행적 디버그

<details><summary>C++에서 assert</summary>
<div markdown="1">

assert라는 함수는 인자로 받는 조건이 true가 아니면 예외를 발생시키는 함수로, **디버깅을 도와주거나, 코드의 가독성을 올리는 용도로 쓰입니다.** 게다가 릴리즈에서는 아무 일도 않기 때문에(c++의 경우 NDEBUG가 정의되었는가 아닌가로 동작이 달라집니다.), 성능 저하 없이 검증 코드를 집어넣을 수 있습니다.

* 근데 릴리즈에서는 아무 동작도 하지 않는다는 특성 때문인지, assert가 가지는 implicit 한 의미를 이해 못 했는지 assert를 잘못 사용하는 때도 있습니다.

**assert문이 가지는 의미는 절대로 valid하지 않을 때는 절대로 이 함수가 호출되지 않는다는 것입니다.**

</div></details>

<details><summary>범위가 명확한 경우</summary>
<div markdown="1">

해당 메서드 안에서, 값이 반드시 유효해야 하는 경우, 사용함으로써 가독성을 높일 수 있습니다. 이제 MustDivid의 B값이 0보다 큰지 명확하게 알 수 있습니다.

```cpp
float MustDivid(float A, float B)
{
	assert(B > FLT_EPSILON)

	return A / B;
}
```

</div></details>

<details><summary>Automation test에서...</summary>
<div markdown="1">

테스트가 정상적으로 작동하는지 모를 때가 있습니다. 이를 위해 테스트의 테스트를 만들어야 하는 경우가 있습니다. 이때 이 테스트에서 이 값은 반드시 유효해야 하게 함으로써 해결 할 수 있을거라 생각합니다.

```cpp
	AActor* Actor = World->SpawnActor<...>();

	TScriptInterface<IBurnable> IBurnable = Actor;
	check(IBurnable);
	...
```

인터페이스가 반드시 상속되었음을 확인하는 것이 좋다고 생각합니다.

* 여기서 스폰하는 액터의 클래스가 블루프린트로부터 가져온 클래스인 경우, IBurnable을 상속받았다 하더라도, Interface의 주소가 유효하지 않아 실패할 수 있습니다.

</div></details>

## 언리얼의 로그(UE_LOG)

[로그(log)는 컴퓨터의 처리 내용이나 이용 상황을 시간의 흐름에 따른 기록입니다.](http://wiki.hash.kr/index.php/%EB%A1%9C%EA%B7%B8_(%EC%BB%B4%ED%93%A8%ED%84%B0))

로깅은 런타임 중 특정 시간에 이벤트, 함수 호출, 변수 값 등을 순서대로 기록하는 것을 의미합니다. 이는 일반적으로 로그 파일에 텍스트 형태로 저장됩니다. 특정 순간에 코드가 수행하는 작업에 대한 자세한 정보를 제공할 수 있으므로 특히 디버깅할 때 소프트웨어 개발자에게 귀중한 도구입니다. 좋은 사용 사례에는 특정 코드 블록이 실행되고 있는지 확인하고, 함수 간에 전달되는 데이터 값을 검사하고, 잠재적인 문제를 보고하는 것이 포함됩니다.

<details><summary>UE_LOG 매크로란?</summary>
<div markdown="1">

UE_LOG는 로그 메시지를 로그 파일에 출력 하는 매크로 입니다. `CoreGlobals.h`에 정의된 이러한 범주 중 상당수가 이미 엔진에 내장되어 있습니다. 사용자 정의 로깅 카테고리를 생성할 수도 있습니다.

**CategoryName는 로깅 카테고리 이름입니다. Verbosity는 테스트할 자세한 표시 수준입니다.**
```cpp
#define UE_LOG(CategoryName, Verbosity, Format, ...) \
```

**Formatting하는 tmxmflddms TCHAR 배열이여야 합니다. 그리고 Verbosity는 상수여야 하며 유요한 범위 안에 있어야 합니다.**
```cpp
	{ \
		static_assert(TIsArrayOrRefOfType<decltype(Format), TCHAR>::Value, "Formatting string must be a TCHAR array."); \
		static_assert((ELogVerbosity::Verbosity & ELogVerbosity::VerbosityMask) < ELogVerbosity::NumVerbosity && ELogVerbosity::Verbosity > 0, "Verbosity must be constant and in range."); \
```
 
1. **해당 로그의 Verbosity가 `COMPILED_IN_MINIMUM_VERBOSITY`보다 작고,**
2. LogCategoryCategoryName의 CompileTimeVerbosity가 경고보다 크다면

Verbosity에 따라 해당 로그를 출력할지 말지를 결정합니다. 

* 안전을 위해 모든 코드 분석(Code analysis) 매크로를 빈 매크로로 정의합니다. `CA_CONSTANT_IF`는 'if'로 확장합니다.
* `COMPILED_IN_MINIMUM_VERBOSITY`매크로는 정의되어 있지 않으면 VeryVerbose로 확장합니다.
```cpp
		CA_CONSTANT_IF((ELogVerbosity::Verbosity & ELogVerbosity::VerbosityMask) <= ELogVerbosity::COMPILED_IN_MINIMUM_VERBOSITY && (ELogVerbosity::Warning & ELogVerbosity::VerbosityMask) <= FLogCategory##CategoryName::CompileTimeVerbosity) \
		{ \
```

로그 카테고리의 Verbosity보다 작아야 (ex) Fatal < Display) **카테고리에 의해 로그출력이 억제되지 않고 출력됩니다.**

* 이 로그 카테고의 Verbosity는 런타임중에 바꿀 수 있습니다.
```cpp
			UE_LOG_EXPAND_IS_FATAL(Verbosity, PREPROCESSOR_NOTHING, if (!CategoryName.IsSuppressed(ELogVerbosity::Verbosity))) \
			{ \
```

그 다음 로그를 실행하는 코드가 있습니다.
```cpp
				auto UE_LOG_noinline_lambda = [](const auto& LCategoryName, const auto& LFormat, const auto&... UE_LOG_Args) FORCENOINLINE \
				{ \
					TRACE_LOG_MESSAGE(LCategoryName, Verbosity, LFormat, UE_LOG_Args...) \
					UE_LOG_EXPAND_IS_FATAL(Verbosity, \
						{ \
							FMsg::Logf_Internal(UE_LOG_SOURCE_FILE(__FILE__), __LINE__, LCategoryName.GetCategoryName(), ELogVerbosity::Verbosity, LFormat, UE_LOG_Args...); \
							_DebugBreakAndPromptForRemote(); \
							FDebug::ProcessFatalError(); \
						}, \
						{ \
							FMsg::Logf_Internal(nullptr, 0, LCategoryName.GetCategoryName(), ELogVerbosity::Verbosity, LFormat, UE_LOG_Args...); \
						} \
					) \
				}; \
				UE_LOG_noinline_lambda(CategoryName, Format, ##__VA_ARGS__); \
				UE_LOG_EXPAND_IS_FATAL(Verbosity, CA_ASSUME(false);, PREPROCESSOR_NOTHING) \
			} \
		} \
	}
```

* Play-In-Editor 세션이 종료되면 YourProjectName\\Saved\\Logs 폴더에서 해당 세션의 전체 로그를 찾을 수 있습니다. 액세스해야 하는 경우를 대비하여 이전 세션의 로그도 거기에 있습니다. 프로젝트가 어디에 있는지 모르는 경우 Epic Games 런처에서 프로젝트 라이브러리를 열고 해당 프로젝트를 마우스 오른쪽 버튼으로 클릭한 다음 폴더에 표시 옵션을 선택할 수 있습니다.
* Output Log 탭의 Editor에서 재생하는 동안 실시간으로 로그 출력을 볼 수 있습니다. 기본적으로 열려 있지 않으면 창-\>개발자 도구-\>출력 로그에서 찾을 수 있습니다. 실시간 로깅 외에도 이 탭은 현재 언리얼 에디터 세션 동안 발생한 모든 플레이 세션의 모든 로그 정보를 보관합니다.
* 실행 파일이 있는 경우 이름 끝에 -Log를 사용하여 바로 가기를 만들어 실행 파일을 시작할 때 로그를 열 수 있습니다.
* 게임이 실행 중일 때 물결표(\~) 키를 눌러 콘솔을 열고 콘솔 명령 showlog를 입력하고 Enter 키를 눌러 로그에 액세스할 수 있습니다. 에디터 내 플레이 세션 중에 이 작업을 수행하는 경우 x를 클릭하여 로그를 닫으면 언리얼 에디터 세션이 닫힙니다.

</div></details>


<details><summary>로그 카테고리</summary>
<div markdown="1">

**부정확합니다.**

Verbosity레벨을 조절하는 방법으로 게임의 구성 디렉토리에서 DefaultEngine.ini를 편집하고 아래와 같이 섹션을 찾아 다음을 추가할 수 있습니다.

```ini
[Core.Log]
LogActor=VeryVerbose ; (또는 Verbose, Log, Warning 등)
```

</div></details>


<details><summary>로그 상세(Verbosity)란?</summary>
<div markdown="1">

verbose 란 사전적 의미로 “말 수가 많다” 라고 합니다. 상세한 로깅 logging 을 출력할지 말지를 조정하는 parameter 라고 볼 수 있습니다.

런타임 상세도는 명령줄을 통해 변경할 수 있습니다. 로그의 특정 상세 수준이 주어지면 일치하거나 더 낮은 상세 수준의 로그 메시지만 로그에 인쇄됩니다. 상세 수준이 더 높은 메시지는 무시됩니다.

| Verbosity Level | Printed in Console? | Printed in Editor's Log? |                      Notes                       |
|-----------------|---------------------|--------------------------|--------------------------------------------------|
| Fatal           | Yes                 | N/A                      | Crashes the session, even if logging is disabled |
| Error           | Yes                 | Yes                      | Log text is coloured red                         |
| Warning         | Yes                 | Yes                      | Log text is coloured yellow                      |
| Display         | Yes                 | Yes                      | Log text is coloured grey                        |
| Log             | No                  | Yes                      | Log text is coloured grey                        |
| Verbose         | No                  | No                       |                                                  |
| VeryVerbose     | No                  | No                       |                                                  |

</div></details>

<details><summary>로그 출력하기</summary>
<div markdown="1">

로그를 출력할 수 있으며 TEXT("")에 서식 지정자를 이용하여 해당 자료형에 맞는 데이터를 출력할 수 있습니다.

```cpp
UE_LOG(LogClass, Log, TEXT("Log text."));
```

* LogClass는 로그 카테고리 입니다.
* Log는 상세도이며 ELogVerbosity Enum에 정의됩니다.
* 다음 인수는 출력하고자 하는 텍스트로 파라미터 마크업 포함입니다.

<details><summary>로그 출력을 위한 포멧은?</summary>
<div markdown="1">

<!-- Log Formatting : Formatting이 뭘까?-->

|자료형|방법|
|:-:|---|
|Default|UE_LOG(LogTemp, Log, TEXT("Log Message"));|
|Fstring|UE_LOG(LogTemp, Log, TEXT("FString : %s"), *FString);|
|FName|Name->ToString()으로 FString을 받아온 후 FString을 로그로 출력합니다.|
|bool|UE_LOG(LogTemp, Log, TEXT("Bool : %s"), bValue ? TEXT("true") : TEXT("false"));|
|int|UE_LOG(LogTemp, Log, TEXT("Int : %d"), intValue);|
|float|UE_LOG(LogTemp, Log, TEXT("Float : %f"), floatValue);|
|FVector|UE_LOG(LogTemp, Log, TEXT("FVector : %s"), *Vector().ToString());|

* 로그에서 %s는 `TCHAR*` 타입을 받습니다. 이는 `*FString`로 받아올 수 있도록 선언되어 있습니다.
  - 추가적으로 FString클래스는 TCHAR의 Array로 만들어져 있습니다. 인코딩 변환 매크로는 아키텍쳐의 FString문서에서 읽을 수 있습니다. 

</div></details>

</div></details>


<details><summary>커스텀 로그 카테고리 선언하기</summary>
<div markdown="1">

커스텀 로그 카테고리(Custom Log Category)는 언리얼 엔진에서 제공하는 로그 카테고리 이외에 개발자가 필요한 카테고리를 직접 만들어서 사용할 수 있습니다.

```cpp
// header
MODULE_API DECLARE_LOG_CATEGORY_EXTERN(CategoryName, DefaultVerbosity, CompileTimeVerbosity)
```

MODULE_API는 모듈외부에서 해당 로그 카테고리사용하기 위해서 사용합니다.

DefaultVerbosity는 .ini 파일이나 명령줄에 지정되지 않은 경우 사용되는 자세한 표시 수준입니다. 이보다 더 자세한 내용은 기록되지 않습니다. 

CompileTimeVerbosity 는 코드에서 컴파일할 최대 상세 정보입니다. **이보다 더 자세한 것은 컴파일되지 않습니다.**

* 흠... 잘모르겠음.

```cpp
// cpp
DEFINE_LOG_CATEGORY(LogName);
```

* 일반적으로 Log를 접두사로 붙이지만 필수 사항은 아닙니다.

</div></details>

<details><summary>콘솔 커멘드</summary>
<div markdown="1">

|Logging Commands|Description|
|:-:|---|
|showlog|will toggle output terminal|	
|Log list|list all log categories|
|Log list [string]|list all log categories containing a substring|	
|Log reset|reset all log categories to their boot-time default|	
|Log [cat]|toggle the display of the category [cat]|
|Log [cat] off|disable display of the category [cat]|	
|Log [cat] on|resume display of the category [cat]|	
|Log [cat] [level]|set the verbosity level of the category [cat]|
|Log [cat] break|toggle the debug break on display of the category [cat]|	


Command line to stream log output to file
```
-log LOG=Logfile.txt
```

Log categories to separate files
```
-LogCategoryFiles="Category1=Filename1, Category2=Filename2"
```

</div></details>

## 언리얼 디버그(Debug)
[디버깅(debugging)이란 프로그램 개발의 마지막 단계에서 프로그램의 오류를 발견하고 그 원인을 밝히는 작업 과정을 말합니다.](http://wiki.hash.kr/index.php/%EB%94%94%EB%B2%84%EA%B9%85)

* 엄밀히 말하면 런타임 중에 화면에 메시지를 인쇄하는 것은 메시지가 파일에 저장되지 않기 때문에 로깅으로 간주되지 않습니다. 
* 로그에 대해 별도의 창을 열지 않고도 게임 창에서 메시지를 볼 수 있으므로 개발 및/또는 디버깅할 때 로그 메시지를 사용하는 것보다 더 편리한 경우가 많습니다. 실시간 변수 값부터 함수 호출 순서까지 모든 것을 이런 식으로 쉽게 볼 수 있습니다.

<details><summary>스크린에 메시지 띄우기</summary>
<div markdown="1">

```cpp
GEngine->AddONScreenDebugMessage(-1, 5.f, FColor::White, TEXT("Test!"));
```

* \Engine\Source\Runtime\Engine\Public\DrawDebugHelpers.h에 있으며 "DrawDebugHelpers.h"로 인클루드 할 수 있습니다.

</div></details>

<details><summary>디버그 드로잉 사용하기</summary>
<div markdown="1">

화면상에 원하는 도형을 그려, 디버깅을 수월하게 도와줍니다.

* \Engine\Source\Runtime\Engine\Public\ `DrawDebugHelpers.h`에 선언되어 있습니다.

```cpp
... include
#include "DrawDebugHelpers.h"

    ... func
#if ENABLE_DRAW_DEBUG
    DrawDebugCapsule(...);
#endif
    
```
</div></details>

<details><summary>디버그 하지 않을 경우, 디버그 코드는 어떻게 되나</summary>
<div markdown="1">

`UE_DEBUG`가 선언되어 있을 떄, 유효한 함수를, 선언되어 있지 않다면, 비어있는 함수를 호출합니다.

함수는 `FORCEINLINE`이므로 비어있는 함수는, 아무런 어셈블리 코드를 만들지 않습니다.

따라서, 디버그 코드를 숨기기 위해서 `#if, #endif`를 할 필요가 없습니다. 다만, 연산한 정보를 전달할 경우, 감쌀 필요가 있을 수도 있습니다.

<!-- 키워드? 매크로? 어트리뷰트? 용어가 무지하게 헷갈리네...-->
<!-- 비어있는 함수를 forceinline했을 때, 어떻게 되는지에 대해서-->

</div></details>

## 언리얼의 콘솔(Console)
[콘솔(console)은 관리자가 시스템의 상태를 확인하고 업무를 처리하기 위해 사용하는 특수한 기능의 단말 장치를 말합니다.](http://wiki.hash.kr/index.php/%EC%BD%98%EC%86%94)

<details><summary>콘솔 매니저, 변수, 명령</summary>
<div markdown="1">

[콘솔 매니저](https://docs.unrealengine.com/4.27/ko/ProductionPipelines/DevelopmentSetup/Tools/ConsoleManager/)에서 **콘솔 명령과 변수를 등록하는 것으로 자동 완성과 Enum을 통해 콘솔 오브젝트 전체 목록을 구할 수 있습니다.** 콘솔 변수에는 이름이 있어 콘솔에 이름을 입력하기 시작하면 자동 완성 기능이 지원됩니다.

**콘솔 변수란 엔진 측면의 state를 저장하는 단순 데이터**입니다. 사용자가 state를 읽고 설정할 수 있습니다.

콘솔 명령이란 사용자가 입력한 무자열을 엔진에 전송하여, 엔진이 어떤 식으로 반응하는 것을 말합니다. 콘솔 변수는 콘솔을 통해 변경할 수 있는 몇몇 상태를 추가적으로 저장합니다.

</div></details>

<details><summary>콘솔 변수 생성/등록하기</summary>
<div markdown="1">

* 변수는 엔진이 생성되는 초기에 등록해 줘야 합니다.
* 필요하다면 함수 안에 선언할 수 있습니다.

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

</div></details>

<details><summary>콘솔 변수 활용하기</summary>
<div markdown="1">

애셋의 프로퍼티항목은 에디터 안에서 수정할 수 있지만, 그 외의 기능에서는 콘솔 변수와 콘솔 명령어를 활용해야 합니다. **개발 단계에서 코드 수정없이 디테일한 값을 설정하거나 테스트를 하기에 유용합니다. 콘솔 명령어의 델리게이트 종류와 플래그 값의 종류 등 세세한 항목은 엔진 코드나 언리얼 문서를 통해서 확인할 수 있습니다.**

Getter함수를 사용해서 콘솔 변수를 받을 수 있지만, 다음의 방법으로도 가능합니다.

```cpp
#if !NO_CVARS
static const auto CVar = IConsoleManager::Get().FindConsoleVariable(TEXT("Name")); 
int32 Value = CVar->GetInt();
#endif
```

이렇게 하면, 변수로의 포인터를 구해서 사용하게 됩니다. 이를 통해 처음 호출될 때만 콘솔 변수를 찾게 됩니다.

</div></details>

<details><summary>콘솔 변수 행위와 스타일의 의도</summary>
<div markdown="1">

* 콘솔 변수는 사용자 입력을 반영하나, (MotionBlur 0/1 같은 옵션은 지원하지 않는 플랫폼이 있을 수 있기에) 시스템의 state 까지 반영하지는 않습니다. 
* **변수 state 는 코드로 변경하지 않는 것이 좋습니다. 왜냐하면 사용자가 지정한 state 가 변수에 반영되지 않으면 잘못 입력했나 혼란을 줄 수도 있고, 다른 변수의 state 때문에 콘솔 변수를 변경하지 못하게 될 수도 있기 때문입니다.**
* 항상 변수의 용도와 적정값을 설명해 주는 도움말을 작성해 주시기 바랍니다.
* 대부분의 콘솔 변수는 개발 전용으로만 쓰이기에, 일찍 ECVF_Cheat 옵션을 붙여 주는 것도 좋은 생각입니다. 디파인을 사용하여 피처를 컴파일에서 빼버리는 것도 더욱 좋을 수 있습니다 (예: #if !(UE_BUILD_SHIPPING || UE_BUILD_TEST)).
* 변수 이름은 가급적 최소 길이로 하면서도 이름 자체로 설명이 되게끔 하는 것이 좋으며, 부정적인 의미는 피하는 것이 좋습니다 (나쁜 이름의 예: EnableMotionBlur, MotionBlurDisable, MBlur, HideMotionBlur). 대소문자를 적절히 사용하여 읽기 쉽고 일관되게 해 주시기 바랍니다 (예: MotionBlur).
* 들여쓰기의 경우 (폭이 가변적이지 않은) 고정폭 폰트로 출력한다 가정하는 것이 좋습니다.
* 자동 완성과 DumpConsoleCommands 및 Help 의 동작을 위해서는 엔진 초기화 도중 변수를 등록시키는 것이 중요합니다.

더 자세한 내용은 IConsoleManager.h 를 참고해 보시기 바랍니다.

</div></details>

주요 참고자료 : [unrealcommunity](https://unrealcommunity.wiki/logging-lgpidy6i), [언리얼 엔진4 문서](https://docs.unrealengine.com/4.27/ko/), [GameDevGuild](https://ikrima.dev/ue4guide/gameplay-programming/logging-commands/)