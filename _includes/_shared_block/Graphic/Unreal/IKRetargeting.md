[Unreal Doc : IK Rig Retargeting](https://docs.unrealengine.com/5.0/en-US/ik-rig-animation-retargeting-in-unreal-engine/)

메타휴먼 IK를 보면 세가지로 구성되어 있습니다. 1. 리타겟 루트는 골반으로 설정되어 있으며 2. 척추, 팔, 발, 머리 리타겟팅 체인과 3. FullBody IK 그리고 4. 세부적인 리타겟팅 체인으로 되어있습니다.

* [Youtube : Unreal Engine 5 Tutorial - Animation Retargetting](https://www.youtube.com/watch?v=5Or8yQ_QecQ)을 참고하여 말하면, Mixamo 애니메이션을 적용할 때 메타휴먼만큼 세부적일 필요가 없을 수도 있습니다.

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/0be3bde5-8976-40c0-9e20-9a07b0ca4b48)

척추, 발, 팔, 머리 리타겟팅 체인은 다음과 같이 척추들로, 팔은 어깨를 나누지 않는다면 어깨부터 손까지, 발은 허벅지부터 발까지, 머리는 목부터 머리까지 시작본과 앤드본으로 묶습니다.

또한 FullBody IK는 루트를 솔버의 루트로 하여 각 손과 발에 IK 골로 정합니다.

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/c9efc626-3a1c-49ce-a43a-b6ed98635a2e)

세부적인 본의 경우 손가락 들을 각각 시작과 끝으로 하나의 체인으로 두고, 어깨나 관절 뒤틀림을 표현하기 위한 본의 경우 각각 별도의 체인으로 관리합니다.

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/c59a5cc5-7fdd-4d85-be9e-5ad5462ec2e2)
