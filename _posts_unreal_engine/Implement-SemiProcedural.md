---
layout: post
title: Semi procedural animation from root motion
---

## 목표

* 요구
    - 대충 만든 루트모션을 바탕으로 월드와 상호작용하는 것 같은 애니메이션을 만든다.
        - 레이케스트를 이용해서 발이 떨어져 있는 상황에서는 지면으로부터 offset을 구한다.
        - 힐과 토에 대해서 지면에 고정시킬 수 있다.
    - 적당히 만들어진 포즈를 자연스럽게 복구하는 패스를 만든다.
        - 본의 콘스트레인과 포즈의 관계
        - 벨로시티와 포즈의 관계
* 포기
    - 다른 스켈레탈의 본 콜리전 위에 현재 스켈레탈의 본 콜리젼이 적용되는 경우는 포기한다.
        - 멀티 쓰레드로 애니메이션이 업데이트 되는 상황에서 이를 동기화할 실력이 안된다.
    - 레이 케스트를 이용한 IK 포지션은 t-1초로 결정된다.
        - 애니메이션으로 부터 발이 지면에 도달할 위치를 미리 계산하는 걸 만들 자신이 없다.

* 요구
    - 노티피 스테이트를 자동화해서 만든다.
    - 리지드 바디를 이용하여 자연스럽게 만든다.

## 구조

Motion Passes

Adjust Passes
현재 입력된 모션을 바탕으로 업데이트 한다.

Physical Passes

Style Passes

## 개념

애니메이션이 적용ㄷ

## 프레임워크

* FFootOffData
* UFootOffDataObject

* FootOffDataInterface

* FootOffAnimNode

* FootOffAnimNotifyState_Base

For test
* Teuthisan AnimInstance, Character, SkeletalMesh, Animation ...
