---
layout: post
title: if and switch
---

# Switch문과 if문의 성능 비교
[Advantage of switch over if-else statement](https://stackoverflow.com/questions/97987/advantage-of-switch-over-if-else-statement)

**이와 관련된 자료들은 상당히 오래된 자료들입니다. 알아두기만 합시다.**

switch문이 점프 테이블을 만든다면, 조건이 몇개든 훨씬 빠르게 넘어 갈 수 있습니다.

## switch를 if보다 우선해서 사용해야 합니다.
최악의 경우 컴파일러는 if-else 체인과 동일한 코드를 생성하므로, 아무 것도 잃지 않습니다.

최상의 경우 최적화 프로그램은 코드를 생성하는 더 좋은 방법을 찾을 수 있습니다. 컴파일러가 하는 일반적인 작업은 이진 결정 트리(비교를 저장하고 평균적인 경우 점프)를 작성하거나, 단순히 점프 테이블(비교 없이 작동)을 작성하는 것 입니다.

**함수로 감싸기**
switch를 이용하여 작성할 수 있지만, 다음과 같이 가독성을 더 높일 수 있습니다. 
```cpp
bool IsError(ERROR Error)
{
    return Error | ErrorFlag;
}
```

**더 나아가**
특정 값에 대해 비트를 설정하여, 이용할 수 있습니다. 하지만, 이는 선택사항 입니다.

```cpp
const std::bitset<MAXERR> specialerror(initializer);
```

* 분기 테이블(branch table) 또는 점프 테이블(jump table)은 분기나 점프 명령어들을 이용해서, 프로그램의 제어를 프로그램의 다른 부분으로 옮기는 방법입니다. 주로 Switch문을 구현하는, 컴파일러에 의해 생성된 어셈블리어 프로그램에 사용됩니다.