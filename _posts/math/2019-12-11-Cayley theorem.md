---
layout: post
tags: math, combinatorics
title: Cayley’s theorem in combinatorics
use_math: true
date: 2019-12-11 04:21
excerpt_separator: <!--more-->
---



조합론에서의 Cayley's theorem은 완전그래프 $$K_{n}$$의 서로 다른 spanning tree가 $$n^{n-2}$$개라는 정리이다. 일반적으로는 그 쓰임보다도 아름다운 증명에 가치를 둔다. Functional graph를 알고 있다는 전제 하에 글을 작성했다.

<!--more-->

**Reference : Miklos Bona - [A Walk through Combinatorics]**

cf : $$[n] := \{1,\dots,n\}.$$



### Proof of the theorem (By A. Joyal)

$$K_{n}$$의 spanning tree의 개수를 $$t_{n}$$이라고 두고, $$n^{2}t_{n} = n^{n}$$임을 보인다.



**Definition.** 정점 $$n \ge 1$$개의 트리 $$T$$에서 정점 $$a, b$$를 골라 $$a$$를 start, $$b$$를 end로 부르자. ($$a=b$$를 허용한다)

이렇게 얻어진 $$n^{2}t_{n}$$개의 object $$(T,a,b)$$들을 Doubly-rooted tree라고 부른다.



이제 각각의 Doubly-rooted tree가 function $$f : [n] \to [n]$$ 하나에 대응됨을 보이자. $$f$$의 개수는 $$n^{n}$$개임을 알고 있으니 one-to-one correspondence만 보이면 문제가 해결된다. 그리고 그게 안 쉽다 ㅋㅋㅋ



$$f$$를 functional graph로 생각하면, $$[n]$$의 정점 중에서는 **cycle**에 속하는 원소들($${}^{\exists} i > 0 \ f^{i}(x) = x$$)이 있고, **cycle**에 속하지 않는 정점들은 마치 **tree**(혹은 **forest**)와 같은 구조를 띠고 있음을 관찰할 수 있다. 따라서 **doubly-rooted tree**에 대응되는 function $$f$$를 construct하기 위해서 **cycle part**와 **forest part**를 나누어 만들어보자.



Doubly-rooted tree $$(T,a,b)$$에서 $$a$$와 $$b$$를 잇는 path를 이용해서 **cycle part**를, path의 각 정점에 달린 subtree들을 이용해서 **forest part**를 만들어 줄 것이다.



**Cycle part**를 만드는 step은 약간 테크니컬하다. $$a$$와 $$b$$를 잇는 path를 $$a = p_{1},\dots,p_{k} = b$$라고 두자. 이 때 $$p_{1}, \dots, p_{k}$$를 번호 순으로 정렬하여 $$q_{1} < \cdots < q_{k}$$가 되도록 한 뒤 $$f$$의 $$\{q_{1},\dots,q_{k}\}$$에 대한 restriction이 되는 permutation $$\sigma$$를 $$\sigma(q_{i}) = p_{i}$$와 같이 주면 cycle part가 path의 형태에 따라 유일하게 결정되는 것을 알 수 있다.



**Forest part**는 더 간단하다. $$p_{1},\dots,p_{k}$$에 주렁주렁 달린 subtree를 **Cycle**에 그대로 달아주면 된다. 이러한 construction을 거꾸로 적용하면 임의의 functional graph에서 유일하게 doubly-rooted tree를 결정할 수 있음이 자명하다. 끝.



### Applications



#### Corollary. (Bona, 10.9)

> 정점이 $$n$$개인 **rooted forest**(각 connected component에 root가 있는 forest)의 개수는 $$(n+1)^{n-1}$$개이다.



##### Proof. 

Rooted forest에 새로운 정점 $$n+1$$을 추가하고, 모든 root를 $$n+1$$에 이어붙여서 크기 $$n+1$$의 unrooted tree를 만드는 bijection을 생각하면 자명.



#### Exercise. (Bona. 10-(6))

> 어떤 function $$f$$에 크기 2 이상의 cycle이 없다면 $$f$$를 acyclic function이라고 하자. $$[n]$$에서 $$[n]$$으로 가는 함수 중 acyclic function의 개수는 $$(n+1)^{n-1}$$개이다.



##### Proof. 

$$f(x) = x$$인 점들이 root가 되는 Rooted forest와의 bijection. 끝.



#### Prufer Sequence

트리 $$T$$의 Prufer sequence (Prufer code)는 $$T$$를 완전히 결정하는 길이 $$n-2$$의 수열로, 다음 시행을 $$n-2$$번 수행하여 얻어진다; 

> 번호가 가장 작은 leaf를 제거하고, 그 유일한 이웃을 적는다



이 때, 모든 $$[n]^{n-2}$$의 element는 어떤 tree의 Prufer sequence가 되고, Prufer sequence로부터 트리를 완전히 복원해낼 수 있음을 constructive하게 증명할 수 있다.



##### **Proof.** 

Prufer sequence에서 (각 수가 등장한 횟수) + 1 로 각 정점의 차수를 구할 수 있다. 이제 Prufer sequence에서 차수가 1인 정점 (leaf) 중 index가 가장 작은 정점 $$i$$를 찾고, 현재 Prufer sequence의 값 $$j$$와 $$i$$ 사이에 에지를 추가한 뒤 $$j$$의 차수를 1 감소시키는 과정을 반복하면 된다. 이 과정을 반복한 뒤에는 차수가 1인 정점이 두 개 남는데, 이 두 간선 사이에 에지를 이어주면 트리가 복원된다.



#### Parking function

$$1,\dots,n$$으로 표시되는 $$n$$개의 주차장과 $$n$$대의 차가 있다. $$f : [n] \to [n]$$에 대해, 각 차는 $$f(i)$$번 이하의 주차장에는 주차를 하지 않으며, $$1$$번 차부터 시작하여 $$i$$번 차는 $$f(i)$$번 주차장이 비어 있다면 $$f(i)$$번, 그렇지 않다면 $$f(i) + 1$$번, ... 을 반복하여 빈 주차장이 나올 때까지 주차장을 찾는다. 이 때 모든 차가 주차에 성공할 수 있다면 $$f$$를 parking function이라고 한다.



##### Number of Parking functions

$$[n]$$에 대한 Parking function의 개수는 $$(n+1)^{n-1}$$개.



**Proof.** 

Binomial theorem + Recursion으로 추하게 보일 수도 있지만, Pollak (1974)의 깔끔한 증명을 소개한다.

'Virtual parking lot' $$n+1$$을 추가하고, 주차장을 원형으로 만들어서 $$n+1$$번 주차장에 주차를 하지 못하면 다시 $$1$$번부터 주차장을 순회할 수 있도록 문제를 바꾸자. 이 경우에는 function이 어떻게 주어져도 주차가 가능한데, 이 과정에서 occupy되지 않는 단 하나의 주차장을 제거하면 다시 parking function을 만들 수 있다. Cyclic shift 하에 $$n+1$$개의 multiplicity가 존재하니, 답은 $$(n+1)^{n} / (n+1) = (n+1)^{n-1}$$.



**Problem.** Parking function과 Rooted forest 사이의 non-recursive bijection이 존재하는가?

**Proof.** 난 아직 모른다.



#### Further Reading

http://www-math.mit.edu/~rstan/transparencies/parking.pdf