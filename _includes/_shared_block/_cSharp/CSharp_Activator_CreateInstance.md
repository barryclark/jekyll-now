[Activator.CreateInstance](https://learn.microsoft.com/en-us/dotnet/api/system.activator.createinstance?redirectedfrom=MSDN&view=net-7.0#overloads)

`Activator.CreateInstance`메서드는 지정된 유형의 인스턴스를 만드는 .NET Framework의 메서드 중 하나입니다. 이 메서드는 지정된 유형의 인스턴스를 만들고, 반환 타입으로 다시 캐스팅할 수 있습니다.

`Activator.CreateInstance`메서드는 파라미터로 생성할 인스턴스의 Type을 받으며, 이 인스턴스를 만들어 반환합니다. 이 메서드는 클래스의 인스턴스를 만드는 데 자주 사용됩니다. 만약 지정된 클래스가 매개 변수 없는 생성자를 갖고 있지 않으면 MissingMethodException 예외가 발생합니다.

예를 들어, `Activator.CreateInstance(typeof(string))`은 String 클래스의 인스턴스를 생성합니다. `Activator.CreateInstance(typeof(MyClass))`는 MyClass 클래스의 인스턴스를 생성합니다. 생성자의 매개 변수를 전달해야 하는 경우, 해당 생성자에 매개 변수를 전달하여 인스턴스를 만들 수 있습니다.