---
layout: post
title: FABRIK algorithm
---

## Inverse knematics(IK)란?

[위키피디아](https://en.wikipedia.org/wiki/Inverse_kinematics)   

컴퓨터 애니메이션 및 로봇 공학에서 역 운동학은 로봇 조작기 또는 애니메이션 캐릭터의 골격과 같은 운동학적 체인의 끝의 시작을 기준으로 주어진 위치 및 방향에 배치하는데 필요한 가변 관절 매개변수를 계산하는 수학적 프로세스입니다.

## FABRIK 알고리즘

[이해하기 쉬운 설명](https://sean.cm/a/fabrik-algorithm-2d)      

FABRIK는 forward and backward reaching inveerse kinematics의 약자로 역기구학 문제에 대한 매우 간단하고 빠르며 영리한 솔루션 입니다.

FABRIK의 절차는 다음과 같습니다.   
1. 라인과 타겟이 주어집니다.   
2. 라인의 헤드를 타겟두고 라인을 늘립니다.   
3. 라인의 테일을 길이에 맞게 슬라이드 합니다.   

``` cpp
FVector GetNewTailPosition(float Length, const FVector& Tail, const FVector& Target)
{
	const FVector TargetToTailVector = (Tail - Target).GetUnsafeNormal();
	return Target + TargetToTailVector * Length;
}
```

이제 GetNewTailPosition을 연결된 라인들에 순차적으로 적용시킬 수 있습니다.
이를 통해 항상 Target에 도달하는 FABRIK을 구현할 수 있습니다.

움직이지 않고 고정되어 있어야 하는 부분이 있을 때 사용하는 방법을 설명합니다.
FABRIK은 체인의 헤드가 항상 목표에 도달할 것을 보장합니다.
이를 역으로 수행함으로써 베이스가 항상 고정된 상태를 유지하도록 할 수 있습니다.

``` cpp
void ApplyFABRIK(TArray<FSegment>& Segments, FVector Target)
{
#ifdef WITH_EDITOR

	if (Segments.Num() < 2)
	{
		UE_LOG(LogTemp, Error, TEXT("Invalid segment num."));
		return;
	}

#endif // WITH_EDITOR

	const FVector FixedPosition = Segments[Segments.Num() - 1].Position;

	// Forward
	int TailIndex = 1;
	while (TailIndex < Segments.Num())
	{
		Segments[TailIndex - 1].Position = Target;
		Segments[TailIndex].Position = GetNewTailPosition(
			Segments[TailIndex - 1].Length,
			Segments[TailIndex].Position,
			Target
		);

		Target = Segments[TailIndex].Position;
		++TailIndex;
	}

	// Backward
	TailIndex = Segments.Num() - 1;
	Target = FixedPosition;
	while (TailIndex >= 0)
	{
		Segments[TailIndex + 1].Position = Target;
		Segments[TailIndex].Position = GetNewTailPosition(
			Segments[TailIndex + 1].Length,
			Segments[TailIndex].Position,
			Target
		);

		--TailIndex;
	}
}
```

# 활용

핵심 아이디어를 이해하면 다양하게 사용할 수 있습니다.
예를 들면 관절에 고정된 동작 범위와 같은 제약 조건을 추가하는 것도 가능해 집니다.
그리고 삼각형과 같이 선 이외의 개체를 움직이는 것도 가능합니다.
움직임과 동시에 길이를 늘렸다 줄이는 것도 생각해 볼 수 있습니다.

* UnrealEngine에서 Engine/Source/Runtime/AnimationCore/public/FABRIK.h에서 사용할 수 있습니다.   

