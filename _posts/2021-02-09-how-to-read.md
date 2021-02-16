---
layout: post
title: How to read + def
tags: [blog, python]
---

## 0. 함수가 뭐죠?

본 내용에 들어가기 앞서, 함수에 대해 먼저 설명하고자 한다.

함수는 반복해서 사용해야할 코드를 명령어 하나로 사용할수 있게 해주는

`유용한` 기능이다.

~~~python
def 이름(인자값,필수아님):
    실행될코드 # 인자값을 받아 사용이 가능하다.
    return 돌려줄 값 #이것역시 필수가 아니다.
~~~

단 파이썬 **예약어**의 경우는 사용하게 된다면 원 예약어를 사용할수 없게 되므로

조심하자.

## 1. 코드의 구조

만약 1000줄에 달하는 어마어마한 코드가 있다고 하자.

당연하게도, 모두 한줄한줄 읽어보려면 엄청난 시간이 들어간다.

하지만 우리가 배워볼것은 읽는 방법이다. 앞에서 시간이 많이 들어간다고

말했지만 그럼에도 읽는 법을 배우는 까닭은 바로 숙련도에 있다.

~~~python
if k == input():
    print(ok)
~~~

위와 같은 코드가 있을때, 처음에는

>만약 k가 입력값과 같다면
>>ok를 찍는 코드구나

라는 과정을 **생각하여** 지나가지만

많이 읽다보면 자연스럽게

>k 와 입력값을 비교해서 같으면 ok를 찍는다

한줄로, **물 흐르듯이** 읽을수 있게 될것이다.

## 2. 본격적으로 읽어보자

실습을 위해 직접 작성한 코드의 일부를 가져와 보았다.

~~~python
import pandas as pd 모듈을 불러오고, 별명을 pd로 붙인다.

pd.set_option('display.max.row', None) #이건 몰라도 된다.
pd.set_option('display.max.columns', None) #이것 역시..

def question():
    a = input('식품명과 입력값이 완벽하게 일치하나요? \
    아니면 모자라나요? 일치한다면 y, 진행하려면 n를 입력하세요\n>>>')
    if a == 'y' or a == 'yes' or a == 'Y':
        back_data = 'y'
        return back_data
    elif a == 'n' or a == 'no' or a == 'N':
        back_data = 'n'
        return back_data

sample_1 = pd.read_excel('food_list.xlsx',header=0,usecols='A:F',)
# 생략된 많은 코드들
find_food_name = sample_1

bk = question()

if bk == 'y':
    try:
        find_food_name = find_food_name[find_food_name['식품명'].str.contains(a)]
        find_food_name = find_food_name['에너지']
        print(find_food_name.index.tolist())
        print(find_food_name.values)
        kcal = find_food_name.values
        print('선택한 음식의 열량은',kcal,'kcal 입니다. 단위:100G당')
    except:
        print('잘못 입력하였습니다.')
# 생략된 많은 코드들
~~~

이 코드는 엑셀 파일을 읽어와 칼로리를 출력하는 코드이다.

물론 이 코드는 `pandas`라는 모듈을 불러와 사용하기에 잘 모른다면 해석이 불가능하다.

그 점을 생각하면서 읽어보자.

다음화에 코드와 해석을 첨부하겠다.

## 3. 무슨 뜻인지 모른다면

지금은 주석도 한국어로 되어있고, 짧은 편이지만

나중에는 이해조차 되지않는 코드들이 나온다.

그럴때는 앞뒤 코드들을 보고, 어떤 역할을 하는지 유추해 보자.

또한

![google](https://github.com/alfonso-john2021/alfonso-john2021.github.io/blob/master/_posts/image/2021-02-09-17-55-21.png?raw=true)

구글 검색을 이용하면 거의 모든 정보를 찾을수 있다.

만약 네이버를 사용한다면, 구글에서 먼저 찾아보자.

네이버 특성상 해외의 정보는 적은 편이다.

검색 결과에서 무엇이 좋은 정보인지 모르겠다면,

[이런](w3school) 사이트들의 링크들을 **먼저** 들어가보자.

필시 도움이 될것이다.

## 4. 마지막으로

나중에는 코드를 작성하는 양보다

코드를 읽고 가져오는 양이 많아진다..

미래를 위하여 열심히 연습해 두자.
