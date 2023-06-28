Chameleon PostProcess입니다.

![녹화_2023_06_21_00_27_25_966](https://github.com/kbmhansungb/ourHome/assets/56149613/b04e84f5-492d-4cf2-b8ab-9cf632f0c50a)

![image](https://github.com/kbmhansungb/ourHome/assets/56149613/6929a15a-9796-4224-bd5a-fbaa7d4c4b35)

1. 왜곡된 Texture Coordinate를 구합니다.

![image](https://github.com/kbmhansungb/ourHome/assets/56149613/1bd04fa4-4292-4a92-9a4b-7d44a3df6c26)

2. 4개의 화면을 블렌드 합니다.

마지막 화면은 블렌드 강도에는 관혀하지만 화면에는 관여하지 않습니다. 이를 통해 좌우로는 깔끔하게 흔들리는 화면을 얻습니다.

블랜드 가중치는 가장 밝은 색을 선택한 후, 두 스크린을 블랜드 하여 구합니다. 색에 따라 다른 블렌드 값을 가지도록 합니다.

![image](https://github.com/kbmhansungb/ourHome/assets/56149613/7b24fb3e-7246-4ea9-b943-6f22c54f1901)
