---
layout: post
title: Fragment
---

? 로딩 스크린 만드는 방법.
https://www.youtube.com/watch?v=6CkR6KG2znM
MainMenu만들고 시간을 들여서 이것을 공부하도록 하자.

? 이걸로 함수에 대한 이해를 높일 수 있지 않을까요?
https://scahp.tistory.com/81
근데 이 내용은 아무리 봐도 DX12 튜토리얼 에서도 볼 수 있을 꺼라 생각하는데, 판단은 읽어보고 하도록 합시다.
어쨋든 이사람 블로그 정말 좋구만,
IT개발노트, 언제한번 천천히 다 흡수해야지.

? 이걸로 Raymarching Algorithm을 공부할 수 있을 것 같아요.
https://vateran.tistory.com/52

? 에미리트 보간법도 공부하고 싶어요.
잘못 찾은거 같은데...? https://conerstone.tistory.com/5

? 커스텀 언리얼 엔진 노드를 쉽게 만드는 방법.
커스텀 노드랑 커스텀 표현식은 다른 내용 같다. 여기서는 블루프린트 커스텀 노드를 쉽게 만드는 방법을 설명하는 것 같다.
https://rhyce.dev/2021/09/17/how-to-make-custom-unreal-engine-nodes-easily/?utm_source=rss&utm_medium=rss&utm_campaign=how-to-make-custom-unreal-engine-nodes-easily

? UI만들때 라이브 코딩하면 실패하는 구만. 변수가 자동으로 2로 이름이 변경되면서.

? 나나이트와 루멘

? 써봤을 떄 유용하다면 조금 더 공부할 필요가 있는 것이다?

? VAssistX와 PVSStudio

? 카오스 솔버

? 플루이드

? 복셀로 자연스럽게 연결하고

? UV설정해준후

? 머티리얼의 색을 맞추면 완성

? Lamp 만드는 방법들

? 머테리얼 도메인은 무엇인가?

