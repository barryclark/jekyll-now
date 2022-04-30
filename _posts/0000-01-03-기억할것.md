---
layout: post
title: Remember note
---

## 조금더 빠른 코드

FABRIK알고리즘에서 "라인의 테일을 길이에 맞게 슬라이드"하는 부분을 생각해보면 이는 다음의 두가지로 구현할 수 있습니다.

```
FVector GetNewTailPosition(float Length, const FVector& Tail, const FVector& Target)
{
    const FVector TailDirection = Tail - Target;
    TailDirection.Normalize();

    return Target + TailDirection * Length;
}
```

```
FVector GetNewTailPosition(float Length, const FVector& Tail, const FVector& Target)
{
    const FVector TailDirection = Tail - Target;

    const float StretchedLength = TailDirection.Length();
    const float Scale = Length / StretchedLength;
    
    return Target + TailDirection * Scale;
}
```

Normalize는 내부에 length를 구한 후, Vector의 X, Y, Z에 대해서 / 연산을 수행합니다. (참고로 %, /, 삼각함수보다 +, -, *는 약 10~50배정도 더 빠르다고 합니다.)
따라서 전자의 코드는 X, Y, Z에 대해서 3번 계산하는 것을 2번, 총 6번을 계산하며, 아래의 코드는 3번 계산하는 것을 1번, float간의 연산을 1번 수행하여
동일한 로직을 수행하지만 더 빠르다고 할 수 있습니다.

* 이를 코드를 작성할 때 어떻게 편하게 생각하고 작성할 수 있는 방법이 있을 까요?

? #pragma optimize가 on으로 되어있고, 다음의 연산이 inline일 경우, 위의 가정은 의미가 없어지는 걸까요?