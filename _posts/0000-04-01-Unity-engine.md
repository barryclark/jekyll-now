---
layout: post
title: Unity engine
---

<details><summary>Fragment</summary>
<div markdown="1">

* 랜덤에서 max는 float의 경우 inclusive고 int의 경우 exclusive입니다. 헷갈릴 수 있습니다.

</div></details>

- [ ]  유니티 개발 툴 좀더 찾아보기
- [ ]  C# 공부 : API 공식문서 읽기, 주석달기, 패키지 등이 핵심..?
- [ ]  유니티 API
    - Instantiate(GameObject, Pos, Rotation…);….
- 하드 코딩된 값을 새로운 공개 변수로 교체한다…
- 이름도 함부로 바꾸면 안된다.
- 아키텍처 설계할 때 많은 논의를 해야한다.
- [ ]  애니메이션, 파티클, 오디오
    - [ ]  유니티 파티클 시스템 
    [https://rito15.github.io/posts/unity-particle-system-tutorial-01/](https://rito15.github.io/posts/unity-particle-system-tutorial-01/)
    [https://notyu.tistory.com/59](https://notyu.tistory.com/59)
    - SFX, 영화, 텔레비전 등에서 특수 촬영과 필름 합성, 편집 기법을 구사하여 특수한 시각적 효과를 내는 기술
        - playerAudio.playOneShot(…)
- [ ] 유니티는 참조하는 래퍼런스를 어떻게 찾나..?
    - UI의 경우 Reference 개체를 만들어서 관리한다.

- 유니티 개발을 위한 Visual Studio Code 플러그인
    **ShaderlabVSCode(Free)**
- 커스텀 Attribute (ex)ReadOnly)
- 유니티 인텔리센스 따로 만든 거라.. 비쥬얼스튜디오가 훨씬 좋다. 못따라 간다.

현지화 대시보드에서 컴파일 시 프리뷰언어에서 볼 수 있습니다.
에디터 언어를 Englie로 하면 애셋 현지화에서 KR이 추가된다.

<details><summary>ToDo</summary>
<div markdown="1">

- [ ] [주니어 프로그램](https://learn.unity.com/pathway/junior-programmer?signup=true)
- [ ] [유니티 메뉴얼](https://docs.unity3d.com/kr/530/Manual/UnityManual.html)
- [ ] [유니티로 언리얼 프로젝트 옮기기](https://learn.unity.com/tutorial/transitioning-from-unreal-to-unity#5d518e11edbc2a002007f178)

- Certified User programmer란 유니티 책 볼 수 있다..?
- 에셋패키지에 유니티 패키지를 넣을 수 있다.
유니티 에디터에서 애셋을 임포트할 수 있습니다.
- 프로젝트와 레이아웃, 탭설정, 프로젝트에서 즐겨찾기 설정
- Update이용하기

</div></details>

* [UnityEngine](/posts_unity_engine/UnityEngine)
* [Interaction](/posts_unity_engine/Interaction)
* [Folder & Prefab & Package](/posts_unity_engine/FolderPrefabPackage)

문법에 대해서

* [InvokeAndRepeating & Coroutine](/posts_unity_engine/InvokeAndRepeatingCoroutine)
* [Physics](/posts_unity_engine/Physics)
* [Particle & Shader](/posts_unity_engine/ParticleShader)

좀더 효율적으로

* [Inspector & AutomationTest](/posts_unity_engine/InspectorAutomationTest)