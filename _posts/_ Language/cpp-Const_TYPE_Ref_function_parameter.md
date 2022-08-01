---
layout: post
title: cpp const Type& function parameter
---

```cpp
void Func(const int& Value);
```

<details><summary>언제 사용해야 하는가?</summary>
<div markdown="1">

[const TYPE& - when I will want to use by reference to const?](https://stackoverflow.com/questions/49237649/const-type-when-i-will-want-to-use-by-reference-to-const)

1. 함수 기간동안, 해당 변수를 바꾸고 싶지 않을 때
2. 매개 변수를 복사하고 싶지 않을 떄
3. 변수가 nullptr을 참조하지 않을 때

* 1번 이유에 대해 
  * Const 정확성은 자체 문서화에서도 매우 중요합니다. 함수의 프로토타입에서 매개변수를 수정하지 않을 것임을 즉시 알 수 있습니다. 
  * 실수로 변경하려고 하면 컴파일러가 알려줄 것입니다.
* 2번 이유에 대해
  * 참조형은 *와 마찬가지로, 복사를 하지않고 변수를 전달할 수 있게 합니다.
* 3번 이유에 대해
  * 참조형은 선언과 동시에 반드시 초기화 해야 합니다. 이러한 이유로 참조는 컴파일러에서 *로 구현 되더라도 참조된 내용이 있음을 의미할 수 있습니다.
    - nullptr을 참조형에 할당할 수 있지만, 정의되지 않은 행동입니다.
    - 참조형이 항상 선언되어 있음을 의미하지는 않습니다. 지역변수의 참조를 반환하는 경우, 그리고 클래스에 참조변수를 할당한 경우를 예로 들 수 있습니다.

</div></details>

* 사용 예시
```cpp
    ...
    int A = 3;
    Func(A);
    Func(3);
```