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