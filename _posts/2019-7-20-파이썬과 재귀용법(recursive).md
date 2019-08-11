---
layout: post
title: 파이썬과 재귀용법(recursive)
date: 2019-07-20
comments: true
categories: [Study, py]
tags: [Python, Recursive]
excerpt: 프로그램을 짜는 테크닉 중 하나인 재귀용법. 처음 Javascript를 공부하면서 재귀용법을 접했을 때 이해하기가 많이 힘들었던 기억이... 🤡
---

프로그램을 짜는 테크닉 중 하나인 재귀용법. 처음 Javascript를 공부하면서 재귀용법을 접했을 때 이해하기가 많이 힘들었던 기억이... 🤡 하지만 정말 유용하게 쓰이는 테크닉이다.

파이썬에서는?!

### 재귀용법

먼저, 재귀함수란 자기 자신을 다시 호출하여 작업을 수행하는 방식의 함수이다.
무한루프를 방지하기 위해서 재귀함수 내에서는 꼭! 종료조건을 정의해 주어야 한다.

재귀함수의 예시로, 구구단을 출력하는 함수를 만들어 보겠다.

```python
# 함수 정의
def multi_table_9(n):
    if n==0:
        print('end')
    else:
        print('9 * {} = {}'.format(n,9*n))
        multi_table_9(n-1) # 자기 자신(multi_table_9)을 호출

# 함수 실행
multi_table_9(9)
```

---

## 관련 포스트

[LEVEL2\_프로그래머스\_더 맵게](/study/algorithm/LEVEL2_프로그래머스_더-맵게/)
