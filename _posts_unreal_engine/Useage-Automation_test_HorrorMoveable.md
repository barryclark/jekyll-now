---
layout: post
title: Automation test HorrorMoveable
---

UE 4.27

# 컴포넌트를 움직일 시 스윕을 체크하면
`AddWorldOffset`를 예로 보면

* \Engine\Source\Runtime\Engine\Classes\Components\SceneComponent.h
```cpp
	/**
	 * Adds a delta to the location of the component in world space.
	 * @param DeltaLocation		Change in location in world space for the component.
	 * @param SweepHitResult	Hit result from any impact if sweep is true.
	 * @param bSweep			Whether we sweep to the destination location, triggering overlaps along the way and stopping short of the target if blocked by something.
	 *							Only the root component is swept and checked for blocking collision, child components move without sweeping. If collision is off, this has no effect.
	 * @param bTeleport			Whether we teleport the physics state (if physics collision is enabled for this object).
	 *							If true, physics velocity for this object is unchanged (so ragdoll parts are not affected by change in location).
	 *							If false, physics velocity is updated based on the change in position (affecting ragdoll parts).
	 *							If CCD is on and not teleporting, this will affect objects along the entire sweep volume.
	 */
	UFUNCTION(BlueprintCallable, Category="Utilities|Transformation", meta=(DisplayName="AddWorldOffset", ScriptName="AddWorldOffset", Keywords="location position"))
	void K2_AddWorldOffset(FVector DeltaLocation, bool bSweep, FHitResult& SweepHitResult, bool bTeleport);
	void AddWorldOffset(FVector DeltaLocation, bool bSweep=false, FHitResult* OutSweepHitResult=nullptr, ETeleportType Teleport = ETeleportType::None);
```

**Sweep 파라메터의 주석을 보면**

1. 목적지 위치로, 이동시키되 충돌이 발생하면 블락킹 되고, 충돌을 반환합니다.
2. 쓰는 동안, Overlap을 발생시킵니다.

! [스윕을 키고 움직이는 것을 보여주는 GIF](/images/Useage-Automation_test_HorrorMoveable_1.gif)

* Sweep은 `쓸다`란 의미입니다. 빗자루로 바닥을 쓸 듯이, 콜리젼으로 휩쓰는 것으로 이해하고 있습니다.

<details>
<summary>액터와 컴포넌트의 포지션 설정 함수</summary>
<div markdown="1">

기본적으로 Component의 SetRelativeLocation으로 트랜스폼을 설정하도록 되어 있습니다.

<center><div class="mermaid"> 
graph TD;

AActor::AddActorWorldOffset-->USceneComponent::AddWorldOffset;
USceneComponent::AddWorldOffset-->USceneComponent::SetWorldLocation
USceneComponent::SetWorldLocation-->Component::SetRelativeComponent
</div></center>

```cpp
void AActor::AddActorWorldOffset(FVector DeltaLocation, bool bSweep, FHitResult* OutSweepHitResult, ETeleportType Teleport)
{
	if (RootComponent)
	{
		RootComponent->AddWorldOffset(DeltaLocation, bSweep, OutSweepHitResult, Teleport);
	}
	else if (OutSweepHitResult)
	{
		*OutSweepHitResult = FHitResult();
	}
}
```

```cpp
void USceneComponent::AddWorldOffset(FVector DeltaLocation, bool bSweep, FHitResult* OutSweepHitResult, ETeleportType Teleport)
{
	const FVector NewWorldLocation = DeltaLocation + GetComponentTransform().GetTranslation();
	SetWorldLocation(NewWorldLocation, bSweep, OutSweepHitResult, Teleport);
}
```

```cpp
void USceneComponent::SetWorldLocation(FVector NewLocation, bool bSweep, FHitResult* OutSweepHitResult, ETeleportType Teleport)
{
	FVector NewRelLocation = NewLocation;

	// If attached to something, transform into local space
	if (GetAttachParent() != nullptr && !IsUsingAbsoluteLocation())
	{
		FTransform ParentToWorld = GetAttachParent()->GetSocketTransform(GetAttachSocketName());
		NewRelLocation = ParentToWorld.InverseTransformPosition(NewLocation);
	}

	SetRelativeLocation(NewRelLocation, bSweep, OutSweepHitResult, Teleport);
}
```

