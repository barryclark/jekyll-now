---
layout: post
title: UMG
---

Widget이란 사용자가 기능을 수행하거나 서비스에 액세스할 수 있도록 하는 응용 프로그램 또는 인터페이스의 구성 요소입니다.

* 상호작용(Interaction)이란 두 대상 혹은 다양한 대상 사이에 정보가 오가고 그것에 따라 반응하는 것이라 할 수 있습니다.
* 인터페이스(Interface)란 서로 다른 사물이나 시스템 간에 소통이 가능하게 하도록 설계한 상호작용 방식입니다.


## CreateWidget 이해하기
UUserWidget의 파생 클래스인지를 먼저 static_assert합니다.

SCOPE_CYCLE_COUNTER <- CPU 프로파일링을 위해서 하는 것임.
를 작동시킵니다. 그래서, 이거는 공식문서 어디에 처박혀 있냐...

실제 생성은 UUserWidget의 Static CreateWidgetInstance 함수에서 호출됩니다.
이는 CreateInstanceInternal로 전달됩니다. 전달될 떄 파라메터를 설정합니다. 
* LocalPlayer는 첫번째 플레이어 컨트롤러가 됩니다. 위젯의 소유자는 0번 ID의 PlayerController가 됩니다.

WidgetComponent의 OwningObject는 World입니다.
실제 생성코드는 NewObject로 이루어 지고, Widget의 PlayerContext를 전달된 첫번째 플레이어 컨트롤러로 설정하고, 그 다음 Initialize가 호출됩니다.

? Construct는 NewObject에서 호출되는 것 같은데...
? 디자인 플래그가 언제 설정되는지 모르겠네.

? Inventory 변수 설정(ExposeOnSpawn)하기 위해서, 언제 선언해야 되는지 알아야함.
? NewObject와 Initialize에서 어디서 Construct가 호출되는가?
! 세상에 위젯의 모양이 생성되는 타임(위젯의 PreConstruct와 Construct)는, BeginPlay 따라서 부모함수의 BeginPlay가 호출되기 전에 InventoryWidget을 설정하면, 되야 하는거 아니냐? 빡치네..

위젯의 작동은 플레이어 컨트롤러와, 위젯의 결합.??? 상호작용하기 위한 인터페이스이니 당연한 건가??? 흐음....
아니 이걸 결정하기 전에, 위젯의 용도가 뭔지 명확하게 정의하는 것이 먼저이다. 그 다음에 기능을 구현할 수 있다.
