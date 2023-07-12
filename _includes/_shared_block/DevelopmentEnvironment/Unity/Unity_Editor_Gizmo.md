Unity에서 Gizmo는 에디터에서 Scene View 또는 Game View에서 표시되는 3D 오브젝트의 시각적 표시를 말합니다. 개발자들은 기즈모를 사용하여 에디터에서 게임 오브젝트의 위치, 회전, 크기 등을 시각적으로 확인할 수 있습니다.

기즈모는 Unity에서 제공하는 기본 기즈모뿐만 아니라, 개발자가 직접 만들어 사용할 수도 있습니다. 기본 기즈모에는 Transform 기즈모, 카메라 기즈모, 라이트 기즈모, 콜라이더 기즈모 등이 있으며, 개발자가 스크립트를 사용하여 새로운 기즈모를 만들 수도 있습니다.

기즈모는 개발자가 개발 중인 게임을 디버깅하는 데 매우 유용합니다. 개발자는 기즈모를 사용하여 게임 오브젝트가 움직이는 방식을 시각적으로 확인하고, 게임 오브젝트의 상태를 모니터링할 수 있습니다. 게임을 실행하면 기즈모가 비활성화되지만, 개발자가 필요한 경우 기즈모를 켜서 게임을 디버깅할 수 있습니다.

Unity의 기즈모는 게임 개발자들이 게임을 만드는 데 필수적인 도구 중 하나입니다. 기즈모를 사용하면 개발자는 게임 오브젝트의 위치, 회전, 크기 등을 쉽게 확인할 수 있으며, 게임 오브젝트의 상태를 모니터링하여 게임을 디버깅할 수 있습니다.

다음은 기즈모에서 텍스트를 출력하기 위한 방법입니다.
* Handles는 
```c#
#if UNITY_EDITOR
  if ( (Camera.current.transform.position - transform.position).magnitude < 3.0f )
  {
    GUIStyle guiStyle = new GUIStyle();
    guiStyle.normal.textColor = Color.magenta;
    Handles.Label(transform.position + (Vector3.up * 0.05f), gameObject.name, guiStyle);
  }
#endif
```
