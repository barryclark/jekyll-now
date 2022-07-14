---
layout: post
title: Interface
---

# 인터페이스

인터페이스란 추상적인 개념으로 서로 관계없는 것들에 대한 시스템이나 장치를 작동시키기 위한 규제 또는 규약입니다. 쉽게 예를 들어 리모콘은 사람과 TV의 인터페이스이며, 언어는 사람과 사람사이의 인터페이스입니다.

* SOLID의 ISP(인터페이스 분리 원칙)
    - 인터페이스 모든 항목에 대해 구현을 강제하지 않아야 한다. 필요한 인터페이스만 구현할 수 있도록 설계하는 것을 말한다.
    - **즉 반드시 필요한 인터페이스만 구현할 수 있도록, 목적 단위로 인터페이스를 분리하여 구현하는 것을 인터페이스 분리 원칙이라 합니다.**

인터페이스가 없다면 유사성이 없었을 크고 복잡한 클래스들에게 어떤 게임 함수나 기능을 공유시키고자 하는 경우에 많이 쓰입니다. 

언리얼의 예로 트리거 볼륨에 들어가면 함정, 경보, 점수 등의 다양한 로직을 구현할 수 있습니다. 그런데 모두 트리고 볼륨에 들어갈 것이라는 인터페이스를 갖고 구현한다면, 함수를 부르기도, 구현을 나누기도 편해집니다.

* 의존성과 다운캐스팅을 줄이기 위한 방법으로 인터페이스를 줄일 수 있습니다.

