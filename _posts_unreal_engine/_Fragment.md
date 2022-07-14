---
layout: post
title: Fragment
---

## 2022 07 14
Cache pos하면, 포즈를 캐싱함.

애니메이션을 만들고 싶어도 맞는 애니메이션이 있는지 아는게 더 중요.

오늘할 것이 몽타주를 집어넣은 다음에, 애니메이션 블렌딩.

근데, 상하체 분리애니메이션만 하더라도, 기존의 로코모션에, 상하체를 결합할 수 밖에 없어서, 캐시포즈가 들어갈 수 밖에 없다.


1. 내 문서에다 왜 이렇게 작성했는지 정리하기,
2. 사이트 정리하기, <- 수학, 구현, 컴포넌트, 힛 이벤트 ...
3. 코드 리펙토링,
4. 포트폴리오에 정리

AController와 APawn에서 SetIgnoreLook 또는 SetIgnoreMove설정으로 움직이고 움직이지 않는 것을 설정할 수 있습니다.

* 동일한 액터에서의 컴포넌트는 작동하지 않는다.

* Component에서 Swap의 결과를 가져오기 위해서는 Target이 PrimityComponent여야 합니다.

오늘 한거 정리하고 싶은데, 어떻게 적어야 할까..?
코드에서 버그를 찾을려 하니 못찾는건가?.. 맞는거 같네.

글로 명확하게 적어서 해야하지만, 결과를 보면서도 만들어야 하기 때문에, 적절한 균형이 중요하다.

* 무지성 3배는 굉장히 효율적이네, 실제로 그정도 걸리네,, 사실 그것보다 더 걸리긴 하지만...

* ProjectWorldToScreen은 화면상에 들어오는지, 추가적으로 검사한다. 또한 ViewProject을 적용하기 때문에, 벡터를 구하는게 상당히 제한된다.

블루프린트 펑션 라이브러리는 특정 게임 오브젝트에 묶이지 않은 유틸리티 함수성을 제공해 주는 정적인 함수의 모음입니다. 모든 블루프린트 라이브러리는 UBlueprintFunctionLibrary를 상속합니다.

코드를 작성하기 전에, 전체 그림을 완성시키고 작성해야 합니다. 왜냐하면, 코드를 바꾸는 것 보다 글 또는 그림을 바꾸는게 더 편하기 때문입니다......

## 2022 07 13

자연스럽게 만드는 것이 가장 중요함

1. 회전에 직접 매칭하지 않는다. UseControllerRotate을 끄고?
2. 카메라하고 무브먼트를 건들어야 한다.??

알고 있는 3인칭 시점.
캐릭터는 가만히 있고, 카메라가 회전한다.

이는 캐릭터에 매칭되어 있었는데, 캐릭터에 매칭되어있는 것을 끄고, 카메라에 매칭시킨다. 하지만 실질적으로 가는 것은 맞다. 보는 방향대로 가는 것을 말한다. 움직임은 맞다.

캐릭터 무브먼트 스크롤 한참 내리면, 캐릭터 무브먼트 로테이션, 회전 세팅에 처박혀 있다. 여기서 오리엔트 로테이션 투 무브먼트는 가속되는 방향으로 캐릭터를 돌려주겠다 이말이다.

캐릭터의 회전속도가 따로 설정된다. 흠... 이걸 쓰는 이유가, 카메라 움직이면, FPS에서는 일정 범위는 AIM OFFSET으로 상체만 움직이고, 넘어가면, 크게 회전함.

AIMOFFSET이나 이런 것은, 먼저 큰 움직임을 전부 제어하고 만든다.

1. 움직임을 먼저 구현한다.
2. 큰 애니메이션을 맞춰넣는다.
3. 디테일한 시스템을 만든다.

Animation 스타트팩 보면, 예한테 이 애니메이션이 붙어있다는 것을 말한다.

애니메이션 기억이 안날 떄, 키워드 애님 에셋 리타깃

인간형 릭 선택하면, 된다. 언리얼에서 제공해준거니 엉뚱한 거 맵핑될일이 없다. 하지만, 다르면, 비슷한 위치에 있는 것을 맵핑해줘야 한다.

애니메이션을 기준으로 무언가를 하는건 스켈레톤을 기준으로 만들어야 한다.

언리얼은 호도법을 씁니다. 사람이 인지하기 쉽게, 라디안 값을 쓰지 않음.

애니메이션 만드는게 잘 기억이 안나면, 애니메이션 스타트 팩, 애니메이션 블루프린트 뜯어다가 보도록 한다.

컨트롤러 로테이션 기준으로 가져오면 이상할 테니, 캐릭터 기준으로 가져온다.

서드펄슨에서 발생하는 일을, 애니메이션 블루프린트에서 가져오기도 뭐함. 모험모드일때는 모험모드를 하고, 아닐때는 아니고, 누가 누구를 아는게 맞느냐 하는게 맞다아? 기본적으론 애니메이션이 캐릭터의 데이터를 갖다가 한다. 캐릭터가 애니메이션을 알아야 하느냐? 아니냐, 머리아파 질 수 있음.

애니메이션 블루프린트가, 캐릭터의 상태값을 체크해서, 매번 가져오는게 이상하기도 하고, 하여간 여러가지로 애매함. 인터페이스 때려밖으면 되나? 따라서 캐릭터 정보를 가져다가 직접 적용하는 식으로 만들것이다.

애니메이션에 맞물려 있는 경우도 있고 해서, 쉽지 않음.
Cast를 붙이는 순간, 여기에 밖에 못 붇힌다는 이야기가 됨.

언더바는 스페이스로 검색됨, 제대로 검색이 안될 수 있음. 따라서 -를 쓴다는데, &&로 때려박아도 되기는 함.

Resume란 영미권에서 구직활동을 할 때 사용하는 서류로, 우리나라의 이력서에 해당합니다. 레쥬메는 크게 두 가지 특성이 있습니다. 그중 하나는 간결함입니다. Resume는 학력, 성격, 주요 경력, 역량 등 나의 핵심 정보를 약 1 ~ 2페이지 내로 간결하게 소개한 서류입니다.

