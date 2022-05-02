---
layout: post
title: Visual studio setting
---

* [언리얼 엔진용 Visual Studio 구성](https://docs.unrealengine.com/4.27/ko/ProductionPipelines/DevelopmentSetup/VisualStudioSetup/)

언리얼 엔진의 기본적인 세팅은 공식문서에 잘 설명되어 있습니다.

* [Visual studio 2019를 사용할 때 IntelliSense를 빠르게 하는 방법](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=ratoa&logNo=221950619537)   

1. VC++디렉터리의 포함 디렉터리의 내용을 NMake의 IntelliSense탭에 있는 포함 검색 경로에 복사해 붙여넣습니다.
2. NMAKE의 IntelliSense탭에 있는 추가 옵션에 [/Yu](https://docs.microsoft.com/ko-kr/cpp/build/reference/yu-use-precompiled-header-file?view=msvc-170) 옵션을 추가합니다.

원본 파일을 수정할 때마다 IntelliSense는 제공된 모든 경로를 검색하여 원본에서 만들어진 참조를 찾으려 하지만, 언리얼 엔진 프로젝트는 매우 크기가 크기때문에 모든 것들을 통과하는 데는 많은 시간이 걸립니다. 그러나 라이브러리 코드는 전혀 변경되지 않으므로 텍스트 편집기에서 검색할 필요가 없습니다. 모든 안정적인 코드가 포함된 미리 컴파일된 헤더 파일을 만들 수 있고 참조로 사용할 수 있도록 IntelliSense를 사용할 수 있습니다.

/Yu를 추가 옶션에 넣음으로써 IntelliSense에 미리 작성된 헤더 파일을 사용하도록 지시합니다.
(include했는데 식별자가 정의되지 않았다고 나오는 문제가 생길 수 있습니다.)

* [Visual studio에서 인텔리센스가 작동하지 않을때](https://forums.unrealengine.com/t/intellisense-stopped-working/384124/6)

1. 솔루션을 닫고 솔루션을 다시 만듭니다.
2. 인텔리센스를 다시 스캔합니다.

* [<> "" 차이](https://kinotion.tistory.com/453)

```cpp
#include "temp.h"
#include <temp.h>
```

""은 개발자가 구체적으로 지정해 놓은 결로에서 헤더 파일을 찾고, <>은 대게 시스템에서 가지고 있는 헤더파일을 include하는데 사용합니다.

따라서 ""은 구체적인 경로가 들어갈 경우도 있지만<>은 이미 경로를 컴파일러가 감지하고 있기 때문에 구체적 경로가 적히지 않는 것입니다.
