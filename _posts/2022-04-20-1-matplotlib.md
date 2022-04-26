---
title: 02-2. matplotlib
author: Min
date: 2022-04-20
category: Jekyll
layout: post
---


- __Matplotlib / api__ : [https://matplotlib.org/3.5.1/api/index.html](https://matplotlib.org/3.5.1/api/index.html)

Matplotlib is a comprehensive library for creating static, animated, and interactive visualizations in Python.

colab한글깨짐 
-------------
```Linux
!sudo apt-get install -y fonts-nanum
!sudo fc-cache -fv
!rm ~/.cache/matplotlib -rf

#런타임 재시작
import matplotlib.pyplot as plt
plt.rc('font', family='NanumBarunGothic')
```

기본함수
-------------
```python
#Graph 사이즈설정
plt.rcParams["figure.figsize"] = (가로,세로)
#데이터 넣어주기
data1 = np.arange(1,50)
plt.plot(data1)
#그래프를 보여주기
plt.show()
#새로운 그래프 생성
plt.figure(figsize=(12,6)) 
```

그래프 생성
-------------
- marker 참조 [https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.plot.html](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.plot.html)

```python
#2:행 1:열 1:순서
plt.subplot(2,1,1)
plt.plot(data)
plt.subplot(2,1,2)
plt.plot(data2)
#title
plt.title('타이틀', fontsize=20)
#label
plt.xlabel('x축', fontsize=20)
plt.ylabel('Y축', fontsize=20)
#x축 라벨의 각도
plt.xticks(rotation=90)
#범례설정
plt.plot(np.arange(10),np.arange(10)**2)
plt.plot(np.arange(10),np.log(np.arange(10)))
plt.legend(['10**2', 'log'],fontsize=15)
#그리드 옵션
plt.grid()
#이미지 저장
plt.savefig('test', dpi=300)
#Scatterplot - 산점도
x = np.random.rand(50)
y = np.random.rand(50)
color = np.arange(50)
area = x*y*1000
plt.scatter(x,y,s=area,c=color)
```
