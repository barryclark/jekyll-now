---
layout: post
title: CUPED with Multiple Covariates and A Simpler the Delta Method Calculation
tags:
- Statistics
- A/B Testing
- Practical
summary: Theoretical derivation of the formula for CUPED with multiple covariates and a calculation trick to make the delta method tractable for this situation.
---

In the original [CUPED](https://exp-platform.com/Documents/2013-02-CUPED-ImprovingSensitivityOfControlledExperiments.pdf) paper, the authors mention that it is straightforward to generalize the method to multiple covariates. However, without understanding exactly the mathematical technique to find the CUPED estimate, it may be confusing to attempt the multiple covariates case. In this post, we will explain the thought process behind the CUPED estimate and demonstrate the analytic formula for a multiple covariate extension to CUPED. We then discuss the estimate for non-user level metrics, and we will need to use the delta method for the variance. In this case, the book keeping when using the delta method would be tedious unless you use a simplified calculation which we empirically demonstrate in the second section of the post.


To calculate the CUPED estimate, namely $$\theta$$, the authors [parametrized](https://en.wikipedia.org/wiki/Parametrization_(geometry)) a function $$Y_{cv}(\theta)$$ where $$\mathbb{E}(Y_{cv}(\theta))=Y$$. Then, they chose the minimal $$\theta$$ such that $$\theta = \min_{\hat\theta} var(Y_{cv}(\hat\theta))$$. When you know the trick, it's not that bad to generalize to more variables.
    
The first thing you have to do is allow multiple covariates. With a single covariate we had $$\theta$$ and $$X$$, the covariate. The analog in the multiple covariate case is a collection of $$\theta_i$$ for covariates $$X_i$$. In this setting, $$Y_{cv}$$ is defined via
$$
\begin{equation}
Y_{cv} = \bar{Y} -  \sum_{i}  \theta_i (\bar{X_i} - \mathbb{E}(X_i))
\end{equation}
$$
So, using rules about the variance of linear combinations, we have
$$
\begin{equation}
  var ( Y_{cv}) = \frac{1}{n} \left ( var(Y) + \sum_i \theta_i^2 var(X_i) + 2 \sum_{1 \leq i< j\leq n} \theta_i \theta_j cov(X_i, X_j) - \sum_i 2\theta_i cov(Y,X_i)   \right ).
\end{equation}
$$

In the previous equation, used the identity $$var(\bar{Y}) = var(Y)/n$$ where $$n$$ is the size of the sample. (We are glossing over many steps and definitions to get to the meat and not distract from the main point. For more details, see the CUPED paper's definitions.)

Now, consider $$g(\boldsymbol \theta):=var(Y_{cv})$$ where $$\boldsymbol\theta:= (\theta_1,\dots, \theta_m)$$.


Now, to find the minimum value of $$\theta$$ of this quadratic equation, we need to take the (multivariate) derivative with respect to $$\boldsymbol \theta$$ and find the critical points-- which in this case the critical point will be a minimum.

$$\begin{equation}\frac{\partial g}{\partial \theta_i} = \frac{1}{n}\left( 2\theta_i var(X_i) + 2 \sum_{j\neq i} \theta_j cov(X_i, X_j) - 2 cov(Y, X_i)   \right)
\end{equation}$$

We can write this another way if we consider the vector $$\nabla \boldsymbol \theta = (\frac{\partial g}{\partial \theta_1},\dots \frac{\partial g}{\partial \theta_m})^T.$$

If we set $$\nabla \boldsymbol \theta = 0$$, we can remove the factor of $$2$$ and $$1/n$$ in all the terms of the partial derivative (by dividing both sides by $$2$$ and $$1/n$$) and we have

$$
\begin{equation} 
\nabla \boldsymbol \theta = \Sigma \boldsymbol \theta - Z = 0
\end{equation}
$$

where $$\Sigma$$ is the covariance matrix of the $$X_i$$ and $$Z$$ is a vector such that $$Z_i = cov(Y,X_i)$$. Therefore, the minimum is achieved when we set

$$
\begin{equation}
\boldsymbol \theta := \Sigma^{-1}Z.
\end{equation}
$$

## Empirical  Validation

Here, we will create a $$Y$$ from a linear combination of covariates $$X_i$$'s, i.e, $$Y=\sum_i a_i X_i$$. We will then solve for $$\theta$$ using the formula above and we will find that the coefficients $$a_i$$ and $$\boldsymbol \theta$$ are equal.


```python
import numpy as np
import pandas as pd
np.random.seed(8080)
size = 50000
num_X = 10
X_means = np.random.uniform(0, 1, num_X)
Xs = [np.random.normal(X_means[k], .01, size) for k in range(num_X)]
coefficients = np.random.uniform(0,1,num_X)
Y = np.sum([a*b for a,b in zip(coefficients, Xs)],axis=0) \
    + np.random.normal(0,.001,size)
```


```python
# recover coefficients/theta via the formula, note n must be large
# for theta to be a good approximation of the coefficients
big_cov = np.cov([Y] + Xs) # Calculating sigma and z together
sigma = big_cov[1:,1:]
z = big_cov[1:,0].reshape((num_X,1))

theta = np.dot(np.linalg.inv(sigma),z) # here's the formula!
```


```python
# This will be a small number, not perfectly 0
# due to the error term we add, this value isn't exactly 0
np.mean(theta.reshape((num_X,))-np.array(coefficients))
```




    -9.495897072566845e-05



## Wait? Why are they equal?

So, there was a little gap in the logic above. I did not mention why those two values should be equal in the first place, but I showed it happens in this case. It is actually due to the [Gauss-Markov Theorem](https://en.wikipedia.org/wiki/Gauss%E2%80%93Markov_theorem), which states that under a few assumptions on the data distribution, the ordinary least squares (OLS) estimator is unbiased and has the smallest variance.

Let's play that back to really grok it. I was coming up with a linear estimate for $$Y$$, in terms of a linear combination $$Y_{cv}$$ (so a linear estimator), and I was solving explicitly for coefficients ($$\theta$$) which minimized the variance. Since $$Y$$ _is_ already a linear combination, the OLS estimator will recover the coefficients of $$Y$$. Gauss-Markov says that the OLS solution is the _unique_ "best linear unbiased estimator", and so solving for a variance minimizing linear combination ($$Y_{cv}$$) another way will still yield the same coefficients.

## CUPED Simulation

In the CUPED paper, the authors state that one covariate they found predictive was the first day the user entered the experiment. This is not a pre-experiment variable but it is independent of the treatment. We will craft a simulation that leverages this idea to create covariates to test for our formula above. 

In our simulation, we will simulate a user's query count during a test period under a control and a treatment. The treatment will make a user more likely to query. Depending on the day of the week on their first entrance into the experiment, a user will have a different additive component to their query propensity. This effect only impacts their visits on the first day.


```python
# Using the simulation from a previous post 
# with a few additions
import numpy as np
import pandas as pd
np.random.seed(1)
user_sample_mean = 8
user_standard_error = 3

users = 1000

# assign groups
treatment = np.random.choice([0,1], users)
treatment_effect = 2

# Identify query per session
user_query_means = np.random.normal(user_sample_mean, user_standard_error, users)

def run_session_experiment(user_means, users, user_assignment, treatment_effect):
    
    # reate click rate per session level
    queries_per_user = \
        treatment_effect*treatment[users]\
        + user_means[users] \
        + np.random.normal(0,1, len(users))
    
    queries_per_user=queries_per_user.astype(int)
    queries_per_user[queries_per_user<0] = 0

    return pd.DataFrame({'queries': queries_per_user, 'user': users, 'treatment': treatment[users]})
```


```python
# Generate pre-experiment data for each user once, i.e. over some period
pre_data=run_session_experiment(user_query_means, range(users),
                       treatment, 0)
pre_data.columns = ['pre_' + k if k != 'user' else k for k in pre_data.columns]
pre_data = pre_data[['pre_queries','user']]
```


```python
# Generate experiment data
day_impact = np.random.uniform(-3, 6, 7)
dfs = []
users_seen = set()
users_first_day = []
for k in range(14):
    # select the users for that day, each user has a 2/14 change of appearing
    day_users = np.random.choice([0,1], p=[12/14,2/14], size=users)
        
    available_users = np.where(day_users==1)[0]    
    day_user_query_means = user_query_means + day_impact[k % 7]
    
    df = run_session_experiment(day_user_query_means, available_users, treatment,
                        treatment_effect)
    df['first_day'] = k % 7
    df['real_day'] = k
    dfs.append(df)
```


```python
# We are doing a user level analysis with randomization unit
# equal to user as well. This means groupby's should be on user!
df=pd.concat(dfs)

def get_first_day(x):
    # Get the "first_day" value corresponding to their actual first day
    t=np.argmin(x['real_day'].values)
    tmp = x.iloc[t]['first_day']
    return tmp

dd=df.groupby(['user','treatment']).agg({'queries': 'sum'})

dd['first_day']=df.groupby(['user','treatment']).apply(get_first_day)
dd.reset_index(inplace=True) # pandas is really ugly sometimes

# combine data, notice each row is a unique user
data=dd.merge(pre_data, on='user')
```


```python
# Calculate theta
covariates=pd.get_dummies(data['first_day'],drop_first=False)
covariates.columns = ['day_'+str(k) for k in covariates.columns]
covariates['pre_queries'] = data['pre_queries']

all_data = np.hstack((data[['queries']].values,covariates.values))
big_cov = np.cov(all_data.T) # 9x9 matrix
sigma = big_cov[1:,1:] # 8x8
z = big_cov[1:,0] # 8x1

theta = np.dot(np.linalg.inv(sigma),z)
```


```python
# Construct CUPED estimate
Y = data['queries'].values.astype(float)
covariates = covariates.astype(float)
Y_cv = Y.copy()
for k in range(covariates.shape[1]):
    Y_cv -= theta[k]*(covariates.values[:,k] - covariates.values[:,k].mean())

```


```python
real_var, reduced_var = np.sqrt(Y.var()/len(Y)),\
    np.sqrt(Y_cv.var()/len(Y))
```


```python
reduced_var/real_var # variance reduction
```




    0.8368532147135743




```python
# Let's try OLS!
from statsmodels.formula.api import ols
results= ols('queries ~ pre_queries + C(first_day) + treatment', data).fit()
```


```python
# Some calculations for the final table
effect = Y[data.treatment==1].mean() - Y[data.treatment==0].mean() 
ste = Y[data.treatment==1].std()/np.sqrt(len(Y)) + Y[data.treatment==0].std()/np.sqrt(len(Y))

cuped_effect = Y_cv[data.treatment==1].mean() - Y_cv[data.treatment==0].mean() 
cuped_ste = Y_cv[data.treatment==1].std()/np.sqrt(len(Y)) + Y_cv[data.treatment==0].std()/np.sqrt(len(Y))
```


```python
pd.DataFrame(index=['t-test', 'CUPED', 'OLS'],data=
{
"effect size estimate": [effect, cuped_effect, results.params['treatment']],
 "standard error": [ste, cuped_ste, results.bse['treatment']]
}
)
```




<div>
<style scoped>
 
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
        border: 1px solid;

    }

   .dataframe tbody td {
        border: 1px solid;

    }
    .dataframe thead th {
        text-align: center;
        border: 1px solid;

    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>effect size estimate</th>
      <th>standard error</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>t-test</th>
      <td>5.014989</td>
      <td>1.048969</td>
    </tr>
    <tr>
      <th>CUPED</th>
      <td>4.458988</td>
      <td>0.876270</td>
    </tr>
    <tr>
      <th>OLS</th>
      <td>4.486412</td>
      <td>0.884752</td>
    </tr>
  </tbody>
</table>
</div>



# Non-User Level Metrics Considerations

If you have a non-user level metric, like the click through rate, the analysis from the first section is mostly unchanged. When you define $$Y_{cv}$$, we must account for those terms differently. Following Appendix B from the CUPED paper, let $$V_{i,+}$$ equal the sum of obervations of statistic $$V$$ for user $$i$$, $$n$$ the number of users and $$\frac{1}{n} \sum_i V_{i,+} = \bar{V}$$. Let $$M_{i,+}$$ be the number of visits for user $$i$$. Let $$X$$ be another user-level metric we will use for the correction. Then, we have the equation 
$$\begin{equation}Y_{cv} = \bar{Y} - \theta_1 \left( \frac{\sum_{i} V_{i,+}}{\sum_{i} M_{i,+}} - \mathbb{E}{\frac{\sum_{i} V_{i,+}}{\sum_{i} M_{i,+}}} \right ) - \theta_2 ( \bar{X} - \mathbb{E}X).\end{equation}$$
In this case, we have a page-level metric $$V/M$$ being used as a covariate for a user-level metric $$Y$$. Is this realistic? Maybe, but at least it will serve to illustrate what to do here.

When you write out the formula for the variance, you will have a term of the form

$$\begin{equation}
cov \left (\frac{\sum_{i} V_{i,+}}{\sum_{i} M_{i,+}} , \bar{X}\right ),
\end{equation}$$

where you need to apply the delta method to compute this covariance. We can write

$$\begin{equation}cov \left ( \frac{\sum_i V_{i,+}}{\sum_i M_{i,+}}, \bar{X} \right ) \approx cov\left (\frac{1}{\mu_{M}}\bar{V} - \frac{\mu_{V}}{\mu_{M}^2}\bar{M} , \bar{X}\right).\end{equation}$$
This term can be simplified via properties of covariance. In particular,
$$\begin{equation}
cov\left (\frac{1}{\mu_{M}}\bar{V} - \frac{\mu_{V}}{\mu_{M}^2}\bar{M} , \bar{X}\right)= \frac{1}{\mu_M}cov(\bar{V},\bar{X}) - \frac{\mu_V}{\mu_{M}^2 }cov(\bar{M},\bar{X}).
\end{equation}$$
At this point, you are able to calculate all the necessary terms and can sub this value in for the $$\partial d / \partial \theta_i$$ equation. 

## Calculating the Delta Method Term the Easy Way

Using the previous presentation of the delta method, we can actually make our lives easier by replacing the vector $$\bar{V}/\bar{M}$$ with the delta estimate $$\frac{1}{\mu_{M}}\bar{V} - \frac{\mu_{V}}{\mu_{M}^2}\bar{M}$$ and then calculating the covariance, rather than applying any of the complicated delta formulae.

All that's left is to convince you of this. First, I'll take the formula for the delta method from my previous post and show it is equivalent to taking the variance of the vector $$\frac{1}{\mu_{M}}\bar{V} - \frac{\mu_{V}}{\mu_{M}^2}\bar{M}$$.


```python
# Define our data
V = np.random.normal(user_sample_mean, user_standard_error, users)
M = np.random.normal(user_sample_mean*2, user_standard_error, users)
X = np.random.normal(0,1,users)


mu_V, mu_M = V.mean(), M.mean()
```


```python
def _delta_method(clicks, views):
    # Following Kohavi et. Al. clicks and view are at the per-user level
    # Clicks and views are aggregated to the user level and lined up by user,
    # i.e., row 1 = user 1 for both X and Y
    
    K = len(clicks)
    X = clicks
    Y = views
    
    # sample mean
    X_bar = X.mean()
    Y_bar = Y.mean()
    
    # sample variance
    X_var = X.var(ddof=1)
    Y_var = Y.var(ddof=1)
    
    cov = np.cov(X,Y, ddof=1)[0,1] # cov(X-bar, Y-bar) = 1/n * cov(X,Y)
    
    # based on deng et. al
    return (1/K)*(1/Y_bar**2)*(X_var + Y_var*(X_bar/Y_bar)**2 - 2*(X_bar/Y_bar)*cov)

_delta_method(V, M)
```




    4.452882421409211e-05




```python
# Take the variance of the taylor expansion of V/M
(1/users)*np.var((1/mu_M)*V-(mu_V/mu_M**2)*M, ddof=1)
```




    4.452882421409211e-05



### How to calculate Sigma

How do we use this insight to make our $$\sigma$$ calculation easier? Simply replace any vector of the metric $$V/M$$ with the linearized formula $$\frac{\bar{V}}{\mu_{M}} - \frac{\mu_{V}}{\mu_{M}^2}\bar{M}$$ and take the covariance as usual.


```python
# Formula for the covariance from the previous section
delta_var = (1/users)*((1/mu_M)*np.cov(V,X)[0,1] - (mu_V/mu_M**2)*np.cov(M,X)[0,1])
delta_var
```




    -5.78229317802757e-06




```python
# Sub in the value for each vector before taking the covariance
pre_cov_est = (1/users)*np.cov((1/mu_M)*V-(mu_V/mu_M**2)*M, X)[0,1]
pre_cov_est
```




    -5.782293178027562e-06



In our case, $$V$$ and $$M$$ are correlated and so the equivalence I empirically demonstrated was not a sleight of hand that doesn't always work.


```python
np.cov(V,M)
```




    array([[9.10327978, 0.10338676],
           [0.10338676, 9.29610525]])



## Why haven't I seen this before?

I have personally implemented the delta method formula multiple times before realizing I could linearize before calculating the covariance, and so I do not think this calculation trick is _obvious_. However, in hindsight, I don't understand why I never saw the delta method calculation presented this way. This next bit is pure speculation on my part, but it's likely that in the first paper on [applying the delta method](https://arxiv.org/pdf/1803.06336.pdf), the approach they used to prove the formula obscured this simplification and so they did not have this insight in that paper. However, the presentation of the delta method in the CUPED paper was more advanced and made this approach seem reasonable based on the elegance of their derivation. After seeing Appendix B, I had the suspicion that I could linearize and then compute. And it works!
