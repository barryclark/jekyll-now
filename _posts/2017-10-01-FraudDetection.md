---
layout: post
title: Fraud Detection
---
This is a study trying to figure out if we are able to predict fraud in bank transactions. Before they happen, obviously.
Here I am using a synthetic dataframe. It has over 6 million rows and not so many columns(13). The goal is to predict which 
ones are fraudulent. Let's go find out!



![nofrauds](/images/nofrauds.gif){:height="300px" width="600px"}






## Brief description of Fraud Detection.

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import pickle
from imblearn.over_sampling import SMOTE, ADASYN
from sklearn.metrics import accuracy_score, confusion_matrix
from collections import Counter
from sklearn.model_selection import GridSearchCV, train_test_split, cross_val_predict, cross_val_score
from sklearn.ensemble import GradientBoostingClassifier
```


```python
!ls
```

    FraudDetection.ipynb                 [31mPS_20174392719_1491204439457_log.csv[m[m



```python
file = 'PS_20174392719_1491204439457_log.csv'
df = pd.read_csv(file)

data = df.copy()

data = data.rename(columns={'oldbalanceOrg': 'oldbalanceOrig'})

data.shape

for item in data.columns:
    if len(data[item].unique()) < 10:
        print(item, data[item].unique(), len(data[item].unique()))
    else:
        print(item, len(data[item].unique()))
```

    step 743
    type ['PAYMENT' 'TRANSFER' 'CASH_OUT' 'DEBIT' 'CASH_IN'] 5
    amount 5316900
    nameOrig 6353307
    oldbalanceOrig 1845844
    newbalanceOrig 2682586
    nameDest 2722362
    oldbalanceDest 3614697
    newbalanceDest 3555499
    isFraud [0 1] 2
    isFlaggedFraud [0 1] 2



```python
fraud = data.isFraud.sum()

print(fraud, fraud/data.shape[0])

flaggedFraud = data.isFlaggedFraud.sum()

print(flaggedFraud, flaggedFraud/data.shape[0])
```

    8213 0.001290820448180152
    16 2.51468734577894e-06



```python
print(df.loc[(data.isFlaggedFraud == 1) & (data.isFraud == 1), :].count()['isFraud'])
print(df.loc[(data.isFlaggedFraud == 1), :].count()['isFraud'])

print(data.loc[(data['isFraud'] == 1), :]['type'].unique())
```

    16
    16
    ['TRANSFER' 'CASH_OUT']



```python
lista = ['oldbalanceOrig', 'newbalanceOrig', 'oldbalanceDest', 'newbalanceDest']
noms = []
for item in lista:
    llista = []
    for x, y in zip(data['amount'], data[item]):
        if x == 0 or y == 0:
            z = 0
        else:
            z = x/y
        llista.append(z)
    nom = '{}_avg'.format(item)
    noms.append(nom)
    data[nom] = llista
print(noms)
```

    ['oldbalanceOrig_avg', 'newbalanceOrig_avg', 'oldbalanceDest_avg', 'newbalanceDest_avg']



```python
data_prova = data[0:10000]
```


```python
data['jugo'] = 1 - data['isFraud']
#data_prova['jugo'] = 1 - data_prova['isFraud']

print(data['jugo'].sum())

data['cum_fraud'] = data.groupby('nameOrig')['jugo'].apply(lambda y: y.cumsum()-y)

print(data['cum_fraud'].head())
```

    6354407
    0    0
    1    0
    2    0
    3    0
    4    0
    Name: cum_fraud, dtype: int64



```python
cosa = data['cum_fraud']
```


```python
#I save data['cum_fraud'] so I do not have through that again: it is too long
with open('cum-fraud.pkl', 'wb') as picklefile:
    pickle.dump(cosa, picklefile)
```


```python
with open('cum-fraud.pkl', 'rb') as picklefile:
    the_same_sample = pickle.load(picklefile)
