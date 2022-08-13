---
layout: post
title: Matrix
---

- [ ] (낮은 우선순위)행렬 사칙연산
- [ ] 수반 행렬(adjugate matrix)과 크로네커 델타(Kronecker delta)
- [ ] 백터와 행렬
- [ ] 전치 행렬과 수반 행렬 목차로 분리하기

## 행렬 (Matrix)
수학 에서 행렬 (복수형 행렬 )은 행과 열로 배열된 직사각형 배열 또는 숫자, 기호 또는 표현식의 표로 , 수학 개체 또는 이러한 개체 의 속성 을 나타내는 데 사용됩니다.

<details><summary>어떻게 생겼나요?</summary>
<div markdown="1">

행렬 안의 각 요소들은 보통 행과 열을 첨자로 해서 $$a_{row, column}$$이라고 표현합니다. 만약, 행과 열의 개수가 같다면 우리는 이를 정방 행렬(square matrix)이라고 말합니다. 또한, 모든 요소가 0인 행렬은 영 행렬(zero matrix)라고 합니다.

* Matrix는 라틴어로 자궁이라고 합니다. 실베스터는 행과 열을 가지고 행렬식을 산출한다는 점에 착안해서 지은 이름이라고 설명했습니다.

<center>

$$
M = (Matrix) = 
\begin{bmatrix}
 a_{1,1} & a_{1,2} & a_{1,3} \\
 a_{2,1} & a_{2,2} & a_{2,3} \\
 a_{3,1} & a_{3,2} & a_{3,3} \\
 a_{4,1} & a_{4,2} & a_{4,3}
\end{bmatrix}
$$

</center>

[위키피디아 행렬](https://en.wikipedia.org/wiki/Matrix_(mathematics)#Addition,_scalar_multiplication,_and_transposition)에서 사칙연산등의 구체적인 내용을 볼 수 있습니다.

원래 행렬의 각 요소 들의 행과 열을 뒤바꿔서 나온 결과를 전치 행렬(transpose matrix)라 합니다.

* 즉, $$A$$가 $$m \times n$$행렬이라면 $$A^T$$는 $$n \times m$$이 됩니다. 각 요소들은 $$a^T_{i,j}=a_{j,i}$$가 됩니다.

</div></details>

<details><summary>행렬식(Determinant)</summary>
<div markdown="1">

> 행렬식(Determinant)는 행렬과는 아무런 상관없이 먼저 연구되었습니다. 행렬식은 애초에 연립 1차 방정식의 해의 존재 유무를 파악하기 위한 판별식 형태로 시작했지만, 나중에 행렬식만으로도 해를 직접 구할 수 있다는 것이 밝혀졌습니다.

수학 에서 행렬식은 정방 행렬의 항목에 대한 함수 인 스칼라 값 입니다. 행렬의 일부 속성과 행렬이 나타내는 선형 맵 을 특성화할 수 있습니다.

<center><div markdown="1">

![2,2](https://wikimedia.org/api/rest_v1/media/math/render/svg/5b2e40d390e1d26039aabee44c7d1d86c8755232)

![3,3](https://wikimedia.org/api/rest_v1/media/math/render/svg/a891ca1b518ba39ff21a458c74f9cc74bcefb18c)

</div></center>

[Determinant](https://en.wikipedia.org/wiki/Determinant)에 구체적으로 설명 되어 있습니다.

이 방정식에서 2×2 행렬 의 각 행렬식을 행렬 A의 소수 라고 합니다 . 이 절차는 라플라스 전개 로 알려진 n×n 행렬 의 행렬식에 대한 재귀 정의로 확장될 수 있습니다.

[라플라스 전개](https://en.wikipedia.org/wiki/Laplace_expansion)의 내용을 참고할 수 있습니다.

</div></details>

<details><summary>역행렬</summary>
<div markdown="1">

> 선형 방정식계(system of linear equations) 혹은 선형계(linear system)에서 선형계를 푸는 다양한 방법중 가우스 소거법이 있습니다. 그리고 여기서 발전한 가우스-요르단 소거법(Gauss-Jordan Elimination)이 있습니다.
> 
> * 중요한 것은 가우스-요르단 소거법을 이용해서 역행렬을 구하는데 사용할 수 있습니다.

여인수들을 모두 모은 행렬과 **L의 전치 행렬을 곱하면** 항등행렬에 행렬식(deb(A))를 곱한 값이 나옵니다.

이떄 $$L^T$$를 A의 수반 행렬(adjugate matrix)이라고 하며 adj(A)라고 합니다.

<center><div markdown="1">

$$ A \times adj(A) = adj(A) \times A = deb(A) \cdot I $$
$$ A^{-1} = \frac{1}{deb(A)} \cdot adj(A) $$

</div></center>

이 식을 이용해 역행렬을 구할 수 있습니다.

* 게임 개발에 주로 쓰이는 3X3, 4X4 행렬의 경우 크레이머 공식을 이용하여 역행렬을 구하는 것이 더 빠르다고 합니다.

</div></details>


주요 참고자료 : 수학으로 시작하는 3D 게임 개발, 위키피디아