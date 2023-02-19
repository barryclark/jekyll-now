[TMP doc](http://digitalnativestudios.com/textmeshpro/docs/rich-text/#mark)

Unity에서 Text Mesh Pro(TMP)를 사용하면 텍스트 내에서 태그를 사용하여 풍부한 서식 옵션을 추가할 수 있습니다. 이러한 태그는 <b> 굵은 텍스트 </b> 또는 <i> 기울임꼴 텍스트 </i> 와 같은 꺾쇠 괄호로 묶여 있습니다 .

* Tag는 `Text Alignment`, `Color`, `Bold and Italic`, `Character Spacing`, `Font`, `Indentation`, `Line Height`, `Line Indentation`, `Text Link`, `Lowercase, Uppercase, and Smallcaps`, `Margin`, `Mark`, `Monospacing`, `Nopars`, `Non-breaking Spaces`, `Page Break`, `Horizontal Position`, `Font size`, `Horizontal Space`, `Sprite`, `Strikethrough and Underline`, `Style`, `Subscript and Superscript`, `Vertical Offset`, `Text Width`가 있습니다.

{% if Verbosity == null or 1 <= Verbosity %}

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
textObject이 스크립트는 GameObject에 연결된 TMP_Text 구성 요소가 있고 인스펙터의 변수에 할당했다고 가정합니다.

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

{% endif %}