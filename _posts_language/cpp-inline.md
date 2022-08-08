---
layout: post
title: inline
---

- [ ] `FORCEINLINE_DEBUGABLE`....
- [ ] [Reducing Indirect Function Call Overhead In C++ Programs](https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.27.5761&rep=rep1&type=pdf)
- [ ] 여러 플랫폼에 대응하기 위한 전처리 설정에 대해서...

## inline keyward

[인라인 함수(C++)](https://docs.microsoft.com/ko-kr/cpp/cpp/inline-functions-cpp?view=msvc-170)

inline 키워드는 컴파일러에게 모든 함수 호출 건에 대해 함수 정의 내에서 코드를 대체하라고 조언합니다.

<details><summary>코드, 데이터, 힙, 스택</summary>
<div markdown="1">

<center><div markdown="1">

![메모리 공간](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbSd1lI%2FbtqH2dJqR3X%2FizWltqNIz6dRDMfIwDtRK1%2Fimg.png)

</div></center>

* 코드 영역은 **실행할 프로그램의 코드**가 저장되는 영역입니다. 텍스트 영역이라고 부르기도 합니다. CPU는 코드 영역에 저장된 명령을 하나씩 가져가서 처리하게 됩니다. **프로그램이 시작하고 종료될 때 까지 메모리에 계속 남아있습니다.**

* 데이터 영역은 프로그램의 전역 변수와 정적(static) 변수가 저장되는 영역입니다. 프로그램의 시작과 함께 할당되며 프로그램이 종료되면 소멸합니다.

* 힙 영역은 프로그래머가 직접 공간을 할당, 해제하는 메모리 공간입니다. 힙 영역에서 동적할당을 통해 메모리를 해제합니다. 힙은 선입선출(FIFO)방식입니다. 사용자가 메모리를 동적할당을 하면 O/S가 알아서 힙에 할당관리하는데 제거는 사용자 몫입니다.

* 스택 영역은 프로그램이 자동으로 사용하는 임시 메모리 영역입니다. 함수 호출 시 생성되는 지역 변수와 매개 변수가 저장되는 영역이고, 함수 호출이 완료되면 사라집니다. 이때 스택 영역에 푸시(push)로 데이터를 저장하고, 팝(pop)으로 데이터를 인출합니다. 스택 영역은 후입 선출(LIFO)방식으로 가장 나중에 들어온 데이터가 가장 먼저 인출 됩니다.

* 오버 플로우란 넘처흐른단 뜻으로, 한정된 메모리 공간이 부족하여 메모리 안에 있는 데이터가 넘쳐 흐르는 현상입니다. 힙이 스택을 침범하는 경우를 힙 오버 플로우라 하고, 스택이 힙을 침범하는 경우를 스택 오버 플로우라고 합니다.

</div></details>

<details><summary>inline, __inline 키워드</summary>
<div markdown="1">

컴파일은 컴파일러를 통해 코드를 분석한 다음 컴퓨터가 직접 읽을 수 있는 언어(어셈블리)로 변환하여 최종적으로 실행 가능한 프로그램(또는 호출할 수 있는 라이브러리)을 생성하는 것입니다.

컴퓨터 과학에서 인라인 함수(인라인 함수 또는 컴파일 타임 확장 함수라고도 함)는 컴파일러에게 일부 특수 함수의 인라인 확장(때로는 인라인 확장이라고도 함)을 조언하는 데 사용되는 프로그래밍 언어 구조입니다.

인라인 함수를 사용하면 함수 호출과 연관된 오버헤드가 제거되어 프로그램 속도가 더 빨라질 수 있습니다. 컴파일러는 일반 함수에서 사용할 수 없는 방식으로 인라인으로 확장된 함수를 최적화할 수 있습니다.

인라인 코드 대체는 컴파일러의 재량에 따라 발생합니다. 예를 들어 해당 주소가 사용되거나 인라인으로 너무 큰 경우 컴파일러는 함수를 인라인으로 처리하지 않습니다.

* inline은 C++에서만 __inline은 C, C++에서 사용할 수 있습니다.

</div></details>

<details><summary>오버헤드를 줄인다는 의미는</summary>
<div markdown="1">

![프로그램 실행 순서](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fcf4DNz%2FbtqHR6kJkJL%2FbTsDg7ho496ysA9kJbZWQ0%2Fimg.png)

C언어 프로그램 메모리를 상수 영역, 코드 영역, 정적 전역 영역, 스택 영역, 힙 영역으로 구분한다고 말합니다.

프로그램이 실행될 때 컴파일된 바이너리 프로그램이 실행됩니다. 이 바이너리 프로그램의 배포 형식은 위에서 언급한 영역과 거의 동일하고 다양한 어셈블리 명령이 있을 것입니다. "Windows Core Programming" 책을 참조할 수 있습니다.

운영 체제의 메모리에 배치되고, 기능 코드 세그먼트는 소위 코드 영역에 배치되고, 로컬 변수와 함수 매개변수는 스택 영역에 배치됩니다.

함수 호출은 스택 영역에서 발생하며, 호출될 때마다 현재 함수의 해당 내용을 스택에 밀어 넣어 레지스터와 관련된 데이터 정보를 처리합니다. 주소가 없는 rvalue는 데이터를 의미합니다. 많은 경우 레지스터에 저장됩니다.

그러면 호출 주소는 우리가 실행하고자 하는 함수의 위치를 ​​가리키고 함수 내부의 명령어 처리를 시작하여 연산을 시작하고 함수 실행이 끝나면 해당 데이터를 팝업하고 스택과 레지스터에 있는 데이터를 처리한다. 이 프로세스를 "함수 호출 오버헤드"라고도 합니다.

</div></details>

<details><summary>예제</summary>
<div markdown="1">

```cpp
// Inline_Member_Functions.cpp
class Account
{
public:
    Account(double initial_balance) { balance = initial_balance; }
    double GetBalance();
    double Deposit( double Amount );
    double Withdraw( double Amount );
private:
    double balance;
};

inline double Account::GetBalance()
{
    return balance;
}

inline double Account::Deposit( double Amount )
{
    return ( balance += Amount );
}

inline double Account::Withdraw( double Amount )
{
    return ( balance -= Amount );
}
int main()
{
}
```

* **다음 클래스 선언에서 Account 생성자는 인라인 함수라고 합니다.**
* 클래스 선언에서 inline 키워드 없이 함수는 inline 선언되었습니다. inline 클래스 선언에서 키워드를 지정할 수 있고 결과는 동일합니다.

</div></details>

<details><summary>인라인 확장</summary>
<div markdown="1">

[Inline expansion](https://en.wikipedia.org/wiki/Inline_expansion)

컴퓨팅 에서 인라인 확장 또는 인라인 은 함수 호출 사이트 를 호출된 함수의 본문으로 대체하는 수동 또는 컴파일러 최적화 입니다. **인라인 확장은 매크로 확장 과 유사 하지만 소스 코드(텍스트)를 변경하지 않고 컴파일하는 동안 발생하는 반면 매크로 확장은 컴파일 전에 발생하므로 컴파일러에서 처리하는 다른 텍스트가 생성됩니다.**

**인라인은 중요한 최적화이지만 성능에 복잡한 영향을 미칩니다. 경험 에 따르면 일부 인라인은 매우 적은 공간 비용으로 속도를 향상하지만 인라인 코드가 너무 많은 명령 캐시 를 소비하고 상당한 공간을 차지하기 때문에 과도한 인라인은 속도를 저하시킵니다.**

인라인 확장은 컴파일러가 호출되는 각 위치에 함수의 새 복사본을 배치하기 때문에 매크로 확장과 유사합니다. 인라인 함수는 함수 호출 오버헤드가 저장되므로 일반 함수보다 조금 더 빠르게 실행되지만 메모리 패널티가 있습니다. **함수가 10번 인라인되면 코드에 삽입된 함수의 복사본 10개가 있습니다. 따라서 인라인은 자주 호출되는 작은 함수에 가장 적합합니다.** C++에서 클래스의 멤버 함수는 클래스 정의 내에 정의된 경우 기본적으로 인라인됩니다( inline 키워드를 사용할 필요 없음). 그렇지 않으면 키워드가 필요합니다. 컴파일러는 주로 함수가 특히 큰 경우 함수를 인라인하려는 프로그래머의 시도를 무시할 수 있습니다.

**인라인 함수가 없으면 컴파일러 는 인라인할 함수를 결정합니다. 프로그래머는 인라인된 함수와 인라인되지 않은 함수를 거의 또는 전혀 제어하지 못합니다.** 프로그래머에게 이 정도의 제어 권한을 부여하면 인라인할 함수를 선택할 때 응용 프로그램별 지식을 사용할 수 있습니다.

**이 최적화의 직접적인 효과는 (함수 본문 복제 로 인한) 공간 사용량를 악화시키는 대가로 (호출 오버헤드를 제거하여) 시간 성능을 향상시키는 것입니다.** 간단한 경우를 제외하고는 함수 본문 복제로 인한 코드 확장이 우세 하므로 인라인 확장의 직접적인 효과는 공간을 희생하면서 시간을 개선하는 것입니다.

**그러나 인라인 확장의 주요 이점은 더 큰 함수에서 더 나은 최적화가 가능하기 때문에 함수 본문의 크기가 증가하기 때문에 추가 최적화와 향상된 스케줄링이 가능하다는 것입니다. 인라인 확장이 속도에 미치는 궁극적인 영향은 최신 프로세서의 성능을 지배하는 메모리 시스템(주로 명령어 캐시 ) 의 성능에 대한 여러 영향으로 인해 복잡합니다.** 특정 프로그램 및 캐시에 따라 특정 기능을 인라인하면 증가할 수 있습니다. 또는 성능이 저하됩니다.

인라인의 영향은 추상화 정도가 다르기 때문에 프로그래밍 언어와 프로그램에 따라 다릅니다. **C 및 Fortran과 같은 저수준 명령형 언어에서는 일반적으로 10-20% 속도 향상으로 코드 크기에 약간의 영향**을 미칩니다.

그러나 인라인의 주요 이점은 추가 최적화가 가능하다는 것입니다. IPO(프로시저 간 최적화) 없이도 기능 경계를 넘나드는 최적화를 수행할 수 있습니다. 인라인이 수행되면 확장된 기능 본문에서 추가적인 절차 내 최적화("전역 최적화")가 가능해집니다. 

예를 들어:
* 인수로 전달 된 상수는 종종 일치하는 매개변수의 모든 인스턴스에 전파되거나 함수의 일부가 루프에서 "호이스팅"될 수 있습니다( 루프 불변 코드 모션 을 통해 ).
* 레지스터 할당 은 더 큰 기능 본문에서 수행할 수 있습니다.
* 이스케이프 분석 및 꼬리 복제 와 같은 고급 최적화 는 더 큰 범위에서 수행할 수 있으며 특히 이러한 최적화를 구현하는 컴파일러가 주로 절차 내 분석에 의존하는 경우 더 효과적입니다.

메모리 시스템 인라인의 또 다른 이점은 다음과 같습니다.
* 분기를 제거하고 실행되는 코드를 메모리에서 가깝게 유지하면 참조의 지역성(명령어의 공간적 지역성 및 순차성)을 개선하여 명령어 캐시 성능이 향상됩니다. 이는 특히 순차를 대상으로 하는 최적화보다 작지만 중요합니다.

**인라인의 직접적인 비용은 각 호출 사이트에서 함수 본문을 복제하기 때문에 코드 크기가 증가합니다. 그러나 항상 그렇지는 않습니다.** 즉, 사소한 접근자 메서드 나 mutator 와 같이 함수 본문이 함수 호출(호출자에서 인수 및 반환 값 처리 포함)의 크기보다 작은 매우 짧은 함수의 경우 메소드 (게터 및 세터); 또는 한 곳에서만 사용되는 기능의 경우 중복되어 생성되지 않습니다. 따라서 임베디드 시스템 의 경우와 같이 코드 크기를 최적화하는 경우 인라인이 최소화되거나 제거될 수 있습니다.

* 한번 inlining되거나 함수 호출의 크기보다 짧은 코드는 코드길이를 증가시키지 않습니다.

**인라인이 캐시 성능에 미치는 정확한 영향은 복잡합니다. 작은 캐시 크기(확장 이전의 작업 집합보다 훨씬 작음)의 경우 증가된 순차성이 지배적이며 인라인으로 캐시 성능이 향상됩니다.** 작업 집합에 가까운 캐시 크기의 경우 인라인이 작업 집합을 확장하여 더 이상 캐시에 맞지 않으면 이것이 지배적이며 캐시 성능이 저하됩니다. 작업 집합보다 큰 캐시 크기의 경우 인라인은 캐시 성능에 미미한 영향을 미칩니다. 또한 로드 전달 과 같은 캐시 설계의 변경으로 인해 캐시 누락의 증가를 상쇄할 수 있습니다.

</div></details>

<details><summary>forceinline</summary>
<div markdown="1">

inline(인라인 확장 또는 인라인이라고 함)은 컴파일러의 비용-편익 분석이 그 가치를 보여줄 때만 발생합니다. 인라인 확장은 더 큰 코드 크기의 잠재적 비용으로 함수 호출 오버헤드를 최소화합니다.

__forceinline키워드 는 비용-편익 분석을 대체하고 프로그래머의 판단에 의존합니다. __forceinline는 주의해서 사용 해야합니다. __forceinline무분별 하게 사용하면 미미한 성능 향상만 있는 더 큰 코드가 생성될 수 있으며 경우에 따라 성능이 저하될 수도 있습니다.(예: 더 큰 실행 파일에 대한 페이징 증가로 인해)

헤더 파일에 정의된 인라인 함수를 확장하는 대신 컴파일러는 여러 번역 단위에서 호출 가능한 함수로 이를 생성할 수 있습니다. 컴파일러는 ODR(One Definition Rule) 위반을 방지하기 위해 링커에 대해 생성된 함수에 플래그를 지정합니다.

</div></details>

<details><summary>컴파일러와 인라인</summary>
<div markdown="1">

다양한 추가 코드, 겉보기에 비어 있는 생성자(소멸자와 유사)에도 수십 또는 수백 줄의 복잡한 코드가 있을 수 있습니다. 이러한 구조를 여기저기에 인라인했다고 상상하면 프로그램을 최적화할 수 있다고 확신하지 못합니다. (물론 실제 상황은 더 복잡할 수 있습니다. 단순히 모든 인라인이나 모든 인라인을 거부하는 것은 최적으로 최적화되지 않습니다. 결론은 벤치마크 테스트 결과에 따라 더 설득력이 갈 것입니다.)

* 게임 업계에 종사하고 있어 여전히 '최적화'라는 단어에 민감합니다. 매번 엔진(프로젝트)을 컴파일하는 데 걸리는 시간, 런타임의 효율성, 디버깅 효율성, 게임 프레임 수, 패키징 시간 등은 실제로 우리와 관련이 있으며 비즈니스는 밀접하게 관련되어 있습니다.
* 디버그를 하고 싶다면 모든 최적화를 최대한 끄는 것이 좋고, 출시된 게임은 당연히 작고 최적화도가 높으며 실행 효율이 높을수록 좋습니다.

</div></details>

<details><summary>인라인이 제한되는 경우</summary>
<div markdown="1">

키워드는 인라인 확장이 선호됨을 컴파일러에 inline알립니다 . 그러나 컴파일러는 함수의 별도 인스턴스(인스턴스화)를 만들고 코드를 인라인으로 삽입하는 대신 표준 호출 연결을 만들 수 있습니다. 이 동작이 발생하는 두 가지 상황은 다음과 같습니다.

* 재귀 함수.
* 번역 단위의 다른 곳에서 포인터가 참조하는 함수.

컴파일러에 의해 다른 이유가 결정될 수 있으므로 이러한 이유는 인라인을 방해 할 수 있습니다 . inline지정자는 되며 함수가 인라인됩니다.

헤더 파일에 정의된 인라인 함수를 확장하는 대신 컴파일러는 여러 번역 단위에서 호출 가능한 함수로 이를 생성할 수 있습니다. 컴파일러는 ODR(One Definition Rule) 위반을 방지하기 위해 링커에 대해 생성된 함수에 플래그를 지정합니다.


추가적으로 인라이닝이 안되는 경우,
* 함수 또는 호출대상이 /Ob0(debug빌드 기본값) 컴파일 옵션으로 컴파일 된 경우 [인라인 함수 확장](https://docs.microsoft.com/en-us/cpp/build/reference/ob-inline-function-expansion?view=msvc-170)에서 인라인 확장을 비활성화 하는 컴파일러 옵션입니다.

* __forceinline으로 선언된 함수를 인라인하지 못할경우 Level1 경고(4714)를 던집니다.

</div></details>

<details><summary>.inl 확장자</summary>
<div markdown="1">

inl file에는 inline 함수의 정의부를 적어 놓고, 선언부가 있는 header file의 끝에
#include로 inl file을 포함하여 사용할 수 있습니다.

* Header.h

```cpp
inline void Func();
#include Inline.inl
```

* Inline.inl

```cpp
void Func()
{

}
```

항목형식은 C/C++ 헤더로 되어있어야 합니다.

* 헤더파일의 크기가 비대해지면 사용합니다.

</div></details>

# Unreal의 INLINE

<details><summary>언리얼 엔진의 빌드 구성</summary>
<div markdown="1">

[Misc/Build](https://github.com/EpicGames/UnrealEngine/blob/4.27/Engine/Source/Runtime/Core/Public/Misc/Build.h) 

* UE_BUILD_DEBUG
* UE_BUILD_DEVELOPMENT
* UE_BUILD_TEST
* UE_BUILD_SHIPPING
* UE_GAME
* UE_EDITOR
* UE_BUILD_SHIPPING_WITH_EDITOR
* UE_BUILD_DOCS
* UE_SERVER

</div></details>

<details><summary>언제 FORCEINLINE을 사용하는가?</summary>
<div markdown="1">

**프로파일링을 하고 도움이 될 것으로 생각되는 핫 코드가 있는 경우가 아니면 사용하지 마십시오. 그런 다음 프로파일링하고 실제로 도움이 되는지 확인하십시오.**

</div></details>

<details><summary>FORCEINLINE의 플랫폼별 대응</summary>
<div markdown="1">

||대체 대상|
|-|:-:|
|안드로이드|`__attribute__ ((always_inline))`|
|IOS|`__attribute__ ((always_inline))`|
|리눅스|`__attribute__ ((always_inline))`|
|Max|`__attribute__ ((always_inline))`
|Windows &nbsp;&nbsp;&nbsp; |`__forceinline`|

</div></details>


주요 참고자료 : [지후에게 조롱을 받고 한달만에 인라인 함수를 다시 공부했습니다.](https://jerish.blog.csdn.net/article/details/85759127), 위키피디아, [MSDN](https://docs.microsoft.com/zh-cn/cpp/cpp/inline-functions-cpp?view=msvc-170&viewFallbackFrom=vs-2017), [UE4/C++ FORCEINLINE 하고 싶지만 Debug 빌드시는 inline 최적화되고 싶지 않은 함수를 정의하는 방법, 혹은 UE_BUILD_xxxx 시리즈의 매크로에 대해.](https://usagi.hatenablog.jp/entry/2017/06/14/152825)