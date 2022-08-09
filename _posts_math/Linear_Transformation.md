---
layout: post
title: Linear Transformation
---

## Linear Transformation(선형 변환)

**선형 변환은 일반적으로 하나의 벡터 공간을 다른 벡터 공간으로 변환하는 함수**라고 할 수 있습니다. 이것이 가능한 이유는 선형 변환을 정의하는 두 특성이 변환 후에도 벡터 공간의 조건을 그대로 만족하기 때문입니다.

* 어떤 벡터를 회전한다고 이야기할 때는 반드시 두 얼만큼 회전할 것인가, 무엇을 기준으로 회전할 것인가를 이야기해야 합니다.

<details><summary>선형 변환과 행렬</summary>
<div markdown="1">

선형 변환 $$T$$가 벡터 공간 $$V$$를 다른 벡터 공간 W로 변환한다고 하면, 이때 $$V$$는 $$n$$차원, $$W$$는 $$m$$차원 벡터 공간이라고 하면 다음과 같이 쓸 수 있습니다.

$$ T:R^n \rightarrow R^m $$

$$V$$의 기저 벡터들에 선형 변환 $$T$$를 적용하는 것을 다음과 같이 표현합니다.

$$ 
\begin{align}
T(v) 
& = T(c_1 \cdot v_1 + c_2 \cdot v_2 + ... + c_n \cdot v_n)\\
& = c_1 \cdot T(v_1) + c_2 \cdot T(v_2) + ... + c_n \cdot T(V_n)
\end{align}
$$

기저 벡터 &&v&&를 변환된 벡터($$W$$)의 기저 벡터 $$w$$로 표현한 후, 이를 기저 벡터 $$w$$로 변환하면 다음과 같습니다.

$$
\begin{align}
c_1 (a_{1, 1}w_1 + a_{2, 1}w_2 + ... + a_{m, 1}w_m) + \\
c_2 (a_{1, 2}w_1 + a_{2, 2}w_2 + ... + a_{m, 2}w_m) + \\
... \\
c_2 (a_{1, 2}w_1 + a_{2, 2}w_2 + ... + a_{m, 2}w_m)
\end{align}
$$

이를 다시 기저 벡터 $$w_i$$ 중심으로 다시 전개할 수 있습니다.

$$
\begin{align}
(c_1a_{1, 1}+c_2a_{1, 2}+...+c_na_{1, n})w_1 + \\
(c_1a_{2, 1}+c_2a_{2, 2}+...+c_na_{2, n})w_2 + \\
... \\
(c_1a_{m, 1}+c_2a_{m, 2}+...+c_na_{m, n})w_m + \\
\end{align}
$$

기저 벡터 $$b_k$$에 곱해지는 값을 $$b_k$$로 정의한다면

$$
b_k=c_1a_{k, 1} + c_2a_{k, 2} + ... + c_na_{k, n}
$$

$$T(v)$$를 벡터 공간 $$W$$에 있는 벡터 $$w$$를 만들 수 있습니다.

$$
T(v)=b_1w_1 + b_2w_2 + ... b_mw_m = (b_1,b_2,...,b_m) = w
$$

열벡터를 행렬로 바꾸면 다음과 같이 표현될 수 있습니다.

$$
\begin{bmatrix}
b_1 \\ b_2 \\ ... \\ b_m
\end{bmatrix} =
\begin{bmatrix}
c_1a_{1, 1}+c_2a_{1, 2}+...+c_na_{1, n} \\
c_1a_{2, 1}+c_2a_{2, 2}+...+c_na_{2, n} \\
 ... \\
c_1a_{m, 1}+c_2a_{m, 2}+...+c_na_{m, n}
\end{bmatrix} =
\begin{bmatrix}
a_{1, 1} & a_{1, 2} & ... & a_{1, n} \\
a_{2, 1} & a_{2, 2} & ... & a_{2, n} \\
... \\
a_{m, 1} & a_{m, 2} & ... & a_{m, n}
\end{bmatrix}
\times 
\begin{bmatrix}
c_1 \\ c_2 \\ ... \\ c_n
\end{bmatrix}
$$

다시 이를 $$W$$의 기저 벡터에 대하여 $$m, n$$ 행렬 $$M$$으로 표현할 수 있습니다.

