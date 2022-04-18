---
layout: post
title: complexity
---

자료구조와 알고리즘을 평가하는 기준

1. 공간 복잡도(Space complexity) : 알고리즘에 사용되는 메모리 총량
2. 시간 복잡도(Time complexity) : 알고리즘에 수행되는 연산 횟수 총량

오늘날에는 공간 복잡도가 큰 문제가 되지 않음. 하지만 시간 복잡도는 자주 거론됩니다. 시간복잡도는 큰 데이터를 처리할 때 중요합니다.

시간복잡도를 계산할 때는 중요한 요소와 규칙이 있습니다.
중요한 요소는 반복문(for, while), 조건문(if), 재귀호출 입니다. 규칙은 시간복잡도에서 상수값은 무시되는 것과, 실제 개발자가 짜 놓은 코드를 수행하는 것은 상수 시간으로 간주합니다.

int get_sub(int arr[], int n)
{
    int sum = 0;
    int i = 0;
    for (i = 0; i < n; ++i)
    {
        sum += arr[i];
    }
    return sum;
}

공간 복잡도 = n + 3 = [] + (n, sum, i)
시간 복잡도 = n

int get_sum(int n)
{
    int sum = 0;
    int i;
    for (i = 1; i <= n; i *= 2)
        sum += i;

    return sum;
}

시간 복잡도 = log_2n

n이 1일때 1회(1) 실행되고, n이 2일때는 2회(1, 2), ... n이 9일때는 4회(1, 2, 4, 8, 16) 실행됩니다.

# 개인적인 연습입니다. # 

for문은 초기화, 조건, 증강의 loop를 가지고 있습니다.
매 반복마다 조건을 검사하고 조건을 충족하는 경우 반복하고자 하는 문장을 실행하고 증강후 다시 조건을 검사합니다.

for문의 증강 -> 조건 -> 반복문장으로 오게되는 상황을 나타내면 다음과 같습니다.   
i <= n   

위의 코드에 모델을 적용합니다. 이때 i는 매 증강마다 2배씩 증가하므로 다음과 같이 나타낼 수 있습니다. i는 시행횟수입니다.   
2^i <= n    
i <= log_2(n)    

최대 i값을 구하면 다음과 같이 작성할 수 있습니다.   
max(i) = log_2(n)입니다.   

기록 1. 이 생각이 맞는지 어떻게 확인하나?   

# 개인적인 연습 종료. #

이중 for문에서 다른 종속성이 없을 때 다음과 같이 생각할 수 있습니다.   
O(Full cycle) = O(Outer cycle) * O(Inner cycle)

int get_sum(int n)
{
    int sum = 0;
    int i, j;
    for (i = 1; i <- n; ++i) 
        for(j = 1; j <= i; ++j)
            sum += j;

    return sum;
}

시간 복잡도 = n (n + 1) / 2

int get_sum(int n)
{
    int sum = 0;
    int i, j;
    for (i = 1; i <= n; ++i)
        for (j = 1; j <= i; i*=2)
            sum += j;

    return sum;
}

시간 복잡도 = n log_2(n)

빅-오 표기법(Big-O Notation)
시간복잡도와 공간복잡도의 최고차항만을 표기하여 간략하게 나타내는 표기법입니다.