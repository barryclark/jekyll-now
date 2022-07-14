---
layout: post
title: HUD and UI
---

2022 07 10   

* UMG란 언리얼 모션 그래픽?

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

## 참고

* WidgetTree는 Blueprint widget 컬렉션을 관리합니다.

**? 위젯도 효율적인 관리를 위해서 패턴이 있을거라고 생각함. 다만 어떻게 찾아야 할지 모르겠음.**

1. A to B
2. OpenClose

더읽을 것들 
: [UE4 UMG UUserWidget: NativePreConstruct와 BlueprintPreConstruct중 어느 것이 먼저 실행되나요?](https://allarsblog.com/2020/01/29/ue4-umg-uuserwidget-which-fires-first-native_preconstruct-or-blueprint-preconstruct/)
, [Unreal C++ - 위젯(Widget)](https://hombody.tistory.com/316)

# UMG 제작

프로그래머에게 UI를 만드는 건 꽤나 어려운 일입니다. 기능적인 부분이 아닌, 아트적인 요소가 들어가기 때문입니다. 어떤 버튼을 쓸 지부터 어떻게 배치해야 좋을지 고민의 연속입니다.

언리얼 모션 그래픽 UI 디자이너를 뜻하는 UMG는 게임 내 HUD, 메뉴, 기타 인터페이스 관련 그래픽 요소로 사용자에게 보여주고픈 것들을 만드는 데 사용할 수 있는 비주얼 UI 제작 툴입니다.

UMG는 3D 위젯은 물론이고 애니메이션 트랙을 제공하고 있습니다. 버튼을 누르면 변하는 식으로 UI의 애니메이션을 만들 수 도 있습니다. UMG는 크게 UI를 배치하는 디자이너와 이벤트 트리거 등을 처리하는 그래프 2가지로 나뉩니다.

디자이너는 팔레트부터 UI의 구조를 확인할 수 있는 계층구조, 메인 이미지 띄우는 작업 뷰, UI나 텍스쳐의 정보를 볼 수 있는 디테일, 애니메이션 효과를 작업하는 애니메이션 타임 라인 등으로 구분돼 있습니다. 그래프는 이벤트 그래프와 디버깅을 할 수 있는 컴파일러 결과 등이 있습니다.

본격적으로 UMG를 제작하려면 우선 컨텐츠 브라우저 -> 유저 인터페이스 -> 위젯 블루프린트를 만들어야 합니다. 이렇게 만든 위젯은 크기를 조절할 수 있는데 아이템 슬롯이나 인벤토리의 경우 풀 사이즈로 만들 필요가 없으니 사이즈를 조절하는 것이 좋습니다.

각 이미지들은 팔레트에서 작업 뷰로 드래그하는 식으로 만들 수 있습니다. 그리고 만들어진 UI는 이벤트 그래프에서 블루프린트로 작업할 수 있습니다. 이렇게 만들었다고 끝이 아닙니다. 지금까지 만든 건 그냥 게임 외적으로 만든 것일 뿐, 아직 게임에는 포함되지 않았습니다. 이 UI를 화면에 출력하기 위해선 게임모드라고 해서 게임의 전반적인 걸 관리하는 블루프린트를 생성하고 이벤트 그래프로 시작하면 UI를 화면에 그리라는 이벤트를 호출하면 됩니다.

## 로딩화면 제작
로딩 화면은 큰 이미지가 화면을 전부 덮는 만큼, Fill Screen으로 만들고 앵커 기능으로 버튼을 역동적으로 움직이게 만들 수 있습니다. 여기에 로딩 바를 넣는 식으로 좀 더 화려하게 꾸미는 것도 가능합니다. 이런 로딩 화면 역시 만든 후 에 이벤트 그래프로 시작 버튼을 누르면 로딩 화면을 불러오도록 이벤트 처리를 해야 합니다

## 메인 UI 제작
메인 UI의 경우 UMG에서 캔버스 패널과 버티칼 박스, 호라이즌탈 박스를 통해 만들 수 있습니다. 캔버스 패널은 글자 그대로 UI를 배치하는 캔버스 역활을 하며, 버티칼 박스와 호라이즌탈 박스는 가로, 세로로 UI를 정렬해 줍니다.

HP는 프로그래스바를 통해 구현할 수 있으며, 이벤트 그래프로 캐럭타가 가진 체력 정보를 변환해서 이미지로 가져오도록 세팅할 수 있습니다 또한, 먹으면 점수가 올라가는 코인은 텍스트 블록으로 만들었는데 HP와 유사한 형태로, 코인을 흭득하면 값이 올라가도록 세팅하면 됩니다.

프로그래스바로는 단순히 체력만 만들 수 있는 게 아니라, 사격 버튼을 누르면 이미지가 바뀌는 걸 볼 수 있는데 이것 역시 프로그래스바를 이용해 만들었습니다.

또한, 데모처럼 시간제한이 있는 게임의 경우 시간을 표시해야 합니다. UMG에서는 타임 인디케이터를 이용해 시간이 줄어들도록 만들 수 있습니다.

## 입력버튼 제작

버튼 UI의 디테일 부분을 보면 노멀, 호버드, 프레스 옵션을 확인할 수 있습니다. 노멀은 그냥 놔뒀을 때, 호버드는 마우스 커서가 지나갈 때, 프레스는 눌렀을 때 동작하는 이벤트들입니다. 이 3개의 기능을 잘 사용하면 UI를 활성화하던가 사격 버튼을 눌렀을 때 애니메이션이 동작하도록 만들 수 있습니다. 여기에 원클릭에서 이벤트를 처리하는지 더블클릭에서 하는지 등 기능을 추가할 수도 있습니다.

## 인벤토리 제작

인벤토리는 4개의 위젯으로 구성됩니다. 또한 많은 정보가 들어가는데 이 모든 정보는 캐릭터가 갖고 있습니다. 간단히 말해서 인벤토리의 이미지들은 캐릭터가 가진 정보를 받아다가 화면에 뿌린 것입니다.

인벤토리를 만ㄷ르 때 우선 3D 캐릭터 위젯이 있어야 합니다. 그 외 정보는 메인 UI에서 HP와 코인 등을 가져오면 됩니다. 그 다음에 아이템 슬롯 위젯을 만들면 기본적인 위젯은 거의 다 만든 셈입니다. 이제부터가 중요한 데 바로 구조체를 생성하는 부분입니다. 구조체는 아이템을 줍고 버리는 것 등을 관리하는 역활로 데이터 테이블을 만들어서 아이템을 관리할 수 있습니다.

그런 다음에 마이 캐릭터에 아이템맵 변수를 추가해 캐릭터가 떨어진 아이템을 먹었을 때 아이템의 이미지를 인벤토리에 나오게 합니다.

인벤토리는 유니폼 그리드 패널 안에 아이템 슬롯 위젯을 추가해 만들 수 있습니다. 이를 통해 자연스럽게 바둑판 형태의 패널을 만들 수 있는데 이 슬롯들 안에 구조체를 이용해 값을 뿌려주면 됩니다.

## 3D 모델과 파티클 렌더링
파티클의 경우 블루프린트를 하나 만들고 커스텀 이벤트로 이벤트를 호출했을 때 파티클이 나오도록 했습니다. 여기에 파티클 이펙트 위젯을 하나 더 만드는데 이렇게 만든 위젯을 아이템 슬롯 위에 배치해 파티클이 터지도록 세팅합니다. 그러고 나서 중요한 게 방금 만든 블루프린트를 맵에 눈에 안 띄는 곳에 배치하면 됩니다.

이미지를 별도로 또 만들고 맵에서 눈에 안 띄는 부분에 배치하는 이유로는 잘못하면 스켈레탈 메시, 파티클 이펙트 전체가 캡쳐되서 캐릭터 외에 다른 이미지들도 나올 수 있기 때문입니다. 이 부분으 쇼 온리 컴포넌트로 해결할 수 있습니다.

힘든 방법으로는 UWorld를 하나 만들어서 직접 바인딩 하는 방법이 있습니다.

## 머티리얼 이펙트 처리
머티리얼을 통해 버튼을 눌렀을 때 애니메이션처럼 보이게 할 수 있습니다. 애니메이션과 틴트 옵션을 이용한 것으로 틴트로는 색상을 조절할 수 있습니다.

## UI 애니메이션 제작
애니메이션은 트랜스폼 트랙을 추가해 움직이는 위젯으로 만들었습니다. 물론, 이동 애니메이션만 가능한 건 아닙니다. 프로그래스바, 애니메이션 등을 이용한다면 다양한 움직임의 UI 애니메이션을 구현할 수 있습니다.

## 세팅 UI 제작
옵션 UI라 할 수 있는데 체크박스, 텍스트, 슬라이드로 만들 수 있습니다. 사운드 음소거를 하거나 사운드 크기를 조절할 수 있습니다. 이러한 기능들은 앞서 설명한 것처럼 이벤트 그래프를 통해 이벤트를 호출해야 합니다.

## 게시판, 웹 브라우저 제작
게시판은 심플하게 만들어졌습니다. 스크롤 박스로 만들었는데 텍스트 크기가 박스 크기 이상으로 늘어나면 스크롤링 할 수 있습니다. 웹 브라우저는 게시판 연동 등에 사용되는데 플러그인을 추가해야 합니다. 플러그인 항목을 보면 웹 브라우저 기능을 켜고 끌 수 있습니다.

해당 기능을 키면 UMG에서 실험적 기능(Experimental)에 웹 브라우저 위젯을 볼 수 있습니다. 이걸 뷰에 배치하면 끝입니다. 그리고 디테일 항목에 있는 URL 옵션에 원하는 주소를 넣으면 웹 페이지가 연동됩니다.

## 최적화
이렇게 기본적인 기능들을 만들었으면 남은 것은 최적화 입니다. UI최적화도 다른 최적화와 크게 다르지 않습니다. 배칭 무효화 패널(Invalidation Panel), 아틀라스 텍스처를 통해 이미지를 캐싱하거나 이미지를 합하는 식으로 최적화할 수 있습니다.

배칭은 드로우 콜을 줄이는 기능으로 더 적은 CPU를 사용합니다. 당연히 발열은 물론이고 배터리 사용량도 줄어듭니다. 우선 같은 텍스처나 머티리얼을 합치고 명확하지 않는 조건일 경우 레이어 ID를 씁니다. 단, 캔버스 패널 자손들의 경우 레이어 ID가 전부 달라져서 이 부분은 Explicit Canvas Child ZOrder옵션을 켜고 끔으로써 설정할 수 있습니다.

다음으로 무효화 패널 기능입니다. UI중 HP나 점수, 시간처럼 바뀌는 게 아닌 고정된 UI의 경우 무효화 박스로 둘러싸서 자손 위젯 지오매트리를 캐시에 담아 중복 계산을 최소화 할 수 있습니다. 물론 아예 게산을 안 하는 것은 아니라 중간에 캐싱을 하는데 변경되지 않았다면 그대로 업데이트를 스킵합니다. 만약 바뀐다면 통보를 받고 캐시를 다시 생성하도록 합니다.

보통 이미지 UI는 바뀌지 않지만 스크롤링할 경우 위칫값이 바뀌기에 움직이는 위젯에 사용하면 좋습니다.

아틀라스는 하나 또는 그 이상의 텍스처 페이지들을 하나로 통합하는 것 입니다. 스프라이트 아틀라스 그룹에서 확인할 수 있으며, 하나로 통합했기에 효과적으로 관리, 사용할 수 있습니다.

[인벤 UMG 제작, 에픽게임즈 코리아 최용훈 TA](https://www.inven.co.kr/webzine/news/?news=199871&site=sky)

# UUserWidget과 CPP

## 위젯 클래스 생성하기

예시로 UUserWidget을 상속받는 클래스 생성이며, [UUserWidget은 UMG모듈을 필요로 합니다.](https://docs.unrealengine.com/4.27/en-US/API/Runtime/UMG/Blueprint/UUserWidget/)

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

## 함수 호출 순서

**PreConstruct**
PreConstruct메서드는 BeginPlay처럼 호출됩니다.

* 액터가 게임에서 시작할 때 Tick 앞에서 호출됨을 의미합니다.

**NativePreConstrct**
NativePreConstruct는 PreConstruct앞에서 호출됩니다.

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
    virtual void NativePreConstruct() override
    {
        Super::NativePreConstruct();

        UBlueprintGeneratedClass* BlueprintGeneratedClass = LoadObject<UBlueprintGeneratedClass>(nullptr, "Asset path")
    }
```

## Widget을 C++에 Bind하기

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

# C++로 만들기
변수와 메서드는 c++에서 선언 후 할당하거나 정리합니다. 이미지나 머티리얼등의 애셋과 연결할 때나 보면서 만들 수 있어서 편하기 때문입니다.

```cpp
UCLASS()
class HORRORSYSTEM_API UWidget_ItemWidget : public UUserWidget
{
	GENERATED_BODY()
	
public:
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Meta = (ExposeOnSpawn = true))
	TScriptInterface<IHorrorInventoryInterface> Inventory;

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


	…
};
```