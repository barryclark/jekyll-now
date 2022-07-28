---
layout: post
title: Automation test HorrorMoveable
---

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
2. 이동하는 도중, Overlap 이벤트를 발생시킵니다.

! [Image](/images/Useage-Automation_test_HorrorMoveable_1.gif)

* Sweep은 `쓸다`란 의미입니다. 빗자루로 바닥을 쓸 듯이, 콜리젼으로 휩쓰는 것으로 이해하고 있습니다.

Actor의 포지션을 움직일 때 Sweep을 체크하면 다음과 같이 작동합니다.


# UWorld::ComponentSweepMulti


# 