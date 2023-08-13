<center><div markdown="1">

![TransformTo](\images\Unity_Transform_MoveParent_TransformTo.gif)

</div></center>

TransformTo는 AttachTo의 월드 매트릭스에 자식의 상대 트렌스폼의 역을 곱하여 이동시킵니다.

```c#
    private void TransformTo()
    {
        Matrix4x4 this_relative_inverse = Matrix4x4.TRS(transform.localPosition, transform.localRotation, Vector3.one).inverse;
        Matrix4x4 attached_world = Matrix4x4.TRS(m_attachTo.position, m_attachTo.rotation, Vector3.one);
        Matrix4x4 newParent_world = attached_world * this_relative_inverse;

        m_parent.position = newParent_world.GetPosition();
        m_parent.rotation = newParent_world.rotation;
    }
```