</div>
</details>

---

SetRelativeTransform을 보면, 로테이션과 트렌시션에 대해서만 스윕에 따라 힛 결과를 반환하는 것을 알 수 있습니다.
```cpp
void USceneComponent::SetRelativeTransform(const FTransform& NewTransform, bool bSweep, FHitResult* OutSweepHitResult, ETeleportType Teleport)
{
	SetRelativeLocationAndRotation(NewTransform.GetTranslation(), NewTransform.GetRotation(), bSweep, OutSweepHitResult, Teleport);
	SetRelativeScale3D(NewTransform.GetScale3D());
}
```

씬 컴포넌트의 HitResult ptr을 따라가면 USceneComponent::MoveComponentImpl에 반환을 볼 수 있는데, 기본 FHitResult를 반환하도록 되어 있습니다. 이는 당연한데 SceneComponent는 모양이 없기 때문입니다.
```cpp
bool USceneComponent::MoveComponentImpl(const FVector& Delta, const FQuat& NewRotation, bool bSweep, FHitResult* OutHit, EMoveComponentFlags MoveFlags, ETeleportType Teleport)
{
	SCOPE_CYCLE_COUNTER(STAT_MoveComponentSceneComponentTime);

	// static things can move before they are registered (e.g. immediately after streaming), but not after.
	if (IsPendingKill() || CheckStaticMobilityAndWarn(SceneComponentStatics::MobilityWarnText))
	{
		if (OutHit)
		{
			*OutHit = FHitResult();
		}
		return false;
	}

	// Fill in optional output param. SceneComponent doesn't sweep, so this is just an empty result.
	if (OutHit)
	{
		*OutHit = FHitResult(1.f);
	}

	ConditionalUpdateComponentToWorld();

	// early out for zero case
	if( Delta.IsZero() )
	{
		// Skip if no vector or rotation.
		if (NewRotation.Equals(GetComponentTransform().GetRotation(), SCENECOMPONENT_QUAT_TOLERANCE))
		{
			return true;
		}
	}

	// just teleport, sweep is supported for PrimitiveComponents. This will update child components as well.
	const bool bMoved = InternalSetWorldLocationAndRotation(GetComponentLocation() + Delta, NewRotation, false, Teleport);

	// Only update overlaps if not deferring updates within a scope
	if (bMoved && !IsDeferringMovementUpdates())
	{
		// need to update overlap detection in case PrimitiveComponents are attached.
		UpdateOverlaps();
	}

	return true;
}
```

PrimitiveComponent로 가면 코드를 볼 수 있습니다. 전부다 이해하기는 많이 버겁지만, Hit을 반환하는 코드를 보면 bFilledHitResult가 true일 떄 BlockingHit로 설정됩니다.

BlockingHit은 첫번째 충돌을 반환합니다. bSweep이 true일 때 코드는 다음과 같이 작동합니다. 오버렙은 첫번째 충돌이 나오기 전까지 작동합니다.

1. 이 액터에 필요한 경우 이동 충돌 검사를 수행합니다.
    - IsQueryCollisionEnabled()이 true일 떄, 검사하는 길이가 0보다 클 때,
2. World를 가져와 해당 프리미티브를 바탕으로 ComponentSweepMulti를 수행합니다.
3. Hits에서 충돌이 발생할 때까지 Hit과 Overlap을 처리합니다.
4. 충돌이 있다면, BlockingHit = Hits[BlockingHitIndex]를 수행합니다.
5. 충돌을 바탕으로 새로운 포지션으로 업데이트 합니다.
    - const FVector ToNewLocation = (NewLocation - TraceStart)로 작동합니다.
6. 새로운 포지션으로 설정한 후 (InternalSetWorldLocationAndRotation)합니다.
    - InternalSetWorldLocationAndRotation에서 UpdateComponentToWorldWithParent를 호출합니다.
7. 움직였을 떄, 움직임을 지연한 상태이면, 오버랩 이벤트를 대기시킵니다. 아니라면, 오버랩 이벤트를 발생시킵니다.
    - 지연된 움직임의 결정은, ScopedMovementStack이 1이상일 때, 결정됩니다.
