---
layout: post
title: Delegate & Event & Action
---

<center><div class="mermaid"> 
graph RL;

Delegate(C# Delegate)
Event(C# Event)
Action(C# Action)

UnityAction(Unity Action)
UnityEvent(Unity Event)

Delegate--->Event
Delegate--->Action

</div></center> 

# C#
## Delegates

[C# Delegates](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/delegates)

[Delegates (C# Programming Guide)](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/delegates/)

* 하나의 형식(type)으로, 메서드에 대한 참조입니다.
* 인스턴스 메서드, 정적 메서드 모두 참조 가능합니다.
* 값이 아닌 코드 자체를 넘기고 싶을 때 사용할 수 있습니다.
* 콜백용도로 사용됩니다.

## Event

[C# event keyward](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/event)

이벤트는 클래스내에 특정한 일(event)이 일어났음을 외부의 이벤트 가입자들에게 알려주는 기능을 합니다. C#에서 이벤트는 event라는 키워드를 사용하여 표시합니다.

* delegate키워드를 event 한정자로 수식해서 만듭니다.
* delegate와의 차이는, event는 인터페이스 내부에 선언할 수 있지만, 델리게이트는 선언할 수 없습니다.
* **public으로 선언되어 있어도, 자신이 선언되어 있는 클래스 외부에서 호출할 수 없습니다.** 이는 이벤트 기반 프로그래밍에서 안정성을 추구하는 것으로, 클래스 외부에서 이벤트에 변화를 줄 수 없게 하기 위함입니다.
* 객체의 상태 변화, 사건의 발생을 알리는 용도입니다.

## Action

[Action Delegate](https://learn.microsoft.com/en-us/dotnet/api/system.action?view=net-7.0)

반환 값이 없는 델리게이트입니다. 값을 반환하지 않는 메서드를 캡슐화합니다.

* 반환값이 필요없는 Event를 사용하고자 할 때 이용할 수 있습니다.

인자가 하나인 Action의 정의를 보면 다음과 같이 되어있습니다.
```c#
namespace System
{
    [__DynamicallyInvokable]
    public delegate void Action<in T>(T obj);
}
```

## Func

* 반환값이 필요한 Event는 Func를 이용할 수 있습니다. 

# UnityAction

[UnityAction](https://docs.unity3d.com/ScriptReference/Events.UnityAction.html)

인수가 없는 델리게이트들입니다. Unity Actions를 사용하면 여러 함수를 동적으로 호출할 수 있습니다. Unity Actions에는 인수가 없으므로 호출하는 함수에도 인수가 없어야 합니다.

* Action은 반환값이 없는 메서드를 등록할 수 있는 델리게이트입니다.

# UnityEvent

[UnityEngine.Events](https://docs.unity3d.com/kr/530/ScriptReference/Events.UnityEvent.html)

[UnityAction vs UnityEvent](https://answers.unity.com/questions/1596466/unityaction-vs-unityevent.html)

Event는 일반 C#과 달리 Editor에서 사용할 수 있또록 직렬화될 가능성이 있는 이벤트를 처리하는 또 다른 방법입니다.

* C#의 이벤트와 델리게이트를 유니티가 사용하기 편하도록 랩핑해놓은 것입니다.