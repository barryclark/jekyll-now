---
title: A Note about Gibbs Sampling with Data Augmentation
layout: post
---
Hello there, my future me. Are you here to revise what Gibbs Sampling with data augmentation is?
You are in the right place! However, there are still some problems that I haven't figured out.
I will mark those so you can think about it and update it here. Hopefully, you will do better than I did.
Without further ado, let us begin!

# Problem Definition

We want to know the distribution of heights among male and female.
However, with a little twist, we don't know which sample belongs to which sex.
To illustrate that, let's create a sample data that will be used later.


```python
%matplotlib inline
%config InlineBackend.figure_formats = ['svg']
```


```python
import matplotlib as mpl
mpl.rcParams['figure.dpi'] = 100

import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

sns.set()
np.random.seed(77)
```


```python
# Number of observations.
nb_observations = 1000
sex_prob = 0.5 # Probability that a sample belongs to male or female.

true_height_std = 8 # (in cm): height std applied to both sex.
true_male_mean_height = 185

true_female_mean_height = 170
```


```python
# Generate data.
Z_true = np.random.binomial(size=nb_observations, p=sex_prob, n=1)
male_height_samples = np.random.normal(loc=true_male_mean_height,
                                       scale=true_height_std,
                                       size=nb_observations)
female_height_samples = np.random.normal(loc=true_female_mean_height,
                                         scale=true_height_std,
                                         size=nb_observations)

# Our final observations, only the heights, without knowing which samples belongs to which sex.
observations = np.zeros(nb_observations)
for i in range(nb_observations):
    observations[i] = (male_height_samples[i]
                       if Z_true[i] == 1
                       else female_height_samples[i])

# Visualize what we've got.
fig_observations_hist, ax = plt.subplots(1, 1, tight_layout=True)
sns.distplot(observations,
             ax=ax,
             axlabel='Heights (cm)')
ax.set_title('Observations distribution')
```




    Text(0.5, 1.0, 'Observations distribution')




![svg]({{ site.baseurl }}/images/2020-05-16-gibbs-sampling-with-data-augmentation_files/2020-05-16-gibbs-sampling-with-data-augmentation_6_1.svg)


OK, so the question now becomes: from the observations above, can the distribution of heights for both sex be estimated,
without knowing which samples are male and female?

The answer is, surprisingly, yes, with the help of Gibbs sampling with data augmentation.

# Gibbs Sampling with Data Augmentation

Before we dive into data augmentation, let's understand what Gibbs Sampling is first.

Gibbs sampling is Markov chain Monte Carlo (MCMC) algorithm for estimating the parameters that match the given data observations.
Suppose you have some data points $x$ that follow a distribution defined by a _pdf_ $p(x | \theta_1 \theta_2)$.
However, you don't know exactly what the thetas are.
So based on the given data points $x$, you want to estimate the distribution of both the thetas.
Gibbs sampling is one type of algorithm that can help you with that.

In order to do that, in Gibbs sampling, we will follow these steps:

1. Figure out the conditional distributions $p(\theta_1 | \theta_2, x)$ and $p(\theta_2 | \theta_1, x)$.
1. Pick the initial $\theta_2^{(0)}$.
1. Loop through a number of iterations:

  1. Sample $\theta_1^{(i)} \sim p(\theta_1 | \theta_2^{(i-1)}, x)$.
  1. Sample $\theta_2^{(i)} \sim p(\theta_2 | \theta_1^{(i)}, x)$.

