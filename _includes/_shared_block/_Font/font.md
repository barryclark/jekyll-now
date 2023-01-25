## Font
### 배경지식
1. [Unicode range](https://psh10004okpro.com/entry/Unity-%EB%A1%9C%EC%BB%AC%EB%9D%BC%EC%9D%B4%EC%A7%95-TextMeshPro-TMPFont-%ED%95%9C%EA%B5%AD%EC%96%B4-%EC%9D%BC%EB%B3%B8%EC%96%B4-%EC%A4%91%EA%B5%AD%EC%96%B4-%EB%8C%80%ED%91%9C%EB%82%98%EB%9D%BC-%EC%9C%A0%EB%8B%88%EC%BD%94%EB%93%9C-%EB%B2%94%EC%9C%84)

### Unity Font Asset
1. [Unity Doc Font](https://docs.unity3d.com/kr/current/Manual/class-Font.html)

### 현지화
#### Unity
1. [유니티 한글, 영어, 일본어 폰트 처리관련](https://202psj.tistory.com/1260)
2. [폰트 교체 없이 현지화](https://opchacha.tistory.com/m/11)
3. [Korean, Japanes localize issue](https://forum.unity.com/threads/korean-japanese-and-chinese-localization-issues.663991/)

### TMP 태그
[TMP doc](http://digitalnativestudios.com/textmeshpro/docs/rich-text/#mark)

Unity에서 Text Mesh Pro(TMP)를 사용하면 텍스트 내에서 태그를 사용하여 풍부한 서식 옵션을 추가할 수 있습니다. 이러한 태그는 <b> 굵은 텍스트 </b> 또는 <i> 기울임꼴 텍스트 </i> 와 같은 꺾쇠 괄호로 묶여 있습니다 .

TMP에서 지원하는 기본 태그는 다음과 같습니다.

<b> 굵은 텍스트 </b>
<i> 기울임꼴 텍스트 </i>
<u> 밑줄이 있는 텍스트 </u>
<s> 취소선 텍스트 </s>
<size=20>크기가 20인 텍스트 </size>
<color=red>빨간색 텍스트 </color>
<material=matname>특정 재료가 있는 텍스트 </material>
<quad material=matname size=10> 특정 재질과 크기의 쿼드를 삽입합니다. </quad>

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

다음과 같이 TMP에서 제공하는 방법을 사용할 수도 있습니다.textObject.SetText("This is a <color=red>red</color> text with <size=20>big size</size>.", true);

위의 코드는 예시일 뿐이며 구현을 위한 시작점으로 사용할 수 있습니다.
