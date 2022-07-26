---
layout: post
title: Automation test
---

## Automation test

* Flags는 어디서 테스트를 하는 것이 적합한지를 나타냅니다. 정의부를 보면 설명이 나와있습니다.

```cpp
#if WITH_EDITOR
#include "Misc/AutomationTest.h"

IMPLEMENT_SIMPLE_AUTOMATION_TEST(FTestClassName, "AutomationSectionClasses", Flags)

bool FTestClassName::RunTest(const FString& parameters)
{
    UWorld* world = FAutomationEditorCommonUtils::CreateNewMap();
    {
        ATheFestivalCharacter* hero = world->...
    }
}
#endif
```

```cpp
IMPLEMENT_SIMPLE_AUTOMATION_TEST(FLTRAssociativtyExpressionsTest, "System.Core.Expression Parser.LTR Operator Associativity",
									EAutomationTestFlags::ApplicationContextMask | EAutomationTestFlags::SmokeFilter);
```

? 이 외에도 다른 테스트, Automation등 정말 많다.

## Functional test


# 언리얼에서 테스트 하기
## 개념
하나의 코드가 적합한지 test가 필요하다.
개수가 많아지면 테스트를 보다 관리하기 편하게 할 필요가 있다.
테스트 케이스가 추가될 때마다 다시 빌드해야한다.

## Editor용 모듈 만들기
Editor용 플러그인을 만든 후, 데이터테이블을 만들어 추가할 것이므로, 컨텐츠를 사용하도록 체크합니다.

## 데이터 테이블에서 사용할 스트럭트 정의하기
데이터 테이블로 만들 수 있는 struct를 만들기 위해서는 DataTable을 상속받은 스트럭트 여야 합니다.

```cpp
#include "Engine/DataTable.h"
...

USTRUCT(BlueprintType)
struct FInventory2DInsertTest : public FTableRowBase
{
	GENERATED_BODY()
    ...
```

상속받은 스트럭트로 데이터 테이블을 만듭니다.

## 데이터 테이블을 읽고, automation에 등록하기
다음과 같이 Asset을 읽어 옵니다.
```cpp
	UDataTable* TestDataTable = LoadObject<UDataTable>(nullptr, TEXT("DataTable'/HorrorCoreEditor/Horror2DInventoryTest/Horror2DInventoryTestDataTable.Horror2DInventoryTestDataTable'"));
	TestNotNull("TestDataTable is not valid.", TestDataTable);
	if (!TestDataTable)
	{
		return false;
	}
```

## automation을 이용해서 테스트 돌리기
테스트 케이스를 입력하고, 테스트를 돌리면, 테스트 결과를 얻을 수 있습니다.


## 테스트 케이스 작성
https://blog.squareys.de/ue4-automation-testing/

https://forums.unrealengine.com/t/how-to-compare-a-fstring-in-c-condition-breakpoints/358380/2

## Visual studio FString 조건문 찍기
wcscmp((wchar_t*)MyString.Data.AllocatorInstance.Data,L"MyText") == 0