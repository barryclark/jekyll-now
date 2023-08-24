결과물과 추가적인 과제는 다음과 같습니다.

https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/4eb3acf3-549f-4093-bdf3-c77c7ba8103f

* 칼리브레이션 결과 본 스케일이 변경되므로, 머리가 실제보다 더 작게 표시됩니다.
* 관절이 심하게 꺽이는 부분이 있습니다.
* 손의 크기가 실제보다 더 큽니다.
* 어깨의 넓이와 상체 또한 칼리브레이션 해야 합니다.

개발환경은 다음과 같습니다.

* Unreal 5.2
* [엔진 플러그인 : VR IK BODY](https://www.unrealengine.com/marketplace/en-US/product/vr-ik-body)
* VIVE PRO 2

설치는 다음과 같은 순서로 했습니다.

1. 엔진 플러그인의 가이드에 따라 기본설정을 합니다. 이때, 새로운 폰을 만드는 것이 아니라, VR Pawn에 추가했습니다.
2. Offset 등을 수정하여 캐릭터와 사람을 일치시킵니다.
3. 솔버의 설정을 변경합니다.

구체적인 방법은 다음과 같습니다.

문서의 BeginPlay시 초기화 말고도 YnnkVrAvatar의 Tick을 활성화 시켜야 합니다.

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/e66acf7b-5629-490b-bcf3-dc2fb186d0ae)


Offset 등을 수정하여 캐릭터와 사람을 일치시켜야 합니다. 좌우 손의 오프셋을 다음의 값으로 수정합니다.

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/fdd6bbb3-1bc8-4bf8-b9e1-4c7aefa41535)

T-Pose로 칼리브레이션 하는 기능은 테스트를 위해 오른쪽 메뉴에 추가했습니다.

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/60ce8c43-78bd-4d3d-814a-5e5c819f2190)

IK Setting을 다음과 같이 변경하였습니다.

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/f55f5e85-b6ad-4c1a-8608-7b8771ac6f89)
