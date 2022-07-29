---
layout: post
title: Project struct
---

# 프로젝트의 폴더 구성

프로젝트를 구성하는 폴더는 다음과 같습니다.

|프로젝트 구조|설명|
|:---:|---|
|Config|게임 프로젝트의 설정 값을 보관하는 공간입니다. 이 폴더를 제거하면 게임 프로젝트의 중요한 설정 정보가 날아가므로 항상 보관해야 합니다.|
|Content|게임 프로젝트에 사용하는 애셋을 관리하는 공간입니다. 항상 보관해야 합니다.|
|Intermediate|프로젝트 관리에 필요한 임시 파일들을 저장하는 공간입니다. 이 폴더는 제거해도 에디터에 의헤 자동으로 재생성됩니다.|
|Saved|에디터 작업 중에 생성된 결과물을 저장하는 공간입니다. 예를 들어 세이브 파일, 스크린샷은 모두 이곳에 저장됩니다. **이 폴더를 제거하면 수동으로 저장한 세이브 파일이나 스크린샷 등이 삭제될 수 있지만 게임 프로젝트에는 영향을 주지 않습니다.**|
|.uproject|게임 프로젝트를 언리얼 에디터로 불러들이기 위한 정보가 텍스트로 저장되어 있습니다.|
|Binaries|C++ 코드가 컴파일된 결과물을 저장하는 공간입니다. 이 폴더는 삭제해도 빌드할 때마다 새롭게 생성됩니다.|
|Source|C++ 소스 코드가 위치한 공간입니다. C++소스 외에도 언리얼 엔진의 독튼한 빌드 설정을 담은 C# 소스 파일이 있습니다. 폴더를 삭제할 때 프로젝트 구성이 망가지므로 주의해야 합니다.|
|ProjectName.sln|**C++ 프로젝트를 관리하기 위한 비주얼 스튜디오의 솔루션 파일입니다.** 솔루션이 관리하는 각 프로젝트 파일은 Intermediate폴더 내 ProjectFiles폴더에 있습니다. 프로젝트 파일과 솔루션 파일은 삭제하더라도 uproject파일을 이용하여 다시 생성할 수 있습니다.|

## 용량이 커서 줄이고 싶다면

|프로젝트 구조|삭제 여부|
|:---:|:---:|
|.uproject|

