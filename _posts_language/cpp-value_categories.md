---
layout: post
title: value category
---

## Value category

[LValue and Rvalue](https://docs.microsoft.com/en-us/cpp/cpp/lvalues-and-rvalues-visual-cpp?view=msvc-170)

[What are rvalues, lvalues, xvalues, glvalues, and prvalues?](https://stackoverflow.com/questions/3601602/what-are-rvalues-lvalues-xvalues-glvalues-and-prvalues)

<center><div markdown="1">

![도표](https://i.stack.imgur.com/xgCnV.png)

</div></center>

|표현|설명|
|-|---|
|glvalue|generalized + lvalue로 lvalue또는 xvalue를 의미합니다.|
|rvalue &nbsp;&nbsp;&nbsp;&nbsp;|역사적으로는 표현식의 우측에 나타날 수 있기 때문에 rvalue로 부르며, xvalue 또는 임시 개체, 해당 하위 개체, 개체와 연결되지 않은 값입니다.|

<br>

|표현|설명|
|-|---|
|lvalue|역사적으로 표현식의 좌측에 나타날 수 있기 때문에 lvalue로 부르며, 함수또는 객체를 지정합니다.|
|xvalue|expiring + value로 일반적으로 수명이 다한 개체를 나타냅니다.
|prvalue &nbsp;&nbsp;&nbsp;&nbsp; |pure + lvalue로 xvalue가 아닌 rvalue입니다.|

lvalue에는 프로그램이 액세스할 수 있는 주소가 있습니다. lvalue 표현식의 예로는 const변수, 배열 요소, lvalue 참조를 반환하는 함수 호출, 비트 필드, 공용체 및 클래스 멤버를 포함한 변수 이름이 있습니다.

prvalue 표현식에는 프로그램에서 액세스할 수 있는 주소가 없습니다. prvalue 식의 예로는 리터럴, 비참조 형식을 반환하는 함수 호출, 식 평가 중에 생성되지만 컴파일러에서만 액세스할 수 있는 임시 개체가 있습니다.

xvalue 표현식에는 프로그램에서 더 이상 액세스할 수 없지만 표현식에 대한 액세스를 제공하는 rvalue 참조를 초기화하는 데 사용할 수 있는 주소가 있습니다. 예에는 rvalue 참조를 반환하는 함수 호출, 배열 또는 개체가 rvalue 참조인 멤버 식에 대한 배열 첨자, 멤버 및 포인터가 포함됩니다.

<details><summary>뭔소린가 싶을때</summary>
<div markdown="1">

[조금더 쉬운 표현](https://stackoverflow.com/a/37872116/17691420)

기본 값 범주는 표현식의 두 가지 속성에 해당합니다.

* **아이덴티티가 있음**은 개체의 주소 또는 개체가 식별하는 기능(직접 또는 간접적으로 얻음)을 비교하여 표현이 다른 표현과 동일한 엔터티를 참조하는지 여부를 결정할 수 있습니다.

* **이동할 수 있음**이동 생성자 이동 할당 연산자 또는 이동 의미 체계를 구현하는 다른 함수 오버로드에서 이동할 수 있습니다.

| |Can be moved from (= rvalue)|Cannot be moved from|
|-|-|-|
|Has identity (= glvalue)|xvalue|lvalue|
|No identity|prvalue|not used|

</div></details>

<details><summary>그래도 모르겠어요</summary>
<div markdown="1">

```cpp
#define IS_XVALUE(X) std::is_rvalue_reference<decltype((X))>::value
#define IS_LVALUE(X) std::is_lvalue_reference<decltype((X))>::value
#define IS_PRVALUE(X) !std::is_reference<decltype((X))>::value

#define IS_GLVALUE(X) (IS_LVALUE(X) || IS_XVALUE(X))
#define IS_RVALUE(X) (IS_PRVALUE(X) || IS_XVALUE(X))

...

static_assert(IS_LVALUE(x));                        // 1
static_assert(IS_LVALUE(x+=y));                     // 2
static_assert(IS_LVALUE("Hello world!"));           // 3
static_assert(IS_LVALUE(++x));                      // 4

static_assert(IS_PRVALUE(1));                       // 5
static_assert(IS_PRVALUE(x++));                     // 6
static_assert(IS_PRVALUE(static_cast<double>(x)));  // 7
static_assert(IS_PRVALUE(std::string{}));           // 8
static_assert(IS_PRVALUE(throw std::exception()));  // 9
static_assert(IS_PRVALUE(doesNothing()));           // 10

static_assert(IS_XVALUE(std::move(s)));             // 11
...
```

[Value categories](https://en.cppreference.com/w/cpp/language/value_category)

3. string literal
```cpp
std::string& s = std::string("Abcdefg");
```
C에서는 lvalue를 제외하고, 배열이 유형이 존재할 수 있는 방법이 없기 때문입니다...
그 외에 다른 literal은 rvalue입니다.

</div></details>

<details><summary>음... 어디다 쓰는 건가요?</summary>
<div>

모든 C++ 표현식에는 유형이 있으며 값 범주 에 속합니다 . 값 범주는 표현식 평가 중에 임시 개체를 생성, 복사 및 이동할 때 컴파일러가 따라야 하는 규칙의 기초입니다.

* **RValue Reference**는 불필요한 복사를 제거해서 성능 향상에 도움을 주는 새로운 개념입니다.

</div></details>