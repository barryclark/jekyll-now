

```python
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns

%matplotlib inline
%config InlineBackend.figure_format = 'retina'
```

This Dataset comes from the website data for everyone https://www.crowdflower.com/data-for-everyone/lists. Specifically I'm using a Sports Illustrated dataset that contains all the sports that have appeared on the cover of Sports Illustrated since 1955. Covers are grouped by year. Variables include American Football, Baseball, Basketball, Boxing and a number of other popular American sports. It spans the Sports Ilustrated covers from 1954-2013.


```python
df = pd.read_csv('./SI-Cover-by-Sport-DFE.csv')
df.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Unnamed: 0</th>
      <th>American football</th>
      <th>Baseball</th>
      <th>Basketball</th>
      <th>Bowling</th>
      <th>Boxing</th>
      <th>Cycling and Road Bicycle Racing</th>
      <th>Fencing</th>
      <th>Figure Skating</th>
      <th>Golf</th>
      <th>...</th>
      <th>Other team sports</th>
      <th>Skiing</th>
      <th>Snowboarding</th>
      <th>Soccer</th>
      <th>Surfing</th>
      <th>Swimming</th>
      <th>Tennis</th>
      <th>Track &amp; Field</th>
      <th>Wrestling</th>
      <th>Grand Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1954</td>
      <td>2</td>
      <td>2</td>
      <td>1.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>1.0</td>
      <td>...</td>
      <td>3.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>1.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>20</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1955</td>
      <td>7</td>
      <td>9</td>
      <td>NaN</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>NaN</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>2.0</td>
      <td>...</td>
      <td>2.0</td>
      <td>4.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>2.0</td>
      <td>1.0</td>
      <td>3.0</td>
      <td>NaN</td>
      <td>52</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1956</td>
      <td>8</td>
      <td>13</td>
      <td>1.0</td>
      <td>NaN</td>
      <td>1.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>1.0</td>
      <td>3.0</td>
      <td>...</td>
      <td>NaN</td>
      <td>2.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>2.0</td>
      <td>1.0</td>
      <td>4.0</td>
      <td>NaN</td>
      <td>53</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1957</td>
      <td>4</td>
      <td>9</td>
      <td>3.0</td>
      <td>NaN</td>
      <td>4.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>2.0</td>
      <td>...</td>
      <td>2.0</td>
      <td>3.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>2.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>52</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1958</td>
      <td>4</td>
      <td>12</td>
      <td>2.0</td>
      <td>NaN</td>
      <td>3.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>1.0</td>
      <td>4.0</td>
      <td>...</td>
      <td>5.0</td>
      <td>1.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>1.0</td>
      <td>2.0</td>
      <td>3.0</td>
      <td>2.0</td>
      <td>NaN</td>
      <td>52</td>
    </tr>
  </tbody>
</table>
<p>5 rows × 28 columns</p>
</div>




```python
df.shape
```




    (61, 28)




```python
df.dtypes
```




    Unnamed: 0                          object
    American football                    int64
    Baseball                             int64
    Basketball                         float64
    Bowling                            float64
    Boxing                             float64
    Cycling and Road Bicycle Racing    float64
    Fencing                            float64
    Figure Skating                     float64
    Golf                               float64
    Horse Racing                       float64
    Ice hockey                         float64
    Indianapolis 500                   float64
    Kayaking                           float64
    Mixed martial arts                 float64
    NASCAR                             float64
    Other individual sports            float64
    Other motor sports                 float64
    Other team sports                  float64
    Skiing                             float64
    Snowboarding                       float64
    Soccer                             float64
    Surfing                            float64
    Swimming                           float64
    Tennis                             float64
    Track & Field                      float64
    Wrestling                          float64
    Grand Total                          int64
    dtype: object




```python
df.isnull().sum()
```




    Unnamed: 0                          0
    American football                   0
    Baseball                            0
    Basketball                          1
    Bowling                            58
    Boxing                             16
    Cycling and Road Bicycle Racing    51
    Fencing                            59
    Figure Skating                     46
    Golf                                3
    Horse Racing                       32
    Ice hockey                         12
    Indianapolis 500                   40
    Kayaking                           59
    Mixed martial arts                 58
    NASCAR                             51
    Other individual sports             9
    Other motor sports                 48
    Other team sports                  13
    Skiing                             37
    Snowboarding                       59
    Soccer                             46
    Surfing                            52
    Swimming                           33
    Tennis                             16
    Track & Field                      24
    Wrestling                          58
    Grand Total                         0
    dtype: int64



A brief look into the null values for each sport give us a good idea of the more popular sports in the US


```python
df.rename(columns={'Unnamed: 0' : 'Year'}, inplace=True)
```


```python
df.Year = pd.to_numeric(df.Year, errors = 'coerce')
```


```python
df = df.fillna(0)
```


```python
df.Baseball.value_counts()
```




    10     16
    9      10
    11      7
    13      6
    12      5
    8       4
    7       4
    6       3
    15      2
    597     1
    17      1
    5       1
    2       1
    Name: Baseball, dtype: int64




```python
plt.figure(figsize=(8,5))
sns.countplot(x='Baseball', data=df)
```




    <matplotlib.axes._subplots.AxesSubplot at 0x1a1b6796d8>




![png](./img/Blog_Post_1_files/Blog_Post_1_11_1.png)



```python
plt.figure(figsize=(8,5))
sns.countplot(x='American football', data=df)
```




    <matplotlib.axes._subplots.AxesSubplot at 0x1a18cf3e80>




![png](./img/Blog_Post_1_files/Blog_Post_1_12_1.png)



```python
df.Basketball.value_counts()
```




    11.0     11
    9.0       9
    10.0      6
    12.0      5
    3.0       4
    14.0      4
    8.0       3
    1.0       3
    17.0      3
    13.0      2
    7.0       2
    2.0       2
    16.0      1
    6.0       1
    5.0       1
    4.0       1
    15.0      1
    0.0       1
    558.0     1
    Name: Basketball, dtype: int64




```python
plt.figure(figsize=(12,5))
plt.style.use('fivethirtyeight')
ax = sns.barplot(x = 'Basketball', y = 'Year', data = df)
```


![png](./img/Blog_Post_1_files/Blog_Post_1_14_0.png)



```python
df.Wrestling.value_counts()
```




    0.0    58
    1.0     2
    2.0     1
    Name: Wrestling, dtype: int64




```python
plt.figure(figsize=(12,5))
plt.style.use('fivethirtyeight')
ax = sns.barplot(x = 'Wrestling', y = 'Year', data = df)
```


![png](./img/Blog_Post_1_files/Blog_Post_1_16_0.png)



```python
df2 = df.T
df2
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>0</th>
      <th>1</th>
      <th>2</th>
      <th>3</th>
      <th>4</th>
      <th>5</th>
      <th>6</th>
      <th>7</th>
      <th>8</th>
      <th>9</th>
      <th>...</th>
      <th>51</th>
      <th>52</th>
      <th>53</th>
      <th>54</th>
      <th>55</th>
      <th>56</th>
      <th>57</th>
      <th>58</th>
      <th>59</th>
      <th>60</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Year</th>
      <td>1954.0</td>
      <td>1955.0</td>
      <td>1956.0</td>
      <td>1957.0</td>
      <td>1958.0</td>
      <td>1959.0</td>
      <td>1960.0</td>
      <td>1961.0</td>
      <td>1962.0</td>
      <td>1963.0</td>
      <td>...</td>
      <td>2005.0</td>
      <td>2006.0</td>
      <td>2007.0</td>
      <td>2008.0</td>
      <td>2009.0</td>
      <td>2010.0</td>
      <td>2011.0</td>
      <td>2012.0</td>
      <td>2013.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>American football</th>
      <td>2.0</td>
      <td>7.0</td>
      <td>8.0</td>
      <td>4.0</td>
      <td>4.0</td>
      <td>4.0</td>
      <td>6.0</td>
      <td>7.0</td>
      <td>8.0</td>
      <td>12.0</td>
      <td>...</td>
      <td>24.0</td>
      <td>21.0</td>
      <td>24.0</td>
      <td>18.0</td>
      <td>19.0</td>
      <td>21.0</td>
      <td>20.0</td>
      <td>22.0</td>
      <td>18.0</td>
      <td>852.0</td>
    </tr>
    <tr>
      <th>Baseball</th>
      <td>2.0</td>
      <td>9.0</td>
      <td>13.0</td>
      <td>9.0</td>
      <td>12.0</td>
      <td>5.0</td>
      <td>6.0</td>
      <td>7.0</td>
      <td>9.0</td>
      <td>8.0</td>
      <td>...</td>
      <td>8.0</td>
      <td>11.0</td>
      <td>12.0</td>
      <td>10.0</td>
      <td>15.0</td>
      <td>10.0</td>
      <td>12.0</td>
      <td>6.0</td>
      <td>10.0</td>
      <td>597.0</td>
    </tr>
    <tr>
      <th>Basketball</th>
      <td>1.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>3.0</td>
      <td>2.0</td>
      <td>1.0</td>
      <td>2.0</td>
      <td>4.0</td>
      <td>3.0</td>
      <td>3.0</td>
      <td>...</td>
      <td>11.0</td>
      <td>9.0</td>
      <td>9.0</td>
      <td>12.0</td>
      <td>11.0</td>
      <td>10.0</td>
      <td>13.0</td>
      <td>16.0</td>
      <td>8.0</td>
      <td>558.0</td>
    </tr>
    <tr>
      <th>Bowling</th>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>2.0</td>
    </tr>
    <tr>
      <th>Boxing</th>
      <td>0.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>4.0</td>
      <td>3.0</td>
      <td>2.0</td>
      <td>2.0</td>
      <td>2.0</td>
      <td>3.0</td>
      <td>3.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>134.0</td>
    </tr>
    <tr>
      <th>Cycling and Road Bicycle Racing</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>2.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>13.0</td>
    </tr>
    <tr>
      <th>Fencing</th>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>Figure Skating</th>
      <td>0.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>15.0</td>
    </tr>
    <tr>
      <th>Golf</th>
      <td>1.0</td>
      <td>2.0</td>
      <td>3.0</td>
      <td>2.0</td>
      <td>4.0</td>
      <td>7.0</td>
      <td>8.0</td>
      <td>8.0</td>
      <td>8.0</td>
      <td>6.0</td>
      <td>...</td>
      <td>3.0</td>
      <td>4.0</td>
      <td>2.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>169.0</td>
    </tr>
    <tr>
      <th>Horse Racing</th>
      <td>3.0</td>
      <td>4.0</td>
      <td>5.0</td>
      <td>5.0</td>
      <td>3.0</td>
      <td>5.0</td>
      <td>2.0</td>
      <td>3.0</td>
      <td>2.0</td>
      <td>3.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>61.0</td>
    </tr>
    <tr>
      <th>Ice hockey</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>2.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>3.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>2.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>3.0</td>
      <td>87.0</td>
    </tr>
    <tr>
      <th>Indianapolis 500</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>20.0</td>
    </tr>
    <tr>
      <th>Kayaking</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>Mixed martial arts</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>2.0</td>
    </tr>
    <tr>
      <th>NASCAR</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>2.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>10.0</td>
    </tr>
    <tr>
      <th>Other individual sports</th>
      <td>6.0</td>
      <td>14.0</td>
      <td>8.0</td>
      <td>11.0</td>
      <td>7.0</td>
      <td>9.0</td>
      <td>12.0</td>
      <td>7.0</td>
      <td>6.0</td>
      <td>6.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>2.0</td>
      <td>1.0</td>
      <td>2.0</td>
      <td>1.0</td>
      <td>173.0</td>
    </tr>
    <tr>
      <th>Other motor sports</th>
      <td>1.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>2.0</td>
      <td>0.0</td>
      <td>3.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>17.0</td>
    </tr>
    <tr>
      <th>Other team sports</th>
      <td>3.0</td>
      <td>2.0</td>
      <td>0.0</td>
      <td>2.0</td>
      <td>5.0</td>
      <td>4.0</td>
      <td>2.0</td>
      <td>3.0</td>
      <td>4.0</td>
      <td>1.0</td>
      <td>...</td>
      <td>2.0</td>
      <td>2.0</td>
      <td>1.0</td>
      <td>2.0</td>
      <td>2.0</td>
      <td>1.0</td>
      <td>2.0</td>
      <td>4.0</td>
      <td>10.0</td>
      <td>99.0</td>
    </tr>
    <tr>
      <th>Skiing</th>
      <td>0.0</td>
      <td>4.0</td>
      <td>2.0</td>
      <td>3.0</td>
      <td>1.0</td>
      <td>3.0</td>
      <td>2.0</td>
      <td>1.0</td>
      <td>3.0</td>
      <td>3.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>2.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>44.0</td>
    </tr>
    <tr>
      <th>Snowboarding</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>2.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>2.0</td>
    </tr>
    <tr>
      <th>Soccer</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>2.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>19.0</td>
    </tr>
    <tr>
      <th>Surfing</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>8.0</td>
    </tr>
    <tr>
      <th>Swimming</th>
      <td>1.0</td>
      <td>2.0</td>
      <td>2.0</td>
      <td>0.0</td>
      <td>2.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>2.0</td>
      <td>3.0</td>
      <td>1.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>4.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>2.0</td>
      <td>0.0</td>
      <td>42.0</td>
    </tr>
    <tr>
      <th>Tennis</th>
      <td>0.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>2.0</td>
      <td>3.0</td>
      <td>2.0</td>
      <td>0.0</td>
      <td>2.0</td>
      <td>1.0</td>
      <td>2.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>83.0</td>
    </tr>
    <tr>
      <th>Track &amp; Field</th>
      <td>0.0</td>
      <td>3.0</td>
      <td>4.0</td>
      <td>1.0</td>
      <td>2.0</td>
      <td>4.0</td>
      <td>4.0</td>
      <td>3.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>88.0</td>
    </tr>
    <tr>
      <th>Wrestling</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>2.0</td>
    </tr>
    <tr>
      <th>Grand Total</th>
      <td>20.0</td>
      <td>52.0</td>
      <td>53.0</td>
      <td>52.0</td>
      <td>52.0</td>
      <td>52.0</td>
      <td>52.0</td>
      <td>52.0</td>
      <td>53.0</td>
      <td>52.0</td>
      <td>...</td>
      <td>52.0</td>
      <td>52.0</td>
      <td>53.0</td>
      <td>52.0</td>
      <td>52.0</td>
      <td>52.0</td>
      <td>52.0</td>
      <td>53.0</td>
      <td>52.0</td>
      <td>3099.0</td>
    </tr>
  </tbody>
