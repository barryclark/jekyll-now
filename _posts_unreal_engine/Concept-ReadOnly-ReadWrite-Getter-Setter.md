---
layout: post
title: UE5 ReadOnly ReadWrite Getter Setter
---
BlueprintReadOnly, meta = (AllowPrivateAccess = true)

[프로퍼티에 관해서](https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/GameplayArchitecture/Properties/)
[프로퍼티 이쁘게 정리된 곳](https://benui.ca/unreal/uproperty/#blueprint)
[함수에 관해서](https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/UserGuide/Functions/)

# BlueprintReadOnly
블루프린트에서 읽는 것만 가능합니다. 

# BlueprintReadWrite
블루프린트에서 읽고 쓰는 것이 가능합니다.

# BlueprintGetter=GetterFunctionName
이 프로퍼티는 커스텀 엑세서 함수를 지정합니다.
또한 BlueprintSetter 또는 BlueprintReadWrite지정자가 지정되지 않으면,
BlueprintReadOnly로 간주합니다. 

* BlueprintGetter는 c++에서 private member access로 변수를 설정하지만,
블루프린트에 나타내고 싶을 때 이용합니다.


https://forums.unrealengine.com/t/whats-the-point-of-blueprintgetter-if-it-didnt-hide-the-direct-access-to-that-variable-in-bp/459697   
https://en.wikipedia.org/wiki/Mutator_method   

# BlueprintSetter=SetterFunctionName
이 프로퍼티에는 커스텀 뮤테이터 함수가 있으며, 
묵시적으로 BlueprintReadWrite지정자가 붙습니다.
참고로 뮤테이터 함수는 같은 클래스 이름으로 그 일부를 따서 지어야 합니다.

* accessor와 mutator의 차이는 수정하는지(mutator)또는 수정하지 않는지(accessor)가
관건입니다. 
* accessor는 멤버 변수를 수정하지 않고 단순히 읽거나 출력하는 함수를 이야기 합니다.
대표적인 예는 멤버 변수의 값을 그대로 출력하는 출력함수를 들 수 있습니다.
일반 함수라도 멤버 변수의 값을 바꾸지 않으면 accessor함수가 됩니다.   
* mutator는 멤버 변수의 값을 수정하는 함수를 이야기 합니다.
대표적인 예는 값을 입력받아 멤버 변수의 값을 수정하는 입력 함수를 들 수 있습니다.
일반 함수라도 멤버 변수의 값을 바꾸면 mutator함수가 됩니다.


UPROPERTY(... BlueprintReadOnly)   
bool IsReadOnly;   

UPROPERTY(... BlueprintReadWrite)
bool IsReadWrite;

private:   
	UPROPERTY(... BlueprintGetter=GetGetterCount, BlueprintSetter=SetSetterCount)   
	int GetterCount;   

public:   
	UFUNCTION(... BlueprintCallable)   
	int GetGetterCount() const;   
	UPROPERTY(... BlueprintCallable)   
	void SetSetterCount();   


? GetGetterCount에서 const 붙이지 않으면 오류가 납니다.   
... must be pure.   
* 함수는 Pure 또는 Impure 가 될 수 있습니다. 
주요 차이점은 Pure Functions는 상태 또는 클래스의 멤버를 
어떤 식으로든 수정하지 않겠다고 약속하는 반면 Impure Functions는 
자유롭게 상태를 수정할 수 있다는 것입니다. 순수 함수는 일반적으로 
데이터 값만 출력하는 getter 함수 또는 연산자에 사용됩니다.

? 왜 const를 붙여야 되는 건가요?

? 호출하면서 상태를 수정해야 하는 경우에는 어떻게 해야 하나요?
