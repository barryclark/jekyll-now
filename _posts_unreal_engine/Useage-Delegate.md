---
layout: post
title: Delegate
---


UE 4.27
2022 06 20

## 델리게이트(Deleagte)란?
[델리게이트](https://en.wikipedia.org/wiki/Delegate_(CLI))는 호출할 메서드와 선택적으로 메서드를 호출할 개체를 지정합니다. 대리자는 무엇보다도 콜백 빛 이벤트 리스너를 구현하는 데 사용됩니다. 대리자 개체는 메서드에 대한 참조를 캡슐화합니다. 따라서 호출할 메서드를 컴파일 타임에 알 필요 없이 참조된 메서드를 호출할 수 있는 코드에 대리자 개체를 전달할 수 있습니다.

[델리게이트](https://docs.unrealengine.com/5.0/ko/delegates-and-lamba-functions-in-unreal-engine/)를 사용하여 임의 오브젝트의 멤버 함수에 동적으로 바인딩시킬 수 있으며, 그런 다음 그 오브젝트에서 함수를 호출할 수 있습니다.

**구독자가 신문사에게 신문을 받아보겠다는 구독 의사를 밝히고 등록하면, 신문이 발행될 때마다 동일한 시간에 구독한 모든 구독자의 집으로 신문을 배달해주듯이, 특정 이벤트가 발생하면 델리게이트에 등록된 모든 함수를 한꺼번에 호출할 수 있습니다.**

* 싱글 케스트는 가장 기본적인 Delegate로 함수 1개를 바인드하여 사용합니다.
* 멀티 케스트는 싱글 케스트와 동일하지만 여러 함수를 바인드 할 수 있습니다.
* 이벤트는 멀티 케스트와 동일하지만 전역으로 설정할 수 없어 외부 클래스에서 추가 델리게이트 선언이 불가능합니다.
* **다이나믹은 다이나믹 델리게이트는 직렬화 되어 블루프린트에서 이용가능합니다.**
	- 블루프린트 오브젝트는 멤버 함수에 대한 정보를 저장하고 로딩하는 직렬화 매커니즘이 있습니다. 따라서 블루프린트에서 델리게이트를 연동하기 위해서는 다이나믹 델리게이트를 필요로 합니다.

* 직렬화(Serialization)이란 정보를 다른 환경에서 불러와 동일한 상황으로 만드는 기법으로 언리얼에서 직렬화의 동작은 2단계로 구분됩니다.
	1. 객체와 속성 정보를 저장, 보관 -> 패키징
	2. 데이터가 필요한 플랫폼에서 패키징 데이터를 로딩

## 델리게이트 선언하기
델리게이트의 선언은 제공되어 있는 선언 매크로중 하나를 사용하여 이루어집니다. 사용되는 매크로는 델리게이트에 바인딩되는 함수의 시그니처에 따라 결정됩니다. **시스템에서는 델리게이트 유형을 선언해 낼 수 있는 범용 함수 시그너처의 다양한 조합을 미리 정의, 이를 통해 반한값과 파라미터에 대한 유형 이름을 채웁니다.**

```cpp
// CoreMinimal에서 include되어 있습니다.
//#include "Delegates/DelegateCombinations.h" 입니다.
```

델리게이트 선언 매크로는 [델리게이트 선언하기](https://docs.unrealengine.com/5.0/ko/delegates-and-lamba-functions-in-unreal-engine/)에서 읽을 수 있습니다.

* ...\Engine\Source\Runtime\Core\Public\Delegates\DelegateCombinations.h 에서 선언을 확인 할 수 있습니다.

## 델리게이트 바인딩하기
델리게이트 오브젝트는 복사할 수 있으며, 값으로 전달 가능하나 heap 메모리를 할당하기 때문에 참조로 전달하는 것이 바람직합니다.

델리게이트는 싱글-캐스트와 멀티 캐스트 모두 지원되며, 디스크에 안전하게 Serialize 시킬 수 있는 다이내믹 델리케이트도 지원합니다.

* Bind는 기존 델리게이트 오브젝트에 바인딩합니다.
* BindState은 raw C++ 포인터 글로벌 함수 델리게이트를 바인딩합니다.
* BindRaw는 raw C++ 포인터를 델리게이트에 바인딩합니다. 날 포인터는 어떠한 종류의 레퍼런스도 사용하지 않아, 만약 오브젝트가 델리게이트에 아래에서 삭제될 경우 안전하지 않을 수 있습니다.
* BindSP는 공유 포인터 기반 멤버 함수를 델리게이트에 바인딩합니다. 공유 포인터 델리게이트는 오브젝트로의 약한 레퍼런스를 유지합니다.
* BindUObject는 UObject기반 멤버 함수를 델리게이트에 바인딩합니다. UObject 델리게이트는 오브젝트로의 약한 레퍼런스를 유지합니다.
* UnBind는 바인딩을 제거합니다.

\Engine\Source\Runtime\Core\Public\Templates\DelegateSignatureImpl.ini에서 확인할 수 있습니다.

# 델리게이트 사용하기

* 콜백, 이벤트에 많이 사용됩니다.
	- 발행/구독 모델처럼 사용할 때는 MULTICAST계열 매크로를 사용합니다.
* 델리게이트는 모든 유형의 함수에 사용할 수 없습니다.
* 바인딩할 성격에 따라 다양한 API가 존재합니다.
* Create함수를 사용해서 즉석에서 델리게이트를 제작해 넘겨주는 것도 가능합니다.
* 블루프린트와 연동시에는 DYNAMIC_MULTICAST계열 매크로를 사용합니다.

## 콜백을 지정하는 Delegate를 사용할 때 주의사항
* Delegate는 함수가 바인딩 되어 있는지 확인하는 IsBound()함수가 있습니다.
* 바인드 되지 않은 델리게이트를 Execute() 혹은 Broadcast()시 런타임 에러가 발생합니다.
* Clear()는 바인드 된 함수를 모두 제거하는 데 바인드된 함수가 없어도 런타임 에러가 발생하지 않습니다.
* Dlegate로 설정할 바탕 함수는 UFUNCTION으로 등록해 에진이 찾을 수 있어야 합니다.

델리게이트에 바인딩된 함수는 델리게이트의 Execute()함수를 호출하여 실행됩니다. 델리게이트를 실행하기 전 "바인딩"되었는지 반드시 확인해야 합니다.

## 몽타주 재생을 C++로 실행할 때
애님 인스턴스 클래스에 선언되어 있는 델리게이트를 사용할 수 있습니다.

```cpp
{
	Montage_Play(..., 1.0f);

	FOnMontageEnded BlendOutDelegate;
	BlendOutDelegate.BindUObject(this, &UObject::Func);
	Montage_SetBlendOutDelegate(BlendOutDelegate, rollMontage);

	FOnMontageBlendingOutStarted CompleteDelegate;
	CompleteDelegate.BindUObject(this, &UPlayerAnimINstance::RollMontageComplete);
	Montage_SetEndDelegate(CompleteDelegate, rollMontage);
}
```

## FScriptDelegate이란

```cpp
	UFUNCTION(BlueprintCallable)
	void PlayMainMenuToPrepareAnimation()
	{
		UnbindAllFromAnimationFinished(MainMenuToPrepareAnimation);
		FScriptDelegate StartScriptDelegate;
		StartScriptDelegate.BindUFunction(this, FName("Prepare"));
		BindToAnimationStarted(MainMenuToPrepareAnimation, FWidgetAnimationDynamicEvent(StartScriptDelegate));

		UnbindAllFromAnimationFinished(MainMenuToPrepareAnimation);
		FScriptDelegate FinishScriptDelegate;
		FinishScriptDelegate.BindUFunction(this, FName("PlayReadyToPlayAnimation"));
		BindToAnimationFinished(MainMenuToPrepareAnimation, FWidgetAnimationDynamicEvent(FinishScriptDelegate));

		PlayAnimation(MainMenuToPrepareAnimation);
	}

	UFUNCTION(BlueprintCallable)
	void PlayMainMenuToExitAnimation()
	{
		UnbindAllFromAnimationFinished(MainMenuToExitAnimation);
		FScriptDelegate FinishScriptDelegate;
		FinishScriptDelegate.BindUFunction(this, FName("ExitGame"));
		BindToAnimationFinished(MainMenuToExitAnimation, FWidgetAnimationDynamicEvent(FinishScriptDelegate));

		PlayAnimation(MainMenuToExitAnimation);
	}
```

FScriptDelegate 어디다 사용하는지 궁금함.

[Binding blueprint method/event to C++ delegate](https://forums.unrealengine.com/t/binding-blueprint-method-event-to-c-delegate/377392/2)

```cpp
    UPROPERTY(BlueprintAssignable)
    FExampleDelegate_OnSomething ExampleDelegateVariable;
```

* Delegate는 Object에 있어야 합니다. Struct에 구현하면, 블루프린트에서 통신하기 위해서 직접 감싸야 합니다.

델리게이트를 호출할 때는 IsBound를 검사해야 합니다.

# 참고자료
참고자료 
: [UE4 디버깅 기록 Delegate / BeginDestroy](https://narakit.tistory.com/187?category=510720)
, [델리게이트 + 종류 및 함수 + 시그니처 + 바인딩](https://kyoun.tistory.com/143)
