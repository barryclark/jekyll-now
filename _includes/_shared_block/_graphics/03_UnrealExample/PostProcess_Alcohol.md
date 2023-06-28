Chameleon PostProcess입니다.

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/723ab4c7-8e1b-4c0c-bb12-65f65df9d028)

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/1d7d0e48-8825-4620-be4e-cf8e721fd423)

1. 왜곡된 Texture Coordinate를 구합니다.

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/4a6c0738-4f2e-4665-8103-c8c7f9a13529)

2. 4개의 화면을 블렌드 합니다.

마지막 화면은 블렌드 강도에는 관혀하지만 화면에는 관여하지 않습니다. 이를 통해 좌우로는 깔끔하게 흔들리는 화면을 얻습니다.

블랜드 가중치는 가장 밝은 색을 선택한 후, 두 스크린을 블랜드 하여 구합니다. 색에 따라 다른 블렌드 값을 가지도록 합니다.

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/419e0c70-3df2-4f33-ba74-04235863eee5)
