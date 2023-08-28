
1. 일치하게 하고 싶은 서로 다른 두 본을 불러옵니다.
    * 임포트할때 옵션에서 Force Connect를 이용해 Bone의 Head와 tail이 연결되게 합니다.
2. 변경해야 하는 본들의 이름을 기준이 되는 본으로 변경하고, 계층 구조가 다를 경우 병합합니다.
    * 본을 그냥 삭제할 경우 버텍스 웨이트가 적용되지 않으므로, GitHub에서 blender-bones-merger를 찾아 AddOn을 설치합니다.
3. 두 본을 비교할 수 있게 본이 보이는 설정을 변경합니다.
    * 본의 이름을 변경하면 Vertex Group의 이름도 같이 변경됩니다.
4. 기준이 되는 본과, 변경해야 하는 본의 위치가 다를 수 있습니다. 이때 포즈모드로 들어가 본들을 일치시킵니다.
    * 본이 연결되어 있으므로 모든 본을 선택한 후 Parent/Clear/Disconnect parent하여 변경해야 하는 Bone의 head가 기준이 되는 본의 head로 가도록 수정합니다.
    * root 본 부터 Bone의 Constrait을 추가하여 (Stretch To)를 추가한 후 Head/Tail이 1로 길이는 오리지널로) 본의 Head 위치와 방향을 맞춥니다.
    * 잘못했을 경우 Pose/Clear Transform으로 수정할 수 있습니다.
    * 회전을 하면 하위본의 로테이션 값이 변경됩니다. Bone Constraint에 Copy Location을 추가하여 회전해도 해당 위치에 가도록 고정할 수 있습니다.
    * 맞게 설정하더라도 결국 버텍스 웨이트를 다시 해야할 수 있습니다. 이때 https://blender.stackexchange.com/questions/230491/trying-to-weight-paint-a-shoulder-so-that-the-arm-doesnt-clip-into-itself-any 와 같이 리깅과 관련된 내용을 찾아 수정하도록 합니다.

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/6673528b-45d7-44ca-be7c-6978197b1443)

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/8f0f272b-92bb-4459-b296-3f8b3e870d96)

