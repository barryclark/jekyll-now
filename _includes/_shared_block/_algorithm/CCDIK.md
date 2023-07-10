다음은 CCDIK를 c#으로 구현한 예제 입니다.

```c#
    void ApplyCCDIK(ReadOnlyCollection<Robot.XJoint> joints, Vector3 targetWorldPosition)
    {
        var joint = joints.Last();

        for (int j = joints.Count - 2; j >= 0; j--)
        {
            var childJoint = joints[j];

            Vector3 childWorldAxis = childJoint.Transform.TransformVector(childJoint.Axis);
            Plane plane = new Plane(childWorldAxis, Vector3.zero);

            Vector3 childToTarget = plane.ClosestPointOnPlane(targetWorldPosition - childJoint.Transform.position);
            Vector3 childToJoint = plane.ClosestPointOnPlane(joint.Transform.position - childJoint.Transform.position);

            float angle = Vector3.SignedAngle(childToJoint, childToTarget, childWorldAxis);
            Quaternion rotation = Quaternion.AngleAxis(angle, childWorldAxis);

            childJoint.Rotation += angle;

            Quaternion swing;
            Quaternion twist;
            childJoint.Transform.localRotation.DecomposeSwingTwist(childJoint.Axis, out swing, out twist);
            childJoint.Transform.localRotation = swing * Quaternion.AngleAxis(childJoint.Rotation, childJoint.Axis);
        }
    }
```
