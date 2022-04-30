---
layout: post
title: Bublble, selection, insert sort
---

# 버블 정렬 알고리즘(Bubble sort)   
   
반복적으로 단계별로 살펴보고 인접 요소를 비교하고 교체 하는 간단한 정렬 알고리즘 입니다.
순서가 잘못된 경우, 목록을 통한 전달은 목록이 정렬될 때까지 반복됩니다.
이 알고리즘은 실제 사용 시 성능이 좋지 않으며 주로 교육 도구로 사용됩니다.

* 박스들이 연속적으로 놓여있는 상황에서 박스들을 순서에 따라 정리할려고 합니다.
정리가 끝날 때 까지 바로 순서대로 옆에있는 두 박스들의 순서를 보고 바꾸는 방법입니다.
이떄 정리는 못해도 박스의 갯수 안에 끝나게 됩니다.

* 탄산음료가 있을 때 무거운 액체와 기체는 서로 위치를 교체하며
가벼운 기체는 위로 올라가고, 무거운 액체는 아래로 내려갑니다.

? Computer의 입장에서 설명

시간복잡도 : O(n*n)
void bubbleSort(int array[], int arraySize)   
{   
    for(int endIndex = arraySize-1; endIndex > 0; --endIndex)   
        for(int nowIndex = 0; nowIndex < endIndex; ++nowIndex)   
        {   
            std::swap(array[nowIndex], array[nowIndex+1]);
        }   
}   

증명   
? 그림을 수식으로 설명 하기 어려움..
언젠가는 가능하지 않을까요?

활용   
사다리 타기   
메모리가 극단적으로 작은 경우(ex) RAM 1KB, 어떤 경우인지 모르겠음)

-----------------------------------

# 선택 정렬 알고리즘(Selection Sort)   

선택 정렬은 제자리 정렬 알고리즘중 하나입니다.
단순하며 사용할 수 있는 메모리가 제한적인 경우에 사용시 이점이 있습니다.
한번의 탐색에서 최솟값과 최댓값을 같이 찾는 이중 선택 정렬,
한번의 탐색 때 동일한 값이 있다면 함께 정렬하는 방법으로 
개선할 수 있습니다.   
선택 정렬 알고리즘은 주어진 리스트 중에 최소값을 찾고,
그 값을 맨 앞에 위치한 값과 교체합니다.
맨 처음 위치를 뺀 나머지 리스트를 같은 방법으로 교체합니다.

* 박스들이 보관되어 있는 창고가 있고 창고에 순서대로 정리할려고 합니다.
이때 박스들의 번호가 가장 작은 것을 찾아서 
첫번째 부터 차례대로 정리하는 방법입니다. 

* 

시간복잡도 : O(n*n)
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

증명   
?   

활용   

# 삽입 정렬 알고리즘(Insertion Sort)
삽입 정렬은 한 번에 한 항목씩 최종 정렬된 배열을 작성하는 간단한 정렬 알고리즘 입니다.
이는 quicksort, heapsort 또는 merge sort와 같은 고급 알고리즘 보다 큰 목록에서 훨씬 덜 효율적입니다.
* 그러나 삽입 정렬은 구현이 간단하며, 매우 작은 데이터 세트에 효율적입니다.
* 선택 정렬 또는 거품 정렬과 같은 대부분의 다른 간단한 2차 알고리즘 보다 실제로 더 효율적입니다.

* 책장에 책을 높이순대로 정리할 때 정리할 책을 꺼낸 후
오른쪽에서 부터 차례대로 한칸씩 밀어낸다음 
알맞은 위치에 책을 집어넣는 방법입니다.

j <- i   
while i < length(A)   
    j <- i   
    while j > 0 and A[j-1] > A[j]   
        swap A[j] and A[j-1]   
        j <- j - 1   
    end while   
    i <- i + 1   
end while   

시간복잡도 : O(n*n)   
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

증명   
?

활용   