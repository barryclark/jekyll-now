---
layout: post
title: Sound
---

## 사운드

[오디오 및 사운드](https://docs.unrealengine.com/4.27/ko/WorkingWithAudio/)

사운드는 사실적인 몰입 환경을 만드는 데 있어서 매우 중요한 부분입니다. 레벨의 배경음에서부터 탈것이나 무기와 상호작용할 때의 소리를 거쳐 캐릭터의 음성 대화와 뮤직 큐에 이르기까지, 오디오는 사용자 경험을 결정짓는 요소입니다.

* 눈에 보이는 사물을 판단할 때 시각이 80%, 청각이 20%를 차지하고, 눈에 보이지 않는 사물을 평가하게 된다면 청각만으로 판단한다고 합니다. (시각, 청각 두개만 봤을 때)

언리얼 엔진의 오디오 엔진 시스템은 **사운드 디자이너**와 엔지니어들이 목표하는 비전에 어울리는 오디오를 제작할 수 있도록 툴과 기능을 제공하고 있습니다. 이것이 중요한 이유는, 깨끗한 버전의 소리를 외부 어플리케이션에서 한 번만 제작한 당므 엔진으로 임포트해와서 원하는 결과를 내도록 엔진에서 만들 수 있다고 합니다.

[오디오 시스템 개요](https://docs.unrealengine.com/4.27/ko/WorkingWithAudio/Overview/)

## Sound Attenuation(사운드 어테뉴에이션, 감쇠)
감쇠란 플레이어가 사운드에서 멀어져감에 따라 그 볼륨을 줄여주는 기능입니다. 감쇠는 MinRadius와 MaxRadius의 두 반경을 통해 작동합니다.

* 사운드의 원점으로부터 MinRadius를 통해 움직일 때 사운드의 볼륨은 100% 입니다.

MinRadius와 MaxRadius사이를 통과할 때 볼륨이 100%에서 고요해질 때까지 선형으로 감쇠됩니다. 이 감쇠가 발생하는 비율은 두 반경간의 볼륨을 조절하는 폴오프 곡선의 여러 유형을 제공하는 DistanceModel프로퍼티와 Distance Algorithm(거리 알고리즘) 세팅에 따릅니다. MaxRadius밖으로 나가게 되면 사운드의 한계 밖에 있게 되므로 아무 소리도 들리지 않게 됩니다.

* Distance Algorithm을 사용하여 감쇠를 정의할 수 있기는 하지만, Attenuation Shape를 사용하여 Attenuation Volume 자체의 모양을 정의할 수도 있습니다.
* 오디오상의 필요 및 오디오 재현 방식을 어떻게 제한시킬지에 따라 구체, 캡슐, 박스, 원뿔 등의 모양을 사용할 수 있습니다.

[감쇠 설정의 그래프와 실제 사용 예시](https://docs.unrealengine.com/4.27/ko/WorkingWithAudio/DistanceModelAttenuation/)

# Sound Cue(사운드 큐)
언리얼 엔진에서의 오디오 재생 작동방식은 사운드 큐에 의해 정의됩니다. 사운드 큐 에디터는 오디오 작업에 쓰이는 노드 기반 에디터입니다.

불륨과 피치 세팅은 사운드 큐의 상대적인 볼륨을 관리하는 데 쓰입니다. 이는 사운드 큐 안에 포함된 모든 오디오의 결과물에 영향을 끼칩니다. 다수의 사운드 웨이브나 믹서 또는 랜덤 노드를 사용하는 경우, 모듈레이터(Modulator)노드를 추가하는 것으로 개별적인 볼륨과 피치 제어가 가능합니다.

## Sound Wave(사운드 웨이브)
사운드 웨이브는 사운드 큐 에디터에 임포트된 오디오 파일을 나타냅니다.

사운드 웨이브 애셋을 사운드 큐에 추가하는 방법은, 콘텐츠 브라우저에서 애셋을 선택한 다음, 사운드 큐 에디터 아무곳에나 우클릭하여 또는 컨텍스트 메뉴의 From Selected부분에서 사운드 웨이브를 선택하면 됩니다.

## 오디오 노드 그래프
오디오 노드 그래프는 뷰포트 패널에 위치해 있고, 왼쪽으로 오른쪽으로 표시됩니다.

[오디오 노드 레퍼런스](https://docs.unrealengine.com/4.27/ko/WorkingWithAudio/SoundCues/NodeReference/)

# Ambient Sound Actor(앰비언트 사운드 액터)
앰비언트 사운드 액터를 이용해 효율적인 배경음 제작 및 편집 프로세스가 가능합니다. 사운드 웨이브 또는 사운드 큐 애셋을 레벨에 배치하면, 해당 사운드 애셋이 할당된 앰비언트 사운트 액터가 생성됩니다.

[앰비언트 사운드 액터](https://docs.unrealengine.com/4.27/ko/WorkingWithAudio/SoundActors/)

앰비언트 사운드 액터는 반복 배경음이나 일회성 사운드 등 여러가지 용도로 사용 가능합니다. 일반적으로 앰비언트 사운드 액터는 사운드에 가까울 수록 더욱 크게 들리는 식으로 현실 세계와 부합합니다.

# Audio Volume(오디오 볼륨)

Audio Volume 에 변경을 가해도 에디터 안에서 실시간 작동하지는 않습니다. 편집된 볼륨이 들어있는 레벨의 지오메트리를 다시 빌드해 줘야 효과가 발휘됩니다.

[오디오 볼륨 래퍼런스](https://docs.unrealengine.com/5.0/ko/audio-volume-actor-in-unreal-engine/)



게임 사운드는 시퀀스를 이용해서 구현할 수 있음. 굳이 사운드 플레이를 만들 필요 없음.

라디오에 쓸 수 있는, 소리
[Harsh Static](https://freesound.org/people/RoganMcDougald/sounds/261242/)
[Passage Way ambience](https://freesound.org/people/Dpoggioli/sounds/213605/)
