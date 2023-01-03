---
layout: post
title: UI Development
---

* UI 텍스쳐가 깨끗한지를 볼 수 있습니다.
* OK 버튼의 경우 보통 전부 대문자로 작성합니다. Ok나 ok로는 잘 쓰지 않습니다.

### MVC(Model-View-Controller) Pattern
[ MVC Pattern](https://www.geeksforgeeks.org/mvc-design-pattern/)

MVC 는 Model, View, Controller의 약자입니다. 하나의 애플리케이션, 프로젝트를 구성할 때 그 구성요소를 세가지의 역할로 구분한 패턴입니다.

<center><div markdown="1">

![ModelViewController](https://drive.google.com/uc?id=1MbTImbC7xkSFIxWgPr_K5gP6GMkUSaR5)

</div></center>

* Model에는 순수한 애플리케이션 데이터만 포함되며 데이터를 사용자에게 표시하는 방법을 설명하는 논리는 포함되지 않습니다.
* View는 모델의 데이터를 사용자에게 제공합니다 . 뷰는 모델의 데이터에 액세스하는 방법을 알고 있지만 이 데이터가 무엇을 의미하는지 또는 사용자가 데이터를 조작하기 위해 무엇을 할 수 있는지는 모릅니다.
* Controller는 뷰와 모델 사이에 존재합니다. 뷰(또는 다른 외부 소스)에 의해 트리거된 이벤트를 수신하고 이러한 이벤트에 대해 적절한 반응을 실행합니다. 대부분의 경우 반응은 모델에서 메서드를 호출하는 것입니다. 뷰와 모델은 알림 메커니즘을 통해 연결되어 있으므로 이 작업의 결과는 자동으로 뷰에 반영됩니다.

<center><div markdown="1">

|장점|단점|
|:--|:--|
|여러 개발자가 모델, 컨트롤러 및 보기에서 동시에 작업할 수 있습니다.<br>MVC를 사용하면 컨트롤러에서 관련 작업을 논리적으로 그룹화할 수 있습니다. 특정 모델에 대한 보기도 함께 그룹화됩니다.<br>모델은 여러 보기를 가질 수 있습니다.|프레임워크 탐색은 새로운 추상화 계층을 도입하고 사용자가 MVC의 분해 기준에 적응해야 하기 때문에 복잡할 수 있습니다.<br>여러 기술에 대한 지식이 표준이 됩니다. MVC를 사용하는 개발자는 여러 기술에 능숙해야 합니다.|

</div></center>

<details><summary>왜 MVC패턴을 사용해야 하나요?</summary>
<div markdown="1">

사용자가 보는 페이지, 데이터처리, 그리고 이 2가지를 중간에서 제어하는 컨트롤, 이 4가지로 구성되는 하나의 애플리케이션을 만들면 각각 맡은 바에만 집중을 할 수 있게 됩니다. 공장에서도 하나의 역할들만 담당 처리를 해서 효츌적이게 됩니다.

서로 분리되어 각자의 역할에 집중할 수 있게끔 개발을 하고, 그렇게 어플리케이션을 만든다면, 유지보수성, 애플리케이션의 확장성, 그리고 유연성이 증가, 중복코딩이라는 문제점 또한 사라지게 됩니다.

* MVC 패턴은 결국 "어떻게 나눌 것인가"에 대한 해답 중 하나압니다. 어떤 특정한 역할들에 대해 역할분담을 할 때 가이드라인을 제시하는 방법 중 하나가 MVC 패턴입니다.

</div></details>

#### 모델(Model)

애플리케이션의 정보, 데이타를 나타냅니다. 데이터베이스, 처음에 정의하는 상수, 초기화값, 변수등을 뜻합니다. 또한 DATA, 정보등의가공을 책임지는 컴포넌트를 말합니다. 이 모델은 다음과 같은 규칙을 가지고 있습니다.

```c#
public static class Model
{
    private static int m_count = 0;
    public static Event<int> EventUpdateCount;
    public static int Count {
        get 
        { 
            return m_count; 
        }
        set 
        {
            m_count = value;
            UpdateCount.Invoke(m_count);    
        }
    }
}
```

1. 사용자가 편집하길 원하는 모든 데이터를 가지고 있어야 합니다.
2. 뷰나 컨트롤러에 대해서 어떤 정보도 알지 말아야 합니다.
3. 변경이 일어나면, 변경 통지에 대한 처리방법을 구현해야만 합니다.

* 화면안의 네모박스에 글자가 표현된다면, 네모박스의 화면 위치 정보, 네모박스의 크기정보, 글자내용, 글자의 위치, 글자의 포맷 정보 등을 가지고 있어야 합니다.
* 데이터 변경이 일어났을 때 모델에서 화면 UI를 직접 조정해서 수정할 수 있도록 뷰를 참조하는 내부 속성값을 가지면 안 됩니다.
* 모델의 속성 중 텍스트 정보가 변경이 된다면, 이벤트를 발생시켜 전달해야 하며, 모델을 변경하도록 요청하는 이벤트를 보냈을 때 이를 수신할 수 있는 처리 방법을 구현해야 합니다.

#### 뷰(View)

Input 텍스트, 체크박스 항목 등과 같은 사용자 인터페이스 요소를 나타냅니다. 다시 말해 데이터 및 객체의 입력, 그리고 보여주는 출력을 담당합니다. 데이타를 기반으로 사용자들이 볼 수 있는 화면입니다.

```c#
public class View
{
    ...

    public void Update(int newCount)
    {
        m_textBar.text = newCount.ToString();       
    }
}
```

1. 모델이 가지고 있는 정보를 따로 저장해서는 안됩니다.
2. 모델이나 컨트롤러와 같이 다른 구성요소들을 몰라야 됩니다.
3. 변경이 일어나면 변경통지에 대한 처리방법을 구현해야만 합니다.

* 화면에 글자를 표시 하기 위해, 모델이 가지고 있는 정보를 전달받게 될텐데, 그 정보를 유지하기 위해서 임의의 뷰 내부에 저장하면 안됩니다. 단순히 네모 박스를 그리라는 명령을 받으면, 화면에 표시하기만 하고 그 화면을 그릴 때 필요한 정보들을 저장하지 않아야 합니다.
* 모델이나 컨트롤러와 같은 다른 요소에 의존하면 안됩니다. 그냥 뷰는 데이터를 받으면 화면에 표시해주는 역할만 가진다고 볼 수 있습니다.
* 모델과 같이 변경이 일어났을 때 이른 누군가에게 변경을 알려줘야 하는 방법을 구현해야 합니다. 뷰에서는 화면에서 사용자가 화면에 표시된 내용을 변경하게 되면 이를 모델에게 전달해서 모델을 변경해야 할 것입니다. 그 작업을 하기 위해 변경 통지를 구현합니다. 그리고 재사용가능하게끔 설계를 해야 하며 다른 정보들을 표현할 때 쉽게 설계를 해야 합니다.

#### 컨트롤러(Controller)

데이터와 사용자인터페이스 요소들을 잇는 다리역할을 합니다. 즉, 사용자가 데이터를 클릭하고, 수정하는 것에 대한 "이벤트"들을 처리하는 부분을 뜻합니다. 컨트롤러는 다음과 같은 규칙이 있습니다.

```c#
public class Controller
{
    View m_view;

    public void Init()
    {
        m_view.m_button.Bind( ()=>{ Model.Count+=1 });
        Model.EventUpdateCount.Bind(m_view.Update);
    }
}
```

1. 모델이나 뷰에 대해서 알고 있어야 합니다.
2. 모델이나 뷰의 변경을 모니터링 해야 합니다.

* 모델이나 뷰는 서로의 존재를 모르고, 변경을 외부로 알리고, 수신하는 방법만 가지고 있는데 이를 컨트롤러가 중재하기 위해 모델과 그에 관련된 뷰에 대해서 알고 있어야 합니다.
* 모델이나 뷰의 변경을 통지를 받으면 이를 해석해서 각각의 구성 요소에게 통지를 해야 합니다. 또한, 애플리케이션의 메인 로직은 컨트롤러가 담당하게 됩니다.

### MVP(Model View Presenter) Pattern
[Unity MVP](https://tech.lonpeach.com/2020/11/09/Thinking-about-MVRP/), [wiki Model–view–presenter](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93presenter)

<center><div markdown="1">

![ModelViewController](https://drive.google.com/uc?id=1N2X96Co127VjGdzE5j47DASywvMnpEzt)

</div></center>

* Model은 어플리케이션에서 사용되는 데이터와 그 데이터를 처리하는 부분입니다.
* View은 사용자에서 보여지는 UI 부분입니다.
* Presenter은 View에서 요청한 정보로 Model을 가공하여 View에 전달해 주는 부분입니다.

<center><div markdown="1">

|장점|단점|
|:--|:--|
|MVP 패턴의 장점은 View와 Model의 의존성이 없다는 것입니다. MVP 패턴은 MVC 패턴의 단점이었던 View와 Model의 의존성을 해결하였습니다.<br>MVP의 단점은 View와 Model을 분리시켜 MVC에서 하기 힘들었던 테스트가 용이해졌습니다.|MVC 패턴의 단점인 View와 Model 사이의 의존성은 해결되었지만, View와 Presenter 사이의 의존성이 높은 가지게 되는 단점이 있습니다.|

</div></center>

MVP 패턴의 동작 순서는
1. 사용자의 Action들은 View를 통해 들어오게 됩니다.
2. View는 데이터를 Presenter에 요청합니다.
3. Presenter는 Model에게 데이터를 요청합니다.
4. Model은 Presenter에서 요청받은 데이터를 응답합니다.
5. Presenter는 View에게 데이터를 응답합니다.
6. View는 Presenter가 응답한 데이터를 이용하여 화면을 나타냅니다.