```


```python
data.dtypes
```




    step                    int64
    type                   object
    amount                float64
    nameOrig               object
    oldbalanceOrig        float64
    newbalanceOrig        float64
    nameDest               object
    oldbalanceDest        float64
    newbalanceDest        float64
    isFraud                 int64
    isFlaggedFraud          int64
    oldbalanceOrig_avg    float64
    newbalanceOrig_avg    float64
    oldbalanceDest_avg    float64
    newbalanceDest_avg    float64
    jugo                    int64
    cum_fraud               int64
    dtype: object




```python
features = [c for c in data.columns if c not in ['isFraud']]
```


```python
data.isnull().sum()
```




    step                  0
    type                  0
    amount                0
    nameOrig              0
    oldbalanceOrig        0
    newbalanceOrig        0
    nameDest              0
    oldbalanceDest        0
    newbalanceDest        0
    isFraud               0
    isFlaggedFraud        0
    oldbalanceOrig_avg    0
    newbalanceOrig_avg    0
    oldbalanceDest_avg    0
    newbalanceDest_avg    0
    jugo                  0
    cum_fraud             0
    dtype: int64




```python
objectes = data.select_dtypes(include = ['object']).columns
numerics = data.select_dtypes(exclude=['object']).columns
```


```python
numerics_menys_fraud = [c for c in numerics if c not in ['isFraud', 'isFlaggedFraud']]
```


```python
print(objectes, len(objectes))
print(numerics, len(numerics))
```

    Index(['type', 'nameOrig', 'nameDest'], dtype='object') 3
    Index(['step', 'amount', 'oldbalanceOrig', 'newbalanceOrig', 'oldbalanceDest',
           'newbalanceDest', 'isFraud', 'isFlaggedFraud', 'oldbalanceOrig_avg',
           'newbalanceOrig_avg', 'oldbalanceDest_avg', 'newbalanceDest_avg',
           'jugo', 'cum_fraud'],
          dtype='object') 14



```python
# I want to change type into dummies
dummies = pd.get_dummies(data['type'])
data_nova = pd.concat([data, dummies], axis=1)
```


```python
with open('data_nova.pkl', 'wb') as picklefile:
    pickle.dump(data_nova, picklefile)
```


```python
!ls
```

    FraudDetection.ipynb                 cum-fraud.pkl
    [31mPS_20174392719_1491204439457_log.csv[m[m data_nova.pkl



```python
print(data_nova.shape)
print(data['type'].unique())
```

    (6362620, 21)
    ['PAYMENT' 'TRANSFER' 'CASH_OUT' 'DEBIT' 'CASH_IN']


INtentar fer algunes grafiques


```python
type_fraud = []
for it in data['type'].unique():
    x = (data.loc[(data['type'] == it) & (data['isFraud'] == 1), :]['isFraud'].sum())
    type_fraud.append(x)
    print(it, x)
plt.bar(range(0,len(type_fraud)), type_fraud)
pos = np.arange(len(data['type'].unique())) + .2
plt.xticks(pos,data['type'].unique(), fontsize =10)
plt.xlabel('Type of Transaction')
plt.title('Fraud per type of Transaction')
plt.show()
#plt.axhline(baseline, c='r')
```

    PAYMENT 0
    TRANSFER 4097
    CASH_OUT 4116
    DEBIT 0
    CASH_IN 0



![FraudDetection_22_1](/images/FraudDetection_files/FraudDetection_22_1.png){:height="300px" width="600px"}



```python
data.loc[data['type']]
```


```python
data_nova.drop('type', axis=1, inplace=True)
```


```python
X = data_nova[numerics_menys_fraud]
y = data_nova['isFraud']
X_train, X_test, y_train, y_test = train_test_split(X,y, test_size=.20)

X_resampled, y_resampled = SMOTE(ratio=0.6).fit_sample(X_train, y_train)
print(sorted(Counter(y_resampled).items()))
```

    /Users/fcbnyc/anaconda3/lib/python3.6/site-packages/sklearn/utils/deprecation.py:77: DeprecationWarning: Function _ratio_float is deprecated; Use a float for 'ratio' is deprecated from version 0.2. The support will be removed in 0.4. Use a dict, str, or a callable instead.
      warnings.warn(msg, category=DeprecationWarning)


    [(0, 5083497), (1, 3050098)]



```python
gbc = GradientBoostingClassifier()
```


```python
gbc.fit(X_resampled, y_resampled)
```




    GradientBoostingClassifier(criterion='friedman_mse', init=None,
                  learning_rate=0.1, loss='deviance', max_depth=3,
                  max_features=None, max_leaf_nodes=None,
                  min_impurity_decrease=0.0, min_impurity_split=None,
                  min_samples_leaf=1, min_samples_split=2,
                  min_weight_fraction_leaf=0.0, n_estimators=100,
                  presort='auto', random_state=None, subsample=1.0, verbose=0,
                  warm_start=False)




```python
pred = gbc.predict(X_test)
```


```python
accuracy_score(pred, y_test)
```




    1.0




```python
confusion_matrix(pred, y_test)
```




    array([[1270910,       0],
           [      0,    1614]])




```python
y_test.shape
```




    (1272524,)




```python
pred.shape
```




    (1272524,)




```python
data_nova['isFraud'].sum()
```




    8213




```python
y_test.sum()
```




    1614




```python

```
