---
layout: post
title: Plotting with Pythonanywhere
---


import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

fig = plt.figure()
ax = fig.add_subplot(111)
ax.plot(range(100))

fig.savefig("graph.png")

Then get the graph at: http://www.pythonanywhere.com/user/your-username/files/home/your-username/graph.png

