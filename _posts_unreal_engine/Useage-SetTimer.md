---
layout: post
title: Set Timer
---

UE 5.01
2022 05 22

## SetTimer란?

[게임플레이 타이머](https://docs.unrealengine.com/4.27/ko/ProgrammingAndScripting/ProgrammingWithCPP/UnrealArchitecture/Timers/)란 타이머를 통해 딜레이 이후 또는 일정 시간에 걸쳐 동작을 수행하도록 스케쥴을 잡는 용도로 사용됩니다. 에를 들어, 플레이어가 어떤 아이템을 습득하면 10초간 무적이 되었다가 원래대로 돌아가게 할 수 있습니다.

* 플레이어가 독가스로 가득찬 방에 있는 동안 매 초마다 대미지를 적용할 수 있습니다.

타이머는 글로벌 TimerManager에서 관리됩니다. 글로벌 타이머 매니저는 GameInstance오브젝트와 각 World에 존재합니다. 타임 매니저와 함께 타이머를 셋업하는 데 사용되는 주 함수는 SetTimer와 SetTimerForNetTick둘이 있습니다.

* 이 함수와 관련된 자세한 내용은 [Timer Managet API page](https://docs.unrealengine.com/5.0/en-US/API/Runtime/Engine/FTimerManager/)를 참고할 수 있습니다.

## BP에서 SetTimer

* \Engine\Source\Runtime\Engine\Classes\Kismet\KismetSystemLibrary.h를 이용합니다.

[블루프린트에서 타이머 사용법](https://docs.unrealengine.com/4.27/ko/InteractiveExperiences/UseTimers/Blueprints/)에서 자세한 내용을 볼 수 있습니다.

## CPP에서 SetTimer

* \Engine\Source\Runtime\Engine\Public\TimerManager.h를 이용합니다.

SetTimer는 FTimerHandle 인수를 필요로 합니다.

```cpp
// 사용법 1
GetWorld()->GetTimerManager().SetTimer(TimerHandle, []() {...}, InRate, IsRoop);

// 사용법 2
GetWorld()->GetTimerManager().SetTier(TimerHandle, this, &UClass::Function, InRate, IsRoop); 

// 그 외 Header 참고
```

* IsTimerActive은 지정된 타이머가 현재 활성화 되어 있고 일시정지 되지 않았는지 확인하는 데 사용됩니다.
* GetTimerElapsed와 GetTimerRemaining은 각각, 제공된 타이머 핸들에 연관된 타이머의 경과 및 남은 시간을 반환합니다.
* **이 코드는 여러 스레드를 지원하지 않습니다. 게임 스레드 이외에서 접근하려는 경우 어서트가 발생됩니다.**
* 보다 자세한 내용은 공식 문서와 헤더를 참고할 수 있습니다.

참고자료
: [SetTimer() help](https://forums.unrealengine.com/t/settimer-help/85850)