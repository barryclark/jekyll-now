---
layout: post
title: Automation test
---

- [ ] [단위 테스트](http://www.yes24.com/Product/Goods/104084175)
- [ ] 성능 평가 자동화 툴,,,,

- [ ] [테스트 케이스로만 테스트하면 안되나요?](https://tech.devsisters.com/posts/not-enough-testcase/)
- [ ] [통합 테스트란 무엇인가요?](https://support.suresofttech.com/ko/support/solutions/articles/5000760844-%ED%86%B5%ED%95%A9%ED%85%8C%EC%8A%A4%ED%8A%B8%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80%EC%9A%94-)
- [ ] [소프트웨어(SW) 개발방법론](https://www.kipo.go.kr/kpo/download?f=/upload/kipo/new/20161005154611873292_1.pdf&fn=32.+%C6%AF%C7%E3%C3%BB+%BC%D2%C7%C1%C6%AE%BF%FE%BE%EE%28SW%29+%B0%B3%B9%DF%B9%E6%B9%FD%B7%D0.pdf)

- [ ] UI test 자동화

## TDD (Test-Driven Development, 테스트 주도 개발)

> 테스트 케이스를 만들다 보면, 보이지 않았던 것들이 보인다.

TDD란 Test Driven Development의 약자로 '테스트 주도 개발'이라고 한다. 반복 테스트를 이용한 소프트웨어 방법론으로, 작은 단위의 테스트 케이스를 작성하고 이를 통과하는 코드를 추가하는 단계를 반복하여 구현합니다. 

짧은 개발 주기의 반복에 의존하는 개발 프로세스이며 애자일 방법론 중 하나인 eXtream Programming (XP)의 'Test-First' 개념에 기반을 둔 단순한 설계를 중요시합니다.


**TDD를 이용하여 다음을 기대할 수 있습니다.**
- 코드가 프로그래머의 손을 벗어나기 전에 빠르게 피드백을 받을 수 있습니다.
- 작성한 코드의 불안정성을 개선하여 생산성을 높일 수 있습니다.
- 프로그래머의 오버 코딩을 방지합니다.
- 테스트 코드를 작성하는 과정에서 히스토리가 남아, 과거 의사결정을 쉽게 상기할 수 있습니다.

<details><summary>추가적으로</summary>
<div markdown="1">

<center>

<div class="mermaid"> 
graph LR;
A(디자인)-->B; 
B(테스트 코드 작성)-->C; B-->A;
C(코드개발)-->D; 
D(리팩토링)-->B; 
</div>

</center> 

이 기법을 개발했거나 '재발견' 한 것으로 인정되는 Kent Beck은 2003년에 TDD가 단순한 설계를 장려하고 자신감을 불어넣어 준다고 말하였다. 

* eXtream Programming(XP)는 미래에 대한 예측을 최대한 하지 않고, 지속적으로 프로토타입을 완성하는 애자일 방법론 중 하나입니다. 이 방법론은 추가 요구사항이 생기더라도, 실시간으로 반영할 수 있습니다.
* 단위 테스트(Unit test)는 말 그대로 한 단위만을 테스트하는 것입니다.

</div></details>

<details><summary>유닛 테스트 (Unit test)</summary>
<div markdown="1">

[UE4의 테스트 및 테스트 주도 개발](https://benui.ca/unreal/unreal-testing-introduction/)

이 예제는 가장 간단한 테스트 예를 보여줍니다.

1. 지원기능을 보고, 클래스와 메서드를 생성 후,
2. 지원사항을 충족할 테스트 케이스를 만듭니다.
3. 메서드를 구현하며, 테스트 케이스를 만족시킵니다.

이후, 계속 발전시키면서 더 많은 테스트를 추가하고 더 많은 기능을 추가할 수 있다고 합니다.

</div></details>

<details><summary>유닛 테스트 (Unit test)</summary>
<div markdown="1">

단위 테스트는 응용 프로그램에서 테스트 가능한 가장 작은 소프트웨어를 실행하여 예상대로 동작하는지 확인하는 테스트입니다.

**단위 테스트에서 테스트 대상 단위의 크기는 엄격하게 정해져 있지 않다. 하지만, 일반적으로 클래스 또는 메소드 수준으로 정해진다. 단위의 크기가 작을수록 단위의 복잡성이 낮아집니다.** 따라서, 단위 테스트를 활용하여 동작을 표현하기 더 쉬워진다. 즉, 테스트 대상 단위의 크기를 작게 설정해서 단위 테스트를 최대한 간단하고 디버깅하기 쉽게 작성해야 합니다.

단위 테스트는 실제 코드를 작성하기 전에 작성해야됩니다. 이 규칙은 TDD를 수행하는 경우 반드시 따라야 하는 규칙입니다.

</div></details>

<details><summary>유닛테스트 작성을 위한 원칙 FIRST</summary>
<div markdown="1">

**FAST**
> **테스트는 빨라야 한다. 여기서 빠름의 기준은 밀리 초(ms)입니다.** 단위 테스트를 테스트하는 데 있어 실행 시간이 0.5 초 또는 0.25 초가 걸리는 테스트는 빠른 테스트가 아닙니다.

하나의 프로젝트에서 적게는 몇백 개에서 많게는 수천 개의 테스트를 할 수 있으므로 테스트의 실행 시간은 빨라야 합니다. 만약 테스트가 느리다면 개발자는 테스트를 주저하게 되고 자주 검증하지 않은 소스코드는 그만큼 버그가 발생할 확률이 높아집니다.

**Independent** 
> **테스트에 사용된 데이터들은 서로 의존하면 안 됩니다.** 테스트에 필요한 데이터는 테스트 내부에서 독립적으로 사용해야 합니다.  

만약 데이터가 서로에게 의존하면 테스트 하나가 실패할 때 나머지도 잇달아 실패하므로 원인을 진단하기 어려워지기 때문입니다.

때론 데이터의 존재 여부를 찾는 테스트가 있는 경우엔 해당 데이터는 테스트 내부에서 생성되어야 하며 나중에 테스트에 영향을 미치지 않도록 제거해야 한다.

**Repeatable**
> **테스트는 어느 환경에서든 반복적으로 테스트를 실행할 수 있어야 합니다.** 여기서 환경은 네트워크 나 데이터베이스에 의존하지 않는 환경을 뜻합니다. 결론적으로 인터넷이 되든 안 되든 데이터베이스에 접속하든 안 하든 언제 어디서나 테스트를 할 수 있어야 합니다.

환경에 의존하지 않는 테스트가 실패할 수 있는 유일한 이유는 오로지 테스트할 클래스 또는 메소드가 제대로 작동하지 않기 때문입니다.

**Selef-Validating**
> **테스트는 자체 검증이 되어야 합니다.** 테스트의 검증은 수작업이 아닌 자동화가 되어야 하는데 테스트가 실행될 때마다 메서드 출력이 올바른지를 확인하는 것은 개발자가 결정해서는 안 됩니다.

**Timely**
> **좋은 단위 테스트는 미루지 않고 즉시 작성**합니다. 단위 테스트는 소프트웨어 개발의 완성도, 품질을 높이는 좋은 습관입니다.

만약 테스트를 제때 작성하지 않고 미루어 작성하지 않는다면 코드에 결함이 발생할 확률이 높아집니다.

</div></details>

<details><summary>통합 테스트 (Integration test)</summary>
<div markdown="1">

**통합 테스트는 단위 테스트보다 더 큰 동작을 달성하기 위해 여러 모듈들을 모아 이들이 의도대로 협력하는지 확인하는 테스트입니다.**

통합 테스트는 단위 테스트와 달리 개발자가 변경할 수 없는 부분(ex. 외부 라이브러리)까지 묶어 검증할 때 사용합니다. 이는 DB에 접근하거나 전체 코드와 다양한 환경이 제대로 작동하는지 확인하는데 필요한 모든 작업을 수행할 수 있습니다. 그러나, 통합 테스트가 응용 프로그램이 완전하게 작동하는 걸 무조건 증명하지는 않습니다.

통합 테스트의 장점은 단위 테스트에서 발견하기 어려운 버그를 찾을 수 있다는 점입니다. 예를 들어, 통합 테스트에서는 환경 버그(ex. 싱글 코어 CPU에서는 잘 실행되나 쿼드 코어 CPU에서는 잘 실행되지 않음)이 발생할 수 있습니다.

한편, 통합 테스트의 단점은 단위 테스트보다 더 많은 코드를 테스트하기 때문에 신뢰성이 떨어질 수 있다는 점이다. 또, 어디서 에러가 발생했는지 확인하기 쉽지 않아 유지보수하기 힘들다는 점도 있다.

</div></details>

## Unreal Automation Test

[자동화 시스템 개요](https://docs.unrealengine.com/4.27/ko/TestingAndOptimization/Automation/)

**자동화 시스템은 Functional Testing Framework (펑셔널 테스팅 프레임워크) 기반으로 만들어졌으며, 하나 이상의 자동화 테스트를 수행하는 식으로 이루어지는 게임플레이 레벨 테스트를 위해 디자인된 것**입니다. 작성되는 대부분의 테스트는 펑셔널 테스트, 로우 레벨 코어 또는 에디터 테스트로, 자동화 프레임워크 시스템을 사용하여 작성해야 합니다.

* 테스트 유형을 참고할 수 있습니다. 단 테스트 유형과 `ex) SmokeFilter`, `ex) ApplicationContextMask`는 다르게 되어 있습니다.

<details><summary>테스트 디자인 지침</summary>
<div markdown="1">

게임 또는 프로젝트를 테스트할 때, 에픽의 자동화 테스트 기준으로 삼는 몇 가지 일반적인 지침은 다음과 같습니다:

1. 게임 또는 에디터 상태를 가정하지 않습니다. 테스트는 순서 없이 또는 여러 머신에 걸쳐 병렬 실행될 수 있습니다.
2. 디스크의 파일은 찾은 상태 그대로 놔둡니다. 테스트에서 파일을 생성한 경우, 그 테스트가 완료되면 삭제합니다. (앞으로 이러한 유형의 생성 파일을 자동 삭제하도록 하는 옵션이 추가될 수 있습니다).
3. 테스트는 지난 번 실행된 이후 나쁜 상태에 있었다 가정합니다. 테스트 시작 전 생성 파일을 삭제하는 습관을 들이는 것이 좋습니다.

</div></details>

<details><summary>테스트 만들기</summary>
<div markdown="1">

[자동화 테크니컬 가이드](https://docs.unrealengine.com/4.27/ko/TestingAndOptimization/Automation/TechnicalGuide/)

가장 간단하다고 생각되는 테스트 구현 예시로 다음이 있습니다.
```cpp
IMPLEMENT_SIMPLE_AUTOMATION_TEST(TClass, PrettyName, TFlags)
```

* Flags는 어디서 테스트를 하는 것이 적합한지를 나타냅니다. 정의부를 보면 설명이 나와있습니다.

`IMPLEMENT_SIMPLE_AUTOMATION_TEST`를 사용하는 예시는 다음과 같습니다.

```cpp
#include "Misc/AutomationTest.h"
#include "Tests/AutomationEditorCommon.h"

IMPLEMENT_SIMPLE_AUTOMATION_TEST(FTestClassName, "Sample.AutomationSectionClasses", EAutomationTestFlags::ApplicationContextMask | EAutomationTestFlags::SmokeFilter)

bool FTestClassName::RunTest(const FString& parameters)
{
}
```

아래는 월드를 생성해서 테스트 하는 방법입니다. 하지만... 월드를 생성하는 만큼 느립니다.
```cpp
// Test with world
IMPLEMENT_SIMPLE_AUTOMATION_TEST(FTestClassName, "Sample.AutomationSectionClasses", EAutomationTestFlags::EditorContext	 | EAutomationTestFlags::ProductFilter)

bool FTestClassName::RunTest(const FString& parameters)
{
    UWorld* world = FAutomationEditorCommonUtils::CreateNewMap();
    {
        ATheFestivalCharacter* hero = world->...
    }
}
```

* `EAutomationTestFlags::ApplicationContextMask`가 없을 경우, 
    - error C2338: AutomationTest has no application flag.  It shouldn't run.  See AutomationTest.h.
* `..._LATENT_AUTOMATION_COMMAND`은 여러 프레임에 걸쳐 실행되야 하는 경우, 사용하는 잠복명령 입니다. 자동화 테크니컬 가이드를 참고하세요.

</div></details>

<details><summary>테스트 코드 분리하기</summary>
<div markdown="1">

테스트 코드를 분리하기 위해서,
1. 플러그인을 이용하는 방법
2. 매크로를 이용하는 방법이 있습니다.

플러그인을 이용하는 방법으로는 Editor전용 플러그인을 만들어서 사용합니다.
```json
	"Modules": [
		{
			"Name": "HorrorCoreEditor",
			"Type": "Editor",
			"LoadingPhase": "Default"
		}
	]
```

매크로를 이용하는 방법으로는 다음과 같이 감싸, 에디터가 아닐 경우 번역 단위에서 제외합니다.
```cpp
#if WITH_EDITOR
...
#endif
```

</div></details>

<details><summary>테스트 케이스 CSV로 관리하기</summary>
<div markdown="1">

1. 데이터 테이블형 구조체를 만듭니다.
2. 구조체를 이용하여 데이터 테이블을 만듭니다.
3. 데이터 테이블을 읽고 처리하는 테스트를 만듭니다.
4. 테스트를 돌릴 수 있습니다.

* 행을 Index로 순환한다고 하면, 행의 번호를 CaseID로 이용할 수 있습니다.

```cpp
#include "Engine/DataTable.h"
...

USTRUCT(BlueprintType)
struct FInventory2DInsertTest : public FTableRowBase
{
	GENERATED_BODY()
    ...
```

다음과 같이 Asset을 읽어 옵니다.
```cpp
	UDataTable* TestDataTable = LoadObject<UDataTable>(nullptr, TEXT("DataTable'/HorrorCoreEditor/Horror2DInventoryTest/Horror2DInventoryTestDataTable.Horror2DInventoryTestDataTable'"));
	TestNotNull("TestDataTable is not valid.", TestDataTable);
	if (!TestDataTable)
	{
		return false;
	}
```

테스트 케이스를 입력하고, 테스트를 돌리면, 테스트 결과를 얻을 수 있습니다.

</div></details>

<details><summary>블루프린트 테스트케이스를 만들기 위한 삽질들</summary>
<div markdown="1">

Blueprint를 도대체 어떻게 테스트하는가...

블루프린트는 아파도, 확인할 때까지 아프다고 말해주지 않습니다... 

그나마 이를 어느정도 해결 할 수 있는 방법은 모든 블루프린트를 컴파일 하는 것입니다.

**돈으로 해결하는 방법**

[Check All Blueprints Compile](https://www.unrealengine.com/marketplace/ko/product/check-blueprints-compile/questions)

모든 블루프린트에 대해서 컴파일하는 플러그인이 있습니다. 사용해보지는 않았습니다.

[CommandletPlugin](https://github.com/ue4plugins/CommandletPlugin)


[UE4: How To Write a Commandlet](https://www.oneoddsock.com/blog/2020/07/08/ue4-how-to-write-a-commandlet/)

Commandlet에 대해서 설명합니다.

[Compiling all project blueprints in Unreal Engine](https://sarcasticcoder.com/unrealengine/compiling-all-project-blueprints-in-unreal-engine/)

이제 Commandlet을 이용해서 모든 블루프린트를 컴파일 할 수 있습니다.

[How to write commandlet](https://www.oneoddsock.com/blog/2020/07/08/ue4-how-to-write-a-commandlet/)


[Blueprint Compiler Overview](https://docs.unrealengine.com/4.26/en-US/ProgrammingAndScripting/Blueprints/TechnicalGuide/Compiler/)

이 Overview를 보면, UBlueprint클래스에 Compile이 있다는 것을 알 수 있습니다.


## Command-Line Arguments

명령줄 인수 는 명령줄이나 실행 파일 바로 가기를 통해 실행 파일을 실행할 때 전달할 수 있는 키워드 문자열입니다. 그들의 목적은 개발자 또는 사용자의 요구에 맞게 엔진이 실행되는 방식을 사용자 정의하는 것입니다. 이것은 게임 대신 에디터를 실행하게 하는 것처럼 간단할 수도 있고, 각 프레임을 개별 이미지 파일로 덤프하면서 지정된 해상도와 프레임 속도로 실행되는 특정 맵으로 게임을 시작하는 것과 같이 훨씬 더 복잡할 수 있습니다.

* 이 문서는 Setting up your production pipeline에 있습니다.

</div></details>

## 테스트 케이스 만들기

* 만들 때, 확인하는 테스트들만 자동화 해도, 굉장히 편합니다...

<details><summary>Mock object</summary>
<div markdown="1">

[Mock object](https://en.wikipedia.org/wiki/Mock_object)

**객체 지향 프로그래밍 에서 모의 ​​객체 는 제어된 방식으로 실제 객체의 동작을 모방하는 시뮬레이션 객체**이며, 대부분 소프트웨어 테스트 이니셔티브의 일부입니다. 프로그래머는 일반적으로 자동차 디자이너가 충돌 테스트 더미 를 사용 하여 차량 충돌 시 인간의 동적 동작 을 시뮬레이션 하는 것과 거의 동일한 방식으로 다른 개체의 동작을 테스트하기 위해 모의 개체를 만듭니다. 이 기술은 일반 프로그래밍 에도 적용할 수 있습니다.

**단위 테스트 에서 모의 ​​객체는 복잡한 실제 객체의 동작을 시뮬레이션 할 수 있으므로 실제 객체가 비실용적이거나 단위 테스트에 통합할 수 없을 때 유용합니다.** 

객체에 다음과 같은 특성이 있는 경우 그 자리에 모의 객체를 사용하는 것이 유용할 수 있습니다.

* 개체가 비결정적 결과(예: 현재 시간 또는 현재 온도)를 제공합니다.
* 생성하거나 재생산하기 어려운 상태(예: 네트워크 오류)가 있습니다.
* 속도가 느립니다(예: 테스트 전에 초기화해야 하는 완전한 데이터베이스 ).
* 아직 존재하지 않거나 행동을 변경할 수 있습니다.
* 테스트 목적으로만 정보와 방법을 포함해야 합니다(실제 작업이 아님).

</div></details>

<details><summary>나쁜 테스트 습관</summary>
<div markdown="1">

**통과할 테스트만 만드는 것**

통과할 테스트를 만드는 것도 물론 중요하다. 그게 코드 refactor와 reorganize를 안전하게 만든다. 하지만 통과하지 못할 테스트도 만들어야 한다. 그래야 프로젝트가 진행되고 이슈 tracking이 가능해진다.

**극단적 케이스에 대한 테스트를 고려하지 않는 것**

프로젝트 일정 중간쯤에 성능평가 자동화 툴을 미리 만들어라. 그래야 더 심각해질 수 있는 문제를 방지할 수 있다.

**빌드만 확인하고 동작 확인 안하기**

빌드는 되지만 동작하지 않는 경우도 간혹 발생할 수 있다. 디버깅이 생각보다 골치아프고 오래 걸릴 수 있다. 빌드할 때마다 간단한 테스트를 하는 습관을 갖자.

**큰 업데이트를 미루기**

근자감에 취해 있다가 망하기 딱 좋은 케이스이다. 보통은 이걸로 여러 번 망해본 다음에야 정신을 차린다.

**예전에 짠 코드를 더 이상 관리하지 않는 것**

당신이 짠 코드를 당신보다 더 잘 아는 사람은 없다. 다른 사람이 당신 코드를 쓴다면 더 잘 이해할 수 있게 도와줘라. 가독성을 올릴 방법이 있다면 올려줘라.

**기능 구현 이외의 사항을 무시하는 것**

기능 구현에만 몰두하다 보면 성능, 보안 등의 문제를 소홀히 하기 쉽다. 이것들도 checklist에 적어두고 관리해야 한다. 이것들이 당신 작품의 가치를 떨어트릴지도 모를 일이다.

</div></details>

## Unreal Blueprint Functional Test

<details><summary>블루프린트 펑셔널 테스트 만들기</summary>
<div markdown="1">

[Functional Testing](https://docs.unrealengine.com/4.27/en-US/TestingAndOptimization/Automation/FunctionalTesting/)

1. Level의 게임모드를 Functional Test Gamemode로 만듭니다.
2. Level에 Functional Test 액터를 배치합니다.
3. Test가 끝났다면, Functional Test 액터의 Finish Test를 호출 합니다.

</div></details>