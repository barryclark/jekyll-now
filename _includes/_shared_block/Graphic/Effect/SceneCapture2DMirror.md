씬캡쳐를 이용한 거울 효과를 구현하는 방법입니다.

https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/9d0a52ec-1f09-44f5-b5fb-a045ee17e1ec

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/0edec30c-acc4-4b24-a145-1369496769d4)

1. 거울이 정면을 바라보도록 맞춘 후, 텍스쳐의 좌우가 반전되어 그려지도록 합니다.
2. 씬캡쳐카메라가 거울이 보여주어야 하는 부분을 그리도록 설정합니다.
    * 거울의 평면에서 입사각과 반사각이 동일하게 반사됩니다.
    * 카메라가 거울에 반사되는 영역 전부를 그리도록, 왼쪽 끝점의 반사벡터와, 오른쪽 끝점의 반사벡터의 교점에 위치시키고, 거울의 중앙을 바라봅니다.
    * 카메라의 Field of view는 양 끝점의 벡터의 각도입니다.

다음은 거울이 정면을 바라보도록 맞춘 예시와, 머티리얼에서 텍스쳐의 좌우가 반전되어 그려지도록 하는 방법입니다.

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/4143c7d3-5430-459e-b5c6-45d47c92f2e9)

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/c3875ae6-e0f3-475e-9849-5f2c79ea3b3c)

씬캡쳐카메라가 거울이 보여주어야 하는 부분을 그리도록 설정합니다. 먼저 양끝점과 거울의 반사를 계산합니다. 또한 거울 뒤의 오브젝트들이 그려지면 안되므로, 씬캠쳐컴포넌트의 클리핑 평면을 설정합니다.

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/b49963f9-d01d-4019-b966-02abdeb3cdff)

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/fadf1903-09ef-4249-a68a-9ba64934bd27)

카메라가 거울에 반사되는 영역 전부를 그리도록, 왼쪽 끝점의 반사벡터와, 오른쪽 끝점의 반사벡터의 교점에 위치시키고, 거울의 중앙을 바라봅니다. 카메라의 Field of view는 양 끝점의 벡터의 각도입니다.

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/6ecc0640-881d-4d14-9f34-2e4de4cb1626)

추가적으로 크기 및 여러 거울을 배치하기 위한 작업을 합니다.

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/5156390a-997c-4991-a792-dfd2e5060dcf)

참고사항

* [두 벡터사이의 교점 구하기](https://math.stackexchange.com/questions/270767/find-intersection-of-two-3d-lines)
* [씬 캡쳐의 클리핑 평면을 이용하기 위한 설정](https://forums.unrealengine.com/t/scenecapturecomponent-custom-frustumstartdist/391684/3)
* [샘플 파일 Mirror.zip](https://github.com/kbmhansungb/kbmhansungb.github.io/files/12520169/Mirror.zip)

