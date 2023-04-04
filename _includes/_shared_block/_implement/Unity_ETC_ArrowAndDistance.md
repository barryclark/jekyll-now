<center><div markdown="1">

![ArrowAndDistance](/images/shared_block_implement_ArrowAndDistance.gif)

</div></center>

넓이를 가져와 Text에 업데이트 하며, 화살표와 이미지는 앵커를 이용하여 조절되는 구현입니다. 다음 ArrowAndDistance의 전체 코드입니다.

```c#
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

[DisallowMultipleComponent]
[ExecuteInEditMode]
public class ArrowAndDistanceComponent : MonoBehaviour
{
    [Header("ArrowAndDistanceComponent")]
    [SerializeField] private TextMeshProUGUI m_text;
    private RectTransform m_rectTransform;

    private void OnValidate()
    {
        Reset();
    }
    private void Awake()
    {
        Reset();
    }

    public void Update()
    {
        UpdateDistanceText();
    }

    private void Reset()
    {
        m_rectTransform = GetComponent<RectTransform>();
    }
    
    private void UpdateDistanceText()
    {
        m_text.text = m_rectTransform.rect.width.ToString();
    }
}
```