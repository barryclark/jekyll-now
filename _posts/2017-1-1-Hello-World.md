---
layout: post
title: BarcelonaAccidents, Coming soon!!!
---

Yes, I let myself go and get sucked in by my origins. I just had to work on a database that is from my hometown (Barcelona) as a modest way to show my support to the fellow Catalans in these sad days.

![nofrauds](/images/BCN01.jpg){:height="300px" width="400px"}


## Brief description of Fraud Detection.
  1. Dataset contains almost 80,000 accidents taht ocurr in the city from 2010 to 2016
  2. This is a multiclassification case.
  3. The link in github for a more detailed and technical explanation is not yet available.
  
## Non-technical description of Appointments No-show study.

## Gathering the data.
  
```
data = pd.DataFrame()
files = []
columnes = []
for otem in range(2010, 2017):
    file = '{}_accidents.csv'.format(otem)
    df = pd.read_csv(file, encoding='ISO-8859-15')
    fila = df.shape[0]
    columna = df.shape[1]
    files.append(fila)
    data = data.append(df, ignore_index=True)
    columnes.append(columna)
data.shape, sum(files), sum(columnes)

```
