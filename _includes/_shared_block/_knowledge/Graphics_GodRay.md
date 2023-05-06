GodRay는 빛이 산란할 때 오브젝트를 지나게 되면서 번지는 현상을 표현하는 것을 말합니다. 그중 Volumetric Light Scattering은 각 픽셀의 일루미네이션을 계산하기 위해 광원으로부터 픽셀까지의 산라을 계산하고 산란 매체가 차폐되었는지를 고려합니다.

태양광은 Daylight Scattering의 분석적 모델을 이용해 구합니다.

$$
L(s,\theta) = L_0e^{-\beta _ \alpha S} + 1 / \beta _ {ex} E_{sum}\beta_{sc}(\theta)(1-e^{-\beta_{ex}S}) 
$$

* $S$는 매체를 통해 이동하는 거리입니다.
* $\theta$는 광선과 태양 사이의 각도입니다.
* $E_{sun}$은 태양으로부터의 일루미네이션입니다.
* $\beta_{ex}$는 레일리 산란과 미 산란값으로 이루어지는 각 산란(angular Scattering)항 입니다.

* God Ray, Light Shaft, Crepuscular rays 등 다양한 용어로 표현되고 있습니다.
* 구현 방식에는 `Shadow Volume Algorithm (Modified) [MAX 1986]`, `Slice-based volume-rendering technique [Dobashi & Nishta & Yamamoto 2002]`, `Hardware Shadow Map [Mitchell 2004]`, `Polygonal Volume [James 2003 Based On Radomir Mech 2001]`, `Volumetric Light Scattering [Hoffman & Preetham 2003]`이 있습니다.