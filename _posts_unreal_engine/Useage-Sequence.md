---
layout: post
title: Sequence
---
## SequenceDirector
**레벨 시퀀스의 카메라로, 바인드 할 때 레벨 시퀀스에서 이벤트를 호출하는 방식으로 구현됩니다.** 이 때 사용할 수 있는 것이 SequenceDirector입니다. **파라메터를 필요로 하는 메서드를 SequenceDirector를 이용하여, 호출 할 수 있습니다.**

레벨 시퀀스에서 다음과 같은 방법으로 불러올 수 있습니다.
 ```
    LevelSequenceActor->GetSequence()->GetDirectorBlueprint();
 ```

## LevelSequence를 이용한 카메라 제어
LevelSequence를 이용해서 카메라를 전환할 때, CutScene을 이용해 전환하는 방법과, 카메라 전환을 통해 Blend하는 방법이 있습니다.

[여러 카메라 전환](https://docs.unrealengine.com/4.26/ko/InteractiveExperiences/UsingCameras/SwitchingCameras/)에서 Trigger Volume에 들어서면 카메라 액터를 전환하는 예제를 보여주고 있습니다.

여기서 카메라 전환의 핵심적인 내용은 **PlayerController의 SetViewTargetWithBlend 메서드**를 통해서 카메라 전환을 제어하는 것 입니다.

* SetViewTargetWithBlend
    1. APlayerController::FViewTargetTransitionParams를 만들어, SetViewTarget을 호출합니다.
    2. APlayerController::SetViewTarget에서 Director가 유효할 경우, OldViewTarget을 NewViewTarget으로 업데이트 합니다. 그리고 PlayerCameraManager가 유효할 경우, CameraManager::SetViewTarget을 호출합니다.
        - 감독 트랙에 의해 제어되는 경우 새 뷰 타겟으로 업데이트합니다.
        - 완료되면 적절한 viewtarget으로 돌아갑니다.
    3. APlayerCameraManager::SetViewTarget에서 ViewTarget이 유효한지 검사한 후, 최근 뷰 타겟을 업데이트 합니다. 
    보류된 뷰타겟과, 새로운 뷰 타겟이 같을 경우, 종료합니다.
    그 다음, ViewTarget을 업데이트 하는 작업을 합니다.
    - TimerHandle을 초기화 하고 다시 설정합니다.

* FFViewTarget의 CheckViewTarget에서 타겟이 유효하지 않거나, 킬대기 상태인 경우, 가능하다면 폰으로 안되면 컨트롤러로 ViewTarget을 업데이트 합니다.
    - **이때 OwningController의 ViewTarget이 Nullptr인 경우, Controller로 대체됩니다.**

* 카메라 액터의 종횡비 비활성화는, Constrain Aspect Ratio로 설정할 수 있습니다.

## LevelSequence를 이용한 애니메이션 제어
[다른 스켈레탈 메시에서 포즈 복사](https://docs.unrealengine.com/4.26/ko/AnimatingObjects/SkeletalMeshAnimation/AnimHowTo/CopyPose/)또는 애니메이션을 재생하여 실제로 애니메이션 적용하는 방법과, **애니메이션이 재생된 것 처럼 보이게 하는 방법이 있습니다.**

카메라를 제어 한 후, 수명주기가 레벨 시퀀스인 스켈레탈 메쉬를 이용하는 방법입니다. 이때 컨트롤 리그를 이용하거나, 애니메이션을 적용하거나, 애님 인스턴스로 보다 자연스럽게 만들 수 도 있습니다. **이 떄 캐릭터의 움직임 제어와, 콜리젼은 신경써야 합니다.**

## ActorSequenceComponent
액터 시퀀스 컴포넌트는 액터에 컴포넌트를 추가하여 실행 할 수 있습니다. 컴포넌트의 애니메이션을 제어하는데 효과적이라고 생각합니다. (예를 들어 권총의 발사, 기기의 작동 등)

* UE 4.27에서 experimental이라는 점이 문제입니다.