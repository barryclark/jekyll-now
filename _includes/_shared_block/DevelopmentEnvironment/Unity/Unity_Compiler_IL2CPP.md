[IL2CPP](https://docs.unity3d.com/kr/2019.4/Manual/IL2CPP.html)

IL2CPP는 Unity 게임 엔진에서 사용되는 스크립팅 및 코드 컴파일러입니다.

일반적으로 Unity는 C#과 같은 고급 스크립트 언어를 사용하여 게임 개발을 할 수 있도록 지원합니다. 그러나 C# 코드는 .NET 프레임워크에서 실행되므로 일반적으로 JIT(Just-In-Time) 컴파일러를 사용하여 C# 코드를 바로 실행합니다.

그러나 JIT 컴파일러는 실행 시간에 컴파일을 수행하므로 일부 렉(lag)이 발생할 수 있습니다. 이를 해결하기 위해 Unity는 IL2CPP 컴파일러를 도입하여 C# 코드를 C++ 코드로 변환하고, 이를 빌드 타임에 컴파일하여 실행 파일을 생성합니다.

이 방식은 더 나은 실행 속도와 메모리 사용량을 제공합니다. 또한 IL2CPP는 플랫폼 종속성을 줄이고 여러 플랫폼에서 실행 가능한 코드를 생성할 수 있도록 해줍니다.

* [librealsense의 경우 IL2CPP와 호환되지 않습니다.](https://github.com/IntelRealSense/librealsense/issues/4155)
