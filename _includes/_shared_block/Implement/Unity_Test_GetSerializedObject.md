`[SerializeField] private ...`로 캡슐화된 컴포넌트를 테스트 해야 하지만, 값을 다시 설정하는 메서드를 추가하면 안되는 경우가 있습니다. 이러한 경우 Serialize된 컴포넌트를 테스트하기 위한 방법입니다.

에디터에서 ScriptableObject의 기본값을 설정합니다. 여기서는 테스트용 prefab로 초기화합니다.

* Monobehaviour가 Editor폴더 안에 있는 경우 AddComponent를 사용할 수 없습니다.

```c#
public class TestPrefabScriptableObject : ScriptableObject
{
    public GameObject Prefab;
}
```

다음 테스트 코드에서 해당 프리팹을 **간단히** 가져올 수 있습니다.

```c#
public class TestPrefab
{
    [Test]
    public void TestPrefabSimplePasses()
    {
        var instance = ScriptableObject.CreateInstance<TestPrefabScriptableObject>();
        Debug.Log($"prefab naem : {instance.Prefab.name}");
        Assert.IsNotNull(instance.Prefab);
    }
}
```

다음은 테스트의 결과입니다.

```
 TestPrefabSimplePasses (0.019s)
---
prefab naem : TestPrefabGameObject
```
