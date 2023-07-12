[SerializeReference](https://docs.unity3d.com/ScriptReference/SerializeReference.html)

SerializeReference는 Unity에서 사용되는 속성(Attribute) 중 하나로, ScriptableObject, MonoBehaviour 및 UnityEngine.Object를 상속하는 다른 모든 클래스에 대해 시리얼라이즈(Serialize)를 가능하게 해줍니다.

SerializeReference 속성을 사용하면 다음과 같은 이점이 있습니다.

다양한 클래스 유형을 참조할 수 있습니다.
인스턴스가 유지되면서 참조가 유지됩니다.
스크립트 뷰어에서 참조 유형을 볼 수 있습니다.
SerializeReference는 Unity 2019.3 버전 이상에서 사용할 수 있으며, Unity가 오브젝트를 직렬화(Serialization)할 때 참조된 오브젝트의 유형을 저장합니다. 이 속성을 사용하면 런타임(Run time) 중에 객체의 유형을 변경할 수 있으며, Unity 에디터(Editor)에서 해당 객체를 수정할 수 있습니다.