[언리얼 엔진 모델링 모드](https://www.unrealengine.com/ko/tech-blog/unreal-engine-5-s-modeling-mode-takes-shape)

어떻게 사용해야 보다 효율적으로 사용할 수 있을까?
일단 무지하게 좋다는 사실은 알았다.

? 보다 사실적이고 좋은 그래픽을 위한 방법

? MS shader 별 내용없는 것 같지만, 그렇다고 하자.


이해하기 어렵네. 
만약에 쉐이더 컴파일할때 오류를 출력하는 거면,
내가 멍청해서 못한거니 앞으로 행동을 수정할 필요 있음.
멍청해서인지 아닌지 아직은 모르겠지만, 일단은 안보임.
픽셀 쉐이더의 시맨틱이 SV_POSITION 하나만 사용할 때는 생략가능함.
하지만 하나 이상이 되면 명시해줘야함.
명시하지 않으면 Fatal error를 발생시킴.


UAV, SRV 여전히 어려워요.

추가적으로 알게된 사실이지만, 언리얼 엔진 설치중에 해당 엔진을 이용하는 비쥬얼 스튜디오를 키면 응답오류를 발생합니다.
엔진 커스터마이징 해보고 싶었지만 200GB 넘어가는 것, 컴파일 하는데 하루걸리는 것 보고 지금은 아닌 것 같습니다. 엔진 커스터마이징 하는 방법 기록을 남겨두고 정리합시다.

? 망할 모르는 것을 어떻게 모르는지 아는가?

어리석고 겁이 없어라. 이제 겁을 좀 가지고 살자.

게임을 만들기 위해서는 국영수가 필수인가.

이 사고방식들에 대한 이론 또는 근거가 필요하다.
- 중요하지 않은 것은 상관 없지만, 중요한 것들은 효율성, 또는 정확성을 위해서 이론 또는 근거를 필요로 한다. 혼자 백날 생각하는 것 보다 논문 한편 읽는게 효율적이다. 

그림으로 이해한다. 이것은 기억하기 위한 필수 조건이다. 기억을 해야 응용하기 쉽다.
- 글로 기억한 것은 머리에 남지 안지만, 그림으로 기억한다면 이는 상당히 머리속에 오래 남는다. (지극히 당연한 이야기이다)
- 그림으로 그리기 어렵다면, 동사로라도 외우도록 하자.

분해하고 쪼갠다. 이것은 사용하기 위한 접근방식이다.
- 가장 단순한 selection sort를 생가하면 기준이 되는 피벗과 셀렉션을 분할 할 수 있다.
- 분해하고 쪼개기 위해서는 증명을 필요로 한다.

깊게 이해한다. 이것은 응용하기 위한 접근방식이다.
- 예를 들어 헤미스피어가 (사실 헤미스피어는 아니지만) 평면위의 한 점에 대한 레이의 축척이라는 점을 이용해서 빛의 반사 성질을 설명할 수 있다.
- 프레넬공식은 잘 모르지만, 들어오는 빛과 노말법선의 세타값이 커질 때 빛의 반사가 커진다. 이는 림라이트를 고려할 수 있다. 림라이트를 생각하면 NPBR과 PBR을 생각할 수 있는데, NPBR에서 흥미로운 것을 생각할 수 있다.

왜 펄어비스에서 못했을 까? 지금 생각해보면 할만 했었는데.
코드분석을 할줄 몰랐다.
- **사실 지금도 할줄 모른다. 하지만 코딩 규약을 따른 코드가 정말 읽기 쉽다는 사실은 알았다.**
- 읽기 쉬운 코드를 작성하는 것이 정말 중요하구나. KISS원칙이라고 하나. 추가적으로 간단하기 위해서는 정말 많이 알아야 한다. 다만 반복을 줄이기 위해서 사용한 코드가 어디에 있는지 아는게 조금 어렵다. 규칙이 있을 것 같은데 아직은 잘 모르겠다.
이상행동을 좀 많이 했다.
- 말할 때 생각하고 말하기.
    - 질문을 할 때는 상대방이 무슨 질문을
못하는 것을 할려했다.
- 개발자에게 처음해보는 그냥 처음 하는 사람과 다를게 없다.
- 개발자들은 자신의 커리어를 위해서 자신한테 필요한 것을 할려고 한다.
- 프로는 정체기를 얼마나 잘 견디냐 이다.
    - 나는 정체기를 안견딜려 했다.

게임 코드를 작성할 때는 IS a와 Has a관계, 상속에 대해서 생각해야 한다. 복잡하게 말하면 그렇고 게임 코드 작성 패턴은 오브젝트와 컴포넌트 패턴이다. 조립을 전제로 코드를 작성한다.

GlobalShader를 추가하기 위해 시도한 것들.
- 처음에 따라할려 했지만, 안됬다. 여기서 멘탄이 나갔다. 포럼, 사이트 등등 여러개를 찾았지만, 유용한 결론에 도달하지 못했다.
    - 버전을 생각하자. 버전이 다르니 코드도 많이 달랐다.
    - 이에 대해서 git변경이력을 보는 것이 도움이 될지도 모른다는 사실을 들었다.
        - 해당 파일에 대한 git변경이력을 보는법은 잘 모르겠다. 하지만 생각지도 못한 방법이다.
        - 추가적으로 GitHub 특정 메서드 찾기가 궁금하다. 그래야 해당 변경 이력을 쉽게 찾을 수 있지 않을까 생각한다.
    - 공식문서 씨이발, 버전이 바뀌었으면 업데이트 해줘야지잉. 안되는거 그대로 올려놨다.
        - 다르게 생각하면 현업에서 사용하는 사람한테는 별로 필요없다는 뜻이 되는 것인가?
- IT 개발 노트와 중국어로 된 사이트를 찾았다.
    - 댓글 보니 버전이 올라가면서 달라진 부분이 있었다.
        - 댓글도 꼼꼼하게 읽어야 된다는 사실을 알았다.
    - 버전이 다르니 달라진게 굉장히 많았다.
- 다른 분석 문서를 보았다.
    - 자동 한글번역 개판이다. 영어를 잘할 수 있으면 좋겠다.
- 가장 심플한 코드를 찾아 이해하였다. 사실 이게 제일 효율적인 것 같다. 다만 코드를 보고 이해하기 위해서는 해당 코드의 개념이 필요하다.
    - 개념은 공식문서, 분석문서를 한번 쭉 **정독**하는 것이 제일 효과적인 것 같다. 물론 전부 읽을라면 머리가 상당히 아프다.

쉐이더를 대하는 자세.
- 다필요 없고 쉐이더가 어떻게 작동하는지 쪼갤 수 있는 수식, 함수 단위로 쪼개서 이해하도록 하자. 그래야 자유롭게 응용 가능하다.

* final 어떻게 쓰는건지 모르겠네.

* 사소한 코드의 오류로 시간을 낭비하는 것을 막는 방법이 있을까?
    - 테스트 주도 개발, 다만 UI를 어떻게 테스트해야하는지는 모르겠음.

* 비쥬얼 스튜디오로 디버그를 활성화 해도 핫 리로드가 작동함.

* 함수 오버로딩은 하지말자, 하루동안 삽질했네...

* Widget을 생성할때 World가 아니면 Loop에 빠지는가?

* TSubclassOf<Class>에서 Class가 final일 경우?
상관없다고 한다.
* TSubclassOf<Class>에서 Class가 전방선언인 경우?
상관없다고 한다.

## Asset의 구조와 애셋의 래퍼런싱?


## 링크 모음

도저히 답이 없다 싶을때는 코드를 분석해야 한다.
|[시간이 오래걸릴 것 같다 싶을때는 programmer all로](https://www.programmerall.com/article/60142006637/)|

수까락, 기타 등등.

: [Unreal 4 렌더링 프로그래밍 주제 개요 및 목차](https://zhuanlan.zhihu.com/p/36675543)
, [건강한 남자??](https://blog.csdn.net/qq_16756235)
, [Realities.io](https://medium.com/realities-io/creating-a-custom-mesh-component-in-ue4-part-1-an-in-depth-explanation-of-vertex-factories-4a6fd9fd58f2)
, [IT개발 노트](https://scahp.tistory.com/10?category=848072)
, [Space Panda](https://spacepanda.tistory.com/4?category=704623)
, [보트내에 물 뺴기](https://forums.unrealengine.com/t/take-out-water-from-inside-of-the-boat-with-custom-stencil-logic-puzzle/365545/6)

[카메라 흔들기](https://microsoft.tistory.com/983?category=826831)

## UE5 Blueprint Widget

이야,,, 희한한거 많이 추가되었네???
세상 좋아졌구만,

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

