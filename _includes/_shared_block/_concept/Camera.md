[Camera Intrinsic/Extrinsic Parameters](https://xoft.tistory.com/11)

* Extrinsic Parameter는 3D 공간 내에서 카메라가 어디에 위치(3D Translation)하고 있고, 어디를 바라보고 있는지(3D Rotation)에 대한 Parameter입니다.
* Intrinsic Parameter는 카메라 렌즈와 센서 위치에 의해서 결정되어지는 항목으로써, 이미지 패널이 얼마나 이동(2D Translation)하고, 얼마나 확대하고(2D Scaling), 얼마나 기울어졌는지(2D Shear) 대한 Parameter입니다.
* Camera Calibration라는 용어가 있는데 이러한 Intrinsic, Extrinsic Paramter를 추정하는 과정을 의미합니다. (Calibration에 대해서는 다루지 않습니다.) 

[Camera Calibration](https://darkpgmr.tistory.com/32)

우리가 실제 눈으로 보는 세상은 3차원입니다. 하지만 이것을 카메라로 찍으면 2차원의 이미지로 변하게 됩니다. 이 때, 3차원의 점들이 이미지 상에서 어디에 맺히는지는 기하학적으로 생각하면 영상을 찍을 당시의 카메라의 위치 및 방향에 의해 결정됩니다. 하지만 실제 이미지는 사용된 렌즈, 렌즈와 이미지 센서와의 거리, 렌즈와 이미지 센서가 이루는 각 등 카메라 내부의 기구적인 부분에 의해서 크게 영향을 받습니다. 따라서, 3차원 점들이 영상에 투영된 위치를 구하거나 역으로 영상좌표로부터 3차원 공간좌표를 복원할 때에는 이러한 내부 요인을 제거해야만 정확한 계산이 가능해집니다. 그리고 이러한 내부 요인의 파라미터 값을 구하는 과정을 카메라 캘리브레이션이라 부릅니다.

[What are Intrinsic and Extrinsic Camera Parameters in Computer Vision?](https://towardsdatascience.com/what-are-intrinsic-and-extrinsic-camera-parameters-in-computer-vision-7071b72fb8ec)

이러한 외부 및 외부 매개변수는 한 좌표계에서 다른 좌표계로 점을 변환하는 변환 행렬입니다. 이러한 변환을 이해하려면 먼저 이미징에 사용되는 다양한 좌표계가 무엇인지 이해해야 합니다.
