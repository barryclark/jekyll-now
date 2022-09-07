---
layout: post
title: Graphics Fragment
---

sky light 리얼 타임 캡쳐... 스카이 라이트 캡쳐를 그래야 실시간으로 캡쳐해서 랜더링 한다..

음. 스케일링을 잘 쓰면, 좋다? 캐릭터가 중심에 있으므로, 상대적으로 크게 느껴지는 것과, 보스 몬스터 주변에 안개나 효과를 주면서 원근감이 느껴지게 했다??

환경 디자인에서, 자연스러움을 위해서, 의도적으로 반복을 피하는게 환경 디자인에서 중요한 요소라 생각. 예로 절벽에서 한두개씩 다르게 하게, 너무 과하지는 않게,

퀵셀에는 퀵셀의 에셋들을 극한까지 활용해서, 정말 실사같이 만든다.

언리얼에서 액터를 합치는 방법은 여러가지가 있음. 언리얼에서 레벨 인스턴스의 방법도 지원해준다. PackedLevelActor생성 하면, 창이 하나 나타나고, 묶어서 저장하면, 선택된 에셋들은 별개의 레벨로 만들어서 붙여진 것이 된다. 모두다 하나의 그룹으로 묶이기 때문에 편집 작업이 매우 용이하다. 다른 것들도 일괄적으로 영향을 받음. 여러개의 그룹들을 한번에 컨트롤 하기 매우 편하다.

언리얼 엔진내에서 편하게 개수를 줄일 수 있음. 레벨 디자인에는 굉장히 다양한 트릭이 필요함.

나나이트의 경우, 너무 작은 오브젝트로 많이 겹쳐있는게 아니면, 나나이트가 컬링을 하므로, 크게 문제되지 않는다. 클러스터 단위로 쪼개져서 컬링되기 때문에, 마음놓고 만들수 있다. (문제는 용량...)

랜드스케이프를 이용하는 워크플로와 스태틱 메쉬를 이용하는 워크 플로, 모든 성향은 프로젝트 성향에 따라 결정됨.

믹서 기본: 스마트 머티리얼 | 퀵셀 아티스트들 겁나 신날듯.

## FPS 보기
1. 레벨뷰포트를 선택한 상태여야한다
2. 키보드 키중 ` (1옆에잇는거 ~이거)를 눌린다, 눌리면 하단에 콘솔 검색창이 활성화된다
3. 검색창에 "stat FPS"를 쓴뒤엔터
4. 오른쪽 상단에 fps수치 등장

[라이트 컴파일 맨날 안되는 이유를 모르겠다.](https://docs.unrealengine.com/4.27/ko/BuildingWorlds/LevelEditor/MapErrors/)

* 라이팅 빌드가 실패할 경우, 이유는 UnrealLightMass가 빌드되지 않았거나 문제가 있기 때문이다.
출처: https://tenlie10.tistory.com/188 [게임 엔진/클라이언트 개발자:티스토리]

## 프리컴퓨티드 라이팅

## 흑백 효과

흑백효과 세피아 효과 주기
흑백
rgb = dot(rgb, float3(0.3, 0.59, 0.11));

세피아
r = dot(rgb, float3(0.393f, 0.769f, 0.189f));
g = dot(rgb, float3(0.349f, 0.686f, 0.168f));
b = dot(rgb, float3(0.272f, 0.534f, 0.131f));


## FSceneRenderer::ViewExtensionPreRender_RenderThread
FSceneRenderer에서 RenderThread라는데.

FRHICommandListImmediate& RHICmdList파라메터에서
FRDGBuilder GraphBuilder(RHICmdList)를 생성

ViewArray에서 PreRenderViewFamily_RenderThread호출 후에

GraphBuilder.Execute를 실행합니다.

그 다음 FDeferredUpdateResource::UpdateResource(RHICmdList)에서 업데이트 한다.

## RDG를 어떻게 작동시키는 것인지 모르겠다.

## RenderingThread를 등록한다.

## 이거 읽고 따라해볼까?
https://forums.unrealengine.com/t/how-can-i-pass-multiple-render-targets-to-a-compute-shader/139770/2

## 공식문서 이해안가면 영어로 보자.
번역이 너무 이상해서 이해 안갈만 했다.!

## Add Graph추가하기 전에 Compute Shader부터 추가해보자.

## 인공지능
제 3자 입장에서, 변수 및 작업을 해야지, 모든지 상대적인 관점에서 작업하면, 많이 힘들어 진다.
Wait가 없으면, 인공지능이 미친듯이 돌아갑니다. 보통 Select 뒤에 1초정도 wait를 두는 편입니다.

AI perception. AI 만들 때, 굉장히 강력한 기능입니다.
AI perception은 컨트롤러에 추가해야 합니다.
시아에 관련 된 것 처리할 때, 매우매우 강력한 기능입니다.
