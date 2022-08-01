---
layout: post
title: Camera shake
---

- [ ] 동적할당 실패시 오류처리 하는 이유가 뭘까?

## 폭팔
캐릭터 근처에서 무언가가 폭팔할 때 충격파가 치고 플레이어를 혼란스럽게 하는 것을 표현합니다.

흔들림은 거리에 따라 달라집니다.

Scale을 조절함으로서 폭팔의 크기를 조절할 수 있습니다.

## 충격효과
캐릭터가 적이나 물체에 맞았을 때, 또는 캐릭터가 근접 무기로 적과 접촉했을 때 짧은 흔들림을 구현할 수 있습니다.

여러 상황에서 여러 변형과 함께 사용할 수 있스니다.

## 캐릭터 모션
카메라 스윙을 구현하여, 만취 모션을 구현할 수 있습니다.

플레이어의 시야를 흐리게 하는 후처리 효과를 추가할 수 있습니다.

달리는 효과에서는 FOV를 변경하여 미묘한 높이 진동 외에 가속감을 줄 수 있습니다.

Head bobbing(흔들리는)효과를 추가해, Velocity가 변경될 때 카메라 흔들림을 추가할 수 있습니다.

## 차량
레버가 변경될 떄 앞쏠림을 구현할 수 있습니다.

## 환경
지진등의 자연에서 발생하는 효과를 구현 할 수 있습니다.
배에 타고있는 효과를 구현 할 수도 있습니다.
바람이 부는 효과도 구현 할 수 있습니다.


## CameraShake

Offset = Sin(DeletaTime * Frequency)
Frequency가 2PI일 때 한번 진동이 완료됨.

# Camera shake

**카메라 흔들림 또는 화면 흔들림은 많은 비디오 게임에서 세계 또는 플레이어의 움직임 이벤트를 시뮬레이션하여 보다 사실적이거나 임팩트 있는 게임을 만드는 데 사용되는 기술입니다.** 

먼저 카메라 쉐이크를 적용하는 함수는 보통 **PlayController의 멤버 함수인 ClientPlayCameraShake와  UGameplayStatics의 전역 함수인 PlayWorldCameraShake가 있습니다.** 

