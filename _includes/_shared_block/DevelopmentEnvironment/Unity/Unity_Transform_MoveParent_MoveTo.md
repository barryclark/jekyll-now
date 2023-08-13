<center><div markdown="1">

![MoveTo](/images/Unity_Transform_MoveParent_MoveTo.gif)

</div></center>

MoveTo는 AttachTo의 월드 좌표에서 자식에서 부모로 떨어진 거리만큼 이동시킵니다.

```c#
    private void MoveTo()
    {
        Vector3 moveToParent = m_parent.position - transform.position;
        m_parent.position = m_attachTo.position + moveToParent;
    }
```