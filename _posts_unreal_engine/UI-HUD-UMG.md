---
layout: post
title: UI, HUD, UMG
---

<details><summary>ToDo</summary>
<div markdown="1">

<details><summary>아이템 위에 아이템 이름 표시하기</summary>
<div markdown="1">

필드위에 있는 아이템은, 저게 아이템이구나 확실하게 알게 해야합니다.

</div></details>

- [ ] 일반적인 위젯은 크리에트 위젯을 사용합니다.
- [ ] UProperty bind를 이용하고 이를 이용해서, 프로그레스바 변경
- [ ] Slate 위젯에 대해서 공부하기
- [ ] 3D Widget을 사용하는 방법
- [ ] WidgetAnimation이 비용이 이유?

- [ ] 드래그앤 드랍
- [ ] 애님 시퀀스 쪼개기
- [ ] 게임 플레이와, 인벤토리 UI전환
- [ ] 프로퍼티 바인딩을 이용해서 전환

</div></details>

<details><summary>Links</summary>
<div markdown="1">

|:---|---|
|[GameUIDataBase](https://www.gameuidatabase.com/index.php)|참고할 UI 찾아보는 사이트|
|[OpenGameArt](https://opengameart.org/)|게임 리소스 찾아보는 사이트|
|[15 UI Color Scheme Tools and Generators for the Perfect Interface](https://htmlburger.com/blog/ui-color-scheme/)|게임 색감 찾아보는 사이트|

</div></details>


<details><summary>UI란?</summary>
<div markdown="1">

# UI

* 옜날 게임들은, 화면이 커지면 UI가 확대대고, 축소하면 UI가 같이 작아졌습니다. 하지만 요즘 게임은, UI가 앵커에 따라 배치될 뿐, 확대 축소 되지 않습니다.

* UI를 만들는 것은 상당한 중노동 입니다.. How to 한번씩 해오는 게 과제입니다.

* 3D 공간상에서 보이기 때문에, 실제보다 크게 키웁니다.

</div></details>

<details><summary>HUD란?</summary>
<div markdown="1">

## HUD
* **HUD는 굉장히 오래된 것으로, 사용하지 않게 된지 좀 되었습니다.**
* 하지만 UI를 어떻게 사용할지에 대해서 확실한 설명

[사용자 인터페이스 및 HUD](https://docs.unrealengine.com/4.26/en-US/InteractiveExperiences/Framework/UIAndHUD/)는
게임에 대한 정보를 플레이어에게 제공하고 경우에 따라 플레이어가 게임과 상호 작용할 수 있도록 하는 게임 방식입니다.

게임의 인터페이스는 플레이어에게 정보를 전달하고 사용자에게 지시된 입력을 요청하는 수단을 제공하는 데 사용됩니다
게임 인터페이스는 일반적으로 헤드업 디스플레이(HUD)와 메뉴 또는 사용자 인터페이스(UI)의 두 가지 주요 요소로 구성됩니다.

비디오 게임에서 HUD 또는 상태 표시줄은 정보가 게임 사용자 인터페이스의 일부로 플레이어에게 시각적으로 전달되는 방법입니다.
HUD는 주인공의 건강, 아이템, 게임 진행 표시를 포함한 여러 정보를 동시에 표시하는 데 자주 사용됩니다.

* **현대 항공기에 사용되는 헤드업 디스플레이에서 이름을 따왔습니다.**
* HUD는 게임 플레이 중 화면에 오버레이되는 상태 및 정보를 나타냅니다. HUD의 목적은 플레이어에게 게임의 현재 상태, 즉 점수, 건강, 남은 시간, 등을 보여주는 데 있습니다.
* HUD는 일반적으로 비대화형입니다. 즉, 플레이어가 HUD의 요소를 클릭하지 않지만 HUD와 사용자 인터페이스를 분리하기 어려운 특정 유형의 게임에서는 회색 영역이 됩니다.
* 사용자 인터페이스는 메뉴 및 기타 대화형 요소를 나타냅니다. 이러한 요소는 일반적으로 HUD처럼 화면에 오버레이되어 그려지지만 특정 상황에서는 게임 세계 자체의 일부가 세계의 표면에 렌더링될 수 있습니다.
* Slate는 Unreal Editor 또는 게임 내 사용자 인터페이스와 같은 도구 및 애플리케이션을 위한 사용자 인터페이스를 재미있고 효율적으로 구축할 수 있도록 설계된 사용자 인터페이스 프레임워크입니다.

## Widget
* 2022 07 29 현재, 모든 UI는 위젯으로 만듭니다.

* Safe Zone (세이프 존) 위젯은 게임 유저 인터페이스(UI)를 개발할 때 여러가지 디바이스에서 실행할 수 있는 핵심적인 부분입니다. 세이프 존은 TV 디스플레이의 테두리나 iPhoneX 의 노치와 홈 바 아래처럼 기술적으로 사용할 수는 있지만 플레이어가 볼 수는 없는 디스플레이 영역으로 UI 가 넘어가지 않도록 해줍니다. The UMG Designer(디자이너)를 사용하면 UI 에 세이프 존 위젯을 적용하여 디바이스의 해상도를 (또는 회전도) 테스트할 수 있습니다.
    - 세이프 존 위젯을 디자이너 에 추가하면, Hierarchy (계층구조) 패널에서 그 자손이 된 다른 위젯의 스케일을 조절합니다. 이 자손 위젯은 "언세이프" 존이 있으면 스케일 및 다른 설정을 조절합니다.
    - [UMG safe zone](https://docs.unrealengine.com/4.27/ko/InteractiveExperiences/UMG/UserGuide/UMGSafeZones/)공식문서

어려운 결정사항으로, IOS의 화면 들어간 부분을 고려해야 합니다. 어이가 없는 부분이, 왼쪽 끝부분을 고려하지 않으면 허가를 안내준다고 합니다.

</div></details>

<details><summary>Slate</summary>
Slate는 에디터를 위해 특별히 제작된 윈도우 UI 프레임워크입니다(과거 UE 에디터는 Window의 라이브러리를 섞어서 사용했습니다). 

그러나 Slate 클래스는 UObject 환경 외부에 있고 리플렉션 시스템 외부에 있으므로 블루프린트와 함께 작동하려면 UMG 래퍼가 필요합니다.

```
Slate (슬레이트)는 언리얼 엔진4 와 함께 제공되는 플랫폼 무관, 완벽한 커스텀 유저 인터페이스 프레임워크로, 언리얼 에디터와 같은 툴과 어플리케이션에 쓸 유저 인터페이스나 게임내 유저 인터페이스의 재미와 효율을 높일 수 있도록 디자인된 것입니다. 서술형(declarative) 문법에 쉬운 디자인, 레이아웃, 스타일 요소가 결합된 Slate 를 통해 쉬운 UI 제작 및 반복작업이 가능할 것입니다.
```

</div></details>

## UserWidget
**이는 디자인과 프로그래밍을 분리하는데 있어서 중요하다고 생각합니다.**

UUserWidget을 상속받는 클래스 생성이며, [UUserWidget은 UMG모듈에 정의되어 있습니다.](https://docs.unrealengine.com/4.27/en-US/API/Runtime/UMG/Blueprint/UUserWidget/)

BlueprintType와 Blueprintable 클래스 지정자를 통해서, 변수로 블루프린트 클래스로 사용할 수 있습니다. 또한 위젯과 위젯 애님을 BindWidget, BindWidgetAnim 프로퍼티 지정자를 통해서, UMG에서 추가한 위젯을 코드에서 사용할 수 있습니다.

Asset을 읽기 위해서는 LoadObject메서드를 이용해야 합니다. 

<details><summary>UMG(Unreal motion graphic)란?</summary>
<div markdown="1">

프로그래머에게 UI를 만드는 건 꽤나 어려운 일 이라고 합니다. 기능적인 부분이 아닌, 아트적인 요소가 들어가기 때문입니다. 어떤 버튼을 쓸 지부터 어떻게 배치해야 좋을지 고민의 연속이라고 합니다.

* UMG의 핵심에는 인터페이스를 구성하는 데 사용할 수 있는 일련의 미리 만들어진 기능인 위젯이 있습니다(버튼, 체크박스, 슬라이더, 진행률 표시줄 등). 
* 언리얼 모션 그래픽 UI 디자이너(Unreal Motion Graphics UI Designer, UMG)를 뜻하는 UMG는 게임 내 HUD, 메뉴, 기타 인터페이스 관련 그래픽 요소로 사용자에게 보여주고픈 것들을 만드는 데 사용할 수 있는 비주얼 UI 제작 툴입니다.

UMG는 3D 위젯은 물론이고 애니메이션 트랙을 제공하고 있습니다. 버튼을 누르면 변하는 식으로 UI의 애니메이션을 만들 수 도 있습니다. UMG는 크게 UI를 배치하는 디자이너와 이벤트 트리거 등을 처리하는 그래프 2가지로 나뉩니다.

디자이너는 팔레트부터 UI의 구조를 확인할 수 있는 계층구조, 메인 이미지 띄우는 작업 뷰, UI나 텍스쳐의 정보를 볼 수 있는 디테일, 애니메이션 효과를 작업하는 애니메이션 타임 라인 등으로 구분돼 있습니다. 그래프는 이벤트 그래프와 디버깅을 할 수 있는 컴파일러 결과 등이 있습니다.

각 이미지들은 팔레트에서 작업 뷰로 드래그하는 식으로 만들 수 있습니다. 그리고 만들어진 UI는 이벤트 그래프에서 블루프린트로 작업할 수 있습니다. 이렇게 만들었다고 끝이 아닙니다. 지금까지 만든 건 그냥 게임 외적으로 만든 것일 뿐, 아직 게임에는 포함되지 않았습니다. 이 UI를 화면에 출력하기 위해선 게임모드라고 해서 게임의 전반적인 걸 관리하는 블루프린트를 생성하고 이벤트 그래프로 시작하면 UI를 화면에 그리라는 이벤트를 호출하면 됩니다.

```cpp
UCLASS(Abstract, editinlinenew, BlueprintType, Blueprintable, meta=( DontUseGenericSpawnObject="True", DisableNativeTick) )
class UMG_API UUserWidget : public UWidget, public INamedSlotInterface

    ...
    
public:
	/** The widget tree contained inside this user widget initialized by the blueprint */
	UPROPERTY(Transient, DuplicateTransient, TextExportTransient)
	UWidgetTree* WidgetTree;
```
</div></details>

<details><summary>UserWidget클래스 만들기</summary>
<div markdown="1">

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
BlueprintType은 블루프린트에서 변수로 선언이 가능함을 의미합니다. 그리고 Blueprintable은 블루프린트 클래스로 만들 수 있게 합니다.

```cpp
UCLASS(BlueprintType, Blueprintable)
```

### Widget을 C++에 Bind하기
C++ 위젯 클래스를 기반으로 블루프린트 클래스를 만들었을 떄, UMG에서 위젯을 추가해서 사용할 경우, BindWidget메타 데이터를 이용해서, 블루프린트 클래스의 위젯을 cpp에서 가져와 사용할 수 있습니다.

* 특수한 상황(생각안남)을 제외하면 이렇게 사용한 클래스는 추상클래스이므로 Abstract 클래스 지정자 추가합니다.

상속받은 Widget Blueprint에서 서로 대응되도록 만들면 cpp 변수에 해당 위젯이 할당됩니다.

* 대응 된다는 것은, 리플리케이션된 변수와, UMG에서 추가한 위젯의 이름이 같음을 의미합니다.

```cpp
class UMyWidget : public UUserWidget
...
    UPROPERTY(Meta = (BindWidget))
    UWidgetClass* Widget;

    UPROPERTY(Meta = (BindWidgetAnim), Transient)
    UWidgetAnimation* WidgetAnimation;

```

* Bind Widget을 설정해주지 않으면 오류가 납니다.
* 직접 위젯을 생성해서 추가할 수도 있습니다.

### Asset 불러오기
NativeConstruct와 PreConstruct는 ConstructorHelpers를 사용할 수 없습니다.

* ConstructorHelpers는 생성자에서 사용하기 위해서 만들어졌습니다. 다른 곳에서 사용하지 못하도록 만들었습니다.
    - ConstructorHelpers를 include한 후 사용하려면 생성자 외부에서는 사용할 수 없다며 컴파일 오류를 냅닙다.

따라서 ConstructorHelpers가 아닌 LoadObject<UBlueprintGeneratedClass>()를 이용하여 블루프린트 클래스나 오브젝트를 가져와야 합니다.

```cpp
class UMyWidget : public UUserWidget
...
    virtual void NativePreConstruct() override
    {
        Super::NativePreConstruct();

        UBlueprintGeneratedClass* BlueprintGeneratedClass = LoadObject<UBlueprintGeneratedClass>(nullptr, "Asset path")
    }
```

</div></details>

<details><summary>UMG 모범 사례</summary>
<div markdown="1">

[UMG 모범 사례](https://www.unrealengine.com/ko/tech-blog/umg-best-practices)의 내용을 정리하면 다음과 같습니다.

* 이 접근 방법은 비즈니스 로직을 C++에 유지해 관리, 디버그, 수정하기가 쉽습니다. 강력한 이벤트 기반 API를 블루프린트에 노출해 원하는 UX와 시각 경험을 만들 수 있습니다.

* 블루프린트 틱, 프로퍼티 바인딩에 지나친 애니메이션까지 어느정도 피할 수 있죠. 이 접근 방식은 시스템과 스테이트의 중요한 에지를 노출하는 이벤트 세트를 제공하는 거나 다름없습니다. 이벤트가 있으니 블루프린트 틱과 프로퍼티 바인딩의 효과가 자연스레 떨어지는 거죠.

* 애니메이션은 유용하긴 해도 비용이 높아서 신중하게 사용해야 합니다. 특히 UI 예산이 마치 0이나 다름없는 HUD와 같이 퍼포먼스가 중요할 때는 더욱 그렇죠. UI 작업을 해보셨다면 잘 알 겁니다!

**이 글의 목적은 C++과 블루프린트로 UI를 제작하기 위한 UMG 모범 사례를 보여주는 자세한 예제입니다.**

게임 UI 시스템은
* 크고 복잡함
    - 물론 예외도 있겠지만, 대부분 또는 많은 게임은 깊이감 있는 성장 시스템, 퀘스트 시스템, 스탯 시스템, 리텐션 시스템 등을 가지고 있습니다. 제 경험상 "UI 팀"은 사용자에게 보이는 UI뿐만 아니라, 계정 시스템과 클라우드 기반 데이터 저장소에 저장되는 모든 데이터를 추적하는 시스템을 담당하기도 하며, 그 데이터를 모으는 게임플레이 시스템의 후크까지 맡게됩니다.
* 휘발성
    - 게임에 적합한 형태를 찾기 위해 게임 개발 중에도 개선과 변경 작업을 하는 경우가 많습니다.
* 뉘앙스
    - 스타일링, 룩 앤 필, 레이아웃, 프레젠테이션이 다양한 실력과 게임 배경을 가진 사용자의 여러 의견과 결과물을 수렴하는 중 조정되거나 바뀌는 일이 많습니다.

따라서 다음과 같은 조건을 만족하는 강력한 아키텍쳐를 필요로 합니다.

* 비즈니스 로직과 UI의 형태를 구분할 것
* 레이아웃과 형태를 빠르게 반복처리할 수 있을 것
* 효과적인 비즈니스 로직 디버그가 가능할 것
* 퍼포먼스가 좋을 것

![클래스 아키텍처](https://cdn2.unrealengine.com/Unreal+Engine%2FEGK%2Fblog%2FUMG-Best-Practice-524x215-beeef46b7ddec65119c8f9a4b87988ed3d3ecadb.png)

**UMyData는 UObject를 상속하는 C++ 클래스입니다.**

목표는 UI가 사용자에게 전달하려는 것에 대한 모든 정보를 포함한 데이터 클래스를 생성하는 것입니다.
UObject로 공개(public)/비공개(private), 설정자(getter)/획득자(setter)를 통해 데이터 접근 방식을 조절할 수 있으며 유용한 API도 활용할 수 있습니다.

**이 방법은 UI와 데이터의 생명주기를 분리한 접근으로 아주 이상적인 형태입니다.** UI 오브젝트의 생존주기를 공유할 일이 거의없는 데이터들, 예를 들어 상점의 상품 제안, 인벤토리 아이템, 플레이어 스탯 등에 적절합니다. 게다가 같은 데이터 오브젝트를 여러 위젯이 함께 사용할 수도 있습니다. 이러한 클래스가 이미 존재할 수도 있는데, 다른 분야의 엔지니어들이 게임플레이나 스토어 백엔드 관련 작업을 하면서 만들었겠죠. 그러나 이런 때에도 UI에는 게임플레이 데이터와 UI에 필요한 데이터를 모두 포함하는 자체 데이터 클래스가 필요한 경우가 많습니다.

**UMyWidget은 UUserWidget을 상속하는 C++ 클래스입니다.**

**이런 C++ 클래스는 블루프린트에 사용할 위젯용 API를 정의하거나 기반 시스템과 정상적으로 상호작용하기위해 블루프린트가 반드시 따라야 하는 Blueprintable 이벤트를 정의하는 용도로 사용됩니다.**

**MyBlueprint는 UMyWidget을 상속하는 위젯 블루프린트입니다.**

위젯 블루프린트에서는 보이는 모든 UI를 생성하고 레이아웃과 스타일을 만들고, UMyData와 UMyWidget이 제공한 API를 활용해 모든 UI 프리미티브(텍스트 박스, 이미지 등)을 필요한 데이터로 채웁니다. UMyWidget이 제공하는 이벤트를 확인해 해당 UI를 언제 갱신해야 알 수 있습니다. 대화식이라면 버튼 클릭에 반응하여 UMyData 혹은 UMyWidget이 제공하은 API를 호출할 수 있습니다.

관심가는 내용을 정리하면,
1. 상품 제안용 데이터를 UObject로 만듭니다. UFUNCTION으로 받아오는 것 만을 목적으로 만들었습니다.
2. 상점 위젯을 만듭니다. 모든 상품 제안이 표시될 스크린의 인터페이스와 동작을 제공하는 역할을 하죠.
3. 블루프린트 클래스로 만들기를 바라는 클래스는 추상 클래스로 선언합니다.
4. UI를 완전히 새로 만들지 않고, 재활용 함으로써 퍼포먼스를 향상시킵니다.

</div></details>


<details><summary>UserWidget에서 PreConstruct랑 NativePreConstruct중 누가 먼저 호출되나?</summary>
<div markdown="1">

**PreConstruct는 NativePreConstruct에서 호출됩니다.**

PreConstruct는 BlueprintImplementableEvent로 선언됩니다. 게임과 에디터 모두에서 호출되며 위젯을 초기설정하여 더 나은 순수하게 꾸미는 목적의 미리보기 설정하는데 사용됩니다. 게임과 연관된 변수를 읽을려 하면, 튕길수 있다고 합니다.

```cpp
	/**
	 * Called by both the game and the editor.  Allows users to run initial setup for their widgets to better preview
	 * the setup in the designer and since generally that same setup code is required at runtime, it's called there
	 * as well.
	 *
	 * **WARNING**
	 * This is intended purely for cosmetic updates using locally owned data, you can not safely access any game related
	 * state, if you call something that doesn't expect to be run at editor time, you may crash the editor.
	 *
	 * In the event you save the asset with blueprint code that causes a crash on evaluation.  You can turn off
	 * PreConstruct evaluation in the Widget Designer settings in the Editor Preferences.
	 */
	UFUNCTION(BlueprintImplementableEvent, BlueprintCosmetic, Category="User Interface")
	void PreConstruct(bool IsDesignTime);
```

```cpp
	virtual void NativeOnInitialized();
	virtual void NativePreConstruct();
	virtual void NativeConstruct();
	virtual void NativeDestruct();
```

PreConstruct는 NativePreConstruct에서 호출됩니다.
```cpp
void UUserWidget::NativePreConstruct()
{
	PreConstruct(IsDesignTime());
}
```

위젯이 다시 만들어 질 때, 그리고 캐치 위젯일 때 NativePreConstruct가 호출됩니다.

</div></details>

## WidgetComponent

3D 공간에 표현된 UI는, 조금만 멀어져도 크기가 굉장히 작아집니다. 또는 화면에 보이도록 만들 수 있습니다.

* Backspace culling이 적용되어, 뒤에서 보면, 보이지 않습니다.
* Backspace culling을 막는다고 해도, 글자가 뒤집혀 보입니다.

## 어떻게 만들어야 하는가?

UMG로 만드는 것을 전제로 사용하기 쉽게 변수와 메서드를 생성합니다. 애셋은 UserWidget클래스는 블루프린트에서 상속받아 설정합니다. 

UI의 잘만들었다의 기준은, 사용자가 당연하게 느끼는 것이라고 합니다. 불편하다고 느끼면, 못만든것이 됩니다. 즉, 잘만들었다면 사용자가 자연스럽게 사용할 수 있어야 합니다.

* **UMG를 사용할 때 애니메이션은 유용하긴 해도 비용이 높아서 조심해서 사용해야 한다고 합니다.**
* `시선이 어디가있고, 마우스가 어디 있을 테고, 사람이 마지막에 본 곳이 어디인가?` 등을 생각한는 UI/UX 디자이너가 있습니다.

<details><summary>UMG로 디자이너와 프로그래머의 역활을 분리하기</summary>
<div markdown="1">

**UMG는 디자이너와 프로그래머의 역활을 분리하기 위해서 사용합니다.**

1. UMG에서 작업하는 것이, 이미지나 머티리얼등의 애셋과 연결할 때 편합니다. 위젯의 에셋 패스를 복사하여 코드에서 불러오는 것은 변경을 어렵게 합니다. 블루프린트에서 작업했을 경우, 애셋의 위치를 상대적으로 자유롭게 바꿀 수 있습니다.
    - 위치를 옮길 수 있다고 하더라도 만들때 전제는 바꾸지 않는다로 해야 합니다.
2. 아이템 리스트를 열때 순차적으로 오파시티가 1에 가까워 지고, 커지는 아이템을 보여주고 싶을 수도 있습니다. 또는 클릭하면, 천천히 사라지는 아이템을 보여주고 싶을 수 있습니다.
3. 아이템을 사용하면, 효과는 즉각적으로 나타나고, 실제 화면 효과는 지연되서 나타나게 하고 싶을 수 있습니다.
    - 다음의 코드에서 UseItem을 호출하고(사용할 수 있다면 아이템은 즉각적으로 인벤토리에서 사라집니다.) 그 다음 블루프린트 코드에서 천천히 사라지고, 부모 클래스에서 사라지는 로직을 작성합니다.

```cpp
UCLASS()
class HORRORSYSTEM_API UWidget_ItemWidget : public UUserWidget
{
    ...

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Meta = (ExposeOnSpawn = true))
	FIntPoint Index;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Meta = (ExposeOnSpawn = true))
	int32 Stack;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Meta = (ExposeOnSpawn = true))
	float SquareSize = 90.f;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Meta = (ExposeOnSpawn = true, AllowedClasses = "HorrorItemInterface"))
	UObject* ItemInterface;

	UPROPERTY(BlueprintReadWrite, Meta = (BindWidget))
	UImage* Icon;

    ...

    UFUNCTION(BlueprintCallable)
    bool UseItem();
};
```

3번 경우에 대해서 다음과 같은 흐름을 생각할 수 있습니다.
<center><div class="mermaid"> 
graph LR
Start(아이템을 클릭함)
Start --> UseItem

UseItem{아이템을 사용}
UseItem -- 성공 --> UseOfItemsAnimation
UseItem -- 실패 --> FailedToUseItemAnimation

UseOfItemsAnimation[아이템 사용하는 애니메이션 재생]
UseOfItemsAnimation --> DetachFromParent

FailedToUseItemAnimation[아이템 사용실패하는 애니메이션 재생]

DetachFromParent(부모로 부터 분리함)
</div></center>

여기서 추가적으로, UMG 모범사례에 따라, 데이터를 생명주기에 따라 분리할 수 있습니다.

* UI가 사용자에게 전달하려는 것에 대한 모든 정보를 포함한 데이터 클래스를 생성하는 것입니다.

```cpp
UCLASS()
class HORRORSYSTEM_API UWidget_ItemWidget : public UUserWidget
{
    ...

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Meta = (ExposeOnSpawn = true))
    UItemData* Data;

    ...

    UFUNCTION(BlueprintCallable)
    bool UseItem();
};
```

</div></details>

<details><summary>HUD로 디버그</summary>
<div markdown="1">

[Why have a HUD class?](https://forums.unrealengine.com/t/why-have-a-hud-class/55660/4) 

여기서 HUD는 오래되긴 했지만, 여전히 디버그를 목적으로 사용하는데는 유효하다고 합니다.


HUD 클래스는 화면에 인터페이스를 표시하기 위해 DrawText, DrawLine DrawTexture, DrawRect 등 다양한 함수를 포함하고 있고 이용자의 마우스에 반응하는 HitBox도 추가할 수 있습니다.

* UI 예산이 마치 0이나 다름없는 곳에서 HUD와 같이 퍼포먼스가 중요한 곳에 사용될 수 있다고 합니다.
* UKismetSystemLibrary::DrawDebug...도 선택사항할 수 있습니다.

AHUD를 만들고, 텍스트를 출력하도록 만들 수 있습니다.

```cpp
#include "GameFramework/HUD.h"
...

UCLASS()
class MOONSHINEWORKS_API AMyHUD : public AHUD
{
```

```cpp
		DrawText(DisplayString->Text, Position, Font, DisplayString->Scale, DisplayString->Color);
```

</div></details>

[인벤 UMG 제작(에픽게임즈 코리아 최용훈 TA)](https://www.inven.co.kr/webzine/news/?news=199871&site=sky)
, [UMG 모범 사례](https://www.unrealengine.com/ko/tech-blog/umg-best-practices)

<details><summary>로딩화면 제작</summary>
<div markdown="1">

로딩 화면은 큰 이미지가 화면을 전부 덮는 만큼, Fill Screen으로 만들고 앵커 기능으로 버튼을 역동적으로 움직이게 만들 수 있습니다. 여기에 로딩 바를 넣는 식으로 좀 더 화려하게 꾸미는 것도 가능합니다. 이런 로딩 화면 역시 만든 후 에 이벤트 그래프로 시작 버튼을 누르면 로딩 화면을 불러오도록 이벤트 처리를 해야 합니다

</div></details>

<details><summary>메인 UI 제작</summary>
<div markdown="1">

메인 UI의 경우 UMG에서 캔버스 패널과 버티칼 박스, 호라이즌탈 박스를 통해 만들 수 있습니다. 캔버스 패널은 글자 그대로 UI를 배치하는 캔버스 역활을 하며, 버티칼 박스와 호라이즌탈 박스는 가로, 세로로 UI를 정렬해 줍니다.

</div></details>


<details><summary>체력바</summary>
<div markdown="1">

HP는 프로그래스바를 통해 구현할 수 있으며, 이벤트 그래프로 캐럭타가 가진 체력 정보를 변환해서 이미지로 가져오도록 세팅할 수 있습니다 또한, 먹으면 점수가 올라가는 코인은 텍스트 블록으로 만들었는데 HP와 유사한 형태로, 코인을 흭득하면 값이 올라가도록 세팅하면 됩니다.

프로그래스바로는 단순히 체력만 만들 수 있는 게 아니라, 사격 버튼을 누르면 이미지가 바뀌는 걸 볼 수 있는데 이것 역시 프로그래스바를 이용해 만들었습니다.

또한, 데모처럼 시간제한이 있는 게임의 경우 시간을 표시해야 합니다. UMG에서는 타임 인디케이터를 이용해 시간이 줄어들도록 만들 수 있습니다.

</div></details>

<details><summary>입력버튼 제작</summary>
<div markdown="1">

버튼 UI의 디테일 부분을 보면 노멀, 호버드, 프레스 옵션을 확인할 수 있습니다. 노멀은 그냥 놔뒀을 때, 호버드는 마우스 커서가 지나갈 때, 프레스는 눌렀을 때 동작하는 이벤트들입니다. 이 3개의 기능을 잘 사용하면 UI를 활성화하던가 사격 버튼을 눌렀을 때 애니메이션이 동작하도록 만들 수 있습니다. 

* 여기에 원클릭에서 이벤트를 처리하는지 더블클릭에서 하는지 등 기능을 추가할 수도 있습니다.

</div></details>

<details><summary>인벤토리 제작</summary>
<div markdown="1">

인벤토리는 4개의 위젯으로 구성됩니다. 또한 많은 정보가 들어가는데 이 모든 정보는 캐릭터가 갖고 있습니다. 간단히 말해서 인벤토리의 이미지들은 캐릭터가 가진 정보를 받아다가 화면에 뿌린 것입니다.

인벤토리를 만ㄷ르 때 우선 3D 캐릭터 위젯이 있어야 합니다. 그 외 정보는 메인 UI에서 HP와 코인 등을 가져오면 됩니다. 그 다음에 아이템 슬롯 위젯을 만들면 기본적인 위젯은 거의 다 만든 셈입니다. 이제부터가 중요한 데 바로 구조체를 생성하는 부분입니다. 구조체는 아이템을 줍고 버리는 것 등을 관리하는 역활로 데이터 테이블을 만들어서 아이템을 관리할 수 있습니다.

그런 다음에 마이 캐릭터에 아이템맵 변수를 추가해 캐릭터가 떨어진 아이템을 먹었을 때 아이템의 이미지를 인벤토리에 나오게 합니다.

인벤토리는 유니폼 그리드 패널 안에 아이템 슬롯 위젯을 추가해 만들 수 있습니다. 이를 통해 자연스럽게 바둑판 형태의 패널을 만들 수 있는데 이 슬롯들 안에 구조체를 이용해 값을 뿌려주면 됩니다.

</div></details>

<details><summary>3D 모델과 파티클 렌더링</summary>
<div markdown="1">

파티클의 경우 블루프린트를 하나 만들고 커스텀 이벤트로 이벤트를 호출했을 때 파티클이 나오도록 했습니다. 여기에 파티클 이펙트 위젯을 하나 더 만드는데 이렇게 만든 위젯을 아이템 슬롯 위에 배치해 파티클이 터지도록 세팅합니다. 그러고 나서 중요한 게 방금 만든 블루프린트를 맵에 눈에 안 띄는 곳에 배치하면 됩니다.

이미지를 별도로 또 만들고 맵에서 눈에 안 띄는 부분에 배치하는 이유로는 잘못하면 스켈레탈 메시, 파티클 이펙트 전체가 캡쳐되서 캐릭터 외에 다른 이미지들도 나올 수 있기 때문입니다. 이 부분으 쇼 온리 컴포넌트로 해결할 수 있습니다.

힘든 방법으로는 UWorld를 하나 만들어서 직접 바인딩 하는 방법이 있습니다.

</div></details>

<details><summary>머티리얼 이펙트 처리</summary>
<div markdown="1">

머티리얼을 통해 버튼을 눌렀을 때 애니메이션처럼 보이게 할 수 있습니다. 애니메이션과 틴트 옵션을 이용한 것으로 틴트로는 색상을 조절할 수 있습니다.

</div></details>

<details><summary>UI 애니메이션 제작</summary>
<div markdown="1">

애니메이션은 트랜스폼 트랙을 추가해 움직이는 위젯으로 만들었습니다. 물론, 이동 애니메이션만 가능한 건 아닙니다. 프로그래스바, 애니메이션 등을 이용한다면 다양한 움직임의 UI 애니메이션을 구현할 수 있습니다.

</div></details>

<details><summary>세팅 UI제작</summary>
<div markdown="1">

옵션 UI라 할 수 있는데 체크박스, 텍스트, 슬라이드로 만들 수 있습니다. 사운드 음소거를 하거나 사운드 크기를 조절할 수 있습니다. 이러한 기능들은 앞서 설명한 것처럼 이벤트 그래프를 통해 이벤트를 호출해야 합니다.

</div></details>

<details><summary>게시판, 웹 브라우저 제작</summary>
<div markdown="1">

게시판은 심플하게 만들어졌습니다. 스크롤 박스로 만들었는데 텍스트 크기가 박스 크기 이상으로 늘어나면 스크롤링 할 수 있습니다. 웹 브라우저는 게시판 연동 등에 사용되는데 플러그인을 추가해야 합니다. 플러그인 항목을 보면 웹 브라우저 기능을 켜고 끌 수 있습니다.

해당 기능을 키면 UMG에서 실험적 기능(Experimental)에 웹 브라우저 위젯을 볼 수 있습니다. 이걸 뷰에 배치하면 끝입니다. 그리고 디테일 항목에 있는 URL 옵션에 원하는 주소를 넣으면 웹 페이지가 연동됩니다.

</div></details>

## 최적화
이렇게 기본적인 기능들을 만들었으면 남은 것은 최적화 입니다. UI최적화도 다른 최적화와 크게 다르지 않습니다. 배칭 무효화 패널(Invalidation Panel), 아틀라스 텍스처를 통해 이미지를 캐싱하거나 이미지를 합하는 식으로 최적화할 수 있습니다.

배칭은 드로우 콜을 줄이는 기능으로 더 적은 CPU를 사용합니다. 당연히 발열은 물론이고 배터리 사용량도 줄어듭니다. 우선 같은 텍스처나 머티리얼을 합치고 명확하지 않는 조건일 경우 레이어 ID를 씁니다. 단, 캔버스 패널 자손들의 경우 레이어 ID가 전부 달라져서 이 부분은 Explicit Canvas Child ZOrder옵션을 켜고 끔으로써 설정할 수 있습니다.

다음으로 무효화 패널 기능입니다. UI중 HP나 점수, 시간처럼 바뀌는 게 아닌 고정된 UI의 경우 무효화 박스로 둘러싸서 자손 위젯 지오매트리를 캐시에 담아 중복 계산을 최소화 할 수 있습니다. 물론 아예 게산을 안 하는 것은 아니라 중간에 캐싱을 하는데 변경되지 않았다면 그대로 업데이트를 스킵합니다. 만약 바뀐다면 통보를 받고 캐시를 다시 생성하도록 합니다.

보통 이미지 UI는 바뀌지 않지만 스크롤링할 경우 위칫값이 바뀌기에 움직이는 위젯에 사용하면 좋습니다.

아틀라스는 하나 또는 그 이상의 텍스처 페이지들을 하나로 통합하는 것 입니다. 스프라이트 아틀라스 그룹에서 확인할 수 있으며, 하나로 통합했기에 효과적으로 관리, 사용할 수 있습니다.