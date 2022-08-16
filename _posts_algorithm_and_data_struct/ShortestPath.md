---
layout: post
title: Floyd-warshall algorithm
---

- [ ] 크루스칼 알고리즘, 섬 연결하기

## 최소 신장 트리(MST, Minimum spanning tree)

[Minimum spanning tree](https://en.wikipedia.org/wiki/Minimum_spanning_tree)

정점(Vertex)의 집합 V와 가중치를 갖는 에지(edge)의 집합 E로 구성된 그래프 `G = <V, E>`가 주어질 때, 모든 정점을 연결하고 연결된 에지의 가중치 합이 최소인 트리 T를 구하는 방법입니다.

* 즉, 간선 가중치의 합이 가능한 한 작은 스패닝 트리입니다.

고전 알고리즘으로, Prim 알고리즘과 Kruskal의 알고리즘이 있습니다.

<details><summary>언제 사용하나요?</summary>
<div markdown="1">

**길이가 최소가 되는 것이 좋을 때**

실생활에서 찾아볼 수 있는 MST 문제의 예로 상수도관 네트워크 또는 도로 네트워크 설계가 있습니다. 상수도관 네트워크 설계의 겨우, 모든 사람에게 수돗물이 전달되어야 하고 전체 상수도관의 길이는 최소가 되는 것이 좋습니다. 이러한 문제를 해결할 때 최소 신장 트리가 적합합니다.

</div></details>

<details><summary>귀류법을 이용한 증명</summary>
<div markdown="1">

1. 그래프 $$G$$의 정점으로 구성된 최소 신장 트리 $$T$$가 있다고 가정하면, $$T$$에서 에지 $$e$$를 하나 선택하여 제거합니다. $$e$$를 제거하면 $$T$$가 더 작은 트리인 $$T_1$$과 $$T_2$$로 나눠집니다.
2. MST문제가 최적 부분 구조 속성을 갖지 않는다고 가정했으므로 $$T_1$$보다 작은 가중치를 갖는 신장 트리 $$T_1$$이 존재해야 합니다. 이 신장 트리 $$T_1$$과 $$T_2$$를 에지 $$e$$로 연결한 새로운 신장 트리를 $$T`$$이라고 하겠습니다.
3. $$T`$$의 전체 가중치가 $$T$$의 전체 가중치보다 작기 때문에 처음에 $$T$$가 최소 신장 트리라고 가정했던 가설이 틀리게 됩니다. 그러므로 MST문제는 최적 부분 구조 속성을 만족해야 합니다

* 귀류법이란 한 명제가 참인 것을 증며하려고 할 때에, 그 명제의 부정을 참이라고 가정하여 거기에서 나타나는 불합리성을 증명함으로써 원래의 명제가 참인 것을 보여주는 증명법이며 배리법이라고도 한다.

</div></details>

<details><summary>그리디로 선택</summary>
<div markdown="1">

MST문제가 그리디 선택 속성을 갖는다면 정점 v와 연결된 에지 중에서 최소 가중치 에지는 반드시 최소 신장 트리 T에 속해야 합니다. 귀류법을 사용하여 기 사설을 증명할 수 있습니다.

1. 정점 v에 연결되어 있는 에지 중에서 최소 가중치를 갖는 에지를 (u, v)라고 가정합니다.
2. 만약 (u, v)가 T에 속하지 않는다면 T는 v와 연결되어 있는 다른 에지를 포함해야 합니다. 이 에지를 (x, v)라고 가정합니다. (u, v)가 최소 가중치 에지이기 때문에 (x, v)의 가중치는 (u, v)의 가중치보다 커야 합니다.
3. T에서 (x, v)를 제거하고 (u, v)를 추가할 경우, 전체 가중치가 더 작은 트리를 얻을 수 있습니다. 이는 T가 최소 신장트리라는 가정에 위배됩니다. 그러므로 MST문제는 그리디 선택 속성을 만족해야 합니다.

</div></details>

## Floyd-Warshall (플로이드 와샬) 알고리즘

[Floyd-warshall algorithm](https://en.wikipedia.org/wiki/Floyd%E2%80%93Warshall_algorithm)

**양수 또는 음수 에지 가 있는 방향 가중 그래프 에서 최단 경로 를 찾는 알고리즘 입니다.**

최악의 경우, $$ |V|^3 $$의 시간복잡도를 가집니다.

* 알고리즘을 한 번 실행하면 모든 정점 쌍 사이의 최단 경로 길이(가중치 합계)를 찾을 수 있습니다.
* 경로 자체에 대한 세부 정보를 반환하지는 않지만 알고리즘을 간단히 수정하여 경로를 재구성할 수 있습니다.

<details><summary>Transitive closure</summary>
<div markdown="1">

[Transitive closure](https://en.wikipedia.org/wiki/Transitive_closure)...

컴퓨터 과학 에서 전이적 폐쇄의 개념은 도달 가능성 질문 에 답할 수 있도록 하는 데이터 구조를 구성하는 것으로 생각할 수 있습니다.

* 즉, Transitive closure란 간접적으로 연결되어 있는 간선을 직접갈 수 있는 간선을 추가한 그래프입니다.

</div></details>

<details><summary>어떻게 사용하나</summary>
<div markdown="1">

1. 정점에 대해 거리를 담을 목적으로 정점의 개수만큼의 정사각형 테이블을 만듭니다.
    - 따라서, 정점에 연결된 간선들에 대해서 입력해줍니다. 자기 자신은, 자기자신에게 가는 거리는 0이 됩니다.
2. **모든 정점에 대해서 거쳐갈 정점으로 정하고, 다음을 반복합니다.**
3. 모든 정점에 대해서 시작 정점으로 정하고, 다른 모든 정점에 대해서, 다음을 반복합니다.
4. 정점을 거쳐갔을 때, 필요한 거리가 더 짧다면, 해당 정점에서 해당 간선으로 가는 거리는 변경합니다.

위키피디아에서의 의사코드는 다음과 같습니다.

```
let dist be a |V| × |V| array of minimum distances initialized to ∞ (infinity)
for each edge (u, v) do
    dist[u][v] ← w(u, v)  // The weight of the edge (u, v)
for each vertex v do
    dist[v][v] ← 0
for k from 1 to |V|
    for i from 1 to |V|
        for j from 1 to |V|
            if dist[i][j] > dist[i][k] + dist[k][j] 
                dist[i][j] ← dist[i][k] + dist[k][j]
            end if
```

* k는 거쳐가는 노드, i는 정점, j는 (i, j)의 간선이 됩니다.

</div></details>

<details><summary>왜 거쳐갈 정점을 앞에 두는가?</summary>
<div markdown="1">

[Why is the order of the loops in Floyd-Warshall algorithm important to its correctness ?](https://www.quora.com/Why-is-the-order-of-the-loops-in-Floyd-Warshall-algorithm-important-to-its-correctness)

Floyd-Warshall 알고리즘에서 루프의 순서는 주어진 두 정점 사이의 거리를 찾는 횟수를 결정하기 때문에 중요합니다.

정점을 선택하고, 간선을 고른다음, 거쳐가는 정점을 계산할 때, 더 짧은 경로가 있을 수 있습니다.

**나머지 반복에서 선택했던 정점을 다시 선택할 수 없기 때문에, 거쳐가는 노드를 먼저 선택할 필요가 있습니다.**

</div></details>

<details><summary>간선 정보의 갱신</summary>
<div markdown="1">

![Wikipedia Example](https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Floyd-Warshall_example.svg/600px-Floyd-Warshall_example.svg.png)

해당 간선의 거리 정보는, 갱신되면, 경유하여 도달한 간선의 정보로 갱신됩니다.

따라서, 반복되어 더 짧은 거리로 갱신된다면, 해당 간선의 정보는 경유를 포함한 정보를 담게 됩니다.

</div></details>

<details><summary>모든 거쳐가는 노드, 모든 정점, 모든 홉</summary>
<div markdown="1">

```
for k from 1 to |V|
    for i from 1 to |V|
        for j from 1 to |V|
            if dist[i][j] > dist[i][k] + dist[k][j] 
                dist[i][j] ← dist[i][k] + dist[k][j]
            end if
```

위의 반복이, 모든 정점에 대해서 최단거리임을 나타내는 이유는, 어떻게 연결되어 있든, 모든 조합을 검사하기 때문입니다.

`간선 정보의 갱신`의 내용을 생각하면, 어느 순서로 조합하던, `A->B`, `B->...->C`를 조합하여, `A->B->...->c`의 정보를 검사합니다. 다만 최단거리가 아닌 경우, 간선 정보에 포함되어 있지 않을 뿐입니다.

</div></details>

<details><summary>프로그래머스 순위</summary>
<div markdown="1">

[프로그래머스 순위](https://school.programmers.co.kr/learn/courses/30/lessons/49191)

플로이드 워셜을 공부했으니, 이를 이용할 수 있는 문제를 찾아 풀어봤습니다.

* 인덱스가 문제입니다...

```cpp
#include <string>
#include <vector>

using namespace std;

int solution(int n, vector<vector<int>> ResultVector) {
    bool Table[100][100]{};

    // A 선수와 B 선수가 시합을 했다면, True를 입력합니다. 
    // ㅎ.... 40분동안 ....
    for(const auto& Result : ResultVector)
    {
        const int A = Result[0] - 1;
        const int B = Result[1] - 1;
        Table[A][B] = true;
    }

    // A선수가 B선수에게 이기고, B선수가 C선수에게 이기면, A선수는 C선수에게 이긴거와 같습니다.
    for (int B = 0; B < n; ++B)
        for (int A = 0; A < n; ++A)
            for (int C = 0; C < n; ++C)
            {
                if (Table[A][B] && Table[B][C])
                {
                    Table[A][C] = true;
                }
            }

    // Player가 A선수에게 이기거나 졌다는 것을 알 수 있습니다. 
    // 승패를 자기자신을 제외한 만큼 알 수 있다면, 순위를 정할 수 있습니다.
    int Answer = 0;
    for (int Player = 0; Player < n; ++Player) 
    {
        int Count = 0;
        for (int A = 0; A < n; ++A) 
        {
            if (Table[Player][A] || Table[A][Player])
                Count++;
        }

        if (Count == n - 1)
        {
            Answer++;
        }
    }
    return Answer;
}
```