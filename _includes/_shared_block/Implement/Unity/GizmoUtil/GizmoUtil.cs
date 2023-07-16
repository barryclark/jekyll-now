using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BaseProduction : MonoBehaviour
{
    [Header("BaseProduction")]
    /// <summary>
    /// <see cref="BaseProduction"/>의 연결입니다.
    /// </summary>
    [SerializeReference] Connection m_connection = new Connection();

    protected virtual void OnDrawGizmos()
    {
        Color lineColor = Color.white;
        Color sphereColor = Color.white;

        float domainSize = 0.1f;

        // 연결된 노드들을 그립니다.
        foreach (var node in m_connection.Linked)
        {
            Gizmos.color = lineColor;

            // 거리를 구합니다.
            float distance = Vector3.Distance(transform.position, node.transform.position);
            // 적당히 나누는 수를 구합니다.
            int count = Mathf.Max(1, (int)(distance / 2));

            Vector3 from = transform.position;
            Vector3 to = node.transform.position;

            // 선을 그립니다.
            GizmosUtil.DrawLine(from, to);

            // 날개를 그립니다.
            GizmosUtil.DividePoints(from, to, count,
                (data) =>
                {
                    GizmosUtil.DrawWing(data.point, node.transform.position);
                },
                includeBegin: false,
                includeEnd: false);
        }

        Gizmos.color = sphereColor;

        // 현재 위치를 나타냅니다.
        GizmosUtil.DrawSphere(transform.position, domainSize);
    }
    
    protected class Connection : Node<BaseProduction> { }
}
