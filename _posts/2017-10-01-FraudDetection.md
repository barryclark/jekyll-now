---
layout: post
title: Fraud Detection
---
This is a study trying to figure out if we are able to predict fraud in bank transactions. Before they happen, obviously.
Here I am using a synthetic dataframe simulating mobile money transactions. It has over 6 million rows and not so many columns (17). The goal is to predict which ones are fraudulent. I am working in a Synthetic Database for Fraud Detection in banking transactions. This is another Kaggle project with over 6 million rows, being each row a bank transaction.
This is a very unbalanced database (less than 1% of fraud transactions). Let's go find out!

![nofrauds](/images/nofrauds.gif){:height="300px" width="500px"}

{% if page.excerpt %}

## Brief description of Fraud Detection.
  1. Dataset contains 6,362,620 synthetic transactions generated using a simulator called PaySim.
  2. The baseline is 99.87% of no fraudulent transactions.
  3. The link in Github for a more detailed and technical explanation is not yet available.

## Non-technical description of Fraud Detection study.

##Gathering the data.

The first thing I will have to do as usual is to upload and analyze the data.

```python
file = 'PS_20174392719_1491204439457_log.csv'
df = pd.read_csv(file)

data = df.copy()

data = data.rename(columns={'oldbalanceOrg': 'oldbalanceOrig'})

data.shape
```

(6362620, 17)




![FraudDetection_22_1](/images/FraudDetection_files/FraudDetection_22_1.png){:height="300px" width="600px"}
