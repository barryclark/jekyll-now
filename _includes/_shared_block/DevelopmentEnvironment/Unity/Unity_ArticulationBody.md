
[물리 관절](https://docs.unity3d.com/kr/current/Manual/physics-articulations.html), [물리관절 데모](https://github.com/Unity-Technologies/articulations-robot-demo)

Unity의 ArticulationBody는 물리 시뮬레이션을 사용하여 부드러운 움직임을 만드는데 사용되는 컴포넌트입니다. ArticulationBody는 리지드 바디와 비슷하지만, 관절과 제한을 포함하여 관절로 연결된 복수의 볼륨을 가질 수 있습니다. 이러한 볼륨은 물리 엔진에 의해 서로 상호작용하며, 자연스러운 운동을 시뮬레이션합니다.

ArticulationBody는 일반적으로 로봇 및 기계 공학 시스템에서 사용됩니다. 로봇의 경우, 각 관절은 ArticulationBody로 표현됩니다. 각 ArticulationBody는 다른 부모와 자식 ArticulationBody와 연결되어 로봇의 동작을 표현합니다.

ArticulationBody를 사용하면 자연스러운 운동을 시뮬레이션하고 리얼타임 시스템의 반응성을 유지할 수 있습니다. 또한 ArticulationBody는 스크립트에서 제어할 수 있으므로, 개발자는 로봇 또는 기계 시스템의 동작을 제어하는 데 유용하게 사용할 수 있습니다.

ArticulationBody는 리지드 바디와 비슷한 방식으로 동작하지만, 다른 객체와 연결된 여러 개의 볼륨(콜라이더)을 가질 수 있습니다. 이러한 볼륨은 물리 엔진에서 부드러운 움직임을 만드는 데 사용됩니다.

따라서, 콜라이더를 직접 추가하는 것과 ArticulationBody를 사용하는 것은 목적에 따라 다릅니다. 만약 단순한 정적 물체인 경우, 콜라이더를 직접 추가하여 충돌 검사를 처리할 수 있습니다. 그러나 만약 자연스러운 움직임을 시뮬레이션하거나 물리적인 힘을 적용해야 한다면, ArticulationBody를 사용하는 것이 더욱 적합합니다.

ArticulationBody를 사용하면 물리적인 운동을 시뮬레이션하고 다른 객체와 상호작용하는 데 필요한 복수의 콜라이더를 간편하게 관리할 수 있습니다. 또한, ArticulationBody는 자동으로 관절과 제한을 설정하므로, 이를 수동으로 설정하는 것보다 효율적입니다.