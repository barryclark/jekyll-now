---
layout: post
title: Inspector & Automation Test
---

## Inspector

- [ ] [Struct로 인스펙터 만들어서 사용하기](https://m.blog.naver.com/tmxk061/221932962240)

[커스텀 인스펙터 생성](https://docs.unity3d.com/kr/2021.2/Manual/UIE-HowTo-CreateCustomInspector.html)

[유니티 인스펙터 설정](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=2983934&logNo=221428284978)

<details><summary>인스펙터 창 여러개 띄우기</summary>
<div markdown="1">

인스펙터창의 목차에서, Add Tab/Inspector 를 클릭하여 다른 인스펙터 창을 띄울 수 있습니다.

</div></details>

## Automation Test

Window/General/Test Runner에서 Unity Automation을 추가할 수 있습니다.

<details><summary>테스트 생성하기</summary>
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