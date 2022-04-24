---
layout: post
title: FABRIK algorithm
---

## Inverse Iknematics(IK)란? ##

컴퓨터 애니메이션 및 로봇 공학에서 역 운동학은 로봇 조작기 또는 애니메이션 캐릭터의 골격과 같은 운동학적 체인의 끝의 시작을 기준으로 주어진 위치 및 방향에 배치하는데 필요한 가변 관절 매개변수를 계산하는 수학적 프로세스입니다.

## FABRIK 알고리즘 ##

FABRIK는 forward and backward reaching inveerse kinematics의 약자로 역기구학 문제에 대한 매우 간단하고 빠르며 영리한 솔루션 입니다.

FABRIK의 절차는 다음과 같습니다.   
1. 라인과 타겟이 주어집니다.   
2. 라인의 헤드를 타겟두고 라인을 늘립니다.   
3. 라인의 테일을 길이에 맞게 슬라이드 합니다.   

```
/*
*    If Tail and Target are the same, it occur zero divide.
*/
FVector GetNewTailPosition(float Length, const FVector& Tail, const FVector& Target)
{
    const FVector TailDirection = Tail - Target;

    const float StretchedLength = TailDirection.Length();
    const float Scale = Length / StretchedLength;
    return Target + TailDirection * Scale;
}
```

이제 GetNewTailPosition을 연결된 라인들에 순차적으로 적용시킬 수 있습니다.
이를 통해 항상 Target에 도달하는 FABRIK을 구현할 수 있습니다.

* Array에 대해서 다음을 수행할 수 있지만, Iterator를 이용하면
Forward와 Backward로직을 분리할 필요가 없습니다.

```
/*
*    If StartHead and EndTail are Iterators of different arrays,
*   an error will occur.
*    EndTail is the actual iterator.
*/
void UpdateFromHeadToLast(Iterator<Segment> Head, const Iterator<Segment>& EndTail, FVector Target)
{
    while(Head != EndTail)
    {
        Head.Position = Target;
        float Length = Head.Length();
        Head++;

        // Now the head to the tail.
        Head.Position = GetNewTailPosition(Length, Head.Position, Target);
    }
}
```

# FORWARD and BACKWARD #

움직이지 않고 고정되어 있어야 하는 부분이 있을 때 사용하는 방법을 설명합니다.
FABRIK은 체인의 헤드가 항상 목표에 도달할 것을 보장합니다.
이를 역으로 수행함으로써 베이스가 항상 고정된 상태를 유지하도록 할 수 있습니다.

```
void ApplyFABRIK(Array<Segment>& Segments, const FVector& Target)
{
    const FVector FixedPosition = Segments[0].Position;

    UpdateFromHeadToLast(Segments.RFirst(), Segments.RLast(), Target);
    UpdateFromHeadToLast(Segments.First(), Segments.Last(), FixedPosition);
}
```

# 활용 #

* UnrealEngine에서 Engine/Source/Runtime/AnimationCore/public/FABRIK.h에서 사용할 수 있습니다.   

? 뭐지. Unreal은 Normal을 이용해서 Tail을 슬라이드 하네요? 약간의 연산정도는 더 해도 된다는 걸까요?   
! 정신건강에 안 좋네.

? FABRIK에는 제약조건이 없네요. IK를 봐야 할까요?

? 작성한거 제대로 작동하는지 확인해봐야함.

* 관절에 제약조건을 추가할 수 있습니다.   
* 선 이외의 개체를 이동하는 것도 가능합니다. (ex. 단단한 삼각형)   
* 핵심 아이디어를 이해하면, 다양하게 적용할 수 있습니다.   

https://en.wikipedia.org/wiki/Inverse_kinematics   

https://sean.cm/a/fabrik-algorithm-2d   