<center><div markdown="1">

![Spline](/images/shared_block_implement_Cable_01.gif)

</div></center>

2023 02 27, 유니티의 SplineMesh 패키지를 이용한 케이블입니다. 시뮬레이션 없이 커넥터를 포트에 연결하는 것을 표현하기 위해서 입니다.

```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[ExecuteAlways]
public class SplineUpdater : MonoBehaviour
{
    [SerializeField] private SplineMesh.Spline m_target;
    [SerializeField] private Transform m_beginTransform;
    [SerializeField] private Transform m_endTransform;

    protected virtual void Update()
    {
        m_target.nodes[0].Position = m_beginTransform.localPosition;
        m_target.nodes[0].Direction = m_beginTransform.localRotation * Vector3.forward + m_beginTransform.localPosition;
        m_target.nodes[0].Up = m_beginTransform.localRotation * Vector3.up;

        m_target.nodes[m_target.nodes.Count - 1].Position = m_endTransform.localPosition;
        m_target.nodes[m_target.nodes.Count - 1].Direction = m_endTransform.localRotation * Vector3.forward * -1 + m_endTransform.localPosition;
        m_target.nodes[m_target.nodes.Count - 1].Up = m_endTransform.localRotation * Vector3.up;
    }
}
```