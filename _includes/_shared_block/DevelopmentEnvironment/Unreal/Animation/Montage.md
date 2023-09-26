몽타주(montage)는 프랑스어로 모으다, 조립하다를 뜻하는 건축용어라고 합니다. 몽타주를 어디서 사용하는지에 대한 예시로 권투게임에서 정권을 지르는 행동등의 기본 애니메이션에 특정 애니메이션을 재생하고 싶을 때 몽타주를 사용할 수 있습니다.

[Unreal Doc : 몽타지 개요](https://docs.unrealengine.com/4.27/ko/AnimatingObjects/SkeletalMeshAnimation/AnimMontage/Overview/)

[Unreal Doc : 몽타지 이용하기](https://docs.unrealengine.com/4.27/ko/AnimatingObjects/SkeletalMeshAnimation/AnimMontage/UserGuide/)

[Unreal : 애님 몽타주 가장 쉬운 예시](https://www.unrealengine.com/ko/blog/introduction-to-animmontage)

Animation Montage (애니메이션 몽타주, 또는 줄여서 몽타주) 를 사용하면 블루프린트 또는 C++ 코드를 통해 애니메이션 애셋을 바로 제어할 수 있습니다. 애니메이션 몽타주로 여러 애니메이션 시퀀스 를 하나의 애셋으로 합칠 수 있으며, 이를 섹션 으로 나누어 그 일부 또는 조합 재생이 가능합니다. 몽타주 안에서 이벤트 를 발동시켜 다양한 로컬 또는 리플리케이트 작업을 할 수 있는데, 예를 들면 사운드 큐나 파티클 이펙트 재생, 탄환 수와 같은 플레이어 값 변경, 심지어 네트워크 게임에서 루트 모션 리플리케이션도, 애니메이션에 루트 모션이 켜진 경우 가능합니다.

[Unreal Doc : 
애니메이션 몽타주 편집 및 사용](https://forums.unrealengine.com/t/montage-not-looping-with-loop-ticked/786194/2)

[Unreal Forum : '루프'가 선택된 상태에서 몽타주가 반복되지 않음](https://forums.unrealengine.com/t/montage-not-looping-with-loop-ticked/786194/3)

위 문서에서 애니메이션 몽타주를 사용하는 방법을 설명합니다.

게임 캐릭터가 주문을 외운다고 하면, 캐릭터가 주문을 외우는 모션이 많을 때 애님 블루프린트로 구현하면 애님 블루프린트가 더욱 복잡해지게 됩니다. 이럴 때 몽타주를 이용할 수 있습니다.

* 몽타주 섹션의 루프는 Preview 및 Default 버튼 옆에 있는 "Pick the next section' 버튼을 선태갛고 블렌드 시간 값 변경할 필요 없이 루프를 선택하면 됩니다. 루프의 종료는 블루프린트에서 몽타지를 시작할 때, Starting Section 파라미터 값으로 다음 섹션을 재생시켜야 합니다.

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/fdd6021e-b582-4c85-9194-bb07e0f249eb)

* Loop상태에서 End 섹션으로 몽타주를 재생하면, Loop가 끝나고 End가 재생되는게 아니라 현재 Loop중인 애니메이션에서 End의 시작 애니메이션으로 블렌드 되어 재생됩니다.
 
[Unreal Doc : 레이어 애니메이션 사용하기](https://docs.unrealengine.com/4.27/ko/AnimatingObjects/SkeletalMeshAnimation/AnimHowTo/AdditiveAnimations/)

애니메이션 블렌딩이란, 개념상 단순히 하나의 캐릭터 또는 스켈레탈 메시에 둘 이상의 애니메이션이 부드럽게 전환되도록 만드는 것을 말합니다. 언리얼 엔진 4 에는 그러한 블렌딩을 적용할 수 있는 방법이 여러가지 있는데, 블렌드 스페이스 를 통하거나, 애디티브 메서드 즉 말 그대로 가중 편향치나 알파값에 따라 두 애니메이션을 조합하거나, 심지어 기존 포즈를 직접 덮어쓰는 방법도 있습니다.

애니메이션을 스켈레톤 내 특정 본과 그 자손 전부에 직접 전송할 수도 있습니다. 예를 들어, 캐릭터가 달리는 애니메이션으로 시작했다가, 캐릭터 상체에 발사 애니메이션을 선택적으로 적용할 수 있습니다.

* [Unreal Forum : 다중 몽타주 - 다중 슬롯](https://forums.unrealengine.com/t/animation-bp-multiple-montages-multiple-slots/139610)    
레이어드 블렌드 퍼 본을 이용하여 몽타주를 적용할 때, 블렌드 순서에 따라 본의 포즈를 덮어씌웁니다. 앞에서 적용해야할 포즈가 뒤의 포즈에 의해 덮어씌워질 건지 아닌지 고려해야 합니다.
