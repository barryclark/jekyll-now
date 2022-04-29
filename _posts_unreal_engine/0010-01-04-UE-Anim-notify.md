---
layout: post
title: UE Anim notify
---

## Animation notify
애니메이션 프로그래머는 Animation Notification 또는 AnimNotify 줄여서 그냥 Notify를 통해 애니메이션 시퀀스 도중의 특정 지점에 이벤트가 발생하도록 구성할 수 있습니다. 노티파이는 걷기나 달리기 도중의 발소리같은 이펙트 추가 빝 애니메이션 도중 파티클 시스템을 스폰시키는 데 주로 사용됩니다. 하지만 커스텀 노티파이 유형으로 시스템을 확장시켜 어떤 유형의 게임 요구에도 맞출 수 있기에 다른 식으로도 얼마든지 사용할 수 있습니다.   

* 애니메이션에 노티파이 추가는 언리얼 엔진 애니메이션 노티파이 문서에

'''
UCLASS()
class UNewAnimNotify : public UAnimNotify
{
    GENERATED_BODY()

public:
    virtual FString GetNotifyName_Implementation() const override;
private:
    void Notify(USkeletalMeshComponent* MeshComp, UAnimSequenceBase* Animation) override;
}
'''

? 애니메이션 노티파이를 어떻게 써야 하는가?

모르는 것들.

# Clothing simulation notify


# Particle effect


# Sound play


# Reset Anim dynamics
Anim dynamics가 뭡니까?

## Notify state



언리얼 애니메이션 노티파이   
https://docs.unrealengine.com/4.26/ko/AnimatingObjects/SkeletalMeshAnimation/Sequences/Notifies/   