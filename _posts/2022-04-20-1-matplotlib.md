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
#subplots
# sharey:y축을 다중 그래프가 share
# tight_layout:graph의 패딩을 자동으로 조절하여 ift한 graph를 생성
fig, axes = plt.subplots(행,열,sharey=True,tight_layout=True)
axes.bar(x,y,0.5,align='center')
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
```

그래프 생성예제
-------------
- marker 참조 [https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.plot.html](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.plot.html)

```python
#Scatterplot - 산점도
x = np.random.rand(50)
y = np.random.rand(50)
color = np.arange(50)
area = x*y*1000
plt.scatter(x,y,s=area,c=color)
plt.scatter(x,y,s=area,cmap='blue',alpha=0.1)
#bar 형태 
plt.bar(x,y,align='center',color='red', alpha=0.7)
plt.barh(x,y,align='center',color='red', alpha=0.7)
#bar 2개 비교
x_label = ['ㅁㅁㅁ','ㅠㅠㅠ']
x = np.arange(len(x_label))
y = [1000, 2000]
y1 = [3000, 1500]
fig, axes = plt.subplots()
width = 0.35
axes.bar(x - width/2,y,width,align='center')
axes.bar(x + width/2,y1,width,align='center')
#lineplot
x = np.arange(0,10,0.1)
y = 1+np.sin(x)
y1 = 1+np.cos(x)
plt.plot(x, y)
plt.plot(x, y1)
#areaplot
x = np.arange(0,10,0.1)
y = 1+np.sin(x)
y1 = 1+np.cos(x)
y2 = y*y1/np.pi
plt.fill_between(x,y,color='green',alpha=0.1)
plt.fill_between(x,y1,color='blue',alpha=0.2)
plt.fill_between(x,y2,color='red',alpha=0.3)
plt.plot(x,y,alpha=0.8) #경계선 진하게
#histogram
#density = 몇% 몰려있는지 (y축 Label이 %)
#cumulative = 누적분포
N = 10000
bins = 30
x = np.random.randn(N)
fig, axes = plt.subplots(1,3,sharey=False,tight_layout=True)
axes[0].hist(x, bins=bins, density=True, cumulative=True)
axes[1].hist(x, bins=bins*2, density=True)
axes[2].hist(x, bins=bins*4)
plt.show()
#piechart
#texts는 label 에 대한 텍스트 효과 
#autotexts는 파이 위에 그려지는 텍스트 효과

labels = ['컬럼1','컬럼2','컬럼3','컬럼4','컬럼5','컬럼6']
sizes = [20.4, 15.8, 10.5, 9, 7.6, 36.7]
explode = (0.3,0,0,0,0,0)

patches, texts, autotexts = plt.pie(sizes,
                                    explode=explode,
                                    labels=labels,
                                    autopct='%1.1f%%',
                                    shadow=True,
                                    startangle=90)

# label 텍스트에 대한 스타일
for t in texts:
  t.set_fontsize(12)
  t.set_color('gray')

# pip 위의 텍스트에 대한 스타일
for t in autotexts:
  t.set_fontsize(18)
  t.set_color('white')

plt.show()

#boxplot
#자료만들기
spread = np.random.rand(50) * 100
center = np.ones(25) * 50
flier_high = np.random.rand(10) * 100 + 100
flier_low = np.random.rand(10) * -100
data = np.concatenate((spread,center,flier_high,flier_low))

outlier_marker = dict(markerfacecolor='r', marker='D')
plt.boxplot(data, flierprops=outlier_marker, vert=False)
plt.tight_layout()
plt.show()
```
박스 플롯

![박스 플롯](https://justinsighting.com/wp-content/uploads/2016/12/boxplot-description.png)