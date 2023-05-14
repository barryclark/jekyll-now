어셈블리를 나누지 않은 Editor폴덩서 MonoBehaviour를 테스트하기 위한 방법입니다.

아래와 같은 어떤 컴포넌트가 있다고 합니다.

```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SomeMonobehaviour : MonoBehaviour
{
    public bool IsOnEnableCalled = false;
    public bool IsOnDisableCalled = false;
    public int CountedFrame = 0;

    private void OnEnable()
    {
        IsOnEnableCalled = true;
    }

    private void OnDisable()
    {
        IsOnDisableCalled = true;
    }

    private void Update()
    {
        CountedFrame++;
    }
}
```

아래의 코드로 간단하게 MonoBehaviour를 테스트할 수 있습니다.

```c#
using System.Collections;
using System.Collections.Generic;
using NUnit.Framework;
using UnityEngine;
using UnityEngine.TestTools;

public class MonoBehaviourTest
{
    [UnityTest]
    public IEnumerator MonoBehaviourTestWithEnumeratorPasses()
    {
        GameObject gameObject = new GameObject();

        var component = gameObject.AddComponent<TestSomeMonobehaviour>();
        Assert.IsTrue(component.IsOnEnableCalled, "OnEnable is not called.");
        
        yield return null;
        Assert.IsTrue(component.CountedFrame > 0, "Update is not called.");

        component.enabled = false;
        Assert.IsTrue(component.IsOnDisableCalled, "OnDisable is not called.");
    }

    [ExecuteAlways] // 이 속성이 없다면 Editor모드에서 OnEnable, Update, OnDisable 등이 호출되지 않습니다.
    class TestSomeMonobehaviour : SomeMonobehaviour {}
}

```