[Boxing 및 Unboxing(C# 프로그래밍 가이드)](https://learn.microsoft.com/ko-kr/dotnet/csharp/programming-guide/types/boxing-and-unboxing)

Boxing은 `값 형식`을 `object`형식 또는 이 값 형식에서 구현된 임의의 인터페이스 형식으로 변환하는 프로세스입니다. CLR(공용 언어 런타임)은 값 형식을 boxing할 때 값을 System.Object 인스턴스 내부에 래핑하고 관리되는 힙에 저장합니다. Unboxing하면 개체에서 값 형식이 추출됩니다. Boxing은 암시적이며 Unboxing은 명시적입니다.

값형이 참조형으로 바뀔 때, 스택에 있는 값으 복사하여 힙에 할당시키게 되고, 언박싱시 다시 스택에 가져오는 작업을 하면서 힙에 가비지가 쌓이게 됩니다.

[Why do i need boxing, unboxing](https://stackoverflow.com/questions/2111857/why-do-we-need-boxing-and-unboxing-in-c)

`object`형 배열을 통해 서로 다른 형식의 값을 저장할 수 있습니다. 하지만 제네릭(generic)로 대신할 수 있습니다.

[Is casting to an interface a boxing conversion](https://stackoverflow.com/questions/3101909/is-casting-to-an-interface-a-boxing-conversion)

복싱은 value type을 type object 또는 이것에 의해 구현된 모든 인터페이스 유형 값 형식입니다. CLR이 값을 boxing하는 경우 type이면, 값을 System.Object를 만들고 관리되는 힙. Unboxing은 값 형식입니다.