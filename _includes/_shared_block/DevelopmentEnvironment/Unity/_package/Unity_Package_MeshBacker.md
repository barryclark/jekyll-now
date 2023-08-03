Mesh Baker는 Unity에서 제공하는 기본 기능을 확장하여 다양한 Mesh를 결합하고, 최적화하고, 충돌 및 조명 정보를 캡처하는 기능을 제공하는 플러그인입니다. 이 플러그인은 메시를 백업하고 복원할 수 있는 기능도 제공합니다. 또한, MeshSync는 클라우드 기반 도구로, Unity를 비롯한 다양한 3D 툴간의 Mesh 백업 및 공유를 위한 도구입니다. Asset Store에서 Mesh 백업 및 복원 도구를 찾을 때는 자신이 필요로 하는 기능과 툴과의 호환성을 고려해야 합니다. 이를 통해 작업을 더욱 효율적으로 수행할 수 있습니다.

다음은 메시 베이크를 위한 예시입니다. 

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/5b978c16-12c6-41ac-9cdf-8b8d5c8edc4f)

* 원본 소스 ---> 결과물
    * Mesh Bake ( 소스 ---> 프리팹 )
    * Mesh Bake ( 소스 ---> 프리팹 )
    * ...       

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/03ba4cc6-b66e-4e96-b72c-2833ec62a556)

1. MeshBaker를 관리하기 위한 씬을 생성합니다.
2. AddingObjectsTool Window로 오브젝트를 선택 후, MeshBaker에 적용합니다.
3. 머티리얼을 베이크 합니다. 머티리얼이 없다면 생성해야합니다.
4. MeshBaker의 OutputMode를 Bake Into Prefab으로 변경 후, EmptyPrefab을 생성한 후 메시를 베이크합니다.
