C#에서 선택적 매개변수는 메서드나 생성자에서 매개변수를 선언할 때, 해당 매개변수를 생략할 수 있는 기능입니다. 이러한 선택적 매개변수는 매개변수에 기본 값을 설정하여 사용할 수 있습니다.

예를 들어, 다음과 같은 메서드가 있다고 가정해 봅시다.

```c#
public void PrintMessage(string message, string prefix = "Message: ")
{
    Console.WriteLine(prefix + message);
}
```

위의 코드에서 prefix 매개변수에 기본값 "Message: "를 설정했습니다. 이렇게 하면 PrintMessage 메서드를 호출할 때 prefix 매개변수를 생략하면 자동으로 "Message: "가 사용됩니다.

```c#
PrintMessage("Hello"); // 출력: "Message: Hello"
PrintMessage("Hi", "Greetings: "); // 출력: "Greetings: Hi"
```

C# 4.0 이전에는 선택적 매개변수를 구현할 수 없었지만, C# 4.0부터는 이러한 기능을 지원합니다. 선택적 매개변수는 코드를 간결하게 만들어 줄 뿐만 아니라, 오버로드된 메서드를 줄일 수 있어 코드 유지 보수에도 도움이 됩니다.
