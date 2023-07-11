[Advanced Niagara Effects](https://www.youtube.com/watch?v=31GXFW-MgQk)

Niagara - World Interaction

나이아가라가 월드 정보를 받아오는 방법으로는,
1. Triangles : 나이아가라는 모델의 메쉬정보를 읽어올 수 있습니다.
2. Physics Volumes : CPU 콜리전에 대해서 트레이싱 할 수 있습니다.
3. Scene Depth : Gpu 파티클은 씬 뎁스를 가져오 수 있습니다.
4. Distance Fields : 마지막으로 볼륨 텍스쳐워 디스턴스 필드를 쿼리할 수 있습니다.

> 글로벌 디스턴스 필드는 볼류메트릭 텍스쳐입니다. 특정 위치를 커리했을 때, 가장 가까운 표면으로부터 얼만큼 떨어져 있는지를 나타냅니다.
> 디스턴스 필드로 레이 마칭 할 수 있습니다.

이벡트를 디버그 할 때, Debug Visualization 하는 방법들 도 생각해 보도록 합니다.

경로를 나타내는 라인을 그리고, 숫자를 나타내는 머티리얼을 사용합니다.

Niagara에서 Avoid Distance Field Surface_GPU를 통해 근처 표면에서 멀어지게 할 수 있습니다.

효과를 만드는 것은 세상을 모방하는 것으로 볼 수 있습니다. 정확하진 않치만 이와 유사한 효과를 통해서 표현합니다.

스페이셜 해서라는 것이 있는데 나이아가라에서는 이웃 그리드라고 합니다. 볼류메트릭 3차언 그리드 안에 파티클을 넣고 파티클의 위치를 찾는 것 입니다.

[A deep dive into Boids using Niagara in Unreal Engine](https://www.youtube.com/watch?v=9iDA6WMqEyQ)

[Crab](https://www.artstation.com/artwork/3dg0mD)

나이아가라 나비효과 만들기

1. 나비의 움직임을 구현합니다.
2. 나비의 버텍스 애니메이션을 구현합니다.
