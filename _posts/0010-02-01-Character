

## 클래스를 가져옴 ##

```cpp
// 클래스 에셋을 가져옴.
static ConstructorHelpers::FClassFinder<ClassName> classAsset(TEXT"File");
// 클래스 에셋을 제대로 가져왔는지 검사함.
if (classAsset != nullptr)
{   
}
```
# 사용 예시 #

```cpp
// set default pawn class to our Blueprinted character
static ConstructorHelpers::FClassFinder<APawn> PlayerPawnBPClass(TEXT("/Game/ThirdPerson/Blueprints/BP_ThirdPersonCharacter"));
if (PlayerPawnBPClass.Class != NULL)
{
	DefaultPawnClass = PlayerPawnBPClass.Class;
}
```

## 블루프린트 클래스 변경 ##

애니메이션의 클래스를 변경하는건 
새로만드는 방법도 있지만
부모 클래스를 바꾸는 것 만으로 가능

## 리플랙션에 대해서 ##
https://www.unrealengine.com/ko/blog/unreal-property-system-reflection?lang=ko
핵심요약. 모르면 정의부로 가자.

프로퍼티들을 모르면 읽도록 하자. (Beginner)
https://docs.unrealengine.com/5.0/ko/unreal-engine-uproperties/

솔찍히 뭔 차이인지 모르겠습니다.
uint32 bIsHungry : 1;
bool bIsThirty;

FString    
character 동적 배열 스트링 유형.   
FName   
글로벌 스트링 테이블로 된 변경불능 대소문자 구분 없는 스트링에 대한 레퍼런스.   
FString보다 작아 전송에 효율적이나 조작하기가 더 어렵습니다.   
FText   
현지화 처리를 위해 고안된 보다 탄탄한 스트링 표현입니다.   

스마트 포인터에 대해서
https://docs.unrealengine.com/4.27/ko/ProgrammingAndScripting/ProgrammingWithCPP/UnrealArchitecture/SmartPointerLibrary/

이야 머리에 한번에 안들어 오는데요. !!!
https://docs.unrealengine.com/4.27/ko/ProgrammingAndScripting/ProgrammingWithCPP/UnrealArchitecture/Objects/Optimizations/


## IDE란? ##

통합 개발 환경(Integrated Development Environment, IDE)이란 
공통된 개발자 툴을 하나의 그래픽 사용자 인터페이스(Graphical User Interface, GUI)로
결합하는 애플리케이션을 구축하기 위한 소프트웨어입니다.
일반적으로 IDE는 다음과 같은 요소로 구성되어 있습니다.

소스 코드 편집기: 시각적 신호를 활용한 구문(Syntax) 강조와 같은 기능을 포함하여
소프트웨어 코드를 작성하도록 돕는 텍스트 편집기로서, 언어별 자동 완성 기능과 코드
작성 중 버그 검사를 제공합니다.   
로컬 빌드 자동화: 컴퓨터 소스 코드를 바이너리 코드로 컴파일링하고, 
바이너리 코드를 패키징하고 자동화 테스트를 실행하는 등 간편하고 
반복 가능한 태스크를 개발자가 사용하는 소프트웨어의 로컬 빌드를 
생성할 때 자동화해주는 유틸리티입니다.   
디버거: 원본 코드에 있는 버그 위치를 그래픽으로 표시할 수 있는 
다른 프로그램을 테스트하는 프로그램입니다.   