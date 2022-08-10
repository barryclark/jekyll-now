---
layout: post
title: interface
---

- [ ] TScriptInterface를 보다 정확하게 알 필요가 있음.
- [ ] BrokenActorRefferen

TScriptInterface는 EditAnywhere로 해도 변수로 설정되지 않는다. 대신 UObject의 Meta = (AllowedClasses = "")로 설정할 수 있다.

TScriptInterface는 인터페이스의 주소가 반드시 있음을 보장하지 않는다. 변수를 담고자 한다면, 감싸서 사용하도록 하자. 심지어,, 오브젝트도 캐스팅 가능한지 의미하지 않는다. 인터페이스에 담을때는 반드시, 클래스가 삽입 되어 있는지 확인하자.

* 네이티브 코드가 아닌 블루프린트 코드의 경우, TScriptInterface가 유효하지 않습니다.

- [ ] [Clean Architecture : Part 2 — The Clean Architecture](https://justwrite99.medium.com/clean-architecture-part-2-the-clean-architecture-3e2666cdce83)
- [ ] [인터페이스를 분리하여 테스트하기 좋은 메서드로 만들기](https://tecoble.techcourse.co.kr/post/2020-05-17-appropriate_method_for_test_by_interface/)에서, 테스트를 위해 움직이게 하는 함수에서 실제 움직이게 하는 양을 NumberGenerator의 실체화인 RandomNumberGenerator라는 객체(전략)로 랜덤 넘버를 만드는 코드를 만드는 전략을 추가하여, 코드의 응집도를 높인다고 설명하지만, 이게 왜 인터페이스를 분리하여 테스트하기 좋은 메서드로 만들었는지? 그리고 이게 정상적인 방법인지 모르겠습니다. 더 찾아봐야 합니다. 
- [ ] [역활 책임](https://incheol-jung.gitbook.io/docs/study/object/2020-03-10-object-chap3)

## 인터페이스(interface)

**인터페이스란 추상적인 개념으로 서로 관계없는 것들에 대한 시스템이나 장치를 작동시키기 위한 규제 또는 규약입니다.** 

쉽게 예를 들어 리모콘은 사람과 TV의 인터페이스이며, 언어는 사람과 사람사이의 인터페이스입니다.

<details><summary>인터페이스와 인터랙션의 의미 차이</summary>
<div markdown="1">

**상호작용(Interaction, 인터랙션)**

사람들 사이의 상호작용 뿐만 아니라 디지털 기기등과 같은 인공 매체들과 사람 사이의 상호작용도 포함합니다. 디지털 기기에서 인터페이스와 사용자 사이에 일어나는 어떤 행위나 상호작용의 과정을 의미합니다.

* 사람이 문을 열고 들어가는 행위는 인터랙션에 해당됩니다.

**인터페이스(Interface)**

인터랙션을 위한 기능을 제공하는 매체로서 인간과 사물의 중재자 역활을 합니다. 제품의 보이지 않는 기능을 시각적으로 보여줍니다. 문 손잡이는 인터페이스에 해당됩니다.

<center><div markdown="1">

![인터페이스](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS16zVuL6TgZiFe-5Wh9cKUXbdE9Ptx7GODD28ddvuOPBQzfov5)

</div></center>

참고를 위해 인터페이스 디자인과 인터렉션 디자인의 비교를 볼 수 있습니다.

|| &nbsp;&nbsp; **인터페이스 디자인** &nbsp;&nbsp; | &nbsp;&nbsp; **인터랙션 디자인** &nbsp;&nbsp; |
|:-:|:-:|:-:|
|**디자인 관점**|기능의 시각화|상호작용과 반응|
|**요구 사항**|시각적인 감각|인터페이스와 행위|
|**디자인의 범위**|특정 부분 설게|포괄적인 설계|
|**역할**|중개자 역할|커뮤니케이션 역할|

</div></details>

<details><summary>어떻게 만들어야 하나?</summary>
<div markdown="1">

[인터페이스 분리 원칙](https://medium.com/newworld-kim/%EB%AA%A8%EB%8D%98-c-%EB%94%94%EC%9E%90%EC%9D%B8-%ED%8C%A8%ED%84%B4-%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4-%EB%B6%84%EB%A6%AC-%EC%9B%90%EC%B9%99-interface-segregation-principle-isp-b445309e9510), [Interface segregation principle](https://en.wikipedia.org/wiki/Interface_segregation_principle)

**SOLID의 ISP(interface segregation principle, 인터페이스 분리 원칙)**

> 인터페이스 모든 항목에 대해 구현을 강제하지 않아야 한다. 필요한 인터페이스만 구현할 수 있도록 설계하는 것을 말한다.

SOLID의 인터페이스 분리 원칙을 보면 클라이언트가 자신이 이용하지 않는 메서드에 의존하지 않아야 한다는 원칙입니다. **인터페이스 분리 원칙은 큰 덩이리의 인터페이스들을 구체적이고 작은 단위로 분리시킴으로써 클라이언트들이 꼭 필요한 메서드들만 이용할 수 있게 합니다.** 이와 같은 작은 단위들을 역활 인터페이스라고도 부릅니다.

**즉 반드시 필요한 인터페이스만 구현할 수 있도록, 목적 단위로 인터페이스를 분리하여 구현하는 것을 인터페이스 분리 원칙이라 합니다.**

의존성과 다운캐스팅을 줄이기 위한 방법으로 인터페이스를 사용할 수 있습니다. 인터페이스가 없다면 유사성이 없었을 크고 복잡한 클래스들에게 어떤 게임 함수나 기능을 공유시키고자 하는 경우에 많이 쓰입니다.**인터페이스 분리 원칙을 통해 시스템의 내부 의존성을 약화 시켜 리팩토링, 수정, 재배포를 쉽게 할 수 있습니다.** 

**즉 인터페이스 분리 원칙을 통해 시스템의 내부 의존성을 약화 시켜 리팩토링, 수정, 재배포를 쉽게 할 수 있습니다.**

객체 지향 설계 내에서 인터페이스는 코드를 단순화하고 종속성에 대한 결합을 방지하는 장벽을 만드는 추상화 계층을 제공합니다.

시스템이 여러 수준에서 너무 결합되어(coupled) 많은 추가 변경 없이 한 곳에서 변경하는 것이 더 이상 불가능할 수 있습니다. 인터페이스(interface)나 추상 클래스(abstract class)를 사용하면 이러한 부작용을 막을 수 있습니다.

언리얼의 예로 트리거 볼륨에 들어가면 함정, 경보, 점수 등의 다양한 로직을 구현할 수 있습니다. 그런데 모두 트리고 볼륨에 들어갈 것이라는 인터페이스를 갖고 구현한다면, 함수를 부르기도, 구현을 나누기도 편해집니다.

</div></details>

<details><summary>Role Interface (역활 인터페이스)</summary>
<div markdown="1">

[Role interface](https://martinfowler.com/bliki/RoleInterface.html)

역할 인터페이스는 공급자와 소비자 간의 특정 상호 작용을 살펴봄으로써 정의됩니다. 공급자 구성 요소는 일반적으로 이러한 상호 작용 패턴 각각에 대해 하나씩 여러 역할 인터페이스를 구현합니다. 이것은 공급자가 단일 인터페이스만 가질 수 있는 HeaderInterface 와 대조됩니다.

**역할 인터페이스의 장점은 활동과 후속 작업 간의 실제 협업을 명확하게 전달한다는 것입니다.** 종종 클래스는 클래스의 모든 메서드를 사용하지 않으므로 실제로 필요한 메서드를 표시하는 것이 좋습니다. 이것은 나중에 대체해야 하는 경우 특히 유용할 수 있습니다. 헤더 인터페이스는 필요하지 않더라도 모든 메소드를 구현하도록 강요합니다. 그러나 역할 인터페이스를 사용하면 필요한 것을 정확히 구현하기만 하면 됩니다.

**역할 인터페이스의 단점은 역할 인터페이스를 형성하기 위해 각 협업을 살펴봐야 하기 때문에 생각해 내기 위해 더 많은 노력이 든다는 것입니다.** 헤더 인터페이스를 사용하면 생각할 필요 없이 공용 메서드를 복제하기만 하면 됩니다. 또한 소비자에 대한 의존도가 있습니다. 형식적인 종속이 없기 때문에 '센스'라고 말하지만, 여전히 많은 사람들을 불편하게 만들기에 충분하다. 그들은 누가 서비스를 사용하는지, 어떻게 사용하는지 상관하지 않아야 한다고 믿기 때문에 헤더 인터페이스를 선호합니다. 인터페이스를 게시하면 사용자가 유용하다고 생각하는 경우 사용할 수 있습니다.

통합 인터페이스를 

```cpp
class ActivityInterface 
{
  virtual MfDate earliestStart() = 0;
  virtual MfDate earliestFinish() = 0;
  virtual MfDate latestFinish() = 0;
  virtual MfDate latestStart() = 0;
}

class ActivityImpl
{
  List<Activity> predecessors();
  List<Activity> successors();
}
```

역활 인터페이스로 다음과 같이 나눌 수 있습니다.

```cpp
class SuccessorInterface 
{
  virtual MfDate latestStart() = 0;
}
class PredecessorInterface 
{
  virtual MfDate earliestFinish() = 0;
}

class Activity
{
  List<Predecessor> predecessors();
  List<Successor> successors(); 
}
```

**추가적으로**

[Header interface](https://martinfowler.com/bliki/HeaderInterface.html)

**헤더 인터페이스는 클래스의 암시적 공용 인터페이스를 모방하는 명시적 인터페이스입니다. 기본적으로 클래스의 모든 공용 메서드를 사용하여 인터페이스에서 선언합니다.** 그런 다음 클래스에 대한 대체 구현을 제공할 수 있습니다.

</div></details>

## 언리얼 인터페이스

[인터페이스](https://docs.unrealengine.com/4.27/ko/ProgrammingAndScripting/GameplayArchitecture/Interfaces/)

**인터페이스 클래스는 (잠재적으로) 무관한 클래스 세트가 공통의 함수 세트를 구현할 수 있도록 하는 데 쓰입니다. 그대로라면 유사성이 없었을 크고 복잡한 클래스들에 어떤 게임 함수 기능을 공유시키고자 하는 경우 매우 좋습니다.**

예를 들어 트리거 볼륨에 들어서면 함정이 발동되거나, 적에게 경보가 울리거나, 플레이어에게 점수를 주는 시스템을 가진 게임이 있다 칩시다. 함정, 적, 점수에서 ReactToTrigger (트리거에 반응) 함수를 구현하면 될 것입니다. 하지만 함정은 AActor 에서 파생될 수도, 적은 특수 APawn 또는 ACharacter 서브클래스일 수도, 점수는 UDataAsset 일 수도 있습니다. 이 모든 클래스에 공유 함수 기능이 필요하지만, UObject 말고는 공통 조상이 없습니다. 이럴 때 인터페이스를 추천합니다.

**언리얼 엔진의 인터페이스를 역활 인터페이스로 쓰기에는 상당히 어렵습니다. 변수로 가지고있어도 리플리케이션 되지 않고, TScriptInterface는 블루프린트 클래스에서 인터페이스를 실체화 한 경우, Interface 래퍼런스는 유효하지 않습니다. 따라서 메시지 함수로 현재로서는 사용하는 것이 최선이라 생각합니다.**

<details><summary>언리얼의 인터페이스란?</summary>
<div markdown="1">

**블루프린터의 "인터페이스"라는 클래스는 함수 정의만 할 수 있고 구현은 할 수 없는 껍데기 클래스입니다.** 이를 처음 접하면, c++의 pure virtual function만 모아 둔 클래스와 비슷하다고 생각할 수 있습니다. 즉, c++에서 다중 상속을 이용한 인터페이스 구현처럼 보이기는 하지만, 성격이 좀 다릅니다.

일단, 언리얼 엔진에서 인터페이스용 클래스는 c++과 달리 부모로서 추가되는 게 아닙니다. 블루 프린트 클래스에서 부모 클래스는 단 하나만 존재할 수 있습니다. 인터페이스를 추가하고자 할 때는, 클래스 속성에서 Interfaces 카테고리에서 Add를 해서 추가해야 합니다.

**인터페이스 함수 내부에서의 처리는 c++의 상속 개념이라기 보다는 메시지 함수와 비슷하다고 합니다.** 그래서, 어떤 클래스에 대해서도 호출이 가능합니다. 해당 클래스에 인터페이스 함수가 구현되어 있으면 처리를 하지만, 구현되어 있지 않으면 조용히 실패를 한다고 합니다. 즉, c++ 처럼 컴파일 에러가 발생하지 않기 때문에 주의가 필요합니다.

</div></details>

<details><summary>인터페이스의 선언</summary>
<div markdown="1">

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

* UInterface 클래스는 실제 인터페이스가 아닙니다. 언리얼 엔진의 리플랙션 시스템에 보이도록 하기 위해서만 존재하는 비어있는 클래스입니다. 다른 클래스에서 상속하게되는 실제 클래스는 IInterface입니다.

</div></details>

<details><summary>인터페이스의 상속</summary>
<div markdown="1">

I로 시작하는 인터페이스 클래스를 상속받아 구현합니다.
```cpp
class AChildActor : public AActor, 
  public IReactInterface
```

</div></details>

<details><summary>인터페이스의 메서드</summary>
<div markdown="1">

[Interface methods with same name as class methods](https://forums.unrealengine.com/t/interface-methods-with-same-name-as-class-methods/104316)

[Call a blueprint function that is overloaded?](https://forums.unrealengine.com/t/call-a-blueprint-function-that-is-overloaded/299148)

UBT는 블루프린트 함수에 대해서 함수 오버로딩을 허용하지 않습니다. 접두사 또는 접미사를 이용해서 혼동을 줄이는 것이 최선이라 생각합니다.

* 함수 오버로딩을 허용하지 않는 이유는, 함수 호출은 함수 이름으로 구분되고 파라메터는 고려되지 않기 때문입니다.
* BlueprintPure는 인터페이스에서 허용되지 않습니다.
* pure virtual(순수 가상함수)는 지원한다고 합니다.

[Refresher on the use of Interfaces in C++](https://forums.unrealengine.com/t/refresher-on-the-use-of-interfaces-in-c/264232/3)

Execute_...()는 함수가 Blueprint 이벤트로 표시된 경우에만 생성되므로 코드가 그렇지 않은 경우에도 (함수가 존재하지 않기 때문에) 컴파일되지 않습니다. 블루프린트 이벤트용으로 생성되는 것은 함수가 블루프린트에서 구현될 수 있고 단순히 C++ 함수를 직접 호출하면 블루프린트 에서 구현된 함수를 실행하지 않을 수 있습니다. 

**네이티브 코드라면 직접 호출하고, 블루프린트 클래스에서 재정의 된다면 인터페이스의 Execute로 호출해야 합니다.**

```cpp
if (Character->GetClass()->ImplementsInterface(UInterface_PlayerCharacter::StaticClass()))
{
	IInterface_PlayerCharacter::Execute_SetOnAttack(Character, false);
}
```

</div></details>

<details><summary>특정 오브젝트에 인터페이스가 구현되어 있는지 확인하기</summary>
<div markdown="1">

특정 클래스에 특정 인터페이스가 구현되어있는지 여부는 ImplementsInterface함수를 쓸 수 있습니다.

```cpp
Value.GetObject()->GetClass()->ImplementsInterface(InterfaceProp->InterfaceClass)
```

</div></details>

<details><summary>TScriptInterface</summary>
<div markdown="1">

[How to get an interface pointer variable to work w/UPROPERTY()](https://forums.unrealengine.com/t/how-to-get-an-interface-pointer-variable-to-work-w-uproperty/383017)

인터페이스 포인터를 UPROPERTY로 사용하기 위해서는 TScriptInterface라는 제네릭 클래스을 이용해야합니다.

```cpp
UPROPERTY(...)
TScriptInterface<IMyInterface> SelfInterface;
```

* 네이티브 인터페이스를 구현하는 UObject의 인터페이스 부분을 참조하기 위한 접근자와 연산자를 제공하는 FScriptInterface입니다.

[Refresher on the use of Interfaces in C++](https://forums.unrealengine.com/t/refresher-on-the-use-of-interfaces-in-c/264232/3)

네이티브 코드에서 기본 클래스를 전달하는 것과 같은 방식으로 인터페이스 포인터를 전달합니다. 그러나 어느 시점에서 유형의 변수를 저장해야 하는 클래스가 있을 것입니다 MyInterface*. 즉, 개체를 효과적으로 소유하는 것입니다. 하지만 **UObject가 GC 되지 않도록 하려면 UPROPERTY()마크업이 필요하며 인터페이스 포인터에서는 작동하지 않습니다. 이떄 TScriptInterface를 사용해야 합니다.**

</div></details>

<details><summary>인터페이스를 ExposeOnSpawn하면 오류</summary>
<div markdown="1">

* UE 4.27.2를 기준으로

UKismetSystemLibrary::SetInterfacePropertyByName을 보면 `value.GetObject()->GetClass()->ImplementsInterface(InterfaceProp->InterfaceClass)`부분에서 인터페이스가 당연히 유효할 거라는 전제하에 넘겨줍니다.

**즉, 비어있는 TScriptInterface를 스폰시 설정하면, 오류가 납니다...**

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

</div></details>

<details><summary>인터페이스를 이용하여 블루프린트 직접 통신</summary>
<div markdown="1">

레벨에 있는 액터를 변수로 불러올 수 있습니다.

```cpp
UPROPERTY(EditAnywhere, BlueprintReadWrite)
TScriptInterface<IInterface> ChildActor;
```

</div></details>