* Client Play Camera Shake는 해당 플레이어의 카메라만을 흔들때 사용합니다. 
* PlayWorldCameraShake는 월드의 흔들림을 표시하는 용도로 사용합니다.
* [여기서 Camera shake의 튜토리얼을 볼 수 있습니다.](https://www.parallelcube.com/2021/03/23/camera-shakes/)
* [ueHow의 Play World Camera Shake를 볼 수 있습니다.](https://uehow.web.fc2.com/Contents/Eng/UE4/BluePrint/NodeReference_Game/PlayWorldCameraShake.html)

```cpp
GetWorld()->GetFirstPlayerController()->ClientPlayCameraShake(CS_shake, 1.0f);
```

```cpp
UGameplayStatics::PlayWorldCameraShake(GetWorld(), CS_shake, GetActorLocation(), ...);
```

## 카메라 쉐이크 옵션 기능
* Single Instance는 카메라 쉐이크를 여러번 재생했을 때, 한번 진동이 되게끔 하는 설정입니다.
* Oscillation Duration은 진동 지속 시간 / 초 단위입니다.
    - 음수이면 무한대로 재생됩니다.
* Oscillation Blend in Time은 블렌드 인 지속 시간으로 카메라 쉐이크 발동시 점점 강해지는 시간입니다.
* Oscillation Blend Out Time은 블렌드 아웃 지속 시간으로 카메라 쉐이크 발동시 점점 약해지는 시간입니다.

* Rot Oscillation은 카메라 회전 쉐이크입니다.
* Loc Oscillation은 카메라 위치 쉐이크입니다.
* FOV Oscillation은 카메라 화각 쉐이크입니다.
* Anim Shake는 카메라 애님 쉐이크로 그래프를 통한 직접적인 카메라 흔들기입니다.

* Amplitude는 카메라 쉐이킹 강도를 나타냅니다.
* Frequency는 카메라 쉐이킹 속도를 나타냅니다.
* Initial Offset은 카메라 초기 오프셋을 나타냅니다.

카메라 쉐이크를 C++클래스로 관리할 수도, Blueprint로 관리할 수도 있습니다. 이는 편의에 따른 선택입니다.

## 코드

```mermaid
graphLR
APlayerController::ClientStartCameraShake--->PlayerCameraManager::StartCameraShake

PlayerCameraManager::StartCameraShake--->CachedCameraShakeMod::AddCameraShake

CachedCameraShakeMod::AddCameraShake--->
```

ClientStartCameraShake에 대해
```cpp
	/** 
	 * Play Camera Shake 
	 * @param Shake - Camera shake animation to play
	 * @param Scale - Scalar defining how "intense" to play the anim
	 * @param PlaySpace - Which coordinate system to play the shake in (used for CameraAnims within the shake).
	 * @param UserPlaySpaceRot - Matrix used when PlaySpace = CAPS_UserDefined
	 */
	UFUNCTION(unreliable, client, BlueprintCallable, Category="Game|Feedback")
	void ClientStartCameraShake(TSubclassOf<class UCameraShakeBase> Shake, float Scale = 1.f, ECameraShakePlaySpace PlaySpace = ECameraShakePlaySpace::CameraLocal, FRotator UserPlaySpaceRot = FRotator::ZeroRotator);
```
PlayerCameraManager의 StartCameraShake를 호출함
```cpp
void APlayerController::ClientStartCameraShake_Implementation( TSubclassOf<class UCameraShakeBase> Shake, float Scale, ECameraShakePlaySpace PlaySpace, FRotator UserPlaySpaceRot )
{
	if (PlayerCameraManager != NULL)
	{
		PlayerCameraManager->StartCameraShake(Shake, Scale, PlaySpace, UserPlaySpaceRot);
	}
}
```

CachedCameraShakeMod의 AddCameraShake를 호출함
* CachedCameraShakeMod는 PostInitializeComponents에서 생성됨.
```cpp
UCameraShakeBase* APlayerCameraManager::StartCameraShake(TSubclassOf<UCameraShakeBase> ShakeClass, float Scale, ECameraShakePlaySpace PlaySpace, FRotator UserPlaySpaceRot)
{
	if (ShakeClass && CachedCameraShakeMod && (Scale > 0.0f) )
	{
		return CachedCameraShakeMod->AddCameraShake(ShakeClass, FAddCameraShakeParams(Scale, PlaySpace, UserPlaySpaceRot));
	}

	return nullptr;
}
```

ShakeClass가 유효하다면
```cpp
UCameraShakeBase* UCameraModifier_CameraShake::AddCameraShake(TSubclassOf<UCameraShakeBase> ShakeClass, const FAddCameraShakeParams& Params)
{
	SCOPE_CYCLE_COUNTER(STAT_AddCameraShake);

	if (ShakeClass != nullptr)
	{
```

파라메터 설정 후
```cpp
		float Scale = Params.Scale;
		const UCameraShakeSourceComponent* SourceComponent = Params.SourceComponent;
		const bool bIsCustomInitialized = Params.Initializer.IsBound();

		// Adjust for splitscreen
		if (CameraOwner != nullptr && GEngine->IsSplitScreen(CameraOwner->GetWorld()))
		{
			Scale *= SplitScreenShakeScale;
		}
```

기본 인스턴스를 가져온 후, 싱글 인스턴스면 다음을 수행함. 이 때 이미있으면, 재시작하고 종료함. 없으면 만들어야함.

* UCameraShakeBase에 bSingleInstance가 정의되어 있음.
```cpp
		UCameraShakeBase const* const ShakeCDO = GetDefault<UCameraShakeBase>(ShakeClass);
		const bool bIsSingleInstance = ShakeCDO && ShakeCDO->bSingleInstance;
		if (bIsSingleInstance)
		{
			// Look for existing instance of same class
			for (FActiveCameraShakeInfo& ShakeInfo : ActiveShakes)
			{
				UCameraShakeBase* ShakeInst = ShakeInfo.ShakeInstance;
				if (ShakeInst && (ShakeClass == ShakeInst->GetClass()))
				{
					if (!ShakeInfo.bIsCustomInitialized && !bIsCustomInitialized)
					{
						// Just restart the existing shake, possibly at the new location.
						// Warning: if the shake source changes, this would "teleport" the shake, which might create a visual
						// artifact, if the user didn't intend to do this.
						ShakeInfo.ShakeSource = SourceComponent;
						ShakeInst->StartShake(CameraOwner, Scale, Params.PlaySpace, Params.UserPlaySpaceRot);
						return ShakeInst;
					}
					else
					{
						// If either the old or new shake are custom initialized, we can't
						// reliably restart the existing shake and expect it to be the same as what the caller wants. 
						// So we forcibly stop the existing shake immediately and will create a brand new one.
						ShakeInst->StopShake(true);
						// Discard it right away so the spot is free in the active shakes array.
						ShakeInfo.ShakeInstance = nullptr;
					}
				}
			}
		}
```

**새로운 인스턴스를 생성함**
```cpp
		// Try to find a shake in the expired pool
		UCameraShakeBase* NewInst = ReclaimShakeFromExpiredPool(ShakeClass);

		// No old shakes, create a new one
		if (NewInst == nullptr)
		{
			NewInst = NewObject<UCameraShakeBase>(this, ShakeClass);
		}
```

제대로 생성했다면, 실행시키고 반환함.
```cpp
		if (NewInst)
		{
			// Custom initialization if necessary.
			if (bIsCustomInitialized)
			{
				Params.Initializer.Execute(NewInst);
			}

			// Initialize new shake and add it to the list of active shakes
			NewInst->StartShake(CameraOwner, Scale, Params.PlaySpace, Params.UserPlaySpaceRot);

			// Look for nulls in the array to replace first -- keeps the array compact
			bool bReplacedNull = false;
			for (int32 Idx = 0; Idx < ActiveShakes.Num(); ++Idx)
			{
				FActiveCameraShakeInfo& ShakeInfo = ActiveShakes[Idx];
				if (ShakeInfo.ShakeInstance == nullptr)
				{
					ShakeInfo.ShakeInstance = NewInst;
					ShakeInfo.ShakeSource = SourceComponent;
					ShakeInfo.bIsCustomInitialized = bIsCustomInitialized;
					bReplacedNull = true;
				}
			}

			// no holes, extend the array
			if (bReplacedNull == false)
			{
				FActiveCameraShakeInfo ShakeInfo;
				ShakeInfo.ShakeInstance = NewInst;
				ShakeInfo.ShakeSource = SourceComponent;
				ShakeInfo.bIsCustomInitialized = bIsCustomInitialized;
				ActiveShakes.Emplace(ShakeInfo);
			}
		}

		return NewInst;
	}
```
모든 실패시 기본 반환값은 nullptr임.
```cpp
	return nullptr;
}
```

주요 참고자료 : [Camera shakes](https://www.parallelcube.com/2021/03/23/camera-shakes/)