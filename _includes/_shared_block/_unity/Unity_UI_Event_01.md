[Namespace UnityEngine.EventSystems](https://docs.unity3d.com/Packages/com.unity.ugui@1.0/api/UnityEngine.EventSystems.html)

Unity에서 UI 이벤트는 사용자가 버튼이나 텍스트 필드와 같은 UI 요소와 상호 작용할 때 트리거되는 이벤트입니다. 이러한 이벤트는 특정 작업을 수행하거나 게임 또는 애플리케이션에서 다른 이벤트를 트리거하는 데 사용할 수 있습니다.

Unity는 UnityEngine.EventSystems.EventSystem이라는 UI 이벤트를 처리하기 위한 내장 시스템을 제공합니다. 이 시스템은 마우스 클릭 및 터치 이벤트와 같은 입력 이벤트를 처리하고 적절한 UI 요소로 라우팅하는 역할을 합니다.

Unity에서 UI 이벤트를 사용하려면 버튼과 같은 UI 요소에 EventTrigger 구성 요소를 추가하면 됩니다. EventTrigger 구성 요소를 사용하면 사용자가 UI 요소와 상호 작용할 때 트리거될 수 있는 포인터 입력, 포인터 종료, 포인터 아래로 및 포인터 위로와 같은 다양한 이벤트를 지정할 수 있습니다.

각 이벤트는 UnityEngine.Events.UnityAction 델리게이트 목록의 컨테이너인 UnityEngine.Events.UnityEvent에 링크될 수 있습니다. 이러한 대리자는 이벤트가 트리거될 때 특정 작업을 실행하는 데 사용할 수 있습니다.

예를 들어 버튼의 "OnClick" 이벤트에 UnityEvent를 추가한 다음 버튼을 클릭할 때 특정 기능을 실행할 UnityEvent에 UnityAction을 추가할 수 있습니다.

이벤트 시스템이 UI에 국한되지 않고 다른 개체에도 사용할 수 있다는 점은 주목할 가치가 있습니다. 또한 내장 이벤트에 국한되지 않고 자체 이벤트를 생성하고 트리거할 수도 있습니다.