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