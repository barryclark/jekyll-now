---
layout: post
title: FABRIK algorithm
---

## Inverse Iknematics(IK)란? ##

컴퓨터 애니메이션 및 로봇 공학에서 역 운동학은 로봇 조작기 또는 애니메이션 캐릭터의 골격과 같은 운동학적 체인의 끝의 시작을 기준으로 주어진 위치 및 방향에 배치하는데 필요한 가변 관절 매개변수를 계산하는 수학적 프로세스입니다.

## FABRIK 알고리즘 ##

FABRIK는 forward and backward reaching inveerse kinematics의 약자로 역기구학 문제에 대한 매우 간단하고 빠르며 영리한 솔루션 입니다.

FABRIK의 절차는 다음과 같습니다.   
1. 라인과 타겟이 주어집니다.   
2. 라인의 헤드를 타겟두고 라인을 늘립니다.   
3. 라인의 테일을 길이에 맞게 슬라이드 합니다.   

```
Vector GetNewTailPosition(float length, const Vector& tail, const Vector& target)
{
    const Vector tailDirection = tail - target;

    const float stretchedLength = tailDirection.Length();
    const float scale = length / stretchedLength;
    
    return target + tailDirection * scale;
}
```

getTailPosition의 리턴값을 부모라인의 target으로 두어 위의 과정을 반복할 수 있습니다.



? normalize안하고 계산하는게 훨씬 빠르다. 여억시 알고리즘 인가?

? 구현 했다 오류가 있다. 부동소수점 오류 때문인가?

? IK문제에 대한 수치적 솔루션?? 야코비안 역 기법? 발견적 방법?

? 6개의 회전 관절에 대해서는 답이 있지만, 7개의 회전 관절에 대해서는 무한히 많고 분석 솔루션이 존재하지 않는다?

https://en.wikipedia.org/wiki/Inverse_kinematics 
   
https://morm.tistory.com/81 

https://sean.cm/a/fabrik-algorithm-2d 