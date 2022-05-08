---
layout: post
title: Code-analysis
---

* NMAKE는 Microsoft의 make 도구 구현입니다. Microsoft프로그램 유지 관리 유틸리티(NMAKE.EXE)는 설명 파일에 포함된 명령을 기반으로 프로젝트를 빌드하는 32비트 도구입니다.

## PVS Studio
일자 : 2022 05 06
IDE : Visual studio community 2022
환경 : Unreal engine 5.

* 설치방법
    1. Visual studio 확장에서 PVS studio를 찾아서 다운로드합니다.
    2. Visual studio를 끄고, 설치를 진행합니다. 
        - 또한 기본경로로 설치하는 것이 좋습니다. 언리얼에서 ThirdParty경로 또는 C의 경로에서 찾습니다.
    3. [Unreal Build Tool 통합을 사용한 분석](https://pvs-studio.com/en/docs/manual/0043/)을 따라 설치합니다.
* 오류코드를 추가하고 PVS가 작동되는지 확인해 봅니다.


<details>
<summary>삽질 기록</summary>

[작동이 안되서 포럼에다 올려봤습니다.](https://forums.unrealengine.com/t/unable-to-find-pvs-studio/550089)

버그라고 합니다. 다음에는 깃헙 이슈목록도 보도록 합니다.

[Unreal Build target이 없다고 합니다.](https://forums.unrealengine.com/t/unrealheadertool-target-deleted-on-project-rebuild/522872/6)

버그라고 합니다. 핫 픽스 나왔으니 버전 업하라고 합니다.

[이번엔 용량이 문제입니다.](https://hkebi.tistory.com/1591)

이참에 관리하기 쉽게 프로그램 하나를 설치하도록 합니다.

</details>


참고자료
: [C++ PVS-Studio 설치 및 사용](https://jacking75.github.io/Cpp_pvs_studio/)
, [Cppcheck and PVS-Studio compared](https://pvs-studio.com/en/blog/posts/0149/)
, [언리얼 엔진 개발 프로세스에 정적 분석 사용하기](https://www.unrealengine.com/ko/tech-blog/static-analysis-as-part-of-the-process)