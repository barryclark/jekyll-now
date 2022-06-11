---
layout: post
title: AnimNotifyState
---

UE 5.01
2022 05 28

## class의 선언

* .h
```cpp
...
#include "Animation/AnimNotifies/AnimNotifyState.h"

...
UCLASS()
class ..._API UMyAnimNotifyState : public UAnimNotifyState
{
    GENERATED_BODY()
    ...
}
```

## 함수 오버라이드
AnimNotifyState의 주요 함수는 Implementation으로 만들어 졌으므로 블루프린트에서 오버라이드 해야 합니다.

```cpp
```