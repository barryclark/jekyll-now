[Unreal : 본 인디시스를 이해하기](https://www.unrealengine.com/en-US/tech-blog/demystifying-bone-indices)

* 본의 space는 크게 3개로 나눠집니다. Bone space는 부모 본으로 부터 상대적입니다. Component space는 컴포넌트로 부터 상대적입니다. World space는 월드상의 절대 공간을 의미합니다.

메시 본 익덱스(Mesh Bone Index)는 계층 구조의 순서대로 인덱싱 되어 있으며 렌더링에 사용됩니다. 메시 본 인덱스를 이용해서 스켈레탈 메시의 ComponentSpaceTransforms(Old : SpaceBase)또는 BoneSpaceTransforms(Old : LocalAtom)에 접근합니다.

* 하나의 스켈레톤을 여러 스켈레톤 메시에 사용한다면 메시에 있는 계층구조 순서에 따른 메시 본 인덱스와, 스켈레톤의 본 인덱스는 다를 수 있기 때문에 나눠져 있습니다.

스켈레톤 본 인덱스(Skeleton Bone Index)는 USkeletalMesh의 모든 본에 대한 인덱스입니다. UAnimSequence 내부에는 내부 트랙 인덱스와 일치하는 스켈레톤 본 인덱스간의 맵핑이 있습니다. 따라서 스켈레톤이 변경되면 애니메이션 데이터를 업데이트 해야합니다.

컴펙트 포즈 본 인덱스(FCompact Pose Bone Index)는 FCompactPose에서만 사용할 수 있는 인덱스입니다. FCompactPoseBoneIndex를 이용하여 여러 LOD를 가지는 Skelton Bone Index를 통합할 수 있습니다. 모든 애니메이션 코드는 FCompactPose를 이용합니다. SkeletalMesh와 Skelton간의 대부분의 변환은 USkeleton에서 칮을 수 있습니다.
