## Unity UI
[Unity UI](https://docs.unity3d.com/Packages/com.unity.ugui@1.0/manual/UIBasicLayout.html)

Unity UI는 게임 및 애플리케이션용 사용자 인터페이스를 개발하기 위한 UI 툴킷입니다. 구성 요소 및 게임 보기를 사용하여 사용자 인터페이스를 정렬, 배치 및 스타일 지정하는 GameObject 기반 UI 시스템입니다. Unity UI를 사용하여 Unity 에디터에서 사용자 인터페이스를 생성하거나 변경할 수 없습니다.

* Prefab을 UI 프리팹으로 만들기 위해서는, Canvas나 Canvas Renderer를 추가할 수 있습니다.
* 하이어라키 좌측의 눈 아이콘을 클릭하여, 에디터에서 보이지않게 할 수 있습니다.

### GUI(Graphical user interface, UGUI)
GUI는 그래픽 사용자 인터페이스를 나타냅니다. 사용자가 아이콘, 버튼 및 창과 같은 그래픽 요소를 통해 컴퓨터 또는 기타 전자 장치와 상호 작용할 수 있도록 하는 일종의 사용자 인터페이스입니다. GUI는 이해하고 사용하기 쉬운 방식으로 사용자에게 정보와 옵션을 제공합니다.

GUI의 일반적인 예는 사용자가 아이콘, 창 및 메뉴를 사용하여 파일 및 응용 프로그램과 상호 작용할 수 있는 컴퓨터의 데스크탑 인터페이스입니다. 또 다른 예는 사용자가 화면에 표시되는 아이콘과 버튼을 통해 다양한 기능과 애플리케이션에 액세스할 수 있는 휴대폰의 인터페이스입니다.

GUI는 일반적으로 그래픽, 텍스트 및 입력 컨트롤의 조합을 사용하여 구축됩니다. 몇 가지 일반적인 GUI 요소는 다음과 같습니다.

* 버튼: 사용자가 버튼을 클릭하여 작업을 수행할 수 있습니다.
* 텍스트 필드: 사용자가 텍스트를 입력하고 편집할 수 있습니다.
* 확인란: 사용자가 옵션을 선택하거나 선택 취소할 수 있습니다.
* 라디오 버튼: 사용자가 옵션 그룹에서 하나의 옵션을 선택할 수 있습니다.
* 드롭다운 메뉴: 사용자가 옵션 목록에서 하나의 옵션을 선택할 수 있습니다.

GUI는 컴퓨터 운영 체제, 소프트웨어 애플리케이션, 모바일 앱 및 비디오 게임을 포함하여 다양한 유형의 애플리케이션에서 널리 사용됩니다. 사용자가 보다 직관적이고 사용자 친화적인 방식으로 컴퓨터 또는 장치와 상호 작용할 수 있는 방법을 제공합니다.

### UI Event
[Namespace UnityEngine.EventSystems](https://docs.unity3d.com/Packages/com.unity.ugui@1.0/api/UnityEngine.EventSystems.html)

### Navigation
Unity의 UI 탐색은 게임 또는 애플리케이션 내에서 서로 다른 UI 요소 또는 화면 사이를 탐색하는 프로세스를 나타냅니다. 탐색을 위해 버튼이나 다른 형태의 입력을 사용하는 대신 사용자가 보다 직관적이고 사용자 친화적인 방식으로 UI와 상호 작용할 수 있습니다.

Unity는 개발자가 원활하고 끊김 없는 탐색 환경을 만드는 데 사용할 수 있는 UI 탐색을 위한 몇 가지 기본 제공 시스템을 제공합니다. 이러한 시스템에는 다음이 포함됩니다.

* 선택 가능: 이 시스템을 통해 개발자는 키보드나 게임 패드를 사용하여 선택하고 탐색할 수 있는 UI 요소를 만들 수 있습니다.
* 이벤트 시스템: 이벤트 시스템은 마우스 클릭 및 터치 이벤트와 같은 입력 이벤트를 처리하고 적절한 UI 요소로 라우팅하는 Unity 구성 요소입니다.
* 탐색: 이 시스템을 통해 개발자는 서로 다른 UI 요소 간의 탐색 흐름을 정의할 수 있습니다. 키보드 또는 게임 패드 입력을 사용하여 UI 요소 간 탐색을 허용하도록 설정할 수 있으며, UI 요소 간 탐색 흐름을 정의하도록 설정할 수도 있습니다.
* 캔버스 그룹: 캔버스 그룹을 사용하여 UI 요소를 함께 그룹화하고 가시성, 상호 작용 및 탐색을 제어할 수 있습니다.

이러한 시스템을 함께 사용함으로써 개발자는 탐색 흐름에 대한 높은 수준의 제어를 제공하면서 직관적이고 사용하기 쉬운 UI 탐색 환경을 만들 수 있습니다.

* Unity의 UI 탐색은 광범위한 주제이며 구현 방식은 프로젝트의 특정 요구 사항에 따라 달라집니다.

### Font
#### 배경지식
1. [Unicode range](https://psh10004okpro.com/entry/Unity-%EB%A1%9C%EC%BB%AC%EB%9D%BC%EC%9D%B4%EC%A7%95-TextMeshPro-TMPFont-%ED%95%9C%EA%B5%AD%EC%96%B4-%EC%9D%BC%EB%B3%B8%EC%96%B4-%EC%A4%91%EA%B5%AD%EC%96%B4-%EB%8C%80%ED%91%9C%EB%82%98%EB%9D%BC-%EC%9C%A0%EB%8B%88%EC%BD%94%EB%93%9C-%EB%B2%94%EC%9C%84)

#### Unity Font Asset
1. [Unity Doc Font](https://docs.unity3d.com/kr/current/Manual/class-Font.html)

#### 현지화
##### Unity
1. [유니티 한글, 영어, 일본어 폰트 처리관련](https://202psj.tistory.com/1260)
2. [폰트 교체 없이 현지화](https://opchacha.tistory.com/m/11)
3. [Korean, Japanes localize issue](https://forum.unity.com/threads/korean-japanese-and-chinese-localization-issues.663991/)

#### TMP 태그
[TMP doc](http://digitalnativestudios.com/textmeshpro/docs/rich-text/#mark)

Unity에서 Text Mesh Pro(TMP)를 사용하면 텍스트 내에서 태그를 사용하여 풍부한 서식 옵션을 추가할 수 있습니다. 이러한 태그는 <b> 굵은 텍스트 </b> 또는 <i> 기울임꼴 텍스트 </i> 와 같은 꺾쇠 괄호로 묶여 있습니다 .

TMP에서 지원하는 기본 태그는 다음과 같습니다.

```
<b> 굵은 텍스트 </b>
<i> 기울임꼴 텍스트 </i>
<u> 밑줄이 있는 텍스트 </u>
<s> 취소선 텍스트 </s>
<size=20>크기가 20인 텍스트 </size>
<color=red>빨간색 텍스트 </color>
<material=matname>특정 재료가 있는 텍스트 </material>
<quad material=matname size=10> 특정 재질과 크기의 쿼드를 삽입합니다. </quad>
```

"ITextTagProcessor" 인터페이스를 구현하고 TMP 텍스트 구성 요소에 등록하는 스크립트를 생성하여 TMP에서 사용자 지정 태그를 사용할 수도 있습니다.

다음은 C#을 사용하여 Unity에서 Text Mesh Pro 텍스트 개체에 태그를 추가하는 방법의 예입니다.

```c#
using UnityEngine;
using TMPro;

public class TMPTagExample : MonoBehaviour
{
    public TMP_Text textObject;

    void Start()
    {
        textObject.text = "This is a <color=red>red</color> text with <size=20>big size</size>.";
    }
}
```
textObject이 스크립트는 GameObject에 연결된 TMP_Text 구성 요소가 있고 인스펙터의 변수에 할당했다고 가정합니다 .

다음 코드를 사용하여 런타임에 동적으로 태그를 추가할 수도 있습니다.

```c#
textObject.text = "This is a ";
textObject.text += "<color=red>red</color> text with ";
textObject.text += "<size=20>big size</size>.";
```

다음과 같이 TMP에서 제공하는 방법을 사용할 수도 있습니다.

```c#
textObject.SetText("This is a <color=red>red</color> text with <size=20>big size</size>.", true);
```

위의 코드는 예시일 뿐이며 구현을 위한 시작점으로 사용할 수 있습니다.
