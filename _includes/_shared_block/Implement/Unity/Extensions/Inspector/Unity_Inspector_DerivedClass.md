BaseData 클래스를 상속하는 DerivedDataA, DerivedDataB 클래스를 정의하고, 이를 사용하는 XChildData 클래스를 정의합니다. XChildData는 SerializeReference를 사용하여 Data 속성을 Serialize 합니다.

InspectorDerivedClass 클래스에서는 XChildData의 리스트를 가지며, OnValidate() 함수에서는 Datas 리스트의 각 XChildData 요소에 대해 해당하는 Data의 타입(Type.StoredType)과 Data의 타입을 비교합니다. 타입이 같은 경우에는 계속 진행하고, 다른 경우 Activator.CreateInstance() 메서드를 사용하여 Type.StoredType에 해당하는 타입의 새로운 인스턴스를 만듭니다.

```c#
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[Serializable]
public abstract class BaseData
{
    public float data;
}

[Serializable]
public class DerivedDataA : BaseData
{
    public string String;
}

[Serializable]
public class DerivedDataB : BaseData
{
    public int Int;
}

public class InspectorDerivedClass : MonoBehaviour
{
    public List<XChildData> Datas = new List<XChildData>();

    private void OnValidate()
    {
        foreach (var data in Datas)
        {
            if (data.Data.GetType() == data.Type.StoredType)
                continue;

            data.Data = Activator.CreateInstance(data.Type.StoredType) as BaseData;
        }
    }

    [Serializable]
    public class XChildData
    {
        public InspectableType<BaseData> Type = new InspectableType<BaseData>(typeof(DerivedDataA));
        [SerializeReference] public BaseData Data;
    }
}
```