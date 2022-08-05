---
layout: post
title: Bublble, selection, insert sort
---

# 버블 정렬 알고리즘(Bubble sort)
반복적으로 단계별로 살펴보고 인접 요소를 비교하고 교체 하는 간단한 정렬 알고리즘 입니다. 순서가 잘못된 경우, 목록을 통한 전달은 목록이 정렬될 때까지 반복됩니다.

* 이 알고리즘은 실제 사용 시 성능이 좋지 않으며 주로 교육 도구로 사용됩니다.

<details><summary>예시 코드</summary>
<div markdown="1">

1. 매 단계마다 처음부터 마지막까지 차례대로 인접한 두 원소를 비교하여, 뒤에 있는 원소가 앞의 원소보다 작은 경우 두 원소를 교환
2. 각 단계 수행 후 최댓값이 마지막으로 이동하므로, 마지막 원소는 정렬대상에서 제외
3. 만약 끝까지 가면서 교환이 일어나지 않았으면, 정렬되어 있는 것으로 봄

```cpp
void bubbleSort(int array[], int arraySize)   
{   
    for(int endIndex = arraySize-1; endIndex > 0; --endIndex)   
        for(int nowIndex = 0; nowIndex < endIndex; ++nowIndex)   
        {   
            std::swap(array[nowIndex], array[nowIndex+1]);
        }   
}  
```

> 탄산음료가 있을 때 무거운 액체와 기체는 서로 위치를 교체하며 가벼운 기체는 위로 올라가고, 무거운 액체는 아래로 내려갑니다.

<center>

![탄산음료](https://jhealthfile.joins.com/photo//2020/06/17/1343ca9175230.jpg)

</center>

* 시간복잡도 : O(n*n)

</div></details>

<details><summary>어디서 쓰나요</summary>
<div markdown="1">

* 메모리가 극단적으로 작은 경우(ex) RAM 1KB)사용한다라고 합니다.

* 박스들이 연속적으로 놓여있는 상황에서 박스들을 순서에 따라 정리할려고 합니다.
정리가 끝날 때 까지 바로 순서대로 옆에있는 두 박스들의 순서를 보고 바꾸는 방법입니다. 이떄 정리는 못해도 박스의 갯수 안에 끝나게 됩니다.

</div></details> 

# 선택 정렬 알고리즘(Selection Sort)
선택 정렬 알고리즘은 주어진 리스트 중에 최소값을 찾고, 그 값을 맨 앞에 위치한 값과 교체합니다. 맨 처음 위치를 뺀 나머지 리스트를 같은 방법으로 교체합니다.

* 선택 정렬은 제자리 정렬 알고리즘중 하나입니다. 단순하며 사용할 수 있는 메모리가 제한적인 경우에 사용시 이점이 있습니다.

* 한번의 탐색에서 최솟값과 최댓값을 같이 찾는 이중 선택 정렬, 한번의 탐색 때 동일한 값이 있다면 함께 정렬하는 방법으로  개선할 수 있습니다. 

<details><summary>예시 코드</summary>
<div markdown="1">

```cpp
void selectionSort(int array[], int arraySize)   
{   
    for(int nowIndex = 0; nowIndex < arraySize-1; ++nowIndex)   
    {   
        int minIndex = nowIndex;   
        for(int searchIndex = nowIndex + 1; searchIndex < arraySize; ++searchIndex)   
        {   
            if(array[searchIndex] < array[minIndex])   
               minIndex = searchIndex;   
        }   
        swap(array[minIndex], array[nowIndex]);
    }   
}   
```

> 책장을 정리한다고 생각해봅니다. 책장에서 가장 작은 책과, 앞에서 부터 차례대로 정리할 책을 선택하여 정리할 수 있습니다.
> 마지막으로 정리한 책장은 변수가 됩니다. 그리고 가장 작은 책을 찾는 행위는 반복문이 됩니다. 맨 앞에서 부터 작은 책을 교환하여, 끝에 도달할 때까지 반복합니다.

<center>

![책장 정리](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfP0s9axPj5kPfvXGCZgROhBG1CPWnleTJPaTiyaSAbg_o2Llt586Zp7bw9N8F-tAyB-0&usqp=CAU)

</center>

* 시간복잡도 : O(n*n)

</div></details>

<details><summary>어디서 쓰나요</summary>
<div markdown="1">

* 박스들이 보관되어 있는 창고가 있고 창고에 순서대로 정리할려고 합니다.
이때 박스들의 번호가 가장 작은 것을 찾아서 
첫번째 부터 차례대로 정리하는 방법입니다. 

</div></details> 

# 삽입 정렬 알고리즘(Insertion Sort)
삽입 정렬은 한 번에 한 항목씩 최종 정렬된 배열을 작성하는 간단한 정렬 알고리즘 입니다.

* 이는 quicksort, heapsort 또는 merge sort와 같은 고급 알고리즘 보다 큰 목록에서 훨씬 덜 효율적입니다. 그러나 삽입 정렬은 **구현이 간단**하며, 매우 작은 데이터 세트에 효율적입니다.
* 선택 정렬 또는 거품 정렬과 같은 대부분의 다른 간단한 2차 알고리즘 보다 실제로 더 효율적입니다.


<details><summary>예시 코드</summary>
<div markdown="1">

> 책장에 책을 높이순대로 정리할 때 정리할 책을 꺼낸 후 오른쪽에서 부터 차례대로 한칸씩 밀어내 알맞은 위치에 책을 집어넣는 방법입니다.

```cpp
void insertSort(int array[], int arraySize)   
{   
    for(int nowIndex = 0; nowIndex < arraySize; ++nowIndex)   
    {   
        for(int searchIndex = nowIndex; searchIndex > 0 && array[searchIndex-1] > array[searchIndex]; --searchIndex)   
        {      
            std::swap(array[searchIndex-1] > array[searchIndex]);
        }   
    }   
}   
```

* 시간복잡도 : O(n*n)

</div></details> 