
[언리얼로 보여주는 간단한 CCD IK 설명 블로그](https://3dmpengines.tistory.com/2053)

CCDIK (Cyclic Coordinate Descent Inverse Kinematics, 순환 좌표 하강 역운동학) 스켈레탈 컨트롤 노드는 경량 IK 솔버로 (FABRIK 과 비슷하며) 보통 본 체인 구동에 쓰입니다. 하지만 FABRIK 와 달리, CCDIK 는 솔브 도중 본의 회전을 제한하려는 경우 유용하게 쓰일 수 있는 각 컨스트레인트를 정의하는 기능을 제공합니다.

1. 루프 카운터를 0으로 설정합니다.
2. 체인의 마지막 링크부터 시작합니다.
3. 대상을 향하도록 이 링크를 회전합니다.
4. 체인을 아래로 이동하고 2단계를 반복합니다.
5. 기본 개체에 도달하면 대상이 이미 도달했는지 확인합니다. 도달했거나 루프 제한에 했으면 종료합니다. 아니라면 2단계 부터 시작합니다.

[SOLVING INVERSE KINEMATICS](https://disigns.wordpress.com/portfolio/solving-inverse-kinematics/)

![GIF](https://disigns.files.wordpress.com/2020/09/ccd_algo.gif?w=880)
