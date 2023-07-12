**Unity 엔진에서 WebGL 빌드를 하는 방법에 대해 다음과 같이 정리하고 있습니다.**

1. File → Build Settings를 선택합니다.
2. Platform에 WebGL을 선택합니다.
3. Scenes In Build에 추가할 Scene들을 추가합니다.
4. Player Settings를 열고, Resolution 및 Presentation 탭에서 스크린 사이즈 및 비율, 브라우저 탭 이름, 아이콘 등을 설정합니다.
5. Publishing Settings 탭에서 게임 실행 파일이 저장될 경로와 파일 이름을 설정합니다.
6. Build 버튼을 클릭합니다.
7. 저장될 경로와 파일 이름을 지정하고, 저장합니다.
8. Unity로 만든 게임을 웹 브라우저에서 실행할 수 있습니다.

위와 같은 절차를 따라 WebGL 빌드를 하면 Unity로 개발한 게임을 웹 브라우저에서 실행할 수 있습니다.

**Unity 엔진에서 만든 WebGL 게임을 GitHub Pages를 이용하여 웹 호스팅하는 방법에 대해 다음과 같이 정리하고 있습니다.**

1. GitHub에 새로운 repository를 만듭니다.
2. Unity에서 WebGL 빌드를 수행합니다.
3. 빌드된 파일들 중, index.html, Build 폴더, TemplateData 폴더를 GitHub repository에 추가합니다.
4. GitHub Pages를 이용하여 레포지토리를 웹 호스팅합니다.

자세한 절차는 다음과 같습니다.

1. GitHub에서 새로운 repository를 만듭니다.
2. Unity에서 WebGL 빌드를 수행합니다. 빌드된 파일들 중, index.html, Build 폴더, TemplateData 폴더를 레포지토리의 root 디렉토리에 추가합니다. 이때, Build와 TemplateData 폴더는 같은 위치에 있어야 합니다.
3. 레포지토리의 Settings 탭으로 이동하여, GitHub Pages를 이용하여 레포지토리를 웹 호스팅하도록 설정합니다.
4. 호스팅이 완료되면, 웹 브라우저에서 `https://<GitHub 계정 이름>.github.io/<레포지토리 이름>/`에 접속하면 게임을 실행할 수 있습니다. 

위와 같은 절차를 따라 GitHub Pages를 이용하여 Unity에서 만든 WebGL 게임을 웹 호스팅할 수 있습니다.