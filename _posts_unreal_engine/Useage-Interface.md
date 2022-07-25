---
layout: post
title: Interface
---

# Interface란?

인터페이스란 추상적인 개념으로 서로 관계없는 것들에 대한 시스템이나 장치를 작동시키기 위한 규제 또는 규약이라고 생각할 수 있습니다.

유사성이 없었는 크고 복잡한 클래스들에게 어떤 게임 함수나 기능을 공유하고자 하는 경우에 많이 쓰입니다.

**언리얼 엔진에서 잠재적으로 무관한 클래스 세트가 공통으 함수 세트를 구현할 수 있도록 하는 경우에 사용됩니다.**

예로 트리거 볼륨에 액터가 오버랩 되었을 때 액터의 구현된 인터페이스를 호출하도록 로직을 작성하면, 해당 인터페이스를 함정, 경보, 점수로 확장하기도, 부르기도, 구현을 나누기도 편해진다고 합니다.

## 인터페이스 생성
```cpp
/*
 *
 */
UINTERFACE(MinimalAPI, Blueprintable)
class UReactInterface : public UInterface
{
	GENERATED_BODY()
};

class IReactInterface
{
	GENERATED_BODY()

public:
	/** Add interface function declarations here */
};
```
UINTERFACE 클래스는 실제 인터페이스가 아닙니다. 언리얼 엔진의 리플렉션 시스템에 보이도록 하기 위해서만 존재하는 클래스 입니다.

## 인터페이스의 상속
```cpp
class AChildActor : public AActor
	, public IReactInterface
```

I로 시작하는 인터페이스 클래스를 상속받아 구현합니다.

* pure virtual(순수 가상함수)를 지원한다고 합니다.

## 인터페이스 함수의 호출
```cpp
	if (SkeletalMeshComponent->GetClass()->ImplementsInterface(UReactToFeetOffInterface::StaticClass()))
	{
		IReactToFeetOffInterface::Execute_SetBoneStrikePosition(SkeletalMeshComponent, BoneName, HitResult.Location, true);
	}
```
인터페이스의 메서드를 호출할 때는 Execute_를 사용해야 합니다. 

## 인터페이스를 이용한 블루프린트 직접 통신
```cpp
UPROPERTY(EditAnywhere, BlueprintReadWrite)
TScriptInterface<IInterface> ChildActor;
```
이를 통해 레벨에 있는 액터를 변수로 불러올 수 있습니다.

## 인터페이스에 반환값을 입력할 떄,
```cpp
class HORRORSYSTEM_API IHorrorItemInterface
{
	GENERATED_BODY()

public:
	virtual AActor* SpawnItemActor(AActor* ContextObject, const FTransform& Transform, bool bNoCollisionFail = false, AActor* Owner = nullptr) const;

public:
	virtual const FName& GetItemName() const { return FName(); }
	virtual int32 GetItemMaxStack() const { return 0; }

	// 유효하면 아이템으로 스폰될 수 있고 그렇지 않으면 스폰될 수 없습니다
	virtual const TSubclassOf<AActor>& GetItemActorClass() const { return TSubclassOf<AActor>(); }

	virtual const FIntSize2D& GetIconSize() const { return FIntSize2D(1, 1); }
	virtual const FSlateBrush& GetIconBrush() const { return FSlateBrush(); }
};
```

다만 RVO되는지 안되는지 모르겠으니, 일딴 막고 나중에 찾아봅시다.