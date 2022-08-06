---
layout: post
title: cpp cast
---

## 캐스팅 (Casting)

[Casting](https://docs.microsoft.com/en-us/cpp/cpp/casting?view=msvc-170)

C++ 언어에서는 클래스가 가상 함수를 포함하는 기본 클래스에서 파생된 경우 해당 기본 클래스 유형에 대한 포인터를 사용하여 파생된 클래스 개체에 있는 가상 함수의 구현을 호출할 수 있습니다. 

* 파생된 클래스는 기본 클래스를 완벽하게 포함하고 있습니다. 따라서 계층 구조 위로 기본 클래스로 캐스팅 하는 것은 안전합니다.
* 기본 클래스에 대한 포인터가 주어지면 포인터를 계층 구조 아래로 캐스팅하는 것이 안전할 수 있습니다. 가리키는 개체가 실제로 기본 클래스에서 파생된 형식이면 안전합니다. 

|**계층구조**|**시각화**|
|---|---|
| &nbsp;&nbsp; ![계층구조](https://docs.microsoft.com/en-us/cpp/cpp/media/vc38zz1.gif?view=msvc-170) &nbsp;&nbsp; | &nbsp;&nbsp; ![시각화](https://docs.microsoft.com/en-us/cpp/cpp/media/vc38zz2.gif?view=msvc-170) &nbsp;&nbsp; |

런타임 유형 정보를 사용하여 포인터가 실제로 완전한 개체를 가리키는지 여부와 계층 구조의 다른 개체를 가리키도록 안전하게 캐스팅될 수 있는지 여부를 확인할 수 있습니다. 

* 가상 함수를 포함하는 클래스를 "다형성 클래스"라고도 합니다.

<details><summary>Run-Time Type Information</summary>
<div markdown="1">

[Run-Time Type Information](https://docs.microsoft.com/en-us/cpp/cpp/run-time-type-information?view=msvc-170)

RTTI(런타임 유형 정보)는 프로그램 실행 중에 개체의 유형을 결정할 수 있도록 하는 메커니즘입니다. RTTI에는 세가지 주요 C++ 언어 요소가 있습니다.

|**language elements** &nbsp;&nbsp;&nbsp;|**info**|
|---|---|
|dynamic_cast|다형성 유형의 변환에 사용됩니다.|
|typeid|개체의 정확한 유형을 식별하는 데 사용됩니다.|
|type_info|typeid연산자 가 반환한 유형 정보를 보유하는 데 사용됩니다.|

</div></details>

<details><summary>다형성</summary>
<div markdown="1">

[다형성](https://docs.microsoft.com/ko-kr/dotnet/csharp/fundamentals/object-oriented/polymorphism)

다형성은 흔히 캡슐화와 상속의 뒤를 이어 개체 지향 프로그래밍의 세 번째 특징으로 일컬어집니다. 다형성은 "여러 형태"를 의미하는 그리스어 단어이며 다음과 같은 두 가지 고유한 측면을 가집니다.

런타임에 파생 클래스의 개체가 메서드 매개 변수 및 컬렉션 또는 배열과 같은 위치에서 기본 클래스의 개체로 처리될 수 있습니다. 이러한 다형성이 발생하면 개체의 선언된 형식이 더 이상 해당 런타임 형식과 같지 않습니다.

기본 클래스는 가상메서드를 정의 및 구현할 수 있으며, 파생 클래스는 이러한 가상 메서드를 재정의할 수 있습니다. 즉, 파생 클래스는 고유한 정의 및 구현을 제공합니다. 런타임에 클라이언트 코드에서 메서드를 호출하면 CLR은 개체의 런타임 형식을 조회하고 가상 메서드의 해당 재정의를 호출합니다. 소스 코드에서 기본 클래스에 대해 메서드를 호출하여 메서드의 파생 클래스 버전이 실행되도록 할 수 있습니다.

</div></details>

## Casting operation (캐스팅 연산자)

[Casting Operators](https://docs.microsoft.com/en-us/cpp/cpp/casting-operators?view=msvc-170)

[When should static_cast, dynamic_cast, const_cast, and reinterpret_cast be used?](https://stackoverflow.com/questions/332030/when-should-static-cast-dynamic-cast-const-cast-and-reinterpret-cast-be-used)

C++ 언어와 관련된 여러 캐스팅 연산자가 있습니다.

* 이러한 연산자는 구식 C 언어 캐스트에 내재된 모호성과 위험을 제거하기 위한 것입니다. 
* 캐스팅(Casting)은 주조라는 의미가 있습니다.

<details><summary>dynamic_cast</summary>
<div markdown="1">

[dynamic_cast operator](https://docs.microsoft.com/en-us/cpp/cpp/dynamic-cast-operator?view=msvc-170)

dynamic_cast는 다형성을 처리하는 데 독점적으로 사용됩니다. 다형성 유형에 대한 포인터 또는 참조를 다른 클래스 유형으로 캐스팅할 수 있습니다(다형성 유형에는 선언되거나 상속된 가상 함수가 하나 이상 있음). 아래로 캐스팅하는 것 이상으로 사용할 수 있습니다. 옆으로 또는 다른 체인 위로 캐스팅할 수도 있습니다. dynamic_cast는 원하는 개체를 찾아 가능한 경우 반환합니다. 그렇지 않으면 포인터의 경우 nullptr을 반환하고 참조의 경우 std::bad_cast를 throw합니다.

그러나 dynamic_cast에는 몇 가지 제한 사항이 있습니다. 상속 계층 구조(소위 'dreaded diamond')에 동일한 유형의 개체가 여러 개 있고 가상 상속을 사용하지 않는 경우에는 작동하지 않습니다. 또한 공개 상속을 통해서만 이동할 수 있습니다. 항상 보호 또는 비공개 상속을 통해 이동할 수 없습니다. 그러나 이러한 형태의 상속은 드물기 때문에 문제가 되는 경우는 드뭅니다.

```
dynamic_cast < type-id > ( expression )
```

dynamic_cast는 런타임에 (동적으로) 상속 계층 관계를 가로지르거나 다운캐스팅시 사용되는 캐스팅 연산자입니다. 즉 기본 클래스 객체에 대한 포인터나 참조자의 타입을 파생 클래, 혹은 형제 클래스의 타입으로 변환해 줍니다.

**dynamic_cast는 런타임에 다형성을 이용하여 모호한 타입 캐스팅을 시도할 때 (다형성 위배), 엉뚱한 변환 결과가 넘어가지 않도록 하여, 런타임 오류가 방지하는 역할을 한다.** 

* **dynamic_cast객체의 동적 유형이 무엇인지 모를 때 유용합니다.**
* dynamic_cast 연산자는 이러한 유형의 캐스트를 만드는 데 사용할 수 있습니다. 또한 안전한 작업을 위해 필요한 런타임 검사를 수행합니다.
* 캐스팅의 실패는 NULL(포인터)이거나 예외(참조자)를 보고 판별할 수 있습니다.
* dynamic_cast는 다형성을 띄지 않은 객체간 변환은 불가능하며, 시도시 컴파일 에러가 발생합니다.
* **C++ RTTI에 의존적이므로, 캐스팅 연산 비용은 꽤나 비싼 편입니다.** 연산 비용은 상속 체계의 복잡도와 깊이가 커지고 깊어질수록 더 증가합니다.

</div></details>

<details><summary>static_cast</summary>
<div markdown="1">

static_cast는 사용을 시도해야 하는 첫 번째 캐스트입니다. 유형 간의 암시적 변환(예: int에서 float 또는 void*에 대한 포인터)과 같은 작업을 수행하고 명시적 변환 함수(또는 암시적 변환 함수)를 호출할 수도 있습니다. 많은 경우에 static_cast를 명시적으로 명시할 필요는 없지만 T(something) 구문은 (T)something과 동일하므로 피해야 합니다(나중에 자세히 설명). 그러나 T(something, something_else)는 안전하고 생성자를 호출하도록 보장됩니다.

static_cast는 상속 계층을 통해 캐스팅할 수도 있습니다. 위쪽으로(기본 클래스 쪽으로) 캐스팅할 때는 필요하지 않지만 아래쪽으로 캐스팅할 때는 가상 상속을 통해 캐스팅하지 않는 한 사용할 수 있습니다. 그러나 검사를 수행하지 않으며 실제로 개체의 유형이 아닌 유형으로 계층 구조를 static_cast하는 것은 정의되지 않은 동작입니다.

* 비다형성 유형의 변환에 사용됩니다.
</div></details>

<details><summary>const_cast</summary>
<div markdown="1">

const_cast는 변수에 const를 제거하거나 추가하는 데 사용할 수 있습니다. 다른 C++ 캐스트는 이를 제거할 수 없습니다(reinterpret_cast도 포함하지 않음). 이전의 const 값을 수정하는 것은 원래 변수가 const인 경우에만 정의되지 않는다는 점에 유의하는 것이 중요합니다. const로 선언되지 않은 것에 대한 참조에서 const를 제거하는 데 사용하면 안전합니다. 이것은 예를 들어 const를 기반으로 멤버 함수를 오버로드할 때 유용할 수 있습니다. 또한 멤버 함수 오버로드를 호출하는 것과 같이 개체에 const를 추가하는 데 사용할 수도 있습니다.

const_cast는 덜 일반적이지만 volatile에서도 유사하게 작동합니다.

* const, volatile및 __unaligned속성 을 제거하는 데 사용됩니다.

</div></details>

<details><summary>reinterpret_cast</summary>
<div markdown="1">

reinterpret_cast는 가장 위험한 캐스트이며 매우 드물게 사용해야 합니다. 한 포인터에서 다른 포인터로 값을 캐스팅하거나 int에 포인터를 저장하거나 기타 모든 종류의 불쾌한 것과 같이 한 유형을 다른 유형으로 직접 바꿉니다. 대체로 reinterpret_cast로 얻을 수 있는 유일한 보장은 일반적으로 결과를 원래 유형으로 다시 캐스트하면 정확히 동일한 값을 얻게 된다는 것입니다(중간 유형이 원래 유형보다 작은 경우는 아님). reinterpret_cast도 할 수 없는 많은 변환이 있습니다. 원시 데이터 스트림을 실제 데이터로 변환하거나 정렬된 데이터에 대한 포인터의 하위 비트에 데이터를 저장하는 것과 같이 특히 이상한 변환 및 비트 조작에 주로 사용됩니다.

비트의 간단한 재해석에 사용됩니다.

</div></details>

<details><summary>safe_cast</summary>
<div markdown="1">

[Is there safe_cast in the standard c++?](https://stackoverflow.com/questions/20313370/is-there-safe-cast-in-the-standard-c)

[safe cast](https://docs.microsoft.com/ko-kr/cpp/extensions/safe-cast-cpp-component-extensions?view=msvc-170)

safe_cast 작업이 성공하면 지정한 식이 지정한 형식으로 반환되고, 실패하면 InvalidCastException이 throw됩니다.

* C++에서는 사용되지 않습니다. 사용할려고 하면, 식별자가 정의되어 있지 않다고 나옵니다.
* C++/CLI에서 검증 가능한 MSIL을 생성하는 데 사용됩니다.

</div></details>


<!--

## standard conversion (표준 변환)
C++ 언어에서는 **기본 형식 간의 변환을 정의합니다. 또한 포인터, 참조 및 멤버 포인터 파생 형식에 대한 변환도 정의합니다.** 이러한 변환을 표준 변환이라고 합니다.

standard conversion은 한 유형을 다른 유형으로 변환할 때 **compiler가 적용할 수 있는 기본 제공 규칙 세트**입니다.

즉... 명시하지 않고 캐스팅 가능하다는 것을 의미합니다.

* Conversion Sequence

<details><summary>컴퓨터 프로세서에 따른 자료형 크기</summary>
<div markdown="1">

| &nbsp;&nbsp; **컴퓨터 프로세서** &nbsp;&nbsp; | &nbsp;&nbsp; **16Bit** &nbsp;&nbsp; | &nbsp;&nbsp; **32비트** &nbsp;&nbsp; | &nbsp;&nbsp; **64비트** &nbsp;&nbsp; |
|---|---|---|---|
|char       |   1Byte|  1Byte|  1Byte|
|short      |   2Byte|  2Byte|  2Byte|
|int        |   2Byte|  4Byte|  4Byte|
|long       |   4Byte|  4Byte|  8Byte|
|long long  |        |  8Byte|>=8Byte|

</div></details>


<details><summary>C-style cast & function style cast</summary>
<div markdown="1">

[캐스팅 연산자](https://docs.microsoft.com/en-us/cpp/cpp/cast-operator-parens?view=msvc-170)

형식 캐스트는 특정 상황에서 개체 형식을 명시적으로 변환하는 방법을 제공합니다.

```
cast-expression: unary-expression
( type-name ) cast-expression
```
컴파일러는 유형 캐스트가 수행된 후 cast-expression유형으로 처리합니다. type-name캐스트를 사용하여 모든 스칼라 유형의 객체를 다른 스칼라 유형으로 또는 그 반대로 변환할 수 있습니다. 명시적 유형 캐스트는 암시적 변환의 효과를 결정하는 동일한 규칙에 의해 제한됩니다. 캐스트에 대한 기타 제한은 특정 유형의 실제 크기 또는 표현으로 인해 발생할 수 있습니다.

```cpp
    i = (int)x;   // assign i the integer part of x
```

[캐스팅 규칙](https://docs.microsoft.com/ko-kr/cpp/cpp/casting-operators?view=msvc-170)

</div></details>

<details><summary>정수 계열 확장</summary>
<div markdown="1">

**정수 형식의 개체는 더 큰 값 집합을 나타낼 수 있는 다른 더 넓은 정수 형식, 즉 형식으로 변환할 수 있습니다.** 이 확대 변환 형식을 '계수 승격'이라고하며, 정수 계수 승격을 사용하면 다른 정수 계수 형식을 사용할 수 있는 모든 곳에서 식에서 다음 형식을 사용할 수 있습니다.

</div></details> 

<details><summary>어떻게 쓰는가?</summary>
<div markdown="1">

```cpp
int i = int(f);
```

함수 스타일 구문에서는 변환을 위해 인수를 둘 이상 지정할 수 있습니다.

</div></details>

<details><summary>캐스트 스타일도 가능하다</summary>
<div markdown="1">

```cpp
float f = (float)i;
```

캐스트 스타일 변환과 함수 스타일 변환 모두 단일 값에서 변환할 때 동일한 결과를 생성합니다.

</div></details>

<details><summary>사용자 정의 형식에서 명시적 형식 변환 연산자</summary>
<div markdown="1">

```cpp
struct Point
{
    Point( short x, short y ) { _x = x; _y = y; }
    ...
    short _x, _y;
};
...
Point pt = Point( 3, 10 );
```

</div></details>

주요 참고자료 : MSDN, 위키피디아, stackoverflow

-->