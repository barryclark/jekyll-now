---
layout: post
title: UMG and UI
---

UE 5.01   
2022 05 16   

## HUD (Head Up Displays)란
비디오 게임에서 HUD 또는 상태 표시줄은 정보가 게임 사용자 인터페이스의 일부로 플레이어에게 시각적으로 전달되는 방법입니다.
HUD는 주인공의 건강, 아이템, 게임 진행 표시를 포함한 여러 정보를 동시에 표시하는 데 자주 사용됩니다.

* 현대 항공기에 사용되는 헤드업 디스플레이에서 이름을 따왔습니다.

[사용자 인터페이스 및 HUD](https://docs.unrealengine.com/4.26/en-US/InteractiveExperiences/Framework/UIAndHUD/)는
게임에 대한 정보를 플레이어에게 제공하고 경우에 따라 플레이어가 게임과 상호 작용할 수 있도록 하는 게임 방식입니다.

게임의 인터페이스는 플레이어에게 정보를 전달하고 사용자에게 지시된 입력을 요청하는 수단을 제공하는 데 사용됩니다
게임 인터페이스는 일반적으로 헤드업 디스플레이(HUD)와 메뉴 또는 사용자 인터페이스(UI)의 두 가지 주요 요소로 구성됩니다.

* HUD는 게임 플레이 중 화면에 오버레이되는 상태 및 정보를 나타냅니다. HUD의 목적은 플레이어에게 게임의 현재 상태, 즉 점수, 건강, 남은 시간, 등을 보여주는 데 있습니다.
* HUD는 일반적으로 비대화형입니다. 즉, 플레이어가 HUD의 요소를 클릭하지 않지만 HUD와 사용자 인터페이스를 분리하기 어려운 특정 유형의 게임에서는 회색 영역이 됩니다.
* 사용자 인터페이스는 메뉴 및 기타 대화형 요소를 나타냅니다. 이러한 요소는 일반적으로 HUD처럼 화면에 오버레이되어 그려지지만 특정 상황에서는 게임 세계 자체의 일부가 세계의 표면에 렌더링될 수 있습니다.
* Slate는 Unreal Editor 또는 게임 내 사용자 인터페이스와 같은 도구 및 애플리케이션을 위한 사용자 인터페이스를 재미있고 효율적으로 구축할 수 있도록 설계된 사용자 인터페이스 프레임워크입니다.

* UWidget
    * UPanelWidget
    * UUserWidget
        * WidgetTree

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

* Blueprintable 프로퍼티는 블루프린트 클래스로 생성 가능함을 보여줍니다.
* BlueprintType 프로퍼티는 클래스를 블루프린트 변수로 사용할 수 있게 합니다.
* 아무것도 없을 경우 UUserWidget으로 생성한 후 부모 클래스를 변경할 수 있습니다.

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

## 참고

* WidgetTree는 Blueprint widget 컬렉션을 관리합니다.

**? 위젯도 효율적인 관리를 위해서 패턴이 있을거라고 생각함. 다만 어떻게 찾아야 할지 모르겠음.**

1. A to B
2. OpenClose

더읽을 것들 
: [UE4 UMG UUserWidget: NativePreConstruct와 BlueprintPreConstruct중 어느 것이 먼저 실행되나요?](https://allarsblog.com/2020/01/29/ue4-umg-uuserwidget-which-fires-first-native_preconstruct-or-blueprint-preconstruct/)
, [Unreal C++ - 위젯(Widget)](https://hombody.tistory.com/316)