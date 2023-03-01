<center><div markdown="1">

![FABRICK](/images/Shared_blcok_Knowledge_InverseKinematics_FABRIK.gif)

</div></center>

다음은 유니티에서 FABRICK에서 forward reaching만 이용한 구현입니다.

```c#
[DisallowMultipleComponent]
public sealed class FABRICK : MonoBehaviour
{
    [SerializeField] private Transform[] m_joints;
    private float[] m_distances;

    private void Awake()
    {
        Initialize();
    }

    private void Update()
    {
        ForIndexFrontCurrent((int index, Transform front, Transform current) => {
            Vector3 vector = (current.position - front.position).normalized;
            current.position = vector * m_distances[index] + front.position;
        });
    }

    private void OnDrawGizmos()
    {
        ForIndexFrontCurrent((int index, Transform front, Transform current) => {
            Gizmos.DrawLine(front.position, current.position);       
        });
    }

    private void Initialize()
    {
        m_distances = new float[m_joints.Length];
        ForIndexFrontCurrent((int index, Transform front, Transform current) => {
            m_distances[index] = Vector3.Distance(front.position, current.position);
        });
    }

    private void ForIndexFrontCurrent(System.Action<int, Transform, Transform> action)
    {
        if (m_joints == null)
        {
            return;
        }

        for (int index = 0; index < m_joints.Length - 1; index++)
        {
            action(index, m_joints[index], m_joints[index + 1]);
        }
    }
}
```