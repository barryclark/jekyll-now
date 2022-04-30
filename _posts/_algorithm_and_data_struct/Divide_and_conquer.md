---
layout: post
title: Divide and conquer
---

# 분할 정복 알고리즘(Divide and conquer)

그대로 해결할 수 없는 커다란 문제를 작은 문제로 분할하여 문제를 해결해 나가는 방법론으로,
재귀호출을 사용합니다.

## 합병 정렬 알고리즘 (Merge sort)   
정렬할 배열을 더 이상 나눠질 수 없는 배열로 나누어(Divide) 
배열 단위별로 정렬(Conquer)해 나가는 알고리즘 입니다.
존 폰 노이만에 의해 1945년에 개발되었습니다.

#define MAX ...
int tempArray[MAX];

void merge(int array[], int left, int mid, int right)
{   
    // compare and insert 
    int leftIndex = left;   
    int rightIndex = mid + 1;
    int tempIndex = left;     
    while (leftIndex <= mid && rightIndex <= right)   
    {   
        if (array[leftIndex] <= array[rightIndex])   
            tempArray[tempIndex++] = array[leftIndex++];   
        else   
           tempArray[tempIndex++] = array[rightIndex++];   
    }   

    // insert the rest   
    if (leftIndex > mid)   
    {   
        while(rightIndex <= right)   
            tempArray[tempIndex++] += list[rightIndex++];    
    }   
    else    
    {   
        while(leftIndex <= mid)   
            tempArray[tempIndex++] += list[leftIndex++];     
    }   

    // copy tempArray to array   
    for (int i = left; i <= right; i++)   
    {   
       array[i] = tempArray[i];   
    }   
}   

void merge_sort(int array[], int left, int right)   
{   
    if (left < right)   
    {   
        int mid = (left + right) / 2;   

        // partition   
        merge_sort(list, left, mid);   
        merge_sort(list, mid + 1, right);   

        // merge   
        merge(list, left, mid, right);   
    }            
}   

int main()   
{   
   int array[MAX] = {...}   
   merge_sort(array, 0, MAX - 1);   
}   

이거 시간복잡도 어떻게 구해야 해요????...
이걸 어떻게 활용한데요.

## 퀵 정렬 알고리즘(Quick sort)
기준값 (pivod)을 두어 작으면 왼쪽, 크면 오른쪽에 배치하는 행위를 반복하는 
Divide and conquer 방식의 정렬 알고리즘입니다.

1. Pivot을 기준으로 왼쪽은 left partition, 오른쪽은 right partition으로 잡습니다.
2. Partition의 맨 왼쪽 인덱스를 L, 오른쪽 인덱스를 R로 둡니다.
3. L는 정방향으로 이동하면서 원소를 차례대로 순회하되 Pivot보다 큰 수를 발견하면 멈춥니다.
4. R은 역방향으로 이동하면서 원소를 차례대로 순회하되 Pivot보다 작은 수를 발견하면 멈춥니다.
5. L과 R이 가리키는 원소들을 서로 바꿉니다.
6. L >= R이면 순회를 멈추고 Pivot과 L(혹은 R)을 서로 바꿉니다.
7. Partition이 더 이상 나뉘어지지 않을 때까지 Divide and conquer 방식으로 재귀호출을 실행하면서 1~7를 반복한다.

순서에 대한 정보가 없을 때 단일 요소를 선택하는 것보다 중앙값이 최적의 피벗을 더 잘 추정합니다.
음... 이유는 몰루.

void quickSort(int array[], const int& min, const int& max)   
{   
    int pivotIndex = right;
    int left = min;   
    int right = pivotIndex - 1;   

    while(left < right)   
    {   
        while (array[left] < array[pivotIndex])   
            ++left;   

        while (array[right] > array[pivotIndex])   
            --right;   

        if (left < right)   
            swap(array[left], array[right]);   
    }   
 
    if (left < pivotIndex)   
    {   
        swap(array[pivotIndex], array[right]);   
        pivotIndex = right;   
    }   

    if (pivotIndex - min > 1)   
        quickSort(array, min, pivotIndex - 1);      

    if (max - pivotIndex > 1)   
        quickSort(array, pivotIndex + 1; max);   
}   
