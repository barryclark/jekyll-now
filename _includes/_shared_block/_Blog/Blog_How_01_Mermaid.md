[mermaid](https://mermaid-js.github.io/mermaid/#/), [mermaid setting](https://frhyme.github.io/mermaid/Embedding_mermaid_in_github_page/)

Mermaid는 마크다운 기반으로 그래프와 다이어그램을 그리기 위한 오픈 소스 자바스크립트 라이브러리입니다. Mermaid는 간단한 마크다운 문법을 사용하여 다양한 유형의 그래프와 다이어그램을 그릴 수 있습니다.

Mermaid를 사용하면 시퀀스 다이어그램, 클래스 다이어그램, 상태 다이어그램, 간트 차트, 플로우 차트 등 다양한 유형의 그래프와 다이어그램을 마크다운 문법으로 작성할 수 있습니다. 이러한 그래프와 다이어그램은 HTML, SVG 또는 캔버스를 사용하여 렌더링됩니다.

Mermaid는 브라우저에서 동작하며, 브라우저에서 Mermaid를 사용하여 마크다운 문서에 그래프와 다이어그램을 쉽게 삽입할 수 있습니다. 이를 통해 기술 문서 작성, 블로그 작성, 프로젝트 관리 등 다양한 분야에서 유용하게 사용됩니다.

* `mermaid `는 html에서 인코딩 되므로, mermaid을 Jekyll에서 빌드될 때, 변환되도록 만들어야 합니다. `<div class="mermaid"> ... </div>`를 이용하여 mermaid가 html에서 만들어 지도록 합니다.