8. 마지막으로, 움직임을 지연한 상태라면, 힛트를 지연시키고, 아니라면, 히트 이벤트를 발생시킵니다.

* IsDeferringMovementUpdates는 움직임이 현재 FScopedMovementUpdate 범위 내에 있으면 true를 반환합니다 .
* FScopedMovementUpdate는 업데이트를 연기하지 않는 가장 바깥쪽 범위가 끝날 때까지 이동 전파를 연기할 수 있는 새로운 이동 범위를 만듭니다.
 이 범위 내에서 이동하면 이동이 커밋될 때까지 UpdateBounds(), OnUpdateTransform(), UpdatePhysicsVolume(), UpdateChildTransforms() 등과 같은 업데이트를 피할 수 있습니다(지연된 마지막 범위가 컨텍스트를 벗어날 때 발생).
* 언리얼에서 PrimitiveComponent는 일반적으로 렌더링되거나 충돌 데이터로  사용되는 일종의 지오메트리를 포함하거나 생성하는 SceneComponent입니다.

```cpp
bool UPrimitiveComponent::MoveComponentImpl( const FVector& Delta, const FQuat& NewRotationQuat, bool bSweep, FHitResult* OutHit, EMoveComponentFlags MoveFlags, ETeleportType Teleport)
{
	SCOPE_CYCLE_COUNTER(STAT_MoveComponentTime);
	CSV_SCOPED_TIMING_STAT(PrimitiveComponent, MoveComponentTime);

#if !(UE_BUILD_SHIPPING || UE_BUILD_TEST) && PERF_MOVECOMPONENT_STATS
	FScopedMoveCompTimer MoveTimer(this, Delta);
#endif // !(UE_BUILD_SHIPPING || UE_BUILD_TEST) && PERF_MOVECOMPONENT_STATS

#if defined(PERF_SHOW_MOVECOMPONENT_TAKING_LONG_TIME) || LOOKING_FOR_PERF_ISSUES
	uint32 MoveCompTakingLongTime=0;
	CLOCK_CYCLES(MoveCompTakingLongTime);
#endif

	// static things can move before they are registered (e.g. immediately after streaming), but not after.
	if (IsPendingKill() || CheckStaticMobilityAndWarn(PrimitiveComponentStatics::MobilityWarnText))
	{
		if (OutHit)
		{
			OutHit->Init();
		}
		return false;
	}

	ConditionalUpdateComponentToWorld();

	// Set up
	const FVector TraceStart = GetComponentLocation();
	const FVector TraceEnd = TraceStart + Delta;
	float DeltaSizeSq = (TraceEnd - TraceStart).SizeSquared();				// Recalc here to account for precision loss of float addition
	const FQuat InitialRotationQuat = GetComponentTransform().GetRotation();

	// ComponentSweepMulti does nothing if moving < KINDA_SMALL_NUMBER in distance, so it's important to not try to sweep distances smaller than that. 
	const float MinMovementDistSq = (bSweep ? FMath::Square(4.f*KINDA_SMALL_NUMBER) : 0.f);
	if (DeltaSizeSq <= MinMovementDistSq)
	{
		// Skip if no vector or rotation.
		if (NewRotationQuat.Equals(InitialRotationQuat, SCENECOMPONENT_QUAT_TOLERANCE))
		{
			// copy to optional output param
			if (OutHit)
			{
				OutHit->Init(TraceStart, TraceEnd);
			}
			return true;
		}
		DeltaSizeSq = 0.f;
	}

	const bool bSkipPhysicsMove = ((MoveFlags & MOVECOMP_SkipPhysicsMove) != MOVECOMP_NoFlags);

	// WARNING: HitResult is only partially initialized in some paths. All data is valid only if bFilledHitResult is true.
	FHitResult BlockingHit(NoInit);
	BlockingHit.bBlockingHit = false;
	BlockingHit.Time = 1.f;
	bool bFilledHitResult = false;
	bool bMoved = false;
	bool bIncludesOverlapsAtEnd = false;
	bool bRotationOnly = false;
	TInlineOverlapInfoArray PendingOverlaps;
	AActor* const Actor = GetOwner();

	if ( !bSweep )
	{
		// not sweeping, just go directly to the new transform
		bMoved = InternalSetWorldLocationAndRotation(TraceEnd, NewRotationQuat, bSkipPhysicsMove, Teleport);
		bRotationOnly = (DeltaSizeSq == 0);
		bIncludesOverlapsAtEnd = bRotationOnly && (AreSymmetricRotations(InitialRotationQuat, NewRotationQuat, GetComponentScale())) && IsQueryCollisionEnabled();
	}
	else
	{
		TArray<FHitResult> Hits;
		FVector NewLocation = TraceStart;

		// Perform movement collision checking if needed for this actor.
		const bool bCollisionEnabled = IsQueryCollisionEnabled();
		if( bCollisionEnabled && (DeltaSizeSq > 0.f))
		{
#if !(UE_BUILD_SHIPPING || UE_BUILD_TEST)
			if( !IsRegistered() )
			{
				if (Actor)
				{
					ensureMsgf(IsRegistered(), TEXT("%s MovedComponent %s not initialized deleteme %d"),*Actor->GetName(), *GetName(), Actor->IsPendingKill());
				}
				else
				{ //-V523
					ensureMsgf(IsRegistered(), TEXT("MovedComponent %s not initialized"), *GetFullName());
				}
			}
#endif

#if !(UE_BUILD_SHIPPING || UE_BUILD_TEST) && PERF_MOVECOMPONENT_STATS
			MoveTimer.bDidLineCheck = true;
#endif 
			UWorld* const MyWorld = GetWorld();

			static const FName TraceTagName = TEXT("MoveComponent");
			const bool bForceGatherOverlaps = !ShouldCheckOverlapFlagToQueueOverlaps(*this);
			FComponentQueryParams Params(SCENE_QUERY_STAT(MoveComponent), Actor);
			FCollisionResponseParams ResponseParam;
			InitSweepCollisionParams(Params, ResponseParam);
			Params.bIgnoreTouches |= !(GetGenerateOverlapEvents() || bForceGatherOverlaps);
			Params.TraceTag = TraceTagName;
			bool const bHadBlockingHit = MyWorld->ComponentSweepMulti(Hits, this, TraceStart, TraceEnd, InitialRotationQuat, Params);

			if (Hits.Num() > 0)
			{
				const float DeltaSize = FMath::Sqrt(DeltaSizeSq);
				for(int32 HitIdx=0; HitIdx<Hits.Num(); HitIdx++)
				{
					PullBackHit(Hits[HitIdx], TraceStart, TraceEnd, DeltaSize);
				}
			}

			// If we had a valid blocking hit, store it.
			// If we are looking for overlaps, store those as well.
			int32 FirstNonInitialOverlapIdx = INDEX_NONE;
			if (bHadBlockingHit || (GetGenerateOverlapEvents() || bForceGatherOverlaps))
			{
				int32 BlockingHitIndex = INDEX_NONE;
				float BlockingHitNormalDotDelta = BIG_NUMBER;
				for( int32 HitIdx = 0; HitIdx < Hits.Num(); HitIdx++ )
				{
					const FHitResult& TestHit = Hits[HitIdx];

					if (TestHit.bBlockingHit)
					{
						if (!ShouldIgnoreHitResult(MyWorld, TestHit, Delta, Actor, MoveFlags))
						{
							if (TestHit.bStartPenetrating)
							{
								// We may have multiple initial hits, and want to choose the one with the normal most opposed to our movement.
								const float NormalDotDelta = (TestHit.ImpactNormal | Delta);
								if (NormalDotDelta < BlockingHitNormalDotDelta)
								{
									BlockingHitNormalDotDelta = NormalDotDelta;
									BlockingHitIndex = HitIdx;
								}
							}
							else if (BlockingHitIndex == INDEX_NONE)
							{
								// First non-overlapping blocking hit should be used, if an overlapping hit was not.
								// This should be the only non-overlapping blocking hit, and last in the results.
								BlockingHitIndex = HitIdx;
								break;
							}
						}
					}
					else if (GetGenerateOverlapEvents() || bForceGatherOverlaps)
					{
						UPrimitiveComponent* OverlapComponent = TestHit.Component.Get();
						if (OverlapComponent && (OverlapComponent->GetGenerateOverlapEvents() || bForceGatherOverlaps))
						{
							if (!ShouldIgnoreOverlapResult(MyWorld, Actor, *this, TestHit.GetActor(), *OverlapComponent, /*bCheckOverlapFlags=*/ !bForceGatherOverlaps))
							{
								// don't process touch events after initial blocking hits
								if (BlockingHitIndex >= 0 && TestHit.Time > Hits[BlockingHitIndex].Time)
								{
									break;
								}

								if (FirstNonInitialOverlapIdx == INDEX_NONE && TestHit.Time > 0.f)
								{
									// We are about to add the first non-initial overlap.
									FirstNonInitialOverlapIdx = PendingOverlaps.Num();
								}

								// cache touches
								AddUniqueOverlapFast(PendingOverlaps, FOverlapInfo(TestHit));
							}
						}
					}
				}

				// Update blocking hit, if there was a valid one.
				if (BlockingHitIndex >= 0)
				{
					BlockingHit = Hits[BlockingHitIndex];
					bFilledHitResult = true;
				}
			}
		
			// Update NewLocation based on the hit result
			if (!BlockingHit.bBlockingHit)
			{
				NewLocation = TraceEnd;
			}
			else
			{
				check(bFilledHitResult);
				NewLocation = TraceStart + (BlockingHit.Time * (TraceEnd - TraceStart));

				// Sanity check
				const FVector ToNewLocation = (NewLocation - TraceStart);
				if (ToNewLocation.SizeSquared() <= MinMovementDistSq)
				{
					// We don't want really small movements to put us on or inside a surface.
					NewLocation = TraceStart;
					BlockingHit.Time = 0.f;

					// Remove any pending overlaps after this point, we are not going as far as we swept.
					if (FirstNonInitialOverlapIdx != INDEX_NONE)
					{
						const bool bAllowShrinking = false;
						PendingOverlaps.SetNum(FirstNonInitialOverlapIdx, bAllowShrinking);
					}
				}
			}

			bIncludesOverlapsAtEnd = AreSymmetricRotations(InitialRotationQuat, NewRotationQuat, GetComponentScale());

#if !(UE_BUILD_SHIPPING || UE_BUILD_TEST)
			if (UCheatManager::IsDebugCapsuleSweepPawnEnabled() && BlockingHit.bBlockingHit && !IsZeroExtent())
			{
				// this is sole debug purpose to find how capsule trace information was when hit 
				// to resolve stuck or improve our movement system - To turn this on, use DebugCapsuleSweepPawn
				APawn const* const ActorPawn = (Actor ? Cast<APawn>(Actor) : NULL);
				if (ActorPawn && ActorPawn->Controller && ActorPawn->Controller->IsLocalPlayerController())
				{
					APlayerController const* const PC = CastChecked<APlayerController>(ActorPawn->Controller);
					if (PC->CheatManager)
					{
						FVector CylExtent = ActorPawn->GetSimpleCollisionCylinderExtent()*FVector(1.001f,1.001f,1.0f);							
						FCollisionShape CapsuleShape = FCollisionShape::MakeCapsule(CylExtent);
						PC->CheatManager->AddCapsuleSweepDebugInfo(TraceStart, TraceEnd, BlockingHit.ImpactPoint, BlockingHit.Normal, BlockingHit.ImpactNormal, BlockingHit.Location, CapsuleShape.GetCapsuleHalfHeight(), CapsuleShape.GetCapsuleRadius(), true, (BlockingHit.bStartPenetrating && BlockingHit.bBlockingHit) ? true: false);
					}
				}
			}
#endif
		}
		else if (DeltaSizeSq > 0.f)
		{
			// apply move delta even if components has collisions disabled
			NewLocation += Delta;
			bIncludesOverlapsAtEnd = false;
		}
		else if (DeltaSizeSq == 0.f && bCollisionEnabled)
		{
			bIncludesOverlapsAtEnd = AreSymmetricRotations(InitialRotationQuat, NewRotationQuat, GetComponentScale());
			bRotationOnly = true;
		}

		// Update the location.  This will teleport any child components as well (not sweep).
		bMoved = InternalSetWorldLocationAndRotation(NewLocation, NewRotationQuat, bSkipPhysicsMove, Teleport);
	}

	// Handle overlap notifications.
	if (bMoved)
	{
		if (IsDeferringMovementUpdates())
		{
			// Defer UpdateOverlaps until the scoped move ends.
			FScopedMovementUpdate* ScopedUpdate = GetCurrentScopedMovement();
			if (bRotationOnly && bIncludesOverlapsAtEnd)
			{
				ScopedUpdate->KeepCurrentOverlapsAfterRotation(bSweep);
			}
			else
			{
				ScopedUpdate->AppendOverlapsAfterMove(PendingOverlaps, bSweep, bIncludesOverlapsAtEnd);
			}
		}
		else
		{
			if (bIncludesOverlapsAtEnd)
			{
				TInlineOverlapInfoArray OverlapsAtEndLocation;
				bool bHasEndOverlaps = false;
				if (bRotationOnly)
				{
					bHasEndOverlaps = ConvertRotationOverlapsToCurrentOverlaps(OverlapsAtEndLocation, OverlappingComponents);
				}
				else
				{
					bHasEndOverlaps = ConvertSweptOverlapsToCurrentOverlaps(OverlapsAtEndLocation, PendingOverlaps, 0, GetComponentLocation(), GetComponentQuat());
				}
				TOverlapArrayView PendingOverlapsView(PendingOverlaps);
				TOverlapArrayView OverlapsAtEndView(OverlapsAtEndLocation);
				UpdateOverlaps(&PendingOverlapsView, true, bHasEndOverlaps ? &OverlapsAtEndView : nullptr);
			}
			else
			{
				TOverlapArrayView PendingOverlapsView(PendingOverlaps);
				UpdateOverlaps(&PendingOverlapsView, true, nullptr);
			}
		}
	}

	// Handle blocking hit notifications. Avoid if pending kill (which could happen after overlaps).
	const bool bAllowHitDispatch = !BlockingHit.bStartPenetrating || !(MoveFlags & MOVECOMP_DisableBlockingOverlapDispatch);
	if (BlockingHit.bBlockingHit && bAllowHitDispatch && !IsPendingKill())
	{
		check(bFilledHitResult);
		if (IsDeferringMovementUpdates())
		{
			FScopedMovementUpdate* ScopedUpdate = GetCurrentScopedMovement();
			ScopedUpdate->AppendBlockingHitAfterMove(BlockingHit);
		}
		else
		{
			DispatchBlockingHit(*Actor, BlockingHit);
		}
	}

#if defined(PERF_SHOW_MOVECOMPONENT_TAKING_LONG_TIME) || LOOKING_FOR_PERF_ISSUES
	UNCLOCK_CYCLES(MoveCompTakingLongTime);
	const float MSec = FPlatformTime::ToMilliseconds(MoveCompTakingLongTime);
	if( MSec > PERF_SHOW_MOVECOMPONENT_TAKING_LONG_TIME_AMOUNT )
	{
		if (GetOwner())
		{
			UE_LOG(LogPrimitiveComponent, Log, TEXT("%10f executing MoveComponent for %s owned by %s"), MSec, *GetName(), *GetOwner()->GetFullName() );
		}
		else
		{
			UE_LOG(LogPrimitiveComponent, Log, TEXT("%10f executing MoveComponent for %s"), MSec, *GetFullName() );
		}
	}
#endif

	// copy to optional output param
	if (OutHit)
	{
		if (bFilledHitResult)
		{
			*OutHit = BlockingHit;
		}
		else
		{
			OutHit->Init(TraceStart, TraceEnd);
		}
	}

	// Return whether we moved at all.
	return bMoved;
}
```

