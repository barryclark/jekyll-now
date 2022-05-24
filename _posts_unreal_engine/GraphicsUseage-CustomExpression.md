---
layout: post
title: Graphics useage
---

UE 5.01
2022 05 22

## 커스텀 표현식 개념
[사용자 정의 표현식(Custom expression)](https://docs.unrealengine.com/4.27/en-US/RenderingAndGraphics/Materials/ExpressionReference/Custom/)이란 임의의 입력에 대해 작동하고 작업 결과를 출력 하는 사용자 정의 HLSL 셰이도 코드를 작성하는 데 사용됩니다.

* 사용자 정의 노드를 사용하면 지속적인 접기를 방지하고 내장 노드로 수행되는 동등한 버전보다 훨씬 더 많은 명령을 사용할 수 있습니다.
* **UE의 커스텀 노드는 어떠한 것도 축소할 수 없습니다. 이는 기존 노드로 구성된 동급 버전보다 덜 효율적인 셰이더를 생성할 수 있습니다. 따라서 기존 노드에서는 불가능한 기능에 액세스 할 수 있는 경우에만 사용자 지정 노드를 사용하는 것이 가장 좋습니다.**
* 사용자 정의 노드에 작성된 셰이더 코드는 유효한 HLSL이어야 합니다.

## Material editor 이용하기



* Window툴바의 Shader code에서 HLSL코드를 볼 수 있습니다.
* Property Materix에서 보다 편하게 작업할 수 있습니다. 또는 IDE에서 작업후 옮길 수 있습니다.

## Multiple Outputs and Passes

? Multiple Outputs와 Multiple Passes어떻게 쓰는건지 이해 못하겠어요.

참고자료
: [Custom Expressions](https://forums.unrealengine.com/t/extending-custom-hlsl-custom-expressions/88820)

## 커스텀 표현식 함수 호출 방법

CustomExpression은 hlsl 변환기에 의해 자동으로 이름이 지정됩니다. 이러한 상황에서 함수를 생성하여 호출하기 위해서는 다음과 같은 편법을 이용할 수 있습니다.

* 사용하지 않는 노드는 생략되므로 사용하도록 연결시켜야 합니다.
* 편법이므로 hlsl코드를 보면 좋지 않은 부분을 볼 수 있습니다.

Function
```hlsl
    return 1.0f;
}

float CustomFunction()
{
    return 1.0f;
```

Custom
```hlsl
return CustomFunction();
```

뭐... 알아서

## 다른 방법들

* Engine\Shaders의 "Common.usf" 끝에 함수를 추가할 수 있습니다. 이 함수는 사용자 정의 노드 내에서 호출할 수 있습니다.

* .ush파일을 작성한 다음 커스텀 노드에서 #include하는 방식이 있습니다.

* 함수 내에서 Functor class를 작성한 후 호출하는 방법이 있습니다. 이 방식은 다른 Custom node에서 재활용 할 수 없다는 단점이 있습니다.

* #define을 이용해 함수를 작성하여 호출할 수 도 있습니다.

참고자료
: [다른 커스텀 노드를 호출하는 커스텀 노드](https://forums.unrealengine.com/t/custom-node-material-calling-other-custom-node/47078/2)