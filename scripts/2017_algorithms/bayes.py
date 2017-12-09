"""
Created on Monday 4 December 2017
Last update: -

@author: Michiel Stock
michielfmstock@gmail.com

Illustration of using Bayes' rule to do inference
"""

import matplotlib.pyplot as plt
plt.xkcd()
import numpy as np
import seaborn as sns
sns.set_style('white')

def make_plot(ax, y, xlab, ylab, title, color='green'):
    """
    Makes a very basic plot
    """
    ax.plot(y, color=color)
    ax.set_title(title)
    ax.set_ylabel(ylab)
    ax.set_xlabel(xlab)
    # no ticks!
    ax.set_yticks([])
    ax.set_xticks([])

xvals = np.linspace(1e-1, 10)

# parameters
mu = 5
a = 2.3
sigma = 2

# prior density
f_norm = np.exp(-(xvals - 5)**2 / sigma)
f_power = xvals**(-a)
f_erlang = np.exp(-1.5 * xvals) * xvals**a + 1e-2

# posterior exp, E[X|X>y]

make_post_exp = lambda f, y : np.sum(f[xvals > y] * xvals[xvals > y]) / f_norm[xvals > y].sum() - y

post_norm = [make_post_exp(f_norm, y) for y in xvals]
post_power = [make_post_exp(f_power, y) for y in xvals]
post_erlang = [make_post_exp(f_erlang, y) for y in xvals]

if __name__ == '__main__':
    fig, axes = plt.subplots(nrows=3, ncols=2, figsize=(6, 8))

    # priors
    make_plot(axes[0,0], f_norm+3e-2, 'reading time chapter', 'number of chapters',
                                                        'Normal prior')
    make_plot(axes[1,0], np.linspace(1e-3, 3)**(-a) + 1e-3, 'reading time book',
                                        'number of books', 'Power law prior')
    axes[1,0].set_ylim([0, 10])
    make_plot(axes[2,0], f_erlang, 'waiting time for next book',
                                            'number of books', 'Erlang prior')

    # posterior
    make_plot(axes[0,1], post_norm,'time spent in chapter',
                        'expected time to finish chapter', 'Average rule')
    make_plot(axes[1,1], np.arange(100),'time spent reading book',
                                'expected time to finish book', 'Multiplicative rule')
    make_plot(axes[2,1], [1] * 100, 'time waiting for Winds of Winter',
                                'expected time till we get\nWinds of Winter',
                                'Additive rule')

    sns.despine()
    fig.tight_layout()
    fig.savefig('images/2017_algorithms/bayes.png')
