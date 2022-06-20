---
layout: post
title: Physics material
---

# Physics material

**피지컬 오브젝트가 월드와 동적으로 상호작용할 때의 반응을 정의하는데 사용합니다.**

[피지컬 머티리얼](https://docs.unrealengine.com/4.27/ko/InteractiveExperiences/Physics/PhysicalMaterials/)

## 사용법
먼저 피지컬 머티리얼 애샛을 생성하여 추가합니다.

그 다음 생성한 피직스 머티리얼의 프로퍼티를 조정합니다. 프로퍼티에 대한 자세한 내용은 [피지컬 머티리얼 레퍼런스](https://docs.unrealengine.com/4.27/ko/InteractiveExperiences/Physics/PhysicalMaterials/Reference/)에서 볼 수 있습니다.

그 다음, 프로젝트에서 Physical Surface Type(물리적 표면 유형)을 추가할 수 있습니다. 편집->프로젝트 세팅->피직스->Physical Surface 카테고리에 추가할 수 있습니다.
이후 EPhysicalSurface로 추가된 애넘 값을 가져올 수 있습니다. 커스텀 표면 유형은 최대 62개 까지 가능합니다.

스태틱 메시의 스태틱 메시 세팅 카테고리에서 프로퍼티를 원하는 피지컬 머티리얼로 설정할 수 있습니다.
복합 콜리전 피지컬 머티리얼은 머티리얼에 피지컬 머티리얼을 할당해야 합니다.
머티리얼과 피직스 애셋에 피지컬 머티리얼을 추가할 수 있습니다. 이후 Hit 결과에서 피지컬 머티리얼을 가져올 수 있습니다.
추가적으로 머티리얼 인스턴스에서도 피지컬 머티리얼을 변경할 수 있습니다.