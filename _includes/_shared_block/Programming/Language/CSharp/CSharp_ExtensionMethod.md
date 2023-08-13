확장 메서드는 클래스나 구조체의 인스턴스 메서드처럼 호출할 수 있지만, 실제로는 정적(static) 메서드입니다. 확장 메서드를 사용하면, 기존 클래스나 구조체의 기능을 확장하여 새로운 메서드를 추가할 수 있습니다.

위 문법에서 this 키워드는 확장 메서드가 정의되는 클래스나 구조체의 인스턴스를 가리킵니다. 이렇게 정의된 확장 메서드는 해당 클래스나 구조체의 인스턴스에서 호출할 수 있으며, 인스턴스를 다른 매개변수로 전달하는 것이 아니라 인스턴스 자체를 첫 번째 매개변수로 전달합니다.

예를 들어, 다음과 같이 int 형식에 ToSquare 확장 메서드를 정의하면, int 변수에서 ToSquare 메서드를 호출하여 해당 변수의 제곱 값을 반환할 수 있습니다.

```c#
public static class MyExtensions
{
    public static int ToSquare(this int num)
    {
        return num * num;
    }
}

...

int myNumber = 5;
int mySquaredNumber = myNumber.ToSquare(); // mySquaredNumber = 25
```

위 예제에서 ToSquare 메서드는 int 형식에 새로운 기능을 추가하기 위해 정의되었습니다. 이렇게 확장 메서드를 사용하면, 기존 클래스나 구조체를 수정하지 않고도 새로운 기능을 추가할 수 있습니다.

다음은 Extention Method를 활용하여 MonoBehaviour에 추가한 코드입니다.

```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ExtentionMethod : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        this.Test();   
    }
}

public static class Extensions
{
    public static void Test(this ExtentionMethod extentionMethod)
    {
        Debug.Log("Hellow world");
    }
}
```