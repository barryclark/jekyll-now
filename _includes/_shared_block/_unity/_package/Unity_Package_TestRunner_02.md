* [Unity 테스트 러너에서 테스트 작성 및 실행](https://docs.unity3d.com/kr/2018.4/Manual/PlaymodeTestFramework.html)

```c#
public class FieldTest
{
    // 테스트는 일반 메서드처럼 동작합니다.
    [Test]
    public void FirstTestSimplePasses()
    {
        // Assert클래스를 사용하여 조건 테스트
				...
    }
}
```

```c#
public class FieldTest
{
    // UnityTest는 플레이모드에서 코루틴처럼 작동합니다.
    // 편집 모드에서 'yield return null;'을 사용하여 프레임을 건너뛸 수 있습니다.
    [UnityTest]
    public IEnumerator FirstTestWithEnumeratorPasses()
    {
        // Assert 클래스를 사용하여 조건을 테스트합니다.
        // yield를 사용하여 프레임을 건너뜁니다.
        yield return null;
    }
}
```

* Editor 폴더를 만들어 테스트를 추가하여 전체 프로젝트의 코드를 테스트할 수 있습니다.

<center><div markdown="1">

![AutomationTest](/images/UnityEditorForTest.png)

</div></center>