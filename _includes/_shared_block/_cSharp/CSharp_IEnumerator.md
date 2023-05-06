IEnumerator는 C#에서 반복 가능한 컬렉션을 다루기 위한 인터페이스입니다. IEnumerator 인터페이스는 MoveNext(), Reset(), Current 등의 멤버를 포함하고 있습니다.

IEnumerable 인터페이스를 구현하는 컬렉션 객체에서 GetEnumerator() 메서드를 호출하면 IEnumerator 인터페이스를 구현한 객체가 반환됩니다. 이 객체는 MoveNext() 메서드를 사용하여 컬렉션의 요소를 하나씩 순회하면서 Current 속성으로 현재 요소를 반환합니다. MoveNext() 메서드는 다음 요소가 있으면 true를 반환하고, 요소가 없으면 false를 반환합니다.

IEnumerator 인터페이스는 foreach 루프를 사용하여 컬렉션의 모든 요소에 접근하는 데 사용됩니다. foreach 루프에서는 IEnumerator 인터페이스를 구현한 객체의 GetEnumerator() 메서드가 자동으로 호출되며, MoveNext()와 Current 속성을 사용하여 컬렉션의 요소에 접근할 수 있습니다.

예를 들어, List<T> 클래스는 IEnumerable<T> 인터페이스를 구현하고 있으며, GetEnumerator() 메서드를 호출하면 List<T>.Enumerator 구조체를 반환합니다. 이 구조체는 IEnumerator<T> 인터페이스를 구현하고 있으며, MoveNext()와 Current 속성을 사용하여 List<T>의 요소에 접근할 수 있습니다.
