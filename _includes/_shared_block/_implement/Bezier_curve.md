<center><div markdown="1">

![Bezier Curve](/images/Shared_block_Knowledge_Mathmatics_Bezier_curve.gif)

</div></center>

다음은 전체 코드입니다.

```c#
[ExecuteAlways]
public class BezierCurve : MonoBehaviour
{
    [SerializeField] private Vector3 m_point1;
    [SerializeField] private Vector3 m_point2;
    [SerializeField] private Vector3 m_point3;
    
    [Range(0f, 1f)]
    [SerializeField] private float m_lerp;

    private void OnDrawGizmosSelected()
    {
        Vector3 point1 = transform.TransformPoint(m_point1);
        Vector3 point2 = transform.TransformPoint(m_point2);
        Vector3 point3 = transform.TransformPoint(m_point3);
        Vector3 lerp1 = Vector3.Lerp(point1, point2, m_lerp);
        Vector3 lerp2 = Vector3.Lerp(point2, point3, m_lerp);
        Vector3 lerp = Vector3.Lerp(lerp1, lerp2, m_lerp);
        Gizmos.DrawSphere(point1, 0.01f);
        Gizmos.DrawSphere(point2, 0.01f);
        Gizmos.DrawSphere(point3, 0.01f);

        Gizmos.color = Color.gray;
        Gizmos.DrawLine(point1, point2);
        Gizmos.DrawLine(point2, point3);
        Gizmos.DrawLine(lerp1, lerp2);

        Gizmos.color = Color.red;
        Gizmos.DrawLine(point1, lerp1);
        Gizmos.DrawLine(point2, lerp2);
        Gizmos.DrawSphere(lerp1, 0.01f);
        Gizmos.DrawSphere(lerp2, 0.01f);

        Gizmos.color = Color.blue;
        Gizmos.DrawLine (lerp1, lerp);
        Gizmos.DrawSphere(lerp, 0.02f);
    }
}
```