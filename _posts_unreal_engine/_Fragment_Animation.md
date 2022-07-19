---
layout: post
title: Animation Fragment
---

## Fook IK와 prediction Foot position
* Foot은 서있거나 이동할 때 바닥을 지지해주는 부분. 기준은 허리 아래에 있는 것을 의미함. 트레이스를 이용하여 Heel과 Toe의 위치를 조정하는 것은 울퉁불퉁하거나 경사가 있는 지면, 서로 다른 위치에 있는 지형에 대해서 자연스러운 애니메이션을 제공함.
	- Fullbody(Jacobian), LimbIK, FABRIK, CCDIK(실험적) 등의 IK가 있음.

* 현재 애니메이션을 기준으로 트레이스하여 IK하는 것은 트레이스의 출동 좌표가 급격히 변했을 때 부자연 스러운 애니메이션을 나타냄. 이를 위해 이동에 따라 보간하는 방법과 Prediction을 통해서 애니메이션을 결합하는 방법이 있음.
	- 보간하는 방법에 대해서 나는 IK하고자 하는 본의 컴포넌트 스페이스를 레이를 축으로 수직 백터와 평면 백터로 나누어 작업함.
	- [Automated Semi-Procedural Animation for Character Locomotion](https://runevision.com/thesis/rune_skovbo_johansen_thesis.pdf)에서 발의 위치를 예측하여 보간하는 방법을 사용함. 하지만 Unreal에서 Prediction을 하기 위해 데이터를 애니메이션에 보관하고 보간할 수 있는 방법을 필요로함.
	* Animation Curve (애니메이션 커브)는 애니메이션이 재생중인 동안 머티리얼 파라미터나 모프 타깃의 값을 바꿔줍니다. 그 작업방식은 (머티리얼이든 모프 타깃이든) 변경하고자 하는 애셋을 지정한 다음, 그에 맞는 커브 이름을 대 주고, 애니메이션 기간에 걸쳐 키프레임 값을 조절해 주면 됩니다.
	* 처음에 Control Rig값을 Animation에서 가져 올 수 있나 찾아봤지만 없는 것 같음.

## Root motion과 회전
* [회전 입력으로 루트 모션 시스템 설정](https://www.youtube.com/watch?v=QCA4ZQzFZ9s)에서는 
	1. 회전에 따른 Blend2D를 만듬.
	2. 액티브 카메라(랜더링에 사용되는, 뷰 프로젝션 트렌스폼을 가진)를 Controller의 로테이션과 분리시킴.
	3. Root motion에 의한 회전과 카메라 축의 회전이 다르므로 이를 처리하기 위한 작업이 존재함.
	- 스테이트 상태(실행되는 애니메이션)마다 자연스럽게 허용될 수 있는 애니메이션 값이 다름. 따라서 상태에 따라 다른 회전값을 반환하도록 설정해야함. 이는 애니메이션 시스템에 따라 선택사항이 될 것임. 

* [Motion Matching](http://bbagwang.com/programming/algorithm/%EB%AA%A8%EC%85%98-%EB%A7%A4%EC%B9%AD-motion-matching/)도 자연스러운 애니메이션을 추출하기 위한 하나의 선택사항이라고 생각함. 현재 제한사항이 심히 많으므로, 사용 가능한 것이 아니라고 생각함.
[Learn Motion matching](https://static-wordpress.akamaized.net/montreal.ubisoft.com/wp-content/uploads/2020/07/09154101/Learned_Motion_Matching.pdf)을 읽고 공부할 수 있다고 생각함. 여기서는 neural-network-based generative models을 제시한다고 함.

* 회전 입력으로 루트 모션 시스템 설정과 Motion Matching중 회전 입력으로 루트 모션 시스템 설정을 이용함.
	- 회전 입력으로 루트 모션 시스템 설정으로 선택함.
	- Motion Matching은 현재 적용하기 굉장히 어려울 것으로 보임.

! Curve Based Animation은 생각한 거랑 다름.

! 평면에서 이동하는 애니메이션은 허용하는 회전값이 있음. 이는 Blend2D와 일치함. 다만 측면 이동에 대해서 회전과 측면 이동 2가지 개념이 존재하기 때문에 어떤 개념을 이용할지는 선택사항임. 어떻게 블렌드 될지 고르는 것은 선택사항임. 애매하다면 velocity와 Blend값을 일치시키는 것이 가장 무난하다고 생각됨.

자연스럽게 회전하기.

!... Animation 8개 Notify State * 10 80개 Map음... 망할. IsNotifyState가 훨씬 빠른가.

? Curve로 만드는 것이 좋아보이는데?

? LookAt함수도 보고싶은데

? 카메라를 루트에 어테치 시키면 어떻게 될까?
! 골반 흔들릴 때마다 카메라도 같이 흔들리는데 토할거 같다.

[Red Dead Redemption2 Animation Systems Analysis](https://www.youtube.com/watch?v=i78ds3bJFDE)

## LookAt Node
이 노드는 TargetBone을 LookAtBone을 바라보도록 수정합니다.
BoneToModify의 트렌스폼을 구함.
LookAtTarget에 따라 결과가 달라짐.
{
	유효할 경우
	타겟 본의 트렌스폼을 기준으로 오프셋 시킴.

	// if none is found, we consider this offset is world offset
	TargetOffset을 로컬 컴포넌트의 트렌스폼으로 변경함
}
중간에 보간시간에 따라 결과가 달라지는 내용이 있고
BoneToModify에서 업벡터와 look at과 look up 벡터를 구한 후
AnimationCore::SolveAim함.
그리고 ModifyPoseFromDeltaRotation로 적용함.

LookAt 사용하기 넘므 어렵다.
그렇다면, IK로 만든다.

## 

! LevelSequence의 LinkAnimSequence를 통해 애니메이션을 에디터에서 쉽게 만들고 제거함.

Initialize AnyThread에서 BoneReference를 초기화

로테이션 들어가닌까 가능성이 엄청높다.

LevelSequence로 AnimSequence작업할 떄, 먼저 링크드 애니메이션 만든 후 작업해야한다. 안그르면 노티파이 설정들 날라간다.

https://www.youtube.com/watch?v=Z8eqaFG7lZQ
모듈식 작업을 생각했었는데, 실제로 모듈식으로 작업하네.
18분 22초 : 리지드 바디에 대한 설명이 있음.

스켈레탈 메시로 렉걸릴 떄 사용하면 따봉.

! BoneContainer가져올 때 참조자 사용안하면 지랄하나 보네. 메모리 낭비 지리나 보네.

? 엄청 간단한 튜토리얼이네 https://www.songbingjia.com/shida/show-288872.html
	- FAnimNodeEditMode 어따 쓰는건지 모르겠는데.

* BP는 로직이 아닌 결합을 목적으로 사용?!?

? 쓸데없는 이야기긴 한데 중국인들은 교훈 인용하는거 엄청 좋아하네.

? http://runxinzhi.com/sevenyuan-p-11848771.html여기서 이 [유투브](https://www.youtube.com/watch?v=yTniZCOCY7o)영상은 많은 영감을 준다.

? Animation Graph 코딩시 주의할 점이 적혀있으나, 당장은 크게 쓸데 없어보임.
https://arrowinmyknee.com/2019/05/11/tool-tips-for-ue4-animation-programming/

? IK Solver를 통해 다양한 IK 솔버를 생성할 수 있음. 솔버는 체인에서 본을 회전 및 배치하는 솔루션을 생성하기 위해 사용됨.

? [AUTODESK의 Solvers에서 History Dependent(HD)에 관심이 있음.](https://help.autodesk.com/view/3DSMAX/2023/ENU/?guid=GUID-AE4A0089-95F5-4199-A853-ABB8E0DB3439)

? Full body solver를 Control Rig에서도 사용할 수 있음.
? ComponentPosition을 업데이트 하는 조건이 무엇인가?
? MirrorDataTable 애니메이션 값 받아올 수 있겠는데?

## AnimNode와 AnimNodeGraph

* FPoseLinkBase::AttemptRelink
	- ? 무슨용도인지 모름. 노드 연결과 관련된 것 같은데.
	- AnimNode에서 Initialize_AnyThread함수 내에서 PoseLink의 Initialize메서드를 호출할 때 호출됨.

Anim notify

[Noah Zuo`s Blog : Tool tips for ue4 animation programming](https://arrowinmyknee.com/2019/05/11/tool-tips-for-ue4-animation-programming/)

## Physically based animation

어떻게 쓰는건지 알고싶다. 왜 안되는 거냐.

핵심적인 활용들
* Below Simulate Physics
* Blend Physics
* Hit-Based Reaction

## PhysicalAnimation을 이용하기

[참고자료](https://docs.unrealengine.com/4.27/en-US/AnimatingObjects/SkeletalMeshAnimation/PhysicallyDrivenAnimation/)

리지드 바디 애님 그래프를 이용하여 시뮬레이션 할 수 있습니다.

[Physical Animation / Rag doll TUTORIAL in Unreal Engine 4](https://www.youtube.com/watch?v=_Xnx9L6DgfE)

## RidgidBody(AnimGraph)를 이용하기


[Cascadeur: physics-based animation software](https://www.youtube.com/watch?v=nj_Dtj7c0Lc)


```cpp

	USkeletalMeshComponent* SkeletalMeshComponent = Output.AnimInstanceProxy->GetSkelMeshComponent();
	//int32 BoneIndex = Output.AnimInstanceProxy->GetSkeleton()->GetReferenceSkeleton().FindBoneIndex(SocketName);
	//FBoneReference BoneReference = Output.AnimInstanceProxy->GetRequiredBones();
	//if (BoneIndex == INDEX_NONE)
	//{
	//	UE_LOG(LogTemp, Error, TEXT("Bone Index is not valid."));
	//	return;
	//}

	// ComponentSpace
	const FBoneContainer& BoneContainer = Output.Pose.GetPose().GetBoneContainer();
	FTransform ComponentSpace = Output.Pose.GetComponentSpaceTransform(FCompactPoseBoneIndex(BoneContainer.GetPoseBoneIndexForBoneName(SocketName)));
	//FTransform ComponentSpace = Output.Pose.GetLocalSpaceTransform(FCompactPoseBoneIndex(BoneIndex));

	// ComponentSpace to Relative
	FootOfDataObject->ComponentSpaceToRelativeTransform = FTransform(SkeletalMeshComponent->GetRelativeRotation(), SkeletalMeshComponent->GetRelativeLocation(), SkeletalMeshComponent->GetRelativeScale3D());

	// ComponentSpace to World
	//FootOfDataObject->ComponentSpaceToWorldTransform = FTransform(SkeletalMeshComponent->TransformFromBoneSpace())
	
	// Cache ComponentSpace
	//FootOfDataObject->FootOfDataMap.FindOrAdd(SocketName).OriginalPosition = (FootOfDataObject->ComponentSpaceToRelativeTransform * ComponentSpace).GetLocation();
	FootOfDataObject->FootOfDataMap.FindOrAdd(SocketName).OriginalPosition = (ComponentSpace * SkeletalMeshComponent->GetComponentToWorld()).GetLocation();
```

##
? 이상한걸 좀 추가하기는 했는데, 오류나는 이유는 모르겠네.
	~FICUTextBiDi()
	{
		ubidi_close(ICUBiDi);
		ICUBiDi = nullptr;
	}
	D:\Program Files\Epic Games\UE_5.0\Engine\Source\Runtime\Core\Private\Internationalization\ICUText.cpp
	뭐땜시인지 모르겠다.

Local Space는 명확하게 부모 본으로부터의 상대적인 것을 말함.
, Component Space 본이 Skeletal Mesh Component에 상대적인 것을 말함.
, Relative Space, World Space, Bone Space

? ComponentSpace를 WorldLocation으로

? OutputNode를 만들어서 연결했는데 연결되었다고 표시가 안나오네, 뭐지????
! CreateOutputPose를 이용해서 OutputPin을 만들 수 있음. 이를 이용해서 뻘짓하는게 가능해보임.

* AnimNode와 AnimNodeGraph는 라이브코딩과 친하지 않습니다.

AnimNotifyState로 한다는 생각은 합리적인거 같은데.
빌드가 너무 느리니 할 수 있는게 없네.

AnimNotifyState는 AnimInstance에서도 호출된다고 한다. 근데 GetBoneLocation이 안되는 이유는 모르겠다.
음.. AnimBlueprint에서만 제대로 작동하지 않는다.

https://docs.unrealengine.com/4.26/en-US/API/Editor/AnimGraph/UAnimGraphNode_Base/
AnimGraph모듈, 필요로함.

AnimGraph 만들기, UAnimGraphNode_Base

! 일단은 Struct임. FABRIK.h, AnimNode_Fabrik.cpp, AnimNodeBase

! AnimNodeBase를 상속받아야함.

! Struct 프로퍼티는 BlueprintInternalUseOnly로 되어있음.

! 다음의 예제는 컴포넌트 포즈를 입력받는 예제임
```cpp
UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = Links)
FComponentSpacePoseLink ComponentPose;
```

! 출력노드는 별도로 설정하지 않아도 하나로 출력됨.

! CPP에서 등록하는거 같은데, 상당히 머리아플 것으로 보임.

! 이정도로 하면 AnimGraph는 등록됨. 다만 오류남.
```cpp
USTRUCT(BlueprintInternalUseOnly)
struct SPIDERMODULE_API FMyAnimGraph : public FAnimNode_Base
{
	GENERATED_BODY()

public:
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = Links)
	FComponentSpacePoseLink ComponentPose;

	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	int32 BoneIndex;

	FMyAnimGraph()
		: BoneIndex(0)
	{
	}
};

UCLASS(MinimalAPI)
class UMyAnimGraphNode : public UAnimGraphNode_Base
{
	GENERATED_BODY()

	UPROPERTY(EditAnywhere, Category = Settings)
	FMyAnimGraph Node;
public:
};
```

! Link를 수동으로 연결해 줘야 한다는 점은 충격적이네.

? 쿠킹하면 오류나는지 안나는지 궁금하네, 정상적으로 만들었으면 안나게 만들었겠지?