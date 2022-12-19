---
layout: post
title: Integral
---

# 적분하는 방법
[C, C++ Integration](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=wldud0488&logNo=220828692107), [몬테카를로 적분](https://pjessesco.tistory.com/48)

## 직사각형 방법
직사각형 방법은 f(x)의 a~b구간을 n등분 하여 각 구간의 밑변을 h로 하고 그때의 함수 값을 높이로 하여 n개의 직사각형 넓이를 모두 더하는 방법입니다. 단점은 f(x)가 급격히 변화하는 그래프라면 정적분과의 오차가 심하게 납니다.

## 사다리꼴 방법
사다리꼴 방법은 f(x)의 a~b구간을 n등분 하여 각 구간의 밑변을 h로 하고 그때의 함수 값을 높이로 하여 n개의 사다리꼴 넓이를 모두 더하는 방법입니다. 직사각형 방법의 비효율을 사다리꼴을 통해 줄여주기 때문에 굉장히 효율적이지만, f(x)가 곡선 그래프일 경우 어느 정도 오차가 발생합니다.

## Simpson`s rule
심프슨 공식은 수치 해석에서 뉴턴-코츠 공식의 한 경우로, 토머스심프슨이 만든 적분법입니다. 이 법칙은 다음과 같은 적분식의 근사값을 구하는 데 쓰입니다.

## Monte Carlo Integration
[적분 방정식에 대한 솔루션을 계산하는 데 사용할 기술에 대한 몇 가지 기초](https://pbr-book.org/3ed-2018/Monte_Carlo_Integration)

이 이론은 맨해튼 프로젝트를 진행할 때 복잡한 적분식을 풀려고 고안되었습니다.