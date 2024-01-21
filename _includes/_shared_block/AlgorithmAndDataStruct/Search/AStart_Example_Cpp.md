아래는 C++로 작성된 A* 알고리즘의 간단한 예제입니다. 이 예제에서는 2D 그리드에서 시작점에서 목적지까지의 최단 경로를 찾는 방법을 보여줍니다

```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <cmath>

using namespace std;

struct Node {
    int x, y; // 노드의 좌표
    int g; // 시작 노드에서 현재 노드까지의 비용 (실제 이동 거리)
    int h; // 현재 노드에서 목적지까지의 예상 비용 (휴리스틱 추정값)
    Node* parent; // 경로 추적을 위한 부모 노드

    Node(int x, int y) : x(x), y(y), g(0), h(0), parent(nullptr) {}

    // A* 알고리즘에서 우선순위 큐에서 노드 비교를 위한 연산자 오버로딩
    bool operator<(const Node& other) const {
        return g + h > other.g + other.h;
    }
};

// 노드가 유효한지 확인하는 함수
bool isValid(int x, int y, int rows, int cols) {
    return x >= 0 && x < rows && y >= 0 && y < cols;
}

// A* 알고리즘 함수
vector<pair<int, int>> astar(vector<vector<int>>& grid, pair<int, int> start, pair<int, int> end) {
    int rows = grid.size();
    int cols = grid[0].size();

    // 방문 여부를 나타내는 2D 배열
    vector<vector<bool>> visited(rows, vector<bool>(cols, false));

    // 시작 노드 생성 및 초기화
    Node* startNode = new Node(start.first, start.second);
    startNode->h = abs(start.first - end.first) + abs(start.second - end.second);

    // 우선순위 큐를 사용하여 노드를 관리
    priority_queue<Node> pq;
    pq.push(*startNode);

    while (!pq.empty()) {
        // 현재 가장 낮은 예상 비용을 가진 노드 선택
        Node current = pq.top();
        pq.pop();

        // 목적지에 도달하면 경로를 추적하여 반환
        if (current.x == end.first && current.y == end.second) {
            vector<pair<int, int>> path;
            while (current.parent) {
                path.push_back({current.x, current.y});
                current = *(current.parent);
            }
            path.push_back({start.first, start.second});
            reverse(path.begin(), path.end());
            return path;
        }

        // 현재 노드를 방문했음을 표시
        visited[current.x][current.y] = true;

        // 이웃 노드들을 검사
        int dx[] = {1, -1, 0, 0};
        int dy[] = {0, 0, 1, -1};
        for (int i = 0; i < 4; i++) {
            int newX = current.x + dx[i];
            int newY = current.y + dy[i];

            if (isValid(newX, newY, rows, cols) && !visited[newX][newY] && grid[newX][newY] == 0) {
                Node* neighbor = new Node(newX, newY);
                neighbor->g = current.g + 1;
                neighbor->h = abs(newX - end.first) + abs(newY - end.second);
                neighbor->parent = &current;
                pq.push(*neighbor);
            }
        }
    }

    // 목적지에 도달하지 못한 경우 빈 경로 반환
    return vector<pair<int, int>>();
}

int main() {
    // 2D 그리드 맵 정의
    vector<vector<int>> grid = {
        {0, 0, 1, 0, 0},
        {0, 0, 1, 0, 0},
        {0, 0, 0, 0, 0},
        {0, 0, 1, 1, 0},
        {0, 0, 0, 0, 0}
    };

    pair<int, int> start = {0, 0};
    pair<int, int> end = {4, 4};

    vector<pair<int, int>> path = astar(grid, start, end);

    if (!path.empty()) {
        cout << "최단 경로:";
        for (auto& p : path) {
            cout << " (" << p.first << ", " << p.second << ")";
        }
        cout << endl;
    } else {
        cout << "목적지에 도달할 수 없습니다." << endl;
    }

    return 0;
}
```
