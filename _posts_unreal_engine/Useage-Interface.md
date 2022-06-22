---
layout: post
title: Physics material
---

```cpp
/*
 *
 */

UINTERFACE(MinimalAPI, Blueprintable)
class UReactToFeetOffInterface : public UInterface
{
	GENERATED_BODY()
};

class IReactToFeetOffInterface
{
	GENERATED_BODY()

public:
	/** Add interface function declarations here */

	UFUNCTION(BlueprintCallable, BlueprintImplementableEvent)
	void SetBoneStrikePosition(const FName& BoneName, const FVector& HitPosition, bool IsOffState);
};
```

인터페이스 함수의 호출
```cpp
	if (SkeletalMeshComponent->GetClass()->ImplementsInterface(UReactToFeetOffInterface::StaticClass()))
	{
		IReactToFeetOffInterface::Execute_SetBoneStrikePosition(SkeletalMeshComponent, BoneName, HitResult.Location, true);
	}
```

인터페이스의 상속
```cpp
class AHorrorLight : public AActor
	, public IHorrorLight
```

인터페이스를 이용한 블루프린트 직접 통신
```cpp
UPROPERTY(EditAnywhere, BlueprintReadWrite)
TScriptInterface<IInterface> ChildActor;
```

레벨에 있는 액터를 변수로 불러올 수 있습니다.