---
layout: post
title: Mobility
---

액터의 모빌리티는 스테틱, 스테이셔너리, 무버블 세가지로 나눠집니다. 액터의 디테일 창에서 Transform카테고리 에서 변경할 수 있습니다.

## 스태틱 모빌리티
[Actor mobility](https://docs.unrealengine.com/4.27/ko/Basics/Actors/Mobility/)   
정신건강을 위해 아래의 내용을 참고하고 읽도록 합시다.

* [Light map](https://en.wikipedia.org/wiki/Lightmap)
은 가상 장면의 표면 밝기가 미리 계산되어 나중에 사용하기 위에 텍스처 맵에 저장되는 표면 캐싱의 한 형태인 라이트 매핑에 사용되는 데이터 구조입니다. 라이트맵은 비교적 낮은 계산 비용으로 전역 조명과 같은 조명 효과를 제공하기 위해 비디오 게임과 같은 실시간 3D 컴퓨터 그래픽을 사용하는 응용 프로그램의 정적 개체에 가장 일반벅으로 사용됩니다.

* [스테이셔너리 라이트](https://docs.unrealengine.com/4.27/ko/BuildingWorlds/LightingAndShadows/LightMobility/StationaryLights/)는 한 위치에 머물되, 밝기나 색과 같은 것을 바꿀 수 있는 라이트입니다. 게임플레이 도중엔 어떻게도 변하지 않는 스태틱 라이트와는 다릅니다. 그러나 밝기를 실행시간에 바꿔도 직사광에만 영향을 끼칩니다.

* [글로벌 일루미네이션](https://ko.wikipedia.org/wiki/%EA%B8%80%EB%A1%9C%EB%B2%8C_%EC%9D%BC%EB%A3%A8%EB%AF%B8%EB%84%A4%EC%9D%B4%EC%85%98)은 3d 그래픽스에서 씬을 렌더링할 때 사용하는 조명 알고리즘을 말합니다. 일루미네이션이란 3d씬에 좀더 사실적인 라이팅을 추가하기 위한 알고리즘 입니다. 이러한 알고리즘들은, 보통 두가지를 고려해서 만들어집니다. 첫번째로는 광원으로부터 직접 오는 빛, 그리고 나머지는 같은 광원에서부터 왔지만 다른 표면에서 반사되어 간접적으로 온 빛들 입니다.   
간단히 말하면 글로벌 일루미네이션이 있다면 빛은 여러 표면에서 반사되어 조명은 여러 표면에서 서로 전달됩니다.

* [볼류메트릭 라이트맵](https://docs.unrealengine.com/5.0/ko/volumetric-lightmaps-in-unreal-engine/)은 다이내믹 오브젝트와 빌드되지 않은 씬 프리뷰의 글로벌 일루미네이션에 사용되는 볼류메트릭 라이팅 샘플입니다.

# 스태틱메시의 모빌리티 설정

Static은 게임플레이 도중 움직일 일이 없는 구조물이나 장식물 메시인 경우. 스태틱 메시인 경우 애니메이션이 가능합니다.

Stationary는 게임플레이 도중 이동하지는 못하지만 변할 수는 있는 액터에 사용합니다.

Movable은 게임플레이 도중 추가, 제거, 이동해야 하는 액터에 사용합니다.

# 코드에서 설정하는 방법
```cpp
Component->SetMobility(EComponentMobility::Movable);
```

## 모빌리티와 Lumen에서
[루멘 글로벌 일루미네이션 및 리플렉션](https://docs.unrealengine.com/5.0/ko/lumen-global-illumination-and-reflections-in-unreal-engine/)

모빌리티가 스태틱으로 설정된 라이트는 지원하지 않습니다. 스태틱 라이트는 라이트맵에 완전히 저장되어 루멘의 기여가 비활성화 되기 때문입니다.