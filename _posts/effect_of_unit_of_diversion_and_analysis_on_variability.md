
---
layout: post
title: The effect of using different units of diversion and analysis on the variability of your metrics in A/B Testing
---

#### Introduction
Session level metrics are commonly used to measure website performance. It is therefore natuaral for these websites to use these session-level metrics when running A/B experiments. Determining which users see one version of the website (the A) and which users see the other (the B) requires some splitting criterion, called the unit of diversion. One of the most commonly used is a cookie. A regular experimental setup will therefore split traffic on a cookie and measure the performance of an experiment using a session-level metric (e.g. $\frac{conversions}{session}$)

Once the experiment has run for the predetermined length of time, a statistical test will often be used to compare the performance of some test metric (e.g. $\frac{conversions}{session}$) across both groups. The statistical tests commonly used to analyse the results of A/B experiments (e.g. $\chi^2 \text{ test, } Z \text{-test, }t \text{-test, } etc.$) make many assumptions, and the robustness of any conclusions derived from these tests depends on the extent to which these assumptions are satisfied. The most stringent assumption is that each observation is independent. In the experimental setup described above, is each session independent? Not necessarily. 

Diverting traffic into each group using a cookie means that any returning traffic is allocated to the test bucket that it was originally placed in. And the behaviour of a given user across sessions is likely to be correlated; you may have a particular user who clicks a lot on your website whilst another may only be there to browse. Diverting these users results in groups of correlated sessions appearing in each test bucket. This can significantly increase the variability of your metrics; resulting in your true empirical variability far exceeding your analytical variability. Why is this a problem? Because typically in computing significance tests or confidence intervals, the analytical estimate of the variability will be used. If this is smaller than the true empirical variability, this will lead to an increase in false positives. 

#### Simulation

One way to understand the effect of using different units of diversion and observation is through simulation. In this case, we will simulate an experiment where $\frac{conversions}{session}$ is our test metric and traffic is diverted to either group using a cookie. We'll use the bootstrap technique to construct a sampling distribution and compare this to the expected sampling distribution when we use the analytical variability.


#### Acknowledements

I appreciate that this topic has been covered elsewhere I'm under no illusion that this idea is original. Some of the resources I found most useful include:
- [The second Ghost of Experimentation: The fallacy of session based metrics](https://towardsdatascience.com/the-second-ghost-of-experimentation-the-fallacy-of-session-based-metrics-fb65006d30ff) by Skyscanner Engineering
- Udacity A/B Testing Course



```python
import pandas as pd
import numpy as np
from scipy import stats
import seaborn as sns
import matplotlib.pyplot as plt
import matplotlib.mlab as mlab
%matplotlib inline
```

Generate session-level data


```python
def create_session_data(N, num_sessions, p):
    "Randomly generate session-level data"
    # create random user ids with num_sessions per user 
    user_id = pd.util.testing.rands_array(20, N)
    joined = []
    for _ in range(num_sessions):
        joined = np.append(joined, user_id)
    joined.sort()
    
    # add conversion data
    conversions = stats.bernoulli.rvs(p, size=N * num_sessions)
    
    # return a DataFrame
    data = np.stack([joined, conversions], axis=1)
    df = pd.DataFrame(data, columns=['userid', 'conversion'], index=None)
    df['session'] = df.groupby('userid').cumcount() + 1 # start from 1
    return df
    
```


```python
# specify three distinct groups of users 
# each group have distinct sample size, 
# conversion rates and num of sessions per user

N = [125000, 150000, 25000]
num_sessions = [1, 1, 4]
p_values = [0.48, 0.53, 0.93]

sessions = []
for n, num_session, p in zip(N, num_sessions, p_values):
    data = create_session_data(n, num_session, p)
    sessions.append(data)
    
df_sessions = pd.concat(sessions)
len(df_sessions)
```




    375000



Convert the session-level data to user-level data


```python
def return_user_level_data(session_data):
    user_data = session_data.groupby('userid')['conversion'].agg(['count', 'sum'])
    user_data.columns = ['sessions', 'conversions']
    return user_data
```


```python
df_users = return_user_level_data(df_sessions)
```


```python
len(df_users)
```




    300000



Print out the session and user-level conversion


```python
user_conversion = df_users.conversions.sum() / df_users.sessions.sum()

print ("Session level conversion: {:.2f} %".format(100 * df_sessions.conversion.mean()))
print ("User level conversion: {:.2f} %".format(100 * user_conversion))
```

    Session level conversion: 61.97 %
    User level conversion: 61.97 %
    

Now we want to simulate an experiment whereby we randomly sample users or sessions, construct the sampling distribution and compare the standard error of this distribution to the theoretical number we would expect.


```python
n_simulations = 5000
sample_size = 100000

boot_session = []
for _ in range(n_simulations):
    sample = df_sessions.sample(n=sample_size, replace=True)
    sample_mean = sample.conversion.mean()
    boot_session.append(sample_mean)

# repeat the same for users
boot_user = []
for _ in range(n_simulations):
    sample = df_users.sample(n=sample_size, replace=True)
    sample_mean = sample.conversions.sum() /sample.sessions.sum()
    boot_user.append(sample_mean)
```


```python
def get_theoretical_data(session_data, sample_size):
    mean = np.mean(session_data.conversion)
    se = np.sqrt(mean * (1-mean)/sample_size)
    x = np.linspace(mean - 3*se, mean + 3*se, 100)
    y = mlab.normpdf(x, mean, se)
    return (x,y)

def calculate_theoretical_ci (session_data, sample_size):
    mean = session_data.conversion.mean()
    se = np.sqrt(mean * (1-mean)/sample_size)
    z = 1.96
    return (mean - z*se, mean + z*se)

def calculate_unlikely_result (boot_data, ci_theoretical):
    counter = 0
    length = 0
    lower = ci_theoretical[0]
    upper = ci_theoretical[1]

    for e in boot_data:
        length += 1
        if e <= lower or e >= upper:
            counter += 1

    return counter / length

def plot_sampling_dist(boot_session, boot_user, session_data, sample_size):
    fig, ax = plt.subplots(1, 1, figsize=(10,6))
    sns.distplot(boot_session, hist=True, bins=50, label='Session Randomisation');
    sns.distplot(boot_user, hist=True, bins=50, label='User Randomisation');
    
    # get theoretical distribution
    # use average conversion from session level data
    x,y = get_theoretical_data(session_data, sample_size)
    plt.plot(x, y, linestyle='--', color='black', label='Theoretical Variance')
    plt.legend(loc='best');

    # labels
    plt.ylabel('Frequency')
    plt.xlabel('Session-level Conversion');
```


```python
plot_sampling_dist(boot_session, boot_user, df_sessions, sample_size)
```


```python
ci_theoretical = calculate_theoretical_ci(df_sessions, sample_size)
print ('Percentage of Statistically Significant Results with Session Randomisation: {:.2f}%'.
   format(100 * calculate_unlikely_result(boot_session, ci_theoretical)))
print ('Percentage of Statistically Significant Results with User Randomisation: {:.2f}%'.
   format(100 * calculate_unlikely_result(boot_user, ci_theoretical))) 
```


```python

```
