---
layout: post
title: Automation test
---

## Automation test

* Flags는 어디서 테스트를 하는 것이 적합한지를 나타냅니다. 정의부를 보면 설명이 나와있습니다.

```cpp
IMPLEMENT_SIMPLE_AUTOMATION_TEST(FTestClassName, "AutomationSectionClasses", Flags)

bool FTestClassName::RunTest(const FString& parameters)
{
    UWorld* world = FAutomationEditorCommonUtils::CreateNewMap();
    {
        ATheFestivalCharacter* hero = world->...
    }
}
```

? 이 외에도 다른 테스트, Automation등 정말 많다.

## Functional test