---
title: Python Basic
author: MIn
date: 2022-03-16
category: Jekyll
layout: post
---

Next you can update your site name, avatar and other options using the _config.yml file in the root of your repository (shown below).

![_config.yml]({{ site.baseurl }}/images/config.png)

The easiest way to make your first post is to edit this one. Go into /_posts/ and update the Hello World markdown file. For more instructions head over to the [Jekyll Now repository](https://github.com/barryclark/jekyll-now) on GitHub.

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

- 동영상 로딩하기

```python
from IPython.display import Image
Image('https://XXXXXXXXXXXXXXXX.jpg')
from IPython.display import YouTubeVideo
YouTubeVideo('0FswLjHeMUk', 600, 380)
from IPython.display import HTML
HTML('https://www.xxxxxxxx.co.kr/')
```


Python 자료구조
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
