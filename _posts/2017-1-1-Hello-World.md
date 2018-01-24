---
layout: post
title: Fraud Detection, Coming soon!!!
---

I am working in a Synthetic Database for Fraud Detection in banking transactions. This is another Kaggle project with over 6 million rows, being each row a bank transaction. One of the challenges is that this is a very unbalanced database with a very small amount of fraudulent transactions (less than 1%).

![nofrauds](/images/nofrauds.gif){:height="300px" width="600px"}


## Brief description of Fraud Detection.
  1. Dataset contains 6,362,620 transactionsm from "a synthetic dataset generated using the simulator called PaySim as an approach to such a problem. PaySim uses aggregated data from the private dataset to generate a synthetic dataset that resembles the normal operation of transactions and injects malicious behaviour to later evaluate the performance of fraud detection methods".
  2. The baseline is 99.87% of showups.
  3. The link in github for a more detailed and technical explanation is not yet available.
  
## Non-technical description of Appointments No-show study.

 ## Gathering the data.
  


```python
file = 'PS_20174392719_1491204439457_log.csv'
df = pd.read_csv(file)

data = df.copy()

data = data.rename(columns={'oldbalanceOrg': 'oldbalanceOrig'})

data.shape```