$$
w = M \times v
$$

3차원 공간의 유클리드 벡터에 대한 선형 변환을 다루므로 다음과 같이 표시할 수 있습니다.

$$
T:R^3 \rightarrow R^3
$$

$$
\begin{bmatrix}
b_1 \\ b_2 \\ b3
\end{bmatrix} =
\begin{bmatrix}
a_{1, 1} & a_{1, 2} & ... & a_{1, 3} \\
a_{2, 1} & a_{2, 2} & ... & a_{2, 3} \\
a_{3, 1} & a_{3, 2} & ... & a_{3, 3}
\end{bmatrix}
\times 
\begin{bmatrix}
c_1 \\ c_2 \\ c_3
\end{bmatrix}
$$

행벡터를 기준으로 한다면, 다음과 같이 적용됩니다.

$$
w^T = v^T \times A^T
$$

</div></details>

<details><summary>크기 변환(Scaling)</summary>
<div markdown="1">

크기 변환은 벡터에 대해서 크기만을 바꾸는 선형 변환이므로 다음과 같이 정의할 수 있습니다.

$$ T(v) = (a \cdot v_x,b \cdot v_y,c \cdot v_z) $$

3차원 공간의 기저벡터를 다음과 같다고 합니다.

$$ i = (1, 0, 0) $$

$$ j = (0, 1, 0) $$

$$ k = (0, 0, 1) $$

기저벡터에 앞의 크기만을 바꾸는 변환행렬을 적용합니다.

$$ T(i) = (a \cdot 1, b \cdot 0, c \cdot 0) = (a, 0, 0) $$

$$ T(j) = (a \cdot 0, b \cdot 1, c \cdot 0) = (0, b, 0) $$

$$ T(k) = (a \cdot 0, b \cdot 0, c \cdot 1) = (0, 0, c) $$

따라서 크기 변환은 다음 행렬의 모양을 가집니다.

$$
M = \begin{bmatrix}
T(i) & T(j) & T(k)
\end{bmatrix} = \begin{bmatrix}
a & 0 & 0 \\
0 & b & 0 \\
0 & 0 & c
\end{bmatrix}
$$

이를 이제 행렬 곱셈으로 표현 할 수 있습니다.

* 크기 변환에서 역행렬을 구하는 것은 주 대각 성분을 역수로 만들면 역행렬이 됩니다.

</div></details>

<details><summary>2차원에서 원점을 기준으로 회전</summary>
<div markdown="1">

<center><div markdown="1">

![2차원에서의 회전 행렬](https://gaussian37.github.io/assets/img/math/la/rotation_matrix/3.png)

</div></center>

두 점을 변환시키는 회전 행렬을 구할 때, 선형 변환을 구한다면, 

먼저 $$x, y$$가 다음과 같을 때

$$ x = l \cdot cos(\alpha) $$

$$ y = l \cdot sin(\alpha) $$

x 값에 대해서

$$ x = l \cdot cos(\alpha) $$

$$ x` = l \cdot cos(\alpha + \theta) $$

$$ x` = l \cdot ( cos(\alpha)cos(\theta) + sin(\alpha)sin(\theta) ) $$

$$ x` = x \cdot cos(\theta) + y \cdot sin(\theta) $$

y값에 대해서

$$ y = l \cdot sin(\alpha) $$

$$ y` = l \cdot sin(\alpha + \theta) $$

$$ y` = l \cdot ( sin(\alpha)cos(\theta) + cos(\alpha)sin(\theta) ) $$

$$ y` = y \cdot cos(\theta) + x \cdot sin(\theta) $$

이를 행렬식으로 표현하면 다음과 같이 적을 수 있습니다.

$$ x` = x \cdot cos(\theta) + y \cdot sin(\theta) $$

$$ y` = x \cdot sin(\theta) +  y \cdot cos(\theta)$$

$$ \begin{pmatrix} x' \\ y' \end{pmatrix} = \begin{pmatrix} \text{cos}\theta & -\text{sin}\theta \\ \text{sin}\theta & \text{cos}\theta \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} $$

</div></details>

주요 참고자료 : 수학으로 시작하는 3D 게임 개발