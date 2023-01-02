---
layout: post
title: Debug, Test
---

## Debug & Exception

일반적으로 레퍼런스가 깨져있는지 검사하고 로그를 찍는 것은 실제로 함수가 호출될 때 사용됩니다.

* Component가 시작할 때 레퍼런스를 검사하면, 오류가 많이 떠 알아보기 힘들 수 있습니다.
* 시작할 때, 컴포넌트가 없고 이후에 생성되서 추가되는 경우가 있습니다.

throw exception 하고, 메시지를 넣으면 Unity에서 오류 메시지가 뜹니다. **반드시 지켜야 되는 수준일 경우 예외 처리를 하도록 합니다.**

## Automation Test

<center><div markdown="1">

![AutomationTest](/images/UnityTestRunner.png)

</div></center>

Window/General/Test Runner에서 Unity Automation을 추가할 수 있습니다.

<details><summary>테스트 코드 예시</summary>
<div markdown="1">

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

</div></details>

<details><summary>Assembly-CSharp-Editor</summary>
<div markdown="1">

<center><div markdown="1">

![AutomationTest](/images/UnityEditorForTest.png)

</div></center>

Editor 폴더를 만들어 테스트를 추가하여 전체 프로젝트의 코드를 테스트할 수 있습니다.

</div></details>