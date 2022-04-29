---
layout: post
title: UE EditAnywhere VisibleAnywhere
---

# Edit* Visible*

[PROPERTY DOC](https://docs.unrealengine.com/5.0/ko/unreal-engine-uproperties/)

UPROPERTY(EditAnywhere)
UObject* exampleComponent;

UPROPERTY(VisibleAnywhere)
UObject* exampleComponent;

* VisibleAnywhere 프로퍼티는 에디터의 프로퍼티 창에서 보여지나, 편집이 불가능함을 나타냅니다. 반대로 EditAnywhere은 에디터의 프로퍼티 창에서 편집이 가능합니다.

Edit*은 EditAnywhere, EditDefaultsOnly, EditInstanceOnly가 있고,
Visible*은 VisibleAnywhere, VisibleDefaultsOnly, VisibleInstanceonly가 있습니다.

# Visible* Edit*

*Anywhere은 블루프린트 프로퍼티 창에서 편집이 가능함을 나타냅니다.   
*DefaultsOnly는 블루프린트 클래스 편집일 경우에만 프로퍼티 창에서 편집 가능함을 나타냅니다.   
*InstanceOnly는 블루프린트 액터로써 레벨에 추가된 경우에만 프로퍼티 창에서 편집 가능함을 나타냅니다.   

일반적으로 Visible*는 BlueprintReadOnly로,
Edit*는 BlueprintReadWrite를 가지는 것이 보통입니다.


# private접근 지정자인 경우에 

private접근 지정자에 있을 때 블루프린트에서 읽을 수 있게 하기 위해서는 meta = (AllowPrivateAccess = true)를 설정해 줘야 합니다.