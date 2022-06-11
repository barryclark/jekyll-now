---
layout: post
title: FABRIKComponent
---

# 1차 구현
[FABRIK Algorithm](FABRIK-algorithm.md)

* 목표   
FABRIKComponent를 이용하여, Actor에서 FABRIK을 Forward, Backward, Fixed(Forward and Backward), WithIndex(Backward -> Index <- Forward)로 활용할 수 있도록 만들기   

* Forward : 첫번째 헤드를 원하는 위치에 도달하도록 합니다.   
* Backward : 마지막 테일을 원하는 위치에 도달하도록 합니다.   
* Fixed : 테일을 위치를 고정한 FABRIK알고리즘을 적용합니다.
* WithIndex : 특정 인덱스의 Segment가 원하는 위치에 도달하도록 합니다.   

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

! Recalculated가 작동하지 않습니다.
    **! 컴퓨터가 안좋은 관계로 디버깅 할때는 책읽으면서 디버깅 합시다.**   
    ! 음... GetSafeNormal을 zero vector로 반환 할 경우, Segment들이 동일한 포지션에 있을 때 업데이트 되지 않는다는 사실을 알았습니다.   

! SquareSum이 Tolerance보다 작은 경우 특정 벡터에 대하여 Length를 곱한 것으로 변경했습니다.    
    ? 어떤 벡터가 기준이 될지 몰라서 따로 분류했습니다.   
    ! 제곱합 루트해주는 것을 까먹었습니다.   
    **? Other *= (1 / Val)이 Other /= Val보다 빠른지 궁금합니다.**   

! 동일한 값으로 AddSegment를 했을때 부동소수점의 특성(? 조금더 공부하자)으로 인해 지그재그로 배치되어 이상합니다.   
    ! Forward는 이동했을 때 원하는 위치로 이동합니다.   
    ! Backward는 이동했을 때 원하는 위치로 이동합니다.   
    ! ApplyFixed가 이상하게 동작했던 이유는    GetNewTailPosition을 구하는데 Head의 포지션을 통해서 가져온 값을 TailPosition에 입력했기 때문입니다.    
        ? 이런 실수를 하지 않는 방법이 있을까요?   
            ! 다음번에는 이런 실수를 하지 않기 위해 UpdateTailPosition을 추가했습니다.      
        ! 노트북 모니터 화면이 작아서 잘려 보여진 이유도 있다고 생각합니다.   
        ! WithIndex는 되는 것처럼 보입니다.   

<details>
<summary>코드 리뷰</summary>
<div markdown='1'>

