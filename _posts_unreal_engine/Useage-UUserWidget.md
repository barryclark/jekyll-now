---
layout: post
title: User widget
---

UE 5.01   
2022 05 16   

## 위젯 클래스 생성하기

예시로 UUserWidget을 상속받는 클래스 생성입니다.

* [UUserWidget은 UMG모듈을 필요로 합니다.](https://docs.unrealengine.com/4.27/en-US/API/Runtime/UMG/Blueprint/UUserWidget/)

```cpp
...
#include "Blueprint/UserWidget.h"
...

UCLASS()
class UMyWidget : public UUserWidget
{
    GENERATED_BODY()
    ...
}
```

* [UClass의 블루프린트 클래스의 생성](Concept-Blueprinttype-BlueprintAble)을 참고할 수 있습니다.

## NativePreConstruct이용하기

* PreConstruct는 게임과 에디터에서 호출됩니다.
* NativePreConstruct(cpp)를 호출후 PreConstruct(Blueprint)를 호출합니다.
* UUserWidget의 NativeConstruct는 NativePreConstruct를 호출합니다.
* NativeConstruct는 AddToViewport에서 호출됩니다.

## Asset 불러오기
NativeConstruct와 PreConstruct는 ConstructorHelpers를 사용할 수 없습니다.
ConstructorHelpers를 include한 후 사용하려 하면 생성자 외부에서는 사용할 수 없다는 충돌을 발생합니다.
따라서 ConstructorHelpers가 아닌 LoadObject<UBlueprintGeneratedClass>()를 이용하여 블루프린트 클래스나 오브젝트를 가져와야 합니다.

```cpp
class UMyWidget : public UUserWidget
...
    virtual void UWidget::NativePreConstruct() override
    {
        Super::NativePreConstruct();

        UBlueprintGeneratedClass* BlueprintGeneratedClass = LoadObject<UBlueprintGeneratedClass>(nullptr, "Asset path")
    }
```

## Widget C++에 Bind하기

```cpp
class UMyWidget : public UUserWidget
...
    UPROPERTY(Meta = (BindWidget))
    UWidgetClass* Widget;

    UPROPERTY(Meta = (BindWidgetAnim), Transient)
    UWidgetAnimation* WidgetAnimation;
```

C++ 위젯 클래스를 기반으로 위벳 BP를 만들고, 상속받은 Widget Blueprint에서 서로 대응되도록 만들면 cpp 변수에 해당 위젯이 할당됩니다.

* Bind Widget을 설정해주지 않으면 오류가 납니다.
* 직접 위젯을 생성해서 추가할 수도 있습니다.