다음은 유니티에서 FABRIK을 적용한 알고리즘입니다.

```c#
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using UnityEngine;
using static Robot;

public class RobotTest : MonoBehaviour
{
    [SerializeField] private int m_robotId;
    [SerializeField] private float[] m_degrees;

    [SerializeField] private bool m_useIk = true;
    [SerializeField] private Robot m_robot;
    [SerializeField] private GameObject m_ccdTarget;

    [SerializeField] private Vector3 m_offset;
    [SerializeField] private Vector3 m_euluer;

    void Update()
    {
        //DataManager.Instance.SetRobotData(new XRobotData(m_robotId, m_degrees));

        if (m_useIk)
        {
            var joints = m_robot.Joints;
            // 관절이 해당 포인트에 도착하도록 수정합니다.
            {
                List<XJoint> selectedJoints = new List<XJoint>();
                for (int i = 0; i < 4; i++)
                {
                    selectedJoints.Add(joints[i]);
                }

                Vector3 worldOffset = m_robot.transform.TransformPoint(m_offset);
                for (int i = 0; i < 4; i++)
                    ApplyCCDIK(selectedJoints.AsReadOnly(), m_ccdTarget.transform.position + worldOffset);
            }

            //// 카메라가 항상 정면을 바라보도록 합니다.
            //{
            //    Quaternion rot = joints.Last().Transform.rotation;

            //    Quaternion roll;
            //    Quaternion pitch;
            //    Quaternion yaw;
            //    rot.DecomposeSwingTwist(m_robot.transform.forward, out roll, out pitch /* temp */);
            //    rot.DecomposeSwingTwist(m_robot.transform.right, out pitch, out yaw);

            //    joints[5].Transform.rotation = Quaternion.Inverse(yaw) * joints[5].Transform.rotation;
            //}
        }
    }

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
}
```