UWorld::ComponentSweepMulti은 다음과 같이 작동합니다.

1. 반환할 충돌을 초기화 합니다.
2. 충돌검사가 가능한 경우, 콜리젼 타입을 가져옵니다.
3. 이때 크기가 없다면, 점으로 처리합니다.
4. Physics가 충돌하는지 검사합니다.

* 공식문서의 피직스 바디 페이지를 보면 `PhysX 로 직접 호출하지 않습니다. 대신 모든 피직스 관련 호출은 피직스 인터페이스를 통합니다.`
* TArray의 Reset은 메모리를 초기화 하지 않고, Empty처럼 작동합니다.
```cpp

bool UWorld::ComponentSweepMulti(TArray<struct FHitResult>& OutHits, class UPrimitiveComponent* PrimComp, const FVector& Start, const FVector& End, const FQuat& Quat, const FComponentQueryParams& Params) const
{
	OutHits.Reset();

	if (GetPhysicsScene() == NULL)
	{
		return false;
	}

	if (PrimComp == NULL)
	{
		UE_LOG(LogCollision, Log, TEXT("ComponentSweepMulti : No PrimComp"));
		return false;
	}

	ECollisionChannel TraceChannel = PrimComp->GetCollisionObjectType();

	// if extent is 0, do line trace
	if (PrimComp->IsZeroExtent())
	{
		return FPhysicsInterface::RaycastMulti(this, OutHits, Start, End, TraceChannel, Params, FCollisionResponseParams(PrimComp->GetCollisionResponseToChannels()));
	}


	const FBodyInstance* BodyInstance = PrimComp->GetBodyInstance();

	if (!BodyInstance || !BodyInstance->IsValidBodyInstance())
	{
		UE_LOG(LogCollision, Log, TEXT("ComponentSweepMulti : (%s) No physics data"), *PrimComp->GetReadableName());
		return false;
	}

#if !(UE_BUILD_SHIPPING || UE_BUILD_TEST)
	if(PrimComp->IsA(USkeletalMeshComponent::StaticClass()))
	{
		UE_LOG(LogCollision, Log, TEXT("ComponentSweepMulti : SkeletalMeshComponent support only root body (%s) "), *PrimComp->GetReadableName());
	}
#endif

	SCOPE_CYCLE_COUNTER(STAT_Collision_GeomSweepMultiple);
	bool bHaveBlockingHit = false;

	FPhysicsCommand::ExecuteRead(BodyInstance->ActorHandle, [&](const FPhysicsActorHandle& Actor)
	{
		if(!FPhysicsInterface::IsValid(Actor))
		{
			return;
		}

		// Get all the shapes from the actor
		FInlineShapeArray PShapes;
		const int32 NumShapes = FillInlineShapeArray_AssumesLocked(PShapes, Actor);

		// calculate the test global pose of the actor
		const FTransform GlobalStartTransform(Quat, Start);
		const FTransform GlobalEndTransform(Quat, End);

		for(FPhysicsShapeHandle& Shape : PShapes)
		{
			check(Shape.IsValid());
			ECollisionShapeType ShapeType = FPhysicsInterface::GetShapeType(Shape);

#if WITH_CHAOS
			if (!Shape.GetGeometry().IsConvex())
			{
				//We skip complex shapes. Should this respect complex as simple?
				continue;
			}
#else
			if(ShapeType == ECollisionShapeType::Heightfield || ShapeType == ECollisionShapeType::Trimesh)
			{
				//We skip complex shapes. Should this respect complex as simple?
				continue;
			}
#endif

			// Calc shape global pose
			const FTransform ShapeLocalTransform = FPhysicsInterface::GetLocalTransform(Shape);
			const FTransform GlobalStartTransform_Shape = ShapeLocalTransform * GlobalStartTransform;
			FTransform GlobalEndTransform_Shape = ShapeLocalTransform * GlobalEndTransform;

			// consider localshape rotation for shape rotation
			const FQuat ShapeQuat = Quat * ShapeLocalTransform.GetRotation();

			FPhysicsGeometryCollection GeomCollection = FPhysicsInterface::GetGeometryCollection(Shape);
			TArray<FHitResult> TmpHits;
			if(FPhysicsInterface::GeomSweepMulti(this, GeomCollection, ShapeQuat, TmpHits, GlobalStartTransform_Shape.GetTranslation(), GlobalEndTransform_Shape.GetTranslation(), TraceChannel, Params, FCollisionResponseParams(PrimComp->GetCollisionResponseToChannels())))
			{
				bHaveBlockingHit = true;
			}
			OutHits.Append(TmpHits);	//todo: should these be made unique?
		}
	});

	return bHaveBlockingHit;
}
```

* Geometry로 Sweep