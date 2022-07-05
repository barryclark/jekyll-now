---
layout: post
title: Camera
---

# Camera란
카메라는 플레이어의 시점을 보여주는데 사용합니다.
플레이어가 월드를 보는 방식을 나타내는데, 그 이유는, 카메라는 사람이 제어하는 플레이어에만 관련이 있기 때문입니다.

언리얼 엔진에서 PlayerController는 카메라 관련 클래스를 갖고 있고, 플레이어가 월드를 보는 위치와 방향을 계산하는데 사용되는 Camera Actor를 인스턴싱합니다.

* PlayerController
```cpp
UPROPERTY(BlueprintReadOnly, Category = PlayerController)
APlayerCameraManager* PlayerCameraManager;
UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = PlayerController)
TSubclassOf<APlayerCameraManager> PlayerCameraManagerClass;
```

## Camera Component와 Camera Actor
카메라의 모든 프로퍼티와 작동 방식은 Camera Component에 설정되어 있고, CameraActor클래스는 일차적으로 CameraComponent를 감싸는(Wapper) 역활을 합니다. 카메라를 다른 클래스안에 놓지 않고도 레벨에 바로 노해을 수 있도록 하고 있습니다.

* 카메라 메니저의 로테이션이 카메라의 실제 로테이션을 나타냅니다.
* CameraActor는 씬에 배치해 자유롭게 사용할 수 있고 보통 시퀀서나 마티네와 함께 각종 연출에 사용됩니다.
* CameraActor자체에 여러가지 포스트프로세싱 효과나, FOV(Field Of View) 범위를 설정하는 등등의 작업도 진행할 수 있습니다.

## Camera Manager
APlayerCameraManager클래스는 플레이어의 카메라를 관리해주는 매니저 클레스입니다.

기본적으로 대기중인 뷰 타겟(ViewTarget)과 콘솔 명령으로 트리거되는 디버그 카메라를 블렌딩 해주는 작동 방식을 갖고 있습니다. 그 외에는 카메라의 시점과 기타 모든 카메라 세팅에 대해 무슨 작업을 할 것인지 정할 수 있습니다.

결론적으로 최정 출력될 카메라에 대한 프로퍼티를 갖고 있으며 그에 대한 수정도 가능합니다.

## View Target
뷰 타겟은 CameraManager에 정의되는 하나의 구조체이며 시점(Point Of View) 제공을 담당합니다.

뷰 타겟에는 타겟 액터, (로컬에서 제어되지 않는 Pawn에 대한) 타겟 액터의 컨트롤러, PlayerState에 대한 정보가 들어있으며, 이는 Pawn전환이나, 뷰의 다른 변경사항을 진행하기 위해 사용됩니다.

이 구조체에는 Camera Component에서의 기본적인 카메라 정보가 들어 있으며, 거기에는 위치, 로테이션, 투영 모드(원근 or 직교), FOV, 직교 포그 종횡비, 포스트 프로세스 이펙트 등등이 포함됩니다.

Camera Manager에 뷰 타겟값을 접근할 수 있도록 하면 카메라 관리 도중에 두 카메라 모드의 블렌딩이 가능해집니다.

카메라 쉐이크(Camera Shake), 카메라 애니메이션, 렌즈 더트 효과 등 후처리에 관한 것들을 CameraManager가 처리하게 도와줍니다.

## Camera Modifier
Camera Modifer는 APlayerCameraManager에 계산되어 나올 최정 카메라 변수를 수정할 수 있는 오브젝트입니다.

구성요소로 블렌딩을 위한 Alpha, AlphaInTime, AlphaOutTime 등등의 값이 기본적으로 존해 하며, 포스트프로세싱 효과나, 카메라의 상태나 카메라 자체의 요소들을 수정하게 해줍니다.

Camera Manager는 Camera Modifier에 대한 배열을 갖고있으며, 배열을 옮겨다니며 블렌딩을 진행할 수도 있습니다.

대부분 미리 설정해둔 포스트 프로세싱 프로파일이나 카메라 움직임, 쉐이크 등으 효과들을 빠르고 편리하게 정해두고, 다양한 곳에서 사용합니다.

## Camera Animation
카메라 애니메이션은 카메라에 애니메이션 레이어를 끼워서 임팩트, 배경 모션, 이팩트 시뮬레이션 등을 가능하게 해줍니다.

