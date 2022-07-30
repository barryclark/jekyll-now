---
layout: post
title: Linear algebra
---

* 수학은 어렵다, 항상 기억하자.
* 필요한 만큼의 조금만 더 공부하자.

# 성형 대수 (Linear Algebra)
선형 대수는 연립 1차 방정식, 행렬, 선형 변환, 벡터, 벡터 공간 등의 다양 한 주제들이 아주 오랜 시간 동안 각기 따로, 때로는 서로 썪이면서 연구되어 자연스럽게 선형 대수라는 이름 아래 모여 수학의 중요한 분야가 되었습니다.

* 흔히 3D 게임 프로그래밍에 관한 수학 이야기를 할 때 선형 대수와 밀접한 관련이 있다고 합니다.

<details><summary>선행 대수란, 대수(Algebra)와는 무엇이 다른가?</summary>
<div markdown = "1">

대수는 '대신하는 수', 즉 미지수와 그 미지수를 사용하는 수학인 대수학을 뜻합니다.대수는 x, y등의 기호로 표현되어 있는 미지수들로 이루어진 수식들을 풀어내는 수학입니다.

선형 대수도 미지수로 이루어진 수식을 다루는 수학인데, 선형성이 다릅니다.


* 선형성 또는 선형은 직선처럼 똑바른 도형, 또는 그와 비슷한 성질을 갖는 대상이라는 뜻으로, 이러한 성질을 갖고 있는 변환 등에 대하여 쓰는 용어입니다.
* 함수의 경우, 어떠한 함수가 진행하는 모양이 '직선'이라는 의미로 사용된다. 이러한 개념은 수학, 물리학 등에서 많이 사용됩니다.
* 수학, 물리학 등에서 많이 사용된다 합니다. 다른 말로 1차라고도 한다고 합니다.

</div></details>

<details><summary>언리얼 FRay 구조체</summary>
<div markdown = "1">

언리얼의 FRay를 보면, 원점과 방향으로만 이루어져 있습니다.

```cpp
/**
 * 3D Ray represented by Origin and (normalized) Direction
 */
class FRay
{
public:

	/** Ray origin point */
	FVector Origin;

	/** Ray direction vector (always normalized) */
	FVector Direction;

public:

	/** Default constructor initializes ray to Zero origin and Z-axis direction */
	FRay()
	{
		Origin = FVector::ZeroVector;
		Direction = FVector(0, 0, 1);
	}

	/** 
	  * Initialize Ray with origin and direction
	  *
	  * @param Origin Ray Origin Point
	  * @param Direction Ray Direction Vector
	  * @param bDirectionIsNormalized Direction will be normalized unless this is passed as true (default false)
	  */
	FRay(const FVector& Origin, const FVector& Direction, bool bDirectionIsNormalized = false)
	{
		this->Origin = Origin;
		this->Direction = Direction;
		if (bDirectionIsNormalized == false)
		{
			this->Direction.Normalize();    // is this a full-accuracy sqrt?
		}
	}


public:

	/** 
	 * Calculate position on ray at given distance/parameter
	 *
	 * @param RayParameter Scalar distance along Ray
	 * @return Point on Ray
	 */
	FVector PointAt(float RayParameter) const
	{
		return Origin + RayParameter * Direction;
	}

	/**
	 * Calculate ray parameter (distance from origin to closest point) for query Point
	 *
	 * @param Point query Point
	 * @return distance along ray from origin to closest point
	 */
	float GetParameter(const FVector& Point) const
	{
		return FVector::DotProduct((Point - Origin), Direction);
	}

	/**
	 * Find minimum squared distance from query point to ray
	 *
	 * @param Point query Point
	 * @return squared distance to Ray
	 */
	float DistSquared(const FVector& Point) const
	{
		float RayParameter = FVector::DotProduct((Point - Origin), Direction);
		if (RayParameter < 0)
		{
			return FVector::DistSquared(Origin, Point);
		}
		else 
		{
			FVector ProjectionPt = Origin + RayParameter * Direction;
			return FVector::DistSquared(ProjectionPt, Point);
		}
	}

	/**
	 * Find closest point on ray to query point
	 * @param Point query point
	 * @return closest point on Ray
	 */
	FVector ClosestPoint(const FVector& Point) const
	{
		float RayParameter = FVector::DotProduct((Point - Origin), Direction);
		if (RayParameter < 0) 
		{
			return Origin;
		}
		else 
		{
			return Origin + RayParameter * Direction;
		}
	}


};
```

