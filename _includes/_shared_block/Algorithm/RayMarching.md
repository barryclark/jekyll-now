레이 마칭은 장면을 통과하는 빛의 경로를 추적하고 장면의 형상을 샘플링하여 카메라의 관점에서 볼 수 있는 물체와 표면을 결정함으로써 이미지를 생성하는 데 사용되는 3D 렌더링 기술입니다. 일반적으로 컴퓨터 그래픽에서 다각형 모델이나 기타 미리 정의된 기하학적 모양에 의존하지 않고 체적 효과, 안개 및 유리와 같은 복잡하고 매우 상세한 개체를 렌더링하는 데 사용됩니다.

광선 행진의 예는 체적 구름 또는 연기 효과의 렌더링입니다. 이 기술은 카메라에서 장면으로 광선을 추적하고 각 단계에서 해당 지점의 구름이나 연기의 밀도에 따라 광선의 위치를 ​​점진적으로 업데이트하는 방식으로 작동합니다. 이를 통해 많은 양의 다각형 데이터 없이도 복잡하고 사실적인 모양과 움직임을 만들 수 있습니다. 또한 레이 마칭은 프랙탈 모양과 추상적인 기하학적 형태를 렌더링하는 데 사용할 수 있으므로 컴퓨터 그래픽 및 실시간 렌더링 분야에서 널리 사용되는 기술입니다.

```cpp
#include <iostream>
#include <cmath>

constexpr int WIDTH = 800;
constexpr int HEIGHT = 600;
constexpr float MAX_DIST = 100.0f;
constexpr float MIN_DIST = 0.01f;
constexpr float EPSILON = 0.001f;

float sphereSDF(const float x, const float y, const float z,
                const float cx, const float cy, const float cz, const float r)
{
  return std::sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy) + (z - cz) * (z - cz)) - r;
}

int main()
{
  for (int j = 0; j < HEIGHT; j++) {
    for (int i = 0; i < WIDTH; i++) {
      float x = i / (float)WIDTH;
      float y = j / (float)HEIGHT;
      float z = 0;

      float dist = MAX_DIST;
      for (int k = 0; k < 64; k++) {
        dist = sphereSDF(x, y, z, 0.5f, 0.5f, 0.5f, 0.25f);
        z += dist;
        if (dist < MIN_DIST || z > 1.0f) break;
      }

      if (dist < MIN_DIST) {
        // shade the pixel
      }
    }
  }

  return 0;
}
```

이 코드는 3D 장면을 통해 간단한 광선 행진을 수행하고 광선이 구와 교차하는 경우 픽셀을 음영 처리합니다. 장면은 sphereSDF공간의 한 지점에서 구 표면까지 부호 있는 거리를 계산하는 함수로 정의됩니다. 함수는 이미지 의 main각 픽셀을 반복하고 광선 행진을 수행하여 각 단계에서 서명된 거리를 확인하고 그에 따라 광선의 위치를 ​​업데이트합니다. 부호 있는 거리가 특정 임계값보다 작으면 픽셀이 음영 처리되어 구와의 교차점을 나타냅니다. 이것은 매우 기본적인 예이지만 레이 마칭 기술이 작동하는 방식에 대한 아이디어를 제공해야 합니다.