If you want to know how the algorithm is done, [here](https://kieranrcampbell.github.io/blog/2016/05/15/gibbs-sampling-bayesian-linear-regression.html) is a great article about Gibbs sampling and its implementation.

Now, let's turn to Gibbs sampling with data augmentation.
The hardest part in Gibbs sampling is figuring out what the conditional distributions look like.
And in some cases, we could not find out what the distributions are.
Fortunately, the conditional distributions will be easier to find if we introduce additional variables to condition on.
This is exactly what Gibbs sampling with data augmentation does.
So instead of figuring out $p(\theta_1 | \theta_2, x)$ or $p(\theta_2 | \theta_1, x)$ directly,
we introduce some latent variables $z$ and find the conditional distributions $p(\theta_1 | \theta_2, z, x)$ and $p(\theta_2 | \theta_1, z, x)$ instead.
Then, we sample the thetas and $z$ based on the distributions we figured out.

OK, I have given you an overview of Gibbs sampling but I bet you are still confused.
So why don't we go back to our original data and explain how Gibbs sampling with data augmentation could help us.

# Step-by-step Guide

Let's recall what we have got.
We know that we have some number of observations `nb_observations` and what the histogram looks like.
Also, we assume that we know the standard deviation of heights.


```python
print(f'#observations: {nb_observations}, height std: {true_height_std} (cm)')
fig_observations_hist
```

    #observations: 1000, height std: 8 (cm)





![svg]({{ site.baseurl }}/images/2020-05-16-gibbs-sampling-with-data-augmentation_files/2020-05-16-gibbs-sampling-with-data-augmentation_10_1.svg)



Based on the observations, we want to know the distributions of $\mu_0$ and $\mu_1$,
which are the mean value of female and male heights respectively.
It is easy to see that individual observation $x$ will follow the distribution $p(x | \mu_0, \mu_1)$.

To find the distributions, we will apply Gibbs sampling.
However, finding the conditional distributions $p(\mu_0 | \mu_1, x)$ or $p(\mu_1 | \mu_0, x)$ won't be an easy task.
Therefore, we'll need data augmentation.

Let's introduce an indicator random variable $z \in \{0, 1\}$ indicates whether an observation belongs to male or female.
Before figuring out the conditional distributions, we need to specify the prior distributions of the parameters.
$$
\begin{align*}
  \mu_1, \mu_2 &\stackrel{iid}{\sim} \mathcal{N}(m, l^{-1}) \\
  \pi &\sim Beta(a, b) \\
  z|\pi &\sim Bernoulli(\pi) \\
  x|\mu, z &\sim \mathcal{N}(\mu, \lambda^{-1}) \\
\end{align*}
$$

with $m, l, a, b$ are hyper parameters and $\lambda = \frac{1}{\sigma^2} = \frac{1}{8^2}$.

Now, our job is just simply deriving these conditional distributions:
$p(\pi | \mu_0, \mu_1, \mathbf{z}, \mathbf{x})$,
$p(\mu_0 | \mu_1, \pi, \mathbf{z}, \mathbf{x})$,
$p(\mu_1 | \mu_0, \pi, \mathbf{z}, \mathbf{x})$,
$p(\mathbf{z} | \mu_0, \mu_1, \pi, \mathbf{x})$.
Notice that I have changed the normal $x$ and $z$ to bold $\mathbf{x}$ and $\mathbf{z}$.
The reason is we don't just observe a single sample, but we observe the whole observations.
Therefore, we have to condition on the whole observations, denoted by $\mathbf{x}$ and $\mathbf{z}$.
So from now on, I will use $\mathbf{x}$, $\mathbf{z}$ to denote the whole observations,
and $x_i$, $z_i$ to denote the $i$th observation.

OK, now we will derive the conditional distributions.
Our game plan will be first deriving the conditional distribution,
and then show how a sampler based on the distribution be implemented in code.

## Deriving $p(\pi | \mu_0, \mu_1, \mathbf{z}, \mathbf{x})$

Since when $\pi$ conditioning on $\mathbf{z}$ is independent of $\mu_0, \mu_1, \mathbf{x}$,
we can derive the conditional distribution of $\pi | \mathbf{z}$ as follows:

$$
\begin{align*}
  p(\pi | \mu_0, \mu_1, \mathbf{z}, \mathbf{x})
      &= p(\pi | \mathbf{z}) \\
      &= \frac{p(\mathbf{z} | \pi) p(\pi)}{p(\mathbf{z})} \text{ (Bayes's Theorem)} \\
      &\approx p(\mathbf{z} | \pi) p(\pi) \\
      &= \prod_{i = 1}^{n} p(z_i | \pi) p(\pi) \text{ (since each } z_i | \pi \text{ is iid with each other)} \\
      &= \frac{\pi^{n_1} (1 - \pi)^{n_0} \pi^{a - 1} (1 - \pi)^{b - 1}}{B(a, b)} \\
      &= \frac{\pi^{a + n_1 - 1} (1 - \pi)^{b + n_0 - 1}}{B(a, b)} \\
      &= Beta(a + n_1, b + n_0) \\
\end{align*}
\\
\text{where } n_k = \sum_{i = 1}^{n} \mathbb{1}(z_i = k) \text{ for } k \in \{0, 1\}
$$

And here is the code to sample $\pi$.


```python
def sample_pi(a, b, z):
    n_0 = np.sum(z == 0)
    n_1 = np.sum(z == 1)

    return np.random.beta(a + n_1, b + n_0)
```

## Deriving $p(\mu_0 | \mu_1, \pi, \mathbf{z}, \mathbf{x})$ and $p(\mu_1 | \mu_0, \pi, \mathbf{z}, \mathbf{x})$

First, we will derive the conditional distribution $p(\mu_0 | \mu_1, \pi, , \mathbf{z}, \mathbf{x})$.
The steps for deriving the other conditional distribution will be the same, and it will be a great exercise for you ;).

Since we're deriving the distribution of a random variable, we're allowed to remove constants to simplify the calculation.
Perhaps a better term is considering these constants as part of normalizing constant, which makes a function become a valid $pdf$.
You will see this in action in the following formulas.

$$
\begin{align*}
  p(\mu_0 | \mu_1, \pi, \mathbf{x}, \mathbf{z})
      &= p(\mu_0 | \mu_1, \mathbf{x}, \mathbf{z}) \\
      &= \frac{p(\mathbf{x} | \mu_0, \mu_1, \mathbf{z}) p(\mu_0 | \mu_1, \mathbf{z})}{p(x | \mu_1, \mathbf{z})} \\
      &\approx p(\mathbf{x} | \mu_0, \mu_1, \mathbf{z}) p(\mu_0) \\
      &= \prod_{i = 1}^n p(x_i | \mu_0, \mu_1, z_i) p(\mu_0) \\
      &= \prod_{i = 1}^n (\sqrt{\frac{\lambda}{2\pi}} \exp{(-\frac{\lambda}{2}(x_i - \mu_0)^2)})^{1 - z_i} (\sqrt{\frac{\lambda}{2\pi}} \exp{(-\frac{\lambda}{2}(x_i - \mu_1)^2)})^{z_i} p(\mu_0) \\
\end{align*}
$$

Wow, that is a very long formula.
However, the term related to $\mu_1$ is not of our concerns, since we're finding the conditional distribution of $\mu_0$.
Therefore, we could safely consider it as normalizing constant and remove it from the equation.
So here we continue.

$$
\begin{align*}
  p(\mu_0 | \mu_1, \pi, \mathbf{x}, \mathbf{z})
      &\approx \prod_{i = 1}^n (\exp{(-\frac{\lambda}{2}(x_i - \mu_0)^2)})^{1 - z_i} p(\mu_0) \\
      &= \exp{(-\frac{\lambda}{2} \sum_{i \in K} (x_i - \mu_0)^2)} \sqrt{\frac{l}{2\pi}} \exp{(-\frac{l}{2}(\mu_0 - m)^2)} \text{ with } K = \{i : z_i = 0\} \\
      &\approx \exp{(-\frac{\lambda}{2} \sum_{i \in K} (x_i - \mu_0)^2 - \frac{l}{2}(\mu_0 - m)^2)} \\
      &= \exp{(-\frac{\lambda |K| + l}{2} \mu_0^2 + (\lambda \sum_{i \in K} x_i + ml) \mu_0 - \frac{\lambda}{2} \sum_{i \in K} x_i^2)} \\
\end{align*}
$$

Seems like we have reached the end.
But, what does the conditional distribution of $\mu_0$ look like?
If we consider a random variable $x \sim \mathcal{N}(\mu, \lambda^{-1})$,
its $pdf$ will look like this:

$$
\begin{align*}
p(x)
  &= \sqrt{\frac{\lambda}{2\pi}} \exp{(-\frac{\lambda}{2} (x - \mu)^2)} \\
  &= \sqrt{\frac{\lambda}{2\pi}} \exp{(-\frac{\lambda}{2} x^2 + \lambda \mu x - \frac{\lambda}{2} \mu^2)} \\
\end{align*}
$$

So, the term associates with $x^2$ is $-\frac{\lambda}{2}$ and the term associates with $x$ is $\lambda \mu$.
Applying this to the above equation, we come to that
$$
\begin{align*}
  \mu_0 | \mu_1, \pi, \mathbf{x}, \mathbf{z} &\sim \mathcal{N} (M_0, L_0^{-1}) \\
  \text{ with }
      M_0 &= \frac{ml + \lambda \sum_{i \in K} x_i}{\lambda |K| + l}, \\
      L_0 &= \lambda |K| + l \\
\end{align*}
$$

Similarly, you can find the other distribution.
Conditional distribution of $\mu_1 | \mu_0, \pi, \mathbf{x}, \mathbf{z}$
will have similar distribution to that of $\mu_0 | \mu_1, \pi, \mathbf{x}, \mathbf{z}$,
but $K$ will be $K = \{i: z_i = 1\}$.

So now, let's implement the sampling code based on the conditional distributions.


```python
def sample_mu(mu, z, x, m, l, lampda, sex):
    n = np.sum(z == sex)

    L = l + n * lampda
    M = (l * m + lampda * np.sum(x[z == sex])) / (l + n * lampda)
    return np.random.normal(M, 1 / np.sqrt(L))

def sample_mu_0(mu_1, z, x, m, l, lampda):
    return sample_mu(mu_1, z, x, m, l, lampda, sex=0)

def sample_mu_1(mu_0, z, x, m, l, lampda):
    return sample_mu(mu_0, z, x, m, l, lampda, sex=1)
```

## Deriving $p(\mathbf{z} | \mu_0, \mu_1, \pi, \mathbf{x})$

Similarly, we can derive the conditional distribution of $\mathbf{z} | \mu_0, \mu_1, \pi, \mathbf{x}$
using Bayes' theorem and throw away unnecessary constants to simplify the calculation.

$$
\begin{align*}
  p(\mathbf{z} | \mu_0, \mu_1, \pi, \mathbf{x})
      &= \frac{p(\mathbf{x} | \mu_0, \mu_1, \pi, \mathbf{z}) p(\mathbf{z} | \mu_0, \mu_1, \pi)}{p(\mathbf{x} | \mu_0, \mu_1, \pi)} \\
      &\approx p(\mathbf{x} | \mu_0, \mu_1, \pi, \mathbf{z}) p(\mathbf{z} | \mu_0, \mu_1, \pi) \\
      &= \prod_{i = 1}^n p(x_i | \mu_0, \mu_1, \pi, z_i) p(z_i | \pi) \\
      &= \prod_{i = 1}^n (\mathcal{N}(\mu_0, \lambda^-1))^{1 - z_i} (\mathcal{N}(\mu_1, \lambda^-1))^{z_i} \pi^{z_i} (1 - \pi)^{1 - z_i} \\
      &= \prod_{i = 1}^n ((1 - \pi) \mathcal{N}(\mu_0, \lambda^{-1}))^{1 - z_i} (\pi \mathcal{N}(\mu_1, \lambda^{-1}))^{z_i} \\
      &= \prod_{i = 1}^n Bernoulli(\frac{\alpha_{i, 1}}{\alpha_{i, 0} + \alpha_{i, 1}}) \\
      \text{ with }
      \alpha_{i, 1} &= \pi \mathcal{N}(\mu_1, \lambda^{-1}), \\
      \alpha_{i, 0} &= (1 - \pi) \mathcal{N}(\mu_0, \lambda^{-1})
\end{align*}
$$

Here is the implementation of the code to sample $\mathbf{z}$ based on the conditional distribution.


```python
from scipy.stats import norm

def sample_z(x, mu_0, mu_1, pi, lampda):
    alpha_0 = (1 - pi) * norm.pdf(x, loc=mu_0, scale=1 / np.sqrt(lampda))
    alpha_1 = pi * norm.pdf(x, loc=mu_1, scale=1 / np.sqrt(lampda))

    return np.random.binomial(size=len(x),
                              p=alpha_1 / (alpha_0 + alpha_1),
                              n=1)
```

## Gibbs Sampling

Implementing Gibbs sampling with data augmentation is actually very easy.
You just have to repeatedly sample parameters for a number of iterations.
Remember to use previously sampled parameters to update the conditional distribution of the current parameter being sampled.


```python
import pandas as pd

def gibbs_sampling_with_data_augmentation(x, iterations, hypers, initial_params):
    pi = initial_params['pi']
    z = np.random.binomial(p=pi, size=len(x), n=1)
    mu_0 = initial_params['mu_0']
    mu_1 = initial_params['mu_1']

    # Create trace to store sampling results of (mu_0, mu_1 and pi)
    trace = np.zeros((iterations, 3))

    for i in range(iterations):
        pi = sample_pi(hypers['a'], hypers['b'], z)
        z = sample_z(x, mu_0, mu_1, pi, hypers['lambda'])
        mu_0 = sample_mu_0(mu_1, z, x,
                           hypers['m'],
                           hypers['l'],
                           hypers['lambda'])
        mu_1 = sample_mu_1(mu_0, z, x,
                           hypers['m'],
                           hypers['l'],
                           hypers['lambda'])

        trace[i] = np.array((mu_0, mu_1, pi))

    return pd.DataFrame(trace, columns=['mu_0', 'mu_1', 'pi'])
```

## Result

Applying the Gibbs sampling algorithm above with the following hyper parameters and initial parameters.


```python
initial_params = {'pi': 0.5, 'mu_0': 175, 'mu_1': 175}
hypers = {'m': 175,
          'l': 15**-2,
          'a': 1,
          'b': 1,
          'lambda': 8**-2}
trace = gibbs_sampling_with_data_augmentation(observations,
                                              iterations=1000,
                                              initial_params=initial_params,
                                              hypers=hypers)

# Let's draw some stuffs out.
fig, [mu_ax, pi_ax] = plt.subplots(2, 1, tight_layout=True, sharex=True)
iterations = np.arange(len(trace))
mu_ax.scatter(iterations,
              trace['mu_0'], c='r', s=1, label='$\mu_0$')
mu_ax.scatter(iterations,
              trace['mu_1'], c='g', s=1, label='$\mu_1$')

mu_ax.set_title('$\mu_0$ and $\mu_1$ traceplot')
mu_ax.set_ylabel('cm')
mu_ax.legend()

pi_ax.scatter(iterations, trace['pi'], s=1, label='$\pi$')
pi_ax.set_title('$\pi$ traceplot')
pi_ax.set_xlabel('Iterations')
pi_ax.set_ylabel('$p$')
pi_ax.legend()
```




    <matplotlib.legend.Legend at 0x7f2837f80460>




![svg]({{ site.baseurl }}/images/2020-05-16-gibbs-sampling-with-data-augmentation_files/2020-05-16-gibbs-sampling-with-data-augmentation_22_1.svg)



```python
# Throw away some beginning samples.
trace = trace[200:]

fig, axs = plt.subplots(1, 3, tight_layout=True, figsize=(12, 4.8))
for (col, ax, xlabel) in zip(('mu_0', 'mu_1', 'pi'), axs, ('cm', 'cm', '$p$')):
    ax.set_title(f'$\{col}$ distribution')
    sns.distplot(trace[col], ax=ax, axlabel=xlabel)

trace.describe()
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
      <th>mu_0</th>
      <th>mu_1</th>
      <th>pi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>800.000000</td>
      <td>800.000000</td>
      <td>800.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>169.517426</td>
      <td>184.266311</td>
      <td>0.521943</td>
    </tr>
    <tr>
      <th>std</th>
      <td>0.689948</td>
      <td>0.633537</td>
      <td>0.038940</td>
    </tr>
    <tr>
      <th>min</th>
      <td>166.767252</td>
      <td>182.385519</td>
      <td>0.409349</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>169.053741</td>
      <td>183.837962</td>
      <td>0.495229</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>169.523927</td>
      <td>184.232467</td>
      <td>0.522198</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>169.959267</td>
      <td>184.693732</td>
      <td>0.549680</td>
    </tr>
    <tr>
      <th>max</th>
      <td>171.502687</td>
      <td>186.458739</td>
      <td>0.634872</td>
    </tr>
  </tbody>
</table>
</div>




![svg]({{ site.baseurl }}/images/2020-05-16-gibbs-sampling-with-data-augmentation_files/2020-05-16-gibbs-sampling-with-data-augmentation_23_1.svg)


From the result above, we can see that $\mu_0$ and $\mu_1$ converge to the true mean that are used to generate the observations.
Also, $\pi$ converges to $0.5$ which is the value we used to generate the data points early on.

That's it for today.
Hopefully, you have learned something new for the day.
See you later!

# References

* Gibbs sampling for Bayesian linear regression in Python by Kieran R Campbell,
[link](https://kieranrcampbell.github.io/blog/2016/05/15/gibbs-sampling-bayesian-linear-regression.html).
* Module 8: Gibbs Sampling and Data Augmentation by Rebecca C. Steorts,
[link](http://www2.stat.duke.edu/~rcs46/modern_bayes17/lecturesModernBayes17/lecture-8/08-data-augment.pdf).