</div></details>

<details open><summary>이론들</summary>
<div markdown ="1">

## 체 (Field)
체(體, 독일어: Körper, 프랑스어: corps, 영어: field)는 추상대수학에서 사칙연산이 자유로이 시행될 수 있고 산술의 잘 알려진 규칙들을 만족하는 대수 구조입니다. 모든 체는 가환환이지만, 그 역은 성립하지 않습니다. 체를 연구하는 추상대수학의 분야를 체론(體論, 독일어: Körpertheorie, 프랑스어: théorie des corps,영어: field theory)이라고 합니다.

간단히 말하면 대수적 구조의 하나로, 간단히 말해 덧셈, 뺄셈, 곱셈, 나눗셈의 사칙연산을 집합 안에서 소화할 수 있는 집합을 의미합니다. 

* 연산을 통해 나온 값 또한 해당 집합의 원소여야 한다는 뜻입니다. 

가장 간단한 체의 예시로는 유리수의 집합, 실수의 집합, 복소수의 집합이 있습니다. 그래서 이들이 체라는 것을 강조하고 싶을 때에는 각각 유리수체, 실수체, 복소수체라고 부르기도 합니다.

$$  유리수의\ 집합 \bar{\mathbb Q},\ 실수의\ 집합\ \bar{\mathbb R},\ 복소수의 집합\ \bar{\mathbb C} $$

## 선형성 (Linearity)
선형성(線型性, linearity) 또는 선형(線型, linear, 라틴어: linearis)은 직선처럼 똑바른 도형, 또는 그와 비슷한 성질을 갖는 대상이라는 뜻으로, 이러한 성질을 갖고 있는 변환 등에 대하여 쓰는 용어입니다. 

가산성(Additivity), 임의의 수 x, y에 대해 다음이 항상 성립하고 
$$ {\displaystyle f(x+y)=f(x)+f(y)} $$
동차성(Homogeneity), 즉, 임의의 수 x, a 대해 다음이 항상 성립하면
$$ {\displaystyle f(\alpha x)=\alpha f(x)} $$
f는 선형이라고 합니다.
$$ Linearity = Additivity \& Homogeneity $$

함수의 경우, 어떠한 함수가 진행하는 모양이 '직선'이라는 의미로 사용됩니다. 이러한 개념은 수학, 물리학 등에서 많이 사용됩니다. 다른 말로 1차(一次)라고도 한다. (단어 '1차' 자체는, '선형'을 의미하지 않는 경우도 많습니다.)

선형성을 만족하는 선형함수를 그리면 다음과 같습니다.
<center>

![linear function](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbLom8S1pXSF01lWfDZ0-I5UMNzCqXj05l6bLlDfL1TKSacy6OFZsocr8OwICw49rQg4o&usqp=CAU)
$$ f(x + y) = f(x) + f(y),\ f(ax) = af(x) $$

</center>

## 선형 결합 (Linear combination)
선형 결합(線型 結合, linear combination) 또는 일차 결합(一次 結合)은 수학에서 각 항에 상수를 곱하고 결과를 추가함으로써 일련의 항으로 구성된 표현식입니다.(예: x와 y의 선형 결합은 ax + by 형식인데 여기서 a와 b는 상수이다). 

$$ (상수) * (항) ... \rightarrow { ax + by } $$

* ax, by는 선형성을 가지고 있습니다.

V를 체 K 위의 벡터 공간이 되도록 한다. 우리는 평소와 같이 V 벡터 공간의 원소를 부르고 K 스칼라의 원소를 부른다. 만약 v1,...,vn이 벡터이고 a1,...,an이 스칼라인 경우에는

$$ { a, b } \rightarrow { a1, a2, ... a_n} $$

$$ { x, y } \rightarrow { v1, v2, ... v_n} $$

해당 스칼라와 계수의 선형 결합은 다음과 같습니다.

$$
{\displaystyle a_{1}\mathbf {v} _{1}+a_{2}\mathbf {v} _{2}+a_{3}\mathbf {v} _{3}+\cdots +a_{n}\mathbf {v} _{n}}{\displaystyle a_{1}\mathbf {v} _{1}+a_{2}\mathbf {v} _{2}+a_{3}\mathbf {v} _{3}+\cdots +a_{n}\mathbf {v} _{n}}
$$

