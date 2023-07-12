```c#
using System.Collections;
using System.Collections.Generic;
using UnityEditor;
using UnityEditor.Presets;
using UnityEngine;

/// <summary>
/// 프리팹 모드에서 값 변경이 적용되지 않는 문제가 있음.
/// </summary>
public class EditWithScript : MonoBehaviour
{
    [SerializeField] Preset m_colliderPreset;

    [ContextMenu("ApplyPreset")]
    public void ApplyProperty()
    {
        var colliders = GetComponentsInChildren<Collider>();
        foreach (var collider in colliders)
        {
            m_colliderPreset.ApplyTo(collider);
        }
    }
}
```