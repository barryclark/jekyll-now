<center><div markdown="1">

![Pivot](/images/shared_block_implement_Pivot.gif)

</div></center>

다음은 Pivot의 전체 코드입니다.

```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[DisallowMultipleComponent]
public sealed class Pivot : MonoBehaviour
{
    [SerializeField] private List<Pivot> m_childs;
    private Pivot m_parent = null;

    private void OnValidate()
    {
        ResetPivot();
    }

    private void Awake()
    {
        ResetPivot();
    }

    private void OnDrawGizmos()
    {
        Gizmos.color = Color.green;
        Gizmos.DrawSphere(transform.position, 0.01f);
        Gizmos.color = Color.red;
        Gizmos.DrawLine(transform.position, transform.position + transform.forward * 0.1f);
        Gizmos.color = Color.green;
        Gizmos.DrawLine(transform.position, transform.position + transform.up * 0.1f);
        Gizmos.color = Color.blue;
        Gizmos.DrawLine(transform.position, transform.position + transform.right * 0.1f);

        Gizmos.color = Color.gray;
        foreach (var child in m_childs)
        {
            Gizmos.DrawLine(transform.position, child.transform.position);
        }
    }

    private void ResetPivot()
    {
        m_childs.ForEach(child => { child.m_parent = this; });
    }

    private Pivot GetRoot()
    {
        Pivot rootPivot = this;
        while (rootPivot.m_parent)
        {
            rootPivot = rootPivot.m_parent;
        }
        return rootPivot;
    }

    public void MoveTo(Vector3 position)
    {
        Pivot root = GetRoot();
        Vector3 offset = root.transform.position - transform.position;
        root.transform.position = offset + position;
    }

    public void TransformTo(Vector3 position, Quaternion quaternion)
    {
        Pivot root = GetRoot();

        Matrix4x4 parent_world = Matrix4x4.TRS(root.transform.position, root.transform.rotation, Vector3.one);
        Matrix4x4 this_world = Matrix4x4.TRS(transform.position, transform.rotation, Vector3.one);
        Matrix4x4 this_relative_inverse = (parent_world.inverse * this_world).inverse;
        Matrix4x4 attached_world = Matrix4x4.TRS(position, quaternion, Vector3.one);
        Matrix4x4 newParent_world = attached_world * this_relative_inverse;

        root.transform.position = newParent_world.GetPosition();
        root.transform.rotation = newParent_world.rotation;
    }
}
```

```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[ExecuteAlways]
[DisallowMultipleComponent]
public class PivotTest : MonoBehaviour
{
    [SerializeField] private Pivot m_pivot;

    protected void Update()
    {
        m_pivot.TransformTo(transform.position, transform.rotation);
    }
}

```