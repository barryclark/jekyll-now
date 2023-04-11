C#에서는 메서드 호출 시에 파라미터의 이름을 명시하여 전달할 수 있습니다. 이를 "named parameter"라고 부르며, 다음과 같은 문법으로 사용할 수 있습니다.

```csharp
MethodName(paramName1: value1, paramName2: value2, ...);
```

여기서 MethodName은 호출할 메서드의 이름이며, paramName1, paramName2, ...은 메서드의 파라미터 이름입니다. value1, value2, ...은 파라미터에 전달할 값입니다. 예를 들어, 다음과 같은 메서드가 있다고 가정해보겠습니다.

```csharp
public void PrintInfo(string name, int age, string address)
{
    Debug.Log($"Name: {name}, Age: {age}, Address: {address}");
}
```

이 메서드를 named parameter를 사용하여 호출하면 다음과 같이 작성할 수 있습니다.

```csharp
PrintInfo(name: "John", age: 30, address: "123 Main St");
```

named parameter를 사용하면 파라미터의 이름을 명시하여 메서드 호출을 보다 명확하고 가독성 좋게 작성할 수 있습니다. 또한, 호출하는 코드를 작성할 때 파라미터의 순서를 기억하지 않아도 되므로 실수를 줄일 수 있습니다.
