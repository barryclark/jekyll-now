---
layout: post
title: UE BlueprintCallable BlueprintImplementableEvent BlueprintNativeEvent
---

# BlueprintCallable

UFUNCTION(BlueprintCallable)   
void CallCallable();

블루프린트에서 호출이 가능하지만 C++ 코드 편집 없이는 변경이나 덮어쓰기가 불가능합니다.

# BlueprintImplementableEvent

UFUNCTION(BlueprintImplementableEvent)   
void CallImplement();

Implementation event는 함수의 몸체 없이 호출을 할 수 있습니다.
블루프린트 이벤트 그래프에서 오버라이드 하여 함수의 몸체를 만들어 줄 수 있습니다.
블루프린트에서 몸체를 만들게 되면 C++ 에서 호출을 할 때 블루프린트 상의 오버라이드한 몸체가 실행됩니다.

C++에서 구현이 불가능합니다.

# BlueprintNativeEvent

UFUNCTION(BlueprintNativeEvent)   
void CallNative();

---------------------------------

UFUNCTION(BlueprintNativeEvent)
void CallNative_Implementation() override;

NativeEvent는 C++에서도 함수의 몸체를 만들어줄 수 있습니다.
블루프린트에서도 오버라이드 하여 함수의 몸체를 만들어줄 수 있습니다.
C++에서 NativeEvent함수는 구현할때는 _Implementation키워드가 붙어야 합니다.
또한 NativeEvent는 블루프린트에서 오버라이드 하게되면 C++에서 만든 함수는 무시되며 블루프린트에서 오버라이드 해준것이 실행됩니다.
C++에서도 함수를 정의할 수 있으며 블루프린트에서도 할 수 있습니다. 하지만 조금더 느립니다.
특별한 상황이 아닐 경우 보통은 Implementation을 사용합니다.
블루프린트에서 정의하지 않을 경우 C++에서 정의한 코드 내용이 실행됩니다.