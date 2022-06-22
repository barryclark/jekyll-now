---
layout: post
title: First Person Horror Character
---

UE 4.27
2022 06 18

# 캐릭터 컨트롤러와 캐릭터 플레이어
스캘레톤은 언리얼의 기본 스켈레톤을 이용합니다.

**런타임중 캐릭터가 변경될 수 있으므로**(또는 멀티플레이의 경우) 캐릭터에 제한적인; 무브먼트, 때로는 카메라를 제외하고, 플레이어 컨트롤러에서 폰으로 명령을 내리는 식으로 결정됩니다.

* 무브먼트와 관련된 입력은 캐릭터에서 바인드됩니다.
* 에로 UI 등의 입력은 컨트롤러에서 바인드됩니다.
* 폰의 데이터는 휘발성입니다.

## 캐릭터의 무브먼트
* 언리얼의 PawnCharacterMovement를 이용합니다.
* 캐릭터의 애니메이션은 CharacterMovement의 상태를 반영합니다.

캐릭터 무브먼트의 최근 지면이 다른 유형으로 업데이트 되었을 떄 태그를 검사하여, 지면과 상호작용을 결정합니다.

// CharacterMovementComponent
1. CurrentFloor가 없데이트 됨.
2. Floor가 다르면 Character의 SetBase가 호출됨.
// ACharacter
3. SetBase가 호출됨
4. bNotifyPawn==ture일 때 BaseChange가 호출됨.
// 델리게이트를 못찾은 관계로 델리게이트를 업데이트함.
5. BaseChange를 상속받아 추가 구현
6. 매번 Tag를 찾기좀 그러므로, { ..., MovementTag, Stair }로 구현.
    - 없거나, 다르면 오류

* CharacterMovementComponent는 다음과 같이 호출됩니다.
    1. CurrentFloor가 업데이트 됩니다.
    2. Floor가 다르면 SetBase가 호출됩니다.
    3. bNotifyPawn == true일 때 BaseChange를 호출합니다.
    - HorrorPlayerCharacter는 BaseChange를 오버라이드 합니다.
* Movement 태그의 인덱스를 구한 후, Movement태그 다음을 검사합니다.

## 활성화된 카메라와 스켈레탈 메시의 Opacity설정
Material Expression의 Camera Position은 랜더하는 Camera의 월드스페이스를 반환합니다.

이를 이용하여 거울을 위해 사용하는 랜더타겟과, 카메라가 캐릭터를 통과할 때 나타나는 Opacity를 다르게 할 수 있습니다.

## 캐릭터 인풋의 처리
플레이어 캐릭터에 플레이어 컨트롤러가 빙의가 끝났을 때 인풋을 바인딩합니다.
* 기본적으로 SetupPlayerInputComponent는 Pawn의 PawnClientRestart메서드에서 호출됩니다.

# 애니메이션
애니메이션의 조작 및 추가는 레벨 시퀀스에서 링크드 애니메이션을 만듬으로써 작업할 수 있습니다.

애니메이션 시퀀스 에디터 메뉴의 창/애니메이션 데이터 모디파이에서 애니메이션 데이터 모디파이로, 노티파이 및 커브를 자동화 할 수 있습니다.

애님 인스턴스에서 피직스를 리지드 바디 노드를 통하여, 자연스럽게 할 수 있습니다. 이때 피직스 애셋을 생성한 후 오버라이드 하여 부분적으로 리지드 바디를 적용할 수 있습니다.

트레이스를 목적으로 애니메이션 노드를 만들어서, 애니메이션의 중간 본 결과를 이용해서 레이 트레이스 할 수 있습니다. 이를 이용해 Foot IK를 구현할 수 있습니다. 하지만, 다음 번 발의 Foot이 지면에 충돌하는 포지션을 예측 할 수 있다면, 보다 수준높은 애니메이션을 만들 수 있습니다. FootIK를 구현할 때는 힐과 토에 대해서 생각해야 합니다.

AnimSequence에서 RightFoot, LeftFoot의 SKeletonNotify를 발생시킵니다. 이는 애님 인스턴스에서 Character의 FootStrikeDelegate를 호출하는 구조로 작성되어 있습니다.

## 카메라 쉐이크
FootStrikeDelegate에 카메라 쉐이크 메소드가 바인딩되어 있습니다.

## 발소리
FootStrikeDelegate에 발소리를 출력하는 메소드가 바인딩되어 있습니다.

## 공중에서 지면에 충돌할 떄
지면에서 떨어질 때 OnLanded에 메서드를 바인딩 합니다.