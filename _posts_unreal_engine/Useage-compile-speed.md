---
layout  : post
title   : UE Increase compile speed
---

## 유니티 빌드

언리얼 엔진 빌드는 기본적으로 유니티 빌드를 사용합니다.
유니티 빌드는 빌드 시간을 대폭 감소시켜 주지만,
소스 변경이 잦은 모듈에는 적합하지 않다고 합니다.

Build.cs에서 다음과 같이 작성하면 유니티 빌드를 사용하지 않을 수 있다고 합니다.

? 기본 모듈에서는 작동하지 않습니다.

```c#
public class Module : ModuleRules
{
    public Module(ReadOnlyTargetRules Target) : base(Target)
    {
        ...
        MinFilesUsingPrecompiledHeaderOverride = 1;bFasterWithoutUnity = true;
        ...
    }
    ...
}
```

? 유니티 빌드가 무엇인가요?

## SSD에 파일 두기

빌드 