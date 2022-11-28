---
layout: post
title: Localize
---

[Localize](https://docs.unrealengine.com/4.27/en-US/ProductionPipelines/Localization/ManageActiveCultureRuntime/)

<details><summary>Asset Localize</summary>
<div markdown="1">

[How to Localize Assets in Unreal Engine](https://www.youtube.com/watch?v=rcj1zrCWA6I)

1. 로컬라이즈 현지화 대쉬보드에 언어를 추가합니다.
2. 추가한 언어를 컴파일하면, 애셋 추가를 할 수 있습니다.
3. 현지화한 애셋을 추가하거나, 편집합니다.

* 기본 언어로 설정된 부분은 기본이므로 현지화할 필요 없습니다.

General/Region&Langu...에서 Preview Game language에서 원하는 언어를 설정한 후 독립형으로 실행하면, 애셋이 변경되는 것을 볼 수 있습니다.

애셋이 메모리에 로드되어있다면, Culture가 변경되도 게임에서 변경되지 않습니다. 

[메모리에 남아있는 문제에 대해서](https://forums.unrealengine.com/t/how-can-i-load-reload-localized-assets-at-runtime/380289) 

현재 런타임 시 콘텐츠 핫 리로딩을 지원하지 않으므로 안타깝게도 문화권을 변경한 후 현지화된 자산을 다시 로드하는 유일한 방법은 해당 자산이 제거되고 다시 로드되는지 확인하는 것입니다. 메인 메뉴에만 있는 경우 메인 메뉴 세계를 다시 로드하는 경우일 수 있지만 전역적으로 로드된 참조는 다시 시작해야 하는 문제를 일으킬 수 있습니다.

![Localize Build Test](/images/LocalizeBuildTest.gif)

![Localize Build Test](/images/LocalizeTestCode.png)

</div></details>