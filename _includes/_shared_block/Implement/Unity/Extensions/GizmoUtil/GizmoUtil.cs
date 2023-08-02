using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;
#if UNITY_EDITOR
using UnityEditor;
#endif

public static partial class GizmosUtil
{
    /// <summary>
    /// 두점을 일정한 일정한 간격으로 정해진 수 만큼 나누는 콜벡을 호출합니다.
    /// </summary>
    /// <param name="from"></param>
    /// <param name="to"></param>
    /// <param name="count"></param>
    /// <param name="callback"></param>
    public static void DividePoints(Vector3 from, Vector3 to, int count, Action<(Vector3 point, Vector3 direction)> callback, bool includeBegin = true, bool includeEnd = true)
    {
        Vector3 vector = to - from;
        float distance = vector.magnitude;
        vector.Normalize();

        float stepLength = distance / (float)(count + 1);

        if (includeBegin)
        {
            callback.Invoke((from, vector));
        }
        for (int i = 1; i <= count; i++)
        {
            Vector3 point = from + vector * (i * stepLength);
            callback.Invoke((point, vector));
        }
        if (includeEnd)
        {
            callback.Invoke((to, vector));
        }
    }

    /// <summary>
    /// 구를 그립니다.
    /// </summary>
    /// <param name="position"></param>
    /// <param name="radius"></param>
    public static void DrawSphere(Vector3 position, float radius)
    {
        Gizmos.DrawSphere(position, radius);
    }

    public static void DrawLine(Vector3 from, Vector3 to)
    {
        Gizmos.DrawLine(from, to);
    }

    /// <summary>
    /// 두점을 연결하는 점선을 그립니다.
    /// </summary>
    /// <param name="from"></param>
    /// <param name="to"></param>
    /// <param name="dashLength"></param>
    /// <param name="ratio"></param>
    public static void DrawDashedLine(Vector3 from, Vector3 to, float dashLength = 0.03f, float ratio = 0.5f)
    {
        Vector3 vector = to - from;
        float distance = vector.magnitude;
        vector.Normalize();

        // flaot dashLength;
        float gapLength = dashLength * ratio;
        float stepLength = dashLength + gapLength;

        int dashCount = Mathf.FloorToInt(distance / stepLength);
        float remainingDistance = distance - dashCount * stepLength;

        for (int i = 0; i < dashCount; i++)
        {
            Vector3 dashStart = from + vector * (i * stepLength);
            Vector3 dashEnd = dashStart + vector * dashLength;
            Gizmos.DrawLine(dashStart, dashEnd);
        }

        if (remainingDistance > 0.0f)
        {
            Vector3 lastDashStart = from + vector * (dashCount * stepLength);
            Vector3 lastDashEnd = lastDashStart + vector * remainingDistance;
            Gizmos.DrawLine(lastDashStart, lastDashEnd);
        }
    }

    /// <summary>
    /// 날개를 그립니다.
    /// </summary>
    /// <param name="posiition"></param>
    /// <param name="lookAt"></param>
    /// <param name="arrowLength"></param>
    /// <param name="arrowAngle"></param>
    public static void DrawWing(Vector3 posiition, Vector3 lookAt, float arrowLength = 0.25f, float arrowAngle = 20.0f)
    {
        Vector3 vector = lookAt - posiition;
        vector.Normalize();
;
        Quaternion lookAtRot = Quaternion.LookRotation(vector);

        Vector3 arrowVector1 = (lookAtRot * Quaternion.Euler(0, 180 + arrowAngle, 0)) * Vector3.forward * arrowLength;
        Vector3 arrowVector2 = (lookAtRot * Quaternion.Euler(0, 180 - arrowAngle, 0)) * Vector3.forward * arrowLength;
        
        Gizmos.DrawLine(posiition, posiition + arrowVector1);
        Gizmos.DrawLine(posiition, posiition + arrowVector2);
    }

    public static void DrawText(Vector3 position, string text)
    {
#if UNITY_EDITOR
        var guiStyle = new GUIStyle();
        guiStyle.normal.textColor = Color.magenta;

        DrawText(position, text, guiStyle);
#endif
    }

    public static void DrawText(Vector3 position, string text, GUIStyle guiStyle)
    {
#if UNITY_EDITOR
        Handles.Label(position, text, guiStyle);
#endif
    }
}