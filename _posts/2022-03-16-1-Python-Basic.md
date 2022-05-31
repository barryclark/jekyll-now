---
title: 02. Python Basic
author: Min
date: 2022-03-16
category: Jekyll
layout: post
---

Next you can update your site name, avatar and other options using the _config.yml file in the root of your repository (shown below).


파일 업로드
-------------

- 직접 업로드

```python
from google.colab import files
myfile = files.upload()

import io
import pandas as pd
data = pd.read_csv(io.BytesIO(myfile['house_price.csv']))
```

- 구글 드라이브에서 가져오기

```python
from google.colab import drive
drive.mount('/content/drive')

filename = '/content/drive/XXXXX.csv'
data = pd.read_csv(filename)
```

- 구글 드라이드에 install 하고 가져오기(colab)

```python 
#구글 드라이브에 install 해두기
import os, sys
from google.colab import drive
drive.mount('/content/drive')

my_path = '/content/drive/MyDrive/MIN_AI/additional_package'

!pip install --target=$my_path PyJWT

# 패키지 이용시
import sys
sys.path.append('/content/drive/MyDrive/MIN_AI/additional_package')
```

- 코랩 pip

```python
#설치
!pip install pandas-profiling mplstyle
#삭제 
!pip uninstall pandas-profiling
#upgrade > 런타임 다시시작
!pip install --upgrade pandas_profiling
#설치정보
!pip show pandas-profiling
pd.__version__
```

- 동영상 로딩하기

```python
from IPython.display import Image
Image('https://XXXXXXXXXXXXXXXX.jpg')
from IPython.display import YouTubeVideo
YouTubeVideo('0FswLjHeMUk', 600, 380)
from IPython.display import HTML
HTML('https://www.xxxxxxxx.co.kr/')
```


자료구조
-------------

- list(순서O, 집합) []

```python
mylist = []
mylist = ['1','2','3','4','5']
mylist = [[1,2,3],[4,5,6]]
mylist.append('')
mylist.remove('4')
mylist[2:]
len(mylist)
```
- tuple(순서O, 읽기 전용) ('','',','')

```python
mytuple = ()
mytuple = (1,2,3)
mytuple = (1,2,(3,4,5))
mytuple[1:]
```
- set(순서X, 중복X, 집합) 

```python
myset = set()
myset.add('1')
```
- dict(key, value로 이루어진 사전형 집합) {'aaa':'a', 'bbb':'b'} or mydict = dict()

```python
mydict = dict()
mydict['apple'] = 123
mydict['apple']

mydict = {'aaa':'a', 'bbb':'b'}
type(mydict)
```

형변환
-------------

- str→datetime : strptime(문자열, 형식)

```python
from datetime import datetime

str_datetime = '2021-07-18 12:15:33'
format = '%Y-%m-%d %H:%M:%S'
dt_datetime = datetime.strptime(datetime_str,format)
```

- 문자열로 변환

```python
now = datetime.now()

format = '%Y-%m-%d'
str_datetime = datetime.strftime(now,format)
```

- 응용

```python
#리스트 내포
[리스트[i] for i in range(10)]
```