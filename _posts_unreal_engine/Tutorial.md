---
layout: post
title: Tutorial
---

- [ ] 다음에, `10 tips for designing a game tutorial` 세부 내용 옮기기

교육에서 튜토리얼이란, 
1. 정보를 전달하는 방법이자
2. 학습하는 프로세스의 부분입니다.

책과 강연 보다 더 상호작용 가능하며, 특징적입니다. 튜토리얼은 예시와 정해진 일 사이의 정보를 줍니다.

## 어떻게 만들어야 하는가?

<details open><summary>간단한 튜토리얼</summary>
<div markdown="1">

튜토리얼을 보여주는 위젯에는 영상과 이미지 그리고 텍스트로 설명합니다.

1. 처음 켜지는 동안은 종료되지 않으며,
2. 아무키나 누르면 종료됩니다.

**이미지 또는 영상이 재생되는 부분이 있고, 이에 대한 텍스트가 표시되어야 합니다.**

다음의 구현을 위해 필요합니다. 아래의 튜토리얼은 순서대로 나타납니다.
* 조작법
* 상호작용
* 인벤토리
* 정신상태

**구현**
* UHorrorTutorialWidget은 이미지, 미디어, 텍스트를 수직 스크롤바에 추가하는 메서드를 제공합니다.
* UHorrorTutorial은 HorrorTutorialWidget을 만들고, 화면에 추가합니다.
* UHorrorTutorialComponent는 조건에 따라 튜토리얼을 시작하며, 튜토리얼을 관리합니다.

</div></details>

## 가이드

* 게임에 튜토리얼을 녹여야 합니다.
* 플레이어가 하는게 읽는 것보다 더 좋습니다.
* 게임 매커니즘을 알려줘야 합니다.
* 플레이어가 딱 한번만 하게 해야합니다.
* 적은 단어를 사용해야 합니다.
* 가능한 거슬리지 않는 메시지를 사용하세요.
* 적용할 수 있는 메시지를 사용하세요.
* 소음을 만들지 마세요.
* 시각적인 요소를 사용해서 알려주세요.
* 사람들이 이미 알고있는 정보를 활용하세요.

주요 참고자료 : [10 tips for designing a game tutorial](https://www.filamentgames.com/blog/10-tips-designing-game-tutorial/)