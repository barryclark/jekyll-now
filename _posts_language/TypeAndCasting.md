---
layout: post
title: Type and Casting
---

## 소수점
[부동 소수점 연산. 단정밀도와 배정밀도의 차이](https://gigglehd.com/gg/hard/5427559)
### 고정 소수점
#### 부동소수점
부동소수점(浮動小數點, floating point) 또는 떠돌이 소수점 방식은 실수를 컴퓨터상에서 근사하여 표현할 때 소수점의 위치를 고정하지 않고 그 위치를 나타내는 수를 따로 적는 것으로, 유효숫자를 나타내는 가수(假數)와 소수점의 위치를 풀이하는 지수(指數)로 나누어 표현한다.

컴퓨터에서는 고정 소수점 방식보다 넓은 범위의 수를 나타낼 수 있어 과학기술 계산에 많이 이용되지만, 근삿값으로 표현되며 고정 소수점 방식보다 연산 속도가 느리기 때문에 별도의 전용 연산 장치를 두는 경우가 많다. 고정 소수점과 달리 정수 부분과 소수 부분의 자릿수가 일정하지 않으나, 유효 숫자의 자릿수는 정해져 있다.

* 부동소수점 활용에 관련해서 찾아볼 필요가 있습니다.

**어떻게 계산하는가?**
예를 들어, 십진수 21.8125를 정규화된 이진수로 나타낸다고 해보자. 소수점 위의 (21.)10=(10101)2이고, 소수점 아래 (0.8125)10=(1101)2이다. 즉 (21.8125)10=(10101.1101)2이며, 이를 정규화하면 0.101011101×25이다. 지수의 5를 이진법으로 바꾸면 101이다. 따라서, 32비트 정규화된 부동소수점수로 나타낸다면 맨 앞 비트의 부호는 0(양)이고, 지수부 부호는 0(양)이며, 지수부 나머지 6개 비트는 000101, 가수부는 101011101000…이 된다. 이것을 결합하면 (0000001011010111010000000000000000)2가 된다.

### 부동 소수점 연산. 단정밀도와 배정밀도의 차이
#### 계산식의 자리수를 억제, 부동 소수점
컴퓨터는 숫자를 연산할 때 정수 연산과 소수 연산의 2가지로 나눠 구현합니다. 이건 '처리해야 하는 숫자의 자리수'가 매번 다르기 때문입니다. 

#### 왜 부동소수점을 쓰는가?
정수는 보통 10자리 정도면 충분합니다. 대규모 기업의 회계 처리라면 10자리로도 부족하지만 그런 경우는 많지 않겠지요. 그러나 소수는 필요한 자리수가 매번 다릅니다. 옐르 들어 백만원이라면 7자리인데 여기에 할푼리가 붙으면 9자리 10자리가 됩니다. 

이 경우 정수 8자리에 소수 2자리 정도면 되지만, 어떤 경우에는 정수는 2자리면 족한데 소수가 5자리 필요한 경우도 있습니다. 이들 모두를 맞추려면 13자리 가지고선 부족하며 더 많은 자리수가 필요하게 됩니다.

이렇게 만들면 항상 다 쓰지도 않는 자리수 때문에 너무 많은 공간을 할애하게 되니, 소수를 다룰 때는 부동 소수점이라는 방식을 쓰게 됐습니다. 예를 들어 123456.789라는 숫자를 다룰 경우 이렇게 데이터를 저장합니다.
 
## 부동소수점 표현 방식

|분류|값|설명|
|---|---|---|
|**123456.789의 표시 방식**|||
|기존의 방식(고정 소수점 방식)   | 123456.789	         |정수 부분 6자리 + 소수 3자리   |
|부동 소수점 방식	            | 1.23456789 × 10 5	    |가수 부분 9자리 + 지수 1자리   |
|**12345678.9의 경우**|||
|고정 소수점 방식	            |12345678.9	            |정수 부분 8자리 + 소수 1자리   |
|부동 소수점 방식	            |1.23456789 × 10 8	    |가수 부분 9자리 + 지수 1자리   |
|**1.23456789의 경우**|||
|고정 소수점 방식	            |1.23456789	            |정수 부분 1자리 + 소수 8자리   |
|부동 소수점 방식	            |1.23456789 × 10 0	    |가수 부분 9자리 + 지수 1자리   |
 

고정 소수점 방식으로는 1.23456789 ~ 12345678.9까지의 모든 숫자를 처리하기 위해 정수 부분 8 자리 + 소수 8 자리가 필요합니다. 하지만 부동 소수점 방식에선 가수 부분(1.23456789를 저장하는 곳)이 9자리, 지수(10의 제곱을 저장하는 자리) 1자리니까 총 10자리입니다.

다루는 값의 범위가 엄격하게 정해져 있고, 이게 변하지 않는다면 고정 소수점 방식이 나쁘지 않습니다. 오히려 편하지요. 하지만 **어떤 값이 나올지 예상하지 못하는 경우가 많으며, 이 경우에는 부동 소수점이 더 작은 공간을 차지합니다.**

#### 숫자 표현은 반정밀도에서 8배정밀도까지
#### 기본이 되는 단 정밀도 부동 소수점 연산, 2진수를 10진수로 변환하면 오차가 생겨남
#### 정확도 향상의 댓가는 느린 연산 속도
단정밀도와 배정밀도를 비교하면 배정밀도가 2~4배 정도 느려집니다. 이건 처리해야 할 데이터의 양이 배로 늘어마면서, 덧셈은 2배, 곱셈은 4배가 느려졌기 때문입니다. 구체적으로 얼마가 느려지는지는 구현 방법에 따라 다릅니다. 예전의 x86처럼 64비트 연산에 32비트 연산기를 사용할 경우엔 64비트 곱셉이 32비트 곱셈을 4번 수행하고 여기에 32비트를 더해야 하니까 5배 이상 느려지기도 했습니다. 

**그래서 정확도는 적당한 수준이면 되니 빠른 연산이 필요한 경우에는 배정밀도가 맞지 않습니다. 이를 극단적으로 추구한 것이 3D그래픽과 Z 버퍼**, 머신 러닝에 쓰이는 CNN(Convolutional Neural Network)의 처리입니다.

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

```cpp
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

* 암시적 형변환은 자동적으로 캐스팅 되는 것을 말합니다.
* 명시적 형변환은 프로그래머가 형변환을 직접 나타낸 것을 의미합니다.
  * 포인터의 경우 모든 타입에 대해 강제적인 형변환이 가능합니다.
  * (CPP) `Struct = (Struct)3`와 같은 경우 `Struct(int a)`생성자를 이용할 수 있습니다.
* 스태틱 캐스트는 흔히 생각하는, 언어적 차원에서 지원하는 일반적으로 업캐스팅입니다.    
유도 클래스의 포인터 및 참조형 데이터를 기초 클래스의 포인터 및 참조형 데이터로 뿐만 아니라 기초 클래스의 포인터 및 참조형 데이터도 유도 클래스의 포인터 및 참조형 데이터로 아무런 조건 없이 형 변환시켜주지만, 그에 대한 책임
* 다이나믹 캐스트는 파생 클래스 사이에서의 캐스팅입니다.    
조건은 포인터 또는 참조이거나 `void*`여야합니다. 또한 다이나믹 캐스트를 사용할 자료형은 다형 클래스 형식이여야합니다.    
컴파일 시간이 아닌 런타임에 안정성을 검사하도록 컴파일러가 바이너리 코드를 생성합니다.    
* private으로 확장하는 경우, 형변환시 엑세스 할 수 없는 기본 클래스로 표시가 됩니다.
* 콘스트 캐스트객체의 상수성(const)를 없애는 타입 변환입니다. 개체 형식에 대한 포인터, 참조, 멤버 포인터의 경우에만 가능합니다.
* 리인터프릿 캐스팅은 위험을 가무하고 서로 관련이 없는 포인터들 사이의 캐스팅입니다.    
`reinterpret_cast<new_type>(expression)`는 expression에 해당하는 것을 new_type으로 비트단위로 바꾸는 것 입니다. 포인터만 가능합니다. 
* [교차 형변환](https://stackoverflow.com/questions/35959921/what-is-side-cast-or-cross-cast-in-dynamic-cast-in-c/51669399)은 Left -> Right 또는 반대의 상황에서 dynamic_cast를 하는 경우를 말합니다. 크로스캐스트는 reinterpret_cast또는 static_cast가 아닌 dynamic_cast에서만 작동합니다. 최상위 부모 클래스의 상속이 전부 virtual면 다이아몬드 상황에서도 바로 최상위 부모 클래스로 캐스트가 가능합니다.