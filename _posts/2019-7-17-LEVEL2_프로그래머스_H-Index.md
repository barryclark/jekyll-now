---
layout: post
title: LEVEL2_프로그래머스_H-Index
date: 2019-07-17
comments: true
categories: [Study, algorithm]
tags: [Javascript]
excerpt: H-Index는 과학자의 생산성과 영향력을 나타내는 지표입니다. 어느 과학자의 H-Index를 나타내는 값인 h를 구하려고 합니다. 위키백과1에 따르면, H-Index는 다음과 같이 구합니다.
---

### 문제

H-Index는 과학자의 생산성과 영향력을 나타내는 지표입니다. 어느 과학자의 H-Index를 나타내는 값인 h를 구하려고 합니다. 위키백과1에 따르면, H-Index는 다음과 같이 구합니다.

어떤 과학자가 발표한 논문 n편 중, h번 이상 인용된 논문이 h편 이상이고 나머지 논문이 h번 이하 인용되었다면 h가 이 과학자의 H-Index입니다.

어떤 과학자가 발표한 논문의 인용 횟수를 담은 배열 citations가 매개변수로 주어질 때, 이 과학자의 H-Index를 return 하도록 solution 함수를 작성해주세요.

### 풀이

```javascript
function solution(citations) {
  var answer = 0;
  let citationsPositive = citations.filter(e => e > 0);
  if (citationsPositive.length === 0) {
    return answer;
  }
  if (citationsPositive.length === 1) {
    return 1;
  }
  if (Math.min.apply(null, citationsPositive) >= citationsPositive.length) {
    return citations.length;
  }

  function finder(index) {
    let citedMoreThan = citationsPositive.filter(e => e >= index);
    if (citedMoreThan.length >= index) {
      answer = index;
    } else {
      finder(index - 1);
    }
  }
  finder(citationsPositive.length);
  return answer;
}
```

<br>

<div class='innerBox'>
이 문제는 문제를 잘못 이해해서 한참동안 삽질을 ㅠㅠ  </div>

<br>
<span class="reference">문제바로가기</span>

[H-Index](https://programmers.co.kr/learn/courses/30/lessons/42747)
