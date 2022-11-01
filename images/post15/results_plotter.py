import numpy as np
import skrf as rf
from matplotlib import pyplot as plt
from matplotlib import cm as cm
from matplotlib.colors import LogNorm  

def polar_2_rectangular(mag, angles):
    return mag * np.exp(1j*angles)

lna_cal = rf.Network('/Users/ricardogoncalves/Documents/GitHub/theantennaguy.github.io/images/post15/lna_sparams_cal.s2p')
lna_cal.name = 'LNA'
lna_cal.frequency.unit = 'ghz'

gd = abs(lna_cal.s21.group_delay) *1e9

fig, ax = plt.subplots()
lna_cal.plot_s_db()

fig, ax = plt.subplots()
lna_cal.plot(gd)
plt.ylabel('Group Delay (ns)')

plt.show()

