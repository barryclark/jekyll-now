"""
Created on Friday 1 December 2017
Last update: -

@author: Michiel Stock
michielfmstock@gmail.com

Short script to illustrate the secretary problem
"""

import numpy as np

def simulate_selection(n, simulations=1000):
    """
    Simulate a bunch of secretary problems of size n and count at which
    point
    """
    candidates = np.zeros(n)
    found_best_after_k = np.zeros(n)
    for sim in range(simulations):
        candidates[:] = np.random.rand(n)
        np.maximum.accumulate(candidates)
