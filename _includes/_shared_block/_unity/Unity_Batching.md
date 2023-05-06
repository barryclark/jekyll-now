[Draw call batching](https://docs.unity3d.com/kr/530/Manual/DrawCallBatching.html)

Unity에서 배칭(Batching)은 여러 개체를 하나의 그리기 호출로 결합하여 성능을 향상시키는 기술입니다. 배칭은 동일한 소재(Material) 및 렌더러(Renderer) 구성 요소를 공유하는 여러 개체를 그룹화하고, 그룹 단위로 단일 그리기 호출로 처리함으로써 CPU와 GPU 부하를 줄일 수 있습니다.

Unity는 정적 배치(Static Batching) 및 동적 배치(Dynamic Batching) 두 가지 유형의 배칭을 제공합니다. 정적 배치는 개체가 런타임 이전에 변하지 않을 때 사용되며, 동적 배치는 개체가 런타임 중에 위치나 방향 등이 변경될 때 사용됩니다.

배칭은 성능 향상을 위해 권장되는 기술 중 하나입니다. 그러나 모든 상황에서 배칭이 적용될 수는 없으며, 배치할 개체의 소재(Material)나 렌더러(Renderer) 구성 요소에 대한 제한 사항이 있을 수 있습니다. 따라서 배치가 적용될 수 있는지 확인하고, 적절한 성능 향상 기술을 선택하는 것이 중요합니다.

[정적 배칭](https://docs.unity3d.com/kr/current/Manual/static-batching.html)

에디터에서 빌드 시점에 정적 배칭을 활성화할 수 있습니다. 빌드 시점에 정적 배칭을 수행하려면 다음 단계를 따르십시오.

1. Edit > Project Settings > Player로 이동합니다.
2. Other Settings에서 Static Batching을 활성화합니다.
3. 씬 뷰 또는 계층 구조에서 배칭할 게임 오브젝트를 선택하고 인스펙터에서 확인합니다.
4. 게임 오브젝트의 Static Editor Flags에서 Batching Static을 활성화합니다.

* 정적 배칭은 CPU에서 버텍스를 변환하지 않으므로 동적 배칭보다 더 효율적입니다. 정적 배칭이 성능에 미치는 영향에 관한 정보는 성능에 미치는 영향을 참조하십시오.
* batches의 수치가 낮아지지만 다수의 메시를 결합한 하나의 메시를 추가로 저장하여 메모리 사용량이 증가합니다.