## 유클리드 공간 (Euclidean space)
수학에서 유클리드 공간(영어: Euclidean space)은 유클리드가 연구했던 평면과 공간을 일반화한 것이다. 이 일반화는 유클리드가 생각했던 거리와 길이와 각도를 좌표계를 도입하여, 임의 차원의 공간으로 확장한 것이다. 이는 표준적인 유한 차원, 실수, 내적 공간이다.

<center>

![유클리드 공간](https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Coord_system_CA_0.svg/250px-Coord_system_CA_0.svg.png)

유클리드 공간은 기하학 원론의 저자인 유클리드 의 이름을 따온 공간으로, 우리가 살아가고 있는 3차원 공간을 포함해서 평면, 수직선은 물론 그 이상의 다차원 공간까지 표현하는 공간입니다.

</center>

## 벡터 공간 (Vector space)
* Vector field와 헷갈리지 말라고 합니다.

수학 , 물리학 및 공학 에서 벡터 공간 ( 선형 공간 이라고도 함 )은 벡터 라고 하는 요소를 함께 더하고 스칼라 라는 숫자로 곱할 수 있는 집합 입니다. 

* 스칼라는 종종 실수 이지만 복소수 또는 더 일반적으로 모든 필드 의 요소일 수 있습니다.
* 벡터 덧셈과 스칼라 곱셈 연산은 벡터 공리 라고 하는 특정 요구 사항을 충족해야 합니다.
* 실수 벡터 공간 이라는 용어및 복소수 벡터 공간 은 종종 스칼라의 특성을 지정하는 데 사용됩니다( 실제 좌표 공간 또는 복소 좌표 공간 ).

벡터 공간은 힘 과 속도 와 같이 크기뿐만 아니라 방향도 갖는 물리량 의 모델링을 허용하는 유클리드 벡터 를 일반화 합니다. 벡터 공간의 개념은 벡터 공간 에서 계산을 허용하는 행렬 의 개념과 함께 선형 대수학 의 기본입니다 . 이것은 선형 방정식 시스템 을 조작하고 연구하기 위한 간결하고 종합적인 방법을 제공합니다 .

벡터공간의 예로는 유클리드 공간이 있습니다. 벡터공간은 유클리드 공간을 추상화, 일반화해서 벡터 공간의 정의를 만들었기 때문입니다.

### 벡터공간이 왜 필요한가?
다음과 같은 문제들을 가정해 봅니다.

Problem 1: 선형 연립방정식을 푸는 x1, x2, x3 ∈ R 찾기

$$
3x1 + 2x2 + 0x3 = 8\\
1x1 + 0x2 + 1x3 = 2\\
2x1 + 3x2 + 8x3 = 7
$$

문제 1을 행렬 방정식으로 작성할 수 있습니다.

$$
\begin{pmatrix}3&2&0\\1&0&1\\2&3&8 \end{pmatrix} \begin{pmatrix}x_1\\x_2\\x_3 \end{pmatrix} 
= \begin{pmatrix}8\\2\\7 \end{pmatrix}
$$

열 행렬만 사용하여 작성할 수 있습니다.

$$
x_1 \begin{pmatrix}3\\1\\2 \end{pmatrix} + x_2 \begin{pmatrix}2\\0\\3 \end{pmatrix} + x_3 \begin{pmatrix}0\\1\\8 \end{pmatrix} = \begin{pmatrix}8\\2\\7 \end{pmatrix}
$$

열 행렬을 사용하면, 위의 문제는 다음 두 문제와 유사해 보입니다.

Problem 2: 다음과 같은 x1, x2, x3 ∈ R을 찾으십시오.

$$
x_1 (3t^2 + 5t - 2) + x_2 (0t^2 - t + 6) + x_3 (9t^2 + 0t + 1) = 6t^2 + 9t + 2
$$

문제 3은 물리학자가 상자 안의 입자의 운동량을 알고 그 에너지를 알고 싶다면 풀 수 있는 종류의 문제입니다.

Problem 3: 다음과 같은 x1, x2, x3, x4, ··· ∈ C를 구합니다.

$$
x_1 (sin(\pi t)) + x_2 (sin(2 \pi t)) + x_3 (sin(3 \pi t)) + ··· = e^(5it)
$$