애니메이팅 가능한 것은 카메라 위치와, 회전, FOV, 포스트 프로세스 세팅이고, 카메라 애니메이션의 위치, 회전 FOV 변화는 게임 카메라에 더하기 식으로 즉, 초기 값에 대한 상대적인 것으로 간주해, 애니메이션 내에서 0초부터의 경과치만 적용됩니다.

카메라 애니메이션의 포스트 프로세스 세팅은 씬의 포스트 프로세싱에 영향을 끼칠 수 있는 다른 시스템처럼 브레딩/레이어 방식으로 적용됩니다.

CameraManager를 통해 재생시키거나 블렌딩 할 수 있고, 추가적인 레이어도 덮을 수 있습니다.

카메라 애니메이션을 재생하면 CameraAnimInst가 생성되며, 여기에 애니메이션의 활성 인스턴스에 대한 재생 정보가 들어갑니다. 이 오브젝트를 사용하여 애니메이션을 수동으로 중지시키거나 재생 파라미터를 변경할 수도 있습니다.

한번에 최대 8개의 CameraAnimInst를 활성화시킬 수 있으며, 그 모든 최종 카메라 세팅에 블렌딩 됩니다.

## Camera Responsibility Chain
카메라 책임 체인은 ALocalPlayer에게 전달되어 렌더링, 씬 뷰와 함께 기타 등등의 관련 시스템으로 끝나기 전, 아래 설명된 클래스를 위에서 아래로 흘러가는 카메라 책임 체인 흐름상의 어느 지점에서도 게임 전용 카메라 작동방식을 제공할 수 있습니다.

카메라 책임 체인은 어떤 컴포넌트가 어떤 카메라를 사용하고 있는지와 어디를 가르키는지 알 수 있는 멋진 방법입니다.

먼저, 언리얼 엔진은 카메라 컴포넌트 클래스를 조사해서 아래에 언급된 정보들을 수집합니다.

예를 들어 정보중 "fallback"을 제외한 어떤것도 제겅되지 않았다면, 그 다음엔 언리얼 엔진에서는 액터와 플레이어 컨트롤러를 조사합니다.

만약 그곳에 카메라를 위한 정보를 포함하고 있다면, 액터나 플레이어 컨트롤러에서 정보를 이용합니다.

마지막으로, 엔진에서는 CameraComponent, Actor, PlayerController를ㄹ 거쳐오면서도 정보를 찾지 못했다면, PlayerCameramanager를 조사합ㄴ디ㅏ.

이 단계에서는 아마 카메라에 대한 완전히 다른 규칙을 가질 수 있을 것입니다. 일반적으로 카메라에 커스텀 작업을 하지 않는다면, 엔진 매부에서 작동하는 규칙이라 볼일이 별로 없을 것입니다.

## CameraComponent
뷰 타겟이 카메라 액터이거나, 카메라 컴포넌트가 들어있으면서 bFindCameraComponentWhen ViewTarget이 true로 설정된 액터일 경우에 CameraComponent는 카메라의 프로퍼티에 대한 정보를 제공합니다.

## Actor 또는 PlayerController
플레이어 컨트롤러와 액터에는 CalcCamera함수가 들어있습니다.

bFindCameraComponentWhenViewTarget이 true이고, 카메라 컴포넌트가 존재하는 경우, 액터의 CalcCamera함수가 액터의 첫째 카메라 컴포넌트의 시야를 반환합니다. 그렇지 않은 경우에, 액터의 위치와 방향을 구합니다.

플레이어 컨트롤러에서 CalcCamera함수는 이 두번째 경우와 유사한 동작을 하여, 빙의된 Pawn이 존재하면, 그 위치와 플레이어 컨트롤러의 컨트롤 로테이션을 반환합니다.

## Player Camera Manager(Camera Manager)
APlayerCameraManager의 UpdateViewTarget함수는 뷰 타겟에 질의하여 뷰 타겟의 시점(POV)를 반환합니다.

서브 크래싱된 APlayerCameraManager를 갖고서 카메라 컴포넌트를 통해 보고있지 않은 경우에는 BlueprintUpdateCamera를 호출하는 함수이기도 합니다.