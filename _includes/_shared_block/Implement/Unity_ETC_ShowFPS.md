다음은 우측 상단에 FPS를 표시하는 코드입니다.

```c#
using UnityEngine;
using System.Collections;

[ExecuteAlways]
public class ShowFPS : MonoBehaviour
{
    private float m_deltaTime;
    private float m_fps;


    void Update()
    {
        m_deltaTime += (Time.deltaTime - m_deltaTime) * 0.1f;
        m_fps = 1.0f / m_deltaTime;
    }

    void OnGUI()
    {
        GUI.Label(new Rect(Screen.width - 100, 0, 100, Screen.height), 
            "  FPS : " + m_fps.ToString("F2"));
    }
}
```