* field(체, 값이 존재하는 집합, 채운다에서 나온 말인거 같은데, 찾아보면 나오겠지.)
* coefficients(계수)
* complex numbers(복소수, 복잡한 수, 실제 세계의 수와 다르게 곱하면 빙빙 회전하기 때문에)
* mathematical objects(수학적 대상, 수학적으로 풀어야할 문제들)

문제 1, 2, 3에는 특정 유형의 수학적 대상이 있습니다(열 행렬 문제 1, 문제 2의 다항식, 문제 3의 함수)

그리고 우리의 목표는 xi 계수에 대한 올바른 값을 찾아 방정식의 오른쪽에 있는 개체를 왼쪽에 있는 개체의 합으로 작성하는 것입니다.

대상에 숫자를 곱하고 더할 수만 있다면 모든 종류의 수학적 대상를 사용하여 이러한 유형의 문제의 예를 찾을 수 있습니다.

"수학적 대상의 유형"이 "열 행렬"이고 계수가 실수인 문제 1을 해결하는 방법을 이미 알고 있습니다. 그러나 문제 2와 3은 어떻게 해결합니까?

"수학적 대상의 유형"이 열 행렬 대신 다항식일 때 이러한 종류의 문제를 해결하는 방법을 배우는 데 몇 주 동안 수업 시간을 보내야 합니까? 그리고 다시 기능을 위해?

그리고 계수가 복소수와 같이 실수와 다른 수 체계에서 온 경우에는 어떻게 됩니까? 그것도 배우는 데 몇 주가 걸리나요?

좋은 소식은 우리가 같은 이론과 기술을 사용하여 이러한 종류의 모든 문제를 해결할 수 있다는 것입니다.

그러나 이러한 이질적인 유형의 수학적 대상에 적용되는 정리와 기술을 어떻게 말할 수 있습니까? 이러한 각 정리는 아래 문구로 시작합니까?

"열 벡터, 다항식, 함수 또는 숫자로 곱할 수 있는 다른 유형의 수학적 객체 모음이 있다고 가정합니다.
그리고 더해진..."

사실, 그렇습니다. 이것은 실제로 얼마나 많은 정리가 시작될 것인지입니다! 그러나 수학자들은
간결하게 표현하기 위해 벡터 공간이라는 용어를 발명하여 숫자를 곱하고 더할 수 있는 모든 유형의 수학적 객체를 의미합니다. 이런 식으로 정리는 위의 모호한 문구 대신 "V를 벡터 공간이 되게 하십시오..."라는 문구로 시작합니다.

### 벡터 공간 정의하기

벡터 공간에 대한 공식적인 정의를 내리기 전에 먼저 계수로 허용되는 숫자 필드의 개념을 정의해야 합니다(위의 문제 1과 2에서 R, 문제 3에서 C).

Definition: field는 a, b ∈ F이면 a + b, a − b, ab 및 a/b도 F에 있는 속성을 가진 숫자 집합 F입니다(물론 b 6= 0이라고 가정 식 a/b).

Examples: 우리는 다음 숫자 집합을 더하고, 빼고, 곱하고, 나누는 방법에 익숙합니다.

$$
N = \{0, 1, 2, 3, . . . \} \\
Z = \{. . . , −3, −2, −1, 0, 1, 2, 3, . . . \} \\
Q = \{ a / b | a, b ∈ Z, b != 0 \} \\
R = all real numbers \\
C = {a + bi | a, b ∈ R}
$$

하지만, 이러한 모든 수에 대한 집합이 숫자 필드가 아닙니다. 예를 들어, 3과 5는 N에 있지만, 3 - 5는 아닙니다. 또한 3과 5는 Z에 있지만, 3 / 5는 아닙니다. 이것은 N과 Z가 숫자 필드가 아님을 보여줍니다. 하지만, Q, R, 과 C는 필드 숫자입니다.

여기에는 다른(기이한) 필드에 대한 에씨가 있습니다. 하지만, 이 클래스에서 field란 단어의 의미를 추정할 수 있을 겁니다. 각각의 Q, R 또는 C에 대해서요.

## 벡터 공간을 정의하는 6가지 조건

