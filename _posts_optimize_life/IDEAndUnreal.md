---
layout: post
title: IDE and Unreal
---

- [ ] 다시 빌드하는 불편함을 줄이기 위해 라이브 코딩

## Integrated Development Environment

[통합 개발 환경](https://ko.wikipedia.org/wiki/%ED%86%B5%ED%95%A9_%EA%B0%9C%EB%B0%9C_%ED%99%98%EA%B2%BD)

통합 개발 환경(Integrated Development Environment, IDE)이란 공통된 개발자 툴을 하나의 그래픽 사용자 인터페이스(Graphical User Interface, GUI)로 결합하는 애플리케이션을 구축하기 위한 소프트웨어입니다.

일반적으로 IDE는 다음과 같은 요소로 구성되어 있습니다.
* 소스 코드 편집기: 시각적 신호를 활용한 구문(Syntax) 강조와 같은 기능을 포함하여 소프트웨어 코드를 작성하도록 돕는 텍스트 편집기로서, 언어별 자동 완성 기능과 코드
작성 중 버그 검사를 제공합니다.   
* 로컬 빌드 자동화: 컴퓨터 소스 코드를 바이너리 코드로 컴파일링하고, 바이너리 코드를 패키징하고 자동화 테스트를 실행하는 등 간편하고 반복 가능한 태스크를 개발자가 사용하는 소프트웨어의 로컬 빌드를 생성할 때 자동화해주는 유틸리티입니다.   
* 디버거: 원본 코드에 있는 버그 위치를 그래픽으로 표시할 수 있는 다른 프로그램을 테스트하는 프로그램입니다.

<details><summary>함수 호출 순서 보기</summary>
<div markdown="1">

어떤 함수가 어떤 순서로 호출되는지 궁금할 때,

1. 중단점을 찍고, 함수 호출스택에서 함수가 언제 호출되는지 확인합니다.

* 함수 호출 순서를 외우느니, 필요할 때 마다 찍어서 보는 것이 좋습니다.

</div></details>

## Unreal Visual Studio setting

* 비쥬을 스튜디오 프로젝트를 새로 생성할 때 마다 설정했던 내용이 초기화됩니다.

<details><summary>Visual Studio 구성</summary>
<div markdown="1">

[언리얼 엔진용 Visual Studio 구성](https://docs.unrealengine.com/4.27/ko/ProductionPipelines/DevelopmentSetup/VisualStudioSetup/)

</div></details>

<details><summary>인텔리센스가 작동하지 않을 때</summary>
<div markdown="1">

[Visual studio에서 인텔리센스가 작동하지 않을때](https://forums.unrealengine.com/t/intellisense-stopped-working/384124/6)

1. 솔루션을 닫고 솔루션을 다시 만듭니다.
2. 인텔리센스를 다시 스캔합니다.

</div></details>

<details><summary>Intellisense를 조금더 빠르게</summary>
<div markdown="1">

### Visual Studio 2022

**[18x Faster IntelliSense for Unreal Engine Projects in Visual Studio 2022](https://devblogs.microsoft.com/cppblog/18x-faster-intellisense-for-unreal-engine-projects-in-visual-studio-2022/)**


### /Yu

* **include했는데 식별자가 정의되지 않았다고 나오는 문제가 생길 수 있습니다.**

1. VC++디렉터리의 포함 디렉터리의 내용을 NMake의 IntelliSense탭에 있는 포함 검색 경로에 복사해 붙여넣습니다.
2. NMAKE의 IntelliSense탭에 있는 추가 옵션에 `/Yu`옵션을 추가합니다.

원본 파일을 수정할 때마다 IntelliSense는 제공된 모든 경로를 검색하여 원본에서 만들어진 참조를 찾으려 하지만, 언리얼 엔진 프로젝트는 매우 크기가 크기때문에 모든 것들을 통과하는 데는 많은 시간이 걸립니다. 그러나 라이브러리 코드는 전혀 변경되지 않으므로 텍스트 편집기에서 검색할 필요가 없습니다. 모든 안정적인 코드가 포함된 미리 컴파일된 헤더 파일을 만들 수 있고 참조로 사용할 수 있도록 IntelliSense를 사용할 수 있습니다.

* NMAKE는 Microsoft의 make 도구 구현입니다. Microsoft프로그램 유지 관리 유틸리티(NMAKE.EXE)는 설명 파일에 포함된 명령을 기반으로 프로젝트를 빌드하는 32비트 도구입니다.
* [미리 컴파일된 헤더 파일 사용](https://docs.microsoft.com/ko-kr/cpp/build/reference/yu-use-precompiled-header-file?view=msvc-170)의 내용을 보면 `/Yu`를 추가 옵션에 넣음으로써 IntelliSense에 미리 작성된 헤더 파일을 사용하도록 지시한다고 합니다.

</div></details>

<details><summary>정적분석을 위한 PVS Studio</summary>
<div markdown="1">

> 일자 : 2022 05 06    
> IDE : Visual studio community 2022    
> 환경 : Unreal engine 5.0.1    

### 설치방법
1. Visual studio 확장에서 PVS studio를 찾아서 다운로드합니다.
2. Visual studio를 끄고, 설치를 진행합니다. 
    - 또한 기본경로로 설치하는 것이 좋습니다. 언리얼에서 ThirdParty경로 또는 C의 경로에서 찾습니다.
3. [Unreal Build Tool 통합을 사용한 분석](https://pvs-studio.com/en/docs/manual/0043/)을 따라 설치합니다.

* " -StaticAnalyzer=PVSStudio "를 빌드 명령줄등에 추가합니다.
* 실제 사용은, UBT를 이용하여 빌드하여 결과를 봅니다.
* 라이센스가 유효하지 않으면 결과를 내지 않습니다.

**설치가 안될 때**
* [Unable to find PVS-Studio](https://forums.unrealengine.com/t/unable-to-find-pvs-studio/550089)
* [UnrealHeaderTool.target deleted on Project rebuild](https://forums.unrealengine.com/t/unrealheadertool-target-deleted-on-project-rebuild/522872/6)

**사용 예시**

[Cppcheck and PVS-Studio compared](https://pvs-studio.com/en/blog/posts/0149/)

</div></details>

<details><summary>빌드 속도를 빠르게</summary>
<div markdown="1">

1. ProjectEditor.Target.cs에 빌드 규칙을 추가합니다.

```c#
public class HorrorSourceEditorTarget : TargetRules
{
	public HorrorSourceEditorTarget(TargetInfo Target) : base(Target)
	{
        ...
        bUseUnityBuild = false;
        bUsePCHFiles = false;
	}
}
```

개발을 좀더 편하게 하기 위해, 빌드 속도를 올릴 필요가 있습니다. 개발용으로 사용하므로, Editor의 빌드 타겟에 추가합니다.

[How to compile in non-unity mode?](https://forums.unrealengine.com/t/how-to-compile-in-non-unity-mode/94863/5)

`bUseUnityBuild = false`하는 이유는 수정한 파일만 다시 컴파일 하기 위해서입니다.

`bUsePCHFiles=false`를 하는 이유는, PCH가 변경되면, 모든 파일을 다시 컴파일해야 합니다. 헤더를 많이 추가해야 하지만, 빌드속도가 빠른 것을 개인적으로 더 선호합니다. 

- 가끔씩 빌드가 엄청 오래걸릴 때, PCH가 바뀐것으로 생각할 수 있습니다.

* 자동으로 변수를 최적화하여 알아보기 힘들기 때문에, 개발할 때는 구성을 `DebugGame Editor`로 설정합니다.

</div></details>