</table>
<p>28 rows × 61 columns</p>
</div>




```python
df2.rename(columns=df2.iloc[0], inplace = True)
df2.drop(df2.index[0], inplace=True)
df2
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>1954.0</th>
      <th>1955.0</th>
      <th>1956.0</th>
      <th>1957.0</th>
      <th>1958.0</th>
      <th>1959.0</th>
      <th>1960.0</th>
      <th>1961.0</th>
      <th>1962.0</th>
      <th>1963.0</th>
      <th>...</th>
      <th>2005.0</th>
      <th>2006.0</th>
      <th>2007.0</th>
      <th>2008.0</th>
      <th>2009.0</th>
      <th>2010.0</th>
      <th>2011.0</th>
      <th>2012.0</th>
      <th>2013.0</th>
      <th>0.0</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>American football</th>
      <td>2.0</td>
      <td>7.0</td>
      <td>8.0</td>
      <td>4.0</td>
      <td>4.0</td>
      <td>4.0</td>
      <td>6.0</td>
      <td>7.0</td>
      <td>8.0</td>
      <td>12.0</td>
      <td>...</td>
      <td>24.0</td>
      <td>21.0</td>
      <td>24.0</td>
      <td>18.0</td>
      <td>19.0</td>
      <td>21.0</td>
      <td>20.0</td>
      <td>22.0</td>
      <td>18.0</td>
      <td>852.0</td>
    </tr>
    <tr>
      <th>Baseball</th>
      <td>2.0</td>
      <td>9.0</td>
      <td>13.0</td>
      <td>9.0</td>
      <td>12.0</td>
      <td>5.0</td>
      <td>6.0</td>
      <td>7.0</td>
      <td>9.0</td>
      <td>8.0</td>
      <td>...</td>
      <td>8.0</td>
      <td>11.0</td>
      <td>12.0</td>
      <td>10.0</td>
      <td>15.0</td>
      <td>10.0</td>
      <td>12.0</td>
      <td>6.0</td>
      <td>10.0</td>
      <td>597.0</td>
    </tr>
    <tr>
      <th>Basketball</th>
      <td>1.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>3.0</td>
      <td>2.0</td>
      <td>1.0</td>
      <td>2.0</td>
      <td>4.0</td>
      <td>3.0</td>
      <td>3.0</td>
      <td>...</td>
      <td>11.0</td>
      <td>9.0</td>
      <td>9.0</td>
      <td>12.0</td>
      <td>11.0</td>
      <td>10.0</td>
      <td>13.0</td>
      <td>16.0</td>
      <td>8.0</td>
      <td>558.0</td>
    </tr>
    <tr>
      <th>Bowling</th>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>2.0</td>
    </tr>
    <tr>
      <th>Boxing</th>
      <td>0.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>4.0</td>
      <td>3.0</td>
      <td>2.0</td>
      <td>2.0</td>
      <td>2.0</td>
      <td>3.0</td>
      <td>3.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>134.0</td>
    </tr>
    <tr>
      <th>Cycling and Road Bicycle Racing</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>2.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>13.0</td>
    </tr>
    <tr>
      <th>Fencing</th>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>Figure Skating</th>
      <td>0.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>15.0</td>
    </tr>
    <tr>
      <th>Golf</th>
      <td>1.0</td>
      <td>2.0</td>
      <td>3.0</td>
      <td>2.0</td>
      <td>4.0</td>
      <td>7.0</td>
      <td>8.0</td>
      <td>8.0</td>
      <td>8.0</td>
      <td>6.0</td>
      <td>...</td>
      <td>3.0</td>
      <td>4.0</td>
      <td>2.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>169.0</td>
    </tr>
    <tr>
      <th>Horse Racing</th>
      <td>3.0</td>
      <td>4.0</td>
      <td>5.0</td>
      <td>5.0</td>
      <td>3.0</td>
      <td>5.0</td>
      <td>2.0</td>
      <td>3.0</td>
      <td>2.0</td>
      <td>3.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>61.0</td>
    </tr>
    <tr>
      <th>Ice hockey</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>2.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>3.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>2.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>3.0</td>
      <td>87.0</td>
    </tr>
    <tr>
      <th>Indianapolis 500</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>20.0</td>
    </tr>
    <tr>
      <th>Kayaking</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>Mixed martial arts</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>2.0</td>
    </tr>
    <tr>
      <th>NASCAR</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>2.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>10.0</td>
    </tr>
    <tr>
      <th>Other individual sports</th>
      <td>6.0</td>
      <td>14.0</td>
      <td>8.0</td>
      <td>11.0</td>
      <td>7.0</td>
      <td>9.0</td>
      <td>12.0</td>
      <td>7.0</td>
      <td>6.0</td>
      <td>6.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>2.0</td>
      <td>1.0</td>
      <td>2.0</td>
      <td>1.0</td>
      <td>173.0</td>
    </tr>
    <tr>
      <th>Other motor sports</th>
      <td>1.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>2.0</td>
      <td>0.0</td>
      <td>3.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>17.0</td>
    </tr>
    <tr>
      <th>Other team sports</th>
      <td>3.0</td>
      <td>2.0</td>
      <td>0.0</td>
      <td>2.0</td>
      <td>5.0</td>
      <td>4.0</td>
      <td>2.0</td>
      <td>3.0</td>
      <td>4.0</td>
      <td>1.0</td>
      <td>...</td>
      <td>2.0</td>
      <td>2.0</td>
      <td>1.0</td>
      <td>2.0</td>
      <td>2.0</td>
      <td>1.0</td>
      <td>2.0</td>
      <td>4.0</td>
      <td>10.0</td>
      <td>99.0</td>
    </tr>
    <tr>
      <th>Skiing</th>
      <td>0.0</td>
      <td>4.0</td>
      <td>2.0</td>
      <td>3.0</td>
      <td>1.0</td>
      <td>3.0</td>
      <td>2.0</td>
      <td>1.0</td>
      <td>3.0</td>
      <td>3.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>2.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>44.0</td>
    </tr>
    <tr>
      <th>Snowboarding</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>2.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>2.0</td>
    </tr>
    <tr>
      <th>Soccer</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>2.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>19.0</td>
    </tr>
    <tr>
      <th>Surfing</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>8.0</td>
    </tr>
    <tr>
      <th>Swimming</th>
      <td>1.0</td>
      <td>2.0</td>
      <td>2.0</td>
      <td>0.0</td>
      <td>2.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>2.0</td>
      <td>3.0</td>
      <td>1.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>4.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>2.0</td>
      <td>0.0</td>
      <td>42.0</td>
    </tr>
    <tr>
      <th>Tennis</th>
      <td>0.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>2.0</td>
      <td>3.0</td>
      <td>2.0</td>
      <td>0.0</td>
      <td>2.0</td>
      <td>1.0</td>
      <td>2.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>83.0</td>
    </tr>
    <tr>
      <th>Track &amp; Field</th>
      <td>0.0</td>
      <td>3.0</td>
      <td>4.0</td>
      <td>1.0</td>
      <td>2.0</td>
      <td>4.0</td>
      <td>4.0</td>
      <td>3.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>88.0</td>
    </tr>
    <tr>
      <th>Wrestling</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>2.0</td>
    </tr>
    <tr>
      <th>Grand Total</th>
      <td>20.0</td>
      <td>52.0</td>
      <td>53.0</td>
      <td>52.0</td>
      <td>52.0</td>
      <td>52.0</td>
      <td>52.0</td>
      <td>52.0</td>
      <td>53.0</td>
      <td>52.0</td>
      <td>...</td>
      <td>52.0</td>
      <td>52.0</td>
      <td>53.0</td>
      <td>52.0</td>
      <td>52.0</td>
      <td>52.0</td>
      <td>52.0</td>
      <td>53.0</td>
      <td>52.0</td>
      <td>3099.0</td>
    </tr>
  </tbody>
</table>
<p>27 rows × 61 columns</p>
</div>




```python
df2[60]
```




    Year                                  0.0
    American football                   852.0
    Baseball                            597.0
    Basketball                          558.0
    Bowling                               2.0
    Boxing                              134.0
    Cycling and Road Bicycle Racing      13.0
    Fencing                               1.0
    Figure Skating                       15.0
    Golf                                169.0
    Horse Racing                         61.0
    Ice hockey                           87.0
    Indianapolis 500                     20.0
    Kayaking                              1.0
    Mixed martial arts                    2.0
    NASCAR                               10.0
    Other individual sports             173.0
    Other motor sports                   17.0
    Other team sports                    99.0
    Skiing                               44.0
    Snowboarding                          2.0
    Soccer                               19.0
    Surfing                               8.0
    Swimming                             42.0
    Tennis                               83.0
    Track & Field                        88.0
    Wrestling                             2.0
    Grand Total                        3099.0
    Name: 60, dtype: float64



When looking at the dataset, It is interesting to explore which sports gained popularity over time as seen through the number of times they appear on the cover each year.


If I had a lot more time with this dataset, I would build a model that woiuld predict which sports should be printed most often on the cover of Sports Illustrated. I would like to further explore current sports trends particularly as seen through timeseries to get a more accurate feel. 

