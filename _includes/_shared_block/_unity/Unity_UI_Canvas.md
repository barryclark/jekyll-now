[Canvas](https://docs.unity3d.com/kr/current/Manual/UICanvas.html)

Unity에서 Canvas는 2D 그래픽 요소를 렌더링하는 데 사용되는 컴포넌트입니다. Unity에서 UI를 만들 때 일반적으로 사용됩니다. Canvas는 Unity 에디터에서 UI를 디자인하고 배치하는 데 사용되며, UI 요소를 게임 화면에 렌더링하는 방식을 제어합니다.

Canvas는 UI 요소를 배치하는 데 사용되는 여러 가지 속성을 제공합니다. 예를 들어, Canvas의 크기와 배경색을 설정할 수 있으며, UI 요소를 배치하기 위한 여러 가지 레이아웃 그룹을 제공합니다. Canvas는 또한 렌더링 모드를 선택할 수 있으며, 2D 요소를 배치할 수 있습니다.

Canvas는 또한 렌더링 모드를 선택할 수 있으며, 2D 요소를 배치하는 것 외에도 3D 요소를 배치하는 데도 사용될 수 있습니다. Canvas의 렌더링 모드는 Screen Space Overlay, Screen Space Camera, World Space 세 가지가 있으며, 각각의 모드는 다른 방식으로 UI를 화면에 렌더링합니다.

Canvas의 하위 요소로는 Text, Image, Button, InputField, Dropdown, Scrollbar, Slider 등이 있으며, 이러한 요소를 조합하여 복잡한 UI를 만들 수 있습니다. 또한 Canvas는 애니메이션과 상호작용을 지원하여, UI 요소의 움직임과 사용자 입력에 반응할 수 있도록 합니다.

종합적으로, Unity의 Canvas는 게임 개발자가 UI를 디자인하고 구현하는 데 필수적인 컴포넌트입니다.

* 다음을 이용하여 월드에 배치된 캔바스와 상호작용 할 수 있습니다.
  1. Canvas에 EventCamera필드 변수를 추가합니다.
  2. Canvas에 Graphic Raycaster 컴포넌트를 추가합니다.