SaveHelper는 파일을 저장하는데 사용됩니다.

아래의 샘플 코드는 Application.dataPath의 상위 폴더(실행 파일 위치)에 SavedData 폴더를 만들고 .csv 확장자 형식의 테스트 데이터를 저장합니다.

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/ac25f51f-b5a1-4163-ace6-e17171b080c6)

```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Test : MonoBehaviour
{
    public void Start()
    {
        SaveFileTest();
    }

    [ContextMenu("SaveFileTest")]
    void SaveFileTest()
    {
        string path = Application.dataPath.Upper() + "/SavedData";
        SaveHelper.CheckPath(path, true);

        string data = "data test";
        SaveHelper.SaveFile(path, $"Data.csv", data);
    }
}
```
