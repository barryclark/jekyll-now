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
FVector URobotArmController::GetNewTailPosition(float Length, const FVector& Tail, const FVector& Target)
{
#ifdef WITH_EDITOR

	if (FVector::Distance(Tail, Target) < FLT_EPSILON)
	{
		UE_LOG(LogTemp, Warning, TEXT("The distance between the target and the tail is too small."));
	}

#endif // WITH_EDITOR

	const FVector TargetToTailVector = (Tail - Target).GetUnsafeNormal();
	return Target + TargetToTailVector * Length;
}
```

이제 GetNewTailPosition을 연결된 라인들에 순차적으로 적용시킬 수 있습니다.
이를 통해 항상 Target에 도달하는 FABRIK을 구현할 수 있습니다.

움직이지 않고 고정되어 있어야 하는 부분이 있을 때 사용하는 방법을 설명합니다.
FABRIK은 체인의 헤드가 항상 목표에 도달할 것을 보장합니다.
이를 역으로 수행함으로써 베이스가 항상 고정된 상태를 유지하도록 할 수 있습니다.

```
void URobotArmController::ApplyFABRIK(TArray<FSegment>& Segments, FVector Target)
{
#ifdef WITH_EDITOR

	if (Segments.Num() < 2)
	{
		UE_LOG(LogTemp, Error, TEXT("Invalid segment length."));
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

# 활용 #

* UnrealEngine에서 Engine/Source/Runtime/AnimationCore/public/FABRIK.h에서 사용할 수 있습니다.   

? 머리로 생각하는데 한계가 있으니, 적으면서 하자.

? 로직을 하나로 합치는 것은, Iterator에 대해서 깊게 이해하지 못했기 때문에, 잘못된 결론에 도달했다고 볼 수 있나?

? 뭐지. Unreal은 Normal을 이용해서 Tail을 슬라이드 하네요? 약간의 연산정도는 더 해도 된다는 걸까요?   
! 정신건강에 안 좋네.
! pragma optimize
! 한번에 여러가지 생각이 혼합되면, 이상한 결과물이 나온다. 한번에 하나씩 생각하자.

! 실제 구현된 결과물을 보고 코드를 작성해야 삽질하는 시간을 줄일 수 있다.

? FABRIK에는 제약조건이 없네요. IK를 봐야 할까요?

? 로직을 나눌 수 있을 줄 알았지만, 나누지 못하네, 그냥 반복하는게 더 단순한가?

! KISS를 항상 명심합시다. 단순하게 작성할 때가 가장 효율적이다. 아키텍쳐만 고려하자.

? Array로 만든 이유가 있구나. 이상한거 추가하지 말고, 알고리즘을 따라서 행동하는 것이 더 이득인가?

? 안보고 코드 작성하려니 토할것 같네.

? 너무 생각하면 안좋은 결과가 나온다. 간단한 로직을 구현하고, 작동되는 것을 본다음. 그 다음 작성하도록 한다.

? 리팩토링 말고는 좋은 코드를 작성할 수 있는 방법이 없는 것인가?,,, 한번에 여러가지를 생각하지를 못하겠네.

* 관절에 제약조건을 추가할 수 있습니다.   
* 선 이외의 개체를 이동하는 것도 가능합니다. (ex. 단단한 삼각형)   
* 핵심 아이디어를 이해하면, 다양하게 적용할 수 있습니다.

1. 별생각 없이 로직 구현.
2. 테스트.
3. 함수 파라메터 정리.
4. 테스트.
5. 리팩토링.
6. 테스트.
7. 아키텍쳐에 따라 코드 재구성.
8. 테스트.

! 코드는 적정선만큼 작성하는 것이 좋다.
! 일단 구현된 결과물을 보고 다음 단계로 넘어가는 것이 좋다?
! 어렵네. 빠르게 생각없이 구현하고, 내제된 오류 를 찾은다음, 재사용이 용이한 코드를 작성하면서, 주석이 필요없는 깔끔한 코드를 작성하면서, 효율적인 코드를 작성하기란.
! 요구사항을 정했으면, 나눠서 하나씩 연습하면 되는 것 아닌가? 

? 코드퀄리티를 높이기 위해서, https://just-do-it-unyong.tistory.com/entry/%EC%A0%95%EB%8B%B5%EC%9D%84-%EA%B3%A0%EC%B9%98%EB%A9%B4-%ED%8B%80%EB%A6%AC%EB%8A%94-%EC%9D%B4%EC%9C%A0-%EC%9D%B4-%EA%B8%80-%ED%95%98%EB%82%98%EB%A1%9C-%EC%A0%95%EB%A6%AC%ED%95%A9%EB%8B%88%EB%8B%A4-feat-%ED%95%B4%EA%B2%B0%EC%B1%85-%EC%A0%9C%EC%8B%9C 를 참고해야 할까? 클린코드 읽어봐야지.

https://en.wikipedia.org/wiki/Inverse_kinematics   

https://sean.cm/a/fabrik-algorithm-2d   