---
layout: post
title: 코드리뷰 이용
---

## 좋은 질문 하기
[How do I ask a good question?](https://codereview.stackexchange.com/help/how-to-ask)

먼저, 질문의 의도대로 작동하지 않는 코드 또는 실제 코드가 아닌 경우 off-topic으로 질문이 닫히게 됩니다. 프로그래밍에 관련된 다른 질문이라면 [meta](https://codereview.stackexchange.com/help/how-to-ask)에 질문하는 것이 좋습니다.

* [질문의 의도대로 작동하지 않는 코드](https://codereview.meta.stackexchange.com/questions/3649/my-question-was-closed-as-being-off-topic-what-are-my-options/3650#3650)란 다른 종속성이 포함되어 있어서 컴파일 할 수 없거나, 실행 실패(충돌, 예외 발생, 코어 덤프, 세그폴트 등)의 상황, 분명히 잘못된 경과를 생성하는 경우(단위 테스트 케이스 실패 등)을 말합니다. 코드가 올바르게 작동할 때 훨씬 더 생산적일 수 있습니다.
    - 올바르게 작동하지만, 느려서 제대로 작동하지 않는 경우 "time-limit-exceed"태그를 이용할 수 있습니다.

* Stack Exchange사이트와는 달리 Code Review는 코드에 특정한 맞춤형 조언을 제공을 목표로 합니다. 그렇게 하기 위해서는 실제 코드가 필요합니다. [질문이 실제 코드가 아닌 경우](https://codereview.meta.stackexchange.com/questions/3649/my-question-was-closed-as-being-off-topic-what-are-my-options/3652#3652)는 의사 코드나 예제 코드(의미 있는 검토를 하기에는 너무 가설적인)로 간주되지 않아야 합니다.
    - 사용하는 언어를 선택하고 실제 작동하는 코드를 올려야 합니다.

* 당연한 이야기지만 도덕적, 실용적 및 법적 이유로 직접 작성한 코드만 컴토될 수 있습니다.

* 소프트웨어 엔지니어링에 관련된 질문인 경우 [softwareengineering](https://softwareengineering.stackexchange.com/)에 올리도록 합시다.

## 코드 질문 탬플릿

# 제목: 코드의 목표를 요약합니다. ex) 스윙 UI가 있는 인생 게임, 금연 iOS 앱용 뷰 컨트롤러

세부 정보: 누구나 알아 들을 수 있도록 명확하게 명시되어야 합니다. 즉 세부 정보가 구체적으로 제시되어야 합니다.

코드블럭 네임: 알아보기 쉽도록 합시다.
```
코드: 코드가 어떤 동작을 하는지 구체적인 설명이 있으면, 보다 좋은 리뷰를 받을 수 있습니다.
```

<!-- 테스트 및 동작: 이부분은 아직 잘 모르므로 생략합시다.-->

``태그: 코드의 배경을 제시할 필요가 있습니다. 챌린지의 경우는 (programming-challenge), 새로운 프로그래밍 언어를 배우고 있을때는 (beginner), 공용 라이브러리 기능을 연습용으로 의도적으로 다시 구현하는 경우(reinventing-the-wheel)과 같이 제공해야 합니다.``