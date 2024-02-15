---
layout: post
title: Connections Between the Delta Method, OLS and CUPED, Illustrated
tags:
- Statistics
- A/B Testing
- Practical
summary: Empirical evidence of the equivalence of OLS and CUPED, plus special considerations for page-level metrics.
---

In the past decade, there have been many advancements to enable A/B testing at (sometimes even small!) scale. Thankfully, many A/B testing practitioners have come forward and written [books](https://experimentguide.com/) and [papers](https://www.kdd.org/kdd2016/papers/files/adf0853-dengA.pdf) on the finer details. Even with the deluge blog posts on the subject-- there's one topic that does not get a lot of attention, and specifically a lot of code related to it: the connection between OLS, the delta method, and how those techniques connect to CUPED. Understanding their connection is critical when trying to apply more advanced techniques like [CUPED](https://www.exp-platform.com/Documents/2013-02-CUPED-ImprovingSensitivityOfControlledExperiments.pdf) (said "Cupid") with session level metrics. 

In this post, we will empirically demonstrate the folllowing things:
   1. The variance from the delta method equals the OLS variance with cluster robust standard errors.
   2. The CUPED variance reduction can be achieved (and is equivalent to) using OLS (both one and two steps!)
   3. How to use the CUPED approach with multiple covariates via OLS.
   4. How to use CUPED when the randomization unit does not equal the unit of analysis (i.e., Appendix B of [Deng et. al](https://www.exp-platform.com/Documents/2013-02-CUPED-ImprovingSensitivityOfControlledExperiments.pdf).)
Implicitly, this post assumes you know that standard OLS is equivalent to a $$t$$-test when properly setup. If you are not sure of this, convince yourself of this by considering regressing $$Y\sim d$$ where $$d$$ is a binary indicator of being in the treatment and $$Y$$ is our variable of interest.

## Motivation

A basic $$t$$ test assumes analysis unit (usually users) equals your randomization unit (also users, as treatments are sticky per users in most cases). The problem is many of our units have mismatched units. A common unit is the click through rate (CTR), commonly defined as 
$$$$\frac{clicks}{sessions},$$$$ where sessions can be thought of as page views for this discussion. Right here, we have a mismatch in units as these are both at the session level and not the user level. We can fix this by writing each as a "per user" metric, by dividing top and bottom by the number of users:

$$\begin{equation}\frac{clicks}{sessions} = \frac{\frac{clicks}{N}}{\frac{sessions}{N}}=\frac{clicks\ per\ user}{sessions\ per\ user}.\end{equation}$$

Simple enough-- now our numerator and denominator have the same units, but now when we try to calculate the variance of this term, using `np.var` will underestimate the variance. This underestimate leads to a higher false positive rate. In fact, if you perform simulated A/A tests, the p-values will not be uniformly distributed but instead have a slight bump on the left hand side of your plot, near 0.  

To avoid this and to regain a flat p-value distribution, the guidance in the A/B testing community is to use the [delta method](https://alexdeng.github.io/public/files/kdd2018-dm.pdf). The delta method uses a Taylor expansion (more or less) to find an approximation to the variance which is "close enough" when the number of users $$N$$ becomes large. I'll spare you the formula, but it's in the paper linked.

However, if you come from a stats background, you may be thinking that you should be able to just use Ordinary Least Squares (OLS) with [clustered standard errors](https://en.wikipedia.org/wiki/Clustered_standard_errors). For awhile, there was no official document linking these two techniques, the delta method from A/B testing and OLS with cluster robust standard errors. Until Deng et al., published a [proof](https://arxiv.org/abs/2105.14705) they are equivalent. But, interestingly the idea of clustered standard errors were well understood in economics and other fields, but had not been connected to the A/B testing literature until 2021.

With that said, it's one thing to understand the techniques individually and their connections at a high level and quite another thing to understand them in practice. I speak from experience because althought I _knew_ the theory behind the contents of this post, it took me much longer than I'd like to admit to write it down coherently with simulated examples. And, that is the point of this-- to present empirical evidence of the aforementioned claims.

## Structure of Each Example

In each example, I will simulate the true variance (and know the effect size by definition) and then aim to recover the proper variance through various techniques. I will also comment on when things go awry to hopefully help others in the same position. Each example will illustrate how to use a $$t$$-test for the calculation, as that method is the most scalable. 

### $$t$$-test calculation

As a refresher and to set notation, assume we have two groups $$A$$ and $$B$$ are associated with random variables $$X$$ and $$Y$$. We define their sample means as $$\bar{X}$$ and $$\bar{Y}$$ respectively, their variances $$\text{var}(X):=\sigma_X^2$$ and $$\text{var}(Y):=\sigma_Y^2$$, and their user counts as $$n_A$$ and $$n_B$$. The simplest formula for the $$t$$-score, which for large $$n$$ is equivalent approximately to the $$z$$-score, is
$$\begin{equation}\frac{\bar{X}-\bar{Y}}{ \sqrt{ \frac{\sigma_X^2}{n_A} + \frac{\sigma_Y^2}{n_B} }}.\end{equation}$$

Note, because the two groups are independent, then $$X$$ and $$Y$$ are independent, and the denominator comes from the observation that
$$\begin{equation}\text{var}(\bar{X}-\bar{Y}) = \text{var}(\bar{X}) + \text{var}(\bar{Y}) = \frac{\text{var}(X)}{n_X}+\frac{\text{var}(Y)}{n_Y}.\end{equation}$$$$


```python
import numpy as np
import pandas as pd
from statsmodels.formula.api import ols
```

# 1. OLS with clustered standard errors is equivalent to the variance from the delta method

 


```python
np.random.seed(1)
user_sample_mean = .3
user_standard_error = .15

users = 50000
pre_n_views = 100000
n_views = 100000

# assign groups
treatment = np.random.choice([0,1], users)
treatment_effect = .25

# Identify individual user click percentage mean
user_click_means = np.random.normal(user_sample_mean, user_standard_error, users)

def run_session_experiment(user_click_means, n_views, user_assignment, treatment_effect):

    # determine user per each sessions/view
    user_sessions = np.random.choice(users, n_views)

    # reate click rate per session level
    click_percent_per_session = treatment_effect*treatment[user_sessions] + user_click_means[user_sessions] + np.random.normal(0,.01, n_views)

    # Remove <0 or >1
    click_percent_per_session[click_percent_per_session>1] = 1
    click_percent_per_session[click_percent_per_session<0] = 0

    clicks_observed = np.random.binomial(1, click_percent_per_session)
    
    return pd.DataFrame({'clicks': clicks_observed, 'user': user_sessions, 'treatment': treatment[user_sessions], 'views' : np.ones_like(user_sessions)})
```


```python
# Simulate for "true" standard error
diffs = []
for k in range(100):
    o = run_session_experiment(user_click_means, n_views, treatment, treatment_effect)
    gbd=o.groupby(['user','treatment'], as_index=False).agg({'clicks':'sum', 'views': 'sum'})
    A, B = gbd.treatment == 0, gbd.treatment ==1
    diffs.append((gbd.clicks[B].sum()/gbd.views[B].sum()) - (gbd.clicks[A].sum()/gbd.views[A].sum()))
print('effect','ste', np.array(diffs).mean(), np.array(diffs).std()) # std error
```

    effect ste 0.24817493916173397 0.003371032173547226



```python
data = run_session_experiment(user_click_means, n_views, treatment, treatment_effect)
```


```python
df = pd.DataFrame({'Y' : data.clicks, 'd' : data.treatment, 'g' : data.user})

o=ols('Y~d',df).fit(cov_type='cluster', cov_kwds={'groups': df['g'], 'use_correction':False})
o.params['d'],o.bse['d'] # see standard  error for d
```




    (0.24903284320201524, 0.003304827358515906)




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

```


```python
# NOTICE - delta method only is a good approximation when the cluster size K is approximately constant and number of users is larger
gbd=data.groupby(['user','treatment'], as_index=False).agg({'clicks':'sum', 'views': 'sum'})
A, B = gbd.treatment == 0, gbd.treatment ==1
np.sqrt(_delta_method(gbd.clicks[A], gbd.views.values[A])+_delta_method(gbd.clicks[B], gbd.views[B]))
```




    0.0033049040362566383



### Note: Mind the size of $$n$$!
The delta method only applies when $$n$$ is large, and so for small $$n$$, the approximation may not hold. In fact, if you rerun this when $$n<1000$$, the delta method isn't a good approximation.

# 2. The CUPED procedure is equivalent to just using OLS with a covariate

In particular, consider $$\hat Y_{cv}=Y-\theta (X-\mathbb{E}X)$$ from the CUPED paper, where $$\theta = \text{cov}(X,Y)/\text{var}(X)$$. Then, $$\theta$$ and the proper variance reduction can be gained by constructing the OLS formula $$Y\sim X+d+c$$ where $$X$$ is your pre-experiment covariate, $$d$$ is your treatment indicator, and $$c$$ is a constant.


```python
# Changing the counts for a better approximation
# Larger number of users negate the need for CUPED as each user only appears once or twice
users = 10000
#pre_n_views = 200000
n_views = 200000
```


```python
# Simulate for "true" standard error, we know the exact value of the effect by design
diffs = []
for k in range(100):
    o = run_session_experiment(user_click_means, n_views, treatment, treatment_effect)
    gbd=o.groupby(['user','treatment'], as_index=False).agg({'clicks':'sum', 'views': 'sum'})
    A, B = gbd.treatment == 0, gbd.treatment ==1
    diffs.append(gbd.clicks[B].mean() - gbd.clicks[A].mean())
sim_ste = np.array(diffs).std() # std error
```


```python
# For a user metric, must do sum-- not mean-- as that considers session counts         

# Generate pre-experiment data and experiment data, using same user click means and treatments, etc.
before_data = run_session_experiment(user_click_means, pre_n_views, treatment, 0)
after_data = run_session_experiment(user_click_means, n_views, treatment, treatment_effect)

# To apply the delta method or cuped, the calculations are at the user level, not sessions
bd_agg = before_data.groupby('user', as_index=False).agg({'clicks': 'sum', 'views' : 'sum'})
ad_agg = after_data.groupby('user', as_index=False).agg({'treatment': 'max', 'clicks': 'sum', 'views' : 'sum'})

#assert bd_agg.user.nunique() == ad_agg.user.nunique() # make sure all users sampled
bd_agg.columns = ['pre_' + col for col in bd_agg.columns]

d=ad_agg.join(bd_agg, on='user', how='left')

d['pre_clicks'] = d['pre_clicks'].fillna(d.pre_clicks.mean()) # users not seen in pre-period

cv = np.cov(d['clicks'], d['pre_clicks']) # clicks per user!
theta = cv[0,1]/cv[1,1]

y_hat = d.clicks - theta * (d.pre_clicks - d.pre_clicks.mean())

d['y_hat'] = y_hat
d['y_hat_div_n'] = y_hat 


means = d.groupby('treatment').agg({'y_hat':'mean'})
variances = d.groupby('treatment').agg({'y_hat':'var', 'clicks':'count'}) 

effect=means.loc[1] - means.loc[0]
standard_error = np.sqrt(variances.loc[0, 'y_hat'] / variances.loc[0, 'clicks'] + variances.loc[1, 'y_hat'] / variances.loc[1, 'clicks'])
t_score = (means.loc[1] - means.loc[0]) / standard_error
```


```python
# variance reduction
var_redux=np.corrcoef(d['clicks'], d['pre_clicks'])[0,1]**2 
```


```python
# Two step OLS, which indirectly estimates theta with OLS

s1 = ols('Y ~ X', pd.DataFrame({'Y': d.clicks, 'X': d.pre_clicks})).fit()

residuals = s1.resid # Y - theta*(X) - C, constant C handles the mean term

d['y_hat'] =  residuals

# You can either do the t-test here or use OLS again
means = d.groupby('treatment').agg({'y_hat':'mean'})
variances = d.groupby('treatment').agg({'y_hat':'var', 'clicks':'count'}) 

effect2 = means.loc[1] - means.loc[0]
standard_error2 = np.sqrt(variances.loc[0, 'y_hat'] / variances.loc[0, 'clicks'] + variances.loc[1, 'y_hat'] / variances.loc[1, 'clicks'])
t_score2 = (means.loc[1] - means.loc[0]) / standard_error
s2 = ols('resid ~ d', pd.DataFrame({'resid': d['y_hat'], 'd': d.treatment})).fit()
```


```python
# Direct OLS w/ pre-term stuff, note a constant is added automatically with the formula API

s3 = ols('Y ~ d + X', pd.DataFrame({'Y': d.clicks, 'd': d.treatment, 'X': d.pre_clicks})).fit()
```


```python
# Direct OLS, no pre-term
s4 = ols('Y ~ d ', pd.DataFrame({'Y': d.clicks, 'd': d.treatment, 'X': d.pre_clicks})).fit()
```


```python
# t-test, no CUPED
means = d.groupby('treatment').agg({'clicks':'mean'})
variances = d.groupby('treatment').agg({'clicks':'var', 'y_hat':'count'}) 

effect_none=(means.loc[1] - means.loc[0]).iloc[0]
standard_error_none = np.sqrt(variances.loc[0, 'clicks'] / variances.loc[0, 'y_hat'] + variances.loc[1, 'clicks'] / variances.loc[1, 'y_hat'])
t_score_none = effect_none/standard_error_none
```


```python
ground_truth_effect = (n_views/users)*treatment_effect
pd.DataFrame(
 { 'method' : ['Ground Truth','Vanilla t-test','Vanilla OLS, no CUPED', 'CUPED with theta formula -> t-test', 'OLS estimates residuals -> t-test', '2 Step OLS', 'OLS'],
  'estimated effect': [ground_truth_effect, effect_none, s4.params['d'],effect.iloc[0], effect2.iloc[0], s2.params['d'], s3.params['d']], 
  'theta': [None, None, None, theta, s1.params['X'], s1.params['X'],s3.params['X']],
  't_score' : [ground_truth_effect/sim_ste, t_score_none, s4.tvalues['d'],t_score.iloc[0], t_score2.iloc[0], s2.tvalues['d'],s3.tvalues['d']],
  'standard_error': [sim_ste, standard_error_none, s4.bse['d'], standard_error, standard_error2, s2.bse['d'], s3.bse['d']]}
)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>method</th>
      <th>estimated effect</th>
      <th>theta</th>
      <th>t_score</th>
      <th>standard_error</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Ground Truth</td>
      <td>5.000000</td>
      <td>NaN</td>
      <td>84.642781</td>
      <td>0.059072</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Vanilla t-test</td>
      <td>4.915146</td>
      <td>NaN</td>
      <td>59.331897</td>
      <td>0.082842</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Vanilla OLS, no CUPED</td>
      <td>4.915146</td>
      <td>NaN</td>
      <td>59.340633</td>
      <td>0.082829</td>
    </tr>
    <tr>
      <th>3</th>
      <td>CUPED with theta formula -&gt; t-test</td>
      <td>4.927060</td>
      <td>0.300307</td>
      <td>60.330392</td>
      <td>0.081668</td>
    </tr>
    <tr>
      <th>4</th>
      <td>OLS estimates residuals -&gt; t-test</td>
      <td>4.927060</td>
      <td>0.300307</td>
      <td>60.330392</td>
      <td>0.081668</td>
    </tr>
    <tr>
      <th>5</th>
      <td>2 Step OLS</td>
      <td>4.927060</td>
      <td>0.300307</td>
      <td>60.339849</td>
      <td>0.081655</td>
    </tr>
    <tr>
      <th>6</th>
      <td>OLS</td>
      <td>4.927445</td>
      <td>0.310026</td>
      <td>60.340052</td>
      <td>0.081661</td>
    </tr>
  </tbody>
</table>
</div>




```python
# expected std? due to cuped
np.sqrt((1-var_redux)*standard_error_none**2) # close !
```




    0.08202757811298232



# CUPED when the randomization units are not equal to the analysis unit

This situation occurs for session or page level metrics like the click through rate $$\left ( \frac{clicks}{sessions} \right )$$ when typically the A/B split occurs on users (i.e., you hash the user ID, the treatment is sticky by user, etc.) yet the metric does not contain users at all. As seen in the first example, this is a common situation to use the delta method. However, it's unclear at first glance how to do this with CUPED. In the paper by Deng et al., Appendix B sketches how to combine the delta method with CUPED.

However, it is complicated, and it could be confusing to implement. In this case, you don't apply the delta method like in the typical $$t$$-test, but rather Deng et al. applies the delta method (i.e., Taylor's theorem) to linearize the terms in the variance and covariance and then passes $$n\to\infty$$ to get an approximation. This is the same process as deriving the normal delta method, but this time they use it to get a formula in terms of several user level metrics. So, at the end of the day, you don't calculate the traditional delta method at all for the variances, but rather you use their new formula given in Appendix B which I have recreated below.

# $$\theta$$ calculation


```python
def _extract_variables(d):
    class VariableHolder:
        ''' 
        Convenient container class to hold common calculations that I have to do several times
        off of data frames and return all those variables to the previous scope
        
        d must be aggregated to the iid level, i.e., user
        '''
        n =len(d)
        Y, N = d.clicks.values, d.views.values
        X, M = d.pre_clicks.values, d.pre_views.values
        sigma = np.cov([Y,N,X,M]) # 4

        mu_Y, mu_N = Y.mean(), N.mean()
        mu_X, mu_M = X.mean(), M.mean()
        beta1 = np.array([1/mu_N,-mu_Y/mu_N**2,0,0]).T
        beta2 = np.array([0,0,1/mu_M,-mu_X / mu_M**2]).T
    
    return VariableHolder()

def calculate_theta(V):
    # assumes the V, the VariableHolder class is passed in    

    # formula from Deng et al. n's would cancel out
    theta = np.dot(V.beta1, np.matmul(V.sigma,V.beta2)) / np.dot(V.beta2, np.matmul(V.sigma,V.beta2))
    return theta
```

# What is the variance of $$\hat{Y}_{cv}$$?

By the definition of variance, $$var(\hat{Y}_{cv})= var(Y/N) + \theta^2 \cdot var(X/M)-2\theta cov(Y/N, X/M)$$. Each term has to be calculated via the delta method and summed together... unless we can use OLS!



```python
def var_y_hat(V, theta):
    # assumes the V, the VariableHolder class is passed in    
        
    # formula from Deng et al., using the delta method
    # to arrive at a new formula from Appendix B
    var_Y_div_N = np.dot(V.beta1, np.matmul(V.sigma,V.beta1.T))
    
    var_X_div_M = np.dot(V.beta2, np.matmul(V.sigma,V.beta2))
    cov = np.dot(V.beta1, np.matmul(V.sigma,V.beta2))
    
    # can also use traditional delta method for the var_Y_div_N type terms
    return (var_Y_div_N+(theta**2)*var_X_div_M-2*theta*cov)/V.n
```

# Simulate it!


```python
def cuped_exp(user_click_means, user_assignment, treatment_effect, views=150000):
    
    # Generate pre-experiment data and experiment data, using same user click means and treatments, etc.
    before_data = run_session_experiment(user_click_means, views, treatment, 0)
    after_data = run_session_experiment(user_click_means, views, treatment, treatment_effect)

    # To apply the delta method or cuped, the calculations are at the user level, not sessions
    bd_agg = before_data.groupby('user', as_index=False).agg({'clicks': 'sum', 'views' : 'sum'})
    ad_agg = after_data.groupby('user', as_index=False).agg({'treatment': 'max', 'clicks': 'sum', 'views' : 'sum'})

    bd_agg.columns = ['pre_' + col for col in bd_agg.columns]
        
    d=ad_agg.join(bd_agg, on='user', how='left')
    d['pre_clicks'] = d['pre_clicks'].fillna(d.pre_clicks.mean()) # users not seen in pre-period
    d['pre_views'] = d['pre_views'].fillna(d.pre_views.mean()) # users not seen in pre-period
    V = _extract_variables(d)
    theta = calculate_theta(V)

    Y_hat = V.Y/V.N - theta*(V.X/V.M - (V.X/V.M).mean()) # Y_hat mean!
    
    # create assignment
    d['treatment']=[user_assignment[k] for k in d.user]
    
    df = pd.DataFrame({"resids" : Y_hat, "d": d.treatment.values})
    results = ols('resids ~ d', df).fit()
    results.params['d'], results.pvalues['d']/2 # divide by 2 for single tai;
    
    A = d.treatment == 0
        
    # should I do this or not? should it just be 1 variance
    Vt = _extract_variables(d[~A])
    Vc = _extract_variables(d[A])
    

    # Return difference of means, variance
    return Y_hat[~A].mean() - Y_hat[A].mean(), \
            var_y_hat(Vt,theta)+var_y_hat(Vc,theta), d, theta, results
```


```python
# Keep the users fixed per experiment, to simulate sampling from a real user base
users = 10000
n_views = 200000 # each user need enough examples for the covariances to be nonzero
np.random.seed(10)
user_click_means = np.random.normal(user_sample_mean, user_standard_error, users)
treatment = np.random.choice([0,1], users)
```


```python
cupeds = []
thetas = []
for k in range(100):
    o=cuped_exp(user_click_means, treatment, treatment_effect, views=n_views)
    cupeds.append(o[0])
    thetas.append(o[-2])
```


```python
# Ground truth values from simulation
cupeds=np.array(cupeds)
cm=cupeds.mean()
cste=cupeds.std()
t_score = cm/cste
```


```python
# Additional run for traditional t-test using Y_hat and variance correction
o=cuped_exp(user_click_means, treatment, treatment_effect, views=n_views)
results=o[-1]
theta=o[-2]
delta_std = np.sqrt(o[1])
```


```python
# OLS session level with pre-treatment variables
before_data = run_session_experiment(user_click_means, n_views, treatment, 0) # No treatment in before period
after_data = run_session_experiment(user_click_means, n_views, treatment, treatment_effect)
bd_agg = before_data.groupby('user', as_index=False).agg({'clicks': 'sum', 'views' : 'sum'})

bd_agg.columns = ['pre_'+k   if k != 'user' else k for k in bd_agg.columns]

# Join raw session data and fill in missing values
ols_data = after_data.merge(bd_agg, on='user', how='left')
ols_data['pre_clicks'] = ols_data['pre_clicks'].fillna(before_data.clicks.mean()) # users not seen in pre-period
ols_data['pre_views'] = ols_data['pre_views'].fillna(before_data.views.mean()) # users not seen in pre-period

s7=ols('Y ~ X + d', {'Y': ols_data.clicks,  'X' : (ols_data.pre_clicks/ols_data.pre_views - (ols_data.pre_clicks/ols_data.pre_views).mean()) , 'd': ols_data.treatment}).fit(cov_type='cluster', cov_kwds={'groups': ols_data['user'], 'use_correction':False})

```


```python
# theta distribution and its standard deviation (not standard error)
np.mean(thetas),np.sqrt(np.var(thetas))
```




    (0.679012644432057, 0.008879178301584759)




```python
pd.DataFrame(
 { 'method' : ['Simulation (Ground truth)', 'CUPED w/ Special Theta -> t-test', 'OLS with cluster robust SEs'],
  'estimated effect': [cm,results.params['d'], s7.params['d']], 
  'theta': [np.mean(thetas), theta, s7.params['X']],
  't_score' : [t_score, results.tvalues['d'],s7.tvalues['d']],
  'standard_error': [cste, delta_std,s7.bse['d']]}
)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>method</th>
      <th>estimated effect</th>
      <th>theta</th>
      <th>t_score</th>
      <th>standard_error</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Simulation (Ground truth)</td>
      <td>0.249992</td>
      <td>0.679013</td>
      <td>101.278105</td>
      <td>0.002468</td>
    </tr>
    <tr>
      <th>1</th>
      <td>CUPED w/ Special Theta -&gt; t-test</td>
      <td>0.256820</td>
      <td>0.679159</td>
      <td>96.635135</td>
      <td>0.002712</td>
    </tr>
    <tr>
      <th>2</th>
      <td>OLS with cluster robust SEs</td>
      <td>0.249392</td>
      <td>0.676926</td>
      <td>92.796036</td>
      <td>0.002688</td>
    </tr>
  </tbody>
</table>
</div>



# Discussion

So, now we have seen the myriad of ways that CUPED and OLS tie together with the delta method sprinkled in for good measure. The question remaining is why use the delta method at all, or the CUPED calculation, if OLS with cluster robust standard errors (i.e., the sandwich estimator) can do it for you. It's a good question, and the answer lies in performance. The full OLS calculation is more computationally expensive and cannot as easily be parallelized, and so scaling OLS to very large datasets could prove challenging. It's a similar reason as to why practitioners prefer to use the delta method instead of bootstrapping for a variance estimate. Both would yield a correct variance approximation, but one takes a much longer time to compute.

I have also specifically avoided the questions of the validity of possibly non-IID data. This topic is covered at length in this [paper](https://alexdeng.github.io/public/files/wsdm2017-rup.pdf) from Deng et al. and may be a topic for a later post.

# Acknowledgements

I have to extend a thank you to many people who discussed and simulated this problem along side me to get to a coherent post: Kevin Foley who introduced me to this connection and championed OLS and the formula API from `statsmodels`, Tianwen Chen for discussing the various approaches and reviewing my simulations, and Chiara Capuano for helping me with reference hunting and giving feedback.
