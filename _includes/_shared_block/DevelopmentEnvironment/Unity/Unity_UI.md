[UI](https://docs.unity3d.com/kr/2023.1/Manual/UIBasicLayout.html)

Unity는 Unity 에디터에서 제작된 애플리케이션과 Unity 에디터를 위한 사용자 인터페이스(UI)를 생성하는 데 사용되는 

* `UI 툴킷`, `Unity UI 패키지(uGUI)`, `IMGUI` 세 가지 UI 시스템을 제공합니다.
* Prefab을 UI 프리팹으로 만들기 위해서는, Canvas나 Canvas Renderer를 추가할 수 있습니다.
* 하이어라키 좌측의 눈 아이콘을 클릭하여, 해당 게임 오브젝트가 에디터에서 보이지않게 할 수 있습니다.

[캔바스](https://docs.unity3d.com/kr/2023.1/Manual/UICanvas.html)

모든 UI 요소는 Canvas 안에 위치해야 합니다. 캔버스는 Canvas 컴포넌트가 있는 게임 오브젝트이며 모든 UI 요소는 반드시 어떤 캔버스의 자식이어야 합니다.

* UI 요소 생성, 예를 들어, GameObject > UI > Image 메뉴를 사용하여 이미지를 생성하면 (씬에 아직 캔버스가 없을 경우)자동으로 캔버스를 생성합니다. 이 때 이 UI 요소는 이 캔버스의 자식으로서 생성됩니다.
* 캔버스 영역은 씬 뷰에서 사각형으로 나타나므로 매번 게임 뷰가 보이게 하지 않고도 UI 요소를 배치하기 용이합니다.
* Canvas 는 메시징 시스템을 돕기 위해 EventSystem 오브젝트를 사용합니다.

캔버스에 있는 UI 요소는 계층 구조에 나타나는 것과 동일 순서로 그려집니다. 첫 번째 자식이 처음으로 그려지고, 두 번째 자식이 그 다음으로 그려지는 식입니다. 두 UI 요소가 겹쳐지면 나중에 그려지는 것이 먼저 그려진 것의 위에 나타나게 됩니다.

* 어떤 요소가 다른 요소의 위에 겹쳐지는지 여부를 변경하고 싶으면 간단히 드래그하여 계층 구조에서 요소의 순서를 변경하면 됩니다.
* 이 순서는 Transform 컴포넌트에서 SetAsFirstSibling, SetAsLastSibling, SetSiblingIndex 메서드를 사용하여 스크립팅을 통해 제어할 수도 있습니다.

RectTransform의 로컬 포지션은 화면상에서 그려지는 Pivot의 위치가 부모 Pivot으로 부터 얼만큼 떨어져 있는지 결정됩니다. 이 화면상에 보이는 Pivot의 프로퍼티의 Anchor, AnchoredPosition, Pivot에 의해 결정됩니다.

RectTransform의 Rect.Size는 Rect의 크기를 반환합니다. 이는 SizeDelta 및 앵커와는 다르게 ScreenSpace에서의 크기를 반환합니다.

UI 개발을 위한 클래스들로 [RectTransformUtility](https://docs.unity3d.com/ScriptReference/RectTransformUtility.html)가 있습니다.
