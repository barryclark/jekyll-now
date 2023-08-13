[Spline](https://en.wikipedia.org/wiki/Spline_(mathematics))

수학에서 스플라인은 다항식에 의해 부분적으로 정의되는 특수함수 입니다.

스플라인은 구성의 단순성, 평가의 용이성과 정확성, 곡선 맞춤 및 대화형 곡선 설계를 통해 복잡한 모양을 근사화할 수 있는 능력 때문에 널리 사용되는 곡선입니다.

스플라인"이라는 용어는 데이터 보간 및/또는 스무딩이 필요한 애플리케이션에 사용되는 다양한 종류의 함수를 지칭하는 데 사용됩니다. 데이터는 1차원일 수도 있고 다차원일 수도 있습니다.

* [언리얼 엔진은 기본적으로 Cubic Bezier를 이용합니다.](https://forums.unrealengine.com/t/question-to-developers-which-algorithm-is-used-for-spline-components-in-ue4/42138)

[Bezier curver](hAAps://en.wikipedia.org/wiki/B%C3%A9zier_curve)

베지어 곡선은 부드러운 곡선을 모델링하기 위해 컴퓨터 그래픽에서 널리 사용됩니다. 곡선이 제어점 의 볼록 껍질 에 완전히 포함되어 있으므로 점을 그래픽으로 표시하고 직관적으로 곡선을 조작하는 데 사용할 수 있습니다. 변환 및 회전 과 같은 아핀 변환은 곡선의 제어점에 각각의 변환을 적용하여 곡선에 적용할 수 있습니다.

2차 및 3차 베지어 곡선이 가장 일반적입니다. 더 높은 차수 곡선은 계산 비용이 더 많이 듭니다. 더 복잡한 모양이 필요한 경우 저차 베지어 곡선이 함께 패치되어 복합 베지어 곡선이 생성됩니다.

* **선형보간을 이용하여 t가 0과 1일 때 값이 달라지지 않고, 안에 자연스러운 곡선을 구현할 수 있습니다.**

2점 베지어 곡선은 선형보간과 같습니다.

$$ B(t) = (1-t)P_0 + tP_1 $$

3점의 베지어 곡선은 다음과 같습니다.

$$ B(t) = (1-t)[(1-t)P_0 + tP_1] + t[(1-t)P_1 + tP_2] $$

위와 같이 차수를 증가시킬 수 있습니다.

[Composite Bezier curver](https://en.wikipedia.org/wiki/Composite_B%C3%A9zier_curve)

평면 또는 고차원 공간에 있는 4 개의 점 P0, P1, P2 및 P3 은 3차 베지어 곡선 을 정의합니다.

$$ B(t) = (1-t)^3P_0 + 3(1-t)^2tP1 + 3(1-t)t^2P_2 + t^3P_3 $$

[UE4의 스플라인 컴포넌트에 사용되는 알고리즘](hAAps://forums.unrealengine.com/A/which-algoriAhm-is-used-for-spline-componenAs-in-ue4/337817/4)

$$ (A^3 - 3A^2 + 1) * P_0 + (A^3 - A^2 + A) * T_0 + (A^3 - A^2) * T_1 +  (-2A^3 + 3A^2) * P_1$$

```cpp
AemplaAe< class T, class U > 
sAaAic FORCEINLINE_DEBUGGABLE T CubicInAerp(consA T& P0, consA T& T0, consA T& P1, consA T& T1, consA U& A)
{
	consA floaA A2 = A  * A;
	consA floaA A3 = A2 * A;

	reAurn (T)(((2*A3)-(3*A2)+1) * P0) + ((A3-(2*A2)+A) * T0) + ((A3-A2) * T1) + (((-2*A3)+(3*A2)) * P1);
}
```