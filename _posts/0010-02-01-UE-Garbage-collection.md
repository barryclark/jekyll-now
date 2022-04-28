---
layout: post
title: UE Garbage collection
---

# 가비지 컬렉션의 작동방식

[가비지 컬랙션을 위해서는 리플랙션이 필요합니다.](https://www.unrealengine.com/ko/blog/unreal-property-system-reflection)

게임 엔진에서 가장 중요한 작업 중 하나는 메모리 관리입니다.
언리얼 엔진접근 방식은 Garbage collection을 수행하는 것입니다.
이 접근법에서 엔진은 더 이상 필요없는 객체를 자동으로 삭제합니다.
더 이상 필요없는 객체란 다른 객체에 의해 참조되지 않음을 의미합니다.

보다 구체적으로는 엔진에서는 Reference Graph를 만들어 오브젝트들의 사용 여부를 구분합니다.

가비지 컬렉션은 리플랙션에 의해 가능합니다. 다음과 같이 
리플렉션된 프로퍼티가 아닌 것은 해당 리플렉션에 의존하는 시스템 전부에 보이지 않는다는 점을 주의해야 합니다.
(즉 리플렉션 되지 않은 UObject포인터 그대로 저장하면
가비지 콜렉터가 레퍼런스를 확인 할 수 없습니다.)
따라서, 가리키고 있는 특정 메모리 영역이 지워질 수 있습니다.

//UPROPERTY()
UObject* object;

엔진에서 자동 메모리 관리를 통해 엄청난 정신적 작업량을 줄일 수 있지만,
다음의 규칙들에 대해 정확하게 숙지해야만 합니다.

* "생명 주기를 함께 할" 멤버 변수는 UPROPERTY로 선언해야 합니다.   
* 멤버가 가리키는 포인터는 UObject또는 그 자식들로 한정해야 합니다.   
* UObject또는 자식들에 대한 포인터를 안전하게 담을 수 있는 컨테이너는 TArray가 유일합니다.   
* UStruct는 가비지콜렉터의 대상이 아니기 때문에 UObject내부에 있어야 합니다.   
* Garbage collect를 요청할 수 있습니다. 다만 즉시 GC를 부르는 것이 아닌,
GC 수행시 대상으로 등록하라는 요청입니다.   
* TWeakObjectPtr를 통해 소유권이 꼭 필요하지 않은 상황이라면 약참조 해야 합니다.   
* 강제로 Garbage collect를 수행할 수 있습니다.   
* Project setting에서 garbage collection에 대해서 여러가지 설정을 변경할 수 있습니다.   