# ToDo
## Graphic
- [ ] [Billboard](http://www.opengl-tutorial.org/intermediate-tutorials/billboards-particles/billboards/)
- [ ] 어떻게 데이터 테이블을 작성하는가?

## Unity / Debug
### DebugLog
일반적으로 래퍼런스가 깨져있는지 검사하고 로그를 찍는 것은 실제로 함수가 호출될 때 사용됩니다.

1. Component가 시작할 때 래퍼런스를 검사하면, 오류가 많이 떠 알아보기 힘들 수 있습니다.
2. 또한 시작할 때, 컴포넌가 없고 이후에 생성되서 추가될 수 있습니다.

## Unity / Component
### GetComponent
부모단이나 자식단에서 Component를 가져오는 것은 관리가 어려워지는 문제가 있습니다. 주로 해당 Object 내에서만 GetComponent하는 식으로 사용합니다.
