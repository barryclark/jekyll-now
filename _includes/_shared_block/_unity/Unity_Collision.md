[Collider](https://docs.unity3d.com/kr/current/Manual/CollidersOverview.html), [Collider API](https://docs.unity3d.com/ScriptReference/Collider.html)

Collider 컴포넌트는 물리적 충돌을 위해 게임 오브젝트의 모양을 정의합니다. 보이지 않는 콜라이더는 게임 오브젝트의 메시와 완전히 똑같을 필요는 없습니다. 메시의 대략적인 근사치로도 효율적일 때가 많으며, 게임플레이에서 구별하기 어렵습니다.

가장 간단한(그리고 프로세서에 부하를 주지 않는) 콜라이더는 기본 콜라이더 타입입니다. 3D에서는 박스 콜라이더, 스피어 콜라이더, 캡슐 콜라이더가 바로 이 타입입니다. 2D에서는 박스 콜라이더 2D와 써클 콜라이더 2D를 사용할 수 있습니다. 복합 콜라이더 를 만들기 위해 이러한 콜라이더를 단일 게임 오브젝트에 원하는 만큼 추가할 수 있습니다.

* 콜라이더의 메시지로 OnCollisionEnter, OnCollisionExit, OnCollisionStay, OnTriggerEnter, OnTriggerExit, OnTriggerStay가 있습니다.