[인터페이스 분리 원칙](https://medium.com/newworld-kim/%EB%AA%A8%EB%8D%98-c-%EB%94%94%EC%9E%90%EC%9D%B8-%ED%8C%A8%ED%84%B4-%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4-%EB%B6%84%EB%A6%AC-%EC%9B%90%EC%B9%99-interface-segregation-principle-isp-b445309e9510)

추가적으로 인터페이스와 상호작용의 의미 차이는 다음과 같습니다.

## 인터페이스(Interface)
인간과 사물의 중재자 역활을 합니다. 제품의 보이지 않는 기능을 시각적으로 보여줍니다. 문 손잡이는 인터페이스에 해당됩니다.

## 상호작용(Interaction, 인터랙션)
인터페이스와 사용자 사이에 일어나는 어떤 행위나 상호작용의 과정을 의미합니다.
사람이 문을 열고 들어가는 행위는 인터랙션애 햐덩헙나더,


[인터랙션과 인터페이스](https://ceodanbi.tistory.com/127) 보고 참고해서 내용을 추가하도록 하자.

# 인터페이스 활용
## 인터페이스 분리 원칙
SOLID의 인터페이스 분리 원칙을 보면 클라이언트가 자신이 이용하지 않는 메서드에 의존하지 않아야 한다는 원칙입니다. **인터페이스 분리 원칙은 큰 덩이리의 인터페이스들을 구체적이고 작은 단위로 분리시킴으로써 클라이언트들이 꼭 필요한 메서드들만 이용할 수 있게 합니다.** 이와 같은 작은 단위들을 역활 인터페이스라고도 부릅니다.

**인터페이스 분리 원칙을 통해 시스템의 내부 의존성을 약화 시켜 리팩토링, 수정, 재배포를 쉽게 할 수 있습니다.** 인터페이스 분리 원칙은 SOLILD 5원칙의 하나이며, GRASP의 밀착 원칙과 비슷합니다.

* 객체 지향 설계 내에서 인터페이스는 코드를 단순화하고 종속성에 대한 결합을 방지하는 장벽을 만드는 추상화 계층을 제공합니다.
    - 시스템이 여러 수준에서 너무 결합되어(coupled) 많은 추가 변경 없이 한 곳에서 변경하는 것이 더 이상 불가능할 수 있습니다. 인터페이스(interface)나 추상 클래스(abstract class)를 사용하면 이러한 부작용을 막을 수 있습니다.

[Interface segregation principle](https://en.wikipedia.org/wiki/Interface_segregation_principle)

아직 이해 못한것.
[인터페이스를 분리하여 테스트하기 좋은 메서드로 만들기](https://tecoble.techcourse.co.kr/post/2020-05-17-appropriate_method_for_test_by_interface/)
뭣하러 오버헤드를 만들어서 테스트하기 쉽게 만든다는 건지 이해하기 힘든데.... 심히 이상한 코드로 보이는데... 아직 이해 못하겠다. 그냥 예제구나.

# 언리얼에서의 블루프린트
언리얼 엔진에서는 잠재적으로 무관한 클래스 세트가 공통의 함수 세트를 구현할 수 있도록 하는 경우에 사용됩니다. 

예를 들어 다른 부모 클래스가 다르지만 동일한 곳에서 작동해야 할 경우 인터페이스를 상속받아 사용할 수 있습니다.


블루프린터의 "인터페이스"라는 클래스는 함수 정의만 할 수 있고 구현은 할 수 없는 껍데기 클래스이다. 이를 처음 접하면, c++의 pure virtual function만 모아 둔 클래스와 비슷하다고 생각할 수 있다. 즉, c++에서 다중 상속을 이용한 인터페이스 구현처럼 보이기는 하지만, 성격이 좀 다르다.

일단, 언리얼 엔진에서 인터페이스용 클래스는 c++과 달리 부모로서 추가되는 게 아니다. 블루 프린트 클래스에서 부모 클래스는 단 하나만 존재할 수 있다. 인터페이스를 추가하고자 할 때는, 클래스 속성에서 Interfaces 카테고리에서 Add를 해서 추가해야 한다.

인터페이스 함수를 호출하기 위해서는 캐스팅이 필요없다. 예를 들어, BP_Parent라는 부모 클래스가 있고, 이를 상속 받은 BP_Child 클래스가 있다. BP_Child 클래스는 BP_Interface라는 인터페이스를 추가했고, 함수부분을 구현했다.

인터페이스에서 정의된 함수를 호출하려고 보면, BP_Child 클래스 뿐 아니라 BP_Parent 클래스에 대해서도 함수 호출이 가능하다. 인터페이스 함수의 인자를 자세히 보면, 특정 클래스가 아니라 Object Refernece를 받는다. 즉, 아무 클래스에 대해서 호출이 가능하다. 그런데, 해당 인터페이스를 상속 받지 않은 클래스에서 어떻게 함수 호출이 가능할까? c++에서는 컴파일 에러가 날 상황인데, 언리얼에서는 어떻게 가능한가?

알고 보니, 인터페이스 함수 내부에서의 처리는 c++의 상속 개념이라기 보다는 메시지 함수와 비슷하다고 한다. 그래서, 어떤 클래스에 대해서도 호출이 가능하다. 해당 클래스에 인터페이스 함수가 구현되어 있으면 처리를 하지만, 구현되어 있지 않으면 조용히 실패를 한다고 한다. 즉, c++ 처럼 컴파일 에러가 발생하지 않기 때문에 주의가 필요하다.

UInterface 클래스는 실제 인터페이스가 아닙니다. 언리얼 엔진의 리플랙션 시스템에 보이도록 하기 위해서만 존재하는 비어있는 클래스입니다. 다른 클래스에서 상속하게되는 실제 클래스는 IInterface입니다.

## 언리얼에서 인터페이스 선언

UCLASS 매크로가 아닌 UINTERFACE매크로를 사용합니다. UObject를 직접 상속하는 대신 UInterface를 상속합니다.

```cpp
UINTERFACE(Blueprintable)
class UReactToTriggerInterface : public UInterface
{
    GENERATED_BODY()
};

class IReactToTriggerInterface
{    
    GENERATED_BODY()

public:
    /* 이 오브젝트를 활성화시키는 트리거 볼륨에 반응합니다. 반응에 성공하면 true 를 반환합니다. */
    UFUNCTION(BlueprintCallable, BlueprintImplementableEvent, Category="Trigger Reaction")
    bool ReactToTrigger() const;
};
```

* 추가적으로 특정 클래스에 특정 인터페이스가 구현되어있는지 여부는 ImplementsInterface함수를 쓸 수 있습니다.
* BlueprintPure는 인터페이스에서 허용되지 않습니다.
* Interface의 메서드 이름이 중복될 경우 UFUNCTION(...) 매개변수를 사용하여 인터페이스의 UFunction을 선언해야 하니다.
    - 아니라면 접두사를 이용하여 UBT의 혼동을 줄일 수 있습니다.

## 인터페이스를 ExposeOnSpawn
4.27 2022 07 10을 기준으로 말하면 


TScriptInterface를 매개변수로 넘길려면, const TScriptInterface<...>&로 해줘야 한다. 왜 오류로 안알려 주지? 내가 못 찾은건가? 

UKismetSystemLibrary::SetInterfacePropertyByName을 보면 인터페이스가 당연히 유효할 거라는 전제하에 넘겨준다...

```cpp
void UKismetSystemLibrary::SetInterfacePropertyByName(UObject* Object, FName PropertyName, const FScriptInterface& Value)
{
	if (Object)
	{
		FInterfaceProperty* InterfaceProp = FindFProperty<FInterfaceProperty>(Object->GetClass(), PropertyName);
		if (InterfaceProp != NULL && Value.GetObject()->GetClass()->ImplementsInterface(InterfaceProp->InterfaceClass)) // check it's the right type
		{
			InterfaceProp->SetPropertyValue_InContainer(Object, Value);
		}
	}
}
```
```cpp
Value.GetObject()->GetClass()->ImplementsInterface(InterfaceProp->InterfaceClass)
```
오브젝트가 없는 인터페이스를 인자로 넘기지 않는다는 전제하에 만들어짐.


인터페이스 함수 만들 때, 최대한 안겹치게 만들도록 하자.

충격적이게도 카테고리는 Collision임????

[How to get an interface pointer variable to work w/UPROPERTY()](https://forums.unrealengine.com/t/how-to-get-an-interface-pointer-variable-to-work-w-uproperty/383017)
[How do I use a widget OnClicked event as an event trigger in another blueprint?](https://forums.unrealengine.com/t/how-do-i-use-a-widget-onclicked-event-as-an-event-trigger-in-another-blueprint/373040)
[How do i receive click events for widgets and actors at the same time?](https://forums.unrealengine.com/t/how-do-i-receive-click-events-for-widgets-and-actors-at-the-same-time/261050)

[UE4에서의 Interface](https://bbagwang.com/uncategorized/ue4-%EC%97%90%EC%84%9C%EC%9D%98-interface/)
[Interface methods with same name as class methods](https://forums.unrealengine.com/t/interface-methods-with-same-name-as-class-methods/104316)