* [JSON](https://ko.wikipedia.org/wiki/JSON)은 속성-값 쌍(attribute–value pairs), 배열 자료형(array data types) 또는 기타 모든 시리얼화 가능한 값(serializable value) 또는 "키-값 쌍"으로 이루어진 데이터 오브젝트를 전달하기 위해 인간이 읽을 수 있는 텍스트를 사용하는 개방형 표준 포맷이다. 비동기 브라우저/서버 통신 (AJAX)을 위해, 넓게는 XML(AJAX가 사용)을 대체하는 주요 데이터 포맷이다. 특히, 인터넷에서 자료를 주고 받을 때 그 자료를 표현하는 방법으로 알려져 있다. 자료의 종류에 큰 제한은 없으며, 특히 컴퓨터 프로그램의 변수값을 표현하는 데 적합하다.

## .gitignore에 추가해야 한다면



## .uproject
```json
{
    "FileVersion": 3,
    "EngineAssociation": "4.19",
    "Category": "",
    "Description": ""

    //C++프로젝트가 있는 경우 다음의 내용이 추가됩니다.
    // 이는 C++모듈도 함께 로딩하라는 의미입니다.
    "Modules": [
        {
            "Name": "ArenaBattle",
            "Type": "Runtime",
            "LoadingPhase": "Default",
            "AdditionalDependencies": [
                "Engine"
            ]
        }
    ] 
}
```

## .sln (Solution, 솔루션)
[솔루션은 Visual Studio에서 프로젝트를 구성하기 위한 구조입니다.](https://docs.microsoft.com/ko-kr/visualstudio/extensibility/internals/solution-dot-sln-file?view=vs-2022)

sln 파일에는 환경이 지속형 데이터 및 참조하는 프로젝트 VSPackage에 대한 이름-값 매개 변수를 찾고 로드하는 데 사용하는 텍스트 기반 정보가 포함되어 있습니다. 사용자가 솔루션을 열면 환경이 .sln 파일의 정보를 순환preSolutionProject하여 postSolution 솔루션, 솔루션 내의 프로젝트 및 솔루션에 연결된 모든 지속형 정보를 로드합니다.

* ? 언리얼에서 핫 리로드를 지원하지 않습니다. 에디터에서 핫 리로드 해야합니다.

C++프로젝트의 빌드 구성은 다음과 같습니다. **배포할 때 게임은 리소스와 실행 파일을 묶은 패키지 형태로 배포해야 합니다.** 비주얼 스튜디오의 빌드는 리소스 없이 실행 파일만 생성할 뿐입니다. 리소스와 실행 파일이 모두 묶여진 최종 패키지는 언리얼의 패키지 프로젝트 메뉴를 사용해 제작할 수 있습니다.

**또한 언리얼 프로젝트에서 프로그래밍 에러를 확인할 때는 오류 목록 창을 이용하는 것보다 출력 창을 이용하는 것이 더 편합니다.**  

|구성(Config)|설명|
|:---:|---|
|DebugGame|자세한 디버깅을 위해 최적화가 안 된 결과물을 생성하는 빌드 구성입니다. 게임 실행을 위한 exe파일을 생성합니다.|
|DebugGame Editor|DebugGame과 동일한 수준의 에디터용 DLL파일을 생성합니다.|
|Development|중간 수준의 최적화와 디버깅도 가능한 결과물을 생성하는 구성입니다. exe파일을 생성합니다.|
|Shipping|게임의 최종 배포를 위해 최적화된 코드를 만들어내는 구성입니다. exe파일을 생성합니다.|

# 엔진폴더의 구성
우선 크게 Engine과 Programs 로 나뉘는데 
Engine은 모든 code, contents, configurate 등등을 다루고 있는 게임 엔진의 가장 핵심 부분이라 할 수 있다.
Programs는 다양한 프로젝트들이 나열되어 있는것으로 봐서 StandAlone Application들이나 개발 Tool들을 의미한다고 한다.
 
우선 엔진 폴더부터 봐보자.
 
하나씩 폴더 설명부터 정리해 보자면 
 
- Build : 엔진부 코드들을 빌딩하는데 필요한 파일들
개발 플랫폼 별로 폴더들이 정리되어있다
 
- Config : Configuation 파일
역시 개발 플랫폼 별로 폴더가 잘 정리가 되어있다. ini파일들을 살펴보면 에디터부터 게임, 하드웨어등 기본 설정값들이 어떤식으로 사용되는지 유추해볼 수 있다.
 
- Content: Shared Engine Context라고 되어있다.
실체가 뭘까 궁금해서 실제로 폴더를 열어보니 에디터에서 유저가 게임 개발에 사용하는 class들이 .template형식으로 저장되어 있다.
 
- Extras: VisualStudioDebugging 이란 폴더가 있고 Visualizer라고 되어있는것으로 유추하여보면 Visual Studio의 Custom Visualizer를 Editor에서 쓰기위해 설정값들이 저장되어있는것으로 추정된다.
 
- Plugins: 게임 Project에 필요한 플러그인으로 Component라고 불러야하나... Editor나 Runtime에서 필요한 기능을 관리하는 폴더라고 보면 될듯하다. 
잘 알겠지만 언리얼은 Plug-in형태로 기능을 추가할 수 있다.
 
- Programs: 폴더를 열어보면 빌드툴과 헤더툴이라고 나온다. 언리얼4 빌딩의 자동화를 위한 도구인데 자세한건 다음에 빌드툴 관련해서 작성할때 참고하도록 하자. 생각보다 내용이 정리하기 힘들다...
궁금한 사람들은 https://docs.unrealengine.com/en-us/Programming/BuildTools 참조를 하자.
 
- Shaders: 언리얼 쉐이더 파일들로 확인되고 있고 쉐이더를 만들경우 이 폴더에 두고 작업해야한다. 
나중에 리뷰하겠지만 궁금하면 https://www.unrealengine.com/ko/blog/how-to-add-global-shaders-to-ue4 요길 참조하자
 
- Source: 여기가 핵심이다. 메인 소스코드가 전부 있다. 하위 폴더를 잠시 살펴보면 사용가능한 API들을 구현해 놓은 파일들을 가져다 놓았다.
Editor: Unreal 에디터에서 사용할 수 있는 API이다.
Developer: 개발 전용 API로 shader 컴파일러같은것들이 있는걸로 보아 Runtime에서는 사용되지 않을 API들을 의미하는 것 같다
Runtime: 어디서든 사용 가능한 런타임 관련 API들이 있다. 
ThirdParty: 언리얼에서 사용하는 Thirdparty lib들에 대한 경로라던가 플랫폼별 세팅들에 대한 C#스크립트와 XML파일이 들어있다.
출처: https://hanneoul.tistory.com/entry/12-폴더-구조 [게임개발팀 한너울:티스토리]
