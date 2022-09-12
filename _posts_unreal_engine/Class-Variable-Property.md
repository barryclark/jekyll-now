---
layout: post
title: Class, Variable, Property
---

## Variable Property

<details><summary>Transient</summary>
<div markdown="1">

[Transient 변수를 사용할 위치입니다](https://forums.unrealengine.com/t/where-to-use-a-transient-variable/17494)

Transient는 직렬화를 비활성화합니다. UPROPERTY와 관련된 다른 기능은 여전히 남아있습니다. 

원시 포인터에 대해서 다음과 같이 사용할 경우 가비지 콜렉션에 의해 삭제되지 않으면서, 직렬화 되어 저장되지 않음을 의미합니다.

```cpp
UPROPERTY(Transient)
UObject* Ptr;
```

위 링크의 예제에서 CurrentHealth를 Transient 변수로 취급하는 것은 올바르지 않습니다.

Transient는 소켓, oauth 세션 등과 같이 세션 간에 저장해서는 안 되거나 저장할 수 없는 런타임 생성 데이터/객체에 사용됩니다.

* Transient는 순간적인, 단기적인 이란 의미를 가지고 있습니다.

</div></details>