[Component to apply FABRIK in Unreal Engine](https://codereview.stackexchange.com/questions/276144/components-with-fabrik-in-unreal-engine)   

## Component to apply FABRIK in Unreal Engine

I read the [FABRIK](https://sean.cm/a/fabrik-algorithm-2d) and implemented it to study Unreal syntax.

Update the position in the FABRIK Segment component.
It is used to update the relative position of the static mesh using the updated position value.

.h
```cpp
#pragma once

#include "CoreMinimal.h"
#include "UnsortedFunctionLibrary.generated.h"

USTRUCT(BlueprintType)
struct CHARACTERANIMATION_API FFABRIKSegment
{
	GENERATED_BODY()

public:
	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	FVector Position;

	UPROPERTY(EditANywhere, BlueprintReadWrite)
	float Length;
};

UCLASS(meta = (BlueprintSpawnableComponent))
class CHARACTERANIMATION_API UFABRIKComponent final : public UActorComponent
{
	GENERATED_BODY()

public:
	UFABRIKComponent();

public:
	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	FVector DefaultTailVector;

public:
	UFUNCTION(BlueprintCallable)
	void AddSegment(const FFABRIKSegment& Segment);

	UFUNCTION(BlueprintCallable)
	void InsertSegment(int32 Index, const FFABRIKSegment& Segment);

	UFUNCTION(BlueprintCallable)
	float GetLength(int32 Index);

	UFUNCTION(BlueprintCallable)
	FVector GetPosition(int32 Index);

	UFUNCTION(BlueprintCallable)
	void ApplyForward(const FVector& Target);

	UFUNCTION(BlueprintCallable)
	void ApplyBackward(const FVector& Target);

	UFUNCTION(BlueprintCallable)
	void ApplyFixed(const FVector& Target);

	UFUNCTION(BlueprintCallable)
	void ApplyWithIndex(int32 Index, const FVector& Target);

	UFUNCTION(BlueprintCallable)
	void Recalculated();
	
private:
	/*
	*	The first index means the first head.
	*/
	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, meta = (AllowPrivateAccess = true))
	TArray<FFABRIKSegment> Segments;

private:
	FORCEINLINE bool IsVaildIndex(int Start, int End)
	{
		bool IsVaild = true;
		if (Segments.IsValidIndex(Start) == false)
		{
			IsVaild = false;
		}

		if (Segments.IsValidIndex(End) == false)
		{
			IsVaild = false;
		}

		if (IsVaild == false)
		{
			UE_LOG(LogTemp, Error,
				TEXT("Invalid index use. Start : %d, End : %d, SegmentsNum : %d"),
				Start, End, Segments.Num());
		}
		return IsVaild;
	}

	FORCEINLINE FVector GetNewTailPosition(float Length, const FVector& Tail, const FVector& Target)
	{
		FVector TargetToTailVector = Tail - Target;
		const float SquareSum = TargetToTailVector.SquaredLength();

		// There is a problem that the position of
		//the tail becomes NAN when Square Sum is 0.
		if (SquareSum < FLT_EPSILON)
		{
			return Target + DefaultTailVector * Length;
		}
		else
		{
			TargetToTailVector *= FMath::InvSqrt(SquareSum);
			return Target + TargetToTailVector * Length;
		}
	}

	FORCEINLINE void UpdateTailPosition(float Length, FVector& Tail, const FVector& Target)
	{
		Tail = GetNewTailPosition(Length, Tail, Target);
	}

	FORCEINLINE void ApplyForwardFABRIK(int Start, int End, FVector Target)
	{
		if (IsVaildIndex(Start, End) == false)
		{
			return;
		}

		while (Start < End)
		{
			Segments[Start].Position = Target;
			UpdateTailPosition(Segments[Start + 1].Length, Segments[Start + 1].Position, Target);
			Target = Segments[Start + 1].Position;
			Start++;
		}
	}

	FORCEINLINE void ApplyBackwardFABRIK(int Start, int End, FVector Target)
	{
		if (IsVaildIndex(Start, End) == false)
		{
			return;
		}

		while (Start < End)
		{
			Segments[End].Position = Target;
			UpdateTailPosition(Segments[End].Length, Segments[End - 1].Position, Target);
			Target = Segments[End - 1].Position;
			End--;
		}
	}
};
```

.cpp
```cpp
#include "UnsortedFunctionLibrary.h"

UFABRIKComponent::UFABRIKComponent() : DefaultTailVector(FVector::UnitX())
{
}

void UFABRIKComponent::AddSegment(const FFABRIKSegment& Segment)
{
	Segments.Add(Segment);

	Recalculated();
}

void UFABRIKComponent::InsertSegment(int32 Index, const FFABRIKSegment& Segment)
{
	if (Segments.IsValidIndex(Index) == false)
	{
		UE_LOG(LogTemp, Error, TEXT("Inserting a segment out of bounds."));
		return;
	}

	Segments.Insert(Segment, Index);

	Recalculated();
}

float UFABRIKComponent::GetLength(int32 Index)
{
	return Segments[Index].Length;
}

FVector UFABRIKComponent::GetPosition(int32 Index)
{
	return Segments[Index].Position;
}

void UFABRIKComponent::ApplyForward(const FVector& Target)
{
	ApplyForwardFABRIK(0, Segments.Num() - 1, Target);
}

void UFABRIKComponent::ApplyBackward(const FVector& Target)
{
	ApplyBackwardFABRIK(0, Segments.Num() - 1, Target);
}

void UFABRIKComponent::ApplyFixed(const FVector& Target)
{
	if (Segments.Num() == 0)
	{
		return;
	}

	const FVector FixedPosition = Segments.Last().Position;
	ApplyForwardFABRIK(0, Segments.Num() - 1, Target);
	ApplyBackwardFABRIK(0, Segments.Num() - 1, FixedPosition);
}

void UFABRIKComponent::ApplyWithIndex(int32 Index, const FVector& Target)
{
	ApplyForwardFABRIK(Index, Segments.Num() - 1, Target);
	ApplyBackwardFABRIK(0, Index, Target);
}

void UFABRIKComponent::Recalculated()
{
	ApplyForwardFABRIK(0, Segments.Num() - 1, Segments[0].Position);
}
```

> 'c++', 'game', 'beginner'

</details>