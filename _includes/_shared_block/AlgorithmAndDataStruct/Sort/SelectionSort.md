선택 정렬 알고리즘은 주어진 리스트에서 최소값을 찾아 그 값을 리스트의 맨 앞 값과 교체하는 방식으로 정렬하는 알고리즘입니다. 이 알고리즘은 제자리 정렬 알고리즘 중 하나로, 단순하면서도 메모리 사용이 제한적인 경우에 유용합니다.

한 번의 탐색으로 최솟값과 최댓값을 동시에 찾는 이중 선택 정렬과, 동일한 값이 있을 경우 함께 정렬하는 방법으로 개선할 수 있습니다. 시간복잡도는 O(n*n)입니다.

아래는 C++로 작성된 선택 정렬의 코드입니다.

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
        std::swap(array[minIndex], array[nowIndex]);
    }   
}
```

선택 정렬은 책장을 정리하는 것과 유사합니다. 가장 작은 책을 찾아서 앞에서부터 순서대로 정리하는 것처럼, 배열에서 최소값을 찾아 맨 앞에서부터 정리합니다. 이 과정을 반복하여 정렬을 완료합니다.