---
layout: post
title: FABRIKComponent
---

## 1차 구현
[FABRIK Algorithm](FABRIK-algorithm.md)

* 목표   
ActorComponent를 이용하여, Actor에서 FABRIK을 Forward, Backward, Fixed(Forward and Backward), WithIndex(Backward -> Index <- Forward)로 활용할 수 있도록 만드기

# 디버그

? 어디서 오류가 발생한건지는 모르겠지만, Insert에서부터 오류가 나기 시작합니다. 엄청 오래걸리는 빌드시간을 기다리고 있습니다.   
    ! 출력된 오류는 (Index >= 0) & (Index < ArrayNum)문제라고 합니다.   
    ! 호출스택을 보니 ApplyForwardFABRIK을 호출하는 부분에서 오류가 발생합니다.

! -1을 호출해서 오류가 나는 것 이였습니다.
    ! TArray에 IsVaildIndex를 검사하는 매서드가 있습니다.

---

? 왜 ApplyForwardFABRIK이 오류를 발생시킨다는 것을 몰랐을 까요?
    ! 오류처리를 했지만, 오류를 제대로 걸러내지 못했습니다.
    ! 조건문이 복잡하면 제가 생각할 수 있는 범위를 벗어나기 때문이라고 생각합니다.

! IsVaildIndex를 만들고 false시 반환되도록 만들었습니다.
    **? 오류를 보면 볼수록 어떻게 해야 좋은지 하나도 모르겠습니다.**

---

! 수정하는 과정에서 오류처리를 어떻게 해야할지 애매해서 제거한 Segment의 Length가 0인 경우 오류를 출력하는 부분이 문제가 되었습니다.
    **! Segment의 Legnth가 0이 되면, 뒤의 세그먼트들의 포지션 좌표값들이 NAN이 되는 문제가 있습니다.**
    GetUnsafeNormal을 GetSafeNormal로 교체하였습니다.

! GetSafeNormal이 유효하지 않을 경우 zero vector를 반환하게 만들었습니다. 제곱합이 Tolerance보다 작을 경우 Tail의 Position은 Target이 됩니다.

---

! 이번에는 Recalculated가 작동하지 않습니다.


## Code review