$$
Definition: A vector space consists of a set V (elements of V are called vectors), a field F (elements of F are called scalars), and two operations
• An operation called vector addition that takes two vectors v, w ∈ V ,
and produces a third vector, written v + w ∈ V .
• An operation called scalar multiplication that takes a scalar c ∈ F and
a vector v ∈ V , and produces a new vector, written cv ∈ V .
which satisfy the following conditions (called axioms).
1. Associativity of vector addition: (u + v) + w = u + (v + w) for all
u, v, w ∈ V .
2. Existence of a zero vector: There is a vector in V , written 0 and called
the zero vector, which has the property that u + 0 = u for all u ∈ V
3. Existence of negatives: For every u ∈ V , there is a vector in V , written
−u and called the negative of u, which has the property that u +
(−u) = 0.
4. Associativity of multiplication: (ab)u = a(bu) for any a, b ∈ F and
u ∈ V .
5. Distributivity: (a + b)u = au + bu and a(u + v) = au + av for all
a, b ∈ F and u, v ∈ V .
6. Unitarity: 1u = u for all u ∈ V .
$$

* axioms(공리)

다른 저자들은 벡터 공간을 다르게 정의합니다. 예를 들면, 코스 노트의 추가적인 두가지 공리의 정의는 두 벡터의 합은 반드시 벡터여야 합니다. 그리고 벡터와 스칼라의 곱은 벡터입니다.

추가적으로 앞에서 적었던 것처럼 이 공리는 정의의 부분입니다. 벡터의 덧셈과 스칼라 곱하기 연산에서요. 물론, 이러한 두가지 방법은 같은 정의를 만듭니다.

두 경우에서, 두 벡터의 더하기는 벡터며, 벡터에 스칼라를 곱하는 것은 반드시 벡터입니다.

이렇게 쓰는 것은 문제가 없습니다. 벡터 스페이스의 정의는 추상적인 논센스처럼 보입니다. 당신이 처음 본것처럼요. 하지만 이것은 전환시킵니다. 이미 많이 알고있는 벡터 공간 예제들로 부터요. 친숙한 것부터 보면 다음과 같습니다.

수식 옮겨적어야함.

이 경우 R 위의 벡터 공간이 되기 위한 조건이 충족되는지 확인합시다.

1. Associativity of vector addition

2. Existence of a zero vector is proven by showing that the all-zero column matrix satisfies
the conditions for being a zero vector:

3. Existence of negatives is proven by showing that for any column matrix v, the new column
matrix −v constructed by multiplying every entry of v by −1 satisfies the condition for
being the negative of v. That is, v + (−v) = 0:

4. Associativity of multiplication:

5. Distributivity:

and

6. Unitarity:

## 벡터 공간에 대한 더 많은 예제

## 벡터 공간에 대해 자주 하는 질문들

## 선형 변환 (Linear Transform)
선형 변환(線型變換, 영어: linear transformation, vector space homomorphism, linear function) 또는 선형 사상(線型寫像, 영어: linear map, linear mapping) 또는 선형 연산자(線型演算子, 영어: linear operator) 혹은 선형 작용소(線型作用素)는 선형대수학에서 선형 결합을 보존하는, 두 벡터 공간 사이의 함수입니다.


1. 선형 변환 ≒ 선형 사상 ≒ 선형 연산자 ≒ 선형 작용소
2. **선형 결합**을 보존하는, 두 벡터 공간 사이의 함수

<center>

![linear transformation](https://images.deepai.org/django-summernote/2019-04-04/4df66fb8-0097-459b-8dff-dbc14bd2b0dc.png)

</center>

위 그림에서 T는 transformation(변환)을 의미합니다. 선형 결합을 생각하면 조금더 쉽게 이해할 수 있을 거라 생각합니다. +는 선형 결합을 의미합니다.

</div></details>

선형 함수가 되기 위한 조건들을 만족하려면 함수가 반드시 1차여야 함을 알 수 있습니다. 2차 이상의 차수를 가진 수식에서 첫 번째나 두 번째 조건이 절대 만족할 수 가 없기 때문입니다.


주요 참고자료 : 수학으로 시작하는 3D 게임 개발, 위키피디아, [유클리드 공간이란](https://freshrimpsushi.github.io/posts/what-is-an-euclidean-space/), [What is a Vector Space? (작성한 사람도, 공유해준 사람도 감사할 따름...)](http://www.math.toronto.edu/gscott/WhatVS.pdf)