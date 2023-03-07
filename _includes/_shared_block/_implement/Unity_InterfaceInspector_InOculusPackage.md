다음은 유니티의 인스펙터에 인터페이스를 노출시키기 위한 코드입니다.

```c#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using UnityEditor;
using UnityEngine;

/// <summary>
/// 이 어트리뷰트가 유니티 오브젝트 내의 MonoBehaviour 필드에 부착되면,
/// 특정 유형의 MonoBehaviour만이 부착될 수 있도록 인터페이스를 지정할 수 있게 됩니다.
/// </summary>
public class InterfaceAttribute : PropertyAttribute
{
    public Type[] Types = null;
    public string TypeFromFieldName;

    public InterfaceAttribute(Type type, params Type[] types)
    {
        Types = new Type[types.Length + 1];
        Types[0] = type;
        for (int i = 0; i < types.Length; i++)
        {
            Types[i + 1] = types[i];
        }
    }

    public InterfaceAttribute(string typeFromFieldName)
    {
        this.TypeFromFieldName = typeFromFieldName;
    }
}


/// <summary>
/// 이 프로퍼티 드로어는 인터페이스 지원 구현의 핵심입니다. 
/// 이 속성(Attribute)이 부여된 필드의 값이 변경될 때, 새 값은 예상 인터페이스에 대해 테스트됩니다. 
/// 컴포넌트가 일치하는 경우, 새 값이 허용됩니다. 그렇지 않으면, 이전 값이 유지됩니다.
/// </summary>
[CustomPropertyDrawer(typeof(InterfaceAttribute))]
public class InterfaceDrawer : PropertyDrawer
{
    public override void OnGUI(Rect position, SerializedProperty property, GUIContent label)
    {
        if (property.serializedObject.isEditingMultipleObjects) return;

        if (property.propertyType != SerializedPropertyType.ObjectReference)
        {
            EditorGUI.LabelField(position, label.text, "InterfaceType Attribute can only be used with MonoBehaviour Components.");
            return;
        }

        EditorGUI.BeginProperty(position, label, property);

        Type[] attTypes = GetInterfaceTypes(property);

        // Pick a specific component
        MonoBehaviour oldComponent = property.objectReferenceValue as MonoBehaviour;
        string oldComponentName = "";

        GameObject temporaryGameObject = null;

        string attTypesName = GetTypesName(attTypes);
        if (Event.current.type == EventType.Repaint)
        {
            if (oldComponent == null)
            {
                temporaryGameObject = new GameObject("None (" + attTypesName + ")");
                oldComponent = temporaryGameObject.AddComponent<InterfaceMono>();
            }
            else
            {
                oldComponentName = oldComponent.name;
                oldComponent.name = oldComponentName + " (" + attTypesName + ")";
            }
        }

        Component currentComponent = EditorGUI.ObjectField(position, label, oldComponent, typeof(Component), true) as Component;
        MonoBehaviour currentMono = currentComponent as MonoBehaviour;

        if (Event.current.type == EventType.Repaint)
        {
            if (temporaryGameObject != null)
                GameObject.DestroyImmediate(temporaryGameObject);
            else
                oldComponent.name = oldComponentName;
        }

        // If a component is assigned, make sure it is the interface we are looking for.
        if (currentMono != null)
        {
            // Make sure component is of the right interface
            if (!IsAssignableFromTypes(currentMono.GetType(), attTypes))
                // Component failed. Check game object.
                foreach (Type attType in attTypes)
                {
                    currentMono = currentMono.gameObject.GetComponent(attType) as MonoBehaviour;
                    if (currentMono == null)
                    {
                        break;
                    }
                }

            // Item failed test. Do not override old component
            if (currentMono == null)
            {
                if (oldComponent != null && !IsAssignableFromTypes(oldComponent.GetType(), attTypes))
                {
                    temporaryGameObject = new GameObject("None (" + attTypesName + ")");
                    MonoBehaviour temporaryComponent = temporaryGameObject.AddComponent<InterfaceMono>();
                    currentMono = EditorGUI.ObjectField(position, label, temporaryComponent, typeof(MonoBehaviour), true) as MonoBehaviour;
                    GameObject.DestroyImmediate(temporaryGameObject);
                }
            }
        }
        else if (currentComponent is Transform)
        {
            // If assigned component is a Transform, this means a GameObject was dragged into the property field.
            // Find all matching components on the transform's GameObject and open the picker window.

            List<MonoBehaviour> monos = new List<MonoBehaviour>();
            monos.AddRange(currentComponent.gameObject.GetComponents<MonoBehaviour>().
                Where((mono) => IsAssignableFromTypes(mono.GetType(), attTypes)));

            if (monos.Count > 1)
            {
                EditorApplication.delayCall += () => InterfacePicker.Show(property, monos);
            }
            else
            {
                currentMono = monos.Count == 1 ? monos[0] : null;
            }
        }

        if (currentComponent == null || currentMono != null)
        {
            property.objectReferenceValue = currentMono;
        }

        EditorGUI.EndProperty();
    }

    private bool IsAssignableFromTypes(Type source, Type[] targets)
    {
        foreach (Type t in targets)
        {
            if (!t.IsAssignableFrom(source))
            {
                return false;
            }
        }

        return true;
    }

    private static string GetTypesName(Type[] attTypes)
    {
        if (attTypes.Length == 1)
        {
            return GetTypeName(attTypes[0]);
        }

        string typesString = "";
        for (int i = 0; i < attTypes.Length; i++)
        {
            if (i > 0)
            {
                typesString += ", ";
            }

            typesString += GetTypeName(attTypes[i]);
        }

        return typesString;
    }

    private static string GetTypeName(Type attType)
    {
        if (!attType.IsGenericType)
        {
            return attType.Name;
        }

        var genericTypeNames = attType.GenericTypeArguments.Select(GetTypeName);
        return $"{attType.Name}<{string.Join(", ", genericTypeNames)}>";
    }

    private Type[] GetInterfaceTypes(SerializedProperty property)
    {
        InterfaceAttribute att = (InterfaceAttribute)attribute;
        Type[] t = att.Types;
        if (!String.IsNullOrEmpty(att.TypeFromFieldName))
        {
            var thisType = property.serializedObject.targetObject.GetType();
            while (thisType != null)
            {
                var referredFieldInfo = thisType.GetField(att.TypeFromFieldName,
                    BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance);
                if (referredFieldInfo != null)
                {
                    t = new Type[1] { referredFieldInfo.FieldType };
                    break;
                }

                thisType = thisType.BaseType;
            }
        }

        return t ?? singleMonoBehaviourType;
    }

    private static readonly Type[] singleMonoBehaviourType = new Type[1] { typeof(MonoBehaviour) };
}
public sealed class InterfaceMono : MonoBehaviour { }

public class InterfacePicker : EditorWindow
{
    private class MonoInspector
    {
        public readonly MonoBehaviour Mono;
        public readonly Editor Editor;

        public MonoInspector(MonoBehaviour mono)
        {
            Mono = mono;
            Editor = Editor.CreateEditor(mono);
        }

        public void Destroy()
        {
            DestroyImmediate(Editor);
        }
    }

    private static class GUIStyles
    {
        public static readonly GUIStyle Default;
        public static readonly GUIStyle Window;
        public static readonly GUIStyle Inspector;

        private static readonly RectOffset padding =
            new RectOffset(EDGE_PADDING_PX,
                           EDGE_PADDING_PX,
                           EDGE_PADDING_PX,
                           EDGE_PADDING_PX);

        static GUIStyles()
        {
            Default = new GUIStyle();
            Window = new GUIStyle(Default);
            Window.padding = padding;
            Inspector = new GUIStyle(GUI.skin.window);
            Inspector.padding = padding;
        }
    }

    private const float SELECT_BUTTON_HEIGHT_PX = 32f;
    private const float LABEL_COLUMN_RATIO = 0.4f;
    private const int EDGE_PADDING_PX = 8;

    public static bool AnyOpen => HasOpenInstances<InterfacePicker>();

    private UnityEngine.Object _target;
    private string _propertyPath;
    private List<MonoInspector> _monoInspectors;
    private Vector2 _scrollPos = Vector2.zero;

    public static void Show(SerializedProperty prop, List<MonoBehaviour> monos)
    {
        if (monos == null ||
            monos.Count == 0 ||
            prop == null)
        {
            return;
        }

        InterfacePicker picker = GetWindow<InterfacePicker>(true);

        picker._propertyPath = prop.propertyPath;
        picker._target = prop.serializedObject.targetObject;
        picker._monoInspectors?.ForEach((mi) => mi.Destroy());
        picker._monoInspectors = new List<MonoInspector>();
        picker.titleContent = new GUIContent(monos[0].gameObject.name);
        monos.ForEach((m) => picker._monoInspectors.Add(new MonoInspector(m)));

        picker.ShowUtility();
    }

    private void OnGUI()
    {
        if (_target == null)
        {
            Close();
            return;
        }

        Prune();
        DrawAll();
    }

    private void OnDestroy()
    {
        _monoInspectors.ForEach((mi) => mi.Destroy());
    }

    private void Prune()
    {
        _monoInspectors.FindAll((m) => m.Mono == null).ForEach((mi) =>
        {
            _monoInspectors.Remove(mi);
            mi.Destroy();
        });
    }

    private void DrawAll()
    {
        _scrollPos = EditorGUILayout.BeginScrollView(_scrollPos, GUIStyles.Window);
        foreach (var monoInspector in _monoInspectors)
        {
            EditorGUILayout.Separator();
            EditorGUILayout.BeginVertical(GUIStyles.Inspector);
            DrawHeader(monoInspector);
            EditorGUILayout.Separator();
            DrawComponent(monoInspector);
            EditorGUILayout.EndVertical();
        }
        GUILayout.FlexibleSpace();
        EditorGUILayout.EndScrollView();
    }

    private void DrawHeader(MonoInspector monoInspector)
    {
        if (GUILayout.Button($"{monoInspector.Mono.GetType().Name}",
            GUILayout.Height(SELECT_BUTTON_HEIGHT_PX)))
        {
            Apply(monoInspector.Mono);
            Close();
        }
    }

    private void DrawComponent(MonoInspector monoInspector)
    {
        GUI.enabled = false;
        EditorGUIUtility.labelWidth = position.width * LABEL_COLUMN_RATIO;
        monoInspector.Editor.OnInspectorGUI();
        GUI.enabled = true;
    }

    private void Apply(MonoBehaviour mono)
    {
        SerializedProperty property =
            new SerializedObject(_target).FindProperty(_propertyPath);
        property.objectReferenceValue = mono;
        property.serializedObject.ApplyModifiedProperties();
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