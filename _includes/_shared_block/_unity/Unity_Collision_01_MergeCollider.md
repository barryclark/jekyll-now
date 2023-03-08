<center><div markdown="1">

![MoveTo](/images/shared_block_implement_MergeCollision.gif)

</div></center>

다음과 같은 구조가 있을 떄, 부모에서 유니티의 `OnMouseDown`을 호출하기 위한 방법입니다. Rigidbody를 이용해서 Collider를 합칩니다. 

* Cube1 (Rigidbody, Collider)
  * Cube2 (Collider)
    * Cube3 (Rigidbody, Collider)
      * Cube4 (Collider)

여기서 Collider의 attachedRigidbody를 가져올 경우, 바로 위에 있는 Rigidbody를 가져오게 됩니다. 예를 들어 Cube4의 경우 Cube3의 Rigidbody를 가져옵니다.