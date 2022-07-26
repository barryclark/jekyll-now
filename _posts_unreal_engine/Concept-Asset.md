---
layout: post
title: Asset
---

## 애셋의 종류
개념적으로, 언리얼 엔진4의 애셋 관리 시스템은 모든 애셋을 Primary Assets와 Secondary Assets 두 가지 유형으로 나눕니다.

프라이머리 애셋은 GetPrimaryAssetID 호출을 통해 어을 수 있는 자체 Primary Asset ID를 통해 애셋 매니저가 직접 조작할 수 있습니다. 특정 UObject 클래스에서 만들어진 애셋을 프라이머리 애셋으로 지정하기 위해서는, GetPrimaryAssetID가 유효한 FPrimaryAssetID 구조체를 반환하도록 덮어씁니다.

세컨더리 애셋은 애셋 매니저가 직접 처리하지 안는 대신, 프라이머리 애셋에 사용되거나 참조되는 데 반응해서 엔진이 자동으로 로드합니다. 기본적으로 UWorld 애셋(레벨)만 프라이머리 애셋이고, 다른 모든 애셋은 세컨데리 애셋입니다. 세컨데리 애셋을 프라이머리 애셋으로 만들기 위해서는, 그 클래스에 대한 GetPrimaryAssetID 함수가 유효한 FPrimaryAssetID 구조체를 반환하도록 덮어써야 합니다.


언리얼 엔진 4는 애셋 로드와 언로드를 자동으로 처리하므로, 개발자가 코딩 시스템을 통해 직접 각 애셋이 정확히 언제 필요하게 될 것인지 엔진에게 알려주지 않아도 됩니다. 하지만 애셋 발견, 로드, 검사 시기와 방법을 개발자가 보다 정교하게 제어하고 싶은 경우가 있을 수 있습니다. 그러한 경우 에셋 매니제가 도움이 될 수 있습니다.

[Setting up your production pipeline/애셋 관리](https://docs.unrealengine.com/4.26/ko/ProductionPipelines/AssetManagement/)


## 애셋 사용법

현실적으로 애셋을 찾기가 어렵다, 드래그앤 드랍으로 하던가,
애샛을 클릭한다음에, 선택된 애샛 사용(화살표)를 쓴다던다.

* 따라서 폴더관리가 매우 중요해 집니다.