[기술문서](https://jidocument.tistory.com/entry/%EA%B8%B0%EC%88%A0%EB%AC%B8%EC%84%9CTechnical-Document%EC%97%90%EB%8A%94-%EC%96%B4%EB%96%A4-%EB%AC%B8%EC%84%9C%EB%93%A4%EC%9D%B4-%EC%9E%88%EC%9D%84%EA%B9%8CAPI%EA%B0%80%EC%9D%B4%EB%93%9C%EB%B6%80%ED%84%B0-Whitepaper%EA%B9%8C%EC%A7%80)

[100가지 팁](https://bbagwang.com/unreal-engine/%EC%96%B8%EB%A6%AC%EC%96%BC-%EB%B2%A0%ED%85%8C%EB%9E%91%EC%9D%98-100%EA%B0%80%EC%A7%80-%ED%8C%81%EA%B3%BC-%ED%8A%B8%EB%A6%AD-%EC%A0%95%EB%A6%AC/)

! MathHall 이 존재한다고 한다. 풀어서 찬찬히 뜯어보면 지식을 얻을 수 있다고 생각된다.

## 폴더 관리

폴더 어떻게 관리하라는 거냐,,

[협업시 관리해야할 언리얼 엔진 4 디렉토리에 대하여](https://somworks.tistory.com/21)

[폴더 구조](https://hanneoul.tistory.com/entry/12-%ED%8F%B4%EB%8D%94-%EA%B5%AC%EC%A1%B0)

규칙

Actor
특별한 이유를 제외하고 Actor의 RootComponent는 SceneComponent여야 합니다.
ActorSequenceComponent를 이용하는데 있어, RootComponent를 옮길 경우, WorldPosition이 업데이트 됩니다.

Component


Character

Material
해당 머티리얼에 맞는 PhysMaterial을 설정해야 합니다.
FirstPersonHorror의 IsFootHitComplex이 true인 경우 TraceFoot에서 Complex Collision을 검사합니다. 따라서 PhysicsMaterialOverride를 무시합니다.
FaceIndex가 다르고 그에 따라 반환되는 PhysMaterial까지 다른 것은 알겠으나, Override되지 않는 이유는 모르겠습니다.


## 카메라를 처리할 거면, 이걸로 하면 된다.

[카메라](https://docs.unrealengine.com/4.26/ko/InteractiveExperiences/Framework/Camera/)

[카메라 애님](https://docs.unrealengine.com/4.26/ko/InteractiveExperiences/Framework/Camera/Animations/)

[APlayerCameraController](https://docs.unrealengine.com/4.27/en-US/API/Runtime/Engine/Camera/APlayerCameraManager/)

포스트 프로세싱 설정을 위해서 굳이, 포스트 프로세스를 와핑할 필요는 없다.

* 선검색의 중요성

## 2022 07 12

애님 스테이트 가져다가 모든 애니메이션을 만들 수 없음.

보통 애니메이션을 작업할 때는 운동에 관해서 로코모션(운동)

애님 스테이트는 if문을 보기 좋게 펼쳐준 것 ?.

보통 로코모션을 애님 스테이트로 만듬. 왜? 보통 하나만 들어가야 하기 때문에.

배경에다 애니메이션을 사용하는 것은 ,,.

업데이트 에서 근거(변수)를 마련하고, 애님 그래프에서 애니메이션 재생

음. Begin함수는 처음 호출될 때 한번만 실행된다. 코드 보면,, 뭐.. 당연한 소리 아닌가?

작업할 때 플레이어나 몬스터 같은 경우, 모든 기능이 다들어 있는 것 하나를 만들고, 상속이나, 리소스 관리하는 식으로 만든다.

트렌시션 룰에는 기본적으로 분류하는 형태를 집어넣음.

애니메이션 트렌지션에서 남은 시간 비율로 구해야 한다. 매우 짧아서 0.01 이런식으로 나오기 때문에... 또한 앞에 있는 애니메이션이 다른 것으로 실행되도 상관없이 넘어가게.

0.1은 10%, 대부분 애니메이션 블랜딩 기준이 0.1초 정도로 잡아서 그런지는 몰라도 그렇게 한 것 같다.

게임 만들때 더러운게, 항상 상태를 만들어서, 내가 지금 공격을 할 수 있는 상태인가, 지정을 해줘야함. 상태없이 작업하면, 호출한 상태에서 덮어 씌우게 되닌까 이상하게 보임. 애님 몽타주가 어려운게 아니라 굉장히 더러운게,,, 따로 관리하는 작업이 어렵다.

3인칭이 만들기 가장 어려움.? 여러번 한말 인거 같은데..

##

기획을 세우고, 그 위에 올려서 배치하도록??

[게임 플레이어의 행동 패턴을 이용한 동적인 게임 환경의 설계](https://scienceon.kisti.re.kr/srch/selectPORSrchArticle.do?cn=JAKO200917639067039&dbt=NART)

사이언스

게임 인공지능은 플레이어에게 지능적이고 적응된 게임 환경을 제공하기 위해 주로 사용된다. 기존에는 사용자의 게임 행위를 수집/분석하여 동반자 또는 적대적 역활을 하는 Non-Plyaer character (NPC)를 위해 사용되었다. 그러나 사용자의 행동을 모방하는 것에서 그치는 경우가 많았다. 본 논문은 사용자의 게임 행위를 분석하여 게임 환경을 변화하는 방법을 소개한다. 사용자의 게임 성향을 파악하기 위해 게임 행위 데이터를 이용하였다. 또한, 사용자의 성향은 지형, 아이템, NPC의 분포를 결정하는데 반영하여 동적인 게임 환경을 제공하기 위해 사용하였다. 제안하는 방법의 실험을 위해 실제 2D 액션 게임에 적용하였고, 사용자의 게임 플레이 행위에 대하여 적절히 변화하는 게임 환경을 확인하였다.

[뇌의 공포 기억 발현과 행동 제어 메커니즘 규명](https://www.korea.kr/news/pressReleaseView.do?newsId=156077920)

정책 브리핑 보도 자료, 미래창조과학부

도파민 수용체와 장기 시냅스 저하에 의한 공포 기억 발현 메커니즘에 대한 이해와 외상 후 스트레스 장애 및 편도체 내 억제성 신경회로의 연관성을 밝힘으로써 향후 관련 질환에 대한 치료제 개발에 중요한 기여를 할 것으로 기대된다. 

## 폴리싱

게임 출시 전사업 PM이 사업성을 목적으로 게임 특징 및 유료화 모델 등의 게임 전반에 대한 컨설팅 및 수정을 통해 다듬는 일련의 작업을 의미합니다.


읽어볼만한 책 게임 매니악스 퍼즐 게임 알고리즘 

* 계층 구조
컴퓨터 시스템을 기능별, 목적별로 나누어 계층적인 연결을 갖게 하여 하나의 완성된 시스템이 되도록 만들어진 시스템 구조, 소프트웨어의 개발에 있어서도 기능 분할하여 조립하는 수법을 이렇게 말합니다.

[게임 디자인 레벨업 가이드](https://book.naver.com/bookdb/book_detail.nhn?bid=8788735) 읽어볼만한 책인듯?

[정신 치료를 위한 기능성 게임 분석](https://scienceon.kisti.re.kr/commons/util/originalView.do?cn=JAKO201113742752092&dbt=JAKO&koi=KISTI1.1003%2FJNL.JAKO201113742752092)

[플레이어의 현실과 게임내의 교류패턴](https://koreascience.kr/article/JAKO201215239618088.pdf)

[몰입기술을 활용한 영상그래픽 Processes구현에 대한 연구](https://j-kagedu.or.kr/upload/pdf/kagedu-10-4-371.pdf)

[아이템 슬랏 보기 좋은거 찾아서 만들도록 하자](https://www.google.com/search?q=Item+slot+png&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjyifiK-uj4AhWWAd4KHaLLC_kQ_AUoAXoECAIQAw&biw=958&bih=919&dpr=1#imgrc=6Ww7KwQkVOSDhM)

[C++로 다루는 언리얼](https://onionisdelicious.tistory.com/44)

[TDD Framework을 도입해야 하는 이유](http://includes.egloos.com/v/1420572)
[라이브 프로젝트에서 C++로 테스트 주도 개발하기](http://ndcreplay.nexon.com/NDC2013/sessions/NDC2013_0048.html)

[애플리케이션 배포 및 테스트 전략](https://cloud.google.com/architecture/application-deployment-and-testing-strategies?hl=ko)

앱에 대해서는 무슨 테스트가 많고 그러는데, 게임에 관해서는 못찾겠다.

[배포 자동화란](https://www.redhat.com/ko/topics/automation/what-is-deployment-automation)

[디자인 패턴을 대하는 자세](https://m.hanbit.co.kr/channel/category/category_view.html?cms_code=CMS2991837223)

널 오브젝트 패턴 (Null Object Pattern)
[인터페이스는 구현하지만 아무 일도 하지 않는 객체](https://johngrib.github.io/wiki/pattern/null-object/)


* Anti-Pattern(안티 패턴)은 실제 많이 사용되는 패턴이지만 비효율적이거나 비생산적인 패턴을 의미합니다.
[[클린아키텍처]서비스를 안티패턴이라고 하는 이유](https://eunjin3786.tistory.com/550?category=706837)

[UML 다이어그램의 정의와 종류](https://m.blog.naver.com/icbanq/221781238065)
[UML: 클래스 다이어그램과 소스코드 매핑](https://www.gamedev.net/forums/topic/678326-uml-for-ue4-robust-skill-system/)

[UE4 로버스트 스킬 시스템용 UML](https://www.gamedev.net/forums/topic/678326-uml-for-ue4-robust-skill-system/)
[UML 문서가 있습니까?](https://forums.unrealengine.com/t/any-uml-documentation/10687)
[모바일 크리티카 - 1. 개요, 게임구성과 시스템](https://hiprock.tistory.com/169)

direct
direct는 자신은 행동에 참여하지 않고 좀 떨어진 곳에서 지시할 때 쓴다. 교통량이 많은 도로에서는 경찰이 교통 정리를 한다(A police officer directs traffic). 이때 직접 운전하는 것이 아니라 운전자들에게 지시하여 차량의 흐름을 정리하는 것이므로 direct를 쓴다. 길을 안내할 때 목적지까지 같이 가지 않고 지도나 말로 가르쳐 줄 때도 동사 direct를 쓴다. 영화 감독이나 연출자는 자기가 연기하지 않고 카메라 뒤쪽이나 좀 떨어진 곳에서 배우들에게 지시를 하므로 그들을 director라 한다.


lead
lead는 선두에 서서 다른 사람들을 이끌 때 사용한다. 등산할 때는 길을 잘 아는 사람이 선두에 서서 그룹을 이끈다(He leads the group). 정치인의 경우도 마찬가지다. Politicians lead their political parties and lead the country.(정치인들은 자신들의 정당과 나라를 이끈다.) 마라톤에서 한 선수가 '리드해서 달리고 있다'고 할 때 He is leading the field.이다. 다른 선수보다 앞서 있다는 뜻. lead에는 한번도 가본 적 없는 길을 용감하게 앞장서서 다른 사람을 이끈다는 뜻이 포함되어 있다. leader란 곧 이런 힘과 용기를 갖춘 사람을 말한다.

guide
guide는 lead에 '설명하다'라는 행위가 덧붙여진 것으로, 선두에서 설명하며 안내한다는 뜻이다. 관광지에서 안내하는 사람을 볼 수 있다. 위험한 산을 오를 때는 그 지역 등산가의 안내를 받는다(Mountain climbers have a local mountain climber go with them to guide them). 가이드하는 사람·사물을 뜻하는 명사도 guide. 스스로 해볼 수 있도록 쓰인 책은 self-help guide인데 그 종류가 관광 가이드, 놀이 가이드, TV 가이드 등 여러 가지다.

conduct
conduct는 guide와 direct를 합친, 조금은 문어적인 단어다. conduct tours 하면 일정을 정하고 호텔을 알아보고 현지 안내 및 설명하는 일을 모두 아우른다. '오케스트라를 지휘하다' 할 때도 conduct an orchestra라고 한다. 여행의 동승원, 오케스트라 지휘자 등 conduct 하는 사람은 conductor.

escort
escort는 도움이나 경호가 필요한 사람과 동행한다는 뜻이다. 중요 인물을 '호위하는' 일도 escort. 예전에는 '여성은 힘이 약하므로 보호해야 한다'는 생각에서 남자가 여자와 동행할 때 흔히 사용했는데 요즘 기준으로 보면 낡은 사고 방식이다. 명사 escort는 보통 파티나 무도회 등에 함께 참석하는 파트너를 가리키지만 가이드처럼 길을 안내해 주는 사람을 가리킬 때도 있다.


[함수 및 UFUNCTION 주요 지정자](http://egloos.zum.com/sweeper/v/3205739)

[중첩 맵을 허용하지 않는다.](https://www.reddit.com/r/unrealengine/comments/kghmxq/quick_question_does_unreal_support_nested/)

[에피소드2의 유저 인벤토리 & 인터페이스](https://www.ubisoft.com/ko-kr/game/the-division/the-division-2/news-updates/VK670n17Zt3ArJetV12j3/2)

[error C2511 오버로드된 멤버 함수가 'Map'에 없습니다. error C2061: 구문 오류 : 식별자](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=killkimno&logNo=70137636691)
[Unreal Nested containers are not supported 오류 해결법](https://nellfamily.tistory.com/29)

[C++ - 왜 `const type& variable`을 함수 입력으로 사용합니까?](https://stackoverflow.com/questions/36369947/c-why-const-type-variable-as-function-input)

[바쁠수록 돌아가기 : 테스트 주도 개발로 더 좋은 게임 만들기](http://egloos.zum.com/parkpd/v/1589986)

테스트 코드가 필요하기 시작하다...

* [UPROPERTY를 사용하지 않을 때](https://forums.unrealengine.com/t/exposing-ustruct-when-in-a-pointer-type/124750/4)
    - 나는 당신이 할 수 있다고 생각하지 않습니다. UPROPERTY 매크로가 없으면 Unreal Engine Build Tool은 컴포넌트를 반사 시스템에 추가하지 않으므로 편집기에 노출되지 않습니다.
    - 반대로 가비지 등의 작업이 필요 없을 경우, 사용할 수 있다.

* UStruct에 대한 포인터 유형은 허용되지 않습니다.
    - 이는 가비지 컬렉션 시스템과 밀접하게 통합되어 있기 때문입니다. ??
    (https://forums.unrealengine.com/t/exposing-ustruct-when-in-a-pointer-type/124750/4)


[인터페이스(Interface)?? API?? 이것만 기억하면 된다]
(https://engkimbs.tistory.com/626)

## 전략 패턴

Fabrik이나 FullBody들은 무슨개념으로 구현되어 있는건가?

전략 패턴으로 구현되어 있는 것은 무엇인가... 있을 거 같기는 한데. 흠.
디자인 패턴이 필요하기는 한데, 이는 코드상에서 필요한 것을 명확하게 표시하기 위한 수단일 뿐인가.
[전략패턴](https://ko.wikipedia.org/wiki/%EC%A0%84%EB%9E%B5_%ED%8C%A8%ED%84%B4)

알고리즘으로 적었는데, 음.... 기능을 빼는 것으로 이해하자.

**그리고 어디가서 앞에서 아직까지 디자인 패턴이 뭐고, 이야기 하면 안된다.**

## 

테스트 또는 코드 작성방법은 Wiki에서 찾고,
이론은 공식문서?
Hm.... 이론등 다른 내용을 공부해야 할 때는 언리얼 러닝들어가서 공부하도록 하자.

▪hold = to have something in your HANDS
▪carry = to take something and MOVE it to a new location
▪lift = to move something UPWARDS, usually from off the ground
hold 의 반대말에는 release 가있습니다 감사합니다 좋은하루되세요

## C++로 크래스 변수 설정

DeferredSpawn을 이용하여 설정하는 방법.

```
AMyActor* pActor = GetWorld()->SpawnActorDeferred<AMyActor>(MyActorTemplate, GetActorLocation(), SpawnRotation);
		if (pActor )
		{
                    pActor->//...setstuff here..then finish spawn..
			UGameplayStatics::FinishSpawningActor(pActor , FTransform(SpawnRotation, GetActorLocation()));
		}
```

SpawnActorDeferred를 사용하여 변수를 초기화한 후 FinishSpawningActor로 개체를 생성합니다. 비록 내가 말할 수 있는 한 생성 호출 내에서 매개변수를 전달할 방법이 없습니다.

흠... 해봐야 알려나?

[Spawn Actor with "Expose on Spawn" properties in C++](https://forums.unrealengine.com/t/spawn-actor-with-expose-on-spawn-properties-in-c/330104)

["스폰 시 노출"과 동일한 C++](https://forums.unrealengine.com/t/c-equivalent-to-expose-on-spawn/341183/4)

## 이사람 블로그도 굉장히 좋네.
https://merry-nightmare.tistory.com/21

https://algorfati.tistory.com/6 이것도 볼수 있다.

## 

언리얼 메모리 누수 감지하는 법....

왜 설정이 안되는 거냐,,,
음. 선택지.
1. GetPackage 설정하는 법 찾기.
2. 플레이커 컨트롤러에 배치하기
3. 부모 호출하기. 최후의 수단 까지는 아닌가? 선택함. 쓸데없이 복잡하게 풀지 말고, 간단하게 풀자.

Widget에 기능을 구현하는 것이 좋은가? 아니면 PlayerController에 기능을 구현하는 것이 좋은가?
* Widget은 PlayerController에게 명령을 내리는 존재로 봐야하나???

**Inventory인터페이스에 대해 PlayerController가 InventoryIteraction하는 것에 대해 조금더 생각하고, 만들도록 하자. 일단 내용을 정리하는 것 먼저 하자.**
- 어떤 메서드를 필요로 하는가/
휴식겸 정리하자.

Widget의 의미는 사용자가 기능을 수행하거나 서비스에 액세스할 수 있도록 하는 응용 프로그램 또는 인터페이스의 구성 요소입니다. 실제 상호작용은 Widget에 있어야 한다.

! Inventory, ItemList, ItemSlot, ItemWidget은 공통적으로 Inventory 인터페이스를 알고, 부모는 자식 위젯을 알지만, 자식 위젯은 부모 위젯을 모르게 만들었습니다.
! 그냥 위젯은 하나로 퉁쳐서 만들도록 하자.

Widget에 크기 및 정보를 가지고 생성시 초기화 하는 것이 잘못되었다고 생각하지 않는다. 위젯이 천개도 되지 않아 메모리를 별로 차지하지도 않고 UMG에서 작업할 때 조정가능하기 때문이다.

**씨밤. 까먹지 말자. BlueprintImplementableEvent는 블루프린트에서 구현 하는 것이고 Native가 C++또는 블루프린트이다. 하...**

TScriptInterface는 EditAnywhere로 해도 변수로 설정되지 않는다. 대신 UObject의 Meta = (AllowedClasses = "")로 설정할 수 있다.

```

```

코드 작성할 때 const인거는 좀 확실하게 const라고 표시하자. 어떻게 매번 까먹냐.

인터페이스를 사용하고 싶은데, 안된다. 결국, 어느정도 구현된 상태로 만들어야한다..

오늘 목표
PlayerCharacter에 Hand추가.

화면 효과 추가

* 옵션
    - 게임 키 설정
    - 게임 화면 및 효과 설정
* 아이템 리스트
    - 아이템 3D view
    - 아이템 리스트
        - HorrorEngine의 ItemList는 세상에 아이템 선택하기 심각하게 귀찮다.
        - 필터는 어떻게 추가하나?
        - 목표로 삼을 것, 문을 열 때 긴장감 있게 아이템을 사용하는 것을 목표로 한다.
* 메인 메뉴
    - 컨티뉴
    * 새로운 게임 시작
    * 옵션
    - 종료 버튼
* HUD
    - 상호작용이 가능한지 보여주는 위젯하고
    - 체력 및 상태바
    - 알림 창
* 아이템사용
    * 아이템 리스트
* 인벤토리
    - 필터
    * 아이템 리스트
* 게임 메뉴
    * 옵션
    - 게임 종료

[인터페이스](https://engkimbs.tistory.com/626)란 상호작용하는 곳으로 간단히 말할 수 있음.

월드에 존재하는 아이템과 상호작용하기 위한 인터페이스.

[Smoothly push player while not moving?](https://forums.unrealengine.com/t/smoothly-push-player-while-not-moving/150842)

[Collision not working when standing still?](https://forums.unrealengine.com/t/collision-not-working-when-standing-still/284364)

[How do I use the SaveGame flag?](https://forums.unrealengine.com/t/how-do-i-use-the-savegame-flag/283064)

[언리얼 게임저장/로드](https://dev-dudfufl.tistory.com/191)

[Saving and loading your game](https://docs.unrealengine.com/4.27/en-US/InteractiveExperiences/SaveGame/)

[GTW Mailbag: 3막 구조 외에 어떤 종류의 플롯 유형이 있습니까?](https://goteenwriters.com/2019/05/01/gtw-mailbag-what-kinds-of-plot-types-exist-besides-the-three-act-structure/)

[3막 구조: 강력한 스토리 구조를 위한 3단계](https://blog.reedsy.com/guide/story-structure/three-act-structure/)

[간단한 패턴 모음](https://jhtop0419.tistory.com/) Greek사이트 가는게 더 이득일듯.

[C++에서 블루프린트의 확장](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=destiny9720&logNo=220940926812)

[게임 그래픽 만들기](https://edu.kocca.kr/edu/onlineEdu/openLecture/view.do?pSeq=99&menuNo=500085&pageIndex=1)


이벤트는 플레이어 컨트롤러의 인풋에서 전파됨.
위젯의 구조가 조끔 애매하구만, 형태만 잡아놓자.

이벤트의 추가는 Dispatch로 이루어진다.

UI까지 추가하고 이제 만들면서 추가면 되나?

## 추가할 효과들

처항하지 못하고 주로 도망가는 것이 목표.??

PlayerCharacter의 긴장상태에 따라 동일한 모션이라도, 애니메이션이 블랜드 될 수 있음.

클레쉐, 이상한 현상 및 대놓고 위험한 현상으로, 집중시키고, 깝놀시킴.

## 컨트롤 릭과 애니메이션 조합
[Motion warping and full ik](https://www.youtube.com/watch?v=SM_AR-oZ-1k)

## 지형지물에 의한 자연스러운 밀림
생각보다 내용이 많네??
https://forums.unrealengine.com/t/smoothly-push-player-while-not-moving/150842/21


## 종료 버튼
```
void UWidget_MainMenu::QuitGame()
{
	UKismetSystemLibrary::QuitGame(this, GetOwningPlayer(), EQuitPreference::Quit, true);
}
```

## 
Leak Detected!  TRASH_TextAudio_0 (TextBlock) still has living Slate widgets, it or the parent widget is keeping them in memory.  Make sure all Slate resources (TSharedPtr<SWidget>'s) are being released in the  UWidget's ReleaseSlateResources().  Also check the USlot's ReleaseSlateResources().

https://forums.unrealengine.com/t/textblock-inside-retainerbox-causes-leak-detected-message-when-containing-uuserwidget-is-moved-in-the-umg-designer/482997
어떻게 해결하는지 모르겠구만.
뭘 잘못했을까?
삭제하고 다시 만드니 되네>???

## Enum을 어떻게 쓸 것인가?
int에 따른 스위치를 쓸것인가?

에넘에서 자동으로 설정되는 것보다는 (버그 나기 쉬우므로) 차라리 선택을 안했으면, 선택을 안했다고 알려주는 것이 좋다.

ENUM에서 선택에 따른 입력을 조절할 수 있는 장치를 제공했으니, Enum을 통해서 입력을 반환하도록 하는 코드를 작성하라라는 뜻.

나중에 이런 기능을 계속해서 만들면, 원하는 기능을 원하는 작동을 통합하여, 감싸서 맞추는게 나중에 프로그래밍 하는게 더 도움이 된다.

**집중이라고 하는게, 논리적인 로직을 많이 따지는 사람일 수록 프로그래밍을 더 못짠다. 발에다가 초점을 맞춘다. 하면은 나중에 게임에 구현해야 할 것이 너무 많기 때문에, 못한다. 차라리 쪼개거나, 합치거나 할 수 있어야 한다.**

나중에 블루프린트로 만든 것을 보면 if나 이런 조건에 따라 코드가 굉장히 더러워진다. 코드로 보면 몇줄 안되는데... 블루프린트로 하면 그렇다.. 알아보기 힘들다.

무료의 평생 무료 컨텐츠 2번째 탭으로 가면, 발에 대한 FootStep이 있따. 이런 땅에는 이런 이팩트가 어울리지 않는가 하는 모음집이다. 다만 무식한게, 본네임 가지고 위치에다 붙여서 호출한다.

애니메이션을 언제든지 교체할 수 있음. 애니메이션 같은 경우, 매 프레임마다 업데이트 함?. 코드를 집어넣으면 생각보다 코드가 과부화 된다.

루트 연산이 굉장히 과부화가 걸림.

속도에 따라 애니메이션 블랜드할 수 있음. 달리기 속도 및 힘에 의해서 (활쏘는) 에서도 사용할 수 있음. 기능이 어려운게 아니라, 리소스가 없어서 못만드는게 대부분이다...

왼쪽 싀프트 키를 누리고, 애니메이션 블랜드를 볼 수 있다. 이는 잘못 눌러서 바뀌는 경우를 막을 수 있다.

보간 속도를 지정할 수 있다. 이 속도를 잘 지정해야 자연스럽게 보간된다.

## 잘하기 위해서는 해야할게 숨막히게 많네
https://www.intel.co.kr/content/www/kr/ko/gaming/resources/game-design-principles-in-games.html

https://www.korea.kr/news/policyNewsView.do?newsId=148820595

## 소프트웨어 로컬라이즈
https://www.lionbridge.com/ko/blog/translation-localization/how-to-localize-software-10-dos-and-donts-for-a-watertight-software-localization-process/ 

## 펄린 노이즈 이해하기
https://ko.khanacademy.org/computing/computer-programming/programming-natural-simulations/programming-noise/a/perlin-noise 

## 오늘 할 것도 마찬가지로 애니메이션인데 블렌딩
애니메이션하고 이벤트하고 역활이 분담되어 있는데 이게 섞이게 되면 골치아픔. 예로 발에 이펙트 들어간거, 

물 효과도, 흙이 튀는 것도 전부다 콜리전 싸움이다.

예가 여기 들어가서, 발에 이펙트가 있지만, 이벤트 발생타이밍은 노티파이고, 그러면 이 이펙트를 누가가지고 있어야 하냐? 이펙트는 콜리전에 있고, 충돌은 캐릭터에 있고,

1. Bone에 Socket을 붙이고,

실수하기 싫으면, 각각 소켓의 이름을 노티파이 이름으로 만들도록 하자.

노티파이 만들기 정석은 노티파이 관리에 있는 걸 추가해 줘야함. 노티파이를 삭제해도, 노티파이 관리에 남아있음. 정리할려먼 관리탭을 봐야함.

뭐,, notify가 10개다 그럼 이벤트가 10개가 있어야 한다.

터트리는 작업을 하고 싶은데, 안타깝게도 이벤트 디스페쳐가 안됨. 이벤트 디스페쳐는 온전한 기능이 들어있어야함.

본을 넘겨주면, 캐릭터가 지나갈 때만 이펙트가 나올것임.

블루프린트 형변환이 과부화가 엄청 걸림. 변수로 빽업을 하는 방식도 있음.

함수를 만들 때 return이 제일 어려움.

래퍼런스는 존재하는 것을 가르킴. 존재하지 않는 것은 설계도가 있어야함. 그 이유가, 언리얼에 존재하는 그래픽 데이터는 래퍼런스임. 왜? 속도때문에 그럼.

**SceneRoot가 없으면, 선을 아주아주 잘클릭해야 합니다. 어지간하면 SceneRoot를 사용하도록 합시다.**

케스케이드 파티클은 레거시고 사라지고 있다.

중요. 비긴오버랩이 있으면, 반드시 엔드 오버랩을 보장해준다. 매우 중요.

컨테이너 쓸때 항상 특성을 알아둬야함. 몇개 안되면, Array가 유리하기는 함.

이벤트 그래프를 하다보면 무지하게 많아질 것임. 정리를 해야하는데 이벤트 그래프를 늘리거나, 아니면 함수로 바꿔야함.

## 
Audio Volume을 사용하고 싶으면, ATT와 Reverb Effect를 설정해 줘야함.

https://forums.unrealengine.com/t/tarray-with-instanced-uproperty-flag-problem/301294
집가서 이론공부나 해야지

https://wayhome25.github.io/git/2017/07/08/git-first-pull-request-story/
이제는 이해할 수 있네. 집가서 정리하자.

https://velog.io/@ssmin0606/%EA%B0%9C%EB%B0%9C%ED%88%B4-Please-enter-a-commit-message-to-explain-why-this-merge-is-necessary-especially-if-it-merges-an-updated-upstream-into-a-topic-branch-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0-git-bash
메세지 보내기.

시퀀스에서 블루프린트 어떻게 받냐!!

## 커브 생성해서 추가하기
	#include "Curves/CurveFloat.h"


UFUNCTION은 Struct에 대한 전방선언을 허용하지 않는것 같은데 확인 필요하다.

https://handhp1.tistory.com/11


https://docs.unrealengine.com/4.27/en-US/API/Runtime/Engine/Engine/UCollisionProfile/ConvertToTraceType/

#include "Engine/CollisionProfile.h"
ETraceTypeQuery ConvertToTraceType(ECollisionChannel CollisionChannel) const

이벤트가 실행되고 나중에 접속했을 때 이벤트 진행되지 않는 상태가 있음.


## CallHorrorEvent호출 후 Server -> Delegate하면
캐릭터의 포지션과 이벤트가 다를 경우 캐릭터 무브먼트 컴포넌트에 의해 캐릭터의 포지션이 추론되면서 이동하게 될 것이다.

## Git branch후 MainBranch에서 cherrypick 테스트.

HorrorEvent가 N개의 클래스와 N개의 클래스를 연결하므로 델리게이트로 연결

```
remote저장소와 연결해놓은 상태에서 진행하던 작업을 엎어버리고 다시 리모트 저장소의 내용을 덮어쓰고 싶을 때 
git fetch -all
git reset --hard origin/master
```

infrasound 의식하면 닭살 돋는 효과는 있는거 같네... 그러나 바로 까먹고 기억안남.


## Get game state inside Editor Widget in Unreal Engine 4
에디터 위젯이 있고 그 안에 버튼 클릭 이벤트에 대한 청사진을 만들었습니다.

불행히도 "Get game state" 노드(또는 이와 유사한 노드)를 사용할 때 항상 null을 반환합니다.

에디터에서 플레이를 누르지 않는 동안(게임 상태 인스턴스가 없음) 그것이 맞다는 것을 이해합니다. 하지만 재생을 누르면 Editor Widget의 버튼을 클릭해도 모두 동일합니다. null을 반환합니다. 동시에 게임 창 안의 일반 위젯은 게임 상태 참조를 반환합니다.

그래서, 게임이 플레이 중이라고 가정하고(저는 플레이 버튼을 눌렀습니다), 에디터 위젯 내에서 게임 상태에 접근하는 방법(일반 위젯에서 가능한 것처럼)은 무엇입니까?

ps 저는 간단한 싱글 플레이어 케이스를 작업 중입니다.

## Answer
유효한 World Context Object가 있어야 합니다.
Get Game State 노드가 Editor Utility Widget 내 에서 사용되면 World Context Object 핀이 노출됩니다.

위젯 블루프린트에서 게임 상태 노드 가져오기

Actor Blueprints에서 World Context Object 는 여전히 존재하지만, 핀이 자동으로 결정될 수 있기 때문에 에디터는 핀을 숨깁니다.

Actor Blueprint에서 Game State 노드 가져오기

World Context ObjectUObject 는 객체 로 돌아갈 수 있는 모든 것 입니다 UWorld. 액터 블루프린트의 경우 블루프린트 에디터는 해당 액터 를 에 전달하여 해당 액터를 World Context ObjectGetWorldFromContextObject 로 사용할 수 있습니다 .

반면에 에디터 위젯 블루프린트에는 World Context Object 로 사용할 수 있는 객체에 연결된 객체가 없으므로 어떻게든 제공해야 합니다.

블루프린트에서 선택된 액터 사용하기
다음은 선택한 액터를 World Context Object 로 사용하여 게임 상태를 가져오는 방법의 예입니다 . 이 예제를 사용하려면 버튼 하나로 에디터 유틸리티 블루프린트를 만들고 아래 블루프린트 그래프를 버튼 클릭 핸들러로 사용하세요. 그런 다음 위젯을 실행하고 Editor에서 Play를 시작한 다음 플레이어를 삭제하고(F8) 장면에서 액터를 선택하고 버튼을 클릭합니다. 기록된 현재 시간이 표시되어야 합니다.

에디터 유틸리티 위젯 블루프린트에서 게임 상태 가져오기 사용하기

C++ 사용
또는 엔진의 세계를 직접 순환하고 가장 적절한 것을 Blueprints에 반환하는 Blueprint 호출 가능 C++ 함수를 만들 수 있습니다.

.h 파일
UCLASS()
class MYPROJECT_API AMyProjectGameModeBase : public AGameModeBase
{
    GENERATED_BODY()

public:

    UFUNCTION(BlueprintCallable)
    static UWorld* MyGetWorld();

};

.cpp 파일
#include "Engine/Engine.h"

UWorld* AMyProjectGameModeBase::MyGetWorld()
{
    // Prefer PIE Worlds.
    // Fallback to Game Preview Worlds.
    // Ignore all other types (e.g., other preview worlds).

    UWorld* PIE = nullptr;
    UWorld* GamePreview = nullptr;

    for (FWorldContext const& Context : GEngine->GetWorldContexts())
    {
        switch (Context.WorldType)
        {
        case EWorldType::PIE:
            PIE = Context.World();
            break;
        case EWorldType::GamePreview:
            GamePreview = Context.World();
            break;
        }
    }

    if (PIE)
    {
        return PIE;
    }
    else if (GamePreview)
    {
        return GamePreview;
    }

    return nullptr;
}

이 예에서는 함수를 게임 모드에 넣었습니다. 게임 모드는 조직적으로 배치할 위치가 아닐 수 있지만 기본에서 새 C++ 프로젝트를 만들 때 게임 모드 C++ 파일이 자동으로 생성되기 때문에 데모용일 뿐입니다. 주형.

또한 당신이하려고하는 것이 일종의 스케치라는 점에 유의하십시오. 에디터 유틸리티는 에디터 컨텍스트에서 실행하기 위한 것으로, 많은 월드의 로드를 견뎌낼 수 있습니다. 장면과 상호 작용하는 버튼을 누를 수 있도록 하려면 대신 다음 중 하나를 수행하는 것이 좋습니다.

UMG 또는 Slate를 사용하여 게임 자체에 디버그 버튼 배치
게임 자체에서 콘솔 명령 생성(C++이 필요할 수 있음, 청사진에서 시도한 적이 없음)
특정 유형의 액터와만 작동하려는 경우 해당 액터에 대한 사용자 정의 세부 정보 패널을 만드십시오(C++ 필요).
공유하다
따르다


## 클래스 변수로 받기
 클래스 레퍼런스를 인자로 받는 함수는 위의 사진과 같이 클래스를 지정하여 사용할 수 있습니다.

void AddWeaponToInventory(class APCEWeaponBase* Weapon);
 평소에 포인터로 인자를 받는 오브젝트 레퍼런스를 사용하는 함수의 경우 위와 같이 작성하지만 클래스 레퍼런스의 경우 다음과 같이 작성합니다.

void AddWeaponToInventory(TSubclassOf<class APCEWeaponBase> Weapon);
 그리고 클래스 레퍼런스를 받은 경우 이 클래스 안의 변수나 함수를 사용할때는 .GetDefaultObject() 함수를 사용해야 클래스 안의 변수나 함수를 사용할 수 있습니다.

Weapon.GetDefaultObject()->OnAttackTrace();

* FBX 데이터가 정상적이지 않은 게 맞구요. 그나마 덜 작업하시려면 데이터 스미스 사용하시면 됩니다. 현업에서는 네이밍 포뮬러를 통해서 머터리얼 자동 생성툴을 만들고 있습니다. 지원되는 파이썬 API 사용해서 만들 수 있습니다. 마야와 언리얼 간 파이썬 언어 사용해서 데이터 트랜스퍼를 만드는게 요즘 VFX 업체가 진행하는 주요 업무입니다

* ControlRig만들때 속터지니 단순하게 하는 것도 좋다. 굳이 Items를 만들어서 할 필요는 없다.

## MetaHuman ControlRig

## 기본
* 색의 배치 Pelvis는 주황색으로, 머리는 노란색, 왼쫀은 빨간색, 오른쪽은 파란색으로 표시함.
* 이름규칙은 BoneName_L/R_IK/FK/-_ctrl로 되어있음.
* global_ctrl과 root_ctrl, body_offset_ctrl이 되어있음. root_ctrl은 루트 본의 트렌스폼을, body_offset_ctrl은 바디 본의 트렌스폼을 설정함.
* Ctrl타입으로 변수를 설정하기도 함.
* ProjectToNewParent는 별로 복잡한건 아니고 상대 좌표 구해옴.
* 반복되는 것은 Item 배열을 만들어서 루프돌릴 수 있음.

## BackwardSolve
* 특별한 본들을 제외하고 기본적으로 Backward는 Bone의 트렌스폼을 바탕으로 Ctrl의 트렌스폼을 결정함.

## SetupSolve

## ForwardSolve
* 무릎의 Pin은 Calf를 나타냄. 핀의 선은 DrawLine노드를 이용함.
* Leg는 BasicIK노드를 이용함.

## 

엔진 기능이 많고 엄청나게 복잡함 -> 뭔가 할려고 하는데 기능적으로 문제가 꼬임. 파악이 안됨. 그럴때는 어떻게 해야 하는가.

## 본 소켓에 붙였다 때기 쉽게 하기
소켓에 여러개의 어테치된 액터 또는 컴포넌트 쉽게 관리하는 방법은 SceneComponent를 붙인 후 관리하는 것 입니다.

**아이템을 주워서 어테치하는 것은, 액터 2개 만들어서, 관리해라.** 아이템과 총을 분리해라.

# Character movement

[UE4 캐릭터 이동 시스템 가이드](https://lifeisforu.tistory.com/304)

## 07 1

총싸움은 만들기 쉽다? 모든 총은 누르자 마자 나간다. 누르자 마자 나간다는건 누르는 타이밍에 나간다. 화살 같은 경우에는 누르는 타이밍이 아니라 활 시위를 당기는(특정 애니메이션)이 있고, 그다음 나간다. 선행하는 애니메이션이 있다는 의미이다.

이 말은 애니메이션의 선행 동작이 있을때 마우스를 누르고 때는 점을 생각해볼 수 있다.

몬헌 대검을 생각하면 버그라고 생각할 수 있다.
**게임이란걸 작업할 때 보장받는 다는 것이 굉장히 중요하다. 버그를 내지 않기 위해서.**
객체가 죽으면 포인터는 어떻게 할 것인가?

게임같은걸 만들면 대부분 다 애니메이션 중에 발생시킴.
로아같은 경우, 애니메이션 발생과 취소와 틱타임이 꼬여서 생긴게 있음.  스킬을 쓰고 취소하면 1초 쿨, 스킬을 다쓰면 쿨이 돔. 누르고 있다가 나가자 마자 취소하면서, 스킬을 설정.... 일반 캔실로 취급.. **왜 안나갔을 까? 아마 블렌딩으로 섞여서 그런거 아닐까?**

근데 이해할만 한게 로아는 3로 만들었음.

이펙트란게 어려움. 왜? 이펙트 만드는 애들이 개념이 없음. 이펙트 만들줄만 알지, 게임에 어떻게 써야할지에 대한 개념이 없음.
예를 들어 보자, 벼락마법을 쓰는데, 마법진은 따라다녀도 문제가 없는데, 벼락이 따라다니는건 이상하다. 만드는 놈들이 이런 구분이 없다. 이펙트를 열고 직접 분해해야 한다.
꼭 붙여서 확인해보자. 연기가 삥글삥글돈다????

이팩트 난 지점에서 따라다니면 안됨?

본을 소켓이라 부르던 경우가 있음.

## 영상처리 기법

영상처리 기법을 찾아보면 좋은 방법들을 볼 수 있다.

## 언리얼 Slow motion
영상을 다소 느리게 플레이하여 긴박한 상황의 세세한 부분을 관객들이 놓치지 않고 감상할 수 있게 하여 긴장감을 배가시키는 효과를 위해 사용하는 영상 처리 기법 중 하나입니다.

* Set Global Time Dilation 메서드를 이용해서 글로벌 타임을 설정하고, Custom Time Dilation을 이용해서 개별 액터의 속도를 조정할 수 있습니다.
* 음수로 설정 시 Global의 경우 PlayerCharacter 이동을 시도할 경우 화면이 흔들리며, Custom의 경우 해당 Actor의 Global Location은 정지하지만 ANimation은 정지하지 않는 등 비정상적인 작동을 보입니다.
# 포스트 프로세스 사용하기
https://sonagi87174.tistory.com/5 포스트 프로세스 이용하기

## 언리얼 엔진 스포트라이트

GodRays라고도 하고, volumetric fog를 이용하고 light shaft라고도 한다.

https://toramee2vr.tistory.com/344?category=955653

# Depth of field
## Improve DOF quality
[언리얼 DOF](https://docs.unrealengine.com/4.27/ko/RenderingAndGraphics/PostProcessEffects/DepthOfField/)
https://www.youtube.com/watch?v=osHpBZ47ZfU

## 링크
```cpp
// Standard library header
#include <filename>
// User defined header
#include "filename"  
```

## IP
* Socket을 참조하여 내 컴퓨터 IP를 가져오는 법
```cpp

FString ATest_Network::GetIpAddress()
{
	FString IpAddr("NONE");
	bool canBind = false;
	TSharedRef<FInternetAddr> LocalIp = ISocketSubsystem::Get(PLATFORM_SOCKETSUBSYSTEM)->GetLocalHostAddr(*GLog, canBind);
	if (LocalIp->IsValid())
	{
		IpAddr = LocalIp->ToString(false);
	}
	return IpAddr;
}
```

* 파라메터는 한번더 보고 작성하도록 합니다.
어떻게 된 건지는 모르겠으나, Clamp가 작동함??? 왜지?

* FPS가 높을 경우 부동소수점(플로트)를 이용한 연산에서 매우 작은 수로 인해 오류가 날 수도 있음. 예를 들어 SmoothStep을 이용할 때 1까지 합에서 실제 반환은 0.08정도가 나올 수 있음.

* 헤메는 것을 조금더 줄이기 위해,
만들기 전에, 사용하는 변수들에 대한 정의를 불러온 후 작업하는 방식을 고려해보자.
안그래도 생각해야 할 것이 엄청 많은데, 뭐 재미는 있네.

* DOF 한번더 정리하도록 하자.

* 현재 카메라의 로테이션 정보를 가지고 있는 것은, CameraManager의 Camera이다.

* Rotator는 회전하는 것
* Rotation는 회전이다.
흥미롭게도 FRotator이다.

[프로젝션 맵핑 가상화??, XR](https://drive.google.com/file/d/1jqk3yQ3EkkLNamsTUYOXda2xi_Ftno1J/view)

* Property MinMax설정 최대값, 최소값
```cpp
UPROPERTY(EditAnywhere, Category = "Camera", meta = (ClampMin = "-89.0", ClampMax = "0.0", UIMin = "-89.0", UIMax = "0.0"))
float CameraMinPitch;
```
## CameraShake

Offset = Sin(DeletaTime * Frequency)
Frequency가 2PI일 때 한번 진동이 완료됨.

## water line
https://forums.unrealengine.com/t/camera-at-water-level-post-processing-effects-on-part-of-screen/92219
https://forums.unrealengine.com/t/under-water-above-water-split-view-is-this-possible/88081/61
https://www.unrealengine.com/marketplace/en-US/product/waterline
https://www.youtube.com/watch?v=ZdTcFRrYpg8

## 2022 06 30

Actor로 pannel을 하나 만듬.
플랫폼을 검색?해서 접시로 쓸 생각인가? 콜리전을 추가?

콜리전 추가에서 XYZ 단순화가 바라보는 시점에서, Y도 마찬가지고??

InterpToMovement의 Control point는 패스로 되어있음.
이를 스플라인으로 추가할 수 있음?
다만 안타깝게도 스플라인의 끝에접이 절묘하게 겹쳐서 잘 안보임.

일단은 프로그래머닌까, 배열의 사이즈를 확보하고, 배열을 하나씩 추가하도록 하자.

내가 지금 뭘 하고 있는 명확하게 해야지 이해하기 쉽다.

언리얼에서 애니메이션을 이야기하는건 스켈레탈 에니메이션을 말한다. 작업기준은 스켈레탈이다. 이 애니메이션을 어떻게 돌리는가는 스켈레탈이 기준이다. 모든 애니메이션의 기준은 스켈레톤이다.

**이벤트 그래프에서 변수를 세팅하고, 이 변수 데이터를 토대로 애니메이션 그래프에서 애니메이션을 돌림**

스켈레톤이 굉장히 많아지게 되면, 스켈레톤가지고 어떤 것을 작업해야 할지 모를 수 있음. 알 방법이 없음. 불가능에 가까움. 따라서 허공에 애니메이션 블루프린트를 만들기 어려움. 메쉬 폴더가서 스캘레톤 선택후 생성하도록 한다.

**TryGetPawnOwner는 현재 돌아가고 있는 객체를 가져오는데 매우매우 중요함. 기본적으로 Owner는 Pawn이상 급만 있음.**

기능은 어느정도까지 확장하고, 나머지는 리소스확장을 하는데, AnimInstance는 기능 확장한데 까지는 가져와야 한다.

개념을 알고 있어야 하는데, Velocity(속도)와 Speed(속력)가 있음. **외워야함** 영어는 벨로시티랑 스피드가 정확하게 구분되어서 사용함. 무브먼트에서는 벨로시티밖에 못가져옴.

https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=yk60park&logNo=221467809435

Velocity는 관성을 포함한 물리 운동량을 의미함.
Velocity는 방향을 가지고 있고, 방향에 상관없는 것이 Speed다.
Speed = FVector::DotProduct(GetVelocity(), GetActorRotation().Vector());

블루프린트는 변수를 따서 사용함. 정확하게, 매프레임마다 작업한지가 없는데, 애니메이션은 매 프레임마다 상태를 체크해야함.

애니메이션 100개면 if문 100개써야되냐? 맞다.... 뭐. if문을 클래스화 한것도 사용한다. 전부다 if문이다.

##

* https://docs.unrealengine.com/5.0/ko/physical-materials-user-guide-for-unreal-engine/에 따르면 Complex시에 Phys Material Override를 이용할 수 있다고 하지만 어째선지 되지 않는다.

* 레이케스트를 직접 호출할 떄 FCollisionQueryParams::bMustReturnPhysMaterial을 true로 설정해줘야 반환함.
* 코드를 따라가다 보면 UE_4.27\Engine\Source\Runtime\Engine\Private\Collision에서 FHitResult를 세팅함.
* ConvertQueryImpactHit여기서 SetHitResultFromShapeAndFaceIndex를 호출하고 여기서 PhysMaterial을 설정합니다. (여기서 Complex에 따라 Face인덱스가 다르다는 것을 알 수 있음)
true(33, DefaultPhysMaterial), false(???, Carpet)

https://bbagwang.com/unreal-engine/ue4-%EC%97%90%EC%84%9C%EC%9D%98-physical-material/
보면 여기서도 맞다고 하는데, 여기서는 못찾았다고 하네 https://stackoverflow.com/questions/67870043/ue4-complex-collision-phys-material-override-not-working

변수가 최적화 되어 검사가 불가능하므로, DebugEditor로 실행

가정 1. FaceIndex가 다르게 나오는 이유, Mesh를 직접 읽으므로?

PxShape에서 getMaterialFromInternalFaceIndex는 순수 가상함수로 되어있네, 그 말은 상속받아서 사용한다는 뜻인데, 예상할 수 있는건 심플 콜리전이랑 컴플렉스 콜리전인가?

* Basic IK로 관절 수정하고 풀바디로 마무리. 애니메이션은 볼때마다 어렵네.


* Backward와 Forward를 바꾼후 Ctrl의 Currunt To Offset 포지션으로 바꾸면 편하다.

* InterpToMovement는 발판을 구현할려는 목적으로 만들어 졌구나. 다만 작업하는 방식이 편하지는 않다.
    - 하지만 월드 좌표계로 강제로 고정이 되어있고, 심지어 만드는 것도, 노트장에다 좌표를 적은다음 옮겨야 한다. 불편하다.
    - 레벨디자이너한테 이렇게 하자고 하면, 욕한다.

* 블루프린트가 옆으로 선을 연결하다 보디 잘못하면 지저분해짐. 그래서 그중에 많이 쓰는것 설명, Once, DoOnce, Sequence ...

게임의 구성, 애니메이션, 충돌, 좌표, 객체관리... 뭐. 게임업종에 있다가 다른쪽으로 이동하는 경우는 거의 없음. 다만 다른쪽으로 가게 된다면, 별거 없구나 생각하면 된다.

## 블루프린트 컴파일 흐름제어
* Sequence는 순차적으로 실행
* DoOnce는 한번만 실행
* 투클은 반전.
* Gate는 열고 닫을 수 있음.
    - MultiGate ... 로 깔끔하게 바뀔 수 있다.
* While, For, ForLoop, ForWithBreak
* SetTimerByEvent 잘 신뢰하지 않는??

* 자료구조는 깔끔하게 쓰기 어렵다?

* Unreal은 카운트가 1부터 시작한다...
* 오류나면 정교하게 체크해줌 -> 속도가 좀 느리다...

HorrorEvent 작업하기.

* PhysicsMaterial에서 override를 반환하는게 일반 trace에서는 작동하지 않는다. 코드를 봐야지 언제 반환하는지 모르겟음.

* RotatingMovement를 집어넣으면, 빙글빙글 돌음.. 엄청 간단한 것은 미리 구현해놨네.

## 상속,

프로그래밍적인 상속이 있고,
언리얼의 상속

언리얼은 옜날 방식처럼 엑셀로 만들어도 되고,
상속시켜서 가지고 있어도 되고,

인터페이스 당연히 안다는 가정하에 진행

문법적으로 인터페이스는 퍼블릭 순수 가상함수, 반드시 자식 클래스가 구현해야 하는 함수 근데,, 뭐, 언리얼에서 인터페이스는 끄단거 없음. 개념을 그래도 지키기는 하자.

이벤트일 경우 구현해야 하는지 아닌지 모르는데, 인터페이스의 경우는 무조건 강제구현이라고 하면 이해하기 쉬움?

다양성에 관련된 부분들을 if문으로 해결할 경우, 설계가 이상한 것이다.

기능을 구현후, 내부 변수를 설정하는 식으로 블루프린트 상속을 사용함?

## What does “generate const class”?
이 클래스의 모든 속성과 함수는 const이며 const로 내보내야 합니다. 이 플래그는 하위 클래스에서 상속됩니다.


## 언리얼 폴더관리

## 

Git을 이용할 때 branch좀 따서 만들도록 하자. 두 작업이 동시에 들어올 때 개판되네,

Actor는 Tick이 콜백이고, 컴포넌트의 경우 TickComponent이다.

게임 사운드는 시퀀스를 이용해서 구현할 수 있음. 굳이 사운드 플레이를 만들 필요 없음.

라디오에 쓸 수 있는, 소리
[Harsh Static](https://freesound.org/people/RoganMcDougald/sounds/261242/)
[Passage Way ambience](https://freesound.org/people/Dpoggioli/sounds/213605/)

프로그래밍 대전재
* 기능을 잘 쪼갤 수 있어야 한다.
* 자기 기능은 자기한테 있어야 한다. 자꾸 기능을 엉뚱한 곳에 넣는 경우가 있다. 이 객체가 과연 어떠한 역활을 하는 녀석인지 명확하게 하지 않으면, 어렵다.
* 오만가지 기능을 만드는데, 제일 판단하기 어려운건 이 기능을 어디에다 둬야 하는지가 제일 어렵다.
* 프로그래머는 스스로 하는 행동이 옳다고 판단하고 행동하기 때문에 이를 객관적으로 판단할 수 있는지가 중요. 자신의 판단이 타당한지 등등 결정할 수 있어야함. 사람끼리 부디쳐 보면서 협업, 이런시긍로.
* 가장 무서운건 A, B... 여러 군데 넘게 둬도 돌아가는데, 어디다 둬야하는지... 게임 코딩같은 경우 유지보수를 전제로 하고, 여러명이서 동시에 만드는, 따라서 최소한 분리하는 경우를 전제로 하는데... 생각보다 굉장히 어려움.
* 아이템은 아이템에 있어야함. 점수는 점수를 관리하는 곳에 있어야함.
* 대부분 게임 기능은 충돌로 만듬. 충돌이라고 하는 기능은 쌍방임.
* 이벤트 기점(알려주는 타이밍), A가 B를 알아야 하느냐, B가 A를 알아야 하느냐? 어떻게 판단하냐? 객체를 늘려보면 알 수 있음. 아이템을 가져다가 폭탄, 버튼, 전등을 만든다. 화살표를 어떻게 그려야 할 까? 캐릭터가 폭탄, 버튼, 전등을 알려고 하면 전부 케이스를 구현해야 하지만, 캐릭터만 안다고 하면, 캐릭터만 구현하면 된다.
* 최대한 자료형이 적게 나오는 쪽을 아는식으로 구현한다. 캐릭터도 3명, 아이템 5개 이때는? 이때 필요한게 상속이다.
* 내가 내손으로 직접 관리하겠다. -> 자료구조,
* 하나만 알면 된다. -> 직접 통신
* 이게 이것이다. 상속. 포함한다. 조립.
* 포트폴리오에서 나는 객체 관리를 이런 식으로 이렇게 했다라고 라고 설명해야 한다.
* 문열고 만드는 기능을 가지고 했다라고 말할 수 없다. 엔진을 쓰는 이상 객체 관리 말고는 어필할 수 있는게 없다. 내가 3D에 관련된 이론을 기본적으로 알고있다. 엔진 기능을 충분히 숙지하고 있다. 음. 훌륭하군. 돈을 낼만했네.

* 문작에 시퀀스 가가지고, 
* 커브그래프 사용방법은, 원하는 값을 키프레임에서 찍어노호, 커브 에디터로 들어와서 작업하는 것이 편할 것이다.

* 엘든링이 잘만든 것은, 래버를 당기는 애니메이션, 상자를 드는 애니메이션 하나가지고 여러곳에서 사용함.

* 회사에서는 기획자가 필요한 리소스를 조합해서 만들어줌. 사서 쓰지 않음.

* 내가 이기능을 써야겠다 판단할 수 있는 능력이 중요하다. 이때는 이렇게 써야 한다 판단하는 건 아무것도 만들지 못하는 상황이 발생한다.

* 개슬프네, 삽질을 통해서 찾았는데, 겁나 쉽게 가르켜 주네. ActorSequence
    - ActorSequence에서 오른쪽 위에 트랙을 클릭하는 것과 왼쪽에 있는 트랙을 선택하는 것은 기능이 다르다.
    - SceneRoot을 두고 그 아래에 있는 스태틱 메시를 옮겨라 라고 한다. RootComponent를 옮기면 월드상의 좌표가 움직입니다.??
    - 키를 추가하는데 엔터키를 눌려도 추가가 된다. 혹시 중복클릭 될지도 모르니 조심해서 하도록 하자.
    - PlayPlop은 Toogle에 따라 다르게 실행되는 노드이다.
    - PlayTime이 기억되기 때문에 PlayReverse가 호출되면, 실행된 지점에서 역으로 재생됩니다.

* 비쥬얼 스튜디오 파일을 찾을 수 없을때, .uproject의 더 많은 옵션에서 비쥬얼 스튜디오 프로젝트 다시 생성

한일
Volume에 컴포넌트 이벤트를 바인드함.
프롤로그 형태를 잡음
3. 플러그인 세팅
	- 프로젝트를 만들고, 서브모듈 다운로드 후, 커밋하는 식으로 프로젝트 폴더 분리,
	- HorrorSource와 FirstPersonHorror작업하기,
    
	- 비쥬얼 스튜디오 git에서 서브모듈 업데이트 하는 방법 찾기
        - 못찾겠음. 직접 서브모듈 커밋하는 수 밖에 없는 것 같음.
        - 정확히는 비쥬얼 스튜디오 Git 하위 항목에서 하지말라, 프로젝트 옮긴다음에 커밋하라는 튜토리얼을 봐버림.

2. HorrorFirstPerson무브먼트 세팅

할일
HorrorEvent
HorrorEevent는 무조건 멀티캐스트 되도록 구현,
Caller에서 서버로 호출
- 이거 공부하고 만들도록 하자.

2. 정리
자연스러운 애니메이션 만들기
서버 클라이언트 모델,
메타휴먼 워크플로우 (메타휴먼 블렌더 파이프라인)
구현한 플러그인 문서 작성하기...


* 머티리얼이 깨지는 이유는 뭘까? 당연한 이유로 깨지는거 같은데, 모르겠네.
    - 메타휴먼 파이프라인을 구축하도록 합시다.

* 모르는 것을 찾아서 정리하자.
    1. FBX convert를 왜 하는가?
    2. 모프 타겟이 무엇인가?
        * Morph target은 기본 형태에서 목표 형태로 메시를 변형(deform)시키는 수단입니다. 보통 애니메이션 시스템의 일부로써 스켈레탈 메시와 함께 사용되나, 스태틱 메시도 모프 타깃을 사용하여 변형시킬 수 있습니다.
        - [스태틱 메시 모프 타깃](https://docs.unrealengine.com/4.27/ko/WorkingWithContent/Types/StaticMeshes/MorphTargets/)에서 머티리얼 셋업을 볼 수 있습니다.
        * **Morph Target(모프 타겟)이란 일정한 방식으로 변형되어 버린 특정 메시의 버텍스 위치에 대한 스냅샷을 말합니다.** 예를 들어 캐릭터 모델을 선택하여, 그 얼굴 모양을 바꿔 얼굴 표정을 만든 다음, 그 수정된 버전을 모프 타깃으로 저장합니다. 언리얼에서 그 모프 타깃으로 블렌딩하여, 캐릭터의 얼굴이 그 표정을 짓도록 만들 수 있습니다. 모프 타깃은 FBX를 통해 언리얼로 임포트되며, 애니메이션 시퀀스 안에서 캡슐화됩니다.
        - [FBX 모프 타깃 파이프라인](https://docs.unrealengine.com/4.27/ko/WorkingWithContent/Importing/FBX/MorphTargets/)
    3. 망할 왜 얼굴 애니메이션이 안되냐?
    4. 단순하게 리임포트 하는 것은 로테이션을 조정하는 것으로 가능할 것 같은데,

* 메타휴먼을 리임포트하는 절차에서, 래퍼런스 대체는 래퍼런스 설정 깨지므로, 없다고 생각하고, 리임포트 하는 방향으로 만들자. 앞의 설정을 유지하여 리임포트 하는 것으로, 가능하지 않을까?

* 플러그인 만들 떄 설정이 복잡하면, 없으니만 못함. 확실히 필요한 것만 추가하도록, 가능한 엔진과 거부감이 들지 않도록, 공포게임에 사용할 목적이므로, 공포 게임 이벤트를 효과적으로 연출할 수 있도록 지원해야함.

* BeginPlay를 오버라이드 했을 떄 Super(부모 함수)를 호출 하지 않으면, 기본 세팅이 되지 않음. 오류남. HasBegunPlay오류를 뿜뿜함.

* 호러 이벤트 서버에 멀티캐스트 시키기 너무 어려럽다. 표준 하나 구한다음에 따라해야하나?
    - 적절한 사용 예시를 찾아서 공부하도록 하자.

스크립트 액션 만들기

# Texture 세팅

Mip Gen Settings를 NoMipmap으로 설정하지 않는이상 texture LOD(Mipmap)는 무조건 자동생성되며, 자동적용된다. 화면 왼쪽 위의 Mip Level 체크박스는 밉맵을 미리보기하겠다는거지, 체크를 해야 밉맵이 가능해지는 것이 아니다.

[언리얼 텍스쳐 세팅 주요 부분](https://mentum.tistory.com/101)


# Texture 최적화

NPOT 형태의 텍스쳐인 경우 압축할 수 없습니다. 압축이 되지 않은 텍스쳐의 경우 많게는 8배 정도 큰 이미지 용량을 차지하게 됩니다.
[Unreal 4 로딩텍스쳐 최적화](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=jinwish&logNo=221576705990)

# Material 최적화

```
Base pass shader : 169 instructions
...
Base pass Vertex shader : 46 instructions
```
위는 픽셀 쉐이더 수치를 나타내고, 아래는 버텍스 쉐이더 수치를 나타냅니다. 이 수치가 클 수록, 쉐이더가 무겁다는 것을 나타냅니다. 이는 쉐이더 복잡도에서 볼 수 있습니다.

* 쉐이더 자체가 무겁거나, 이펙트 같은 반투명 쉐이더가 겹쳐서 오버드로우 현상이 날 때 무겁습니다.
* 프로젝트 세팅 / 엔진 / 렌더링 에서 Shader Permutation Reduction, Mobile Shader Permutation Reduction에서 자동으로 지원하는 기능을 설정할 수 있습니다.
    - 쉐이더의 갯수를 줄이면 Material 에셋 크기를 줄이고, 쉐이더 컴파일 속도를 높일 수 있습니다.
* 프로젝트 세틍 / 프로젝트 / 패키징 / Share Material Shader Code를 통해 Material 하나하나 저장되어 있는 상태를 하나의 라이브러리에 쉐이더가 모두 저장되어 용량을 줄일 수 있습니다.
    - 파라곤게임에서 1.8GB 쉐이더 용량을 400MB수준으로 줄였다고 합니다.

* Material 설정
    * Fully Rough는 강제로 러프니스를 1로 설정하는 것으로 쉐이더 계산량을 줄입니다.
    * Use Lightmap Directionality는 라이트맵 방향성 사용옵션입니다. 이 옵션을 끄면 라이트맵을 구울 때 방향성 정보 없이 구워집니다. 
    * Decal Response는 데칼 반응여부를 선택하는 옵션입니다. 기본적으로 켜져 있으며, 해당 Material을 가진 오브젝트가 데칼 영향이 가지 않을 때 None으로 끌 수 있습니다. Instruction값이 매우 낮아집니다.
    * Tangent space normal을 끄는 옵션입니다.

* Material 표현식
    * 가벼운 것은 Add, Subtract, Multiply
    * 무거운 것은 삼각함수 계을, if, Divide, Power, Noise
    * 삼각함수 중에 Fast붙인 노드는 조금더 빠름

* Customized UV를 사용하면 Vertex Shader에서 연산을 사용하여 조금더 빠르게 그릴 수 있습니다. 다만 퀄리티가 낮아질 수 있습니다.
    - 퀄리티가 떨어질 수 있습니다.


, [Unreal’s Rendering Passes](https://unrealartoptimization.github.io/book/profiling/passes/)
, [UE4 Material 최적화](https://darkcatgame.tistory.com/37)
, [UE4 텍스쳐 세팅](https://mentum.tistory.com/101)

## Metahuman 최적화

Metahuman character의 LODSync 컴포넌트의 NumLODs와 Forced LOD를 조절하여 원하는 퀄리티를 선택한다. 여기서 원하는 수준을 결정합니다.

* 소스컨트롤러 Git을 사용하므로 100M가 넘어가는 에셋의 크기를 줄입니다.
    1. 텍스쳐 리소스를 축소시킵니다.
    2. 스켈레탈 메시 크기를 줄입니다.
        - Face 스켈레탈 메시들이 100M를 넘어갑니다.
        - 버텍스당 12개의 본 인플루언스를 사용한다고 이해했습니다.
        - Mesh reduction tool을 이용하여 스켈레탈 메시의 크기를 줄입니다.
        - reduction setting 후 익스포트 후 리임포트를 하면 적용할 수 있습니다.
        - 이 때 root본의 x축 트렌스폼이 -90도 돌아가 얼굴 스켈레탈 메쉬가 드러눕게 됩니다...

[사실적인 머리카락, 복숭아 솜털, 눈을 만드는 방법](https://marmoset.co/posts/how-to-create-realistic-hair-peach-fuzz-and-eyes/)

2. 메시 버텍스 감소
3. 본 감소

4. 시퀀스에서만 사용한다.
5. LOD를 없앤다.

## 공포 게임 기획

공포 게임을 제작하기에 앞서 공포 라는게 정확히 무엇인지, 우리는 왜 공포심을 느끼고 있는지, 어떻게 하면 그 분위기를 제공해 줄 수 있는지.

정말 무서운 공포 게임을 개발하고 싶어서, 지금도 고민을 하고 있습니다.

그리고 오늘 머릿 속에 있는 그대로 씬에 배치해보고 느낀점을 적어보자면,

귀신의 얼굴을 노출시켜주는것보다 실체를 알 수 없는것에 한걸음 한걸음씩 다가갈때 공포를 더 느끼고 있다는것을 느꼈습니다.

또 저 상황에서 쓰러져있는 여자가 갑자기 무서운 얼굴을 한채 앞으로 확 날아온다거나, 벽에 거꾸로 매달려 있는 여자가 갑자기 바닥에서 튀어나온다거나

이처럼 한정된 장소에서도 "어떻게 하면?"을 고민하다보면 다양한 연출을 제공해줄수 있다는 것과

인간이 느끼는 감정에 대해 분석적으로 다가가면 내가 원하는 것을 제대로 제공해 줄 수 있다는것을 알게 되었습니다.

Marching Cube, Dual contouring

## 

데이터의 연결고리를 잘 찾아야 한다. 어떤걸 근거로, 어디에 어떻게 있고, 누구랑 어떻게 연결되어 있고.

전등을 배치했다, 그러면 충돌이벤트는 (충돌 이벤트는 쌍방향) 전구를 껐다 켰다 하는 기능은 어디다 만들어야 하는가?

캐릭터가 바뀌느니 것이니 캐릭터에다 만든다고 해보자, 그러면 if가 엄청나게 많아진다.

기본적으로는 자기자신이 기본이다. 버튼으로 상호작용하는 건, 에시로 오버랩을 백업해두고, 버튼을 누르면 작동하도록 만든다고 하는데 이렇게 만들면 안된다. 확장의 문제가 있다.

본인들이 고민을 많이 해야함. 스스로 꼬였다고 생각하면 풀어야함. 복잡한 상태를 안풀고, 복잡한 상태를 잘 만들면 안된다.

블루프린트에서 변수를 가져오는 것 조차 부담이 되므로, 한번 Get으로 끌어온 것에서 보통 여러번 시킬려고 해야한다.

블루프린트가 느리다고 주장하는 얘들 중에 어중간하게 아는 얘들이, for로 보여주는 얘들이 있는데, 왜 그러는지 모르겠고, 성능이랑, 편의성 등의 상황을 고려해서 만들어야 한다. Tick 이라면 충분히 고민해볼만 하지만, 그게 아니라면, 음. 
블루프린트가 30배 정도 느리지 않을까 한다.

블루프린트 Set, Get단축키 외워두자, 굉장히 많이 씀.

**오버랩된 객체가 사라질 때, 엔드오버랩을 만드시 보장해줌.** 다만 최초의 상태는 무시한다, 시작시 오버랩된 거는 작동하지 않는다.

게임 여러곳에 사용할 수 있을 듯 하므로, 지대한 관심을 가지고, 보도록 합시다.

https://docs.unrealengine.com/4.27/ko/AnimatingObjects/Sequencer/

**내가 이런 기능을 추가하기 위해서, 이런 고민을 했다. 핵심적인 알고리즘은 이것이다. 이런 식으로 설명해야 한다.**

언리얼 이벤트 디스패치 공부하기.

## 뭔지 모르겠음.

https://www.programcreek.com/cpp/?CodeExample=object+initializer 언리얼이 있는거 같은데, 무슨 용도의 사이트인지 모르겠음.

# 컴포넌트

* ActorComponent::RegisterComponent
    - 액터 컴포넌트에 대한 렌더 프록시와 피직스 스테이트를 생성합니다.
    - 액터가 스폰이 될때 엑터내에 기본 프로퍼티 내에 컴포넌트가 등록이 되어 있다면 자동으로 등록됩니다.
    - RegisterComponent 를 직접 호출 할 수도 있지만, 오버헤드가 있는 작업이라 꼭 필요할 때만 해야 합니다.

0. 이미 등록 되었나, 월드 확인 등을 합니다.
1. OnRegister(), CreateRenderState(), CreatePhysicsState(), 호출을 위한 ExecuteRegisterEvents()를 호출합니다.
    - 이 단계에서 OnRegister 이벤트의 경우, 각 컴포넌트마다 상황이 다르겠지만 SceneComponent 의 경우 AttachTo 가 실행이 되며 다른 여러 설정을 합니다.
2. Tick 이벤트를 받기위한 RegisterAllComponentTickFunction을 호출합니다.
3. Initialize가 안되어 있다면 InitializeComponent()를 호출합니다.
4. 블루 프린트에 의해 컴포넌트가 생성이 되는 경우, 자식 컴포넌트가 있는 경우라면 자식들 또한 RegisterComponentWithWorld를 호출합니다.

* ActorComponent::UnregisterComponent
    - 업데이트, 시뮬레이션, 렌더링를 중지 할 수 있습니다.

0. 이미 등록 되었나, 월드 확인 등을 합니다.
1. 현재 컴포넌트가 UPrimitiveComponent 이라면 IStreamingManager 에 PrimitiveDetached합니다.
2. Tick 이벤트 해제를 위한 RegisterAllComponentTickFunction를 호출합니다.
3. OnUnRegister(), DestroyRenderState(), DestroyPhysicsState() 호출을 위한
ExecuteUnregisterEvents() 호출합니다.

## 생성

* 생성자에서는 CreateDefaultSubobject를 이용하여 컴포넌트를 호출할 수 있습니다.
    - 이때 컴포넌트는 자동으로 등록됩니다.
* 런타임에서 컴포넌트를 추가할 경우 (NewObject를 사용할 때) 제대로 스폰되었는지 확인한 후 RegisterComponent를 호출해야 합니다.
```cpp
    UActorComponent* Component = NewObject<UActorComponent>(Outer, *Class);
    if (Component != nullptr)
    {
    	Component->RegisterComponent();
    }
```

## 오류모음

* C++ missing “,” in Class declaration specifier
    - UCLASS의 프로퍼티 설정이 잘못되었을 경우 발생할 수 있습니다.
        1. ClassGroup을 Category로 적은 경우,,,
        2. editinlinenew를 e-ditinlinenew적은 경우,,,


**인터페이스로도 블루프린트 직접 통신이 가능하다.**


1. 상자위에 버튼이 있어야 하다.
2. 계단위에 바위로 길이 막혀 있어야 한다.
3. 상자위에 버튼에 캐릭터가 닿으면 바위가 폭팔
    - 바위는 디스트럭터블 메쉬
    - 폭팔 사운드와 이펙트가 있어야 한다
    - 적당한 힘으로 파편이 사방으로 날아가야 한다.

포트폴리오를 만들게 되면, 당연히 많은 기능을 넣어서 작업해야함, 회사에서 들어온 이력서와 포트폴리오를 보면 느끼는 건데, 기능을 만들게 엄청 많다. 특정 기능을 많이 못 만들음. 6개 넘어가면 관리가 안됨? 기능별 분류가 안되서, 기능별 분류가 핵심이다.

예를 들어 전구와 버튼을 한 곳에다 만들면, 관리가 안됨. 테스트를 위해서 기능을 임시의 액터에 하나로 하는건 모르겠는데, 아니면 좀 그럼.

프로그램 포트폴리오라 기획적으로 부족한 포트폴리오는 봐줄 수 있음. 문제는 플레이를 시작해도, 뭘 해야할지 모름. 기본적인 게임성을 갖춰야함.
* 조작가능한 액터는 반드시 알려줘야함.
* 아니면 튜토리얼로 다 설명을 하고 진행해야함.

지금 만든 것 중에 프로그램적으로 문제가 되는 것,
Button -> Lamp->Light->Visibility->toggle()

**램프의 동작이 이상하거나, 기능을 수정해야할 때, 램프를 보지, 버튼을 보지 않는다. 근데 기능이 램프에 구현되어 있다!. 이것이 이상하다.**

모든 객체간의 관계는 자기 기능은 자기가 갖고, 그 기능을 어떤식으로 관계를 묶어서 호출할 것인가가 핵심.

바인드 목적으로 사용하는 이벤트는, void에 void로 연결한다. 왜냐하면, 많아지면 너무 복잡해진다.

이벤트에 헝가리안 표기법을 쓰기도 한다.

nullptr일 때 오류처리는 기능적인 문제라 한다. 무조건 연결되어 있는 경우는, 에러를 남겨두는게 맞다.

언리얼에서 전부 실시간 감시로 만드는건 인공지능 말고는 없다.

## 블루프린트 통신은

1. 충돌?
2. 포인터로

## 캐릭터 무브먼트 시스템 정리할 때 보도록 하자.

[캐릭터 이동 시스템 가이드](https://lifeisforu.tistory.com/304) 음... 음? 정리할 때 참고해서 만들도록 하자.

## 찾아보고 싶은 플러그인들

Plugin-Niagara, Plugin-NiagaraFluid, Plugin-Spine, Plugin-Water, Plugin-TrueSky, Fluid Simulation

## 월드포지션 구하기

``` 
Distortion = (CameraVector, CameraDirectionVector);
RelativePosition = CameraVector * CustomDepth.r / Distortion;
WorldPosition = CameraPosition + RelativePosition;
```

## 선과 떨어져 있는 거리
http://www.gisdeveloper.co.kr/?p=697

## 과제?

램프를 두고, Light 컴포넌트를 추가한 다음, (Point Light)
컨스트럭션에서 색깔이랑 조명 강도를 조절할 수 있도록 작업해라, 흠..

블루프린트 직접 통신, 블루프린트 하우투

## 이벤트 그래프
이벤트 그래프는 모든 것이 잘 배치되고 플레이 될 떄 들어온다. 실제로 인게임일 때 플레이가 된다.

비쥬얼 스크립팅을 통해서 바꿀 수 있는게 컨스트럭션이다. **왜 굳이 이것을 제공하느냐?** 예로 물건을 배치한 다음에 배치된 물건값에 속성값에 따라 변경될 때 사용된다.

언리얼에서 BP변수는 올 퍼블릭이다. 개념이 조금 다른데, 프라이빗은 자식에서 바꿀 수 있는지에 대해서 의미한다.

## Apex 활용하기

세상에 존재하는 배경 메쉬는 월드 스태틱과 월드 다이나믹 뿐이다.

게임상에서 레그돌 같이 물리는 무게를 0으로 두어 게임플레이에 지장을 안주는게 일반적이다.

언리얼은 Apex 무게 세팅을 조절하는 법을 안보여 준다?
잘못 터져서 경로를 맊을 까봐, 따라서 Destructible Component/Large Chunk Threshold의 이름이 애매한데 설정을 크게 잡는다. 일단 이거는 이 값보다 작은 것과의 충돌은 무시한다는 것이다.

또한 추가적으로, Apex는 Kill Z가 적용되지 않는다.

액터의 SetLifeSpan은 5초 뒤에 지워짐을 의미함. 문제는 게임상의 아이템이 이런식으로 사라지는 것은 없음. 일반적으로 게임상에서 사라지는 것은 2가지 밖에 없음.

1. 서서히 반투명
2. 충돌 갖다가 해결하는 방법(땅속으로 사라지는 방법)
3. 화면에 나갔다가 들어오면 사라지는 방법도 있다?

엔진상의 기능상의 차이점 때문에 의도했던 대로 잘 안되는 상황이 반드시 생김.

예로 디스트럭터블 메쉬의 콜리전을 바꿔도 적용이 안됨. 왜? 디스트럭터블 콜리전은 레이어로 구성되어 있음. 0번 레이어의 콜리전을 바꾸게 됨.

이를 딜레이로 해결할 수 있음. 단 절대 주의해야 할 것이, 연출용에만 쓰고, 로직에는 절대 쓰지말것.

딜레이 이후로 다른 시간대의 변수를 절대 끌어다 쓰지마라,

뭐.. 몬스터가 계속 스포되서 쌓이는 경우를 제외하고는 남겨놔도 뭐,, 상관없다.

## 웹서비스 플러그인
[Web Browser Widget](https://unrealcommunity.wiki/web-browser-widget-13f406)

? 이때까지 뭐한거지? 언리얼 엔진에서 원하는 플러그인을 쉽게 찾는 방법 없나?

할수있는 목록

* 유튜브 재생하기

## 언리얼 직렬화에 대해서
https://mm5-gnap.tistory.com/359

## 스켈레톤 공유

스켈레톤을 공유함으로써 보다 구체화 할 수 있습니다.

## Apex Destruction

Apex Destruction을 사용하네. 원하는 물체를 부분적으로 부수는건 불가능하다고 생각하고, 확실히 콜리전을 이해한 다음에 작업해야 하네.

물리 시뮬이 들어가게 되면, 버그가 굉장히 많을 수 있다?!
공포게임 같은 경우, 문에 끼어서 움직인다던지, 그런걸 굉장히 조심해야 한다.

하필이면 포트폴리오로 제출했는데 버그가 발견되면,,, 물리력은 연출용으로만 쓰도록 하자!

자연스러운 물체의 디스트럭션을 보여줄려면, 물체의 모양대로 충돌을 해야한다?!?

두 원스를 추가해서 ApplyDamage를 자연스럽게 할 수 있다?

프렉처 세부 설정 건들이기 보다는, 기본설정으로 부수고, RootCompone

이벤트 발생하는 것들은 일부로 구별하게 하기는 한다.

허공에 명령내리는건 실질적으로 액터한테 명령 내리는 것과 같다.

## 네이밍

헝가리안 표기법에서, 
액터는 헝가리안 표기법을 쓰고, 그외에는 딱히 안씀
왜? 액터가 너무 많아서 관리가 안됨.

언리얼 내이밍을 많이 고민했다고 한다. 언더바는 스페이스로 자동으로 바꿔주는 문제가 있다. 검색 과정에 문제가 있어서, `-`으로 하이픈으로 바꾸면 가능하다.

언리얼로 게임만들 때, 엔간하면 물리충돌로 만들지 마라, 그럴만도 하지. 느리닌까.
물리엔진을 연출로는 써도 되는데, 게임 시스템으로는 쓰지마라. 물리엔진이 문제가 있따.

계층구조에서 따로있다면, 이는 서로 상관없음을 의미한다. ?!?
주의사항은. 아, 언리얼은 지가지 몸하고도 충돌을 함. 배치모드에서는 자기가 자기몸이랑 충돌이 안일어남.

예를 들어 폭탄을 미리 설치해놓고 터트리면 바로 안터지는데, 게임중에 스폰하면, 바로 터질 수 있음.

이럴 때, 콜리전 언에이블을 조절해서 사용한다.

먹는 아이템의 워크플로우,
먹는 아이템에서 콜리젼을 추가한 후, 콜리전 인어블을 쿼리로, 기본 무시, 폰에 대해서만 오버랩으로 설정, 비긴 오버랩 이벤트에 이벤트 호출로 구현.

**RootComponent를 SceneComponent로 만들면, 물리력이 전달이 안된다? 세상에 그런게 있나보네. 월드 물리랑 상호작용해야 할 때는 끼고 만든다? 뭔소린지 모르겠네**

겉보기에는 무시인지 겹침인지 구분할 수 있는 방법이 없음? 알 수 있는 방법은 이벤트의 호출임.

서브모듈 관리하기.,

## 생성한 컴포넌트를 어테치 하지 않는다면
Component를 어테치 안하면, 스케일만 조정할 수 있게 되네. 몰랐던 사실을 알았다.
그리고 당연하게도 월드 트렌스폼이 적용된다.

## Character Animation
**! 땅에 닫는 포지션을 알 수 있을 때 팔이 스윙될지 Pin이 될지 결정할 수 있다.**

참고 
: HorrorEngine
, MoveIt! Multiplayer Locomotion System(V2.0)

목표. IK를 위한 AnimBlueprint, Interface, Anim Notify State구현
    서브 목표. 자동화된 Anim Notify State생성
    이를 위해서 필요한 것은.
    BP에는 없지만 CPP에서는 Bone position을 받아올 수 있음.

? 당연하게도 기존 애니메이션에서 Control Rig로 구울 수 있고, 시퀀스로도 구울 수 있고, 포즈로도 구울 수 있다. 중요한 점은 어떻게 활용하냐는 것이다.

? 루트모션을 사용하는 애님 시퀀스를 Anim Blueprint에서 실행 불러오는 방법.
@ Anim blueprint에서 root motion값을 받도록 하고,
@ 애님 시퀀스를 루트모션 설정함.
! 이렇게 하고 루트모션 애니메이션을 실행하면 루트모션이 작동합니다.

? 루트 모션의 축 조절은 키프레임을 추가하여 할 수 있음.
@ 엄청난 노가다인듯함.
@ 만들어 주는 사람이 잘만들어서 주도록 하자.
@ 루트모션을 언리얼에서 수정할거면, Animation Sequence하나당 Level 하나씩으로 만들도록 하자.
! World Position으로 Bake하면, Offset을 맞추는 수고스러움을 조금 줄일 수 있다.

? IK를 바탕으로 하는 Root motion movement를 구현해야함.
@ Blend space로 구현 가능한지는 가늠조차 안됨. 따라서 사용하지 않음.
@ State machine을 이용하면 Animation을 유기적으로 연결하기 힘들거라 생각함.
@ 직접 구현하는 것은 비효율적이고 어리석은 짓이라 생각함. (어쩔수 없는 경우를 제외하고)
! Blend Space를 이용함. 다만 측면 이동은 다른 말그대로 측면으로 이동하는 것을 의미함.

? 애니메이션의 시작과 종료를 포즈로 만듬으로써 애니메이션간의 변환을 보다 쉽게 만들 수 있나?

! 발이 지면에 다아 교환되는 시점이 속도가 제일 느려지는 시점임.

? 망할, Anim sequence 프레임 간격 어떻게 조절한거냐,,,
! 실수하지 않게 Lock으로 닫혀있는 거구나.

? Blend를 통해서 애니메이션을 자연스럽게 할 수 있을거 같은데.

? MAX(Semi procedural 논문 읽기, Semi-procedural-animation만들기)
@ Animation의 특정 시점 keyframe값을 받아올 수 있음.
! Notify time을 알 수 있는지 파악
! Semi procedural 논문 읽기
! Semi-procedural-animation만들기

? Notify time 구할 수 있는가?
! 엄청 친절하게 AnimState의 Begin에서 Notify duraion을 반환함.
! 범용성을 위해서 Interface로 구현하는게 맞다고 생각한다. 성능이 저하되는 건 어쩔 수 없지만, 매 틱마다 호출되는게 아니니 받아들일만 하다고 생각한다.

? 본의 포지션을 Anim blueprint로 업데이트 하는 방법이 도저히 안떠오르니, 수동으로 업데이트 하도록 합시다.

? Thread safe한 Trace는 AsyncLineTraceByChannel이라고 합니다.

! Level sequence로 Animation을 만들 때, Yaw값을 신경안써도 된다.

! Trail Anim State 꼬리임.

## 레벨 시퀀스 백분 활용하기
Human
    
! Level Sequence와 Anim Sequence가 연결되어 있으면, Level Sequence를 변경했을 때 Anim Sequence가 업데이트 된다. 이를 저장해줘야 애니메이션이 업데이트 된다.

! 사용하는 BP Character를 바탕으로 작업하면, 부담을 줄일 수 있습니다. 하지만 BP Character의 스켈레탈 메시 포지션을 변경할 떄 많은 부담을 줄 수 있습니다. 반대로 스켈레톤으로 작업하면 모듈이 추가될 떄 부담을 줄 수 있습니다.


## 플로우 필드 패스 파인딩
? 유니티 플로우 필드 패스 파인딩
단순하네, 엄청 효율적이고, 잘만들었다는 뜻인가.

* **프로시저란 특정한 로직을 처리하기만 하고 결과 값을 반환하지 않는 서브 프로그램이다. 테이블에서 데이터를 추출해 조작하고 그 결과를 다른 테이블에 다시 저장하거나 갱신하는 일련의 처리를 할 때 주로 프로시저를 사용한다.**

```
UENUM(BlueprintType)
enum class ETestEnum : uint8
{
    TE_OptionA UMETA(DisplayName = "Option A"),
    TE_OptionB UMETA(DisplayName = "Option B"),
};
```

어쨋든 지금 이대로 게임에 적용을 하지 못함. 이유가 뭘까? 충돌할 때 캐릭터가 끊김? 끊기면 안되는 경우, 이는 플레이에 지장을 준것이다.

## 모든게임의 90%이상의 이벤트는 충돌로 되어 있음.

특정컴포넌트에 이벤트를 추가할 때는 우클릭을 하면, 이벤트 추가가 나옴.

앞으로 제대로 된건지 확인하는 코딩을 엄청 많이 할 것이다.

연결할때는 드래그앤 드랍. 끊을때는 Alt클릭!!
스트럭트에 접근, 데이터 접근할려면 맴버접근자로 쩜을 찍어야함.

3차원 공간안에 어떤것을 두고싶을 때 Spawn이라 한다.

이펙트에서 수명이 무한대인 이펙트는 잘 관리를 해줘야함. 당연한 이야기지만, 삭제안하면 메모리에 남아있고, 컴퓨터가 터지게됨.
이펙트에 수명이 있지 않는 이상, 따로 관리를 해줘야함. 자료구조에 붙이거나, 방법이 없음? 추가적으로 이펙트 자체가 연산을 굉장히 많이 먹음.

한번만 터지게 할려면 다른 방법을 사용해야함. 오버랩이라던가.

## 언리얼 공식문서 대하기

에디터에서 작업하다 모르겠으면, 눌러본다. 그럼 공신문서로 연결된다.

##

상속 관계와 포함관계,
근데, 프로그래머는 불편해 한다? 근데 직접 만들면, 생성자, 초기화, 직접 추가해줘야 하지만, 컴포넌트로 만들면, 자동으로 해준다의 느낌?

작업을 해보면 장단점 있음. 개인적인 판단이 필요한 부분.

내가 누구한테 일을 시킨다, 대상이 명확해야함. 클래스 또는 ptr을 가져와서 .찍으면 일을 시킴.

따라서 액터의 각각의 부품이 무슨일을 하는지 명확하게 알아야함.

그동안 추상적으로 느끼고 있던것을 명확하게 문자화한 내용인가?

##

현실적으로 애셋을 찾기가 어렵다, 드래그앤 드랍으로 하던가,
애샛을 클릭한다음에, 선택된 애샛 사용(화살표)를 쓴다던다.

## 

Snow Plugin 가져다 썻네, 10명 밖에 안되닌까 그런가. 아니면 벽 오르는 거나. 물 플러그인도 그렇고 마켓플레이스에 있는거 엄청 활용했네.

VertexAnimToolSet. 액터 단위의 스켈레탈 메쉬가 많으면, 무겁기 때문에, 간단한 오브젝트는 텍스쳐로 뽑아내서 사용함.

리소스 로드 시 왼만하면 WeakPtr씀. 이작업으로 실제로 효과를 봤다네?

로딩 중 리소스 로드를 이용? 리소스가 큰거는 미리 로드하는 식으로 만듬. 한번에 많이 하는 경우에는 메모리 문제가 생김.

캐릭터 무브먼트에서 체크하는게 많아서, 캐릭터 무브먼트가 많아지면, 상당히 부하를 먹음. 필요없는 부분도 덜어내고, 체크하는 인터벌도 낮춤.

퀄리티 레벨을 옵션으로만 제공하지 말고 내부에서 따로 기기별 퀄리티를 지정함. 실제로 인원이 많아질때는, 퀄리티를 낮추는 쪽으로 만듬.

내부 퀄리티 레벨로 많은 것들을 분리, CharacterMesh, Effect, Texture

PSO를 활용했다는데, 내가 아는거랑 다른건가?

액터병합으로 드로우콜을 낮추는 쪽으로 작업했다네,

월드 컴포지션만 잘 조절해도 많은 부분들이 좋아진다.

레벨을 많이 분리해서 기기별 성능별로 조절

기기별 로딩 거리 제어

LOD 활용

PC 버전에서는 더 좋은 퀄리티 레벨 적용.

데디케이트 서버, 지속적인 CPU 프로파일링을 통해 Peak를 찾음? 언리얼 리눅스 데디케이트 서버는 싱글 코어만 지원? 따라서 CPU캐시 히트를 높이기 위해? 하지만 윈도우는 

## 오늘은 폴리지를 한다.
리소스가 크고 비쌀 수록 이쁜 건 맛는데, 현재 프로젝트에 적합한지는 해봐야 한다.
안열린다? 여러개 띄어놓고 하기 힘듬.

Megascane 굉장히 그럴싸해 보이지만, 게임에서 쓰일 용도는 아님. 한마디로 작업이필요함.

지형에 가져다 붇이는 지형은 잘 가져다 붙여야 한다. 잘못 붙이면 티가 난다. 아니면, 아주 멀리에 접근 못하게 막아버리거나,

인피니티 블레이드가 적응 용량의 그럴싸한! 잘만든 검증된 리소스.

폴리지 액터를 강의하지는 않는데, 나중에 찾아서 다 만들 수 있음.

밀도가 있고 뭐고, 와닫지 않음. 모든 리소스 밀도를 칼갇이 맞추는게 쉽지가 않음. 그냥 밀도를 가지고 작업하는게 편함.

단일 모드는 하나만 클릭해야함. 실수하기 싫으면,

레벨 디자인하고 빌드를 따로 분리하는 것이 좋다. 안돌아 가낟.

Cascaded Shadow Maps, 음.. Direction Light에 있다.

샘플맵 구성할 때 작업한 내용을 보면, 알 수 있다. 다만 문제가 있는게, 샘플맵 빌드를 때리면, 결과가 달라질 수 있다. 자기들이 만들어 놓은 것 조차도 깨짐.

그림자는 본인 필드에 맞춰서 조절해라. 이 작업을 해줘야 한다. 안그르면 빌드하면 왕창 깨진다. 2.24

폴리지가 법선 백터에 따라 심어지는데 설정 건들여야 한다. 근데 나뭇잎이 언덕에 가려지니, 음. 적합하게 선택할 수 밖에 없다. 다만, 땅에다 심을려면, 경계면이 이상할 수 있으니, 땅에다 심어줘야 한다.

인스턴스 세팅의 콜리젼 프리셋은 재가공 하는 것이다.

제일 좋은 컴퓨터는 그래픽 작업자가 쓴다. 음. 그럴 수 밖에,,

땅끝이 시야에 들어오면 안된다. 왜 안되는지 납득이 가게 만들어야 한다.

쿼터뷰의 경우(위에서 아래를 보면) 땅밖에 안보이기 때문에 훨씬 쉽지만, 아니라면 납득할만한 사유가 필요하다. 불친절한 게임은 진행 못하는 구간에 들어가면, 죽는다. (엘든링의 다크소울류)

레벨 디자인 할때, 먼저 구획을 정하는게 중요하다. 어디서 플레이하고, 어디서 뭘하고 등등등의 이유를 들어서, 전반적인 전체적인 맵을 어떻게 해야할지 구상을 먼저하고, 그 다음에 작업해야 한다.

라이트메스 임포턴스 불륨. 여러개를 둬도 상관없음. 무언가 조명과 그림자 처리 관련된것을 저 안에 감싸도록 한다.

올해 창업하는 회사는 5를 쓰기는 하는데, 현재는 4닌까 크게 상관없다. 지금은.

라이트 매스 임포턴스 불륨은 간접광을 여기까지 계산하세요. 없으면, 연산 안한다.

제일 중요한건, 콜리젼? 충돌기능? 내일부터 본격적으로 이벤트 처리.

## 

Wolrd Outliner 또는 애셋으로 작업할 때 팁.
검색에서 Or연산자를 이용해서 편하게 찾자

## Landsacpe material

카툰 렌더링에서 -> 스타일라이즈드 라고 부름.
스타일라이즈드는 리얼이 아니기 때문에 리소스 용량이 적음. 다만 맞는 몬스터와 그래픽을 구하기 어려움.

전부 리얼리티한 경우, 사이즈만 맞으면 얼추 맞긴한데.

정상적인 랜드스케이프 머티리얼을 집어넣으면 새까맣게 나오는게 맞음(?)

Parallax Occlusion, 어둡도 밝은 정도를 계산해서 측면에서 봤을 때 울퉁불퉁 하게 보이도록 하는것
Tessellation, 실제로 폴리곤을 밀고 당겨서 만드는 것.
Standard landscape,

땅에 굳이 이런걸 추가한다고 해서 재밌어 지거나, 퀄리티가 높아지거나 하지는 않을 것으로 봄.

레벨 디자이너가 직업적으로 하는 것이니 적당히 하도록 하자. 근데 고민하면 할 수 록 이쁘게 나오는 것은 맞음.

유저가 뭔가 이상한건 기가 막히게 눈치챔.

산이랑 물은 어떻게 만드는가?

물은 판자때기를 붙여서 만든다. 물 스케일을 높여서 만들면 판자때기 되서 모양이 이상해진다. 이럴때는 복사해서 붙여넣기 한다.

리소스가 만들어진 의도에 따라 많이 다르므로, 잘 생각해서 만들어야 한다.

## 랜드스케이프 지형 만들기.
지형을 만드는게 중요한게 아니라, 어떻게 만드는가가 중요.

랜드스케이프에서 2n승이 아니라 하나더 작은 이유가, 
마우스가 어느 시점을 클릭했는가 표현하기 위해 Unprojection을 한다. 물체같은 경우에는 바운딩 박스나 콜리젼으로 하는데, 랜드스케이프는? 쿼드 트리나 옥트리로 구성을 하는데, 그를 위한 데이터 구조 때문이다.
2n + 1 또는 2n - 1의 값을 가진다.

포트폴리오를 만들고 제출을 하면, 포트폴리오를 플레이 해볼 것이다. 포트폴리오를 플레이 하는 플레이 타임은 5분 길어야 10분, 튜토리얼 식으로 만들어서 아무 생각 없이 엔딩 볼 수 있도록.

스컬프틍. 플레이어가 

함정카드가 있는데, 3인칭 모드에서 kill z가 있다. (world setting에서 변경 가능.)

침식 기능이 있는데, 땅은 물체를 채워넣어서 완만하게 만들지, 침식기능으로 만들지는 않는다.

수성 침식은 없는 기능이라 생각하자. 잘 쓸 방법이 없다. 푹 꺼지게 만드는 건데.

쿼드트리 이해 못하겠는데???

평탄화로 어느정도 작업을 해주고, 침식 툴을 이용해서 경계선을 깍아줌. 너무 각이 져있으면, 스무드로 다듬어 주는 정도로만 이용함.

엄청 울퉁불퉁하게 만들면, 플레이 하기 어렵다.

필드에 플레이어가 강제로 심어져 있으면, 랜드스케이프에서 여기서 시작이 작동하지 않는다.

유튜브 레벨 디자인 -> 게임용 아님. 이런 작업들 하는구나 정도로 -> 프로그램에 관련된건 아님.

마켓플레이스 Landscape 툴 보면 있음.

## Replication multicast는 Server에서 reliable일때만 호출 가능함.

대역폭이 낮으면 서버는 중요하지 않은 호출을 건너뛰려고 합니다. "신뢰할 수 있음"으로 표시된 모든 항목은 절대적으로 클라이언트에 복제되어야 합니다.

복제된 UFUNCTION()은 안정적으로 또는 불안정하게 복제될 수 있습니다. 이것은 단순히 심각한 네트워크 스트레스 하에서 신뢰할 수 없는 메서드 호출이 실행되지 않을 수 도 있음을 나타냅니다. 발생해야 하는 일을 신뢰할 수 없는 것으로 표시하면 안됩니다. 그러나 이론적으로 네트워크 스트레스에서 게임 플레이를 더 좋게 만들 수 있으므로 중요하지 않은 효과에 대해 수행하는 것이 좋습니다.

# 설치
## Git bash
```
$ git submodule add https://github.com/kbmhansungb/UnrealPlugin_HorrorCore Plugins/Horrorplugin
```
## 다운로드
다운로드 후 HorrorPlugin 디렉토리를 Project/Plugins/ 디렉토리에 이동시킵니다.

## 오늘할건 배치한 물건들을 이론적인 설명함
커서를 올렸을 때 뜨는 정보가 다르다,
콜리젼 때문으로 알고있지만, 어떤 내용을 설명할 것인가?
굳이 들어가보지 않아도, 아이콘으로 충돌의 유무를 확인할 수 있다. 흠. 이건 생각못했는데.

단순 콜리젼이 있고, 복합 콜리젼이 있다.
일단 메쉬 뷰에서 복합 콜리젼을 선택해도 되는 것은 아닌데. 어쨌든 폴리곤 전부 검사하는 복합 콜리전은 너무 느려서 게임에서 사용하지 않는다고 생각하면 된다.

* 바운딩 박스라고 있다.

문제가 있다. 뱀이라고 하자. 박스콜리젼 어떻게 할 것인가? 아이템의 경우? 물체에 따라 달라진다. 점수를 주는 아이템의 경우? 먹냐 안 먹냐가 중요하지, 콜리전은 어색하지만 않을 정도의 어색하지 않게 하는게 중요, 정교하게 콜리젼을 만들 필요는 없다. 납득할 수 있을 정도의 정교함이 중요하다.

컨벡스 콜리젼은 나름 정교하게 하긴 하지만, 많이 먹는다.

그외 Ctrl Z는 한개씩 천천히, 맹신하지는 말자.

## 잠재적으로 무한한 아이템 항목 만들기

데이터 테이블은 사용하기 쉬워야 하고 효과적이여야 합니다.
언리얼에서는 CSV와 JSON을 사용할 수 있습니다.

사용예시로 Google Sheet에서 CSV로 다운로드 받습니다.
CSV의 구조와 데이터 테이블에 사용할 자료형의 구조를 매칭시킵니다.
CSV를 임포트 시키면, 자료형을 선택하여 CSV를 임포트 합니다.

DataTableRow(만든 데이터 테이블을 가진)와 자료형 변수를 생성합니다.
데이터 테이블에서 읽어들인 로는 자료형 변수에 저장됩니다.
생성함수에서 데이터 테이블에서 읽어들인 후, 변수에 저장합니다.

데이터 테이블은 노동을 줄일 뿐만 아니라, 유연성을 제공합니다.

##

Validation(유효한)은 어떻게 사용해야 하는가?

```
$ git submodule add https://github.com/kbmhansungb/UnrealPlugin_HorrorCore Plugins/HorrorPlugin
```

[특정 디렉토리 서브모듈 이용법](https://postlude.github.io/2019/01/06/git-submodule/)
[서브모듈 사용법2](https://pinedance.github.io/blog/2019/05/28/Git-Submodule)
[서브모듈 사용법](https://ohgyun.com/711)
[Git submodule 간단하게 삭제하기](https://asbear.tistory.com/190)

## Replication

1. RPC는 클라이언트가 UFUNCTION(Server, Reliable, WithValidation)함수 A를 호출하면, A함수가 서버에서 UFUNCTION(NetMulticast, Reliable) B함수를 호출한다. 그럼 각 서버와 클라이언트에서 B함수가 원하는 동작을 수행한다.

2. 선언 할 때는 A, B라 선언하지만 정의 할 때는 A_Implementation, B_Implementation라 정의해야 합니다. 언리얼 코드 제너레이터가 뒤에 Implementation가 붙은 함수를 호출합니다.

3. 추가로 bool A_Validate함수가 필요합니다.

4. (몽타주 애니메이션)모든 동작마다 replicate를 따로 해줘야 합니다.

5. 발사와 같이 특정 방향 캐릭터 기준이 필요한 경우에는 UFUNCTION(Server, Reliable, WithValidation)함수에 파라미터로 넘겨줘야 합니다.

6. 몽타주 실행을 위한 AnimInstance는 5번을 생각해서 파라미터로 넘겨주면 문제가 생길 수 있습니다. AnimInstance는 Transient합니다. 

* 컴퓨터 프로그래밍에서, transient는 일시적인 시스템의 모든 요소의 속성입니다.

7. 몽타주의 전체 재생 시간보다 blend 시간을 압도적으로 짧게 잡아야 합니다. 그렇지 않으면 blend 하는 사이에 애니메이션이 끝나 결과적으로 애니메이션이 재생되지 않는  것처럼 보입니다.

? WithValidation 

```cpp
UFUNCTION(Client, Reliable)
void ClientRPCFunction();
...
```

```cpp
UFUNCTION(Server, Reliable)
void ServerRPCFunction();
...
```

```cpp
UFUNCTION(NetMulticast, Reliable)
void MulticastRPCFunction();
...
```

Class 설정에서 Replication/Replicates 마킹을 선택해야 서버와 클라이언트 두 곳에서 스폰됩니다.

[블루프린트 리플리케이션 특강](https://www.unrealengine.com/ko/blog/crash-course-in-blueprints-replication)

## RPC(remote procedure call, 원격 프로시저 호출)

* **함수 앞에 Client, Server, Multicast 키워드를 붙인 것은 프로그래머에게 각각 어디서 호출되는지 한눈에 파악하기 위해 합의된 규칙입니다.**

* reliable은 게임플레이에 핵심에 관련된 모든것들 입니다. 입력을 기반으로 최대한 빨리 처리해야 하는 것에 사용합니다.
* unrealiable은 파티클이나 사운드 같이 올바른 순서로 클라이언트에 제공할 필요가 없는 경우 사용합니다. 지연 처리됩니다. RepNotify를 통해 대신할 수 있습니다.


* 원격 프로시저 호출은 별도의 원격 제어를 위한 코딩 없이 다른 주소 공간에서 함수나 프로시저를 실행할 수 있게하는 프로세스 간 통신 기술입니다.

* 보안상의 이유로 클라이언트는 자신이 소유한 액터로부터만 RPC를 보낼 수 있습니다.
    - PlayerController 또는 PlayerCharacter 액터에서 RPC를 보내거나 Component에 정의하여 사용할 수 있습니다.
    - Owner가 Outer였는지는 확인필요.

* 서버가 이벤트를 실행할 때 클라이언트가 이벤트를 보도록 하려면 NetMulticast RPC를 사용해야 합니다.

##

* 결과보다는 방법이 더 중요하다. 프로그램에 대한 노력이 없으면, 포트폴리오로부터 가치가 없다.

* 애셋을 병합만 하고 저장하지 않고 이주하면, 머티리얼은 이주되지 않음. 흠. 이주하고 저장을 하면 꼬임?

* 언리얼 리소스 이주. 폴더 명을 맞추고 이주해야함?

## 오늘하는거는 Asset을 가져와서 읽는 것.

* 언리얼 설치하거나 할 때 200GB정도는 여유가 있어야 한다. 언리얼 설치한 폴더도 50 ~ 100GB는 여유가 있어야 한다. 왜냐하면, 언리얼 에셋을 다운받으면, 먼저 엔진에 캐시를 만든후, 에셋을 추가하면 그 다음 폴더에 추가된다.

* 쓰지 말아야할 에셋은 무엇인지?

왜 검증된 리소스냐면 아이폰 4였을때, 서비스를 끝낸, 모바일상에서 돌아갔다를 근거로 검증되었다고 말한다.

프로젝트 생성하거나 추가하는 에셋이 있다. 생성한 프로젝트의 리소스를 사용하는 방법은 리소스 이주라고 한다.
왜 리소스 이주를 하냐, 리소스가 너무 많아서 정리가 안되기 때문이다. 또한 컴퓨터가 못버틴다. 따라서 리소스 이주를 사용한다.

어떻게 작업해야 하나, 새로운 프로젝트를 만들어서, 추가하고 독립적인 기능을 만들고, 가공이 끝나야, 애셋을 통합해서 관리해야 한다.
음. 프로젝트 별 관리라 한다는 구만.

모든 애셋은 아래에 구현설명이 있다. 안에 어떤게 들어있는지 등이 있다. 설명을 잘 읽으면 어떤식으로 해야하는지 잘 나와있다.

Showcase또는 오버뷰를 먼저 열어봐야 한다. 오버뷰를 먼저 열어야 나중에 쉐이더 컴파일 하느라 지연되지 않으며 겸사겸사 볼 수 있다.

셈플을 가져와서 쓰는건 문제가 없지만(프로그래밍 포트폴리오닌까) 그대로 쓰는건 안되고 최소한 재가공은 해야 한다.

**맵을 만들 때 중요한건, 절대로 시야밖에 아무것도 없는 빈공간이 있으면 안된다. 절대로 안된다. 기본적인 성의에 관련된 거다.**
이런 자잘한 작업에 생각보다 시간이 굉장히 많이 든다.

**물건을 클릭하고 Cntl-b를 누르면 에셋 탐색한다.**
뒤로 이동이라던가.

## 

정확하게 붙여야 할때는 역시 뷰옵션을 바꿔서 하는것.

키보드 End키를 누르면 수직방향으로 다을때까지 물건을 놓아줌. 이것도 중요한 기능.

그리드 스냅을 껐다 켰다하면서 물건 배치하면 됨.

중요한 단축키, 마우스 우클릭 휠은 속도조절, 많이쓰게됨.!?
f키를 누르면 바로 앞으로 이동.

과제: 레벨 디자이너 퀵 스타트 끝까지 하는 것이 과제. 마지막 밥아저씨 같은거 까지는 안해도 된다.

인스턴스에 직접 컴포넌트를 추가해서 만드는 경우, 그거는 영상물 만드는 사람들이다.

작업하는 폴더가 어떻게 되든간에, 영문으로 폴더를 만들고 선택.
최대퀄리티는? 레이트레이스는 이거는 게임에 쓰는게 아니라, 영상처리에 사용하는거

본인 컴퓨터가 너무 성능이 안좋으면, 모바일로 해도 됨.
시작용 콘텐츠는 있어야함.

3인칭으로 만드는데, 3인칭이 제일 어려워서 3인칭으로 한다고 한다. 1인칭 3인칭 혼합해서 사용하기 때문에?

프로젝트 만들때 진짜 조심해야할 주의사항. (언리얼 뿐만 아니라, 만에 하나라는게 있어서)
모든 작업폴더와, 연관 폴더는 영문만 써야함.

## 중요하게 생각하는거 2가지
가장 중요한건 3D에 대한 이해
어지간한 기능은 엔진이 다해줌. 프로그래밍 포트폴리오는 최소한의 여기에 어떤식으로 프로그래밍 요소를 넣어서 관리할 것인가 이게 반드시 있어야함.
기능의 타협을 한다면 (어려워서 포기하면) 포트폴리오로서의 가치가 없을 수 있다.

상속으로 할 거냐, 디스패치로 할거냐, 조립을 할 거냐, 어떤 걸 선택해도 일단은 돌아감. 중요한건 왜 이렇게 관리하도록 만들 었는가? 이래야 나중에 할 이야기가 있다.

SCANS라 한다면, 게임용 리소스는 아님. 받아도 못사용하는 것.

LOWPOLY의 문제는 LOWPOLY에 어울리는 리소스 찾기가 쉽지 않다.

중요한건 어떤식으로 적용이되느냐, 적용할 것이냐 아니냐, 가 중요. 어떻게 돌아가는지는 별로 안중요하다.

그래픽은 전부다 노가다. 예를 들어 수상작같은 것들 보면 전부 그래픽 작업. 프로그래밍적인 내용이 없음.

언리얼 엔진 DOC의 문제는 이름을 몰라서 검색을 못하는게 문제이다. 이름을 알아야 검색을 할 수 있는데, 이름을 모르면 검색을 못한다. 따라서 기능적인 것은 까먹어도 되지만, 구성을 할 때 어떤 걸 먼저해야 하고, 어떤걸 어떻게 해서 어떻게 들어갈지는 절때 까먹으면 안된다?

수업시간에는 C++을 다루지 않음. 블루프린트로 작업한다고함.

UE4 시작하기 클릭, 레벨 디자이너 퀵스타트 가이드 보고 하기

일단 본인이 노트북으로 언리얼 프로그래밍 하겠다는 마음가짐을 버린다. 데스크탑으로 해야 한다. 의외로 그래픽카드는 그렇게 부담이 되지 않는다. 근데 CPU와 RAM, 하드공간이 가장 중요하다.

학원 강의 렘 16GB <- 작업하는데 어려움을 겪음. 원할하게 엔진작업을 하고 싶다. 32GB가 권장.

###

? UAnimSequenceBase를 상속받는 UAnimSequence와 UAnimStreamable 있음. 여기서 문제가 발생함. UAnimStreamable이 뭔지 모르겠음.

해매지 않았다면 한번에 AnimNotify로 만들었을 거 같은데. 음... 근데 내부 코드를 모르니 그저 가정일 뿐인가?

## FGuid
전역 고유 식별자(全域固有識別子, 영어: Globally Unique Identifier, GUID)는 응용 소프트웨어에서 사용되는 유사난수이다.

## 3D 탐색 플러그인
설마 이렇게 만들었나 싶지만 실제로 이렇게 만들었다고 한다. unreal engine forum을 보면 [3D navigation](https://forums.unrealengine.com/t/3d-navigation-plugin/112703)에 대한 정보를 보여준다. 관련 내용을 찾기가 어렵다고 한다.

[3D navigation system for virtual reality based on 3d game engine](https://www.semanticscholar.org/paper/3D-navigation-system-for-virtual-reality-based-on-SharkawiK.-Ujang/0f3fed63730ec4ded51ff0b78ca80356ca790263#citing-papers)에 관한 내용은 찾을 수 있다. 하지만 2008년에 작성된 내용이다. 2D에서 찾아서 3D에 적용하는 방법을 찾아야 하나?

* 여러개의 NavMesh를 합치는 방법은 나중에 생각하도록 하자.

## UPROPERTY 단위 표시
CharacterMovementComponent를 보면 ForceUnits를 통해서 Editor에서 단위를 표시할 수 있음.
```cpp
	UPROPERTY(Category="Character Movement: Walking", EditAnywhere, BlueprintReadWrite, meta=(ClampMin="0", UIMin="0", ForceUnits="cm"))
	float MaxStepHeight;
```


## UOject Class를 변수로

* UCLASS 매크로에 BlueprintType, DefaultToInstanced, EditInlineNew을 추가합니다.
    * 

* UPROPERTY 매크로에 Instanced를 추가합니다.

! 개발을 좀더 편하게, Editor는 디버그가 편하게 DebugGame, 그리고 BuildTarget에서 Non-Unity mode로 빌드되도록.
! 자동으로 인클루드 하는게 엄청 많았나 보구나, 오래걸릴만 하네. PCH가 하는 역활인가? 가끔식 PCH바뀌면서 엄청 오래걸렸던거 같은데?
! 엄청나게 직접 추가해야 하기는 하는데, 빠를 수만 있다면, 충분히 감수할만하다고 생각합니다. 실제로 엄청더 빠릅니다.
그래 빌드 속도가 이정도는 되야 할만하지. ㅠㅠ
! 내가 병신이였구나, 이렇게 빌드 속도가 빨랐는데, 시간을 낭비하다니.

```c#
        bUseUnityBuild = false;
        bUsePCHFiles = false;
```

? PoseLink는 Local space(부모본과의 관계)
? ComponentSpacePose는 Component와의 관계

? 이름은 안바꾼다고 생각하고 만들도록 하자.

? **ㅠㅠㅠㅠㅠㅠㅠㅠㅠ 쓸데없는데서 시간 오래 잡아먹혔네, 내일 정리하자.**
Interface,

? UnityBuild로 cpp자동으로 통합되니, 한 클래스안에 때려박지 말도록 하자.

? 디퍼드 렌더링 모드, Static mesh component는 simulation 되어 있지 않으면 velocity를 그리지 않음.

? 공부할 때는 25분 5분 타이머가 굉장히 효율적이다.

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
