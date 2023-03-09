다음은 유니티의 인스펙터에 인터페이스를 노출시키기 위한 코드입니다.

```c#
using UnityEngine;
using UnityEditor;
using System.Linq;

/// <summary>
/// Attribute that require implementation of the provided interface.
/// </summary>
public class RequireInterfaceAttribute : PropertyAttribute
{
    public System.Type requiredType { get; private set; }

    /// <summary>
    /// Requiring implementation of the <see cref="T:RequireInterfaceAttribute"/> interface.
    /// </summary>
    public RequireInterfaceAttribute(System.Type interfaceType)
    {
        this.requiredType = interfaceType;
    }
}

/// <summary>
/// Drawer for the RequireInterface attribute.
/// </summary>
[CustomPropertyDrawer(typeof(RequireInterfaceAttribute))]
public class RequireInterfaceDrawer : PropertyDrawer
{
    /// <summary>
    /// Overrides GUI drawing for the attribute.
    /// </summary>
    public override void OnGUI(Rect position, SerializedProperty property, GUIContent label)
    {
        if (property.propertyType == SerializedPropertyType.ObjectReference)
        {
            var requiredAttribute = this.attribute as RequireInterfaceAttribute;
            EditorGUI.BeginProperty(position, label, property);

            UnityEngine.Object obj = EditorGUI.ObjectField(position, label, property.objectReferenceValue, typeof(UnityEngine.Object), true);
            if (obj is GameObject g) property.objectReferenceValue = g.GetComponent(requiredAttribute.requiredType);
            
            EditorGUI.EndProperty();
        }
        else
        {
            var previousColor = GUI.color;
            GUI.color = Color.red;
            EditorGUI.LabelField(position, label, new GUIContent("Property is not a reference type"));
            GUI.color = previousColor;
        }
    }
}
```

다음은 인터페이스 어트리뷰트를 확인하기 위한 컴포넌트들 입니다.

```c#
public interface IInterface
{
}

public class InterfaceInspector : MonoBehaviour
{
    [Interface(typeof(IInterface))] 
    public MonoBehaviour TestInterface;
}
```

```c#
public class SampleInterfaceComponent : MonoBehaviour, IInterface
{
}
```