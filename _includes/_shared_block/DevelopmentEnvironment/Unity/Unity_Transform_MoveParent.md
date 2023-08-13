다음은 전체 코드입니다.

```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[ExecuteAlways]
public class MoveParent : MonoBehaviour
{
    public enum Strategy
    { 
        MoveTo,
        TransformTo,
    }

    [SerializeField] private Strategy m_strategy;
    [SerializeField] private Transform m_attachTo;
    [SerializeField] private Transform m_parent;

    private void Update()
    {
        switch (m_strategy)
        {
            case Strategy.MoveTo:
                MoveTo();
                break;
            case Strategy.TransformTo:
                TransformTo();
                break;
        }
    }

    private void MoveTo()
    {
        Vector3 moveToParent = m_parent.position - transform.position;
        m_parent.position = m_attachTo.position + moveToParent;
    }

    private void TransformTo()
    {
        Matrix4x4 this_relative_inverse = Matrix4x4.TRS(transform.localPosition, transform.localRotation, Vector3.one).inverse;
        Matrix4x4 attached_world = Matrix4x4.TRS(m_attachTo.position, m_attachTo.rotation, Vector3.one);
        Matrix4x4 newParent_world = attached_world * this_relative_inverse;

        m_parent.position = newParent_world.GetPosition();
        m_parent.rotation = newParent_world.rotation;
    }
}

```