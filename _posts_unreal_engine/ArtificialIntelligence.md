---
layout: post
title: Artificial Intelligence
---


## AI 공격하고 도망간다고 했을 때,

어떻게 도망가는가? EQA 쿼리가 있는데, 이것을 어떻게 작업하냐에 따라서 몬스터가 길찾게 하는 방법,

* 예제를 쓰기가 좀 어려울 것이다.

EQS를 하면, 가장 높은 값으로 갈 것인지, 가장 낮은 것으로 갈 것인지, 알 수 있습니다.

언리얼에는 기본 예제가 있습니다.

EQS는 실험단계가 아닙니다.

1. EQS Find Player를 하나 만들고,
2. ENV Context Blueprint Querry를 부모로 하는 EQC 블루프린트 클래스를 만듭니다.


EQS 테스트 하는 방법

Querry를 테스트할 때, 모양을 어떻게 할 건지, 간격을 어떻게 할 건지...

엄청나게 넓은 영역은, 러프하게 가고, 그다음 EQS로 정교하게 간다란 느낌.

<details><summary>Environment Query System</summary>
<div markdown="1">

[Environment Query System](https://docs.unrealengine.com/4.27/ko/InteractiveExperiences/ArtificialIntelligence/EQS/)

환경 쿼리 시스템(EQS)  은  환경에서 데이터를 수집하는 데 사용되는 언리얼 엔진 4(UE4)의 인공 지능 시스템 내 기능입니다.

EQS 쿼리는  비헤이비어 트리 에서 호출할 수 있으며  테스트 결과를 기반으로 진행 방법에 대한 결정을 내리는 데 사용할 수 있습니다. EQS 쿼리는 주로  제너레이터  (테스트 및 가중치를 적용할 위치 또는 액터를 생성하는 데 사용됨)와  컨텍스트  (테스트 또는 제너레이터에 대한 참조 프레임으로 사용됨)로 구성됩니다. EQS 쿼리를 사용하여 AI 캐릭터가 공격하기 위해 플레이어에게 시야를 제공할 최상의 위치, 가장 가까운 체력 또는 탄약 픽업 또는 가장 가까운 엄폐 지점(다른 가능성 중에서)을 찾도록 지시할 수 있습니다. 

* 실험기능 이라고 하지만, 실험 기능이 아니라고 합니다.

</div></details>